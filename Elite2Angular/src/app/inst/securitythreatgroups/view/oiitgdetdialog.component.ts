import { Component,  OnInit, ViewChild} from '@angular/core';
import { DialogComponent } from '@ui-components/dialog/dialog.component';
import { TranslateService } from '@common/translate/translate.service';
@Component({
    selector: 'app-oiitgdet-dailog',
    templateUrl: './oiitgdetdialog.component.html'
})

export class OiitgdetDialogComponent implements OnInit {
    isDialog = true;
    stgId: any;
    screenTitle: any;
    screenId: any;
    @ViewChild('dialog', {static: true}) dialog: DialogComponent;
    constructor(private translateService: TranslateService) {}
    ngOnInit(): void {
        this.stgId = this.dialog.data && this.dialog.data.stgId  && this.dialog.data.activeFlag ? String(this.dialog.data.stgId) : null;
        this.screenTitle = this.trMsg('oiitgdet.screenId');
        this.screenId = 'OIITGDET';
    }
    trMsg(msg, astr?) {
        return astr ? this.translateService.translate(msg).concat(astr) : this.translateService.translate(msg);
    }

}
