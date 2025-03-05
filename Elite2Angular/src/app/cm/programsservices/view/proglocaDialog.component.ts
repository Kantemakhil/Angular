
import { Component, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { DialogComponent } from '@core/ui-components/dialog/dialog.component';
import { OcdpatteService } from '../service/ocdpatte.service';
import { CourseSchedules } from '@inst/institutional-activities/maintenance/beans/CourseSchedules';
// import required bean declarations

@Component({
    selector: 'app-proglocadialog',
    templateUrl: './proglocaDialog.component.html'
})

export class ProglocaDialogComponent implements OnInit {
    lovModel: any[];
    msgs: any[] = [];
    minDate: any;
    houseInformation: any;
    streetInformation: any;
    areaInformation: any;
    pincode: any;
    facility: any;
    display: boolean;
    sentenceColumnDef: any[];
    sentenceData: any[] = [];
    tableIndex = 0;
    courseScheduleModel: CourseSchedules = new CourseSchedules();
    @ViewChild('dialog', { static: true }) dialog: DialogComponent;
    constructor(private ocdprogrFactory: OcdpatteService, public translateService: TranslateService,
        public sessionManager: UserSessionManager) {
    }
    ngOnInit() {
        if (this.dialog.data.crsActyId) {
            this.courseScheduleModel.programInstanceId = this.dialog.data.crsActyId;
            this.getProgLocation();
        }
    }
    /**
* This function displays the messages
*/
    show(vldmsg, type?) {
        type = type ? type : 'warn';
        vldmsg = this.translateService.translate(vldmsg);
        const msgval = [{ message: vldmsg, type: type }];
        this.msgs = [...msgval];
    }
    /**
    * This function loads the data into the Master Record and its child records
    */
    getProgLocation() {
        const offcourseattendancesResult = this.ocdprogrFactory.
            getProgLocation(this.courseScheduleModel);
        offcourseattendancesResult.subscribe(data => {
            if (data === 0) {
            } else {
                this.houseInformation = data.house;
                this.streetInformation = data.street;
                this.areaInformation = data.area;
                this.pincode = data.zipPostalCode;
                this.facility = data.facility;
            }
        })
    }
    cancel() {
        this.dialog.close(null);
    }
}
