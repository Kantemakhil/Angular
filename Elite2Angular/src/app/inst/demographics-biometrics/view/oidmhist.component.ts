import {
        Component,
        OnInit,
        ViewChild
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OidmhistService } from '../service/oidmhist.service';
import { OffenderMilitaryRecords } from '@instdemographicsbeans/OffenderMilitaryRecords';
import { OffenderMilitaryRecordsCommitBean } from '@instdemographicsbeans/OffenderMilitaryRecordsCommitBean';
import { OffenderMilitaryDiscActions } from '@instdemographicsbeans/OffenderMilitaryDiscActions';
import { OffenderMilitaryDiscActionsCommitBean } from '@instdemographicsbeans/OffenderMilitaryDiscActionsCommitBean';
import { OffenderMilitaryTechSpecs } from '@instdemographicsbeans/OffenderMilitaryTechSpecs';
import { OffenderMilitaryTechSpecsCommitBean } from '@instdemographicsbeans/OffenderMilitaryTechSpecsCommitBean';
import { OffenderMilitaryWarZones } from '@instdemographicsbeans/OffenderMilitaryWarZones';
import { OffenderMilitaryWarZonesCommitBean } from '@instdemographicsbeans/OffenderMilitaryWarZonesCommitBean';
import { SystemProfiles } from '@commonbeans/SystemProfiles';
import { VHeaderBlock } from '@commonbeans/VHeaderBlock';
import { OffenderSearchService } from '@common/offender-records/service/offender-search.service';
import { DateFormat } from '@ui-components/datepicker/dateFormat';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { ValidateRowReturn } from '@ui-components/grid/grid.component';

@Component({
        selector: 'app-oidmhist',
        templateUrl: './oidmhist.component.html'
})

export class OidmhistComponent implements OnInit {
        @ViewChild('offMrgrid', {static: true}) offMrgrid: any;
        actionName: string;
        lovModel: any[];
        msgs: any[] = [];
        nameOfLovPage: string;
        listToCompare: any[] = [];
        offmrData: OffenderMilitaryRecords[] = [];
        offmrDataTemp: OffenderMilitaryRecords[] = [];
        selectedOffender: OffenderMilitaryRecords = new OffenderMilitaryRecords();
        offmrModel: OffenderMilitaryRecords = new OffenderMilitaryRecords();
        offmrCommitModel: OffenderMilitaryRecordsCommitBean = new OffenderMilitaryRecordsCommitBean();
        offmrIndex: number;
        offmrInsertList: OffenderMilitaryRecords[] = [];
        offmrUpdateList: OffenderMilitaryRecords[] = [];
        offmrDeleteList: OffenderMilitaryRecords[] = [];
        disactData: OffenderMilitaryDiscActions[] = [];
        disactDataTemp: OffenderMilitaryDiscActions[] = [];
        disactModel: OffenderMilitaryDiscActions = new OffenderMilitaryDiscActions();
        disactCommitModel: OffenderMilitaryDiscActionsCommitBean = new OffenderMilitaryDiscActionsCommitBean;
        disactIndex: number;
        disactInsertList: OffenderMilitaryDiscActions[] = [];
        disactUpdatetList: OffenderMilitaryDiscActions[] = [];
        disactDeleteList: OffenderMilitaryDiscActions[] = [];
        techspecData: OffenderMilitaryTechSpecs[] = [];
        techspecDataTemp: OffenderMilitaryTechSpecs[] = [];
        techspecModel: OffenderMilitaryTechSpecs = new OffenderMilitaryTechSpecs();
        techspecCommitModel: OffenderMilitaryTechSpecsCommitBean = new OffenderMilitaryTechSpecsCommitBean;
        techspecIndex: number;
        techspecInsertList: OffenderMilitaryTechSpecs[] = [];
        techspecUpdatetList: OffenderMilitaryTechSpecs[] = [];
        techspecDeleteList: OffenderMilitaryTechSpecs[] = [];
        warzonesData: OffenderMilitaryWarZones[] = [];
        warzonesDataTemp: OffenderMilitaryWarZones[] = [];
        warzonesModel: OffenderMilitaryWarZones = new OffenderMilitaryWarZones();
        warzonesCommitModel: OffenderMilitaryWarZonesCommitBean = new OffenderMilitaryWarZonesCommitBean;
        warzonesIndex: number;
        warzonesInsertList: OffenderMilitaryWarZones[] = [];
        warzonesUpdatetList: OffenderMilitaryWarZones[] = [];
        warzonesDeleteList: OffenderMilitaryWarZones[] = [];
        syspflData: SystemProfiles[] = [];
        syspflDataTemp: SystemProfiles[] = [];
        syspflModel: SystemProfiles = new SystemProfiles();
        vHeaderBlockModel: VHeaderBlock = new VHeaderBlock();
        syspflIndex: number;
        syspflInsertList: SystemProfiles[] = [];
        syspflUpdatetList: SystemProfiles[] = [];
        syspflDeleteList: SystemProfiles[] = [];
        minDate: Date;
        date: Date;
        endDate: Date;
        display: boolean;
        errorMessage: string;
        headerMessage: string;
        disabled: boolean;
        editable: boolean;
        disActColumnDef: any[];
        warZonesColumnDef: any[];
        offMrColumnDef: any[];
        techSpecColumnDef: any[];
        offMrReadOnly: boolean;
        disActReadOnly: boolean;
        techSpecReadOnly: boolean;
        warZonesReadOnly: boolean;
        sysPflReadOnly: boolean;
        rgwarzoneRg: any[] = [];
        rgmltytechRg: any[] = [];
        rgmilitaryrankRg: any[] = [];
        rgmilitarydischargeRg: any[] = [];
        rgmilitarybranchRg: any[] = [];
        rgdisciplinaryactionRg: any[] = [];
        rghighstrankRg: any[] = [];
        message = ' Invalid.';
        type = 'error';
        msglist = [];
        tableIndex = -1;
        disArtIndex = -1;
        techSpecIndex = -1;
        warZonesIndex = -1;
        savedisabled: boolean;
        mrInsert: boolean;
        disActInsert: boolean;
        techSpecInsert: boolean;
        warzonesInsert: boolean;
        offmrdisabled: boolean;
        rankAttainedTitle = { 'code': 'Code', 'description': 'Description' };
        codeTitle = {  'description': 'Description','code': 'Code' };
        startDate: Date;
        highestRankAttained: any;
        dischargeLocation: any;
        description: any;
        enlistmentLocation: any;
        constructor(private oidmhistFactory: OidmhistService,
                public translateService: TranslateService,
                private offenderSearchService: OffenderSearchService,
                private sessionManager: UserSessionManager) {
                this.disActColumnDef = [];
                this.warZonesColumnDef = [];
                this.offMrColumnDef = [];
                this.techSpecColumnDef = [];
        }
        ngOnInit() {
                this.offmrdisabled = true;
                this.savedisabled = true;
                this.disactIndex = 0;
                this.techspecIndex = 0;
                this.warzonesIndex = 0;
                this.vHeaderBlockModel = this.offenderSearchService.selectedOffender;
                this.offMrColumnDef = [
                        {
                                fieldName: this.translateService.translate('oidmhist.enlistmentdate'), field: 'startDate',
                                datatype: 'monthYear', editable: true, width: 160, maxlength: 7
                        },
                        {
                                fieldName: this.translateService.translate('oidmhist.branch'), field: 'militaryBranchCode', datatype: 'lov',
                                domain:'MLTY_BRANCH'/*link: 'oidmhist/rgMilitaryBranchRecordGroup'*/, editable: true, width: 150, titles: this.codeTitle,
                                maxlength: 40
                        },
                        {
                                fieldName: this.translateService.translate('oidmhist.servicenumber'), field: 'serviceNumber',
                                editable: true, width: 160, maxlength: 12, datatype: 'text'
                        },
                        {
                                fieldName: this.translateService.translate('oidmhist.unitnumber'), field: 'unitNumber',
                                editable: true, width: 160, maxlength: 20, datatype: 'text'
                        },
                        {
                                fieldName: this.translateService.translate('oidmhist.dischargedate'), field: 'endDate',
                                datatype: 'monthYear', editable: true, width: 160, maxlength: 7
                        },
                        {
                                fieldName: this.translateService.translate('oidmhist.dischargetype'), field: 'militaryDischargeCode',
                                datatype: 'lov', domain: 'MLTY_DSCHRG',
                                editable: true, width: 160, maxlength: 40, titles: this.codeTitle
                        },
                        {
                                fieldName: this.translateService.translate('oidmhist.rankatdischarge'), field: 'militaryRankCode',
                                datatype: 'lov', domain:'MLTY_RANK'/*link: 'oidmhist/rgMilitaryRankRecordGroup'*/,
                                editable: true, width: 180, maxlength: 40 /*titles: this.codeTitle,parentField: 'militaryBranchCode'*/
                        },
                        {
                                fieldName: '', field: 'enlistmentLocation',hide: true
                        },
                        {
                                fieldName: '', field: 'dischargeLocation',hide: true
                        },
                        {
                                fieldName: '', field: 'description',hide: true
                        },
                        {
                                fieldName: '', field: 'highestRankAttained',hide: true
                        },
                ];
                this.disActColumnDef = [
                        {
                                fieldName: this.translateService.translate('oidmhist.disciplinary'), field: 'mltyDiscpCode',
                                datatype: 'lov', domain: 'MLTY_DISCP',
                                editable: true, width: 300, titles: this.codeTitle, maxlength: 40
                        },
                ];
                this.techSpecColumnDef = [
                        {
                                fieldName: this.translateService.translate('oidmhist.techspecializations'),
                                field: 'techSpecCode', datatype: 'lov', domain: 'MLTY_TECH',
                                editable: true, width: 300, titles: this.codeTitle, maxlength: 40
                        },
                ];
                this.warZonesColumnDef = [
                        {
                                fieldName: this.translateService.translate('oidmhist.warzones'),
                                field: 'warZoneCode', datatype: 'lov',domain:'MLTY_WZONE'/* link: 'oidmhist/rgWarZoneRecordGroup'*/,
                                editable: true, width: 300, titles: this.codeTitle, maxlength: 40
                        },
                ];
                if (!this.vHeaderBlockModel) {
                        this.type = 'warn';
                        this.message = this.translateService.translate('common.pleasesearchforvalidoffender');
                        this.show();
                }
        }
        onOffenderChange(offender) {
                if (offender) {
                        this.offmrData = [];
                        this.disactData = [];
                        this.techspecData = [];
                        this.warzonesData = [];
                        this.vHeaderBlockModel = offender;
                        this.oidmhistexecuteQuery();
                        this.offmrdisabled = true;
                        this.disActInsert = false;
                        this.techSpecInsert = false;
                        this.warzonesInsert = false;
                } else {
                        this.offmrData = [];
                        this.disactData = [];
                        this.techspecData = [];
                        this.warzonesData = [];
                        this.offmrModel.enlistmentLocation = null;
                        this.offmrModel.dischargeLocation = null;
                        this.offmrModel.highestRankAttained = null;
                        this.offmrModel.description = null;
                        this.mrInsert = false;
                        this.disActInsert = false;
                        this.techSpecInsert = false;
                        this.warzonesInsert = false;
                        this.offmrdisabled = true;
                        this.highestRankAttained = null;
                }
        }
        onRowClickoffmr(event) {
                if (event) {
                        this.offmrModel = event;
                        this.highestRankAttained = null;
                        this.dischargeLocation = null;
                        this.description = null;
                        this.enlistmentLocation = null;
                        this.highestRankAttained = this.offmrModel.highestRankAttained;
                        this.dischargeLocation = this.offmrModel.dischargeLocation;
                        this.description = this.offmrModel.description;
                        this.enlistmentLocation = this.offmrModel.enlistmentLocation;
                        this.selectedOffender = event;
                        this.disactIndex = this.offmrData.indexOf(this.selectedOffender);
                        this.disactModel = new OffenderMilitaryDiscActions();
                        this.disactModel.offenderBookId = this.selectedOffender.offenderBookId;
                        this.disactModel.militarySeq = this.selectedOffender.militarySeq;
                        this.disactExecuteQuery();
                        this.techspecIndex = this.offmrData.indexOf(this.selectedOffender);
                        this.techspecModel = new OffenderMilitaryTechSpecs();
                        this.techspecModel.offenderBookId = this.selectedOffender.offenderBookId;
                        this.techspecModel.militarySeq = this.selectedOffender.militarySeq;
                        this.techspecExecuteQuery();
                        this.warzonesIndex = this.offmrData.indexOf(this.selectedOffender);
                        this.warzonesModel = new OffenderMilitaryWarZones();
                        this.warzonesModel.offenderBookId = this.selectedOffender.offenderBookId;
                        this.warzonesModel.militarySeq = this.selectedOffender.militarySeq;
                        this.warzonesExecuteQuery();
                        if (!event.startDate && !event.militaryBranchCode) {
                                this.disActInsert = false;
                                this.techSpecInsert = false;
                                this.warzonesInsert = false;
                        } else {
                                this.disActInsert = true;
                                this.techSpecInsert = true;
                                this.warzonesInsert = true;
                        }
                        this.offmrdisabled = false;
                } else {
                        this.offmrdisabled = true;
                        this.highestRankAttained = undefined;
                        this.dischargeLocation = undefined;
                        this.description = undefined;
                        this.enlistmentLocation = undefined;
                }
        }
        allowNumbers(event) {
        }
        onRowClickdisact(event) {
        }
        onRowClicktechspec(event) {
        }
        onRowClickwarzones(event) {
        }
        ok() {
        }
        no() {
        }
        cancel() {
        }
        show() {
                this.msglist = [];
                this.msglist.push({ message: this.message, type: this.type });
                this.msgs = [...this.msglist];
        }
        oidmhistSaveoffmrForm(event) {
                this.offmrInsertList = event.added;
                this.offmrUpdateList = event.updated;
                this.offmrDeleteList = event.removed;
                this.offmrCommitModel.insertList = [];
                this.offmrCommitModel.updateList = [];
                this.offmrCommitModel.deleteList = [];
                if (this.offmrInsertList.length > 0 || this.offmrUpdateList.length > 0) {
                        for (let i = 0; i < this.offmrInsertList.length; i++) {
                                if (!this.offmrInsertList[i].startDate) {
                                        this.type = 'warn';
                                        this.message = this.translateService.translate('oidmhist.enlistDatemustbeentered');
                                        this.show();
                                        return;
                                }
                                if (DateFormat.compareDate(this.offmrInsertList[i].startDate, DateFormat.getDate()) === 1) {
                                        this.type = 'warn';
                                        this.message = this.translateService.translate('oidmhist.enlistmentdatecannotbegreater');
                                        this.show();
                                        return;
                                }
                                if (!this.offmrInsertList[i].militaryBranchCode) {
                                        this.type = 'warn';
                                        this.message = this.translateService.translate('oidmhist.branchmustentered');
                                        this.show();
                                        return;
                                }
                                if (this.offmrInsertList[i].endDate) {
                                        if (DateFormat.compareDate(this.offmrInsertList[i].endDate, DateFormat.getDate()) === 1) {
                                                this.type = 'warn';
                                                this.message = this.translateService.translate('oidmhist.dschrgedtltrthanenlstmentdt');
                                                this.show();
                                                return;
                                        }
                                        if (DateFormat.compareDate(this.offmrInsertList[i].startDate,
                                                this.offmrInsertList[i].endDate) === 1) {
                                                this.type = 'warn';
                                                this.message = this.translateService.translate('oidmhist.dschrgedtlessthanenlstmentdt');
                                                this.show();
                                                return;
                                        }
                                }
                                this.offmrInsertList[i].offenderBookId = this.vHeaderBlockModel.offenderBookId;
                                this.offmrInsertList[i].createDateTime = DateFormat.getDate();
                                this.offmrInsertList[i].createUserId = this.sessionManager.getId();
                                this.offmrInsertList[i].selectiveServicesFlag = 'N';
                                this.offmrCommitModel.insertList = this.offmrInsertList;
                        }
                        for (let j = 0; j < this.offmrUpdateList.length; j++) {
                                if (this.offmrUpdateList[j].startDate || this.offmrUpdateList[j].endDate) {
                                        this.startDate = DateFormat.getDate(this.offmrUpdateList[j].startDate);
                                        this.endDate = DateFormat.getDate(this.offmrUpdateList[j].endDate);
                                }
                                if (DateFormat.compareDate(this.startDate, DateFormat.getDate()) === 1) {
                                        this.type = 'warn';
                                        this.message = this.translateService.translate('oidmhist.enlistmentdatecannotbegreater');
                                        this.show();
                                        return;
                                }
                                if (this.endDate) {
                                        if (DateFormat.compareDate(this.endDate, DateFormat.getDate()) === 1) {
                                                this.type = 'warn';
                                                this.message = this.translateService.translate('oidmhist.dschrgedtltrthanenlstmentdt');
                                                this.show();
                                                return;
                                        }
                                        if (DateFormat.compareDate(this.startDate,
                                                this.endDate) === 1) {
                                                this.type = 'warn';
                                                this.message = this.translateService.translate('oidmhist.dschrgedtlessthanenlstmentdt');
                                                this.show();
                                                return;
                                        }
                                }
                                this.offmrCommitModel.updateList = this.offmrUpdateList;
                        }
                }
                if (this.offmrDeleteList.length > 0) {
                        for (let i = 0; i < this.offmrDeleteList.length; i++) {
                                this.offmrCommitModel.deleteList = this.offmrDeleteList;
                        }
                }
                const offmrSaveData = this.oidmhistFactory.offMrCommit(this.offmrCommitModel);
                offmrSaveData.subscribe(data => {
                        if (data === 1) {
                                this.type = 'success';
                                this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
                                this.show();
                                this.oidmhistexecuteQuery();
                                return;
                        } else {
                                this.type = 'warn';
                                this.message = this.translateService.translate('common.addupdateremoverecordfailed');
                                this.show();
                                this.oidmhistexecuteQuery();
                                return;
                        }
                });
        }

        get saveFlag(){
                if(this.offMrgrid.addedMap.size > 0 || this.offMrgrid.updatedMap.size > 0 || this.offMrgrid.removedMap.size > 0){
                        this.savedisabled = false;
                        return false;
                }else{
                        this.savedisabled = true;
                        return true;
                }
        }
        onButSave() {
                this.offmrInsertList = [];
                this.offmrUpdateList = [];
                this.offmrDeleteList = [];
                this.offmrCommitModel.updateList = [];
                this.offmrCommitModel.insertList = [];
                this.offmrCommitModel.deleteList = [];

                this.offMrgrid.addedMap.forEach((value, keys) => { 
                        this.offmrInsertList.push(value); 
                });
                this.offMrgrid.updatedMap.forEach((value, keys) => { 
                        this.offmrUpdateList.push(value); 
                });
                this.offMrgrid.removedMap.forEach((value, keys) => { 
                        this.offmrDeleteList.push(value); 
                });



                if (this.offmrInsertList.length > 0 || this.offmrUpdateList.length > 0) {
                        for (let i = 0; i < this.offmrInsertList.length; i++) {
                                if (!this.offmrInsertList[i].startDate) {
                                        this.type = 'warn';
                                        this.message = this.translateService.translate('oidmhist.enlistDatemustbeentered');
                                        this.show();
                                        return;
                                }
                                if (this.offmrInsertList[i].startDate && DateFormat.compareDate(this.offmrInsertList[i].startDate, DateFormat.getDate()) === 1) {
                                        this.type = 'warn';
                                        this.message = this.translateService.translate('oidmhist.enlistmentdatecannotbegreater');
                                        this.show();
                                        return;
                                }
                                if (!this.offmrInsertList[i].militaryBranchCode) {
                                        this.type = 'warn';
                                        this.message = this.translateService.translate('oidmhist.branchmustentered');
                                        this.show();
                                        return;
                                }
                                if (this.offmrInsertList[i].endDate) {
                                        if (DateFormat.compareDate(this.offmrInsertList[i].endDate, DateFormat.getDate()) === 1) {
                                                this.type = 'warn';
                                                this.message = this.translateService.translate('oidmhist.dschrgedtltrthanenlstmentdt');
                                                this.show();
                                                return;
                                        }
                                        if (this.offmrInsertList[i].startDate && DateFormat.compareDate(this.offmrInsertList[i].startDate,
                                                this.offmrInsertList[i].endDate) === 1) {
                                                this.type = 'warn';
                                                this.message = this.translateService.translate('oidmhist.dschrgedtlessthanenlstmentdt');
                                                this.show();
                                                return;
                                        }
                                }
                                if (!this.highestRankAttained) {
                                        this.highestRankAttained = '';
                                        this.offmrInsertList[i].highestRankAttained = '';
                                } else {
                                        this.offmrInsertList[i].highestRankAttained = this.highestRankAttained;
                                }
                                this.offmrInsertList[i].offenderBookId = this.vHeaderBlockModel.offenderBookId;
                                this.offmrInsertList[i].createDateTime = DateFormat.getDate();
                                this.offmrInsertList[i].createUserId = this.sessionManager.getId();
                                this.offmrInsertList[i].selectiveServicesFlag = 'N';
                                this.offmrCommitModel.insertList = this.offmrInsertList;
                        }
                        for (let j = 0; j < this.offmrUpdateList.length; j++) {
                                if (this.offmrUpdateList[j].startDate || this.offmrUpdateList[j].endDate) {
                                        this.startDate = DateFormat.getDate(this.offmrUpdateList[j].startDate);
                                        this.endDate = DateFormat.getDate(this.offmrUpdateList[j].endDate);
                                }
                                if (!this.offmrUpdateList[j].startDate) {
                                        this.type = 'warn';
                                        this.message = this.translateService.translate('oidmhist.enlistDatemustbeentered');
                                        this.show();
                                        return;
                                }
                                if (this.offmrUpdateList[j].startDate && DateFormat.compareDate(DateFormat.getDate(this.offmrUpdateList[j].startDate), DateFormat.getDate()) === 1) {
                                        this.type = 'warn';
                                        this.message = this.translateService.translate('oidmhist.enlistmentdatecannotbegreater');
                                        this.show();
                                        return;
                                }
                                if (this.startDate && DateFormat.compareDate(DateFormat.getDate(this.startDate), DateFormat.getDate()) === 1) {
                                        this.type = 'warn';
                                        this.message = this.translateService.translate('oidmhist.enlistmentdatecannotbegreater');
                                        this.show();
                                        return;
                                }
                                        if (this.endDate && DateFormat.compareDate(DateFormat.getDate(this.endDate), DateFormat.getDate()) === 1) {
                                                this.type = 'warn';
                                                this.message = this.translateService.translate('oidmhist.dschrgedtltrthanenlstmentdt');
                                                this.show();
                                                return;
                                        }
                                        if (this.startDate && DateFormat.compareDate(DateFormat.getDate(this.startDate),
                                                this.endDate) === 1) {
                                                this.type = 'warn';
                                                this.message = this.translateService.translate('oidmhist.dschrgedtlessthanenlstmentdt');
                                                this.show();
                                                return;
                                        }
                                if (!this.highestRankAttained) {
                                        this.highestRankAttained = '';
                                        this.offmrUpdateList[j].highestRankAttained = '';
                                } else {
                                        this.offmrUpdateList[j].highestRankAttained = this.highestRankAttained;
                                }
                                this.offmrCommitModel.updateList = this.offmrUpdateList;
                        }
                }
                if (this.offmrDeleteList.length > 0) {
                        for (let i = 0; i < this.offmrDeleteList.length; i++) {
                                this.offmrCommitModel.deleteList = this.offmrDeleteList;
                        }
                }
                const offmrSaveData = this.oidmhistFactory.offMrCommit(this.offmrCommitModel);
                offmrSaveData.subscribe(data => {
                        if (data === 1) {
                                this.type = 'success';
                                this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
                                this.show();
                                this.oidmhistexecuteQuery();
                                return;
                        } else {
                                this.type = 'warn';
                                this.message = this.translateService.translate('common.addupdateremoverecordfailed');
                                this.show();
                                this.oidmhistexecuteQuery();
                                return;
                        }
                });


                
                /* if (!this.highestRankAttained) {
                        this.highestRankAttained = '';
                        this.offmrModel.highestRankAttained = '';
                } else {
                        this.offmrModel.highestRankAttained = this.highestRankAttained;
                }
                this.offmrUpdateList.push(this.offmrModel);
                this.offmrCommitModel.updateList = this.offmrUpdateList;
                if (!this.savedisabled) {
                        const offmrSaveData = this.oidmhistFactory.offMrCommit(this.offmrCommitModel);
                        offmrSaveData.subscribe(data => {
                                if (data === 1) {
                                        this.type = 'success';
                                        this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
                                        this.show();
                                        return;
                                } else {
                                        this.type = 'warn';
                                        this.message = this.translateService.translate('common.addupdateremoverecordfailed');
                                        this.show();
                                        return;
                                }
                        });
                }
                this.savedisabled = true; */
        }

        onenlistmentLocationChange(event){
                const index = this.offmrData.indexOf(this.offmrModel);
                this.offMrgrid.setColumnData('enlistmentLocation', index, event);
        }
        ondischargelocationChange(event){
                const index = this.offmrData.indexOf(this.offmrModel);
                this.offMrgrid.setColumnData('dischargeLocation', index, event);
        }
        onhighestRankAttainedChange(event){
                const index = this.offmrData.indexOf(this.offmrModel);
                this.offMrgrid.setColumnData('highestRankAttained', index, event);
        }
        ondescriptionChange(event){
                const index = this.offmrData.indexOf(this.offmrModel);
                this.offMrgrid.setColumnData('description', index, event);
        }
        oidmhistexecuteQuery() {
                this.offmrModel.offenderBookId = this.vHeaderBlockModel.offenderBookId;
                const serviceObj = this.oidmhistFactory.offMrExecuteQuery(this.offmrModel);
                serviceObj.subscribe(data => {
                        if (data.length === 0) {
                                this.offmrData = [];
                                this.offmrModel = new OffenderMilitaryRecords();
                                this.mrInsert = true;
                                this.disActInsert = false;
                                this.techSpecInsert = false;
                                this.warzonesInsert = false;
                                this.offmrdisabled = true;
                        } else {
                                this.offmrData = data;
                                this.offmrModel = this.offmrData[0];
                                this.tableIndex = 0;
                                this.mrInsert = true;
                                this.disActInsert = true;
                                this.techSpecInsert = true;
                                this.warzonesInsert = true;
                                this.offmrdisabled = false;
                        }
                });
        }
        disactExecuteQuery() {
                this.disactModel.offenderBookId = this.vHeaderBlockModel.offenderBookId;
                this.disactModel.militarySeq = this.offmrModel.militarySeq;
                const disactResult = this.oidmhistFactory.disActExecuteQuery(this.disactModel);
                disactResult.subscribe(data => {
                        if (data.length === 0) {
                                this.disactData = [];
                                this.disactModel = new OffenderMilitaryDiscActions();
                        } else {
                                this.disactData = data;
                                this.disactModel = data[0];
                                this.disArtIndex = 0;
                        }
                });
        }
        /**
         *  This function will be executed when commit event is fired
         */
        oidmhistSavedisactForm(event) {
                this.disactInsertList = event.added;
                this.disactUpdatetList = event.updated;
                this.disactDeleteList = event.removed;
                this.disactCommitModel.insertList = [];
                this.disactCommitModel.updateList = [];
                this.disactCommitModel.deleteList = [];
                if (this.disactInsertList.length > 0 || this.disactUpdatetList.length > 0) {
                        for (let i = 0; i < this.disactInsertList.length; i++) {
                                if (!this.disactInsertList[i].mltyDiscpCode) {
                                        this.type = 'warn';
                                        this.message = this.translateService.translate('oidmhist.displinaryCode');
                                        this.show();
                                        return;
                                }
                                this.disactInsertList[i].offenderBookId = this.vHeaderBlockModel.offenderBookId;
                                this.disactInsertList[i].militarySeq = this.offmrModel.militarySeq;
                                this.disactInsertList[i].createDateTime = DateFormat.getDate();
                                this.disactInsertList[i].createUserId = this.sessionManager.getId();
                                this.disactCommitModel.insertList = this.disactInsertList;
                        }
                        for (let i = 0; i < this.disactUpdatetList.length; i++) {
                                this.disactCommitModel.updateList = this.disactUpdatetList;
                        }
                }
                if (this.disactDeleteList.length > 0) {
                        for (let i = 0; i < this.disactDeleteList.length; i++) {
                        }
                        this.disactCommitModel.deleteList = this.disactDeleteList;
                }
                const disactSaveData = this.oidmhistFactory.disActCommit(this.disactCommitModel);
                disactSaveData.subscribe(data => {
                        if (data === 1) {
                                this.type = 'success';
                                this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
                                this.show();
                                this.disactExecuteQuery();
                                return;
                        } else {
                                this.type = 'warn';
                                this.message = this.translateService.translate('common.addupdateremoverecordfailed');
                                this.show();
                                this.disactExecuteQuery();
                                return;
                        }
                });
        }
        techspecExecuteQuery() {
                this.techspecModel.offenderBookId = this.vHeaderBlockModel.offenderBookId;
                this.techspecModel.militarySeq = this.offmrModel.militarySeq;
                const techspecResult = this.oidmhistFactory.techSpecExecuteQuery(this.techspecModel);
                techspecResult.subscribe(data => {
                        if (data.length === 0) {
                                this.techspecData = [];
                                this.techspecModel = new OffenderMilitaryTechSpecs();
                        } else {
                                this.techspecData = data;
                                this.techspecModel = data[0];
                                this.techSpecIndex = 0;
                        }
                });
        }
        /**
         *  This function will be executed when commit event is fired
        */
        oidmhistSavetechspecForm(event) {
                this.techspecInsertList = event.added;
                this.techspecUpdatetList = event.updated;
                this.techspecDeleteList = event.removed;
                this.techspecCommitModel.insertList = [];
                this.techspecCommitModel.updateList = [];
                this.techspecCommitModel.deleteList = [];
                if (this.techspecInsertList.length > 0 || this.techspecUpdatetList.length > 0) {
                        for (let i = 0; i < this.techspecInsertList.length; i++) {
                                if (!this.techspecInsertList[i].techSpecCode) {
                                        this.type = 'warn';
                                        this.message = this.translateService.translate('oidmhist.techspecialize');
                                        this.show();
                                        return;
                                }
                                this.techspecInsertList[i].offenderBookId = this.vHeaderBlockModel.offenderBookId;
                                this.techspecInsertList[i].militarySeq = this.offmrModel.militarySeq;
                                this.techspecInsertList[i].createDateTime = DateFormat.getDate();
                                this.techspecInsertList[i].createUserId = this.sessionManager.getId();
                                this.techspecCommitModel.insertList = this.techspecInsertList;
                        }
                        for (let i = 0; i < this.techspecUpdatetList.length; i++) {
                                this.techspecCommitModel.updateList = this.techspecUpdatetList;
                        }
                }
                if (this.techspecDeleteList.length > 0) {
                        for (let i = 0; i < this.techspecDeleteList.length; i++) {
                        }
                        this.techspecCommitModel.deleteList = this.techspecDeleteList;
                }
                const techspecSaveData = this.oidmhistFactory.techSpecCommit(this.techspecCommitModel);
                techspecSaveData.subscribe(data => {
                        if (data === 1) {
                                this.type = 'success';
                                this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
                                this.show();
                                this.techspecExecuteQuery();
                                return;
                        } else {
                                this.type = 'warn';
                                this.message = this.translateService.translate('common.addupdateremoverecordfailed');
                                this.show();
                                this.techspecExecuteQuery();
                                return;
                        }
                });
        }
        warzonesExecuteQuery() {
                this.warzonesModel.offenderBookId = this.vHeaderBlockModel.offenderBookId;
                this.warzonesModel.militarySeq = this.offmrModel.militarySeq;
                const warzonesResult = this.oidmhistFactory.warZonesExecuteQuery(this.warzonesModel);
                warzonesResult.subscribe(data => {
                        if (data.length === 0) {
                                this.warzonesData = [];
                                this.warzonesModel = new OffenderMilitaryWarZones();
                        } else {
                                this.warzonesData = data;
                                this.warzonesModel = data[0];
                                this.warZonesIndex = 0;
                        }
                });
        }
        /**
         *  This function will be executed when commit event is fired
         */
        oidmhistSavewarzonesForm(event) {
                this.warzonesInsertList = event.added;
                this.warzonesUpdatetList = event.updated;
                this.warzonesDeleteList = event.removed;
                this.warzonesCommitModel.insertList = [];
                this.warzonesCommitModel.updateList = [];
                this.warzonesCommitModel.deleteList = [];
                if (this.warzonesInsertList.length > 0 || this.warzonesUpdatetList.length > 0) {
                        for (let i = 0; i < this.warzonesInsertList.length; i++) {
                                if (!this.warzonesInsertList[i].warZoneCode) {
                                        this.type = 'warn';
                                        this.message = this.translateService.translate('oidmhist.warzonemust');
                                        this.show();
                                        return;
                                }
                                this.warzonesInsertList[i].offenderBookId = this.vHeaderBlockModel.offenderBookId;
                                this.warzonesInsertList[i].militarySeq = this.offmrModel.militarySeq;
                                this.warzonesInsertList[i].createDateTime = DateFormat.getDate();
                                this.warzonesInsertList[i].createUserId = this.sessionManager.getId();
                                this.warzonesCommitModel.insertList = this.warzonesInsertList;
                        }
                        for (let i = 0; i < this.warzonesUpdatetList.length; i++) {
                                this.warzonesCommitModel.updateList = this.warzonesUpdatetList;
                        }
                }
                if (this.warzonesDeleteList.length > 0) {
                        for (let i = 0; i < this.warzonesDeleteList.length; i++) {
                        }
                        this.warzonesCommitModel.deleteList = this.warzonesDeleteList;
                }
                const warzonesSaveData = this.oidmhistFactory.warZonesCommit(this.warzonesCommitModel);
                warzonesSaveData.subscribe(data => {
                        if (data === 1) {
                                this.type = 'success';
                                this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
                                this.show();
                                this.warzonesExecuteQuery();
                                return;
                        } else {
                                this.type = 'warn';
                                this.message = this.translateService.translate('common.addupdateremoverecordfailed');
                                this.show();
                                this.warzonesExecuteQuery();
                                return;
                        }
                });
        }
        onGridDelete = () => {
                if (this.disactModel.mltyDiscpCode || this.techspecModel.techSpecCode || this.warzonesModel.warZoneCode) {
                        this.type = 'info';
                        this.message = this.translateService.translate('oidmhist.cannotdeletemaster');
                        this.show();
                        return;
                }
                this.offmrModel = new OffenderMilitaryRecords();
                this.disactData = [];
                this.techspecData = [];
                this.warzonesData = [];
                this.enlistmentLocation = undefined;
                this.dischargeLocation = undefined;
                this.highestRankAttained = undefined;
                this.description = undefined;
                return true;
        }
        isInsertable() {
                if (this.offmrModel.enlistmentLocation || this.offmrModel.dischargeLocation || this.highestRankAttained ||
                        this.offmrModel.description) {
                        this.savedisabled = false;
                } else {
                        this.savedisabled = true;
                }
        }
        onGridInsert = () => {
                for (let i = 0; i < this.offmrData.length; i++) {
                        if (!this.offmrData[i].startDate) {
                                this.type = 'warn';
                                this.message = this.translateService.translate('oidmhist.enlistDatemustbeentered');
                                this.show();
                                return;
                        }
                        if (!this.offmrData[i].militaryBranchCode) {
                                this.type = 'warn';
                                this.message = this.translateService.translate('oidmhist.branchmustentered');
                                this.show();
                                return;
                        }
                }
                return {};
        }
        onDiscInsert = () => {
                for (let i = 0; i < this.disactData.length; i++) {
                        if (!this.disactData[i].mltyDiscpCode) {
                                return;
                        }
                }
                return {};
        }
        onTechInsert = () => {
                for (let i = 0; i < this.techspecData.length; i++) {
                        if (!this.techspecData[i].techSpecCode) {
                                return;
                        }
                }
                return {};
        }
        onWarInsert = () => {
                for (let i = 0; i < this.warzonesData.length; i++) {
                        if (!this.warzonesData[i].warZoneCode) {
                                return;
                        }
                }
                return {};
        }
        validateRowData = (event) => {
                console.log(event.field);
                const rowIndex = event.rowIndex;
                const rowdata = new ValidateRowReturn();
                if ((event.field === 'startDate' || event.field === 'endDate')
                        && (!event.oldValue || DateFormat.compareDate(DateFormat.getDate(event.newValue),
                                DateFormat.getDate(event.oldValue)) !== 0)) {
                        rowdata.validated = true;
                        if (event.field === 'startDate' && event.data.startDate) {
                                if (DateFormat.compareDate(event.data.startDate, DateFormat.getDate()) === 1) {
                                        this.type = 'warn';
                                        this.message = this.translateService.translate('oidmhist.enlistmentdatecannotbegreater');
                                        this.show();
                                }
                        }
                        if (event.field === 'endDate' && event.data.endDate) {
                                if (DateFormat.compareDate(event.data.endDate, DateFormat.getDate()) === 1) {
                                        this.type = 'warn';
                                        this.message = this.translateService.translate('oidmhist.dschrgedtltrthanenlstmentdt');
                                        this.show();
                                }
                                if (event.data.startDate) {
                                        this.startDate = DateFormat.getDate(event.data.startDate);
                                }

                                if (DateFormat.compareDate(this.startDate,
                                        event.data.endDate) === 1) {
                                        this.type = 'warn';
                                        this.message = this.translateService.translate('oidmhist.dschrgedtlessthanenlstmentdt');
                                        this.show();
                                }
                        }
                }
                rowdata.validated = true;
                return rowdata;
        }
        highestRankBlur() {
                if (!this.highestRankAttained) {
                        this.highestRankAttained = this.highestRankAttained === undefined ? '' : undefined;
                }
        }
}
