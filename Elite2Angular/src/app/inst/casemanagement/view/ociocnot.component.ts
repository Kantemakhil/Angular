import {
    Component, OnInit, ViewChild
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OciocnotService } from '@inst/casemanagement/service/ociocnot.service';
import { VOffenderCaseNotes } from '@instCaseManagementbeans/VOffenderCaseNotes';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { StaffMembers } from '@instincidentsbeans/StaffMembers';
import { DateFormat } from '@ui-components/datepicker/dateFormat';
import { DialogService } from '@core/ui-components/dialog/dialog.service';
@Component({
    selector: 'app-ociocnot',
    templateUrl: './ociocnot.component.html'
})

export class OciocnotComponent implements OnInit {
    existsPrev = 0;
    @ViewChild('ociocnot', {static: true}) form: any;
    msgs: any[] = [];
    casenoteData: VOffenderCaseNotes[] = [];
    casenoteDataTemp: VOffenderCaseNotes[] = [];
    casenoteModel: VOffenderCaseNotes = new VOffenderCaseNotes();
    casenoteModelTemp: VOffenderCaseNotes = new VOffenderCaseNotes();
    staffMembersModel: StaffMembers = new StaffMembers();
    casenoteIndex = -1;
    casenoteInsertList: VOffenderCaseNotes[] = [];
    casenoteUpdatetList: VOffenderCaseNotes[] = [];
    casenoteDeleteList: VOffenderCaseNotes[] = [];
    rgtypeRg: any[] = [];
    rgsubtypeRg: any[] = [];
    rgstaffnameRg: any[] = [];
    rglocationRg: any[] = [];
    message = ' Invalid.';
    type = 'error';
    msglist = [];
    ocuoinotColumnDef: any[] = [];
    facilityLink: any;
    staffId: number;
    facility: any;
    lastName: any;
    firstName: any;
    birthDate: any;
    terminationDate: any;
    fromDateFlag: boolean;
    toDateFlag: boolean;
    lastNameTemp: any;
    caseNoteCommonFlag: boolean;
    checkBoxesDisable: boolean;
    //clearBtnDisable: boolean;
    checkFromDateFlag: boolean;
    checkToDateFlag: boolean;
    checkToDateFlag2: boolean;
    commonFlag:Boolean;
    constructor(private ociocnotFactory: OciocnotService, private sessionManager: UserSessionManager,
        public translateService: TranslateService, public dialogService: DialogService) {
    }
    ngOnInit() {
        this.commonFlag = false;
        this.checkFromDateFlag = false;
        this.checkToDateFlag = false;
        this.checkToDateFlag2 = false;
        this.fromDateFlag = false;
        this.toDateFlag = false;
        this.caseNoteCommonFlag = true;
        this.checkBoxesDisable = true;
        this.terminationDate = DateFormat.getDate();
        const date = DateFormat.getDate();
        this.birthDate = DateFormat.getDate(date.setDate(date.getDate() - 3));

        const staffIdService = this.ociocnotFactory.toGetStaffId();
        staffIdService.subscribe(idValue => {
            this.staffId = idValue;
            this.staffMembersModel = new StaffMembers();
            const serviceFirstLastName = this.ociocnotFactory.toGetFirstAndLastName(this.staffId);
            serviceFirstLastName.subscribe(nameValues => {
                this.firstName = nameValues.firstName;
                this.lastNameTemp = nameValues.lastName;
                this.lastName = nameValues.lastName;
            });
        });
        const chkExists = this.ociocnotFactory.checkPrevExists();
        chkExists.subscribe(checkexists => {
           this.existsPrev = checkexists;
            });
        this.facilityLink = 'ociocnot/rgLocationRecordGroup?caseLoadId=' + this.sessionManager.currentCaseLoad;
        this.ocuoinotColumnDef = [
            {
                fieldName: this.translateService.translate('common.date'), field: 'contactDate',
                datatype: 'date', editable: false, width: 150
            },
            {
                fieldName: this.translateService.translate('common.time'), field: 'contactTime',
                datatype: 'time', editable: false, width: 150
            },
            {
                fieldName: this.translateService.translate('system-profile.off-id-code'),
                field: 'offenderIdDisplay', editable: false, width: 150
            },
            { fieldName: this.translateService.translate('system-profile.name-last'), field: 'lastName', editable: false, width: 150 },
            { fieldName: this.translateService.translate('system-profile.name-given-1'), field: 'firstName', editable: false, width: 150 },
            { fieldName: this.translateService.translate('common.notetype'), field: 'contactType', editable: false, width: 150 },
            {
                fieldName: this.translateService.translate('common.notesubtype'), field: 'contactSubType',
                datatype: 'text', editable: false, width: 150
            },
            {
                fieldName: this.translateService.translate('common.staffname'), field: 'staffName',
                datatype: 'text', editable: false, width: 150
            },
            {
                fieldName: this.translateService.translate('common.amended'), field: 'amendmentFlag',
                datatype: 'checkbox', editable: false, width: 100
            },
            // {
            //     fieldName: 'IWP', field: 'button', datatype: 'launchbutton', editable: false,
            //     width: 100, data: 'row', updateField: 'row', modal: true, onLaunchClick: this.iwpLaunchClick
            // },
        ];

        this.form.valueChanges.subscribe(data => {
            const keys = Object.keys(data);
            const validator = { validate: true, count: 0 };
            do {
                if (data[keys[validator.count]]) {
                    validator.validate = false;
                   // this.clearBtnDisable = false;
                } else {
                    validator.count++;
                    //this.clearBtnDisable = false;
                }

                } while (validator.validate && validator.count < keys.length);
        });
    }

    /*
  * This method is used to show popup messages.
  */
    show() {
        this.msglist = [];
        this.msglist.push({ message: this.message, type: this.type });
        this.msgs = [...this.msglist];
    }
    /**
     *  This function will be executed when we click on D button in grid
     *
     */
    iwpLaunchClick = (event) => {
            this.type = 'info';
            this.message = 'Screen not yet implemented';
            this.show();
            return false;
    }
    /**
     * event is fired when click on clear button.
     */
    clear() {
        this.facility = undefined;
        // this.firstName = undefined;
        // this.lastName = undefined;
        this.birthDate = undefined;
        this.terminationDate = undefined;
        this.checkFromDateFlag = false;
        this.checkToDateFlag = false;
        this.checkToDateFlag = false;
        this.casenoteData = [];
       // this.clearBtnDisable=true;
        this.casenoteModel = new VOffenderCaseNotes();
        this.commonFlag = false;
    }

    clearDisableFun() {
        if (this.facility ||
            this.birthDate ||
            this.terminationDate) {
            return false;
        }
        return true;
    }
    onFacilityBlur(){
        if(!this.facility){
            this.facility =this.facility===''?undefined:'';
        }
    }
    /**
     * event is fired when click on retrieve button.
     */
    casenoteExecuteQuery() {
        if (!this.staffId) {
            this.type = 'warn';
            this.message = this.translateService.translate('ociocnot.pleaseenterthelastnamebeforeinitiatingaquery');
            this.show();
            return;
        }
        if (!this.birthDate) {
            this.type = 'warn';
            this.message = this.translateService.translate('common.formdatevalidation');
            this.show();
            return;
        }
        if (!this.terminationDate) {
            this.type = 'warn';
            this.message = this.translateService.translate('oiiosced.todatevalidation');
            this.show();
            return;
        }
        if (!this.checkFromDateFlag && !this.checkToDateFlag2) {
            if ((DateFormat.compareDate(this.birthDate, this.terminationDate)) === 1) {
                this.type = 'warn';
                this.message = this.translateService.translate('ociocnot.startingdatecannotbelaterthanendingdaterange');
                this.show();
                return;
            }
        } else {
            this.checkFromDateFlag = false;
            this.checkToDateFlag2 = false;
            return;
        }
        if (!this.checkToDateFlag) {
            if ((DateFormat.compareDate(this.terminationDate, DateFormat.getDate())) === 1) {
                this.type = 'warn';
                this.message = this.translateService.translate('ociocnot.endingdaterangecannotbegreaterthansysdate');
                this.show();
                return;
            }
        } else {
            this.checkToDateFlag = false;
            return;
        }
        this.casenoteModelTemp = new VOffenderCaseNotes();
        this.casenoteModelTemp.staffId = this.staffId;
        this.casenoteModelTemp.contactDate = this.birthDate;
        this.casenoteModelTemp.dateCreation = this.terminationDate;
        const executeService = this.ociocnotFactory.caseNoteExecuteQuery(this.casenoteModelTemp);
        executeService.subscribe(list => {
            if (list.length === 0) {
                this.commonFlag = false;
                this.casenoteData = [];
                this.casenoteModel = new VOffenderCaseNotes();
                this.type = 'warn';
                this.message = this.translateService.translate('common.querycausednorecords');
                this.show();
                return;
            } else {
                for (let i = 0; i < list.length; i++) {
                    if (list[i].checkBox1 === 'Y') {
                        list[i].checkBox1 = true;
                    } else {
                        list[i].checkBox1 = false;
                    }
                    if (list[i].checkBox2 === 'Y') {
                        list[i].checkBox2 = true;
                    } else {
                        list[i].checkBox2 = false;
                    }
                    if (list[i].checkBox3 === 'Y') {
                        list[i].checkBox3 = true;
                    } else {
                        list[i].checkBox3 = false;
                    }
                    if (list[i].checkBox4 === 'Y') {
                        list[i].checkBox4 = true;
                    } else {
                        list[i].checkBox4 = false;
                    }
                    if (list[i].checkBox5 === 'Y') {
                        list[i].checkBox5 = true;
                    } else {
                        list[i].checkBox5 = false;
                    }
                    if (list[i].amendmentFlag === 'Y') {
                        list[i].amendmentFlag = true;
                    } else {
                        list[i].amendmentFlag = false;
                    }
                    list[i].timeCreation = DateFormat.getDate(list[i].timeCreation);
                    list[i].button = 'D';
                }
                this.commonFlag = true;
                this.casenoteData = list;
                this.casenoteModel = this.casenoteData[0];
                this.casenoteIndex = 0;
            }
        });
    }
    /**
     *  /**
     * event is fired when click on From and To date fields.
     * it calls this.birthDateBlur();
     */
    clickOnToDate() {
        if (!this.lastName) {
            this.firstName = undefined;
        }
    }
    /**
     * event is fired when click on From and To date fields.
     * it calls this.terminationDateBlur();
     */
    clickOnFromDate() {
        if (!this.lastName) {
            this.firstName = undefined;
        }
    }
    /**
     * event is used to check date validations
     */
    checkDateValidations() {
        if (!this.lastName) {
            this.firstName = undefined;
            this.staffId = undefined;
        }
        if ((DateFormat.compareDate(this.birthDate, this.terminationDate)) === 1 && !this.checkFromDateFlag && !this.checkToDateFlag2) {
            this.type = 'warn';
            this.message = this.translateService.translate('ociocnot.startingdatecannotbelaterthanendingdaterange');
            this.show();
            return;
        } else if (this.checkFromDateFlag || this.checkToDateFlag2) {
            this.checkFromDateFlag = false;
            this.checkToDateFlag2 = false;
        } else if ((DateFormat.compareDate(this.terminationDate, DateFormat.getDate())) === 1 && !this.checkToDateFlag) {
            this.type = 'warn';
            this.message = this.translateService.translate('ociocnot.endingdaterangecannotbegreaterthansysdate');
            this.show();
            return;
        } else if (this.checkToDateFlag) {
            this.checkToDateFlag = false;
        }
    }
    checklastnameValidations() {
        if (!this.lastName) {
            this.firstName = undefined;
            this.staffId = undefined;
        }
        if ((DateFormat.compareDate(this.birthDate, this.terminationDate)) === 1 && !this.checkFromDateFlag && !this.checkToDateFlag2) {
            this.type = 'warn';
            this.message = this.translateService.translate('ociocnot.startingdatecannotbelaterthanendingdaterange');
            this.show();
            return;
        } else if (this.checkFromDateFlag || this.checkToDateFlag2) {
            this.checkFromDateFlag = false;
            this.checkToDateFlag2 = false;
        } else if ((DateFormat.compareDate(this.terminationDate, DateFormat.getDate())) === 1 && !this.checkToDateFlag) {
            this.type = 'warn';
            this.message = this.translateService.translate('ociocnot.endingdaterangecannotbegreaterthansysdate');
            this.show();
            return;
        } else if (this.checkToDateFlag) {
            this.checkToDateFlag = false;
        } else if (this.existsPrev === 0) {
            this.checkFromDateFlag = false;
            this.checkToDateFlag = false;
            this.type = 'warn';
            this.message = this.translateService.translate('ociocnot.youcannotchangethestaffmember');
            this.show();
            return;
        }
    }
      /**
     * event is fired when click on row in the grid of Case Notes block
     * @param event
     */
    rowClickInCaseNotes(event) {
        if (event) {
            this.casenoteModel = new VOffenderCaseNotes();
            this.casenoteModel = event;
        }

    }
    /**
     * event fires when focus goes from From Date
     */
    birthDateBlur() {
        if (!this.birthDate) {
            this.birthDate = this.birthDate === null ? undefined : null;
        }
        if ((DateFormat.compareDate(this.birthDate, this.terminationDate)) === 1 && !this.checkToDateFlag2) {
            this.checkFromDateFlag = true;
            this.type = 'warn';
            this.message = this.translateService.translate('ociocnot.startingdatecannotbelaterthanendingdaterange');
            this.show();
            this.toDateFlag = false;
            this.fromDateFlag = false;
            return;
        } else {
            this.toDateFlag = false;
            this.fromDateFlag = false;
            this.checkFromDateFlag = false;
        }
    }
    /**
     * event fires when focus goes from To Date
     */
    terminationDateBlur() {
        if (!this.terminationDate) {
            this.terminationDate = this.terminationDate === null ? undefined : null;
        }
        if ((DateFormat.compareDate(this.terminationDate, DateFormat.getDate())) === 1) {
            this.type = 'warn';
            this.message = this.translateService.translate('ociocnot.endingdaterangecannotbegreaterthansysdate');
            this.show();
            this.checkToDateFlag = true;
            this.fromDateFlag = false;
            this.toDateFlag = false;
            return;
        } else if ((DateFormat.compareDate(this.birthDate, this.terminationDate)) === 1) {
            this.checkToDateFlag2 = true;
            this.type = 'warn';
            this.message = this.translateService.translate('ociocnot.startingdatecannotbelaterthanendingdaterange');
            this.show();
            this.toDateFlag = false;
            this.fromDateFlag = false;
            return;
        } else {
            this.checkToDateFlag = false;
            this.fromDateFlag = false;
            this.toDateFlag = false;
            this.checkToDateFlag2 = false;
        }
    }
    getOfficers = () => {
        if (this.existsPrev === 0) {
            this.type = 'warn';
            this.message = this.translateService.translate('ociocnot.youcannotchangethestaffmember');
            this.show();
            return;
        }
        if (!this.facility) {
            this.type = 'warn';
            this.message = 'Please select Agency location before you change staff member';
            this.show();
            return;
        }
            const data = {
                agyLocId: this.facility
            };
            this.dialogService.openLinkDialog('/OCUAOFFI', data, 80).subscribe(result => {
              if (result) {
                 this.lastName = result.lastName;
                 this.staffId = result.sacStaffId;
                 this.firstName = result.firstName;
              }
           });
           return true;
     }
}
