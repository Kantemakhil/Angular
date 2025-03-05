import { Component,
  OnInit,
  ViewChild } from '@angular/core';
import { OidincdeService } from '../service/oidincde.service';
import { TranslateService } from '@common/translate/translate.service';
import { DialogComponent } from '@ui-components/dialog/dialog.component';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { StaffMembers } from '@instincidentsbeans/StaffMembers';
import { IncidentSearchService } from '../service/incident-search.service';
@Component({
selector: 'app-oidincdeStaffPopup',
templateUrl: './oidincdeStaffPop.component.html'

})
export class OidincdeStaffPopUpComponent implements OnInit {
  @ViewChild('dialog', {static: true}) dialog: DialogComponent;
  staffColumnDefpopup: any[];
  staffMembers: StaffMembers = new StaffMembers();
  staffMembersModel: StaffMembers[] ;
  caseLoadId: any;
  staffIdDes: any;
  selected = -1;
  agyLocId: any;
constructor(private oidincdeFactory: OidincdeService,
  public translateService: TranslateService,
  private sessionManager: UserSessionManager,private internalSerach:IncidentSearchService) {
  }

ngOnInit() {
 this.caseLoadId = this.sessionManager.currentCaseLoad;
 this.agyLocId = this.dialog.data.agyLocId;
 this.staffColumnDefpopup = [];
 this.staffColumnDefpopup = [
     {
         fieldName: 'Name', field: 'description',
         editable: true, width: 250, filter: 'text', datatype: 'text'
     },
     {
       fieldName: 'Staff Id', field: 'staffId',
       editable: true, width: 250, filter: 'text', datatype: 'number'
   },
     ];
   const agyincpartiesstaffResult = this.oidincdeFactory.
   rgRoleStaffIdsRecordGroup( this.caseLoadId,this.agyLocId);
 agyincpartiesstaffResult.subscribe(agyincpartiesstaffResultLists => {
     if (agyincpartiesstaffResultLists.length === 0) {
      this.staffMembersModel = [] ;
     } else {
       this.staffMembersModel = agyincpartiesstaffResultLists;
       this.selected = 0;
     }
 });

  }
onRowClickEvent(event) {
this.staffIdDes = event.description;
this.oidincdeFactory.staffId = event.code;
console.log(this.oidincdeFactory.staffId);
this.internalSerach.setStaffId(event.code);
 }
getData() {
 this.dialog.close({
   staffIdDes:  this.staffIdDes,
   staffCode: this.oidincdeFactory.staffId,
 });
}
clearData() {
  this.dialog.close( null );
 }
}
