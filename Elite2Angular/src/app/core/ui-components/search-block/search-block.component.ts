import { Component, forwardRef, Input, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import {
    NG_VALUE_ACCESSOR,
    ControlValueAccessor
} from '@angular/forms';
import { OffenderSearchService } from '@common/offender-records/service/offender-search.service';
import { TranslateService } from '@common/translate/translate.service';
import { Subject } from "rxjs";
import { Router } from '@angular/router';
import { ManageAppBarService } from "@core/service/manage-app-bar.service";
import { takeUntil } from 'rxjs/operators';
import { DynamicMenuService } from '@core/service/dynamic-menu.service';
// import { RecentOffenderComponent } from 'src/app/app-home/menu-components/recent-offender/recent-offender.component';


export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => SearchBlockComponent ),
    multi: true
};

const noop = () => {
};

@Component( {
    selector: 's4-search-block',
    templateUrl: './search-block.component.html',
    styleUrls: [],
    providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR]
} )
export class SearchBlockComponent implements  ControlValueAccessor, OnInit, OnDestroy {
    ser: OffenderSearchService;
    private innerSearchParams: any = {};
    private innerSelectedRecord: any;
    private innerRecordsRetrieved: any[];
    msgs: any[] = [];
    searchElement: any;
    @Input() id: string;
    innerCurrentCaseId: string;
    @Input() limitToCaseload = true;

    private unsubscribe: Subject<void> = new Subject<void>();

    // by the Control Value Accessor
    private onTouchedCallback: () => void = noop;
    private onChangeCallback: ( _: any ) => void = noop;
    private propertyScreen = ['/OIDRPITM', '/OIDMPCON', '/OIDTPRIT', '/OIDVCONT', '/OIDDPROP', '/OIDTPCON', '/OIDRTCON', '/OIDIICLO',
        '/OIIPTRAN', '/OIIPCLOC', '/OIIPCTRA', '/OIDMPITM'];
    private currentUrl: string;
    public selected = -1;
    isProperty: boolean;
    isTrust: boolean;
    msglist = [];
    message = ' Invalid.';
    type = 'error';
    @Output() selectedOffenderChange: EventEmitter<any> = new EventEmitter<any>();
    columnDefs: any[];
    

    constructor( private service: OffenderSearchService,
        public translateService: TranslateService,
        private route: Router, private appbarService: ManageAppBarService,
        public dms: DynamicMenuService ) {
           const obj =  this.service.getOffenderStatus().subscribe(status => {
               if (status == "recentOffender") {
                   if (this.service.offenderSelected === undefined || this.service.offenderSelected === null) {
                       this.innerSearchParams = {};
                       this.type = 'warn';
                       this.message = this.translateService.translate('common.pleasesearchforvalidoffender');
                       this.show();
                   }
                   this.ngOnInit();
               } 
              });
         }

    ngOnInit() {
        this.columnDefs = [
            {
                fieldName: this.translateService.translate('common.offenderid'),
                field: 'offenderIdDisplay',
                editable: false,
                datatype: 'text',
                width: 130
            },
            {
                fieldName: this.translateService.translate('common.lastname'),
                field: 'lastName',
                editable: false,
                datatype: 'text',
                width: 140
            },
            {
                fieldName: this.translateService.translate('common.firstname'),
                field: 'firstName',
                editable: false,
                datatype: 'text',
                width: 140
            },
            {
                fieldName: this.translateService.translate('common.dob'),
                field: 'birthDate',
                editable: false,
                datatype: 'date',
                width: 120
            },
            {
                fieldName: this.translateService.translate('common.bookingno'),
                field: 'bookingNo',
                editable: false,
                datatype: 'text',
                width: 140
            },
            {
                fieldName: this.translateService.translate('common.bookingdate'),
                field: 'bookingBeginDate',
                editable: false,
                datatype: 'date',
                width: 150
            },
            {
                fieldName: this.translateService.translate('common.age'),
                field: 'age',
                editable: false,
                datatype: 'number',
                width: 90
            },
            {
                fieldName: this.translateService.translate('common.alerts'),
                field: 'offAlerts',
                editable: false,
                datatype: 'text',
                width: 110
            },
            {
                fieldName: this.translateService.translate('common.status'),
                field: 'statusDisplay',
                editable: false,
                datatype: 'text',
                width: 110
            },
            {
                fieldName: this.translateService.translate('common.reason'),
                field: 'movementReason',
                editable: false,
                datatype: 'text',
                width: 110
            },
            {
                fieldName: this.translateService.translate('common.inout'),
                field: 'status1',
                editable: false,
                datatype: 'text',
                width: 110
            }
            /*,
            {
                fieldName: ' ',
                field: 'image',
                editable: false,
                datatype: 'image',
                width: 60
            }*/
        ];

        this.currentUrl = this.route.url;
        let urlContainsOffednerQuery = this.currentUrl.indexOf('?offenderId')>0? true:false;
        this.isProperty = ( this.propertyScreen.indexOf( this.currentUrl ) >= 0 ) ? true : false;
        this.isTrust = ( this.trustModuleScreens.includes( this.currentUrl ) ) ? true : false;
        if ( ( this.isProperty !== this.service.isProperty ) || ( this.isTrust !== this.service.isTrust ) ) {
            this.service.isProperty = this.isProperty;
             let tempInnerSearchParams = {};
            if ( this.service.selectedOffender && this.service.selectedOffender.offenderIdDisplay
                && this.service.selectedOffender.bookingNo ) {
                tempInnerSearchParams['offenderIdDisplay'] = this.service.selectedOffender.offenderIdDisplay;
                tempInnerSearchParams['bookingNo'] = this.service.selectedOffender.bookingNo;
                tempInnerSearchParams['parentForm'] = this.currentUrl;
                if ( this.isProperty ) {
                    this.service.offbkgGlobalPropertyQuery( tempInnerSearchParams );
                } else if ( this.isTrust ) {
                    if (!this.service.selectedOffender.trustAccount) { // code implemented for issue S4-3335
                        this.innerSearchParams = {};
                        this.type = 'warn';
                        this.message = this.translateService.translate( 'common.offendernotintrustaccount' );
                        this.show();
                    } else {
                        tempInnerSearchParams['moduleName'] = this.currentUrl;
                        const data = this.service.ffbkgGlobalTrustQuery( tempInnerSearchParams );
                        data;
                    }
                } else {
                    if (!this.service.selectedOffender && !urlContainsOffednerQuery) { // code implemented for issue S4-3335
                        this.innerSearchParams = {};
                        this.type = 'warn';
                        this.message = this.translateService.translate( 'common.pleasesearchforvalidoffender' );
                        this.show();
                    } else {
                        //this.service.offbkgGlobalQuery( tempInnerSearchParams );
                    }
                }
            }

        }
        //this.innerCurrentCaseId=this.service.currentCaseLoad;
        this.searchElement = <HTMLBaseElement>document.getElementsByClassName( 'search-icon' )[0];
        // this.value = this.service.selectedOffender; submitted from Pane component for issue S4-1725
        // this.searchParams = this.service.searchParams; code commented for issue S4-3335
        // this.recordsRetrieved = this.service.recordsRetrieved; code commented for issue S4-3335
        this.service.selectedOffenderObservable
            .pipe(takeUntil( this.unsubscribe ))
            .subscribe( off => {
                this.value = off;
            } );
        this.service.recordsRetrievedObservable
            .pipe(takeUntil( this.unsubscribe ))
            .subscribe( data => {
                this.recordsRetrieved = data;
                this.selected = 0;
                if ( data && data.length == 1 ) {
                    if ( data[0].errorMessage ) {
                        this.type = 'warn';
                        this.message = this.translateService.translate( 'common.requiredagencylocationtype' );
                        this.show();
                    }
                    this.selectAndCloseRecord( data[0] );
                } else if ( data != undefined ) {
                    if ( this.isTrust && data.length == 0 ) {
                          this.innerSearchParams = {};
                        this.type = 'warn';
                        this.message = this.translateService.translate( 'common.offendernotintrustaccount' );
                        this.show();
                    } else if (data.length === 0) {
                        this.innerSearchParams = {};
                        this.type = 'warn';
                        this.message = this.translateService.translate( 'common.pleasesearchforvalidoffender' );
                        this.show();
                    }
                } else {
                    
                    return 1;
                }

            } );
        this.service.searchParamsObservable
            .pipe(takeUntil( this.unsubscribe ))
            .subscribe( param => {
                this.searchParams = param;
            } );

    }
    
    show() {
        this.msglist = [];
        this.msglist.push({ message: this.message, type: this.type });
        this.msgs = [...this.msglist];
    }

    get value(): any {
        return this.innerSelectedRecord;
    }

    @Input()
    set value( v: any ) {
        if ( v !== this.innerSelectedRecord ) {
            this.innerSelectedRecord = v;
            this.selectedOffenderChange.emit( this.innerSelectedRecord );
            this.onChangeCallback( this.innerSelectedRecord );
        }
    }

    get searchParams(): any {
        return this.innerSearchParams;
    }

    set searchParams( v: any ) {
        if ( this.innerSearchParams !== v ) {
            this.innerSearchParams = ( v !== undefined ? v : {} );
        }
    }

    get recordsRetrieved(): any[] {
        return this.innerRecordsRetrieved;
    }

    set recordsRetrieved( v: any[] ) {
        if ( v !== this.innerRecordsRetrieved ) {
            this.innerRecordsRetrieved = v;
            // TODO: add logic to update grid with data, reset current selection (if needed)
        }
    }

    get showResults(): boolean {
        return this.recordsRetrieved !== undefined;
    }

    clear() {
        if (this.route && this.dms.restrictDeactivateScreensArr.includes(this.route.url) && !this.dms.isSingleSaveBtnDisable) {
            let confirmDlg = this.dms.actionProceedDialog();
            confirmDlg.afterClosed().subscribe((result) => {
                confirmDlg = null;
                if (result && result == true) {
                    this.proceedToClear();
                }
            });
        }
        else {
            this.proceedToClear();
        }
    }

    proceedToClear(){
        this.dms.isSingleSaveBtnDisable = true;
        this.service.clear();
        this.dms.getRecentOffendersList();
        this.dms.clearOffender();
    }


    search() {
        if (this.route && this.dms.restrictDeactivateScreensArr.includes(this.route.url) && !this.dms.isSingleSaveBtnDisable) {
            let confirmDlg = this.dms.actionProceedDialog();
            confirmDlg.afterClosed().subscribe((result) => {
                confirmDlg = null;
                if (result && result == true) {
                    this.proceedToSearch();
                }
            });
        }
        else {
            this.proceedToSearch();
        }
    }

    proceedToSearch(){
        this.dms.isSingleSaveBtnDisable = true;
        if ( !this.innerSearchParams.offenderIdDisplay && !this.innerSearchParams.lastName
            && !this.innerSearchParams.firstName && !this.innerSearchParams.middleName
            && !this.innerSearchParams.birthDate && !this.innerSearchParams.bookingNo ) {
            this.type = 'warn';
            this.message = this.translateService.translate('common.inlinequeryparameterrequired');
            this.show();
        } else {
            this.innerSearchParams['parentForm'] = this.currentUrl;
            if ( this.limitToCaseload ) {
                if ( this.isProperty ) {
                    this.service.offbkgGlobalPropertyQuery( this.innerSearchParams );
                } else if ( this.isTrust ) {
                    this.innerSearchParams['moduleName'] = this.currentUrl;
                    this.service.ffbkgGlobalTrustQuery( this.innerSearchParams );
                } else if ( this.service.currentCaseLoad != null && this.service.currentCaseLoad != undefined ) {
                    this.service.offbkgGlobalQuery( this.innerSearchParams );
                } else {
                    this.type = 'warn';
                    this.message = this.translateService.translate('common.internalerrorunabletoperformquery');
                    this.show();
                }

            } else {
                this.service.offbkgExecuteQuery( this.innerSearchParams );
            }
        }
    }

    selectRecord(data) {
        if (this.route && this.dms.restrictDeactivateScreensArr.includes(this.route.url) && !this.dms.isSingleSaveBtnDisable) {
            let confirmDlg = this.dms.actionProceedDialog();
            confirmDlg.afterClosed().subscribe((result) => {
                confirmDlg = null;
                if (result && result == true) {
                    this.proceedToSelectRecord(data);
                }
            });
        }
        else {
            this.proceedToSelectRecord(data);
        }
    }

    proceedToSelectRecord(records){
        this.dms.isSingleSaveBtnDisable = true;
        if ( records && records.imageId ) {
            this.service.imageSearch( records.imageId );
        }
        this.service.selectedOffender = records;
        // this.service.offenderSelected = {'offenderIdDisplay': records.offenderIdDisplay, 'bookingNo': records.bookingNo};
    }

    selectAndCloseRecord( data ) {
        this.selectRecord( data );
        //Close the Search bar.
        this.appbarService.showSearchBlock = false;
    }
    // From ControlValueAccessor interface
    writeValue( value: any ) {
        if ( value !== this.value ) {
            if ( value === null ) {
                value = undefined;
            }
            this.value = value;
        }
    }

    // From ControlValueAccessor interface
    registerOnChange( fn: any ) {
        this.onChangeCallback = fn;
    }

    // From ControlValueAccessor interface
    registerOnTouched( fn: any ) {
        this.onTouchedCallback = fn;
    }

    ngOnDestroy() {
        this.unsubscribe.next();
        this.unsubscribe.complete();
    }

    closeSearch() {
        const fieldElement = <HTMLInputElement>document.getElementById( 'search-block' );
        fieldElement.style.display = 'none';
        this.searchElement.classList.remove( "search-open" );
    }

    get trustModuleScreens(): any[] {
        return ['/OCDADJBE', '/OCDBIREV', '/OCDBRECI', '/OCDCAPAY', '/OCDCASHR', '/OCDCPPAY', '/OCDCREFU', '/OCDGENSN',
            '/OCDOOBLI', '/OCDOTFEE', '/OCDPAYOB', '/OCDRECEI', '/OCDSNVER', '/OCICBENE', '/OCIDOACC', '/OCIPBENE',
            '/OCIPPHIS', '/OCMCOACT', '/OCMDEDUT', '/OCMGOBLI', '/OCMMPBAL', '/OCMSNOTI', '/OCMTFEES', '/OCMTRANS',
            '/OCMTROPS', '/OCSRECEI', '/OCSSNOTI', '/OCUCOREF', '/OCUDPDIS', '/OCUGLTRD', '/OCUOBHIS', '/OCUOTRAH',
            '/OCUOVROB', '/OCUPAYPL', '/OCUTRAHI', '/OFFPINNU', '/OIDQBOOK', '/OMSIREPS', '/OMSRELST', '/OOMOPOSF',
            '/OOMSTAFF', '/OOMWORKL', '/OTDAACCO', '/OTDADMIT', '/OTDAGJTR', '/OTDALLOC', '/OTDAUREC', '/OTDBACLR',
            '/OTDBACRE', '/OTDBAREC', '/OTDCASHR', '/OTDCLACP', '/OTDCLOSE', '/OTDCLOSP', '/OTDCNSER', '/OTDCRVOI',
            '/OTDDISBU', '/OTDDSBAL', '/OTDFCRCO', '/OTDGLIRT', '/OTDHIREM', '/OTDHOLDT', '/OTDMGJTR', '/OTDMMTRN',
            '/OTDNPSTS', '/OTDOALLO', '/OTDOCFEE', '/OTDOFADV', '/OTDOFREZ', '/OTDOOBLI', '/OTDOPCTA', '/OTDOTFEE',
            '/OTDPAYOB', '/OTDPDTRA', '/OTDPPDTR', '/OTDRCALL', '/OTDRDTFU', '/OTDRECEI', '/OTDRTTFU', '/OTDSCPAY',
            '/OTDSDEDU', '/OTDSHIFT', '/OTDSUBAT', '/OTDTTACC', '/OTDWA001', '/OTIDATHY', '/OTIDSENQ', '/OTIDTACC',
            '/OTIGLBAL', '/OTINAMES', '/OTINPENQ', '/OTIOPINQ', '/OTIOSUBV', '/OTMACPRD', '/OTMALPRO', '/OTMARMAP',
            '/OTMBACCO', '/OTMCFEES', '/OTMCNSER', '/OTMCOACT', '/OTMCOPRO', '/OTMCPRIN', '/OTMCSLIM', '/OTMDEDUT',
            '/OTMDEMOG', '/OTMDPRIO', '/OTMFOPRO', '/OTMFREEZ', '/OTMIDTRN', '/OTMISAMB', '/OTMLOCKR', '/OTMMBALA',
            '/OTMOFLIM', '/OTMONCOA', '/OTMOSUBV', '/OTMOTXPR', '/OTMPDLIM', '/OTMREMIT', '/OTMRNSER', '/OTMRPBAL',
            '/OTMSCPAY', '/OTMTAXRE', '/OTMTFPRO', '/OTMTRANS', '/OTMTROPS', '/OTMTXRAT', '/OTMWA001', '/OTRCHECK',
            '/OTSDJLOG', '/OTSINDIS', '/OTSRECEI', '/OTSTASTA', '/OTSTAXRE', '/OTSTXGEN', '/OTUACODE', '/OTUBRDAT',
            '/OTUCOBWH', '/OTUCOBWO', '/OTUCPAYE', '/OTUCSLID', '/OTUCSTRN', '/OTUDDETA', '/OTUDTYPE', '/OTUGLTRD',
            '/OTUHOLDR', '/OTUINVAC', '/OTUOFFID', '/OTUPAYIN', '/OTUPDDET', '/OTUPREFI', '/OTURECON', '/OTURNUMB',
            '/OTUSUBAC', '/OTUSUBAD', '/OUMCFPRI', '/OUMEOTRN', '/OUMINTEV', '/OUMPURGE', '/OCDOFACC', '/OCDADJUS'];
    }

    onCheckBoxChange(event) {

        this.search();
      }

      onlyAlphabetallowed(event:any){
        let charcode = event.keyCode;
        if (charcode == 39  || charcode == 32 || charcode == 45 || (charcode >= 65 && charcode <= 90) || (charcode >= 97 && charcode <= 122)){
            return true; //validation for " ' , a-z , A-Z "
        }  
        return false;
    }
}
