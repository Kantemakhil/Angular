import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { DialogComponent } from '@ui-components/dialog/dialog.component';
  @Component({
    selector: 'app-ocucoffeconfirmbox',
    templateUrl: './ocmschprformbox.component.html'
  })

  export class OcmschprformboxComponent implements OnInit, OnDestroy {
    @ViewChild('dialog', {static: true}) dialog: DialogComponent;
    label: string;
    yasBtn: boolean;
    noBtn: boolean;
    yesLabel: string;
    noLabel: string;
    allowLineGap: boolean;
    cancelBtn: boolean;
    cancelLabel: string;
      ngOnInit() {
        try {
          if (this.dialog.data.label) {
            this.label =  this.addBeakLinke(this.dialog.data.label);
            // this.label = this.dialog.data.label;
          }
          if (this.dialog.data.yesBtn) {
            this.yasBtn = this.dialog.data.yesBtn;
          }
          if (this.dialog.data.noBtn) {
            this.noBtn = this.dialog.data.noBtn;
          }
          if (this.dialog.data.cancelBtn) {
            this.cancelBtn = this.dialog.data.cancelBtn;
          }
          if (this.dialog.data.allowLineGap) {
            this.allowLineGap = this.dialog.data.allowLineGap;
          }
          if (this.dialog.data.yesLabel) {
            this.yesLabel = this.dialog.data.yesLabel;
          } else {
            this.yesLabel = 'Yes';
          }
          if (this.dialog.data.noLabel) {
            this.noLabel = this.dialog.data.noLabel;
          } else {
            this.noLabel = 'No';
          }
          if (this.dialog.data.cancelLabel) {
            this.cancelLabel = this.dialog.data.cancelLabel;
          } else {
            this.cancelLabel = 'Cancel';
          }
        } catch (e) {

        }

      }
      yes() {this.dialog.close(true); }
      no() {this.dialog.close(false); }
      cancel() {this.dialog.close(null); }

      addBeakLinke(labelStr: string): string {
       const label = {msg: ''};
        // while (label.includes('\n')) {
        //   label.replace('\n', '<br/>');
        // }
        labelStr.split('').forEach(element => {
          if (element === '\n') {
            label.msg += '<br\>';
          } else {
            label.msg += element;
          }
        });
        return label.msg;
      }

      ngOnDestroy() {

      }
  }
