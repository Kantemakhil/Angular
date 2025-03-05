import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OumagyhtService } from '../service/oumagyht.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { AgencyLocationAmendments } from '../beans/AgencyLocationAmendments';
import { AgencyLocations } from '@sa/admin/beans/AgencyLocations';
// import required bean declarations

@Component({
   selector: 'app-oumagyht',
   templateUrl: './oumagyht.component.html'
})

export class OumagyhtComponent implements OnInit {
   // Variable declaration
   msgs: any[] = [];
   agylocData: AgencyLocations[] = [];
   agylocIndex = 0;
   agylocamData: AgencyLocationAmendments[] = [];
   agylocAmModel: AgencyLocationAmendments = new AgencyLocationAmendments();
   agylocamIndex = 0;
   agencyLocationsColumnDef: any[];
   agyLocAmColumnDef: any[];
   msglist: any[];
   message: any;
   type: any;
   agyLocIndex = -1;
   tableIndex = -1;
   constructor(private oumagyhtFactory: OumagyhtService, public translateService: TranslateService,
      public sessionManager: UserSessionManager) {
      // TODO initilize data members here..!
      this.agyLocAmColumnDef = [];
      this.agencyLocationsColumnDef = [];
   }
   ngOnInit() {
      this.agencyLocationsColumnDef = [
         { fieldName: this.translateService.translate('common.code'), field: 'agyLocId', editable: false, width: 150 },
         { fieldName: this.translateService.translate('common.description'), field: 'description', editable: false, width: 150 },
      ];
      this.agyLocAmColumnDef = [
         { fieldName: this.translateService.translate('oumagyht.field'), field: 'field', editable: false, width: 150 },
         { fieldName: this.translateService.translate('oumagyht.updatedFrom'), field: 'originalValue', editable: false, width: 150 },
         { fieldName: this.translateService.translate('oumagyht.updatedTo'), field: 'newValue', editable: false, width: 150 },
         { fieldName: this.translateService.translate('oumagyht.updateDate'), field: 'amendDatetime', datatype: 'date',
            editable: false, width: 150 },
         { fieldName: this.translateService.translate('oumagyht.byUser'), field: 'amendUser', editable: false, width: 150 },
      ];

      this.agyLocExecuteQuery();
   }
   /**
   * This function displays the messages
   */
   show() {
      this.msglist = [];
      this.msglist.push({ message: this.message, type: this.type });
      this.msgs = [...this.msglist];
   }

   agyLocExecuteQuery() {
      const serviceObj = this.oumagyhtFactory.
         agyLocExecuteQuery();
      serviceObj.subscribe(data => {
         if (data && data.length > 0) {
            this.agylocData = data;
            this.agyLocIndex = 0;
         } else {
            this.agylocData = [];
            this.agylocamData = [];
         }
      });
   }

   agyLocAmExecuteQuery() {
      const agylocamResult = this.oumagyhtFactory.
         agyLocAmExecuteQuery(this.agylocAmModel);
      agylocamResult.subscribe(agylocamResultList => {
         if (agylocamResultList && agylocamResultList.length > 0) {
            this.agylocamData = agylocamResultList;
            this.tableIndex = 0;
         } else {
            this.agylocamData = [];
         }
      });
   }

   onRowClickAgyLocs(event) {
      if (event && event.agyLocId) {
         this.agylocAmModel = new AgencyLocationAmendments();
         this.agylocAmModel.agyLocId = event.agyLocId;
         this.agyLocAmExecuteQuery();
      } else {
         this.agylocamData = [];
      }
   }
}
