import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { TranslateService } from '@common/translate/translate.service';

@Component({
  selector: 'app-password-dialog',
  templateUrl: './password-dialog.component.html',
  styleUrls: ['./password-dialog.component.scss']
})
export class PasswordDialogComponent implements OnInit {

  title;
  showPassword:boolean = false;
  password = '';
  constructor(public translateService: TranslateService, public dialogRef: MatDialogRef<PasswordDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.showPassword = this.data.showPassword == true ? true : false;
    this.password = this.data.password;
    this.title = this.data.title ? this.data.title : 'Password';
  }

  close(){
    this.dialogRef.close(true);
  }

}
