import {
    Component,
    OnInit, ViewChild
} from '@angular/core';
import { DialogComponent } from '@ui-components/dialog/dialog.component';
import { TranslateService } from '@common/translate/translate.service';
import { OffenderSentences } from "../beans/OffenderSentences";
import { UpdateCase } from "../beans/UpdateCase";
import { UpdateUser } from "../beans/UpdateUser";
import { DatePipe } from '@angular/common';
import { OculegstSentenceService } from "../service/oculegst-sentence.service";
import { DateFormat } from '@ui-components/datepicker/dateFormat';

@Component( {
    selector: 'app-oculegst-sentence',
    templateUrl: './oculegst-sentence.component.html',
    styleUrls: []
} )

export class OculegstSentenceComponent implements OnInit {
    @ViewChild( 'dialog', {static: true}) dialog: DialogComponent;
    isupReason:boolean;
    message = ' Invalid.';
    type = 'error';
    disabled: boolean;
    msglist = [];
    msgs: any[] = [];
    sysDate: any;
    sentencesData : OffenderSentences[]=[];
    sentencesupdateData : OffenderSentences = new OffenderSentences;
    updateReasonUrl:string;
    sentence:UpdateCase= new UpdateCase;
    userName:UpdateCase[]=[];
    userId : any[]=[];
    updateUser: UpdateUser= new UpdateUser();
    updatesentence: UpdateCase= new UpdateCase();
    
    constructor(public translateService: TranslateService,
            private OculegstFactory: OculegstSentenceService){}
    ngOnInit(){
        this.sentence.calledFrom="SENTENCE";
        this.updatesentence.updateDate= DateFormat.getDate();
        this.updatesentence.comment="";
        if ( this.dialog.data ) {}
        this.updateReasonUrl='oculegst/populateUpdateReason?category='+this.dialog.data.category+'&sentenceCalcType='+this.dialog.data.sentenceCalcType;
        this.populateUpdateUser();
       
    } 
    populateUpdateUser() {       
        this.OculegstFactory.getUpdateUser().subscribe(user=>{
            this.updateUser = user;
            this.updatesentence.staffId = this.updateUser.staffId;
            this.updatesentence.userName = this.updateUser.lastName+","+this.updateUser.firstName;
        });
    } 
    
   
    SentenceUpdateValues(event){  
        if(this.updatesentence.updateReason != null && this.updatesentence.updateReason !=  undefined){            
            if(this.updatesentence.updateDate > DateFormat.getDate()){
                this.type = 'warn';
                this.message = this.translateService.translate('oculegst.dateErrmsg');
                this.show();
                return;
            }  
            const datePipe = new DatePipe('en-US');
            const getDate = datePipe.transform(this.updatesentence.updateDate, 'yyyy/MM/dd' );
            this.dialog.close({statusUpdateReason: this.updatesentence.updateReason,
                               statusUpdateDate: new Date(getDate),
                               statusUpdateStaffId:this.updatesentence.staffId,
                               staffId:this.updatesentence.staffId,
                               statusUpdateComment:this.updatesentence.comment,
                              // status_update_date :this.updatesentence.updateDate,
                             statusupdate_staff_id: this.updatesentence.staffId
               });
            this.dialog.data.statusUpdateStaffId=this.updatesentence.staffId;
            this.dialog.data.comment=this.updatesentence.comment;
        }else {
            this.dialog.close(true);
            this.type = 'warn';
            this.message =  this.translateService.translate('oculegst.errmsg');
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