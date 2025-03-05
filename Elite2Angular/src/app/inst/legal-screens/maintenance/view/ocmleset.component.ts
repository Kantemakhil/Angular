import {
    Component, OnInit
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { LegalSettingsCommitBean } from '@inst/legal-screens/maintenance/beans/LegalSettingsCommitBean';
import { LegalSettings } from '../beans/LegalSettings';
import { OcmlesetService } from '../service/ocmleset.service';

@Component({
    selector: 'app-ocmleset',
    templateUrl: './ocmleset.component.html'
})

export class OcmlesetComponent implements OnInit {
    msgs: any[] = [];
    legalsData: LegalSettings[] = [];
    legalsCommitModel: LegalSettingsCommitBean = new LegalSettingsCommitBean();
    disableFlag: boolean;
    legalsTempData: LegalSettings[] = [];
    legalslastData:LegalSettings[] = [];
    legalModel: LegalSettings=new LegalSettings();
    lastTempData: LegalSettings[] = [];
    custodialData: LegalSettings[] = [];
    custodialTempData: LegalSettings[] = [];
    sentenceCalcWarn: LegalSettings[] = [];
    sentenceCalcWarnTempData: LegalSettings[] = [];
    hidePursuant: any;
    hidePursuantTempData: any;
    hideErd: any;
    hideErdData: any;
    hideErdTempData: any;
    dispalyHideErd: boolean;
    bailAmtMandatory:LegalSettings[] = [];
    bailAmtMandatoryInitial:LegalSettings[] = [];
    constructor(private ocmlesetFactory: OcmlesetService, public translateService: TranslateService) {
      
    }
    ngOnInit() {
        this.disableFlag = true;
        this.legalsExecuteQuery();
    }
    /**
   * This function displays the messages
   */
    show(vldmsg, type?) {
        type = type ? type : 'warn';
        vldmsg = this.translateService.translate(vldmsg);
        const msgval = [{ message: vldmsg, type: type }];
        this.msgs = [...msgval];
    }


    legalsExecuteQuery() {
        this.ocmlesetFactory.legalsExecuteQuery().subscribe(data => {
            if (data.length > 0) {
                this.legalslastData=[];
                this.legalsData = data.filter(value=>["EASUIOLPO","EMRE","EAOSU","EACSU"].includes(value.code) )   //!=="DERD" && value.code!=='RRTIEA' && value.code!=='DEL_CUST' && value.code!=='DEL_NCUS' && value.code!=='DEL_BAIL' && value.code!=='DEL_PAR' && value.code!=='DEL_HWD' && value.code!=='SENTCALWARNFLAG' && value.code!=='HIDPURSUANT');
                this.legalslastData= data.filter(value=>value.code==='RRTIEA');
                this.legalsTempData=JSON.parse(JSON.stringify(this.legalsData));
                this.lastTempData=JSON.parse(JSON.stringify(this.legalslastData));
                this.custodialData = data.filter(value=>value.code==='DEL_CUST' || value.code==='DEL_NCUS' || value.code==='DEL_BAIL' || value.code==='DEL_PAR' || value.code==='DEL_HWD');
                this.custodialTempData=JSON.parse(JSON.stringify(this.custodialData));
                this.sentenceCalcWarn = data.filter(value=>value.code==='SENTCALWARNFLAG');
                this.sentenceCalcWarnTempData=JSON.parse(JSON.stringify(this.sentenceCalcWarn));

                this.hidePursuant = data.filter(value=>value.code==='HIDPURSUANT');
                this.hidePursuantTempData=JSON.parse(JSON.stringify(this.hidePursuant));
                this.hideErdData = data.find(value => value.code === 'DERD');              
                         
                this.hideErd = this.hideErdData.value;
                this.dispalyHideErd = true;
                this.hideErdTempData =JSON.parse(JSON.stringify(this.hideErdData)); 
        
                this.bailAmtMandatory = data.filter(value=>value.code==='BAMHWD');
                this.bailAmtMandatoryInitial=JSON.parse(JSON.stringify(this.bailAmtMandatory));

                this.disableFlag = true;
            } else {
                this.legalsData = [];
                this.legalslastData=[];
                this.dispalyHideErd = false;
            }
        })
    }



    ordersCommit() {
        this.legalsCommitModel.updateList = [];
        if (this.legalsData.length > 0) {
            for (let i = 0; i < this.legalsData.length; i++) {
                if (!this.legalsData[i].value) {
                    this.show(this.legalsData[i].setting+" "+this.translateService.translate('ocmleset.activemusenter'), 'warn');
                    return;
                }
            }
            this.legalsData.push(this.legalslastData[0]);
            this.custodialData.forEach(data=>{
                this.legalsData.push(data);
            });
            this.sentenceCalcWarn.forEach(data=>{
                this.legalsData.push(data);
            })

            this.hidePursuant.forEach(data=>{
                this.legalsData.push(data);
            })
                this.hideErdData.value =this.hideErd;
            this.legalsData.push(this.hideErdData);

            this.bailAmtMandatory.forEach(data=>{
                this.legalsData.push(data);
            })
            this.legalsCommitModel.updateList=this.legalsData;
        }
        this.ocmlesetFactory.legalsCommit(this.legalsCommitModel).subscribe(data => {
            if (data == 1) {
                this.show(this.translateService.translate('common.addupdateremoverecordsuccess'), 'success');
                this.legalsExecuteQuery();
            }  else {
                this.show(this.translateService.translate('common.addupdateremoverecordfailed'));
                this.legalsExecuteQuery();
            }
        })
    }


    orderClear () {
        this.disableFlag = true;
        this.legalsExecuteQuery();
    }

    onLovChange(event,index) {
        if (event) {
            if(this.legalsTempData[index].value !== event.code){
                this.disableFlag = false;
            }
        }
    }

    dropDownChange(event,index) {
        if (event) {
            if(this.lastTempData[index].value !== event.code){
                this.disableFlag = false;
            }
        }else{
            this.disableFlag = false;
        }
    }
    custodialChange(event,index) {
        if (event) {
            if(this.custodialTempData[index].value !== event.code){
                this.disableFlag = false;
            }
        }else{
            this.disableFlag = false;
        }
    }
    sentenceCalcWarnFlag (event,index) {
        if (event) {
            if(this.sentenceCalcWarnTempData[index].value !== event.code){
                this.disableFlag = false;
            }
        }else{
            this.disableFlag = false;
        }
    }


    hidePursuantFlag (event,index) {
        if (event) {
            if(this.hidePursuantTempData[index].value !== event.code){
                this.disableFlag = false;
            }
        }else{
            this.disableFlag = false;
        }
    }

    optionChangeEvent(event){
        if (event) {
            if(this.hideErdTempData.value !== event.code){
                this.disableFlag = false;
            }                      
        }else{
            this.disableFlag = false;
        }

    }

    bailAmtMandatoryFlag (event,index) {
        if (event) {
            if(this.bailAmtMandatoryInitial[index].value !== event.code){
                this.disableFlag = false;
            }
        }else{
            this.disableFlag = false;
        }
    }
}
