import {Component, OnInit, ViewChild } from '@angular/core';
import { DialogComponent } from '@ui-components/dialog/dialog.component';
import { TranslateService } from '@common/translate/translate.service';
@Component({
  selector: 'app-sealdialog',
  templateUrl: './sealdialog.component.html'
})
export class SealdialogComponent implements OnInit {
    @ViewChild('dialog') dialog: DialogComponent;
    sealMark:string;
    incidentDetailsDisable:boolean;
    type = 'error';
    msglist = [];
    message = ' Invalid.';
    msgs: any[] = [];
  constructor(public translateService: TranslateService) { }

  ngOnInit() {
     
  }
  saveSealMark(){
      if(this.sealMark === undefined || this.sealMark== null
              || this.sealMark.trim().length === 0 ){
      this.type = 'warn';
      this.message = this.translateService.translate('oidmpitm.sealmarkempty');
      this.show();
      return;
      }
      if(this.sealMark.length >12){
          this.type = 'warn';
          this.message = this.translateService.translate('oidmpitm.sealmarkexcedes');
          this.show();
          return;  
      }
      this.dialog.close(this.sealMark);
  }
  
  exit(){
      this.dialog.close("Y");
  }
  
  show() {
      this.msglist = [];
      this.msglist.push({ message: this.message, type: this.type });
      this.msgs = [...this.msglist];
  }
  
}
