import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
  headerMsg: string;
  bodyMsg: string;
}

@Component({
  selector: 'app-save-confirmation',
  templateUrl: './save-confirmation.component.html',
  styleUrls: ['./save-confirmation.component.css']
})
export class SaveConfirmationComponent {

  constructor(public dialogRef: MatDialogRef<SaveConfirmationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  save() {
    this.dialogRef.close('save');
  }

  donotSave() {
    this.dialogRef.close('donot-save');
  }

  cancel() {
    this.dialogRef.close('cancel');
  }

}
