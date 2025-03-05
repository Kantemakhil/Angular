import { Component, Input, OnInit } from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { DateFormat } from '../datepicker/dateFormat';
import { Router } from '@angular/router';
import { UserSessionManager } from '@core/classes/userSessionManager';
@Component({
    selector: 's4-header-block',
    templateUrl: './header-block.component.html',
    styleUrls: ['./header-block.component.scss']
})
export class HeaderBlockComponent implements OnInit {

    private innerOffender: any = {};

    @Input() bookingDetails = true;
    innerlink = "/INSDSBVW";
    innerModal :any;
    innerQuery:any;
    offenderFullName: any;
    isTrustScreen: boolean;
    isCommunityScreen = false;
    disableAlert = true;
    dateFormat = DateFormat.dateFormat;

   constructor(public translateService: TranslateService, private route: Router, public sessionManager: UserSessionManager) { }

    ngOnInit() {
      if (this.sessionManager.currentCaseLoadType === 'COMM') { // community header code implemented.
            this.isCommunityScreen = true;
            this.bookingDetails = false;
        }
        this.isTrustScreen =  this.trustModuleScreens.includes(this.route.url);
    }
    
    
    
    get queryParam(): any {
        return this.innerQuery;
    }
    @Input()
    set queryParam(inputQuery : any) {
        if(inputQuery) {
            this.innerQuery = inputQuery;
        }
    }
    
    
    
    get modalData(): any {
        return this.innerModal;
    }
    @Input()
    set modalData(inputModal : any) {
        if(inputModal) {
            this.innerModal = inputModal;
        }
    }
    
    
    get link(): any {
        return this.innerlink;
    }
    @Input()
    set link(inputlink : any) {
        if(inputlink) {
            this.innerlink = inputlink;
        }
    }

    get offender(): any {
        return this.innerOffender;
    }

    @Input()
    set offender(v: any) {
        if (this.innerOffender !== v) {
            if (v) {
                this.innerOffender.offenderFullName ='';
                if (this.trustModuleScreens.includes(this.route.url) && !v.trustAccount) { // code implemented for issue S4-3335
                    this.innerOffender = {};
                    this.disableAlert = true;
                    return;
                }
                if (v.birthDate && !(v.birthDate instanceof Date)) {
                    v.birthDate = DateFormat.getDate(v.birthDate);
                   
                }
                this.innerOffender = v;
                if(this.innerOffender.lastName && this.innerOffender.firstName && this.innerOffender.middleName){
                this.innerOffender.offenderFullName = this.innerOffender.lastName + ', ' + this.innerOffender.firstName +
                ' ' + this.innerOffender.middleName;
                }else if(this.innerOffender.lastName && this.innerOffender.firstName){
                    this.innerOffender.offenderFullName = this.innerOffender.lastName + ', ' + this.innerOffender.firstName;
                } else {
                    this.innerOffender.offenderFullName = this.innerOffender.lastName;
                }
                if ( !this.innerOffender.offenderIdDisplay ) {
                    this.disableAlert = true;
                } else if(!this.innerOffender.offAlerts) {
                    this.disableAlert = true; 
                } else {
                    this.disableAlert = false;
                }
            } else {
                this.innerOffender = {};
                this.disableAlert = true;
                this.innerOffender.offenderFullName ='';
            }
        }
    }

    get trustModuleScreens (): any[] {
        return ['/OCDADJBE',    '/OCDBIREV',    '/OCDBRECI',    '/OCDCAPAY',    '/OCDCASHR',    '/OCDCPPAY',    '/OCDCREFU',    '/OCDGENSN',
        '/OCDOOBLI',    '/OCDOTFEE',    '/OCDPAYOB',    '/OCDRECEI',    '/OCDSNVER',    '/OCICBENE',    '/OCIDOACC',    '/OCIPBENE',
        '/OCIPPHIS',    '/OCMCOACT',    '/OCMDEDUT',    '/OCMGOBLI',    '/OCMMPBAL',    '/OCMSNOTI',    '/OCMTFEES',    '/OCMTRANS',
        '/OCMTROPS',    '/OCSRECEI',    '/OCSSNOTI',    '/OCUCOREF',    '/OCUDPDIS',    '/OCUGLTRD',    '/OCUOBHIS',    '/OCUOTRAH',
        '/OCUOVROB',    '/OCUPAYPL',    '/OCUTRAHI',    '/OFFPINNU',    '/OIDQBOOK',    '/OMSIREPS',    '/OMSRELST',    '/OOMOPOSF',
        '/OOMSTAFF',    '/OOMWORKL',    '/OTDAACCO',    '/OTDADMIT',    '/OTDAGJTR',    '/OTDALLOC',    '/OTDAUREC',    '/OTDBACLR',
        '/OTDBACRE',    '/OTDBAREC',    '/OTDCASHR',    '/OTDCLACP',    '/OTDCLOSE',    '/OTDCLOSP',    '/OTDCNSER',    '/OTDCRVOI',
        '/OTDDISBU',    '/OTDDSBAL',    '/OTDFCRCO',    '/OTDGLIRT',    '/OTDHIREM',    '/OTDHOLDT',    '/OTDMGJTR',    '/OTDMMTRN',
        '/OTDNPSTS',    '/OTDOALLO',    '/OTDOCFEE',    '/OTDOFADV',    '/OTDOFREZ',    '/OTDOOBLI',    '/OTDOPCTA',    '/OTDOTFEE',
        '/OTDPAYOB',    '/OTDPDTRA',    '/OTDPPDTR',    '/OTDRCALL',    '/OTDRDTFU',    '/OTDRECEI',    '/OTDRTTFU',    '/OTDSCPAY',
        '/OTDSDEDU',    '/OTDSHIFT',    '/OTDSUBAT',    '/OTDTTACC',    '/OTDWA001',    '/OTIDATHY',    '/OTIDSENQ',    '/OTIDTACC',
        '/OTIGLBAL',    '/OTINAMES',    '/OTINPENQ',    '/OTIOPINQ',    '/OTIOSUBV',    '/OTMACPRD',    '/OTMALPRO',    '/OTMARMAP',
        '/OTMBACCO',    '/OTMCFEES',    '/OTMCNSER',    '/OTMCOACT',    '/OTMCOPRO',    '/OTMCPRIN',    '/OTMCSLIM',    '/OTMDEDUT',
        '/OTMDEMOG',    '/OTMDPRIO',    '/OTMFOPRO',    '/OTMFREEZ',    '/OTMIDTRN',    '/OTMISAMB',    '/OTMLOCKR',    '/OTMMBALA',
        '/OTMOFLIM',    '/OTMONCOA',    '/OTMOSUBV',    '/OTMOTXPR',    '/OTMPDLIM',    '/OTMREMIT',    '/OTMRNSER',    '/OTMRPBAL',
        '/OTMSCPAY',    '/OTMTAXRE',    '/OTMTFPRO',    '/OTMTRANS',    '/OTMTROPS',    '/OTMTXRAT',    '/OTMWA001',    '/OTRCHECK',
        '/OTSDJLOG',    '/OTSINDIS',    '/OTSRECEI',    '/OTSTASTA',    '/OTSTAXRE',    '/OTSTXGEN',    '/OTUACODE',    '/OTUBRDAT',
        '/OTUCOBWH',    '/OTUCOBWO',    '/OTUCPAYE',    '/OTUCSLID',    '/OTUCSTRN',    '/OTUDDETA',    '/OTUDTYPE',    '/OTUGLTRD',
        '/OTUHOLDR',    '/OTUINVAC',    '/OTUOFFID',    '/OTUPAYIN',    '/OTUPDDET',    '/OTUPREFI',    '/OTURECON',    '/OTURNUMB',
        '/OTUSUBAC',    '/OTUSUBAD',    '/OUMCFPRI',    '/OUMEOTRN',    '/OUMINTEV',    '/OUMPURGE',    '/OCDOFACC'];
    }
}
