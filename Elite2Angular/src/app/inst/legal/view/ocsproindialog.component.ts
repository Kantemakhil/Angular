import { Component, OnInit, ViewChild } from "@angular/core";
import { TranslateService } from "@common/translate/translate.service";
import { CourseActivities } from "@instprogramswithoutschedulesbeans/CourseActivities";
import { OffenderBookings } from "../../demographics-biometrics/beans/OffenderBookings";
import { OcsproinService } from "../service/ocsproin.service";
import { DialogComponent } from '@ui-components/dialog/dialog.component';

@Component({
    selector: 'app-ocsproindialog',
    templateUrl: './ocsproindialog.component.html',
    styleUrls: []
})
export class OcsproindialogComponent implements OnInit {

    @ViewChild('dialog', { static: true }) dialog: DialogComponent;

    refOffendersColDef: any[] = [];
    refOffenders: OffenderBookings[] = [];
    refSearchBean: CourseActivities = new CourseActivities();
    msgs: { message: any; type: any; }[];

    constructor(public translateService: TranslateService, private ocsproinFactory: OcsproinService) {

    }
    ngOnInit() {
        this.refOffendersColDef = [
            { fieldName: this.translateService.translate('common.lastname'), field: 'dspLastName', editable: false, width: 150, datatype: 'text' },
            { fieldName: this.translateService.translate('common.firstname'), field: 'dspFirstName', editable: false, width: 150, datatype: 'text' },
            { fieldName: this.translateService.translate('system-profile.off-id-code'), field: 'offenderIdDisplay', editable: false, width: 150, },
            { fieldName: this.translateService.translate('ocsproin.communityserviceconditionstartdate'), field: 'offenderStartDate', editable: false, width: 150, datatype: 'date' },
            { fieldName: this.translateService.translate('ocsproin.communityserviceconditionexpirydate'), field: 'offenderEndDate', editable: false, width: 150, datatype: 'date' },
            { fieldName: this.translateService.translate('ocsproin.hoursimposed'), field: 'conditionLength', editable: false, width: 150, datatype: 'text' },
            { fieldName: this.translateService.translate('ocsproin.referraldate'), field: 'referralDate', editable: false, width: 150, datatype: 'date' },
        ];
        this.referredExeQuery(this.dialog.data);
    }


    show(vldmsg, type?) {
        type = type ? type : 'warn';
        vldmsg = this.translateService.translate(vldmsg);
        const msgval = [{ message: vldmsg, type: type }];
        this.msgs = [...msgval];
    }

    referredExeQuery(event) {
        this.ocsproinFactory.referredExeQuery(event).subscribe(data => {
            if (data.length === 0) {
                this.show(this.translateService.translate('common.querycausednorecords'), 'warn');
                this.refOffenders = [];
                return;
            } else {
                data.forEach(ele => {
                    /* ele.offenderEndDate = event.offenderEndDate; */
                    ele.offenderStartDate = event.scheduleStartDate;
                });
                this.refOffenders = data;
            }
        });
    }
    closeDialog() {
        this.dialog.close(null);
    }
}