import { Component, OnInit, ViewChild } from '@angular/core';
import { LoginService } from '@common/login/service/login.service';
import { TranslateService } from '@common/translate/translate.service';
import { OcipenscService } from '../service/ocipensc.service';

@Component({
  selector: 'app-ocipensc',
  templateUrl: './ocipensc.component.html'
})
export class OcipenscComponent implements OnInit {

  msglist = [];
  type = 'error';
  offendersColDef: any[] = [];
  pendEventColDef: any[] = [];
  pendEventGridData: any[] = [];
  offendersRowData: any[] = [];
  calcPendingData: any[] = [];
  commentText: any;
  msgs: any[];

  constructor(private OcipenscFactory: OcipenscService, public translateService: TranslateService,
    public loginService: LoginService) {
  }

  ngOnInit(): void {
    this.offendersRowData = [];
    this.pendEventGridData = [];
    this.offendersColDef = [
      { fieldName: this.translateService.translate('ocipensc.pid'), field: 'offenderIdDisplay', editable: false, datatype: 'text' },
      { fieldName: this.translateService.translate('ocipensc.lastname'), field: 'lastName', editable: false, datatype: 'text' },
      { fieldName: this.translateService.translate('ocipensc.firstname'), field: 'firstName', editable: false, datatype: 'text' },
      { field: 'offenderBookId', hide: true }
    ];

    this.pendEventColDef = [
      { fieldName: this.translateService.translate('ocipensc.eventdate'), field: 'sentDate', editable: false, datatype: 'date' },
      { fieldName: this.translateService.translate('ocipensc.eventtime'), field: 'sentTime', editable: false, datatype: 'time' },
      { fieldName: this.translateService.translate('ocipensc.staffname'), field: 'staffName', editable: false, datatype: 'text' },
      { fieldName: this.translateService.translate('ocipensc.calcreason'), field: 'calcCode', editable: false, datatype: 'lov', domain: 'CALC_REASON' },
      { fieldName: this.translateService.translate('ocipensc.modulename'), field: 'moduleName', editable: false, datatype: 'lov', link: 'oummenus/rgMenuSecDescRecordGroup', lovRender: 'moduleName' },
      { field: 'commentText', editable: false, datatype: 'text', hide: true }
    ];
    this.loadJsonData();
  }

  loadJsonData() {
    this.calcPendingData = [];
    this.offendersRowData = [];
    this.pendEventGridData = [];
    let searchBean = {}
    this.OcipenscFactory.loadData(searchBean).subscribe(data => {
      if (data) {
        const offendersData = Array.from(new Map(JSON.parse(JSON.stringify(data)).map(i => [i['offenderBookId'], i])).values());
        this.offendersRowData = offendersData;
        this.calcPendingData = JSON.parse(JSON.stringify(data));
      }
    });
  }

  onRowClicked(event) {
    if (event && this.calcPendingData) {
      let pendingEvents = this.calcPendingData.filter(i => i.offenderBookId == event.offenderBookId);
      let rowData = [];
      pendingEvents.forEach(ele => {
        let calcReason = JSON.parse(ele['calcReason']);
        calcReason['moduleName'] = ele.moduleName
        rowData.push(calcReason);
      });
      this.pendEventGridData = JSON.parse(JSON.stringify(rowData));
    } else {
      this.pendEventGridData = [];
    }
  }

  onRowClickPendEvent(event) {
    if (event) {
      this.commentText = event.commentText;
    } else {
      this.commentText = undefined;
    }
  }
}
