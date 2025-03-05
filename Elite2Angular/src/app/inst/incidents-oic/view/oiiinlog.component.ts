import {
    Component, OnInit, OnDestroy, ViewChild
} from '@angular/core';

import { IncidentSearchService } from '../service/incident-search.service'
import { TranslateService } from '@common/translate/translate.service';
import { OiiinlogService } from '../service/oiiinlog.service';
import { OidincdeService } from '../service/oidincde.service';
// import required bean declarations
import { VAgencyIncidents } from '@instincidentsbeans/VAgencyIncidents';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { Router } from '@angular/router';
import { DateFormat } from '@ui-components/datepicker/dateFormat';
import { OsinamesService } from '@cm/searchassaign/service/osinames.service';
import { LaunchbuttonComponent } from '@ui-components/launchbutton/launchbutton.component';

@Component({
    selector: 'app-oiiinlog',
    templateUrl: './oiiinlog.component.html'
})

export class OiiinlogComponent implements OnInit, OnDestroy {
    osinamesbtnDisabled: boolean;
    // Variable declaration
    actionName: string;
    private innerRecordsRetrieved: any[];
    lovModel: any[];
    msgs: any[] = [];
    nameOfLovPage: string;
    listToCompare: any[] = [];
    vagyincData: VAgencyIncidents[] = [];
    vagyincDataTemp: VAgencyIncidents[] = [];
    vagyincModel: VAgencyIncidents = new VAgencyIncidents();
    vagyincIndex = 0;
   vagyincModelTemp: VAgencyIncidents = new VAgencyIncidents();
    minDate: Date;
    display: boolean;
    errorMessage: string;
    headerMessage: string;
    columnDefs: any[] = [];
    disabled: boolean;
    editable = true;
    rgoccurtypeRg: any[] = [];
    rgagylocRg: any[];
    rglevellocRg: any[] = [];
    rgstaffRg: any[] = [];
    staffDetails:any[]=[];
    V_AGY_INCINCIDENT_DATEDateopened: boolean;
    clearDisable: boolean;
    reportLink = '';
    facilityLink = '';
    locationLink = '';
    translateLabel: any;
    caseLoadId: string;
    incidentLogRowData: any[] = [];
    isSelected = true;
    vagyincDataRowData: any[] = [];
    listMap: Map<string, string> = new Map();
    location = '';
    tableIndex = 0;
    statusOption: any[] = [];
    locationOption: any[] = [];
    agencyincidentId: any;
    vagyincModelTempData: any[];
    reportbytOption: any[] = [];
    selected = -1;
    selectedTemp = -1;
    orcaId: string;
    orcaIdDisabled: boolean;
    offenderIdDisplay: any;
    firstName: any;
    lastName: any;
    isDialogOpen = false;
    readonlyFlag: boolean;
    @ViewChild('osinamesdialogbtn') osinamesdialogbtn: LaunchbuttonComponent;
    facilityLabel: string;
    disableString: boolean;
    incTypeLovLink: string;
    constructor(private oiiinlogFactory: OiiinlogService,
        public translate: TranslateService,
        private sessionManager: UserSessionManager,
        private oidincdeFactory: OidincdeService,
        public translateService: TranslateService,
        private osinamesService: OsinamesService,
        private incidentService: IncidentSearchService,
        private router: Router) {
    }
    onGridReady(event) {
    }
    closeMyDataPicker() { }
    ngOnInit() {
        if(this.sessionManager.currentCaseLoadType  === "COMM"){
            this.disableString=false;
            this.facilityLabel= this.translateService.translate('oiiinlog.communityoffice');
           // this.communityEnable = true;
        } else {
            this.disableString=true;
            this.facilityLabel= this.translateService.translate('system-profile.inst-agency');
            //this.communityEnable = false;
        }
        
        this.readonlyFlag = false;
        this.orcaIdDisabled = false;
      // this.clearDisable = true;
        if (this.oiiinlogFactory.statusOption.length < 1) {
        this.getOptionList();
        } else {
            this.statusOption = this.oiiinlogFactory.statusOption;
        }

        if (this.oiiinlogFactory.locationOption.length < 1) {
        this.getLocationList();
        } else {
            this.locationOption = this.oiiinlogFactory.locationOption;
        }
        if (this.oiiinlogFactory.vagyincDataRowData.length > 0) {
            this.vagyincDataRowData = this.oiiinlogFactory.vagyincDataRowData;
            this.clearDisable = true;
            if (this.oiiinlogFactory.selected) {
                this.selected = this.oiiinlogFactory.selected;
            } else {
                this.selected = 0;
            }
        }
        if (this.oiiinlogFactory.vagyincModel) {
            this.vagyincModel = this.oiiinlogFactory.vagyincModel;
        }
        if (this.oidincdeFactory.falg) {
            this.oiiinlogFactory.checkedfalg = true;
                }
        this.reportLink = 'oiiinlog/rgStaffRecordGroup?caseloadId=' + this.sessionManager.currentCaseLoad;
        this.facilityLink = 'oiiinlog/rgAgyLocRecordGroup?caseloadId=' + this.sessionManager.currentCaseLoad + '&caseLoadType=' + this.sessionManager.currentCaseLoadType;
        //this.facilityLink = 'oiiinlog/rgAgyLocRecordGroup?caseloadId=' + this.sessionManager.currentCaseLoad;
        this.incTypeLovLink='oidincde/rgIncidentTypesRecordGroup?caseLoadType='+this.sessionManager.currentCaseLoadType;
        this.columnDefs = [
            {
                fieldName: this.translateService.translate('oiiinlog.incident'), field: 'agencyIncidentId',
                editable: true, width: 150, filter: 'text', pinned: true, datatype: 'text'
            },
            { fieldName: this.translateService.translate('common.date'), field: 'incidentDate', editable: true, width: 150,
            datatype: 'date' },
            { fieldName: this.translateService.translate('common.time'), field: 'incidentTime', editable: true,
             width: 150, datatype: 'time' },
            { fieldName: this.translateService.translate('oiiinlog.type'), field: 'incidentTypeDesc', editable: true,
                 datatype: 'text', width: 150 },
            { fieldName: this.translateService.translate('common.location'), field: 'intLocDescription', editable: true,
                datatype: 'text', width: 180 },
            {
                fieldName: '', field: 'detialLabel', editable: true, width: 150,
                datatype: 'launchbutton', modal: true, link: '/OIIINLOGPOPUP', data: 'row',
                updateField: 'row', dialogWidth: '80'
            },
            { fieldName: this.translateService.translate('oiiinlog.repairs') , field: 'repairFlag', editable: false,
            width: 150, datatype: 'checkbox' },
            {
                fieldName: '', field: 'infoLabel', editable: true, datatype: 'launchbutton',
                modal: true, link: '/OIUINCRP', data: 'row', dialogWidth: '80'
            },
            { fieldName:  this.translateService.translate('oiiinlog.reportedby'), field: 'staffName', editable: true,
            width: 150, options: this.reportbytOption , datatype: 'text'},
        ];

        this.caseLoadId = this.sessionManager.currentCaseLoad;
        const serviceObj1 = this.oiiinlogFactory.rgAgyLocRecordGroup(this.caseLoadId,this.sessionManager.currentCaseLoadType);
        serviceObj1.subscribe(rgagylocList => {
            this.rgagylocRg = [];

            if (rgagylocList.length === 0) {
                return;
            } else {
                for (let i = 0; i < rgagylocList.length; i++) {
                    this.rgagylocRg.push({
                        'text': rgagylocList[i].description, 'id': rgagylocList[i].agyLocId
                    });
                }
            }
        });
        const serviceObj4 = this.oiiinlogFactory.
            rgStaffRecordGroup(this.caseLoadId);
        serviceObj4.subscribe(rgstaffList => {

            if (rgstaffList.length === 0) {
                return;
            } else {
                this.rgstaffRg = [];
                for (let i = 0; i < rgstaffList.length; i++) {
                    this.reportbytOption.push({'id': rgstaffList[i].staffName, 'text': rgstaffList[i].staffName});
                    this.rgstaffRg.push({
                        'id': rgstaffList[i].staffId, 'text': rgstaffList[i].staffName ,'userId':rgstaffList[i].userId});
                }
            }
        });
        const serviceObj8 = this.oidincdeFactory.
        rgReportedStaffIdsRecordGroup(this.caseLoadId);
        serviceObj8.subscribe(rgstaffList => {

            if (rgstaffList.length === 0) {
                return;
            } else {
                this.staffDetails = [];
                for (let i = 0; i < rgstaffList.length; i++) {
                    this.staffDetails.push({
                        'id': rgstaffList[i].staffId, 'text': rgstaffList[i].staffName ,'userId':rgstaffList[i].userId});
                }
                this.oidincdeFactory.staffDetails=this.staffDetails;
            }
        });

    }
    onClick(){
        this.getCallListOidincde();
        this.oiiinlogFactory.vagyincModelTemp = this.vagyincModelTempData;
        this.oiiinlogFactory.checkedfalg = true;
        this.oiiinlogFactory.agencyincidentId = this.agencyincidentId;
        this.incidentService.setAgencyIncidentId(this.agencyincidentId);
         this.router.navigate(['/OIDINCDE']);
        }
    getCallListOidincde() {
        const optionList = this.oiiinlogFactory.agencyIncidentsCallModuleOidincde();
        optionList.subscribe(list => {
            if (list.length > 0) {
                if(list.indexOf('Q') >= 0) {
                  } else {
                    this.show(this.translateService.translate('oiiinlog.unabletocallmoduleoidincde'), 'warn');
                    return;
                  }
                }
        });
    }
    getOptionList() {
       const optionList = this.oiiinlogFactory.findIncidentTypeDescList();
        optionList.subscribe(list => {
            list.forEach(listval => {
                this.statusOption.push({ 'id': listval, 'text': listval });
            });
        });
    }
    getLocationList() {
        const optionList = this.oiiinlogFactory.findIntLocationsList();
        optionList.subscribe(list => {
            list.forEach(listval => {
                this.locationOption.push({ 'id': listval, 'text': listval });
            });


        });
    }
    allowNumbers(event) {
    }
    onRowClickvagyinc(event) {
        if (event) {
           // this.oiiinlogFactory.vagyincModelTemp = event;
            this.getCallListOiuincrp();
            this.vagyincModelTempData = event;
            this.agencyincidentId = event.agencyIncidentId;
            this.isSelected = false; 
            this.selectedTemp = this.vagyincDataRowData.indexOf(event);
            if(this.selectedTemp!=null)
                {
                this.clearDisable=false;
                }
            }
    }
    getCallListOiuincrp() {
        const optionList = this.oiiinlogFactory.agencyIncidentsCallModuleOiuincrp();
        optionList.subscribe(list => {
            if (list.length > 0) {
                if(list.indexOf('Q') >= 0) {
                  } else {
                    //this.show(this.translateService.translate('oiiinlog.unabletocallmoduleoiuincrp'), 'warn');
                    return;
                  }
                }
        });
    }
    onButGoOidincdeclick() {
    }
    ok() {
    }
    preventDefault() { }
    no() {
    }
    cancel() {
        this.vagyincData = [];
        this.vagyincDataRowData = [];
        const inctypeclr = this.vagyincModel.incidentType === undefined ? '' : undefined;
        const reporteclr = this.vagyincModel.reportedStaffId === 0 ? undefined : 0;
        const agylocidclr = this.vagyincModel.agyLocId === undefined ? '' : undefined;
        const locclr = this.location === undefined ? '' : undefined;
        this.vagyincModel.incidentType = inctypeclr;
        this.vagyincModel.reportedStaffId = Number(reporteclr);
        this.vagyincModel.agyLocId = agylocidclr;
        this.location = locclr;
        this.isSelected = true;
        // this.clearDisable = true;
        this.vagyincModel = new VAgencyIncidents();
        this.orcaId = null;
        this.offenderIdDisplay = null;
        this.orcaIdDisabled = false;
        this.clearDisable=true;
        this.readonlyFlag = false;
    }
    oiiinlogV_AGY_INCINCIDENT_DATEDateopen($event) {
        this.closeMyDataPicker();
        this.preventDefault();
        $event.stopPropagation();
        this.V_AGY_INCINCIDENT_DATEDateopened = true;
    }
    

    
   
    oiiinlogExecuteQuery() {
        
        
        if (this.orcaId && this.offenderIdDisplay) {
            this.vagyincModel.offenderIdDisplay = this.offenderIdDisplay;
        }
        if (this.vagyincModel.fromDate > this.vagyincModel.toDate) {
            this.show(this.translateService.translate('oiiinlog.fromdatecannotbelater'), 'warn');
            return;
        }
     
        if (this.vagyincModel.fromDate > DateFormat.getDate()) {
            this.show(this.translateService.translate('oiiinlog.fromdatemust'), 'warn');
            return;
        }
        
        if (this.vagyincModel.toDate < this.vagyincModel.fromDate) {
            this.show(this.translateService.translate('oiiinlog.fromdatecannotbelater'), 'warn');
            return;
        }
        if (this.vagyincModel.toDate > DateFormat.getDate()) {
            this.show(this.translateService.translate('oiiinlog.todatemust'), 'warn');
            return;
        }
        this.vagyincModel.caseloadType = this.sessionManager.currentCaseLoadType;
        this.vagyincModel.caseloadId = this.sessionManager.currentCaseLoad;
        const serviceObj = this.oiiinlogFactory.vAgyIncExecuteQuery(this.vagyincModel);
//          this.innerRecordsRetrieved = this.oiiinlogFactory.recordsRetrieved;
        // this.vagyincData =    this.innerRecordsRetrieved;
        // if (   this.vagyincData ) {
            //    this.innerRecordsRetrieved = this.vagyincData;
            serviceObj.subscribe(data => {
                if (data.length === 0) {
                    this.vagyincDataRowData = [];
                    this.show(this.translateService.translate('common.querycaused'), 'warn');
                    this.clearDisable = false;
                    this.orcaIdDisabled = false;
                    this.readonlyFlag = false;
                    return;
                } else {
                    this.vagyincData = data;
                    this.vagyincDataRowData = data;
                    this.orcaIdDisabled = true;
                    this.readonlyFlag = true;
                    if (this.vagyincData || this.vagyincDataRowData) {
                        this.clearDisable = false;
                    }
                    this.vagyincDataRowData.forEach(incidentLogRow => {
                        incidentLogRow.repairFlag = (incidentLogRow.repairFlag === 'Y') ? true : false;
                        incidentLogRow.detialLabel = this.translateService.translate('oiiinlog.details');
                        if (incidentLogRow.repairFlag) {
                            incidentLogRow.infoLabel = this.translateService.translate('oiiinlog.info');
                        }
                        incidentLogRow.staffName = incidentLogRow.staffLastName + ' , '
                            + incidentLogRow.staffFirstName;
                            this.selected = 0;
                    });
                }
            });
            this.clearDisable=false;
            
            
            //    this.innerRecordsRetrieved.forEach(incidentLogRow => {
            //         incidentLogRow.repairFlag = (incidentLogRow.repairFlag === 'Y') ? true : false;
            //         incidentLogRow.detialLabel = 'Details';
            //         if (incidentLogRow.repairFlag) {
            //             incidentLogRow.infoLabel = 'info';
            //         }
            //         incidentLogRow.staffName = incidentLogRow.staffLastName + ','
            //             + incidentLogRow.staffFirstName;
            //     });
            //  } else {
            //      this.innerRecordsRetrieved  = this.vagyincData;
            // }
    }

    validExecute() {
        this.oiiinlogFactory.
        vAgyIncExecuteQuery(this.vagyincModel);
     this.innerRecordsRetrieved = this.oiiinlogFactory.recordsRetrieved;
    this.vagyincData =    this.innerRecordsRetrieved;
    if ( this.vagyincData) {
       this.oiiinlogExecuteQuery();
    }
    }

    changeCenterType() {
        this.locationLink = 'oiiinlog/rgLevelLocRecordGroup?agyLocId=' + this.vagyincModel.agyLocId;
        const locationService = this.oiiinlogFactory.rgLevelLocRecordGroup(this.vagyincModel.agyLocId);
     
        locationService.subscribe(listData => {
            for (const dataval of listData) {
              
                this.listMap.set(dataval.internalLocationCode, dataval.internalLocationId);
            }
        });

        // this.innerLocationlist(event);
    }
    selectLanguageChange(event) {
    }

    innerLocationlist(code) {
        const serviceObj = this.oiiinlogFactory.
            rgLevelLocRecordGroup('ITAG');
        serviceObj.subscribe(list => {

            if (list.length === 0) {
                this.rglevellocRg = [];
                return;
            } else {
                for (let i = 0; i < list.length; i++) {
                    this.rglevellocRg.push({
                        'id': list[i].internalLocationId, 'text': list[i].description
                    });
                }
            }
        });

    }
    show(vldmsg, type?) {
        const msgval = [{ message: vldmsg, type: type }];
        this.msgs = [...msgval];
    }
      get recordsRetrieved(): any[] {
        return this.innerRecordsRetrieved;
    }

    set recordsRetrieved(v: any[]) {
        if (v !== this.innerRecordsRetrieved) {
            this.innerRecordsRetrieved = v;

            // TODO: add logic to update grid with data, reset current selection (if needed)
        }
    }
    locationChange() {

        this.vagyincModel.internalLocationId = Number(this.listMap.get(this.location));
    }
    ngOnDestroy () {
        //this.oidincdeFactory.vagyincDataRowData = this.vagyincDataRowData;
        //this.oidincdeFactory.vagyincModel = this.vagyincModel;
        this.oiiinlogFactory.vagyincDataRowData = [];
        this.oiiinlogFactory.vagyincModel = new VAgencyIncidents();
        this.oidincdeFactory.statusOption = this.statusOption;
        this.oidincdeFactory.locationOption = this.locationOption;
        this.oiiinlogFactory.selected = null;
        this.oidincdeFactory.selected = this.selectedTemp;
        this.oiiinlogFactory.statusOption = [];
        this.oiiinlogFactory.locationOption = [];
    }
    setDescription(event) {
        this.isDialogOpen = false;
        if (event) {
            if (event.lastName && event.firstName && event.offenderIdDisplay) {
                this.orcaId = event.lastName + ', ' + event.firstName;
                this.offenderIdDisplay = event.offenderIdDisplay;
                this.lastName = event.lastName;
                this.firstName = event.firstName;
            }
        } else {
            this.orcaId = null;
            this.offenderIdDisplay = null;
        }
    }
    // isInsertable() {
    //     if (this.vagyincModel.fromDate || this.vagyincModel.toDate || this.vagyincModel.incidentType
    //             || this.vagyincModel.reportedStaffId || this.vagyincModel.agyLocId) {
    //         this.clearDisable = false;
    //     } else {
    //         this.clearDisable = true;
    //     }
    // }

    getOsinamesdialog(event) {
        if (this.offenderIdDisplay && this.offenderIdDisplay.trim()) {
        const requestData = {offenderIdDisplay : this.offenderIdDisplay };
            this.osinamesService.nameSrchExecuteQuery(requestData).subscribe(resoibseDate => {
                if (resoibseDate && resoibseDate.length > 0) {
                    this.orcaId = resoibseDate[0].lastName + ', ' + resoibseDate[0].firstName;
                } else {
                    this.osinamesdialogbtn.launchClicked();
                    this.osinamesbtnDisabled = true;
                }
            });
    } else {
        this.orcaId = '';
    }
}
onOsinamesClick  = () => {
    if (this.isDialogOpen) {
        this.isDialogOpen = false;
        return this.isDialogOpen;
    } else {
        this.isDialogOpen = true;
    return true;
    }
}
}
