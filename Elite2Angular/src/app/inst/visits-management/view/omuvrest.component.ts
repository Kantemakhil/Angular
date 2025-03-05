import {
        Component,
        OnInit,
        Input
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OmuvrestService } from '../service/omuvrest.service';
import { VisitorRestrictions } from '@inst/visits-management/beans/VisitorRestrictions';
import { VisitorRestrictionsCommitBean } from '@inst/visits-management/beans/VisitorRestrictionsCommitBean';
import { Persons } from '@inst/demographics-biometrics/beans/Persons';
import { DateFormat } from '@core/ui-components/datepicker/dateFormat';
import { DialogService } from '@core/ui-components/dialog/dialog.service';

@Component({
        selector: 'app-omuvrest',
        templateUrl: './omuvrest.component.html'
})

export class OmuvrestComponent implements OnInit {
        @Input() visitor: any;
        actionName: string;
        lovModel: any[];
        msgs: any[] = [];
        nameOfLovPage: string;
        listToCompare: any[] = [];
        perData: Persons[] = [];
        perDataTemp: Persons[] = [];
        perModel: Persons = new Persons();
        perIndex: number;
        perInsertList: Persons[] = [];
        perUpdatetList: Persons[] = [];
        perDeleteList: Persons[] = [];
        visrrestData: VisitorRestrictions[] = [];
        visrrestDataTemp: VisitorRestrictions[] = [];
        visrrestModel: VisitorRestrictions = new VisitorRestrictions();
        visrrestCommitModel: VisitorRestrictionsCommitBean = new VisitorRestrictionsCommitBean();
        visrrestIndex: number;
        visrrestInsertList: VisitorRestrictions[] = [];
        visrrestUpdateList: VisitorRestrictions[] = [];
        visrrestDeleteList: VisitorRestrictions[] = [];
        minDate: Date;
        display: boolean;
        errorMessage: string;
        headerMessage: string;
        disabled: boolean;
        editable: boolean;
        vOffAuthVisColumnDef: any[];
        rollListColumnDef: any[];
        offAuthVisitOffColumnDef: any[];
        perIdentColumnDef: any[];
        perEmpColumnDef: any[];
        perAddrColumnDef: any[];
        offenderGrievancesColumnDef: any[];
        visitingGroupsColumnDef: any[];
        bedAhColumnDef: any[];
        offCaseNrColumnDef: any[];
        teamsColumnDef: any[];
        offAuthVisitorsColumnDef: any[];
        agencyLocationCountsColumnDef: any[];
        visrRestColumnDef: any[];
        perDataColumnDef: any[];
        profilesColumnDef: any[];
        agencyCountsColumnDef: any[];
        grieDetColumnDef: any[];
        offConRestColumnDef: any[];
        offVisitRestColumnDef: any[];
        offenderGrievanceTxnsColumnDef: any[];
        offNotesColumnDef: any[];
        visitingMembersColumnDef: any[];
        offCntPerColumnDef: any[];
        resBlColumnDef: any[];
        contactsColumnDef: any[];
        offCntPerReadOnly: boolean;
        perAddrReadOnly: boolean;
        perIdentReadOnly: boolean;
        perInfoReadOnly: boolean;
        perEmpReadOnly: boolean;
        vOffAuthVisReadOnly: boolean;
        contactsReadOnly: boolean;
        offCaseNoteReadOnly: boolean;
        amendNoteReadOnly: boolean;
        personsReadOnly: boolean;
        offCaseNrReadOnly: boolean;
        profilesReadOnly: boolean;
        srchCtrlReadOnly: boolean;
        teamsReadOnly: boolean;
        butCtrlReadOnly: boolean;
        crtMvTmpReadOnly: boolean;
        bedAhReadOnly: boolean;
        offNotesReadOnly: boolean;
        cntlReadOnly: boolean;
        vOffBkgReadOnly: boolean;
        sysPflReadOnly: boolean;
        offenderGrievancesReadOnly: boolean;
        offenderGrievanceTxnsReadOnly: boolean;
        agencyCountsReadOnly: boolean;
        subRemCntReadOnly: boolean;
        resBlReadOnly: boolean;
        offVisitRestReadOnly: boolean;
        offAuthVisitorsReadOnly: boolean;
        imageVisitReadOnly: boolean;
        offAuthVisitOffReadOnly: boolean;
        imagesOffReadOnly: boolean;
        nbtQueryBlkReadOnly: boolean;
        visitingGroupsReadOnly: boolean;
        visitingMembersReadOnly: boolean;
        grieInqReadOnly: boolean;
        grieDetReadOnly: boolean;
        histCntInqReadOnly: boolean;
        agencyLocationCountsReadOnly: boolean;
        cg$ctrlReadOnly: boolean;
        rollListReadOnly: boolean;
        estCtrlReadOnly: boolean;
        perReadOnly: boolean;
        offConRestReadOnly: boolean;
        prresReadOnly: boolean;
        visrRestReadOnly: boolean;
        buttonReadOnly: boolean;
        rgvisrrestvisitrestrictiRg: any[] = [];
        tableIndex = -1;
        visrrestInsert: boolean;
        type = 'error';
        msglist = [];
        message = ' Invalid.';
        effectiveDate: Date;
        expiryDate: Date;
        index: number;
        nextReadOnly: boolean;
        previousReadOnly: boolean;
        cleardisabled: boolean;
        retrievedisabled: boolean;
        dataReadOnly: boolean;
        codeTitles = { 'code': 'Type', 'description': 'Description', 'parentCode': 'Parent Code' };
        flag: boolean;
        disabledButton: boolean;
        visitorFlag: boolean;
        validateFlag: boolean;
        rowIndex: number;
        @Input() editableGrid = true;
        nextPreLaunchBtn = true;
        panelTitel: string;
        paneTitle1: string;
        tableIndexOne: number;
        constructor(private omuvrestFactory: OmuvrestService,
                public translateService: TranslateService,
                private dialogService: DialogService) {
                this.vOffAuthVisColumnDef = [];
                this.rollListColumnDef = [];
                this.offAuthVisitOffColumnDef = [];
                this.perIdentColumnDef = [];
                this.perEmpColumnDef = [];
                this.perAddrColumnDef = [];
                this.offenderGrievancesColumnDef = [];
                this.visitingGroupsColumnDef = [];
                this.bedAhColumnDef = [];
                this.offCaseNrColumnDef = [];
                this.teamsColumnDef = [];
                this.offAuthVisitorsColumnDef = [];
                this.agencyLocationCountsColumnDef = [];
                this.visrRestColumnDef = [];
                this.profilesColumnDef = [];
                this.agencyCountsColumnDef = [];
                this.grieDetColumnDef = [];
                this.offConRestColumnDef = [];
                this.offVisitRestColumnDef = [];
                this.offenderGrievanceTxnsColumnDef = [];
                this.offNotesColumnDef = [];
                this.visitingMembersColumnDef = [];
                this.offCntPerColumnDef = [];
                this.resBlColumnDef = [];
                this.contactsColumnDef = [];
                this.perDataColumnDef = [];
        }
        onGridReady(event) {
        }
        ngOnInit() {
                this.panelTitel = this.translateService.translate('omuvrest.visitor');
                this.paneTitle1 = this.translateService.translate('omuvrest.visitorrestrictionwimdow')
                if (this.omuvrestFactory.dialogFlag === true) {
                        this.panelTitel = '';
                        this.paneTitle1 = '';
                        this.omuvrestFactory.dialogFlag = false;
                }
                this.rowIndex = 0;
                this.disabledButton = false;
                this.previousReadOnly = true;
                this.nextReadOnly = true;
                this.cleardisabled = true;
                this.visrrestInsert = false;
                this.retrievedisabled = false;
                this.dataReadOnly = false;
                this.flag = true;
                this.perDataColumnDef = [
                        {
                                fieldName: this.translateService.translate('omuvrest.visitorid'), field: 'personId',
                                datatype: 'number', editable: false, width: 150
                        },
                        // {
                        //         fieldName: '', field: 'button', datatype: 'launchbutton', editable: true,
                        //         width: 100, data: 'row', updateField: 'row', modal: true, onLaunchClick: this.onOsipsearOpen,

                        // },
                        {
                                fieldName: this.translateService.translate('system-profile.name-last'), field: 'lastName', editable: false,
                                width: 300, maxlength: 35, datatype: 'text', uppercase: true
                        },

                        {
                                fieldName: this.translateService.translate('system-profile.name-given-1'), field: 'firstName', editable: false,
                                width: 300, maxlength: 35, datatype: 'text', uppercase: true
                        },
                        {
                                fieldName: this.translateService.translate('system-profile.name-given-2'), field: 'middleName', editable: false,
                                width: 250, uppercase: true, maxlength: 35, datatype: 'text'
                        }
                ];


                this.visrRestColumnDef = [
                        {
                                fieldName: this.translateService.translate('common.restrictionDate'), field: 'effectiveDate',
                                datatype: 'date', editable: true, width: 150
                        },
                        {
                                fieldName: this.translateService.translate('common.expirydate'), field: 'expiryDate',
                                datatype: 'date', editable: true, width: 150
                        },
                        {
                                fieldName: this.translateService.translate('common.type1'), field: 'visitRestrictionType', datatype: 'lov',
                                sourceDomain: 'VST_RST_TYPE', source: 'OUMRCODE', link: 'omuvrest/rgVisrRestVisitRestrictiRecordGroup', editable: true, width: 300, titles: this.codeTitles
                        },
                        {
                                fieldName: this.translateService.translate('common.comment'), field: 'commentTxt', editable: true,
                                width: 300, maxlength: 240, datatype: 'text',uppercase: 'false',
                        },
                        {
                                fieldName: this.translateService.translate('common.enteredby'), field: 'description', editable: false,
                                width: 250
                        }
                ];

                
                 if (this.visitor) {
                        this.visitorFlag = true;                    
                        this.omuvrestexecuteQuery();
                } else {
                        this.omuvrestexecuteQuery();
                } 
        }
        allowNumbers(event) {
        }
        setClearDisale() {
                if (this.visrrestData.length > 0 || this.perModel.personId || this.perModel.personId === 0 ||
                        this.perModel.lastName || this.perModel.firstName || this.perModel.middleName) {
                        return false;
                } else {
                        return true;
                }
        }
        onRowClickVisrrest(event) {
                if (event) {
                        this.visrrestModel = event;
                }
        }
        visitorsClosed(event) {
                if (event) {
                        this.perModel.personId = event.personId;
                        this.omuvrestexecuteQuery();
                }
        }
        ok() {
        }
        no() {
        }
        cancel() {
                this.perData = [];
                this.perModel = new Persons();
                this.visrrestData = [];
                this.visrrestModel = new VisitorRestrictions();
                this.previousReadOnly = true;
                this.nextReadOnly = true;
                this.cleardisabled = true;
                this.visrrestInsert = false;
                this.retrievedisabled = false;
                this.dataReadOnly = false;
                this.flag = false;
                this.disabledButton = false;
        }
        onOffenderChange(offender) {
        }
        show() {
                this.msglist = [];
                this.msglist.push({ message: this.message, type: this.type });
                this.msgs = [...this.msglist];
        }
        onGridInsert = () => {
                for (let i = 0; i < this.visrrestData.length; i++) {
                        if (!this.visrrestData[i].effectiveDate) {
                                this.type = 'warn';
                                this.message = this.translateService.translate('omuvrest.restrictiondatemustbeentered');
                                this.show();
                                return;
                        }
                        if (this.visrrestData[i].expiryDate) {
                                this.effectiveDate = DateFormat.getDate(this.visrrestData[i].effectiveDate);
                                this.expiryDate = DateFormat.getDate(this.visrrestData[i].expiryDate);
                                if (DateFormat.compareDate(this.effectiveDate, this.expiryDate) === 1) {
                                        this.type = 'warn';
                                        this.message = this.translateService.translate('omuvrest.expirydatemustbeaftereffectivedate');
                                        this.show();
                                }
                        }
                        if (!this.visrrestData[i].visitRestrictionType) {
                                this.type = 'warn';
                                this.message = this.translateService.translate('omuvrest.typemustbeentered');
                                this.show();
                                return;
                        }
                }
                return { effectiveDate: DateFormat.getDate() };
        }
        omuvrestexecuteQuery() {
                if (!this.perModel.lastName) {
                        this.perModel.lastName = null;
                }
                if (!this.perModel.firstName) {
                        this.perModel.firstName = null;
                }
                if (!this.perModel.middleName) {
                        this.perModel.middleName = null;
                }
                if (this.visitorFlag) {
                        this.perModel = this.visitor;
                }
                const serviceObj = this.omuvrestFactory.perExecuteQuery(this.perModel);
                serviceObj.subscribe(data => {
                        if (data.length === 0) {
                                this.perData = [];
                                this.cleardisabled = false;
                                this.previousReadOnly = true;
                                this.nextReadOnly = true;
                                this.visrrestInsert = false;
                                this.type = 'warn';
                                this.message = this.translateService.translate('common.querycaused');
                                this.show();
                                return;
                        } else {
                                this.perData = data;
                                this.perModel = this.perData[0];
                                this.tableIndexOne = 0;
                                if (this.perModel.personId) {
                                        if (this.visitorFlag) {
                                                this.disabledButton = true;
                                                this.previousReadOnly = true;
                                                this.nextReadOnly = true;
                                                this.cleardisabled = true;
                                                this.retrievedisabled = true;
                                                this.visrrestInsert = true;
                                                this.dataReadOnly = true;
                                        } else {
                                                this.index = 0;
                                                this.disabledButton = false;
                                                this.visrrestInsert = true;
                                                this.cleardisabled = false;
                                                this.previousReadOnly = false;
                                                this.nextReadOnly = false;
                                                this.retrievedisabled = true;
                                                this.dataReadOnly = true;
                                                this.flag = true;
                                        }
                                        this.visrrestModel = new VisitorRestrictions();
                                        this.visrrestExecuteQuery();
                                }
                        }
                });
        }
        visrrestExecuteQuery() {
                this.visrrestModel.personId = this.perModel.personId;
                const visrrestResult = this.omuvrestFactory.visrRestExecuteQuery(this.visrrestModel);
                visrrestResult.subscribe(visrrestResultList => {
                        if (visrrestResultList.length === 0) {
                                this.visrrestData = [];
                        } else {
                                this.visrrestData = visrrestResultList;
                                this.visrrestModel = visrrestResultList[0];
                                this.tableIndex = 0;
                        }
                });
        }
        /**
         *  This function will be executed when commit event is
        * fired
        */
        omuvrestSavevisrrestForm(event) {
                this.visrrestInsertList = event.added;
                this.visrrestUpdateList = event.updated;
                this.visrrestDeleteList = event.removed;
                this.visrrestCommitModel.insertList = [];
                this.visrrestCommitModel.updateList = [];
                this.visrrestCommitModel.deleteList = [];
                if (this.visrrestData.length > 0) {
                        for (let i = 0; i < this.visrrestData.length; i++) {
                                let dupList = this.visrrestData.filter(x => x.visitRestrictionType === this.visrrestData[i].visitRestrictionType && x.expiryDate == undefined && this.visrrestData[i].expiryDate == undefined);
                                if (dupList.length > 1) {
                                        this.type = 'warn';
                                        this.message = this.translateService.translate('omuvrest.arestrictionofthistypealreadyexistsforthevisitor');
                                        this.show();
                                        return;
                                }
                        }
                }
                if (this.visrrestInsertList.length > 0 || this.visrrestUpdateList.length > 0) {
                        for (let i = 0; i < this.visrrestInsertList.length; i++) {
                                if (!this.visrrestInsertList[i].effectiveDate) {
                                        this.type = 'warn';
                                        this.message = this.translateService.translate('omuvrest.restrictiondatemustbeentered');
                                        this.show();
                                        return;
                                }else if(!this.visrrestInsertList[i].visitRestrictionType){
                                        this.type = 'warn';
                                        this.message = this.translateService.translate('common.typemustbeentered');
                                        this.show();
                                        return;
                                } else {
                                        this.visrrestInsertList[i].effectiveDate = DateFormat.getDate(DateFormat.getDate
                                                (this.visrrestInsertList[i].effectiveDate).setHours(0, 0, 0, 0));
                                }
                                if (this.visrrestInsertList[i].expiryDate) {
                                        this.effectiveDate = DateFormat.getDate(this.visrrestInsertList[i].effectiveDate);
                                        this.expiryDate = DateFormat.getDate(this.visrrestInsertList[i].expiryDate);
                                        if (DateFormat.compareDate(this.effectiveDate, this.expiryDate) === 1) {
                                                this.type = 'warn';
                                                this.message = this.translateService.translate
                                                        ('omuvrest.expirydatemustbeaftereffectivedate');
                                                this.show();
                                                return;
                                        }
                                }
                                if (!this.visrrestInsertList[i].visitRestrictionType) {
                                        this.type = 'warn';
                                        this.message = this.translateService.translate('omuvrest.typemustbeentered');
                                        this.show();
                                        return;
                                }
                                this.visrrestInsertList[i].personId = this.perModel.personId;
                        }
                        for (let i = 0; i < this.visrrestUpdateList.length; i++) {
                                if (!this.visrrestUpdateList[i].effectiveDate) {
                                        this.type = 'warn';
                                        this.message = this.translateService.translate('omuvrest.restrictiondatemustbeentered');
                                        this.show();
                                        return;
                                }else if(!this.visrrestUpdateList[i].visitRestrictionType){
                                        this.type = 'warn';
                                        this.message = this.translateService.translate('common.typemustbeentered');
                                        this.show();
                                        return;
                                } else {
                                        this.visrrestUpdateList[i].effectiveDate = DateFormat.getDate(DateFormat.getDate
                                                (this.visrrestUpdateList[i].effectiveDate).setHours(0, 0, 0, 0));
                                }
                                if (this.visrrestUpdateList[i].expiryDate) {
                                        this.effectiveDate = DateFormat.getDate(this.visrrestUpdateList[i].effectiveDate);
                                        this.expiryDate = DateFormat.getDate(this.visrrestUpdateList[i].expiryDate);
                                        if (DateFormat.compareDate(this.effectiveDate, this.expiryDate) === 1) {
                                                this.type = 'warn';
                                                this.message = this.translateService.translate
                                                        ('omuvrest.expirydatemustbeaftereffectivedate');
                                                this.show();
                                                return;
                                        }
                                }
                        }
                        this.visrrestCommitModel.insertList = this.visrrestInsertList;
                        this.visrrestCommitModel.updateList = this.visrrestUpdateList;
                }
                if (this.visrrestDeleteList.length > 0) {
                        for (let i = 0; i < this.visrrestDeleteList.length; i++) {
                        }
                        this.visrrestCommitModel.deleteList = this.visrrestDeleteList;
                }
                const visrrestSaveData = this.omuvrestFactory.visrRestCommit(this.visrrestCommitModel);
                visrrestSaveData.subscribe(data => {
                        if (data > 0) {
                                this.type = 'success';
                                this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
                                this.show();
                                this.visrrestExecuteQuery();
                                return;
                        } else {
                                this.type = 'warn';
                                this.message = this.translateService.translate('common.addupdateremoverecordfailed');
                                this.show();
                                this.visrrestExecuteQuery();
                                return;
                        }
                });
        }
        previousRecord() {
                this.index--;
                if (this.index >= 0) {
                        this.perModel = this.perData[this.index];
                        this.visrrestExecuteQuery();
                        this.nextReadOnly = false;
                } else {
                        this.index = 0;
                        this.previousReadOnly = true;
                        this.type = 'warn';
                        this.message = this.translateService.translate('common.atfirstrecord');
                        this.show();
                        return;
                }
        }
        nextRecord() {
                this.index++;
                if (this.index < this.perData.length) {
                        this.perModel = this.perData[this.index];
                        this.visrrestExecuteQuery();
                        this.previousReadOnly = false;
                } else {
                        this.index = this.perData.length - 1;
                        this.nextReadOnly = true;
                        this.type = 'warn';
                        this.message = this.translateService.translate('common.lastrecordofquery');
                        this.show();
                        return;
                }
        }
        onOsipsearOpen() {
                const person = this.perModel.personId ? { 'pPersonId': Math.floor(Number(this.perModel.personId)), 'pSearchType': 'I' }
                        : { 'pSearchType': 'N' };
                const dialogData = { 'person': person, forwardToDialog: true };
                this.dialogService.openLinkDialog('/osipserdialog', dialogData).subscribe(result => {
                        this.visitorsClosed(result);
                });
        }

        onRowClickPerData(event) {
                if (event) {
                        this.perModel = event;
                        this.visrrestExecuteQuery();
                }
        }
}
