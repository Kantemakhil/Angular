import { Component, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { DialogComponent } from '@ui-components/dialog/dialog.component';
import { Router } from '@angular/router';
  @Component({
    selector: 'app-oidcountpopup',
    templateUrl: './oidcountpopup.component.html'
  })

  export class OidcountPopUpComponent implements OnInit {
    @ViewChild('dialog', {static: true}) dialog: DialogComponent;
    label: string;
    yasBtn: boolean;
    noBtn: boolean;
    constructor( private router: Router,
                 public translateService: TranslateService) {
    }
      ngOnInit() {
        try {
          if (this.dialog.data.label) {
            this.label = this.dialog.data.label;
          }
        } catch (e) {

        }

      }
      continue() {this.dialog.close('continue'); }
      start() {this.dialog.close('start'); }
      exit() {
        this.dialog.close(false);
          this.router.navigate(['/home']);
    }
  }
