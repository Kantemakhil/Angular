import {
   Component,
   OnInit,
   ViewChild
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OtusubadService } from '../service/otusubad.service';
// import { OffenderSubAcShadows } from '@commonbeans/OffenderSubAcShadows';
import { VTrustHeader } from '@inmate/beans/VTrustHeader';
import { DialogService } from '@ui-components/dialog/dialog.service';
import { DialogComponent } from '@ui-components/dialog/dialog.component';
import { OffenderSubAcShadows } from '@inmate/trust/trustaccounts/beans/OffenderSubAcShadows';
import { UserSessionManager } from '@core/classes/userSessionManager';

@Component({
   selector: 'app-otusubad',
   templateUrl: './otusubad.component.html'
})

export class OtusubadComponent implements OnInit {
   @ViewChild('dialog', {static: true}) dialog: DialogComponent;
   actionName: string;
   lovModel: any[];
   msgs: any[] = [];
   nameOfLovPage: string;
   listToCompare: any[] = [];
   vthaData: VTrustHeader[] = [];
   vthaDataTemp: VTrustHeader[] = [];
   vthaModel: VTrustHeader = new VTrustHeader();
   vthaIndex: number;
   vthaInsertList: VTrustHeader[] = [];
   vthaUpdatetList: VTrustHeader[] = [];
   vthaDeleteList: VTrustHeader[] = [];
   offsasData: any[] = [];
    offsasModel: OffenderSubAcShadows = new OffenderSubAcShadows();
   offsasIndex: number;
   minDate: Date;
   display: boolean;
   errorMessage: string;
   headerMessage: string;
   disabled: boolean;
   editable: boolean;
   glTxn2ColumnDef: any[];
   offSasColumnDef: any[];
   offDrColumnDef: any[];
   susDedColumnDef: any[];
   offDedColumnDef: any[];
   omsModulesColumnDef: any[];
   glTxnColumnDef: any[];
   bnkCdColumnDef: any[];
   susDtColumnDef: any[];
   offTxnColumnDef: any[];
   offBncColumnDef: any[];
   offDedReadOnly: boolean;
   offBncReadOnly: boolean;
   offDrReadOnly: boolean;
   sysPflReadOnly: boolean;
   offDed1ReadOnly: boolean;
   cg$ctrlReadOnly: boolean;
   omsModulesReadOnly: boolean;
   glTxnReadOnly: boolean;
   glTxn1ReadOnly: boolean;
   glTxn2ReadOnly: boolean;
   glTxn3ReadOnly: boolean;
   offTxnReadOnly: boolean;
   susDedReadOnly: boolean;
   susDtReadOnly: boolean;
   csldCaReadOnly: boolean;
   bnkCdReadOnly: boolean;
   bankCbReadOnly: boolean;
   txnTypeReadOnly: boolean;
   bankCb1ReadOnly: boolean;
   txnType1ReadOnly: boolean;
   csldDpReadOnly: boolean;
   vThaReadOnly: boolean;
   offSasReadOnly: boolean;
   offenderIdDisplay: any;
   lastName: any;
   firstName: any;
   selected = -1;
   offenderId: number;
  constructor(private otusubadFactory: OtusubadService,
     public translateService: TranslateService,
     public dialogService: DialogService, public sessionManager: UserSessionManager) {
      this.glTxn2ColumnDef = [];
      this.offSasColumnDef = [];
      this.offDrColumnDef = [];
      this.susDedColumnDef = [];
      this.offDedColumnDef = [];
      this.omsModulesColumnDef = [];
      this.glTxnColumnDef = [];
      this.bnkCdColumnDef = [];
      this.susDtColumnDef = [];
      this.offTxnColumnDef = [];
      this.offBncColumnDef = [];
   }
   onGridReady(event) {
   }
   ngOnInit() {
      this.offenderIdDisplay = this.dialog.data.offenderIdDisplay;
      this.lastName = this.dialog.data.lastName;
      this.firstName = this.dialog.data.firstName;
      this.getRootOffenderId();
      this.offSasColumnDef = [
         { fieldName: this.translateService.translate('common.subaccount'), field: 'trustAccountCode', editable: false, width: 150 },
         { fieldName: this.translateService.translate('common.transfer'), field: 'transferedAmount', editable: false, width: 100,
         datatype: 'number', format : '1.2-2', maxValue : 999999999.99,
         strictFP: true, whole: true },
         { fieldName: this.translateService.translate('otusubad.remaining'), field: 'balance', editable: false, width: 100,
         datatype: 'number', format : '1.2-2', maxValue : 999999999.99,
         strictFP: true, whole: true },
      ];
   }
   allowNumbers(event) {
   }
   onRowClickoffsas(event) {
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
   getRootOffenderId() {
      this.vthaModel.offenderIdDisplay = this.dialog.data.offenderIdDisplay;
      this.vthaModel.caseloadType = this.sessionManager.currentCaseLoadType;
      const rootOffenderId = this.otusubadFactory.getRootOffenderId(this.vthaModel);
      rootOffenderId.subscribe(data => {
         if (data.length > 0) {
            this.vthaData = data;
            this.offenderId = this.vthaData[0].rootOffenderId;
            this.offsasExecuteQuery();
         }

      });
   }
   vthaExecuteQuery() {
      const vthaResult = this.otusubadFactory.vThaExecuteQuery(this.vthaModel);
      vthaResult.subscribe(vthaResultList => {
         if (vthaResultList.length === 0) {
            this.vthaData = [];
         } else {
            this.vthaData = vthaResultList;
            this.vthaModel = vthaResultList[0];
         }
      });
   }
   offsasExecuteQuery() {
      this.offsasModel.offenderId = this.offenderId;
      this.offsasModel.caseloadId = this.dialog.data.caseloadId;
      const offsasResult = this.otusubadFactory.offSasExecuteQuery(this.offsasModel);
      offsasResult.subscribe(offsasResultList => {
         if (offsasResultList.length === 0) {
            this.offsasData = [];
         } else {
            this.offsasData = offsasResultList;
            this.offsasModel = offsasResultList[0];
            this.selected = 0;
         }
      });
   }


}
