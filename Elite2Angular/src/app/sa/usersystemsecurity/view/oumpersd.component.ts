import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OumpersdService } from '../service/oumpersd.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { StaffMembers } from '@instincidentsbeans/StaffMembers';
import { StaffMembersCommitBean } from '@sausersystemsecuritybeans/StaffMembersCommitBean';
// import required bean declarations

@Component({
    selector: 'app-oumpersd',
    templateUrl: './oumpersd.component.html'
})

export class OumpersdComponent implements OnInit {
    // Variable declaration
    msgs: any[] = [];
    staffData: StaffMembers[] = [];
    staffCommitModel: StaffMembersCommitBean = new StaffMembersCommitBean();
    staffIndex = -1;
    staffInsertList: StaffMembers[] = [];
    staffUpdatetList: StaffMembers[] = [];
    staffDeleteList: StaffMembers[] = [];
    staffColumnDef: any[];
    msglist: any[];
    message: any;
    type: any;
    staffId: number;
    staffMemModel : StaffMembers = new StaffMembers();
    lovTitles = {
        code: this.translateService.translate('oumpersd.licensecode'),
        description: this.translateService.translate('common.description')
    };
    exitLaunchBtn: boolean;
    constructor(private oumpersdFactory: OumpersdService, public translateService: TranslateService,
        public sessionManager: UserSessionManager) {
        // TODO initilize data members here..!
        this.staffColumnDef = [];
    }
    ngOnInit() {
        this.staffId = this.sessionManager.userSessionDetails().staff.staffId;

        this.staffColumnDef = [
            { fieldName: this.translateService.translate('oumpersd.staffid'), field: 'staffId', editable: false, width: 150 },
            { fieldName: this.translateService.translate('common.lastname'), field: 'lastName', editable: false, width: 150 },
            { fieldName: this.translateService.translate('common.firstname'), field: 'firstName', editable: false, width: 150 },
            {
                fieldName: this.translateService.translate('oumpersd.licensetype'), field: 'licenseCode', editable: true,
                width: 150, datatype: 'lov', domain: 'TPT_VEH_LIC', titles: this.lovTitles
            },
            {
                fieldName: this.translateService.translate('common.expirydate'), field: 'licenseExpiryDate',
                editable: true, width: 150, datatype: 'date'
            },
        ];

        if (this.oumpersdFactory.backBtn) {
            this.exitLaunchBtn = true;
        }

        this.staffExecuteQuery();
    }
    /**
* This function displays the messages
*/
    show() {
        this.msglist = [];
        this.msglist.push({ message: this.message, type: this.type });
        this.msgs = [...this.msglist];
    }
    staffExecuteQuery() {
        this.staffMemModel.staffId = this.staffId;
        const staffResult = this.oumpersdFactory.staffExecuteQuery(this.staffId);
        staffResult.subscribe(staffResultList => {
            if (staffResultList.length === 0) {
                this.staffData = [];
                this.type = 'warn';
                this.message = this.translateService.translate('common.querycausedReEnter');
                this.show();
                return;
            } else {
                this.staffData = staffResultList;
                this.staffIndex = 0;
            }
        });
    }
    /**
     *  This function will be executed when commit event is
    * fired
    */
    oumpersdSavestaffForm(event) {
        // TODO declare commit bean and add insert list to that object.
        this.staffUpdatetList = event.updated;
        this.staffCommitModel.updateList = [];
        if (this.staffUpdatetList.length > 0) {
            this.staffCommitModel.updateList = this.staffUpdatetList;
        }
        const staffSaveData = this.oumpersdFactory.staffCommit(this.staffCommitModel);
        staffSaveData.subscribe(data => {
            if (data === 1) {
                this.type = 'success';
                this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
                this.show();
                this.staffExecuteQuery();
                return;
            } else {
                this.type = 'warn';
                this.message = this.translateService.translate('common.addupdateremoverecordfailed');
                this.show();
                return;
            }
        });
    }

    onGridClear = () => {
        this.staffExecuteQuery();
        return true;
    }
    onExitBtnClick = () => {
        this.oumpersdFactory.backBtn = false;
        this.exitLaunchBtn = false;
        return true;
    }
}
