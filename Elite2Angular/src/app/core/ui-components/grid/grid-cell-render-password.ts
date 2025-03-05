import { AfterViewInit, Component, ViewChild, ViewContainerRef } from '@angular/core';
import { ICellRendererAngularComp } from '@ag-grid-community/angular';
import { PasswordDialogComponent } from './password-dialog.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { UserSessionManager } from '@core/classes/userSessionManager';

@Component({
    selector: 'grid-cell-render-password',
    template: `
    <input type="password" matInput class="grid-cell-render-password" [(ngModel)]="value" readonly>
    <mat-icon id="grid-cell-eye" (click)="openPasswordDialog()">remove_red_eye</mat-icon>
    `,
    styles: [
        '.grid-cell-render-password { border:none; background: transparent; position: relative;} #grid-cell-eye{position: absolute;right: 10px;cursor: pointer;}'
    ]
})
export class GridCellRenderPasswordComponent implements ICellRendererAngularComp {
    private params: any;
    public value: any;
    public required: boolean;
    private selectedCell: any;
    dialogRef: MatDialogRef<PasswordDialogComponent> | null;
    constructor(public dialog: MatDialog,public sessionManager: UserSessionManager){

    }

    agInit(params: any): void {
        this.params = params;
        this.value = params.value;
        if (this.params.colDef.required) {
            this.required = this.params.colDef.required;
        }
        this.selectedCell = this.params.api.getFocusedCell();
    }

    verifyValue(ev){ }

    refresh(): boolean {
        return false;
    }

    openPasswordDialog(){
        let showPassword = false;
        if(this.sessionManager && this.sessionManager['innerUserRoles'] && this.sessionManager['innerUserRoles']['roles']){
           let accessObj = this.sessionManager['innerUserRoles']['roles'];
           if(accessObj['OIPASINF'] == 'full'){
            showPassword = true;
           }
        }
        
        let title = this.params.data.KEY_DESC ? this.params.data.KEY_DESC : 'Password';
        const dialogConfig = {
            data: { 
                    title: title,
                    showPassword: showPassword,
                    password: this.value
                  },
            disableClose: true,
            hasBackdrop: true,
            height: '170px',
            width: '100%',
          };
          this.dialogRef = this.dialog.open(PasswordDialogComponent, dialogConfig);
          this.dialogRef.afterClosed().subscribe((result) => {

          });
    }

}
