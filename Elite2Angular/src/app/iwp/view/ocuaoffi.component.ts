import { Component, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OcuaoffiService } from '../service/ocuaoffi.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { DialogComponent } from '@ui-components/dialog/dialog.component';
import { StaffMembersV2 } from '../beans/StaffMembersV2';

@Component({
   selector: 'app-ocuaoffi',
   templateUrl: './ocuaoffi.component.html'
})

export class OcuaoffiComponent implements OnInit {
   @ViewChild('dialog', { static: true }) dialog: DialogComponent;
   @ViewChild('planGrid', { static: true }) planGrid: any;
   msgs: any[] = [];
   addstaffData: StaffMembersV2[] = [];
   addstaffModel: StaffMembersV2 = new StaffMembersV2();
   editable: boolean;
   selectBtnDis: boolean;
   activeOfficersColumnDef: any[];
   selectedActiveOfficerData: StaffMembersV2 = new StaffMembersV2();
   tableIndex = -1;
   constructor(private ocuaoffiFactory: OcuaoffiService, public translateService: TranslateService,
      public sessionManager: UserSessionManager) {
      this.activeOfficersColumnDef = [];
   }
   ngOnInit() {
      
      this.activeOfficersColumnDef = [
         {
            fieldName: this.translateService.translate('ocuaoffi.lastname'), field: 'lastName', editable: false,
            width: 150, datatype: 'text'
         },

         {
            fieldName: this.translateService.translate('ocuaoffi.firstname'), field: 'firstName',
            editable: false, width: 150, datatype: 'text'
         },

         {
            fieldName: this.translateService.translate('ocuaoffi.userid'), field: 'userId', editable: false,
            width: 150, datatype: 'text'
         },

         {
            fieldName: this.translateService.translate('ocuaoffi.birthdate'), field: 'birthdate', editable: false,
            width: 150, datatype: 'date'
         },

         {
            fieldName: this.translateService.translate('ocuaoffi.position'), field: 'position', editable: false,
            width: 150, datatype: 'lov', domain: 'STAFF_POS'
         },

         {
            fieldName: this.translateService.translate('ocuaoffi.role'), field: 'role', editable: false,
            width: 150, datatype: 'lov', domain: 'STAFF_ROLE'
         },

         {
            fieldName: this.translateService.translate('ocuaoffi.scheduletype'), field: 'scheduleType',
            editable: false, width: 150, datatype: 'lov', domain: 'SCHEDULE_TYP'
         },

         {
            fieldName: this.translateService.translate('ocuaoffi.hoursweek'), field: 'hoursPerWeek',
            editable: false, width: 150, datatype: 'number'
         },
      ];
      this.activeOfficersExecuteQuery();
      this.selectBtnDis = true;
   }
   show(vldmsg, type?) {
      type = type ? type : 'warn';
      vldmsg = this.translateService.translate(vldmsg);
      const msgval = [{ message: vldmsg, type: type }];
      this.msgs = [...msgval];
   }
   onRowClickaddstaff(event) {
      this.selectedActiveOfficerData = event;
   }
   onButSelectclick() {
      this.dialog.close(this.selectedActiveOfficerData);
   }
   onButCancelclick() {
      this.dialog.close(null);
   }
   activeOfficersExecuteQuery() {
      const queryParams = {
         sacStaffId: this.dialog.data.staffId,
         calAgyLocId: this.dialog.data.agyLocId
      };
      const addstaffResult = this.ocuaoffiFactory.addStaffExecuteQuery(queryParams);
      addstaffResult.subscribe(data => {
         if (data.length === 0) {
            this.selectBtnDis = true;
            this.addstaffData = [];
         } else {
            this.selectBtnDis = false;
            this.addstaffData = data;
            this.tableIndex = 0;
         }
      });
   }

   selectDisabled(){
      if(this.addstaffData.length>0){
         return false;
      }else{
         return true;
      }
   }
}
