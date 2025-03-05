import {
    Component, OnInit, ViewChild
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OcucnperService } from '@inst/visits-management/service/ocucnper.service';
import { Persons } from '@inst/demographics-biometrics/beans/Persons';
import { DateFormat } from '@ui-components/datepicker/dateFormat';
import { PersonsCommitBean } from '@instdemographicsbeans/PersonsCommitBean';
import { DialogComponent } from '@ui-components/dialog/dialog.component';
import { OsipsearService } from '../service/osipsear.service';

//  import required bean declarations

@Component({
    selector: 'app-ocucnper',
    templateUrl: './ocucnper.component.html'
})

export class OcucnperComponent implements OnInit {
    //  Variable declaration
    @ViewChild('dialog', {static: true}) dialog: DialogComponent;
    enableSave: boolean;
    actionName: string;
    lovModel: any[];
    msgs: any[] = [];
    nameOfLovPage: string;
    listToCompare: any[] = [];
    personsData: Persons[] = [];
    personsDataTemp: Persons[] = [];
    personsModel: Persons = new Persons();
    personsIndex = 0;
    personsInsertList: Persons[] = [];
    personsUpdateList: Persons[] = [];
    personsDeleteList: Persons[] = [];
    minDate: any;
    display: boolean;
    errorMessage: string;
    headerMessage: string;
    disabled: boolean;
    editable = true;
    personsReadOnly = false;
    rgsexcodeRg: any[] = [];
    personsCommitModel: PersonsCommitBean = new PersonsCommitBean();
    msglist = [];
    message = ' Invalid.';
    type = 'error';
    staffFlag: boolean;
    constructor(private ocucnperFactory: OcucnperService,
                public translateService: TranslateService,
                private osipsearFactory: OsipsearService) {
        //  TODO initilize data members here..!
    }
    ngOnInit() {
        //  TODO all initializations here
        this.staffFlag = false;
        if (this.dialog.data) {
            this.personsModel.lastName = this.dialog.data.pLastName;
            this.personsModel.firstName = this.dialog.data.pFirstName;
            this.personsModel.middleName = this.dialog.data.pMiddleName;
            this.personsModel.birthdate = this.dialog.data.pBirthDate;
            this.personsModel.secondMiddleName = this.dialog.data.secondMiddleName;
            this.personsModel.pinValue = this.dialog.data['pinValue'];
            this.personsModel.pIdentifierValue = this.dialog.data.pIdentifierValue;
            this.personsModel.pIdentifierType = this.dialog.data.pIdentifierType;
            this.personsModel.sex=this.dialog.data.pSex;
            this.personsModel.pninValue = this.dialog.data['pninValue'];
        }
        const rgsexcodeServiceObj = this.osipsearFactory.rgSexCodeRecordGroup1();
        rgsexcodeServiceObj.subscribe(rgsexcodeList => {
            if (rgsexcodeList.length === 0) {
                this.rgsexcodeRg = [];
            } else {
                for (let i = 0; i < rgsexcodeList.length; i++) {
                    this.rgsexcodeRg.push({
                        'text': rgsexcodeList[i].code + ' - ' +
                            rgsexcodeList[i].description, 'id': rgsexcodeList[i].code
                    });
                }
            }
        });
    }
      /**
     * To display the messages
     */
    show() {
        this.msglist = [];
        this.msglist.push( { message: this.message, type: this.type } );
        this.msgs = [...this.msglist];

    }
    allowNumbers(event) {
    }
    onButSaveclick() {
    }
    onButExitclick() {
        this.dialog.close(null);
    }
    ok() {
    }
    no() {
    }
    cancel() {
    }
    onOffenderChange(offender) {
    }
    personsExecuteQuery() {
        const personsResult = this.osipsearFactory.
            personsExecuteQuery1(this.personsModel);
        personsResult.subscribe(personsResultList => {
            if (personsResultList.length === 0) {
                this.personsData = [];
            } else {
                this.personsData = personsResultList;
                this.personsModel = personsResultList[0];
            }
        });
    }
    /**
	 *  This function will be executed when commit event is
	* fired
	*/
    ocucnperSavepersonsForm(event?) {
        //  TODO declare commit bean and add insert list to that object.
        this.personsInsertList = [];
        this.personsCommitModel.insertList = [];
        this.personsCommitModel.updateList = [];
        this.personsCommitModel.deleteList = [];
        if (event) {
            if (event.lastValue === '0_/__/____') {
                this.type = 'info';
                this.message = this.translateService.translate('common.leapyearnotallowed');
                this.show();
                return;
            }
            if (String(event.lastValue).indexOf('_') >= 0 && event.value === null) {
                this.type = 'info';
                this.message = this.translateService.translate('common.datemustbeentervalidformat');
                this.show();
                return;
            }
        }
        if (!this.personsModel.lastName) {
            this.type = 'warn';
            this.message = this.translateService.translate('system-profile.name-last') + ' ' +
                              this.translateService.translate('ocucnper.mustbe');
            this.show();
            return;
        }
        if (!this.personsModel.firstName) {
            this.type = 'warn';
            this.message = this.translateService.translate('system-profile.name-given-1') + ' ' +
                              this.translateService.translate('ocucnper.mustbe');
            this.show();
            return;
        }
        /*  if (! this.personsModel.sex) {
             this.type = 'warn';
             this.message = this.translateService.translate('common.gendermustbeselect');
             this.show();
             return;
         } */
         if ( this.personsModel.birthdate) {
             if ((DateFormat.compareDate(DateFormat.getDate(this.personsModel.birthdate),
                     DateFormat.getDate())) === 1) {
                     this.type = 'warn';
                     this.message = this.translateService.translate('ocucnper.birthdatevalidation');
                     this.show();
                     return false;
                 }
         }
         this.enableSave = true;
         if ( this.staffFlag ) {
             this.personsModel.staffFlag = 'Y';
         } else {
             this.personsModel.staffFlag = 'N';
         }
         this.personsInsertList.push(this.personsModel);
         this.personsCommitModel.insertList = this.personsInsertList;
        const personsSaveData = this.osipsearFactory.personsCommit(this.personsCommitModel);
        personsSaveData.subscribe(data => {
            if (data === 1) {
                this.type = 'success';
                this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
                this.show();
                this.dialog.close({lastName: this.personsModel.lastName, firstName: this.personsModel.firstName});
            } else {
                this.type = 'warn';
                this.message = this.translateService.translate('common.addupdateremoverecordfailed');
                this.show();
                this.enableSave = false;
            }
        });
    }

}
