import {Component, OnInit, ViewChild } from '@angular/core';
import { DialogComponent } from '@ui-components/dialog/dialog.component';
import { TranslateService } from '@common/translate/translate.service';
import { OidrelscService } from '@inst/schedules/service/oidrelsc.service';
import { OffenderReleaseDetails } from '@inst/schedules/beans/OffenderReleaseDetails';
import { OidreleaService } from '@inst/movement-external/service/oidrelea.service';
@Component({
  selector: 'app-oiuirame',
  templateUrl: './oiuirame.component.html',
  styleUrls: ['./oiuirame.component.css']
})
export class OiuirameComponent implements OnInit {
    @ViewChild('dialog', {static: true}) dialog: DialogComponent;
    aincidentDetails:string;
    incidentDetailsDisable:boolean;
    type = 'error';
    msglist = [];
    msgs: any[] = [];
  message = ' Invalid.';
  maxlength: number;
  offreldetModel: OffenderReleaseDetails = new OffenderReleaseDetails();
  constructor(public translateService: TranslateService,private oidrelscFactory: OidrelscService,private oidreleaFactory: OidreleaService) { }

  ngOnInit() {
    if (this.dialog.data.screenId == 'OIDRELSC' || this.dialog.data.screenId == 'OIDRELEA') {
      this.offreldetModel.offenderBookId = this.dialog.data.offenderBookId;
      this.offreldetModel.commentText = this.dialog.data.commentText;
      const textLength =  240 - ((this.offreldetModel.commentText != null)?this.offreldetModel.commentText.length:0);
      this.maxlength = textLength > 0 ? textLength : 0;
    }
    else
      this.maxlength = 40000;
      
  }
  appendDetail() {
     if (!this.aincidentDetails || String(this.aincidentDetails).trim() === '') {
        this.type = 'warn';
        this.message = this.translateService.translate('oiuirame.appendmustbeentered');
        this.show();
        return;
      }
    if (this.dialog.data.screenId == 'OIDRELSC' || this.dialog.data.screenId == 'OIDRELEA') {
      if ((this.dialog.data.commentText + this.aincidentDetails).length > 240) { 
        this.type = 'warn';
        this.message = this.translateService.translate('oiuirame.appendmustbelessthan240characters');
        this.show();
        return;
      }
      this.offreldetModel.commentText = ((this.offreldetModel.commentText != null) ? this.offreldetModel.commentText : '') + this.aincidentDetails
      if (this.dialog.data.screenId == 'OIDRELSC') {
        const result = this.oidrelscFactory.updateCommentText(this.offreldetModel);
        result.subscribe(data => {
          if (data == 1)
            this.type = 'success';
          this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
          this.show();
          this.dialog.close("1");
        })
      } else { 
        const result = this.oidreleaFactory.updateCommentText(this.offreldetModel);
        result.subscribe(data => {
          if (data == 1)
            this.type = 'success';
          this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
          this.show();
          this.dialog.close("1");
        })
      }
    } else {
      this.dialog.close(this.aincidentDetails);
    }
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
