import { Component, forwardRef, Input, OnInit, OnDestroy, Output, EventEmitter,ViewChild } from '@angular/core';
import {
    NG_VALUE_ACCESSOR,
    ControlValueAccessor
} from '@angular/forms';
import { OidincdeService } from '@inst/incidents-oic/service/oidincde.service';
import { TranslateService } from '@common/translate/translate.service';
import { Subject } from "rxjs";
import { Router } from '@angular/router';
import { IncidentSearchService } from '../../service/incident-search.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { OiiinlogService } from '@inst/incidents-oic/service/oiiinlog.service';
import { AgencyIncidents } from '@instincidentsbeans/AgencyIncidents';
import { DateFormat } from '@ui-components/datepicker/dateFormat';
import { takeUntil} from 'rxjs/operators';
import { OsinamesService } from '@cm/searchassaign/service/osinames.service';
import { LaunchbuttonComponent } from '@ui-components/launchbutton/launchbutton.component';
export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => IncidentSearchComponent),
    multi: true
};
   
const noop = () => {
};

@Component({
    selector: 's4-incident-search',
    templateUrl: './incident-search.component.html',
    styleUrls: [],
    providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR]
})
export class IncidentSearchComponent implements ControlValueAccessor, OnInit, OnDestroy {
    private innerrSearchParams: any = {};
    private innerSelectedRecord: any;
    private innerRecordsRetrieved: any[];
    rgreportedstaffidsRg: any[];
    facilityDisable: boolean;
    locationDisable: boolean;
    caseLoadId: string;
    osinamesbtnDisabled: boolean;
    rglevelinternallocationidsRg: any[];
    modalData: any;
    msgs: any[] = [];
     orcaId:string;
    searchElement : any;
    incidentType :string;
    public selected = -1;
    @Input() id: string;
    @Input() limitToCaseload = true;
    isDialogOpen: boolean;
    offenderIdDisplay :any;
    lastName :any;
    firstName :any;
    checkFlag:boolean;
    private unsubscribe: Subject<void> = new Subject<void>();

    // by the Control Value Accessor
    private onTouchedCallback: () => void = noop;
    private onChangeCallback: (_: any) => void = noop;
    agencyIncidentsModel: AgencyIncidents;
    agencyincidentsModel: AgencyIncidents = new AgencyIncidents();
    agencyIncidentsModelTemp: AgencyIncidents;
    agencyIncidentsTemp: AgencyIncidents;
    agencyIncidents:AgencyIncidents = new AgencyIncidents();
    private currentUrl: string;
    isProperty: boolean;
    @Output() selectedIncidentChange: EventEmitter<any> = new EventEmitter<any>();
    @Output() paneFormButtonDiable: EventEmitter<any> = new EventEmitter<any>();
    facilityLink: any;
    reportLink:any;
    locationLink:any;
    showGrid:boolean=false;
    repoffDisabled:boolean;
    incidentDisabled:boolean;
    offInDisabled:boolean;
    columnDefs:any;
    @ViewChild('osinamesdialogbtn') osinamesdialogbtn: LaunchbuttonComponent;
    constructor(private incidentService :IncidentSearchService,private osinamesService: OsinamesService,
                public translateService: TranslateService,
                private route: Router,private sessionManager: UserSessionManager,private  oiiinlogFactory: OiiinlogService,private oidincdeFactory: OidincdeService) {
        this.facilityDisable = false;
        this.locationDisable = false;
        
    }

    ngOnInit() {
        this.agencyIncidentsTemp = new AgencyIncidents();
        this.locationDisable = true;
        this.repoffDisabled = true;
        this.offInDisabled=true
        this.facilityLink = 'oidincde/rgAgyLocIdsRecordGroup?caseloadId=' + this.sessionManager.currentCaseLoad;
        this.reportLink = 'oidincde/rgReportedStaffIdsRecordGroup?caseloadId=' + this.sessionManager.currentCaseLoad;
        this.caseLoadId = this.sessionManager.currentCaseLoad;   
        this.gridFormation();
        this.currentUrl = this.route.url;
        this.searchElement = <HTMLBaseElement>document.getElementsByClassName('search-icon')[0];
//        this.searchParams = this.incidentService.searchParams;
      this.recordsRetrieved = this.incidentService.recordsRetrieved;
        this.incidentService.selectedIncidentObservable
        .pipe(takeUntil(this.unsubscribe))
        .subscribe(off => {
            this.value = off;
        });
        this.incidentService.recordsRetrievedObservable
            .pipe(takeUntil(this.unsubscribe))
            .subscribe(data => {
                this.showGrid=true;
                this.recordsRetrieved = data;
                if( this.incidentService.checkFlag){
                    return;
                }
                if(!this.recordsRetrieved.length){
                    this.msgs = [{ message:
                        this.translateService.translate('common.querycaused'), type: 'warn' }];
                    return;
                }
                
                this.selected = 0;
            });
        this.incidentService.searchParamsObservable
            .pipe(takeUntil(this.unsubscribe))
            .subscribe(param => {
                this.searchParams = param;
            });
    }
    
    gridFormation() {
        this.columnDefs = [
                      {
                          fieldName:this.translateService.translate('comp.common.indcident'),
                          field: 'agencyIncidentId',
                          editable: true,
                          datatype: 'number',
                          width: 140
                      },
                      {
                          fieldName:this.translateService.translate('incident-header.incidentdate') ,
                          field: 'incidentDate',
                          editable: true,
                          datatype: 'date',
                          width: 140
                      },
                      {
                          fieldName:this.translateService.translate('incident-header.time'),
                          field: 'incidentTime',
                          editable: false,
                          datatype: 'time',
                          width: 150
                      },
                      {
                          fieldName:this.translateService.translate('comp.common.indcidenttype'),
                          field: 'incidentTypeDescription',
                          editable: false,
                          datatype: 'text',
                          width: 120,
                      },
                      {
                          fieldName:this.translateService.translate('comp.common.facility'),
                          field: 'agyLocId',
                          editable: false,
                          datatype: 'text',
                          width: 140, 
                      },
                      {
                          fieldName:this.translateService.translate('comp.common.location'),
                          field: 'interLocationIdDes',
                          editable: false,
                          datatype:'text',
                          width: 150
                      },
                      {
                          fieldName:this.translateService.translate('incident-header.reported'),
                          field: 'reportStaffIdAsCode',
                          editable: false,
                          datatype: 'text',
                          width: 130
                      },
                      
                      {
                          fieldName:this.translateService.translate('incident-header.createdby'),
                          field: 'createUserId',
                          editable: false,
                          datatype: 'text',
                          width: 200 
                      },
                      
                      
                  ];
    }
    get value(): any {
        return this.innerSelectedRecord;
    }

    @Input()
    set value(v: any) {
        if (v !== this.innerSelectedRecord) {
            this.innerSelectedRecord = v;
            this.selectedIncidentChange.emit(this.innerSelectedRecord);
            this.onChangeCallback(this.innerSelectedRecord);
        }
    }

 
    get searchParams(): any {
        return this.innerrSearchParams;
    }

    set searchParams(v: any) {
         
        if (this.innerrSearchParams !== v) {
            this.innerrSearchParams = (v !== undefined ? v : {});
        }
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

    get showResults(): boolean {
        return this.recordsRetrieved !== undefined;
    }

    clear(): void {
        
        this.repoffDisabled=true;
        this.offInDisabled=true
        this.incidentService.checkFlag=true;
        this.orcaId=null;
        this.incidentService.clear();
        this.showGrid=false;
        
    }

   
    writeValue(value: any) {
        if (value !== this.value) {
            if (value === null) {
                value = undefined;
            }
            this.value = value;
        }
    }

    // From ControlValueAccessor interface
    registerOnChange(fn: any) {
        this.onChangeCallback = fn;
    }

    // From ControlValueAccessor interface
    registerOnTouched(fn: any) {
        this.onTouchedCallback = fn;
    }
    
    retrieve():void{
        if(this.searchParams.fromDate && this.searchParams.toDate){
            if (DateFormat.compareDate(this.searchParams.fromDate, this.searchParams.toDate) === 1) {
                this.msgs = [{ message:
                    this.translateService.translate('oidincde.incidentfromto'), type: 'warn' }];
                    return;
                }
            }
         if(this.innerrSearchParams.toDate==undefined && this.innerrSearchParams.fromDate!=undefined || !this.innerrSearchParams ){
            this.innerrSearchParams.toDate = DateFormat.getDate();
         }
         if(this.orcaId && this.offenderIdDisplay){
             this.innerrSearchParams['offenderIdDisplay']=this.offenderIdDisplay;
         }
        if (this.innerrSearchParams){
            this.incidentService.agencyIncidentsExecuteQuery(this.innerrSearchParams);
        } else {            
            this.msgs = [{ message:
                this.translateService.translate('incident-header.message'), type: 'error' }];
        }
    }
    
    
     selectRecord(data) {
        this.incidentService.selectedIncident = data;
    }
 
    ngOnDestroy() {
        this.unsubscribe.next();
        this.unsubscribe.complete();
    }
    
    closeSearch(){
        const fieldElement = <HTMLInputElement>document.getElementById('search-block');
        fieldElement.style.display = 'none';
        this.searchElement.classList.remove("search-open");
    }
    locationChange(){
        for(let i=0;i<this.rglevelinternallocationidsRg.length;i++){
            if(this.rglevelinternallocationidsRg[i].text==this.searchParams.location){
                this.innerrSearchParams['internalLocationId']=Number(this.rglevelinternallocationidsRg[i].id);
            }
        }
    }
    changeCenterType() {
        if (this.searchParams.agyLocId) {
            this.locationDisable = false;
            this.repoffDisabled=false;
            this.offInDisabled=false;
        } else {
            this.locationDisable = true;
        }
         this.locationLink = 'oidincde/rgLevelInternalLocationIdsRecordGroup?agyLocId=' + this.searchParams.agyLocId;
         const serviceObj3 = this.oidincdeFactory.
         rgLevelInternalLocationIdsRecordGroup(this.searchParams.agyLocId);
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

    setDescription(event) {
        this.isDialogOpen = false;
        if (event) {
            if (event.lastName && event.firstName && event.offenderIdDisplay) {
                this.orcaId= event.lastName + ', ' + event.firstName;
                this.offenderIdDisplay = event.offenderIdDisplay;
                this.lastName = event.lastName;
                this.firstName = event.firstName;
            }
        } else {
            this.orcaId = null;
            this.offenderIdDisplay = null;
        }
    }

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
