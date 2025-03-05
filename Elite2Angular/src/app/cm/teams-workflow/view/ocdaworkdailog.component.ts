import {
    Component, OnInit, ViewChild
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OcdaworkService } from '../service/ocdawork.service';
import { TagWorkflowBrowseQueue } from '@cm/teams-workflow/beans/TagWorkflowBrowseQueue';
import { DialogComponent } from '@ui-components/dialog/dialog.component';
import { UserSessionManager } from '@core/classes/userSessionManager';
//   import required bean declarations

@Component({
    selector: 'app-ocdaworkdailog',
    templateUrl: './ocdaworkdailog.component.html'
})

export class ocdaworkdailogComponent implements OnInit {
    //   Variable declaration
    @ViewChild('dialog') dialog: DialogComponent;
    teamqueueData: TagWorkflowBrowseQueue[] = [];
    teamqueueModel: TagWorkflowBrowseQueue = new TagWorkflowBrowseQueue();
    minDate: any;
    display: boolean;
    errorMessage: string;
    headerMessage: string;
    disabled: boolean;
    editable = true;
    type = 'error';
    msglist = [];
    message = ' Invalid.';
    msgs: any[] = [];
    constructor(private ocdaworkFactory: OcdaworkService,
        public translateService: TranslateService,
        public sessionManager: UserSessionManager) {
        //   TODO initilize data members here..!
    }
    ngOnInit() {
    }
    show(vldmsg, type?) {
        type = type ? type : 'warn';
        vldmsg = this.translateService.translate(vldmsg);
        const msgval = [{ message: vldmsg, type: type }];
        this.msgs = [...msgval];
  }
    butSaveWhenButtonPressedTrigger () {
        if (!this.teamqueueModel.completeReasonode) {
            this.show('common.reasonmustbeentered');
            return;
        }
        this.teamqueueModel.queueName = this.dialog.data.queueName;
        this.teamqueueModel.msgId = this.dialog.data.msgId;
        this.teamqueueModel.completionDate = new Date();
        this.teamqueueModel.completeUserId = this.sessionManager.getId();
        this.teamqueueModel.taskId = this.dialog.data.taskId;
        const teamqueueSaveData = this.ocdaworkFactory.getCompleteTask(this.teamqueueModel);
        teamqueueSaveData.subscribe(data => {
            if (data === 1) {
                this.show('common.addupdateremoverecordsuccess', 'success');
                this.dialog.close(true);
            } else {
                this.show('common.addupdateremoverecordfailed');
                this.dialog.close(false);
            }
        });
    }
    onButExitclick() {
        this.dialog.close(false);
    }
}
