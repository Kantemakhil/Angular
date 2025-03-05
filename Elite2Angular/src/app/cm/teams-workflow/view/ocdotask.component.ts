import {
    Component, OnInit
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OcdotaskService } from '../service/ocdotask.service';
import { TaskAssignmentHty } from '@cm/teams-workflow/beans/TaskAssignmentHty';
import { OffenderSearchService } from '@common/offender-records/service/offender-search.service';
import { VHeaderBlock } from '@commonbeans/VHeaderBlock';
import { DialogService } from '@core/ui-components/dialog/dialog.service';
import { DateFormat } from '@core/ui-components/datepicker/dateFormat';

@Component({
    selector: 'app-ocdotask',
    templateUrl: './ocdotask.component.html'
})

export class OcdotaskComponent implements OnInit {
    msgs: any[] = [];
    tasksAsgnData: TaskAssignmentHty[] = [];
    tasksAsgnDataTemp: TaskAssignmentHty[] = [];
    tasksAsgnModel: TaskAssignmentHty = new TaskAssignmentHty();
    tasksAsgnModelForDialogue: TaskAssignmentHty = new TaskAssignmentHty();
    tasksAsgnIndex = -1;
    tasksAsgnInsertList: TaskAssignmentHty[] = [];
    tasksAsgnUpdatetList: TaskAssignmentHty[] = [];
    tasksAsgnDeleteList: TaskAssignmentHty[] = [];
    tasksAsgnColumnDef: any[];
    tasksAsgnReadOnly: boolean;
    rgcompletersnRg: any[] = [];
    rgstaffRg: any[] = [];
    rgteamRg: any[] = [];
    rgtasksubtypeRg: any[] = [];
    rgtasktypeRg: any[] = [];
    disabledTaskHistory: boolean;
    vHeaderBlockModel: VHeaderBlock = new VHeaderBlock();
    msglist = [];
    message = ' Invalid.';
    type = 'error';

    constructor(private ocdotaskFactory: OcdotaskService,
        private offenderSearchService: OffenderSearchService,
        public translateService: TranslateService, private dialogService: DialogService) {
        this.tasksAsgnColumnDef = [];

    }
    ngOnInit() {
        this.disabledTaskHistory = true;
        this.vHeaderBlockModel = new VHeaderBlock();
        this.vHeaderBlockModel = this.offenderSearchService.selectedOffender;
        this.tasksAsgnColumnDef = [
            {
                fieldName: this.translateService.translate('common.assigned'),
                field: 'assignmentDate', datatype: 'date', editable: false, width: 150
            },
            {
                fieldName: this.translateService.translate('common.tasktype'),
                field: 'workType', datatype: 'lov', domain: 'TASK_TYPE', editable: false, width: 150
            },
            {
                fieldName: this.translateService.translate('common.subtype'), field: 'workSubType', datatype: 'lov',
                domain:'TASK_SUBTYPE'/*link: 'ocdotask/rgTaskSubTypeRecordGroup'*/, editable: false, width: 150
            },
            {
                fieldName: this.translateService.translate('common.team'), field: 'teamCode',
                datatype: 'lov', link: 'ocdotask/rgTeamRecordGroup', editable: false, width: 150
            },
            {
                fieldName: this.translateService.translate('ocdotask.officername'), field: 'staffId',
                datatype: 'lov', link: 'ocdotask/rgStaffRecordGroup?teamCode=',
                parentField: 'teamCode', optionWidth: 300, editable: false, width: 150
            },
            {
                fieldName: this.translateService.translate('common.duedate'), field: 'dueDate', datatype: 'date',
                editable: false, width: 150
            },
            {
                fieldName: this.translateService.translate('ocdotask.completiondate'), field: 'completionDate',
                datatype: 'date', editable: false, width: 150
            },
            {
                fieldName: this.translateService.translate('ocdotask.completionreason'), field: 'completeReasonCode',
                datatype: 'lov', domain: 'COMPLETE_RSN',
                editable: false, width: 150
            },
        ];
        if (!this.vHeaderBlockModel) {
            this.type = 'warn';
            this.show('common.pleasesearchforvalidoffender');
        }
    }
    /**
     * event is fired when select the offender in search block.
     * @param offender
     */
    onOffenderChange(offender) {
        if (offender) {
            this.tasksAsgnModel = new TaskAssignmentHty();
            this.vHeaderBlockModel = offender;
            this.tasksAsgnModel.offenderBookId = this.vHeaderBlockModel.offenderBookId;
            this.tasksExecuteQuery();
        } else {
            this.tasksAsgnModel = new TaskAssignmentHty();
            this.tasksAsgnData = [];
        }
    }
    /*
    * This method is used to show popup messages.
    */
    show(vldmsg, type?) {
        type = type ? type : 'warn';
        vldmsg = this.translateService.translate(vldmsg);
        const msgval = [{ message: vldmsg, type: type }];
        this.msgs = [...msgval];
      }
    /**
     * method is used to get the data from DB and displays the data in grid.
     */
    tasksExecuteQuery() {
        const tasksResult = this.ocdotaskFactory.
            tasksExecuteQuery(this.tasksAsgnModel);
        tasksResult.subscribe(tasksResultList => {
            if (tasksResultList.length === 0) {
                this.tasksAsgnData = [];
                this.disabledTaskHistory = true;
                this.show('common.querycaused');
                return;
            } else {
                this.disabledTaskHistory = false;
                tasksResultList.forEach(element => {
                    if (element.assignmentDate) {
                        element.assignmentDate = DateFormat.getDate(element.assignmentDate);
                    }
                });
                this.tasksAsgnData = tasksResultList;
                this.tasksAsgnModel = this.tasksAsgnData[0];
                this.tasksAsgnIndex = 0;
            }
        });
    }
    /**
     * event is fired when click on row in the grid in the block of Tasks.
     * @param event
     */
    rowClickOnTasks(event) {
        if (event) {
            this.tasksAsgnModel = new TaskAssignmentHty();
            this.tasksAsgnModel = event;
        }
    }
    onButTaskHistoryclick = () => {
        this.tasksAsgnModelForDialogue = this.tasksAsgnModel;
        this.tasksAsgnModelForDialogue.offenderBookId = this.vHeaderBlockModel.offenderBookId;
        this.tasksAsgnModelForDialogue.officerName = this.vHeaderBlockModel.lastName;
        this.tasksAsgnModelForDialogue.triggerName = this.vHeaderBlockModel.firstName;
        this.tasksAsgnModelForDialogue.staffId = this.vHeaderBlockModel.offenderId;
        this.tasksAsgnModelForDialogue.workType = this.tasksAsgnModelForDialogue.workTypeDescription;
        this.dialogService.openLinkDialog('/OCUWKHTY', this.tasksAsgnModelForDialogue, 80).subscribe(result => {
        });
      }
}
