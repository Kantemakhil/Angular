import {
    Component, OnInit, ViewChild
} from '@angular/core';
import { DialogComponent } from '@ui-components/dialog/dialog.component';
import {TranslateService} from '@common/translate/translate.service';
@Component({
    selector: 'app-oidstwjuconfirmationpopup',
    templateUrl: './oidehlocconfirmationpopup.component.html'
})

export class OidehlocconfirmationpopupComponent implements OnInit {
    @ViewChild('dialog', {static: true}) dialog: DialogComponent;
    label: string;
    yesBtn: boolean;
    noBtn: boolean;
    canBtn: boolean;

     constructor(public translateService: TranslateService) {
        // TODO initilize data members here..!

    }
    ngOnInit() {
        try {
            if (this.dialog.data.label) {
                this.label = this.dialog.data.label;
            }
            if (this.dialog.data.yesBtn) {
                this.yesBtn = this.dialog.data.yesBtn;
            }
            if (this.dialog.data.noBtn) {
                this.noBtn = this.dialog.data.noBtn;
            }
        } catch (e) {

        }

    }
    yes() { this.dialog.close(true); }
    no() { this.dialog.close(false); }
}
