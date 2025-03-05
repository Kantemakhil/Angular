import {
    Component, OnInit,
    ViewChild
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { DialogComponent } from '@core/ui-components/dialog/dialog.component';
import { ManageAppBarService } from "@core/service/manage-app-bar.service";
// import required bean declarations

@Component({
    selector: 'app-ociscatadialog',
    templateUrl: './ociscatadialog.component.html'
})

export class OciscatadialogComponent implements OnInit {
    msgs: any[] = [];
    @ViewChild('dialog', { static: true }) dialog: DialogComponent;
    personData: any;
    constructor(
        public translateService: TranslateService,
        private appbarService: ManageAppBarService,
        private sessionManager: UserSessionManager) {
    }
    ngOnInit() {
        const dialogData = this.dialog.data;

    }

    show(vldmsg, type?) {
        type = type ? type : 'warn';
        vldmsg = this.translateService.translate(vldmsg);
        const msgval = [{ message: vldmsg, type: type }];
        this.msgs = [...msgval];
    }
    trMsg(msg, astr?) {
        return astr ? this.translateService.translate(msg).concat(astr) : this.translateService.translate(msg);
    }

    assignRecord(event) {
        
        if (!event) {
            this.dialog.close(null);
        } else {
            // todo conditions
            if (event && event.length === 0) {
                this.show('ociscata.pleaseselectoneservice');
                return;
            }
            /* this.dialog.close({
                providerName: event.providerName, programDescription: event.courseActivityDesc,coursePhaseId: event.coursePhaseId,
                crsActyId: event.crsActyId, capacity: event.capacity, courseActivity: event.courseActivityCode, programId: event.programId,
                scheduleStartDate: event.scheduleStartDate, scheduleEndDate: event.scheduleEndDate, phaseDesc: event.phaseDesc
            }); */
            this.dialog.close(event);
        }
    }

    onButCancelclick() {
        this.dialog.close(true);
        this.appbarService.manageIcon(true);
        
    }

}
