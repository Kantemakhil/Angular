import { Component, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { DialogComponent } from '@core/ui-components/dialog/dialog.component';
import { DialogService } from '@core/ui-components/dialog/dialog.service';
import { FeeAccountProfiles } from '@cf/deductions/beans/FeeAccountProfiles';
import { FeeOverrideDetails } from '@cf/deductions/beans/FeeOverrideDetails';
import { OcufovdtService } from '@cf/deductions/service/ocufovdt.service';

@Component({
  selector: 'app-ocufovdtdailog',
  templateUrl: './ocufovdtdialog.component.html',
})
export class OcufovdtdialogComponent implements OnInit {
  @ViewChild('fohGrid', { static: true }) fodGrid: any;
  @ViewChild('dialog', { static: true }) dialog: DialogComponent;

  feeOHistoryData:FeeOverrideDetails[] = [];
  feeOverdDetColumnDef: any[] = [];
  // fodModel: any;
 fodModel: FeeOverrideDetails = new FeeOverrideDetails();
  feeActProfInput: FeeAccountProfiles = new FeeAccountProfiles();

  fodIndex: number;
  msgs: any[] = [];


  constructor(public translateService: TranslateService,private ocufovdtFactory: OcufovdtService,
    public sessionManager: UserSessionManager, public dialogService: DialogService) { }

  ngOnInit(): void {
    this.feeOverdDetColumnDef = [];
    this.feeOverdDetColumnDef = [
        {
            fieldName: this.translateService.translate('ocufovdt.overridetype'), field: 'overrideType', editable: false,
            datatype: 'lov', width: 150, domain: 'CF_FOV_TYP', 
        },
        {
            fieldName: this.translateService.translate('ocufovdt.overridestartdate'), datatype: 'date',
            field: 'overrideStartDate', editable: false, width: 150, 
        },

        {
            fieldName: this.translateService.translate('ocufovdt.overrideenddate'), field: 'overrideEndDate', datatype: 'date',
            editable: false, width: 150, 
        },
        {
          fieldName: this.translateService.translate('ocufovdt.datetime'),field: 'recordDatetime', datatype: 'dateTime',
         editable: false, width: 150, 
      },
        {
            fieldName: this.translateService.translate('ocufovdt.priorityindicator'), field: 'priorityIndicator', editable: false,
            datatype: 'number', maxValue: '999', whole: true, minValue: '0', 
        },
        {
            fieldName: this.translateService.translate('ocufovdt.overrideamount'), field: 'overrideAmount', editable: false,
            datatype: 'number', format: '1.2-2', maxValue: 999999999.99, strictFP: true, whole: true,
        },
        {
            fieldName: this.translateService.translate('common.comments'), field: 'commentText', editable: false,
            width: 150, datatype: 'text', uppercase: 'false', maxlength: 240
        },
        {
            fieldName: this.translateService.translate('ocufovdt.addedby'), field: 'addedBy',
            datatype: 'text', editable: false, width: 150
        },
        {
            fieldName: this.translateService.translate('common.date'), field: 'addedDate', editable: false,
            datatype: 'date', width: 150
        },


    ];
this.accountHistoryQuery();
this.feeActProfInput.caseloadId = this.dialog.data.caseloadId;
  }
  onButExitclick() {
    this.dialog.close(null);
}


    accountHistoryQuery() {
        this.fodModel.offenderFeeId = this.dialog.data.offenderFeeId;
      
        const result = this.ocufovdtFactory.feeOverdDetHtyExecuteQuery(this.fodModel);
        result.subscribe(data => {
            if (data.length === 0) {
                this.feeOHistoryData = [];
            } else {
                this.feeOHistoryData = data;
               
                this.feeOHistoryData.forEach(element => {
              element.overrideTypeDb = element.overrideType;
                                  });
               
            }
        });
    } 

  
}

