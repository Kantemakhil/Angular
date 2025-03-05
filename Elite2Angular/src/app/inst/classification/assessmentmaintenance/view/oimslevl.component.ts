import {
    Component, OnInit,
    ViewChild
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OimslevlService } from '../service/oimslevl.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { Assessments } from '@inst/classification/beans/Assessments';
import { AssessmentSupervisions } from '@inst/classification/assessmentmaintenance/beans/AssessmentSupervisions';
import { ValidateRowReturn } from '@core/ui-components/grid/grid.component';
import { DateFormat } from '@core/ui-components/datepicker/dateFormat';
import { AssessmentSupervisionsCommitBean } from '@inst/classification/assessmentmaintenance/beans/AssessmentSupervisionsCommitBean';
import { AnyRecordWithTtl } from 'dns';
import { AssessmentsCommitBean } from '@inst/classification/beans/AssessmentsCommitBean';



@Component({
    selector: 'app-oimslevl',
    templateUrl: './oimslevl.component.html'
})

export class OimslevlComponent implements OnInit {
    @ViewChild('asstypetab', { static: true }) asstypetab: any;
    @ViewChild('typeAssSupGrid', { static: true }) typeAssSupGrid: any;
    @ViewChild('typeSecAssSupGrid', { static: true }) typeSecAssSupGrid: any;
    @ViewChild('asssectgrid', { static: true }) asssectgrid: any;
    
    msgs: any[] = [];
    asstypeData: Assessments[] = [];
    asstypeDataTemp: Assessments[] = [];
    asstypeModel: Assessments = new Assessments();
    asstypeModeltemp: Assessments = new Assessments();
    asstypeSearchModel: Assessments = new Assessments();
    asstypeIndex: number;
    asstypeInsertList: Assessments[] = [];
    asstypeUpdatetList: Assessments[] = [];
    asstypeDeleteList: Assessments[] = [];
    typeasssupData: AssessmentSupervisions[] = [];
    typeasssupDataTemp: AssessmentSupervisions[] = [];
    typeasssupModel: AssessmentSupervisions = new AssessmentSupervisions();
    typeasssupCommitModel: AssessmentSupervisionsCommitBean = new AssessmentSupervisionsCommitBean();
    secasssupCommitModel: AssessmentSupervisionsCommitBean = new AssessmentSupervisionsCommitBean();
    typeasssupIndex: number;
    typeasssupInsertList: AssessmentSupervisions[] = [];
    typeasssupUpdatetList: AssessmentSupervisions[] = [];
    typeasssupDeleteList: AssessmentSupervisions[] = [];
    asssectData: Assessments[] = [];
    asssectDataTemp: Assessments[] = [];
    asssectModel: Assessments = new Assessments();
    asssectIndex: number;
    asssectInsertList: Assessments[] = [];
    asssectUpdatetList: Assessments[] = [];
    asssectDeleteList: Assessments[] = [];
    secasssupData: AssessmentSupervisions[] = [];
    secasssupDataTemp: AssessmentSupervisions[] = [];
    secasssupModel: AssessmentSupervisions = new AssessmentSupervisions();
    secasssupIndex: number;
    secasssupInsertList: AssessmentSupervisions[] = [];
    secasssupUpdatetList: AssessmentSupervisions[] = [];
    secasssupDeleteList: AssessmentSupervisions[] = [];
    display: boolean;
    disabled: boolean;
    editable: boolean;
    assSectColumnDef: any[];
    typeAssSupColumnDef: any[];
    secAssSupColumnDef: any[];
    assTypeColumnDef: any[];
    assTypeReadOnly: boolean;
    typeAssSupReadOnly: boolean;
    assSectReadOnly: boolean;
    secAssSupReadOnly: boolean;
    cg$ctrlReadOnly: boolean;
    rgAssessmentsectionsRg: any[] = [];
    rgassessmenttypesRg: any[] = [];
    rgassessmentresultsRg: any[] = [];
    assTypeIndex = -1;
    calAssIndex = -1;
    secAsIndex = -1;
    resultIndex = -1;
    type = 'error';
    message = ' Invalid.';
    msglist = [];
    clearDisabled: boolean;
    typeAssLink: string;
    retriveDisabled: boolean;
    namesReadOnly: boolean;
    enableData: boolean;
    assessmentId: number;
    resultLink: string;
    rLink: string;
    resultLists: any[];
    codes: string;
    sectionLink: any;
    istype: boolean;
    deleData: boolean;
    disableLov: boolean;
    serviceObj: any;
    enforcementFalg: any;
    disableResult: boolean;
    sectLov: boolean;
    secAssId: any;
    miniScore: boolean;
    sectDisabled: boolean;
    enableResData: boolean;
    caseDisabled: boolean;
    activeEnable: boolean;
    minScoreTemp: any;
    maxScoreTemp: any;
    enforceMinMaxDisabled: boolean;
    enforcementFalgTemp: any;
    enforceAssementId: any;
    assessmentscommitModel : AssessmentsCommitBean = new AssessmentsCommitBean();
    asssectInsertListUpdateList: Assessments[] = [];
    resTitles = {
        description: this.translateService.translate('common.description'),
        code: this.translateService.translate('common.code')
    };

    constructor(private oimslevlFactory: OimslevlService, public translateService: TranslateService,
        public sessionManager: UserSessionManager) {
        this.assSectColumnDef = [];
        this.typeAssSupColumnDef = [];
        this.secAssSupColumnDef = [];
        this.assTypeColumnDef = [];

    }
    ngOnInit() {
        this.enableResData = false;
        this.sectDisabled = true;
        this.caseDisabled = true;
        this.sectLov = true;
        this.disableResult = false;
        this.disableLov = true;
        this.deleData = true;
        this.istype = false;
        this.resultLink = undefined;
        this.retriveDisabled = false;
        this.clearDisabled = true;
        this.namesReadOnly = false;
        this.enableData = false;
        this.typeAssLink = 'oimslevl/rgAssessmentTypesRecordGroup';
        this.rLink = this.resultLink;
        this.assTypeColumnDef = [
            {
                fieldName: this.translateService.translate('common.type') + '*', field: 'assessmentCode', editable: true, width: 150,
                datatype: 'lov', maxlength: 100, link: 'oimslevl/rgAssessmentTypesRecordGroup', source: 'OCMNOQUE'
            },

            {
                fieldName: this.translateService.translate('common.effectivedate') + '*', field: 'effectiveDate',
                datatype: 'date', editable: true, maxlength: 11, width: 150
            },
            {
                fieldName: this.translateService.translate('common.active'), field: 'activeFlag', datatype: 'checkbox',
                maxlength: 1, editable: false, width: 150, cellEditable: this.canAlertEdit
            },



        ];
        this.typeAssSupColumnDef = [


            {
                fieldName: this.translateService.translate('oimslevl.calResult') + '*', field: 'supervisionLevelType',
                editable: true, width: 150, maxlength: 100, datatype: 'lov', cellEditable: this.canAlertEdit,
                link: 'oimslevl/rgAssessmentResultsRecordGroup?assessmentId=', parentField: 'assessmentId', titles: this.resTitles, source: 'OCMNOQUE'
            },
            { fieldName: '', field: 'test', editable: true, width: 150, hide: true },

            {
                fieldName: this.translateService.translate('oimslevl.min') + '*', field: 'miniScore', datatype: 'number',
                maxlength: 4, editable: true, width: 150, minValue: '-999', maxValue: '9999'
            },
            {
                fieldName: this.translateService.translate('oimslevl.max') + '*', field: 'maxScore', datatype: 'number',
                maxlength: 4, editable: true, width: 150, minValue: '-999', maxValue: '9999'
            },
            {
                fieldName: this.translateService.translate('common.effectivedate') + '*', field: 'effectiveDate',
                datatype: 'date', editable: true, maxlength: 11, width: 150, cellEditable: this.canEffective
            },
            {
                fieldName: this.translateService.translate('ocmnoque.sequence'), field: 'listSeq',
                editable: true, width: 150,
                maxValue: '999999', strictFP: true, whole: true, datatype: 'number'
            },
            {
                fieldName: this.translateService.translate('common.active'), field: 'activeFlag', datatype: 'checkbox',
                maxlength: 1, editable: true, width: 150
            },
            {
                fieldName: this.translateService.translate('common.expirydate'), field: 'expiryDate', editable: false,
                datatype: 'date', width: 150, maxlength: 11,/*  cellEditable: this.canDateEdit */
            },
            { fieldName: '', field: 'assessmentId', editable: true, width: 150, hide: true },

            { fieldName: '', field: 'answerValue', editable: true, width: 150, hide: true },

        ];
        this.assSectColumnDef = [
            {
                fieldName: this.translateService.translate('oimslevl.section'), field: 'description', datatype: 'text',
                maxlength: 300, editable: false, width: 150
            },
            {
                fieldName: this.translateService.translate('oimslevl.inclTot'), field: 'sectScoreIncludeFlag',
                datatype: 'checkbox', maxlength: 1, editable: true, width: 150
            },
            {
                fieldName: this.translateService.translate('oimslevl.overTot'), field: 'sectScoreOverrideFlag',
                datatype: 'checkbox', maxlength: 1, editable: true, width: 150
            },

            {
                fieldName: this.translateService.translate('common.active'), field: 'activeFlag', datatype: 'checkbox',
                maxlength: 1, editable: false, width: 150
            },

        ];


        this.secAssSupColumnDef = [
            {
                fieldName: this.translateService.translate('oimslevl.calResult') + '*', field: 'supervisionLevelType',
                editable: this.sectLov, width: 150, maxlength: 100, datatype: 'lov', cellEditable: this.canCellEdit,source: 'OCMNOQUE',
                link: 'oimslevl/rgAssessmentResultsRecordGroup?assessmentId=', parentField: 'parentAssessmentId', titles: this.resTitles
            },

            {
                fieldName: this.translateService.translate('oimslevl.min') + '*', field: 'miniScore', datatype: 'number',
                maxlength: 4, editable: true, width: 150, cellEditable: this.canCellEdit,
                minValue: '-999', maxValue: '9999'
            },
            {
                fieldName: this.translateService.translate('oimslevl.max') + '*', field: 'maxScore', datatype: 'number',
                maxlength: 4, editable: true, width: 150, cellEditable: this.canCellEdit,
                minValue: '-999', maxValue: '9999'
            },
            {
                fieldName: this.translateService.translate('common.effectivedate') + '*', field: 'effectiveDate',
                datatype: 'date', editable: true, maxlength: 11, width: 150, cellEditable: this.canEffective
            },
            {
                fieldName: this.translateService.translate('ocmnoque.sequence'), field: 'listSeq', editable: true,
                width: 150, maxValue: '999999', strictFP: true, whole: true, datatype: 'number'
            },
            {
                fieldName: this.translateService.translate('common.active'), field: 'activeFlag', datatype: 'checkbox',
                maxlength: 1, editable: true, width: 150
            },
            {
                fieldName: this.translateService.translate('common.expirydate'), field: 'expiryDate', editable: false,
                datatype: 'date', width: 150, maxlength: 11, /* cellEditable: this.canDateEdit */
            },
            { fieldName: '', field: 'assessmentId', editable: true, width: 150, hide: true },
            { fieldName: '', field: 'parentAssessmentId', editable: true, width: 150, hide: true },
        ];

        this.assTypeExecuteQuery();
    }


    show() {
        this.msglist = [];
        this.msglist.push({ message: this.message, type: this.type });
        this.msgs = [...this.msglist];
    }
    OnGridClearAssmts = () => {
        this.typeasssupExecuteQuery();
        this.getEnforcementFlag();
        return true;
    }


    OnGridClearSection = () => {
        if (this.asstypeModel.assessmentClass === 'SECT') {
            this.secasssupModel.assessmentId = this.asstypeModel.assessmentId;
        } else if (this.asstypeModel.assessmentClass === 'TYPE') {
            this.secasssupModel.assessmentId = this.asstypeModel.parentAssessmentId;

        }

        this.secAssSupExecuteQuery();
        return true;
    }
    canAlertEdit = (data: any, index: number, field: string): boolean => {
        if (field === 'supervisionLevelType' && !this.disableLov) {
            return false;
        }
        if (data.updateAllowedFlag === 'Y') {
            return false;
        } else {
            if (data.updateAllowedFlag === undefined) {
                return true;
            }
        }
        if (data.assessmentId && data.supervisionLevelType) {
            return false;
        } else if (!data.assessmentId) {
            return true;
        }
        return true;

    }

    canCellEdit = (data: any, index: number, field: string): boolean => {

        if (field === 'supervisionLevelType' && !this.sectLov) {
            return false;
        }
        if (data.updateAllowedFlag === 'Y') {
            return false;
        } else {
            if (data.updateAllowedFlag === undefined) {
                return true;
            }
        }

        if (data.assessmentId && data.supervisionLevelType) {
            return false;
        } else if (!data.assessmentId) {
            return true;
        }



        return true;

    }



    canDateEdit = (data: any, index: number, field: string): boolean => {
        if (!data.activeFlag) {
            return true;
        } else {
            return false;
        }
    }

    canEffective = (data: any, index: number, field: string): boolean => {
        if (!data.createDatetime) {
            return true;
        } else {
            return false;
        }

    }
    isInsertable() {
        if (this.asstypeSearchModel.description || this.asstypeSearchModel.assessmentCode ||
            this.asstypeSearchModel.effectiveDate || this.asstypeSearchModel.activeFlag) {

            this.clearDisabled = false;
        } else {
            this.clearDisabled = true;
        }
    }

    clear() {
        this.clearDisabled = true;
        this.asstypeData = [];
        this.asstypeModel = new Assessments();
        this.asstypeSearchModel = new Assessments();
        this.typeasssupData = [];
        this.typeasssupModel = new AssessmentSupervisions();
        this.secasssupData = [];
        this.secasssupModel = new AssessmentSupervisions();
        this.asssectData = [];
        this.asssectModel = new Assessments();
        this.retriveDisabled = false;
        this.namesReadOnly = false;
        this.enableData = false;
        this.sectDisabled = true;
        this.caseDisabled = true;
        this.enableResData = false;
    }
    enforceMinMaXCahnges = () => {

    }
    getEnforcementFlag() {

        const obj = this.oimslevlFactory.getEnforcementFlag(this.enforceAssementId);
        obj.subscribe(data => {
            if (data) {
                if (data === 'Y') {
                    this.enforcementFalgTemp = true;
                } else {
                    this.enforcementFalgTemp = false;
                }
            }
        })
    }



    onRowClickasstype(event) {
        if (this.typeasssupData.length > 0) {
            this.enforceMinMaxDisabled = false;

        } else {
            this.enforceMinMaxDisabled = true;

        }

        if (event) {
            this.serviceObj = this.oimslevlFactory.
                rgAssessmentResultsRecordGroup(event.assessmentId);
            this.serviceObj.subscribe(data => {
                if (data.length >= 0) {
                    this.disableLov = true;
                } else {
                    this.disableLov = false;
                }
            });
        }
        if (event) {
            this.enforceAssementId = event.assessmentId;
            this.getEnforcementFlag();
        }

        if (event) {
            this.asstypeModel = event;
            this.typeasssupModel = new AssessmentSupervisions();
            if (this.asstypeModel.assessmentId) {
                this.typeasssupModel.assessmentId = this.asstypeModel.assessmentId;
                this.checkLovData();
                this.typeasssupExecuteQuery();
                this.assSectExecuteQuery();
            }
            this.enableData = true;
        } else {
            this.enableData = false;

        }
    }
    updateEnforcementFlag() {
        const obj = this.oimslevlFactory.updateEnforcementFlag(this.asstypeModel.parentAssessmentId, (this.enforcementFalgTemp === true) ? 'Y' : 'N');
        obj.subscribe(data => {
            if (data == 1) {

            }

        })
    }

    changeTheEnforcement(event) {
        this.typeAssSupGrid.setColumnData('answerValue', 0, '');
        this.enforcementFalgTemp === event;
    }


    checkLovData() {

        const serviceObj = this.oimslevlFactory.checkLovData(this.asstypeModel.assessmentId);
        serviceObj.subscribe(data => {
            if (data.length > 0 && data !== 'N') {
                this.enableData = true;
            } else if (data === 'N') {
                this.enableData = false;
            }
        });
    }

    onRowClickasssect(event) {
        if (event) {
            this.serviceObj = this.oimslevlFactory.
                rgAssessmentResultsRecordGroup(event.parentAssessmentId);
            this.serviceObj.subscribe(data => {
                if (data.length > 0 && event.sealFlag === true) {
                    this.sectLov = true;
                    this.enableResData = true;
                } else if (event.sealFlag === false) {
                    this.sectLov = false;
                    this.enableResData = false;
                }
            });
        }
        if (event) {
            this.activeEnable = false;
            this.asstypeModel = event;
            this.secasssupModel = new AssessmentSupervisions();
            if (this.asstypeModel.assessmentId) {
                this.secasssupModel.assessmentId = this.asstypeModel.assessmentId;
                this.secAssSupExecuteQuery();
            }
        }
    }


    assTypeExecuteQuery(date?) {
        this.deleData = true;
        if (date) {
            if (date.lastValue === '0_/__/____') {
                this.type = 'warn';
                this.message = this.translateService.translate('common.leapyearnotallowed');
                this.show();
                this.clearDisabled = true;
                this.asstypeSearchModel = new Assessments();
                return;
            }
            if (String(date.lastValue).indexOf('_') >= 0 && date.value === null) {
                this.type = 'warn';
                this.message = this.translateService.translate('common.datemustbeentervalidformat');
                this.show();

                this.clearDisabled = true;
                this.asstypeSearchModel = new Assessments();
                return;
            }
        }

        const serviceObj = this.oimslevlFactory.assTypeExecuteQuery(this.asstypeSearchModel);
        serviceObj.subscribe(data => {
            if (data.length === 0) {
                this.asstypeData = [];
                this.type = 'warn';
                this.message = this.translateService.translate('oimslevl.noRecord');
                this.show();
                this.asstypeSearchModel = new Assessments();

                return;
            } else {
                data.forEach(element => {
                    this.assessmentId = data[0].assessmentId;

                    element.activeFlag = element.activeFlag === 'Y' ? true : false;
                });
                this.asstypeData = data;
                this.retriveDisabled = true;
                this.namesReadOnly = true;
                this.clearDisabled = false;
                this.asstypeModel = this.asstypeData[0];
                this.enableData = true;


                this.assTypeIndex = 0;
            }
        });


    }

    typeasssupExecuteQuery() {

        const typeasssupResult = this.oimslevlFactory.
            typeAssSupExecuteQuery(this.typeasssupModel);
        typeasssupResult.subscribe(typeasssupResultList => {
            this.deleData = true;
            if (typeasssupResultList.length === 0) {
                this.typeasssupData = [];
                this.enforceMinMaxDisabled = true;

            } else {
                typeasssupResultList.forEach(element => {
                    element.activeFlag = element.activeFlag === 'Y' ? true : false;

                });

                this.typeasssupData = typeasssupResultList;
                this.typeasssupModel = typeasssupResultList[0];
                this.calAssIndex = 0;
                this.enforceMinMaxDisabled = false;
            }
        });
    }

    assSectExecuteQuery() {
        const serviceObj = this.oimslevlFactory.assSectExecuteQuery(this.asstypeModel);
        serviceObj.subscribe(data => {
            if (data.length === 0) {
                this.asssectData = [];
                if (this.asssectData.length === 0) {
                    this.secasssupData = [];
                    this.sectDisabled = true;
                    this.caseDisabled = true;
                    this.enableResData = false;
                }
            } else {
                this.enableResData = true;
                data.forEach(element => {
                    element.sectScoreIncludeFlag = element.sectScoreIncludeFlag === 'Y' ? true : false;
                    element.sectScoreOverrideFlag = element.sectScoreOverrideFlag === 'Y' ? true : false;
                    if (element.activeFlag === 'Y' || element.activeFlag === true) {

                        element.sealFlag = true;
                        element.activeFlag = element.activeFlag === 'Y' ? true : false;
                    } else {

                        this.enableResData = false;
                        element.sealFlag = false;
                        element.activeFlag = element.activeFlag === 'Y' ? true : false;
                    }

                });
                this.asssectData = data;
                this.asssectModel = this.asssectData[0];
                this.secAsIndex = 0;
                this.sectDisabled = false;
                this.caseDisabled = false;
            }
        });
    }



    secAssSupExecuteQuery() {
        const secasssupResult = this.oimslevlFactory.secAssSupExecuteQuery(this.secasssupModel);
        secasssupResult.subscribe(secasssupResultList => {
            this.deleData = true;
            if (secasssupResultList.length === 0) {
                this.secasssupData = [];
                //this.enableResData = false;

            } else {

                secasssupResultList.forEach(element => {
                    this.secAssId = element.assessmentId;
                    element.parentAssessmentId = this.typeasssupModel.assessmentId;
                    element.activeFlag = element.activeFlag === 'Y' ? true : false;

                });

                this.secasssupData = secasssupResultList;
                this.secasssupModel = this.secasssupData[0];
                this.resultIndex = 0;
            }
        });
    }

    numberValidation = (event) => {

        if (event.field === 'maxScore' || event.field === 'miniScore') {
            if (event.data.miniScore != null && event.data.maxScore != null) {
                if (Number(event.data.miniScore) > Number(event.data.maxScore)) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('oimslevl.maxmin');
                    this.show();
                    return true;
                }
            }

        }

        if (event.field === 'effectiveDate') {

            if (DateFormat.compareDate(DateFormat.getDate(event.data.effectiveDate), DateFormat.getDate()) === 1) {

                this.type = 'warn';
                this.message = this.translateService.translate('oimslevl.effDate');
                this.show();
                return true;
            }
        }
        return true;
    }
    validateRowData = (event) => {
        const rowdata = new ValidateRowReturn();
        const rowIndex = event.rowIndex;
        if (event.field === 'sectScoreIncludeFlag' && (event.data.sectScoreIncludeFlag)) {
            this.asssectgrid.setColumnData('sectScoreOverrideFlag', rowIndex, false);
        }
        if (event.field === 'sectScoreOverrideFlag' && (event.data.sectScoreOverrideFlag)) {
            this.asssectgrid.setColumnData('sectScoreIncludeFlag', rowIndex, false);
        }
            rowdata.validated = true;
            return rowdata;
        }
    validateTypeAssSupRowData = (event) => {
        const rowIndex = event.rowIndex;
        const rowdata = new ValidateRowReturn();
        this.miniScore = false;
        if (event.field === 'activeFlag') {

            if (event.data.activeFlag) {
                this.typeAssSupGrid.setColumnData('expiryDate', rowIndex, undefined);
                rowdata.validated = true;
                return rowdata;
            } else if (!event.data.activeFlag) {
                this.typeAssSupGrid.setColumnData('expiryDate', rowIndex, DateFormat.getDate(DateFormat.getDate().setHours(0, 0, 0, 0)));
                rowdata.validated = true;
                return rowdata;
            }
        }

        if (this.numberValidation(event)) {
            rowdata.validated = true;
            return rowdata;

        }

        rowdata.validated = true;
        return rowdata;
    }


    validateSecAssSupRowData = (event) => {

        const rowIndex = event.rowIndex;
        const rowdata = new ValidateRowReturn();
        if (event.field === 'activeFlag') {

            if (event.data.activeFlag) {
                this.typeSecAssSupGrid.setColumnData('expiryDate', rowIndex, undefined);
                rowdata.validated = true;
                return rowdata;
            } else if (!event.data.activeFlag) {
                this.typeSecAssSupGrid.setColumnData('expiryDate', rowIndex, DateFormat.getDate(DateFormat.getDate().setHours(0, 0, 0, 0)));
                rowdata.validated = true;
                return rowdata;
            }
        }

        if (this.numberValidation(event)) {
            rowdata.validated = true;
            return rowdata;
        }

        rowdata.validated = true;
        return rowdata;
    }



    onAssTypeBlur() {
        if (!this.asstypeSearchModel.description) {
            this.asstypeSearchModel.description = this.asstypeSearchModel.description === '' ? undefined : '';
        }
    }



    oismlevlValidations() {
        const is = { valid: true };

        if (this.typeasssupData.length > 0) {
            this.typeasssupData.forEach(data => {

                if (!data.supervisionLevelType) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('oimslevl.calsResult');
                    this.show();
                    is.valid = false;
                    return;
                }

                if (data.miniScore === undefined || data.miniScore === null) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('oimslevl.minscore');
                    this.show();
                    is.valid = false;
                    return;
                }
                if (data.maxScore === undefined || data.maxScore === null) {
                    this.message = this.translateService.translate('oimslevl.maxscore');
                    this.show();
                    is.valid = false;
                    this.type = 'warn';
                    return;
                }
                if (data.miniScore && data.maxScore) {
                    this.minScoreTemp = Number(data.miniScore);
                    this.maxScoreTemp = Number(data.maxScore);

                }

                if (data.miniScore && data.maxScore) {
                    if (Number(data.miniScore) > Number(data.maxScore)) {
                        this.type = 'warn';
                        this.message = this.translateService.translate('oimslevl.maxmin');
                        is.valid = false;
                        this.show();
                        return;
                    }
                }
                if (data.maxScore === 0 && data.miniScore) {
                    if (Number(data.miniScore) > Number(data.maxScore)) {
                        this.type = 'warn';
                        this.message = this.translateService.translate('oimslevl.maxmin');
                        this.show();
                        is.valid = false;
                        return;
                    }
                }
                if (data.miniScore === 0 && data.maxScore) {
                    if (Number(data.miniScore) > Number(data.maxScore)) {
                        this.type = 'warn';
                        this.message = this.translateService.translate('oimslevl.maxmin');
                        this.show();
                        is.valid = false;
                        return;
                    }

                }

            });

        }

        return is.valid;
    }


    oimslevlResultValidations() {

        const is = { valid: true };
        if (this.secasssupData.length > 0) {
            this.secasssupData.forEach(data => {

                if (!data.supervisionLevelType) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('oimslevl.calsResult');
                    this.show();
                    is.valid = false;
                    return;
                }

                if (data.miniScore === undefined || data.miniScore === null) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('oimslevl.minscore');
                    this.show();
                    is.valid = false;
                    return;
                }
                if (data.maxScore === undefined || data.maxScore === null) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('oimslevl.maxscore');
                    this.show();
                    is.valid = false;
                    return;
                }

                if (data.miniScore && data.maxScore) {
                    if (Number(data.miniScore) > Number(data.maxScore)) {
                        this.type = 'warn';
                        this.message = this.translateService.translate('oimslevl.maxmin');
                        this.show();
                        is.valid = false;
                        return;
                    }
                }

                if (data.maxScore === 0 && data.miniScore) {
                    if (Number(data.miniScore) > Number(data.maxScore)) {
                        this.type = 'warn';
                        this.message = this.translateService.translate('oimslevl.maxmin');
                        this.show();
                        is.valid = false;
                        return;
                    }
                }
                if (data.miniScore === 0 && data.maxScore) {
                    if (Number(data.miniScore) > Number(data.maxScore)) {
                        this.type = 'warn';
                        this.message = this.translateService.translate('oimslevl.maxmin');
                        this.show();
                        is.valid = false;
                        return;
                    }

                }

                if (data.effectiveDate) {

                    if (DateFormat.compareDate(DateFormat.getDate(data.effectiveDate), DateFormat.getDate()) === 1) {
                        this.type = 'warn';
                        this.message = this.translateService.translate('oimslevl.effDate');
                        this.show();
                        is.valid = false;
                        return;
                    }
                }

            });

        }
        return is.valid;
    }



    oimslevlSavetypeasssupForm(event) {
        this.updateEnforcementFlag();
        if (!this.oismlevlValidations()) {
            return;
        }
        this.typeasssupInsertList = event.added;
        this.typeasssupUpdatetList = event.updated;
        this.typeasssupDeleteList = event.removed;
        this.typeasssupCommitModel.insertList = [];
        this.typeasssupCommitModel.updateList = [];
        this.typeasssupCommitModel.deleteList = [];
        if (this.typeasssupInsertList.length > 0 || this.typeasssupUpdatetList.length > 0) {
            for (let i = 0; i < this.typeasssupInsertList.length; i++) {
                if (this.asstypeModel.assessmentClass === 'SECT') {
                    this.typeasssupInsertList[i].assessmentId = this.asstypeModel.parentAssessmentId;
                } else if (this.asstypeModel.assessmentClass === 'TYPE') {
                    this.typeasssupInsertList[i].assessmentId = this.asstypeModel.assessmentId;
                }
                this.typeasssupInsertList[i].updateAllowedFlag = 'Y';
                if (this.typeasssupInsertList[i].expiryDate) {
                    const effectiveDate = DateFormat.getDate(this.typeasssupInsertList[i].effectiveDate);
                    const expDate = DateFormat.getDate(this.typeasssupInsertList[i].expiryDate);
                    if (DateFormat.compareDate(effectiveDate, expDate) === 1) {
                        this.type = 'warn';
                        this.message = this.translateService.translate('common.expirydatecannot');
                        this.show();
                        return;
                    }
                }
                this.typeasssupInsertList[i].activeFlag = this.typeasssupInsertList[i].activeFlag ? 'Y' : 'N';
                this.typeasssupCommitModel.insertList = this.typeasssupInsertList;

            }
            for (let i = 0; i < this.typeasssupUpdatetList.length; i++) {
                this.typeasssupUpdatetList[i].updateAllowedFlag = 'Y';
                if (this.typeasssupUpdatetList[i].expiryDate) {
                    const effectiveDate = DateFormat.getDate(this.typeasssupUpdatetList[i].effectiveDate);
                    const expDate = DateFormat.getDate(this.typeasssupUpdatetList[i].expiryDate);
                    if (DateFormat.compareDate(effectiveDate,
                        expDate) === 1) {
                        this.type = 'warn';
                        this.message = this.translateService.translate('common.expirydatecannot');
                        this.show();
                        return;
                    }
                }
                this.typeasssupUpdatetList[i].activeFlag = this.typeasssupUpdatetList[i].activeFlag ? 'Y' : 'N';

                this.typeasssupCommitModel.updateList = this.typeasssupUpdatetList;
            }

        }
        if (this.typeasssupDeleteList.length > 0) {
            for (let i = 0; i < this.typeasssupDeleteList.length; i++) {
                this.typeasssupCommitModel.deleteList = this.typeasssupDeleteList;


            }

        }
        const typeasssupSaveData = this.oimslevlFactory.typeAssSupCommit(this.typeasssupCommitModel);
        typeasssupSaveData.subscribe(data => {

            if (String(data[0].errorMessage).indexOf('ASSESSMENT_SUPVERSIONS_PK') > 0) {
                this.type = 'warn';
                this.message = this.translateService.translate('oimslevl.rowExist');
                this.show();
                this.typeasssupExecuteQuery();
                return;
            } else if (data[0] && data[0].listSeq === 5) {
                this.type = 'success';
                this.type = 'warn';
                this.message = this.translateService.translate('oimslevl.delete');
                this.show();
                this.typeasssupExecuteQuery();
            } else if (data[0] && data[0].listSeq === 1) {
                this.type = 'success';
                this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
                this.show();
                this.typeasssupExecuteQuery();
            } else {
                this.type = 'warn';
                this.message = this.translateService.translate('common.addupdateremoverecordfailed');
                this.show();
                this.typeasssupExecuteQuery();
            }
        });
    }

    oimslevlSavesecasssupForm(event) {



        if (!this.oimslevlResultValidations()) {
            return;
        }

        this.secasssupInsertList = [];
        this.secasssupUpdatetList = [];
        this.secasssupDeleteList = [];
        this.secasssupInsertList = event.added;
        this.secasssupUpdatetList = event.updated;
        this.secasssupDeleteList = event.removed;
        this.secasssupCommitModel.insertList = [];
        this.secasssupCommitModel.updateList = [];
        this.secasssupCommitModel.deleteList = [];
        if (this.secasssupInsertList.length > 0 || this.secasssupDeleteList.length > 0 || this.secasssupUpdatetList.length > 0) {
            for (let i = 0; i < this.secasssupInsertList.length; i++) {
                this.secasssupInsertList[i].assessmentId = this.asstypeModel.assessmentId;
                this.secasssupInsertList[i].updateAllowedFlag = 'Y';
                if (this.secasssupInsertList[i].expiryDate) {
                    const effectiveDate = DateFormat.getDate(this.secasssupInsertList[i].effectiveDate);
                    const expDate = DateFormat.getDate(this.secasssupInsertList[i].expiryDate);
                    if (DateFormat.compareDate(effectiveDate,
                        expDate) === 1) {
                        this.type = 'warn';
                        this.message = this.translateService.translate('common.expirydatecannot');
                        this.show();
                        return;
                    }
                }
                this.secasssupInsertList[i].activeFlag = this.secasssupInsertList[i].activeFlag ? 'Y' : 'N';
                this.secasssupCommitModel.insertList = this.secasssupInsertList;

            }
            for (let i = 0; i < this.secasssupUpdatetList.length; i++) {
                this.secasssupUpdatetList[i].assessmentId = this.asstypeModel.assessmentId;
                this.secasssupUpdatetList[i].updateAllowedFlag = 'Y';
                if (this.secasssupUpdatetList[i].expiryDate) {
                    const effectiveDate = DateFormat.getDate(this.secasssupUpdatetList[i].effectiveDate);
                    const expDate = DateFormat.getDate(this.secasssupUpdatetList[i].expiryDate);
                    if (DateFormat.compareDate(effectiveDate,
                        expDate) === 1) {
                        this.type = 'warn';
                        this.message = this.translateService.translate('common.expirydatecannot');
                        this.show();
                        return;
                    }
                }
                this.secasssupUpdatetList[i].activeFlag = this.secasssupUpdatetList[i].activeFlag ? 'Y' : 'N';
                this.secasssupCommitModel.updateList = this.secasssupUpdatetList;

            }


        }
        for (let i = 0; i < this.secasssupDeleteList.length; i++) {
            this.secasssupCommitModel.deleteList = this.secasssupDeleteList;
        }


        const secasssupSaveData = this.oimslevlFactory.secAssSupCommit(this.secasssupCommitModel);
        secasssupSaveData.subscribe(data => {
            if (String(data[0].errorMessage).indexOf('OMS_OWNER.ASSESSMENT_SUPVERSIONS_PK') > 0) {
                this.type = 'warn';
                this.message = this.translateService.translate('oimslevl.rowExist');
                this.show();
                this.secasssupModel.assessmentId = this.asstypeModel.assessmentId;
                this.secAssSupExecuteQuery();
                return;
            } else if (data[0] && data[0].listSeq === 5) {
                this.type = 'warn';
                this.message = this.translateService.translate('oimslevl.delete');
                this.show();
                this.secasssupModel.assessmentId = this.asstypeModel.assessmentId;
                this.secAssSupExecuteQuery();
            } else if (data[0] && data[0].listSeq === 1) {
                this.type = 'success';
                this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
                this.show();
                this.secasssupModel.assessmentId = this.asstypeModel.assessmentId;
                this.secAssSupExecuteQuery();
                return;
            } else {
                this.type = 'warn';
                this.message = this.translateService.translate('common.addupdateremoverecordfailed');
                this.show();
                this.secasssupModel.assessmentId = this.asstypeModel.assessmentId;
                this.secAssSupExecuteQuery();
                return;
            }
        });

    }

    onGridInsertCAC = () => {

        if (!this.oismlevlValidations()) {
            return false;
        }
        this.deleData = false;


        return {
            effectiveDate: DateFormat.getDate(),
            assessmentId: this.typeasssupModel.assessmentId,
            supervisionLevelType: this.codes,

            activeFlag: 'true'


        };
    }

    onGridInsertCSC = () => {

        if (!this.oimslevlResultValidations()) {
            return false;
        }
        this.deleData = false;
        this.typeSecAssSupGrid.prepareAgColumnDef();

        return {
            effectiveDate: DateFormat.getDate(),
            parentAssessmentId: this.typeasssupModel.assessmentId,
            supervisionLevelType: this.codes,
            activeFlag: 'true',
        };

    }

    onCommitSectionsDetails(event) {
        this.asssectInsertListUpdateList = [];
        this.assessmentscommitModel.updateList = [];
        this.asssectInsertListUpdateList = event.updated;
        if (this.asssectInsertListUpdateList.length > 0) {
            for (let i = 0; i < this.asssectInsertListUpdateList.length; i++) {
                const duplicate = this.asssectData.filter(e => e.sectScoreOverrideFlag && e.sectScoreOverrideFlag !== 'N');
                if (duplicate.length > 1) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('oimslevl.onlyoneoverridetotalflagshouldbeactive');
                    this.show();
                    return;
                }
                this.asssectInsertListUpdateList[i].sectScoreIncludeFlag = this.asssectInsertListUpdateList[i].sectScoreIncludeFlag ? 'Y' : 'N';
                this.asssectInsertListUpdateList[i].sectScoreOverrideFlag = this.asssectInsertListUpdateList[i].sectScoreOverrideFlag ? 'Y' : 'N';
            }
            this.assessmentscommitModel.updateList = this.asssectInsertListUpdateList;
            const obj = this.oimslevlFactory.updateSectionsDetails(this.assessmentscommitModel);
            obj.subscribe(data => {
                if (data === 1) {
                    this.type = 'success';
                    this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
                    this.show();
                    this.assTypeExecuteQuery();
                } else {
                    this.type = 'warn';
                    this.message = this.translateService.translate('common.addupdateremoverecordfailed');
                    this.show();
                }
            });
        }
    }

} 
