import { Injectable } from '@angular/core';
import * as moment from 'moment';

@Injectable({ providedIn: 'root' })
export class UiCustomizeService {

    toastConfig = {
        successColor: '',
        infoColor: '',
        warnColor: '',
        errorColor: '',
        successPos: '',
        errorPos: '',
        infoPos: '',
        warnPos: '',
        successDuration: 1,
        warnDuration: 1,
        infoDuration: 1,
        errorDuration: 1
    };
    gridConfig = {
        pagStyle: '', pagType: '', filterType: '', pivotAllowed: '',
        editMode: '', widthBasedOn: '',rowWarningColor: '', rowWarningFontWeight : '',
        cellWarningColor: '', cellWarningFontWeight : ''
    };
    taskManagementConfig={
        refreshTime : 30,
        strokeColor :'',
        fillColor : '',
        myTaskColor : '',
        teamTaskColor :''
    };
    calConfig = {
        defautView:'Day',
        viewStart: new Date(),
        viewEnd: new Date(),
        intEvntTime: new Date(),
        extEvntTime: new Date(),
        commEvntTime : new Date(),
        enabledViews: {
            dayView: true,
            weekView: true,
            monthView: true,
            agendaView: true,
            timelineDayView: true,
            timelineWeekView: true,
            timelineWorkWeekView: true,
            timelineMonthView: true,
            monthAgenda: true,
            workWeek: true
        },
        intEvntEndTime : 60,
        extEvntEndTime : 60,
        courtEventColor : '',
        externalEventColor : '',
        internalEventColor : '',
        programEventColor : '',
        temparoryEventColor : '',
        communityEventColor : '',
        communityEndTime : 60
    }
    dbData: any;
    docConfig = {
        showPropPane: true,
        showRestrictEditing: false
    }
    btnConfig = {
        primaryColor: '',
        secondaryColor: '',
        primaryTextColor: '',
        secondaryTextColor: ''
    }

    constructor() { }

    setUiConfigData(configData) {
        this.dbData = configData;
        this.toastConfig = this.getCompData('TOAST');
        if (this.toastConfig.successDuration == undefined || this.toastConfig.warnDuration == undefined
            || this.toastConfig.infoDuration == undefined || this.toastConfig.errorDuration == undefined) {
            this.toastConfig.successDuration = this.toastConfig.warnDuration = this.toastConfig.infoDuration = this.toastConfig.errorDuration = 5;
        }
        this.gridConfig = this.getCompData('GRID');
        this.btnConfig = this.getCompData('BTN');
        this.calConfig = this.getCompData('CAL');
        this.taskManagementConfig = this.getCompData('TASK');
        this.calConfig.intEvntTime = moment(this.calConfig.intEvntTime, "YYYY-MM-DD[T]HH:mm:ss").toDate();
        this.calConfig.extEvntTime = moment(this.calConfig.extEvntTime, "YYYY-MM-DD[T]HH:mm:ss").toDate();
        this.calConfig.commEvntTime = moment(this.calConfig.commEvntTime, "YYYY-MM-DD[T]HH:mm:ss").toDate();
        this.calConfig.viewStart = moment(this.calConfig.viewStart, "YYYY-MM-DD[T]HH:mm:ss").toDate();
        this.calConfig.viewEnd = moment(this.calConfig.viewEnd, "YYYY-MM-DD[T]HH:mm:ss").toDate();
    }

    getCompData(comp): any{
        const data = this.dbData.filter(data=> comp === data.compType )[0];
        return data.compConfig ? JSON.parse(data.compConfig): JSON.parse(data.compConfigDef);
    }
}
export enum MsgHorizPos {
    START = 'Start',
    CENTER = 'Center',
    END = 'End',
    LEFT = 'Left',
    RIGHT = 'Right'
}
export enum MsgVertPos {
    TOP = 'Top',
    BOTTOM = 'Bottom'
}


  