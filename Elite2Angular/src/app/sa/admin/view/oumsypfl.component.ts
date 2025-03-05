import { Component, OnInit
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OumsypflService } from '@sa/admin/service/oumsypfl.service';
import { SystemProfiles } from '@commonbeans/SystemProfiles';
import { SystemProfilesCommitBean } from '@saadminbeans/SystemProfilesCommitBean';
import { DateFormat } from '@ui-components/datepicker/dateFormat';
@Component({
    selector: 'app-oumsypfl',
    templateUrl: './oumsypfl.component.html'
})

export class OumsypflComponent implements OnInit {
    actionName: string;
    lovModel: any[];
    msgs: any[] = [];
    nameOfLovPage: string;
    listToCompare: any[] = [];
    sysPflData: SystemProfiles[] = [];
    sysPflDataTemp: SystemProfiles[] = [];
    sysPflModel: SystemProfiles = new SystemProfiles();
    sysPflModelBean: SystemProfiles = new SystemProfiles();
    sysPflModelTemp: SystemProfiles = new SystemProfiles();
    syspflIndex: number;
    sysPflCommitModel: SystemProfilesCommitBean = new SystemProfilesCommitBean();
    sysPflInsertList: SystemProfiles[] = [];
    sysPflUpdatetList: SystemProfiles[] = [];
    sysPflDeleteList: SystemProfiles[] = [];
    minDate: Date;
    display: boolean;
    errorMessage: string;
    headerMessage: string;
    disabled: boolean;
    editable: boolean;
    sysPflColumnDef: any[];
    sysPflReadOnly: boolean;
    cgfkSyspflprofiletypeRg: any[] = [];
    msglist = [];
    message = ' Invalid.';
    type = 'error';
    updateble: boolean;
    insertable: boolean;
    deleteble: boolean;
    constructor(private oumsypflFactory: OumsypflService, public translateService: TranslateService) {
       this.sysPflColumnDef = [];

    }
    ngOnInit() {
        
        this.updateble = true;
        this.insertable = true;
        this.deleteble = true;
        this.sysPflColumnDef = [
            { fieldName: this.translateService.translate('oumsypfl.profiletype') + '*',
               field: 'profileType', cellEditable: this.canProfileTypeEdit, datatype: 'lov', maxLength: 12,
               domain: 'PROFILE_TYPE', codeTitle: 'Profile Type', optionWidth: 350, editable: true, width: 250 },
            { fieldName: this.translateService.translate('oumsypfl.profilecode') + '*',
               field: 'profileCode', cellEditable: this.canProfileCodeEdit, datatype: 'text', maxlength: 12, editable: true, width: 250 },
            { fieldName: this.translateService.translate('common.description'), field: 'description', datatype: 'text', uppercase: 'false',
             maxlength: 80, editable: true, width: 250 },
            { fieldName: this.translateService.translate('oumsypfl.value'), field: 'profileValue',
             datatype: 'text', uppercase: 'false', maxlength: 100, editable: true, width: 250 },
            { fieldName: this.translateService.translate('oumsypfl.value2'), field: 'profileValue2',
             datatype: 'text', uppercase: 'false', maxlength: 100, editable: true, width: 250 }
        ];
        this.sysPflExecuteQuery();
    }
    onRowClicksyspfl(event) {
        if (event) {
            this.sysPflModelBean = event;
            if (event.createDateTime) {
                this.deleteble = true;
            } else {
                this.deleteble = false;
            }
        } else {
            this.deleteble = false;
        }
    }
    /*
     * This method is used to get the data from SystemProfiles Table
     */
    sysPflExecuteQuery() {
    this.sysPflModelTemp = new SystemProfiles();
     const syspflResult = this.oumsypflFactory.sysPflExecuteQuery(this.sysPflModelTemp);
         syspflResult.subscribe(syspflResultList => {
             if (syspflResultList.length === 0) {
                this.type = 'warn';
                this.message = this.translateService.translate('common.querycaused');
                this.show();
                 this.sysPflData = [];
            } else {
                this.sysPflData = syspflResultList;
                this.syspflIndex = 0;
                this.sysPflModel = syspflResultList[0];
                this.sysPflModelTemp = new SystemProfiles();
            }
        });
    }
    sysPflClearQuery() {
        this.sysPflData = [];
        this.sysPflModel = new SystemProfiles();
        this.syspflIndex = -1;
        this.sysPflModelBean = new SystemProfiles();
    }
    /*
    * Used to show validation messages,when click on Add button more than once with out giving mandatory fields
     */
    onsysPflInsert = () => {
    if (this.sysPflData.length > 0) {
           if (!this.sysPflData[this.sysPflData.length - 1].profileType) {
                this.type = 'warn';
                this.message = this.translateService.translate('oumsypfl.fieldmust');
                this.show();
                return;
            }
            if (!this.sysPflData[this.sysPflData.length - 1].profileCode) {
                this.type = 'warn';
                this.message = this.translateService.translate('oumsypfl.profilecodemust');
                this.show();
                return;
            }
        }
        return {
            minDate: DateFormat.getDate(), profileType: undefined
        };
    }
    /*
     * This event is fired when click on Remove button in Grid
     * If you add the row with out giving mandatory fields in the grid ,
     * select the row to remove the record  and click on Remove ,This event show the validations like field must be entered.
     */
    onsysPflDelete = () => {
        if (!this.sysPflData[this.sysPflData.length - 1].profileCode) {
            this.type = 'warn';
            this.message = this.translateService.translate('oumsypfl.fieldmust');
            this.show();
            return false;
        } else if (!this.sysPflData[this.sysPflData.length - 1].profileType) {
            this.type = 'warn';
            this.message = this.translateService.translate('oumsypfl.fieldmust');
            this.show();
            return false;
        } else {
            return true;
        }
    }
    /*
     * This function executed to disable ProfileType column in the Grid
     */
     canProfileTypeEdit = (data: any, index: number, field: string): boolean => {

    if (!data.createDateTime) {
            return true;
        }
       return false;
    }

    /*
    * This function executed to disable ProfileCode column in the Grid
    */
    canProfileCodeEdit = (data: any, index: number, field: string): boolean => {
       if (!data.createDateTime) {
            return true;
        }
        return false;
     }
    /**
     * This event is fired when click on Save in Grid.
     * Used to do the Insert,update and delete operations in the System Profiles table
     */
    savesysPflForm(event) {
        if(!this.isValidDateFormat()){
            return;
        }
        this.sysPflInsertList = [];
        this.sysPflUpdatetList = [];
        this.sysPflDeleteList = [];
        this.sysPflInsertList = event.added;
        event.updated.forEach(element => {
        if (element.createDateTime) {
                 this.sysPflUpdatetList.push(element);
            } else {
                 this.sysPflInsertList.push(element);
            }
        });
        this.sysPflDeleteList = event.removed;
        this.sysPflCommitModel.insertList = [];
        this.sysPflCommitModel.updateList = [];
        this.sysPflCommitModel.deleteList = [];
        if (this.sysPflDeleteList.length > 0) {
            this.sysPflCommitModel.deleteList = this.sysPflDeleteList;
        }
        if (this.sysPflUpdatetList.length > 0) {
            for (let i = 0; i < this.sysPflUpdatetList.length; i++) {
                if (this.sysPflUpdatetList[i].profileType === 'CLIENT' && this.sysPflUpdatetList[i].profileCode === 'SMTP_USER_PS') {
                    if ((this.sysPflUpdatetList[i].profileValue.length) > 14) {
                        this.type = 'warn';
                        this.message = this.translateService.translate('oumsypfl.maxcharacters');
                        this.show();
                        return;
                    }
            }
                if (this.sysPflUpdatetList[i].profileType === 'CLIENT' &&
                this.sysPflUpdatetList[i].profileCode === 'SMTP_AUTH' ) {
                    if (this.sysPflUpdatetList[i].profileValue.length === 1 ||
                         this.sysPflUpdatetList[i].profileValue.replace(/\s/g, '').length === 0) {
                        if (this.sysPflUpdatetList[i].profileValue.includes('Y') || this.sysPflUpdatetList[i].profileValue.includes('N') ||
                        this.sysPflUpdatetList[i].profileValue.replace(/\s/g, '').length === 0) {
                        } else {
                            this.type = 'warn';
                            this.message = this.translateService.translate('oumsypfl.onlyynallowed');
                            this.show();
                            return;
                        }
                    } else {
                        this.type = 'warn';
                        this.message = this.translateService.translate('oumsypfl.onlyynallowed');
                        this.show();
                        return;

                    }

                }
            }
        }
        this.sysPflCommitModel.updateList = this.sysPflUpdatetList;

        if (this.sysPflInsertList.length > 0) {
			let insFlag = true;
        for (let i = 0; i < this.sysPflInsertList.length; i++) {
        if (!this.sysPflInsertList[i].profileType) {
                this.type = 'warn';
                this.message = this.translateService.translate('oumsypfl.fieldmust');
                this.show();
                return;
            }
            if (!this.sysPflInsertList[i].profileCode) {
                this.type = 'warn';
                this.message = this.translateService.translate('oumsypfl.profilecodemust');
                this.show();
                return;
            }

            const index=this.sysPflData.indexOf(this.sysPflInsertList[i]);
            for(let j=0;j<this.sysPflData.length;j++){
                if(index != j && this.sysPflData[j].profileType === this.sysPflInsertList[i].profileType && this.sysPflData[j].profileCode === this.sysPflInsertList[i].profileCode){
                    this.type = 'warn';
                    this.message = this.translateService.translate('oumsypfl.profilealreadyexists');
                    this.show();
                    return; 
                }
            }
        if (this.sysPflInsertList[i].profileType === 'CLIENT' && this.sysPflInsertList[i].profileCode === 'SMTP_USER_PS') {
            if ((this.sysPflInsertList[i].profileValue.length) > 14) {
                this.type = 'warn';
                this.message = this.translateService.translate('oumsypfl.maxcharacters');
                this.show();
                return;
            }
          }
             this.sysPflModelTemp = new SystemProfiles();
             this.sysPflModelTemp = this.sysPflInsertList[i];
             const syspflResult = this.oumsypflFactory.getSystemProfileRecords(this.sysPflModelTemp);
             syspflResult.subscribe(syspflList => {
                    if (syspflList.length === 0) {
                        insFlag = false
                    }
                });
            }
            if (insFlag) { 
             this.sysPflCommitModel.insertList = this.sysPflInsertList;
             const syspflSaveData = this.oumsypflFactory.sysPflCommit(this.sysPflCommitModel);
                syspflSaveData.subscribe(syspflSaveResult => {
                 if (syspflSaveResult === 'UpdateProfileError') {
                     this.type = 'error';
                     this.message = this.translateService.translate('oumsypfl.errorupdateprofilevalue');
                     this.show();
                     this.sysPflExecuteQuery();
                }
                     if (syspflSaveResult === 'InsertProfileError') {
                         this.type = 'error';
                         this.message = this.translateService.translate('oumsypfl.errorinsertprofilevalue');
                         this.show();
                         this.sysPflExecuteQuery();
                    }
                 if (syspflSaveResult == '1') {
                     this.type = 'success';
                     this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
                     this.show();
                     this.sysPflExecuteQuery();
                  } else {
                     this.type = 'error';
                     this.message = this.translateService.translate('common.addupdateremoverecordfailed');
                     this.show();
                     this.sysPflExecuteQuery();
                }
             });
            } else {
                    this.type = 'warn';
                    this.message = this.translateService.translate('oumsypfl.profilealreadyexists');
                    this.show();
                    this.sysPflModelTemp = new SystemProfiles();
                    return;
                }
       } else {
        const syspflSaveData = this.oumsypflFactory.sysPflCommit(this.sysPflCommitModel);
        syspflSaveData.subscribe(syspflSaveResult => {
            if (syspflSaveResult == '1') {
                this.type = 'success';
                this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
                this.show();
                this.sysPflExecuteQuery();
             } else {
                this.type = 'error';
                this.message = this.translateService.translate('common.addupdateremoverecordfailed');
                this.show();
                this.sysPflExecuteQuery();
           }
        });
    }
    }
    /**
    * To display the messages
    */
    show() {
        this.msglist = [];
        this.msglist.push({ message: this.message, type: this.type });
        this.msgs = [...this.msglist];
    }
    get clrdisabled() {
        if(this.sysPflData.length > 0 && this.sysPflModelBean.createDateTime) {
            return false;
        } else if(this.sysPflData.length > 0 && !this.sysPflModelBean.createDateTime &&
            (this.sysPflModelBean.profileType || this.sysPflModelBean.profileCode || this.sysPflModelBean.description ||
                this.sysPflModelBean.profileValue || this.sysPflModelBean.profileValue2)) {
          return false;
        } else {
            return true;
        }
    }
    get retrDisabled () {
        if(this.sysPflData.length > 0 && this.sysPflData[0].createDateTime) {
            return true;
        } else {
            return false;
        }
    }
    
    updateCache(){
        const serviceObj=this.oumsypflFactory.systemProfileDataUpdate();
        serviceObj.subscribe(data=>{
            if(data==1){
                this.type = 'success';
                this.message = this.translateService.translate('oumsypfl.cacheupdatesuccess');
                 this.show();
            }
        });
  
      }

      isValidDateFormat() {
        for (let i = 0; i < this.sysPflData.length; i++) {
            if (this.sysPflData[i].profileCode == 'DATE' && this.sysPflData[i].profileType == "DISPLAY") {
                let value = this.sysPflData[i].profileValue;
                let occOfSlash = (value.match(new RegExp("/", "g")) || []).length;
                let occOfDash = (value.match(new RegExp("-", "g")) || []).length;
                let occOfUnderscore = (value.match(new RegExp("_", "g")) || []).length;
                if (occOfSlash == 1 || occOfDash == 1 || occOfUnderscore > 0) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('oumsypfl.invaliddateformat');
                    this.show();
                    return false;
                }
            }
        }
        return true;
    }

}
