import {
    Component,
    OnInit
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OsureporService } from '@inmate/trust/financialreports/service/osurepor.service';
import { OmsModuleParameters } from '@inmate/trust/financialreports/beans/OmsModuleParameters';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { DateFormat } from '@ui-components/datepicker/dateFormat';
import { OtuacodeService } from '@inmate/trust/financialreports/service/otuacode.service';
import { AccountCodes } from '@inmate/trust/trustaccounts/beans/AccountCodes';
import { OtstastaService } from '@inmate/trust/statements/service/otstasta.service';
import { OtsreceiService } from '@inmate/trust/statements/service/otsrecei.service';
import { OiufsoffService } from '@inmate/trust/financialreports/service/oiufsoff.service';
import { OiufsoffGetGeneralOffenders } from '@inmate/trust/financialreports/beans/OiufsoffGetGeneralOffenders';
import { OiuhofflService } from '../service/oiuhoffl.service';
import { VHeaderBlock } from '@commonbeans/VHeaderBlock';
import { AmountFormatUtil } from '@common/utility/amountFormatUtil';
@Component({
    selector: 'app-osurepor',
    templateUrl: './osurepor.component.html',
    styles: ['.required:after {content:" *"; color: red;}']
})

export class OsureporComponent implements OnInit {
    actionName: string;
    lovModel: any[];
    msgs: any[] = [];
    nameOfLovPage: string;
    listToCompare: any[] = [];
    minDate: Date;
    display: boolean;
    errorMessage: string;
    headerMessage: string;
    disabled: boolean;
    editable: boolean;
    salOrdColumnDef: any[];
    omsMpColumnDef: any[];
    salOrdReadOnly: boolean;
    omsRequestReadOnly: boolean;
    omsMpReadOnly: boolean;
    rg1cRg: any[] = [];
    rg2cRg: any[] = [];
    rg3cRg: any[] = [];
    rg4cRg: any[] = [];
    rg5cRg: any[] = [];
    rg5c1Rg: any[] = [];
    rgoutputtypeRg: any[] = [];
    rgprinterRg: any[] = [];
    description: any;
    omsmpData: OmsModuleParameters[] = [];
    omsmpModel: OmsModuleParameters = new OmsModuleParameters();
    refCodeTitles = { 'description': this.trMsg('osurepor.description'), 'code': this.trMsg('osurepor.code') };
    accodeModel: AccountCodes = new AccountCodes();
    voffbkgModel: OiufsoffGetGeneralOffenders = new OiufsoffGetGeneralOffenders();
    checkBoxDisabled: boolean;
    copiesReadOnly: boolean;
    copyData: number;
    submitReadOnly: boolean;
    date: Date;
    clearDisable: boolean;
    ynFlag: boolean;
    defPrinterData: string;
    indTrans: boolean;
    startDate: boolean;
    endDate: boolean;
    pDate: boolean;
    lovDataFlag: boolean;
    lovData: any;
    formDataFlag: boolean;
    flag: string;
    userDate: Date;
    datetoLong: number;
    accountCode: number;
    moduleName: any;
    otrtastaData: any[] = [];
    offIdValid: boolean;
    prefixFieldFlag: boolean;
    vHeaderBlockModel: VHeaderBlock = new VHeaderBlock();
    constructor(private osureporFactory: OsureporService,
        public translateService: TranslateService,
        private sessionManager: UserSessionManager,
        private otuacodeFactory: OtuacodeService,
        public otstastaFactory: OtstastaService,
        public otsreceiFactory: OtsreceiService,
        public oiufsoffFactory: OiufsoffService,
        private oiuhofflFactory: OiuhofflService,
        private amountFormat: AmountFormatUtil) {
        this.salOrdColumnDef = [];
        this.omsMpColumnDef = [];
    }
    ngOnInit() {
        this.startDate = false;
        this.endDate = false;
        this.indTrans = false;
        this.pDate = false;
        this.lovDataFlag = false;
        this.formDataFlag = false;
        this.ynFlag = false;
        this.clearDisable = true;
        this.checkBoxDisabled = true;
        this.copiesReadOnly = true;
        this.submitReadOnly = true;
        this.offIdValid = true;
    }
    oidpidenpaExecuteQuery() {
        const offpaResult = this.osureporFactory.populateRecords(this.omsmpModel);
        offpaResult.subscribe(offpaResultList => {
            if (offpaResultList.length === 0) {
                this.omsmpData = [];
                this.checkBoxDisabled = true;
                this.copiesReadOnly = true;
                this.submitReadOnly = true;
            } else {
                offpaResultList.forEach(element => {
                    element.optionalFlag = element.optionalFlag === 'N' ? true : false;
                    if (element.parameterName === 'CASELOAD') {
                        element.description = this.sessionManager.currentCaseLoad;
                    }
                    if (element.parameterName === 'IND_TRNS') {
                        element.description = 'Y';
                    }
                    if (element.parameterName === 'CANTEEN') {
                        element.description = '';
                    }
                    if (element.parameterType === 'DATE') {
                        if (this.description === 'OIRPRGNT') {
                            element.createDatetime = null;
                        } else if (this.description === 'OTRGLMON' || this.description === 'OORGLMON' || this.description === 'OORCFSTM') {
                            element.createDatetime = DateFormat.getDate();
                        } else if (this.description === 'OIRASCNT') {
                            element.createDatetime = null;
                        } else {
                            element.createDatetime = DateFormat.getDate();
                        }
                    }
                    if (element.parameterName === 'ACNT_C') {
                        this.formDataFlag = true;
                    }
                    if (element.parameterName === 'DATE_B') {
                        this.lovDataFlag = true;
                    }
                    if (element.parameterType === 'LOV') {
                        const accodeResult = this.osureporFactory.getLovOtrbstat(element.parameterName,this.sessionManager.currentCaseLoad);
                        accodeResult.subscribe(data => {
                            if (data.length > 0) {
                                if(element.moduleName === 'OTRBSTAT' && (element.parameterName === 'P_INCLUDE_BAD_ADDRESS'|| element.parameterName === 'P_INCLUE_DO_NOT_PRINT_STATEMENT')) {
                                 element['code'] = 'N';
                               } else  if(element.moduleName === 'OTRBSTAT' && (element.parameterName === 'P_AOS_IN_OUT')) {
                                element['code'] = undefined;
                              } else {
                                element['code'] = data[0].code;
                               }
                            }
                        });
                    }
                });
                this.omsmpData = offpaResultList;
                this.omsmpModel = offpaResultList[0];
                this.clearDisable = false;
                this.checkBoxDisabled = false;
                this.submitReadOnly = false;
                this.copyData = 1;
            }
        });
    }
    allowNumbers(event) {
    }
    onButOutputTypeclick() {
    }
    onRowClickomsmp(event) {
    }
    ok() {
    }
    no() {
    }
    cancel() {
        this.omsmpData = [];
        this.clearDisable = true;
        this.checkBoxDisabled = true;
        this.copiesReadOnly = true;
        this.submitReadOnly = true;
        this.ynFlag = false;
        this.description = null;
        this.copyData = null;
        this.startDate = false;
        this.endDate = false;
        this.indTrans = false;
        this.pDate = false;
        this.lovDataFlag = false;
        this.formDataFlag = false;
        this.moduleName = null;
        this.otrtastaData = [];
    }
    onOffenderChange(offender) {
    }
    setDescription(event) {
        if (event && event.code) {
            this.moduleName = null;
            this.startDate = false;
            this.endDate = false;
            this.pDate = false;
            this.formDataFlag = false;
            this.lovDataFlag = false;
            this.indTrans = false;
            this.description = event.description;
            this.omsmpModel.moduleName = event.code;
            this.moduleName = event.code;
            this.oidpidenpaExecuteQuery();
        }
    }

    onkeyDown(event, paramType) {
        if (this.moduleName !== 'OTRBSTAT') {
            if (paramType === 'INTEGER' && (event.key === '.' || event.key === '0')) {
                event.stopPropagation();
                return false;
            } else if (paramType === 'NUMBER' && event.key === '0') {
                event.stopPropagation();
                return false;
            }
        }
    }
    numberBlurEvent(paramName,event) {
        if (this.moduleName === 'OTRBSTAT') {
            if (paramName === 'P_LOWER_LIMIT') {
                this.amountFormat.precisionFlot(event);
            } else if (paramName === 'P_UPPER_LIMIT') {
                this.amountFormat.precisionFlot(event);
            }
        }
    }
    checkboxChange(event) {
        if (!event) {
            this.copiesReadOnly = true;
            this.copyData = 1;
        } else {
            this.copiesReadOnly = false;
        }
    }
    submitButtonData() {
        if (this.description === 'Balance Sheet Trust') {

        }
        if (this.offIdValid && this.description === 'Trust Acct Statement Single') {
            this.show('common.idmustbeentered');
            return;
        }
        if (this.formDataFlag) {
            this.show('osurepor.fieldbankaccountcodemustbeentered');
            return;
        } else if (this.lovDataFlag) {
            this.show('osurepor.fieldlastreconciliationdatemustbeentered');
            return;
        } else if (this.startDate) {
            this.show('osurepor.fieldstartingdatemustbeentered');
            return;
        } else if (this.endDate) {
            this.show('osurepor.fieldendingdatemustbeentered');
            return;
        } else if (this.pDate) {
            this.show('osurepor.fielddatemustbeentered');
            return;
        } else if (this.indTrans) {
            this.show('osurepor.fieldincludetransactiondescriptionynmustbeentered');
            return;
        } else if (this.description === 'Balance Sheet Trust') {
            this.flag = this.omsmpData[1]['description'];
            this.userDate = this.omsmpData[0]['createDatetime'];
            const datetoLong = DateFormat.format(this.userDate);
            const date = DateFormat.getDate(this.omsmpData[0]['createDatetime']);
            if (DateFormat.compareDate(date, DateFormat.getDate()) > 0) {
                this.show('osurepor.datemustbethecurrentorpastdate');
                return;
            }
            if (!this.flag) {
                this.flag = '';
            }
            const report = this.osureporFactory.getReport(this.sessionManager.currentCaseLoad, datetoLong, this.flag);
            report.subscribe(data => {
                if (data && data.length > 0 && data[0].report) {
                    const base64pdf = 'data:application/pdf;base64,';
                    const pdf = base64pdf + data[0].report;
                    const win = window.open(pdf);
                    win.document.writeln(`<iframe src="${pdf}" style="width:100%; height:100%"></iframe>`);
                }
            });

        } else if (this.description === 'Bank Reconciliation Rep Trust') {
            this.accountCode = this.omsmpData[0]['description'];
            this.lovData = this.omsmpData[1]['code'];
            this.userDate = this.lovData;
            // this.datetoLong = this.userDate.getTime();
            if (this.flag === null || this.flag === undefined) {
                this.flag = 'N';

            }
            const report = this.osureporFactory.getBankReconciliationReport(this.accountCode, this.userDate,
                this.sessionManager.currentCaseLoad);
            report.subscribe(data => {
                if (data && data.length > 0 && data[0].report) {
                    const base64pdf = 'data:application/pdf;base64,';
                    const pdf = base64pdf + data[0].report;
                    const win = window.open(pdf);
                    win.document.writeln(`<iframe src="${pdf}" style="width:100%; height:100%"></iframe>`);
                }
            });

        } else if (this.description === 'Trust Acct Statement Single') {
            const fieldsData = {};
            if (this.omsmpData[1] && this.omsmpData[1]['sealFlag']) {
                fieldsData['subAccountType'] = this.omsmpData[1]['sealFlag'];
            }
            if (this.omsmpData[2] && this.omsmpData[2]['createDatetime']) {
                fieldsData['beginDate'] = this.omsmpData[2]['createDatetime'];
            }
            if (this.omsmpData[3] && this.omsmpData[3]['createDatetime']) {
                fieldsData['endDate'] = this.omsmpData[3]['createDatetime'];
            }
            const bDate = DateFormat.getDate(fieldsData['beginDate']);
            const eDate = DateFormat.getDate(fieldsData['endDate']);
            if (DateFormat.compareDate(bDate, DateFormat.getDate()) > 0) {
                this.show('osurepor.startingdatemustbethecurrentorpastdate');
                return;
            }
            if (DateFormat.compareDate(bDate, eDate) > 0) {
                this.show('osurepor.endingdatemustbegreaterthanstartingdate');
                return;
            }
            if (this.omsmpData[4] && this.omsmpData[4]['description']) {
                fieldsData['disclosureFlag'] = this.omsmpData[4]['description'];
            }
            if (this.omsmpData[5] && this.omsmpData[5]['description']) {
                fieldsData['caseloadId'] = this.omsmpData[5]['description'];
            }
            fieldsData['fDateOne'] = DateFormat.getDate();
            fieldsData['fUserOne'] = this.sessionManager.getId();
            const modelData = [];
            if (this.otrtastaData.length > 0) {
                this.otrtastaData.forEach(ele => {
                    const field = JSON.parse(JSON.stringify(fieldsData));
                    field.offenderId = ele.rootOffenderId;
                    modelData.push(field);
                });
            } else {
                const field = JSON.parse(JSON.stringify(fieldsData));
                modelData.push(field);
            }
            const accodeResult = this.oiufsoffFactory.vOffBkgExecuteQuery(this.voffbkgModel);
            accodeResult.subscribe(dataOne => {
                if (dataOne.length > 0) {
                    const report = this.otstastaFactory.mainReprtProcess(modelData);
                    report.subscribe(data => {
                        if (data && data.report) {
                            const base64pdf = 'data:application/pdf;base64,';
                            const pdf = base64pdf + data.report;
                            const win = window.open(pdf);
                            win.document.writeln(`<iframe src="${pdf}" style="width:100%; height:100%"></iframe>`);
                        } else if (data.errorMessage) {
                            this.show(data.errorMessage);
                        }
                        this.omsmpData = [];
                        this.clearDisable = true;
                        this.checkBoxDisabled = true;
                        this.copiesReadOnly = true;
                        this.submitReadOnly = true;
                        this.ynFlag = false;
                        this.description = null;
                        this.copyData = null;
                        this.startDate = false;
                        this.endDate = false;
                        this.indTrans = false;
                        this.pDate = false;
                        this.lovDataFlag = false;
                        this.formDataFlag = false;
                        this.moduleName = null;
                        this.otrtastaData = [];
                    });
                }
            });

        } else if (this.description === 'Print Trust Fund Receipts' || this.description === 'Disbursement Receipt') {
            const fieldsData = {};
            this.lovData = this.omsmpData[0]['code'];
            if ((this.omsmpData[0] && this.lovData) || (this.omsmpData[0] && this.omsmpData[0]['description'])) {
                if (this.lovData) {
                    fieldsData['activeFlag'] = this.lovData;
                }
                if (this.omsmpData[0]['description']) {
                    fieldsData['activeFlag'] = this.omsmpData[0]['description'];
                }
            } else {
                this.show('osurepor.fieldprintallnewreceiptsmustbeentered');
                return;
            }
            if (this.omsmpData[1] && this.omsmpData[1]['description']) {
                fieldsData['subAccountType'] = this.omsmpData[1]['description'];
            }
            if (this.description === 'Disbursement Receipt') {
                this.prefixFieldFlag = false;
                if (this.omsmpData.length > 0) {
                    this.omsmpData.forEach(element => {
                        if (element.parameterName === "PREFIX") {
                            this.prefixFieldFlag = true;
                        }
                    });
                }
                if (this.omsmpData[1] && this.omsmpData[1]['description']) {
                    fieldsData['subAccountType'] = this.omsmpData[1]['description'];
                } else if (this.prefixFieldFlag) {
                    this.show('Field Prefix Code must be entered.');
                    return;
                }
            }
            if (this.omsmpData[2] && this.omsmpData[2]['serialVersionUID']) {
                fieldsData['nbtPersonIdOne'] = this.omsmpData[2]['serialVersionUID'];
            }
            if (this.omsmpData[3] && this.omsmpData[3]['serialVersionUID']) {
                fieldsData['nbtPersonIdTwo'] = this.omsmpData[3]['serialVersionUID'];
            }
            if ((this.omsmpData[4] && this.omsmpData[4]['serialVersionUID']) || this.omsmpData[4]['serialVersionUID'] === 0) {
                fieldsData['copies'] = this.omsmpData[4]['serialVersionUID'];
            } else {
                this.show('osurepor.fieldreceiptcopiesmustbeentered');
                return;
            }
            if (this.omsmpData[5] && this.omsmpData[5]['description']) {
                fieldsData['agyLocId'] = this.omsmpData[5]['description'];
            }
            if (this.omsmpData[6] && this.omsmpData[6]['description']) {
                fieldsData['caseloadId'] = this.omsmpData[6]['description'];
            }
            if (this.omsmpData[7] && this.omsmpData[7]['description']) {
                fieldsData['createUserId'] = this.omsmpData[7]['description'];
            }
            fieldsData['txnUsage'] = this.description === 'Disbursement Receipt' ? 'D' : 'R';
            fieldsData['caseloadType'] = this.sessionManager.currentCaseLoadType;
            const report = this.otsreceiFactory.getReport(fieldsData);
            report.subscribe(data => {
                if (data && data.report) {
                    const base64pdf = 'data:application/pdf;base64,';
                    const pdf = base64pdf + data.report;
                    const win = window.open(pdf);
                    win.document.writeln(`<iframe src="${pdf}" style="width:100%; height:100%"></iframe>`);
                } else if (data.errorMessage) {
                    this.show(data.errorMessage);
                }
            });
        }  else if (this.description === 'Billing Statement Report' || this.description === 'Summary Statement Report') {
            const fieldsData = {};
            fieldsData['moduleName'] = this.moduleName;
           
            if (this.omsmpData[1] && this.omsmpData[1]['sealFlag']) {
                fieldsData['subAccountType'] = this.omsmpData[1]['sealFlag'];
            }
            if (this.omsmpData[2] && this.omsmpData[2]['code']) {
                fieldsData['beginDate'] = this.omsmpData[2]['code'];
            }
            if (this.omsmpData[3] && this.omsmpData[3]['code']) {
                fieldsData['toDate'] = this.omsmpData[3]['code'];
                //    fieldsData['endDate'] = DateFormat.parse(this.omsmpData[3]['code']);
            }
            const bDate = DateFormat.parse(fieldsData['beginDate']);
            const eDate = DateFormat.parse(fieldsData['toDate']);
            if (this.description === 'Billing Statement Report') {
                if ((this.omsmpData[0] && !this.omsmpData[0]['description']) && this.omsmpData[1] && !this.omsmpData[1]['code']) {
                    this.show('osurepor.aosinoutmustbeentered'); 
                    return;
                }
                if (this.omsmpData[1] && !this.omsmpData[1]['code'] && this.omsmpData[0] && !this.omsmpData[0]['description']) {
                    this.show('osurepor.aosidmustbeentered');
                    return;
                }
                if (this.omsmpData[6] && !this.omsmpData[6]['code']) {
                    this.show('osurepor.includebadaddressmustbeentered');
                    return;
                }
                if (this.omsmpData[7] && !this.omsmpData[7]['code']) {
                    this.show('osurepor.includedonotprintstatementmustbeentered');
                    return;
                }
                if (this.omsmpData[8] && !this.omsmpData[8]['code']) {
                    this.show('osurepor.pocaseloadmustbeentered');
                    return;
                }
                if(bDate === null ){
                    this.show('osurepor.frombillingcyclemustbeentered');
                    return;
                }
                if( eDate === null){
                    this.show('osurepor.tobillingcyclemustbeentered');
                    return;
                }
            }
            if(bDate !== null && eDate !== null){
                if (DateFormat.compareDate(bDate, DateFormat.getDate()) > 0) {
                    this.show('osurepor.startingdatemustbethecurrentorpastdate');
                    return;
                }
                if (DateFormat.compareDate(bDate, eDate) > 0) {
                    this.show('osurepor.endingdatemustbegreaterthanstartingdate');
                    return;
                }
            }
           
            if (this.omsmpData[4] && this.omsmpData[4]['description']) {
                fieldsData['disclosureFlag'] = this.omsmpData[4]['description'];
            }
            if (this.omsmpData[5] && this.omsmpData[5]['description']) {
                fieldsData['caseloadId'] = this.omsmpData[5]['description'];
            }
            if (this.omsmpData[8] && this.omsmpData[8]['code']) {
                if(this.omsmpData[8]['code'] !== 'ALL PO Caseloads within the logged in Elite Caseload'){
                    fieldsData['poCaseload'] = this.sessionManager.currentCaseLoad;
                } else{
                    fieldsData['poCaseload'] = undefined;
                }
            }
            if (this.omsmpData[4] && this.omsmpData[4]['serialVersionUID']) {
                fieldsData['lowerLimit'] = this.omsmpData[4]['serialVersionUID'];
            }
            if (this.omsmpData[5] && this.omsmpData[5]['serialVersionUID']) {
                fieldsData['upperLimit'] = this.omsmpData[5]['serialVersionUID'];
            }
            if (this.omsmpData[6] && this.omsmpData[6]['code']) {
                fieldsData['address'] = this.omsmpData[6]['code'];
            }
            if (this.omsmpData[1] && this.omsmpData[1]['code']) {
                fieldsData['inOutStatus'] = this.omsmpData[1]['code'];
            }
            if (this.omsmpData[4] && this.omsmpData[4]['serialVersionUID'] && this.omsmpData[5] && this.omsmpData[5]['serialVersionUID']) {
              if(this.omsmpData[5]['serialVersionUID'] < this.omsmpData[4]['serialVersionUID']){
                this.show('Parameter value cannot be less than the value for Lower Limit');
                return;
              }
            }
             fieldsData['caseloadId'] = this.sessionManager.currentCaseLoad;
            fieldsData['fDateOne'] = DateFormat.getDate();
            fieldsData['nbtModifyUserId'] = this.sessionManager.getId();
            const modelData = [];
            if (this.otrtastaData.length > 0 ) {
                this.otrtastaData.forEach(ele => {
                    const field = JSON.parse(JSON.stringify(fieldsData));
                    
                    field.caseloadId = this.sessionManager.currentCaseLoad;
                    field.agyLocId = ele.agyLocId;
                   
                    field.moduleName = this.omsmpData[0].moduleName;
                    if (this.moduleName === 'OTRBSTAT' && (this.omsmpData[0] && !this.omsmpData[0]['description']) && this.omsmpData[1] && this.omsmpData[1]['code']) {
                        field.offenderBookId = undefined;;
                        field.offenderId = undefined;
                    } else {
                        field.offenderBookId = ele.offenderBookId;
                        field.offenderId = ele.rootOffenderId;
                    }
                    modelData.push(field);
                });
            } else {
                const field = JSON.parse(JSON.stringify(fieldsData));
                modelData.push(field);
            }
            const report = this.osureporFactory.getReportOtrbstat(modelData);
            report.subscribe(data => {
                if (data && data.report) {
                    const base64pdf = 'data:application/pdf;base64,';
                    const pdf = base64pdf + data.report;
                    const win = window.open(pdf);
                    win.document.writeln(`<iframe src="${pdf}" style="width:100%; height:100%"></iframe>`);
                } else if (data.errorMessage) {
                    this.show(data.errorMessage);
                }
            });
        
        } else {
            this.show('osurepor.unabletorunthereport');
            return;
        }

    }
    setDisable(event) {
        if (event === 'CASELOAD') {
            return true;
        } else {
            return false;
        }
    }
    show(vldmsg, type?) {
        type = type ? type : 'warn';
        vldmsg = this.translateService.translate(vldmsg);
        const msgval = [{ message: vldmsg, type: type }];
        this.msgs = [...msgval];
    }
    trMsg(msg, astr?) {
        return astr ? this.translateService.translate(msg).concat(astr) : this.translateService.translate(msg);
    }
    textBlurEvent(event, i) {
        this.indTrans = false;
        if ((event === 'ALL_FLAG' || event === 'IND_TRNS')
            && !['Y', 'N'].includes(this.omsmpData[i]['description']) &&
            this.omsmpData[i]['description']) {
            this.omsmpData[i]['description'] = 'Y';
            this.show('osurepor.youmustenteryorn');
            this.indTrans = false;
            return;
        } else if (event === 'IND_TRNS' && !this.omsmpData[i]['description']) {
            this.indTrans = true;
        } else if (event === 'P_ZEROFLAG' && !['N'].includes(this.omsmpData[i]['description']) &&
            this.omsmpData[i]['description']) {
            this.omsmpData[i]['description'] = 'N';
            this.show('osurepor.youmustentern');
            return;
        } else if(event === 'AOS_ID'&& event === 'OTRBSTAT' && this.omsmpData[0]['description']) {
            this.omsmpData[1]['code'] = undefined;
            // this.omsmpData[1]['commentText'] = 'N';
        }
    }

    isInd(event) {
        if (event === 'IND_TRNS') {
            return true;
        } else {
            return 'false';
        }
    }

    lovLink(data, caseload?, accCode?) {
        if (this.description === 'Print Trust Fund Receipts' || this.description === 'Disbursement Receipt') {
            return `osurepor/getDynamicLov?qry=${data.parameterLovSelect.replace(/\n/g, ' ')}` +
                `&caseload=${this.sessionManager.currentCaseLoad}&accCode=120`;
        }
        if (this.description === 'Billing Statement Report') {
            return `osurepor/getLovOtrbstat?parameterName=${data.parameterName}&caseloadId=${this.sessionManager.currentCaseLoad}`;
        }
        if (data && caseload && accCode) {
            if (data.parameterLovSelect) {
                return `osurepor/getDynamicLov?qry=${data.parameterLovSelect}&caseload=${caseload}&accCode=${accCode}`;
            }
        }
        return null;
    }

    textBoxBlurEvent(model, event, desc, moduleName, i) {
        if (moduleName) {
            if(event === 'AOS_ID' && desc){
                this.vHeaderBlockModel.caseLoadId = this.sessionManager.currentCaseLoad;
                this.vHeaderBlockModel.agyLocType = this.sessionManager.currentCaseLoadType;
                this.vHeaderBlockModel.offenderIdDisplay = desc;
                const voffbkgResult = this.oiuhofflFactory.vOffBkgExecuteQuery(this.vHeaderBlockModel);
                voffbkgResult.subscribe(voffbkgResultList => {
                    if (voffbkgResultList.length === 0) {
                        this.omsmpData[i]['description'] = null;
                        this.otrtastaData = [];
                    } else {
                        // voffbkgResultList.forEach(element => {
                        //     element.activeFlag = element.activeFlag === 'Y' ? true : false;
                        // });
                        // this.voffbkgData = voffbkgResultList;
                        this.voffbkgModel = voffbkgResultList[0];
                        this.omsmpData[1]['code'] = undefined;
                        this.omsmpData[i]['description'] =this.voffbkgModel.offenderIdDisplay;
                        this.voffbkgModel.pOffenderIdDisplay = this.omsmpData[i]['description'];
                        this.voffbkgModel.pCaseloadId = this.sessionManager.currentCaseLoad;
                        this.voffbkgModel.pActiveFlag = '';
                        this.otrtastaData = voffbkgResultList;
                    }
                });
            } else if (event === 'OFFENDER_ID' && desc) {
                this.offIdValid = false;
                if (desc) {
                    if (Number(String(desc).length) < 10) {
                        for (let j = Number(String(desc).length); j < 10; j++) {
                            desc = '0' + desc;
                            this.voffbkgModel.pOffenderIdDisplay = desc;
                            this.voffbkgModel.pCaseloadId = this.sessionManager.currentCaseLoad;
                            this.voffbkgModel.pReportApplnCode = this.omsmpData[i]['reportApplnCode'];
                            this.voffbkgModel.pActiveFlag = '';
                        }
                    } else {
                        this.voffbkgModel.pOffenderIdDisplay = desc;
                        this.voffbkgModel.pCaseloadId = this.sessionManager.currentCaseLoad;
                        this.voffbkgModel.pReportApplnCode = this.omsmpData[i]['reportApplnCode'];
                        this.voffbkgModel.pActiveFlag = '';
                    }
                    this.omsmpData[i]['description'] = desc;
                }
                const accodeResult = this.oiufsoffFactory.vOffBkgExecuteQuery(this.voffbkgModel);
                accodeResult.subscribe(data => {
                    if (data.length > 0) {
                        this.otrtastaData = data;
                    } else {
                        this.omsmpData[i]['description'] = null;
                        this.show('osurepor.thisoffenderdoesnothavetrustaccount');
                        this.offIdValid = true;
                        return;
                    }
                });
            } else if (desc) {
                this.offIdValid = false;
                this.accodeModel.caseloadId = this.sessionManager.currentCaseLoad;
                this.accodeModel.caseloadType = this.sessionManager.currentCaseLoadType;
                this.accodeModel.accountName = moduleName;
                this.accodeModel.accountCode = Number(desc);
                const accodeResult = this.otuacodeFactory.acCodeExecuteQuery(this.accodeModel);
                accodeResult.subscribe(data => {
                    this.accodeModel = new AccountCodes();
                    if (data.length === 0) {
                        if (event === 'ACNT_C' && !desc) {
                            this.formDataFlag = true;
                        } else {
                            this.formDataFlag = false;
                        }
                        this.omsmpData[i]['description'] = null;
                        this.show('osurepor.bankaccountcodeenteredcannotbefound');
                        return;
                    }
                });
            } else {
                this.offIdValid = true;
            }
            if (event === 'ACNT_C' && !desc) {
                this.formDataFlag = true;
            } else {
                this.formDataFlag = false;
            }
        }
    }
    readOnlyData(model) {
        if (model && model.options && model.options.length === 0) {
            if (this.description == 'Billing Statement Report') {
               this.omsmpData[0]['code'] = 'N';
                this.lovData = 'N';
            }
           // return true;
        }
        return false;
    }
    isInsertable(date, event, i) {
        if (event === 'START_DATE') {
            this.startDate = !(date);
        }
        if (event === 'END_DATE') {
            this.endDate = !(date);
        }
        if (event === 'P_DATE') {
            this.pDate = !(date);
        }
    }
    isLovModelChange(event, data) {
        if(event === 'P_AOS_IN_OUT' && data){
            this.omsmpData[0]['description'] =undefined;
        }
        if (event === 'DATE_B' && data.innerValue === null || data.innerValue == undefined) {
            this.lovDataFlag = true;
        } else {
            this.lovDataFlag = false;
        }
    }
    reportModelChange(description) {
        if (description) {
            this.clearDisable = false;
        } else {
            this.clearDisable = true;
        }
    }
    setFormDescription(event, i) {
        if (event) {
            if (event && (this.moduleName === 'OTRTASTA' || this.moduleName === 'OTRBSTAT'
            || this.moduleName === 'OTRSSTAT') && event.accountCode.length > 0) {
                this.otrtastaData = [];
                this.offIdValid = false;
                if (event.accountCode.length === 1) {
                    this.omsmpData[i]['description'] = event.accountCode[0].offenderIdDisplay;
                    this.voffbkgModel.pOffenderIdDisplay = this.omsmpData[i]['description'];
                    this.voffbkgModel.pCaseloadId = this.sessionManager.currentCaseLoad;
                    this.voffbkgModel.pActiveFlag = '';
                    this.otrtastaData = event.accountCode;
                    this.omsmpData[1]['code'] = undefined;
                    // this.omsmpData[1]['commentText'] = 'N';
                } else if (event.accountCode.length > 1) {
                    this.omsmpData[i]['description'] = 'MULTIPLE OFFENDERS SELECTED';
                    this.voffbkgModel.pOffenderIdDisplay = event.accountCode[0].offenderIdDisplay;
                    this.voffbkgModel.pCaseloadId = this.sessionManager.currentCaseLoad;
                    this.voffbkgModel.pActiveFlag = '';
                    this.otrtastaData = event.accountCode;
                    this.omsmpData[1]['code'] = undefined;
                    // this.omsmpData[1]['commentText'] = 'N';
                }
            } else if (event && this.moduleName === 'OTRBNRCN') {
                this.omsmpData[i]['description'] = event.accountCode;
                this.formDataFlag = false;
                this.otrtastaData = [];
            }
        } else {
            if (event && this.moduleName === 'OTRBNRCN') {
                this.formDataFlag = true;
            }
            this.omsmpData[i]['description'] = null;
            this.otrtastaData = [];
        }
    }
    setLaunchDisable(moduleName) {
        if (moduleName === 'OTRBNRCN' || moduleName === 'OTRTASTA' || moduleName === 'OTRBSTAT' || moduleName === 'OTRSSTAT') {
            return false;
        }  else {
            return true;
        }
    }
    msgShows(event) {
        if (event) {
            return 'This functionality is not yet implemented  as it is currently  out of scope';
        } else {
            return null;
        }
    }
    get lovTitles(): any {
        if (this.description === 'Print Trust Fund Receipts' || this.description === 'Disbursement Receipt') {
            return { 'domain': this.trMsg('osurepor.description'), 'code': this.trMsg('osurepor.code') };
        }
        return { 'description': this.trMsg('osurepor.description') };
    }
    onLovChange(event, index, value) {
        if (event && (event.parameterName === "P_FROM_BILLING_CYCLE" || event.parameterName === "P_TO_BILLING_CYCLE")) {
            if (!value) {
                this.omsmpData[index]['code'] = this.omsmpData[index]['code'] === '' ? undefined : '';
            }
        }

    }
}
