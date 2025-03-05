import { GridOptions } from '@ag-grid-enterprise/all-modules';
import { Component, OnInit, Input, ViewChild, OnDestroy } from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { AgencyIncidentParties } from '@instincidentsbeans/AgencyIncidentParties';
import { AgencyIncidentRepairs } from '@instincidentsbeans/AgencyIncidentRepairs';
import {SignificantIncident} from '@instincidentsbeans/SignificantIncident';
import { SignificantIncidentCommitBean } from '@instincidentsbeans/SignificantIncidentCommitBean';
import { AgencyIncidents } from '@instincidentsbeans/AgencyIncidents';
import { DialogService } from '@ui-components/dialog/dialog.service';
import { DialogComponent } from '@ui-components/dialog/dialog.component';
import { AgencyIncidentCharges } from '@instincidentsbeans/AgencyIncidentCharges';
import { AgencyIncidentRepairsCommitBean } from '@instincidentsbeans/AgencyIncidentRepairsCommitBean';
import { AgencyIncidentPartiesCommitBean } from '@instincidentsbeans/AgencyIncidentPartiesCommitBean';
import { AgencyIncidentChargesCommitBean } from '@instincidentsbeans/AgencyIncidentChargesCommitBean';
import { OidincdeService } from '../service/oidincde.service';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { OiiinlogService } from '../service/oiiinlog.service';
import { VAgencyIncidents } from '@instincidentsbeans/VAgencyIncidents';
import { OiinamesService } from '../../movement-external/service/oiinames.service';
import { ValidateRowReturn } from '@ui-components/grid/grid.component';
import { VNameSearch } from '@commonbeans/VNameSearch';
import { DateFormat } from '@ui-components/datepicker/dateFormat';
import { AgencyIncidentsCommitBean } from '@instincidentsbeans/AgencyIncidentsCommitBean';
import { TimeFormat } from '@ui-components/time/timeFormat';
import { IncidentSearchService } from '../service/incident-search.service'
import { OffenderWeapons } from '../beans/OffenderWeapons';
import { RedirectUtil } from '@core/classes/redirectUtil';
import { EoffenderService } from "@common/iwp/service/eoffender.service";
import { IWPPaneService } from '@core/ui-components/pane/iwppane.service';
import { VHeaderBlock } from '@commonbeans/VHeaderBlock';
import { OsiosearService } from '@common/offender-records/service/osiosear.service';
import { Images } from '@commonbeans/Images';
import { OffenderSearchService } from '@common/offender-records/service/offender-search.service';
import { IncidentFollowUpDetails } from '../beans/IncidentFollowUpDetails';
import { IncidentFollowUpDetailsCommitBean } from '../beans/IncidentFollowUpDetailsCommitBean';
import { OumsysetService } from '@sa/admin/service/oumsyset.service';
import { OumsysetBean } from '@sa/admin/beans/OumsysetBean';
@Component({
    templateUrl: './oidincde.component.html',
    styleUrls: ['./oidincde.component.scss'],
    providers: [],
})
export class OidincdeComponent implements OnInit, OnDestroy {
    @ViewChild( 'dialog', {static: true}) dialog: DialogComponent;
      isBtnEnable: boolean;
    @ViewChild('grid') grid: any;
    @ViewChild('staffInvGrid') staffInvGrid: any;
    listOfAgencies: AgencyIncidents[];
    reportedId: any;
    vHeaderBlockModel: VHeaderBlock = new VHeaderBlock();
    agencyIncidentDisable: boolean;
    incidentDateDisable: boolean;
    incidentTimeRead: boolean;
    incidentTypeDisable: boolean;
    incidentDetailsDisable: boolean;
    facilityDisable: boolean;
    locationDisable: boolean;
    reportedDisable: boolean;
    reportDateDisable: boolean;
    saveflag: boolean;
    rowSelection: AgencyIncidentParties = new AgencyIncidentParties();
    incidentlocationDisable: boolean;
    incidenttypeDisable: boolean;
    reportTimeDisable: boolean;
    createdBy: boolean;
    incidentTimeDisable: boolean;
    associatedDisable: boolean;
    isclear: boolean;
    type = 'error';
    msglist = [];
    message = ' Invalid.';
    msgs: any[] = [];
    indexVal = 0;
    caseLoadId: string;
    incidentDate: any;
    incidentTime: any;
    rgincidenttypesRg: any[];
    incidentType: string;
    rgagylocidsRg: any[];
    st: string;
    associateDetailsHidden: boolean;
    rglevelinternallocationidsRg: any[];
    rgreportedstaffidsRg: any[];
    rgreportedstaffidsRgTemp: any[];
    agencyincidentsData: AgencyIncidents[] = [];
    agencyincidentsDataTemp: AgencyIncidents[] = [];
    repairType: string;
    agencyData: AgencyIncidentParties[];
    selectedAgency: AgencyIncidentParties = new AgencyIncidentParties();
    staffData: AgencyIncidentParties[];
    staffDataTemp: AgencyIncidentParties[];
    selectedStaff: AgencyIncidentParties = new AgencyIncidentParties();
    staffDataModel: AgencyIncidentParties;
    repairDetailsData: AgencyIncidentRepairs[];
    repairDetailsDataTemp: AgencyIncidentRepairs[];
    selectedRepairDetails: AgencyIncidentRepairs = new AgencyIncidentRepairs();
    repairDataModel: AgencyIncidentRepairs;
    significantIncident:SignificantIncident;
    agencyRepairsCommitBeans: AgencyIncidentRepairsCommitBean;
    chargeData: AgencyIncidentCharges[];
    chargeDataTemp: AgencyIncidentCharges[];
    selectedChargeData: AgencyIncidentCharges = new AgencyIncidentCharges();
    agencyIncidentChargesCommitBean: AgencyIncidentChargesCommitBean;
    chargeDataModel: AgencyIncidentCharges;
    offenderInvData: AgencyIncidentParties[];
    offenderInvDataTemp: AgencyIncidentParties[];
    selectedOffenderInvData: AgencyIncidentParties = new AgencyIncidentParties();
    offenderInvDataModel: AgencyIncidentParties;
    OffenderID:any;
    agencyIncidentPartiesCommitBean: AgencyIncidentPartiesCommitBean;
    chargeCols: any[];
    staffCols: any[];
    repairDetailsCols: any[];
    time: Date;
    date: Date;
    minDate: Date;
    reportDate: any;
    reporttime: any;
    reportTime: string;
    agencyIncidentsModel: AgencyIncidents;
    agencyIncidentsModelTemp: AgencyIncidents;
    agencyIncidentsTemp: AgencyIncidents;
    locked: boolean;
    showEditBtn: boolean;
    exitflag: boolean;
    lockedFlag: boolean;
    showAppend:boolean;
    crtbtn: boolean;
    selectedbtn :boolean;
    storage: any;
    storage1: any;
    offsearch: any;
    offenderId: string;
    indexParties: number;
    tabIndex: number;
    roleDes: any[] = [];
    actionDes: any[] = [];
    staffDes: any[] = [];
    roleDes1: any[] = [];
    repairDes: any[] = [];
    staffFlag: boolean;
    offenderInvolvementClm: any[];
    chargeClm: any[];
    staffInvolvementClm: any[];
    repairClm: any[];
    significantClm:any[];
    stgNamesClm: any[];
    public gridOptions: GridOptions;
    translateLabel: any;
    agencyincidentsModel: AgencyIncidents = new AgencyIncidents();
    agencyIncidents: AgencyIncidents = new AgencyIncidents();
    agencyincidentsIndex = 0;
    agencyincidentsCommitModel: AgencyIncidentsCommitBean = new AgencyIncidentsCommitBean();
    agencyincidentsInsertList: AgencyIncidents[] = [];
    agencyincidentsUpdatetList: AgencyIncidents[] = [];
    agencyincidentsDeleteList: AgencyIncidents[] = [];
    agyincpartiesoffenderData: AgencyIncidentParties[] = [];
    agyincpartiesoffenderDataTemp: AgencyIncidentParties[] = [];
    agyincpartiesoffenderModel: AgencyIncidentParties = new AgencyIncidentParties();
    agyincpartiesoffenderIndex: number;
    agyincpartiesoffenderInsertList: AgencyIncidentParties[] = [];
    agyincpartiesoffenderUpdatetList: AgencyIncidentParties[] = [];
    agyincpartiesoffenderDeleteList: AgencyIncidentParties[] = [];
    agencyincidentchargesData: AgencyIncidentCharges[] = [];
    agencyincidentchargesDataTemp: AgencyIncidentCharges[] = [];
    agencyincidentchargesModel: AgencyIncidentCharges = new AgencyIncidentCharges();
    agencyincidentchargesIndex: number;
    agencyincidentchargesInsertList: AgencyIncidentCharges[] = [];
    agencyincidentchargesUpdatetList: AgencyIncidentCharges[] = [];
    agencyincidentchargesDeleteList: AgencyIncidentCharges[] = [];
    agyincpartiesstaffData: AgencyIncidentParties[] = [];
    agyincpartiesstaffDataTemp: AgencyIncidentParties[] = [];
    agyincpartiesstaffModel: AgencyIncidentParties = new AgencyIncidentParties();
    agyincpartiesstaffIndex: number;
    agyincpartiesstaffInsertList: AgencyIncidentParties[] = [];
    agyincpartiesstaffUpdatetList: AgencyIncidentParties[] = [];
    agyincpartiesstaffDeleteList: AgencyIncidentParties[] = [];
    agencyincidentrepairsData: AgencyIncidentRepairs[] = [];
    agencyincidentrepairsDataTemp: AgencyIncidentRepairs[] = [];
    agencyincidentrepairsModel: AgencyIncidentRepairs = new AgencyIncidentRepairs();
    agencyincidentrepairsIndex: number;
    agencyincidentrepairsInsertList: AgencyIncidentRepairs[] = [];
    agencyincidentrepairsInsertListTemp: any[] = [];
    agencyincidentrepairsUpdatetList: AgencyIncidentRepairs[] = [];
    agencyincidentrepairsDeleteList: AgencyIncidentRepairs[] = [];
    significantincidentData:SignificantIncident[]=[];
    des:any;
    imageModel: Images = new Images();
    namesrchModel: VNameSearch = new VNameSearch();
    namesrchData: VNameSearch[] = [];
    display: boolean;
    errorMessage: string;
    headerMessage: string;
    disabled: boolean;
    editable: boolean;
    rgoffinvactioncodesRg: any[] = [];
    rgoffinvincidentrolesRg: any[] = [];
    rgoicoffencecodesRg: any[] = [];
    rgrepairtypesRg: any[] = [];
    rgstaffinvincidentrolesRg: any[] = [];
    count = 0;
    incidentDateRequied: boolean;
    staffId: number;
    deleteflag:  boolean;
    retriveDisable: boolean;
    incdTime: any;
    startDate: any;
    endDate: any;
    staffFalg: boolean;
    staffCode: any;
    createName: any;
    btnprevious: boolean;
    btnnext:  boolean;
    reportLink: any;
    staffLink:any;
    facilityLink: any;
    locationLink: any;
    retriveflag = true;
    notimeupdate:boolean=false;
    reportTimeDisablefalg: boolean;
    modalData: any;
    clearDisable: boolean;
    partySeq: any;
    chargeflag: boolean;
    offbtn:boolean;
    tableIndex = -1;
    chargeOption: any[];
    offenderflag: boolean;
    isClose:boolean;
    addflag: boolean;
    incidentDetailsTemp: string;
    oidincdeIndex = 0;
    readonlyReqiured: boolean;
    indexTempVal = 0;
    staffobj:any;
    significantAllType:any []
    lstOfAgyShift: AgencyIncidents[] = [];
    addNewFlag: boolean;
    isNewForm: boolean = false;
    incident: any;
    editingIncident: boolean;
    hidePane: boolean;
    title: string;
    title1: boolean;
    reportedById : number;
    offenderWeapons: OffenderWeapons;
    staffFullName: string;
    incidentReportTime: any;
    incidentReportDate: any;
    currenDateTime: any;
    rgstaffRg:any;
    EquCheck:boolean;
    significantIncidentInsertList:SignificantIncident[]=[];
    significantIncidentUpdatetList:SignificantIncident[]=[];
    significantIncidentDeleteList:SignificantIncident[]=[];
    significantIncidentInsertListTemp:SignificantIncident[]=[];
    significantIncidentCommitBeans= new SignificantIncidentCommitBean();
    selectedTabIndex=0;
    vHeaderBlockData: VHeaderBlock[] = [];
    staffDetails:any;
    incidentTemp: AgencyIncidents = new AgencyIncidents();
    enhancStaffReport: boolean;
    userId: string;
   
    incidentFollowUpColumnDef: any[];
    incidentFollowUpData: IncidentFollowUpDetails[] = [];
    incidentFollowUpDataModel : IncidentFollowUpDetails = new IncidentFollowUpDetails();
    incidentFollowUpDataSearchModel : IncidentFollowUpDetails = new IncidentFollowUpDetails();
    incidentFollowUpIndex: number;


    incidentFollowUpInsertList:IncidentFollowUpDetails[]=[];
    incidentFollowUpUpdatetList:IncidentFollowUpDetails[]=[];
    incidentFollowUpDeleteList:IncidentFollowUpDetails[]=[];
    IncidentFollowUpDetailsCommitBean: IncidentFollowUpDetailsCommitBean= new IncidentFollowUpDetailsCommitBean();
    tabDataVisable:boolean;
    showDocIcon:boolean = false;
    disableString: boolean;
    facilityLabel: string;
    incTypeLovLink: string;
    communityEnable: boolean;
    oumsysetModelIncedentReportConfig: OumsysetBean = new OumsysetBean();
    incedentReportingRowData: any[];
    reportableIncedentFlag: boolean;
    tabDataVisibleSignfct: boolean;
    constructor(private osiosearFactory: OsiosearService,private offenderSearchService: OffenderSearchService,private oidincdeFactory: OidincdeService, private eoffenderService: EoffenderService, private dialogService: DialogService, private router: Router, public translateService: TranslateService,
        private activatedRoute: ActivatedRoute, private sessionManager: UserSessionManager, private  oiiinlogFactory: OiiinlogService,
        private oiinamesFactory: OiinamesService, private incidentService: IncidentSearchService,private redirectUtil:RedirectUtil, private iwpPaneService :IWPPaneService, public oumsysetService: OumsysetService, ) {
        this.incidentDateDisable = false;
        this.incidentTimeRead = false;
        this.incidentTypeDisable = false;
        this.facilityDisable = false;
        this.reportedDisable = false;
        this.reportDateDisable = true;
        this.incidentTimeDisable = false;
        this.incidentlocationDisable = false;
        this.incidenttypeDisable = false;
        this.agencyincidentsIndex = 0;
        this.agencyIncidentDisable = true;
        this.associateDetailsHidden = false;
        this.incidentDetailsDisable = false;
        this.indexVal = 0;
        this.count = 0;
        this.agencyData = [];
        this.agencyData.push(new AgencyIncidentParties);
        this.repairDetailsData = [];
        this.repairDetailsData.push(new AgencyIncidentRepairs);
        this.listOfAgencies = [];
        this.staffData = [];
        this.staffData.push(new AgencyIncidentParties);
        this.chargeData = [];
        this.chargeData.push(new AgencyIncidentCharges);
        this.offenderInvData = [];
        this.offenderInvData.push(new AgencyIncidentParties);
        this.agencyIncidentsModel = new AgencyIncidents();
        this.agencyIncidentsModelTemp = new AgencyIncidents();
        this.agencyRepairsCommitBeans = new AgencyIncidentRepairsCommitBean();
        this.agencyIncidentPartiesCommitBean = new AgencyIncidentPartiesCommitBean();
        this.agencyIncidentChargesCommitBean = new AgencyIncidentChargesCommitBean();
        this.repairDataModel = new AgencyIncidentRepairs();
        this.staffDataModel = new AgencyIncidentParties();
        this.chargeDataModel = new AgencyIncidentCharges();
        this.offenderInvDataModel = new AgencyIncidentParties();
        this.associatedDisable = true;
        this.agencyIncidentsModel.incidentDate = DateFormat.getDate();
        this.agencyIncidentsModel.reportDate = DateFormat.getDate();
        this.startDate =
        this.agencyIncidentsModel.incidentDate.getDate() + '-' + this.agencyIncidentsModel.incidentDate.getMonth() + '-' +
        this.agencyIncidentsModel.incidentDate.getFullYear();
        this.endDate = this.startDate;
        this.agencyIncidentsModel.incidentDate = undefined;
        this.exitflag = false;
    }
    ngOnInit() {
        this.getIncdentReportConfigData();
        if(this.sessionManager.currentCaseLoadType  === "COMM"){
            this.disableString=false;
            this.facilityLabel= this.translateService.translate('oidincde.communityoffice');
            this.communityEnable = true;
        } else {
            this.disableString=true;
            this.facilityLabel= this.translateService.translate('system-profile.inst-agency');
            this.communityEnable = false;
        }
        if(this.incidentService.getAgencyIncidentId() != undefined && this.incidentService.getAgencyIncidentId() != null && this.incidentService.getAgencyIncidentId() != 0){
            this.showDocIcon = true;
        } else {
            this.showDocIcon = false;
        }
         this.staffobj=this.sessionManager.userSessionDetails().staff;
        this.userId = this.sessionManager.userSessionDetails().id;
         this.oidincdeFactory.selectedInvolvedOffender=null;
         this.incidentTemp = new AgencyIncidents();
         this.checkPermisionForTabAccess();
         
         if(this.incidentService.getAgencyIncidentId()){
                  let innerSearchPams = {'agencyIncidentId':this.incidentService.getAgencyIncidentId()};
                  this.incidentService.agencyIncidentsExecuteQuery(innerSearchPams);
                  this.selectedTabIndex=1;
            } 
         if(this.oiiinlogFactory.vagyincModelTemp!=null|| this.incidentService.getAgencyIncidentId() ){
             this.cancel();
             this.addflag=true;
        }else{
            
            this.title = this.translateService.translate( 'oidincde.createnewreport' );
            this.editingIncident = true;
        }
        this.iwpPaneService.objectId =this.oiiinlogFactory.agencyincidentId
        this.crtbtn=true;
        this.hidePane = true;
        this.agencyIncidentsTemp = new AgencyIncidents();
        this.readonlyReqiured = true;
        this.facilityLink = 'oidincde/rgAgyLocIdsRecordGroup?caseloadId=' + this.sessionManager.currentCaseLoad + '&caseLoadType=' + this.sessionManager.currentCaseLoadType;
        this.reportLink = 'oidincde/rgReportedStaffIdsRecordGroup?caseloadId=' + this.sessionManager.currentCaseLoad;
        this.incTypeLovLink='oidincde/rgIncidentTypesRecordGroup?caseLoadType='+this.sessionManager.currentCaseLoadType;
        this.staffFalg = true;
        this.lockedFlag=true;
        this.retriveDisable = true;
        this.btnprevious = true;
        this.btnnext = true;
        this.addNewFlag = false;
        this.isclear=false;
        this.isClose=false;
          if (!this.oiiinlogFactory.vagyincModelTemp){
              const datePipe = new DatePipe('en-US');
              this.time = DateFormat.getDate();
              const st1 = datePipe.transform(this.time, 'HH:mm');
         }
          this.oidincdeFactory.getSignificantTypes(this.sessionManager.getId(),'OIDINCDE').subscribe(data=>{
              this.significantAllType=data;
          });
          this.translateLabel = JSON.parse(sessionStorage.getItem('i18data'));
          this.associateDetailsHidden = false;
          const userid = this.sessionManager.getId();
          this.caseLoadId = this.sessionManager.currentCaseLoad;
          this.agencyIncidentsModel = new AgencyIncidents();
          const datePipe = new DatePipe('en-US');
          this.reportDate =  DateFormat.getDate();
          this.time = DateFormat.getDate();
          const st1 = datePipe.transform(this.time, 'HH:mm');
          this.agencyIncidentsModel.reportTime = this.time;
          this.agencyIncidentsModel.incidentTime=this.time;
          this.st = datePipe.transform(this.reportDate, 'yyyy/MM/dd');
          this.agencyIncidentsModel.reportDate = DateFormat.getDate((this.st));
          this.agencyIncidentsModel.incidentDate = this.agencyIncidentsModel.reportDate;
          this.changeReportTypestaff();
        this.getEnhancedStaffReporterAuth();
          this.offbtn=true;
          if (this.agencyIncidentsModel.agyLocId && (!this.agencyIncidentsModel.flag)) {
            this.locationDisable = false;
            } else {
            this.locationDisable = true;
            }
          this.staffLink = 'oidincde/rgReportedStaffIdsRecordGroup?caseloadId=' + this.sessionManager.currentCaseLoad;
        this.offenderInvolvementClm = [
            {
                fieldName: this.translateService.translate('oidincde.incident') + '*', field: 'offenderIdDisplay',
                editable: false, cellEditable: this.canOffInvEdit, width: 150, filter: 'text', datatype: 'text'
            },
            {
                fieldName: '', field: 'button', datatype: 'hyperlink', 
                dialogWidth: '80%',
                editable: true, width: 100, data: 'row', updateField: 'row', modal: true,onLaunchClick: this.isLaunchDisable,
                displayas: 'href',styleClass: 'search',  isDisable: this.isLaunchDisable
            },
            {
                fieldName: this.translateService.translate('system-profile.name-last'), field: 'lname',
                editable: false, width: 150, datatype: 'text'
            },
            {
                fieldName: this.translateService.translate('system-profile.name-given-1'), field: 'fname',
                editable: false, width: 150, datatype: 'text'
            },
            {
                fieldName: this.translateService.translate('oidincde.role') + '*', field: 'incidentRole',
                editable: true, width: 150, datatype: 'lov', domain: 'INC_OFF_PAR', optionWidth: 500,
                cellEditable: this.canOffInvEditroleactioncommentfields
            },
            {
                fieldName: this.translateService.translate('oidincde.action') + '*', field: 'actionCode',
                editable: true, width: 150, datatype: 'lov', domain: 'INC_DECISION', optionWidth: 500,
                cellEditable: this.canOffInvEditroleactioncommentfields
            },
            {
                fieldName: this.translateService.translate('oidincde.dateAdded'), field: 'partyAddedDate',
                editable: false, width: 150, datatype: 'date'
            },
            {
                fieldName: this.translateService.translate('oidincde.oic'), field: 'oicIncidentId',
                editable: false, width: 150, datatype: 'text', hide: this.communityEnable
            },
            {
                fieldName: this.translateService.translate('oidincde.comment'), field: 'commentText',
                editable: true, width: 150, datatype: 'text', uppercase: 'false', maxlength: 400,
                cellEditable: this.canOffInvEditroleactioncommentfields,tooltip: true
            },
            {
                fieldName: this.translateService.translate('oidincde.weapons'), field: 'buttonWeap',displayas: 'button', datatype: 'hyperlink', linkField:'navOffWeapons',
                editable: true, width: 150, data: 'row', updateField: 'row', modal: true, dialogWidth: '70%', minWidth: 190            
            },

            {
                fieldName: this.translateService.translate('oidincde.reportableincident'), field: 'reportIncidentBut', datatype: 'hyperlink', editable: true, displayas: 'href',
                modal: true, dialogWidth: '80%', styleClass: 'launch', data: 'row', updateField: 'row', link: '/OIUREPIN'

            },

            {
                fieldName:'',field:'offenderBookId',datatype:'number',hide:true
            }
        ];
        this.chargeClm = [
           {
               fieldName: this.translateService.translate('oidincde.charge') + '*', field: 'findingCode',
                editable: false, width: 250
            },
            {
                fieldName: '', field: 'button', datatype: 'hyperlink',
                editable: true, displayas: 'href', dialogWidth: '80%', styleClass: 'search',
                link: '/OIDINCDECHARGEPOPUP', data: 'row',
                updateField: 'row', modal: true, width: 150,
            },
           {
                fieldName: this.translateService.translate('oidincde.type'), field: 'oicOffenceType',
                editable: false, width: 150, datatype: 'text'
            },
            {
                fieldName: this.translateService.translate('oidincde.offenseDescription'), field: 'reportText',
                editable: false, width: 250, datatype: 'text'
            },
            {
                fieldName: this.translateService.translate('oidincde.category'), field: 'evidenceDisposeText',
                editable: false, width: 250, datatype: 'text'
            },
            {
                fieldName: this.translateService.translate('oidincde.evidence'), field: 'guiltyEvidenceText',
                editable: true, width: 350, datatype: 'text', uppercase: 'false', maxlength: 400
            },
           
            

        ];
        this.staffInvolvementClm = [
            {
                fieldName: this.translateService.translate('oidincde.staffName') + '*', field: 'staffIdDes', editable: false, width: 430,
                datatype: 'text'
            },
            // {
            //     fieldName: '', field: 'button', datatype: 'hyperlink',
            //     editable: true, displayas: 'href', dialogWidth: '80%', styleClass: 'search',
            //     link: '/OIDINCDESTAFFPOPUP', data: 'row',
            //     updateField: 'row', modal: true, width: 150
            // },
            {
                fieldName: '', field: 'button', width: 150, datatype: 'hyperlink', editable: true,
                displayas: 'href', dialogWidth: '80%', styleClass: 'search', onLaunchClick: this.viewStaffLaunch,
                modal: true, data: 'row', updateField: 'row'
            },
            {
                fieldName: this.translateService.translate('oidincde.participation') + '*',
                 field: 'incidentRole', editable: true, width: 200,
                datatype: 'lov', domain:'INC_STAF_PAR', optionWidth: 400//link: 'oidincde/rgIncidentTypesRecordGroup'
            },
           
            { 
                fieldName: this.translateService.translate('oidincde.forceused'), 
                      field: 'forceUsed', datatype: 'checkbox', uppercase: 'false' ,editable: false, width: 150
                      },
           { 
              fieldName: this.translateService.translate('oidincde.reportcomplete'), 
              field: 'repCompletFlag', datatype: 'checkbox', uppercase: 'false' ,editable: false, width: 150
              },
           
            {
                fieldName: this.translateService.translate('oidincde.staffreport'), field: 'buttontext',datatype: 'hyperlink', width: 150,displayas: 'button',
                data: 'row', updateField: 'row', modal: true, dialogWidth: 50, onLaunchClick: this.onStaffReportLaunch, isDisable: this.isDisableStaffReport
            },
            {
                fieldName: this.translateService.translate('oidincde.staffreporttype'), field: 'reportType', datatype: 'lov', domain: 'STAFF_REPORT',
                editable: true, required: true, cellEditable: this.cellEditReportType
            },
              { fieldName: this.translateService.translate('oidincde.comment'), 
                  field: 'commentText', datatype: 'text', uppercase: 'false' ,editable: true, width:200 , maxlength: 600,tooltip: true},
         {
                    fieldName: this.translateService.translate('oidincde.reportableincident'), field: 'reportIncidentBut2', datatype: 'hyperlink', editable: true, displayas: 'href',
                    modal: true, dialogWidth: '80%', styleClass: 'launch', data: 'row', updateField: 'row', link: '/OIUREPIN'
    
        },
            {
                fieldName:'',field:'staffId',datatype:'number',hide:true
            }

            
                ];
        this.repairClm = [
            {
                fieldName: this.translateService.translate('oidincde.repairType') + '*', field: 'code', editable: true, width: 430,
                datatype: 'lov', domain: 'REPAIR_TYPE', optionWidth: 500
            },
            
            {
                fieldName: this.translateService.translate('oidincde.cost'),
                field: 'repairCost', editable: true,  datatype: 'number', width:200 ,maxlength: 600,minValue:1,format: '1.2-2',strictFP: true, whole: true, maxValue: 999999999.99
            },
            {
                fieldName: this.translateService.translate('oidincde.comment'),
                field: 'commentText', editable: true,  datatype: 'text', uppercase: 'false', width:200 , maxlength: 600,tooltip: true
            }
        ];
        this.significantClm = [
                          {
                              fieldName: this.translateService.translate('oidincde.Type') , field: 'significanceType', editable: true, width: 430,
                              datatype: 'lov', domain: 'SIG_INC_TYPE', optionWidth: 500, required: true,cellEditable:this.canSqeEdit
                          },
                          
                          {
                              fieldName: this.translateService.translate('oidincde.Date'),
                              field: 'entryDate', editable: true,  datatype: 'date', width:200 ,maxlength: 600, required: true
                          },
                          {
                              fieldName: this.translateService.translate('oidincde.Time'),
                              field: 'entryTime', editable: true, required: true, datatype: 'time', uppercase: 'false', width:200 , maxlength: 600,tooltip: true
                          },
                          {
                              fieldName: this.translateService.translate('oidincde.definedBy'),
                              field: 'modifiedStaffId', editable: false,datatype: 'text', width: 150
                          }
                      ];
     this.incidentFollowUpColumnDef= [
    {
        fieldName: this.translateService.translate('oidincde.policy') , field: 'policy', editable: true, width: 150,
        datatype: 'lov', domain: 'IN_POLICY', required: true
    },
    
    {
        fieldName: this.translateService.translate('oidincde.compliance') , field: 'compliance', editable: true, width: 150,
        datatype: 'lov', domain: 'IN_COMP', required: true
    },

    {
        fieldName: this.translateService.translate('oidincde.comment'),
        field: 'commentText', editable: true,  datatype: 'text', uppercase: 'false', width:200 , maxlength: 240,tooltip: true
    }
];
        
        
                      const serviceObj8 = this.oidincdeFactory.
                      rgReportedStaffIdsRecordGroup(this.caseLoadId);
                      serviceObj8.subscribe(rgstaffList => {
              
                          if (rgstaffList.length === 0) {
                              return;
                          } else {
                              this.rgstaffRg = [];
                              for (let i = 0; i < rgstaffList.length; i++) {
                                  this.rgstaffRg.push({
                                      'id': rgstaffList[i].staffId, 'text': rgstaffList[i].staffName ,'userId':rgstaffList[i].userId});
                              }
                              this.oidincdeFactory.staffDetails=this.rgstaffRg;
                          }
                      });
              
        var staffobj=this.sessionManager.userSessionDetails().staff;
        this.reportedById=staffobj.staffId;
       // this.staffFullName= staffobj.firstName +"_"+ staffobj.lastName;

        if ( this.oiiinlogFactory.checkedfalg ) {
              this.exitflag = true;
            }
        if ( this.oiiinlogFactory.vagyincModelTemp) {
              this.exitflag = true;
              const datePipe = new DatePipe('en-US');
            if (this.oiiinlogFactory.vagyincModelTemp.flag) {
                this.locked = true;
                this.associatedDisable = false;
                this.locked = true;
                this.saveflag = true;
                this.agencyIncidentDisable = true;
                this.incidentDateDisable = true;
                this.incidentTimeRead = true;
                this.incidentTypeDisable = true;
                this.facilityDisable = true;
                this.locationDisable = true;
                this.reportedDisable = true;
                this.incidentTypeDisable = true;
                this.incidentDetailsDisable = true;
                this.incidentDateDisable = true;
                this.associateDetailsHidden = true;
                this.reportTimeDisable = true;
                this.createdBy = true;
                this.lockedFlag = true;
                this.associatedDisable = false;
          } else {
                 this.associatedDisable = false;
                }
                if (!this.oiiinlogFactory.vagyincModelTemp.repairFlag) {
                    this.associatedDisable = false;
                    }
          this.agencyIncidentsModel.incidentDetails = this.oiiinlogFactory.vagyincModelTemp.incidentDetails;
          this.agencyIncidentsModel.flag = this.oiiinlogFactory.vagyincModelTemp.flag;
          this.agencyIncidentsModel.reportTime = (DateFormat.getDate(this.oiiinlogFactory.vagyincModelTemp.reportTime));
          this.agencyIncidentsModel.incidentType = this.oiiinlogFactory.vagyincModelTemp.incidentType;
          this.agencyIncidentsModel.agencyIncidentId = this.oiiinlogFactory.vagyincModelTemp.agencyIncidentId;
          this.agencyIncidentsModel.agyLocId = this.oiiinlogFactory.vagyincModelTemp.agyLocId;
          const serviceObj3 = this.oidincdeFactory.
            rgLevelInternalLocationIdsRecordGroup(this.agencyIncidentsModel.agyLocId);
          serviceObj3.subscribe(list3 => {
            this.rglevelinternallocationidsRg = [];
            if (list3.length === 0) {
              return;
            } else {
              for (let i = 0; i < list3.length; i++) {
                this.rglevelinternallocationidsRg.push({
                  'text': list3[i].internalLocationCode,

                  'id': list3[i].internalLocationId
                });
            }
            }
          });
            this.agencyIncidentsModel.interLocationIdDes = this.oiiinlogFactory.vagyincModelTemp.code;
            if(!this.oiiinlogFactory.vagyincModelTemp.code) {
                this.agencyIncidentsModel.interLocationIdDes = this.oiiinlogFactory.vagyincModelTemp.internalLocationId;
            }
          this.agencyIncidentsModel.reportedStaffId = this.oiiinlogFactory.vagyincModelTemp.reportid;
          this.agencyIncidentsModel.createStaffName = this.createName;
          this.reportDate = datePipe.transform(this.oiiinlogFactory.vagyincModelTemp.reportDate, 'yyyy/MM/dd');
          this.agencyIncidentsModel.reportDate = DateFormat.getDate(this.reportDate);
          this.incidentDate = datePipe.transform(this.oiiinlogFactory.vagyincModelTemp.incidentDate, 'yyyy/MM/dd');
          this.agencyIncidentsModel.incidentDate = DateFormat.getDate(this.incidentDate);
          this.agencyIncidentsModel.incidentTime = DateFormat.getDate(this.oiiinlogFactory.vagyincModelTemp.incidentTime);
        }
         this.gridOptions = <GridOptions>{
            editType: '',
            enableSorting: true,
            enableFilter: true,
            pagination: true,
            floatingFilter: false,
            paginationPageSize: 5,
            animateRows: true,
        };
        this.caseLoadId = this.sessionManager.currentCaseLoad;
        const serviceObj1 = this.oidincdeFactory.rgAgyLocIdsRecordGroup(this.caseLoadId,this.sessionManager.currentCaseLoadType);
        serviceObj1.subscribe(list1 => {
            this.rgagylocidsRg = [];

            if (list1.length === 0) {
                return;
            } else {
                for (let i = 0; i < list1.length; i++) {
                    this.rgagylocidsRg.push({
                        'text': list1[i].description ,
                           'id': list1[i].agyLocId
                    });
                }
            }
        });
            if (this.oiiinlogFactory.vagyincModelTemp) {
                this.incidentDateDisable = true;
                this.incidentTypeDisable = true;
                this.facilityDisable = true;
                this.locationDisable = true;
                this.incidentDetailsDisable = true;
                this.reportedDisable = true;
                this.reportDateDisable = true;
                this.reportTimeDisable = true;
                this.reportTimeDisable = true;
                this.retriveDisable = true;
                this.clearDisable = true;
                this.agencyIncidentDisable = true;
                this.btnprevious = true;
                this.btnnext = true;
                this.incidentTimeRead = true;
            }
            if (!this.oiiinlogFactory.vagyincModelTemp) {
                this.agencyIncidentDisable = true;
                this.retriveDisable = false;
            }
         if (this.oiinamesFactory.oiinamesflag) {
             this.agencyIncidentDisable = false;
             this.agencyIncidentsModel = new AgencyIncidents();
             this.agencyIncidentsModel.agencyIncidentId =  this.oiinamesFactory.agencyIncidentsModeldataTemp;
             this.executeQuery();

            }
         if (this.oiiinlogFactory.vagyincModelTemp) {
            this.offenderexecuteQuery();
         }

        //this.reportedById=3949; Need to set Logged in user id.But it does not have Staff id here of logged in user. 
        this.modalData = {id: this.agencyIncidentsModel.agencyIncidentId, locked: this.agencyIncidentsModel.flag};
    }

    onStaffReportLaunch = (event) => {
        for (let i = 0; i < this.agyincpartiesstaffData.length; i++) {
            if (!this.agyincpartiesstaffData[i].createDateTime) {
                this.type = 'warn';
                this.message = this.translateService.translate('oidincde.pleasesaverecordsbeforecontinuing');
                this.show();
                return;
            }
        }
        if (event.staffId === this.staffobj.staffId || this.enhancStaffReport) {
            event['enhancUser'] = this.enhancStaffReport;
            this.getCountDownTime(event);
        } else {
            this.type = 'warn';
            this.message = this.translateService.translate('oidincde.youdonothaveaccesstostaffreport');
            this.show();
        }
    }

    getCountDownTime(event) {
        // const payLoad = {
        //     reportType: event.staffReportType,
        //     createDatetime: DateFormat.getDate(event.lockReferenceTime)
        // };
        this.oidincdeFactory.getCountDownTime(event).subscribe(data => {
            if (data) {
                    const dialogData = {
                        data: event,
                        maintData : data,
                        incidentDate: this.agencyIncidentsModel.incidentDate
                        
                    };
                    this.dialogService.openLinkDialog('/OIDSTFRP', dialogData, 80).subscribe(result => {
                        //  this.addcorporatValue(resData, index);
                        this.staffModelExecuteQuery();
                    });
            }

        });
    }

    appendReportDialog(){
        this.dialogService.openLinkDialog( '/OIUIRAME', this.agencyIncidentsModel, 60 ).subscribe( result => {
            if ( result!=null && !(result=="Y")  ) {
                this.agencyIncidentsModel.createUserId = this.sessionManager.getId();
                this.currenDateTime = DateFormat.getDate();
                const dateFormated = DateFormat.format(this.currenDateTime);
                const appenTtime = TimeFormat.format(this.currenDateTime);
                this.agencyIncidentsModel.incidentDetails+=" [" + this.agencyIncidentsModel.createUserId + " " + dateFormated + " " + appenTtime + "]" + " " + result;
            }   
        } );
    }    

    canSqeEdit = (data: any, index: number, field: string) => {
        if (!data.modifiedStaffId) {
            return true;
        }
        return false;
    }
    isLaunchDisable = (event) => {
        let link;
        if (event.agencyIncidentId && event.partySeq) {
            return true;
        } else {
            if(this.sessionManager.currentCaseLoadType !== 'COMM'){
                link = '/oiinamesdialog'         
            } else {
                link = '/OCINAMESDIALOG';
            }
            this.dialogService.openLinkDialog(link, event, 80).subscribe(result => {
                const index = this.agyincpartiesoffenderData.indexOf(event);
                    this.grid.setColumnData('offenderIdDisplay', index, result.nbtOffenderIdDisplay);
                    this.grid.setColumnData('lname', index, result.nbtLastName);
                    this.grid.setColumnData('fname', index, result.nbtFirstName);
                    // if(this.sessionManager.currentCaseLoadType === 'COMM'){
                    this.grid.setColumnData('offenderBookId', index, result.offenderBookId);
                    // }
             });
            return false;
        }
    }
    appendQuery() {
        this.type = 'warn';
                this.message = this.translateService.translate('oidincde.appendDetailes');
                this.show();
        }
    clearQuery() {
       
        if(this.agencyIncidentsModel.agencyIncidentId){
            let innerSearchPams = {'agencyIncidentId':this.selectedIncident.agencyIncidentId};
           const result= this.incidentService.agencyTempIncident(innerSearchPams);
           result.subscribe(res=>{
            this.agencyIncidentsModel=res[0];
            const datePipe = new DatePipe('en-US');
            this.agencyIncidentsModel.incidentTime = TimeFormat.parse(datePipe.transform(res[0].incidentTime, 'HH:mm'));
            this.agencyIncidentsModel.reportTime =TimeFormat.parse(datePipe.transform(res[0].reportTime, 'HH:mm'));
            this.reportedById=this.agencyIncidentsModel.reportedStaffId ;
           });
            }
        else if(!this.agencyIncidentsModel.agencyIncidentId){
            var staffobj=this.sessionManager.userSessionDetails().staff;
            this.reportedById=staffobj.staffId;
            this.agencyIncidentsModel = new AgencyIncidents();
            this.agencyIncidentsModel.reportedStaffId = this.reportedById;
            this.agencyIncidentsModel.incidentDate = DateFormat.getDate();
            this.agencyIncidentsModel.reportDate = DateFormat.getDate();
            this.agencyIncidentsModel.incidentTime = TimeFormat.parse( TimeFormat.format( DateFormat.getDate() ) );
            this.agencyIncidentsModel.reportTime = TimeFormat.parse( TimeFormat.format( DateFormat.getDate() ) );
            this.agencyIncidentsModel.incidentType='';
            this.agencyIncidentsModel.agyLocId='';
            this.agencyIncidentsModel.interLocationIdDes='';
            this.agencyIncidentsModel.incidentDetails='';   
            }
        // this.reportedById=this.staffobj.stfaffId;
        // this.reportTimeDisablefalg = true;
        // this.incidentTimeRead = true;
        // this.btnprevious = true;
        // this.btnnext = true;
        // this.associatedDisable = true;
        // this.oiiinlogFactory.checkedfalg = false;
        // this.staffId = undefined;
        // this.staffFalg = false;
        // this.retriveDisable = false;
        // this.reportedDisable = false;
        // this.oiiinlogFactory.vagyincModelTemp = undefined;
        // // this.incidentTime = '';
        // // this.reportTime = '';
        // this.locked = false;
        // this.isclear=true;
        // this.agencyIncidentsModel = new AgencyIncidents();
        // this.agencyIncidentsModel.reportedStaffId = this.reportedById;
        
        // if(this.innerSelectedIncident==null){
        // this.agyincpartiesoffenderData = [];
        // this.agencyincidentchargesData = [];
        // this.agyincpartiesstaffData = [];
        // this.agencyincidentrepairsData = [];
        // }
        
        // this.associateDetailsHidden = false;
        // this.lockedFlag = true;
        // this.agencyIncidentDisable = false;
        // this.incidentDateDisable = true;
        // this.incidentTimeRead = false;
        // this.createdBy = false;
        // this.reportTimeDisable = false;
        // this.facilityDisable = false;
        // this.locationDisable = false;
        // this.incidentTypeDisable = false;
        // this.incidentDetailsDisable = false;
        // this.incidentlocationDisable = false;
        // this.incidentDateDisable = false;
        // this.saveflag = true;
        // this.incidentTimeRead = true;
        // // this.incidentDetailsDisable = true;
        // this.reportTimeDisable = true;
        // this.locationDisable = true;
        // this.chargeflag = false;
        // this.addflag = false;   
        // this.addNewFlag = true;
        // this.selectedbtn=true;
        // this.crtbtn=true;
        // this.agencyIncidentsModel.incidentDate = DateFormat.getDate();
        // this.agencyIncidentsModel.reportDate = DateFormat.getDate();
        // this.agencyIncidentsModel.incidentTime = TimeFormat.parse( TimeFormat.format( DateFormat.getDate() ) );
        // this.agencyIncidentsModel.reportTime = TimeFormat.parse( TimeFormat.format( DateFormat.getDate() ) );
        // this.modalData = {id: this.agencyIncidentsModel.agencyIncidentId, locked: this.agencyIncidentsModel.flag};

    }

    get updateIncident(){
        return this.incidentTemp;
    }

    set updateIncident( v: any ) {
        if ( this.incidentTemp !== v ) {
            if ( v ) {
                this.incidentTemp.reportedStaffId = v.reportedStaffId;
                this.incidentTemp.agencyIncidentId = v.agencyIncidentId;
                this.incidentTemp.incidentDate = v.incidentDate;
                this.incidentTemp.internalLocationId = v.internalLocationId;
                this.incidentTemp.incidentTime = v.incidentTime;
                this.incidentTemp.incidentType = v.incidentType;
                this.incidentTemp.incidentStatus = v.incidentStatus;
                this.incidentTemp.createDateTime = v.createDateTime;
                this.incidentTemp.createUserId = v.createUserId;
                this.incidentTemp.modifyUserId = v.modifyUserId;
                this.incidentTemp.modifyDateTime = v.modifyDateTime;
                this.incidentTemp.lockFlag = v.lockFlag;
                this.incidentTemp.incidentDetails = v.incidentDetails;
                this.incidentTemp.reportDate = v.reportDate;
                this.incidentTemp.reportTime = v.reportTime;
                this.incidentTemp.agyLocId = v.agyLocId;
                this.incidentTemp.levelCode = v.levelCode;
                this.incidentTemp.logNo = v.logNo;
                this.incidentTemp.incidentText = v.incidentText;
                this.incidentTemp.sealFlag = v.sealFlag;
                this.incidentTemp.createStaffName = v.createStaffName;
                this.incidentTemp.interLocationIdDes = v.interLocationIdDes;
            }
        }
    }

    OnclickSatffReport(){
        this.redirectUtil.redirectTostaffReport();
    }
    changeCenterType() {

        if (this.agencyIncidentsModel.agyLocId && (!this.agencyIncidentsModel.flag)) {
            this.locationDisable = false;
        } else {
            this.locationDisable = true;
        }
         this.locationLink = 'oidincde/rgLevelInternalLocationIdsRecordGroup?agyLocId=' + this.agencyIncidentsModel.agyLocId;
         const serviceObj3 = this.oidincdeFactory.
         rgLevelInternalLocationIdsRecordGroup(this.agencyIncidentsModel.agyLocId);
     serviceObj3.subscribe(list3 => {
         this.rglevelinternallocationidsRg = [];
         if (list3.length === 0) {
             return;
         } else {
             for (let i = 0; i < list3.length; i++) {
                 this.rglevelinternallocationidsRg.push({
                     'text': list3[i].internalLocationCode,

                     'id': list3[i].internalLocationId
                 });
             }
         }
     });
    }
    keyPressincident() {
        try {
            if (!this.incidentTimeRead) {
                this.agencyIncidentsModel.incidentTime = DateFormat.getDate();
            }
        } catch (ex) {
        }
        if(this.notimeupdate){
            this.type = 'warn';
            this.message = this.translateService.translate('oidincde.timeupateProtected');
            this.show();
            return false;
        }
    }
    changeReportTypestaff() {
          if ( this.staffFalg = true )  {
         const serviceObjectStaff = this.oidincdeFactory.agencystaffModelExecuteQuery(this.sessionManager.getId());
         serviceObjectStaff.subscribe(satfflist => {
             for ( let i = 0; i < satfflist.length; i++ ) {
             this.staffId = satfflist[i].staffId;
                  this.createName = satfflist[i].lastName + ',' + satfflist[i].firstName;
                 }
        });
              }
         if (this.oiiinlogFactory.vagyincModelTemp === undefined && this.oiiinlogFactory.vagyincModelTemp == null) {
             const serviceObj8 = this.oidincdeFactory.
                 rgReportedStaffIdsRecordGroup(this.caseLoadId);
             serviceObj8.subscribe(list8 => {
                 this.rgreportedstaffidsRg = [];
                 this.rgreportedstaffidsRgTemp = [];
                 if (list8.length === 0) {
                     return;
                 } else {
                     for (let i = 0; i < list8.length; i++) {
                         this.rgreportedstaffidsRgTemp.push({
                             'id1': list8[i].staffId,
                             'text1': list8[i].staffName,
                             'userId':list8[i].userId

                        });
                         this.rgreportedstaffidsRg.push({
                             'id': list8[i].code,
                             'text': list8[i].description
                         });
                         if ( this.staffFalg = true) {
                           if ( this.staffId === this.rgreportedstaffidsRg[i].id) {
                                 this.agencyIncidentsModel.reportedStaffId = this.rgreportedstaffidsRg[i].id;
                             }
                          }
                     }
                     const serviceObjectStaff = this.oidincdeFactory.agencystaffModelExecuteQuery(this.sessionManager.getId());
                     serviceObjectStaff.subscribe(satfflist => {
                         for (let j = 0; j < satfflist.length; j++) {
                             this.staffId = satfflist[j].staffId;
                             this.createName = satfflist[j].lastName + ',' + satfflist[j].firstName;
                                 if (this.oiiinlogFactory.vagyincModelTemp) {
                                     this.agencyIncidentsModel.createStaffName = this.createName;
                             }
                         }
                         if (!this.oiiinlogFactory.checkedfalg &&  !this.oiinamesFactory.oiinamesflag) {
                             for (let k = 0; k < this.rgreportedstaffidsRg.length; k++) {
                                 if (this.staffId == this.rgreportedstaffidsRg[k].id) {
                                     this.agencyIncidentsModel.reportedStaffId = this.rgreportedstaffidsRg[k].id;
                                 }
                             }
                         }
                     });
                 }
             });
        }
          if (this.oiiinlogFactory.vagyincModelTemp ) {
              const serviceObj8 = this.oidincdeFactory.
                  rgReportedStaffIdsRecordGroup(this.caseLoadId);
              serviceObj8.subscribe(list8 => {
                  this.rgreportedstaffidsRg = [];
                  if (list8.length === 0) {
                      return;
                  } else {
                      for (let i = 0; i < list8.length; i++) {
                          if (this.oiiinlogFactory.vagyincModelTemp.reportedStaffId === list8[i].staffId) {
                              this.agencyIncidentsModel.reportedStaffId = list8[i].staffId;
                              this.innerSelectedIncident=this.oiiinlogFactory.vagyincModelTemp;
                              this.innerSelectedIncident['createStaffName']=this.oiiinlogFactory.vagyincModelTemp.staffName;
                              this.innerSelectedIncident.reportStaffIdAsCode=this.oiiinlogFactory.vagyincModelTemp.staffName;
                              this.innerSelectedIncident.incidentTypeDescription=this.oiiinlogFactory.vagyincModelTemp.incidentTypeDesc;
                              this.innerSelectedIncident.interLocationIdDes=this.oiiinlogFactory.vagyincModelTemp.code;
                              this.showEditBtn=true;
                              this.offenderexecuteQuery();
                          }
                          this.rgreportedstaffidsRg.push({
                              'id': list8[i].staffId,
                              'text': list8[i].staffName
                          });
                      }
                  }
              });
        }
 }
     keyPressincidentDate() {
        try {
            const datePipe = new DatePipe('en-US');
            this.agencyIncidentsModel.incidentTime = this.time;
            const st = datePipe.transform(DateFormat.getDate(), 'yyyy/MM/dd');
            const newDat = Date.parse(st);
            this.agencyIncidentsModel.incidentDate = DateFormat.getDate(st);
        } catch (ex) {
        }
    }
    keyPress() {
        try {
            const datePipe = new DatePipe('en-US');
            this.time = DateFormat.getDate();
            const st1 = datePipe.transform(this.time, 'HH:mm');
            this.reportTime = st1;
            this.agencyIncidentsModel.reportTime = this.time;
        } catch (ex) {
        }
    }
    addNewRecord() {
        this.facilityDisable = false;
        this.btnprevious = true;
        this.btnnext = true;
        if (this.agencyIncidentsModel) {
        if (!this.agencyIncidentsModel.incidentTime ) {
            this.type = 'warn';
            this.message = this.translateService.translate('oidshlog.enterorremoved');
            this.show();
            return false;
        }
        if (!this.agencyIncidentsModel.incidentDate) {
            this.type = 'warn';
                this.message = this.translateService.translate( 'oidincde.incidentdatemustbeentered' );
            this.show();
            return false;
        }
        if (!this.agencyIncidentsModel.incidentTime) {
            this.type = 'warn';
                this.message = this.translateService.translate( 'oidincde.timemustbeentered' );
            this.show();
            return false;
        }
        if (!this.agencyIncidentsModel.incidentType) {
            this.type = 'warn';
                this.message = this.translateService.translate( 'oidincde.incidenttypemustbeentered' );
            this.show();
            return false;
        }
        if (!this.agencyIncidentsModel.agyLocId) {
            this.type = 'warn';
                this.message = this.translateService.translate( 'oidincde.facilitymustbeentered' );
            this.show();
            return false;
        }
        if (!this.agencyIncidentsModel.interLocationIdDes) {
            this.type = 'warn';
                this.message = this.translateService.translate( 'oidincde.locationmustbeentered' );
            this.show();
            return false;
        }
        if (!this.agencyIncidentsModel.incidentDetails) {
            this.type = 'warn';
                this.message = this.translateService.translate( 'oidincde.incidentdetailmustbeentered' );
            this.show();
            return false;
        }
        if (!this.agencyIncidentsModel.reportedStaffId) {
            this.type = 'warn';
                this.message = this.translateService.translate( 'oidincde.reportedbymustbeentered' );
            this.show();
            return false;
        }
    }
        if (this.agencyIncidentsModel.flag) {
            this.agencyIncidentsModel.lockFlag = 'Y';
        } else {
            this.agencyIncidentsModel.lockFlag = 'N';
        }
        if (this.agencyIncidentsModel.incidentDate && this.agencyIncidentsModel.incidentTime) {
            this.agencyIncidentsModel.incidentTime = DateFormat.getDate(this.agencyIncidentsModel.incidentTime);
            const incidentTimeValue = this.agencyIncidentsModel.incidentTime.getHours() + ':' +
             this.agencyIncidentsModel.incidentTime.getMinutes();
            this.agencyIncidentsModel.incidentTime = TimeFormat.parse(incidentTimeValue, this.agencyIncidentsModel.incidentDate);
    }
        this.agencyIncidentsModel.createDateTime = DateFormat.getDate();
        this.agencyIncidentsModel.createUserId = this.sessionManager.getId();
        this.agencyIncidentsModel.modifyDateTime = DateFormat.getDate();
        this.agencyIncidentsModel.incidentStatus = 'ACTIVE';
        if (this.agencyIncidentsModel.interLocationIdDes) {
        for (let i = 0; i < this.rglevelinternallocationidsRg.length; i++) {
            if (this.rglevelinternallocationidsRg[i].text === this.agencyIncidentsModel.interLocationIdDes) {
                this.agencyIncidentsModel.internalLocationId = this.rglevelinternallocationidsRg[i].id;
            }
        }
    }
    if (this.agencyIncidentsModel.agencyIncidentId) {
        this.lstOfAgyShift = [];
        }
        if (!this.agencyIncidentsModel.agencyIncidentId) {
        this.lstOfAgyShift.push(this.agencyIncidentsModel);
        }
        this.agencyIncidentsModel = new AgencyIncidents();

        this.agencyIncidentsModel.incidentDate = DateFormat.getDate();
        this.keyPressincident();
        this.agencyIncidentsModel.incidentTime = DateFormat.getDate(this.agencyIncidentsModel.incidentTime);
        this.agencyIncidentsModel.reportDate = DateFormat.getDate();
        this.agencyIncidentsModel.reportTime = DateFormat.getDate(this.agencyIncidentsModel.reportTime);
        const serviceObj = this.oidincdeFactory.rgReportedStaffIdsRecordGroup(this.caseLoadId);
        serviceObj.subscribe(data => {
            for (let i = 0; i < data.length; i++) {
                if (data[i].staffId === 1) {
                    this.agencyIncidentsModel.reportedStaffId = data[i].staffId;
                }
            }
        });
    }
    
    navi() { 
        this.dialogService.openLinkDialog( '/ocuincwp', 50,40 ).subscribe( result => {
            if ( result!=null && result==="Y" ) {
                this.dialog.close(true);
                }
        } ); 
    }
    executeQuery() {

        if (this.agencyIncidentDisable) {
            this.agencyIncidentsModel.agencyIncidentId = undefined;
             this.clearQuery();
        }
        this.readonlyReqiured = true;
      const datePipe = new DatePipe('en-US');
          if (!this.agencyIncidentDisable) {
      if ( this.agencyIncidentsModel.reportTime && this.agencyIncidentsModel.reportDate ) {
          this.reportTime = datePipe.transform( this.agencyIncidentsModel.reportTime, 'HH:mm' );
          const String = new DatePipe( 'en-US' ).transform( this.agencyIncidentsModel.reportDate, 'yyyy/MM/dd' );
          const timeStringTime = this.reportTime;
          const datereporttime = DateFormat.getDate( String + ' ' + timeStringTime );
          this.agencyIncidentsModel.reportTime = datereporttime;
          this.agencyIncidentsModel.reportDate = DateFormat.getDate( this.agencyIncidentsModel.reportDate );
      }
      if ( this.agencyIncidentsModel.incidentTime && this.agencyIncidentsModel.incidentDate ) {
          this.incidentTime = datePipe.transform( this.agencyIncidentsModel.incidentTime, 'HH:mm' );
          const dateString = new DatePipe( 'en-US' ).transform( this.agencyIncidentsModel.incidentDate, 'yyyy/MM/dd' );
          const timeString = this.incidentTime;
          const datetime = DateFormat.getDate( dateString + ' ' + timeString );
          this.agencyIncidentsModel.incidentTime = datetime;
          this.agencyIncidentsModel.incidentDate = DateFormat.getDate( this.agencyIncidentsModel.incidentDate );
      }
              }
        this.retriveflag = false;
        this.btnprevious = false;
        this.btnnext = false;
          if (!this.agencyIncidentDisable) {
        if ((this.agencyIncidentsModel.agencyIncidentId != null && this.agencyIncidentsModel.agencyIncidentId !== undefined) ||
            (this.agencyIncidentsModel.incidentDate != null && this.agencyIncidentsModel.incidentDate !== undefined) ||
            (this.agencyIncidentsModel.incidentTime != null && this.agencyIncidentsModel.incidentTime !== undefined) ||
            (this.agencyIncidentsModel.incidentType != null && this.agencyIncidentsModel.incidentType !== undefined) ||
            (this.agencyIncidentsModel.agyLocId != null && this.agencyIncidentsModel.agyLocId !== undefined) ||
            (this.agencyIncidentsModel.internalLocationId != null && this.agencyIncidentsModel.internalLocationId !== undefined) ||
            (this.agencyIncidentsModel.incidentDetails != null && this.agencyIncidentsModel.incidentDetails !== undefined) ||
            (this.agencyIncidentsModel.reportedStaffId != null && this.agencyIncidentsModel.reportedStaffId !== undefined) ||
            (this.agencyIncidentsModel.reportDate != null && this.agencyIncidentsModel.reportDate !== undefined) ||
            (this.reportTime != null && this.reportTime !== undefined) ||
            (this.agencyIncidentsModel.createStaffName != null && this.agencyIncidentsModel.createStaffName !== undefined)) {
            this.agencyIncidentDisable = false;
            this.incidentDateDisable = false;
            this.incidentTimeRead = false;
            this.incidentTypeDisable = false;
            this.facilityDisable = false;
            this.locationDisable = false;
            this.reportedDisable = false;
            this.incidentTypeDisable = false;
            this.incidentDetailsDisable = false;
            if (this.agencyIncidentsModel.interLocationIdDes) {
             for (let i = 0; i < this.rglevelinternallocationidsRg.length; i++) {
            if (this.rglevelinternallocationidsRg[i].text == this.agencyIncidentsModel.interLocationIdDes) {
                this.agencyIncidentsModel.internalLocationId = this.rglevelinternallocationidsRg[i].id;
            }
           }
                }
            if (this.agencyIncidentsTemp.agencyIncidentId) {
                this.agencyIncidentsModel = new AgencyIncidents();
            }
            this.agencyIncidentsModel.agyLocId = this.sessionManager.currentCaseLoad;
            const serviceObj = this.oidincdeFactory.
                agencyIncidentsExecuteQuery(this.agencyIncidentsModel);
            serviceObj.subscribe(data => {
                if (data.length === 0) {
                this.count = 1;
                this.btnprevious = true;
                this.btnnext = true;
                this.type = 'warn';
                this.message = this.translateService.translate('oidincde.querycaused');
                this.show();
                return;
                } else {
                    this.addNewFlag = false;
                    this.saveflag = true;
                    this.btnprevious = false;
                    this.btnnext = false;
                    this.addflag = true;
                    this.retriveDisable = true;
                    this.listOfAgencies = data;
                    this.agencyincidentsData = [];
                    this.lstOfAgyShift = [];
                    this.agencyincidentsData = data;
                    for (let i = 0; i < this.agencyincidentsData.length; i++) {
                        this.agencyincidentsData[i].createStaffName = this.createName;
                    }
                    this.agencyincidentsData = data;
                    this.agencyIncidentsModel = this.agencyincidentsData[0];
                    if (this.agencyIncidentsModel.agencyIncidentId) {
                        this.saveflag = true;
                        this.lockedFlag = false;
                    }
                    this.oiinamesFactory.agencyIncidentsModeldataTemp =  this.agencyIncidentsModel.agencyIncidentId;
                    this.agencyIncidentsModelTemp = this.agencyIncidentsModel[0];
                    this.agencyIncidentsModel = this.listOfAgencies[0];
                    if (this.agencyIncidentsTemp.agencyIncidentId) {
                        for (let i = 0; i < this.listOfAgencies.length; i++) {
                            if (this.listOfAgencies[i].agencyIncidentId === this.agencyIncidentsTemp.agencyIncidentId) {
                                this.agencyIncidentsModel = this.listOfAgencies[i];
                            }
                        }
                        this.agencyIncidentsTemp = new AgencyIncidents();
                    }
                    this.agencyIncidentsModelTemp = this.listOfAgencies[0];
                    const datePipe = new DatePipe('en-US');
                    this.offenderexecuteQuery();
                    if (this.agencyIncidentsModel.flag) {
                        this.associatedDisable = false;
                        this.locked = true;
                        this.saveflag = true;
                        this.agencyIncidentDisable = true;
                        this.incidentDateDisable = true;
                        this.incidentTimeRead = true;
                        this.incidentTypeDisable = true;
                        this.facilityDisable = true;
                        this.locationDisable = true;
                        this.reportedDisable = true;
                        this.incidentTypeDisable = true;
                        this.incidentDetailsDisable = true;
                        this.incidentDateDisable = true;
                        this.associateDetailsHidden = true;
                        this.reportTimeDisable  = true;
                        this.reportDateDisable = true;
                        this.reportTimeDisable = true;
                        this.createdBy = true;
                        this.lockedFlag = true;
                        this.associatedDisable = false;
                        this.chargeflag = false;
                    } else {
                        this.locked = false;
                        this.reportTimeDisable = true;
                        this.reportTimeDisable = true;
                        this.agencyIncidentDisable = true;
                        this.incidentDateDisable = true;
                        this.incidentTimeRead = true;
                        this.facilityDisable = true;
                        this.reportedDisable = true;
                        this.associatedDisable = false;
                        this.chargeflag = true;
                    }
                    this.modalData = {id: this.agencyIncidentsModel.agencyIncidentId, locked: this.agencyIncidentsModel.flag};
                    this.agencyIncidentsModel.incidentDate = DateFormat.getDate(this.agencyIncidentsModel.incidentDate);
                    this.agencyIncidentsModel.reportDate = DateFormat.getDate(this.agencyIncidentsModel.reportDate);
                    this.agencyIncidentsModel.incidentTime = DateFormat.getDate(this.agencyIncidentsModel.incidentTime);
                    this.agencyIncidentsModel.reportTime = DateFormat.getDate(this.agencyIncidentsModel.reportTime);
                    if (this.agencyIncidentsModel.agyLocId) {
                        this.locationDisable = false;
                    } else {
                        this.locationDisable = true;
                    }
                }
            });
          }
        } else {
            const serviceObj = this.oidincdeFactory.agencyIncidentsExecuteQuery(this.agencyIncidentsModel);
            serviceObj.subscribe(data => {
                if (data.length === 0) {
                this.count = 1;
                this.type = 'warn';
                this.message = this.translateService.translate('oidincde.querycaused');
                this.show();
                return;
                } else {
                    this.addflag = true;
                    this.agencyincidentsData = [];
                    this.agencyincidentsData = data;
                    this.agencyIncidentsModel = this.agencyincidentsData[0];
                    for ( let i = 0; i < this.agencyincidentsData.length; i++ ) {
                        this.agencyIncidentsModel.incidentDate = DateFormat.getDate(this.agencyincidentsData[i].incidentDate);
                        this.agencyIncidentsModel.reportDate = DateFormat.getDate(this.agencyincidentsData[i].reportDate);
                        this.agencyIncidentsModel.incidentTime = DateFormat.getDate(this.agencyincidentsData[i].incidentTime);
                        this.agencyIncidentsModel.reportTime = DateFormat.getDate(this.agencyincidentsData[i].reportTime);

                      if (this.agencyIncidentsModel.flag) {
                          this.associatedDisable = false;
                          this.locked = true;
                          this.saveflag = true;
                          this.agencyIncidentDisable = true;
                          this.incidentDateDisable = true;
                          this.incidentTimeRead = true;
                          this.incidentTypeDisable = true;
                          this.facilityDisable = true;
                          this.locationDisable = true;
                          this.reportedDisable = true;
                          this.incidentTypeDisable = true;
                          this.incidentDetailsDisable = true;
                          this.incidentDateDisable = true;
                          this.associateDetailsHidden = true;
                          this.reportTimeDisable = true;
                          this.reportTimeDisable  = true;
                          this.reportDateDisable = true;
                          this.createdBy = true;
                          this.lockedFlag = true;
                          this.associatedDisable = false;
                          this.chargeflag = false;
                    } else {
                        this.locked = false;
                        this.reportTimeDisable = true;
                        this.reportTimeDisable = true;
                        this.lockedFlag = false;
                        this.agencyIncidentDisable = true;
                        this.incidentDateDisable = true;
                        this.incidentTimeRead = true;
                        this.facilityDisable = true;
                        this.reportedDisable = true;
                        this.associatedDisable = false;
                        this.chargeflag = true;
                    }
                  }
                    this.offenderexecuteQuery();
                }
                this.modalData = {id: this.agencyIncidentsModel.agencyIncidentId, locked: this.agencyIncidentsModel.flag};
            });
        }
    }
    saveagencyincidentsForm() {
        this.agencyincidentsCommitModel.insertList = [];
        this.agencyincidentsCommitModel.updateList = [];
        this.agencyincidentsInsertList = [];
        this.agencyincidentsUpdatetList = [];
        if(this.rglevelinternallocationidsRg !=null){
        for (let i = 0; i < this.rglevelinternallocationidsRg.length; i++) {
            if (this.rglevelinternallocationidsRg[i].text === this.agencyIncidentsModel.interLocationIdDes) {
                this.agencyIncidentsModel.internalLocationId = this.rglevelinternallocationidsRg[i].id;
            }
        }
    }

        //this.agencyIncidentsModel.createStaffName = this.createName;
        this.time = DateFormat.getDate();
        this.time.setHours(0);
        this.time.setMinutes(0);
        this.time.setSeconds(0);
        if ((this.agencyIncidentsModel.incidentDate !== null && this.agencyIncidentsModel.incidentDate !== undefined) &&
            (this.agencyIncidentsModel.agencyIncidentId === null || this.agencyIncidentsModel.agencyIncidentId === undefined)) {

            if (DateFormat.compareDate(this.agencyIncidentsModel.incidentDate, DateFormat.getDate()) === 1) {
                this.type = 'warn';
                     this.message = this.translateService.translate('oidincde.incidentdatecurrent');
                     this.show();
                     return;
            }
            if(DateFormat.compareDate(this.agencyIncidentsModel.incidentDate, this.agencyIncidentsModel.reportDate) === 0){
                const formTime = DateFormat.getDate(DateFormat.getDate(this.agencyIncidentsModel.incidentTime).setSeconds(0, 0));
                const toTime = DateFormat.getDate(DateFormat.getDate().setSeconds(0, 0));
                if (DateFormat.compareDateTime( formTime, toTime) === 1) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('oidincde.incidentdatecurrent');
                    this.show();
                    return;
            }
       }
        }
        if (!this.agencyIncidentsModel.incidentDate) {
            this.type = 'warn';
            this.message = this.translateService.translate('oidincde.incidentdatemsg');
            this.show();
            return;
        }
        if (!this.agencyIncidentsModel.incidentTime) {
            this.type = 'warn';
            this.message = this.translateService.translate('oidincde.incidenttime');
            this.show();
            return;
        }
        if (!this.agencyIncidentsModel.incidentType) {
            this.type = 'warn';
            this.message = this.translateService.translate( 'oidincde.incidenttypemustbeentered' );
            this.show();
            return;
        }
        if (!this.agencyIncidentsModel.agyLocId && this.sessionManager.currentCaseLoadType !== 'COMM') {
            this.type = 'warn';
            this.message = this.translateService.translate( 'oidincde.facilitymustbeentered' );
            this.show();
            return;
        }

        if (!this.agencyIncidentsModel.agyLocId && this.sessionManager.currentCaseLoadType === 'COMM') {
            this.type = 'warn';
            this.message = this.translateService.translate( 'oidincde.communityoffincemustbeentered' );
            this.show();
            return;
        }

        if (!this.agencyIncidentsModel.interLocationIdDes && this.sessionManager.currentCaseLoadType !== 'COMM') {
            this.type = 'warn';
            this.message = this.translateService.translate('oidincde.locationfield');
            this.show();
            return;
        }

        if (this.agencyIncidentsModel.incidentDetails === undefined || this.agencyIncidentsModel.incidentDetails == null
            || this.agencyIncidentsModel.incidentDetails.trim().length === 0 ) {
            this.type = 'warn';
            this.message = this.translateService.translate('oidincde.incidentdetailsrequired');
            this.show();
            return;
        }
        if (!this.agencyIncidentsModel.reportedStaffId) {
            this.type = 'warn';
            this.message = this.translateService.translate( 'oidincde.reportedbymustbeentered' );
            this.show();
            return;
        }
        this.incidentDetailsTemp = this.agencyIncidentsModel.incidentDetails;
        if (this.agencyIncidentsModel.incidentDetails === undefined || this.agencyIncidentsModel.incidentDetails === null ) {
            this.type = 'warn';
            this.message = this.translateService.translate('oidincde.cannotfindupdatedoccurrenceid') + '' + this.incidentDetailsTemp;
            this.show();
            return;
        }
        this.agencyIncidentsModel.incidentTime.setSeconds( 0, 0 );
            this.agencyIncidentsModel.incidentTime = DateFormat.getDate(this.agencyIncidentsModel.incidentTime);
        this.agencyIncidentsModel.reportTime.setSeconds( 0, 0 );
            this.agencyIncidentsModel.reportTime = DateFormat.getDate(this.agencyIncidentsModel.reportTime);
            this.agencyIncidentsModel.incidentTime.setMilliseconds(0);
            this.agencyIncidentsModel.incidentTime = DateFormat.getDate(this.agencyIncidentsModel.incidentTime);
            this.agencyIncidentsModel.reportTime.setMilliseconds(0);
            this.agencyIncidentsModel.incidentTime = DateFormat.getDate(this.agencyIncidentsModel.incidentTime);

         if (this.agencyIncidentsModel.agencyIncidentId) {
        //      if (DateFormat.compareTime(this.agencyIncidentsModel.reportTime , this.agencyIncidentsModel.incidentTime) === 1) {
        //          this.type = 'warn';
        //          this.message = this.translateService.translate('oidincde.incidentTimeReportValidation');
        //          this.show();
        //          return;
        // }
        //     if ( DateFormat.compareDate( this.agencyIncidentsModel.reportDate, this.agencyIncidentsModel.incidentDate ) === 1 ) {

        //          this.type = 'warn';
        //          this.message = this.translateService.translate('oidincde.incidentTimeReportValidation');
        //          this.show();
        //          return;
        // }
        }
         if (this.agencyIncidentsModel.reportTime == null && !this.agencyIncidentsModel.reportDate) {
             this.type = 'warn';
             this.message = this.translateService.translate('oidincde.incidentTimeReportValidation');
             this.show();
             return;
         } else if (!this.agencyIncidentsModel.reportTime && this.agencyIncidentsModel.reportDate == null) {
             this.type = 'warn';
             this.message = this.translateService.translate('oidincde.incidentTimeReportValidation');
             this.show();
             return;
         }
        if (this.agencyIncidentsModel.flag) {
            this.agencyIncidentsModel.lockFlag = 'Y';
            this.agencyIncidentDisable = true;
            this.incidentDateDisable = true;
            this.incidentTimeRead = true;
            this.createdBy = true;
            this.reportTimeDisable = true;
            this.facilityDisable = true;
            this.locationDisable = true;
            this.reportedDisable = true;
            this.incidentTypeDisable = true;
            this.incidentDetailsDisable = true;
            this.incidentlocationDisable = true;
            this.incidentDateDisable = true;
        } else {
            this.agencyIncidentsModel.lockFlag = 'N';
            this.lockedFlag = false;
        }
        this.incidentTimeRead = true;
        if(!this.agencyIncidentsModel.agencyIncidentId){
            this.agencyIncidentsModel.createDateTime = DateFormat.getDate();
            this.agencyIncidentsModel.createUserId = this.sessionManager.getId();
        }else{
            this.agencyIncidentsModel.modifyDateTime = DateFormat.getDate();
            this.agencyIncidentsModel.modifyUserId= this.sessionManager.getId();
        }
       
        
        
        this.agencyIncidentsModel.incidentStatus = 'ACTIVE';
        if (this.agencyIncidentsModel.agencyIncidentId == null || this.agencyIncidentsModel.agencyIncidentId === undefined) {
            this.agencyIncidentsModel.agencyIncidentId = null;
        }
           const datePipe = new DatePipe('en-US');
          this.incidentTime = datePipe.transform( this.agencyIncidentsModel.incidentTime, 'HH:mm' );
          const dateString = new DatePipe( 'en-US' ).transform( this.agencyIncidentsModel.incidentDate, 'yyyy/MM/dd' );
          const timeString = this.incidentTime;
          const datetime = DateFormat.getDate( dateString + ' ' + timeString );
          this.agencyIncidentsModel.incidentTime = datetime;
          this.agencyIncidentsModel.incidentDate = DateFormat.getDate( this.agencyIncidentsModel.incidentDate );

          this.lstOfAgyShift.push(this.agencyIncidentsModel);
          this.agencyincidentsCommitModel.insertList = this.agencyincidentsInsertList;
          this.agencyincidentsCommitModel.updateList = this.agencyincidentsUpdatetList;
          if (this.lstOfAgyShift) {
              for (let i = 0; i < this.lstOfAgyShift.length; i++) {
                if (!this.lstOfAgyShift[i].agencyIncidentId) {
                    this.agencyincidentsCommitModel.insertList = this.lstOfAgyShift;
                } else {
                    this.agencyincidentsCommitModel.updateList = this.lstOfAgyShift;
                }
              }
          }
         const agencyincidentsSaveData = this.oidincdeFactory.agencyIncidentsCommit(this.agencyincidentsCommitModel);
        agencyincidentsSaveData.subscribe(agencyincidentsSaveResult => {
            if ( agencyincidentsSaveResult[0] === 0 ) {
                this.showDocIcon = false;
                this.type = 'info';
                this.message = this.translateService.translate('common.addupdateremoverecordfailed');
                this.show();
                return;
            } else if ( agencyincidentsSaveResult === 2 ) {
                this.showDocIcon = false;
                this.type = 'warn';
                this.message = this.translateService.translate('oidincde.recordnot');
                this.show();
                return;
                } else {
                this.lstOfAgyShift = [];
                this.agencyIncidentsModel.agencyIncidentId = agencyincidentsSaveResult;
                this.addflag = true;
                this.agencyIncidents.agencyIncidentId = this.agencyIncidentsModel.agencyIncidentId;
                this.incidentTimeRead = true;
                this.reportTimeDisablefalg = true;
                this.associatedDisable = false;
                this.agencyIncidentDisable = true;
                this.incidentDateDisable = true;
                this.incidentTimeRead = true;
                this.facilityDisable = true;
                this.reportedDisable = true;
                this.reportTimeDisable = true;
                this.reportTimeDisable = true;
                this.lockedFlag=false;
                this.type = 'success';
                this.showDocIcon = true;
                this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
                this.hidePane = true;
                this.editingIncident = false;
                this.show();
                if (this.agencyIncidents.agencyIncidentId) {
                    this.incidentService.agencyIncidentsExecuteQuery( this.agencyIncidents );
                    this.incidentService.setAgencyIncidentId(this.agencyIncidents.agencyIncidentId);
                    this.oiiinlogFactory.vagyincModelTemp=null;

                }

            }

        });



    }

    show() {
        this.msglist = [];
        this.msglist.push({ message: this.message, type: this.type });
        this.msgs = [...this.msglist];
    }

    populateChargeDetails() {
        this.agencyincidentchargesData = [];
        this.agyincpartiesoffenderModel = new AgencyIncidentParties();
        if (this.selectedOffenderInvData && this.selectedOffenderInvData.agencyIncidentId && this.selectedOffenderInvData.partySeq) {
        this.agyincpartiesoffenderModel.agencyIncidentId = this.selectedOffenderInvData.agencyIncidentId;
        this.agyincpartiesoffenderModel.partySeq = this.selectedOffenderInvData.partySeq;
        const serviceObj = this.oidincdeFactory.
            agencyincidentchargesExecuteQuery(this.agyincpartiesoffenderModel);
        serviceObj.subscribe(data => {
            if (data === undefined || data.length === 0) {
                this.agencyincidentchargesData = [];
            } else {
                this.agencyincidentchargesData = data;
                for (let i = 0; i < this.agencyincidentchargesData.length ; i++ ){
                     this.agencyincidentchargesData[i].button = '';
                }
            }
        });
            }
    }

      offenderexecuteQuery() {
        if(this.selectedIncident && this.selectedIncident.agencyIncidentId==null)
        {
        this.selectedbtn=false;
        this.crtbtn=false;
        this.showEditBtn=false;
        }
        this.offenderInvDataModel = new AgencyIncidentParties();
        if (this.oiiinlogFactory.vagyincModelTemp  && this.oiiinlogFactory.vagyincModelTemp.agencyIncidentId) {
            this.offenderInvDataModel.agencyIncidentId = this.oiiinlogFactory.vagyincModelTemp.agencyIncidentId;
            this.updateIncident=this.oiiinlogFactory.vagyincModelTemp;
        }
        this.offenderInvDataModel.agencyIncidentId = this.agencyIncidentsModel.agencyIncidentId;
        const serviceObj = this.oidincdeFactory.
            agyincpartiesoffenderExecuteQuery(this.offenderInvDataModel);
        serviceObj.subscribe(data => {
            if (data.length === 0) {
                this.agyincpartiesoffenderData = [];
                this.agencyincidentchargesData = [];
                this.chargeflag = false;
              this.agyincpartiesoffenderData = data;
                 if (this.oiinamesFactory.offsearch) {
                     this.agyincpartiesoffenderData.push(this.oiinamesFactory.offsearch);
                     this.oiinamesFactory.offsearch = undefined;
                    }
                return;
            } else {
                this.agyincpartiesoffenderData = data;
                if (this.agencyIncidentsModel.flag) {
                    this.chargeflag = false;
                } else {
                this.chargeflag = true;
                }
                this.oidincdeIndex = this.agyincpartiesoffenderData.length;
                if (this.oiinamesFactory.offsearch) {
                    this.agyincpartiesoffenderData.push(this.oiinamesFactory.offsearch);
                    this.oiinamesFactory.offsearch = undefined;
                }
                for (let i = 0; i < this.agyincpartiesoffenderData.length; i++) {
                    this.agyincpartiesoffenderData[i].button = '';
                    if(this.reportableIncedentFlag){
                        this.agyincpartiesoffenderData[i]['reportIncidentBut']= '';
                    }
                    this.agyincpartiesoffenderData[i]['navOffWeapons'] ='/OCUINCWP';
                    this.agyincpartiesoffenderData[i]['buttonWeap'] =this.translateService.translate('oidincde.offweapons');
                }
                this.selectedOffenderInvData = this.agyincpartiesoffenderData[0];
                this.offenderInvData.push(this.selectedOffenderInvData);
                this.agyincpartiesoffenderModel = this.agyincpartiesoffenderData[0];
                if (this.oidincdeFactory.tableIndex || this.oidincdeFactory.tableIndex === 0) {
                    this.tableIndex = this.oidincdeFactory.tableIndex;
                    this.oidincdeFactory.tableIndex = undefined;
                } else {
                    this.tableIndex = 0;
                }

            }
        });
          this.staffModelExecuteQuery();
           this.repairpopulateDetails();
           this.significantincidentpopulateDetails();
           this.getIncidentFollowUpDetails();
    }

 onGridInsertOff = () => {
    this.btnprevious = true;
    this.btnnext = true;
    this.agencyincidentchargesData = [];
     this.oiinamesFactory.oiiflag = true;
     if (this.agyincpartiesoffenderData.length > 0) {
         if (!this.agyincpartiesoffenderData[this.agyincpartiesoffenderData.length - 1].offenderIdDisplay) {
             this.type = 'warn';
             this.message = this.translateService.translate('oidincde.idmust');
             this.show();
             return;
         }

         if (!this.agyincpartiesoffenderData[this.agyincpartiesoffenderData.length - 1].incidentRole) {
             this.type = 'warn';
             this.message = this.translateService.translate('oidincde.rolemust');
             this.show();
             return;
         }
         if (!this.agyincpartiesoffenderData[this.agyincpartiesoffenderData.length - 1].actionCode) {
             this.type = 'warn';
             this.message = this.translateService.translate('oidincde.actioncodemust');
             this.show();
             return;
         }
         
     }
     return {
         button: ''
     };
 }
 


    repairpopulateDetails() {
        this.repairDataModel = new AgencyIncidentRepairs();
        this.repairDataModel.agencyIncidentId = this.agencyIncidentsModel.agencyIncidentId;
        const serviceObj = this.oidincdeFactory.
            agencyincidentrepairsExecuteQuery(this.repairDataModel);

        serviceObj.subscribe(data => {
            if (data.length === 0) {
                this.agencyincidentrepairsData = [];
            } else {
                  this.agencyincidentrepairsData = data;
            }
        });
    }
    staffModelExecuteQuery() {
        this.staffDataModel = new AgencyIncidentParties();
        this.staffDataModel.agencyIncidentId = this.agencyIncidentsModel.agencyIncidentId;
        const agyincpartiesstaffResult = this.oidincdeFactory.agyincpartiesstaffExecuteQuery(this.staffDataModel);
        agyincpartiesstaffResult.subscribe(agyincpartiesstaffResultLists => {
            if (agyincpartiesstaffResultLists.length === 0) {
                this.agyincpartiesstaffData = [];
            } else {
                for (let i = 0; i < agyincpartiesstaffResultLists.length; i++) {
                    
                    //agyincpartiesstaffResultLists[i].button = '';
                    agyincpartiesstaffResultLists[i].navStaffReport ='/OIDSTFRP';
                    agyincpartiesstaffResultLists[i].reportParam=agyincpartiesstaffResultLists[i].agencyIncidentId+"~"+agyincpartiesstaffResultLists[i].code;
                    agyincpartiesstaffResultLists[i].buttontext = this.translateService.translate('oidincde.staffreportinvolvement');
                    if(this.reportableIncedentFlag){
                    agyincpartiesstaffResultLists[i]['reportIncidentBut2']= '';
                    }
                    if(agyincpartiesstaffResultLists[i].forceUsedFlag=="true"){
                        agyincpartiesstaffResultLists[i].forceUsed=true; 
                    }else{
                        agyincpartiesstaffResultLists[i].forceUsed=false; 
                    }
                    if(agyincpartiesstaffResultLists[i].repCompletFlag=="Y"){
                        agyincpartiesstaffResultLists[i].repCompletFlag=true; 
                    }else{
                        agyincpartiesstaffResultLists[i].repCompletFlag=false; 
                    }
                    
                }
                this.agyincpartiesstaffData = agyincpartiesstaffResultLists;
                this.agyincpartiesstaffModel = this.agyincpartiesstaffData[0];
            }
        });
    }


    changeReportType() {
        this.agencyIncidentsModel.reportedStaffId = this.reportedById;
        if (this.retriveflag) {
            if (this.oiiinlogFactory.checkedfalg = false ) {
                if (this.agencyIncidentsModel.reportedStaffId) {
                    const datePipe = new DatePipe('en-US');
                    this.time = DateFormat.getDate();
                    this.agencyIncidentsModel.reportTime =  this.time;
                    this.st = datePipe.transform( this.reportDate, 'yyyy/MM/dd');
                    this.agencyIncidentsModel.reportDate = DateFormat.getDate(this.st);
                }
            }
          }
     }

    onRowClickagyincpartiesoffender(event) {
        this.offbtn=false;
        this.agencyincidentchargesData = [];
        this.offenderInvDataModel = event;
        this.selectedOffenderInvData = event;
        this.incidentService.setoffenderBookId(this.offenderInvDataModel.offenderBookId);
        this.incidentService.setAgencyIncidentId(this.innerSelectedIncident.agencyIncidentId);
        this.oidincdeFactory.incidentDate = this.agencyIncidentsModel.incidentDate;
        this.vHeaderBlockModel = new VHeaderBlock();
        this.vHeaderBlockModel.offenderId= parseInt(this.selectedOffenderInvData.offenderIdDisplay);
        this.vHeaderBlockModel.agyLocId = this.sessionManager.currentCaseLoad;
        if (this.vHeaderBlockModel.offenderId) {
        const offbkGlobal = this.oidincdeFactory.offbkgGlobalQuery(this.vHeaderBlockModel);
        offbkGlobal.subscribe(list => {
            if (list.length > 0) {
                for(let i=0 ;i <list.length;i++){
                    if(list[i].offenderBookId==this.offenderInvDataModel.offenderBookId){
                        // this.offenderSearchService.innerIncidentSelectedOffender=list[i];
                        this.oidincdeFactory.selectedInvolvedOffender=list[i];
                        break;
                    }
                }
                
            } else {
                // this.offenderSearchService.selectedOffender = undefined;
            }
        });
        }
        if (event) {
        this.partySeq = event.partySeq;
        if (event.actionCode === 'RFH') {
            this.chargeflag = true;
        } else {
            this.chargeflag = false;
        }
            }
        if (this.partySeq != null && this.partySeq !== undefined) {
        if (this.partySeq) {
            if ( this.agencyIncidentsModel && this.agencyIncidentsModel.flag) {
            }
            this.populateChargeDetails();
            }
        }
    }
    butDetailKeyNextItemTrigger() {
         if (this.agencyIncidentsModel.flag) {
            this.lockedFlag = true;
            } else {
             this.lockedFlag = false;
             }
        if (this.listOfAgencies.length === 0) {
            this.btnnext = true;
            this.type = 'warning';
            this.message = this.translateService.translate('oidincde.nosetofrecordsnext');
            this.show();
            return;
        }
        if ((this.agencyincidentsIndex) < this.listOfAgencies.length - 1) {
            this.agencyincidentsIndex = this.indexVal + 1;
            this.agencyIncidentsModel = this.listOfAgencies[this.agencyincidentsIndex];
            if (this.agencyIncidentsModel.flag ) {
                this.lockedFlag = true;
                this.saveflag = true;
                this.chargeflag = false;
                } else {
                 this.lockedFlag = false;
                 this.saveflag = true;
                 this.chargeflag = true;
                 }
            const serviceObj3 = this.oidincdeFactory.
                rgLevelInternalLocationIdsRecordGroup(this.agencyIncidentsModel.agyLocId);
            serviceObj3.subscribe(list3 => {
                for (let i = 0; i < list3.length; i++) {
                    if (this.agencyIncidentsModel.interLocationIdDes == list3[i].internalLocationIdCode) {
                        this.agencyIncidentsModel.interLocationIdDes = list3[i].internalLocationIdCode;
                    }
                }
            });
            const serviceObj8 = this.oidincdeFactory.
                rgReportedStaffIdsRecordGroup(this.agencyIncidentsModel.agyLocId);
            serviceObj8.subscribe(list8 => {
                for (let i = 0; i < list8.length; i++) {
                    if (this.agencyIncidentsModel.reportedStaffId === list8[i].staffId) {
                        this.agencyIncidentsModel.reportedStaffId = list8[i].staffId;
                    }
                }
            });
            this.agencyIncidentsModel.incidentDate = DateFormat.getDate(this.agencyIncidentsModel.incidentDate);
            this.agencyIncidentsModel.reportDate = DateFormat.getDate(this.agencyIncidentsModel.reportDate);
            this.agencyIncidentsModel.incidentTime = DateFormat.getDate(this.agencyIncidentsModel.incidentTime);
            this.agencyIncidentsModel.reportTime = DateFormat.getDate(this.agencyIncidentsModel.reportTime);
            this.offenderexecuteQuery();
            this.btnprevious = false;
            this.indexVal = this.indexVal + 1;
        } else {
            this.btnnext = true;
            this.btnprevious = false;
            this.type = 'warning';
            this.message = this.translateService.translate('oidincde.nosetofrecords');
            this.show();
        }
       this.oiinamesFactory.agencyIncidentsModeldataTemp = this.agencyIncidentsModel.agencyIncidentId;
    }

    onRowClickstaffInvolvement(event){
        this.incidentService.setAgencyIncidentId(this.innerSelectedIncident.agencyIncidentId);
        this.incidentService.setStaffId(event.code);
    }
    butDetailKeyPrevItemTrigger() {
        if (this.agencyIncidentsModel.flag) {
            this.lockedFlag = true;
        } else {
             this.lockedFlag = false;
            }
        if (this.listOfAgencies.length === 0) {
            this.btnprevious = true;
            return;
        }
        if (this.oiinamesFactory.oiinamesflag && this.indexTempVal === 1) {
            this.agencyincidentsIndex = this.oidincdeFactory.indexValue;
            this.oiinamesFactory.oiinamesflag = false;
        }
        if (this.agencyincidentsIndex >= 1) {
            this.agencyIncidentsModel.incidentDate = DateFormat.getDate(this.agencyIncidentsModel.incidentDate);
            this.agencyIncidentsModel.reportDate = DateFormat.getDate(this.agencyIncidentsModel.reportDate);
            this.agencyIncidentsModel.incidentTime = DateFormat.getDate(this.agencyIncidentsModel.incidentTime);
            this.agencyIncidentsModel.reportTime = DateFormat.getDate(this.agencyIncidentsModel.reportTime);
            this.agencyincidentsIndex = this.agencyincidentsIndex - 1;
            this.indexVal = this.agencyincidentsIndex;
            this.agencyIncidentsModel = this.listOfAgencies[this.agencyincidentsIndex];
            if (this.agencyIncidentsModel.flag) {
                this.lockedFlag = true;
                this.saveflag = true;
                this.chargeflag = false;
            } else {
                 this.lockedFlag = false;
                 this.saveflag = true;
                 this.chargeflag = true;
                }
             this.btnnext = false;
             this.offenderexecuteQuery();
        } else {
            this.btnprevious = true;
            this.btnnext = false ;
            this.type = 'warning';
            this.message = this.translateService.translate('oidincde.nosetofrecords');
            this.show();
        }
         this.oiinamesFactory.agencyIncidentsModeldataTemp = this.agencyIncidentsModel.agencyIncidentId;
    }
    exit() {
        this.exitflag = false;
         this.oidincdeFactory.falg = false;
        this.oiiinlogFactory.checkedfalg = false;
        this.oiiinlogFactory.selected = this.oidincdeFactory.selected;
        this.clearQuery();
        this.router.navigate(['/OIIINLOG']);
        }
     allowNumbers(event) {
      const ch = event.which;
      if (ch < 48 || ch > 57) {
          event.preventDefault();
      }
  }
    validateTimePattern(event) {
        if ( this.incdTime !== this.incidentTime) {
            this.incdTime = this.incidentTime;
        const ptrn = /[0-9]/g;
        if ( ptrn.test(event.key) || event.key === 'Backspace') {
            if ( String(this.incidentTime).length === 2 ) {
                if ( Number(this.incidentTime.substring(0, 2)) > 12) {
                    this.incidentTime = String(this.incidentTime).slice(0, -1);
                } else {
                this.incidentTime = this.incidentTime + ':';
                    }
            }
            if ( String(this.incidentTime).length === 5 && Number(this.incidentTime.substring(3, 5)) > 59) {
                    this.incidentTime = String(this.incidentTime).slice(0, -1);
            }
            } else {
            this.incidentTime = String(this.incidentTime).slice(0, -1);
            }
            }
    }
    onRowClickRepairs(event) {
        }

    onStaffInsert = () => {   
         if (this.agyincpartiesstaffData.length > 0) {
            if (!this.agyincpartiesstaffData[this.agyincpartiesstaffData.length - 1].staffIdDes) {
                this.type = 'warn';
                this.message = this.translateService.translate('oidincde.staffNamemust');
                this.show();
                return;

            }
            if (!this.agyincpartiesstaffData[this.agyincpartiesstaffData.length - 1].incidentRole) {
                this.type = 'warn';
                this.message = this.translateService.translate('oidincde.incidentRole');
                this.show();
                return;

            }
        }
        const tempStr = 'test';
        return {
            date: DateFormat.getDate(), button: '...', staffIdDes: '', incidentRole: '', commentText: '', navStaffReport: '', buttontext: this.translateService.translate('oidincde.staffreportinvolvement')
        };
    }

        onGridInsert = () => {
        if (this.agencyincidentrepairsData.length > 0) {
            if (!this.agencyincidentrepairsData[this.agencyincidentrepairsData.length - 1].code) {
                this.type = 'warn';
                this.message =  this.translateService.translate('oidincde.repairTypemust');
                this.show();
                return;

            }
        }
        const tempStr = 'test';
        return {
            date: DateFormat.getDate()
        };
    }
    agencyRepairscommit(event) {
        this.agencyincidentrepairsInsertListTemp = [];
        this.agencyincidentrepairsInsertList = event.added;
        this.agencyincidentrepairsUpdatetList = event.updated;
        this.agencyincidentrepairsDeleteList = event.removed;
        this.agencyRepairsCommitBeans.insertList = [];
          if (this.agencyincidentrepairsInsertList.length > 0) {
              for (let i = 0; i < this.agencyincidentrepairsInsertList.length; i++) {
                  if (!this.agencyincidentrepairsInsertList[i].code) {
                      this.type = 'warn';
                      this.message = this.translateService.translate('oidincde.repairTypemust');
                      this.show();
                      return;
                      }
                  if (this.agencyincidentrepairsInsertList[i].repairCost) {
                      if(this.agencyincidentrepairsInsertList[i].repairCost < 0){
                          this.type = 'warn';
                          this.message = this.translateService.translate('oidincde.costcannotbenegative');
                          this.show();
                          return; 
                      }
                  }
                  this.agencyincidentrepairsInsertList[i].repairType = this.agencyincidentrepairsInsertList[i].code;
                  this.agencyincidentrepairsInsertList[i].createUserId = this.sessionManager.getId();
                  this.agencyincidentrepairsInsertList[i].agencyIncidentId = this.agencyIncidentsModel.agencyIncidentId;
              }
          }
        if (this.agencyincidentrepairsUpdatetList.length > 0) {
              for (let i = 0; i < this.agencyincidentrepairsUpdatetList.length; i++) {
                  if (this.agencyincidentrepairsUpdatetList[i].repairCost) {
                      if(this.agencyincidentrepairsUpdatetList[i].repairCost < 0){
                          this.type = 'warn';
                          this.message = this.translateService.translate('oidincde.costcannotbenegative');
                          this.show();
                          return; 
                      }
                }
                  this.agencyincidentrepairsUpdatetList[i].repairType = this.agencyincidentrepairsUpdatetList[i].code;
                  this.agencyincidentrepairsUpdatetList[i].createUserId = this.sessionManager.getId();
              }
          }
         if (this.agencyincidentrepairsDeleteList.length > 0) {
              for (let i = 0; i < this.agencyincidentrepairsDeleteList.length; i++) {
                  this.agencyincidentrepairsDeleteList[i].repairType = this.agencyincidentrepairsDeleteList[i].code;
              }
          }
        this.agencyRepairsCommitBeans.insertList = this.agencyincidentrepairsInsertList;
        this.agencyRepairsCommitBeans.updateList = this.agencyincidentrepairsUpdatetList;
        this.agencyRepairsCommitBeans.deleteList = this.agencyincidentrepairsDeleteList;
        const ServiceObj =  this.oidincdeFactory.agencyincidentrepairsCommit(this.agencyRepairsCommitBeans);
         ServiceObj.subscribe(agencyincidentRepair => {
              if (agencyincidentRepair[0] === 0) {
                     return;
                  } else {
                  this.agencyincidentrepairsData = agencyincidentRepair;
                  this.type = 'success';
                  this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
                  this.show();
                  this.repairpopulateDetails();
                  }
             });
      }

    staffDatacommit(event) {
        this.agyincpartiesoffenderInsertList = event.added;
        this.agyincpartiesoffenderUpdatetList = event.updated;
        this.agyincpartiesoffenderDeleteList = event.removed;
        if (this.agyincpartiesoffenderInsertList.length > 0) {
            for (let i = 0; i < this.agyincpartiesoffenderInsertList.length; i++) {
                if (!this.agyincpartiesoffenderInsertList[i].staffIdDes) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('oidincde.staffNamemust');
                    this.show();
                    return;
                }
                if (!this.agyincpartiesoffenderInsertList[i].incidentRole) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('oidincde.incidentRole');
                    this.show();
                    return;
                }
                this.agyincpartiesoffenderInsertList[i].dispositionType = this.sessionManager.currentCaseLoad;
                this.agyincpartiesoffenderInsertList[i].agencyIncidentId = this.agencyIncidentsModel.agencyIncidentId;
                this.agyincpartiesoffenderInsertList[i].partySeq = this.partySeq;
            }
        }
        if (this.agyincpartiesoffenderUpdatetList.length > 0) {
            for (let i = 0; i < this.agyincpartiesoffenderUpdatetList.length; i++) {
                this.agyincpartiesoffenderUpdatetList[i].dispositionType = this.sessionManager.currentCaseLoad;
                this.agyincpartiesoffenderUpdatetList[i].agencyIncidentId = this.agencyIncidentsModel.agencyIncidentId;
            }
        }
        if (this.agyincpartiesoffenderDeleteList.length > 0) {
            for (let i = 0; i < this.agyincpartiesoffenderDeleteList.length; i++) {
                this.agyincpartiesoffenderDeleteList[i].agencyIncidentId = this.agencyIncidentsModel.agencyIncidentId;
            }
        }
        this.agencyIncidentPartiesCommitBean.insertList = this.agyincpartiesoffenderInsertList;
        this.agencyIncidentPartiesCommitBean.updateList = this.agyincpartiesoffenderUpdatetList;
        this.agencyIncidentPartiesCommitBean.deleteList = this.agyincpartiesoffenderDeleteList;
        const ServiceObjstaff = this.oidincdeFactory.agyincpartieStaffCommit(this.agencyIncidentPartiesCommitBean);
        ServiceObjstaff.subscribe(agencyincidentStaff => {
            if (agencyincidentStaff === 2) {
                this.type = 'warn';
                this.message = this.translateService.translate('common.cannotdeletemasterchildrecord');
                this.show();
                this.staffModelExecuteQuery();
            } else {

                this.type = 'success';
                this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
                this.show();
                this.staffModelExecuteQuery();
            }
        });
    }
        lockedChange(event) {
            if (event) {
            if (!event.checked) {
              this.saveflag = true;
            } else {
                this.saveflag = false;
            }
        }
            this.modalData = {id: this.agencyIncidentsModel.agencyIncidentId, locked: this.agencyIncidentsModel.flag};
        }
    offenderDatacommit(event) {
      this.agyincpartiesoffenderInsertList = [];
        this.agyincpartiesoffenderUpdatetList = [];
        this.agyincpartiesoffenderDeleteList = [];
        this.agyincpartiesoffenderInsertList = event.added;
        for (let i = 0; i < event.updated.length; i++) {
            if (!event.updated[i].partySeq) {
                this.agyincpartiesoffenderInsertList = event.updated;

            } else { 
                this.agyincpartiesoffenderUpdatetList = event.updated;
            }
        }
        this.agyincpartiesoffenderDeleteList = event.removed;
        if (this.agyincpartiesoffenderInsertList.length > 0) {
            this.indexTempVal = 1;
            for (let i = 0; i < this.agyincpartiesoffenderInsertList.length; i++) {
                if (!this.agyincpartiesoffenderInsertList[i].offenderIdDisplay) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('oidincde.idmust');
                    this.show();
                    return;
                }
                 if (!this.agyincpartiesoffenderInsertList[i].incidentRole) {
                     this.type = 'warn';
                     this.message = this.translateService.translate('oidincde.rolemust');
                     this.show();
                     return;
                }
                 if (!this.agyincpartiesoffenderInsertList[i].actionCode) {
                     this.type = 'warn';
                     this.message = this.translateService.translate('oidincde.actioncodemust');
                     this.show();
                     return;
                }
                this.agyincpartiesoffenderInsertList[i].agencyIncidentId = this.agencyIncidentsModel.agencyIncidentId;
            }
        }
        this.agencyIncidentPartiesCommitBean = new AgencyIncidentPartiesCommitBean();
        this.agencyIncidentPartiesCommitBean.insertList = this.agyincpartiesoffenderInsertList;
        this.agencyIncidentPartiesCommitBean.updateList = this.agyincpartiesoffenderUpdatetList;
        this.agencyIncidentPartiesCommitBean.deleteList = this.agyincpartiesoffenderDeleteList;
        const ServiceObjstaff = this.oidincdeFactory.agyincpartiesoffenderCommit(this.agencyIncidentPartiesCommitBean);
        ServiceObjstaff.subscribe(agencyincidentStaff => {
            if (agencyincidentStaff === 0) {
                this.type = 'info';
                this.message = this.translateService.translate('common.addupdateremoverecordfailed');
                this.show();
            } else if (agencyincidentStaff === 5) {
               this.type = 'info';
                this.message = this.translateService.translate('oidincde.anoffendercanonlyappearonce');
                this.show();
                this.offenderexecuteQuery();
            } else if(agencyincidentStaff===1){
                this.btnnext = false;
                this.btnprevious = false;
                this.type = 'success';
                this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
                this.show();
                this.agencyIncidentsTemp.agencyIncidentId = this.agencyIncidentsModel.agencyIncidentId;
                this.offenderexecuteQuery();
            } else if(agencyincidentStaff === 2) {
                this.type = 'warn';
                this.message = this.translateService.translate('common.cannotdeletemasterchildrecord');
                this.show();
                this.offenderexecuteQuery();
            }
        });

        }

      chargeDatacommit(event) {
          this.agencyincidentchargesInsertList = [];
          this.agencyincidentchargesUpdatetList = [];
          this.agencyincidentchargesDeleteList = [];
          this.agencyincidentchargesInsertList = event.added;
          this.agencyincidentchargesUpdatetList = event.updated;
       this.agencyincidentchargesDeleteList = event.removed;
       if (this.agencyincidentchargesInsertList.length > 0) {
          for ( let i = 0; i < this.agencyincidentchargesInsertList.length ; i++ ) {
              if (!this.agencyincidentchargesInsertList[i].findingCode) {
                  this.type = 'warn';
                  this.message = this.translateService.translate('oidincde.chargemustbe');
                  this.show();
                  return;
              }
              this.agencyincidentchargesInsertList[i].agencyIncidentId = this.agencyIncidentsModel.agencyIncidentId;
                 this.agencyincidentchargesInsertList[i].partySeq = this.partySeq;
                 this.agencyincidentchargesInsertList[i].chargedOicOffenceId = this.oidincdeFactory.chargeoicId;
              }
       }
       if (this.agencyincidentchargesDeleteList.length > 0) {
           for (let i = 0; i < this.agencyincidentchargesDeleteList.length ; i++ ) {
               if (this.agencyincidentchargesDeleteList[i].oicChargeId !== null) {
                  this.type = 'warn';
                  this.message = this.translateService.translate('oidincde.cannotdeletearecordforwhichaChargeidhasbeenallocated');
                  this.show();
                  return;
              }
           }

       }
       this.agencyIncidentChargesCommitBean = new AgencyIncidentChargesCommitBean();
       this.agencyIncidentChargesCommitBean.insertList =   this.agencyincidentchargesInsertList;
       this.agencyIncidentChargesCommitBean.updateList =   this.agencyincidentchargesUpdatetList;
       this.agencyIncidentChargesCommitBean.deleteList =   this.agencyincidentchargesDeleteList;
       const ServiceObjstaff = this.oidincdeFactory.agencyincidentsChargesCommit(this.agencyIncidentChargesCommitBean);
       ServiceObjstaff.subscribe(agencyincidentStaff => {
           if (agencyincidentStaff === 1) {
            this.type = 'success';
            this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
            this.show();
            this.populateChargeDetails();
           }  else if (agencyincidentStaff === 2) {
            this.type = 'info';
            this.message = this.translateService.translate('oidincde.cannotdeletechildrecordrelatedtooichearingresults');
            this.show();
            this.populateChargeDetails();
        } else {
               this.type = 'info';
               this.message = this.translateService.translate('common.addupdateremoverecordfailed');
               this.show();
               this.populateChargeDetails();

           }
       });
        }

    onGridInsertOffcharge = () => {

     if ( this.agencyincidentchargesData.length > 0) {
             if (!this.agencyincidentchargesData[this.agencyincidentchargesData.length - 1].findingCode) {
                 this.type = 'warn';
                 this.message = this.translateService.translate('oidincde.chargemustbe');
                 this.show();
                 return;
             }
        }
        return {
            button: '', findingCode: '', oicOffenceType: '', reportText: '', evidenceDisposeText: '', guiltyEvidenceText: '',
        };
     }
    ngOnDestroy() {
        this.exitflag = false;
        const agyincpartiesoffenderData =  this.agyincpartiesoffenderData;
        // this.clearQuery();
        this.oiiinlogFactory.checkedfalg = false;
        this.oiinamesFactory.oiinamesflag = false;
        this.oiiinlogFactory.vagyincDataRowData = this.oidincdeFactory.vagyincDataRowData;
        this.oiiinlogFactory.vagyincModel = this.oidincdeFactory.vagyincModel;
        this.oidincdeFactory.vagyincDataRowData = [];
        this.oidincdeFactory.vagyincModel = new VAgencyIncidents();
        this.oiiinlogFactory.statusOption = this.oidincdeFactory.statusOption;
        this.oiiinlogFactory.locationOption = this.oidincdeFactory.locationOption;
        this.oiiinlogFactory.selected = this.oidincdeFactory.selected;
        this.oidincdeFactory.selected = null;
        this.oidincdeFactory.statusOption = [];
        this.oidincdeFactory.locationOption = [];
        this.oidincdeFactory.indexValue = this.agencyincidentsIndex;

        for (let i = agyincpartiesoffenderData.length - 1; i >= 0;  i--) {
            if (agyincpartiesoffenderData[i]['gridIndex'] || agyincpartiesoffenderData[i]['gridIndex'] === 0) {
            this.oidincdeFactory.tableIndex = i;
                }
        }
    }
    onGridDelete = () => {
        for (let i = 0; i < this.agencyincidentrepairsData.length; i++) {
            if (this.agencyincidentrepairsData.length === 1 && !this.agencyincidentrepairsData[i].agencyIncidentId) {
                this.type = 'warn';
                this.message = this.translateService.translate('oidincde.cannotdeletemasterrecord');
                this.show();
                return false;
            }
        }
        return true;
    }
    onGridPartiesOffenderDelete = () => {
         if (this.agencyincidentchargesData.length > 0) {
            this.type = 'warn';
            this.message = this.translateService.translate('common.cannotdeletemasterrecord');
            this.show();
            return false;
        }
        return true;
    }

    canOffInvEditroleactioncommentfields = (data: any, index: number, field: string): boolean => {
        if ((this.agencyincidentchargesData.length > 0 || data.actionCode=='RFH') && data.createDateTime) {
            return false;
        } else {
            return true;
        }

    }
    canOffInvEdit = ( data: any, index: number, field: string ): boolean => {
        return false;
    }
    locationChange = ( event ) => {
        this.btnprevious = true;
        this.btnnext = true;
        const rowdata = new ValidateRowReturn();
        const index = event.rowIndex;
        if (event.data) {

            if (event.data.offenderIdDisplay && event.field === 'offenderIdDisplay' ) {

              this.namesrchModel.offenderIdDisplay =  event.data.offenderIdDisplay;
            //   for (let i = Number(String(this.namesrchModel.offenderIdDisplay).length); i < 10; i++  ) {
            //     this.namesrchModel.offenderIdDisplay = '0' + this.namesrchModel.offenderIdDisplay;
            //   }
                const namesrchResult = this.oiinamesFactory.
                namesrchExecuteQuery(this.namesrchModel);
            namesrchResult.subscribe(data => {
                if (data.length === 0) {
                    this.namesrchData = [];
                } else {
                    this.namesrchData = data;
                    this.grid.setColumnData('offenderIdDisplay', index, data[0].offenderIdDisplay);
                    this.grid.setColumnData('lname', index, data[0].lastName);
                    this.grid.setColumnData('fname', index, data[0].firstName);
                    event.data.offenderBookId = data[0].offenderBookId;
                    }
                } );
                event.data.button = '';
            rowdata.validated = true;
            this.oiinamesFactory.oiiflag = true;
        }
        rowdata.validated = true;
        return rowdata;
    }
}

viewLaunchClick = (event) => {
    this.btnprevious = true;
    this.btnnext = true;
    this.dialogService.openLinkDialog('/oiinamesdialog', event, 90).subscribe(data => {
        const node = this.grid.gridOptions.api.getSelectedNodes().length && this.grid.gridOptions.api.getSelectedNodes()[0];
        if (node && data) {
            node.setDataValue('offenderIdDisplay', data.offenderIdDisplay);
            node.setDataValue('lname', data.lastName);
            node.setDataValue('fname', data.firstName);
        }
    });
}


    costValidation = (event) => {
        const rowIndex = event.rowIndex;
        const rowdata = new ValidateRowReturn();
        if (event.data.repairCostdes) {
            if (event.data.repairCostdes.length > 10) {
                this.type = 'warn';
                this.message = this.translateService.translate('oidincde.costvalidation');
                this.show();
                rowdata.validated = true;
                return rowdata;
            }
        }
        rowdata.validated = true;
        return rowdata;
    }

    
    onGridClear = () => {
        this.btnprevious = false;
        this.btnnext = false;
        this.agyincpartiesoffenderData = [];
       this.offenderexecuteQuery();
        return true;
    }

    openNewForm() {
        this.crtbtn=true;
        this.title1 = true;
        this.showDocIcon=false;
        this.title = this.translateService.translate( 'oidincde.createnewreport' );
        var staffobj=this.sessionManager.userSessionDetails().staff;
        this.reportedById=staffobj.staffId;
        this.agencyIncidentsModel = new AgencyIncidents();
        this.agencyIncidentsModel.reportedStaffId = this.reportedById;
        this.agencyIncidentsModel.incidentDate = DateFormat.getDate();
        this.agencyIncidentsModel.reportDate = DateFormat.getDate();
        this.agencyIncidentsModel.incidentTime = TimeFormat.parse( TimeFormat.format( DateFormat.getDate() ) );
        this.agencyIncidentsModel.reportTime = TimeFormat.parse( TimeFormat.format( DateFormat.getDate() ) );
        this.editingIncident = true;
        this.hidePane = false;
        this.reportDateDisable = false;
        this.lockedFlag=true;
        this.incidentDateDisable = false;
        this.facilityDisable = false;
        if(this.innerSelectedIncident==null){
        this.agyincpartiesoffenderData = [];
        }
        if(this.innerSelectedIncident){
            this.isClose=true;
        }
        // this.selectedbtn=false;
        // this.crtbtn=false;
        this.reportedDisable = false;
        this.isclear=false;
        this.incidentTypeDisable = false;
        this.reportTimeDisablefalg = false;
        this.incidentTimeRead = false;
        this.notimeupdate=false;
        this.incidentDetailsDisable = false

    }

    editselectedDetail( incident: any ) {
        this.notimeupdate=true;
        this.title1 = false;
        this.isClose=true;
        this.title = this.translateService.translate( 'oidincde.edit' );
        this.agencyIncidentsModel=this.innerSelectedIncident;
        this.reportedById=this.agencyIncidentsModel.reportedStaffId;
        this.locationLink = 'oidincde/rgLevelInternalLocationIdsRecordGroup?agyLocId=' + this.agencyIncidentsModel.agyLocId;
        this.modalData = {id: this.agencyIncidentsModel.agencyIncidentId, locked: this.agencyIncidentsModel.flag};
        if ( this.showEditBtn === true ) {
            this.editingIncident = true;
        } else {
            this.editingIncident = false;
        }
        this.facilityDisable = true;
        this.incidentDateDisable = true;
        if ( this.agencyIncidentsModel.lockFlag =='Y') {
            this.agencyIncidentDisable = true;
            this.incidentTimeRead = true;
            this.createdBy = true;
            this.reportTimeDisable = true;
            this.locationDisable = true;
            this.reportedDisable = true;
            this.incidentTypeDisable = true;
            this.incidentDetailsDisable = true;
            this.incidentlocationDisable = true;
            // this.incidentDateDisable = true;
            this.lockedFlag=true;
            this.showAppend=true;
        }else{
        this.hidePane = false;
        this.incidentTimeRead = false;
        this.associatedDisable = true;
        this.agencyIncidentDisable = false;
        this.incidentTimeRead = false;
        // this.facilityDisable = false;
        this.reportedDisable = false;
        this.reportTimeDisable = false;
        this.isclear=false;
        this.incidentTypeDisable = false;
        this.incidentDetailsDisable = false
        this.lockedFlag=false;
        this.showAppend=false;
        this.locationDisable = false;
    }


    }



    cancel() {
        if(this.selectedIncident == null){
            this.crtbtn=false;
            this.selectedbtn=false;
            this.showDocIcon=false;
        }else{
            this.selectedbtn=true;
            this.crtbtn=true;
            this.showDocIcon=true;
            // this.selectedIncident=this.updateIncident;
            if(this.updateIncident && this.updateIncident.agencyIncidentId){
                let innerSearchPams = {'agencyIncidentId':this.selectedIncident.agencyIncidentId};
                this.incidentService.agencyIncidentsExecuteQuery(innerSearchPams);
          }

        }
        if(this.incidentService.getAgencyIncidentId() != undefined && this.incidentService.getAgencyIncidentId() != null && this.incidentService.getAgencyIncidentId() != 0){
            this.showDocIcon = true;
        } else {
            this.showDocIcon = false;
        }
        this.hidePane = true;
        this.editingIncident = false;

    }
    onIncidentChange( incident ) {

        if(incident){
            this.agencyIncidentsModel = incident;
            this.updateIncident=incident;
            this.selectedIncident = incident;
        }
        this.iwpPaneService.objectId=this.selectedIncident.agencyIncidentId;
        if(this.selectedIncident!=null)
        {
        this.selectedbtn=true;
        }
        if ( incident ) {
            this.addflag = true;
            // this.agyincpartiesoffenderData = [];
            this.offenderexecuteQuery();
        }  else {
            this.agyincpartiesoffenderData = [];
        }
    }



    //
    // Methods for incident report search/edit
    //
    private innerSelectedIncident: any;
   

    get selectedIncident(): any {
        return this.innerSelectedIncident;
    }

    @Input()
    set selectedIncident( incident: any ) {
        if ( this.innerSelectedIncident = incident ) {
            this.innerSelectedIncident = incident;

            if ( this.selectedIncident == null && this.selectedIncident === undefined ) {
                this.showEditBtn = false;
            }
            else {
                this.showEditBtn = true;
            }
        }

    }

    get reportedStaffId(): string {
        return this.agencyIncidentsModel.reportedStaffId ? String(this.agencyIncidentsModel.reportedStaffId) : '';
    }

    set reportedStaffId(preportedStaffId) {
        if (preportedStaffId !== String(this.agencyIncidentsModel.reportedStaffId)) {
           // this.agencyIncidentsModel.reportedStaffId = Number(preportedStaffId);
        }
    }
    onStgBtnClick = () => {
        if (this.agencyIncidentsModel.agencyIncidentId) {
            return true;
        }
    }
    
    verifySignificance () {
        let significanceType = [];
        for(let i = 0; i < this.significantincidentData.length; i++) {
            if(significanceType.indexOf(this.significantincidentData[i].significanceType)>-1) {
                for(let j=0;j<this.significantAllType.length;j++){
                if(this.significantincidentData[i].significanceType==this.significantAllType[j].code){
                this.des=this.significantAllType[j].description;
            }
            }
                this.type = 'warn';
                this.message = this.translateService.translate('The Significant Type of '+this.des+' has already been added to the incident.');
                this.show();
                return false;
            } else {
                significanceType.push(this.significantincidentData[i].significanceType);
            }
            if (!this.significantincidentData[i].significanceType) {
                this.type = 'warn';
                this.message = this.translateService.translate('oidincde.typemustbeentered');
                this.show();
                return false;
             }
            if (!this.significantincidentData[i].entryDate) {
                this.type = 'warn';
                this.message = this.translateService.translate('oidincde.entrydatemustbeentered');
                this.show();
                return false;
             }
            if (!this.significantincidentData[i].entryTime) {
                this.type = 'warn';
                this.message = this.translateService.translate('oidincde.timemustbeentered');
                this.show();
                return false;
             }
              
             this.significantincidentData[i].entryDate =  TimeFormat.parse(TimeFormat.format(this.significantincidentData[i].entryTime),this.significantincidentData[i].entryDate) ;
             const toTime = new Date();
            if (DateFormat.compareDate(this.significantincidentData[i].entryDate, DateFormat.getDate()) === 1) {
                this.type = 'warn';
                this.message = this.translateService.translate('oidincde.Entrydateandtimecannotbeinfuture');
                this.show();
                return false;
            }
            let startHours = DateFormat.getDate(this.significantincidentData[i].entryDate).getHours();
            let startMinutes = DateFormat.getDate(this.significantincidentData[i].entryDate).getMinutes();
            let startHours1 = DateFormat.getDate(toTime).getHours();
            let startMinutes1 = DateFormat.getDate(toTime).getMinutes();
            if (startHours > startHours1) {
                this.type = 'warn';
                this.message = this.translateService.translate('oidincde.Entrydateandtimecannotbeinfuture');
                this.show();
                return false;
            } else if (startHours === startHours1) {
                if (startMinutes > startMinutes1) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('oidincde.Entrydateandtimecannotbeinfuture');
                    this.show();
                    return false;
                }
            }

            if (DateFormat.compareDate(this.significantincidentData[i].entryDate, this.agencyIncidentsModel.incidentDate) === -1) {
                this.type = 'warn';
                this.message = this.translateService.translate('oidincde.Entrydateandtimecannotbeinthepast');
                this.show();
                return false;
            }
        }
        return true;
    }
    
    significantincidentcommit(event){
        if(!this.verifySignificance()) {
           return; 
        } 
        this.significantIncidentInsertListTemp = [];
        this.significantIncidentInsertList = event.added;
        this.significantIncidentUpdatetList = event.updated;
        this.significantIncidentDeleteList = event.removed;
        this.significantIncidentCommitBeans.insertList = [];
          if (this.significantIncidentInsertList.length > 0) {
              for (let i = 0; i < this.significantIncidentInsertList.length; i++) {
                  if (!this.significantIncidentInsertList[i].significanceType) {
                      this.type = 'warn';
                      this.message = this.translateService.translate('oidincde.typemustbeentered');
                      this.show();
                      return;
                      }
                  this.significantIncidentInsertList[i].agencyIncidentId = this.innerSelectedIncident.agencyIncidentId;
                  this.significantIncidentInsertList[i].modifyUserId= this.sessionManager.getId();
                  //this.significantIncidentInsertList[i].entryDate = this.significantIncidentInsertList[i].entryDate + this.significantIncidentInsertList[i].entryTime;
                 // this.significantIncidentInsertList[i].entryDate =  TimeFormat.parse(TimeFormat.format(this.significantIncidentInsertList[i].entryTime),this.significantIncidentInsertList[i].entryDate) ;
                 if(this.significantIncidentInsertList[i].entryTime){                
                  let startHours = DateFormat.getDate(this.significantIncidentInsertList[i].entryTime).getHours();
                  let startMinutes = DateFormat.getDate(this.significantIncidentInsertList[i].entryTime).getMinutes();
                  this.significantIncidentInsertList[i].entryDate = DateFormat.getDate(DateFormat.getDate(this.significantIncidentInsertList[i].entryDate).setHours(startHours, startMinutes, 0, 0));
                 }
                }
          }
        if (this.significantIncidentUpdatetList.length > 0) {
              for (let i = 0; i < this.significantIncidentUpdatetList.length; i++) {
                  if (!this.significantIncidentUpdatetList[i].significanceType) {
                          this.type = 'warn';
                          this.message = this.translateService.translate('oidincde.typemustbeentered');
                          this.show();
                }
                  this.significantIncidentUpdatetList[i].agencyIncidentId = this.agencyIncidentsModel.agencyIncidentId;
                  this.significantIncidentUpdatetList[i].modifyUserId= this.sessionManager.getId();
               //   this.significantIncidentInsertList[i].entryDate = this.significantIncidentInsertList[i].entryDate + this.significantIncidentInsertList[i].entryTime;
               //  const dateFormated = DateFormat.format(this.significantIncidentInsertList[i].entryDate);
              // const appenTtime = TimeFormat.format(this.significantIncidentInsertList[i].entryTime);
               //this.significantIncidentUpdatetList[i].entryDate =  TimeFormat.parse(TimeFormat.format(this.significantIncidentUpdatetList[i].entryTime),this.significantIncidentUpdatetList[i].entryDate) ;
              
               if(this.significantIncidentUpdatetList[i].entryTime){                
                let startHours = DateFormat.getDate(this.significantIncidentUpdatetList[i].entryTime).getHours();
                let startMinutes = DateFormat.getDate(this.significantIncidentUpdatetList[i].entryTime).getMinutes();
                this.significantIncidentUpdatetList[i].entryDate = DateFormat.getDate(DateFormat.getDate(this.significantIncidentUpdatetList[i].entryDate).setHours(startHours, startMinutes, 0, 0));
               }
            }
          }
         if (this.significantIncidentDeleteList.length > 0) {
              for (let i = 0; i < this.significantIncidentDeleteList.length; i++) {
                  this.significantIncidentDeleteList[i].agencyIncidentId = this.agencyIncidentsModel.agencyIncidentId;
                  this.significantIncidentDeleteList[i].significanceType = this.significantIncidentDeleteList[i].significanceType;
              }
          }
        this.significantIncidentCommitBeans.insertList = this.significantIncidentInsertList;
        this.significantIncidentCommitBeans.updateList = this.significantIncidentUpdatetList;
        this.significantIncidentCommitBeans.deleteList = this.significantIncidentDeleteList;
        const ServiceObj =  this.oidincdeFactory.sigificantIncidentCommmit(this.significantIncidentCommitBeans);
         ServiceObj.subscribe(significantincident => {
              if (significantincident === 0) {
                     return;
                  } else {
                  this.significantincidentData = significantincident;
                  this.type = 'success';
                  this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
                  this.show();
                  this.EquCheck=false;
                  this.significantincidentpopulateDetails();
                  }
             });
      
    }
    significantincidentpopulateDetails() {
        this.significantIncident = new SignificantIncident();
        this.significantIncident.agencyIncidentId = this.innerSelectedIncident.agencyIncidentId;
        const serviceObj = this.oidincdeFactory.
        sigificantIncidentExecuteQuery(this.significantIncident);

        serviceObj.subscribe(data => {
            if (data.length === 0) {
                this.significantincidentData = [];
            } else {
                  this.significantincidentData = data;
                  for(var i=0;this.significantincidentData.length>0; i++ ){

                         this.significantincidentData[i].entryTime = this.significantincidentData[i].entryDate;

                  }
            }
        });
    }
    
    onSignificantGridInsert = ()=>{
        this.EquCheck=true;
        for ( let i = 0; i < this.significantincidentData.length; i++ ) {
            if (!(this.significantincidentData[i].entryTime && this.significantincidentData[i].entryDate)) {
                this.type = 'warn';
                this.message = this.translateService.translate( 'common.recordmustbeentered' );
                this.show();
                return ;
            }
            if ( !this.significantincidentData[i].entryTime ) {
                this.type = 'warn';
                this.message = this.translateService.translate('ocuoicin.investigatoridmustbeentered');
                this.show();
                return;
            }
            if ( !this.significantincidentData[i].entryDate ) {
                this.type = 'warn';
                this.message = this.translateService.translate('ocuoicin.dateassignedmustbeentered');
                this.show();
                return;
            }
        }
        return {entryDate :DateFormat.getDate(), entryTime:new Date()};
    }
    
//    onClick(){
//        this.router.navigate(['/OIDISTFRP']);
//    }

    getEnhancedStaffReporterAuth() {
        this.oidincdeFactory.getEnhancedStaffReporter(this.staffobj.staffId).subscribe(ele => {
            this.enhancStaffReport = ele;
        });
    }

    cellEditReportType = (data: any, index: number, field: string) => {
        if (!data.reportType || data.repCompletFlag=== false) { // && (!data.createDateTime || (data.createUserId === this.userId))
            return true;
        }
        return false;
    }

    canCellEditFee = (data: any, index: number, field: string): boolean => {
        if (data.createDatetime) {
            return true;
        } else {
            return false;
        }
    }

    isDisableStaffReport = (data: any, index: number, field: string): boolean => {
        if (!data.createDateTime) {
            return true;
        }
      
            return false;
    
       
    }
   

    viewStaffLaunch = (event) =>{
        event.agyLocId= this.agencyIncidentsModel.agyLocId
        const index = this.agyincpartiesstaffData.indexOf(event);
        this.dialogService.openLinkDialog('OIDINCDESTAFFPOPUP', event, 90).subscribe(data => {
            this.staffInvGrid.setColumnData('staffId', index, data.staffCode);
            this.staffInvGrid.setColumnData('staffIdDes', index, data.staffIdDes);
            
        });
    }
    

    getIncidentFollowUpDetails() {
        this.incidentFollowUpDataSearchModel = new IncidentFollowUpDetails();
        this.incidentFollowUpDataSearchModel.agencyIncidentId = this.innerSelectedIncident.agencyIncidentId;
        const serviceObj = this.oidincdeFactory.
        getIncidentFollowUpDetails(this.incidentFollowUpDataSearchModel);

        serviceObj.subscribe(data => {
            if (data.length === 0) {
                this.incidentFollowUpData = [];
            } else {
                  this.incidentFollowUpData = data;
                  this.incidentFollowUpDataModel= data[0];
                  this.incidentFollowUpIndex =0;
            }
        });
    }

    onRowClickIncedentFollowUp(event){
        if(event)
        this.incidentFollowUpDataModel = event;
    }

    incidentFollowUpcommit(event){
        /* if(!this.verifySignificance()) {
           return; 
        }  */
        this.incidentFollowUpInsertList = event.added;
        this.incidentFollowUpUpdatetList = event.updated;
        this.incidentFollowUpDeleteList = event.removed;
        this.IncidentFollowUpDetailsCommitBean.insertList = [];
        this.IncidentFollowUpDetailsCommitBean.updateList = [];
        this.IncidentFollowUpDetailsCommitBean.deleteList = [];
          if (this.incidentFollowUpInsertList.length > 0) {
              for (let i = 0; i < this.incidentFollowUpInsertList.length; i++) {
                  this.incidentFollowUpInsertList[i].agencyIncidentId = this.innerSelectedIncident.agencyIncidentId;
                  this.IncidentFollowUpDetailsCommitBean.insertList = this.incidentFollowUpInsertList;
              }
          }
        if (this.incidentFollowUpUpdatetList.length > 0) {
            this.IncidentFollowUpDetailsCommitBean.updateList = this.incidentFollowUpUpdatetList;
          }
         if (this.incidentFollowUpDeleteList.length > 0) {
            this.IncidentFollowUpDetailsCommitBean.deleteList = this.incidentFollowUpDeleteList;
          }
        const ServiceObj =  this.oidincdeFactory.incidentFollowUpcommit(this.IncidentFollowUpDetailsCommitBean);
         ServiceObj.subscribe(data => {
            if (data && data[0] && data[0].returnedOutput && data[0].returnedOutput === 2) {
                this.type = 'warn';
                this.message = this.translateService.translate('oimoffob.rowalreadyexistswithsamedata');
                this.show();
                this.getIncidentFollowUpDetails();
                return;          
            }
            if (data && data[0] && data[0].returnedOutput && data[0].returnedOutput === 1) {
                this.type = 'success';
                this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
                this.show();
                this.getIncidentFollowUpDetails();
                return;
            } else {

                this.type = 'warn';
                this.message = this.translateService.translate('common.addupdateremoverecordfailed');
                this.show();
                this.getIncidentFollowUpDetails();
                return;
            }
             });
      
    }

    checkPermisionForTabAccess() {
        this.tabDataVisable =false; 
        this.tabDataVisibleSignfct = false; 
        const id = this.oidincdeFactory.checkPermisionForTabAccess();
        id.subscribe(permissionMap => {
            const incidentFollowUpPermission = permissionMap['INCIDENT_FOLLOW_UP'];
            const signfctIncidentPermission = permissionMap['SIGNFCT_INCIDENT_ROLE'];
                this.tabDataVisable = !incidentFollowUpPermission;
            this.tabDataVisibleSignfct = !signfctIncidentPermission;
        });
    }

    get incidentFlagEnableDesable(){
        if(!this.tabDataVisable && (this.innerSelectedIncident && this.innerSelectedIncident.agencyIncidentId)){
            return true;
        } else {
            return false;
        }

    }


    getIncdentReportConfigData() {
        this.oumsysetModelIncedentReportConfig.settingProviderCode = 'INCEDENT_REPORTING';
        this.oumsysetModelIncedentReportConfig.settingType = 'INCEDENT_REPORTING';
        this.oumsysetService.loadJsonData(this.oumsysetModelIncedentReportConfig).subscribe((result) => {
          const rowData = JSON.parse(result.settingValue);
          console.log(rowData);
          this.reportableIncedentFlag = false;
          if(rowData && rowData.length > 0) {
            this.incedentReportingRowData = rowData; 
            if(this.incedentReportingRowData[0] && this.incedentReportingRowData[0].VALUE && this.incedentReportingRowData[0].VALUE === 'Y'){
                this.reportableIncedentFlag = true;
                console.log('Reportable Incedent Flag value'+this.reportableIncedentFlag);
            } else {
                this.reportableIncedentFlag = false;
                console.log('Reportable Incedent Flag value'+this.reportableIncedentFlag);
            }
            console.log(this.incedentReportingRowData);
          }
        });
      }
    
}
