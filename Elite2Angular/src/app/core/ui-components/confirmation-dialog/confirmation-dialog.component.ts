import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { TranslateService } from '@common/translate/translate.service';
import { DynamicMenuService } from '@core/service/dynamic-menu.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.css']
})
export class ConfirmationDialogComponent implements OnInit {


  subject: Subject<boolean>;
  yesText;
  noText;

  constructor(public translateService: TranslateService, public dialogRef: MatDialogRef<ConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, public dms: DynamicMenuService) { 
    
  }

  ngOnInit(): void {
    this.yesText = this.translateService.translate('common.yes');
    this.noText = this.translateService.translate('common.no');
    if(this.data && this.data.yesText && this.data.yesText !== ''){
      this.yesText = this.data.yesText;
    }
    if(this.data && this.data.noText && this.data.noText !== ''){
      this.noText = this.data.noText;
    }
  }


  yes(){
    if (this.subject) {
      this.dms.isSingleSaveBtnDisable = true;
      this.subject.next(true);
      this.subject.complete();
    }
    this.dialogRef.close(true);
  }

  no(){
    if (this.subject) {
      this.subject.next(false);
      this.subject.complete();
    }
    this.dialogRef.close(false);
  }

}
