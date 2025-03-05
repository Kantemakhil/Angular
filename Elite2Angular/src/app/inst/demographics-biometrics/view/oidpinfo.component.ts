import {
    Component, OnInit
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OidpinfoService } from '@inst/demographics-biometrics/service/oidpinfo.service';
import { VHeaderBlock } from '@commonbeans/VHeaderBlock';
import { Offenders } from '@commonbeans/Offenders';
import { OffenderProfileDetails } from '@commonbeans/OffenderProfileDetails';
import { OffenderProfileDetailsCommitBean } from '@commonbeans/OffenderProfileDetailsCommitBean';
import { OffendersCommitBean } from '@instdemographicsbeans/OffendersCommitBean';
import { OffenderSearchService } from '@common/offender-records/service/offender-search.service';
@Component({
    selector: 'app-oidpinfo',
    templateUrl: './oidpinfo.component.html',
    styleUrls: ['./oidpinfo.component.scss']
})
export class OidpinfoComponent implements OnInit {
    message = ' Invalid.';
    type = 'error';
    msglist = [];
    actionName: string;
    lovModel: any[];
    rgagylocidsRg: any[];
    msgs: any[] = [];
    nameOfLovPage: string;
    listToCompare: any[] = [];
    offnameData: Offenders[] = [];
    offnameDataTemp: Offenders[] = [];
    offnameModel: Offenders = new Offenders();
    tempoffnameModel: Offenders = new Offenders();
    offnameIndex: number;
    offnameInsertList: Offenders[] = [];
    offnameUpdatetList: Offenders[] = [];
    offnameDeleteList: Offenders[] = [];
    offpdData: OffenderProfileDetails[] = [];
    offpdDataTemp: OffenderProfileDetails[] = [];
    offpdModel: OffenderProfileDetails = new OffenderProfileDetails();
    offpdIndex: number;
    offpdInsertList: OffenderProfileDetails[] = [];
    offnameCommitModel: OffendersCommitBean = new OffendersCommitBean();
    offpdCommitModel: OffenderProfileDetailsCommitBean = new OffenderProfileDetailsCommitBean();
    offpdUpdateList: OffenderProfileDetails[] = [];
    offpdDeleteList: OffenderProfileDetails[] = [];
    minDate: Date;
    display: boolean;
    errorMessage: string;
    headerMessage: string;
    disabled: boolean;
    editable: boolean;
    index: any;
    cgfkOffnamedspdescriptionRg: any[] = [];
    cgfkOffpddspdescription2Rg: any[] = [];
    rgbirthstateRg: any[] = [];
    offProfDetailsColumnDefs: any[] = [];
    vHeaderBlockModel: VHeaderBlock = new VHeaderBlock();
    savedisabled: boolean;
    validMsg: any;
    countryValidMsg: any;
    profileCategory: any;
    codedesformat = {code: 'Code' , description : 'Description'};
    cityreadonly: boolean;
    constructor(private oidpinfoFactory: OidpinfoService, public translateService: TranslateService,
        private offenderSearchService: OffenderSearchService) {
    }
    ngOnInit() {
        this.cityreadonly = true;
        this.validMsg = false;
        this.countryValidMsg = false;
        this.savedisabled = true;
        this.disabled = true;
        this.vHeaderBlockModel = new VHeaderBlock();
        this.vHeaderBlockModel = this.offenderSearchService.selectedOffender;
        if (!this.vHeaderBlockModel || this.vHeaderBlockModel.offenderBookId === undefined) {
            this.type = 'warn';
            this.message = this.translateService.translate('common.pleasesearchforvalidoffender');
            this.show();
        }
    }
    onOffenderChange(offender) {
        if (offender) {
            this.validMsg = false;
            this.countryValidMsg = false;
            this.vHeaderBlockModel = offender;
            if (this.vHeaderBlockModel.activeFlag === 'N') {
                this.validMsg = true;
                this.countryValidMsg = true;
                this.cityreadonly = false;
            } else {
                this.cityreadonly = false;
            }

            this.offnameModel = new Offenders();
            this.tempoffnameModel = new Offenders();
            this.offpdModel = new OffenderProfileDetails();
            this.offnameModel.offenderId = this.vHeaderBlockModel.offenderId;
            this.offpdModel.offenderBookId = this.vHeaderBlockModel.offenderBookId;
            this.oidpidencheckProfileDetails();
        } else {
            this.vHeaderBlockModel = offender;
            this.offnameData = [];
            this.offpdData = [];
            this.offnameModel = new Offenders();
            this.tempoffnameModel = new Offenders();
            this.disabled = true;
            this.validMsg = true;
            this.countryValidMsg = true;
            this.cityreadonly = true;
        }
    }
    allowNumbers(event) {
    }
    onRowClickoffpd(event) {
    }
    onRowSelect(event) {
        for (let i = 0; i < this.offpdData.length; i++) {
            if (this.offpdData[i].profileCode === event.innerValue) {
                this.index = i;
                return;
            }
        }
    }
    cancel() {
        //const birthCountryCode = this.offnameModel.birthCountryCode  === undefined ? '' : undefined;
        //const birthState = this.offnameModel.birthState  === undefined ? '' : undefined;
        this.offnameModel = new Offenders();
        this.offnameModel = JSON.parse(JSON.stringify(this.tempoffnameModel));
        // this.offnameModel.offenderId = this.vHeaderBlockModel.offenderId;
        // this.tempoffnameModel.offenderId = this.vHeaderBlockModel.offenderId;
        //this.offnameModel.birthCountryCode = birthCountryCode;
        //this.offnameModel.birthState = birthState;
    }
    oidpidencheckProfileDetails() {

        if (this.vHeaderBlockModel) {
            this.vHeaderBlockModel.activeFlag = 'Y';
            this.offpdModel.offenderBookId = this.vHeaderBlockModel.offenderBookId;
            this.offpdModel.caseloadType = 'INST';
            this.profileCategory = 'PI';
            const serviceObj2 = this.oidpinfoFactory.checkProfileDetails(this.offpdModel.offenderBookId,
                this.offpdModel.caseloadType, this.profileCategory);
            serviceObj2.subscribe(res => {
                 this.offPdExecuteQuery();
                if (res.length === 0) {
                    return;
                } else {
                    return res;
                }
            });
        } else {
            this.vHeaderBlockModel.activeFlag = 'N';
        }

    }
    offNameExecuteQuery() {
        const offnameResult = this.oidpinfoFactory.offNameExecuteQuery(this.offnameModel);
        offnameResult.subscribe(data => {
            if (data.length === 0) {
                this.offnameData = [];
            } else {
                this.offnameData = data;
                this.offnameModel = this.offnameData[0];
                this.offnameModel.birthPlace = this.offnameModel.birthPlace ? this.offnameModel.birthPlace : '';
                this.offnameModel.birthState = this.offnameModel.birthState ? this.offnameModel.birthState : '';
                this.offnameModel.birthCountryCode = this.offnameModel.birthCountryCode ? this.offnameModel.birthCountryCode : '';
                this.tempoffnameModel = JSON.parse(JSON.stringify(this.offnameModel));
            }
        });
    }
    offNameCommit() {
        this.offnameCommitModel.updateList = [];
        this.offnameUpdatetList.push(this.offnameModel);
        this.offnameCommitModel.updateList = this.offnameUpdatetList;
        const offnameSaveData = this.oidpinfoFactory.offNameCommit(this.offnameCommitModel);
        offnameSaveData.subscribe(data => {
            if (data.length === 0) {
                this.type = 'error';
                this.message = this.translateService.translate('common.addupdateremoverecordfailed');
                this.show();
            } else {
                this.type = 'success';
                this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
                this.show();
                this.offNameExecuteQuery();
            }
        });
    }
    offPdExecuteQuery() {
        const offpdResult = this.oidpinfoFactory.offPdExecuteQuery(this.offpdModel);
        offpdResult.subscribe(data => {
            this.disabled = true;
            if (data.length === 0) {
                this.offpdData = [];
            } else {
                data.forEach(ele => {
                    ele.profileCode = ele.profileCode ? ele.profileCode : '';
                });
                this.offpdData = data;
                this.offpdModel = data[0];
                // this.tempoffnameModel = data[0];
                this.offpdDataTemp = JSON.parse(JSON.stringify(data));
            }
            this.offNameExecuteQuery();
        });
    }

    emptyValue(){
        let count=0;
        this.offpdData.forEach(data =>{
            if(!data.profileCode){
                count++; 
            }
        });
        if(count==this.offpdData.length){
            return false;
        }else{
            return true;
        }
    }

    oidpinfoSaveoffpdForm() {
        // if(!this.emptyValue()){
        //     this.type = 'error';
        //     this.message = this.translateService.translate('oidpinfo.selectatleastone');
        //     this.show(); 
        //     return ;
        // }
        let updatedRecList = [];
        this.offpdData.forEach(element => {
            this.offpdDataTemp.forEach(prevElement => {
                if(element.profileType === prevElement.profileType) {
                    if( element.profileCode != prevElement.profileCode){
                        element.prevProfileCode = prevElement.profileCode;
                        updatedRecList.push(element);
                    }
                }
            });
        });
        this.offpdCommitModel.updateList = updatedRecList;
        for(let i=0 ;i<this.offpdData.length ;i++){
            if(this.offpdData[i].mandatoryFlag ==='N' && (this.offpdData[i].profileCode === undefined || this.offpdData[i].profileCode === '' || this.offpdData[i].profileCode===null) ){
                this.type = 'warn';
                this.message = this.translateService.translate(this.offpdData[i].profileTypeDesc+' must be entered.');
                this.show();
                return;
            }
        }
        this.offpdCommitModel.updateList.forEach(ele=>ele.sealFlag='Y');
        const offpdSaveData = this.oidpinfoFactory.offPdCommit(this.offpdCommitModel);
        offpdSaveData.subscribe(data => {
            if (data.length === 0) {
                this.type = 'warn';
                this.message = this.translateService.translate('common.addupdateremoverecordfailed');
                this.show();
            } else {
                this.type = 'success';
                this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
                this.oidpidencheckProfileDetails();
                this.show();

            }
        });
    }
    oidpinfoClearoffpd() {
    this.oidpidencheckProfileDetails();
    }
    show() {
        this.msglist = [];
        this.msglist.push({ message: this.message, type: this.type });
        this.msgs = [...this.msglist];
    }
    stateBlur() {
        if (!this.offnameModel.birthState) {
            this.offnameModel.birthState = '';
        }
    }
    countryBlur() {
        if (!this.offnameModel.birthCountryCode) {
            this.offnameModel.birthCountryCode = '';
        }
    }
    allLovBlur() {
        this.offpdData.forEach(data =>{
            if(!data.profileCode){
                data.profileCode = '';
            }
        });
    }

    get disabledFun() {
        if (this.offpdData.length > 0 && JSON.stringify(this.offpdData) === JSON.stringify(this.offpdDataTemp)) {
            return true;
        } else if(this.offpdData.length === 0){
            return true;
        }else{
            return false;
        }
        
    }

    get disableOriginFun() {
        if (JSON.stringify(this.offnameModel.birthPlace) !== JSON.stringify(this.tempoffnameModel.birthPlace) || (JSON.stringify(this.offnameModel.birthState) !== JSON.stringify(this.tempoffnameModel.birthState) && !((!this.tempoffnameModel.birthState) && (!this.offnameModel.birthState || this.offnameModel.birthState === null))) || (JSON.stringify(this.offnameModel.birthCountryCode) !== JSON.stringify(this.tempoffnameModel.birthCountryCode) && !((!this.tempoffnameModel.birthCountryCode) && (!this.offnameModel.birthCountryCode || this.offnameModel.birthCountryCode === null)))) {
            return false;
        }
        return true;
    }
}
