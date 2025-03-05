import {
    Component,
    OnInit, ViewChild
} from '@angular/core';
import { DialogComponent } from '@ui-components/dialog/dialog.component';
import { TranslateService } from '@common/translate/translate.service';
import { OculegstService } from "../service/oculegst.service";
import { UpdateReason } from "../beans/UpdateReason";
import { UpdateCase } from "../beans/UpdateCase";
import { DatePipe } from '@angular/common';
import { UpdateUser } from "../beans/UpdateUser";
import { DateFormat } from '@ui-components/datepicker/dateFormat';

@Component( {
    selector: 'app-oculegst',
    templateUrl: './oculegst.component.html',
    
} )

export class OculegstComponent implements OnInit {
    updateReasons: UpdateReason[]=[];
    updateUser: UpdateUser = new UpdateUser();
    updateCase : UpdateCase = new UpdateCase();
    msglist=[];
    message = ' Invalid.';
    type = 'error';
    msgs: any[] = [];
    @ViewChild( 'dialog', {static: true}) dialog: DialogComponent;
    constructor(public translateService: TranslateService,
                private service : OculegstService){}
   
    ngOnInit() {
        this.populateUpdateUser();
        this.populateUpdateCaseReason();
        
        const datePipe = new DatePipe('en-US');        
        //const updateDdate = datePipe.transform(new Date(), 'yyyy/MM/dd');
        this.updateCase.calledFrom = 'CASE';
        this.updateCase.updateReason = '';
        this.updateCase.updateDate = DateFormat.getDate();
        this.updateCase.comment = '';
    }
    
    populateUpdateCaseReason() {
        const updateReasons = this.service. getCaseUpdateReasons().subscribe(reasons=>{
            this.updateReasons = reasons;            
        });
    }
    
    populateUpdateUser() {       
        this.service.getUpdateUser().subscribe(user=>{
            this.updateUser = user;
            this.updateCase.stafId = this.updateUser.staffId;
            this.updateCase.userName = this.updateUser.lastName+","+this.updateUser.firstName;
        });
    }
    
    caseUpdateValues(){        
        if(this.updateCase.updateReason != null && this.updateCase.updateReason !=  undefined){            
            if(this.updateCase.updateDate > DateFormat.getDate()){
                this.type = 'warn';
                this.message = this.translateService.translate('oculegst.dateErrmsg');
                this.show();
                return;
            }       
            
            this.dialog.close({statusUpdateReason: this.updateCase.updateReason,
                               statusUpdateDate:this.updateCase.updateDate,
                               statusUpdateStaffId:this.updateCase.stafId,
                               statusUpdateComment:this.updateCase.comment,
                               status_update_date :this.updateCase.updateDate,
                               status_update_staff_id: this.updateCase.stafId
                              
               });
        }else {
            this.dialog.close(null);
            this.type = 'warn';
            this.message =this.translateService.translate('oculegst.reasonupdate');
            this.show();
            return;
        }
    }
    
    show() {
        this.msglist = [];
        this.msglist.push({ message: this.message, type: this.type });
        this.msgs = [...this.msglist];
        }
    
    cancel(): void {
        this.dialog.close(null);
      }
   
}