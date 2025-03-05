import {
    Component,
    OnInit,
    ViewChild
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OcuavisnService } from '../service/ocuavisn.service';
import { VOffContactPersons } from '@visitsbeans/VOffContactPersons';
import { DialogService } from '@ui-components/dialog/dialog.service';
import { DialogComponent } from '@ui-components/dialog/dialog.component';
import { Router } from '@angular/router';
import { VHeaderBlock } from '@commonbeans/VHeaderBlock';
import { OffenderSearchService } from '@common/offender-records/service/offender-search.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { OffenderContactPersons } from '@inst/demographics-biometrics/beans/OffenderContactPersons';
import { OffenderContactPersonsCommitBean } from '@inst/demographics-biometrics/beans/OffenderContactPersonsCommitBean';
import { DateFormat } from '@ui-components/datepicker/dateFormat';
import { OsipsearService } from '@inst/visits-management/service/osipsear.service';
import { ValidateRowReturn } from '@ui-components/grid/grid.component';
import { OffenderRestrictions } from '@inst/visits-management/beans/OffenderRestrictions';
import { OcuvwarnService } from '@inst/visits-management/service/ocuvwarn.service';
import { OidvisitService } from '../service/oidvisit.service';

@Component({
    selector: 'app-ocuavisn',
    templateUrl: './ocuavisn.component.html'
})

export class OcuavisnComponent implements OnInit {
    gAgeLimit: any;
    offenderrestrictionModel: OffenderRestrictions;
    @ViewChild('dialog', {static: true}) dialog: DialogComponent;
    @ViewChild('visitorPersonGrid') visitorPersonGrid: any;
    actionName: string;
    lovModel: any[];
    msgs: any[] = [];
    nameOfLovPage: string;
    listToCompare: any[] = [];
    voffauthvisData: VOffContactPersons[] = [];
    voffauthvisDataTemp: VOffContactPersons[] = [];
    voffauthvisModel: VOffContactPersons = new VOffContactPersons();
    voffauthvisModelTemp: VOffContactPersons = new VOffContactPersons();
    voffauthvisIndex: number;
    voffauthvisInsertList: OffenderContactPersons[] = [];
    voffauthvisUpdatetList: OffenderContactPersons[] = [];
    voffauthvisDeleteList: OffenderContactPersons[] = [];
    voffauthvisCommitModel: OffenderContactPersonsCommitBean = new OffenderContactPersonsCommitBean();
    vHeaderBlockModel: VHeaderBlock = new VHeaderBlock();
    minDate: Date;
    display: boolean;
    errorMessage: string;
    headerMessage: string;
    disabled: boolean;
    editable: boolean;
    vOffAuthVisColumnDef: any[];
    perAddrColumnDef: any[];
    perIdentColumnDef: any[];
    perEmpColumnDef: any[];
    offCntPerColumnDef: any[];
    offCntPerReadOnly: boolean;
    perAddrReadOnly: boolean;
    perIdentReadOnly: boolean;
    perInfoReadOnly: boolean;
    perEmpReadOnly: boolean;
    vOffAuthVisReadOnly: boolean;
    rgcontacttypeRg: any[] = [];
    rgrelationshiptypeRg: any[] = [];
    selectFlag: boolean;
    selceted = -1;
    checkFlag: boolean;
    insertFlag: boolean;
    contactTypeMap: Map<string, string> = new Map<string, string>();
    relationTypeMap: Map<string, string> = new Map<string, string>();
offenderrestrictionData: OffenderRestrictions[] = [];
    personAlreadyExists: boolean;
    constructor(private ocuavisnFactory: OcuavisnService, public dialogService: DialogService, private router: Router,
        public translateService: TranslateService, private offenderSearchService: OffenderSearchService,
        private sessionManager: UserSessionManager, private osipsearFactory: OsipsearService,
        private ocuvwarnFactory: OcuvwarnService , private oidvisitFactory: OidvisitService) {
        this.vOffAuthVisColumnDef = [];
        this.perAddrColumnDef = [];
        this.perIdentColumnDef = [];
        this.perEmpColumnDef = [];
        this.offCntPerColumnDef = [];
    }
    ngOnInit() {
        this.personAlreadyExists = false;
        this.selceted = -1;
        this.checkFlag = false;
        this.vHeaderBlockModel = this.offenderSearchService.selectedOffender;
        this.voffauthvisExecuteQuery();
        this.vOffAuthVisColumnDef = [
            {
                fieldName: this.translateService.translate('ocuavisn.select'), field: 'selectFlag', editable: true, width: 150,
                datatype: 'checkbox', cellEditable: this.checkSelectFlag, nonSavable: true
            },
            { fieldName: this.translateService.translate('ocuavisn.visitorid') + '*', field: 'personId', editable: false, width: 150,
             datatype: 'number', maxValue: '9999' },
            {
                fieldName: '', field: 'button',datatype: 'hyperlink',
                editable: true, displayas: 'href', modal: true, dialogWidth: '80%', styleClass: 'search',
                data: 'row', updateField: 'row', link: '/osipserdialog',
                width: 100, onLaunchClick: this.clickVisitorId
            },
            { fieldName: this.translateService.translate('ocuavisn.lastname'), field: 'personLastName',
             editable: false, width: 150 },
            { fieldName: this.translateService.translate('ocuavisn.firstname'), field: 'personFirstName',
             editable: false, width: 150 },
            {
                fieldName: this.translateService.translate('ocuavisn.contacttype') + '*', field: 'contactType', editable: true, width: 150,domain:'CONTACTS',
                link: 'ocuavisn/rgContactTypeRecordGroup',
                 datatype: 'lov', optionWidth: 300, cellEditable: this.checkSelectType
            },
            {
                fieldName: this.translateService.translate('ocuavisn.relationship') + '*', field: 'relationshipType',//domain:'RELATIONSHIP',
                 editable: true, width: 150,
                link: 'ocuavisn/rgRelationshipTypeRecordGroup?contactType=',
                datatype: 'lov',
                parentField: 'contactType', optionWidth: 300, cellEditable: this.checkContactType
            },
            { fieldName: this.translateService.translate('ocuavisn.age'), field: 'age', editable: false, width: 150 },
            { fieldName: this.translateService.translate('ocuavisn.restriction'), field: 'restriction', editable: false, width: 150 },
            {
                fieldName: '', field: 'butRestriction', datatype: 'hyperlink',
                editable: true, displayas: 'href', modal: true, dialogWidth: '80%', styleClass: 'search',
                data: 'row', updateField: 'row', width: 150, link: '/OIUOVRES', cellEditable: this.checkSelectType,
                onLaunchClick: this.viewButtonClick
            },
            { fieldName: this.translateService.translate('ocuavisn.visitban'), field: 'globalRestriction', editable: false, width: 150 },
            {
                fieldName: '', field: 'butVisitban',datatype: 'hyperlink',
                editable: true, displayas: 'href', modal: true, dialogWidth: '80%', styleClass: 'search',
                data: 'row', updateField: 'row', width: 150, link: '/OMUVRESTDIALOG', cellEditable: this.checkSelectType,
                onLaunchClick: this.viewButtonBanClick

            },
            {
                fieldName: this.translateService.translate('ocuavisn.approved'), field: 'approvedVisitorFlag', editable: true, width: 150,
                 datatype: 'checkbox', cellEditable: this.checkSelectType
            },
            { fieldName: '', field: 'contactTypeDescription', hide: true },
            { fieldName: '', field: 'relationshipTypeDescription', hide: true },
            { fieldName: '', field: 'personName', hide: true },
            { fieldName: '', field: 'lastName', hide: true },
            { fieldName: '', field: 'firstName', hide: true },
            { fieldName: '', field: 'middleName', hide: true },
        ];
        this.gAgeLimit = 0;
        const systemProfileAge = this.oidvisitFactory.getProfileValues('CLIENT', 'VISIT_AGE');
        systemProfileAge.subscribe(visitorDetilsResultData => {
            if (visitorDetilsResultData) {
                this.gAgeLimit = visitorDetilsResultData.profileValue;
            }
        });

        const rgAccServiceObj = this.ocuavisnFactory.rgContactTypeRecordGroup
          ();
        rgAccServiceObj.subscribe(rgteamstaffList => {
          if (rgteamstaffList.length === 0) {
          } else {
            for (let i = 0; i < rgteamstaffList.length; i++) {
              this.contactTypeMap.set(rgteamstaffList[i].code, rgteamstaffList[i].description);
             // this.contactTypeMap.set(rgteamstaffList[i].description, rgteamstaffList[i].description);
            }
          }
        });

        const getObject = this.ocuavisnFactory.rgRelationshipTypeTotalRecordGroup();
          getObject.subscribe(data => {
          if (data.length === 0) {
          } else {
            for (let i = 0; i < data.length; i++) {
              this.relationTypeMap.set(data[i].code, data[i].description);
             // this.relationTypeMap.set(data[i].description, data[i].description);
            }
          }
        });
        
    }
    clickVisitorId = (event) => {
        /**
    *  In legacy application shows message like 'Unable to UPDATE  record' before updating visitor ID but we implemented this message
   */
        if (event.offenderContactPersonId) {
            this.show(this.translateService.translate('ocuavisn.unabletoupdate'), 'warn');
            return false;
        } else {
            return true;
        }
    }
    viewButtonBanClick = (data) => {
        if (this.personAlreadyExists) {
            this.show(this.translateService.translate('ocuavisn.vistoralreadyexists'), 'warn');
            return false;
        } else  if (!data.offenderContactPersonId) {
            this.show(this.translateService.translate('ocuavisn.pleasesavethechanges'), 'warn');
            return false;
        } else if (this.voffauthvisModelTemp.personId) {
            if (this.visitorPersonGrid.addedMap.size === 0 && this.visitorPersonGrid.updatedMap.size === 0
                && this.visitorPersonGrid.removedMap.size === 0) {
                this.dialogService.openLinkDialog('/OMUVRESTDIALOG', data, 80).subscribe(dlgData => {
                    this.voffauthvisExecuteQuery();
                });
            }
        }
        return false;
    }

    viewButtonClick = (data) => {
        if (this.personAlreadyExists) {
            this.show(this.translateService.translate('ocuavisn.vistoralreadyexists'), 'warn');
            return false;
        } else  if (!data.offenderContactPersonId) {
            this.show(this.translateService.translate('ocuavisn.pleasesavethechangesoiuovres'), 'warn');
            return false;
        } else if (this.voffauthvisModelTemp.personId) {
            if (this.visitorPersonGrid.addedMap.size === 0 && this.visitorPersonGrid.updatedMap.size === 0
                && this.visitorPersonGrid.removedMap.size === 0) {
                this.dialogService.openLinkDialog('/OIUOVRES', data, 80).subscribe(dlgData => {
                    this.voffauthvisExecuteQuery();
                });
            }
        }
        return false;
    }
    onRowClickvoffauthvis(event) {
        if (event) {
            this.voffauthvisModelTemp = event;
        }
    }

    checkSelectType = (data: any, index: number, field: string): boolean => {
        const selectedRowIndex = this.voffauthvisData.indexOf(data);
        if (data.personId && (!data.offenderContactPersonId) ) {
            const indexVal = this.findIndex(this.voffauthvisData, 'personId', Number(data.personId));
            if (indexVal !== selectedRowIndex && indexVal !== -1) {
                this.personAlreadyExists = true;
                this.show(this.translateService.translate('ocuavisn.vistoralreadyexists'), 'warn');
            } else {
               // this.osipsearexecuteQuery(Number(data.personId), selectedRowIndex, data);
            }
        }
        if (this.personAlreadyExists) {
            this.show(this.translateService.translate('ocuavisn.vistoralreadyexists'), 'warn');
            return false;
        } else {
            return true;
        }
    }

    checkContactType = (data: any, index: number, field: string): boolean => {
        if (this.personAlreadyExists) {
            this.show(this.translateService.translate('ocuavisn.vistoralreadyexists'), 'warn');
            return false;
        }
        if (!data.contactType) {
            this.show(this.translateService.translate('ocuavisn.pleaseselectacontacttype'), 'warn');
            return false;

        } else {
            return true;
        }

    }
    checkSelectFlag = (data: any, index: number, field: string): boolean => {
        if (this.personAlreadyExists) {
            this.show(this.translateService.translate('ocuavisn.vistoralreadyexists'), 'warn');
            return false;
        }
        if (!this.voffauthvisData[index].offenderContactPersonId) {
            this.show(this.translateService.translate('ocuavisn.pleasesavethevisitor'), 'warn');
            return false;

        }
        if (!this.voffauthvisData[index].contactType) {
            this.show(this.translateService.translate('ocuavisn.pleaseselectacontacttype'), 'warn');
            return false;

        }
        if (field === 'selectFlag' && (!data.approvedVisitorFlag)) {
        //    this.show(this.translateService.translate('ocuavisn.cannotselectavisitor'), 'warn');
           return true;
        } else {
            return true;
        }

    }
    butCancelWhenButtonPressedTrigger() {
        this.dialog.close(null);

    }
    asnLaunchClick = (event) => {
        if (event) {
            this.router.navigate(['/OSIPSEAR']);
            return false;

        } else {
            return true;
        }
    }
    validateVisitor = (event) => {
        const rowdata = new ValidateRowReturn();
        this.personAlreadyExists = false;
        const rowIndex = event.rowIndex;
        if (event.field === 'personId' && event.data[event.field]) {
        if (event.field === 'personId') {
            const index = this.findIndex(this.voffauthvisData, 'personId', Number(event.newValue));
            if (index !== rowIndex && index !== -1) {
                this.personAlreadyExists = true;
                this.show(this.translateService.translate('ocuavisn.vistoralreadyexists'), 'warn');
            } else {
                this.osipsearexecuteQuery(Number(event.newValue), rowIndex, event.data);
            }
        }
        if (event.data.personId && (!event.data.offenderContactPersonId) ) {
            const index = this.findIndex(this.voffauthvisData, 'personId', Number(event.data.personId));
            if (index !== rowIndex && index !== -1) {
                this.personAlreadyExists = true;
                this.visitorPersonGrid.setColumnData('personId', rowIndex, undefined);
                this.visitorPersonGrid.setColumnData('personLastName', rowIndex, undefined);
                this.visitorPersonGrid.setColumnData('personFirstName', rowIndex, undefined);
                this.visitorPersonGrid.setColumnData('age', rowIndex, undefined);
                this.show(this.translateService.translate('ocuavisn.vistoralreadyexists'), 'warn');
            } else {
                 this.osipsearexecuteQuery(Number(event.data.personId), rowIndex, event.data);
            }
        }
        if (event.data.selectFlag === true) {
            for (let i = 0; i < this.voffauthvisData.length; i++) {
                if (this.voffauthvisData[i]['selectFlag']) {
                    this.checkFlag = true;
                }

            }
            if (event.data.approvedVisitorFlag === false || event.data.approvedVisitorFlag === null) {
                this.show(this.translateService.translate('ocuavisn.cannotselectavisitor'), 'warn');
                this.visitorPersonGrid.setColumnData('selectFlag', rowIndex, false);
            }
        } else if (!event.data.selectFlag) {
            for (let i = 0; i < this.voffauthvisData.length; i++) {
                if (this.voffauthvisData[i]['selectFlag']) {
                    // this.checkFlag = true;
                    rowdata.validated = true;
                    return rowdata;
                } else {
                    this.checkFlag = false;
                }
            }
        }
    }
    if (event.data.offenderContactPersonId && event.data.selectFlag === true) {
    if (event.data.approvedVisitorFlag === false || event.data.approvedVisitorFlag === null) {
        this.show(this.translateService.translate('ocuavisn.cannotselectavisitor'), 'warn');
        this.visitorPersonGrid.setColumnData('selectFlag', rowIndex, false);
    }
}
    if (event.field === 'selectFlag' && event.data.offenderContactPersonId &&
           event.data.selectFlag && event.data.approvedVisitorFlag ) {
            event.data.visitDate =  this.dialog.data.visitDate;
            this.offenderrestrictionModel = new OffenderRestrictions();
            this.offenderrestrictionModel.personId = event.data.personId;
            this.offenderrestrictionModel.offenderBookId = event.data.offenderBookId;
            this.offenderrestrictionModel.visitDate = event.data.visitDate;
            this.checkFlag = true;
            const populateDetails = this.ocuvwarnFactory.populateVisitorDetails(this.offenderrestrictionModel);
            populateDetails.subscribe(visitorDetilsResultData => {
            if (!visitorDetilsResultData || visitorDetilsResultData.length === 0) {
                this.offenderrestrictionData = [];
                if (event.data.age !== null && event.data.age !== undefined) {
                    if (event.data.age < this.gAgeLimit) {
                        const offRestrictionsData = {
                            personId: event.data.personId, inVoke: 'VISITOR', offenderId: null,
                            offenderBookId: this.vHeaderBlockModel.offenderBookId, visitDate: event.data.visitDate,
                            age: event.data.age, globalRestriction: event.data.globalRestriction
                        };
                        this.dialogService.openLinkDialog('/OCUVWARN', offRestrictionsData, 70).subscribe(result => {
                            if (result) {
                                this.visitorPersonGrid.setColumnData('selectFlag', rowIndex, true);
                                this.checkFlag = true;
                            } else {
                                this.visitorPersonGrid.setColumnData('selectFlag', rowIndex, false);
                                this.checkFlag = false;
                            }
                        });
                    }
                }
            } else {
                this.offenderrestrictionData = visitorDetilsResultData;
                const offRestrictionsData = {personId: event.data.personId, inVoke : 'VISITOR', offenderId: null,
                offenderBookId: this.vHeaderBlockModel.offenderBookId, visitDate: event.data.visitDate,
                age: event.data.age, globalRestriction: event.data.globalRestriction };
                this.dialogService.openLinkDialog('/OCUVWARN', offRestrictionsData, 70).subscribe(result => {
                    if (result) {
                      this.visitorPersonGrid.setColumnData('selectFlag', rowIndex, true);
                      this.checkFlag = true;
                    } else {
                        this.visitorPersonGrid.setColumnData('selectFlag', rowIndex, false);
                        this.checkFlag = false;
                    }
                });
                // if(this.offenderrestrictionModelTemp.age === ){
                // }
                // this.offenderrestrictionModel = visitorDetilsResultData[0];
            }
            });
   }
    // }

    if (event.field === 'contactType') {
        if (event.data.contactType) {
            const data = this.contactTypeMap.get(event.data.contactType);
            this.visitorPersonGrid.setColumnData('contactTypeDescription', rowIndex, data);
            if(event.oldValue !== event.newValue){
                this.visitorPersonGrid.setColumnData('relationshipType', rowIndex, undefined);   
            }
            rowdata.validated = true;
            return rowdata;
        } else {
            rowdata.validated = true;
            return rowdata;
           // this.internalStaff.setColumnData('staffId', rowIndex, undefined);
        }
    }

    if (event.field === 'relationshipType') {
        if (event.data.relationshipType) {
            const data = this.relationTypeMap.get(event.data.relationshipType);
            this.visitorPersonGrid.setColumnData('relationshipTypeDescription', rowIndex, data);
            rowdata.validated = true;
            return rowdata;
        } else {
            rowdata.validated = true;
            return rowdata;
           // this.internalStaff.setColumnData('staffId', rowIndex, undefined);
        }
    }

        rowdata.validated = true;
        return rowdata;
    }

    osipsearexecuteQuery(personId, index, columnData) {
        const searchparamModel = { 'pSearchType': 'I', 'pPersonId': Math.floor(personId) };
        this.osipsearFactory.personsExecuteQuery(searchparamModel)
            .subscribe(data => {
                if (data && data.length === 0 || data[0].errorMessage) {
                    this.visitorLaunchClick(data);
                } else {
                    this.visitorPersonGrid.setColumnData('personId', index, data[0].personId);
                    this.visitorPersonGrid.setColumnData('personLastName', index, data[0].lastName);
                    this.visitorPersonGrid.setColumnData('personFirstName', index, data[0].firstName);
                    this.visitorPersonGrid.setColumnData('age', index, data[0].age);
                    const banData = this.ocuavisnFactory.getGlobalrestriction(data[0].personId,
                         DateFormat.getDate(this.dialog.data.visitDate),
                        this.vHeaderBlockModel.offenderBookId).subscribe(ban => {
                        if (ban) {
                            this.visitorPersonGrid.setColumnData('globalRestriction', index, ban.globalRestriction);
                        }
                    });

                }
            });
    }
    findIndex(arr, key, val) {
        const index = { indexVal: -1 };
        for (let i = 0; i < arr.length; i++) {
            if (arr[i][key] === val) {
                index.indexVal = i;
                break;
            }
        }
        return index.indexVal;
    }

    visitorLaunchClick = (data, from?) => {
        if (data.isExisted) {
            this.show(this.translateService.translate('ocuavisn.fieldisprotectedagainstupdate'), 'warn');
            return false;
        }
        const person = data.personId ? { 'pPersonId': Math.floor(Number(data.personId)), 'pSearchType': 'I' } : { 'pSearchType': 'N' };
        const dialogData = { 'person': person, forwardToDialog: true };
        this.dialogService.openLinkDialog('/osipserdialog', dialogData).subscribe(result => {
            const index = this.voffauthvisData.indexOf(this.voffauthvisModelTemp);
            this.visitorPersonGrid.setColumnData('personId', index, result.personId);
             this.visitorPersonGrid.setColumnData('personLastName', index, result.personLastName);
             this.visitorPersonGrid.setColumnData('personFirstName', index, result.personFirstName);
             this.visitorPersonGrid.setColumnData('age', index, result.age);
        });
        return false;
    }
    onGridInsert = () => {
        if (this.voffauthvisData.length > 0) {
            if (!this.voffauthvisData[this.voffauthvisData.length - 1].personId) {
                this.show(this.translateService.translate('ocuavisn.visitoridmustbeentered'), 'warn');
                return;
            }
            if (!this.voffauthvisData[this.voffauthvisData.length - 1].contactType ||
                this.voffauthvisData[this.voffauthvisData.length - 1].contactType === '') {
                this.show(this.translateService.translate('ocuavisn.contacttypemustbeentered'), 'warn');
                return;
            }
            if (!this.voffauthvisData[this.voffauthvisData.length - 1].relationshipType ||
                this.voffauthvisData[this.voffauthvisData.length - 1].relationshipType === '') {
                this.show(this.translateService.translate('ocuavisn.relationshipmustbeentered'), 'warn');
                return;

            }
        }
        if (this.voffauthvisModel.approvedVisitorFlag) {
            this.voffauthvisModel.approvedVisitorFlag = 'Y';
        } else {
            this.voffauthvisModel.approvedVisitorFlag = 'N';
        }
        this.personAlreadyExists = false;
        return {
            button: '', butRestriction: '', butVisitban: '', contactType: '', relationshipType: '',
            approvedVisitorFlag: 'true', personLastName: '', personFirstName: '', personId: null
        };
    }
    onOffenderChange(offender) {
        this.vHeaderBlockModel = offender;
        if (offender) {
            this.voffauthvisExecuteQuery();
        }
    }
    show(vldmsg, type?) {
        const msgval = [{ message: vldmsg, type: type }];
        this.msgs = [...msgval];
    }
    voffauthvisExecuteQuery() {
        this.voffauthvisModel.offenderBookId = this.vHeaderBlockModel.offenderBookId;
        this.voffauthvisModel.visitDate = this.dialog.data.visitDate;
        const voffauthvisResult = this.ocuavisnFactory.vOffAuthVisExecuteQuery(this.voffauthvisModel);
        voffauthvisResult.subscribe(data => {
            if (data.length === 0) {
                this.voffauthvisData = [];
            } else {
                this.voffauthvisData = data;
                for (let i = 0; i < this.voffauthvisData.length; i++) {
                    this.voffauthvisData[i].approvedVisitorFlag = (this.voffauthvisData[i].approvedVisitorFlag === 'Y') ? 'true' : null;
                    this.voffauthvisData[i].activeFlag = (this.voffauthvisData[i].activeFlag === 'Y') ? 'true' : 'false';
                    this.voffauthvisData[i].button = '';
                    this.voffauthvisData[i].butRestriction = '';
                    this.voffauthvisData[i].butVisitban = '';
                    this.voffauthvisData[i]['selectFlag'] = false;

                }
                this.selceted = 0;
            }
        });
    }

    afterDialogClosed() {
        if (!this.checkFlag) {
            this.show(this.translateService.translate('ocuavisn.pleaseselectavisitorrecord'), 'warn');
            return;

        }
        const colsedDialogData = [];
        this.voffauthvisData.forEach(element => {
            if (element['selectFlag']) {

                colsedDialogData.push(element);
            }
        });
        this.dialog.close(colsedDialogData);
    }

    /**
     *  This function will be executed when commit event is
    * fired
    */
    ocuavisnSavevoffauthvisForm(event) {
        this.voffauthvisInsertList = event.added;
        this.voffauthvisUpdatetList = event.updated;
        this.voffauthvisDeleteList = event.removed;
        this.voffauthvisCommitModel.insertList = [];
        this.voffauthvisCommitModel.updateList = [];
        this.voffauthvisCommitModel.deleteList = [];
        if (this.personAlreadyExists) {
            this.show(this.translateService.translate('ocuavisn.vistoralreadyexists'), 'warn');
            return;
        }
        if (this.voffauthvisInsertList.length > 0) {
            for (let i = 0; i < this.voffauthvisInsertList.length; i++) {
                if (!this.voffauthvisInsertList[i].personId) {
                    this.show(this.translateService.translate('ocuavisn.visitoridmustbeentered'), 'warn');
                    return;
                }
                if (!this.voffauthvisInsertList[i].contactType) {
                    this.show(this.translateService.translate('ocuavisn.contacttypemustbeentered'), 'warn');
                    return;
                }
                if (!this.voffauthvisInsertList[i].relationshipType) {
                    this.show(this.translateService.translate('ocuavisn.relationshipmustbeentered'), 'warn');
                    return;
                }
                if (this.voffauthvisInsertList[i].approvedVisitorFlag) {
                    this.voffauthvisInsertList[i].approvedVisitorFlag = 'Y';
                } else {
                    this.voffauthvisInsertList[i].approvedVisitorFlag = 'N';
                }
                this.voffauthvisInsertList[i].activeFlag = 'Y';
                this.voffauthvisInsertList[i].emergencyContactFlag = 'N';
                this.voffauthvisInsertList[i].nextOfKinFlag = 'N';
                this.voffauthvisInsertList[i].offenderBookId = this.vHeaderBlockModel.offenderBookId;
                this.voffauthvisInsertList[i].createDatetime = DateFormat.getDate();
                this.voffauthvisInsertList[i].modifyDatetime = DateFormat.getDate();
                this.voffauthvisInsertList[i].createUserId = this.sessionManager.getId();

            }
            this.voffauthvisCommitModel.insertList = this.voffauthvisInsertList;
        }
        if (this.voffauthvisUpdatetList.length > 0) {
            for (let i = 0; i < this.voffauthvisUpdatetList.length; i++) {
                if (!this.voffauthvisUpdatetList[i].personId) {
                    this.show(this.translateService.translate('ocuavisn.visitoridmustbeentered'), 'warn');
                    return;
                }
                if (!this.voffauthvisUpdatetList[i].contactType) {
                    this.show(this.translateService.translate('ocuavisn.contacttypemustbeentered'), 'warn');
                    return;
                }
                if (!this.voffauthvisUpdatetList[i].relationshipType) {
                    this.show(this.translateService.translate('ocuavisn.relationshipmustbeentered'), 'warn');
                    return;
                }
                if (this.checkFlag && this.voffauthvisUpdatetList[i].approvedVisitorFlag === null) {
                    this.show(this.translateService.translate('ocuavisn.cannotselectavisitor'), 'warn');
                    return;
                }
                if (this.voffauthvisUpdatetList[i].approvedVisitorFlag) {
                    this.voffauthvisUpdatetList[i].approvedVisitorFlag = 'Y';
                } else {
                    this.voffauthvisUpdatetList[i].approvedVisitorFlag = 'N';
                }
                if (this.voffauthvisUpdatetList[i].activeFlag) {
                    this.voffauthvisUpdatetList[i].activeFlag = 'Y';
                } else {
                    this.voffauthvisUpdatetList[i].activeFlag = 'N';
                }
                this.voffauthvisUpdatetList[i].modifyDatetime = DateFormat.getDate();
                this.voffauthvisUpdatetList[i].createUserId = this.sessionManager.getId();

            }
            this.voffauthvisCommitModel.updateList = this.voffauthvisUpdatetList;
        }
        if (this.voffauthvisDeleteList.length > 0) {
            for (let i = 0; i < this.voffauthvisDeleteList.length; i++) {
            }
            this.voffauthvisCommitModel.deleteList = this.voffauthvisDeleteList;
        }
        const voffauthvisSaveData = this.ocuavisnFactory.vOffAuthVisCommit(this.voffauthvisCommitModel);
        voffauthvisSaveData.subscribe(data => {
            if (data === 1) {
                this.show(this.translateService.translate('common.addupdateremoverecordsuccess'), 'success');
                this.voffauthvisExecuteQuery();
            } else {
                this.show(this.translateService.translate('common.addupdateremoverecordfailed'), 'warn');
                this.voffauthvisExecuteQuery();
            }
        });
    }

}


