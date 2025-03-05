import {
    Component, OnInit, ViewChild
  } from '@angular/core';
import { DialogComponent } from '@ui-components/dialog/dialog.component';
import {TranslateService} from '@common/translate/translate.service';
  @Component({
    selector: 'app-oidstwjudelnotifipopup',
    templateUrl: './oidstwjudelnotifipopup.component.html'
  })

  export class OidstwjudelnotifipopupComponent implements OnInit {
    @ViewChild('dialog', {static: true}) dialog: DialogComponent;
    label: string;
    yasBtn: boolean;
    noBtn: boolean;
       constructor(public translateService: TranslateService) {
        // TODO initilize data members here..!

    }
      ngOnInit() {
        try {
          if (this.dialog.data.label) {
            this.label = this.dialog.data.label;
          }
          if (this.dialog.data.yesBtn) {
            this.yasBtn = this.dialog.data.yesBtn;
          }
        } catch (e) {

        }

      }
      yes() {this.dialog.close(true); }

  }
