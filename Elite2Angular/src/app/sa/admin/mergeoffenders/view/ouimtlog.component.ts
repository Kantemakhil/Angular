import {
  Component, OnInit,
  ViewChild
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OuimtlogService } from '../service/ouimtlog.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { MergeTransactionLogs } from '../beans/MergeTransactionLogs';
import { DialogComponent } from '@ui-components/dialog/dialog.component';
import { OuimergeService } from '../service/ouimerge.service';
// import required bean declarations

@Component({
  selector: 'app-ouimtlog',
  templateUrl: './ouimtlog.component.html'
})

export class OuimtlogComponent implements OnInit {
  @ViewChild('dialog', {static: true}) dialog: DialogComponent;
  // Variable declaration
  mergelogData: MergeTransactionLogs[] = [];
  mergelogModel: MergeTransactionLogs = new MergeTransactionLogs();
  editable: Boolean = true;
  mergeLogColumnDef: any[];
  transactionsIndex: number;
  constructor(private ouimtlogFactory: OuimtlogService, public translateService: TranslateService,
    public sessionManager: UserSessionManager, private ouimergeFactory: OuimergeService) {
    this.mergeLogColumnDef = [];
  }
  ngOnInit() {
    this.mergeLogColumnDef = [
      {
        fieldName: this.translateService.translate('ouimtlog.date'), field: 'logTimestamp',
        editable: false, datatype: 'date', width: 150
      },
      {
        fieldName: this.translateService.translate('ouimtlog.time'), field: 'logTimestamp',
        datatype: 'time', editable: false, width: 150
      },
      {
        fieldName: this.translateService.translate('ouimtlog.transactioninformation'),
        field: 'logText', editable: false, width: 500, tooltip: true
      },
    ];
    // TODO all initializations here
    this.mergelogExecuteQuery();
  }
  /**
      * event is fired when click on Exit button.
      */
  onButExitclick() {
    this.dialog.close(null);
  }
  /**
     * This function is used to retrive the information of Region grid
     */
  mergelogExecuteQuery() {
    this.mergelogModel = new MergeTransactionLogs();
    this.mergelogModel.mergeTransactionLogId = this.dialog.data.mergeTransactionId;
    const mergelogResult = this.ouimergeFactory.mergeLogExecuteQuery(this.mergelogModel);
    mergelogResult.subscribe(mergelogResultList => {
      if (mergelogResultList.length === 0) {
        this.mergelogData = [];
      } else {
        this.mergelogData = mergelogResultList;
        this.mergelogModel = mergelogResultList[0];
        this.transactionsIndex = 0;
      }
    });
  }
}
