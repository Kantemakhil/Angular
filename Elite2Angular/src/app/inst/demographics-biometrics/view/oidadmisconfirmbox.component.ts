import {
    Component, OnInit, OnDestroy,ViewChild
  } from '@angular/core';
  import { DialogComponent } from '@ui-components/dialog/dialog.component';
  @Component({
    selector: 'app-oidadmisconfirmbox',
    templateUrl: './oidadmisconfirmbox.component.html'
  })

  export class OidadmisconfirmboxComponent implements OnInit, OnDestroy {
    @ViewChild('dialog', {static: true}) dialog: DialogComponent;
    label: string;
    yasBtn: boolean;
    noBtn: boolean;
      ngOnInit() {
        try {
          if (this.dialog.data.label) {
            this.label = this.dialog.data.label;
          }
          if (this.dialog.data.yesBtn) {
            this.yasBtn = this.dialog.data.yesBtn;
          }
          if (this.dialog.data.noBtn) {
            this.noBtn = this.dialog.data.noBtn;
          }
        } catch (e) {

        }

      }
      yes() {this.dialog.close(true); }
      no() {this.dialog.close(false); }
      ngOnDestroy() {

      }
  }
