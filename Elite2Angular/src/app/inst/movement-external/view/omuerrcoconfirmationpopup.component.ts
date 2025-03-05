import {
    Component, OnInit, ViewChild
} from '@angular/core';
import { DialogComponent } from '@ui-components/dialog/dialog.component';
import { TranslateService } from '@common/translate/translate.service';
@Component({
    selector: 'app-omuerrcoconfirmationpopup',
    templateUrl: './omuerrcoconfirmationpopup.component.html'
})

export class OmuerrcoconfirmationpopupComponent implements OnInit {
    @ViewChild('dialog', {static: true}) dialog: DialogComponent;
    label: string;
    yesBtn: boolean;
    noBtn: boolean;
    canBtn: any;

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
            if (this.dialog.data.canBtn) {
                this.canBtn = this.dialog.data.canBtn;
            }
        } catch (e) {

        }

    }
    yes() { this.dialog.close(true); }
    no() { this.dialog.close(false); }
    clearData() {
        this.dialog.close(null);
    }
}
