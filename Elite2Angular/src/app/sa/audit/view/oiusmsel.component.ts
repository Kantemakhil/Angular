import {
   Component, OnInit,
   ViewChild
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OiusmselService } from '../service/oiusmsel.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { StaffMembers } from '@inst/incidents-oic/beans/StaffMembers';
import { DialogService } from '@core/ui-components/dialog/dialog.service';
import { DialogComponent } from '@core/ui-components/dialog/dialog.component';
// import { StaffMembers } from '@common/StaffMembers';
// import required bean declarations

@Component({
   selector: 'app-oiusmsel',
   templateUrl: './oiusmsel.component.html'
})

export class OiusmselComponent implements OnInit {
   // Variable declaration
   actionName: string;
   lovModel: any[];
   msgs: any[] = [];
   nameOfLovPage: string;
   listToCompare: any[] = [];
   staffmembersData: StaffMembers[] = [];
   staffmembersDataTemp: StaffMembers[] = [];
   // TODO angular.copy(this.staffmembersData, thisstaffmembersDataTemp);
   staffmembersModel: StaffMembers = new StaffMembers();
   staffmembersNgModel: StaffMembers = new StaffMembers();
   staffmembersIndex = 0;
   staffmembersInsertList: StaffMembers[] = [];
   staffmembersUpdatetList: StaffMembers[] = [];
   staffmembersDeleteList: StaffMembers[] = [];
   @ViewChild('dialog', {static: true}) dialog: DialogComponent;
   minDate: Date;
   display: boolean;
   errorMessage: string;
   headerMessage: string;
   disabled: boolean;
   editable = true;
   staffMembersColumnDef: any[];
   ctrlBlockReadOnly = false;
   staffMembersReadOnly = false;
   rgr01Rg: any[] = [];
   staffmembers: StaffMembers = new StaffMembers();
   tableIndex = -1;
   clearDisabled: boolean;
   onloadlastName: boolean;
   onloadUserId: boolean;
   onloadFirstName: boolean;
   onloadStaffid: boolean;
   okDisabled: boolean;
   saveDisabled: boolean;
   fieldReadOnly: boolean;
   constructor(
      private oiusmselFactory: OiusmselService,
      public translateService: TranslateService,
      public sessionManager: UserSessionManager,
      public dialogService: DialogService) {
      // TODO initilize data members here..!
      this.staffMembersColumnDef = [];
   }
   ngOnInit() {
      this.okDisabled = true;
      this.onloadlastName = true;
      this.onloadUserId = true;
      this.onloadFirstName = true;
      this.onloadStaffid = true;
      this.staffMembersColumnDef = [
         { fieldName: this.translateService.translate('oiusmsel.lastname'), field: 'lastName', editable: false, maxlength: 35, width: 150 },
         { fieldName: this.translateService.translate('oiusmsel.firstname'), field: 'firstName', editable: false,
          maxlength: 35, width: 150 },
         { fieldName: this.translateService.translate('oiusmsel.staffid'), field: 'staffId', editable: false, maxlength: 6, width: 150 },
         { fieldName: this.translateService.translate('oiusmsel.userid'), field: 'userId', editable: false,  maxlength: 32, width: 150 },
      ];
      this.clearDisabled = true;
      this.saveDisabled = false;
      this.fieldReadOnly = false;
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

   onRowClickstaffmembers(event) {
      this.staffmembers = event;
   }

   staffmembersExecuteQuery() {
      this.staffmembersModel = this.staffmembersNgModel;
      const staffmembersResult = this.oiusmselFactory.staffMembersExecuteQuery(this.staffmembersModel);
      staffmembersResult.subscribe(staffmembersResultList => {
         if (staffmembersResultList.length === 0) {
            this.okDisabled = true;
            this.saveDisabled = false;
            this.fieldReadOnly = false;
            this.staffmembersData = [];
            this.show(this.translateService.translate('oiisched.norecords'), 'warn');
            return;
         } else {
            this.okDisabled = false;
            this.clearDisabled = false;
            this.saveDisabled = true;
            this.fieldReadOnly = true;
            this.staffmembersData = staffmembersResultList;
            this.staffmembersModel = staffmembersResultList[0];
            this.tableIndex = 0;
         }
      });
   }
   selectStaffMember() {
      this.dialog.close({
         'staffmembers': this.staffmembers
      });
   }
   lastNameChange(event) {
      if (event) {
         this.clearDisabled = false;
      }
   }
   firstNameChange(event) {
      if (event) {
         this.clearDisabled = false;
      }
   }
   staffidChange(event) {
      if (event) {
         this.clearDisabled = false;
      }
   }
   userIdChange(event) {
      if (event) {
         this.clearDisabled = false;
      }
   }
   cancel() {
      this.dialog.close(null);
   }
   clear() {
      this.staffmembersData = [];
      this.staffmembersNgModel = new StaffMembers();
      this.clearDisabled = true;
      this.saveDisabled = false;
      this.fieldReadOnly = false;
      this.okDisabled = true;
   }
   searchLaunchButtonClick() {
      this.staffmembersExecuteQuery();
   }
}
