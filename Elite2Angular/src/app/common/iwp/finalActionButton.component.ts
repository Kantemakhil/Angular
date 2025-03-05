import {
    Component,
    OnInit,
    ViewChild
} from '@angular/core';


import { TranslateService } from '@common/translate/translate.service';
import { DialogComponent } from '@ui-components/dialog/dialog.component';
import { EoffenderService } from "./service/eoffender.service";
import { EoffenderDetails } from "../beans/EoffenderDetails";
import { UserSessionManager } from '@core/classes/userSessionManager';

@Component({
    selector: 'final',
    templateUrl: './finalActionButton.component.html',
})



export class FinalActionButtonComponent implements OnInit {
    eOffenderDetails: EoffenderDetails = new EoffenderDetails();
    status: string;
    constructor( private eoffenderService: EoffenderService,
            public translateService: TranslateService,private sessionManager: UserSessionManager) {}

    @ViewChild('dialog', {static: true}) dialog: DialogComponent;
    title:string;
    result:string;
    message = ' Invalid.';
    msgs: any[] = [];

    
    ngOnInit() {
        this.dialog.data;
        this.eOffenderDetails = this.sessionManager.userSessionDetails().eoffenderDetails;
         this.status='FROZEN';
        this.dialog.data.trimUser = this.eOffenderDetails.trimUser;
        
    }
    
    yes(){
        if(this.dialog.data.status=='Finalized'|| this.dialog.data.status=='Checked Out'){
            this.dialog.close(true);
        }else{
            this.title= this.dialog.data.documentName;
            var fileName;
            if(this.dialog.data.status =='"SIGNED"'){
                fileName=this.title+'.pdf';
            }else{
                fileName=this.title+this.dialog.data['__fileExt'];
            }
            const documentStatus = this.eoffenderService.getFinalStatusResult(this.dialog.data.documentId,this.dialog.data.trimUser,this.status,fileName);
            documentStatus.subscribe( result => {
                if(result == "SUCCESS"){
                    this.result=result;           
                    this.showMessage(this.translateService.translate('eoffender.finalizedsuccess'), 'success');
                    this.eoffenderService.showUpdatedRow = true;
                    this.dialog.close({
                        status:'Finalized',
                        statusdesc:this.translateService.translate("eoffender.finalStatus"),
                        button:'',
                        secButton:'',
                        signatureButton:'',
                        statusImage:'assets/icons/eoff_icons/finalized_20x20.png',
                        statusIconLabel:'Finalized',
                    });
                }else{
                    this.showMessage(this.translateService.translate('common.addupdateremoverecordfailed'), 'error');
                    this.dialog.close(true);
                }
               
            });
           
           
        }
    }

    cancel(){
        this.dialog.close(true);
    }

    showMessage(vldmsg, type?) {
        type = type ? type : 'warn';
        vldmsg = this.translateService.translate(vldmsg);
        const msgval = [{ message: vldmsg, type: type }];
        this.msgs = [...msgval];
      }
}