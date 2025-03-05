import {
    Component, OnInit, ViewChild, Optional, Inject
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { DialogComponent } from '@ui-components/dialog/dialog.component';
import { DynamicCompLoaderService } from './service/dynamic-comp-loader.service';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';


@Component({
  selector: 'app-taskformdialog',
  templateUrl: './taskformdialog.component.html'
})

export class TaskFormDialogComponent  implements OnInit{
  @ViewChild('dialog', {static:true}) dialog: DialogComponent;
  form='';
  alertRoute= false;
  caseNoteRoute=false;
  dialogRef: MatDialogRef<any> | null;
  constructor(public translateService: TranslateService,
    private dynamicCompLoaderService:DynamicCompLoaderService,
    public dialogs: MatDialog,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
    private router: Router){
    //  this.form='app-ocdccase';

      
  }
  ngOnInit() {
    if(this.dialog && this.dialog.data){
      this.dynamicCompLoaderService.moduleName = this.dialog.data.sourceName;
      if(this.dialog.data.sourceName && this.dialog.data.sourceName == 'OCDCCASE'){
        this.alertRoute=false;
        this.caseNoteRoute=true;
      }else{
       this.caseNoteRoute=false;
       this.alertRoute=true;
      }
   }
   
}
loadComponent (){
  const dialogConfig = {
      disableClose: false,
      hasBackdrop: true,
      height: '90%',
      width: '100%',
      position: {
          top: '',
          bottom: '',
          left: '',
          right: ''
      },
  };

  
  let routes = this.router.config;
routes.forEach((route)=>{
    if(route.children) {
        route.children.filter(child=>{
            if(child.path === this.dynamicCompLoaderService.moduleName) {
              this.dialogRef = this.dialogs.open(child.component, dialogConfig);

       this.dialogRef.afterClosed().subscribe((result) => {
      this.dialogRef = null;
          });
            }
          })
       
    }
    else if(route.path === this.dynamicCompLoaderService.moduleName){
      this.dialogRef = this.dialogs.open(route.component, dialogConfig);

  this.dialogRef.afterClosed().subscribe((result) => {
      this.dialogRef = null;

  });
    }
});
} 
}
