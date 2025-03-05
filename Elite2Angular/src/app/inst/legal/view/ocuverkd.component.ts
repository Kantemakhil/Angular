import { InterestedPartiesCommitBean } from './../beans/InterestedPartiesCommitBean';
import { Component, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { DialogComponent } from '@ui-components/dialog/dialog.component';
import { HttpService } from './../../../core/service/http.service';
import { InterestedParties } from '../beans/InterestedParties';
import { LoginService } from '@common/login/service/login.service';
import { OcdleglsService } from '../service/ocdlegls.service';
import { DateFormat } from '@core/ui-components/datepicker/dateFormat';
import { UserSessionManager } from '@core/classes/userSessionManager';



@Component({
  selector: 's4-ocuverkd',
  templateUrl: './ocuverkd.component.html',
  styleUrls: ['./ocuverkd.component.css']
})

export class OcuverkdComponent implements OnInit {

  msglist = [];
  message = ' Invalid.';
  type = 'error';
  msgs: any[] = [];
  ocuverkdCoumndef: any;
  ocuverkdData: Array<InterestedParties>;
  disSaveBtn: boolean = true;
  staffId: any;
  @ViewChild('ocuverkdgrid', { static: true }) ocuverkdgrid: any;

  @ViewChild('dialog', { static: true }) dialog: DialogComponent;
  isDataUpdated: any;
  constructor(
    public translateService: TranslateService,
    private http: HttpService,
    public loginService: LoginService,
    private OcdleglsFactory: OcdleglsService,
    private sessionManager: UserSessionManager
  ) { }
  ngOnInit() {
    this.staffId = this.sessionManager.userSessionDetails().id;
    this.disSaveBtn = true;
    this.loadColumnDefs();
    this.loadRowData();
  }

  loadColumnDefs() {
    this.ocuverkdCoumndef = [
      { fieldName: this.translateService.translate('ocuverkd.action'), field: 'actionType', datatype: 'text' },
      { fieldName: this.translateService.translate('ocuverkd.date'), field: 'createDatetime', datatype: 'date' },
      { fieldName: this.translateService.translate('ocuverkd.time'), field: 'time', datatype: 'time' },
      { fieldName: this.translateService.translate('ocuverkd.userid'), field: 'createUserId', datatype: 'text' },
    ];
  }

  loadRowData() {
    if (this.dialog && this.dialog.data) {
      const ocuverkdData: any = [];
      if (this.dialog.data['htyData'] && this.dialog.data['htyData'].length > 0) {
        this.dialog.data['htyData'].forEach((ele, index) => {
          if (index === 0 && ele['actionType'] !== 'Verification') {
            this.disSaveBtn = false;
          }
            const keyDate = {};
            keyDate['actionType'] = ele['actionType'];
            keyDate['createDatetime'] = DateFormat.getDate(ele['createDatetime']);
            keyDate['time'] = DateFormat.getDate(ele['createDatetime']);
            keyDate['createUserId'] = ele['createUserId'];
            ocuverkdData.push(keyDate);
          })
        }
      this.ocuverkdData = ocuverkdData;
    } 
  }

  save() {
    this.OcdleglsFactory.verifyData(this.dialog.data).subscribe(data => {
      if (data) {
        this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
        this.type = 'success';
        this.show();
        this.dialog.close(data);
      } else {
        this.message = this.translateService.translate('common.addupdateremoverecordfailed');
        this.type = 'error';
        this.show();
      }
    });
  }

  show() {
    this.msglist = [];
    this.msglist.push({ message: this.message, type: this.type });
    this.msgs = [...this.msglist];
  }

  close(): void {
    this.dialog.close(null);
  }
}

