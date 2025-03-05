import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { Subject } from 'rxjs';
import { OcdlegloComponent } from '@inst/legal/view/ocdleglo.component';
import { ConfirmationDialogComponent } from '@core/ui-components/confirmation-dialog/confirmation-dialog.component';
import { TranslateService } from '@common/translate/translate.service';

@Injectable({
  providedIn: 'root'
})

export class CustomConfirmGuard implements CanDeactivate<OcdlegloComponent> {
  confirmDlg: MatDialogRef<ConfirmationDialogComponent>;

  constructor(private dialog: MatDialog, public translateService: TranslateService) {}

  canDeactivate(component: OcdlegloComponent) {
    const subject = new Subject<boolean>();
    if (!component.dms.isSingleSaveBtnDisable) {
        let msg = this.translateService.translate('ocdcords.navigatemsg');
        const dialogConfig = {
            data: {
                title: 'Changes Lost',
                message: msg,
                yesText: 'Proceed',
                noText: 'Stop'
            },
            disableClose: true,
            hasBackdrop: true,
            height: '170px',
            width: '100%',
        };
        this.confirmDlg = this.dialog.open(ConfirmationDialogComponent, dialogConfig);
        this.confirmDlg.componentInstance.subject = subject;
        return subject.asObservable();
    }
    return true;
  }


  
}