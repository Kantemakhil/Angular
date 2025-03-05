import { Component, OnInit, ViewChild } from '@angular/core';
import { DialogComponent } from '@ui-components/dialog/dialog.component';
import { TranslateService } from '@common/translate/translate.service';
@Component({
    selector: 'app-oumagenc-dialog',
    templateUrl: './oumagencdialog.component.html'
  })
  export class OumagencDialogComponent implements OnInit {
    @ViewChild('dialog', {static: true}) dialog: DialogComponent;
    modelData: any;
    constructor(public translateService: TranslateService) {}
    ngOnInit(): void {
        this.modelData = this.dialog.data;
    }
    isDisabled(model) {
        if (model && model.corpModel && model.corpModel.createDatetime) {
            return false;
        } else {
            return true;
        }
    }
    trMsg(msg, astr?) {
        return astr ? this.translateService.translate(msg).concat(astr) : this.translateService.translate(msg);
    }

  }
