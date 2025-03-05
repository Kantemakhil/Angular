import { InterestedPartiesCommitBean } from './../beans/InterestedPartiesCommitBean';
import { Component, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { DialogComponent } from '@ui-components/dialog/dialog.component';
import { HttpService } from './../../../core/service/http.service';
import { InterestedParties } from '../beans/InterestedParties';
import { ValidateRowReturn } from '@core/ui-components/grid/grid.component';
import { OcdintpaService } from '../service/Ocdintpa.service';


@Component({
  selector: 's4-ocdintpa',
  templateUrl: './ocdintpa.component.html',
  styleUrls: ['./ocdintpa.component.css']
})

export class OcdintpaComponent implements OnInit {

  msglist = [];
  message = ' Invalid.';
  type = 'error';
  msgs: any[] = [];
  ocdintpaCoumndef: any;
  ocdintpaData: Array<InterestedParties>;
  @ViewChild('ocdintpagrid', { static: true }) ocdintpagrid: any;

  @ViewChild('dialog', { static: true }) dialog: DialogComponent;
  constructor(
    public translateService: TranslateService,
    public ocdintpaService: OcdintpaService,
    private http: HttpService
  ) { }
  ngOnInit() {
    this.ocdintpaData = [];
    this.loadColumnDefs();
    this.loadRowData();
  }
  loadColumnDefs() {
    this.ocdintpaCoumndef = [{
      fieldName: this.translateService.translate('ocdintpa.partytype'), required: true,
      field: 'partyType', editable: true, width: 150, datatype: 'lov', domain: 'INT_PARTIES'
    }, {
      fieldName: this.translateService.translate('ocdintpa.partydesc'), required: true,
      field: 'partyDescription', editable: true, width: 150, datatype: 'text', uppercase: 'false', maxlength: 100
    }, {
      fieldName: this.translateService.translate('ocdintpa.comment'), required: false,
      field: 'partyComment', editable: true, width: 150, datatype: 'text', uppercase: 'false', maxlength: 1000
    }];
  }
  validateRowData = (event) => {
    const rowIndex = event.rowIndex;
    const rowdata = new ValidateRowReturn();
    if (event.field === 'partyType') {

      rowdata.data = { partyDescription: '', partyComment:'' };
      rowdata.validated = true;
      return rowdata;

    }
    rowdata.validated = true;
    return rowdata;
  }

  loadRowData() {
    if (this.dialog && this.dialog.data) {
      this.ocdintpaService.executeQuery(this.dialog.data).subscribe((data: Array<InterestedParties>) => {
        if (data && data.length) {
          this.ocdintpaData = data;
        } else {
          this.ocdintpaData = [];
        }
      })
    }
  }
  ocdintpaCommit(event) {
    let ocdintpaCommitBean = new InterestedPartiesCommitBean();
    ocdintpaCommitBean.insertList = event.added;
    ocdintpaCommitBean.updateList = event.updated;
    ocdintpaCommitBean.deleteList = event.removed;
    this.setOffData(ocdintpaCommitBean.insertList);
    this.setOffData(ocdintpaCommitBean.updateList);
    this.setOffData(ocdintpaCommitBean.deleteList);

    if (ocdintpaCommitBean.insertList?.length > 0) {
      this.vaalidateData(ocdintpaCommitBean.insertList);
    }
    if (ocdintpaCommitBean.updateList?.length > 0) {
      this.vaalidateData(ocdintpaCommitBean.updateList);
    }

    this.ocdintpaService.commitData(ocdintpaCommitBean).subscribe(data => {
      if (data) {
        this.show('common.addupdateremoverecordsuccess', 'success');
        this.loadRowData();
        // this.dialog.close(null);
      } else {
        this.show('common.addupdateremoverecordfailed', 'error');
      }
    })
  }
  setOffData(list) {
    for (let i = 0; i < list.length; i++) {
      list[i]['recordId'] = this.dialog.data.recordId+'';
      list[i]['recordType'] = this.dialog.data.recordType;
      list[i]['offenderBookId'] = this.dialog.data.offenderBookId;
    }

  }
  vaalidateData(list) {
    for (let i = 0; i < list.length; i++) {
      if (!list[i].partyType) {
        this.show('ocdintpa.partytypemsg');
        return;
      }
      if (!list[i].partyDescription) {
        this.show('ocdintpa.partydescmsg');
        return;
      }
    }
  }
  show(vldmsg, type?) {
    type = type ? type : 'warn';
    vldmsg = this.translateService.translate(vldmsg);
    const msgval = [{ message: vldmsg, type: type }];
    this.msgs = [...msgval];
  }

  close(): void {
    this.dialog.close(null);
  } 
}

