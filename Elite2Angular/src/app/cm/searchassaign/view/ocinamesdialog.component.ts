import {
        Component,
        OnInit,
        ViewChild,
} from '@angular/core';
import { DialogComponent } from '@ui-components/dialog/dialog.component';
import { TranslateService } from '@common/translate/translate.service';
import { Router } from '@angular/router';

@Component({
        selector: 'app-ocinamesdialog',
        templateUrl: './ocinamesdialog.component.html'
})

export class OcinamesDialogComponent implements OnInit {
        @ViewChild('dialog', { static: true }) dialog: DialogComponent;
        namesearch: any;
        offenderData: any;
        constructor(public translateService: TranslateService, private router: Router) { }
        ngOnInit() {
                this.namesearch = this.dialog.data;
        }

        onSelect(){
                this.offenderData['nbtOffenderIdDisplay'] = this.offenderData.offenderIdDisplay;
                this.offenderData['nbtLastName'] = this.offenderData.lastName;
                this.offenderData['nbtFirstName'] = this.offenderData.firstName;
                this.offenderData['offenderBookId'] = this.offenderData.offenderBookId;
                this.dialog.close(this.offenderData);
        }

        cancel(){
                this.dialog.close(null);
        }

        dialogClosed(event) {
                if (event) {
                        this.dialog.close(event);
                }
        }

        trMsg(msg, astr?) {
                return astr ? this.translateService.translate(msg).concat(astr) : this.translateService.translate(msg);
        }

        assignRecord(event){
                this.offenderData = event;
        }
}
