import {
    Component,
    OnInit,
    ViewChild
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OcuperprService } from '../service/ocuperpr.service';
import { PersonProfiles } from '@visitsbeans/PersonProfiles';
import { PersonProfilesCommitBean } from '@visitsbeans/PersonProfilesCommitBean';
import { OsipsearService } from '@inst/visits-management/service/osipsear.service';
import { DialogComponent } from '@ui-components/dialog/dialog.component';
import { DialogService } from '@ui-components/dialog/dialog.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { DateFormat } from '@ui-components/datepicker/dateFormat';

@Component({
    selector: 'app-ocuperpr',
    templateUrl: './ocuperpr.component.html'
})

export class OcuperprComponent implements OnInit {
    @ViewChild('dialog', {static: true}) dialog: DialogComponent;
    actionName: string;
    lovModel: any[];
    msgs: any[] = [];
    nameOfLovPage: string;
    listToCompare: any[] = [];
    profilesData: PersonProfiles[] = [];
    profilesDataTemp: PersonProfiles[] = [];
    profilesModel: PersonProfiles = new PersonProfiles();
    profilesIndex: number;
    profilesInsertList: PersonProfiles[] = [];
    profilesUpdatetList: PersonProfiles[] = [];
    profilesDeleteList: PersonProfiles[] = [];
    profilesCommitModel: PersonProfilesCommitBean = new PersonProfilesCommitBean();
    minDate: Date;
    display: boolean;
    errorMessage: string;
    headerMessage: string;
    disabled: boolean;
    editable: boolean;
    offCaseNrColumnDef: any[];
    perAddrColumnDef: any[];
    perIdentColumnDef: any[];
    profilesColumnDef: any[];
    perEmpColumnDef: any[];
    offCntPerColumnDef: any[];
    contactsColumnDef: any[];
    offCntPerReadOnly: boolean;
    perAddrReadOnly: boolean;
    perIdentReadOnly: boolean;
    perInfoReadOnly: boolean;
    perEmpReadOnly: boolean;
    contactsReadOnly: boolean;
    offCaseNoteReadOnly: boolean;
    amendNoteReadOnly: boolean;
    personsReadOnly: boolean;
    offCaseNrReadOnly: boolean;
    profilesReadOnly: boolean;
    savebtn: boolean;
    codeValueType:String
    rgprofilecodeRg: any[] = [];
    validTextbox = ['V_AGE'];
    personalTitle = { 'description': 'Description', 'profileCode': 'Profile Code' };
    constructor(private ocuperprFactory: OcuperprService, 
        public translateService: TranslateService,
        private osipsearFactory: OsipsearService, public dialogService: DialogService,
        private sessionManager: UserSessionManager) {
        this.offCaseNrColumnDef = [];
        this.perAddrColumnDef = [];
        this.perIdentColumnDef = [];
        this.profilesColumnDef = [];
        this.perEmpColumnDef = [];
        this.offCntPerColumnDef = [];
        this.contactsColumnDef = [];
    }
    ngOnInit() {
        this.insertingProfilesTypes();
    }
    cancel() {
        this.dialog.close(null);
    }
    show(vldmsg, type?) {
        const msgval = [{ message: vldmsg, type: type }];
        this.msgs = [...msgval];
    }
    insertingProfilesTypes() {
        this.profilesModel.personId = this.dialog.data.personId;
        const result = this.osipsearFactory.insertProfilesTypes(this.profilesModel.personId);
        result.subscribe(data => {
            if (data.length === 0) {
                this.profilesData = [];
                this.profilesExecuteQuery();
            } else {
                this.profilesExecuteQuery();
            }
        });
    }
    profilesExecuteQuery() {
        this.profilesModel.personId = this.dialog.data.personId;
        const profilesResult = this.osipsearFactory.profilesExecuteQuery(this.profilesModel);
        profilesResult.subscribe(data => {
            if (data.length === 0) {
                this.profilesData = [];
            } else {
                this.profilesData = data;
                this.savebtn = true;
            }
        });
    }
    /**
     *  This function will be executed when commit event is
    * fired
    */
    checklistdata(event) {
        if (event && event.innerOptions) {
            if (event.innerOptions.length === 0) {
                this.show(this.translateService.translate('common.listofvalues'), 'warn');
            }
        }

    }
    isInsertable(event) {
        if (event) {
            this.savebtn = false;
        }

    }
    lovcheck(event) {
        this.savebtn = false;
    }
    ocuperprSaveprofilesForm(event) {
        this.profilesUpdatetList = [];
        this.profilesCommitModel.updateList = [];
        this.profilesUpdatetList = this.profilesData;
        for (let i = 0; i < this.profilesUpdatetList.length; i++) {
            if (!this.profilesUpdatetList[i].profileCode) {
                this.profilesUpdatetList[i].profileCode = '';
            }
            this.profilesUpdatetList[i].modifyDatetime = DateFormat.getDate();
            this.profilesUpdatetList[i].modifyUserId = this.sessionManager.getId();
            if (this.profilesUpdatetList[i].profileType === 'V_AGE') {
                if (!isNaN(Number(this.profilesUpdatetList[i].nbtProfileCode)) ||
                    isNaN(Number(this.profilesUpdatetList[i].nbtProfileCode))) {
                    this.profilesUpdatetList[i].profileCode = this.profilesUpdatetList[i].nbtProfileCode;
                }
            } if (this.profilesUpdatetList[i].profileType === 'V_FACE') {
                if (this.profilesUpdatetList[i].nbtProfileCode) {
                    this.show(this.translateService.translate('ocuperpr.invalidvalue'), 'warn');
                    return;
                }
            }
        }
        this.profilesCommitModel.updateList = this.profilesUpdatetList;
        const profilesSaveData = this.osipsearFactory.profilesCommit(this.profilesCommitModel);
        profilesSaveData.subscribe(data => {
            if (data === 1) {
                this.show(this.translateService.translate('common.addupdateremoverecordsuccess'), 'success');
                this.savebtn = true;
                event.reset();
                this.profilesExecuteQuery();
            } else {
                this.show(this.translateService.translate('common.addupdateremoverecordfailed'), 'warn');
            }
        });
    }
    setValidTextbox(event) {
        return this.validTextbox.includes(event.profileType);
    }
    isReadOnly(event) {
        return event && event.innerOptions && event.innerOptions.length > 0 ? false : true;
    }
    lovBlur(nbtProfileType) {
        const index = this.findIndex(this.profilesData, 'nbtProfileType', nbtProfileType);
        if (!this.profilesData[index].profileCode) {
            this.profilesData[index].profileCode = this.profilesData[index].profileCode === undefined ? '' : undefined;
        }

    }
    findIndex(arr, key, val) {
        let indexVal = -1;
        for (let i = 0; i < arr.length; i++) {
            if (arr[i][key] === val) {
                indexVal = i;
                break;
            }
        }
        return indexVal;
    }
}
