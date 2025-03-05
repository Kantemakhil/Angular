import {
        Component,
        OnInit,
        ViewChild,
} from '@angular/core';
import { DialogComponent } from '@ui-components/dialog/dialog.component';
import { TranslateService } from '@common/translate/translate.service';
import { OmuvrestService } from '../service/omuvrest.service';

@Component({
        selector: 'app-omuvrestdialog',
        templateUrl: './omuvrestdialog.component.html'
})

export class OmuvrestdialogComponent implements OnInit {
        @ViewChild('dialog', {static: true}) dialog: DialogComponent;
        visitor: any;
        editableGrid = true;
        constructor(public translateService: TranslateService , private omuvrestFactory: OmuvrestService) {}
        ngOnInit() {
                this.omuvrestFactory.dialogFlag = true;
                const restricScreen = ['/OIDVISIT'];
                if (restricScreen.includes(this.dialog.data.screen)) {
                        this.editableGrid = false;
                }
                this.visitor = this.dialog.data;
        }

        trMsg(msg, astr?) {
                return astr ? this.translateService.translate(msg).concat(astr) : this.translateService.translate(msg);
            }
}
