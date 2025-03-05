import {
    Component, OnInit, ViewChild
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OiistgmiService } from '@inst/securitythreatgroups/service/oiistgmi.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { VStgMembershipInquiry } from '@inst/securitythreatgroups/beans/VStgMembershipInquiry';
import { SecurityThreatGroups } from '@instincidentsbeans/SecurityThreatGroups';
import { DialogComponent } from '@ui-components/dialog/dialog.component';
//  import required bean declarations

@Component({
    selector: 'app-oiistgmi',
    templateUrl: './oiistgmi.component.html'
})

export class OiistgmiComponent implements OnInit {
    //  Variable declaration
    @ViewChild('dialog', {static: true}) dialog: DialogComponent;
    msgs: any[] = [];
    vstgmembershipinquiryData: VStgMembershipInquiry[] = [];
    vstgmembershipinquiryModel: VStgMembershipInquiry = new VStgMembershipInquiry();
    vStgMembershipInquiryColumnDef: any[];
    vStgMembershipInquiryReadOnly = false;
    options: any[] = [];
    all: string;
    securityThreatGroupsModel: SecurityThreatGroups = new SecurityThreatGroups();
    vstginquiryModelData: VStgMembershipInquiry = new VStgMembershipInquiry();
    searchDisable: boolean;
    clearDisable: boolean;
    radioBtnValue: string;
    textReadonly: boolean;
    selectedIndex = -1;
    groupFlag: boolean;
    constructor(private oiistgmiFactory: OiistgmiService, public translateService: TranslateService,
        public sessionManager: UserSessionManager) {
        this.vStgMembershipInquiryColumnDef = [];
        this.options = [{ text: this.translateService.translate('oiistgmi.allmembers'), id: 'ALL' },
        { text: this.translateService.translate('oiistgmi.incustody'), id: 'INC' },
        { text: this.translateService.translate('oiistgmi.outofcustody'), id: 'OOC' }];

    }
    ngOnInit() {
        this.groupFlag = true;
        this.all = 'ALL';
        this.radioBtnValue = undefined;
        this.vstgmembershipinquiryModel = new VStgMembershipInquiry();
        this.vstgmembershipinquiryModel.stgId = this.dialog.data.stgId;
        this.vstgmembershipinquiryModel.stgAffActiveFlag = 'Y';
        this.vstgmembershipinquiryExecuteQuery();
        this.searchDisable = true;
        this.clearDisable = true;
        this.vStgMembershipInquiryColumnDef = [
            {
                fieldName: this.translateService.translate('system-profile.off-id-code'), field: 'offenderIdDisplay',
                editable: false, width: 150
            },
            { fieldName: this.translateService.translate('common.lastname'), field: 'lastName', editable: false, width: 150 },
            { fieldName:  this.translateService.translate('common.name'), field: 'firstName', editable: false, width: 150 },
            { fieldName: this.translateService.translate('common.status'), field: 'actionCode', editable: false, width: 150 },
            { fieldName: this.translateService.translate('common.location'), field: 'description', editable: false, width: 150 }
        ];
        this.securityThreatGroupsModel = new SecurityThreatGroups();
        this.securityThreatGroupsModel.stgId = this.dialog.data.stgId;
        const getStgGroupDescription = this.oiistgmiFactory.getStgGroupDescription(this.securityThreatGroupsModel);
        getStgGroupDescription.subscribe(result => {
            this.securityThreatGroupsModel.description = result;
        });
    }
    /**
     * To display the messages
     */
    show(vldmsg, type) {
        const msgval = [{ message: vldmsg, type: type }];
        this.msgs = [...msgval];
    }
    /**
    *  This function will be executed when Exit event is
    * fired
    */
    onButExitclick() {
        this.dialog.close(null);
    }
    /**
     *  This function will be executed when Search event is
     * fired
     */
    vstgmembershipinquiryExecuteQuery() {
        this.selectedIndex = -1;
        if (this.vstginquiryModelData.offenderIdDisplay || this.vstginquiryModelData.lastName || this.vstginquiryModelData.firstName ||
            this.vstginquiryModelData.actionCode || this.vstginquiryModelData.description) {
            if (this.vstginquiryModelData.offenderIdDisplay) {
                for (let i = Number(String(this.vstginquiryModelData.offenderIdDisplay).length); i < 10; i++) {
                    //this.vstginquiryModelData.offenderIdDisplay = '0' + this.vstginquiryModelData.offenderIdDisplay;
                }
            }
            this.vstgmembershipinquiryModel = this.vstginquiryModelData;
            this.searchDisable = true;
            this.clearDisable = false;
        }
        if (this.radioBtnValue === 'INC') {
            this.vstgmembershipinquiryModel.activeFlag = 'Y';
        } else if (this.radioBtnValue === 'OOC') {
            this.vstgmembershipinquiryModel.activeFlag = 'N';
        }
        this.vstgmembershipinquiryModel.stgAffActiveFlag = 'Y';
        this.vstgmembershipinquiryModel.stgId = this.dialog.data.stgId;
        const vstgmembershipinquiryResult = this.oiistgmiFactory.vStgMembershipInquiryExecuteQuery(this.vstgmembershipinquiryModel);
        vstgmembershipinquiryResult.subscribe(vstgmembershipinquiryResultList => {
            if (vstgmembershipinquiryResultList.length === 0) {
                this.vstgmembershipinquiryData = [];
                this.textReadonly = true;
                this.searchDisable = false;
                this.vstginquiryModelData = new VStgMembershipInquiry();
                this.vstgmembershipinquiryModel = new VStgMembershipInquiry();
                this.show(this.translateService.translate('common.querycausednorecords'), 'warn');
            } else {
                this.textReadonly = false;
                this.clearDisable = false;
                this.searchDisable = true;
                this.vstgmembershipinquiryData = vstgmembershipinquiryResultList;
                this.selectedIndex = 0;
            }
        });
    }
    /**
     *  This function will be executed when we changes the radio buttons
     */
    radioChanged(event) {
        if (event) {
            this.radioBtnValue = undefined;
            this.radioBtnValue = event.value;
            this.vstginquiryModelData = new VStgMembershipInquiry();
            this.vstgmembershipinquiryModel = new VStgMembershipInquiry();
            this.vstgmembershipinquiryModel.stgId = this.dialog.data.stgId;
            this.vstgmembershipinquiryModel.stgAffActiveFlag = 'Y';
            if (event.value === 'ALL') {
                this.vstgmembershipinquiryExecuteQuery();
            } else if (event.value === 'INC') {
                this.vstgmembershipinquiryModel.activeFlag = 'Y';
                this.vstgmembershipinquiryExecuteQuery();
            } else if (event.value === 'OOC') {
                this.vstgmembershipinquiryModel.activeFlag = 'N';
                this.vstgmembershipinquiryExecuteQuery();
            }
        }

    }
    /**
     *  This function will be executed when Clear event is
     * fired
     */
    onButClearclick() {
        this.vstginquiryModelData = new VStgMembershipInquiry();
        this.vstgmembershipinquiryModel = new VStgMembershipInquiry();
        this.vstgmembershipinquiryModel.stgId = this.dialog.data.stgId;
        this.vstgmembershipinquiryModel.stgAffActiveFlag = 'Y';
        this.clearDisable = true;
        this.searchDisable = false;
        this.vstgmembershipinquiryData = [];
    }
    /**
     *  This event will be used for single search operations
     */
    onKeyPressEvent() {
        this.searchDisable = false;
    }

    /**
     *  This event will be used to enble and disable Group value
     */
    onKeyDownEvent(event) {
        if (event.keyCode === 37 || event.keyCode === 39) {
            this.groupFlag = false;
        } else {
            this.groupFlag = true;
        }
    }
}
