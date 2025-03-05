import {
    Component, OnInit, ViewChild
} from '@angular/core';
import { DialogComponent } from '@ui-components/dialog/dialog.component';
import {TranslateService} from '@common/translate/translate.service';
@Component({
    selector: 'app-oiishlogdetailspopup',
    templateUrl: './oiishlogdetailspopup.component.html'
})

export class OiishlogdetailspopupComponent implements OnInit {
    @ViewChild('dialog', {static: true}) dialog: DialogComponent;
    label: string;
    yesBtn: boolean;
    observationDetailsMsg: any;
    agyShilReadOnly = true;
    msgs: any[] = [];
     constructor(public translateService: TranslateService) {
        // TODO initilize data members here..!

    }
    ngOnInit() {
        try {
          this.observationDetailsMsg = this.dialog.data.observationDetails;
        } catch (e) {

        }
    }
    show(vldmsg, type) {
        const msgval = [{ message: vldmsg, type: type }];
        this.msgs = [...msgval];
    }
     commentInsertable() {
                this.show(this.translateService.translate('oiishlog.fieldisprotectedagainstupdate'), 'error');
                return false;
        }
    yes() { this.dialog.close(true); }
}
