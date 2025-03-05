import {
    Component, OnInit, ViewChild
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OidmbrdtService } from '../service/oidmbrdt.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { OffenderAssessments } from '@inst/classification/beans/OffenderAssessments';
import { OffenderStgAffiliations } from '@inst/securitythreatgroups/beans/OffenderStgAffiliations';
import { OffenderStgDetails } from '@inst/securitythreatgroups/beans/OffenderStgDetails';
import { FormAccessibleForms } from '@inst/securitythreatgroups/beans/FormAccessibleForms';
import { VHeaderBlock } from '@commonbeans/VHeaderBlock';
import { DateFormat } from '@ui-components/datepicker/dateFormat';
import { LovService } from '@ui-components/lov/lov.service';
import { DialogService } from '@ui-components/dialog/dialog.service';
import { ValidateRowReturn } from '@core/ui-components/grid/grid.component';
import { Router } from '@angular/router';
import { OffenderStgAffiliationsCommitBean } from '@inst/securitythreatgroups/beans/OffenderStgAffiliationsCommitBean';
import { OffenderSearchService } from '@common/offender-records/service/offender-search.service';
import { OidcnoteService } from '@inst/casemanagement/service/oidcnote.service';
@Component({
    selector: 'app-oidmbrdt',
    templateUrl: './oidmbrdt.component.html'
})

export class OidmbrdtComponent implements OnInit {
    scoreFlag: boolean;
    changeFlag: boolean;
    readonlyFlag: boolean;
    commentFlag: boolean;
    routerChild: any[] = [];
    @ViewChild('grid') grid: any;
    msgs: any[] = [];
    offenderassessmentsData: OffenderAssessments[] = [];
    offenderassessmentsModel: OffenderAssessments = new OffenderAssessments();
    offenderstgaffiliationsData: OffenderStgAffiliations[] = [];
    offenderstgaffiliationsModel: OffenderStgAffiliations = new OffenderStgAffiliations();
    offenderstgaffiliationsInsertList: OffenderStgAffiliations[] = [];
    offenderstgaffiliationsUpdateList: OffenderStgAffiliations[] = [];
    offenderstgaffiliationsDeleteList: OffenderStgAffiliations[] = [];
    offenderstgdetailsData: OffenderStgDetails[] = [];
    offenderstgdetailsModel: OffenderStgDetails = new OffenderStgDetails();
    formaccessibleformsData: FormAccessibleForms[] = [];
    formaccessibleformsModel: FormAccessibleForms = new FormAccessibleForms();
    disabled: boolean;
    offenderStgAffiliationsColumnDef: any[];
    formAccessibleFormsColumnDef: any[];
    vHeaderBlockModel: VHeaderBlock = new VHeaderBlock();
    selectedIndex = -1;
    groupLink: string;
    grouptitles: any;
    routerpath: string[] = [];
    selectedForm = -1;
    selectedAffIndex = -1;
    offenderstgaffiliationsCommitModel: OffenderStgAffiliationsCommitBean = new OffenderStgAffiliationsCommitBean();
    disableFlag: boolean;
    appendFlag: boolean;
    saveFlag: boolean;
    constructor(private oidmbrdtFactory: OidmbrdtService, public translateService: TranslateService,
        public sessionManager: UserSessionManager, private lovService: LovService, private dialogService: DialogService,
        private router: Router, private offenderSearchService: OffenderSearchService, private oidcnoteFactory: OidcnoteService) {
        this.offenderStgAffiliationsColumnDef = [];
        this.formAccessibleFormsColumnDef = [];
    }
    ngOnInit() {
        this.oidmbrdtFactory.viewBtnFlag = false;
        this.disableFlag = true;
        this.appendFlag = true;
        this.changeFlag = true;
        this.readonlyFlag = true;
        this.scoreFlag = true;
        this.commentFlag = true;
        this.saveFlag = true;
        const routerComponets = this.router.config;
        this.routerpath = routerComponets.map(ele => ele.path);
        this.routerChild = [];
        this.offenderStgAffiliationsColumnDef = [
            { fieldName: this.translateService.translate('common.date') + '*', field: 'effectiveDate', editable: true,
             width: 150, datatype: 'date', cellEditable: this.canOffAffEdit },
            {
                fieldName: this.translateService.translate('common.group') + '*', field: 'stgId', editable: true, width: 150,
                 datatype: 'lov', link: this.groupLink,titles: this.grouptitles, cellEditable: this.canOffAffEdit, source:'OIMTGNGS'
            },
            {
                fieldName: this.translateService.translate('common.reason') + '*', field: 'reasonCode', editable: true, width: 150,
                datatype: 'lov', domain: 'MBR_AFF_RSN', cellEditable: this.canOffAffEdit,
                titles: { code: this.translateService.translate('oidmbrdt.reasoncode'),
                 description: this.translateService.translate('common.description') }
            },
            {
                fieldName: this.translateService.translate('common.enteredby'), field: 'createUserId', editable: false, width: 150
            },
            {
                fieldName: this.translateService.translate('common.active'), field: 'activeFlag',
                 editable: true, width: 150, datatype: 'checkbox', cellEditable: this.canOffAffEdit
            },
            {
                fieldName: this.translateService.translate('common.expirydate'), field: 'expiryDate',
                 editable: false, width: 150, datatype: 'date'
            },
            {
                fieldName: this.translateService.translate('common.expiredby'), field: 'expiredBy', editable: false, width: 150
            },
            {
                fieldName: this.translateService.translate('oidmbrdt.expiryreason'), field: 'expiryReasonCode', editable: true,
                datatype: 'lov', domain: 'MBR_EXP_RSN', cellEditable: this.canOffAffEdit,
                titles: { code: this.translateService.translate('oidmbrdt.reasoncode'),
                 description: this.translateService.translate('common.description') }
            },
            { fieldName: '', field: 'hideValue', hide: true },
        ];
        routerComponets.filter(ele => {
            if (ele.children && Array.isArray(ele.children)) {
                return true;
            } else {
                return false;
            }
        }).forEach(ele => ele.children.forEach(data => this.routerChild.push(data.path)));
        this.routerpath.push(...this.routerChild);
        this.vHeaderBlockModel = this.offenderSearchService.selectedOffender;
        if (!this.offenderSearchService.selectedOffender) {
            this.show('common.pleasesearchforvalidoffender');
        }
        this.populateRgQuery();
        this.grouptitles = this.grouptitles = {
            description1: this.translateService.translate('common.description'),
            stgCode: this.translateService.translate('common.stgcode')
        };
        this.formAccessibleFormsColumnDef = [
            {
                fieldName: this.translateService.translate('common.accessibleforms'), field: 'description',
                editable: false, width: 150
            },
            { fieldName: this.translateService.translate('common.data'), field: 'checkFlag',
             editable: false, width: 150, datatype: 'checkbox' },
            {
                fieldName: '', field: 'butView', datatype: 'launchbutton', editable: false, width: 150,
                link: '/', modal: true, updateField: 'row', onLaunchClick: this.viewLaunchClick, isDisable: this.disableCell,
                data: 'row'
            },
        ];
    }
    populateRgQuery() {
        const serviceObject = this.oidmbrdtFactory.
            populateRg();
        serviceObject.subscribe(data => {
            if (data.profileValue === '1') {
                this.groupLink = 'oidmbrdt/rgStg1RecordGroup';
            } else if (data.profileValue === '2') {
                this.groupLink = 'oidmbrdt/rgStg2RecordGroup';
            } else if (data.profileValue === '3') {
                this.groupLink = 'oidmbrdt/rgStg3RecordGroup';
            } else {

            }
            this.setColumnDef();
        });
    }
    /**
    * To display the Affiliation block grid data
    */
    setColumnDef() {
        this.offenderStgAffiliationsColumnDef = [
            { fieldName: this.translateService.translate('common.date') + '*', field: 'effectiveDate', editable: true,
             width: 150, datatype: 'date', cellEditable: this.canOffAffEdit },
            {
                fieldName: this.translateService.translate('common.group') + '*', field: 'stgId', editable: true, width: 150,
                 datatype: 'lov', link: this.groupLink, titles: this.grouptitles, cellEditable: this.canOffAffEdit
            },
            {
                fieldName: this.translateService.translate('common.reason') + '*', field: 'reasonCode', editable: true, width: 150,
                datatype: 'lov', domain: 'MBR_AFF_RSN', cellEditable: this.canOffAffEdit,
                titles: { code: this.translateService.translate('oidmbrdt.reasoncode'),
                 description: this.translateService.translate('common.description') }
            },
            {
                fieldName: this.translateService.translate('common.enteredby'), field: 'createUserId', editable: false, width: 150
            },
            {
                fieldName: this.translateService.translate('common.active'), field: 'activeFlag',
                 editable: true, width: 150, datatype: 'checkbox', cellEditable: this.canOffAffEdit
            },
            {
                fieldName: this.translateService.translate('common.expirydate'), field: 'expiryDate',
                 editable: false, width: 150, datatype: 'date'
            },
            {
                fieldName: this.translateService.translate('common.expiredby'), field: 'expiredBy', editable: false, width: 150
            },
            {
                fieldName: this.translateService.translate('oidmbrdt.expiryreason'), field: 'expiryReasonCode', editable: true,
                datatype: 'lov', domain: 'MBR_EXP_RSN', cellEditable: this.canOffAffEdit,
                titles: { code: this.translateService.translate('oidmbrdt.reasoncode'),
                 description: this.translateService.translate('common.description') }
            },
            { fieldName: '', field: 'hideValue', hide: true },
        ];
        this.grid.columnDefs = this.offenderStgAffiliationsColumnDef;
        this.grid.prepareAgColumnDef();
    }
    /**
    * To display the messages
    */
    show(vldmsg, type?) {
        type = type ? type : 'warn';
        vldmsg = this.translateService.translate(vldmsg);
        const msgval = [{ message: vldmsg, type: type }];
        this.msgs = [...msgval];
    }
    /**
   *  This function will be executed when we select the offender in header block
   */
    onOffenderChange(offender) {
        this.vHeaderBlockModel = offender;
        if (offender) {
            this.offenderassessmentsModel = new OffenderAssessments();
            this.offenderassessmentsData = [];
            this.offenderassessmentsExecuteQuery();
            this.offenderStgAffiliationexecuteQuery();
            this.formaccessibleformsExecuteQuery();
            this.scoreFlag = false;
            this.changeFlag = true;
        } else {
            this.disableFlag = true;
            this.appendFlag = true;
            this.offenderassessmentsModel = new OffenderAssessments();
            this.offenderassessmentsData = [];
            this.offenderstgaffiliationsData = [];
            this.offenderstgaffiliationsModel = new OffenderStgAffiliations();
            this.offenderstgdetailsData = [];
            this.offenderstgdetailsModel = new OffenderStgDetails();
            this.readonlyFlag = true;
            this.scoreFlag = true;
            this.changeFlag = true;
            this.commentFlag = true;
            this.formaccessibleformsData = [];
            this.formaccessibleformsModel = new FormAccessibleForms();
        }
    }
    /**
      *  This function will be executed when we select the offender in header block
      */
    offenderassessmentsExecuteQuery(event?) {
        this.selectedIndex = 0;
        this.offenderassessmentsModel.offenderBookId = this.vHeaderBlockModel.offenderBookId;
        const offenderassessmentsResult = this.oidmbrdtFactory.
            offenderAssessmentsExecuteQuery(this.offenderassessmentsModel);
        offenderassessmentsResult.subscribe(offenderassessmentsResultList => {
            if (offenderassessmentsResultList.length === 0) {
                this.offenderassessmentsData = [];
                if (event) {
                    this.scoreFlag = false;
                    this.readonlyFlag = false;
                    this.selectedIndex = -1;
                    this.show(this.translateService.translate('common.querycausednorecords'), 'warn');
                }
            } else {
                this.scoreFlag = true;
                this.readonlyFlag = true;
                this.offenderassessmentsData = offenderassessmentsResultList;
                this.offenderassessmentsModel = offenderassessmentsResultList[0];
                this.offenderassessmentsModel.assessmentDate = DateFormat.getDate(this.offenderassessmentsModel.assessmentDate);
            }
        });
    }
    afterAssesmentDlgClosed() {
        this.offenderassessmentsModel = new OffenderAssessments();
        this.offenderassessmentsExecuteQuery();
    }
    /**
      *  This function will be executed when we click on next button in Conformation Assessment Detail block
      */
    onButNextclick() {
        if (this.offenderassessmentsData[this.selectedIndex + 1]) {
            this.selectedIndex++;
            this.offenderassessmentsModel = this.offenderassessmentsData[this.selectedIndex];
            this.offenderassessmentsModel.assessmentDate = DateFormat.getDate(this.offenderassessmentsModel.assessmentDate);
        }
    }
    /**
      *  This function will be executed when we click on previous button in Conformation Assessment Detail block
      */
    onButPreviousclick() {
        if (this.offenderassessmentsData[this.selectedIndex - 1]) {
            this.selectedIndex--;
            this.offenderassessmentsModel = this.offenderassessmentsData[this.selectedIndex];
            this.offenderassessmentsModel.assessmentDate = DateFormat.getDate(this.offenderassessmentsModel.assessmentDate);
        }
    }
    /**
      *  This function will be executed when we click on clear button in Conformation Assessment Detail block
      */
    onButClear() {
        this.readonlyFlag = false;
        this.offenderassessmentsModel = new OffenderAssessments();
        this.offenderassessmentsData = [];
        this.selectedIndex = -1;
        this.scoreFlag = false;
    }
    /**
     *  This function is used to enable/disable next button
     */
    get nextBtnFlg() {
        if (this.offenderassessmentsData.length === 0 ||
            this.selectedIndex === this.offenderassessmentsData.length - 1 || this.vHeaderBlockModel === undefined) {
            return true;
        } else {
            return false;
        }
    }
    /**
      *  This function is used to enable/disable previous button
      */
    get previousBtnFlg() {
        if (this.selectedIndex === 0 || this.vHeaderBlockModel === undefined || this.offenderassessmentsData.length === 0) {
            return true;
        } else {
            return false;
        }
    }
    /**
      *  This function is used to enable/disable retrieve button
      */
    get rettBtnFlg() {
        if (this.selectedIndex !== -1 || this.vHeaderBlockModel === undefined) {
            return true;
        } else {
            return false;
        }
    }
    /**
      *  This function is used to enable/disable clear button
      */
    get clrBtnFlag(): boolean {
        if (this.isNull(this.offenderassessmentsModel.assessmentDate) && this.isNull(this.offenderassessmentsModel.assessmentTypeCode) &&
            this.isNull(this.offenderassessmentsModel.score) && this.isNull(this.offenderassessmentsModel.overrideUserId)) {
            return true;
        } else {
            return false;
        }
    }
    /**
    *  This function is used to enable/disable text boxes in confirmation Assessment Detail block
    */
    valueChangeEvent(event) {
        if (!this.vHeaderBlockModel) {
            this.readonlyFlag = true;
            this.changeFlag = true;
        } else if (event.keyCode === 37 || event.keyCode === 39 || !this.rettBtnFlg) {
            this.readonlyFlag = false;
            this.changeFlag = false;
        } else {
            this.readonlyFlag = true;
            this.changeFlag = true;
        }
    }
    scoreValueChangeEvent(evnt) {
        if (!this.vHeaderBlockModel) {
            this.changeFlag = true;
            this.scoreFlag = true;
        } else if (!this.rettBtnFlg) {
            this.changeFlag = false;
            this.scoreFlag = false;
        }
    }
    /**
     *  This function is used to enable/disable text boxes in confirmation Assessment Detail block
     */
    changeEvent(event) {
        if (!this.vHeaderBlockModel) {
            this.changeFlag = true;
        } else if (this.clrBtnFlag) {
            this.changeFlag = true;
        } else if (event.keyCode === 37 || event.keyCode === 39) {
            this.changeFlag = false;
        } else {
            this.changeFlag = true;
        }
    }
    isNull(value) {
        return value === null || value === undefined || value === '';
    }
    /**
     *  This function is used to enable/disable Assessment button
     */
    get assBtnFlg() {
        if (this.vHeaderBlockModel === undefined) {
            return true;
        } else {
            return false;
        }
    }
    /**
       *  This function is used to display the grid data Offender Details block
       */
    formaccessibleformsExecuteQuery() {
        this.selectedForm = -1;
        const formaccessibleformsResult = this.oidmbrdtFactory.
            formAccessibleFormsExecuteQuery(this.vHeaderBlockModel.offenderBookId, this.vHeaderBlockModel.offenderId);
        formaccessibleformsResult.subscribe(formaccessibleformsResultList => {
            if (formaccessibleformsResultList.length === 0) {
                this.formaccessibleformsData = [];
                this.formaccessibleformsModel = new FormAccessibleForms();
            } else {
                formaccessibleformsResultList.forEach(ele => {
                    ele.butView = this.translateService.translate('common.view');
                    if (ele.checkFlag) {
                        ele.checkFlag = ele.checkFlag === 'TRUE' ? true : false;
                    }
                });
                this.formaccessibleformsData = formaccessibleformsResultList;
                this.formaccessibleformsModel = formaccessibleformsResultList[0];
                this.selectedForm = 0;
            }
        });
    }
    /**
   *  This function will be executed when we click on View button in Offender Detail block
   */
    viewLaunchClick = (data) => {
        if (this.grid.addedMap.size > 0 || this.grid.updatedMap.size > 0) {
            this.show(this.translateService.translate('oidmbrdt.pleasesavetheaffrecordfirst'), 'warn');
            return false;
        }
        const suffix = this.routerChild.includes(data.destinationForm) ? 'DIALOG' : '';
        data['offenderBookId'] = this.vHeaderBlockModel.offenderBookId;
        data['offenderId'] = this.vHeaderBlockModel.offenderId;
        data['rootOffenderId'] = this.vHeaderBlockModel.rootOffenderId;
        data['stgId'] = this.offenderstgaffiliationsModel.stgId;

        if (suffix !== 'DIALOG') {
            this.oidmbrdtFactory.viewBtnFlag = true;
            this.dialogService.openLinkDialog(data.destinationForm, data, 80).subscribe(result => {
                this.formaccessibleformsExecuteQuery();
            });
        } else {
            this.oidmbrdtFactory.viewBtnFlag = true;
            this.router.navigate(['/' + data.destinationForm]);
        }
        return false;
    }
    /**
       *  This function will be executed to display the data in Affiliation block
       */
    offenderStgAffiliationexecuteQuery(index?) {
        this.selectedAffIndex = -1;
        this.offenderstgaffiliationsModel = new OffenderStgAffiliations();
        this.offenderstgaffiliationsModel.offenderBookId = this.vHeaderBlockModel.offenderBookId;
        const serviceObject = this.oidmbrdtFactory.
            offenderStgAffiliationsExecuteQuery(this.offenderstgaffiliationsModel);
        serviceObject.subscribe(data => {
            if (data.length === 0) {
                this.offenderstgaffiliationsData = [];
                this.offenderstgaffiliationsModel = new OffenderStgAffiliations();
                this.offenderstgdetailsModel = new OffenderStgDetails();
                this.commentFlag = true;
                this.appendFlag = true;
                this.disableFlag = true;
            } else {
                data.forEach(ele => {
                    ele.stgId = String(ele.stgId);
                    ele.activeFlag = ele.activeFlag === 'Y' ? 'true' : false;
                });
                this.offenderstgaffiliationsData = data;
                this.offenderstgaffiliationsModel = this.offenderstgaffiliationsData[0];
                this.selectedAffIndex = index ? index : 0;
            }
        });
    }
    /**
    *  This function will be executed when we select a record under Affiliation Block
    */
    onRowClickoffenderstgaffiliations(event) {
        if (event) {
            event['moduleName'] = 'OIDMBRDT';
            this.selectedAffIndex = this.offenderstgaffiliationsData.indexOf(event);
            this.offenderstgaffiliationsModel = event;
            this.commentFlag = false;
            this.saveFlag = true;
            if (event.commentText) {
                this.commentFlag = true;
                this.appendFlag = false;
            } else {
                this.appendFlag = true;
            }
            if (!event.stgSeq) {
                this.disableFlag = true;
            } else {
                this.disableFlag = false;
                this.offenderstgdetailsExecuteQuery();
            }
        } else {
            this.offenderstgaffiliationsModel = new OffenderStgAffiliations();
        }
    }
    /**
    *  This function will be executed when commit event is
   * fired
   */
    oidmbrdtSaveoffenderstgaffiliationsForm(event) {
        this.offenderstgaffiliationsInsertList = [];
        this.offenderstgaffiliationsUpdateList = [];
        this.offenderstgaffiliationsDeleteList = [];
        this.offenderstgaffiliationsInsertList = event.added;
        this.offenderstgaffiliationsUpdateList = event.updated;
        this.offenderstgaffiliationsDeleteList = event.removed;
        this.offenderstgaffiliationsCommitModel.insertList = [];
        this.offenderstgaffiliationsCommitModel.updateList = [];
        if (this.offenderstgaffiliationsInsertList.length > 0 || this.offenderstgaffiliationsUpdateList.length > 0) {
            for (let i = 0; i < this.offenderstgaffiliationsInsertList.length; i++) {
                if (!this.offenderstgaffiliationsInsertList[i].effectiveDate) {
                    this.show(this.translateService.translate('common.datemustbeentereddate'), 'warn');
                    return;
                }
                if (DateFormat.compareDate(this.offenderstgaffiliationsInsertList[i].effectiveDate, DateFormat.getDate()) === 1) {
                    this.show(this.translateService.translate('oidmbrdt.datemustbemequaltocurrentdate'), 'warn');
                    return;
                }
                if (!this.offenderstgaffiliationsInsertList[i].stgId) {
                    this.show(this.translateService.translate('oidmbrdt.groupmustbeentered'), 'warn');
                    return;
                }
                if (!this.offenderstgaffiliationsInsertList[i].reasonCode) {
                    this.show(this.translateService.translate('common.reasonmustbeentered'), 'warn');
                    return;
                }
                this.offenderstgaffiliationsInsertList[i].offenderBookId = this.vHeaderBlockModel.offenderBookId;
                this.offenderstgaffiliationsInsertList[i].createUserId = String(this.sessionManager.getId());
                this.offenderstgaffiliationsInsertList[i].createDatetime = DateFormat.getDate();

            }
            this.offenderstgaffiliationsCommitModel.insertList = this.offenderstgaffiliationsInsertList;
            this.offenderstgaffiliationsCommitModel.updateList = this.offenderstgaffiliationsUpdateList;
        }
        const offenderstgaffiliationsSaveData = this.oidmbrdtFactory.offenderStgAffiliationsCommit
            (this.offenderstgaffiliationsCommitModel);
        offenderstgaffiliationsSaveData.subscribe(data => {
            if (data === 2) {
                this.show(this.translateService.translate('oidmbrdt.activeaffiliationalreadyexists'),
                    'warn');
            } else if (data === 1) {
                this.show(this.translateService.translate('common.addupdateremoverecordsuccess'), 'success');
                this.offenderStgAffiliationexecuteQuery();
            } else {
                this.show(this.translateService.translate('common.addupdateremoverecordfailed'));
            }
        });
    }
    /**
   *  This function will be executed when we edit grid row data under Affiliation Block
   */
    canOffAffEdit = (data: any, index: number, field: string): boolean => {
        if (field === 'expiryReasonCode' && !data.activeFlag && data.expiryReasonCode) {
            return false;
        } else if (field === 'expiryReasonCode' && data.activeFlag) {
            return false;
        }
        if (data.offenderBookId && data.stgSeq) {
            if (field === 'effectiveDate' || field === 'stgId' || field === 'reasonCode') {
                return false;
            }
        }
        return true;
    }
    /**
    *  This function will be executed when we edit grid row data under Affiliation Block
    */
    validateAffiliationRowData = (event) => {
        const rowdata = new ValidateRowReturn();
        const rowIndex = event.rowIndex;
        if (event.field === 'activeFlag') {
            const serviceObj = this.oidmbrdtFactory.
                checkGroupFlag(event.data);
            serviceObj.subscribe(data => {
                if (data.length === 0) {
                    if (event.field === 'activeFlag' && !(event.data.activeFlag)) {
                        this.grid.setColumnData('expiryDate', rowIndex, DateFormat.getDate());
                        this.grid.setColumnData('expiredBy', rowIndex, this.sessionManager.getId());
                    } else if (event.field === 'activeFlag' && event.data.activeFlag) {
                        this.grid.setColumnData('expiryDate', rowIndex, undefined);
                        this.grid.setColumnData('expiredBy', rowIndex, undefined);
                        this.grid.setColumnData('expiryReasonCode', rowIndex, undefined);
                    }
                } else {
                    this.show(this.translateService.translate('oidmbrdt.activeaffiliationalreadyexists'), 'warn');
                    this.grid.setColumnData('activeFlag', rowIndex, false);
                }
            });

        }
        // if (event.field === 'effectiveDate' && event.data.stgSeq === undefined) {
        //     if (DateFormat.compareDate(event.data.effectiveDate, DateFormat.getDate()) === 1) {
        //         this.show(this.translateService.translate('oidmbrdt.datemustbemequaltocurrentdate'), 'warn');
        //         event.data.effectiveDate = undefined;
        //         this.grid.setColumnData('effectiveDate', rowIndex, undefined);
        //         rowdata.validated = true;
        //         return rowdata;
        //     }
        // }
        rowdata.validated = true;
        return rowdata;
    }
    /**
     *  This function is used to enable/disable append button
     */
    get affDisableFlag() {
        if (!this.vHeaderBlockModel) {
            return true;
        } else if (this.vHeaderBlockModel && this.offenderstgaffiliationsData.length < 1) {
            return true;
        } else {
            return false;
        }
    }
    /**
   *  This function will be executed when we click on validation button
   *
   */
    onbutLaunchClick = () => {
        if (this.grid.addedMap.size > 0 || this.grid.updatedMap.size > 0) {
            this.show(this.translateService.translate('oidmbrdt.pleasesavetheaffrecordfirst'), 'warn');
            return false;
        }
        // this.offenderassessmentsModel = new OffenderAssessments();
        // this.oidcnoteFactory.exitFlag = true;
        // this.router.navigate(['/OIDMBRVL']);
        return true;
    }
    onAssbutLaunchClick = () => {
        if (this.grid.addedMap.size > 0 || this.grid.updatedMap.size > 0) {
            this.show(this.translateService.translate('oidmbrdt.pleasesavetheaffrecordfirst'), 'warn');
            return false;
        }
        this.offenderassessmentsModel = new OffenderAssessments();
        this.oidmbrdtFactory.assessmentFlag = true;
        this.router.navigate(['/OCDNOQUE']);
        return true;
    }
    /**
     *  This function is executed when we close the Validation Dialog
     */
    afterValidationClosed() {
        this.offenderStgAffiliationexecuteQuery(this.selectedAffIndex);
        this.offenderstgdetailsExecuteQuery(this.selectedAffIndex);
        this.offenderassessmentsModel = new OffenderAssessments();
        this.offenderassessmentsExecuteQuery();
    }
 /**
     *  This function is executed when we close the Validation Dialog
     */
    afterAppendClosed() {
        this.offenderStgAffiliationexecuteQuery(this.selectedAffIndex);
        this.offenderassessmentsModel = new OffenderAssessments();
        this.offenderassessmentsExecuteQuery();
    }

    /**
      *  To enable/disable grid add button in Affiliation block
      */
    get affiliationGridInsert() {
        if (!this.vHeaderBlockModel) {
            return false;
        } else {
            return true;
        }
    }
    dateValidation() {
        if (!this.rettBtnFlg) {
            if (!this.offenderassessmentsModel.assessmentDate) {
                this.offenderassessmentsModel.assessmentDate = this.offenderassessmentsModel.assessmentDate === null ? undefined : null;
            }
        }
    }

    /*
     *  This event is used to insert the data in Affiliation Block.
     */
    onGridInsert = () => {
        this.disableFlag = false;
        this.appendFlag = false;
        this.offenderstgdetailsModel = new OffenderStgDetails();
        if (this.offenderstgaffiliationsData.length > 0) {
            for (let i = 0; i < this.offenderstgaffiliationsData.length; i++) {
                if (!this.offenderstgaffiliationsData[i].stgSeq) {
                    if (!this.offenderstgaffiliationsData[i].effectiveDate) {
                        this.show(this.translateService.translate('common.datemustbeentereddate'), 'warn');
                        return;
                    }
                    if (DateFormat.compareDate(this.offenderstgaffiliationsData[i].effectiveDate, DateFormat.getDate()) === 1) {
                        this.show(this.translateService.translate('oidmbrdt.datemustbemequaltocurrentdate'), 'warn');
                        return;
                    }
                    if (!this.offenderstgaffiliationsData[i].stgId) {
                        this.show(this.translateService.translate('oidmbrdt.groupmustbeentered'), 'warn');
                        return;
                    }
                    if (!this.offenderstgaffiliationsData[i].reasonCode) {
                        this.show(this.translateService.translate('common.reasonmustbeentered'), 'warn');
                        return;
                    }
                }
            }
        }
        return {
            effectiveDate: DateFormat.getDate(), stgId: '', reasonCode: '', createUserId: String(this.sessionManager.getId()),
            activeFlag: true, expiryDate: '',
            expiredBy: '', expiryReasonCode: '', hideValue: undefined, offenderBookId: this.vHeaderBlockModel.offenderBookId
        };
    }

    /*
     *  This event is used to set the notifyDate value to selected grid row data in Additional Information Block.
     */
    notifyDatechangeEvent() {
        if (this.offenderstgaffiliationsModel.notifiedDate) {
            if (DateFormat.compareDate(this.offenderstgaffiliationsModel.notifiedDate, DateFormat.getDate()) === 1) {
                this.show(this.translateService.translate('oidmbrdt.notifieddatemustbelessthan'), 'warn');
                this.offenderstgaffiliationsModel.notifiedDate = undefined;
                this.offenderstgaffiliationsModel.notifiedBy = undefined;
                this.offenderstgaffiliationsData[this.selectedAffIndex].notifiedDate = this.offenderstgaffiliationsModel.notifiedDate;
                this.offenderstgaffiliationsData[this.selectedAffIndex].notifiedBy = this.offenderstgaffiliationsModel.notifiedBy;
                return;
            }

            this.offenderstgaffiliationsData[this.selectedAffIndex].notifiedDate = this.offenderstgaffiliationsModel.notifiedDate;
            //this.offenderstgaffiliationsModel.notifiedBy = this.sessionManager.getId();
            this.offenderstgaffiliationsData[this.selectedAffIndex].notifiedBy = this.offenderstgaffiliationsModel.notifiedBy;
            this.saveFlag = false;
        } else {
            this.saveFlag = false;
            this.offenderstgaffiliationsData[this.selectedAffIndex].notifiedDate = this.offenderstgaffiliationsModel.notifiedDate;
            this.offenderstgaffiliationsData[this.selectedAffIndex].notifiedBy = this.offenderstgaffiliationsModel.notifiedBy;
            // this.offenderstgaffiliationsModel.notifiedBy = undefined;
        }
        // this.grid.setColumnData('hideValue', this.selectedAffIndex, 'test');
    }
    /*
     *  This event is used to set the notifyDate value to selected grid row data in Additional Information Block.
     */
    appealDatechangeEvent() {
        if (this.offenderstgaffiliationsModel.appealDate) {
            this.offenderstgaffiliationsData[this.selectedAffIndex].appealDate = this.offenderstgaffiliationsModel.appealDate;
            this.saveFlag = false;
        }else{
            this.saveFlag = false;
        }
        // this.grid.setColumnData('hideValue', this.selectedAffIndex, 'test');
    }
    /*
    *  This event is used to validate the appealDate value to selected grid row data in Additional Information Block.
    */
    // notifydateValidateEvent() {
    //     if (this.offenderstgaffiliationsData.length > 0) {
    //         if (!this.offenderstgaffiliationsModel.notifiedDate) {
    //             this.offenderstgaffiliationsModel.notifiedDate = this.offenderstgaffiliationsModel.notifiedDate === null ? undefined : null;
    //         }
    //     }
    // }
    notifydateValidateEvent(event) {
        if (this.offenderstgaffiliationsData.length > 0) {
            if(event.lastValue){
                this.saveFlag = false;
            }
        }
    }
    /*
     *  This event is used to validate the appealDate value to selected grid row data in Additional Information Block.
     */
    appealDateValidateEvent() {
        if (this.offenderstgaffiliationsData.length > 0) {
            if (!this.offenderstgaffiliationsModel.appealDate) {
                this.offenderstgaffiliationsModel.appealDate = this.offenderstgaffiliationsModel.appealDate === null ? undefined : null;
            }
        }
    }
    /*
    *  This event is used to set the comment value to selected grid row data in Affiliation Block.
    */
    commentTextchangeEvent() {
        if (this.offenderstgaffiliationsModel.commentText) {
            this.offenderstgaffiliationsData[this.selectedAffIndex].commentText = this.offenderstgaffiliationsModel.commentText;
            this.appendFlag=false;
            this.saveFlag = false;
        }
       // this.grid.setColumnData('hideValue', this.selectedAffIndex, 'test');
    }


    /**
     *  This function will be executed when we select rowdata under Affiliation Block event is
     * fired
     */
    offenderstgdetailsExecuteQuery(index?) {
        this.offenderstgdetailsModel = new OffenderStgDetails();
        this.offenderstgdetailsModel.offenderBookId = this.offenderstgaffiliationsModel.offenderBookId;
        this.offenderstgdetailsModel.stgSeq = this.offenderstgaffiliationsModel.stgSeq;
        const offenderstgdetailsResult = this.oidmbrdtFactory.
            offenderStgDetailsExecuteQuery(this.offenderstgdetailsModel);
        offenderstgdetailsResult.subscribe(offenderstgdetailsResultList => {
            if (offenderstgdetailsResultList.length === 0) {
                this.offenderstgdetailsData = [];
                this.offenderstgdetailsModel = new OffenderStgDetails();
            } else {
                this.offenderstgdetailsData = offenderstgdetailsResultList;
                this.offenderstgdetailsModel = offenderstgdetailsResultList[0];
            }
        });
    }

    affiliationdetailSave(event?){
        this.offenderstgaffiliationsUpdateList = [];
        this.offenderstgaffiliationsCommitModel.updateList = [];
        this.offenderstgaffiliationsCommitModel.insertList = [];
        this.offenderstgaffiliationsUpdateList.push(this.offenderstgaffiliationsModel);
            if (event) {
                if (event.lastValue === '0_/__/____') {
                    this.show(this.translateService.translate('common.leapyearnotallowed'),'warn');
                    return;
                }
           if (String(event.lastValue).indexOf('_') >= 0 && event.value === null) {
                this.show(this.translateService.translate('common.datemustbeentervalidformat'),'warn');
                return;
               }
          }
          if (this.offenderstgaffiliationsUpdateList.length > 0) {
            for (let i = 0; i < this.offenderstgaffiliationsUpdateList.length; i++) {
                if(this.offenderstgaffiliationsUpdateList[i].notifiedDate != null){
                    this.offenderstgaffiliationsUpdateList[i].notifiedByTemp = this.sessionManager.getId();
                }
            }
        }
        this.offenderstgaffiliationsCommitModel.updateList = this.offenderstgaffiliationsUpdateList;
        const offenderstgaffiliationsSaveData = this.oidmbrdtFactory.offenderStgAffiliationsCommit
        (this.offenderstgaffiliationsCommitModel);
    offenderstgaffiliationsSaveData.subscribe(data => {
         if (data === 1) {
            this.show(this.translateService.translate('common.addupdateremoverecordsuccess'), 'success');
            this.offenderStgAffiliationexecuteQuery(this.selectedAffIndex);
            this.saveFlag = true;
        } else {
            this.show(this.translateService.translate('common.addupdateremoverecordfailed'));
            this.offenderStgAffiliationexecuteQuery(this.selectedAffIndex);
        }
    });
    }

    onlyAlphabetallowed(event:any){
        this.saveFlag = false;
    }
	disableCell = (data: any): boolean => {
		if (!data.checkFlag) {
			return true;
		} else {
			return false;
		}
    }
}
