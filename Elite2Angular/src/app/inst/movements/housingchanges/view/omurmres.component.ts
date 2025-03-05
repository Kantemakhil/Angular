import {
    Component, OnInit, ViewChild
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OmurmresService } from '@inst/movements/housingchanges/service/omurmres.service';
import { ReserveBedLocations } from '@inst/movements/housingchanges/beans/ReserveBedLocations';
import { SystemProfiles } from '@commonbeans/SystemProfiles';
import { SystemProfilesCommitBean } from '@saadminbeans/SystemProfilesCommitBean';
import { DialogComponent } from '@ui-components/dialog/dialog.component';
import { ReserveBedLocationsCommitBean } from '@inst/movements/housingchanges/beans/ReserveBedLocationsCommitBean';
import { DateFormat } from '@ui-components/datepicker/dateFormat';
import { VNameSearch2 } from '@cmsearchassaignbeans/VNameSearch2';
import { OsinamesService } from '@cm/searchassaign/service/osinames.service';
import { DialogService } from '@ui-components/dialog/dialog.service';
//  import required bean declarations

@Component({
    selector: 'app-omurmres',
    templateUrl: './omurmres.component.html'
})

export class OmurmresComponent implements OnInit {
    @ViewChild('dialog', {static: true}) dialog: DialogComponent;
    //  Variable declaration
    actionName: string;
    lovModel: any[];
    msgs: any[] = [];
    nameOfLovPage: string;
    listToCompare: any[] = [];
    resblData: ReserveBedLocations[] = [];
    resblDataTemp: ReserveBedLocations[] = [];
    resblModel: ReserveBedLocations = new ReserveBedLocations();
    resblModelTemp: ReserveBedLocations = new ReserveBedLocations();
    resblIndex = 0;
    resblInsertList: ReserveBedLocations[] = [];
    resblUpdatetList: ReserveBedLocations[] = [];
    resblDeleteList: ReserveBedLocations[] = [];
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
    offCipDetailsColumnDef: any[];
    livUnitColumnDef: any[];
    bedAhColumnDef: any[];
    resBlColumnDef: any[];
    bedAhReadOnly = false;
    sysPflReadOnly = false;
    crtMvTmpReadOnly = false;
    offCipDetailsReadOnly = false;
    vOffBkgReadOnly = false;
    resBlReadOnly = false;
    cg$ctrlReadOnly = false;
    livUnitReadOnly = false;
    cgfkResblremovereasonRg: any[] = [];
    msglist = [];
    message = ' Invalid.';
    type = 'error';
    syspflCommitModel: SystemProfilesCommitBean = new SystemProfilesCommitBean();
    resblCommitModel: ReserveBedLocationsCommitBean = new ReserveBedLocationsCommitBean();
    reasonTitles = { code: 'Reason:', description: 'Description' };
    saveBtnDisabled = false;
    namesrchModel: VNameSearch2 = new VNameSearch2();
    offenderIdvalue: any;
    constructor(private omurmresFactory: OmurmresService,
        public translateService: TranslateService,
        private osinamesFactory: OsinamesService,
        public dialogService: DialogService) {
        this.offCipDetailsColumnDef = [];
        this.livUnitColumnDef = [];
        this.bedAhColumnDef = [];
        this.resBlColumnDef = [];
    }
    ngOnInit() {
        this.resblExecuteQuery();

        this.offCipDetailsColumnDef = [
            { fieldName: 'Type*', field: 'nbtPlacementDesc', editable: false, width: 150 },
            { fieldName: 'Requested By*', field: 'nbtRequestedBy', editable: false, width: 150 },
            { fieldName: 'Reason*', field: 'nbtPlaceReasonDesc', editable: false, width: 150 },
            { fieldName: 'Facility*', field: 'nbtAgyLocDesc', editable: false, width: 150 },
            { fieldName: '', field: 'butReqStaff', editable: false, width: 150 },
            { fieldName: '', field: 'butPlacementType', editable: false, width: 150 },
            { fieldName: '', field: 'butPlacementReason', editable: false, width: 150 },
            { fieldName: '', field: 'butAgyLocId', editable: false, width: 150 },
        ];
        this.livUnitColumnDef = [
            { fieldName: '', field: 'level2Code', editable: false, width: 150 },
            { fieldName: 'Level 3', field: 'level3Desc', editable: false, width: 150 },
            { fieldName: '', field: 'level1Code', editable: false, width: 150 },
            { fieldName: 'Level 4', field: 'level4Desc', editable: false, width: 150 },
            { fieldName: 'Level 1', field: 'level1Desc', editable: false, width: 150 },
            { fieldName: 'Level 2', field: 'level2Desc', editable: false, width: 150 },
            { fieldName: '', field: 'level4Code', editable: false, width: 150 },
            { fieldName: '', field: 'level3Code', editable: false, width: 150 },
        ];
        this.bedAhColumnDef = [
            { fieldName: '', field: 'dspLastName', editable: false, width: 150 },
            { fieldName: '', field: 'dspFirstName', editable: false, width: 150 },
            { fieldName: '', field: 'dspOffenderIdDisplay2', editable: false, width: 150 },
            { fieldName: '', field: 'butLivingUnitId', editable: false, width: 150 },
            { fieldName: 'Reason', field: 'dspDescription', editable: false, width: 150 },
            { fieldName: 'To Location*', field: 'cgnbtLivingUnitId2', editable: false, width: 150 },
            { fieldName: 'From Location', field: 'dspLivingUnitDescription', editable: false, width: 150 },
            { fieldName: '', field: 'dspOffenderIdDisplay', editable: false, width: 150 },
            { fieldName: '', field: 'dspDescription2', editable: false, width: 150 },
        ];
        this.resBlColumnDef = [
            { fieldName: '', field: 'agyLocId2', editable: false, width: 150 },
            { fieldName: '', field: 'butCommentText', editable: false, width: 150 },
            { fieldName: 'Until Date*', field: 'reserveUntilDate', editable: false, width: 150 },
            { fieldName: 'Comment', field: 'commentText', editable: false, width: 150 },
            { fieldName: '', field: 'agyLocId', editable: false, width: 150 },
            { fieldName: '', field: 'cgnbtOffenderId', editable: false, width: 150 },
            { fieldName: '', field: 'butOffenderId', editable: false, width: 150 },
            { fieldName: 'OC?', field: 'cgnbtCommentText', editable: false, width: 150 },
            { fieldName: '', field: 'cgnbtOffenderId2', editable: false, width: 150 },
            { fieldName: '', field: 'offenderId', editable: false, width: 150 },
            { fieldName: 'CB', field: 'cgnbtOffenderId3', editable: false, width: 150 },
            { fieldName: '', field: 'reserveBedId', editable: false, width: 150 },
            { fieldName: '', field: 'butLivingUnitId', editable: false, width: 150 },
            { fieldName: 'Location*', field: 'cgnbtLivingUnitId', editable: false, width: 150 },
            { fieldName: '', field: 'livingUnitId', editable: false, width: 150 },
            { fieldName: '', field: 'dspOffenderIdDisplay', editable: false, width: 150 },
        ];
    }
    show() {
        this.msglist = [];
        this.msglist.push({ message: this.message, type: this.type });
        this.msgs = [...this.msglist];
    }
    allowNumbers(event) {
    }
    onButCommentTextclick() {
    }
    onButCommentText2click() {
        this.dialog.close(false);
    }
    ok() {
    }
    no() {
    }
    cancel() {
    }
    onOffenderChange(offender) {
    }
    resblExecuteQuery() {
        this.resblModelTemp = new ReserveBedLocations();
        this.resblModelTemp = this.dialog.data;
        const resblResult = this.omurmresFactory.
            resBlExecuteQuery(this.resblModelTemp);
        resblResult.subscribe(resblResultList => {
            if (resblResultList.length === 0) {
                this.resblData = [];
            } else {
                this.resblData = resblResultList;
                this.resblModel = resblResultList[0];
                this.resblModel.livingUnitCode = this.dialog.data.livingUnitDesc;
            }
        });
    }
    /**
	 *  This function will be executed when commit event is
	* fired
	*/
    omurmresSaveresblForm() {
        this.resblCommitModel.insertList = [];
        this.resblCommitModel.updateList = [];
        this.resblCommitModel.deleteList = [];
        this.resblDeleteList = [];
        this.resblModel.reserveUntilDate = DateFormat.getDate();
        this.resblModel.livingUnitId = this.dialog.data.livingUnitId;
        this.resblModel.reserveBedId = this.dialog.data.reserveBedId;
        this.resblDeleteList.push(this.resblModel);
        this.resblCommitModel.deleteList = this.resblDeleteList;
        const resblSaveData = this.omurmresFactory.resBlCommit(this.resblCommitModel);
        resblSaveData.subscribe(data => {
            if (data === 1) {
                this.saveBtnDisabled = true;
                this.type = 'success';
                this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
                this.show();
                this.dialog.close(true);
            } else {
                this.type = 'warn';
                this.message = this.translateService.translate('common.addupdateremoverecordfailed');
                this.show();
            }
        });
    }
    syspflExecuteQuery() {
        const syspflResult = this.omurmresFactory.
            sysPflExecuteQuery(this.syspflModel);
        syspflResult.subscribe(syspflResultList => {
            if (syspflResultList.length === 0) {
                this.syspflData = [];
            } else {
                this.syspflData = syspflResultList;
                this.syspflModel = syspflResultList[0];
            }
        });
    }
    /**
	 *  This function will be executed when commit event is
	* fired
	*/
    omurmresSavesyspflForm(event) {
        //  TODO declare commit bean and add insert list to that object.
        this.syspflInsertList = event.added;
        this.syspflUpdatetList = event.updated;
        this.syspflDeleteList = event.removed;
        this.syspflCommitModel.insertList = [];
        this.syspflCommitModel.updateList = [];
        this.syspflCommitModel.deleteList = [];
        if (this.syspflInsertList.length > 0 || this.syspflUpdatetList.length > 0) {
            for (let i = 0; i < this.syspflInsertList.length; i++) {
            }
            for (let i = 0; i < this.syspflUpdatetList.length; i++) {
            }
            this.syspflCommitModel.insertList = this.syspflInsertList;
            this.syspflCommitModel.updateList = this.syspflUpdatetList;
        }
        if (this.syspflDeleteList.length > 0) {
            for (let i = 0; i < this.syspflDeleteList.length; i++) {
            }
            this.syspflCommitModel.deleteList = this.syspflDeleteList;
        }
        const syspflSaveData = this.omurmresFactory.sysPflCommit(this.syspflCommitModel);
        syspflSaveData.subscribe(data => {
            if (data === 1) {
                this.type = 'info';
                this.message = 'Add/ Update/ Remove record sucess';
                this.show();
            } else {
                this.type = 'warn';
                this.message = 'Add/ Update/ Remove record Failed';
                this.show();
            }
        });
    }
    onBlur() {
        if (this.resblModel.offenderIdDisplay) {
            this.offenderIdvalue = undefined;
            this.offenderIdvalue = this.resblModel.offenderIdDisplay;
            if (isNaN(this.offenderIdvalue)) {
                for (let i = Number(String(this.resblModel.offenderIdDisplay).length); i < 10; i++) {
                    this.resblModel.offenderIdDisplay = '0' + this.resblModel.offenderIdDisplay;
                }
                return;
            } else {
                this.namesrchModel.offenderIdDisplay = this.resblModel.offenderIdDisplay;
                for (let i = Number(String(this.namesrchModel.offenderIdDisplay).length); i < 10; i++) {
                    this.namesrchModel.offenderIdDisplay = '0' + this.namesrchModel.offenderIdDisplay;
                }
                const namesrchResult = this.osinamesFactory.
                    nameSrchExecuteQuery(this.namesrchModel);
                namesrchResult.subscribe(data => {
                    if (data.length === 0) {
                        this.dialogService.openLinkDialog('/oiinamesdialog', this.namesrchModel).subscribe(result => {
                            if (result) {
                                this.resblModel.offenderIdDisplay = result.offenderIdDisplay;
                                this.resblModel.lastName = result.lastName;
                                this.resblModel.firstName = result.firstName;
                                this.resblModel.offenderBookId = result.offenderBookId;
                            } else {
                                this.resblModel.offenderIdDisplay = undefined;
                                this.resblModel.lastName = undefined;
                                this.resblModel.firstName = undefined;
                            }
                        });
                    } else {
                        this.resblModel.offenderIdDisplay = data[0].offenderIdDisplay;
                        this.resblModel.lastName = data[0].lastName;
                        this.resblModel.firstName = data[0].firstName;
                    }
                });
            }
        }
    }
}
