import {
    Component, OnInit,
    ViewChild
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OcussessService } from '../service/ocussess.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { CourseSchedules } from '@inst/institutional-activities/maintenance/beans/CourseSchedules';
import { DialogComponent } from '@core/ui-components/dialog/dialog.component';
import { DialogService } from '@core/ui-components/dialog/dialog.service';
import { DateFormat } from '@core/ui-components/datepicker/dateFormat';
// import required bean declarations

@Component({
    selector: 'app-ocussess',
    templateUrl: './ocussess.component.html'

})

export class OcussessComponent implements OnInit {
    @ViewChild('dialog', { static: true }) dialog: DialogComponent;
    // Variable declaration
    actionName: string;
    lovModel: any[];
    msgs: any[] = [];
    nameOfLovPage: string;
    listToCompare: any[] = [];
    crsschData: CourseSchedules[] = [];
    crsschDataTemp: CourseSchedules[] = [];
    // TODO angular.copy(this.crsschData, thiscrsschDataTemp);
    crsschModel: CourseSchedules = new CourseSchedules();
    crsschIndex: Number = 0;
    crsschInsertList: CourseSchedules[] = [];
    crsschUpdatetList: CourseSchedules[] = [];
    crsschDeleteList: CourseSchedules[] = [];
    minDate: Date;
    display: boolean;
    errorMessage: string;
    headerMessage: string;
    disabled: boolean;
    editable: Boolean = true;
    crsSchColumnDef: any[];
    headerReadOnly: Boolean = false;
    crsSchReadOnly: Boolean = false;
    butCtrlReadOnly: Boolean = false;
    tableIndex: number;
    nbtDescription: any;
    constructor(private ocussessFactory: OcussessService, public translateService: TranslateService,
        public sessionManager: UserSessionManager, public dialogService: DialogService) {
        // TODO initilize data members here..!
        this.crsSchColumnDef = [];

    }
    ngOnInit() {
        /* this.dialog.data.phaseDesc = "ASDF";
        this.dialog.data.crsActyId = 6978; */
        this.nbtDescription = this.dialog.data.phaseDesc;
        this.crsSchColumnDef = [
            { fieldName: this.translateService.translate('ocussess.date'), field: 'scheduleDate', editable: false, width: 150, datatype: 'date' },
            { fieldName: this.translateService.translate('ocussess.weekday'), field: 'weekday', editable: false, width: 150 },
            { fieldName: this.translateService.translate('ocussess.starttime'), field: 'startTime', editable: false, width: 150, datatype: 'time' },
            { fieldName: this.translateService.translate('ocussess.endtime'), field: 'endTime', editable: false, width: 150, datatype: 'time' },
            { fieldName: this.translateService.translate('ocussess.session'), field: 'sessionNo', editable: false, width: 150, },

        ];
        // TODO all initializations here
        this.crsschExecuteQuery();
    }
    /** 
     * This function displays the messages
     */
    onRowClickcrssch(event) {
        if (event) {
            this.crsschModel = event;
        }
    }
    onButSelectclick() {
        if ((DateFormat.compareDate(DateFormat.getDate(this.crsschModel.scheduleDate), DateFormat.getDate()) === -1)) {
            const data = {
                label: this.translateService.translate('ocussess.datecomparefuture'), yesBtn: true,
                yesLabel: 'Yes', noBtn: true
            };
            this.dialogService.openLinkDialog('/ocucoffeconfirmbox', data, 30).subscribe(result => {
                if (result) {
                    this.dialog.close(this.crsschModel);
                } else {

                }

            });
        } else {
            this.dialog.close(this.crsschModel);
        }


    }
    cancel() {
        this.dialog.close(null);
    }

    get disableSelectButton() {
        if (this.crsschData.length > 0) {
            return false;
        }
        return true;
    }



    crsschExecuteQuery() {
        this.crsschModel.crsActyId = this.dialog.data.crsActyId;
        const crsschResult = this.ocussessFactory.crsSchExecuteQuery(this.crsschModel);
        crsschResult.subscribe(crsschResultList => {
            if (crsschResultList.length === 0) {
                this.crsschData = [];
            } else {
                this.crsschData = crsschResultList;
                this.crsschModel = crsschResultList[0];
                this.tableIndex = 0;
            }
        });
    }

}

