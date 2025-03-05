import { Component, OnInit, ViewChild} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OcuauthrService } from '../service/ocuauthr.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { DialogComponent } from '@core/ui-components/dialog/dialog.component';
import { TaskAssignmentHty } from '@cm/teams-workflow/beans/TaskAssignmentHty';




@Component({
    selector: 'app-ocuauthr',
    templateUrl: './ocuauthr.component.html',

})

export class OcuauthrComponent implements OnInit {
    @ViewChild('ocuauthrDialog', { static: true }) ocuauthrDialog: DialogComponent;
    msgs: any[] = [];
    tskAssHtyData: TaskAssignmentHty[] = [];
    retrieveDisable: boolean;
    tskasshtyDataTemp: TaskAssignmentHty[] = [];
    tskAssHtyModel: TaskAssignmentHty = new TaskAssignmentHty();
    tskAssHtyModelTemp: TaskAssignmentHty = new TaskAssignmentHty();
    tskAssHtyColumnDef: any[];
    msglist: any[];
    message: any;
    type: any;
    tableIndex: number;
    constructor(private ocuauthrFactory: OcuauthrService, public translateService: TranslateService,
        public sessionManager: UserSessionManager) {
        this.tskAssHtyColumnDef = [];

    }
    ngOnInit() {
        this.retrieveDisable = false;
        this.tskAssHtyData = [];
        if (this.ocuauthrDialog.data && this.ocuauthrDialog.data.workflowId) {
            this.tskAssHtyModel.workflowHistoryId = this.ocuauthrDialog.data.workflowId;
            this.tskAssHtyModel.flag = false;
        } else {
            this.tskAssHtyModel.flag = true;
        }
        this.tskAssHtyColumnDef = [
            {
                fieldName: this.translateService.translate('ocuauthr.teamResponsible'), field: 'code',
                editable: false, width: 150, datatype: 'text'
            },
            {
                fieldName: this.translateService.translate('ocuauthr.teamName'), field: 'description',
                editable: false, width: 150, datatype: 'text'
            },
            {
                fieldName: this.translateService.translate('ocuauthr.lastname'),
                field: 'lastName', editable: false, width: 150, datatype: 'text',
            },
            {
                fieldName: this.translateService.translate('ocuauthr.firstName'),
                field: 'firstName', editable: false, width: 150, datatype: 'text'
            },
            {
                fieldName: this.translateService.translate('ocuauthr.assignDate'),
                field: 'assignmentDate', editable: false, width: 150, datatype: 'date'
            },
        ];


    }

    show() {
        this.msglist = [];
        this.msglist.push({ message: this.message, type: this.type });
        this.msgs = [...this.msglist];
    }
    onRowClicktskasshty(event) {
       
    }

    onButExitclick() {
        this.tskAssHtyData = [];
        this.ocuauthrDialog.close(null);
    }

    onButRetrieveClick(){
        this.tskasshtyExecuteQuery(this.tskAssHtyModel);
    }

    tskasshtyExecuteQuery(obj) {
            const tskasshtyResult = this.ocuauthrFactory.
                tskAssHtyExecuteQuery(obj);
            tskasshtyResult.subscribe(data => {
                if (data.length === 0) {
                    this.tskAssHtyData = [];
                    this.message = this.translateService.translate('common.querycausednorecords');
                    this.type = 'warn';
                    this.show();

                } else {
                    this.tskAssHtyData = data;
                    this.tableIndex = 0;
                }
            });
            this.retrieveDisable = true;
    }

}
