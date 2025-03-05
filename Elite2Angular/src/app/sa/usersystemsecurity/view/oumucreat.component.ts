import { OumucreatService } from '@sa/usersystemsecurity/service/oumucreat.service';
import {
    Component, OnInit
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { Router } from '@angular/router';
import { PasswordComponent } from '@core/ui-components/password/password.component';
import { UserCreation } from '@sa/usersystemsecurity/beans/UserCreation';
import { StaffAccessibleCaseloads } from '../beans/StaffAccessibleCaseloads';
import { StaffMemberRoles } from '../beans/StaffMemberRoles';
import { OumusersService } from '../service/oumusers.service';
import { SystemProfiles } from '@common/beans/SystemProfiles';
import { OumsypflService } from '@sa/admin/service/oumsypfl.service';
import { DialogService } from '@core/ui-components/dialog/dialog.service';
@Component({
    selector: 'app-oumucreat',
    templateUrl: './oumucreat.component.html',
    styleUrls: ['./oumucreat.component.css']
})

export class OumucreatComponent implements OnInit {
    readonlyOldFlag = true;
    user: any;
    actionName: string;
    msgs: any[] = [];
    display: boolean;
    name: string;
    address: string;
    addressOne: string;
    addressTwo: string;
    userDto: UserCreation = new UserCreation();
    disSaveBtn = false;
    public mode: string;
    public selectAllText: string
    caseLoadlovData: StaffAccessibleCaseloads[] = [];
    rolesLovData: StaffMemberRoles[] = [];
    staffMemberRoles :StaffMemberRoles=new StaffMemberRoles();
    staffMemberRolesList : StaffMemberRoles[] = [];

    staffMemberUserList: any[]=[];
    public fields: Object = { text: 'description', value: 'caseloadId' };
    public roleLovFields: Object = { text: 'roleName', value: 'roleId' };
    public waterMark: string = 'User Group Access';    
    public default : string = 'CheckBox';
    public placeholder: string = 'Case Load Access';
    roleMap: Map<string, string> = new Map<string, string>();
    userType: { code: string; description: string; }[];
    isAd: boolean;
    insightDisabled: boolean = true;
    sysPflModelTemp: SystemProfiles = new SystemProfiles();
    groupsDisable: boolean = true;
    
    constructor(private oumucreatFactory: OumucreatService,
        public translateService: TranslateService,
         public sessionManager: UserSessionManager,
         private router: Router,
         private oumsypflFactory: OumsypflService,
         public dialogService: DialogService,
         private oumusersFactory: OumusersService) {
    }
    ngOnInit() {
        this.sysPflExecuteQuery();
        this.mode = 'CheckBox';
    // set the select all text to MultiSelect checkbox label.
         this.selectAllText= 'Select All';
        const rgStaffAcCaseloadIdServiceObj = this.oumusersFactory.rgStaffAcCaseloadIdRecordGroup();
        rgStaffAcCaseloadIdServiceObj.subscribe(rgStaffAcCaseloadIdList => {
          this.caseLoadlovData = rgStaffAcCaseloadIdList;
        });
        const rgStaffMemberRolesRoleServiceObj = this.oumusersFactory.rgStaffMemberRolesRoleRecordGroup();
        rgStaffMemberRolesRoleServiceObj.subscribe(rgStaffMemberRoleList => {
            rgStaffMemberRoleList.forEach(element => {
                if (element.roleName) {
                    element.description = element.roleName;
                }
                this.roleMap.set(element.roleId, element.roleCode);
            });
            this.rolesLovData = rgStaffMemberRoleList;


        });
         
        this.userType = [
            { code: 'AD', description: 'Active Directory'},
            { code: 'NAD', description: 'Non Active Directory'}
         ];
         this.isAd = true;
         this.userDto.userType = 'NAD';
    }

    /**
   * This function displays the messages
   */
    show(vldmsg, type?) {
        type = type ? type : 'warn';
        vldmsg = this.translateService.translate(vldmsg);
        const msgval = [{ message: vldmsg, type: type }];
        this.msgs = [...msgval];
    }

    changeUserType(event) {
        if (event) {
            if (event.code == 'NAD') {
                this.isAd = true;
            } else {
                this.isAd = false;
            }
        } else {
            this.isAd = true;
        }
     }

    userValidations() {
        
        if (!this.userDto.userType) {
            this.show("Please enter " + this.translateService.translate('oumucreat.usertype'));
            return false;
        }

        if (!this.userDto.mailId && this.isMailrequired()) {
            this.show(this.translateService.translate('oumucreat.validmailid'));
            return false;
        }

        if (!this.userDto.personnelType) {
            this.show(this.translateService.translate('oumucreat.personaltypemust'));
            return false;
        }

        if (!this.userDto.userName || (this.userDto.userName && !this.userDto.userName.trim())) {
            this.show(this.translateService.translate('oumucreat.usernamemust'));
            return false;
        }

        if (this.userDto.userName && this.userDto.userName.trim() == "0") {
            this.show(this.translateService.translate('oumucreat.validuser'));
            return false;
        }

        if (!this.userDto.assignedCaseloadId) {
            this.show(this.translateService.translate('oumucreat.assignedcaseloadmust'));
            return false;
        }

        if (!this.userDto.lastName || (this.userDto.lastName && !this.userDto.lastName.trim())) {
            this.show(this.translateService.translate('oumucreat.lastnamemust'));
            return false;
        }

        if (!this.userDto.status) {
            this.show(this.translateService.translate('oumucreat.statusmust'));
            return false;
        }

        if (!this.userDto.firstName || (this.userDto.firstName && !this.userDto.firstName.trim())) {
            this.show(this.translateService.translate('oumucreat.firstname'));
            return false;
        }

        if (!this.userDto.caseLoadList || this.userDto.caseLoadList.length <= 0) {
            this.show(this.translateService.translate('oumucreat.caseloadaccessmust'));
            return false;
        }

        if (this.userDto.userType == 'NAD') {
            if (!this.userDto.passWord && this.userDto.userType == 'NAD') {
                this.show(this.translateService.translate('oumucreat.passwordmust'));
                return false;
            }

            if (!this.isValidatePassword(this.userDto.passWord)) {
                this.show(this.translateService.translate('oumucreat.validpassword'));
                return false;
            }
        }

        if (!this.staffMemberUserList || this.staffMemberUserList.length <= 0) {
            this.show(this.translateService.translate('oumucreat.useraccessmust'));
            return false;
        }

        if (this.userDto.userType == 'NAD') {
            if (!this.userDto.passWordRepeat) {
                this.show(this.translateService.translate('oumucreat.passwordrepeatmust'));
                return false;
            }

            if (!this.isValidatePassword(this.userDto.passWordRepeat)) {
                this.show(this.translateService.translate('oumucreat.validconfirmpassword'));
                return false;
            }

            if (this.userDto.passWord && this.userDto.passWordRepeat && this.userDto.passWord.trim() !== this.userDto.passWordRepeat.trim()) {
                this.show(this.translateService.translate('oumucreat.passwordequal'));
                return false;
            }
        }

        if(this.userDto.insightUserFlag == 'Y') {
            if(this.userDto.insightsGropId == undefined || this.userDto.insightsGropId == null) {
                this.show(this.translateService.translate('oumucreat.pleaseselectinsightsgroupid'));
                return false;
            }
        }

        if(this.userDto.insightsGropId != undefined && this.userDto.insightsGropId != null) {
            if(this.userDto.insightUserFlag == undefined || this.userDto.insightUserFlag == 'N'  ) {
                this.show(this.translateService.translate('oumucreat.pleasechecktheinsightaccess'));
                return false;
            }
        }

        return true;
    }

    isValidatePassword(value) {
        const regex = new RegExp(PasswordComponent._passwordRegx);
        const valid = regex.test(value);
        return valid;
    }

    checkUserExist(){
      if(this.userDto.userName && this.userDto.userName.trim()){
        const result = this.oumucreatFactory.getUserDetails(this.userDto.userName.trim());
        result.subscribe(result => {
            if (result === 1) {
                this.show('User ID taken ','error');
                this.disSaveBtn=true;
            } else {
                this.disSaveBtn = false;
            }
        });

      }
        
    }
    checkEmail() {
        this.oumucreatFactory.verifyEmailId(this.userDto.mailId).subscribe(data=>{
            if(data) {
                this.show(this.translateService.translate('common.emailmustbeunique'));
            } else {
                this.createUser();
            }
        });
    }
    createUser() {
        if(!this.userValidations()){
            return;
        }
        this.userDto.defaultTableSpace='USERS';
        this.userDto.tempTableSpace='TEMP';
        this.userDto.grantUserName=PasswordComponent._grantUser;
        this.userDto.userName=this.userDto.userName.trim();
        if(this.staffMemberUserList && this.staffMemberUserList.length>0){
            this.staffMemberUserList.forEach(obj=>{
                this.staffMemberRoles=new StaffMemberRoles();
                this.staffMemberRoles.roleId = obj;
                this.staffMemberRoles.roleCode = this.roleMap.get(obj);
                this.staffMemberRolesList.push(this.staffMemberRoles);
            })

        }
         if(this.userDto.caseLoadList && this.userDto.caseLoadList.length >0){
            if(!this.userDto.caseLoadList.includes(this.userDto.assignedCaseloadId)){
                this.userDto.caseLoadList.push(this.userDto.assignedCaseloadId);
            }
            

        }
        this.userDto.roleAccessList=this.staffMemberRolesList;
        const saveResult = this.oumucreatFactory.createUser(this.userDto);
        saveResult.subscribe(result => {
            if (result === 1) {
                this.show(this.translateService.translate('common.addupdateremoverecordsuccess'), 'success');
                setTimeout(() => {
                    this.router.navigate(["OUMPERSO"], { queryParams: { userName:  this.userDto.userName.trim() } });
                }, 2000);
            } 
            else if (result === 2) {
                const data = {
					label: this.translateService.translate('oumucreat.faildtoassigninsightaccess'),  yesBtn: true, yesLabel: this.translateService.translate('common.ok')
				};
				this.dialogService.openLinkDialog('/ocucoffeconfirmbox', data, 50).subscribe(result => {
                    if(result) {
                        this.router.navigate(["OUMPERSO"], { queryParams: { userName:  this.userDto.userName.trim() } });
                    }
				});
            } 
            else {
                this.show('oumucreat.usercreateerror');
            }
        });

    }

    clear() {
        this.userDto = new UserCreation();
    }
    isMailrequired() {
        
        return (this.userDto && this.userDto.userType == "AD") || (this.userDto.insightUserFlag == 'Y');
    }

    onClickInsightUser(event) {
        if (event) {
            if (event.checked) {
                this.groupsDisable = false;
                this.userDto.insightUserFlag = 'Y';
            } else {
                this.groupsDisable = true;
                this.userDto.insightsGropId = [];
                this.userDto.insightUserFlag = 'N';
            }

        }
    }
    sysPflExecuteQuery() {
        this.sysPflModelTemp = new SystemProfiles();
        const syspflResult = this.oumsypflFactory.sysPflGetInsightMode();
        syspflResult.subscribe(syspflResultList => {
          for(let i = 0; i < syspflResultList.length; i++) {
                if(syspflResultList[i].profileCode == 'INSIGHT_MODE'){
                    if(syspflResultList[i].profileValue == 'Y'){
                        this.insightDisabled = false;
                    } else {
                        this.insightDisabled = true;
                    }
                }
            }
        });
    }
}
