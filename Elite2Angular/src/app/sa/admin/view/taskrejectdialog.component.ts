import { TaskUsers } from './../beans/TaskUsers';
import { OumcamtaskService } from './../service/oumcamtask.service';
import {
    Component, OnInit, ViewChild
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { DialogComponent } from '@ui-components/dialog/dialog.component';


@Component({
  selector: 'app-taskrejectdialog',
  templateUrl: './taskrejectdialog.component.html'
})

export class TaskRejectDialogComponent  implements OnInit{
  @ViewChild('dialog', {static:true}) dialog: DialogComponent;
  form='';
  alertRoute= false;
  caseNoteRoute=false;
  commentText = '';
  taskData = new TaskUsers();
  msgs: { message: any; type: any; }[];
  constructor(public translateService: TranslateService,private oumcamtaskService:OumcamtaskService){

        
  }
  ngOnInit() {
    if(this.dialog && this.dialog.data){
      this.taskData = this.dialog.data;
      this.taskData.actionButton="R";

   }
}
completeTask() {
  if (this.commentText) {
     this.taskData.comment=this.commentText;
      const result = this.oumcamtaskService.completeTask(this.taskData);
      result.subscribe(data => {
          if (data && data === 1) {
             this.show('common.addupdateremoverecordsuccess', 'success');
             this.dialog.close(true);
          }

      })
  }else{
    this.show('taskreject.commentmust', 'warn');
  }

}
show(vldmsg, type?) {
  type = type ? type : 'warn';
  vldmsg = this.translateService.translate(vldmsg);
  const msgval = [{ message: vldmsg, type: type }];
  this.msgs = [...msgval];
}

}
