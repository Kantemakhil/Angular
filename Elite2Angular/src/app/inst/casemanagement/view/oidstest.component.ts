import {
    Component, OnInit, ViewChild
} from '@angular/core';
import { Router } from '@angular/router';
import { EoffenderService } from '@common/iwp/service/eoffender.service';
import { OffenderSearchService } from '@common/offender-records/service/offender-search.service';
import { TranslateService } from '@common/translate/translate.service';
import { SystemProfiles } from '@commonbeans/SystemProfiles';
import { VHeaderBlock } from '@commonbeans/VHeaderBlock';
import { OffenderSampleSubstances } from '@inst/casemanagement/beans/OffenderSampleSubstances';
import { OffenderSampleSubstancesCommitBean } from '@inst/casemanagement/beans/OffenderSampleSubstancesCommitBean';
import { OffenderSamples } from '@inst/casemanagement/beans/OffenderSamples';
import { OffenderSamplesCommitBean } from '@inst/casemanagement/beans/OffenderSamplesCommitBean';
import { DateFormat } from '@ui-components/datepicker/dateFormat';
import { ValidateRowReturn } from '@ui-components/grid/grid.component';
import { OidstestService } from '../service/oidstest.service';


@Component({
    selector: 'app-oidstest',
    templateUrl: './oidstest.component.html'
})

export class OidstestComponent implements OnInit {
    @ViewChild('grid') grid: any;
    actionName: string;
    lovModel: any[];
    msgs: any[] = [];
    nameOfLovPage: string;
    listToCompare: any[] = [];
    subsamplIndex = 0;
    subtestIndex = 0;
    syspflData: SystemProfiles[] = [];
    syspflDataTemp: SystemProfiles[] = [];
    syspflModel: SystemProfiles = new SystemProfiles();
    syspflIndex = 0;
    syspflInsertList: SystemProfiles[] = [];
    syspflUpdatetList: SystemProfiles[] = [];
    syspflDeleteList: SystemProfiles[] = [];
    minDate: any;
    display: boolean;
    errorMessage: string;
    headerMessage: string;
    disabled: boolean;
    editable = true;
    subSamplColumnDef: any[];
    subTestColumnDef: any[];
    rpOtherOccupantsColumnDef: any[];
    personsReadOnly = false;
    rpOtherOccupantsReadOnly = false;
    subSamplReadOnly = false;
    subTestReadOnly = false;
    sysPflReadOnly = false;
    rgwitnessRg: any[] = [];
    rgsubtesrsltRg: any[] = [];
    rgsubtesdispRg: any[] = [];
    rgsubtestypeRg: any[] = [];
    rgsubtesrsnRg: any[] = [];
    rgtakenbyRg: any[] = [];
    rgtestedbyRg: any[] = [];
    rgsubstanceRg: any[] = [];
    msglist = [];
    message = ' Invalid.';
    type = 'error';
    vHeaderBlockModel: VHeaderBlock = new VHeaderBlock();
    offSampSubstanceModel: OffenderSampleSubstances = new OffenderSampleSubstances();
    offSubtestData: OffenderSampleSubstances[] = [];
    offSampleModel: OffenderSamples = new OffenderSamples();
    offSampleModelTemp: OffenderSamples = new OffenderSamples();
    offSampleData: OffenderSamples[] = [];
    selectedRowIndex: number;
    sampleIndex = -1;
    offsamplInsertList: OffenderSamples[] = [];
    offsamplUpdateList: OffenderSamples[] = [];
    offsamplDeleteList: OffenderSamples[] = [];
    offSampleCommitBeanModel: OffenderSamplesCommitBean = new OffenderSamplesCommitBean();
    offSampleSubCommitBeanModel: OffenderSampleSubstancesCommitBean = new OffenderSampleSubstancesCommitBean();
    offsamplSubInsertList: OffenderSampleSubstances[] = [];
    offsamplSubUpdateList: OffenderSampleSubstances[] = [];
    offsamplSubDeleteList: OffenderSampleSubstances[] = [];
    sampleInsert = false;
    pTakenStaffId: string;
    testInsert = false;
    sampleDateFlag: boolean;
    sampleTestDateFlag: boolean;
    sampleDateFlagTemp: boolean;
    sampleTestDateFlagTemp: boolean;
    testIndex = -1;
    takenByTitles = {description: 'Name', code: 'Staff ID'};
    testedByTitles = {description: 'Name', code: 'Staff ID'};
    resultTitles = {description: 'Results', code: 'Code'};
    sampleDelete = false;
    testDelete = false;
    sampleDateCheck: Date;
    manageSource:string;
    indexVal:number;
    screenId='OIDSTEST';
    defaultSource = 'OUMPERSO';

    constructor(private oidstestFactory: OidstestService,
        public translateService: TranslateService,
        private offenderSearchService: OffenderSearchService,private eoffenderService: EoffenderService,private router: Router) {
        this.subSamplColumnDef = [];
        this.subTestColumnDef = [];
        this.rpOtherOccupantsColumnDef = [];
    }
    ngOnInit() {
        this.vHeaderBlockModel = this.offenderSearchService.selectedOffender;
        this.sampleDateFlag = false;
        this.sampleTestDateFlag = false;
        this.sampleDateFlagTemp = false;
        this.sampleTestDateFlagTemp = false;
        this.selectedRowIndex = 0;
        this.manageSource=null;
        this.subSamplColumnDef = [
            {
                fieldName: this.translateService.translate('oidstest.datetaken') + '*', field: 'sampleDate', editable: true,
                width: 150, datatype: 'date', cellEditable: this.canSampleDateEditable , 
            },

            {
                fieldName: this.translateService.translate('oidstest.timetaken'), field: 'sampleTime', editable: true,
                width: 150, datatype: 'time', cellEditable: this.canSampleDateEditable , required: true
            },

            {
                fieldName: this.translateService.translate('common.type1'), field: 'sampleType', editable: true,
                width: 150, datatype: 'lov',
                 domain: 'SUB_TES_TYPE' /*link: 'oidstest/rgSubTesTypeRecordGroup'*/, cellEditable: this.canCellEditable
            },
            {
                fieldName: this.translateService.translate('common.reason') + '*', field: 'sampleReason', editable: true,
                width: 150, datatype: 'lov', domain: 'SUB_TES_RSN', cellEditable: this.canCellEditable
            },
            {
                fieldName: this.translateService.translate('oidstest.takenby') + '*', field: 'takenStaffIdVal',
                editable: true, width: 150, datatype: 'lov',
                link: 'oidstest/rgTakenByRecordGroup?parentField=', parentField: 'witnessStaffIdVal', cellEditable: this.canFieldEditable,
                titles: this.takenByTitles,source:'OUMPERSO'
            },
            {
                fieldName: this.translateService.translate('oidstest.witness'), field: 'witnessStaffIdVal',
                editable: true, width: 150, datatype: 'lov',
                link: 'oidstest/rgWitnessRecordGroup?parentField=', parentField: 'takenStaffIdVal', cellEditable: this.canFieldEditable,
                titles: this.takenByTitles,source:'OUMPERSO'
            },
            {
                fieldName: this.translateService.translate('oidstest.datetested'), field: 'sampleTestDate', editable: true,
                width: 150, datatype: 'date', cellEditable: this.canDateTestedEditable
            },
            {
                fieldName: this.translateService.translate('oidstest.exitagency'), field: 'externalTestAgencyFlag',
                editable: true, width: 150, datatype: 'checkbox', cellEditable: this.canFieldEditable
            },
            {
                fieldName: this.translateService.translate('oidstest.testedby'), field: 'testedBy', editable: true, width: 170,
                datatype: 'lov',source: this.defaultSource,
                link: 'oidstest/rgTestedByRecordGroup?parentField=', parentField: 'externalTestAgencyFlag', titles: this.testedByTitles,
                 cellEditable: this.canFieldEditable
            },
            {
                fieldName: this.translateService.translate('oidstest.testedpositive'), field: 'testedPositive',
                editable: false, width: 180, datatype: 'checkbox', cellEditable: this.cantestedPositiveEditable
            },
            {
                fieldName: this.translateService.translate('common.comment'), field: 'commentText', editable: true,
                width: 150, datatype: 'text', uppercase: 'false', maxlength: 240
            },
            {
				fieldName: this.translateService.translate('common.iwpdocument')
				, field: 'butIwp', datatype: 'hyperlink',onLaunchClick: this.onEoffenderClick,
				editable: true, displayas: 'href', styleClass: 'file_copy',
				width: 50, data: 'row', updateField: 'row', modal: false,queryparam: 'SCREEN'
			}
        ];
        this.subTestColumnDef = [
            {
                fieldName: this.translateService.translate('oidstest.substance') + '*', field: 'substanceCode', editable: true,
                width: 220, datatype: 'lov', domain:'SUBSTANCE'/*link: 'oidstest/rgSubstanceRecordGroup'*/, cellEditable: this.canTestFieldsEditable
            },
            {
                fieldName: this.translateService.translate('common.result1') + '*', field: 'resultCode', editable: true,
                width: 220, datatype: 'lov', domain: 'SUB_TES_RSLT', cellEditable: this.canTestFieldsEditable, titles: this.resultTitles
            },
            {
                fieldName: this.translateService.translate('common.disposition'), field: 'dispositionCode', editable: true,
                width: 220, datatype: 'lov', domain: 'SUB_TES_DISP', cellEditable: this.canTestFieldsEditable
            },
            { fieldName: this.translateService.translate('common.comment'), field: 'commentText', editable: true, width: 510,
            datatype: 'text', uppercase: 'false', maxlength: 240, cellEditable: this.canTestFieldsEditable },
        ];
        /**
         * Method is used to get the staffId from Database by using db function.
         */
        const staffIdService = this.oidstestFactory.getStaffId().subscribe(idVal => {
            if (idVal) {
                this.pTakenStaffId = String(idVal);
            }
        });
        if ( !this.vHeaderBlockModel ) {
            this.type = 'warn';
            this.message = this.translateService.translate( 'common.pleasesearchforvalidoffender' );
            this.show();
        }
    }
    /**
     * event is fired when try to edit the Date Taken field in the grid in the block of Sample.
     */
    canSampleDateEditable = (data: any, index: number, field: string): boolean => {
        if (this.vHeaderBlockModel.statusDisplay === 'Inactive' ||
            this.vHeaderBlockModel.statusDisplay === 'INACTIVE' ||
            this.vHeaderBlockModel.statusDisplay === 'Historic' ||
            this.vHeaderBlockModel.statusDisplay === null ||
            this.vHeaderBlockModel.statusDisplay === undefined) {
            return false;
        } else {
           return true;
       }
    }
    /**
     * event is fired when try to edit the testedPositive field in the grid in the block of Sample.
     */
    cantestedPositiveEditable = (data: any, index: number, field: string): boolean => {
        if (this.vHeaderBlockModel.statusDisplay === 'Inactive' ||
            this.vHeaderBlockModel.statusDisplay === 'INACTIVE' ||
            this.vHeaderBlockModel.statusDisplay === 'Historic' ||
            this.vHeaderBlockModel.statusDisplay === null ||
            this.vHeaderBlockModel.statusDisplay === undefined) {
            return false;
        } else {
            return false;
        }
    }
    /**
     * event is fired when try  to edit the some of the fields in the grid in the block of Sample.
     */
    canFieldEditable = (data: any, index: number, field: string): boolean => {
        if (this.vHeaderBlockModel.statusDisplay === 'Inactive' ||
            this.vHeaderBlockModel.statusDisplay === 'INACTIVE' ||
            this.vHeaderBlockModel.statusDisplay === 'Historic' ||
            this.vHeaderBlockModel.statusDisplay === null ||
            this.vHeaderBlockModel.statusDisplay === undefined) {
            return false;
        } else {
            return true;
        }
    }
    /**
     * event is fired when try to edit the type or reason fields in the grid.
     */
    canCellEditable = (data: any, index: number, field: string): boolean => {
        if (this.vHeaderBlockModel.statusDisplay === 'Inactive' ||
            this.vHeaderBlockModel.statusDisplay === 'INACTIVE' ||
            this.vHeaderBlockModel.statusDisplay === 'Historic' ||
            this.vHeaderBlockModel.statusDisplay === null ||
            this.vHeaderBlockModel.statusDisplay === undefined) {
            return false;
        }
        if (data.offenderSampleId) {
            return false;
        } else {
            return true;
        }

    }
    /**
     * event is fired when try to edit the Datetested fields in the grid.
     */
    canDateTestedEditable = (data: any, index: number, field: string): boolean => {
        if (this.vHeaderBlockModel.statusDisplay === 'Inactive' ||
            this.vHeaderBlockModel.statusDisplay === 'INACTIVE' ||
            this.vHeaderBlockModel.statusDisplay === 'Historic' ||
            this.vHeaderBlockModel.statusDisplay === null ||
            this.vHeaderBlockModel.statusDisplay === undefined) {
            return false;
        }
       if (data.countOffSub > 0 || data.stdTemp) {
            return false;
        } else {
            return true;
        }

    }
    /**
     * event is fired when click on a row in the grid in the block of Sample.
     * @param event
     */
    onRowClicksubsampl(event) {
        if (event) {
            this.offSampleModelTemp = event;
            if (event.createDatetime) {
                this.eoffenderService.selectedRowData = event;
            } else {
                this.eoffenderService.selectedRowData = null;
            }
            this.oidstestexecuteQuery();
        } else {
            this.eoffenderService.selectedRowData = null;
        }

    }

    onRowClicksubtest(event) {
    }

    /**
     * event is fired when select the offender from search blcok.
     * @param offender
     */
    onOffenderChange(offender) {
        if (offender) {
            this.vHeaderBlockModel = new VHeaderBlock();
            this.vHeaderBlockModel = offender;
            this.sampleInsert = true;
            if (this.vHeaderBlockModel.statusDisplay === 'Inactive' ||
            this.vHeaderBlockModel.statusDisplay === 'INACTIVE' ||
            this.vHeaderBlockModel.statusDisplay === 'Historic' ||
            this.vHeaderBlockModel.statusDisplay === null ||
            this.vHeaderBlockModel.statusDisplay === undefined) {
                this.sampleInsert = false;
                this.sampleDelete = false;
        } else {
            this.sampleInsert = true;
            this.sampleDelete = true;
        }
            this.subSamplExecuteQuery();
        } else {
            this.offSampleModel = new OffenderSamples();
            this.offSampleData = [];
            this.offSampSubstanceModel = new OffenderSampleSubstances();
            this.offSubtestData = [];
            this.vHeaderBlockModel = new VHeaderBlock();
            this.selectedRowIndex = -1;
            this.sampleInsert = false;
            this.sampleIndex = -1;
            this.sampleDateFlag = false;
            this.sampleTestDateFlag = false;
            this.sampleDateFlagTemp = false;
            this.sampleTestDateFlagTemp = false;
            this.testIndex = -1;
            this.sampleDelete = false;
            this.testInsert = false;
            this.testDelete = false;
        }
    }
    /**
     * To display the messages
     */
    show() {
        this.msglist = [];
        this.msglist.push({ message: this.message, type: this.type });
        this.msgs = [...this.msglist];

    }
     /**
     * method is fired select the offender from search block.
     * get the data from DB and displays the data in the grid in the block of Sample.
     */
    subSamplExecuteQuery() {
        this.offSampleModel = new OffenderSamples();
        this.offSampleModel.offenderBookId = this.vHeaderBlockModel.offenderBookId;
        const serviceObj = this.oidstestFactory.
            subSamplExecuteQuery(this.offSampleModel);
        serviceObj.subscribe(data => {
            if (data.length === 0) {
                this.offSampleData = [];
                this.offSubtestData = [];
                this.testInsert = false;
                this.testDelete = false;
                this.sampleIndex = -1;
            } else {
                for (let i = 0; i < data.length; i++) {
                    data[i].externalTestAgencyFlag = data[i].externalTestAgencyFlag === 'Y' ? true : false;
                    data[i].testedPositive = data[i].testedPositive === 'Y' ? true : false;
                    data[i].witnessStaffIdVal = data[i].witnessStaffId;
                    data[i].takenStaffIdVal = data[i].takenStaffId;
                    data[i]['butIwp'] = '';
                    data[i]['SCREEN'] = this.screenId + "~" + "true" + "~" + data[i]['offenderSampleId'];
                  if(data[i].externalTestAgencyFlag){
                    data[i].testedBy = data[i].testCorporateId+"";
                  }else{
                    data[i].testedBy = data[i].testStaffId+"";
                  }
                }
                this.offSampleData = [];
                this.offSampleData = data;
                if (this.vHeaderBlockModel.statusDisplay === 'Inactive' ||
                    this.vHeaderBlockModel.statusDisplay === 'INACTIVE' ||
                    this.vHeaderBlockModel.statusDisplay === 'Historic' ||
                    this.vHeaderBlockModel.statusDisplay === null ||
                    this.vHeaderBlockModel.statusDisplay === undefined) {
                        this.testInsert = false;
                        this.testDelete = false;
                } else {
                    this.testInsert = true;
                    this.testDelete = true;
                }
                this.sampleIndex = 0;
            }
        });
    }

    /**
	 *  This function will be executed when commit event is
	* fired
	*/
    oidstestSaveOffsamplForm(event) {
        this.offsamplInsertList = [];
        this.offsamplUpdateList = [];
        this.offsamplDeleteList = [];
        this.offSampleCommitBeanModel.insertList = [];
        this.offSampleCommitBeanModel.updateList = [];
        this.offSampleCommitBeanModel.deleteList = [];
        this.offsamplInsertList = event.added;
        this.offsamplUpdateList = event.updated;
        this.offsamplDeleteList = event.removed;
        if (this.offsamplInsertList.length > 0 || this.offsamplUpdateList.length > 0) {
            for (let i = 0; i < this.offsamplInsertList.length; i++) {
                if (!this.offsamplInsertList[i].sampleDate) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('oidstest.datetakenmustbeentered');
                    this.show();
                    return;
                }
                if (!this.offsamplInsertList[i].sampleTime) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('Time Taken must be entered');
                    this.show();
                    return;
                }

                let startHours = DateFormat.getDate(this.offsamplInsertList[i].sampleTime).getHours();
                let startMinutes = DateFormat.getDate(this.offsamplInsertList[i].sampleTime).getMinutes();
                let startSeconds = DateFormat.getDate(this.offsamplInsertList[i].sampleTime).getSeconds();
                this.offsamplInsertList[i].sampleDate = DateFormat.getDate(DateFormat.getDate(this.offsamplInsertList[i].sampleDate).setHours(startHours, startMinutes, 0, 0));
             if ((DateFormat.compareDateTime(DateFormat.getDate(),DateFormat.getDate(this.offsamplInsertList[i].sampleDate))) === -1) {
                this.type = 'warn';
                this.message = this.translateService.translate('oidstest.datetakencannotbegreaterthancurrentdate');
                this.show();
                return;
            } else if (this.offsamplInsertList[i].sampleTestDate &&
                (DateFormat.compareDate(
                    DateFormat.getDate(this.offsamplInsertList[i].sampleTestDate),DateFormat.getDate(this.offsamplInsertList[i].sampleDate))) === -1) {
                this.type = 'warn';
                this.message = this.translateService.translate('oidstest.datetakencannotbegreaterthandatetested');
                this.show();
                return;
            }
                if (this.offsamplInsertList[i].sampleTestDate) {
                    if ((DateFormat.compareDate(DateFormat.getDate(), DateFormat.getDate(this.offsamplInsertList[i].sampleTestDate))) === -1) {
                        this.type = 'warn';
                        this.message = this.translateService.translate('oidstest.datetestedcannotbegreaterthancurrentdate');
                        this.show();
                        return;
                    }
                }
            
                if (!this.offsamplInsertList[i].sampleType) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('oidvires.typemustbeentered');
                    this.show();
                    return;
                }
                if (!this.offsamplInsertList[i].sampleReason) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('common.reasonmustbeentered');
                    this.show();
                    return;
                }
                if (!this.offsamplInsertList[i].takenStaffIdVal) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('oidstest.takenbymustbeentered');
                    this.show();
                    return;
                }
                this.offsamplInsertList[i].offenderBookId = this.vHeaderBlockModel.offenderBookId;
                if (this.offsamplInsertList[i].testedBy) {
                    this.offsamplInsertList[i].testedByTemp="Y";
                    if (this.offsamplInsertList[i].externalTestAgencyFlag) {
                        this.offsamplInsertList[i].testCorporateId = Number(this.offsamplInsertList[i].testedBy);
                    } else {
                        this.offsamplInsertList[i].testStaffId = Number(this.offsamplInsertList[i].testedBy);
                    }
                } else {
                    this.offsamplInsertList[i].testedByTemp="N";
                }
                if (this.offsamplInsertList[i].witnessStaffIdVal) {
                    this.offsamplInsertList[i].witnessStaffId = Number(this.offsamplInsertList[i].witnessStaffIdVal);
                }
                this.offsamplInsertList[i].takenStaffId = Number(this.offsamplInsertList[i].takenStaffIdVal);
                this.offsamplInsertList[i].sampleTime =  DateFormat.getDate(this.offsamplInsertList[i].sampleDate);
            }
            for (let i = 0; i < this.offsamplUpdateList.length; i++) {
                if (!this.offsamplUpdateList[i].sampleDate) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('oidstest.datetakenmustbeentered');
                    this.show();
                    return;
                }
                if (!this.offsamplUpdateList[i].sampleType) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('oidvires.typemustbeentered');
                    this.show();
                    return;
                }
                if (!this.offsamplUpdateList[i].sampleReason) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('common.reasonmustbeentered');
                    this.show();
                    return;
                }
                if (!this.offsamplUpdateList[i].takenStaffIdVal) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('oidstest.takenbymustbeentered');
                    this.show();
                    return;
                }
                if (this.offsamplUpdateList[i].testedBy) {
                    this.offsamplUpdateList[i].testedByTemp="Y";
                    if (this.offsamplUpdateList[i].externalTestAgencyFlag) {
                        this.offsamplUpdateList[i].testCorporateId = Number(this.offsamplUpdateList[i].testedBy);
                        this.offsamplUpdateList[i].testStaffId = undefined;
                    } else {
                        this.offsamplUpdateList[i].testStaffId = Number(this.offsamplUpdateList[i].testedBy);
                        this.offsamplUpdateList[i].testCorporateId = undefined;
                    }
                } else {
                     this.offsamplUpdateList[i].testedByTemp="N";
                }
                if (this.offsamplUpdateList[i].witnessStaffIdVal) {
                    this.offsamplUpdateList[i].witnessStaffId = Number(this.offsamplUpdateList[i].witnessStaffIdVal);
                }
                let startHours = DateFormat.getDate(this.offsamplUpdateList[i].sampleTime).getHours();
                let startMinutes = DateFormat.getDate(this.offsamplUpdateList[i].sampleTime).getMinutes();
                this.offsamplUpdateList[i].sampleDate = DateFormat.getDate(DateFormat.getDate(this.offsamplUpdateList[i].sampleDate).setHours(startHours, startMinutes, 0, 0));
                if ((DateFormat.compareDateTime(DateFormat.getDate(), DateFormat.getDate(this.offsamplUpdateList[i].sampleDate))) === -1) {
                this.type = 'warn';
                this.message = this.translateService.translate('oidstest.datetakencannotbegreaterthancurrentdate');
                this.show();
                return;
                } else if (this.offsamplUpdateList[i].sampleTestDate &&
                (DateFormat.compareDate(DateFormat.getDate(this.offsamplUpdateList[i].sampleDate),
                    DateFormat.getDate(this.offsamplUpdateList[i].sampleTestDate))) === 1) {
                this.type = 'warn';
                this.message = this.translateService.translate('oidstest.datetakencannotbegreaterthandatetested');
                this.show();
                return;
                }
                if (this.offsamplUpdateList[i].sampleTestDate) {
                    if ((DateFormat.compareDate(DateFormat.getDate(), DateFormat.getDate(this.offsamplUpdateList[i].sampleTestDate))) === -1) {
                        this.type = 'warn';
                        this.message = this.translateService.translate('oidstest.datetestedcannotbegreaterthancurrentdate');
                        this.show();
                        return;
                    }
                }
                this.offsamplUpdateList[i].takenStaffId = Number(this.offsamplUpdateList[i].takenStaffIdVal);
                if ((DateFormat.compareDate(DateFormat.getDate(this.offsamplUpdateList[i].sampleDate),
                    DateFormat.getDate(this.offsamplUpdateList[i].sampleTime))) !== 0) {
                    this.offsamplUpdateList[i].sampleTime = DateFormat.getDate(this.offsamplUpdateList[i].sampleDate);
                }
                if (this.offSubtestData.length > 0) {
                    if (!this.offsamplUpdateList[i].testedBy) {
                        this.type = 'warn';
                        this.message = this.translateService.translate('oidstest.pleaseprovidedatafordatetestedandtestedbyfields');
                        this.show();
                        return;
                    }
                }
            }
        }
        this.offSampleCommitBeanModel.insertList = this.offsamplInsertList;
        this.offSampleCommitBeanModel.updateList = this.offsamplUpdateList;
        this.offSampleCommitBeanModel.deleteList = this.offsamplDeleteList;
        const subsamplSaveData = this.oidstestFactory.offSamplCommit(this.offSampleCommitBeanModel);
        subsamplSaveData.subscribe(data => {
            if (data === 2) {
                this.type = 'warn';
                this.message = this.translateService.translate('common.cannotdeletemaster');
                this.show();
                this.subSamplExecuteQuery();
            } else if (data === 1) {
                this.type = 'success';
                this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
                this.show();
                this.subSamplExecuteQuery();
            } else {
                this.type = 'warn';
                this.message = this.translateService.translate('common.addupdateremoverecordfailed');
                this.show();
                return;
            }
        });
    }
    /**
     * method is fired when click on a row in the grid in the blcok of Sample.
     * get the data from DB and displays the data in the grid in the block of Tested.
     */
    oidstestexecuteQuery() {
        this.offSampSubstanceModel = new OffenderSampleSubstances();
        this.offSampSubstanceModel.offenderSampleId = this.offSampleModelTemp.offenderSampleId;
        const serviceObj = this.oidstestFactory.
            offenderSampleSubstancesExecuteQuery(this.offSampSubstanceModel);
        serviceObj.subscribe(data => {
            if (data.length === 0) {
                this.offSubtestData = [];
                this.testIndex = -1;
            } else {
                this.offSubtestData = data;
                this.testIndex = 0;
            }
        });
    }

    /**
      *  This function will be executed when commit event is
     * fired
     */
    oidstestSavesubtestForm(event) {
        this.offsamplSubInsertList = [];
        this.offsamplSubUpdateList = [];
        this.offsamplSubDeleteList = [];
        this.offSampleSubCommitBeanModel.insertList = [];
        this.offSampleSubCommitBeanModel.updateList = [];
        this.offSampleSubCommitBeanModel.deleteList = [];
        this.offsamplSubInsertList = event.added;
        this.offsamplSubUpdateList = event.updated;
        this.offsamplSubDeleteList = event.removed;
        if (this.offsamplSubInsertList.length > 0 || this.offsamplSubUpdateList.length > 0) {
            for (let i = 0; i < this.offsamplSubInsertList.length; i++) {
                this.offsamplSubInsertList[i].offenderSampleId = this.offSampleModelTemp.offenderSampleId;
                if (!this.offsamplSubInsertList[i].substanceCode) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('oidstest.substancemustbeentered');
                    this.show();
                    return;
                }
                if (!this.offsamplSubInsertList[i].resultCode) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('oidstest.resultsmustbeentered');
                    this.show();
                    return;
                }
            }
            for (let i = 0; i < this.offsamplSubUpdateList.length; i++) {
                if (!this.offsamplSubUpdateList[i].substanceCode) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('oidstest.substancemustbeentered');
                    this.show();
                    return;
                }
                if (!this.offsamplSubUpdateList[i].resultCode) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('oidstest.resultsmustbeentered');
                    this.show();
                    return;
                }
            }
        }

        if (this.offsamplSubDeleteList.length > 0) {
            for (let i = 0; i < this.offsamplSubDeleteList.length; i++) {
            }
        }

        this.offSampleSubCommitBeanModel.insertList = this.offsamplSubInsertList;
        this.offSampleSubCommitBeanModel.updateList = this.offsamplSubUpdateList;
        this.offSampleSubCommitBeanModel.deleteList = this.offsamplSubDeleteList;
        this.offSampleSubCommitBeanModel.offenderSamples= this.offSampleModelTemp;
        const subtestSaveData = this.oidstestFactory.subTestCommit(this.offSampleSubCommitBeanModel);
        subtestSaveData.subscribe(data => {
            if (data === 1) {
                this.type = 'success';
                this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
                this.show();
                this.oidstestexecuteQuery();
                this.subSamplExecuteQuery();
            } else {
                this.type = 'warn';
                this.message = this.translateService.translate('common.addupdateremoverecordfailed');
                this.show();
                return;
            }
        });
    }
    /**
     * event is used to validate the row data.
     */
    sampleEvent = (event) => {
        const rowdata = new ValidateRowReturn();
        const rowIndex = event.rowIndex;
        if (event.oldValue !== event.newValue) {
            if (event.field === 'sampleDate') {
                this.sampleDateFlag = false;
                this.sampleDateFlagTemp = false;
                this.sampleDateCheck = undefined;
                if(event.data.sampleTime){
                let startHours = DateFormat.getDate( event.data.sampleTime).getHours();
                let startMinutes = DateFormat.getDate(event.data.sampleTime).getMinutes();
                let startSeconds = DateFormat.getDate(event.data.sampleTime).getSeconds();
                this.sampleDateCheck=DateFormat.getDate(DateFormat.getDate(event.data.sampleTime).setHours(startHours, startMinutes, 0, 0));
                } else {
                this.sampleDateCheck = event.data.sampleDate;
                }
                if ((DateFormat.compareDateTime(DateFormat.getDate(), this.sampleDateCheck)) === -1) {
                    this.sampleDateFlag = true;
                    this.type = 'warn';
                    this.message = this.translateService.translate('oidstest.datetakencannotbegreaterthancurrentdate');
                    this.show();
                    rowdata.validated = true;
                    return rowdata;
                } else if (event.data.sampleTestDate &&
                    (DateFormat.compareDate(DateFormat.getDate(event.data.sampleTestDate),DateFormat.getDate(this.sampleDateCheck)
                        )) === -1) {
                    this.sampleDateFlagTemp = true;
                    this.type = 'warn';
                    this.message = this.translateService.translate('oidstest.datetakencannotbegreaterthandatetested');
                    this.show();
                    rowdata.validated = true;
                    return rowdata;
                }
            }
            if (event.field === 'sampleTestDate' && event.data.sampleTestDate) {
                this.sampleDateCheck = undefined;
                if(event.data.sampleTime){
                    let startHours = DateFormat.getDate( event.data.sampleTime).getHours();
                    let startMinutes = DateFormat.getDate(event.data.sampleTime).getMinutes();
                    this.sampleDateCheck=DateFormat.getDate(DateFormat.getDate(event.data.sampleDate).setHours(startHours, startMinutes, 0, 0));
                    } else {
                    this.sampleDateCheck = event.data.sampleDate;
                    }
                this.sampleTestDateFlag = false;
                this.sampleTestDateFlagTemp = false;
                if ((DateFormat.compareDate(DateFormat.getDate(), event.data.sampleTestDate)) === -1) {
                    this.sampleTestDateFlag = true;
                    this.type = 'warn';
                    this.message = this.translateService.translate('oidstest.datetestedcannotbegreaterthancurrentdate');
                    this.show();
                    rowdata.validated = true;
                    return rowdata;
                } else {
                    if ((DateFormat.compareDate(DateFormat.getDate(this.sampleDateCheck),
                        DateFormat.getDate(event.data.sampleTestDate))) === 1) {
                        this.sampleTestDateFlagTemp = true;
                        this.type = 'warn';
                        this.message = this.translateService.translate('oidstest.datetestedcannotbeearlierthandatetaken');
                        this.show();
                        rowdata.validated = true;
                        return rowdata;
                    }
                }
            }
            if (event.field === 'externalTestAgencyFlag'){
                this.grid.setColumnData('testedBy', rowIndex, undefined);
            }
        }
        rowdata.validated = true;
        return rowdata;
    }
    /**
     * event is fired when click on clear button in the grid in the block Sample.
     */
    onSampleClear = () => {
        this.sampleDateFlag = false;
        this.sampleDateFlagTemp = false;
        this.sampleTestDateFlag = false;
        this.sampleTestDateFlagTemp = false;
        this.subSamplExecuteQuery();
        return true;
    }
    /**
     * event is fired when click on add button in the grid in the block of Sample.
     */
    onSampleInsert = () => {

        if (this.offSampleData.length > 0) {
            if (!this.offSampleData[this.offSampleData.length - 1].sampleDate) {
                this.type = 'warn';
                this.message = this.translateService.translate('oidstest.datetakenmustbeentered');
                this.show();
                return;
            }
            if (!this.offSampleData[this.offSampleData.length - 1].sampleType) {
                this.type = 'warn';
                this.message = this.translateService.translate('oidvires.typemustbeentered');
                this.show();
                return;
            }
            if (!this.offSampleData[this.offSampleData.length - 1].sampleReason) {
                this.type = 'warn';
                this.message = this.translateService.translate('common.reasonmustbeentered');
                this.show();
                return;

            }
            if (!this.offSampleData[this.offSampleData.length - 1].takenStaffIdVal) {
                this.type = 'warn';
                this.message = this.translateService.translate('oidstest.takenbymustbeentered');
                this.show();
                return;
            }

        }
        return {
            sampleDate: DateFormat.getDate(),
            takenStaffIdVal: Number(this.pTakenStaffId)
        };
    }
    /**
     * event is fired when click on remove button in the grid in the block of Sample.
     */
    onSampleDelete = () => {
            let dependencyObj = {'formName' : this.screenId, 'offenderBookId': this.vHeaderBlockModel.offenderBookId,'displayNo':this.offSampleModelTemp.offenderSampleId}
            this.oidstestFactory.checkDocumentDependency(dependencyObj).subscribe( dep => {
                if(dep){
                    this.type = 'warn';
                    this.message = this.translateService.translate('oidstest.cannotdeletesubstancetestingattacheddoc')
                    this.show();
                    this.subSamplExecuteQuery();
                    return false;
                }
            });
        if (this.offSubtestData.length > 0) {
            if (this.offSubtestData[0].offenderSampleSubstanceId) {
                this.type = 'warn';
                this.message = this.translateService.translate('common.cannotdeletemaster');
                this.show();
                return false;
            } else {
                this.offSubtestData = [];
                return true;
            }
        } else {
            return true;
        }
    }
    /**
     * event is fired when click on add button in the grid in the block of Tested.
     */
    onTestInsert = () => {
        if (!this.offSampleModelTemp.sampleTestDate || !this.offSampleModelTemp.testedBy) {
            this.type = 'warn';
            this.message = this.translateService.translate('oidstest.pleaseprovidedatafordatetestedandtestedbyfields');
            this.show();
            return;
        } else if (!this.offSampleModelTemp.stdTemp || !this.offSampleModelTemp.stdTemp) {
            this.type = 'warn';
            this.message = this.translateService.translate('oidvisit.pleasecommit');
            this.show();
            return;
        }
        if (!this.offSampleModelTemp.offenderSampleId) {
            this.type = 'warn';
            this.message = this.translateService.translate('oidstest.insertoftestedmustbeinthecontextofsample');
            this.show();
            return;
        }
        if (this.offSubtestData.length > 0) {

            if (!this.offSubtestData[this.offSubtestData.length - 1].substanceCode) {
                this.type = 'warn';
                this.message = this.translateService.translate('oidstest.substancemustbeentered');
                this.show();
                return;
            }
            if (!this.offSubtestData[this.offSubtestData.length - 1].resultCode) {
                this.type = 'warn';
                this.message = this.translateService.translate('oidstest.resultsmustbeentered');
                this.show();
                return;
            }
        }
        return {
            minDate: DateFormat.getDate()
        };
    }
    /**
     * method is used to show the validation messages.
     */
    checkTheDateTakenValidations() {
        if (this.sampleDateFlag) {
            this.type = 'warn';
            this.message = this.translateService.translate('oidstest.datetakencannotbegreaterthancurrentdate');
            this.show();
            return false;
        } else if (this.sampleDateFlagTemp) {
            this.type = 'warn';
            this.message = this.translateService.translate('oidstest.datetakencannotbegreaterthandatetested');
            this.show();
            return false;
        } else {
            return true;
        }
    }
    /**
    * method is used to show the validation messages.
    */
    checkTheDateTestedValidations() {
        if (this.sampleTestDateFlag) {
            this.type = 'warn';
            this.message = this.translateService.translate('oidstest.datetestedcannotbegreaterthancurrentdate');
            this.show();
            return false;
        } else if (this.sampleTestDateFlagTemp) {
            this.type = 'warn';
            this.message = this.translateService.translate('oidstest.datetestedcannotbeearlierthandatetaken');
            this.show();
            return false;
        } else {
            return true;
        }
    }
    /**
     * event is fired when try to edit the fields in the grid in the block of Tested.
     */
    canTestFieldsEditable  = (data: any, index: number, field: string): boolean => {
        if (this.vHeaderBlockModel.statusDisplay === 'Inactive' ||
            this.vHeaderBlockModel.statusDisplay === 'INACTIVE' ||
            this.vHeaderBlockModel.statusDisplay === 'Historic' ||
            this.vHeaderBlockModel.statusDisplay === null ||
            this.vHeaderBlockModel.statusDisplay === undefined) {
            return false;
        } else {
            return true;
        }
    }
    ngOnDestroy(){
        if(!this.router.url.includes('/EOFFENDER')){
            this.eoffenderService.selectedRowData=null;
        }
       
    }


    onRightClicksubsampl(e) {
        let event = e.rowData;
        let column = e.columnField; 
        let rowID = e.rowID;
        if (event && rowID && column == 'testedBy') {
            this.defaultSource = event.externalTestAgencyFlag ? 'OUMAGENC' : 'OUMPERSO';
            return {source: this.defaultSource};
        }
    }
    
    onEoffenderClick = (data) => {
        this.eoffenderService.selectedRowData=data;
        this.router.navigate( ['/EOFFENDER'], { queryParams: { ['SCREEN'] : data['SCREEN'] } } );
     }
}
