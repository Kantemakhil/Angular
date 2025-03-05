import { Subject } from 'rxjs';
import {
    Component, OnInit, OnDestroy, ViewChild, forwardRef, Inject
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { NameFormatUtil } from '@common/utility/nameFormatUtil';
import { IntakeService } from "./service/intake.service";
import { DialogComponent } from '@ui-components/dialog/dialog.component';
import { AppHomeComponent } from "../../../app/app-home/app-home.component";
import { Purpose } from '@ui-components/button/purpose';
import { DateFormat } from '@ui-components/datepicker/dateFormat';
import { OffenderSearchService } from '@common/offender-records/service/offender-search.service';
import { takeUntil} from 'rxjs/operators';
import { DynamicMenuService } from '@core/service/dynamic-menu.service';
import { UserSessionManager } from '@core/classes/userSessionManager';


@Component( {
    selector: 'app-inmate-intake-summary',
    templateUrl: './inmate-intake-summary.component.html',
    styleUrls: []
} )
export class InmateIntakeSummaryComponent implements OnInit, OnDestroy {
    @ViewChild( 'dialog', {static: true} ) dialog: DialogComponent;
   

    resultColumnDefs: any[];
    searchresultsData: any[];
    currentDate: Date = new Date();
    isInmateSummary: boolean = false;
    dateFormat:any;
    pendingImageCount:number;
    pendingPropertyCount:number;
    pendingRiskCount:number;
    pendinglegalCount:number;
    caseloadID:any = '';

    isCaseloadChangedSubscription:any;

    constructor(private sessionManager: UserSessionManager, public dms: DynamicMenuService, private intakeService: IntakeService, public translateService: TranslateService,
            private nameFormatUtil :NameFormatUtil,private offenderSearchService: OffenderSearchService,
        @Inject( forwardRef(() => AppHomeComponent ) ) public app: AppHomeComponent ) {
       
    }

    ngOnInit() {
        this.dateFormat = DateFormat.format(new Date());
        //console.log("intake load")
        this.getInmateSummary(this.sessionManager.currentCaseLoad)

        this.isCaseloadChangedSubscription = this.dms.isCaseloadChanged$.subscribe((caseloadInfo) => {
            if (caseloadInfo && caseloadInfo.screen == 'home') {
                //console.log("caseload change from intake")
                this.getInmateSummary(this.sessionManager.currentCaseLoad)
            }
        })

    }


    getInmateSummary(caseloadID): any {
        this.intakeService.getOffenderIntakeSummary(caseloadID).subscribe( list => {
            this.isInmateSummary = true;
            this.resultColumnDefs = [];

            if ( list.length > 0 ) {
                for ( let i = 0; i < list.length; i++ ) {
                    if(list[i].propertyPresent==null || list[i].legalCasePresent==null || list[i].assesmentPresent==null) {
                        if(list[i].legalCasePresent==null) {
                            list[i].actionLegal=Purpose.WARN;
                            list[i].legalCasePresent='N';
                        } else {
                            list[i].actionLegal=Purpose.PRIMARY;
                        }
                    if(list[i].propertyPresent==null) {
                        list[i].propertyPresent='N';
                            list[i].actionProperty=Purpose.WARN;
                        } else {
                            list[i].actionProperty=Purpose.PRIMARY;
                        }
                            
						
					if(list[i].assesmentPresent==null) {
                        list[i].assesmentPresent='N';
                            list[i].actionRisk=Purpose.WARN;
                        }else 
                            list[i].actionRisk=Purpose.PRIMARY;
                        
                    }
                    else {
                        list[i].actionLegal=Purpose.PRIMARY;
                        list[i].actionProperty=Purpose.PRIMARY;
                    }
                   if(list[i].imagePresent==null) {
                       list[i].imagePresent = 'N';
                   }
                    
                    
                    list[i].name=this.nameFormatUtil.customizeName(list[i].firstName, list[i].lastName,list[i].middleName);

                    // TO-DO when the Timestamp issue resolves 
                   // 

                }
                this.pendingImageCount=0;
                this. pendingPropertyCount=0;
                this. pendingRiskCount=0;
                this.pendinglegalCount=0;
                for(let i = 0; i < list.length; i++){
                    if( list[i].imagePresent=='N' || list[i] .imagePresent==null){
                        list[i].imagePresent= 'assets/icons/eoff_icons/assignment_late-black-24x24.png';
                        this.pendingImageCount++;
                    }else{
                        list[i].imagePresent= 'assets/icons/eoff_icons/assignment_turned_in-black-24x24.png';
                        }
                    if( list[i] .propertyPresent=='N' || list[i] .propertyPresent==null){
                            list[i]. propertyPresent= 'assets/icons/eoff_icons/assignment_late-black-24x24.png';
                           this. pendingPropertyCount++;
                        }else{
                            list[i]. propertyPresent=  'assets/icons/eoff_icons/assignment_turned_in-black-24x24.png';
                        }
                    if( list[i].assesmentPresent=='N' || list[i].assesmentPresent==null){
                            list[i].assesmentPresent= 'assets/icons/eoff_icons/assignment_late-black-24x24.png';
                           this. pendingRiskCount++;
                        }else{
                            list[i].assesmentPresent= 'assets/icons/eoff_icons/assignment_turned_in-black-24x24.png';
                        }
                    if(list[i].legalCasePresent==='N' || list[i].legalCasePresent==null){
                            list[i].legalCasePresent= 'assets/icons/eoff_icons/assignment_late-black-24x24.png';
                            this.pendinglegalCount++;
                        }else{
                            list[i].legalCasePresent= 'assets/icons/eoff_icons/assignment_turned_in-black-24x24.png';
                        }
                        
                }

                this.searchresultsData = list;

                
            }
            else
                this.searchresultsData = [];
            this.customizeTable();
        } );
    }

    ngOnDestroy() {
        if (this.isCaseloadChangedSubscription) {
            this.isCaseloadChangedSubscription.unsubscribe();
        }
    }

    customizeTable() {

    
        this.resultColumnDefs = [
            {
                fieldName: this.translateService.translate( 'Name' ),
                field: 'name', datatype: 'hyperlink', displayas: 'href', link: '/intakeDialog', 
                data: 'row', modal: true, editable: false, dialogWidth: '90%'
            },
            {
                fieldName: this.translateService.translate( 'Admitted' ),
                field: 'admittedDateTime', datatype: 'dateTime', editable: false,width: 246
            },

            {
                fieldName: this.translateService.translate( 'HoldingCell' ),width: 236,
                field: 'locationCode', editable: false
            },
        ];

        if ( this.app.isRouteExist( "/OIDMEDIC" ) != undefined ) {
            this.resultColumnDefs.push(
                {
                    fieldName: this.translateService.translate( 'Medical' ),
                    field: 'medicalScreeningPresent', datatype: 'hyperlink',displayas: 'image', link: '/OIDMEDIC',
                    data: 'row', updateField: 'row', modal: true, width: 150, typeValue :'medicalScreeningPresent'

                }, )
        }
       /* if ( this.app.isRouteExist( "/" ) != undefined ) {
            this.resultColumnDefs.push(
                {
                    fieldName: this.translateService.translate( 'trust' ),
                    field: 'legalCasePresent', datatype: 'hyperlink', displayas: 'button', link: '/OCDCCASE',
                    queryparam: 'offenderId', data: 'row', editable: false, modal: false, width: 150
                }, )
        }*/
        if ( this.app.isRouteExist( "/OIUIMAGE" ) != undefined ) {
            this.resultColumnDefs.push(
                {
                    fieldName: this.translateService.translate( 'Images' ),
                    field: 'imagePresent', datatype: 'hyperlink', displayas: 'image', link: '/OIUIMAGE',
                    queryparam: 'offenderId', data: 'row', editable: false, modal: false, width: 150
                }, )
        }
        if ( this.app.isRouteExist( "/OIDOFENR" ) != undefined ) {
            this.resultColumnDefs.push(
                {
                    fieldName: this.translateService.translate( 'Prints' ),
                    field: 'fingerprintPresent', datatype: 'hyperlink', displayas: 'image', link: '/OIDOFENR',
                    queryparam: 'offenderId', data: 'row', editable: false, modal: false, width: 150
                }, )
        }
        if ( this.app.isRouteExist( "/OIDMPITM" ) != undefined ) {
            this.resultColumnDefs.push(
                {
                    fieldName: this.translateService.translate( 'Property' ),
                    field: 'propertyPresent', datatype: 'hyperlink', displayas: 'image', link: '/OIDMPITM',
                    queryparam: 'offenderId', data: 'row', editable: false, modal: false,typeValue :'actionProperty',width: 150,
                }, )
        }
        if ( this.app.isRouteExist( "/OCDNOQUE" ) != undefined ) {
            this.resultColumnDefs.push(
                {
                    fieldName: this.translateService.translate( 'Risk/Needs' ),
                    field: 'assesmentPresent', datatype: 'hyperlink', displayas: 'image', link: '/OCDNOQUE',typeValue :'actionRisk',
                    queryparam: 'offenderId', data: 'row', editable: false, modal: false, width: 150
                }, )
        }
        if ( this.app.isRouteExist( "/OCDCORDS" ) != undefined ) {
            this.resultColumnDefs.push(
                {
                    fieldName: this.translateService.translate( 'Legal' ),
                    field: 'legalCasePresent', datatype: 'hyperlink', displayas: 'image', link: '/OCDCORDS',
                    queryparam: 'offenderId', data: 'row', editable: false, modal: false, typeValue :'actionLegal',width: 150
                }, )
        }
    

if(this.searchresultsData.length > 0) {
    this.setRowData();
}
}
setRowData() {
    let filteredColumns = ['name','admittedDateTime','locationCode'];
    let tempList = [];
    this.resultColumnDefs.forEach(e => {
    if (!filteredColumns.includes(e.field)){
        tempList.push(e.field);
      }
    })
    let tempSearchList = [];
    this.searchresultsData.forEach(ele => {
    let result =  tempList.filter ( i => ele[i] !== 'assets/icons/eoff_icons/assignment_turned_in-black-24x24.png');
    if(result.length !=0) {
    tempSearchList.push(ele);
    }
    })
    this.searchresultsData = tempSearchList;
  }
 }


