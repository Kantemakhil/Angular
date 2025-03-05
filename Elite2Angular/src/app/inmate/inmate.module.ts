import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UiComponentsModule } from '@ui-components/ui-components.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CommonModule } from '@angular/common';
import { OtidtaccService } from '@inmate/trust/trustaccounts/service/otidtacc.service';
import { OtidtaccComponent } from '@inmate/trust/trustaccounts/view/otidtacc.component';
import { OtdrdtfuService } from '@inmate/trust/trustaccounts/service/otdrdtfu.service';
import { OtdrdtfuComponent } from '@inmate/trust/trustaccounts/view/otdrdtfu.component';
import { OtusubacService } from '@inmate/trust/trustaccounts/service/otusubac.service';
import { OtusubacComponent } from '@inmate/trust/trustaccounts/view/otusubac.component';
import { OtddisbuService } from '@inmate/trust/trustaccounts/service/otddisbu.service';
import { OtddisbuComponent } from '@inmate/trust/trustaccounts/view/otddisbu.component';
import { OtdholdtComponent } from '@inmate/trust/trustaccounts/view/otdholdt.component';
import { OtdholdtService } from '@inmate/trust/trustaccounts/service/otdholdt.service';
import { OtinamesComponent } from '@inmate/view/otinames.component';
import { OtinamesService } from '@inmate/service/otinames.service';
import { OtucpayeService } from '@inmate/trust/trustaccounts/service/otucpaye.service';
import { OtucpayeComponent } from '@inmate/trust/trustaccounts/view/otucpaye.component';
import { OcuovrobComponent } from '@inmate/trust/trustaccounts/view/ocuovrob.component';
import { OcuovrobService } from '@inmate/trust/trustaccounts/service/ocuovrob.service';
import { OtmremitComponent } from '@inmate/trust/trustaccounts/view/otmremit.component';
import { OtmremitService } from '@inmate/trust/trustaccounts/service/otmremit.service';
import { OtdttaccService } from '@inmate/trust/trustaccounts/service/otdttacc.service';
import { OtdttaccComponent } from '@inmate/trust/trustaccounts/view/otdttacc.component';
import { OtdoalloComponent } from '@inmate/trust/deductions/view/otdoallo.component';
import { OtdoalloService } from '@inmate/trust/deductions/service/otdoallo.service';
import { OtdcloseComponent } from '@inmate/trust/trustaccounts/view/otdclose.component';
import { OtdcloseService } from '@inmate/trust/trustaccounts/service/otdclose.service';
import { OtinamesdialogComponent } from '@inmate/view/otinamesdialog.component';
import { OtdreceiComponent } from '@inmate/trust/trustaccounts/view/otdrecei.component';
import { OtdreceiService } from '@inmate/trust/trustaccounts/service/otdrecei.service';
import { OcdpayobComponent } from '@inmate/trust/deductions/view/ocdpayob.component';
import { OcdpayobService } from '@inmate/trust/deductions/service/ocdpayob.service';
import { OtdhiremComponent } from '@inmate/trust/trustaccounts/view/otdhirem.component';
import { OtdhiremService } from '@inmate/trust/trustaccounts/service/otdhirem.service';
import { OcicbeneComponent } from '@inmatetrustdeductions/beneficiaryinquiry/view/ocicbene.component';
import { OcicbeneService } from '@inmatetrustdeductions/beneficiaryinquiry/service/ocicbene.service';
import { OcdcashrService } from '@inmate/trust/generalledger/service/ocdcashr.service';
import { OcdcashrComponent } from '@inmate/trust/generalledger/view/ocdcashr.component';
import { OtdmgjtrComponent } from '@inmate/trust/generalledger/view/otdmgjtr.component';
import { OtdmgjtrService } from '@inmate/trust/generalledger/service/otdmgjtr.service';
import { OtdopctaComponent } from '@inmate/trust/trustaccounts/view/otdopcta.component';
import { OtdopctaService } from '@inmate/trust/trustaccounts/service/otdopcta.service';
import { OcuobhisComponent } from '@inmatetrustdeductions/view/ocuobhis.component';
import { OcuobhisService } from '@inmatetrustdeductions/service/ocuobhis.service';
import { OcipbeneComponent } from '@inmate/trust/deductions/beneficiaryinquiry/view/ocipbene.component';
import { OcipbeneService } from '@inmate/trust/deductions/beneficiaryinquiry/service/ocipbene.service';
import { OtidtaccdialogComponent } from '@inmate/trust/trustaccounts/view/otidtaccdialog.component';
import { OtdsubatComponent } from '@inmate/trust/trustaccounts/view/otdsubat.component';
import { OtdsubatService } from '@inmate/trust/trustaccounts/service/otdsubat.service';
import { OtdaaccoComponent } from '@inmate/trust/trustaccounts/view/otdaacco.component';
import { OtdaaccoService } from '@inmate/trust/trustaccounts/service/otdaacco.service';
import { OsureporComponent } from '@inmate/trust/financialreports/view/osurepor.component';
import { OsureporService } from '@inmate/trust/financialreports/service/osurepor.service';
import { OcdoobliService } from '@inmate/trust/deductions/service/ocdoobli.service';
import { OcdoobliComponent } from '@inmate/trust/deductions/view/ocdoobli.component';
import { OtdsdeduService } from '@inmate/trust/deductions/service/otdsdedu.service';
import { OtdsdeduComponent } from '@inmate/trust/deductions/view/otdsdedu.component';
import { OtdofrezComponent } from '@inmate/trust/trustaccounts/view/otdofrez.component';
import { OtdofrezService } from '@inmate/trust/trustaccounts/service/otdofrez.service';
import { OtiopinqComponent } from '@inmate/trust/deductions/view/otiopinq.component';
import { OtiopinqService } from '@inmate/trust/deductions/service/otiopinq.service';
import { OcdotfeeComponent } from '@inmate/trust/deductions/view/ocdotfee.component';
import { OcdotfeeService } from '@inmate/trust/deductions/service/ocdotfee.service';
// import { OtsindisComponent } from '@inmate/trust/financialreports/view/otsindis.component';
// import { OtsindisService } from '@inmate/trust/financialreports/service/otsindis.service';
import { OtdbacreService } from '@inmate/trust/generalledger/service/otdbacre.service';
import { OtdbacreComponent } from '@inmate/trust/generalledger/view/otdbacre.component';
// import { OtsdjlogService } from '@inmate/trust/financialreports/service/otsdjlog.service';
// import { OtsdjlogComponent } from '@inmate/trust/financialreports/view/otsdjlog.component';
// import { OtmdemogComponent } from '@inmate/trust/financialreports/view/otmdemog.component';
// import { OtmdemogService } from '@inmate/trust/financialreports/service/otmdemog.service';
import { OtdrttfuComponent } from '@inmate/trust/trustaccounts/view/otdrttfu.component';
import { OtdrttfuService } from '@inmate/trust/trustaccounts/service/otdrttfu.service';
import { OtiglbalComponent } from '@inmate/trust/generalledger/view/otiglbal.component';
import { OtiglbalService } from '@inmate/trust/generalledger/service/otiglbal.service';
// import { OtdaurecComponent } from '@inmate/trust/generalledger/view/otdaurec.component';
// import { OtdaurecService } from '@inmate/trust/generalledger/service/otdaurec.service';
import { OtsreceiComponent } from '@inmate/trust/statements/view/otsrecei.component';
import { OtsreceiService } from '@inmate/trust/statements/service/otsrecei.service';
import { OcusrepsComponent } from '@inmate/trust/financialreports/view/ocusreps.component';
import { OcusrepsService } from '@inmate/trust/financialreports/service/ocusreps.service';
import { OtusubadComponent } from '@inmate/trust/trustaccounts/view/otusubad.component';
import { OtusubadService } from '@inmate/trust/trustaccounts/service/otusubad.service';
import { OtdglirtComponent } from '@inmate/trust/generalledger/view/otdglirt.component';
import { OtdglirtService } from '@inmate/trust/generalledger/service/otdglirt.service';
// import { OtrcheckComponent } from '@inmate/trust/checks/view/otrcheck.component';
// import { OtrcheckService } from '@inmate/trust/checks/service/otrcheck.service';
import { OtdcntacComponent } from '@inmate/trust/financialsmaintenance/view/otdcntac.component';
import { OtdcntacService } from '@inmate/trust/financialsmaintenance/service/otdcntac.service';
import { OcdcbeneComponent } from '@inmate/trust/deductions/view/ocdcbene.component';
import { OcdcbeneService } from '@inmate/trust/deductions/service/ocdcbene.service';
import { OcdcbenedialogComponent } from '@inmate/trust/deductions/view/ocdcbenedialog.component';
import { OtdcrvoiComponent } from '@inmate/trust/checks/view/otdcrvoi.component';
import { OtdcrvoiService } from '@inmate/trust/checks/service/otdcrvoi.service';
import { OtdglirtdialogComponent } from '@inmate/trust/generalledger/view/otdglirtdialog.component';
import { OtucobwhComponent } from '@inmate/trust/deductions/view/otucobwh.component';
import { OtucobwhService } from '@inmate/trust/deductions/service/otucobwh.service';
// import { OcdbirevComponent } from '@inmate/trust/generalledger/view/ocdbirev.component';
// import { OcdbirevService } from '@inmate/trust/generalledger/service/ocdbirev.service';
import { OtstastaService } from '@inmate/trust/statements/service/otstasta.service';
import { OtstastaComponent } from '@inmate/trust/statements/view/otstasta.component';
import { OtdclinaComponent } from '@inmate/trust/trustaccounts/view/otdclina.component';
import { OtdclinaService } from '@inmate/trust/trustaccounts/service/otdclina.service';
import { OcutrahiService } from '@inmate/trust/deductions/beneficiaryinquiry/service/ocutrahi.service';
import { OcutrahiComponent } from '@inmate/trust/deductions/beneficiaryinquiry/view/ocutrahi.component';
import { OtdagjtrService } from '@inmate/trust/generalledger/service/otdagjtr.service';
import { OtdagjtrComponent } from '@inmate/trust/generalledger/view/otdagjtr.component';
import { OtupayinService } from '@inmate/trust/trustaccounts/service/otupayin.service';
import { OtupayinComponent } from '@inmate/trust/trustaccounts/view/otupayin.component';
import { OtugltrdService } from '@inmate/trust/trustaccounts/service/otugltrd.service';
import { OtugltrdComponent } from '@inmate/trust/trustaccounts/view/otugltrd.component';
import { OcmtransService } from '@inmate/trust/financialsmaintenance/transaction/service/ocmtrans.service';
import { OcmtransComponent } from '@inmate/trust/financialsmaintenance/transaction/view/ocmtrans.component';
import { OcmtropsComponent } from '@inmate/trust/financialsmaintenance/transaction/view/ocmtrops.component';
import { OcmtropsService } from '@inmate/trust/financialsmaintenance/transaction/service/ocmtrops.service';
import { OtuinvacComponent } from '@inmate/trust/financialsmaintenance/transaction/view/otuinvac.component';
import { OtuinvacService } from '@inmate/trust/financialsmaintenance/transaction/service/otuinvac.service';
import { OtmfreezComponent } from '@inmate/trust/financialsmaintenance/view/otmfreez.component';
import { OtmfreezService } from '@inmate/trust/financialsmaintenance/service/otmfreez.service';
import { OcmmpbalComponent } from '@inmate/trust/deductions/deductionsmaintenance/view/ocmmpbal.component';
import { OcmmpbalService } from '@inmate/trust/deductions/deductionsmaintenance/service/ocmmpbal.service';
import { OtmtfproComponent } from '@inmate/trust/deductions/deductionsmaintenance/view/otmtfpro.component';
import { OtmtfproService } from '@inmate/trust/deductions/deductionsmaintenance/service/otmtfpro.service';
import { OtucobwoComponent } from '@inmate/trust/deductions/view/otucobwo.component';
import { OtucobwoService } from '@inmate/trust/deductions/service/otucobwo.service';
import { OcmdedutComponent } from '@inmate/trust/deductions/deductionsmaintenance/view/ocmdedut.component';
import { OcmdedutService } from '@inmate/trust/deductions/deductionsmaintenance/service/ocmdedut.service';
import { OtmalproComponent } from '@inmate/trust/deductions/deductionsmaintenance/view/otmalpro.component';
import { OtmalproService } from '@inmate/trust/deductions/deductionsmaintenance/service/otmalpro.service';
import { OtmdprioComponent } from '@inmate/trust/deductions/deductionsmaintenance/view/otmdprio.component';
import { OtmdprioService } from '@inmate/trust/deductions/deductionsmaintenance/service/otmdprio.service';
import { OtmfoproComponent } from '@inmate/trust/deductions/deductionsmaintenance/view/otmfopro.component';
import { OtmfoproService } from '@inmate/trust/deductions/deductionsmaintenance/service/otmfopro.service';
import { OtmcoproService } from './trust/deductions/deductionsmaintenance/service/otmcopro.service';
import { OtmcoproComponent } from './trust/deductions/deductionsmaintenance/view/otmcopro.component';
import { OtuholdrComponent } from '@inmate/trust/trustaccounts/view/otuholdr.component';
import { OtuholdrService } from '@inmate/trust/trustaccounts/service/otuholdr.service';
import { OtmcprinComponent } from '@inmate/trust/checks/checksmaintenance/view/otmcprin.component';
import { OtmcprinService } from '@inmate/trust/checks/checksmaintenance/service/otmcprin.service';
import { OtmcnserComponent } from '@inmate/trust/checks/checksmaintenance/view/otmcnser.component';
import { OtmcnserService } from '@inmate/trust/checks/checksmaintenance/service/otmcnser.service';
import { OtmacprdComponent } from '@inmate/trust/financialsmaintenance/transaction/view/otmacprd.component';
import { OtmacprdService } from '@inmate/trust/financialsmaintenance/transaction/service/otmacprd.service';
import { OtmoncoaComponent } from '@inmate/trust/financialsmaintenance/transaction/view/otmoncoa.component';
import { OtmoncoaService } from '@inmate/trust/financialsmaintenance/transaction/service/otmoncoa.service';
import { OtmcslimComponent } from '@inmate/trust/financialsmaintenance/view/otmcslim.component';
import { OtmcslimService } from '@inmate/trust/financialsmaintenance/service/otmcslim.service';
import { OcmcoactComponent } from '@inmate/trust/financialsmaintenance/transaction/view/ocmcoact.component';
import { OcmcoactService } from '@inmate/trust/financialsmaintenance/transaction/service/ocmcoact.service';
import { OtmbaccoComponent } from '@inmate/trust/checks/checksmaintenance/view/otmbacco.component';
import { OtmbaccoService } from '@inmate/trust/checks/checksmaintenance/service/otmbacco.service';
import { OturnumbComponent } from '@inmate/trust/statements/view/oturnumb.component';
import { OturnumbService } from '@inmate/trust/statements/service/oturnumb.service';
import { OumagencComponent } from '@inmate/trust/financialsmaintenance/payees/view/oumagenc.component';
import { OumagencService } from '@inmate/trust/financialsmaintenance/payees/service/oumagenc.service';
import { OcucorptComponent } from '@inmate/trust/financialsmaintenance/payees/view/ocucorpt.component';
import { OcucorptService } from '@inmate/trust/financialsmaintenance/payees/service/ocucorpt.service';
import { ContactBusinessComponent } from '@inmate/trust/financialsmaintenance/payees/view/contactbusiness';
import { OtuacodeComponent } from '@inmate/trust/financialreports/view/otuacode.component';
import { OtuacodeService } from '@inmate/trust/financialreports/service/otuacode.service';
import { OumagencDialogComponent } from '@inmate/trust/financialsmaintenance/payees/view/oumagencdialog.component';
import { OtmoflimComponent } from '@inmate/trust/financialsmaintenance/view/otmoflim.component';
import { OtmoflimService } from '@inmate/trust/financialsmaintenance/service/otmoflim.service';
import { OtmmbalaComponent } from '@inmate/trust/financialsmaintenance/view/otmmbala.component';
import { OtmmbalaService } from '@inmate/trust/financialsmaintenance/service/otmmbala.service';
import { OtmisambComponent } from '@inmate/trust/financialsmaintenance/subaccounts/view/otmisamb.component';
import { OtmisambService } from '@inmate/trust/financialsmaintenance/subaccounts/service/otmisamb.service';
import { OiufsoffService } from '@inmate/trust/financialreports/service/oiufsoff.service';
import { OiufsoffComponent } from '@inmate/trust/financialreports/view/oiufsoff.component';
import { OiuhofflComponent } from '@inmate/trust/financialreports/view/oiuhoffl.component';
import { OiuhofflService } from '@inmate/trust/financialreports/service/oiuhoffl.service';

@NgModule({
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    declarations: [
        OtidtaccComponent,
        OtdrdtfuComponent,
        OtusubacComponent,
        OtddisbuComponent,
        OtdholdtComponent,
        OtinamesComponent,
        OtucpayeComponent,
        OcuovrobComponent,
        OtmremitComponent,
        OtdttaccComponent,
        OtdoalloComponent,
        OtdcloseComponent,
        OtinamesdialogComponent,
        OtdreceiComponent,
        OcdpayobComponent,
        OtdhiremComponent,
        OcicbeneComponent,
        OcdcashrComponent,
        OtdmgjtrComponent,
        OtdopctaComponent,
        OcuobhisComponent,
        OcipbeneComponent,
        OtidtaccdialogComponent,
        OtdsubatComponent,
        OtdaaccoComponent,
        OsureporComponent,
        OcdoobliComponent,
        OtdsdeduComponent,
        OtdofrezComponent,
        OtiopinqComponent,
        OcdotfeeComponent,
    //     OtsindisComponent,
        OtdbacreComponent,
    //     OtsdjlogComponent,
    //     OtmdemogComponent,
        OtdrttfuComponent,
        OtiglbalComponent,
    //     OtdaurecComponent,
        OtsreceiComponent,
        OcusrepsComponent,
        OtusubadComponent,
        OtdglirtComponent,
    //     OtrcheckComponent,
        OtdcntacComponent,
        OcdcbeneComponent,
        OcdcbenedialogComponent,
        OtdcrvoiComponent,
        OtdglirtdialogComponent,
        OtucobwhComponent,
    //     OcdbirevComponent,
        OtstastaComponent,
        OtdclinaComponent,
        OcutrahiComponent,
        OtdagjtrComponent,
        OtupayinComponent,
        OtugltrdComponent,
        OcmtransComponent,
        OcmtropsComponent,
        OtuinvacComponent,
        OtmfreezComponent,
        OcmmpbalComponent,
        OtmtfproComponent,
        OtucobwoComponent,
        OcmdedutComponent,
        OtmalproComponent,
        OtmdprioComponent,
        OtmfoproComponent,
        OtmcoproComponent,
        OtuholdrComponent,
        OtmcprinComponent,
        OtmcnserComponent,
        OtmacprdComponent,
        OtmoncoaComponent,
        OtmcslimComponent,
        OcmcoactComponent,
        OtmbaccoComponent,
        OturnumbComponent,
        OumagencComponent,
        OcucorptComponent,
        ContactBusinessComponent,
        OtuacodeComponent,
        OumagencDialogComponent,
        OtmoflimComponent,
        OtmmbalaComponent,
        OtmisambComponent,
        OiufsoffComponent,
        OiuhofflComponent,

    ],
    imports: [
        FormsModule,
        FlexLayoutModule,
        ReactiveFormsModule,
        UiComponentsModule,
        CommonModule
    ],
    exports: [
        UiComponentsModule,
        OtidtaccComponent,
        OtdrdtfuComponent,
        OtusubacComponent,
        OtddisbuComponent,
        OtdholdtComponent,
        OtinamesComponent,
        OtucpayeComponent,
        OcuovrobComponent,
        OtmremitComponent,
        OtdttaccComponent,
        OtdoalloComponent,
        OtdcloseComponent,
        OtinamesdialogComponent,
        OtdreceiComponent,
        OcdpayobComponent,
        OtdhiremComponent,
        OcicbeneComponent,
        OcdcashrComponent,
        OtdmgjtrComponent,
        OtdopctaComponent,
        OcuobhisComponent,
        OcipbeneComponent,
        OtidtaccdialogComponent,
        OtdsubatComponent,
        OtdaaccoComponent,
        OsureporComponent,
        OcdoobliComponent,
        OtdsdeduComponent,
        OtdofrezComponent,
        OtiopinqComponent,
        OcdotfeeComponent,
    //     OtsindisComponent,
        OtdbacreComponent,
    //     OtsdjlogComponent,
    //     OtmdemogComponent,
        OtdrttfuComponent,
        OtiglbalComponent,
    //     OtdaurecComponent,
        OtsreceiComponent,
        OcusrepsComponent,
        OtusubadComponent,
        OtdglirtComponent,
    //     OtrcheckComponent,
        OtdcntacComponent,
        OcdcbeneComponent,
        OcdcbenedialogComponent,
        OtdcrvoiComponent,
        OtdglirtdialogComponent,
        OtucobwhComponent,
    //     OcdbirevComponent,
        OtstastaComponent,
        OtdclinaComponent,
        OcutrahiComponent,
        OtdagjtrComponent,
        OtupayinComponent,
        OtugltrdComponent,
        OcmtransComponent,
        OcmtropsComponent,
        OtuinvacComponent,
        OtmfreezComponent,
        OcmmpbalComponent,
        OtmtfproComponent,
        OtucobwoComponent,
        OcmdedutComponent,
        OtmalproComponent,
        OtmdprioComponent,
        OtmfoproComponent,
        OtmcoproComponent,
        OtuholdrComponent,
        OtmcprinComponent,
        OtmcnserComponent,
        OtmacprdComponent,
        OtmoncoaComponent,
        OtmcslimComponent,
        OcmcoactComponent,
        OtmbaccoComponent,
        OturnumbComponent,
        OumagencComponent,
        OcucorptComponent,
        ContactBusinessComponent,
        OtuacodeComponent,
        OumagencDialogComponent,
        OtmoflimComponent,
        OtmmbalaComponent,
        OtmisambComponent,
        OiufsoffComponent,
        OiuhofflComponent,
    ],
    providers: [
        OtidtaccService,
        OtdrdtfuService,
        OtusubacService,
        OtddisbuService,
        OtdholdtService,
        OtinamesService,
        OtucpayeService,
        OcuovrobService,
        OtmremitService,
        OtdttaccService,
        OtdoalloService,
        OtdcloseService,
        OtdreceiService,
        OcdpayobService,
        OtdhiremService,
        OcicbeneService,
        OcdcashrService,
        OtdmgjtrService,
        OtdopctaService,
        OcuobhisService,
        OcipbeneService,
        OtdsubatService,
        OtdaaccoService,
        OsureporService,
        OcdoobliService,
        OtdsdeduService,
        OtdofrezService,
        OtiopinqService,
        OcdotfeeService,
    //     OtsindisService,
        OtdbacreService,
    //     OtsdjlogService,
    //     OtmdemogService,
        OtdrttfuService,
        OtiglbalService,
    //     OtdaurecService,
        OtsreceiService,
        OcusrepsService,
        OtusubadService,
        OtdglirtService,
    //     OtrcheckService,
        OtdcntacService,
        OcdcbeneService,
        OtdcrvoiService,
        OtucobwhService,
    //     OcdbirevService,
        OtstastaService,
        OtdclinaService,
        OcutrahiService,
        OtdagjtrService,
        OtupayinService,
        OtugltrdService,
        OcmtransService,
        OcmtropsService,
        OtuinvacService,
        OtmfreezService,
        OcmmpbalService,
        OtmtfproService,
        OtucobwoService,
        OcmdedutService,
        OtmalproService,
        OtmdprioService,
        OtmfoproService,
        OtmcoproService,
        OtuholdrService,
        OtmcprinService,
        OtmcnserService,
        OtmacprdService,
        OtmoncoaService,
        OtmcslimService,
        OcmcoactService,
        OtmbaccoService,
        OturnumbService,
        OumagencService,
        OcucorptService,
        OtuacodeService,
        OtmoflimService,
        OtmmbalaService,
        OtmisambService,
        OiufsoffService,
        OiuhofflService,
    ]
})
export class InmateModule { }
