import {
  Component, OnInit, ViewChild
} from '@angular/core';
import {TranslateService} from '@common/translate/translate.service';
import {OumusersService} from '../service/oumusers.service';
import {DialogComponent} from '@ui-components/dialog/dialog.component';
import {StaffAccessibleCaseloads} from '@sausersystemsecuritybeans/StaffAccessibleCaseloads';
@Component({
  selector: 'app-oumuserscl',
  templateUrl: './oumuserscl.component.html'
})

export class OumusersclComponent implements OnInit {
  @ViewChild('dialog', {static: true}) dialog: DialogComponent;
  lovColumnDef: any[];
  lovData: StaffAccessibleCaseloads[] = [];
  staffAccessibleCaseloadsModel: StaffAccessibleCaseloads = new StaffAccessibleCaseloads();
  constructor(private oumusersFactory: OumusersService, public translateService: TranslateService) {
    this.lovColumnDef = [];
  }
  ngOnInit() {
    this.lovColumnDef = [
      {
        fieldName: this.translateService.translate('oumusers.caseloadid'), field: 'caseloadId', datatype: 'text',
        editable: false, width: 160
      },
      {
        fieldName: this.translateService.translate('oumacase.description'), field: 'description', datatype: 'text',
        editable: false, width: 350
      },
    ];

    const rgStaffAcCaseloadIdServiceObj = this.oumusersFactory.rgStaffAcCaseloadIdRecordGroup();
    rgStaffAcCaseloadIdServiceObj.subscribe(rgStaffAcCaseloadIdList => {
      this.lovData = rgStaffAcCaseloadIdList;
    });

  }

  onRowClickLov(event) {
    this.staffAccessibleCaseloadsModel = new StaffAccessibleCaseloads();
    this.staffAccessibleCaseloadsModel.caseloadId = event.caseloadId;
    this.staffAccessibleCaseloadsModel.description = event.description;
  }

  processResult() {
    if (this.staffAccessibleCaseloadsModel.caseloadId) {
      this.dialog.close({
        caseloadId: this.staffAccessibleCaseloadsModel.caseloadId,
        description: this.staffAccessibleCaseloadsModel.description
      });
    } else {
      this.dialog.close(null);
    }

  }
  clearData() {
    this.dialog.close(null);
  }

}
