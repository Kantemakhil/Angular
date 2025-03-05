import {
  Component, OnInit
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OmsysjntService } from '../service/omsysjnt.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { Router } from '@angular/router';
@Component({
  selector: 'app-omsysjnt',
  templateUrl: './omsysjnt.component.html'
})

export class OmsysjntComponent implements OnInit {
  link: string;
  tableName: string;
  actionName: string;
  lovModel: any[];
  msgs: any[] = [];
  block2ReadOnly = false;
  tablergRg: any[] = [];
  allTables = false;
  insertTrigger = true;
  recProCount: number;
  lovTitles = { 'description': this.translateService.translate('omsysjnt.tablename') };
  constructor(private omsysjntFactory: OmsysjntService, private router: Router,
    public translateService: TranslateService, public sessionManager: UserSessionManager) {
  }
  ngOnInit() {
    this.link = 'omsysjnt/tableRgRecordGroup';
    this.allTables = false;
    this.insertTrigger = true;
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
  get lovReadOnly() {
    if (this.allTables) {
      return true;
    }
    return false;
  }
  onClearclick () {
    this.allTables = false;
    this.insertTrigger = true;
    this.tableName = '';
    this.recProCount = undefined;
    this.tableName = this.tableName === '' ? undefined : '';
  }
  onStartclick() {
    const tabName = this.tableName;
    if (!this.allTables && !this.tableName) {
      this.show(this.translateService.translate('omsysjnt.entertablename'));
      return;
    }
    if (this.sessionManager.getId() !== 'OMS_OWNER') {
      this.show(this.translateService.translate('omsysjnt.onlyloginuserasomsownercancreatejournaltable'));
      return;
    } else {
      if (this.allTables) {
        const serviceObj = this.omsysjntFactory.createTr();
        serviceObj.subscribe(data => {
          if (data && data > 0) {
            this.show(this.translateService.translate('omsysjnt.transactioncopleted').replace('%data%', data), 'success');
            this.recProCount = data;
            this.link = undefined;
            this.link = 'omsysjnt/tableNamesRgRecordGroup';
            setTimeout(() => {
              this.tableName = tabName;
          }, 500);
            return;
          }
        });
      } else {
        const serviceObj = this.omsysjntFactory.createOneTr(this.tableName, this.insertTrigger);
        serviceObj.subscribe(data => {
          if (data && data === 1) {
            this.show(this.translateService.translate('common.addupdateremoverecordsuccess'), 'success');
            this.recProCount = 1;
            this.link = undefined;
            this.link = 'omsysjnt/tableNamesRgRecordGroup';
            setTimeout(() => {
              this.tableName = tabName;
          }, 500);
            return;
          }
        });
      }
    }
  }
  onExitclick() {
    this.router.navigate(['/home']);
  }
  onLovChange () {
    if (!this.tableName) {
        this.tableName = this.tableName === '' ? undefined : '';
    }
  }
  get clrbtnFlag() {
    if (this.tableName || this.allTables) {
      return false;
    }
    return true;
  }
}
