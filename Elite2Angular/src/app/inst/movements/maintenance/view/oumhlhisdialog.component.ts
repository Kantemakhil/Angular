import {
        Component,
        OnInit,
        ViewChild,
} from '@angular/core';
import { DialogComponent } from '@ui-components/dialog/dialog.component';
import { TranslateService } from '@common/translate/translate.service';
import { Router } from '@angular/router';
import { OtdsubatService } from '@inmate/trust/trustaccounts/service/otdsubat.service';

@Component({
        selector: 'app-oumhlhisdialog',
        templateUrl: './oumhlhisdialog.component.html'
})

export class OumhlhisdialogComponent implements OnInit {
        @ViewChild('dialog', {static: true}) dialog: DialogComponent;
        namesearch: any;
        constructor(public translateService: TranslateService, private router: Router, private otdsubatFactory: OtdsubatService) {}
        ngOnInit() {
                this.namesearch = this.dialog.data;
        }

        trMsg(msg, astr?) {
                return astr ? this.translateService.translate(msg).concat(astr) : this.translateService.translate(msg);
            }
}
