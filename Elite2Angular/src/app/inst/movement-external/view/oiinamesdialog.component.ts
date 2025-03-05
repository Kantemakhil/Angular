import {
    Component,
    OnInit,
    ViewChild,
    OnDestroy
} from '@angular/core';

import { TranslateService } from '@common/translate/translate.service';
import { OiinamesService } from '../service/oiinames.service';
import { VNameSearch } from '@commonbeans/VNameSearch';
import { Router } from '@angular/router';
import { DialogComponent } from '@ui-components/dialog/dialog.component';
import { OffenderSearchService } from '@common/offender-records/service/offender-search.service';
import { OidehlocService } from '@inst/movements/housingchanges/service/oidehloc.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { OsiosearService } from '@common/offender-records/service/osiosear.service';
import { VHeaderBlock } from '@common/beans/VHeaderBlock';

// import required bean declarations

@Component({
    selector: 'app-oiinamesdialog',
    templateUrl: './oiinamesdialog.component.html'

})

export class OiinamesdialogComponent implements OnInit, OnDestroy {

 @ViewChild('dialog', {static: true}) dialog: DialogComponent;
    actionName: string;
    lovModel: any[];
    msgs: any[] = [];
    nameOfLovPage: string;
    listToCompare: any[] = [];
    namesrchData: VNameSearch[] = [];
    namesrchDataTemp: VNameSearch[] = [];
    namesrchModel: VNameSearch = new VNameSearch();
    namesrchModelTemp: VNameSearch = new VNameSearch();
    vHeaderBlockModel: VHeaderBlock = new VHeaderBlock();
    namesrchIndex = 0;
    namesrchInsertList: VNameSearch[] = [];
    namesrchUpdatetList: VNameSearch[] = [];
    namesrchDeleteList: VNameSearch[] = [];
    display: boolean;
    errorMessage: string;
    headerMessage: string;
    onaddfalg = true;
    selectDisable: boolean;
    retriveDisable: boolean;
    oiinamesColumnDefs: any[];
    clearDisable: boolean;
    statusOption: any[] = [];
    livingUnitOption: any[] = [];
    routUrl: string;
    activeFlagOption: any[] = [];
    sysDateTemp: Date;
    type = 'error';
    msglist = [];
    message = ' Invalid.';
    tableIndex = -1;
    namesReadOnly: boolean;
    cancelDisable: boolean;
    @ViewChild('oiinamesForm', {static: true}) form: any;
    constructor(private oiinamesFactory: OiinamesService, public translateService: TranslateService,
       private router: Router, private offenderSearchService: OffenderSearchService, private oidehlocFactory: OidehlocService,
       private sessionManager: UserSessionManager, private osiosearFactory: OsiosearService ) {
    }
    ngOnInit() {
        this.selectDisable = true;
        this.retriveDisable = false;
        this.cancelDisable = false;
        this.namesReadOnly = false;
        this.getOptionList();
        this.oiinamesColumnDefs = [
            {
                fieldName: this.translateService.translate( 'system-profile.name-last' ), field: 'lastName',
                editable: true, width: 200, datatype: 'text', cellEditable: this.canNameSearchEdit
            },
            {
                fieldName: this.translateService.translate( 'system-profile.name-given-1' ), field: 'firstName',
                editable: true, width: 200, datatype: 'text', cellEditable: this.canNameSearchEdit
            },
            {
                fieldName: this.translateService.translate( 'system-profile.name-given-2' ), field: 'middleName',
                editable: true, width: 200, datatype: 'text', cellEditable: this.canNameSearchEdit
            },
            {
                fieldName: this.translateService.translate( 'oiinames.s' ), field: 'activeFlag', options: this.activeFlagOption,
                editable: true, width: 200, datatype: 'text', cellEditable: this.canNameSearchEdit
            },
            {
                fieldName: this.translateService.translate( 'system-profile.off-id-code' ), field: 'offenderIdDisplay',
                editable: true, width: 200, datatype: 'text', cellEditable: this.canNameSearchEdit
            },
            {
                fieldName: this.translateService.translate( 'system-profile.book-id' ), field: 'bookingNo',
                editable: true, width: 150, datatype: 'text', cellEditable: this.canNameSearchEdit
            },
            {
                fieldName: this.translateService.translate( 'system-profile.inst-agency' ), field: 'agyLocId', 
                editable: true, width: 200, datatype: 'text', cellEditable: this.canNameSearchEdit
            },
            {
                fieldName: this.translateService.translate( 'oiinames.housinglocation' ), field: 'livingUnitDescription',
                editable: true, width: 300, datatype: 'text', cellEditable: this.canNameSearchEdit
            },
        ];

        const optionList = this.oiinamesFactory.findAgyLocIdList();
        optionList.subscribe(list => {
            list.forEach(listval => {
                this.statusOption.push({ 'id': listval, 'text': listval });
            });
        });

        const optionLivingUintList = this.oiinamesFactory.findLivingUnitsList();
        optionLivingUintList.subscribe(listValue => {
            listValue.forEach(listval => {
                this.livingUnitOption.push({ 'id': listval, 'text': listval });
            });
        });
        this.clearDisable = false;
        this.form.valueChanges.subscribe(data => {
            const keys = Object.keys(data);
            const count = {i: 0};
            if(this.namesrchData.length === 0) {
            do {
                if(!data[keys[count.i]]) {
                    this.clearDisable = true;
                } else {
                    this.clearDisable = false;
                }
                count.i++;
            } while(this.clearDisable && count.i < keys.length);
        } 
        });
    }
    getOptionList() {
        const optionActiveFlagList = this.oiinamesFactory.findActiveFlagList();
        optionActiveFlagList.subscribe(activeFlagListValue => {
            activeFlagListValue.forEach(element => {
                if (element === 'Y') {
                    element = 'A';
                } else {
                    element = 'I';
                }
                this.activeFlagOption.push({ 'id': element, 'text': element });
            });
        });
    }
    onRowClickagyincpartiesoffender(event) {
        if (event) {
            this.namesrchModelTemp = event;
            this.oiinamesFactory.offenderRowData.push(this.namesrchModelTemp);
            this.gettingHeaderData();
        }
    }
    gettingHeaderData() {
        const offbkGlobal = this.oiinamesFactory.offbkgGlobalQuery(this.namesrchModelTemp);
        offbkGlobal.subscribe(list => {
            if (list.length > 0) {
                this.vHeaderBlockModel = list[0];
            }
        });
    }
    clearQuery() {
        this.namesrchData = [];
        this.namesrchModelTemp = new VNameSearch();
        this.namesrchModel = new VNameSearch();
        this.onaddfalg = true;
        this.clearDisable = true;
        this.selectDisable = true;
        this.retriveDisable = false;
        this.cancelDisable = false;
        this.namesReadOnly = false;
    }
    cancel() {
         this.dialog.close(null);
    }
    onOffenderChange() {
        if (this.router.url && this.router.url === '/OIDEHLOC') {
            this.oidehlocFactory.nameLovData = this.namesrchModelTemp;
            this.dialog.close({
                'offenderIdDisplay': this.namesrchModelTemp.offenderIdDisplay, 'lname': this.namesrchModelTemp.lastName,
                'fname': this.namesrchModelTemp.firstName,
                'firstName': this.namesrchModelTemp.firstName, 'lastName': this.namesrchModelTemp.lastName,
                'livingUnitDescription': this.namesrchModelTemp.livingUnitDescription,
                'offenderBookId': this.namesrchModelTemp.offenderBookId, 'nbtInst': this.namesrchModelTemp.agyLocId,
                'nbtOffenderIdDisplay': this.namesrchModelTemp.offenderIdDisplay, 'nbtLastName': this.namesrchModelTemp.lastName,
                'nbtFirstName': this.namesrchModelTemp.firstName, 'agyLocId': this.namesrchModelTemp.agyLocId
            });
        } else if (this.router.url && this.router.url === '/OIDSCMOV') {
            this.vHeaderBlockModel.movementReason = this.vHeaderBlockModel.agyLocId;
            this.vHeaderBlockModel.prisonLocation = this.vHeaderBlockModel.livingUnitDescription;
            this.vHeaderBlockModel.status1 = this.vHeaderBlockModel.inOutStatus;
            //this.offenderSearchService.selectedOffender = this.vHeaderBlockModel;
            // this.offenderSearchService.selectedOffender = this.namesrchModelTemp;
            this.dialog.close({
                'offenderIdDisplay': this.namesrchModelTemp.offenderIdDisplay, 'lname': this.namesrchModelTemp.lastName,
                'fname': this.namesrchModelTemp.firstName,
                'firstName': this.namesrchModelTemp.firstName, 'lastName': this.namesrchModelTemp.lastName,
                'livingUnitDescription': this.namesrchModelTemp.livingUnitDescription,
                'offenderBookId': this.namesrchModelTemp.offenderBookId, 'nbtInst': this.namesrchModelTemp.agyLocId,
                'nbtOffenderIdDisplay': this.namesrchModelTemp.offenderIdDisplay, 'nbtLastName': this.namesrchModelTemp.lastName,
                'nbtFirstName': this.namesrchModelTemp.firstName,
                'offenderLastName': this.namesrchModelTemp.lastName, 'offenderFirstName': this.namesrchModelTemp.firstName,
                'bookingNo': this.namesrchModelTemp.bookingNo, 'inOutStatus': this.namesrchModelTemp.inOutStatus,
                'middleName': this.namesrchModelTemp.middleName, 'birthDate': this.namesrchModelTemp.birthDate,
                age: this.namesrchModelTemp.age

            });
        } else {
            //this.offenderSearchService.selectedOffender = this.namesrchModelTemp;
            this.dialog.close({
                'offenderIdDisplay': this.namesrchModelTemp.offenderIdDisplay, 'lname': this.namesrchModelTemp.lastName,
                'fname': this.namesrchModelTemp.firstName,
                'firstName': this.namesrchModelTemp.firstName, 'lastName': this.namesrchModelTemp.lastName,
                'livingUnitDescription': this.namesrchModelTemp.livingUnitDescription,
                'offenderBookId': this.namesrchModelTemp.offenderBookId, 'nbtInst': this.namesrchModelTemp.agyLocId,
                'nbtOffenderIdDisplay': this.namesrchModelTemp.offenderIdDisplay, 'nbtLastName': this.namesrchModelTemp.lastName,
                'nbtFirstName': this.namesrchModelTemp.firstName, 'agyLocId': this.namesrchModelTemp.agyLocId,
                'offenderLastName': this.namesrchModelTemp.lastName, 'offenderFirstName': this.namesrchModelTemp.firstName,
                'bookingNo': this.namesrchModelTemp.bookingNo, 'inOutStatus': this.namesrchModelTemp.inOutStatus,
                'middleName': this.namesrchModelTemp.middleName, 'birthDate': this.namesrchModelTemp.birthDate,
                age: this.namesrchModelTemp.age, 'activeFlag': this.namesrchModelTemp.activeFlag,
                  'livingUnitId': this.namesrchModelTemp.nbtLivingUnitId

            });
        }
    }

    namesrchExecuteQuery() {
        if (this.namesrchModel.activeFlag) {
            this.namesrchModel.activeFlag = undefined;
        }
        if (this.router.url === '/OIDINTMV') {
            this.namesrchModel.agyLocId = this.dialog.data.agyLocId;
            this.namesrchModel.moduleName = this.router.url.replace('/', '');
        }
        if (this.router.url === '/OIDCHOLO' || this.router.url === '/OIDEHLOC' ) {
            this.namesrchModel.moduleName = this.router.url.replace('/', '');
        }
        if (this.router.url === '/OIDSCMOV' || this.router.url === '/OIDIDETA' || this.router.url === '/OCIWLIST'
            || this.router.url === '/OCDOATTE') {
            this.namesrchModel.moduleName = this.router.url.replace('/', '');
        }
        if (this.router.url === '/OBDMCHRG') {
            this.namesrchModel.moduleName = this.router.url.replace('/', '');
        }

       /*  if (this.namesrchModel.offenderIdDisplay) {
            for (let i = Number(String(this.namesrchModel.offenderIdDisplay).length); i < 10; i++  ) {
                this.namesrchModel.offenderIdDisplay = '0' + this.namesrchModel.offenderIdDisplay;
              }
        } */
        this.namesrchModel.caseloadId = this.sessionManager.currentCaseLoad;
        const namesrchResult = this.oiinamesFactory.
            namesrchExecuteQuery(this.namesrchModel);
        namesrchResult.subscribe(data => {
            if (data.length === 0) {
                this.namesrchData = [];
                this.type = 'warn';
                this.message = this.translateService.translate('common.querycaused');
                this.show();
                return;
            } else {
                for ( let i = 0; i < data.length; i++ ) {
                //     data[i].activeFlag = this.namesrchModel.middleName;
                (data[i].activeFlag !== 'Y') ? data[i].activeFlag = 'I' : data[i].activeFlag = 'A';
                }
                this.namesrchData = data;
                this.onaddfalg = false;
                this.clearDisable = false;
                this.selectDisable = false;
                this.retriveDisable = true;
                this.cancelDisable = false;
                this.namesReadOnly = true;
                this.tableIndex = 0;
            }
        });
    }

    ngOnDestroy() {

    }
    canNameSearchEdit = ( data: any, index: number, field: string ): boolean => {
        return this.onaddfalg;
    }
    show() {
        this.msglist = [];
        this.msglist.push({ message: this.message, type: this.type });
        this.msgs = [...this.msglist];
    }
    ok(event?) {
        this.namesrchExecuteQuery();
    }

    onlyAlphabetallowed(event:any){
        let charcode = event.keyCode;
        if (charcode == 39  || charcode == 32 || charcode == 45 || (charcode >= 65 && charcode <= 90) || (charcode >= 97 && charcode <= 122)){
            return true; //validation for " ' , a-z , A-Z "
        }  
        return false;
    }
    
    onPaste(event){
        let str = event.clipboardData.getData('text');
        for (let i = 0; i < str.length; i++) {
            let kC = str.charAt(i).charCodeAt(0);
            let ev = { keyCode : kC}
            if(!this.onlyAlphabetallowed(ev)){
               return false;
            }
        }
        return true;
    }
}
