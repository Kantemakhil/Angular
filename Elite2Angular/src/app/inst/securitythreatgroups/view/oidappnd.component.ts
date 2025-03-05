import { Component, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OidappndService } from '../service/oidappnd.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { StgCaseNotes } from '@instSecurityThreatGroupsbeans/StgCaseNotes';
import { DialogComponent } from '@ui-components/dialog/dialog.component';
@Component({
  selector: 'app-oidappnd',
  templateUrl: './oidappnd.component.html'
})
export class OidappndComponent implements OnInit {
  msgs: any[] = [];
  stgNotemodel: StgCaseNotes = new StgCaseNotes();
  savbtn: boolean;
  lvLength = 4000;
  @ViewChild('dialog', {static: true}) dialog: DialogComponent;
  data: any;
  constructor(private oidappndFactory: OidappndService,
    public translateService: TranslateService,
    public sessionManager: UserSessionManager) {
  }
  ngOnInit() {
    this.data = this.dialog.data;
    this.savbtn = true;
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
  trMsg(msg, astr?) {
    return astr ? this.translateService.translate(msg).concat(astr) :
      this.translateService.translate(msg);
  }
  ok() {
    this.stgNotemodel.moduleName = this.data.moduleName;
    if (this.stgNotemodel.moduleName === 'OIDMBRDT') {
      this.stgNotemodel.offenderBookId = this.data.offenderBookId;
      this.stgNotemodel.stgSeq = this.data.stgSeq;
      this.stgNotemodel.commentText = this.data.commentText;
      this.lvLength = 2000;
    }
    if (this.stgNotemodel.moduleName === 'OIDSTGCN') {
      this.stgNotemodel.noteSeq = this.data.noteSeq;
      this.stgNotemodel.stgId = this.data.stgId;
      this.stgNotemodel.commentText = this.data.text;
    }
    if (this.stgNotemodel.moduleName === 'OIDMBRQU') {
      this.stgNotemodel.offenderBookId = this.data.offenderBookId;
      this.stgNotemodel.assessmentSeq = this.data.assessmentSeq;
      this.stgNotemodel.itemSeq = this.data.itemSeq;
      this.stgNotemodel.commentText = this.data.commentText;

    }
    if (this.stgNotemodel.moduleName === 'OCDCPTIT') {
      this.stgNotemodel.ptrId = this.data.ptrId;
      this.stgNotemodel.commentText = this.data.ptrComment;
    }
    this.stgNotemodel.text = this.stgNotemodel.commentText;
    this.stgNotemodel.createUserId = this.sessionManager.getId();
    this.oidappndFactory.stgCommit(this.stgNotemodel).subscribe(data => {
      if (data === 1) {
        this.show('common.addupdateremoverecordsuccess', 'success');
        this.dialog.close(null);
      } else if (data === 0) {
        this.show('common.addupdateremoverecordfailed', 'warn');
        this.savbtn = false;
      } else {
        this.show(this.trMsg('oidappnd.cmbndamndnt').
          replace('%lvLength%', String(this.lvLength)).replace('%data%', data));
        this.savbtn = false;
      }
    });
    this.savbtn = true;
  }
  cancel() {
    this.stgNotemodel = new StgCaseNotes();
    this.stgNotemodel.newText = null;
    this.savbtn = true;
  }
  onTextChange(event) {
      this.savbtn = !(this.isValueAvaliable);
  }
  get isValueAvaliable(): boolean {
    if (this.stgNotemodel.newText && this.stgNotemodel.newText.trim()) {
      return true;
    } else {
      return false;
    }
  }
}
