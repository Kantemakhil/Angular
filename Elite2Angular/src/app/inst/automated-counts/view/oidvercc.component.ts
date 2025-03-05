import {
    Component, OnInit
} from '@angular/core';

import { DatePipe } from '@angular/common';
import { TranslateService } from '@common/translate/translate.service';
import { OidverccService } from '@inst/automated-counts/service/oidvercc.service';
import { AgencyCountTypes } from '@automatedbeans/AgencyCountTypes';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { DateFormat } from '@ui-components/datepicker/dateFormat';
import { VReportingLocations } from '@automatedbeans/VReportingLocations';
import { DialogService } from '@ui-components/dialog/dialog.service';
import { AgencyLocationCounts } from '@automatedbeans/AgencyLocationCounts';

@Component({
    selector: 'app-oidvercc',
    templateUrl: './oidvercc.component.html'
})

export class OidverccComponent implements OnInit {
    msgs: any[] = [];
    listToCompare: any[] = [];
    agencycounttypesData: AgencyCountTypes[] = [];
    agencycounttypesDataTemp: AgencyCountTypes[] = [];
    agencyCountTypesModel: AgencyCountTypes = new AgencyCountTypes();
    agencyLocationCountsModel: AgencyLocationCounts = new AgencyLocationCounts();
    agencycounttypesIndex: number;
    agencycounttypesInsertList: AgencyCountTypes[] = [];
    agencycounttypesUpdatetList: AgencyCountTypes[] = [];
    agencycounttypesDeleteList: AgencyCountTypes[] = [];
    reportinglocationsData: VReportingLocations[] = [];
    reportinglocationsDataTemp: VReportingLocations[] = [];
    reportinglocationsModel: VReportingLocations = new VReportingLocations();
    reportinglocationsIndex: number;
    reportinglocationsInsertList: VReportingLocations[] = [];
    reportinglocationsUpdatetList: VReportingLocations[] = [];
    reportinglocationsDeleteList: VReportingLocations[] = [];
    display: boolean;
    disabled: boolean;
    editable: boolean;
    reportingLocationsColumnDef: any[];
    agencyCountTypesReadOnly: boolean;
    reportingLocationsReadOnly: boolean;
    cgfkAgylocidRg: any[] = [];
    cgfkCounttypesRg: any[] = [];
    cgfkScheduledtimeRg: any[] = [];
    message = ' Invalid.';
    type = 'error';
    msglist = [];
    locationLink: any;
    countTypeLink: any;
    scheduleTimeLink: any;
    countDateTemp: any;
    commonFlag: boolean;
    clearBtnDisable: boolean;
    locationTitles = { code: 'Agency Location Code', description: 'Description' };
    countTypeTitles = { code: 'Count Code', description: 'Description' };
    scheduleTimeTitles = { description: 'Scheduled Time', agyLocId: 'Agency Code', countTypeCode: 'Count Code' };
    scheduleTimeTemp: string;
    userName: string;
    createUserId : string;
    constructor(private oidverccFactory: OidverccService,
        public translateService: TranslateService,
        private sessionManager: UserSessionManager,
        public dialogService: DialogService) {
        this.reportingLocationsColumnDef = [];

    }
    ngOnInit() {
        this.getUserName();
        this.clearBtnDisable = false;
        const datePipe = new DatePipe('en-US');
        this.countDateTemp = datePipe.transform(DateFormat.getDate(), 'MM/dd/yyyy');
        this.commonFlag = false;
        this.agencyCountTypesModel = new AgencyCountTypes();
        this.agencyCountTypesModel.expiryDate = DateFormat.getDate();
        this.locationLink = 'oidvercc/cgfkAgyLocIdRecordGroup?caseLoadId=' + this.sessionManager.currentCaseLoad;
        
        this.reportingLocationsColumnDef = [
            {
                fieldName: this.translateService.translate('oidvercc.countdate'),
                field: 'conductedDateTime', datatype: 'date', editable: false, width: 150
            },
            { fieldName: this.translateService.translate('common.description'), field: 'locationDescription', editable: false, width: 150 },
            { fieldName: this.translateService.translate('common.counttype'), field: 'countTypeCode', editable: false, width: 150 },
            { fieldName: this.translateService.translate('common.time'), field: 'scheduledTime', editable: false, width: 150 },
            { fieldName: this.translateService.translate('oidvercc.reportedtotal'), field: 'reportedTotal', editable: false, width: 150 },
            { fieldName: this.translateService.translate('oidvercc.submittedby'), field: 'enteredByUserid', editable: false, width: 150 },
            {
                fieldName: '', field: 'buttonVeify', datatype: 'launchbutton', editable: false,
                width: 100, data: 'row', updateField: 'row', modal: true, onLaunchClick: this.verifyLaunchClick
            }
        ];
        this.agencyCountTypesModel.createUserId = this.userName;
    }
    /**
     * event is fired when change the value of Location in LOV
     * @param event
     */
    changeTheValueOfLocation(event) {
        if (event) {
            this.clearBtnDisable = false;
            this.agencyCountTypesModel.scheduledTime = undefined;
            this.agencyCountTypesModel.countTypeId = undefined;
            this.scheduleTimeTemp = this.scheduleTimeTemp === undefined ? '' : undefined;
            if (!this.agencyCountTypesModel.expiryDate) {
                this.agencyCountTypesModel.expiryDate = DateFormat.getDate();
            }
            if (!this.agencyCountTypesModel.createUserId) {
                this.agencyCountTypesModel.createUserId = this.userName;
            }
            this.agencyCountTypesModel.agyLocId = event.code;
            this.countTypeLink = 'oidvercc/cgfkCountTypesRecordGroup?agyLocId=' + event.code;
        }

    }
    /**
     * event is fired when change the value of Count Type in LOV
     * @param event
     */
    changeTheValueOfCountType(event) {
        if (event) {
            this.agencyCountTypesModel.scheduledTime = undefined;
            this.agencyCountTypesModel.countTypeId = undefined;
            this.scheduleTimeTemp = this.scheduleTimeTemp === undefined ? '' : undefined;
            this.agencyCountTypesModel.countTypeCode = event.code;
            this.scheduleTimeLink = 'oidvercc/cgfkScheduledTimeRecordGroup?agyLocId=' +
                this.agencyCountTypesModel.agyLocId + '&countTypeCode=' + event.code;
        }

    }
    checkVal(event) {
        if (event && event.innerOptions) {
            if (event.innerOptions.length === 0) {
                this.type = 'warn';
                this.message = this.translateService.translate('common.listofvalues');
                this.show();
            }
        }
    }
    /**
     * event is fired when change the value of Time in LOV
     * @param event
     */
    changeTheValueOfTime(event) {
        if (event) {
            this.agencyCountTypesModel.scheduledTime = event.description;
            this.agencyCountTypesModel.countTypeId = event.code;
        }

    }
    /**
     * event is fired when click on Clear button in the block of Conduct Counts
     */
    clear() {
        this.agencyCountTypesModel = new AgencyCountTypes();
        this.scheduleTimeTemp = this.scheduleTimeTemp === undefined ? '' : undefined;
        this.clearBtnDisable = true;
        this.reportinglocationsData = [];
        this.commonFlag = false;
    }
    /**
     * event is fired when click on count date field.
     * assign the current date when expiryDate is null.
     */
    clickOnConductDate() {
        if (!this.agencyCountTypesModel.expiryDate) {
            this.agencyCountTypesModel.expiryDate = DateFormat.getDate();
        }
    }
    checkCountDate() {
        if (this.agencyCountTypesModel.expiryDate) {
            if ((DateFormat.compareDate(this.agencyCountTypesModel.expiryDate, DateFormat.getDate())) === 1) {
                this.commonFlag = true;
                this.type = 'warn';
                this.message = this.translateService.translate('oidvercc.countdatecannotbegreaterthantoday')
                    + '(' + this.countDateTemp + ') !';
                this.show();
                return;
            } else {
                this.commonFlag = false;
            }
        }
    }
    /**
     * event is fired when click on the fileds(except count date) in the block of Conduct Counts.
     */
    commonClick(event?) {
        if (event && event.innerOptions) {
            if (event.innerOptions.length === 0) {
                this.type = 'warn';
                this.message = this.translateService.translate('common.listofvalues');
                this.show();
            }
        }
        if (!this.agencyCountTypesModel.createUserId) {
            this.agencyCountTypesModel.createUserId = this.userName;
            this.clearBtnDisable = false;
        }
        if (this.agencyCountTypesModel.expiryDate) {
            if ((DateFormat.compareDate(this.agencyCountTypesModel.expiryDate, DateFormat.getDate())) === 1) {
                this.commonFlag = true;
                this.type = 'warn';
                this.message = this.translateService.translate('oidvercc.countdatecannotbegreaterthantoday')
                    + '(' + this.countDateTemp + ') !';
                this.show();
                return;
            }
        }
    }
    /**
     * event is fired when click on Retrive button.
     */
    reportinglocationsExecuteQuery(input) {
        if (!this.agencyCountTypesModel.agyLocId) {
            this.type = 'warn';
            this.message = this.translateService.translate('oidvercc.agencylocationmustbeentered');
            this.show();
            return;
        }
        if (this.agencyCountTypesModel.expiryDate) {
            if ((DateFormat.compareDate(this.agencyCountTypesModel.expiryDate, DateFormat.getDate())) === 1) {
                this.type = 'warn';
                this.message = this.translateService.translate('oidvercc.countdatecannotbegreaterthantoday')
                    + '(' + this.countDateTemp + ') !';
                this.show();
                return;
            }
        }
        this.reportinglocationsModel = new VReportingLocations();
        this.reportinglocationsModel.agyLocId = this.agencyCountTypesModel.agyLocId;
        if (this.agencyCountTypesModel.countTypeCode) {
            this.reportinglocationsModel.countTypeCode = this.agencyCountTypesModel.countTypeCode;
        }
        if (this.scheduleTimeTemp) {
            this.reportinglocationsModel.scheduledTime = this.agencyCountTypesModel.scheduledTime;
        }
        if (this.agencyCountTypesModel.expiryDate) {
            this.reportinglocationsModel.conductedDateTime = DateFormat.getDate(this.agencyCountTypesModel.expiryDate);
        }
        this.reportinglocationsModel.conductedByUserid = this.sessionManager.getId();
        const reportinglocationsResult = this.oidverccFactory.
            reportingLocationsExecuteQuery(this.reportinglocationsModel);
        reportinglocationsResult.subscribe(reportinglocationsResultList => {
            if (reportinglocationsResultList.length === 0) {
                this.reportinglocationsData = [];
                this.commonFlag = false;
                if (input && input === 'retrive') {
                    this.type = 'warn';
                    this.message = this.translateService.translate('common.querycaused');
                    this.show();
                }
                return;
            } else {
                for (let i = 0; i < reportinglocationsResultList.length; i++) {
                    reportinglocationsResultList[i].buttonVeify = 'Verify';
                }
                this.reportinglocationsData = [];
                this.reportinglocationsData = reportinglocationsResultList;
                this.reportinglocationsModel = reportinglocationsResultList[0];
                this.commonFlag = true;
            }
        });
    }
    /**
*  This function will be executed when we click on Verify button in grid
*
*/
    verifyLaunchClick = (event) => {
        const data = {
            label: this.translateService.translate('oidvercc.herebystate'), yesBtn: true, noBtn: true
        };
        this.dialogService.openLinkDialog('/ocucoffeconfirmbox', data, 50).subscribe(result => {
            if (typeof result === 'boolean' && result) {
                this.agencyLocationCountsModel = new AgencyLocationCounts();
                this.agencyLocationCountsModel.reportingLocId = event.reportingLocId;
                this.agencyLocationCountsModel.countTypeId = event.countTypeId;
                this.agencyLocationCountsModel.agySeq = event.agySeq;
                const updateService = this.oidverccFactory.updateAgencyLocationCounts(this.agencyLocationCountsModel);
                updateService.subscribe(updateData => {
                    if (updateData === 0) {
                        this.type = 'error';
                        this.message = this.translateService.translate('common.addupdateremoverecordfailed');
                        this.show();
                        this.reportinglocationsExecuteQuery('verifyLaunch');
                    } else {
                        this.type = 'success';
                        this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
                        this.show();
                        this.reportinglocationsExecuteQuery('verifyLaunch');
                    }

                });

            } else {

            }
        });
        return false;
    }
    /*
       * This method is used to show popup messages.
       */
    show() {
        this.msglist = [];
        this.msglist.push({ message: this.message, type: this.type });
        this.msgs = [...this.msglist];
    }

    getUserName() {
        this.oidverccFactory.getUserNameByCreatedUserId(this.sessionManager.getId()).subscribe(data => {
            this.userName = data;
            this.createUserId = data;
        });
    }

}
