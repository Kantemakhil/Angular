
import {
    Component, OnInit
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OciintrrService } from '../service/ociintrr.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { OffIntakeReviewQueue } from '@cm/intakeclosure/beans/OffIntakeReviewQueue';
@Component({
    selector: 'app-ociintrr',
    templateUrl: './ociintrr.component.html'
})
export class OciintrrComponent implements OnInit {
    intakeColumnDef: any[];
    msgs: any[] = [];
    offIntakeModel: OffIntakeReviewQueue = new OffIntakeReviewQueue();
    intakeReviewData: OffIntakeReviewQueue[] = [];
    tableIndex = 0;
    constructor(private ociintrrFactory: OciintrrService,
        public translateService: TranslateService, public sessionManager: UserSessionManager) {
        this.intakeColumnDef = [];
    }
    ngOnInit() {
        this.offIntakeModel = new OffIntakeReviewQueue();
        this.intakeColumnDef = [
            {
                fieldName: this.translateService.translate('system-profile.off-id-code'), field: 'offenderIdDisplay', editable: false, width: 150, datatype: 'text'
            },
            {
                fieldName: this.translateService.translate('system-profile.name-last'), field: 'lastName', editable: false, width: 150,
                datatype: 'text'
            },
            {
                fieldName: this.translateService.translate('system-profile.name-given-1'), field: 'firstName', editable: false,
                datatype: 'text', width: 150
            },
            {
                fieldName: this.translateService.translate('system-profile.name-given-2'), field: 'middleName', editable: false,
                datatype: 'text', width: 150
            },
            {
                fieldName: this.translateService.translate('system-profile.birth-date'), field: 'birthDate', editable: false,
                datatype: 'date', width: 150
            },
            {
                fieldName: this.translateService.translate('system-profile.book-id'), field: 'bookingNo', editable: false,
                datatype: 'text', width: 150
            },
            {
                fieldName: this.translateService.translate('ociintrr.location'), field: 'agyLocId', editable: false,
                datatype: 'text', width: 150,
            },
            {
                fieldName: this.translateService.translate('ociintrr.intakedate'), field: 'intakeDate', editable: false,
                datatype: 'date', width: 150,
            },

            {
                fieldName: this.translateService.translate('ociintrr.supervisionstatus'), field: 'supStatus', editable: false,
                datatype: 'text', width: 150,
            },
            {
                fieldName: this.translateService.translate('ociintrr.intakerecordeddate'), field: 'queuedDate', editable: false,
                datatype: 'date', width: 150,
            },
            {
                fieldName: this.translateService.translate('ociintrr.accept'), field: 'acceptBtn', datatype: 'launchbutton', editable: true, width: 100,
                data: 'row', updateField: 'row', modal: true, onLaunchClick: this.acceptIntake
            },
        ];
        this.intakeReviewExecuteQuery();
    }
     /**
      * when we click on Accept button in the grid this event occur
      */
    acceptIntake = (data) => {
        data.queuedDate = new Date(data.queuedDate);
        data.intakeDate = new Date(data.intakeDate);
        data.supStatusDatetime= new Date(data.supStatusDatetime)
        const serviceObj = this.ociintrrFactory.offIntakeRevAccept(data);
        serviceObj.subscribe(data => {
            if (data === 1) {
                this.show(this.translateService.translate('common.addupdateremoverecordsuccess'), 'success');
                this.intakeReviewExecuteQuery();
            } else {
                this.show(this.translateService.translate('common.addupdateremoverecordfailed'));
            }
        });
    }
    /**
      * To display the messages
      */
    show(vldmsg, type?) {
        type = type ? type : 'warn';
        vldmsg = this.translateService.translate(vldmsg);
        const msgval = [{ message: vldmsg, type: type }];
        this.msgs = [...msgval];
    }
    onRowClickIntakeReview(event) {
        if (event) {
        } else {
        }
    }
    // execute query
    intakeReviewExecuteQuery() {
        const serviceObj = this.ociintrrFactory.offIntakeReiewQuExecuteQuery(this.offIntakeModel);
        serviceObj.subscribe(data => {
            if (data.length === 0) {
                this.intakeReviewData = [];
                this.tableIndex = -1;
            } else {
                data.forEach(element => {
                    element.acceptBtn = 'Accept';
                    element.caseloadId = this.sessionManager.currentCaseLoad;
                    element.modifyUserId = this.sessionManager.getId();
                });
                this.intakeReviewData = data;
                this.tableIndex = 0;
            }
        });
    }
}
