import {
    Component, OnInit, ViewChild
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OidviresService } from '../service/oidvires.service';
import { OffenderContactPersons } from '@inst/demographics-biometrics/beans/OffenderContactPersons';
import { VHeaderBlock } from '@common/beans/VHeaderBlock';
import { ValidateRowReturn } from '@ui-components/grid/grid.component';
import { OsipsearService } from '@inst/visits-management/service/osipsear.service';
import { DialogService } from '@ui-components/dialog/dialog.service';
import { DateFormat } from '@ui-components/datepicker/dateFormat';
import { OffenderRestrictions } from '@inst/visits-management/beans/OffenderRestrictions';
import { OffenderContactPersonsCommitBean } from '@inst/demographics-biometrics/beans/OffenderContactPersonsCommitBean';
import { OffenderRestrictionsCommitBean } from '@inst/visits-management/beans/OffenderRestrictionsCommitBean';
import { OffenderSearchService } from '@common/offender-records/service/offender-search.service';
import { OsinamesService } from '@cm/searchassaign/service/osinames.service';
import { OsiosearService } from '@common/offender-records/service/osiosear.service';

@Component({
    selector: 'app-oidvires',
    templateUrl: './oidvires.component.html'
})

export class OidviresComponent implements OnInit {
    @ViewChild('offenderContactGrid') offenderContactGrid: any;
    offVstRestSelected = -1;
    visitorSelected = -1;
    offenderSelected = -1;
    selectedVisitor: any;
    offVisitCommitText: string;
    selectedOffenderVisit: any;
    currentUserId: number;
    offenderVisitRestrictionSelectedRow: any;
    offenderImage: any;
    personImage: any;
    @ViewChild('visitorPersonGrid') visitorPersonGrid: any;
    @ViewChild('visitRestrictionGrid') visitRestrictionGrid: any;
    msgs: any[] = [];
    offRectriCommentText: string;
    visitorCommentText: string;
    offvisitrestData: any[] = [];
    offvisitrestInsertList: OffenderRestrictions[] = [];
    offvisitrestUpdatetList: OffenderRestrictions[] = [];
    offvisitrestDeleteList: OffenderRestrictions[] = [];
    offauthvisitorsData: OffenderContactPersons[] = [];
    offvisitrestCommitModel: OffenderRestrictionsCommitBean = new OffenderRestrictionsCommitBean();
    globalOffender: VHeaderBlock = new VHeaderBlock();
    offauthvisitorsInsertList: OffenderContactPersons[] = [];
    offauthvisitorsUpdatetList: OffenderContactPersons[] = [];
    offauthvisitorsDeleteList: OffenderContactPersons[] = [];
    offauthvisitorsCommitModel: OffenderContactPersonsCommitBean = new OffenderContactPersonsCommitBean();
    offauthvisitoffData: OffenderContactPersons[] = [];
    offauthvisitoffInsertList: OffenderContactPersons[] = [];
    offauthvisitoffUpdatetList: OffenderContactPersons[] = [];
    offauthvisitoffDeleteList: OffenderContactPersons[] = [];
    offauthvisitoffCommitModel: OffenderContactPersonsCommitBean = new OffenderContactPersonsCommitBean();
    offAuthVisitOffColumnDef: any[];
    offAuthVisitorsColumnDef: any[];
    offVisitRestColumnDef: any[];
    cameraButton: boolean;
    constructor(private oidviresFactory: OidviresService,
        private translateService: TranslateService,
        private offenderSearchService: OffenderSearchService,
        private osipsearFactory: OsipsearService,
        private dialogService: DialogService,
        private osinamesFactory: OsinamesService, private osiosearchService: OsiosearService) {
        this.offAuthVisitOffColumnDef = [];
        this.offAuthVisitorsColumnDef = [];
        this.offVisitRestColumnDef = [];
    }
    ngOnInit() {
        this.cameraButton = true;
        this.offAuthVisitOffColumnDef = [
            { fieldName: this.trMsg('system-profile.off-id-code', '*'), field: 'offenderIdDisplay', editable: false,
             /* cellEditable : this.canOffenderVisitorEdit, */ width: 150 },
            {
                fieldName: '', field: 'butOffenderIdDisplay', datatype: 'launchbutton', link: '/osinamesdialog', modal: true,
                data: 'row', editable: false, width: 150, onLaunchClick: this.osinamesClick , updateField: 'row',
                isDisable: this.setOffenderDisable
            },
            { fieldName: this.trMsg('common.lastname'), field: 'lastName', editable: false, width: 150 },
            { fieldName: this.trMsg('common.firstname'), field: 'firstName', editable: false, width: 150 },
            { fieldName: this.trMsg('common.location'), field: 'livingUnitDescription', editable: false, width: 150 },
            { fieldName: this.trMsg('common.contacttype', '*'), field: 'contactType', datatype: 'lov', domain: 'CONTACTS',
             editable: true, width: 150 },
            {
                fieldName: this.trMsg('common.relationship', '*'), field: 'relationshipType', datatype: 'lov',
                link: 'oidvires/rgAuthPriRelationshipTypeRecordGroup?contactType=', parentField: 'contactType',
                cellEditable : this.canOffenderVisitorEdit, editable: true, width: 150
            },
            { fieldName: this.trMsg('common.restriction'), datatype: 'text', field: 'restriction', editable: false, width: 150 },
            {
                fieldName: '', field: 'btnrestriction', datatype: 'launchbutton', data: 'row', link: 'OCUPREST',
                modal: true, editable: false, width: 150, onLaunchClick: this.onOcuprestClick, isDisable: this. setOffRestBanDisable
            },
            { fieldName: this.trMsg('common.approved'), field: 'approvedVisitorFlag', datatype: 'checkbox', editable: true, width: 150 },
            {fieldName: '', field: 'commentText', hide: true},
        ];
        this.offAuthVisitorsColumnDef = [
            { fieldName: this.trMsg('common.visitorid', '*'), field: 'personId', editable: false, width: 150 },
            {
                fieldName: '', field: 'btnPersonSearch', datatype: 'launchbutton', data: 'row', modal: true,
                onLaunchClick: this.visitorLaunchClick, isDisable: this.setPersonDisable, link: '/osipserdialog',
                editable: false, width: 150
            },
            { fieldName: this.trMsg('common.lastname'), field: 'lastName', editable: false, width: 150 },
            { fieldName: this.trMsg('common.firstname'), field: 'firstName', editable: false, width: 150 },
            { fieldName: this.trMsg('common.contacttype', '*'), field: 'contactType', datatype: 'lov', domain: 'CONTACTS',
                editable: true, width: 150 },
            {
                fieldName: this.trMsg('common.relationship', '*'), field: 'relationshipType', datatype: 'lov',
                link: 'oidvires/rgAuthPriRelationshipTypeRecordGroup?contactType=', parentField: 'contactType', editable: true, width: 150,
                cellEditable: this.canEdit
            },
            { fieldName: this.trMsg('common.age'), field: 'age', editable: false, width: 150 },
            { fieldName: this.trMsg('common.restriction'), datatype: 'text', field: 'restriction', editable: false, width: 150 },
            {
                fieldName: '', field: 'butNbtRestriction', datatype: 'launchbutton', modal: true, link: '\OIUOVRES', data: 'row',
                onLaunchClick: this.oiuovresLaunchClick, isDisable: this.setRestBanDisable, editable: false, width: 150
            },
            { fieldName: this.trMsg('common.visitban'), field: 'visitBan',  datatype: 'text', editable: false, width: 150 },
            { fieldName: '', field: 'butGlobalRestriction', datatype: 'launchbutton', modal: true, link: '\OMUVRESTDIALOG', data: 'row',
                onLaunchClick: this.omuvrestLaunchClick, editable: false, width: 150, isDisable: this.setRestBanDisable },
            { fieldName: this.trMsg('common.approved'), field: 'approvedVisitorFlag', datatype: 'checkbox', editable: true, width: 150 },
            {fieldName: '', field: 'commentText', hide: true},
        ];
        this.offVisitRestColumnDef = [
            { fieldName: this.trMsg('common.restrictionDate', ''), field: 'effectiveDate', datatype: 'date', editable: true, width: 150 },
            { fieldName: this.trMsg('common.expirydate'), field: 'expiryDate', datatype: 'date', editable: true, width: 150 },
            { fieldName: this.trMsg('common.type', '*'), field: 'restrictionType', datatype: 'lov', domain: 'VST_RST_TYPE', editable: true,
             width: 150 },
            {fieldName: '', field: 'commentText', hide: true},
            {
                fieldName: this.trMsg('common.enteredby'), field: 'enteredStaffId', datatype: 'lov',
                 link: 'oidvires/rgStaffIdRecordGroup?agyLocId=', parentField: 'agyLocId', editable: false, width: 150
            },
            {
                fieldName: this.trMsg('common.authorizedby', '*'), field: 'authorisedStaffId', datatype: 'lov',
                link: 'oidvires/rgStaffIdRecordGroup?agyLocId=', parentField: 'agyLocId', editable: true, width: 150,
                 descTitle: 'Last Name, First Name', codeTitle: 'Staff Id',source:'OUMPERSO'
            },
        ];
        if (this.offenderSearchService.selectedOffender) {
            this.globalOffender = this.offenderSearchService.selectedOffender;
        } else {
            this.show('common.pleasesearchforvalidoffender');
        }
    }
    onRowClickoffvisitrest(event) {
        this.offenderVisitRestrictionSelectedRow = event;
        if (event) {
            this.offRectriCommentText = event.commentText;
        }
    }
    offvistRestBlur() {
        const index = this.offvisitrestData.indexOf(this.offenderVisitRestrictionSelectedRow);
        this.visitRestrictionGrid.setColumnData('commentText', index, this.offRectriCommentText);

    }
    allowNumbers(event) {
    }
    omuvrestLaunchClick = (data) => {
        if (this.visitorPersonGrid.addedMap.size === 0 && this.visitorPersonGrid.updatedMap.size === 0 &&
            this.visitorPersonGrid.removedMap.size === 0) {
               this.dialogService.openLinkDialog('/OMUVRESTDIALOG', data, 80).subscribe(result => {
                   this.oidvireseexecuteQuery();
               });
            } else {
                if (this.visitorPersonSaveValidation(this.offauthvisitorsData, true)) {
                    this.show('oidvires.youmustsavethechangesbeforecallingaform');
                }
            }
       return false;

    }
    oiuovresLaunchClick = (data) => {
        if (this.visitorPersonGrid.addedMap.size === 0 && this.visitorPersonGrid.updatedMap.size === 0 &&
             this.visitorPersonGrid.removedMap.size === 0) {
                this.dialogService.openLinkDialog('/OIUOVRES', data, 90).subscribe(result => {
                    this.oidvireseexecuteQuery();
                });
             } else {
                 if (this.visitorPersonSaveValidation(this.offauthvisitorsData, true)) {
                     this.show('oidvires.youmustsavethechangesbeforecallingaform');
                 }
             }
        return false;
    }
    onRowClickoffauthvisitors(event) {
        this.selectedVisitor = event;
        if (event) {
            this.visitorCommentText = event.commentText;
            this.oidviresPpopulateDetails(event.personId, 'PERSON');
        }
    }
    onCameraPcclick() {
    }
    onFingerPrintclick() {
    }
    onRowClickoffauthvisitoff(event) {
        this.selectedOffenderVisit = event;
        if (event) {
            this.oidviresPpopulateDetails(event.contactRootOffenderId, 'OFFENDER');
            this.offVisitCommitText = event.commentText;
        }
    }
    ok() {
    }
    no() {
    }
    cancel() {
    }
    offenderVisitorBlur() {
        const index = this.offauthvisitorsData.indexOf(this.selectedVisitor);
        this.visitorPersonGrid.setColumnData('commentText', index, this.visitorCommentText);
    }

    setOffenderDisable = (data) => {
        if (data.contactRootOffenderId) {
            return true;
        } else {
            return false;
        }
    }

    setOffRestBanDisable = (data) => {
        if (data.contactRootOffenderId) {
            return false;
        } else {
            return true;
        }
    }
    canOffenderVisitorEdit = (data: any, index: number, field: string): boolean => {
        if (field === 'offenderIdDisplay') {
            if (!data.contactRootOffenderId) {
                return true;
              } else {
                return false;
              }
        }
        if (field === 'relationshipType') {
            if (!data.contactType) {
                  this.show('oidvires.offenderrelationshipmustbeincontextwithoffendercontacttype');
                  return false;
              } else {
                return true;
              }
        }

      }
    osinamesClick = (data) => {
        if (data.offenderIdDisplay) {
            this.show('oidvires.youmustsavethechangesbeforecallingaform');
            return false;
        } else {
            this.dialogService.openLinkDialog('/osinamesdialog', data, 80).subscribe(dlgData => {
                if (dlgData && dlgData.offenderIdDisplay && dlgData.offenderIdDisplay !== this.globalOffender.offenderIdDisplay) {
                    const validData = this.offauthvisitoffData.filter(valid => {
                        return valid['offenderIdDisplay'] === dlgData.offenderIdDisplay;
                    });
                    if (validData.length === 0) {
                            this.offenderContactGrid.setColumnData('offenderIdDisplay', this.offauthvisitoffData.indexOf(data),
                            dlgData.offenderIdDisplay);
                            this.offenderContactGrid.setColumnData('lastName', this.offauthvisitoffData.indexOf(data),
                            dlgData.lastName);
                            this.offenderContactGrid.setColumnData('firstName', this.offauthvisitoffData.indexOf(data),
                            dlgData.firstName);
                            this.offenderContactGrid.setColumnData('livingUnitDescription', this.offauthvisitoffData.indexOf(data),
                            dlgData.livingUnitDescription);
                            this.oidviresFactory.oidviresIsOffenderBanRestriction(dlgData.offenderBookId)
                            .subscribe(resData => {
                                if (resData && resData.length > 0) {
                                    this.offenderContactGrid.setColumnData('restriction', this.offauthvisitoffData.indexOf(data),
                                    resData[0]);
                                } else {
                                    this.offenderContactGrid.setColumnData('restriction', this.offauthvisitoffData.indexOf(data),
                                    null);
                                }
                            });
                    } else {
                        this.show('oidvires.contactoffenderalreadyexistsforthisoffender');
                    }
                } else if(dlgData.offenderIdDisplay === this.globalOffender.offenderIdDisplay) {
                    this.show('oidvires.sameoffendercannotbeassociatedascontactoffender');
                }
            });
        }
        return false;
    }

    getTenDigits(value: string): string {
        while (String(value).length < 10) {
          value = '0' + value;
        }
        return value;
      }
    getValueArray(arrData: any[], value: any, key: string): any[] {
        const returnValue = arrData.filter(data => {
            return data[key] === value;
        });
        return returnValue;
    }

    validateOffender = (event) => {
        const rowdata = new ValidateRowReturn();
        const index = event.rowIndex;
        if (event.field === 'offenderIdDisplay' && Number(event.newValue) !== Number(event.oldValue)) {
            if (event.newValue && this.getTenDigits(event.newValue) !== this.globalOffender.offenderIdDisplay) {
                const namesrchModel = { offenderIdDisplay: event.newValue };
                this.osinamesFactory.
                    nameSrchExecuteQuery(namesrchModel).subscribe(resData => {
                        if (resData.length > 0) {
                            const offender = resData[0];
                            const rowData = this.offauthvisitoffData;
                            rowData[index]['offenderIdDisplay'] = event.newValue;
                            if (this.getValueArray(rowData, offender.offenderIdDisplay, 'offenderIdDisplay').length === 1) {
                                this.offenderContactGrid.setColumnData('offenderIdDisplay', index, offender.offenderIdDisplay);
                                this.offenderContactGrid.setColumnData('lastName', index, offender.lastName);
                                this.offenderContactGrid.setColumnData('firstName', index, offender.firstName);
                                this.offenderContactGrid.setColumnData('livingUnitDescription', index, offender.livingUnitDescription);

                                //Verifying CHECK_NON_ASSOCIATION and calling OCUWARNG dailog screen 
                                if (offender.offenderBookId) {
                                    //Calling non_association.chk_na_between_offenders 
                                    const conflictFlag = this.oidviresFactory.chkNaBetweenOffenders(this.globalOffender.offenderBookId, offender.offenderBookId);
                                    conflictFlag.subscribe(flag => {
                                        if (flag === 'Y') {
                                            const warningMessage = 'A non-association linkage exists between '.concat(this.globalOffender.lastName).concat(',')
                                                .concat(this.globalOffender.firstName).concat(' ').concat(this.globalOffender.offenderIdDisplay).concat(' and ')
                                                .concat(offender.lastName).concat(',').concat(offender.firstName).concat(' ').concat(offender.offenderIdDisplay).concat('.');

                                            const warningPrompt = 'Before proceeding with selection offender visitor investigate possible risk'
                                                .concat(' Only proceed if you are satisfied with the risk.').concat('\n')
                                                .concat('Do you wish to proceed ?');
                                            const dataObj = {
                                                warningMsg: warningMessage, warningPrompt: warningPrompt,
                                                yesBtn: true, noBtn: true
                                            };

                                            this.dialogService.openLinkDialog('/OCUWARNG', dataObj, 50).subscribe(result => {
                                                if (!result) {
                                                    this.offenderContactGrid.setColumnData('offenderIdDisplay', index, undefined);
                                                    this.offenderContactGrid.setColumnData('lastName', index, undefined);
                                                    this.offenderContactGrid.setColumnData('firstName', index, undefined);
                                                    this.offenderContactGrid.setColumnData('livingUnitDescription', index, undefined);
                                                }
                                            });
                                        }
                                    });
                                }
                                this.oidviresFactory.oidviresIsOffenderBanRestriction(offender.offenderBookId)
                                    .subscribe(element => {
                                        if (resData && resData.length > 0) {
                                            this.offenderContactGrid.setColumnData('restriction', index,
                                                element[0]);
                                        } else {
                                            this.offenderContactGrid.setColumnData('restriction', index,
                                                null);
                                        }
                                    });
                            } else {
                                this.show('oidvires.contactoffenderalreadyexistsforthisoffender');
                                this.offenderContactGrid.setColumnData('offenderIdDisplay', index, null);
                            }
                        } else {
                            this.show('oidvires.nooffenderrecordmatchesfortheenteredvalue');
                            this.offenderContactGrid.setColumnData('offenderIdDisplay', index, undefined);
                            this.offenderContactGrid.setColumnData('lastName', index, undefined);
                            this.offenderContactGrid.setColumnData('firstName', index, undefined);
                            this.offenderContactGrid.setColumnData('livingUnitDescription', index, undefined);
                            this.offenderContactGrid.setColumnData('restriction', index,
                                undefined);
                        }
                    });
            } else {
                if (this.getTenDigits(event.newValue) === this.globalOffender.offenderIdDisplay) {
                    this.show('oidvires.sameoffendercannotbeassociatedascontactoffender');
                }
                this.offenderContactGrid.setColumnData('offenderIdDisplay', index, undefined);
                this.offenderContactGrid.setColumnData('lastName', index, undefined);
                this.offenderContactGrid.setColumnData('firstName', index, undefined);
                this.offenderContactGrid.setColumnData('livingUnitDescription', index, undefined);
                this.offenderContactGrid.setColumnData('restriction', index,
                    undefined);
            }
        }
        if (event.field === 'contactType') {
            this.offenderContactGrid.setColumnData('relationshipType', index, undefined);
        }
        rowdata.validated = true;
        return rowdata;
    }
    setPersonDisable = (data) => {
        return data.isExisted;
    }

    setRestBanDisable = (data) => {
        return !data.isExisted;
    }

    visitorLaunchClick = (data, from?) => {
        if (data.isExisted) {
            // this.show('common.fieldisprotectedagainstupdated');
            return false;
        }
        const person = data.personId ? { 'pPersonId': Math.floor(Number(data.personId)), 'pSearchType': 'I' } : { 'pSearchType': 'N' };
        const dialogData = { 'person': person, forwardToDialog: true };
        this.dialogService.openLinkDialog('/osipserdialog', dialogData, 80).subscribe(result => {
            if (result) {
            this.visitorPersonGrid.setColumnData('personId', this.offauthvisitorsData.indexOf(data), result.personId);
            } else {
                if (person['pPersonId']) {
                this.osipsearFactory.personsExecuteQuery(person).subscribe(resData => {
                    if (resData.length === 0 ) {
                        this.show('oidvires.personinformationnotavailablefortheenterdvalue');
                        this.visitorPersonGrid.setColumnData('personId', this.offauthvisitorsData.indexOf(data), null);
                        this.visitorPersonGrid.setColumnData('lastName', this.offauthvisitorsData.indexOf(data), null);
                        this.visitorPersonGrid.setColumnData('firstName', this.offauthvisitorsData.indexOf(data), null);
                        this.visitorPersonGrid.setColumnData('age', this.offauthvisitorsData.indexOf(data), null);
                    }
                });
            }
        }
        });
        return false;
    }

    validateVisitor = (event) => {
        const rowdata = new ValidateRowReturn();
        const rowIndex = event.rowIndex;
        if (event.field === 'personId') {
            const index = this.findIndex(this.offauthvisitorsData, 'personId', Number(event.newValue));
            if (index !== rowIndex && index !== -1) {
                this.show('oidvires.visitoralreadyexistsforthisoffender');
                this.visitorPersonGrid.setColumnData('personId', rowIndex, null);
            } else {
                if (Number(event.newValue)) {
                this.osipsearexecuteQuery(Number(event.newValue), rowIndex, event.data);
                }
            }
        }
        if (event.field === 'contactType') {
            this.visitorPersonGrid.setColumnData('relationshipType', rowIndex, undefined);
            rowdata.validated = true;
            return rowdata;
        }
        
        rowdata.validated = true;
        return rowdata;
    }
    onVisitorAdd = () => {
        if (this.globalOffender.offenderBookId) {
            if (this.offauthvisitorsData.length === 0 || this.visitorPersonSaveValidation(this.offauthvisitorsData)) {
                const data = {
                    'btnPersonSearch': '...', 'butNbtRestriction': 'View', 'butGlobalRestriction': 'View',
                    approvedVisitorFlag: 'Y'
                };
                return data;
            } else {
                return false;
            }
        } else {
            this.show('osiperso.youcannotcreaterecordswithoutaparentrecord');
            return false;
        }
    }

    onVisitorDelete = (data) => {
        if (data[0].sealFlag === 'Y') {
            this.show('common.cannotdeletemaster');
            return false;
        } else {
            return true;
        }
    }
    onOffenderChange(offender) {
        if (offender && offender.statusDisplay !== 'Historic') {
            this.globalOffender = offender;
            this.offvisitrestExecuteQuery();
            this.oidvireseexecuteQuery();
            this.offVisitingExecuteQuery();
        } else {
            this.globalOffender = new VHeaderBlock();
            this.offvisitrestData = [];
            this.offauthvisitorsData = [];
            this.offauthvisitoffData = [];
            this.offRectriCommentText = undefined;
            this.visitorCommentText = undefined;
            this.offVisitCommitText = undefined;
            this.personImage = null;
            this.offenderImage = null;
            this.cameraButton = true;
        }
    }
    offvisitrestExecuteQuery() {
        this.offVstRestSelected = -1;
        const data = { offenderBookId: this.globalOffender.offenderBookId };
        const offvisitrestResult = this.oidviresFactory.
            offVisitRestExecuteQuery(data);
        offvisitrestResult.subscribe(offvisitrestResultList => {
            if (offvisitrestResultList.length === 0) {
                this.offvisitrestData = [];
                this.offRectriCommentText = undefined;
            } else {
                offvisitrestResultList.forEach(element => {
                    element['offenderBookId'] = this.globalOffender.offenderBookId;
                    element['agyLocId'] = this.globalOffender.agyLocId;
                    // element['authorisedStaffId'] = String(element.authorisedStaffId);
                   // element['enteredStaffId'] = String(element.enteredStaffId);
                });
                this.offvisitrestData = offvisitrestResultList;
                this.offVstRestSelected = 0;
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
    offenderVisitRestrictionInsert = () => {
        if (this.globalOffender.offenderBookId) {
            if (this.offvisitrestData.length === 0 || this.offenderVisitorRestrictionsSaveValidation(this.offvisitrestData)) {
                const data = {
                    'effectiveDate': DateFormat.getDate(), 'offenderBookId': this.globalOffender.offenderBookId,
                    'agyLocId': this.globalOffender.agyLocId, 'enteredStaffId': ''
                };
                return data;
            } else {
                return false;
            }
        } else {
            this.show('oidvires.youcannotcreaterecordswithoutaparentrecord');
            return false;
        }
    }

    onOcuprestClick = (data) => {
        const index = this.offauthvisitoffData.indexOf(data);
        if (this.visitorOffenderSaveValidation && this.visitorOffenderSaveValidation(this.offauthvisitoffData, true)) {
            if (this.offenderContactGrid.addedMap.size === 0 && this.offenderContactGrid.updatedMap.size === 0
                 && this.offenderContactGrid.removedMap.size === 0) {
            this.dialogService.openLinkDialog('/OCUPREST', data, 80).subscribe(dlgData => {
                this.offVisitingExecuteQuery();
            });
        } else {
            this.show('oidvires.youmustsavethechangesbeforecallingaform');
        }

        }
        return false;
    }

    /**
     *  This function will be executed when commit event is
    * fired
    */
    oidviresSaveoffvisitrestForm(event) {


        if (!this.offenderVisitorRestrictionsSaveValidation(event.added)) {
            return;
        }
        if (!this.offenderVisitorRestrictionsSaveValidation(event.updated)) {
            return;
        }
        this.offvisitrestInsertList = event.added;
        this.offvisitrestUpdatetList = event.updated;
        this.offvisitrestDeleteList = event.removed;
        if (this.offvisitrestData.length > 0) {
            for (let i = 0; i < this.offvisitrestData.length; i++) {
                let dupList = this.offvisitrestData.filter(x => x.restrictionType === this.offvisitrestData[i].restrictionType && x.expiryDate == undefined && this.offvisitrestData[i].expiryDate == undefined);
                if (dupList.length > 1) {
                    this.show('oiuovres.arestrictionofthistypealreadyexistsfortheoffender', 'warn');
                    return;
                }
            }
        }
        this.offvisitrestInsertList.forEach(result => {
            result.enteredStaffId = Number(1);
            result.authorisedStaffId = Number(result.authorisedStaffId);
            result.offenderBookId = this.globalOffender.offenderBookId;

        });

        this.offvisitrestUpdatetList.forEach(result => {
            result.authorisedStaffId = Number(result.authorisedStaffId);
            result.enteredStaffId = Number(result.enteredStaffId);
        });

        this.offvisitrestCommitModel.insertList = [];
        this.offvisitrestCommitModel.updateList = [];
        this.offvisitrestCommitModel.deleteList = [];
        if (this.offvisitrestInsertList.length > 0) {
            this.offvisitrestCommitModel.insertList = this.offvisitrestInsertList;
        }
        if (this.offvisitrestUpdatetList.length > 0) {
            this.offvisitrestCommitModel.updateList = this.offvisitrestUpdatetList;
        }


        const offvisitrestSaveData = this.oidviresFactory.offVisitRestCommit(this.offvisitrestCommitModel);
        offvisitrestSaveData.subscribe(data => {
            if (data === 1) {
                this.show('common.addupdateremoverecordsuccess', 'success');
            } else {
                this.show('common.addupdateremoverecordfailed');
            }
            this.offvisitrestExecuteQuery();
        });
    }

    /**
     *  This function will be executed when commit event is
    * fired
    */
    oidviresSaveoffauthvisitorsForm(event) {

        if (!this.visitorPersonSaveValidation(event.added)) {
            return;
        }
        if (!this.visitorPersonSaveValidation(event.updated)) {
            return;
        }

        this.offauthvisitorsInsertList = event.added;
        this.offauthvisitorsUpdatetList = event.updated;
        this.offauthvisitorsDeleteList = event.removed;

        this.offauthvisitorsInsertList.forEach(element => {
            element.offenderBookId = this.globalOffender.offenderBookId;
            element.approvedVisitorFlag = element.approvedVisitorFlag ? 'Y' : 'N';
        });
        this.offauthvisitorsUpdatetList.forEach(element => {
            element.offenderBookId = this.globalOffender.offenderBookId;
            element.approvedVisitorFlag = element.approvedVisitorFlag ? 'Y' : 'N';
        });

        this.offauthvisitorsCommitModel.insertList = [];
        this.offauthvisitorsCommitModel.updateList = [];
        this.offauthvisitorsCommitModel.deleteList = [];

        if (this.offauthvisitorsInsertList.length > 0) {
            this.offauthvisitorsCommitModel.insertList = this.offauthvisitorsInsertList;
        }
        if (this.offauthvisitorsUpdatetList.length > 0) {
            this.offauthvisitorsCommitModel.updateList = this.offauthvisitorsUpdatetList;
        }
        if (this.offauthvisitorsDeleteList.length > 0) {
            this.offauthvisitorsCommitModel.deleteList = this.offauthvisitorsDeleteList;
        }
        const offauthvisitorsSaveData = this.oidviresFactory.offAuthVisitorsCommit(this.offauthvisitorsCommitModel);
        offauthvisitorsSaveData.subscribe(data => {
            if (data === 1) {
                this.show('common.addupdateremoverecordsuccess', 'success');
            } else {
                this.show('common.addupdateremoverecordfailed');
            }
            this.oidvireseexecuteQuery();
        });
    }

    visitorPersonSaveValidation(arrData, btn?) {

        const validate = { valid: true };
        arrData.forEach(data => {
            // if (!data.personId && !data.contactType && !data.relationshipType && !btn) {
            //     this.show('oidvires.youcannotqueryrecordswithoutasavedparentrecord');
            //     validate.valid = false;
            //     return false;
            // }
            if (!data.personId) {
                this.show('oidvires.visitoridmustbeentered');
                validate.valid = false;
                return false;
            }
            if (!data.contactType) {
                this.show('oidvires.contacttypemustbeentered');
                validate.valid = false;
                return false;
            }
            if (!data.relationshipType) {
                this.show('oidvires.relationshipmustbeentered');
                validate.valid = false;
                return false;
            }
        });
        return validate.valid;
    }
    // execute query
    oidvireseexecuteQuery() {
        this.visitorSelected = -1;
        const reqData = { offenderBookId: this.globalOffender.offenderBookId };
        const serviceObj = this.oidviresFactory.
            offAuthVisitorsExecuteQuery(reqData);
        serviceObj.subscribe(data => {
            if (data.length === 0) {
                this.offauthvisitorsData = [];
                this.visitorCommentText = undefined;
            } else {
                data.forEach(element => {
                    element.age = element.age ? element.age : element.birthDate ? '0' : '';
                    element.approvedVisitorFlag = element.approvedVisitorFlag === 'Y' ? 'Y' : undefined;
                    element['btnPersonSearch'] = '...';
                    element['butNbtRestriction'] = 'View';
                    element['butGlobalRestriction'] = 'View';
                    element['isExisted'] = true;

                });
                this.offauthvisitorsData = data;
                this.visitorSelected = 0;
                this.cameraButton = false;
            }
        });
    }
    // execute query
    offVisitingExecuteQuery() {
        this.offenderSelected = -1;
        const reqData = { offenderBookId: this.globalOffender.offenderBookId };
        const serviceObj = this.oidviresFactory.
            offVisitingExecuteQuery(reqData);
        serviceObj.subscribe(data => {
            if (data.length === 0) {
                this.offauthvisitoffData = [];
                this.offVisitCommitText = undefined;
            } else {
                data.forEach(element => {

                    element.approvedVisitorFlag = element.approvedVisitorFlag === 'Y' ? 'Y' : undefined;
                    element['butOffenderIdDisplay'] = '...';
                    element['btnrestriction'] = 'View';

                });
                this.offauthvisitoffData = data;
                this.offenderSelected = 0;
            }
        });
    }


    offenderVisitorRestrictionsSaveValidation(arrData) {
        const validate = { valid: true };
        arrData.forEach(data => {
            if (!data.effectiveDate) {
                this.show('oidvires.restrictiondatemustbeentered');
                validate.valid = false;
                return false;
            }
            if (data.expiryDate && DateFormat.compareDate(DateFormat.getDate(data.expiryDate),
                DateFormat.getDate(data.effectiveDate)) < 0) {
                this.show('oidvires.expirydateshouldbegreaterthanorequaltorestrictiondate');
                validate.valid = false;
                return false;
            }
            if (!data.restrictionType) {
                this.show('oidvires.typemustbeentered');
                validate.valid = false;
                return false;
            }
            if (!data.authorisedStaffId) {
                this.show('oidvires.authorizedbymustbeentered');
                validate.valid = false;
                return false;
            }
        });
        return validate.valid;
    }

    visitRistrictionValidate = (event) => {
        const validRow = new ValidateRowReturn();
        const index = event.rowIndex;
        if (event.field === 'restrictionType' && event.newValue) {
            if (!event.data.enteredStaffId) {
                this.oidviresFindTagVisitsGetStaffId(index);
            }
        }
        validRow.validated = true;
        return validRow;
    }

    // Not yet Implemented
    /**
     *  This function will be executed when commit event is
    * fired
    */
    oidviresSaveimagevisitForm(event) {
        // TODO declare commit bean and add insert list to that object.
        // this.imagevisitinsertList = event.added
        // this.imagevisitupdateList = event.updated
        // this.imagevisitdeleteList = event.removed
        // this.imagevisitCommitModel.insertList = [];
        // this.imagevisitCommitModel.updateList = [];
        // this.imagevisitCommitModel.deleteList = [];
        // if ( this.imagevisitInsertList.length > 0 || this.imagevisitalertUpdateList.length > 0 ) {
        //      for ( let i = 0; i < this.imagevisitInsertList.length; i++ ) {
        //     }
        //      for ( let i = 0; i < this.imagevisitUpdateList.length; i++ ) {
        //      }
        // this.imagevisitCommitModel.insertList =this.imagevisitInsertList;
        // this.imagevisitCommitModel.updateList =this.imagevisitUpdateList;
        // }
        // if ( this.imagevisitDeleteList.length > 0 ) {
        //      for ( let i = 0; i < this.imagevisitDeleteList.length; i++ ) {
        //      }
        // this.imagevisitCommitModel.deleteList =this.imagevisitDeleteList;
        // }
        // const imagevisitSaveData = this.oidviresFactory.imagevisitCommit( this.imagevisitCommitModel );
        // imagevisitSaveData.subscribe( data => {
        //  if ( data === 1 ) {
        //     this.type = 'info';
        //     this.message = 'Add/ Update/ Remove record sucess';
        //     this.show();
        // }else{
        //     this.type = 'warn';
        //     this.message = 'Add/ Update/ Remove record Failed';
        //     this.show();
        // }
        //     });
    }
    /**
    * This function loads the data into the Master Record and its child records
    */
    oidviresPpopulateDetails(imageObjectId: number, type: string) {
        if (imageObjectId) {
        const serviceObj = this.oidviresFactory.
            imagesOffExecuteQuery(imageObjectId, type);
        serviceObj.subscribe(data => {
            if (data.length === 0 || data[0].errorMessage) {
                if (type === 'PERSON') {
                    this.personImage = null;
                } else {
                    this.offenderImage = null;
                }
            } else {
                if (type === 'PERSON') {
                    this.personImage = 'data:image/JPEG;base64,' + data[0].imageThumbnail;
                } else {
                    this.offenderImage = 'data:image/JPEG;base64,' + data[0].imageThumbnail;
                }
            }
        });
    }
    }

    /**
     *  This function will be executed when commit event is
    * fired
    */
    oidviresSaveoffauthvisitoffForm(event) {

        if (!this.visitorOffenderSaveValidation(event.added)) {
            return;
        }
        if (!this.visitorOffenderSaveValidation(event.updated)) {
            return;
        }
        this.offauthvisitoffInsertList = event.added;
        this.offauthvisitoffUpdatetList = event.updated;
        this.offauthvisitoffDeleteList = event.removed;

        this.offauthvisitoffInsertList.forEach(element => {
            element.approvedVisitorFlag = element.approvedVisitorFlag ? 'Y' : 'N';
            element.offenderBookId = this.globalOffender.offenderBookId;
        });

        this.offauthvisitoffUpdatetList.forEach(element => {
            element.approvedVisitorFlag = element.approvedVisitorFlag ? 'Y' : 'N';
        });

        this.offauthvisitoffCommitModel.insertList = [];
        this.offauthvisitoffCommitModel.updateList = [];
        this.offauthvisitoffCommitModel.deleteList = [];

        if (this.offauthvisitoffInsertList.length > 0) {
            this.offauthvisitoffCommitModel.insertList = this.offauthvisitoffInsertList;
        }
        if (this.offauthvisitoffUpdatetList.length > 0) {
            this.offauthvisitoffCommitModel.updateList = this.offauthvisitoffUpdatetList;
        }
        if (this.offauthvisitoffDeleteList.length > 0) {
            this.offauthvisitoffCommitModel.deleteList = this.offauthvisitoffDeleteList;
        }
        const offauthvisitoffSaveData = this.oidviresFactory.offAuthVisitOffCommit(this.offauthvisitoffCommitModel);
        offauthvisitoffSaveData.subscribe(data => {
            if (data === 1) {
                this.show('common.addupdateremoverecordsuccess', 'success');
            } else {
                this.show('common.addupdateremoverecordfailed');
            }
            this.offVisitingExecuteQuery();
        });
    }

    visitorOffenderSaveValidation(arrData, onInsert?) {
        const validate = { valid: true };
        arrData.forEach(data => {

            if (!data.offenderIdDisplay) {
                this.show('oidvires.pidmustbeenter');
                validate.valid = false;
                return false;
            }
            if (this.getValueArray(this.offauthvisitoffData, data.offenderIdDisplay, 'offenderIdDisplay').length !== 1) {
                this.show('oidvires.contactoffenderalreadyexistsforthisoffender');
                validate.valid = false;
                return false;
            }
            if (data.offenderIdDisplay && !data.lastName) {
                this.show('oidvires.nooffenderrecordmatchesfortheenteredvalue');
                validate.valid = false;
                return false;
            }
            if (!data.contactType) {
                this.show('oidvires.contacttypemustbeentered');
                validate.valid = false;
                return false;
            }
            if (!data.relationshipType) {
                this.show('oidvires.relationshipmustbeentered');
                validate.valid = false;
                return false;
            }

        });
        return validate.valid;
    }

    onVisitorOffenderInsert = () => {
        if (this.globalOffender.offenderBookId) {
            if (this.offauthvisitoffData.length === 0 || this.visitorOffenderSaveValidation(this.offauthvisitoffData, true)) {
                  const data = { 'butOffenderIdDisplay': '...', 'lastName': '', 'firstName': '', 'livingUnitDescription': '',
                                 'btnrestriction': 'View', 'approvedVisitorFlag': 'Y' };
                return data;
            } else {
                return false;
            }
        } else {
            this.show('oidvires.youcannotcreaterecordswithoutaparentrecord');
            return false;
        }
    }
    onVisitorOffenderDelete = (data) => {
        if (this.offenderImage) {
            this.show('common.cannotdeletemaster');
            return false;
        } else {
            return true;
        }
    }


    oidviresFindTagVisitsGetStaffId(index) {
        this.currentUserId = 0;
        this.oidviresFactory.oidviresFindTagVisitsGetStaffId().subscribe(id => {
            this.currentUserId = id;
            this.visitRestrictionGrid.setColumnData('enteredStaffId', index, this.currentUserId);
        });

    }

    offenderVistBlur() {
        const index = this.offauthvisitoffData.indexOf(this.selectedOffenderVisit);
        this.offenderContactGrid.setColumnData('commentText', index, this.offVisitCommitText);
    }

    // Not yet Implemented
    /**
     *  This function will be executed when commit event is
    * fired
    */
    oidviresSaveimagesoffForm(event) {
        // TODO declare commit bean and add insert list to that object.
        // this.imagesoffinsertList = event.added
        // this.imagesoffupdateList = event.updated
        // this.imagesoffdeleteList = event.removed
        // this.imagesoffCommitModel.insertList = [];
        // this.imagesoffCommitModel.updateList = [];
        // this.imagesoffCommitModel.deleteList = [];
        // if ( this.imagesoffInsertList.length > 0 || this.imagesoffalertUpdateList.length > 0 ) {
        //      for ( let i = 0; i < this.imagesoffInsertList.length; i++ ) {
        //     }
        //      for ( let i = 0; i < this.imagesoffUpdateList.length; i++ ) {
        //      }
        // this.imagesoffCommitModel.insertList =this.imagesoffInsertList;
        // this.imagesoffCommitModel.updateList =this.imagesoffUpdateList;
        // }
        // if ( this.imagesoffDeleteList.length > 0 ) {
        //      for ( let i = 0; i < this.imagesoffDeleteList.length; i++ ) {
        //      }
        // this.imagesoffCommitModel.deleteList =this.imagesoffDeleteList;
        // }
        // const imagesoffSaveData = this.oidviresFactory.imagesoffCommit( this.imagesoffCommitModel );
        // imagesoffSaveData.subscribe( data => {
        //  if ( data === 1 ) {
        //     this.type = 'info';
        //     this.message = 'Add/ Update/ Remove record sucess';
        //     this.show();
        // }else{
        //     this.type = 'warn';
        //     this.message = 'Add/ Update/ Remove record Failed';
        //     this.show();
        // }
        //     });
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

    osipsearexecuteQuery(personId, index, data) {
        const searchparamModel = { 'pSearchType': 'I', 'pPersonId': Math.floor(personId) };
        this.osipsearFactory.personsExecuteQuery(searchparamModel)
            .subscribe(resdata => {
                if (resdata && resdata.length === 0 || resdata[0].errorMessage) {
                    this.visitorLaunchClick(data);
                } else {
                    this.visitorPersonGrid.setColumnData('personId', index, resdata[0].personId);
                    this.visitorPersonGrid.setColumnData('lastName', index, resdata[0].lastName);
                    this.visitorPersonGrid.setColumnData('firstName', index, resdata[0].firstName);
                    this.visitorPersonGrid.setColumnData('age', index, resdata[0].age);
                    this.oidviresFactory.oidviresIsPersonBanRestriction(resdata[0].personId).subscribe(resData => {
                        if (resData && resData.length > 0) {
                        this.visitorPersonGrid.setColumnData('restriction', index, resData[0].description);
                        this.visitorPersonGrid.setColumnData('visitBan', index, resData[0].code);
                        } else {
                            this.visitorPersonGrid.setColumnData('restriction', index, null);
                            this.visitorPersonGrid.setColumnData('visitBan', index, null);
                        }
                    });
                }
            });
    }

    isReadOnly(event) {
        if (event && event.length > 0) {
            return false;
        }
        return true;
    }


    canEdit = (data: any, index: number, field: string): boolean => {
        if (data.isExisted && field === 'personId') {
            // this.show('common.fieldisprotectedagainstupdated');
            return false;
        }
        if (field === 'relationshipType' && !data.contactType) {
            this.show('oidvires.visitorrelationshipmustbeincontextwithvisitorscontacttype');
            return false;
        }
        return true;
    }

    clickCamera() {
        this.cameraButton = true;
        if (this.selectedVisitor .personId) {
          const captureImageData = this.osiosearchService.captureImageProcedure();
          captureImageData.subscribe(captureImage => {
              if (captureImage === 'OIUIMAGE') {
                  this.oidviresFactory.imagesDataTemp.imageObjectId = this.selectedVisitor .personId;
                  this.oidviresFactory.imagesDataTemp.imageObjectType = 'PERSON';
                  this.oidviresFactory.imagesDataTemp.imageViewType = 'FACE';
                  this.oidviresFactory.imagesDataTemp.personId = this.selectedVisitor.personId;
                  this.oidviresFactory.imagesDataTemp.lastName = this.selectedVisitor.lastName;
                  this.oidviresFactory.imagesDataTemp.firstName = this.selectedVisitor.firstName;
                  this.oidviresFactory.imagesDataTemp.birthDate = this.selectedVisitor.birthDate;
                  this.dialogService.openLinkDialog('/oiuimagedialog', this.oidviresFactory.imagesDataTemp, 80).subscribe(result => {
                    this.oidvireseexecuteQuery();
                    this.cameraButton = false;
                  });
              }  else {
                  return;
                  }
              });
              }

       }
    offVisitResClea = () => {
        this.offvisitrestExecuteQuery();
        return true;
    }   

    onGridClear = () => {
        this.oidvireseexecuteQuery();
        return true;
    }
}
