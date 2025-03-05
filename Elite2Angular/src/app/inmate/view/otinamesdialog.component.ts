import {
        Component,
        OnInit,
        ViewChild,
} from '@angular/core';
import { DialogComponent } from '@ui-components/dialog/dialog.component';
import { TranslateService } from '@common/translate/translate.service';
import { Router } from '@angular/router';
import { OtdsubatService } from '@inmate/trust/trustaccounts/service/otdsubat.service';
import { OtinamesService } from '@inmate/service/otinames.service';

@Component({
        selector: 'app-otinamesdialog',
        templateUrl: './otinamesdialog.component.html'
})

export class OtinamesdialogComponent implements OnInit {
        @ViewChild('dialog', {static: true}) dialog: DialogComponent;
        namesearch: any;
        constructor(public translateService: TranslateService, private router: Router, private otdsubatFactory: OtdsubatService, private otinamesFactory: OtinamesService) {}
        ngOnInit() {
                this.otinamesFactory.dialogFlag = true;
                this.namesearch = this.dialog.data;
        }

        dialogClosed(event) {
                if ( event && this.router.url === '/OTDSUBAT') {
                        this.otdsubatFactory.offenderId = event.offenderId;
                        this.otdsubatFactory.otinamesData = event;
                }
                this.dialog.close(event);
        }

        trMsg(msg, astr?) {
                return astr ? this.translateService.translate(msg).concat(astr) : this.translateService.translate(msg);
            }
}
