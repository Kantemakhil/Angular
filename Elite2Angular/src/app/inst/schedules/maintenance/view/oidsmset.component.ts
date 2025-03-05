import {
    Component,
    OnInit
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { ScheduleMovementSetting } from '@inst/schedules/maintenance/beans/ScheduleMovementSetting';
import { SchMovSettingCommitBean } from '@inst/schedules/maintenance/beans/SchMovSettingCommitBean';
import { OidsmsetService } from '@inst/schedules/maintenance/service/oidsmset.service';
import { UserSessionManager } from '@core/classes/userSessionManager';

@Component({
    selector: 'app-oidsmset',
    templateUrl: './oidsmset.component.html'
})
export class OidsmsetComponent implements OnInit {
    disLovValues: any;
    statusLovFields: Object = { text: 'description', value: 'code' };
    msgs: any[] = [];
    mode: string;
    clearDisabled: any;
    commitData: SchMovSettingCommitBean = new SchMovSettingCommitBean;
    tapSettingsData: any[];
    prgSrvData: ScheduleMovementSetting[] = [];
    schMoveSetModel: ScheduleMovementSetting = new ScheduleMovementSetting;
    tempModel: any;
    statuscodeValue: string[] = [];
    tapStatusData: any;
    tapStatusTempData: any;
    disableFlag: boolean;

    constructor(public translateService: TranslateService, private oidsmsetFactory: OidsmsetService, public sessionManager: UserSessionManager,) {
    }

    ngOnInit() {
        this.mode = 'CheckBox';
        this.disableFlag = true;
        this.tapStatusExecuteQuery();
    }
    onStatusChange(event) {
        if (event) {
            this.schMoveSetModel.settingCodeVal = event;
            this.disableFlag = false;
        } else {
            this.disableFlag = false;
        }
    }
    cancel() {
        this.disableFlag = true;
        this.tapStatusExecuteQuery();

    }
    onSave() {
        this.commitData.updateList = [];
        this.schMoveSetModel.settingValue = this.schMoveSetModel.settingCodeVal.toString();
        if (this.schMoveSetModel && this.schMoveSetModel.createDatetime) {

            this.prgSrvData.push(this.schMoveSetModel);
            this.commitData.updateList = this.prgSrvData;
        }

        const saveData = this.oidsmsetFactory.tapScheduleSettingCommit(this.commitData);
        saveData.subscribe(data => {
            if (data === 1) {
                this.show('common.addupdateremoverecordsuccess', 'success');
                this.tapStatusExecuteQuery();
            } else {
                this.show('common.addupdateremoverecordfailed');
                this.tapStatusExecuteQuery();
            }
        });
    }

    tapStatusExecuteQuery() {
        const searchResult = this.oidsmsetFactory.tapScheduleSettingExecuteQuery();
        searchResult.subscribe(data => {
            if (data.length === 0) {
                this.schMoveSetModel = new ScheduleMovementSetting();
            } else {
                this.tapStatusData = data.find(value => value.settingCode === 'TAP_SCH_CONFLICT');
                const tapStatusCodes = this.tapStatusData.settingValue.split(',')
                data[0].settingCodeVal = tapStatusCodes;
                this.schMoveSetModel = data[0];
                this.tapStatusTempData = JSON.parse(JSON.stringify(this.tapStatusData));
                this.disableFlag = true;

            }
        });

    }
    show(vldmsg, type?) {
        type = type ? type : 'warn';
        vldmsg = this.translateService.translate(vldmsg);
        const msgval = [{ message: vldmsg, type: type }];
        this.msgs = [...msgval];
    }
}