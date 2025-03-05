import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { UiCustomizeService } from '@core/service/ui-customize.service';
import { OcmpconfService } from '../service/ocmpconf.service';
import * as moment from 'moment';
import { DialogService } from '@core/ui-components/dialog/dialog.service';
@Component({
    selector: 'app-ocmpconf',
    templateUrl: './ocmpconf.component.html'
})

export class OcmpconfComponent implements OnInit {
    msglist: any[];
    message: any;
    type: any;
    msgs: any[];
    selectedComp: any;
    eventSelected: any;
    eventColor: any;
    toastPosOptions: any[];
    toastHorizPosOptions: any[];
    toastPosTitles: {};
    cellFontWeightTitles:any;
    rowFontWeightTitles:any;
    cellFontWeightOptions: any[];
    rowFontWeightOptions: any[];
    originalData: ConfigData = new ConfigData();
    pageData: ConfigData = new ConfigData();
    dbData: Array<UiConfig>;
    enabledViews = [];
    isRestoreDefault = false;
    defaultViewOptions = {};
    gridTitles: any;
    pageStyleTitles: { description: string; };
    pageRowTitles: { description: string; };
    filterTitles: { description: string; };
    constructor(private ocmpconfService: OcmpconfService, public translateService: TranslateService, public uiService: UiCustomizeService,
        public dialogService: DialogService) {
    }
    ngOnInit() {
        // this.selectedComp = 'GRID';
        this.toastPosOptions = [
            { code: 'top-right', description: "Top Right" },
            { code: 'top-left', description: "Top Left" },
            { code: 'top-center', description: "Top Center" },
            { code: 'top-start', description: "Top Start" },
            { code: 'top-end', description: "Top End" },
            { code: 'bottom-right', description: "Bottom Right" },
            { code: 'bottom-left', description: "Bottom Left" },
            { code: 'bottom-center', description: "Bottom Center" },
            { code: 'bottom-start', description: "Bottom Start" },
            { code: 'bottom-end', description: "Bottom End" }
        ];
        this.cellFontWeightOptions = [
            { code: 'normal', description: "Normal" },
            { code: 'bold', description: "Bold" },
        ];
        this.rowFontWeightOptions = [
            { code: 'normal', description: "Normal" },
            { code: 'bold', description: "Bold" },
        ];
        this.toastPosTitles = { description: 'Position' };
        this.cellFontWeightTitles = { description: 'Value' };
        this.rowFontWeightTitles = { description: 'Value' };
        this.gridTitles = { description: '' };
        this.pageStyleTitles = { description: 'Pagination Style' };
        this.pageRowTitles = { description: 'Pagination Rows' };
        this.filterTitles = { description: 'Filter Name' };
        this.loadData();
        this.getEnabledViews();
    }
    getEnabledViews() {
        let views = this.getViews();
        views.forEach(view => {
            if (view.code == 'day') {
                view.canDisplay = this.pageData.calConfig.enabledViews.dayView;
            }
            if (view.code == 'week') {
                view.canDisplay = this.pageData.calConfig.enabledViews.weekView;
            }
            if (view.code == 'month') {
                view.canDisplay = this.pageData.calConfig.enabledViews.monthView;
            }
            if (view.code == 'timelineDay') {
                view.canDisplay = this.pageData.calConfig.enabledViews.timelineDayView;
            }
            if (view.code == 'agenda') {
                view.canDisplay = this.pageData.calConfig.enabledViews.agendaView;
            }
        });
        this.defaultViewOptions = views;
        return views;
    }
    viewsChange() {
        this.getEnabledViews();
    }
    loadData() {
        this.ocmpconfService.loadData().subscribe(data => {
            this.dbData = data;
            this.mapData();
        });
    }

    mapData() {
        this.originalData.toastConfig = this.getCompData('TOAST');
        this.originalData.gridConfig = this.getCompData('GRID');
        this.originalData.btnConfig = this.getCompData('BTN');
        this.originalData.calConfig = this.getCompData('CAL');
        this.originalData.docConfig = this.getCompData('DOC');
        this.originalData.taskManagementConfig = this.getCompData('TASK');
        this.pageData = JSON.parse(JSON.stringify(this.originalData));
        this.pageData.calConfig.viewStart = moment(this.pageData.calConfig.viewStart, "YYYY-MM-DD[T]HH:mm:ss").toDate();
        this.pageData.calConfig.viewEnd = moment(this.pageData.calConfig.viewEnd, "YYYY-MM-DD[T]HH:mm:ss").toDate();
        this.pageData.calConfig.intEvntTime = moment(this.pageData.calConfig.intEvntTime, "YYYY-MM-DD[T]HH:mm:ss").toDate();
        this.pageData.calConfig.extEvntTime = moment(this.pageData.calConfig.extEvntTime, "YYYY-MM-DD[T]HH:mm:ss").toDate();
        this.pageData.calConfig.commEvntTime = moment(this.pageData.calConfig.commEvntTime, "YYYY-MM-DD[T]HH:mm:ss").toDate();
    }

    getCompData(comp): any {
        const data = this.dbData.filter(data => comp === data.compType)[0];
        return data.compConfig ? JSON.parse(data.compConfig) : data.compConfigDef ? JSON.parse(data.compConfigDef) : {};
    }

    showPopUp() {
        
		const data = {
			label: this.translateService.translate('common.resetchanges'), yesBtn: true, noBtn: true
		};
		this.dialogService.openLinkDialog('/ocucoffeconfirmbox', data, 50).subscribe(result => {
			if (result) {
                this.isRestoreDefault =true;
                this.saveData();
			} else {
                this.isRestoreDefault =false;
			}
		});

	}
    saveData() {
        if (!this.successToastDurationChange() &&!this.infoToastDurationChange() &&!this.warntTastDurationChange() &&!this.errorToastDurationChange() && !this.isRestoreDefault) {
            return;
        }
        let saveData = {};
        this.dbData.forEach(data => {
            if (data.compType === "TOAST" && !this.isRestoreDefault) {
                data.compConfig = JSON.stringify(this.pageData.toastConfig);
            } else if (data.compType === "TOAST" && this.isRestoreDefault) {
                data.compConfig = data.compConfigDef;
            }
            if (data.compType === "GRID" && !this.isRestoreDefault) {
                data.compConfig = JSON.stringify(this.pageData.gridConfig);
            } else if (data.compType === "GRID" && this.isRestoreDefault) {
                data.compConfig = data.compConfigDef;
            }
            if (data.compType === "CAL" && !this.isRestoreDefault) {
                data.compConfig = JSON.stringify(this.pageData.calConfig);
            } else if (data.compType === "CAL" && this.isRestoreDefault) {
                data.compConfig = data.compConfigDef;
            }
            if (data.compType === "BTN" && !this.isRestoreDefault) {
                data.compConfig = JSON.stringify(this.pageData.btnConfig);
            } else if (data.compType === "BTN" && this.isRestoreDefault) {
                data.compConfig = data.compConfigDef;
            }
            if (data.compType === "DOC" && !this.isRestoreDefault) {
                data.compConfig = JSON.stringify(this.pageData.docConfig);
            } else if (data.compType === "DOC" && this.isRestoreDefault) {
                data.compConfig = data.compConfigDef;
            }
            if (data.compType === "TASK" && !this.isRestoreDefault) {
                data.compConfig = JSON.stringify(this.pageData.taskManagementConfig);
            } else if (data.compType === "TASK" && this.isRestoreDefault) {
                data.compConfig = data.compConfigDef;
            }
        });
        saveData = this.dbData;
        this.ocmpconfService.saveData(saveData).subscribe(data => {
            if (data > 0) {
                this.show('success', 'Data Saved Successfully. Kindly Re-login to see the updates.');
            } else {
                this.show('error', 'Unable to save data');
            }
            this.isRestoreDefault=false;
            this.loadData();
            this.uiService.calConfig = this.pageData.calConfig;
            this.uiService.gridConfig = this.pageData.gridConfig;
            this.uiService.toastConfig = this.pageData.toastConfig;
            this.uiService.docConfig = this.pageData.docConfig;
            this.uiService.btnConfig = this.pageData.btnConfig;
            this.uiService.taskManagementConfig = this.pageData.taskManagementConfig;

        })
    }
    show(type, message) {
        this.msglist = [];
        this.msglist.push({ message: message, type: type });
        this.msgs = [...this.msglist];
    }
    successToastDurationChange() {
        if (this.pageData && this.pageData.toastConfig && +this.pageData.toastConfig.successDuration <= 0) {
            this.show('warn', 'Duration must be greater than zero.');
            this.pageData.toastConfig.successDuration = 2;
            return false;
        }
        return true;
    }
    infoToastDurationChange() {
        if (this.pageData && this.pageData.toastConfig && +this.pageData.toastConfig.infoDuration <= 0) {
            this.show('warn', 'Duration must be greater than zero.');
            this.pageData.toastConfig.infoDuration = 2;
            return false;
        }
        return true;
    }
    warntTastDurationChange() {
        if (this.pageData && this.pageData.toastConfig && +this.pageData.toastConfig.warnDuration <= 0) {
            this.show('warn', 'Duration must be greater than zero.');
            this.pageData.toastConfig.warnDuration = 2;
            return false;
        }
        return true;
    }
    errorToastDurationChange() {
        if (this.pageData && this.pageData.toastConfig && +this.pageData.toastConfig.errorDuration <= 0) {
            this.show('warn', 'Duration must be greater than zero.');
            this.pageData.toastConfig.errorDuration = 2;
            return false;
        }
        return true;
    }
    refreshChange() {
        if (this.pageData && this.pageData.taskManagementConfig && +this.pageData.taskManagementConfig.refreshTime <= 0) {
            this.message=this.translateService.translate('oumcamtask.refresherror');
            this.show('warn', this.message);
            this.pageData.taskManagementConfig.refreshTime = 30;
            return false;
        }
        return true;
    }
    compChange() {
        // check if data modified
        /* switch (this.selectedComp) {
            case 'GRID':
                if(JSON.stringify(this.pageData.gridConfig) !== JSON.stringify(this.originalData.gridConfig)) {
                    this.show('warn', 'Please Save or re data before continuing.');
                    this.selectedComp = 'GRID';
                }
                break;
            case 'TOAST':
                if(JSON.stringify(this.pageData.gridConfig) !== JSON.stringify(this.originalData.gridConfig)) {
                    this.show('warn', 'Please Save or re data before continuing.');
                    this.selectedComp = 'TOAST';
                }
                break;
            case 'BTN':
                if(JSON.stringify(this.pageData.gridConfig) !== JSON.stringify(this.originalData.gridConfig)) {
                    this.show('warn', 'Please Save or re data before continuing.');
                    this.selectedComp = 'BTN';
                }
                break;
            case 'CAL':
                if(JSON.stringify(this.pageData.gridConfig) !== JSON.stringify(this.originalData.gridConfig)) {
                    this.show('warn', 'Please Save or re data before continuing.');
                    this.selectedComp = 'CAL';
                }
                break;
            default:
                break;
        } */
    }
    getViews() {
        return [
            { code: "Day", description: "Day", canDisplay: true },
            { code: "Week", description: "Week", canDisplay: true },
            { code: "Month", description: "Month", canDisplay: true },
            { code: "WorkWeek", description: "WorkWeek", canDisplay: true },
            { code: "TimelineDay", description: "TimelineDay", canDisplay: true },
            { code: "TimelineWeek", description: "TimelineWeek", canDisplay: true },
            { code: "TimelineWorkWeek", description: "TimelineWorkWeek", canDisplay: true },
            { code: "TimelineMonth", description: "TimelineMonth", canDisplay: true },
            { code: "MonthAgenda", description: "MonthAgenda", canDisplay: true },
            { code: "Agenda", description: "Agenda", canDisplay: true }
        ];
    }
    getGridStyles =
        [
            { code: "style1", description: "Style 1" }
        ];

    getGridPagination = 
        [
            { code: "5", description: "5 Records" },
            { code: "10", description: "10 Records" },
            { code: "15", description: "15 Records" },
            { code: "20", description: "20 Records" },
            { code: "25", description: "25 Records" },
            { code: "50", description: "50 Records" },
            { code: "100", description: "100 Records" },
        ]
    getGridFilters = 
        [
            { code: "1", description: "Default Filter" },
            { code: "2", description: "Mini Filter" }
            // { code: "3", description: "Floating"},
            // { code: "4", description: "Excel Style"}
        ];

    getGridEditModes = 
        [
            { code: "1", description: "No Click" },
            { code: "2", description: "Single Click" },
            { code: "3", description: "Double Click" }
        ];

    getGridColWidth =
        [
            { code: "1", description: "Column Header" },
            { code: "2", description: "Column Values" }
        ];

    resetData() {
        this.pageData = JSON.parse(JSON.stringify(this.originalData));
    }

    restoreDefaults() {
        this.isRestoreDefault = true;
    }
    isClearDisabled(){
        return JSON.stringify(this.originalData) == JSON.stringify(this.pageData);
    }
    isSaveDisabled(){
        return JSON.stringify(this.originalData) == JSON.stringify(this.pageData);
    }
}
export class ToastConfig {
    successColor = '';
    infoColor = '';
    warnColor = '';
    errorColor = '';
    successPos = '';
    errorPos = '';
    infoPos = '';
    warnPos = '';
    successDuration = 0;
    warnDuration = 0;
    infoDuration = 0;
    errorDuration = 0;
    
}
export class GridConfig {
    pagStyle = '';
    pagType = '';
    filterType = '';
    pivotAllowed = '';
    editMode = '';
    widthBasedOn = '';
    rowWarningColor = '';
    rowWarningFontWeight : '';
    cellWarningColor: '';
    cellWarningFontWeight : '';
}
export class  TaskManagementConfig {
    refreshTime = 30;
    strokeColor='';
    fillColor='';
    myTaskColor = '';
    teamTaskColor = '';
}
export class BtnConfig {
    primaryColor = '';
    secondaryColor = '';
    primaryTextColor = '';
    secondaryTextColor = '';
}
export class CalConfig {
    enabledViews = {
        dayView: true,
        weekView: true,
        monthView: true,
        timelineDayView: true,
        timelineWeekView: true,
        timelineWorkWeekView: true,
        timelineMonthView: true,
        monthAgenda: true,
        agendaView: true,
        workWeek: true
    };
    defautView = '';
    viewStart = new Date();
    viewEnd = new Date();
    intEvntTime = new Date();
    extEvntTime = new Date();
    commEvntTime = new Date();
    courtEventColor = '';
    externalEventColor = '';
    internalEventColor = '';
    programEventColor = '';
    temparoryEventColor = '';
    communityEventColor = '';
    intEvntEndTime = 60;
    extEvntEndTime = 60;
    communityEndTime = 60;
    pendTempAbsEventColor = '';
}
export class DocConfig {
    showPropPane: boolean;
    showRestrictEditing: boolean;
}
export class ConfigData {
    toastConfig = new ToastConfig();
    gridConfig = new GridConfig();
    btnConfig = new BtnConfig();
    calConfig = new CalConfig();
    docConfig = new DocConfig();
    taskManagementConfig=new TaskManagementConfig();
}

export class UiConfig {
    compId;
    compType;
    createdBy;
    modifiedBy;
    createDate;
    modifyDate;
    compConfig;
    compConfigDef;
}