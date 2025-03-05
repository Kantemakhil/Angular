import { Component, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { OcuachisService } from '../service/ocuachis.service';
import { DialogComponent } from '@core/ui-components/dialog/dialog.component';
import { FeeAccountProfiles } from '../beans/FeeAccountProfiles';
import { SystemProfiles } from '@common/beans/SystemProfiles';

@Component({
    selector: 'app-ocuachis',
    templateUrl: './ocuachis.component.html'
})

export class OcuachisComponent implements OnInit {
    @ViewChild('dialog', { static: true }) dialog: DialogComponent;
    @ViewChild('fodGrid', { static: true }) fodGrid: any;
    msgs: any[] = [];
    feeOverdDetColumnDef: any[] = [];
    fodData: FeeAccountProfiles[] = [];
    fodDataTemp: FeeAccountProfiles[] = [];
    fodInsertList: FeeAccountProfiles[] = [];
    fodUpdateList: FeeAccountProfiles[] = [];
    fodDeleteList: FeeAccountProfiles[] = [];
    fodModel: FeeAccountProfiles = new FeeAccountProfiles();
    fodIndex: number;
    feeActProfiles: FeeAccountProfiles = new FeeAccountProfiles();
    feeActProfInput: FeeAccountProfiles = new FeeAccountProfiles();
    systemProfModel: SystemProfiles = new SystemProfiles();
    insertFodGridData: boolean;
    deleteFodGridData: boolean;
    addedByName: any;

    constructor(private ocufovdtFactory: OcuachisService, public translateService: TranslateService,
        public sessionManager: UserSessionManager) {

    }
    ngOnInit() {
        this.deleteFodGridData = false;
        this.feeOverdDetColumnDef = [];
        this.feeOverdDetColumnDef = [


            {
                fieldName: this.translateService.translate('common.startdate'), field: 'startDate',
                width: 150, datatype: 'date', editable: false,
            },
            {
                fieldName: this.translateService.translate('common.effectivedate'), field: 'effectiveDate',
                editable: false, width: 150, datatype: 'date',
            },
            {
                fieldName: this.translateService.translate('common.expirydate'), field: 'expiryDate',
                editable: false, width: 150, datatype: 'date'
            },

            {
                fieldName: this.translateService.translate('common.amount'), field: 'amount', width: 150, whole: true,
                datatype: 'number', format: '1.2-2', maxValue: 999999999.99, editable: true,
            },
            {
                fieldName: this.translateService.translate('ocmfapro.billingday'), field: 'dayOfMonth', width: 150,
                datatype: 'number', whole: true
            },


            {
                fieldName: this.translateService.translate('common.status'), field: 'feeActStatus',
                editable: true, width: 150, datatype: 'text', domain: 'DED_STATUS', uppercase: false
            },
            {
                fieldName: this.translateService.translate('ocdofacc.statuseffectivedate'), field: 'statusEffectiveDate',
                width: 150, datatype: 'date', 
            },

            {
                fieldName: this.translateService.translate('ocuachis.user'), field: 'createUserId',
                width: 150, 
            },

            {
                fieldName: this.translateService.translate('ocuachis.dateortime'), field: 'recordDatetime', editable: false, datatype: 'dateTime',
                width: 150
            },


        ];

        this.feeActProfInput.feeCode = this.dialog.data.feeCode;
        this.feeActProfInput.code = this.dialog.data.code;
        this.feeActProfInput.location = this.dialog.data.location;
        this.feeActProfiles.amount = this.dialog.data.amount;
        this.feeActProfiles.offenderFeeId = this.dialog.data.offenderFeeId;
        this.feeActProfiles.startDate = this.dialog.data.startDate;
        this.feeActProfiles.effectiveDate = this.dialog.data.effectiveDate;
        this.feeActProfiles.expiryDate = this.dialog.data.expiryDate;
        this.feeActProfiles.feeActStatus = this.dialog.data.feeActStatus;
        this.feeActProfiles.longestSupvExpDate = this.dialog.data.longestSupvExpDate;
        this.feeActProfiles.commentText = this.dialog.data.commentText;
        this.accountHistoryQuery();
       
         this.feeActExecuteQuery();
    }


   

    show(vldmsg, type?) {
        type = type ? type : 'warn';
        vldmsg = this.translateService.translate(vldmsg);
        const msgval = [{ message: vldmsg, type: type }];
        this.msgs = [...msgval];
    }

    isNull(value) {
        return value === null || value === undefined || value === '';
    }

    onRowClickFod(event) {
        if (event) {
            this.fodModel = event;
        }
    }

    feeActExecuteQuery() {
        const result = this.ocufovdtFactory.getDescription(this.feeActProfInput);
        result.subscribe(data => {
            if (data.length === 0) {
                this.feeActProfiles = new FeeAccountProfiles();
            } else {
                this.feeActProfiles.code = data;
                //this.feeActProfiles.amount = this.dialog.data.amount;
            }
        });
    }

    accountHistoryQuery() {
        this.fodModel.offenderFeeId = this.dialog.data.offenderFeeId;
        this.fodModel.caseloadId = this.dialog.data.offenderFeeId;
        this.fodModel.feeCode = this.dialog.data.feeCode;
        const result = this.ocufovdtFactory.accountHistoryQuery(this.fodModel);
        result.subscribe(data => {
            if (data.length === 0) {
                this.fodData = [];
            } else {
                this.fodData = data;
                this.fodModel = data[0];
                this.fodIndex = 0;
            }
        });
    }


    get longSupvShow() {
          if (this.dialog.data.nonBillableStatus === 'Y') {
              return true;
          } else {
              return false;
          }
      }

    
    onButExitclick() {
        this.dialog.close(null);
    }
}
