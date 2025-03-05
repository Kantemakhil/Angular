import {
    Component, OnInit, ViewChild
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OcmworksService } from '@inst/workflow/maintenance/service/ocmworks.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { Work } from '@inst/workflow/maintenance/beans/Work';
import { WorkIwpTemplate } from '@inst/workflow/maintenance/beans/WorkIwpTemplate';
import { WorkTrigger } from '@inst/workflow/maintenance/beans/WorkTrigger';
import { WorkFunction } from '@inst/workflow/maintenance/beans/WorkFunction';
import { WorkCommitBean } from '@inst/workflow/maintenance/beans/WorkCommitBean';
import { WorkIwpTemplateCommitBean } from '@inst/workflow/maintenance/beans/WorkIwpTemplateCommitBean';
import { WorkTriggerCommitBean } from '@inst/workflow/maintenance/beans/WorkTriggerCommitBean';
import { WorkFunctionCommitBean } from '@inst/workflow/maintenance/beans/WorkFunctionCommitBean';
import { InternetAddresses } from '@inst/demographics-biometrics/beans/InternetAddresses';
import { InternetAddressesCommitBean } from '@inst/demographics-biometrics/beans/InternetAddressesCommitBean';
import { ValidateRowReturn } from '@ui-components/grid/grid.component';
import { DateFormat } from '@ui-components/datepicker/dateFormat';

@Component({
    selector: 'app-ocmworks',
    templateUrl: './ocmworks.component.html'
})

export class OcmworksComponent implements OnInit {
    delDisabled = true;
    workDelFlag = false;
    retDelFlag = false;
    clrBtnFlag: boolean;
    retBtnflag: boolean;
    readeOnlyFields: boolean;
    gridemailInsBtn: boolean;
    gridDocInsBtn: boolean;
    wrkGridDelBtn: boolean;
    extSaveFlag: boolean;
    gridTrgInsBtn: boolean;
    griFunInsBtn: boolean;
    gridInsBtn: boolean;
    griddocDelBtn: boolean;
    gridTriggerDelBtn: boolean;
    gridFunDelBtn: boolean;
    gridemailDelBtn: boolean;
    emailreadonly: boolean;
    saveDisabled: boolean;
    emailSubject: string;
    emailBody: string;
    toflag: boolean;
    @ViewChild('typegrid') typegrid: any;
    @ViewChild('docsgrid') docsgrid: any;
    @ViewChild('triggergrid') triggergrid: any;
    @ViewChild('emailgrid') emailgrid: any;
    @ViewChild('fungrid') fungrid: any;
    msgs: any[] = [];
    nameOfLovPage: string;
    listToCompare: any[] = [];
    wfworktypesData: Work[] = [];
    wfworktypesRowData: Work[] = [];
    wfworktypesModel: Work = new Work();
    wfworktypesBean: Work = new Work();
    searchBean: Work = new Work();
    wfworktypesIndex = 0;
    wfworktypesInsertList: Work[] = [];
    wfworktypesUpdateList: Work[] = [];
    wfworktypesDeleteList: Work[] = [];
    wfworktypesCommitModel: WorkCommitBean = new WorkCommitBean();
    wfiwptemplatesData: WorkIwpTemplate[] = [];
    wfiwptemplatesRowData: WorkIwpTemplate[] = [];
    wfiwptemplatesModel: WorkIwpTemplate = new WorkIwpTemplate();
    wfiwptemplatesBean: WorkIwpTemplate = new WorkIwpTemplate();
    wfiwptemplatesIndex = 0;
    wfiwptemplatesInsertList: WorkIwpTemplate[] = [];
    wfiwptemplatesUpdateList: WorkIwpTemplate[] = [];
    wfiwptemplatesDeleteList: WorkIwpTemplate[] = [];
    wfiwptemplatesCommitModel: WorkIwpTemplateCommitBean = new WorkIwpTemplateCommitBean();
    wftriggersData: WorkTrigger[] = [];
    wftriggersRowData: WorkTrigger[] = [];
    wftriggersModel: WorkTrigger = new WorkTrigger();
    wftriggersBean: WorkTrigger = new WorkTrigger();
    wftriggersIndex = 0;
    wftriggersInsertList: WorkTrigger[] = [];
    wftriggersUpdateList: WorkTrigger[] = [];
    wftriggersDeleteList: WorkTrigger[] = [];
    wftriggersCommitModel: WorkTriggerCommitBean = new WorkTriggerCommitBean();
    wffunctionsData: WorkFunction[] = [];
    wffunctionsRowData: WorkFunction[] = [];
    wffunctionsModel: WorkFunction = new WorkFunction();
    wffunctionsBean: WorkFunction = new WorkFunction();
    wffunctionsIndex = 0;
    wffunctionsInsertList: WorkFunction[] = [];
    wffunctionsUpdateList: WorkFunction[] = [];
    wffunctionsDeleteList: WorkFunction[] = [];
    wffunctionsCommitModel: WorkFunctionCommitBean = new WorkFunctionCommitBean();
    wfemailrecipientsData: InternetAddresses[] = [];
    wfemailrecipientsRowData: InternetAddresses[] = [];
    wfemailrecipientsModel: InternetAddresses = new InternetAddresses();
    wfemailrecipientsBean: InternetAddresses = new InternetAddresses();
    wfemailrecipientsIndex = 0;
    wfemailrecipientsInsertList: InternetAddresses[] = [];
    wfemailrecipientsUpdateList: InternetAddresses[] = [];
    wfemailrecipientsDeleteList: InternetAddresses[] = [];
    workUpdateList: Work[] = [];
    workDeleteList: Work[] = [];
    workBean: Work = new Work();
    wfemailrecipientsCommitModel: InternetAddressesCommitBean = new InternetAddressesCommitBean();
    wfemailreturnData: InternetAddresses[] = [];
    wfemailreturnDataTemp: InternetAddresses[] = [];
    wfemailreturnModel: InternetAddresses = new InternetAddresses();
    wfemailreturnIndex = 0;
    wfemailreturnInsertList: InternetAddresses[] = [];
    wfemailreturnUpdateList: InternetAddresses[] = [];
    wfemailreturnDeleteList: InternetAddresses[] = [];
    wfemailreturnCommitModel: InternetAddressesCommitBean = new InternetAddressesCommitBean();
    wfworkemailData: Work[] = [];
    wfworkemailDataTemp: Work[] = [];
    wfworkemailModel: Work = new Work();
    wfworkemailIndex = 0;
    wfworkemailInsertList: Work[] = [];
    wfworkemailUpdateList: Work[] = [];
    wfworkemailDeleteList: Work[] = [];
    wfworkemailCommitModel: WorkCommitBean = new WorkCommitBean();
    recipientStaffColumnDef: any[];
    wfEmailRecipientsColumnDef: any[];
    crPrfRcColumnDef: any[];
    crPrfXgColumnDef: any[];
    wfFunctionsColumnDef: any[];
    wfIwpTemplatesColumnDef: any[];
    wfWorkTypesColumnDef: any[];
    recipientTeamsColumnDef: any[];
    wfTriggersColumnDef: any[];
    crPrfAgColumnDef: any[];
    crPrfGdColumnDef: any[];
    crPrfIgColumnDef: any[];
    crPrfFaColumnDef: any[];
    selectedTabIndex: number;
    caseNoteText: string;
    lovTitles = {
        'templateName': this.translateService.translate('ocmworks.template'),
        'description': this.translateService.translate('common.description')
    };
    constructor(private ocmWorkFactory: OcmworksService, public translateService: TranslateService
        , public sessionManager: UserSessionManager) {
        this.recipientStaffColumnDef = [];
        this.wfEmailRecipientsColumnDef = [];
        this.crPrfRcColumnDef = [];
        this.crPrfXgColumnDef = [];
        this.wfFunctionsColumnDef = [];
        this.wfIwpTemplatesColumnDef = [];
        this.wfWorkTypesColumnDef = [];
        this.recipientTeamsColumnDef = [];
        this.wfTriggersColumnDef = [];
        this.crPrfAgColumnDef = [];
        this.crPrfGdColumnDef = [];
        this.crPrfIgColumnDef = [];
        this.crPrfFaColumnDef = [];
    }
    ngOnInit() {
        this.wfWorkTypesColumnDef = [
            {
                fieldName: this.translateService.translate('ocmworks.itemtype') + this.translateService.translate('common.mandatory')
                , field: 'workflowType', editable: true, width: 150,
                datatype: 'lov', domain: 'ALERT_TASK', cellEditable: this.canCellEdit
            },
            { fieldName: this.translateService.translate('common.agencytype'), field: 'caseloadType', editable: true, width: 150,
             datatype: 'lov', domain: 'CLOAD_TYPE' },
            {
                fieldName: this.translateService.translate('common.type1'), field: 'workType', editable: true, width: 150,
                datatype: 'lov',domain:'TASK_TYPE'/* link: 'ocmworks/rgWorkTypeRecordGroup'*/, cellEditable: this.canCellEdit
            },
            {
                fieldName: this.translateService.translate('common.subtype') + this.translateService.translate('common.mandatory'), field: 'workSubType',
                editable: true, width: 150, datatype: 'lov',domain:'TASK_SUBTYPE', cellEditable: this.canCellEdit
            },
            {
                fieldName: this.translateService.translate('ocmworks.screenaccess'), field: 'moduleName', editable: true,
                width: 150, datatype: 'lov', link: 'ocmworks/rgModulesRecordGroup',
                titles: {
                    description: this.translateService.translate('common.module'),
                    code: this.translateService.translate('ocmworks.screen')
                }
            },
            {
                fieldName: this.translateService.translate('ocmworks.usercomplete'), field: 'manualCloseFlag', editable: true,
                width: 150, datatype: 'checkbox'
            },
            {
                fieldName: this.translateService.translate('ocmworks.manualselect'), field: 'manualSelectFlag', editable: true, width: 150,
                datatype: 'checkbox'
            },
            {
                fieldName: this.translateService.translate('common.active'), field: 'activeFlag', editable: true, width: 150,
                datatype: 'checkbox'
            },
            { fieldName: this.translateService.translate('common.expirydate'), field: 'expiryDate', editable: false, width: 150, datatype: 'date' },
            { fieldName: '', field: 'caseNoteText', editable: false, width: 150, hide: true },
        ];
        this.wfIwpTemplatesColumnDef = [
            {
                fieldName: this.translateService.translate('ocmworks.attachedtemplates'), field: 'templateIdVal', editable: true,
                width: 150, datatype: 'lov', link: 'ocmworks/rgTemplatesRecordGroup', cellEditable: this.attachedTemplateCellEdit,
                titles: {
                    'templateName': this.translateService.translate('ocmworks.template'),
                    'description': this.translateService.translate('common.description')
                }
            },
            { fieldName: this.translateService.translate('common.active'), field: 'activeFlag', editable: true, width: 150, datatype: 'checkbox' },
            { fieldName: this.translateService.translate('common.expirydate'), field: 'expiryDate', editable: false, width: 150, datatype: 'date' },
        ];
        this.wfTriggersColumnDef = [
            {
                fieldName: this.translateService.translate('ocmworks.triggername'), field: 'triggerName', editable: true, width: 150,
                datatype: 'lov', domain: 'WORK_TRIGGER',cellEditable: this.attachedTemplateCellEdit
            },
            {
                fieldName: this.translateService.translate('ocmworks.days'), field: 'days', editable: true, width: 150,
                datatype: 'number', maxValue: 999999, whole: true
            },
            {
                fieldName: this.translateService.translate('ocmworks.due'), field: 'due', editable: true, width: 150,
                datatype: 'number', maxValue: 999999, whole: true
            },
            { fieldName: this.translateService.translate('common.active'), field: 'activeFlag', editable: true, width: 150, datatype: 'checkbox' },
            { fieldName: this.translateService.translate('common.expirydate'), field: 'expiryDate', editable: false, width: 150, datatype: 'date' },
        ];
        this.wfFunctionsColumnDef = [
            {
                fieldName: this.translateService.translate('ocmworks.function'), field: 'functionType', editable: true, width: 150,
                datatype: 'lov', domain: 'FUNCTION', cellEditable: this.canFunctionEdit
            },
            { fieldName: '', field: 'test', editable: false, width: 10, hide: true },
        ];
        this.wfEmailRecipientsColumnDef = [
            {
                fieldName: this.translateService.translate('ocmworks.toaddress'), field: 'internetAddress', editable: true, width: 150,
                datatype: 'email'
            },
            {
                fieldName: this.translateService.translate('ocmworks.to'), field: 'emailTo', editable: true, width: 150,
                datatype: 'checkbox'
            },
            {
                fieldName: this.translateService.translate('ocmworks.cc'), field: 'emailCc', editable: true,
                width: 150, datatype: 'checkbox'
            },
            {
                fieldName: this.translateService.translate('ocmworks.bcc'), field: 'emailBcc', editable: true, width: 150,
                datatype: 'checkbox'
            },
            { fieldName: '', field: 'internetAddressClass', editable: false, width: 10, hide: true },
        ];
        this.ocmWorkexecuteQuery();
    }

    onLovChange () {
        if (!this.searchBean.workType) {
            this.searchBean.workType = this.searchBean.workType === '' ? undefined : '';
        }
        if (!this.searchBean.workSubType) {
            this.searchBean.workSubType = this.searchBean.workSubType === '' ? undefined : '';
        }
        if (!this.searchBean.caseloadType) {
            this.searchBean.caseloadType = this.searchBean.caseloadType === '' ? undefined : '';
        }
        if (!this.searchBean.workflowType) {
            this.searchBean.workflowType = this.searchBean.workflowType === '' ? undefined : '';
        }
        if (!this.searchBean.moduleName) {
            this.searchBean.moduleName = this.searchBean.moduleName === '' ? undefined : '';
        }
    }
    /*
  *  This event is used to do the validations in the Grid in WorkItems Block.
  */
    canCellEdit = (data: any, index: number, field: string): boolean => {
        if (data.workId && (field === 'workflowType' || field === 'workType' || field === 'workSubType')) {
            return false;
        }
        return true;
    }
    /*
   *  This event is used to do the validations in the Grid in Functions Block.
   */
    canFunctionEdit = (data: any, index: number, field: string): boolean => {
        if (data.workId && field === 'functionType') {
            return false;
        }
        return true;
    }

   attachedTemplateCellEdit = (data: any, index: number, field: string): boolean => {
        if (data.createDatetime) {
            return false;
        }
        return true;
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
    onRowClickwfworktypes(event) {
        if (event) {
            this.wfworktypesModel = event;
            this.caseNoteText = this.wfworktypesModel.caseNoteText;
            if (this.wfworktypesModel.workId) {
                this.wfiwptemplatesExecuteQuery();
                this.wftriggersExecuteQuery();
                this.wffunctionsExecuteQuery();
                if (this.wfworktypesModel.workflowType === 'EMAIL') {
                    this.wfworktypesBean = this.wfworktypesModel;
                    const subject = this.wfworktypesModel.emailSubject;
                    const body = this.wfworktypesModel.emailBody;
                    if (this.wfworktypesModel.emailSubject || this.wfworktypesModel.emailBody) {
                        // this.delDisabled = false;
                        }
                    this.emailSubject = subject;
                    this.emailBody = body;
                    this.wfemailrecipientsExecuteQuery();
                    this.wfemailreturnExecuteQuery();
                    this.saveDisabled = false;
                    this.emailreadonly = false;
                } else {
                    this.emailSubject = undefined;
                    this.emailBody = undefined;
                    this.wfemailrecipientsData = [];
                    this.wfemailrecipientsModel = new InternetAddresses();
                    this.wfemailreturnData = [];
                    this.wfemailreturnModel = new InternetAddresses();
                    this.wfworktypesBean = new Work();
                    this.delDisabled = true;
                    this.saveDisabled = true;
                    this.emailreadonly = true;
                }
            } else {
                this.emailSubject = undefined;
                this.emailBody = undefined;
                this.wfemailrecipientsData = [];
                this.wfemailrecipientsModel = new InternetAddresses();
                this.wfemailreturnData = [];
                this.wfemailreturnModel = new InternetAddresses();
                this.wfworktypesBean = new Work();
                this.wftriggersData = [];
                this.wffunctionsData = [];
                this.wfiwptemplatesData = [];
                this.delDisabled = true;
                this.saveDisabled = true;
                this.emailreadonly = true;
            }
        } else {
            this.saveDisabled = true;
            this.emailreadonly = true;
        }
    }
    onRowClickwfiwptemplates(event) {
        if (event) {
            this.wfiwptemplatesBean = event;
        }
    }
    onRowClickwftriggers(event) {
        if (event) {
            this.wftriggersBean = event;
        }
    }
    onRowClickwffunctions(event) {
        if (event) {
            this.wffunctionsBean = event;
        }
    }
    onRowClickwfemailrecipients(event) {
        if (event) {
            this.wfemailrecipientsBean = event;
        }
    }
    allowNumbers(event) {
    }
    ok() {
    }
    no() {
    }
    cancel() {
    }
    whenTabChangedTrigger(event) {
        this.selectedTabIndex = event.index;
        if (this.selectedTabIndex === 0 && this.wfworktypesModel.workId) {
            if (this.wfworktypesModel.workflowType === 'EMAIL') {
                this.show(this.translateService.translate('ocmworks.emailrecordscannothavedocumentsassociatedwiththem'), 'warn');
            }
        } else if (this.selectedTabIndex === 1 && this.wfworktypesModel.workId) {
        } else if (this.selectedTabIndex === 2 && this.wfworktypesModel.workId) {
            if (this.wfworktypesModel.workflowType === 'CNOTE') {
                this.show(this.translateService.translate('ocmworks.casenoterecordscannothavefunctionsassociatedwiththem'), 'warn');
            } else if (this.wfworktypesModel.workflowType === 'EMAIL') {
                this.show(this.translateService.translate('ocmworks.emailrecordscannothavefunctionsassociatedwiththem'), 'warn');
            }
        } else if (this.selectedTabIndex === 3 && this.wfworktypesModel.workId) {
            if (this.wfworktypesModel.workflowType === 'CNOTE' || this.wfworktypesModel.workflowType === 'TASK' ||
                this.wfworktypesModel.workflowType === 'MEMO') {
                this.show(this.translateService.translate('ocmworks.casenotetaskandmemrecordscannothaveemailsassociatedwiththem'), 'warn');
            }
        }
    }
    onButClear () {
        this.wfworktypesModel = new Work();
        this.searchBean = new Work();
        this.wfworktypesData = [];
        this.wfiwptemplatesData = [];
        this.wftriggersData =[];
        this.wffunctionsData = [];
        this.wfemailrecipientsData = [];
        this.wfemailreturnModel = new InternetAddresses();
        this.emailSubject = undefined;
        this.emailBody = undefined;
        this.delDisabled = true;
        this.workDelFlag = false;
        this.retDelFlag = false;
    }
    // execute query
    ocmWorkexecuteQuery() {
        this.wfworktypesModel = new Work();
//        if (this.searchBean.workflowType || this.searchBean.caseloadType || this.searchBean.workType ||
//            this.searchBean.workSubType || this.searchBean.moduleName) {
//                this.wfworktypesModel = this.searchBean;
//        }
        const serviceObj = this.ocmWorkFactory.
            wfWorkTypesExecuteQuery(this.wfworktypesModel);
        serviceObj.subscribe(data => {
            if (data.length === 0) {
                this.wfworktypesIndex = -1;
                this.show(this.translateService.translate('common.querycaused'));
                this.searchBean =  new Work();
            } else {
                data.forEach(elemnt => {
                    elemnt.manualCloseFlag = elemnt.manualCloseFlag === 'Y' ? true : false;
                    elemnt.manualSelectFlag = elemnt.manualSelectFlag === 'Y' ? true : false;
                    elemnt.activeFlag = elemnt.activeFlag === 'Y' ? true : false;
                });
                this.wfworktypesData = data;
                this.wfworktypesIndex = 0;
            }
        });
    }

    /**
     *  This function will be executed when commit event is
    * fired
    */
    ocmWorkSavewfworktypesForm(event) {
        this.wfworktypesInsertList = [];
        this.wfworktypesUpdateList = [];
        this.wfworktypesDeleteList = [];
        this.wfworktypesInsertList = event.added;
        this.wfworktypesUpdateList = event.updated;
        this.wfworktypesDeleteList = event.removed;
        this.wfworktypesCommitModel.insertList = [];
        this.wfworktypesCommitModel.updateList = [];
        this.wfworktypesCommitModel.deleteList = [];
        if (this.wfworktypesInsertList.length > 0 || this.wfworktypesUpdateList.length > 0) {
            for (let i = 0; i < this.wfworktypesInsertList.length; i++) {
                if (this.workTypeValidationEvent(this.wfworktypesInsertList[i])) {
                    return;
                }
                this.wfworktypesInsertList[i].activeFlag = this.wfworktypesInsertList[i].activeFlag ? 'Y' : 'N';
                this.wfworktypesInsertList[i].manualCloseFlag = this.wfworktypesInsertList[i].manualCloseFlag ? 'Y' : 'N';
                this.wfworktypesInsertList[i].manualSelectFlag = this.wfworktypesInsertList[i].manualSelectFlag ? 'Y' : 'N';
            }
            for (let i = 0; i < this.wfworktypesUpdateList.length; i++) {
                if (this.workTypeValidationEvent(this.wfworktypesUpdateList[i])) {
                    return;
                }
                this.wfworktypesUpdateList[i].activeFlag = this.wfworktypesUpdateList[i].activeFlag ? 'Y' : 'N';
                this.wfworktypesUpdateList[i].manualCloseFlag = this.wfworktypesUpdateList[i].manualCloseFlag ? 'Y' : 'N';
                this.wfworktypesUpdateList[i].manualSelectFlag = this.wfworktypesUpdateList[i].manualSelectFlag ? 'Y' : 'N';
            }
            this.wfworktypesCommitModel.insertList = this.wfworktypesInsertList;
            this.wfworktypesCommitModel.updateList = this.wfworktypesUpdateList;
        }
        if (this.wfworktypesDeleteList.length > 0) {
            for (let i = 0; i < this.wfworktypesDeleteList.length; i++) {
                if (this.wfworktypesDeleteList[i].casenoteFlag > 0) {
                    this.show(this.translateService.translate('ocmworks.youcannotdeletetheselectedrecord'), 'warn');
                    this.searchBean =  new Work();
                    this.ocmWorkexecuteQuery();
                    return;
                }
            }
            this.wfworktypesCommitModel.deleteList = this.wfworktypesDeleteList;
        }
        const wfworktypesSaveData = this.ocmWorkFactory.wfWorkTypesCommit(this.wfworktypesCommitModel);
        wfworktypesSaveData.subscribe(data => {
            if (data !== undefined && data.sealFlag === 'success') {
                this.show(this.translateService.translate('common.addupdateremoverecordsuccess'), 'success');
                this.searchBean =  new Work();
                this.ocmWorkexecuteQuery();
            } else if (data.sealFlag.indexOf('WORKS_PK') > 0) {
                this.show(this.translateService.translate('ocmworks.rowexistsalreadywithsametypeworktypeandsubtype'), 'warn');
                this.searchBean =  new Work();
                this.ocmWorkexecuteQuery();
            } else if (data.sealFlag.indexOf('WORKS_UK') > 0) {
                this.show(this.translateService.translate('ocmworks.rowexistsalreadywithsameworkitemtypetypeandsubtype'), 'warn');
                this.searchBean =  new Work();
                this.ocmWorkexecuteQuery();
            } else if (data !== undefined && data.sealFlag === '2') {
                this.show(this.translateService.translate('ocmworks.youcannotdeletetheselectedrecord'), 'warn');
                this.searchBean =  new Work();
                this.ocmWorkexecuteQuery();
            } else if (data !== undefined && data.sealFlag === 'templateCount') {
                this.show(this.translateService.translate('ocmworks.cannotdeletecasenotetypesubtypewhenmatchingtemplatedetailsexist'), 'warn');
                this.searchBean = new Work();
                this.ocmWorkexecuteQuery();
                return;
            } else if (data !== undefined && data.sealFlag === 'triggerCount') {
                this.show(this.translateService.translate('ocmworks.cannotdeletecasenotetypesubtypewhenmatchingtriggerdetailsexist'),
                'warn');
                this.searchBean = new Work();
                this.ocmWorkexecuteQuery();
                return;
            } else if (data !== undefined && data.sealFlag === 'functionCount') {
                this.show(this.translateService.translate('ocmworks.cannotdeletecasenotetypesubtypewhenmatchingfunctiondetailsexist'),
                 'warn');
                this.searchBean = new Work();
                this.ocmWorkexecuteQuery();
                return;
            } else if (data !== undefined && data.sealFlag === 'emailRecipientsCount') {
                this.show(this.translateService.
                    translate('ocmworks.cannotdeletecasenotetypesubtypewhenmatchingemailrecipientsdetailsexist'), 'warn');
                this.searchBean = new Work();
                this.ocmWorkexecuteQuery();
                return;
            } else if (data !== undefined && data.sealFlag === 'emailReturnCount') {
                this.show(this.translateService.
                    translate('ocmworks.cannotdeletecasenotetypesubtypewhenmatchingreturnemaildetailsexist'));
                this.searchBean = new Work();
                this.ocmWorkexecuteQuery();
                return;
            } else {
                this.show(this.translateService.translate('common.addupdateremoverecordfailed'), 'error');
            }
        });
    }
    workTypeValidationEvent(event) {
        if (!event.workflowType) {
            this.show(this.translateService.translate('ocmworks.itemtypemusetbeentered'), 'warn');
            return true;
        }
        if (!event.workType) {
            this.show(this.translateService.translate('common.typemustbeentereddot'), 'warn');
            return true;
        }
        if (!event.workSubType) {
            this.show(this.translateService.translate('ocmworks.subtypemusetbeentered'), 'warn');
            return true;
        }
    }
    onGridWorkTypeInsert = () => {
        this.wfworktypesRowData = [];
        this.typegrid.addedMap.forEach(
            (v: any, k: number) => {
                this.wfworktypesRowData.push(v);
            }
        );
        this.typegrid.updatedMap.forEach(
            (v: any, k: number) => {
                this.wfworktypesRowData.push(v);
            }
        );
        for (let i = 0; i < this.wfworktypesRowData.length; i++) {
            if (this.workTypeValidationEvent(this.wfworktypesRowData[i])) {
                return;
            }
        }
        return { activeFlag: true, manualCloseFlag: true, manualSelectFlag: true };
    }
    get gridDisFlag() {
        if (!this.wfworktypesModel.workId) {
            this.wrkGridDelBtn = false;
            this.gridDocInsBtn = false;
            this.gridemailInsBtn = false;
            this.gridTrgInsBtn = false;
            this.griFunInsBtn = false;
            this.gridInsBtn = false;
        } else {
            this.wrkGridDelBtn = true;
            this.gridInsBtn = true;
            this.griFunInsBtn = true;
            this.gridDocInsBtn = true;
        }
        if (this.wfworktypesModel.workflowType === 'EMAIL') {
            this.gridDocInsBtn = false;
            this.gridemailInsBtn = true;
            this.gridTrgInsBtn = false;
        } else {
            this.gridemailInsBtn = false;
            this.gridTrgInsBtn = true;
        }
        if (this.wfworktypesModel.workflowType === 'EMAIL' || this.wfworktypesModel.workflowType === 'CNOTE') {
            this.griFunInsBtn = false;
            this.gridFunDelBtn = false;
        } else {
            this.gridFunDelBtn = true;
        }
        if (!this.wfworktypesModel.workId || !this.wfiwptemplatesBean.templateId) {
            this.griddocDelBtn = false;
        } else if (this.wfworktypesModel.workflowType === 'EMAIL') {
            this.griddocDelBtn = false;
        } else {
            this.griddocDelBtn = true;
        }
        if (!this.wfworktypesModel.workId || !this.wftriggersBean.workId) {
            this.gridTriggerDelBtn = false;
        } else {
            this.gridTriggerDelBtn = true;
        }
        if (!this.wfworktypesModel.workId || !this.wffunctionsBean.workId) {
            this.gridFunDelBtn = false;
        } else {
            this.gridFunDelBtn = true;
        }
        if (!this.wfworktypesModel.workId || !this.wfemailrecipientsBean.ownerId) {
            this.gridemailDelBtn = false;
            // this.emailreadonly = true;
        } else if (this.wfworktypesModel.workflowType === 'CNOTE' || this.wfworktypesModel.workflowType === 'TASK' ||
            this.wfworktypesModel.workflowType === 'MEMO') {
            this.gridemailDelBtn = false;
            // this.emailreadonly = true;
        } else {
            this.gridemailDelBtn = true;
            // this.emailreadonly = false;
        }
        if (this.wfworktypesModel.workflowType === 'EMAIL' && (this.wfworktypesModel.emailSubject !== this.emailSubject ||
            this.wfworktypesModel.emailBody !== this.emailBody ||
            this.wfemailreturnModel.internetAddress !== this.wfemailreturnModel.returnAddress)) {
            this.extSaveFlag = true;
            // this.saveDisabled = false;
        } else {
            this.extSaveFlag = false;
            // this.saveDisabled = true;
        }
        if (this.wfworktypesData.length === 0) {
            this.readeOnlyFields = false;
        } else {
            this.readeOnlyFields =  true;
        }
        if (this.searchBean.workflowType || this.searchBean.caseloadType ||
            this.searchBean.workType  || this.searchBean.moduleName ||
            this.searchBean.workSubType ) {
            this.retBtnflag = false;
        } else if (this.wfworktypesData.length === 0) {
            this.retBtnflag = false;
        } else {
            this.retBtnflag = true;
        }
        if (this.wfworktypesData.length > 0 || this.searchBean.workflowType || this.searchBean.caseloadType ||
            this.searchBean.workType  || this.searchBean.moduleName ||  this.searchBean.workSubType) {
            this.clrBtnFlag = false;
        } else {
            this.clrBtnFlag = true;
        }
        return true;
    }
    validateWorkTypeData = (event) => {
        const rowdata = new ValidateRowReturn();
        const index = event.rowIndex;

        if (event.field === 'activeFlag') {
            if (event.data.activeFlag) {
                this.typegrid.setColumnData('activeFlag', index, true);
                this.typegrid.setColumnData('expiryDate', index, undefined);
            } else {
                this.typegrid.setColumnData('activeFlag', index, false);
                this.typegrid.setColumnData('expiryDate', index, DateFormat.getDate());
            }
        }
        rowdata.validated = true;
        return rowdata;
    }
    wfiwptemplatesExecuteQuery() {
        this.wfiwptemplatesModel = new WorkIwpTemplate();
        this.wfiwptemplatesModel.workId = this.wfworktypesModel.workId;
        const wfiwptemplatesResult = this.ocmWorkFactory.
            wfIwpTemplatesExecuteQuery(this.wfiwptemplatesModel);
        wfiwptemplatesResult.subscribe(wfiwptemplatesResultList => {
            if (wfiwptemplatesResultList.length === 0) {
                this.wfiwptemplatesData = [];
                this.wfiwptemplatesIndex = -1;
            } else {
                wfiwptemplatesResultList.forEach(element => {
                    element.templateIdVal = String(element.templateId);
                    element.activeFlag = element.activeFlag === 'Y' ? true : false;
                });
                this.wfiwptemplatesData = wfiwptemplatesResultList;
                this.wfiwptemplatesModel = wfiwptemplatesResultList[0];
                this.wfiwptemplatesIndex = 0;
            }
        });
    }
    /**
       *  This function will be executed when commit event is
      * fired
      */
    ocmWorkSavewfiwptemplatesForm(event) {
        this.wfiwptemplatesInsertList = [];
        this.wfiwptemplatesUpdateList = [];
        this.wfiwptemplatesDeleteList = [];
        this.wfiwptemplatesInsertList = event.added;
        this.wfiwptemplatesUpdateList = event.updated;
        this.wfiwptemplatesDeleteList = event.removed;
        this.wfiwptemplatesCommitModel.insertList = [];
        this.wfiwptemplatesCommitModel.updateList = [];
        this.wfiwptemplatesCommitModel.deleteList = [];
        if (this.wfiwptemplatesInsertList.length > 0 || this.wfiwptemplatesUpdateList.length > 0) {
            for (let i = 0; i < this.wfiwptemplatesInsertList.length; i++) {
                if (this.iwptempValidationEvent(this.wfiwptemplatesInsertList[i])) {
                    return;
                }
                this.wfiwptemplatesInsertList[i].templateId = Number(this.wfiwptemplatesInsertList[i].templateIdVal);
                this.wfiwptemplatesInsertList[i].workId = this.wfworktypesModel.workId;
                this.wfiwptemplatesInsertList[i].activeFlag = this.wfiwptemplatesInsertList[i].activeFlag ? 'Y' : 'N';
            }
            for (let i = 0; i < this.wfiwptemplatesUpdateList.length; i++) {
                if (this.iwptempValidationEvent(this.wfiwptemplatesUpdateList[i])) {
                    return;
                }
                this.wfiwptemplatesUpdateList[i].activeFlag = this.wfiwptemplatesUpdateList[i].activeFlag ? 'Y' : 'N';
            }
            this.wfiwptemplatesCommitModel.insertList = this.wfiwptemplatesInsertList;
            this.wfiwptemplatesCommitModel.updateList = this.wfiwptemplatesUpdateList;
        }
        if (this.wfiwptemplatesDeleteList.length > 0) {
            for (let i = 0; i < this.wfiwptemplatesDeleteList.length; i++) {
            }
            this.wfiwptemplatesCommitModel.deleteList = this.wfiwptemplatesDeleteList;
        }
        const wfiwptemplatesSaveData = this.ocmWorkFactory.wfIwpTemplatesCommit(this.wfiwptemplatesCommitModel);
        wfiwptemplatesSaveData.subscribe(data => {
            if (data !== undefined && data.sealFlag === 'success') {
                this.show(this.translateService.translate('common.addupdateremoverecordsuccess'), 'success');
                this.wfiwptemplatesExecuteQuery();
            } else if (data.sealFlag.indexOf('WORK_IWP_TEMPLATES_PK') > 0) {
                this.show(this.translateService.translate('ocmworks.templateexistsalreadyforthiswork'), 'warn');
                this.wfiwptemplatesExecuteQuery();
            } else if (data !== undefined && data.sealFlag === '2') {
                this.show(this.translateService.translate('ocmworks.youcannotdeletetheattachedtemplateassociatediwpdocumentexists'),
                 'warn');
            } else {
                this.show(this.translateService.translate('common.addupdateremoverecordfailed'), 'error');
            }
        });
    }
    iwptempValidationEvent(event) {
        if (!event.templateIdVal) {
            this.show(this.translateService.translate('ocmworks.attacheddocumentsmusetbeentered'),  'warn');
            return true;
        }
    }
    onGridDocInsert = () => {
        this.wfiwptemplatesRowData = [];
        this.docsgrid.addedMap.forEach(
            (v: any, k: number) => {
                this.wfiwptemplatesRowData.push(v);
            }
        );
        this.docsgrid.updatedMap.forEach(
            (v: any, k: number) => {
                this.wfiwptemplatesRowData.push(v);
            }
        );
        for (let i = 0; i < this.wfiwptemplatesRowData.length; i++) {
            if (this.iwptempValidationEvent(this.wfiwptemplatesRowData[i])) {
                return;
            }
        }
        return { activeFlag: true };
    }
    validateDocsData = (event) => {
        const rowdata = new ValidateRowReturn();
        const index = this.wfiwptemplatesData.indexOf(event.data);
        if (event.field === 'activeFlag') {
            if (event.data.activeFlag) {
                this.docsgrid.setColumnData('activeFlag', index, true);
                this.docsgrid.setColumnData('expiryDate', index, undefined);
            } else {
                this.docsgrid.setColumnData('activeFlag', index, false);
                this.docsgrid.setColumnData('expiryDate', index, DateFormat.getDate());
            }
        }
        rowdata.validated = true;
        return rowdata;
    }
    wftriggersExecuteQuery() {
        this.wftriggersModel = new WorkTrigger();
        this.wftriggersModel.workId = this.wfworktypesModel.workId;
        const wftriggersResult = this.ocmWorkFactory.
            wfTriggersExecuteQuery(this.wftriggersModel);
        wftriggersResult.subscribe(wftriggersResultList => {
            if (wftriggersResultList.length === 0) {
                this.wftriggersData = [];
                this.wftriggersIndex = -1;
            } else {
                wftriggersResultList.forEach(elemnt => {
                    elemnt.activeFlag = elemnt.activeFlag === 'Y' ? true : false;
                });
                this.wftriggersData = wftriggersResultList;
                this.wftriggersModel = wftriggersResultList[0];
                this.wftriggersIndex = 0;
            }
        });
    }
    /**
       *  This function will be executed when commit event is
      * fired
      */
    ocmWorkSavewftriggersForm(event) { 
        this.wftriggersInsertList = [];
        this.wftriggersUpdateList = [];
        this.wftriggersDeleteList = [];
        this.wftriggersInsertList = event.added;
        this.wftriggersUpdateList = event.updated;
        this.wftriggersDeleteList = event.removed;
        this.wftriggersCommitModel.insertList = [];
        this.wftriggersCommitModel.updateList = [];
        this.wftriggersCommitModel.deleteList = [];
        if (this.wftriggersInsertList.length > 0 || this.wftriggersUpdateList.length > 0) {
            for (let i = 0; i < this.wftriggersInsertList.length; i++) {
                if (!this.wftriggersInsertList[i].triggerName) {
                    this.show(this.translateService.translate('ocmworks.triggernamemustbeeneterd'), 'warn');
                    return;
                }
                this.wftriggersInsertList[i].workId = this.wfworktypesModel.workId;
                this.wftriggersInsertList[i].activeFlag = this.wftriggersInsertList[i].activeFlag ? 'Y' : 'N';
            }
            for (let i = 0; i < this.wftriggersUpdateList.length; i++) {
                if (!this.wftriggersUpdateList[i].triggerName) {
                    this.show(this.translateService.translate('ocmworks.triggernamemustbeeneterd'), 'warn');
                    return;
                }
                this.wftriggersUpdateList[i].activeFlag = this.wftriggersUpdateList[i].activeFlag ? 'Y' : 'N';
            }
            this.wftriggersCommitModel.insertList = this.wftriggersInsertList;
            this.wftriggersCommitModel.updateList = this.wftriggersUpdateList;
        }
        if (this.wftriggersDeleteList.length > 0) {
            for (let i = 0; i < this.wftriggersDeleteList.length; i++) {
            }
            this.wftriggersCommitModel.deleteList =  this.wftriggersDeleteList;
        }
        const wftriggersSaveData = this.ocmWorkFactory.wfTriggersCommit(this.wftriggersCommitModel);
        wftriggersSaveData.subscribe(data => {
            if (data !== undefined && data.sealFlag === 'success') {
                this.show(this.translateService.translate('common.addupdateremoverecordsuccess'), 'success');
                this.wftriggersExecuteQuery();
            } else if (data.sealFlag.indexOf('WORK_TRIGGERS_PK') > 0) {
                this.show(this.translateService.translate('ocmworks.triggerexistsalreadyforthiswork'), 'warn');
                this.wftriggersExecuteQuery();
            } else {
                this.show(this.translateService.translate('common.addupdateremoverecordfailed'), 'error');
            }
        });
    }
    validateTriggerData = (event) => {
        const rowdata = new ValidateRowReturn();
        const index = this.wftriggersData.indexOf(event.data);
        if (event.field === 'activeFlag') {
            if (event.data.activeFlag) {
                this.triggergrid.setColumnData('activeFlag', index, true);
                this.triggergrid.setColumnData('expiryDate', index, undefined);
            } else {
                this.triggergrid.setColumnData('activeFlag', index, false);
                this.triggergrid.setColumnData('expiryDate', index, DateFormat.getDate());
            }
        }
        if (event.field === 'days' && event.data.days) {
            const countData = this.ocmWorkFactory.checkdays(event.data);
            countData.subscribe(data => {
                if ( event.data.days !== data) {
                    this.show(this.translateService.translate('ocmworks.adiffvalueofdays').
                   replace('%days%', data));
                   this.triggergrid.setColumnData('days', index, data);
                    return;
                } else {
                }
            });
        }
        rowdata.validated = true;
        return rowdata;
    }
    onGridTriggInsert = () => {
        this.wftriggersRowData = [];
        this.triggergrid.addedMap.forEach(
            (v: any, k: number) => {
                this.wftriggersRowData.push(v);
            }
        );
        this.triggergrid.updatedMap.forEach(
            (v: any, k: number) => {
                this.wftriggersRowData.push(v);
            }
        );
        for (let i = 0; i < this.wftriggersRowData.length; i++) {
            if (!this.wftriggersRowData[i].triggerName) {
                this.show(this.translateService.translate('ocmworks.triggernamemustbeeneterd'), 'warn');
                return;
            }
        }
        return { activeFlag: true };
    }
    wffunctionsExecuteQuery() {
        this.wffunctionsModel = new WorkFunction();
        this.wffunctionsModel.workId = this.wfworktypesModel.workId;
        const wffunctionsResult = this.ocmWorkFactory.
            wfFunctionsExecuteQuery(this.wffunctionsModel);
        wffunctionsResult.subscribe(wffunctionsResultList => {
            if (wffunctionsResultList.length === 0) {
                this.wffunctionsData = [];
                this.wffunctionsIndex = -1;
            } else {
                this.wffunctionsData = wffunctionsResultList;
                this.wffunctionsModel = wffunctionsResultList[0];
                this.wffunctionsIndex = 0;
            }
        });
    }
    /**
       *  This function will be executed when commit event is
      * fired
      */
    ocmWorkSavewffunctionsForm(event) {
        this.wffunctionsInsertList = [];
        this.wffunctionsUpdateList = [];
        this.wffunctionsDeleteList = [];
        this.wffunctionsInsertList = event.added;
        this.wffunctionsUpdateList = event.updated;
        this.wffunctionsDeleteList = event.removed;
        this.wffunctionsCommitModel.insertList = [];
        this.wffunctionsCommitModel.updateList = [];
        this.wffunctionsCommitModel.deleteList = [];
        if (this.wffunctionsInsertList.length > 0 || this.wffunctionsUpdateList.length > 0) {
            for (let i = 0; i < this.wffunctionsInsertList.length; i++) {
                if (!this.wffunctionsInsertList[i].functionType) {
                    this.show(this.translateService.translate('ocmworks.functionnamemustbeentered'), 'warn');
                    return;
                }
                this.wffunctionsInsertList[i].workId = this.wfworktypesModel.workId;
            }
            for (let i = 0; i < this.wffunctionsUpdateList.length; i++) {
                if (!this.wffunctionsUpdateList[i].functionType) {
                    this.show(this.translateService.translate('ocmworks.functionnamemustbeentered'), 'warn');
                    return;
                }
            }
            this.wffunctionsCommitModel.insertList = this.wffunctionsInsertList;
            this.wffunctionsCommitModel.updateList = this.wffunctionsUpdateList;
        }
        if (this.wffunctionsDeleteList.length > 0) {
            for (let i = 0; i < this.wffunctionsDeleteList.length; i++) {
            }
            this.wffunctionsCommitModel.deleteList = this.wffunctionsDeleteList;
        }
        const wffunctionsSaveData = this.ocmWorkFactory.wfFunctionsCommit(this.wffunctionsCommitModel);
        wffunctionsSaveData.subscribe(data => {
            if (data !== undefined && data.sealFlag === 'success') {
                this.show(this.translateService.translate('common.addupdateremoverecordsuccess'), 'success');
                this.wffunctionsExecuteQuery();
            } else if (data.sealFlag.indexOf('WORK_FUNCTIONS_PK') > 0) {
                this.show(this.translateService.translate('ocmworks.functionexistsalreadyforthiswork'), 'warn');
                this.wffunctionsExecuteQuery();
            } else {
                this.show(this.translateService.translate('common.addupdateremoverecordfailed'), 'error');
            }
        });
    }
    onGridFunctionInsert = () => {
        if (this.wfworktypesModel.workflowType === 'TASK' && this.wffunctionsData.length > 1) {
            this.show(this.translateService.translate('ocmworks.taskcanonlyhavonefunctionassociatedwiththem'), 'warn');
            return;
        }
        this.wffunctionsRowData = [];
        this.fungrid.addedMap.forEach(
            (v: any, k: number) => {
                this.wffunctionsRowData.push(v);
            }
        );
        this.fungrid.updatedMap.forEach(
            (v: any, k: number) => {
                this.wffunctionsRowData.push(v);
            }
        );
        for (let i = 0; i < this.wffunctionsRowData.length; i++) {
            if (!this.wffunctionsRowData[i].functionType) {
                this.show(this.translateService.translate('ocmworks.functionnamemustbeentered'), 'warn');
                return;
            }
        }
        return {};
    }
    wfemailrecipientsExecuteQuery() {
        this.wfemailrecipientsModel = new InternetAddresses();
        this.wfemailrecipientsModel.ownerId = this.wfworktypesModel.workId;
        const wfemailrecipientsResult = this.ocmWorkFactory.
            wfEmailRecipientsExecuteQuery(this.wfemailrecipientsModel);
        wfemailrecipientsResult.subscribe(wfemailrecipientsResultList => {
            if (wfemailrecipientsResultList.length === 0) {
                this.wfemailrecipientsData = [];
                this.wfemailrecipientsIndex = -1;
            } else {
                wfemailrecipientsResultList.forEach(elemnt => {
                    elemnt.emailTo = elemnt.internetAddressClass === 'EMAIL_TO' ? true : false;
                    elemnt.emailCc = elemnt.internetAddressClass === 'EMAIL_CC' ? true : false;
                    elemnt.emailBcc = elemnt.internetAddressClass === 'EMAIL_BCC' ? true : false;
                });
                this.wfemailrecipientsData = wfemailrecipientsResultList;
                this.wfemailrecipientsModel = wfemailrecipientsResultList[0];
                this.wfemailrecipientsIndex = 0;
            }
        });
    }
    /**
       *  This function will be executed when commit event is
      * fired
      */
    ocmWorkSavewfemailrecipientsForm(event) {
        this.wfemailrecipientsInsertList = [];
        this.wfemailrecipientsUpdateList = [];
        this.wfemailrecipientsDeleteList = [];
        this.wfemailrecipientsInsertList = event.added;
        this.wfemailrecipientsUpdateList = event.updated;
        this.wfemailrecipientsDeleteList = event.removed;
        this.wfemailrecipientsCommitModel.insertList = [];
        this.wfemailrecipientsCommitModel.updateList = [];
        this.wfemailrecipientsCommitModel.deleteList = [];
        this.wfemailrecipientsCommitModel.workupdateList = [];
        this.workUpdateList = [];
        this.workBean = new Work();
        this.toflag = false;
        for (let i = 0; i < this.wfemailrecipientsData.length; i++) {
            if (this.wfemailrecipientsData[i].emailTo) {
                this.wfemailrecipientsData[i].internetAddressClass = 'EMAIL_TO';
            }
            if (this.wfemailrecipientsData[i].emailCc) {
                this.wfemailrecipientsData[i].internetAddressClass = 'EMAIL_CC';
            }
            if (this.wfemailrecipientsData[i].emailBcc) {
                this.wfemailrecipientsData[i].internetAddressClass = 'EMAIL_BCC';
            }
            if (this.wfemailrecipientsData[i].internetAddressClass === 'EMAIL_TO') {
                this.toflag = true;
            }
            if (!this.wfemailrecipientsData[i].internetAddress) {
                this.show(this.translateService.translate('ocmworks.toaddressmustbeentered'), 'warn');
                return true;
            }
            var r=/^[A-Za-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{3}$/;
            if(!r.test(this.wfemailrecipientsData[i].internetAddress)){
                this.show(this.translateService.translate('common.invaidinternetaddress'), 'warn');
                return;  
            }
           /*  if (this.wfemailrecipientsData[i].internetAddress &&
                this.wfemailrecipientsData[i].internetAddress.match('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$') === null) {
                this.show(this.translateService.translate('common.invaidinternetaddress'), 'warn');
                return;
             } */
             if (this.wfemailrecipientsData.length === 1 && !this.toflag) {
                this.show(this.translateService.translate('ocmworks.atleastoneaddressmustbesetasthetoaddress'), 'warn');
                return true;
            }
            if (!this.wfemailrecipientsData[i].internetAddressClass) {
                this.show(this.translateService.translate('ocmworks.pleaseselectemailtype'), 'warn');
                return true;
            }
            this.wfemailrecipientsData[i].ownerId = this.wfworktypesModel.workId;
        }
        if (this.wfemailreturnModel.internetAddress !== this.wfemailreturnModel.returnAddress) {
            if (!this.wfemailreturnModel.internetAddress) {
                this.show(this.translateService.translate('ocmworks.returnaddressmustbeentered'), 'warn');
                return;
            }
            var r=/^[A-Za-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{3}$/;
            if(!r.test(this.wfemailreturnModel.internetAddress)){
                this.show(this.translateService.translate('common.invaidinternetaddress'), 'warn');
                return;  
            }
            this.wfemailrecipientsUpdateList.push(this.wfemailreturnModel);
        }
        if (this.wfworktypesModel.emailSubject !== this.emailSubject || this.wfworktypesModel.emailBody !== this.emailBody) {
            if (!this.emailSubject) {
                this.show(this.translateService.translate('ocmworks.subjectmustbeentered'), 'warn');
                return;
            }
            if (!this.emailBody) {
                this.show(this.translateService.translate('ocmworks.bodymustbeentered'), 'warn');
                return;
            }
            this.workBean.emailBody = this.emailBody;
            this.workBean.emailSubject = this.emailSubject;
            this.workUpdateList.push(this.workBean);
            this.wfemailrecipientsCommitModel.workupdateList = this.workUpdateList;
        }
        if (this.wfemailrecipientsInsertList.length > 0 || this.wfemailrecipientsUpdateList.length > 0) {
            this.wfemailrecipientsCommitModel.insertList = this.wfemailrecipientsInsertList;
            this.wfemailrecipientsCommitModel.updateList = this.wfemailrecipientsUpdateList;
        }
        if (this.wfemailrecipientsDeleteList.length > 0) {
            for (let i = 0; i < this.wfemailrecipientsDeleteList.length; i++) {
            }
            this.wfemailrecipientsCommitModel.deleteList = this.wfemailrecipientsDeleteList;
        }
        if (!this.toflag && this.wfemailrecipientsData.length !== 0) {
            this.show(this.translateService.translate('ocmworks.atleastoneaddressmustbesetasthetoaddress'), 'warn');
            return true;
        }
        const wfemailrecipientsSaveData = this.ocmWorkFactory.wfEmailRecipientsCommit(this.wfemailrecipientsCommitModel);
        wfemailrecipientsSaveData.subscribe(data => {
            if (data !== undefined && data.sealFlag === 'success') {
                this.show(this.translateService.translate('common.addupdateremoverecordsuccess'), 'success');
                this.wfemailrecipientsExecuteQuery();
            } else {
                this.show(this.translateService.translate('common.addupdateremoverecordfailed'), 'error');
            }
        });
    }
    saveemailData() {
        this.wfemailrecipientsInsertList = [];
        this.wfemailrecipientsUpdateList = [];
        this.wfemailrecipientsDeleteList = [];
        this.emailgrid.addedMap.forEach(
            (v: any, k: number) => {
                this.wfemailrecipientsInsertList.push(v);
            }
        );
        this.emailgrid.updatedMap.forEach(
            (v: any, k: number) => {
                this.wfemailrecipientsUpdateList.push(v);
            }
        );
        this.emailgrid.removedMap.forEach(
            (v: any, k: number) => {
                this.wfemailrecipientsDeleteList.push(v);
            }
        );
        this.wfemailrecipientsCommitModel.insertList = [];
        this.wfemailrecipientsCommitModel.updateList = [];
        this.wfemailrecipientsCommitModel.deleteList = [];
        this.wfemailrecipientsCommitModel.workupdateList = [];
        this.workUpdateList = [];
        this.workBean = new Work();
        this.toflag = false;
        for (let i = 0; i < this.wfemailrecipientsData.length; i++) {
            var r=/^[A-Za-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{3}$/;
            if (this.wfemailrecipientsData[i].emailTo) {
                this.wfemailrecipientsData[i].internetAddressClass = 'EMAIL_TO';
            }
            if (this.wfemailrecipientsData[i].emailCc) {
                this.wfemailrecipientsData[i].internetAddressClass = 'EMAIL_CC';
            }
            if (this.wfemailrecipientsData[i].emailBcc) {
                this.wfemailrecipientsData[i].internetAddressClass = 'EMAIL_BCC';
            }
            if (this.wfemailrecipientsData[i].internetAddressClass === 'EMAIL_TO') {
                this.toflag = true;
            }
            if (this.wfemailrecipientsData.length === 1 && !this.toflag) {
                this.show(this.translateService.translate('ocmworks.atleastoneaddressmustbesetasthetoaddress'), 'warn');
                return true;
            }
            if (!this.wfemailrecipientsData[i].internetAddress) {
                this.show(this.translateService.translate('ocmworks.toaddressmustbeentered'), 'warn');
                return true;
            }
            if (this.wfemailrecipientsData[i].internetAddress &&
                !r.test(this.wfemailrecipientsData[i].internetAddress)) {
                this.show(this.translateService.translate('common.invaidinternetaddress'), 'warn');
                return;
             }
            if (!this.wfemailrecipientsData[i].internetAddressClass) {
                this.show(this.translateService.translate('ocmworks.pleaseselectemailtype'), 'warn');
                return true;
            }
            this.wfemailrecipientsData[i].ownerId = this.wfworktypesModel.workId;
        }
        if (!this.wfemailreturnModel.internetAddressId) {
            if (!this.wfemailreturnModel.internetAddress) {
                this.show(this.translateService.translate('ocmworks.returnaddressmustbeentered'), 'warn');
                return;
            }
            var r1=/^[A-Za-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{3}$/;
            if (this.wfemailreturnModel.internetAddress &&
                !r1.test(this.wfemailreturnModel.internetAddress)) {
                this.show(this.translateService.translate('common.invaidinternetaddress'), 'warn');
                return;
             }
             this.wfemailreturnModel.ownerId = this.wfworktypesBean.workId;
             this.wfemailreturnModel.internetAddressClass = 'EMAIL_RTN';
            this.wfemailrecipientsInsertList.push(this.wfemailreturnModel);
        // } else if (this.wfemailreturnModel.internetAddress !== this.wfemailreturnModel.returnAddress) {
             } else {
            if (!this.wfemailreturnModel.internetAddress) {
                this.show(this.translateService.translate('ocmworks.returnaddressmustbeentered'), 'warn');
                return;
            }
            var r2=/^[A-Za-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{3}$/;
            if (this.wfemailreturnModel.internetAddress &&
                !r2.test(this.wfemailreturnModel.internetAddress)) {
                this.show(this.translateService.translate('common.invaidinternetaddress'), 'warn');
                return;
             }
            this.wfemailrecipientsUpdateList.push(this.wfemailreturnModel);
        }
        // if (this.wfworktypesModel.emailSubject !== this.emailSubject || this.wfworktypesModel.emailBody !== this.emailBody) {
            if (!this.emailSubject) {
                this.show(this.translateService.translate('ocmworks.subjectmustbeentered'), 'warn');
                return;
            }
            if (!this.emailBody) {
                this.show(this.translateService.translate('ocmworks.bodymustbeentered'), 'warn');
                return;
            }
            this.workBean.emailBody = this.emailBody;
            this.workBean.emailSubject = this.emailSubject;
            this.workBean.workId = this.wfworktypesModel.workId;
            this.workUpdateList.push(this.workBean);
            this.wfemailrecipientsCommitModel.workupdateList = this.workUpdateList;
        // }
        if (this.wfemailrecipientsInsertList.length > 0 || this.wfemailrecipientsUpdateList.length > 0) {
            this.wfemailrecipientsCommitModel.insertList = this.wfemailrecipientsInsertList;
            this.wfemailrecipientsCommitModel.updateList = this.wfemailrecipientsUpdateList;
        }
        if (this.wfemailrecipientsDeleteList.length > 0) {
            for (let i = 0; i < this.wfemailrecipientsDeleteList.length; i++) {
            }
            this.wfemailrecipientsCommitModel.deleteList = this.wfemailrecipientsDeleteList;
        }
        if (!this.toflag && this.wfemailrecipientsData.length !== 0) {
            this.show(this.translateService.translate('ocmworks.atleastoneaddressmustbesetasthetoaddress'), 'warn');
            return true;
        }
        const wfemailrecipientsSaveData = this.ocmWorkFactory.wfEmailRecipientsCommit(this.wfemailrecipientsCommitModel);
        wfemailrecipientsSaveData.subscribe(data => {
            if (data !== undefined && data.sealFlag === 'success') {
                this.show(this.translateService.translate('common.addupdateremoverecordsuccess'), 'success');
                this.wfworktypesModel.emailBody = this.emailBody;
                this.wfworktypesModel.emailSubject = this.emailSubject;
                this.wfemailrecipientsExecuteQuery();
                this.wfemailreturnExecuteQuery();
            } else {
                this.show(this.translateService.translate('common.addupdateremoverecordfailed'), 'error');
            }
        });
    }
    workClickEvent () {
        if (this.wfworktypesModel.workflowType === 'EMAIL') {
         this.workDelFlag = true;
         this.delDisabled = false;
        }
    }
    emailretClickEvent() {
        if (this.wfworktypesModel.workflowType === 'EMAIL' && this.wfemailreturnModel.internetAddressId) {
        this.retDelFlag = true;
        this.delDisabled = false;
        }
    }
    deleteEmailData () {
        this.wfemailrecipientsCommitModel.insertList = [];
        this.wfemailrecipientsCommitModel.updateList = [];
        this.wfemailrecipientsCommitModel.deleteList = [];
        this.wfemailrecipientsCommitModel.workupdateList = [];
        this.wfemailrecipientsCommitModel.workdeleteList = [];
        this.workUpdateList = [];
        this.wfemailrecipientsDeleteList = [];
        if (!this.workDelFlag && !this.retDelFlag) {
          return;
        }
        if (this.workDelFlag) {
            this.emailBody = undefined;
            this.emailSubject = undefined;
        this.workBean.emailBody = undefined;
        this.workBean.emailSubject = undefined;
        this.workBean.workId = this.wfworktypesModel.workId;
        this.workUpdateList.push(this.workBean);
        this.wfemailrecipientsCommitModel.workupdateList = this.workUpdateList;
        }
        if (this.retDelFlag) {
           this.wfemailrecipientsDeleteList.push(this.wfemailreturnModel);
           this.wfemailrecipientsCommitModel.deleteList = this.wfemailrecipientsDeleteList;
        }
        const wfemailrecipientsSaveData = this.ocmWorkFactory.wfEmailRecipientsCommit(this.wfemailrecipientsCommitModel);
        wfemailrecipientsSaveData.subscribe(data => {
            if (data !== undefined && data.sealFlag === 'success') {
                this.show(this.translateService.translate('common.recordsdelete'), 'success');
                this.wfworktypesModel.emailBody = undefined;
                this.wfworktypesModel.emailSubject = undefined;
                this.wfemailrecipientsExecuteQuery();
                this.wfemailreturnExecuteQuery();
            } else {
                this.show(this.translateService.translate('common.recordnotdeleteds'), 'error');
            }
        });
    }
    onGridemailInsert = () => {
        this.wfemailrecipientsRowData = [];
        this.fungrid.addedMap.forEach(
            (v: any, k: number) => {
                this.wfemailrecipientsRowData.push(v);
            }
        );
        this.fungrid.updatedMap.forEach(
            (v: any, k: number) => {
                this.wfemailrecipientsRowData.push(v);
            }
        );
        for (let i = 0; i < this.wfemailrecipientsRowData.length; i++) {
            if (!this.wfemailrecipientsRowData[i].internetAddress) {
                this.show(this.translateService.translate('ocmworks.toaddressmustbeentered'), 'warn');
                return true;
            }
            if (!this.wfemailrecipientsRowData[i].internetAddressClass) {
                this.show(this.translateService.translate('ocmworks.pleaseselectemailtype'), 'warn');
                return true;
            }
        }
        return {emailTo: true};
    }
    wfemailreturnExecuteQuery() {
        this.wfemailreturnModel = new InternetAddresses();
        this.wfemailreturnModel.ownerId = this.wfworktypesBean.workId;
        const wfemailreturnResult = this.ocmWorkFactory.
            wfEmailReturnExecuteQuery(this.wfemailreturnModel);
        wfemailreturnResult.subscribe(wfemailreturnResultList => {
            if (wfemailreturnResultList.length === 0) {
                this.wfemailreturnData = [];
                this.delDisabled = true;
            } else {
                this.wfemailreturnData = wfemailreturnResultList;
                this.wfemailreturnModel = wfemailreturnResultList[0];
                if (this.wfemailreturnModel.internetAddress) {
                this.delDisabled = false;
                }
            }
        });
    }
    /**
       *  This function will be executed when commit event is
      * fired
      */
    ocmWorkSavewfemailreturnForm(event) {
        this.wfemailreturnInsertList = [];
        this.wfemailreturnUpdateList = [];
        this.wfemailreturnDeleteList = [];
        this.wfemailreturnInsertList = event.added;
        this.wfemailreturnUpdateList = event.updated;
        this.wfemailreturnDeleteList = event.removed;
        this.wfemailreturnCommitModel.insertList = [];
        this.wfemailreturnCommitModel.updateList = [];
        this.wfemailreturnCommitModel.deleteList = [];
        if (this.wfemailreturnInsertList.length > 0 || this.wfemailreturnUpdateList.length > 0) {
            for (let i = 0; i < this.wfemailreturnInsertList.length; i++) {
                if (this.wfemailreturnModel.internetAddress !== undefined ||
                    this.wfemailreturnModel.internetAddress != null) {
                    return;
                }
            }
            for (let i = 0; i < this.wfemailreturnUpdateList.length; i++) {
            }
            this.wfemailreturnCommitModel.insertList = this.wfemailreturnInsertList;
            this.wfemailreturnCommitModel.updateList = this.wfemailreturnUpdateList;
        }
        if (this.wfemailreturnDeleteList.length > 0) {
            for (let i = 0; i < this.wfemailreturnDeleteList.length; i++) {
            }
            this.wfemailreturnCommitModel.deleteList = this.wfemailreturnDeleteList;
        }
        const wfemailreturnSaveData = this.ocmWorkFactory.wfEmailReturnCommit(this.wfemailreturnCommitModel);
        wfemailreturnSaveData.subscribe(data => {
            if (data !== undefined && data.sealFlag === 'success') {
                this.show(this.translateService.translate('common.addupdateremoverecordsuccess'), 'success');
            } else {
                this.show(this.translateService.translate('common.addupdateremoverecordfailed'), 'error');
            }
        });
    }
    validateEmailRowData = (event) => {
        const rowdata = new ValidateRowReturn();
        const index = this.wfemailrecipientsData.indexOf(event.data);
        if (event.field === 'emailTo' && event.data.emailTo) {
            this.emailgrid.setColumnData('emailTo', index, true);
            this.emailgrid.setColumnData('emailCc', index, false);
            this.emailgrid.setColumnData('emailBcc', index, false);
            this.emailgrid.setColumnData('internetAddressClass', index, 'EMAIL_TO');
        } else  if (event.field === 'emailCc' && event.data.emailCc) {
            this.emailgrid.setColumnData('emailTo', index, false);
            this.emailgrid.setColumnData('emailCc', index, true);
            this.emailgrid.setColumnData('emailBcc', index, false);
            this.emailgrid.setColumnData('internetAddressClass', index, 'EMAIL_CC');
        } else  if (event.field === 'emailBcc' && event.data.emailBcc) {
            this.emailgrid.setColumnData('emailTo', index, false);
            this.emailgrid.setColumnData('emailCc', index, false);
            this.emailgrid.setColumnData('emailBcc', index, true);
            this.emailgrid.setColumnData('internetAddressClass', index, 'EMAIL_BCC');
        } else if (!event.data.emailTo && !event.data.emailCc  && !event.data.emailBcc) {
            this.emailgrid.setColumnData('emailTo', index, false);
            this.emailgrid.setColumnData('emailCc', index, false);
            this.emailgrid.setColumnData('emailBcc', index, false);
            this.emailgrid.setColumnData('internetAddressClass', index, undefined);
        }
        rowdata.validated = true;
        return rowdata;
    }
    onGridClear = () => {
        this.wfemailrecipientsData = [];
        this.wfemailrecipientsExecuteQuery();
        return true;
    }


    save() {
        const event = { added: [], removed: [], updated: [] };
        if (this.typegrid) {
            const added = [];
            if (this.typegrid.addedMap.size > 0) {
                this.typegrid.addedMap.forEach((value) => {
                    added.push(value);
                });
            }
            const removed = [];
            this.typegrid.removedMap.forEach((value) => {
                removed.push(value);
            });
            const updated = [];
            this.typegrid.updatedMap.forEach((value) => {
                updated.push(value);
            });
            event.added = added;
            event.removed = removed;
            event.updated = updated;
            this.ocmWorkSavewfworktypesForm(event); 
        }
    }

    get savBtnflag() {
        if (this.typegrid && (this.typegrid.addedMap.size > 0 || this.typegrid.updatedMap.size > 0 ||
          this.typegrid.removedMap.size > 0)) {
          return false;
        } else {
                return true;

        }

      }

      onCommentTextInsert (event){
          if(event!=this.wfworktypesModel.caseNoteText){
              const index = this.typegrid.gridOptions.api.getSelectedNodes()[0].rowIndex;
              this.typegrid.setColumnData('caseNoteText',index,event);
          } 
      }


      onGridWorkClear = () => {
        this.caseNoteText = undefined;
        this.ocmWorkexecuteQuery();
        return true;
      }
}
