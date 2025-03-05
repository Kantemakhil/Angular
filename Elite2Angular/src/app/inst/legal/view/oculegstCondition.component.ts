import {
    Component,
    OnInit, ViewChild
} from '@angular/core';
import { DialogComponent } from '@ui-components/dialog/dialog.component';
import { TranslateService } from '@common/translate/translate.service';
import { UpdateCase } from "../beans/UpdateCase";
import { UpdateUser } from "../beans/UpdateUser";
import { DatePipe } from '@angular/common';
import { OculegstSentenceService } from "../service/oculegst-sentence.service";
import { UpdateReason } from "../beans/UpdateReason";
import { DateFormat } from '@ui-components/datepicker/dateFormat';

@Component( {
    selector: 'app-oculegstCondition',
    templateUrl: './oculegstCondition.component.html',
    styleUrls: []
} )

export class OculegstConditionComponent implements OnInit {
    @ViewChild('dialog', {static: true}) dialog: DialogComponent;
    isupReason:boolean;
    message = ' Invalid.';
    type = 'error';
    disabled: boolean;
    msglist = [];
    msgs: any[] = [];
    sysDate: any;
    updateReasonUrl:string;
    userName:UpdateCase[]=[];
    condition:UpdateCase= new UpdateCase;;
    updateUser: UpdateUser= new UpdateUser();
    updateCondition: UpdateCase= new UpdateCase();
    updateReasons: UpdateReason[]=[];
    constructor(public translateService: TranslateService,
            private OculegstFactory: OculegstSentenceService){}
    ngOnInit(){
        this.condition.calledFrom="CONDITION";
        this.updateCondition.updateDate= DateFormat.getDate();
        this.updateCondition.comment="";
        if ( this.dialog.data ) {}
       this.updateReasonUrl='oculegst/reasonUpdateStatus';
        this.populateUpdateUser();
       
    } 
 
    populateUpdateUser() {       
        this.OculegstFactory.getUpdateUser().subscribe(user=>{
            this.updateUser = user;
            this.updateCondition.staffId = this.updateUser.staffId;
            this.updateCondition.userName = this.updateUser.lastName+","+this.updateUser.firstName;
        });
    } 
    
   
    conditionUpdateValues(event){  
        if(this.updateCondition.updateReason != null && this.updateCondition.updateReason !=  undefined){            
            if(this.updateCondition.updateDate > DateFormat.getDate()){
                this.type = 'warn';
                this.message = this.translateService.translate('oculegst.dateErrmsg');
                this.show();
                return;
            }  
            const datePipe = new DatePipe('en-US');
            const getDate = datePipe.transform(this.updateCondition.updateDate, 'yyyy/MM/dd' );
            this.dialog.close({statusUpdateReason: this.updateCondition.updateReason,
                               statusUpdateDate: new Date(getDate),
                               statusUpdateStaffId:this.updateCondition.staffId,
                               staffId:this.updateCondition.staffId,
                               statusUpdateComment:this.updateCondition.comment,
                               statusupdate_staff_id: this.updateCondition.staffId
               });
            this.dialog.data.statusUpdateStaffId=this.updateCondition.staffId;
            this.dialog.data.comment=this.updateCondition.comment;
        }else {
            this.dialog.close(true);
            this.type = 'warn';
            this.message = this.translateService.translate('oculegst.errmsg');
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
        this.dialog.close(true);
       }
}