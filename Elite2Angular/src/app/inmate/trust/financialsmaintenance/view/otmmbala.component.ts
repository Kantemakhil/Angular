import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OtmmbalaService } from '../service/otmmbala.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { SystemProfiles } from '@commonbeans/SystemProfiles';
import { OffenderSubAccounts } from '@inmate/trust/trustaccounts/beans/OffenderSubAccounts';
import { OffenderSubAccountsCommitBean } from '@inmate/beans/OffenderSubAccountsCommitBean';
import { VTrustHeader } from '@inmate/beans/VTrustHeader';
import { OffenderSearchService } from '@common/offender-records/service/offender-search.service';

@Component({
      selector: 'app-otmmbala',
      templateUrl: './otmmbala.component.html'

})

export class OtmmbalaComponent implements OnInit {
      msgs: any[] = [];
      offsubaData: OffenderSubAccounts[] = [];
      offsubaDataTemp: OffenderSubAccounts[] = [];
      offsubaModel: OffenderSubAccounts = new OffenderSubAccounts();
      offsubaCommitModel: OffenderSubAccountsCommitBean = new OffenderSubAccountsCommitBean();
      vHeaderBlockModel: VTrustHeader = new VTrustHeader();
      offsubaIndex: number;
      offsubaUpdatetList: OffenderSubAccounts[] = [];
      syspflData: SystemProfiles[] = [];
      syspflDataTemp: SystemProfiles[] = [];
      syspflModel: SystemProfiles = new SystemProfiles();
      syspflIndex: number;
      syspflInsertList: SystemProfiles[] = [];
      syspflUpdatetList: SystemProfiles[] = [];
      syspflDeleteList: SystemProfiles[] = [];
      editable: boolean;
      offSubaColumnDef: any[];
      type = 'error';
      msglist = [];
      message = ' Invalid.';
      tableIndex = -1;
      constructor(private otmmbalaFactory: OtmmbalaService,
            public translateService: TranslateService,
            public sessionManager: UserSessionManager,
            private offenderSearchService: OffenderSearchService) {
            this.offSubaColumnDef = [];
      }

      ngOnInit() {
            this.vHeaderBlockModel = this.offenderSearchService.selectedOffender;
            this.offSubaColumnDef = [
                  {
                        fieldName: this.translateService.translate('otmmbala.glaccount') + '*', field: 'trustAccountCode',
                        datatype: 'lov', link: 'otmmbala/cgfkOffSubaTrustAccountCoRecordGroup',
                        editable: false, width: 150,source:'OCMCOACT'
                  },
                  {
                        fieldName: this.translateService.translate('otmmbala.minbalance'), field: 'minimumBalance', editable: true,
                        datatype: 'number', whole: true, format: '1.2-2', maxValue: 999999999.99, width: 150
                  },
                  {
                        fieldName: this.translateService.translate('otmmbala.inddayslimit'), field: 'indDays', datatype: 'number',
                        maxValue: 999999999, whole: true, editable: true, width: 150
                  },
            ];

            if (!this.vHeaderBlockModel) {
                  this.show('common.pleasesearchforvalidoffender');
                  return;
            }
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
      onRowClickoffsuba(event) {
      }
      onOffenderChange(offender) {
            this.offsubaData = [];
            this.vHeaderBlockModel = new VTrustHeader();
            if (offender) {
                  this.vHeaderBlockModel = offender;
                  if (this.vHeaderBlockModel.rootOffenderId) {
                        this.offsubaModel.offenderId = this.vHeaderBlockModel.rootOffenderId;
                        this.offsubaModel.caseloadId = this.sessionManager.currentCaseLoad;
                        this.offsubaExecuteQuery();
                  }
            }
      }
      offsubaExecuteQuery() {
            const offsubaResult = this.otmmbalaFactory.offSubaExecuteQuery(this.offsubaModel);
            offsubaResult.subscribe(data => {
                  if (data.length === 0) {
                        this.offsubaData = [];
                  } else {
                        data.forEach(element => {
                              element.trustAccountCode = String(element.trustAccountCode);
                        });
                        this.offsubaData = data;
                        this.tableIndex = 0;
                  }
            });
      }
      otmmbalaSaveoffsubaForm(event) {
            this.offsubaUpdatetList = event.updated;
            this.offsubaCommitModel.updateList = [];
            if (this.offsubaUpdatetList.length > 0) {
                  for (let i = 0; i < this.offsubaUpdatetList.length; i++) {
                        this.offsubaCommitModel.updateList = this.offsubaUpdatetList;
                  }
            }
            const offsubaSaveData = this.otmmbalaFactory.offSubaCommit(this.offsubaCommitModel);
            offsubaSaveData.subscribe(data => {
                  if (data === 1) {
                        this.show('common.addupdateremoverecordsuccess', 'success');
                        this.offsubaExecuteQuery();
                        return;
                  } else {
                        this.show('common.addupdateremoverecordfailed');
                        this.offsubaExecuteQuery();
                        return;
                  }
            });
      }
}

