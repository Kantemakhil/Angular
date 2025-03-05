import { Component, OnInit, ViewChild} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OiiinrolService } from '../service/oiiinrol.service';
import { DialogComponent } from '@ui-components/dialog/dialog.component';
import { OiiprollService } from '../service/oiiproll.service';

@Component({
   selector: 'app-oiiinrol',
   templateUrl: './oiiinrol.component.html'
})

export class OiiinrolComponent implements OnInit {
   @ViewChild('dialog', {static: true}) dialog: DialogComponent;
   msgs: any[] = [];
   rolllistData: any[] = [];
   rollListColumnDef: any[];
   internalLocationDesc: string;
   internalLocationCode: string;
   agyLocId: string;
   inLocation: number;
   internalLocationID: number;
   constructor(private oiiinrolFactory: OiiinrolService,
            private translateService: TranslateService, private oiiprollFactory: OiiprollService) {
   this.rollListColumnDef = [];
   }

   ngOnInit() {
      if (this.dialog) {
      const dialogData = this.dialog.data;
      if (dialogData) {
         if (dialogData.internalLocationId) {
            this.internalLocationID = dialogData.internalLocationId;
         }
         if (dialogData.internalLocationCode) {
            this.internalLocationDesc = dialogData.agyLocId + '-' + dialogData.internalLocationCode;
         }
         if (dialogData.userDesc) {
            this.internalLocationCode = dialogData.userDesc;
         }
         if (dialogData.inLocations) {
            this.inLocation = dialogData.inLocations;
         }
         if (dialogData.agyLocId) {
            this.agyLocId = dialogData.agyLocId;
         }
      }
   }

   this.rollListColumnDef = [
      { fieldName: this.trMsg('system-profile.off-id-code'), field: 'offenderIdDisplay', editable: false, width: 150},
      { fieldName: this.trMsg('common.lastname'), field: 'lastName', editable: false, width: 150},
      { fieldName: this.trMsg('oiiinrol.givenname'), field: 'firstName', editable: false, width: 150},
      { fieldName: this.trMsg('oiiinrol.housinglocation'), field: 'livingUnitDesc', editable: false, width: 150},
      { fieldName: this.trMsg('oiiinrol.activealert'), field: 'alertFlag', datatype: 'checkbox', editable: false, width: 150},
   ];
   this.rolllistExecuteQuery();
   }
   allowNumbers( event ) {
   }
   onRowClickrolllist(event) {
   }
    ok() {
   }
    no() {
   }
    cancel() {
       this.dialog.close(null);
   }
   onOffenderChange(offender) {
   }
   rolllistExecuteQuery() {
             const rolllistResult = this.oiiprollFactory.
             rollListExecuteQuery1(this.agyLocId, this.internalLocationID);
                rolllistResult.subscribe(rolllistResultList => {
               if (rolllistResultList.length === 0) {
                  this.rolllistData = [];
               } else {
                  rolllistResultList.forEach(element => {
                     element.alertFlag = element.alertFlag === 'Y' ? 'Y' : undefined;
                  });
                  this.rolllistData = rolllistResultList;
               }
            });
         }

   trMsg(msg, astr?) {
      return astr ? this.translateService.translate(msg).concat(astr) : this.translateService.translate(msg);
   }


}
