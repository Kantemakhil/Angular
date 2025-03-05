import { DsbmodRendererComponent } from './dashboard-bi/dashboard-listing/dsbmod-renderer/dsbmod-renderer.component';
import { OdynfrmComponent } from './sa/admin/view/odynfrm.component';
import { OumucreatComponent } from '@sa/usersystemsecurity/view/oumucreat.component';
import { HousingAdministrationComponent } from './inst/movements/housing-administration/view/housing-administration.component';
// import { OcioffncComponent } from '@inst/legal/view/ocioffnc.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppHomeComponent } from './app-home/app-home.component';
import { DashBoardComponent } from './workspace/inmate-summary/dashboard.component';
import { PortalAppComponent } from './portal-app/portalapp.component';
import { PortalScheduleComponent } from './portal-app/portalschedule.component';
import { RejectDialogComponent } from './portal-app/rejectdialog.component';
import { ScheduleCalendarDialogComponent } from './workspace/inmate-summary/dashboard-component/schedule-dialog.component';
import { OsiosearComponent } from '@common/offender-records/view/osiosear.component';
import { OsioseardialogComponent } from '@common/offender-records/view/osioseardialog.component';
import { AppHomeDialogComponent } from './app-home/app-homedialog';
import { OiigrievComponent } from '@inst/offender-issues-tracking/view/oiigriev.component';
import { LandingPageComponent } from '@common/landing-page/landing-page.component';
import { LoginComponent } from '@common/login/login.component';
import { SsoLogoutComponent } from '@common/sso-logout/sso-logout.component';
import { ServerErrorComponent } from '@common/server-error/server-error.component';
import { OiuimageComponent } from '@inst/demographics-biometrics/view/oiuimage.component';
import { OcdaliasComponent } from '@inst/demographics-biometrics/view/ocdalias.component';
import { OidincdeComponent } from '@inst/incidents-oic/view/oidincde.component';
import { OcdalertComponent } from '@inst/demographics-biometrics/view/ocdalert.component';
import { OidoicusComponent } from '@inst/incidents-oic/view/oidoicus.component';
import { OcuoicinComponent } from '@inst/incidents-oic/view/ocuoicin.component';
import { OidpinfoComponent } from '@inst/demographics-biometrics/view/oidpinfo.component';
import { OcuoicheComponent } from '@inst/incidents-oic/view/ocuoiche.component';
import { OcdaddreComponent } from '@inst/demographics-biometrics/view/ocdaddre.component';
import { OcuoicchComponent } from '@inst/incidents-oic/view/ocuoicch.component';
import { OiioicusComponent } from '@inst/incidents-oic/view/oiioicus.component';
import { OimoicoidialogComponent } from '@inst/incidents-oic/view/Oimoicoidialog.component';
import { OimsrlucComponent } from '@inst/incidents-oic/maintenance/view/oimsrluc.component';
import { OcucoffeComponent } from '@common/offender-records/view/ocucoffe.component';
import { OidadmisComponent } from '@inst/demographics-biometrics/view/oidadmis.component';
import { OmuavbedComponent } from '@inst/demographics-biometrics/view/omuavbed.component';
import { OcuoichnComponent } from '@inst/incidents-oic/view/ocuoichn.component';
import { OidpidenComponent } from '@inst/demographics-biometrics/view/oidpiden.component';
import { OidreleaComponent } from '@inst/movement-external/view/oidrelea.component';
import { OcuoicawComponent } from '@inst/incidents-oic/view/ocuoicaw.component';
import { OimoicmpdialogComponent } from '@inst/incidents-oic/view/oimoicmpdialog.component';
import { OcuoicpeComponent } from '@inst/incidents-oic/view/ocuoicpe.component';
import { OcdsmemodialogComponent } from '@common/workspace/view/ocdsmemodialog.component';
import { OiiinlogpopupComponent } from '@inst/incidents-oic/view/oiiinlogpopup.component';
import { OiiinlogComponent } from '@inst/incidents-oic/view/oiiinlog.component';
import { OiustgasComponent } from '@inst/incidents-oic/view/oiustgas.component';
import { OiuincrpComponent } from '@inst/incidents-oic/view/oiuincrp.component';
import { OcdedempComponent } from '@inst/demographics-biometrics/view/ocdedemp.component';
import { OcdccontComponent } from '@inst/demographics-biometrics/view/ocdccont.component';
import { OcdgnumbComponent } from '@inst/demographics-biometrics/view/ocdgnumb.component';
import { OcdoapopComponent } from '@inst/demographics-biometrics/view/ocdoapop.component';
import { OcualertComponent } from '@common/offender-records/view/ocualert.component';
import { OumacaseComponent } from '@sa/admin/view/oumacase.component';
import { OumpersoComponent } from '@sa/usersystemsecurity/view/oumperso.component';
import { OumusersComponent } from '@sa/usersystemsecurity/view/oumusers.component';
import { OumaglocComponent } from '@sa/admin/view/oumagloc.component';
import { OumsypflComponent } from '@sa/admin/view/oumsypfl.component';
import { OumrolesComponent } from '@sa/usersystemsecurity/view/oumroles.component';
//import { OciofileComponent } from './legalorders/view/ociofile.component';
//import { OmuwkassComponent } from './legalorders/view/omuwkass.component';
import { OidmpconComponent } from '@inst/property/view/oidmpcon.component';
import { OiddpropComponent } from '@inst/property/view/oiddprop.component';
import { OumassmuComponent } from '@sa/usersystemsecurity/view/oumassmu.component';
import { OmsmoduleComponent } from '@sa/usersystemsecurity/view/omsmodule.component';
import { OmsrolesComponent } from '@sa/usersystemsecurity/view/omsroles.component';
import { OiiptranComponent } from '@inst/property/view/oiiptran.component';
import { OiipclocComponent } from '@inst/property/view/oiipcloc.component';
import { OidtpconComponent } from '@inst/property/view/oidtpcon.component';
import { OcusmoduComponent } from '@cm/programsservices/view/ocusmodu.component';
import { OumusersclComponent } from '@sa/usersystemsecurity/view/oumuserscl.component';
import { OumusersrlsComponent } from '@sa/usersystemsecurity/view/oumusersrls.component';
import { OumaglocpopComponent } from '@sa/usersystemsecurity/view/oumaglocpop.component';
import { OiinamesComponent } from '@inst/movement-external/view/oiinames.component';
import { OiditranComponent } from '@inst/movement-external/view/oiditran.component';
//import { OidtpritComponent } from '@inst/property/view/oidtprit.component';
import { OiipctraComponent } from '@inst/property/view/oiipctra.component';
import { OidvcontComponent } from '@inst/property/view/oidvcont.component';
import { OidrpitmComponent } from '@inst/property/view/oidrpitm.component';
import { OidrtconComponent } from '@inst/property/view/oidrtcon.component';
import { OidtrwjuComponent } from '@inst/movement-external/view/oidtrwju.component';
import { OcuoicawPopUpComponent } from '@inst/incidents-oic/view/ocuoicawpopup.component';
//import { OumapassComponent } from '@sa/usersystemsecurity/view/oumapass.component';
import { OcucoffeconfirmboxComponent } from '@common/offender-records/view/ocucoffeconfirmbox.component';
import { OumrcodeComponent } from '@sa/admin/view/oumrcode.component';
import { OidincdeChargePopUpComponent } from '@inst/incidents-oic/view/oidincdeChargepopup.component';
import { OiditranagylocsComponent } from '@inst/movement-external/view/oiditranagylocs.component';
import { OiustgaslovComponent } from '@inst/incidents-oic/view/oiustgaslov.component';
import { OidincdeStaffPopUpComponent } from '@inst/incidents-oic/view/oidincdeStaffPop.component';
import { OimuhebyComponent } from '@inst/incidents-oic/view/oimuheby.component';
import { OidstabsagylocpopupComponent } from '@inst/schedules/view/oidstabsagylocpopup.component';
import { OidstabsbuspopupComponent } from '@inst/schedules/view/oidstabsbuspopup.component';
import { OidstabsothpopupComponent } from '@inst/schedules/view/oidstabsothpopup.component';
import { OidstabsComponent } from '@inst/schedules/view/oidstabs.component';
import { OidscmovComponent } from '@inst/schedules/view/oidscmov.component';
import { OidscmovconfirmboxComponent } from '@inst/schedules/view/oidscmovconfirmbox.component';
import { OidscexmComponent } from '@inst/movement-external/view/oidscexm.component';
import { OiuscinqComponent } from '@inst/schedules/view/oiuscinq.component';
import { OcurwarnComponent } from '@inst/movement-external/view/ocurwarn.component';
import { OidtrojuComponent } from '@inst/movement-external/view/oidtroju.component';
import { OiiwltwjComponent } from '@inst/movement-external/view/oiiwltwj.component';
import { OiiemoveComponent } from '@inst/offenderspecific/view/oiiemove.component';
import { OidbutabComponent } from '@inst/movement-external/view/oidbutab.component';
import { OidstwjuComponent } from '@inst/schedules/view/oidstwju.component';
import { OidstojuComponent } from '@inst/schedules/view/oidstoju.component';
import { OidstwjuappbypopupComponent } from '@inst/schedules/view/oidstwjuappbypopup.component';
import { OidstwjuconfirmationpopupComponent } from '@inst/schedules/view/oidstwjuconfirmationpopup.component';
import { OcdclistComponent } from '@instlegalscreens/view/ocdclist.component';
import { OidbstrnComponent } from '@inst/movement-external/view/oidbstrn.component';
import { OidstwjudelnotifipopupComponent } from '@inst/schedules/view/oidstwjudelnotifipopup.component';
import { OidunctaComponent } from '@inst/movement-external/view/oiduncta.component';
import { OidescapComponent } from '@inst/movement-external/view/oidescap.component';
import { OmuerrcoComponent } from '@inst/movement-external/view/omuerrco.component';
import { OiioscedComponent } from '@inst/casemanagement/view/oiiosced.component';
import { OiicmociComponent } from '@inst/movement-external/view/oiicmoci.component';
import { IntakedialogComponent } from "../app/common/mini-header/intakedialog";
import { HelpVideoComponent } from "../app/common/help-media/helpvideo.component";
import { InmateIntakeSummaryComponent } from "../app/workspace/inmate-intake-summary/inmate-intake-summary.component";
import { OidbsiapComponent } from '@inst/schedules/view/oidbsiap.component';
import { OmuerrcoconfirmationpopupComponent } from '@inst/movement-external/view/omuerrcoconfirmationpopup.component';
import { OidintmvComponent } from '@inst/movements/view/oidintmv.component';
import { OiintlocComponent } from '@inst/movements/view/oiintloc.component';
import { OidsiappComponent } from '@inst/schedules/view/oidsiapp.component';
import { OiidmoveComponent } from '@inst/movement-external/view/oiidmove.component';
import { OcdccaseComponent } from '@inst/legal/view/ocdccase.component';
import { OcdchgsuComponent } from '@inst/legal/view/ocdchgsu.component';
import { OcdlegloComponent } from '@inst/legal/view/ocdleglo.component';
import { OcdbailoComponent } from '@inst/legal/view/ocdbailo.component';
import { OcdparorComponent } from '@inst/legal/view/ocdparor.component';
import { OcdleglnComponent } from '@inst/legal/view/ocdlegln.component';
import { OcdleglsComponent } from '@inst/legal/view/ocdlegls.component';
import { OidcrtevComponent } from '@inst/legal/view/oidcrtev.component';
import { OcuoffenComponent } from "@inst/legal/view/ocuoffen.component";
import { OumorcodComponent } from "@inst/legal/view/oumorcod.component";
import { OcuholdsComponent } from '@inst/legal/view/ocuholds.component';
import { OidrhlocComponent } from '@inst/movements/housingchanges/view/oidrhloc.component';
import { OidchlocComponent } from '@inst/movements/housingchanges/view/oidchloc.component';
import { OidcholoComponent } from '@inst/movements/housingchanges/view/oidcholo.component';
import { OsinamesComponent } from '@cm/searchassaign/view/osinames.component';
import { OmurmresComponent } from '@inst/movements/housingchanges/view/omurmres.component';
import { OmuavlocComponent } from '@inst/movements/housingchanges/view/omuavloc.component';
import { OsinamesdialogComponent } from '@cm/searchassaign/view/osinamesdialog.component';
import { OidadmisconfirmboxComponent } from '@inst/demographics-biometrics/view/oidadmisconfirmbox.component';
import { OidehlocComponent } from '@inst/movements/housingchanges/view/oidehloc.component';
import { OidciponComponent } from '@inst/care-in-placement/view/oidcipon.component';
import { OcuwarngComponent } from '@inst/movements/housingchanges/view/ocuwarng.component';
import { OiinamesdialogComponent } from '@inst/movement-external/view/oiinamesdialog.component';
import { OidehlocconfirmationpopupComponent } from '@inst/movements/housingchanges/view/oidehlocconfirmationpopup.component';
import { OcuccideComponent } from "@inst/legal/view/ocuccide.component";
import { OcupsrdeComponent } from '@inst/legal/view/ocupsrde.component';
import { OculcaseComponent } from '@inst/legal/view/oculcase.component';
import { OidcnoteComponent } from '@inst/casemanagement/view/oidcnote.component';
import { OcdlangsComponent } from '@inst/demographics-biometrics/view/ocdlangs.component';
import { OcdnoqueComponent } from '@inst/classification/view/ocdnoque.component';
import { OidmhistComponent } from '@inst/demographics-biometrics/view/oidmhist.component';
import { OidcapprComponent } from '@inst/classification/view/oidcappr.component';
import { OcunoqueComponent } from '@inst/classification/view/ocunoque.component';
import { OmuclassComponent } from '@inst/classification/view/omuclass.component';
import { OiiclassComponent } from '@inst/classification/view/oiiclass.component';
import { OcunotcmComponent } from '@inst/casemanagement/view/ocunotcm.component';
import { OcucalcrComponent } from "@inst/legal/view/ocucalcr.component";
import { OcusofncComponent } from "@inst/legal/view/ocusofnc.component";
import { OcustfasComponent } from '@inst/casemanagement/view/ocustfas.component';
import { OciiplanComponent } from '@inst/casemanagement/view/ociiplan.component';
import { OiiiscouComponent } from '@inst/casemanagement/view/oiiiscou.component';
import { OcustfaspopupComponent } from '@inst/casemanagement/view/ocustfaspopup.component';
import { OcutasatComponent } from '@inst/casemanagement/view/ocutasat.component';
import { OidshlogComponent } from '@inst/shift-logs/view/oidshlog.component';
import { OiishlogComponent } from '@inst/shift-logs/view/oiishlog.component';
import { OidistatComponent } from '@inst/casemanagement/view/oidistat.component';
import { OidshlogconfirmationpopupComponent } from '@inst/shift-logs/view/oidshlogconfirmationpopup.component';
import { OcdiplanComponent } from '@inst/casemanagement/view/ocdiplan.component';
import { OidrplanComponent } from '@inst/movement-external/view/oidrplan.component';
import { OidrplanpopupComponent } from '@inst/movement-external/view/oidrplanpopup.component';
import { OiishlogdetailspopupComponent } from '@inst/shift-logs/view/oiishlogdetailspopup.component';
import { OcucnameComponent } from '@inst/casemanagement/view/ocucname.component';
import { OciocnotComponent } from '@inst/casemanagement/view/ociocnot.component';
import { OiddecasComponent } from "@inst/legal/view/oiddecas.component";
import { OiddecasconfirmboxComponent } from "@inst/legal/view/oiddecasconfirmbox.component";
import { OcdlegstComponent } from "@inst/legal/view/ocdlegst.component";
import { OculegstComponent } from '@inst/legal/view/oculegst.component';
import { OculegstSentenceComponent } from "@inst/legal/view/oculegst-sentence.component";
import { OculegstConditionComponent } from "@inst/legal/view/oculegstCondition.component";
import { OcucondiComponent } from "@inst/legal/view/ocucondi.component";
import { OidojoinComponent } from "@inst/legal/view/oidojoin.component";
import { OidrplanproposedemplomentpopupComponent } from '@inst/movement-external/view/oidrplanproposedemplomentpopup.component';
import { OcdpersoComponent } from '@inst/demographics-biometrics/view/ocdperso.component';
import { OsipsearComponent } from '@inst/visits-management/view/osipsear.component';
import { OcucnperComponent } from '@inst/visits-management/view/ocucnper.component';
import { OcuperprComponent } from '@inst/visits-management/view/ocuperpr.component';
import { OcuoccupComponent } from '@inst/inquiries/view/ocuoccup.component';
import { OiiprollComponent } from '@inst/automated-counts/view/oiiproll.component';
import { OidremcsComponent } from '@inst/automated-counts/view/oidremcs.component';
import { OidcountComponent } from '@inst/automated-counts/view/oidcount.component';
import { OidcountloaderComponent } from '@inst/automated-counts/view/oidcountloader.component';
import { OiiunrolComponent } from '@inst/automated-counts/view/oiiunrol.component';
import { OiiinrolComponent } from '@inst/automated-counts/view/oiiinrol.component';
import { OcuverifComponent } from '@inst/demographics-biometrics/view/ocuverif.component';
import { OcuoccupnamedlgComponent } from '@inst/inquiries/view/ocuoccupnamedlg.component';
import { OcucloffComponent } from '@inst/visits-management/view/ocucloff.component';
import { OidsublcComponent } from '@inst/automated-counts/view/oidsublc.component';
import { OidcountPopUpComponent } from '@inst/automated-counts/view/oidcountpopup.component';
import { OffenderScheduleComponent } from '@inst/schedules/view/offenderschedule.component';
import { OidverccComponent } from '@inst/automated-counts/view/oidvercc.component';
import { OiihiscoComponent } from '@inst/automated-counts/view/oiihisco.component';
import { OsipserdialogComponent } from '@inst/inquiries/view/osipserdialog.component';
import { OcuavlocComponent } from '@inst/visits-management/view/ocuavloc.component';
import { OcuprestComponent } from '@inst/visits-management/view/ocuprest.component';
import { OmuaprisComponent } from '@inst/visits-management/view/omuapris.component';
import { OidvtourComponent } from '@inst/visits-management/view/oidvtour.component';
import { OiuincreComponent } from '@inst/offender-issues-tracking/view/oiuincre.component';
import { OidvisitComponent } from '@inst/visits-management/view/oidvisit.component';
import { OidrecorComponent } from '@inst/automated-counts/view/oidrecor.component';
import { OiivisitComponent } from '@inst/visits-management/view/oiivisit.component';
import { OidissueComponent } from '@inst/offender-issues-tracking/view/oidissue.component';
import { OidsenkdComponent } from "@inst/legal/view/oidsenkd.component";
import { OidsenhyComponent } from '@inst/legal/view/oidsenhy.component';
import { OidhwdetComponent } from "@inst/legal/view/oidhwdet.component";
import { OiuprresComponent } from '@inst/offender-issues-tracking/view/oiuprres.component';
import { OidsenadComponent } from '@inst/legal/view/oidsenad.component';
import { OidviresComponent } from '@inst/visits-management/view/oidvires.component';
import { OmuvrestComponent } from '@inst/visits-management/view/omuvrest.component';
import { OcuavisnComponent } from '@inst/visits-management/view/ocuavisn.component';
import { OiuovresComponent } from '@inst/visits-management/view/oiuovres.component';
import { OmuvrestdialogComponent } from '@inst/visits-management/view/omuvrestdialog.component';
import { OcdxprogComponent } from '@inst/programs-without-schedules/view/ocdxprog.component';
import { HousingComponent } from '@inst/movements/housingchanges/view/housing.component';
import { OcdaworkComponent } from '@cm/teams-workflow/view/ocdawork.component';
import { OcuupstaComponent } from '@inst/programs-without-schedules/view/ocuupsta.component';
import { OciscataComponent } from '@inst/institutional-activities/view/ociscata.component';
import { ocdaworkdailogComponent } from '@cm/teams-workflow/view/ocdaworkdailog.component';
import { OcdtworkComponent } from '@cm/teams-workflow/view/ocdtwork.component';
import { ConsToLineComponent } from "@inst/legal/view/consToLine.component";
import { RelatedToLineComponent } from '@inst/legal/view/related-to-line.component';
import { OcdintpaComponent } from '@inst/legal/view/ocdintpa.component';
import { TermToLineComponent } from '@inst/legal/view/term-to-line.component';
import { DurationToLineComponent } from '@inst/legal/view/duration-to-line.component';
import { MulticountComponent } from '@inst/legal/view/multicount.component';
import { NoncustdurationComponent } from '@inst/legal/view/noncustduration.component';
import { OcdotaskComponent } from '@cm/teams-workflow/view/ocdotask.component';
import { OcdmworkComponent } from '@common/workspace/view/ocdmwork.component';
import { OcdpnoteComponent } from '@inst/programs-without-schedules/view/ocdpnote.component';
import { OiuiwpveComponent } from '@inst/casemanagement/view/oiuiwpve.component';
import { OciscataadvancesearchpopupComponent } from '@inst/institutional-activities/view/ociscataadvancesearchpopup.component';
import { OciscatadialogComponent } from '@inst/institutional-activities/view/ociscatadialog.component';
import { OtidtaccComponent } from '@inmate/trust/trustaccounts/view/otidtacc.component';
import { OtdrdtfuComponent } from '@inmate/trust/trustaccounts/view/otdrdtfu.component';
import { OtusubacComponent } from '@inmate/trust/trustaccounts/view/otusubac.component';
import { OtddisbuComponent } from '@inmate/trust/trustaccounts/view/otddisbu.component';
import { OtdholdtComponent } from '@inmate/trust/trustaccounts/view/otdholdt.component';
// import { OiuiwpgnComponent } from '@inst/casemanagement/view/oiuiwpgn.component';
import { OtinamesComponent } from '@inmate/view/otinames.component';
import { OtucpayeComponent } from '@inmate/trust/trustaccounts/view/otucpaye.component';
import { OcuovrobComponent } from '@inmate/trust/trustaccounts/view/ocuovrob.component';
import { OtmremitComponent } from '@inmate/trust/trustaccounts/view/otmremit.component';
import { OtdttaccComponent } from '@inmate/trust/trustaccounts/view/otdttacc.component';
import { OtdoalloComponent } from '@inmate/trust/deductions/view/otdoallo.component';
import { OtdcloseComponent } from '@inmate/trust/trustaccounts/view/otdclose.component';
import { OtinamesdialogComponent } from '@inmate/view/otinamesdialog.component';
import { OtdreceiComponent } from '@inmate/trust/trustaccounts/view/otdrecei.component';
import { OcdpayobComponent } from '@inmate/trust/deductions/view/ocdpayob.component';
import { OtdhiremComponent } from '@inmate/trust/trustaccounts/view/otdhirem.component';
import { OcicbeneComponent } from '@inmatetrustdeductions/beneficiaryinquiry/view/ocicbene.component';
import { OcdcashrComponent } from '@inmate/trust/generalledger/view/ocdcashr.component';
import { OtdmgjtrComponent } from '@inmate/trust/generalledger/view/otdmgjtr.component';
import { OtdopctaComponent } from '@inmate/trust/trustaccounts/view/otdopcta.component';
import { OcuobhisComponent } from '@inmatetrustdeductions/view/ocuobhis.component';
import { OcipbeneComponent } from '@inmate/trust/deductions/beneficiaryinquiry/view/ocipbene.component';
import { OtidtaccdialogComponent } from '@inmate/trust/trustaccounts/view/otidtaccdialog.component';
import { OtdsubatComponent } from '@inmate/trust/trustaccounts/view/otdsubat.component';
import { OtdaaccoComponent } from '@inmate/trust/trustaccounts/view/otdaacco.component';
import { OsureporComponent } from '@inmate/trust/financialreports/view/osurepor.component';
import { OcdoobliComponent } from '@inmate/trust/deductions/view/ocdoobli.component';
import { OtdsdeduComponent } from '@inmate/trust/deductions/view/otdsdedu.component';
import { OtdofrezComponent } from '@inmate/trust/trustaccounts/view/otdofrez.component';
import { OtiopinqComponent } from '@inmate/trust/deductions/view/otiopinq.component';
import { OcdotfeeComponent } from '@inmate/trust/deductions/view/ocdotfee.component';
// import { OtsindisComponent } from '@inmate/trust/financialreports/view/otsindis.component';
import { OtdbacreComponent } from '@inmate/trust/generalledger/view/otdbacre.component';
// import { OtsdjlogComponent } from '@inmate/trust/financialreports/view/otsdjlog.component';
// import { OtmdemogComponent } from '@inmate/trust/financialreports/view/otmdemog.component';
import { OtdrttfuComponent } from '@inmate/trust/trustaccounts/view/otdrttfu.component';
import { OtiglbalComponent } from '@inmate/trust/generalledger/view/otiglbal.component';
// import { OtdaurecComponent } from '@inmate/trust/generalledger/view/otdaurec.component';
import { OtsreceiComponent } from '@inmate/trust/statements/view/otsrecei.component';
import { OcusrepsComponent } from '@inmate/trust/financialreports/view/ocusreps.component';
import { OtusubadComponent } from '@inmate/trust/trustaccounts/view/otusubad.component';
import { OtdglirtComponent } from '@inmate/trust/generalledger/view/otdglirt.component';
// import { OtrcheckComponent } from '@inmate/trust/checks/view/otrcheck.component';
import { OtdcntacComponent } from '@inmate/trust/financialsmaintenance/view/otdcntac.component';
import { OcdcbeneComponent } from '@inmate/trust/deductions/view/ocdcbene.component';
import { OcdcbenedialogComponent } from '@inmate/trust/deductions/view/ocdcbenedialog.component';
import { OtdcrvoiComponent } from '@inmate/trust/checks/view/otdcrvoi.component';
import { OtdglirtdialogComponent } from '@inmate/trust/generalledger/view/otdglirtdialog.component';
import { OtucobwhComponent } from '@inmate/trust/deductions/view/otucobwh.component';
// import { OcdbirevComponent } from '@inmate/trust/generalledger/view/ocdbirev.component';
import { OtstastaComponent } from '@inmate/trust/statements/view/otstasta.component';
import { OtdclinaComponent } from '@inmate/trust/trustaccounts/view/otdclina.component';
import { OcutrahiComponent } from '@inmate/trust/deductions/beneficiaryinquiry/view/ocutrahi.component';
import { OtdagjtrComponent } from '@inmate/trust/generalledger/view/otdagjtr.component';
// import { OmsrelstComponent } from '@inst/view/omsrelst.component';
import { OcuvwarnComponent } from '@inst/visits-management/view/ocuvwarn.component';
import { OidstestComponent } from '@inst/casemanagement/view/oidstest.component';
import { HousingCleanupComponent } from "@inst/movements/housingchanges/view/housing_cleanup.Component";
import { OiuimagedialogComponent } from '@common/offender-records/view/oiuimagedialog.component';
import { ReportInputControllComponent } from './app-home/menu-components/report-menu/report-inputcontroll.component';
import { OiuimageExportScreenComponent } from '@common/offender-records/view/oiuimage-export-screen.component';
import { ImageCaptureDialogComponent } from '@common/offender-records/view/imagecapturedialog.component';
import { OtupayinComponent } from '@inmate/trust/trustaccounts/view/otupayin.component';
import { OtugltrdComponent } from '@inmate/trust/trustaccounts/view/otugltrd.component';
import { OcmtransComponent } from '@inmate/trust/financialsmaintenance/transaction/view/ocmtrans.component';
import { OcmtropsComponent } from '@inmate/trust/financialsmaintenance/transaction/view/ocmtrops.component';
import { OtuinvacComponent } from '@inmate/trust/financialsmaintenance/transaction/view/otuinvac.component';
import { OidmpitmComponent } from '@inst/property/view/oidmpitm.component';
import { NewContainerComponent } from '@inst/property/view/newContainer.component';
import { CameraDialogComponent } from '@inst/property/view/cameraDialog.component';
import { OidarfplComponent } from '@inst/demographics-biometrics/view/oidarfpl.component';
import { OidarhplComponent } from '@inst/demographics-biometrics/view/oidarhpl.component';
import { OtmfreezComponent } from '@inmate/trust/financialsmaintenance/view/otmfreez.component';
import { OcmmpbalComponent } from '@inmate/trust/deductions/deductionsmaintenance/view/ocmmpbal.component';
import { OtmtfproComponent } from '@inmate/trust/deductions/deductionsmaintenance/view/otmtfpro.component';
import { OtucobwoComponent } from '@inmate/trust/deductions/view/otucobwo.component';
import { OcmdedutComponent } from '@inmate/trust/deductions/deductionsmaintenance/view/ocmdedut.component';
import { OtmalproComponent } from '@inmate/trust/deductions/deductionsmaintenance/view/otmalpro.component';
import { OtmdprioComponent } from '@inmate/trust/deductions/deductionsmaintenance/view/otmdprio.component';
import { OtmcoproComponent } from '@inmate/trust/deductions/deductionsmaintenance/view/otmcopro.component';
import { OtmfoproComponent } from '@inmate/trust/deductions/deductionsmaintenance/view/otmfopro.component';
import { OtuholdrComponent } from '@inmate/trust/trustaccounts/view/otuholdr.component';
import { OtmcprinComponent } from '@inmate/trust/checks/checksmaintenance/view/otmcprin.component';
import { OtmcnserComponent } from '@inmate/trust/checks/checksmaintenance/view/otmcnser.component';
import { OtmacprdComponent } from '@inmate/trust/financialsmaintenance/transaction/view/otmacprd.component';
import { OtmoncoaComponent } from '@inmate/trust/financialsmaintenance/transaction/view/otmoncoa.component';
import { OtmcslimComponent } from '@inmate/trust/financialsmaintenance/view/otmcslim.component';
import { OcmcoactComponent } from '@inmate/trust/financialsmaintenance/transaction/view/ocmcoact.component';
import { OtmbaccoComponent } from '@inmate/trust/checks/checksmaintenance/view/otmbacco.component';
import { OturnumbComponent } from '@inmate/trust/statements/view/oturnumb.component';
import { OumagencComponent } from '@inmate/trust/financialsmaintenance/payees/view/oumagenc.component';
import { OcucorptComponent } from '@inmate/trust/financialsmaintenance/payees/view/ocucorpt.component';
import { ContactBusinessComponent } from '@inmate/trust/financialsmaintenance/payees/view/contactbusiness';
import { OtuacodeComponent } from '@inmate/trust/financialreports/view/otuacode.component';
import { OumagencDialogComponent } from '@inmate/trust/financialsmaintenance/payees/view/oumagencdialog.component';
import { OtmoflimComponent } from '@inmate/trust/financialsmaintenance/view/otmoflim.component';
import { OtmmbalaComponent } from '@inmate/trust/financialsmaintenance/view/otmmbala.component';
import { OtmisambComponent } from '@inmate/trust/financialsmaintenance/subaccounts/view/otmisamb.component';
import { OiufsoffComponent } from '@inmate/trust/financialreports/view/oiufsoff.component';
import { OiitgdetComponent } from '@inst/securitythreatgroups/view/oiitgdet.component';
import { OimtgngsComponent } from '@inst/securitythreatgroups/view/oimtgngs.component';
import { OiistgmiComponent } from '@inst/securitythreatgroups/view/oiistgmi.component';
import { OiitgdetDialogComponent } from '@inst/securitythreatgroups/view/oiitgdetdialog.component';
import { OimtgoptComponent } from '@inst/securitythreatgroups/view/oimtgopt.component';
import { OidstgvlComponent } from '@inst/securitythreatgroups/view/oidstgvl.component';
import { OiistgmbComponent } from '@inst/securitythreatgroups/view/oiistgmb.component';
import { OidmbrdtComponent } from '@inst/securitythreatgroups/view/oidmbrdt.component';
import { OidstgidComponent } from '@inst/securitythreatgroups/view/oidstgid.component';
import { OidononaComponent } from '@common/offender-records/view/oidonona.component';
import { OidmbrvlComponent } from '@inst/securitythreatgroups/view/oidmbrvl.component';
import { OsistgkwComponent } from '@inst/securitythreatgroups/view/osistgkw.component';
import { OidmbrasComponent } from '@inst/securitythreatgroups/view/oidmbras.component';
import { OidappndComponent } from '@inst/securitythreatgroups/view/oidappnd.component';
import { OidononaDialogComponent } from '@common/offender-records/view/oidononadialog.component';
import { OidstgcnComponent } from '@inst/securitythreatgroups/view/oidstgcn.component';
import { OcdaliasDialogComponent } from '@inst/demographics-biometrics/view/ocdaliasdialog.component';
import { OidpidenDialogComponent } from '@inst/demographics-biometrics/view/oidpidendialog.component';
import { OcdnoqueDialogComponent } from '@inst/classification/view/ocdnoquedialog.component';
import { OidstgaeComponent } from '@inst/securitythreatgroups/view/oidstgae.component';
import { OidstghlComponent } from '@inst/securitythreatgroups/view/oidstghl.component';
import { OidoicusDialogComponent } from '@inst/securitythreatgroups/view/oidoicusdialog.component';
import { OidstginComponent } from '@inst/securitythreatgroups/view/oidstgin.component';
import { OcdcloseComponent } from '@cm/intakeclosure/view/ocdclose.component';
import { OcdintakComponent } from './cm/intakeclosure/view/ocdintak.component';
import { OcinamesComponent } from '@cm/searchassaign/view/ocinames.component';
import { OcdaltccComponent } from '@cm/intakeclosure/addremoveoffices/view/ocdaltcc.component';
import { OcinamesDialogComponent } from '@cm/searchassaign/view/ocinamesdialog.component';
import { OcdrlfccComponent } from '@cm/intakeclosure/addremoveoffices/view/ocdrlfcc.component';
import { OcmserviComponent } from '@inst/institutional-activities/maintenance/view/ocmservi.component';
import { OcmsvassComponent } from '@inst/institutional-activities/maintenance/view/ocmsvass.component';
// import { OcmsvphaComponent } from '@inst/institutional-activities/maintenance/view/ocmsvpha.component';
import { OcmphblkComponent } from '@inst/institutional-activities/maintenance/view/ocmphblk.component';
import { OimsreqsComponent } from '@cm/courtcasesandorders/maintenance/view/oimsreqs.component';
import { OimilocaComponent } from '@inst/movements/maintenance/view/oimiloca.component';
import { OimctactComponent } from '@inst/booking/maintainence/view/oimctact.component';
import { OcmnoqueComponent } from '@cm/assessments/maintenance/view/ocmnoque.component';
import { OimslevlComponent } from '@inst/classification/assessmentmaintenance/view/oimslevl.component';
// import { OuimergeComponent } from '@sa/admin/mergeoffenders/view/ouimerge.component';
import { OuimergeComponent } from '@sa/admin/mergeoffenders/view/ouimerge.component';
import { OiusmselComponent } from '@sa/audit/view/oiusmsel.component';
import { OimulocaComponent } from '@inst/movements/maintenance/view/oimuloca.component';
import { OiunonasComponent } from '@inst/movements/maintenance/view/oiunonas.component';
import { OuminoutComponent } from '@inst/movements/maintenance/view/ouminout.component';
import { OcuintlcComponent } from '@inst/movements/maintenance/view/ocuintlc.component';
import { OimprfcaComponent } from '@inst/booking/maintainence/view/oimprfca.component';
import { OimstatuComponent } from '@inst/legal-screens/view/oimstatu.component';
import { OumauditComponent } from '@sa/audit/maintenance/view/oumaudit.component';
import { OimsenotComponent } from '@inst/classification/assessmentmaintenance/view/oimsenot.component';
import { OumhlhisComponent } from '@inst/movements/maintenance/view/oumhlhis.component';
import { OcmorcodComponent } from '@inst/legal-screens/view/ocmorcod.component';
import { OumagyhtComponent } from '@sa/admin/view/oumagyht.component';
// import { OcmorcodAuComponent} from '@inst/utilities/legalordersmaintenance/view/ocmorcodAu.component';
// import { OimcrtorAuComponent} from '@inst/utilities/legalordersmaintenance/view/oimcrtorAu.component';
// import { OimlegsuAuComponent} from '@inst/utilities/legalordersmaintenance/view/oimlegsuAu.component';
// import { OumagyhtComponent } from '@sa/admin/view/oumagyht.component';
import { OimpldurComponent } from '@inst/care-in-placement/maintenance/view/oimpldur.component';
import { OimvdtslComponent } from '@inst/visits-management/maintenance/view/oimvdtsl.component';
import { OumemoveComponent } from '@inst/movements/maintenance/view/oumemove.component';
import { OimvlimtComponent } from '@inst/visits-management/maintenance/view/oimvlimt.component';
import { OimcountComponent } from '@inst/automated-counts/maintenance/view/oimcount.component';
import { OimlegstComponent } from '@inst/legal-screens/maintenance/view/oimlegst.component';
import { OumhocodComponent } from '@inst/legal-screens/maintenance/view/oumhocod.component';
// import { OumpersdComponent } from '@sa/usersystemsecurity/view/oumpersd.component';
import { OumpersdComponent } from '@sa/usersystemsecurity/view/oumpersd.component';
import { OuiadactComponent } from '@sa/audit/view/ouiadact.component';
import { OumrareaComponent } from '@sa/admin/view/oumrarea.component';
import { OimlegsuComponent } from '@inst/legal-screens/maintenance/view/oimlegsu.component';
// import { OumclfrmComponent } from '@sa/admin/view/oumclfrm.component';
import { OimmholoComponent } from '@inst/movements/maintenance/view/oimmholo.component';
import { OcmcondiComponent } from '@inst/legal-screens/maintenance/view/ocmcondi.component';
import { OimsatypComponent } from "@inst/legal-screens/maintenance/view/oimsatyp.component";
import { OimprfcoComponent } from '@inst/booking/maintainence/view/oimprfco.component';
// import { OcidocumComponent } from '@inst/casemanagement/view/ocidocum.component';
import { OimoffenComponent } from '@inst/legal-screens/maintenance/view/oimoffen.component';
// import { OummenusComponent } from '@sa/admin/view/oummenus.component';
// import { OmunvaryComponent } from '@sa/admin/view/omunvary.component';
import { OummenusComponent } from '@sa/admin/view/oummenus.component';
import { OmunvaryComponent } from '@sa/admin/view/omunvary.component';
import { OimcrtorComponent } from '@inst/legal-screens/maintenance/view/oimcrtor.component';
import { OimisreaComponent } from '@inst/schedules/maintenance/view/oimisrea.component';
import { OimissueComponent } from '@inst/offender-issues-tracking/maintenance/view/oimissue.component';
import { OumagyrgComponent } from '@sa/admin/view/oumagyrg.component';
// import { OuimtlogComponent } from '@sa/admin/mergeoffenders/view/ouimtlog.component';
import { OuimtlogComponent } from '@sa/admin/mergeoffenders/view/ouimtlog.component';
import { OimmholoDialogComponent } from '@inst/movements/maintenance/view/oimmholodialog.component';
import { OimmholopopupComponent } from '@inst/movements/maintenance/view/oimmholopopup.component';
import { OimmholoDialogOneComponent } from '@inst/movements/maintenance/view/oimmholodialogone.component';
import { OimmholoDialogTwoComponent } from '@inst/movements/maintenance/view/oimmholodialogtwo.component';
import { OumhlhisdialogComponent } from '@inst/movements/maintenance/view/oumhlhisdialog.component';
import { OuimtstpComponent } from '@sa/admin/mergeoffenders/view/ouimtstp.component';
// import { OuimtstpComponent } from '@sa/admin/mergeoffenders/view/ouimtstp.component';
// import { OumptacaComponent } from '@sa/admin/checkprintercontrolscreens/view/oumptaca.component';
// import { OumpdefiComponent } from '@sa/admin/checkprintercontrolscreens/view/oumpdefi.component';
// import { OumwmenuComponent } from '@sa/admin/view/oumwmenu.component';
import { OumwmenuComponent } from '@sa/admin/view/oumwmenu.component';
import { OiddisreComponent } from '@inst/automated-counts/view/oiddisre.component';
import { OumpurgeComponent } from '@sa/admin/view/oumpurge.component';
// import { OumformsComponent } from '@sa/admin/view/oumforms.component';
import { OumformsComponent } from '@sa/admin/view/oumforms.component';
// import { OumcfpriComponent } from '@sa/admin/checkprintercontrolscreens/view/oumcfpri.component';
import { OcdbreciComponent } from '@cf/offendertransactions/view/ocdbreci.component';
import { OcidoaccComponent } from '@cf/offendertransactions/view/ocidoacc.component';
import { OcdreceiComponent } from '@cf/offendertransactions/view/ocdrecei.component';
import { OcmgobliComponent } from '@cf/deductions/maintenance/view/ocmgobli.component';
import { OcupayplComponent } from '@cf/offendertransactions/view/ocupaypl.component';
import { OcipphisComponent } from '@cf/offendertransactions/view/ocipphis.component';
import { OcmohstaComponent } from '@cmdemographics/maintenance/view/ocmohsta.component';
import { OcugltrdComponent } from '@cf/offendertransactions/view/ocugltrd.component';
import { OcmsnotiComponent } from '@cf/sanctionnotices/view/ocmsnoti.component';
import { OtmcfeesComponent } from '@cf/deductions/maintenance/view/otmcfees.component';
import { OcsreceiComponent } from '@cf/statements/view/ocsrecei.component';
import { OcdcppayComponent } from '@cf/offendertransactions/view/ocdcppay.component';
import { OcuotrahComponent } from '@cf/offendertransactions/view/ocuotrah.component';
import { EoffenderComponent } from '@common/iwp/eoffender.component';
import { ViewFileComponent } from '@common/iwp/viewFile.component';
import { CheckOutComponent } from '@common/iwp/checkout.component';
import { FinalActionButtonComponent } from '@common/iwp/finalActionButton.component';
import { UploadDocumentComponent } from '@common/iwp/uploaddocument.component';
import { GenerateDialogComponent } from "@common/iwp/generateDialog.component";
import { CancelGenerateComponent } from "@common/iwp/cancel-generate/cancel-generate.component";
import { ActionComponent } from '@common/iwp/action.component';
import { OidpawliComponent } from '@inst/institutional-activities/view/oidpawli.component';
import { OuisdireComponent } from './sa/usersystemsecurity/view/ouisdire.component';
import { OcudpdisComponent } from './cf/offendertransactions/view/ocudpdis.component';
import { OsunmemoComponent } from '@inst/programs-without-schedules/view/osunmemo.component';
import { OsucnoteComponent } from '@inst/programs-without-schedules/view/osucnote.component';
import { OumbmarkComponent } from '@sa/admin/integratedwordprocessing/view/oumbmark.component';
import { OumdtempComponent } from '@sa/admin/integratedwordprocessing/view/oumdtemp.component';
import { OcmdeftmComponent } from '@inst/workflow/maintenance/view/ocmdeftm.component';
import { OtdocfeeComponent } from '@cf/deductions/view/otdocfee.component';
import { OcuhvteaComponent } from '@inst/workflow/managingteams/view/ocuhvtea.component';
import { OcmssvctComponent } from '@inst/institutional-activities/view/ocmssvct.component';
import { OcmstoffComponent } from '@inst/institutional-activities/maintenance/view/ocmstoff.component';
import { OcdsabusComponent } from '@inst/booking/view/ocdsabus.component';
import { OcmspracComponent } from '@inst/institutional-activities/maintenance/view/ocmsprac.component';
import { OcmctoffComponent } from '@cm/programsservices/maintenance/view/ocmctoff.component';
import { OcuwkhtyComponent } from '@inst/workflow/managingworkassignments/view/ocuwkhty.component';
import { OidcoasiComponent } from '@inst/workflow/managingworkassignments/view/oidcoasi.component';
import { OcupaoffComponent } from '@inst/institutional-activities/view/ocupaoff.component';
import { OidrelscComponent } from '@inst/schedules/view/oidrelsc.component';
// import { OumdtempdialogComponent } from '@sa/admin/integratedwordprocessing/view/oumdtempdialog.component';
import { OidcnoteDialogComponent } from '@inst/casemanagement/view/oidcnotedialog.component';
import { OcmworksComponent } from '@inst/workflow/maintenance/view/ocmworks.component';
import { OumsmalaComponent } from '@sa/usersystemsecurity/view/oumsmala.component';
import { PropertyImageDialogComponent } from '@common/offender-records/view/propertyimagedialog.component'
import { OcmschrcComponent } from '@inst/institutional-activities/maintenance/view/ocmschrc.component';
// import { OcmsvacpComponent } from '@inst/accredited-programs/view/ocmsvacp.component';
import { OumbmarkdialogComponent } from '@sa/admin/integratedwordprocessing/view/oumbmarkdialog.component';
import { OcmteamsComponent } from '@inst/workflow/maintenance/view/ocmteams.component';
import { OcmsoschComponent } from '@inst/institutional-activities/maintenance/view/ocmsosch.component';
import { OsuntaskComponent } from '@inst/programs-without-schedules/view/osuntask.component';
import { OumstafcComponent } from '@inst/workflow/managingworkassignments/view/oumstafc.component';
import { OsuemailComponent } from '@inst/programs-without-schedules/view/osuemail.component';
import { OcittaskComponent } from '@inst/workflow/managingteams/view/ocittask.component';
import { OiischedComponent } from '@inst/inquiries/view/oiisched.component';
// import { OimlegstAuComponent } from '@inst/utilities/legalordersmaintenance/view/oimlegstau.component';
// import { OidsenkdAuComponent } from '@inst/legalorders/view/oidsenkdau.component';
// import { OumhocodAuComponent } from '@inst/utilities/legalordersmaintenance/view/oumhocodau.component';
// import { SeriousSentenceDetailDialogComponent } from '@inst/legalorders/view/serioussentencedetaildialog.component';
import { OiuvlcteComponent } from '@inst/programs-without-schedules/view/oiuvlcte.component';
// import { OcmssvasComponent } from '@cm/programsservices/maintenance/view/ocmssvas.component';
import { OcucstafComponent } from '@inst/workflow/maintenance/view/ocucstaf.component';
import { OidschacComponent } from '@inst/institutional-activities/view/oidschac.component';
import { OidacselComponent } from '@inst/institutional-activities/view/oidacsel.component';
import { OidpaattComponent } from '@inst/institutional-activities/view/oidpaatt.component';
import { OcmxprogComponent } from '@inst/programs-without-schedules/view/ocmxprog.component';
import { OuiausesComponent } from '@sa/audit/view/ouiauses.component';
import { OmsaljntComponent } from '@sa/audit/view/omsaljnt.component';
// import { oidreleaDialogComponent } from '@inst/movement-external/view/oidreleadialog.component';
import { OuiaflatComponent } from '@sa/audit/view/ouiaflat.component';
// import { OidscalcComponent } from '@inst/legal-screens/sentenceadministration/view/oidscalc.component';
import { OidpactiComponent } from '@inst/institutional-activities/view/oidpacti.component';
import { OmsysjntComponent } from '@sa/audit/maintenance/view/omsysjnt.component';
// import { OummevntComponent } from '@inmate/payroll/maintenance/view/Oummevnt.component';
// import { OcdhealtComponent } from '@inst/booking/view/ocdhealt.component';
import { OuiauactComponent } from '@sa/audit/view/ouiauact.component';
// import { Ocicases_auComponent } from '@inst/legal/au/view/ocicases_au.component';
// import { Ocdccase_auComponent } from '@inst/legal/view/ocdccase_au.component';
// import { OiioffobComponent } from '@inst/care-in-placement/view/oiioffob.component';
// import { OpdcalcbComponent } from './inst/legal-screens/sentenceadministration/view/opdcalcb.component';
// import { OimoffenAuComponent } from '@inst/utilities/legalordersmaintenance/view/oimoffenAu.component';
// import { Ocdlegst_auComponent } from "@inst/legal/view/ocdlegst_au.component";
// import { Oculegst_auComponent } from "@inst/legal/view/oculegst_au.component";
// import { Opdcalch_auComponent } from '@inst/legal-screens/sentenceadministration/view/opdcalch_au.component';
// import { OcisenhtComponent } from '@inst/legal/view/ocisenht.component';
// import { OcishtcdComponent } from '@inst/legal/view/ocishtcd.component';
// import { OcdsentdComponent } from '@inst/legal/view/ocdsentd.component';
// import { OidrnotiComponent } from '@inst/legal-screens/release-notification/view/oidrnoti.component';
// import { OimstatuAuComponent } from '@inst/utilities/legalordersmaintenance/view/oimstatuAu.component';
// import { OimsreqsAuComponent } from '@inst/utilities/legalordersmaintenance/view/oimsreqsAu.component';
// import { OumcpassComponent } from './sa/view/oumcpass.component';
import { OumcpassComponent } from './sa/view/oumcpass.component';
// import { Ocdreque_auComponent } from '@inst/legal/au/view/ocdreque_au.component';
// import { OcdapealComponent } from './inst/legal/view/ocdapeal.component';
// import { Oidhwdet_auComponent } from './inst/legal/view/oidhwdet_au.component';
// import { OcmsvphaComponent } from './inst/institutional-activities/maintenance/view/ocmsvpha.component';
import { OcuincwpComponent } from '@inst/incidents-oic/view/ocuincwp.component';
import { OcuincwpHistoryComponent } from '@inst/incidents-oic/view/ocuincwpHistory.component';
import { OcuoicapComponent } from '@inst/incidents-oic/view/ocuoicap.component';
import { OidstfrppopupComponent } from '@inst/incidents-oic/view/oidstfrppopup.component';
import { OiuirameComponent } from '@inst/incidents-oic/view/oiuirame.component';
import { OidincdepopupComponent } from '@inst/incidents-oic/view/oidincdepopup.component';
import { OidstfrpdialogComponent } from '@inst/incidents-oic/view/oidstfrpdialog.component';
import { OsuoicusComponent } from '@inst/incidents-oic/view/osuoicus.component';
import { OcuincfeComponent } from '@inst/incidents-oic/view/ocuincfe.component';
import { ManagePropertiesDialogComponent } from '@inst/property/view/manage-properties-dialog.component';
import {SealdialogComponent} from '@inst/property/view/sealdialog.component';
import {WarndialogComponent} from '@inst/property/view/warndialog.component';
import { CalScheduleComponent } from '@inst/schedules/view/calschedule.component';
import { AddEditScheduleComponent } from './inst/schedules/view/add-edit-schedule.component';
import { OumdtempdialogComponent } from '@sa/admin/integratedwordprocessing/view/oumdtempdialog.component';
import { OcmpconfComponent } from '@sa/admin/view/ocmpconf.component';
import { OumsyslabComponent } from '@sa/admin/view/oumsyslab.component';
import { OlisetComponent } from '@sa/admin/view/oliset.component';
import { OmshelpComponent } from '@sa/admin/view/omshelp.component';
import { OcdcrefuComponent } from '@cf/offendertransactions/view/ocdcrefu.component';
import { OumtagreComponent } from '@sa/admin/view/oumtagre.component';
import { UpdoffidComponent } from '@sa/admin/view/updoffid.component';
import { OumrestaComponent } from '@sa/admin/view/oumresta.component';
import { OtmlockrComponent } from '@sa/admin/view/otmlockr.component';
import { OsihrsumComponent } from '@inst/systemsearch/view/osihrsum.component';
import { OiiobalxComponent } from '@inst/systemsearch/view/oiiobalx.component';
import { OumcdtabComponent } from '@sa/admin/view/oumcdtab.component';
import { OimadmisComponent } from '@inst/booking/maintainence/view/oimadmis.component';
import { OiibooksComponent } from './inst/offenderspecific/view/oiibooks.component';
import { OumsmugaComponent } from '@sa/admin/view/oumsmuga.component';
import { OymholidComponent } from '@sa/admin/view/oymholid.component';
import { OumbadmiComponent } from '@sa/recordmaintenance/view/oumbadmi.component';
import { EditDocumentComponent } from '@common/iwp/edit-document.component';
import { OiustinvComponent } from '@inst/offender-issues-tracking/view/oiustinv.component';
import { OcdorassComponent } from '@iwp/view/ocdorass.component';
import { OcdatpowComponent } from '@iwp/view/ocdatpow.component';
import { OcuaoffiComponent } from '@iwp/view/ocuaoffi.component';
import { OcdtapowComponent } from '@iwp/view/ocdtapow.component';
import { OcdexpowComponent } from '@iwp/view/ocdexpow.component';
import { OcittpowComponent } from '@iwp/view/ocittpow.component';
import { OcipowloComponent } from '@iwp/view/ocipowlo.component';
import { OcipowofComponent } from '@iwp/view/ocipowof.component';
import { OcmshierComponent } from '@iwp/view/ocmshier.component';
import { OcumaoffComponent } from '@iwp/view/ocumaoff.component';
import { OcidiaryComponent } from '@iwp/view/ocidiary.component';
import { OcmeventComponent } from '@iwp/view/ocmevent.component';
import { OcmcprevComponent } from '@iwp/view/ocmcprev.component';
import { OcdpsrepComponent } from '@iwp/view/ocdpsrep.component';
import { OcuauthrComponent } from '@iwp/view/ocuauthr.component';
import { OcdenforComponent } from '@iwp/view/ocdenfor.component';
import { OcuwarniComponent } from '@iwp/view/ocuwarni.component';
import { OcuadjcrComponent } from '@iwp/view/ocuadjcr.component';
import { OcmsuwpjComponent } from '@iwp/view/ocmsuwpj.component';
import { OcmsuwpjDlglComponent } from '@iwp/view/ocmsuwpjDlgl.component';
import { OcdclogsComponent } from '@iwp/view/ocdclogs.component';
import { OcdcschComponent } from '@iwp/view/ocdcsch.component';
import { OcduatteComponent } from '@cm/programsservices/view/ocduatte.component';
import { OcduprojComponent } from './cm/programsservices/view/ocduproj.component';
import { OcumpvavComponent } from '@iwp/view/ocumpvav.component';
import { OcmssvasComponent } from '@iwp/view/ocmssvas.component';
import { OcuoscpvComponent } from './cm/programsservices/view/ocuoscpv.component';
import { ProsmainComponent } from './sa/recordmaintenance/view/prosmain.component';
import { CmdworkComponent } from './sa/recordmaintenance/view/cmdwork.component';
import { OumcamtaskComponent } from './sa/admin/view/oumcamtask.component';
import { CamundaBpmnComponent } from './sa/admin/view/camundabpmn.component';
import { CmdhistComponent } from './sa/recordmaintenance/view/cmdhist.component';
import { OcussessComponent } from '@cm/programsservices/view/ocussess.component';
import { ProglocaDialogComponent } from '@cm/programsservices/view/proglocaDialog.component';
import { OcdpatteComponent } from './cm/programsservices/view/ocdpatte.component';
import { OcmsvphaComponent } from '@cm/programsservices/maintenance/view/Ocmsvpha.component';
import { OcmsvmodComponent } from '@cm/programsservices/maintenance/view/ocmsvmod.component';
import { OidpwaitComponent } from '@cm/programsservices/view/oidpwait.component';
import { OcdprogrComponent } from '@cm/programsservices/view/ocdprogr.component';
import { OcdprogrDialogComponent } from '@cm/programsservices/view/ocdprogrDialog.component';
import { OcmschprComponent } from '@cm/programsservices/view/ocmschpr.component';
import { OcmschprformboxComponent } from '@cm/programsservices/view/ocmschprformbox.component';
import { OcuschprComponent } from '@cm/programsservices/view/ocuschpr.component';
import { OcumultiComponent } from '@cm/programsservices/view/ocumulti.component';
import { OcmsvacpDialougComponent } from '@cm/programsservices/view/ocmsvacpdialoug.component';
import { OcmphmodComponent } from '@cm/programsservices/view/ocmphmod.component';
import { OcmsvacpComponent } from '@cm/programsservices/view/ocmsvacp.component';
import { OcupatofComponent } from './cm/programsservices/view/ocupatof.component';
import { OcuscupsComponent } from './cm/programsservices/view/ocuscups.component';
import { OcmfaproComponent } from '@cf/deductions/maintenance/view/ocmfapro.component';
import { OcdofaccComponent } from '@cf/deductions/view/ocdofacc.component';
import { OcdsupstComponent } from '@cm/intakeclosure/view/ocdsupst.component';
import { DmnmainComponent } from '@sa/recordmaintenance/view/dmnmain.component';
import { CmdDmnComponent } from '@sa/admin/view/cmddmn.component';
import { TaskRejectDialogComponent } from '@sa/admin/view/taskrejectdialog.component';
import { TaskFormDialogComponent } from '@common/dynamic-loader/taskformdialog.component';
import { OimoicmpComponent } from '@inst/incidents-oic/maintenance/view/oimoicmp.component';
import { OimoicoiComponent } from '@inst/incidents-oic/maintenance/view/oimoicoi.component';
import { OciintrrComponent } from '@cm/intakeclosure/view/ociintrr.component';
import { OumeemovComponent } from '@sa/recordmaintenance/view/oumeemov.component';
import { CmdqueryComponent } from '@sa/recordmaintenance/view/cmdquery.component';
import { CmdactionComponent } from '@sa/recordmaintenance/view/cmdaction.component';
import { ApimainComponent } from './sa/recordmaintenance/view/apimain.component';
import { OiexpproComponent } from './sa/recordmaintenance/view/oiexppro.component';
import { OiexpqacComponent } from './sa/recordmaintenance/view/oiexpqac.component';
import { OiimpproComponent } from './sa/recordmaintenance/view/oiimppro.component';
import { OiimpqacComponent } from './sa/recordmaintenance/view/oiimpqac.component';
import { OiihlhisComponent } from './inst/inquiries/view/oiihlhis.component';
import { OidoicapComponent } from '@inst/incidents-oic/view/oidoicap.component';
import { OidoicapPopUpComponent } from '@inst/incidents-oic/view/OidoicapPopUp.component';
import { OidoicapPenaltyPopUpComponent } from './inst/incidents-oic/view/oidoicappenaltypopup.component';
import { OimcsummComponent } from '@inst/classification/assessmentmaintenance/view/oimcsumm.component';
import { teamDialogComponent } from '@inst/workflow/maintenance/view/teamDialog.component';
import { OcmteamMainComponent } from '@inst/workflow/maintenance/view/ocmteamMain.component';
import { OcufovdtComponent } from './cf/deductions/view/ocufovdt.component';
import { OcuachisComponent } from './cf/deductions/view/ocuachis.component';
import { DatasourceRenderComponent } from './dashboard-bi/datasource-listing/datasource-render/datasource-render.component';
import { DatasourceEditComponent } from './dashboard-bi/datasource-listing/datasource-edit/datasource-edit.component';
import { DashboardRenderComponent } from './dashboard-bi/dashboard-listing/dashboard-render/dashboard-render.component';
import { DatasourceCreateComponent } from './dashboard-bi/datasource-listing/datasource-create/datasource-create.component';
import { DashboardCreateComponent } from './dashboard-bi/dashboard-listing/dashboard-create/dashboard-create.component';
import { DatasourceListingComponent } from './dashboard-bi/datasource-listing/datasource-listing.component';
import { DashboardListingComponent } from './dashboard-bi/dashboard-listing/dashboard-listing.component';
import { DashboardEditComponent } from './dashboard-bi/dashboard-listing/dashboard-edit/dashboard-edit.component';
import { GridLovDialog } from '@core/ui-components/grid/grid-lov-dialog';
import { OcdchgsuDlgComponent } from './inst/legal/view/ocdchgsu_dlg.component';
import { OcdchgdtComponent } from './inst/legal/view/ocdchgdt.component';
import { OcuchgouComponent } from './inst/legal/view/ocuchgou.component';
import { OcucondiDialogComponent } from './inst/legal/view/ocucondidialog.component';
import { OcuucondComponent } from './inst/legal/view/ocuucond.component';
import { OcucondiDialogProgref } from './inst/legal/view/ocucondidialog-progref.component';
import { OcutrdetComponent } from '@cf/deductions/view/ocutrdet.component';
import { OcmpfaccComponent } from '@cf/maintenance/view/ocmpfacc.component';
import { OcubadjsComponent } from '@cf/deductions/view/ocubadjs.component';
import { OcdadjusComponent } from '@cf/offendertransactions/view/ocdadjus.component';
import { OcdreverComponent } from '@cf/offendertransactions/view/ocdrever.component';
import { OcsprogrComponent } from './inst/legal/view/ocsprogr.component';
import { OcmxpstmComponent } from './cm/programsservices/view/Ocmxpstm.component';
import { OcondawaitComponent } from './inst/legal/view/ocondawait.component';
import { OcondtrfComponent } from './inst/legal/view/ocondtrf.component';
import { OtkcondtrfComponent } from './inst/legal/view/otkcondtrf.component';
import { CondLegalTextComponent } from './inst/legal/view/condLegalText.component';
import { ProsinitComponent } from '@sa/recordmaintenance/view/prosinit.component';
import { OumsysetComponent } from './sa/admin/view/oumsyset.component';
import { OiiciponComponent } from '@inst/care-in-placement/view/oiicipon.component';
import { OsanviosComponent } from '@inst/legal/view/osanvios.component';
import { OsanviosCommentText } from './inst/legal/view/osanvioscommenttext.component';
import { NonCustRelatedComponent } from './inst/legal/view/noncustrelated.component';
import { OiuhofflComponent } from '@inmate/trust/financialreports/view/oiuhoffl.component';
import { OuminsdbComponent } from './sa/admin/view/ouminsdb.component';
import { OcsproindialogComponent } from './inst/legal/view/ocsproindialog.component';
import { OcsproinComponent } from './inst/legal/view/ocsproin.component';
import { MigadusrComponent } from './inst/demographics-biometrics/view/migadusr.component';
import { OcufovdtdialogComponent } from '@cf/deductions/view/ocufovdtdialog.component';
import { OcdpsrepdialogComponent } from '@iwp/view/ocdpsrepdialog.component';
import { OweacplnComponent } from './cm/weeklyactivityplans/view/oweacpln.component';
import { OcunawarnComponent } from '@common/offender-records/view/ocunawrn.component';
import { CmnprossComponent } from './sa/recordmaintenance/view/cmnpross.component';
import { SignComponent } from '@common/iwp/sign/sign.component';
import { UploadtemplateComponent } from '@common/iwp/uploadtemplate.component';
import { OimoffobComponent } from '@inst/offenderobservations/maintenance/view/oimoffob.component';
import { OiuzohosComponent } from '@inst/offenderobservations/maintenance/view/oiuzohos.component';
import { OidoffobComponent } from '@inst/offenderobservations/view/oidoffob.component';
import { OidoobadComponent } from '@inst/offenderobservations/view/oidoobad.component';
import { OiioffobComponent } from '@inst/offenderobservations/view/oiioffob.component';
import { OcmcnperComponent } from '@inst/workflow/maintenance/view/ocmcnper.component';
import { OcicnsrcComponent } from '@iwp/view/ocicnsrc.component';
import { OidowrelComponent } from './cm/programsservices/maintenance/view/oidowrel.component';
import { OimworkrComponent } from './cm/programsservices/maintenance/view/oimworkr.component';
import { OimworkrdialogComponent} from './cm/programsservices/maintenance/view/oimworkrdialog.component';
import {OcdlodetdialogComponent} from './inst/legal/view/ocdlodetdialog.component';
import { OiexpjrpComponent } from './reports/oiexpjrp.component';
import { OirreportComponent } from './reports/oirreport.component';
import { OirmreporComponent } from './reports/oirmrepor.component';
import { OiimpjrpComponent } from './reports/oiimpjrp.component';
import { OirreportdialogComponent } from '@report/oirreportdialog.component';
import { OcunoqueDialogComponent } from '@inst/classification/view/ocunoquedialog.component';
import { OimieplvComponent } from '@inst/visits-management/view/oimieplv.component';
import { OidieplvComponent } from '@inst/visits-management/view/oidieplv.component';
import {StaffReportDetailComponent} from '@inst/incidents-oic/view/staffreportdetail.component';
import { OirreportParameterDialogComponent } from './reports/oirreportParameterDialog.component';
import { OidomailComponent } from '@inst/correspondencetracking/view/oidomail.component';
import { OimrelscComponent } from '@inst/schedules/maintenance/view/oimrelsc.component';
import { OumbundlComponent } from '@inst/property/view/oumbundl.component';
import { OirreportParameterQueryComponent } from './reports/oirreportParameterQuery.component';
import { OcucieidComponent } from '@inst/incidents-oic/view/ocucieid.component';
import {OidshlogDialogComponent} from '@inst/shift-logs/view/oidshlogDialog.component';
import {AddOffenderComponent } from '@inst/shift-logs/view/addoffender.component';  
import { PasswordDialogComponent } from '@core/ui-components/grid/password-dialog.component';
import { OcuovkeyComponent } from '@inst/legal/view/ocuovkey.component';
import { OcuverkdComponent } from '@inst/legal/view/ocuverkd.component';
import { OirmassetComponent } from './reports/oirmasset.component';
import { OirreportEditAssetComponent } from './reports/oirEditAssetDialog.component';
import { OiimyoffComponent } from '@inst/systemsearch/view/oiimyoff.component';
import { OcimyoffComponent } from '@cm/searchassaign/view/ocimyoff.component';
import { OumrelmdComponent } from '@sa/admin/view/oumrelmd.component';
import { OcmstatsComponent } from '@inst/legal-screens/maintenance/view/ocmstats.component';
import { OcdsenchComponent } from './reports/ocdsench.component';
import { OcdhealtComponent } from '@inst/demographics-biometrics/view/ocdhealt.component';
import { OcdotrlvComponent } from './cm/communitysupervisiontiers/view/ocdotrlv.component';
import { OcmtirlvComponent } from './cm/communitysupervisiontiers/maintenance/view/ocmtirlv.component';
import { OcmtidetComponent } from './cm/communitysupervisiontiers/maintenance/view/ocmtidet.component';
import { ProsdeacComponent } from '@sa/recordmaintenance/view/prosdeac.component';
import { OcmlesetComponent } from '@inst/legal-screens/maintenance/view/ocmleset.component';
import { OidparoeComponent } from '@inst/legal/view/oidparoe.component';
import { OcmdspwdComponent } from '@cm/communitysupervisiontiers/maintenance/view/ocmdspwd.component';
import { OcdonostComponent } from '@cm/communitysupervisiontiers/maintenance/view/ocdonost.component';
import { OidcustadComponent } from '@inst/legal-screens/maintenance/view/oidcustad.component';
import { RemissionDurationComponent } from '@inst/legal-screens/maintenance/view/remission-duration.component';
import { OcdiplacComponent } from '@inst/casemanagement/view/ocdiplac.component';
import { OimcustsComponent } from '@inst/legal-screens/maintenance/view/oimcusts.component';

import { OcudcondComponent } from './inst/legal/view/ocudcond.component';
import { ChargesdialogComponent } from '@iwp/view/chargesdialog.component';
import { OcmpssetComponent } from '@inst/institutional-activities/maintenance/view/ocmpsset.component';
import { OcmpspayComponent } from '@inst/institutional-activities/maintenance/view/ocmpspay.component';
import { OcdcgpayComponent } from '@inst/institutional-activities/view/ocdcgpay.component';
import { OcupdetaComponent } from '@inst/institutional-activities/view/ocupdeta.component';
import { OciphistComponent } from '@inst/institutional-activities/view/ociphist.component';
import { OivctmngComponent } from '@inst/victimmanagement/view/oivctmng.component';
import { OimrouteComponent } from '@inst/transportation/maintenance/view/oimroute.component';
import { OimsglenComponent } from '@inst/transportation/maintenance/view/oimsglen.component';
import { OimstripComponent } from '@inst/transportation/maintenance/view/oimstrip.component';
import { OidfixadComponent } from '@inst/transportation/maintenance/view/oidfixad.component';
import { OidgenstComponent } from '@inst/transportation/maintenance/view/oidgenst.component';
import { OiuselveComponent } from '@inst/transportation/maintenance/view/oiuselve.component';
import { OummerofComponent } from '@sa/admin/mergeoffenders/view/oummerof.component';
import { OumtrnbkComponent } from '@sa/admin/mergeoffenders/view/oumtrnbk.component';
import { OiurepinComponent } from '@inst/incidents-oic/view/oiurepin.component';
import { OimiitpsComponent } from '@inst/offender-issues-tracking/maintenance/view/oimiitps.component';
import { OcureminComponent} from '@inst/schedules/view/ocuremin.component';
import { OidphuncComponent } from '@inst/movements/proposedmovements/view/oidphunc.component';
import { OidinpliComponent } from '@inst/movements/proposedmovements/view/oidinpli.component';
import { OidhoustComponent} from '@inst/movements/proposedmovements/view/oidhoust.component';
import { OiusanctComponent } from '@inst/movements/proposedmovements/view/oiusanct.component';
import { OiuschovComponent } from '@inst/movements/proposedmovements/view/oiuschov.component';
import { OiuononaComponent } from '@inst/movements/proposedmovements/view/oiuonona.component';
import {OiuschcoComponent}  from '@inst/movements/proposedmovements/view/oiuschco.component';
import { OcipenscComponent } from '@inst/legal/view/ocipensc.component';
import { OsipsearidialogComponent } from '@inst/visits-management/view/osipsearidialog.component';
import { JiscommonconfirmboxComponent } from '@inst/visits-management/view/jiscommonconfirmbox.component';
import { UnauthorizeComponent } from '@common/unauthorize/unauthorize.component';
import { OcuallcoComponent } from '@cm/searchassaign/view/ocuallco.component';
import { SsoResolver } from './sso.resolver';
import { SsologoutResolver } from './ssologout.resolver';
import { CustomConfirmGuard } from './custodial.guard';
import { ConfigurationResolver } from './configuration.resolver'
import { OimallowComponent } from '@inst/institutional-activities/maintenance/view/oimallow.component';
import { OidallowComponent } from '@inst/institutional-activities/view/oidallow.component';
import { deleteDocumentDialog } from '@common/iwp/delete-document-dialog.component.';
import {OidsmsetComponent} from '@inst/schedules/maintenance/view/oidsmset.component';
import { OimprostComponent } from '@inst/property/view/oimprost.component';

const appRoutes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent, resolve: { ssoInfo: SsoResolver } },
  { path: 'logout', component: SsoLogoutComponent },
  { path: 'error', component: ServerErrorComponent },
  { path: 'id_token', component: AppHomeComponent },
  { path: 'homedialog', component: AppHomeDialogComponent },
  { path: 'osioseardialog', component: OsioseardialogComponent },
  { path: 'intakeDialog', component: IntakedialogComponent },
  {path: 'rejectDialog', component: RejectDialogComponent},
  { path: 'helpVideo', component: HelpVideoComponent },
  { path: 'ocuoicin', component: OcuoicinComponent },
  { path: 'ocuoiche', component: OcuoicheComponent },
  { path: 'ocuoichn', component: OcuoichnComponent },
  { path: 'oimoicoidialog', component: OimoicoidialogComponent },
  { path: 'omuavbed', component: OmuavbedComponent },
  { path: 'ocuoicch', component: OcuoicchComponent },
  { path: 'ocuoicaw', component: OcuoicawComponent },
  { path: 'oimoicmpdialog', component: OimoicmpdialogComponent },
  { path: 'oimuheby', component: OimuhebyComponent },
  { path: 'ocuoicpe', component: OcuoicpeComponent },
  { path: 'OIIINLOGPOPUP', component: OiiinlogpopupComponent },
  { path: 'OIUINCRP', component: OiuincrpComponent },
  { path: 'ocdccont', component: OcdccontComponent },
  { path: 'OCDGNUMB', component: OcdgnumbComponent },
  { path: 'OCDOAPOP', component: OcdoapopComponent },
  { path: 'ocualert', component: OcualertComponent },
  { path: 'omsmodule', component: OmsmoduleComponent },
  { path: 'omsroles', component: OmsrolesComponent },
  { path: 'oumuserscl', component: OumusersclComponent },
  { path: 'oumusersrls', component: OumusersrlsComponent },
  { path: 'oumaglocpop', component: OumaglocpopComponent },
  { path: 'ocuoicawpopup', component: OcuoicawPopUpComponent },
  { path: 'ocucoffeconfirmbox', component: OcucoffeconfirmboxComponent },
  { path: 'managepropsdlg', component: ManagePropertiesDialogComponent },
  { path: 'SEALDIALOG', component: SealdialogComponent },
  { path: 'WARNDIALOG', component: WarndialogComponent },
  { path: 'OIDINCDECHARGEPOPUP', component: OidincdeChargePopUpComponent },
  { path: 'OIDITRANAGYLOCS', component: OiditranagylocsComponent },
  { path: 'OIUSTGAS', component: OiustgasComponent },
  { path: 'oiustgaslov', component: OiustgaslovComponent },
  { path: 'OIDINCDESTAFFPOPUP', component: OidincdeStaffPopUpComponent },
  { path: 'oidstabsagyloc', component: OidstabsagylocpopupComponent },
  { path: 'oidstabsbus', component: OidstabsbuspopupComponent },
  { path: 'oidstabsoth', component: OidstabsothpopupComponent },
  { path: 'oidscmovconfirmbox', component: OidscmovconfirmboxComponent },
  { path: 'oiuscinq', component: OiuscinqComponent },
  { path: 'ocurwarn', component: OcurwarnComponent },
  // {path: 'OMUERRCO', component: OmuerrcoComponent },
  { path: 'oidstwjuappbypopup', component: OidstwjuappbypopupComponent },
  { path: 'oidstwjuconfirmationpopup', component: OidstwjuconfirmationpopupComponent },
  { path: 'oidstwjudelnotifipopup', component: OidstwjudelnotifipopupComponent },
  { path: 'omuerrcoconfirmationpopup', component: OmuerrcoconfirmationpopupComponent },
  { path: 'OIINTLOC', component: OiintlocComponent },
  { path: 'OCUWARNG', component: OcuwarngComponent },
  { path: 'OCUOFFEN', component: OcuoffenComponent },
  { path: 'OUMORCOD', component: OumorcodComponent },
  { path: 'progrefdialog', component: OcucondiDialogProgref },
  { path: 'OCUHOLDS', component: OcuholdsComponent },
  { path: 'OMURMRES', component: OmurmresComponent },
  { path: 'OMUAVLOC', component: OmuavlocComponent },
  { path: 'osinamesdialog', component: OsinamesdialogComponent },
  { path: 'oidadmisconfirmbox', component: OidadmisconfirmboxComponent },
  { path: 'oiinamesdialog', component: OiinamesdialogComponent },
  { path: 'scheduleCalendar', component: ScheduleCalendarDialogComponent },
  { path: 'oidehlocconfirmationpopup', component: OidehlocconfirmationpopupComponent },
  { path: 'OCUCCIDE', component: OcuccideComponent },
  { path: 'OCUPSRDE', component: OcupsrdeComponent },
  { path: 'OCULCASE', component: OculcaseComponent },
  { path: 'OCUNOQUE', component: OcunoqueComponent },
  { path: 'OMUCLASS', component: OmuclassComponent },
  { path: 'OCUNOTCM', component: OcunotcmComponent },
  { path: 'OCUCALCR', component: OcucalcrComponent },
  { path: 'OCUSOFNC', component: OcusofncComponent },
  { path: 'OCUSTFAS', component: OcustfasComponent },
  { path: 'OCUSTFASPOPUP', component: OcustfaspopupComponent },
  { path: 'OCUTASAT', component: OcutasatComponent },
  { path: 'oidshlogconfirmationpopup', component: OidshlogconfirmationpopupComponent },
  { path: 'OIDRPLANPOPUP', component: OidrplanpopupComponent },
  { path: 'oiishlogdetailspopup', component: OiishlogdetailspopupComponent },
  { path: 'ocucname', component: OcucnameComponent },
  { path: 'oiddecasconfirmbox', component: OiddecasconfirmboxComponent },
  { path: 'OCULEGST', component: OculegstComponent},
  // { path: 'OCULEGST_AU', component: Oculegst_auComponent },
  { path: 'OCULEGSTSENT', component: OculegstSentenceComponent },
  { path: 'OCULEGSTCOND', component: OculegstConditionComponent },
  { path: 'OCUCONDI', component: OcucondiComponent },
  { path: 'OCUUCOND', component: OcuucondComponent },
  { path: 'OCUCONDIDLG', component: OcucondiDialogComponent },
  { path: 'OIDRPLANPROPOSEDEMPLOMENTPOPUP', component: OidrplanproposedemplomentpopupComponent },
  { path: 'oidshlogconfirmationpopup', component: OidshlogconfirmationpopupComponent },
  { path: 'OCUCNPER', component: OcucnperComponent },
  { path: 'oidcountloader',component: OidcountloaderComponent},
  { path: 'OCUPERPR', component: OcuperprComponent },
  { path: 'OCUOCCUP', component: OcuoccupComponent },
  { path: 'OIDREMCS', component: OidremcsComponent },
  { path: 'OIIUNROL', component: OiiunrolComponent },
  { path: 'OIIINROL', component: OiiinrolComponent },
  { path: 'OCUVERIF', component: OcuverifComponent },
  { path: 'ocuoccupnamedlg', component: OcuoccupnamedlgComponent },
  { path: 'OCUCLOFF', component: OcucloffComponent },
  { path: 'oidcountpopup', component: OidcountPopUpComponent },
  { path: 'osipserdialog', component: OsipserdialogComponent },
  { path: 'OCUAVLOC', component: OcuavlocComponent },
  { path: 'OCUPREST', component: OcuprestComponent },
  { path: 'OMUAPRIS', component: OmuaprisComponent },
  { path: 'OIUINCRE', component: OiuincreComponent },
  { path: 'OIDRECOR', component: OidrecorComponent },
  { path: 'OIUPRRES', component: OiuprresComponent },
  { path: 'OCUAVISN', component: OcuavisnComponent },
  { path: 'OIUOVRES', component: OiuovresComponent },
  { path: 'OMUVRESTDIALOG', component: OmuvrestdialogComponent },
  { path: 'HOUSING', component: HousingComponent },
  { path: 'OCUUPSTA', component: OcuupstaComponent },
  { path: 'ocdaworkdailog', component: ocdaworkdailogComponent },
  { path: 'consToLine', component: ConsToLineComponent },
  { path: 'relatedToLine', component: RelatedToLineComponent },
  { path: 'OCDINTPA', component: OcdintpaComponent },
  { path: 'nonCustRelated', component: NonCustRelatedComponent },
  { path: 'termToLine', component: TermToLineComponent },
  { path: 'durationToLine', component: DurationToLineComponent },  
  { path: 'multiCount', component: MulticountComponent },
  { path: 'nonCustDuration', component: NoncustdurationComponent },
  { path: 'OcdchgsuDlg', component: OcdchgsuDlgComponent },
  { path: 'CHARGESDLG', component: ChargesdialogComponent },
  { path: 'OCDCHGDT', component: OcdchgdtComponent },
  { path: 'OCUCHGOU', component: OcuchgouComponent },
  { path: 'OCDPNOTE', component: OcdpnoteComponent },
  { path: 'OIUIWPVE', component: OiuiwpveComponent },
  { path: 'OciscataadvancesearchpopupComponent', component: OciscataadvancesearchpopupComponent },
  { path: 'ociscatadialog', component: OciscatadialogComponent },
  { path: 'reportdialog', component: ReportInputControllComponent },
  { path: 'OTUSUBAC', component: OtusubacComponent },
  //  { path: 'OIUIWPGN', component: OiuiwpgnComponent },
  { path: 'OTUCPAYE', component: OtucpayeComponent },
  { path: 'OCUOVROB', component: OcuovrobComponent },
  { path: 'OTMREMIT', component: OtmremitComponent },
  { path: 'OTINAMESDIALOG', component: OtinamesdialogComponent },
  { path :'REPINPPAR' , component : OirreportdialogComponent },
  { path: 'PSLQUERY', component: OirreportParameterQueryComponent},
  { path : 'OIRRPORTPARAMS', component: OirreportParameterDialogComponent},
  { path : 'OIREDITASSET', component: OirreportEditAssetComponent},
  { path: 'OCUOBHIS', component: OcuobhisComponent },
  { path: 'otidtaccdialog', component: OtidtaccdialogComponent },
  { path: 'OCUSREPS', component: OcusrepsComponent },
  { path: 'OTUSUBAD', component: OtusubadComponent },
  { path: 'OCDCBENEDIALOG', component: OcdcbenedialogComponent },
  { path: 'OTDGLIRTDIALOG', component: OtdglirtdialogComponent },
  { path: 'OTUCOBWH', component: OtucobwhComponent },
  //  { path: 'OCDBIREV', component: OcdbirevComponent },
  { path: 'OCUTRAHI', component: OcutrahiComponent },
  { path: 'OCUVWARN', component: OcuvwarnComponent },
  { path: 'oiuimagedialog', component: OiuimagedialogComponent },
  { path: 'oiuimageexportscreen', component: OiuimageExportScreenComponent },
  { path: 'propertyimagedialog', component: PropertyImageDialogComponent },
  { path: 'imagecapturedialog', component: ImageCaptureDialogComponent },
  { path: 'OTUPAYIN', component: OtupayinComponent },
  { path: 'OTUGLTRD', component: OtugltrdComponent },
  { path: 'OCMCTOFF', component: OcmctoffComponent },
  { path: 'OCUWKHTY', component: OcuwkhtyComponent },
  { path: 'OTUINVAC', component: OtuinvacComponent },
  { path: 'NEWCON', component: NewContainerComponent },
  { path: 'CAMDLG', component: CameraDialogComponent },
  { path: 'OIDARHPL', component: OidarhplComponent },
  { path: 'otucobwodialog', component: OtucobwoComponent },
  { path: 'OTUHOLDR', component: OtuholdrComponent },
  { path: 'OTURNUMB', component: OturnumbComponent },
  { path: 'OCUCORPT', component: OcucorptComponent },
  { path: 'CONTACTBUSINESS', component: ContactBusinessComponent },
  { path: 'OTUACODE', component: OtuacodeComponent },
  { path: 'OUMAGENCDIALOG', component: OumagencDialogComponent },
  { path: 'OIUFSOFF', component: OiufsoffComponent },
  { path: 'OIISTGMI', component: OiistgmiComponent },
  { path: 'OIITGDETDIALOG', component: OiitgdetDialogComponent },
  { path: 'OIMTGOPTDIALOG', component: OimtgoptComponent },
  { path: 'OIDSTGVL', component: OidstgvlComponent },
  { path: 'OIISTGMB', component: OiistgmbComponent },
  { path: 'OIDSTGID', component: OidstgidComponent },
  { path: 'OIDMBRVL', component: OidmbrvlComponent },
  { path: 'OIDMBRAS', component: OidmbrasComponent },
  { path: 'OIDAPPND', component: OidappndComponent },
  { path: 'OIDSTGCN', component: OidstgcnComponent },
  { path: 'OIDONONADIALOG', component: OidononaDialogComponent },
  { path: 'OCDALIASDIALOG', component: OcdaliasDialogComponent },
  { path: 'OIDPIDENDIALOG', component: OidpidenDialogComponent },
  { path: 'OCDNOQUEDIALOG', component: OcdnoqueDialogComponent },
  { path: 'OIDSTGIN', component: OidstginComponent },
  { path: 'OIDSTGAE', component: OidstgaeComponent },
  { path: 'OIDSTGHL', component: OidstghlComponent },
  { path: 'OIDOICUSDIALOG', component: OidoicusDialogComponent },
  { path: 'OCINAMESDIALOG', component: OcinamesDialogComponent },
  { path: 'OCMSVASS', component: OcmsvassComponent },
  //  { path: 'OCMSVPHA', component: OcmsvphaComponent },
  { path: 'OCMPHBLK', component: OcmphblkComponent },
  { path: 'OIUNONAS', component: OiunonasComponent },
  { path: 'OIMSENOT', component: OimsenotComponent },
  { path: 'OIDSCHAC', component: OidschacComponent },
  { path: 'OIDACSEL', component: OidacselComponent },
  { path: 'OCUPAYPL', component: OcupayplComponent },
  { path: 'OSUNMEMO', component: OsunmemoComponent },
  { path: 'OSUCNOTE', component: OsucnoteComponent },
  //  { path: 'OCDAPEAL_AU', component: OcdapealComponent },
  { path: 'OCUGLTRD', component: OcugltrdComponent },
  { path: 'OCIPPHIS', component: OcipphisComponent },
  { path: 'OCUINTLC', component: OcuintlcComponent },
  //  { path: 'OUIMTLOG', component: OuimtlogComponent },
   { path: 'OUIMTLOG', component: OuimtlogComponent },
  { path: 'OIMMHOLODIALOG', component: OimmholoDialogComponent },
  { path: 'OIMMHOLOPOPUP', component: OimmholopopupComponent },
  { path: 'OIMMHOLODIALOGONE', component: OimmholoDialogOneComponent },
  { path: 'OIMMHOLODIALOGTWO', component: OimmholoDialogTwoComponent },
  { path: 'OUMHLHISDIALOG', component: OumhlhisdialogComponent },
  //  { path: 'OUIMTSTP', component: OuimtstpComponent },
  { path: 'OUIMTSTP', component: OuimtstpComponent },
  { path: 'OIDDISRE', component: OiddisreComponent },
  { path: 'OCDCPPAY', component: OcdcppayComponent },
  { path: 'OCUOTRAH', component: OcuotrahComponent },
  {path:'viewFile', component:ViewFileComponent},
  {path:'checkout', component:CheckOutComponent},
  {path:'final', component:FinalActionButtonComponent},
  {path:'generateDialog', component: GenerateDialogComponent},
  {path:'canceldialog', component: CancelGenerateComponent},
  {path:'deleteDocDialog', component: deleteDocumentDialog},
  {path:'action', component:ActionComponent},
  { path: 'OCUDPDIS', component: OcudpdisComponent  },
  { path: 'OIUVLCTE', component: OiuvlcteComponent  },
  { path: 'OCUHVTEA', component: OcuhvteaComponent },
  { path: 'OUMSTAFC', component: OumstafcComponent },
  { path: 'OCUINCWPHIS', component: OcuincwpHistoryComponent },
  { path: 'OCUINCWP', component: OcuincwpComponent },


  { path: 'OIDSTFRPPOPUP', component: OidstfrppopupComponent },
  { path: 'OIUIRAME', component: OiuirameComponent },
  { path: 'OIDINCDEPOPUP', component: OidincdepopupComponent },

  { path: 'OCUINCFE', component: OcuincfeComponent },
  { path: 'OCUOICAP', component: OcuoicapComponent },
  { path: 'OSUOICUS', component: OsuoicusComponent },
  //  { path: 'OMUWKASS', component: OmuwkassComponent },
  //  {path: 'serioussentencdialog', component: SeriousSentenceDetailDialogComponent},
  { path: 'OSUEMAIL', component: OsuemailComponent },
  //  { path: 'OCMSSVAS', component: OcmssvasComponent },
  { path: 'OSUNTASK', component: OsuntaskComponent },
  { path: 'OCMSOSCH', component: OcmsoschComponent },
  //  { path: 'OCIOFFNC', component: OcioffncComponent },
  { path: 'OUIAUSES', component: OuiausesComponent },
  { path: 'OCMSSVCT', component: OcmssvctComponent },
  { path: 'OIUSMSEL', component: OiusmselComponent },
  { path: 'OCMSTOFF', component: OcmstoffComponent },
  { path: 'OCUPAOFF', component: OcupaoffComponent },
  //  { path: 'OUMDTEMPDIALOG', component: OumdtempdialogComponent },
  { path: 'OIDCNOTEDIALOG', component: OidcnoteDialogComponent },
  { path: 'OCMSCHRC', component: OcmschrcComponent },
  { path: 'OCDSMEMODIALOG', component: OcdsmemodialogComponent },
  { path: 'OUMBMARKDIALOG', component: OumbmarkdialogComponent },
  { path: 'OUMDTEMPDIALOG', component: OumdtempdialogComponent },
  { path: 'OCUCSTAF', component: OcucstafComponent },
  //  { path: 'OIDRELEADIALOG', component: oidreleaDialogComponent },
  //  { path: 'OCISHTCD', component: OcishtcdComponent },
  //  { path: 'OCDSENTD', component: OcdsentdComponent },
  {path: 'OIUSTINV', component:  OiustinvComponent},
  { path: 'OCUAOFFI', component: OcuaoffiComponent },
  { path: 'OCUMAOFF', component: OcumaoffComponent },
  { path: 'OCUAUTHR', component: OcuauthrComponent },
  { path: 'OCUWARNI', component: OcuwarniComponent },
  { path: 'OCUADJCR', component: OcuadjcrComponent },
  { path: 'OCMSUWPJDLGL', component: OcmsuwpjDlglComponent },
  { path: 'OCUMPVAV', component: OcumpvavComponent },
 { path: 'OCMSSVAS', component: OcmssvasComponent },
 { path: 'OCUOSCPV', component: OcuoscpvComponent },
 { path: 'TASKFORMDIALOG', component: TaskFormDialogComponent },
 { path: 'OCUSSESS', component: OcussessComponent },
 { path: 'PROGLOCADIALOG', component: ProglocaDialogComponent },
 { path: 'OCMSVMOD', component: OcmsvmodComponent },
 { path: 'OCMSVPHA', component:OcmsvphaComponent},
 { path: 'OCDPROGRDIALOG', component: OcdprogrDialogComponent },
{ path: 'OCMSCHPR', component: OcmschprComponent },
{ path: 'OCMSCHPRFORMBOX', component: OcmschprformboxComponent },
{ path: 'OCUSCHPR', component: OcuschprComponent },
{ path: 'OCMPHMOD', component: OcmphmodComponent },
{ path: 'OCMSVACPDIALOUG', component: OcmsvacpDialougComponent },
{ path:'OCUPATOF' , component: OcupatofComponent},
{ path: 'OCUMULTI', component: OcumultiComponent },
{ path: 'OCUSCUPS', component: OcuscupsComponent },
{ path: 'OCUSMODU', component: OcusmoduComponent },
{path: 'TASKREJECT', component: TaskRejectDialogComponent},
{ path: 'CMDQUERY', component: CmdqueryComponent },
{ path: 'OIDOICAPPOPUP', component: OidoicapPopUpComponent },
{ path: 'OIDOICAPPENALTYPOPUP', component: OidoicapPenaltyPopUpComponent },
{ path: 'OIMCSUMM', component: OimcsummComponent },
{ path: 'OCUFOVDT', component: OcufovdtComponent },
{ path: 'OCUACHIS', component: OcuachisComponent },
{path : 'TEAMDIALOG', component: teamDialogComponent},
{ path: 'multiLov', component: GridLovDialog },
{ path: 'OCUTRDET', component: OcutrdetComponent },
{ path: 'OCUBADJS', component: OcubadjsComponent },
{ path: 'CONDLEGALTEXT',component: CondLegalTextComponent},
{ path: 'OSANVICOMMENT', component: OsanviosCommentText },
{ path: 'OIUHOFFL', component: OiuhofflComponent },
{ path: 'OCSPROINDIALOG', component: OcsproindialogComponent },
{path : 'OCUFOVHT', component: OcufovdtdialogComponent}, 
  { path: 'OCDPSREPDIALOG', component: OcdpsrepdialogComponent },
  {path:'OCUNAWRN', component : OcunawarnComponent },
  {path:'OIUZOHOS', component : OiuzohosComponent },
  {path:'OIDOOBAD', component : OidoobadComponent },
{path :'OIDSTFRP', component:OidstfrpdialogComponent},
{path : 'OIMWORKDIALOG' , component : OimworkrdialogComponent},
  {path : 'OCDLODET' , component : OcdlodetdialogComponent},
	{ path: 'OCUNOQUEDIALOG', component: OcunoqueDialogComponent },
  {path :'staffreportdetail', component:StaffReportDetailComponent},
  {path :'OIDSHLOGDIALOG',component: OidshlogDialogComponent},
  {path :'ADDOFFENDER',component: AddOffenderComponent},
    { path: 'OCUCIEID', component: OcucieidComponent },
    { path: 'OCUOVKEY', component: OcuovkeyComponent},
    { path: 'OCUVERKD', component: OcuverkdComponent},
    { path: 'OCMTIDET', component: OcmtidetComponent},
    { path: 'OCDONOST', component: OcdonostComponent},
    { path: 'RemissionDuration', component: RemissionDurationComponent},
    {path: 'OCDIPLAC' ,component: OcdiplacComponent},
    { path: 'OCUDCOND', component: OcudcondComponent },
    { path: 'OCUPDETA', component: OcupdetaComponent},
	{ path:'OIUSELVE',component: OiuselveComponent},
    { path: 'OIDGENST', component: OidgenstComponent},
    { path: 'OUMTRNBK', component: OumtrnbkComponent },
    {path: 'OIUREPIN',component: OiurepinComponent},
    {path: 'OCUREMIN',component: OcureminComponent},
    {path: 'OIUSANCT',component: OiusanctComponent},
    {path:'OIUSCHOV',component:OiuschovComponent},
    {path: 'OIUONONA',component: OiuononaComponent},
    {path: 'OIUSCHCO',component: OiuschcoComponent},
    {path: 'OSIPSEARIDIALOG',component: OsipsearidialogComponent},
    {path: 'JISCOMMONCONFIRMBOX',component:JiscommonconfirmboxComponent},
    {path :'OCUALLCO' , component : OcuallcoComponent},
    
  {
    path: '', component: AppHomeComponent,
    children: [
      { path: 'home', component: InmateIntakeSummaryComponent },
      { path: 'OIRISPAG', component: LandingPageComponent },
      { path: 'OSIOSEAR', component: OsiosearComponent },
      {path :'OIIOBALX', component:OiiobalxComponent},
      { path: 'OCDALIAS', component: OcdaliasComponent },
      { path: 'UPLOADDOC', component: UploadDocumentComponent },
      { path: 'EDITDOC', component: EditDocumentComponent, resolve: { configData: ConfigurationResolver }},
      { path: 'SIGNDOC', component: SignComponent }, 
      { path: 'UPLOADTEMPLATE', component: UploadtemplateComponent },
      {path:'PORTALAPP', component:PortalAppComponent},
      {path:'PORTALSCHAPP', component:PortalScheduleComponent},

      {path:'INSIGHTS', component: DashboardListingComponent},
      {path:'DSHBVIEW', component: DashboardRenderComponent},
      {path:'INSDSBVW', component: DsbmodRendererComponent},
      {path:'DSHBEDIT', component: DashboardEditComponent},
      {path:'DSHBCREATE', component: DashboardCreateComponent},
      {path:'BIDATASOURCE', component: DatasourceListingComponent},
      {path:'DTSREDIT', component: DatasourceEditComponent},
      {path:'DTSRCREATE', component: DatasourceCreateComponent},
      {path:'DTSRVIEW', component: DatasourceRenderComponent},

      {path:'OUMSYLAB', component:OumsyslabComponent},
      {path:'OLISET', component:OlisetComponent},
      {path:'OMSHELP', component:OmshelpComponent},
      // { path: 'OIMOICOI', component: OimoicoiComponent },
      { path: 'OIDINCDE', component: OidincdeComponent },
      { path: 'OCDALERT', component: OcdalertComponent },
      { path: 'UNAUTHORIZE', component: UnauthorizeComponent },
      { path: 'OIUIMAGE', component: OiuimageComponent },
      { path: 'OIDOICUS', component: OidoicusComponent },
      { path: 'OIDPINFO', component: OidpinfoComponent },
      { path: 'OCDADDRE', component: OcdaddreComponent },
      { path: 'OIIOICUS', component: OiioicusComponent },
      { path: 'OIDADMIS', component: OidadmisComponent },
      { path: 'OIDPIDEN', component: OidpidenComponent },
      { path: 'OIDRELEA', component: OidreleaComponent },
      { path: 'OCUCOFFE', component: OcucoffeComponent },
      { path: 'OIIINLOG', component: OiiinlogComponent },
      { path: 'OCDEDEMP', component: OcdedempComponent },
      { path: 'OWHEADER', component: DashBoardComponent },
      { path: 'OUMACASE', component: OumacaseComponent },
      { path: 'OUMUSERS', component: OumusersComponent },
      { path: 'OUMPERSO', component: OumpersoComponent },
      { path: 'OUMAGLOC', component: OumaglocComponent },
      { path: 'OUMSYPFL', component: OumsypflComponent },
      { path: 'OUMROLES', component: OumrolesComponent },
      { path: 'OUMUCREAT', component: OumucreatComponent },
      { path: 'OIDMPCON', component: OidmpconComponent },
      { path: 'OIDDPROP', component: OiddpropComponent },
      { path: 'OUMASSMU', component: OumassmuComponent },
      { path: 'OIIPTRAN', component: OiiptranComponent },
      { path: 'OIIPCLOC', component: OiipclocComponent },
      { path: 'OIDTPCON', component: OidtpconComponent },
      { path: 'OIINAMES', component: OiinamesComponent },
//      { path: 'OIDTPRIT', component: OidtpritComponent },
      { path: 'OIIPCTRA', component: OiipctraComponent },
      { path: 'OIDVCONT', component: OidvcontComponent },
      { path: 'OIDRPITM', component: OidrpitmComponent },
      { path: 'OIDRTCON', component: OidrtconComponent },
      { path: 'OIDTRWJU', component: OidtrwjuComponent },
      //  { path: 'OUMAPASS', component: OumapassComponent },
      { path: 'OUMRCODE', component: OumrcodeComponent },
      { path: 'OIPASINF', component: PasswordDialogComponent },
      { path: 'OUMBUNDL', component: OumbundlComponent},
      { path: 'OIDITRAN', component: OiditranComponent },
      { path: 'OWINTAKE', component: InmateIntakeSummaryComponent },
//      {path :'OIDSTFRP', component:OidstfrpdialogComponent},
      { path: 'OIDSTABS', component: OidstabsComponent },
      { path: 'OIDSCMOV', component: OidscmovComponent },
      //{ path: 'OCUSMODU', component: OcusmoduComponent },
      { path: 'OIDSCEXM', component: OidscexmComponent },
      { path: 'OIDTROJU', component: OidtrojuComponent },
      { path: 'OIIEMOVE', component: OiiemoveComponent },
      { path: 'OIIWLTWJ', component: OiiwltwjComponent },
      { path: 'OIDBUTAB', component: OidbutabComponent },
      { path: 'OIDSTWJU', component: OidstwjuComponent },
      { path: 'OIDSTOJU', component: OidstojuComponent },
      { path: 'OCDCLIST', component: OcdclistComponent },
      { path: 'OIDBSTRN', component: OidbstrnComponent },
      { path: 'OIDUNCTA', component: OidunctaComponent },
      { path: 'OIDPAWLI', component: OidpawliComponent },
      { path: 'OIDESCAP', component: OidescapComponent },
      { path: 'OMUERRCO', component: OmuerrcoComponent },
      { path: 'OIIOSCED', component: OiioscedComponent },
      { path: 'OIICMOCI', component: OiicmociComponent },
      { path: 'OIDINTMV', component: OidintmvComponent },
      { path: 'OIDBSIAP', component: OidbsiapComponent },
      { path: 'OIDSIAPP', component: OidsiappComponent },
      { path: 'OIIDMOVE', component: OiidmoveComponent },
      //  { path: 'OIDSCALC', component: OidscalcComponent },
      { path: 'OCDCCASE', component: OcdccaseComponent }, 
      { path: 'OCDCHGSU', component: OcdchgsuComponent },
      { path: 'OCDCORDS', component: OcdlegloComponent, canDeactivate: [CustomConfirmGuard] }, 
      { path: 'OCDBAILO', component: OcdbailoComponent },
      { path: 'OCDPAROR', component: OcdparorComponent },
      { path: 'OCDNCODE', component: OcdleglnComponent },
      { path: 'OCDLEGLS', component: OcdleglsComponent }, 
      { path: 'OIDCRTEV', component: OidcrtevComponent },
      //  { path: 'OCDCCASE_AU', component: Ocdccase_auComponent },
      { path: 'OIDRHLOC', component: OidrhlocComponent },
      { path: 'OIDCHLOC', component: OidchlocComponent },
      { path: 'HOUSE_ADM', component: HousingAdministrationComponent },
      { path: 'OFFSCH', component: OffenderScheduleComponent },
      { path: 'OIDCHOLO', component: OidcholoComponent },
      { path: 'OSINAMES', component: OsinamesComponent },
      { path: 'OIDEHLOC', component: OidehlocComponent },
      //  { path: 'OIIOFFOB', component: OiioffobComponent },
      { path: 'OIDCIPON', component: OidciponComponent },
      { path: 'OIDCNOTE', component: OidcnoteComponent },
      { path: 'OCDLANGS', component: OcdlangsComponent },
      { path: 'OCDNOQUE', component: OcdnoqueComponent },
      { path: 'OIDMHIST', component: OidmhistComponent },
      { path: 'OIDCAPPR', component: OidcapprComponent },
      { path: 'OIICLASS', component: OiiclassComponent },
      { path: 'OCIIPLAN', component: OciiplanComponent },
      { path: 'OIIISCOU', component: OiiiscouComponent },
      { path: 'OIDSHLOG', component: OidshlogComponent },
      { path: 'OIISHLOG', component: OiishlogComponent },
      { path: 'OIDISTAT', component: OidistatComponent },
      { path: 'OCDIPLAN', component: OcdiplanComponent },
      { path: 'OIDRPLAN', component: OidrplanComponent },
      { path: 'OCIOCNOT', component: OciocnotComponent },
      { path: 'OCDLEGST', component: OcdlegstComponent },
      //  { path: 'OCDLEGST_AU', component: Ocdlegst_auComponent },
      // { path: 'OIDDECAS', component: OiddecasComponent },
      { path: 'OCDPERSO', component: OcdpersoComponent },
      { path: 'OSIPSEAR', component: OsipsearComponent },
      { path: 'OIIPROLL', component: OiiprollComponent },
      { path: 'OIDCOUNT', component: OidcountComponent },
      { path: 'OIDSUBLC', component: OidsublcComponent },
      { path: 'OIDOJOIN', component: OidojoinComponent },
      { path: 'OIDVERCC', component: OidverccComponent },
      { path: 'OIIHISCO', component: OiihiscoComponent },
      { path: 'OIDVTOUR', component: OidvtourComponent },
      { path: 'OIDVISIT', component: OidvisitComponent },
      { path: 'OIIVISIT', component: OiivisitComponent },
      { path: 'OIDISSUE', component: OidissueComponent },
      // { path: 'OIDSENKD', component: OidsenkdComponent },
      { path: 'OIDSENHY', component: OidsenhyComponent },
      { path: 'OIDHWDET', component: OidhwdetComponent },
      { path: 'OIIGRIEV', component: OiigrievComponent },
      // { path: 'OIDSENAD', component: OidsenadComponent },
      { path: 'OIDVIRES', component: OidviresComponent },
      { path: 'OMUVREST', component: OmuvrestComponent },
      { path: 'OCDXPROG', component: OcdxprogComponent },
      { path: 'OCDAWORK', component: OcdaworkComponent },
      { path: 'OCISCATA', component: OciscataComponent },
      { path: 'OCDTWORK', component: OcdtworkComponent },
      { path: 'OCDOTASK', component: OcdotaskComponent },
      { path: 'OCDMWORK', component: OcdmworkComponent },
      { path: 'HOUSCLEAN', component: HousingCleanupComponent },
      { path: 'OTIDTACC', component: OtidtaccComponent },
      { path: 'OTDRDTFU', component: OtdrdtfuComponent },
      { path: 'OTDDISBU', component: OtddisbuComponent },
      { path: 'OTDHOLDT', component: OtdholdtComponent },
      { path: 'OTINAMES', component: OtinamesComponent },
      { path: 'OTDTTACC', component: OtdttaccComponent },
      { path: 'OTDOALLO', component: OtdoalloComponent },
      { path: 'OTDCLOSE', component: OtdcloseComponent },
      { path: 'OTDRECEI', component: OtdreceiComponent },
      { path: 'OCDPAYOB', component: OcdpayobComponent },
      { path: 'OTDHIREM', component: OtdhiremComponent },
      { path: 'OCICBENE', component: OcicbeneComponent },
      { path: 'OCDCASHR', component: OcdcashrComponent },
      { path: 'OTDMGJTR', component: OtdmgjtrComponent },
      { path: 'OTDOPCTA', component: OtdopctaComponent },
      { path: 'OCIPBENE', component: OcipbeneComponent },
      { path: 'OTDSUBAT', component: OtdsubatComponent },
      { path: 'OTDAACCO', component: OtdaaccoComponent },
      { path: 'OSUREPOR', component: OsureporComponent },
      { path: 'OCDOOBLI', component: OcdoobliComponent },
      { path: 'OTDSDEDU', component: OtdsdeduComponent },
      { path: 'OTDOFREZ', component: OtdofrezComponent },
      { path: 'OTIOPINQ', component: OtiopinqComponent },
      { path: 'OCDOTFEE', component: OcdotfeeComponent },
      //    { path: 'OTSINDIS', component: OtsindisComponent },
      { path: 'OTDBACRE', component: OtdbacreComponent },
      //    { path: 'Otsdjlog', component: OtsdjlogComponent },
      //    { path: 'OTMDEMOG', component: OtmdemogComponent },
      { path: 'OTDRTTFU', component: OtdrttfuComponent },
      { path: 'OTIGLBAL', component: OtiglbalComponent },
      //    { path: 'OTDAUREC', component: OtdaurecComponent },
      { path: 'OTSRECEI', component: OtsreceiComponent },
      { path: 'OTDGLIRT', component: OtdglirtComponent },
      //    { path: 'OTRCHECK', component: OtrcheckComponent },
      { path: 'OTDCNTAC', component: OtdcntacComponent },
      { path: 'OCDCBENE', component: OcdcbeneComponent },
      { path: 'OTDCRVOI', component: OtdcrvoiComponent },
      { path: 'OTSTASTA', component: OtstastaComponent },
      { path: 'OTDCLINA', component: OtdclinaComponent },
      { path: 'OTDAGJTR', component: OtdagjtrComponent },
      //    { path: 'OMSRELST', component: OmsrelstComponent },
      { path: 'OIDSTEST', component: OidstestComponent },
      { path: 'OISREPORT', component: ReportInputControllComponent, runGuardsAndResolvers: 'always' },
      { path: 'OCMTRANS', component: OcmtransComponent },
      { path: 'OCMTROPS', component: OcmtropsComponent },
      { path: 'OIDMPITM', component: OidmpitmComponent },
      { path: 'OIDARFPL', component: OidarfplComponent },
      { path: 'RESADUSR', component: MigadusrComponent },
      { path: 'OTMFREEZ', component: OtmfreezComponent },
      { path: 'OCMMPBAL', component: OcmmpbalComponent },
      { path: 'OTMTFPRO', component: OtmtfproComponent },
      { path: 'OCMDEDUT', component: OcmdedutComponent },
      { path: 'OTMALPRO', component: OtmalproComponent },
      { path: 'OTMDPRIO', component: OtmdprioComponent },
      { path: 'OTMCOPRO', component: OtmcoproComponent },
      { path: 'OTMFOPRO', component: OtmfoproComponent },
      { path: 'OTMCPRIN', component: OtmcprinComponent },
      { path: 'OTMCNSER', component: OtmcnserComponent },
      { path: 'OTMACPRD', component: OtmacprdComponent },
      { path: 'OTMONCOA', component: OtmoncoaComponent },
      { path: 'OTMCSLIM', component: OtmcslimComponent },
      { path: 'OCMCOACT', component: OcmcoactComponent },
      { path: 'OTMBACCO', component: OtmbaccoComponent },
      { path: 'OUMAGENC', component: OumagencComponent },
      { path: 'OTMOFLIM', component: OtmoflimComponent },
      { path: 'OTMMBALA', component: OtmmbalaComponent },
      { path: 'OTMISAMB', component: OtmisambComponent },
      { path: 'OIITGDET', component: OiitgdetComponent },
      { path: 'OIMTGNGS', component: OimtgngsComponent },
      { path: 'OIDMBRDT', component: OidmbrdtComponent },
      { path: 'OIDONONA', component: OidononaComponent },
      { path: 'OSISTGKW', component: OsistgkwComponent },
      { path: 'OCDCLOSE', component: OcdcloseComponent },
      { path: 'OCDINTAK', component: OcdintakComponent },
      { path: 'OCINAMES', component: OcinamesComponent },
      { path: 'OCDALTCC', component: OcdaltccComponent },
      { path: 'OCDRLFCC', component: OcdrlfccComponent },
      { path: 'OCMSERVI', component: OcmserviComponent },
      { path: 'OIMSREQS', component: OimsreqsComponent },
      { path: 'OIMILOCA', component: OimilocaComponent },
      { path: 'OCMNOQUE', component: OcmnoqueComponent },
      { path: 'OIMPRFCA', component: OimprfcaComponent },
      { path: 'OIMPRFCO', component: OimprfcoComponent },
      //  { path: 'OCIDOCUM', component: OcidocumComponent },
      { path: 'OIMSTATU', component: OimstatuComponent },
      { path: 'OUMAUDIT', component: OumauditComponent },
      { path: 'OIDCOASI', component: OidcoasiComponent },
      { path: 'OCMORCOD', component: OcmorcodComponent },
      //  { path: 'OCMORCOD_AU', component: OcmorcodAuComponent },
      //  { path: 'OUMAGYHT', component: OumagyhtComponent },
      //  { path: 'OUMPERSD', component: OumpersdComponent },
      { path: 'OCDRECEI', component: OcdreceiComponent },
      { path: 'OCMGOBLI', component: OcmgobliComponent },
      //   { path: 'OUMPTACA', component: OumptacaComponent },
      //   { path: 'OUMPURGE', component: OumpurgeComponent },
      { path: 'OUIADACT', component: OuiadactComponent },
      //   { path: 'OCIDIARY', component: OcidiaryComponent },
      { path: 'OIMSLEVL', component: OimslevlComponent },
      //  { path: 'OUIMERGE', component: OuimergeComponent },
      { path: 'OIMULOCA', component: OimulocaComponent },
      { path: 'OUMINOUT', component: OuminoutComponent },
      { path: 'OIMCTACT', component: OimctactComponent },
      { path: 'OUMHLHIS', component: OumhlhisComponent },
      { path: 'OIMPLDUR', component: OimpldurComponent },
      { path: 'OIMVDTSL', component: OimvdtslComponent },
      { path: 'OUMEMOVE', component: OumemoveComponent },
      { path: 'OIMVLIMT', component: OimvlimtComponent },
      { path: 'OIMLEGST', component: OimlegstComponent },
      //  { path: 'OIMLEGST_AU', component: OimlegstAuComponent },
      //  { path: 'OIDSENKD_AU', component: OidsenkdAuComponent },
      //  { path: 'OCIOFILE', component: OciofileComponent },
      //  { path: 'OUMHOCOD_AU', component: OumhocodAuComponent },
      { path: 'OIMCOUNT', component: OimcountComponent },
      { path: 'OUMHOCOD', component: OumhocodComponent },
      { path: 'OUMRAREA', component: OumrareaComponent },
      { path: 'OIMLEGSU', component: OimlegsuComponent },
      //  { path: 'OIMLEGSU_AU', component: OimlegsuAuComponent },
      //  { path: 'OIMOFFEN_AU', component: OimoffenAuComponent },
      //  { path: 'OUMCLFRM', component: OumclfrmComponent },
      { path: 'OIMMHOLO', component: OimmholoComponent },
      { path: 'OCMCONDI', component: OcmcondiComponent },
      { path: 'OIMSATYP', component: OimsatypComponent },
      { path: 'OIMOFFEN', component: OimoffenComponent },
      { path: 'OIMCRTOR', component: OimcrtorComponent },
      //  { path: 'OIMCRTOR_AU', component: OimcrtorAuComponent },
      { path: 'OIMISREA', component: OimisreaComponent },
      //  { path: 'OUMMENUS', component: OummenusComponent },
      //  { path: 'OMUNVARY', component: OmunvaryComponent },
      { path: 'OUMMENUS', component: OummenusComponent },
      { path: 'OMUNVARY', component: OmunvaryComponent },
      { path: 'OIMISSUE', component: OimissueComponent },
      { path: 'OUMAGYRG', component: OumagyrgComponent },
      //  { path: 'OUIMTLOG', component: OuimtlogComponent },
      //  { path: 'OUIMTSTP', component: OuimtstpComponent },
      //  { path: 'OUMPDEFI', component: OumpdefiComponent },
      //  { path: 'OUMWMENU', component: OumwmenuComponent },
      //  { path: 'OUMFORMS', component: OumformsComponent },
      { path: 'OUMWMENU', component: OumwmenuComponent },
      { path: 'OUMFORMS', component: OumformsComponent },
      //  { path: 'OUMCFPRI', component: OumcfpriComponent },
      { path: 'OCDBRECI', component: OcdbreciComponent },
      { path: 'OCIDOACC', component: OcidoaccComponent },
      { path: 'OCMOHSTA', component: OcmohstaComponent },
      { path: 'OCMSNOTI', component: OcmsnotiComponent },
      { path: 'OTMCFEES', component: OtmcfeesComponent },
      { path: 'EOFFENDER', component: EoffenderComponent },
      { path: 'OCSRECEI', component: OcsreceiComponent },
      //  { path: 'OCDCPPAY', component: OcdcppayComponent },
      { path: 'OUISDIRE', component: OuisdireComponent },
      { path: 'OUMSYSET', component: OumsysetComponent },
      { path: 'OUMINSDB', component: OuminsdbComponent },
      { path: 'OUMBMARK', component: OumbmarkComponent },
      { path: 'OUMDTEMP', component: OumdtempComponent },
      { path: 'OCMDEFTM', component: OcmdeftmComponent },
      { path: 'OTDOCFEE', component: OtdocfeeComponent },
      // { path: 'OCDVTEAM', component: OcdvteamComponent },
      { path: 'OCITTASK', component: OcittaskComponent },
      { path: 'OIISCHED', component: OiischedComponent },
      { path: 'OCUHVTEA', component: OcuhvteaComponent },
      { path: 'OCMSSVCT', component: OcmssvctComponent },
      { path: 'OCMSTOFF', component: OcmstoffComponent },
      { path: 'OCDSABUS', component: OcdsabusComponent },
      { path: 'OCMSPRAC', component: OcmspracComponent },
      //  { path: 'OIDRNOTI_AU', component: OidrnotiComponent },
      //  { path: 'OIMSTATU_AU', component: OimstatuAuComponent },
      { path: 'OIDRELSC', component: OidrelscComponent },
      { path: 'OCMWORKS', component: OcmworksComponent },
      { path: 'OUMSMALA', component: OumsmalaComponent },
      //  { path: 'OCMSVACP', component: OcmsvacpComponent },
      { path: 'OCMTEAMS', component: OcmteamsComponent },
      { path: 'OIDPAATT', component: OidpaattComponent },
      { path: 'OCMXPROG', component: OcmxprogComponent },
      { path: 'OMSALJNT', component: OmsaljntComponent },
      { path: 'OUIAFLAT', component: OuiaflatComponent },
      { path: 'OIDPACTI', component: OidpactiComponent },
      { path: 'OMSYSJNT', component: OmsysjntComponent },
      //  { path: 'OUMMEVNT', component: OummevntComponent },
      //  { path: 'OCDHEALT', component: OcdhealtComponent },
      { path: 'OUIAUACT', component: OuiauactComponent },
      //  { path: 'OCICASES_AU', component: Ocicases_auComponent },
      //  { path: 'OPDCALCB', component: OpdcalcbComponent },
      //  { path: 'OPDCALCH', component: Opdcalch_auComponent },
      //  { path: 'OCULEGST_AU', component: Oculegst_auComponent },
      //  { path: 'OCISENHT_AU', component: OcisenhtComponent },
      //  { path: 'OIMSREQS_AU', component: OimsreqsAuComponent },
      //  { path: 'OUMCPASS', component: OumcpassComponent },
      //  { path: 'OCDREQUE_AU', component: Ocdreque_auComponent },
      //  { path: 'OIDHWDET_AU', component: Oidhwdet_auComponent },
      { path: 'CALSCH', component: CalScheduleComponent },
      { path: 'AESCHEDULE', component: AddEditScheduleComponent },
      { path: 'OCMPCONF', component: OcmpconfComponent },
      { path: 'ODYNFRM', component: OdynfrmComponent },
      // { path: 'FRMBLDR', component: OdynFrmBldrComponent },
      // { path: 'FRMRENDER', component: OdynFrmRenderComponent },
	  { path: 'OCDCREFU', component: OcdcrefuComponent },
     
      { path: 'OUMTAGRE', component: OumtagreComponent },
      { path: 'OUMRESTA', component: OumrestaComponent },
      { path: 'UPDOFFID', component: UpdoffidComponent },
      { path: 'OUMAGYHT', component: OumagyhtComponent },
      { path: 'OUMPERSD', component: OumpersdComponent },
      { path: 'OUIMERGE', component: OuimergeComponent },
     
      { path: 'OUMCPASS', component: OumcpassComponent },
      { path: 'OUMSMUGA', component: OumsmugaComponent },
      { path: 'OYMHOLID', component: OymholidComponent },
      { path: 'OTMLOCKR', component: OtmlockrComponent },
      { path: 'OSIHRSUM', component: OsihrsumComponent },
      { path: 'OUMCDTAB', component: OumcdtabComponent },
      { path: 'OIMADMIS', component: OimadmisComponent },
      { path: 'OIIBOOKS', component: OiibooksComponent },
      { path: 'OUMBADMI', component: OumbadmiComponent },
      { path: 'PROSMAIN', component: ProsmainComponent },
      { path: 'PROSDEAC', component: ProsdeacComponent },
      { path: 'CMNPROSS', component: CmnprossComponent },
      { path: 'CMDWORK', component: CmdworkComponent },
      { path: 'CMDACTION', component: CmdactionComponent },
      { path: 'APIMAIN', component: ApimainComponent },
      { path: 'OIEXPPRO', component: OiexpproComponent },
      { path: 'OIEXPQAC', component: OiexpqacComponent },
      { path: 'OIIMPPRO', component: OiimpproComponent }, 
      { path: 'OIIMPQAC', component: OiimpqacComponent },
	  { path: 'OCDORASS', component: OcdorassComponent },
	  { path: 'OCDATPOW', component: OcdatpowComponent },
	  { path: 'OCDTAPOW', component: OcdtapowComponent },
	  { path: 'OCDEXPOW', component: OcdexpowComponent },
	  { path: 'OCITTPOW', component: OcittpowComponent },
	  { path: 'OCIPOWLO', component: OcipowloComponent },
	  { path: 'OCIPOWOF', component: OcipowofComponent },
      { path: 'OCMSHIER', component: OcmshierComponent },
	  { path: 'OCIDIARY', component: OcidiaryComponent },
	  { path: 'OCMEVENT', component: OcmeventComponent },
	  { path: 'OCMCPREV', component: OcmcprevComponent },
	  { path: 'OCDPSREP', component: OcdpsrepComponent },
	  { path: 'OCDENFOR', component: OcdenforComponent },
	  { path: 'OCMSUWPJ', component: OcmsuwpjComponent },
	  { path: 'OCDCLOGS', component: OcdclogsComponent },
    { path: 'OCDCSCH', component: OcdcschComponent },
          { path: 'OCDUATTE', component: OcduatteComponent },
          { path: 'OCDUPROJ', component: OcduprojComponent },
          { path: 'OUMCAMTASK', component: OumcamtaskComponent },
          { path: 'OUMCAMBPMN', component: CamundaBpmnComponent },
          { path: 'CMDHIST', component: CmdhistComponent },
    { path: 'OCDPATTE', component: OcdpatteComponent },
    { path: 'OIDPWAIT', component: OidpwaitComponent },	
    { path: 'OCDPROGR', component: OcdprogrComponent },
    { path: 'OCMSVACP', component: OcmsvacpComponent },
	{ path: 'OCMFAPRO', component: OcmfaproComponent },
	{ path: 'OCDOFACC', component: OcdofaccComponent },
  { path: 'OCDSUPST', component: OcdsupstComponent },
  { path: 'DMNMAIN', component: DmnmainComponent },
  { path: 'CMDDMN', component: CmdDmnComponent },
   { path: 'OIMOICMP', component: OimoicmpComponent },
    { path: 'OIMOICOI', component: OimoicoiComponent },
    { path: 'OCIINTRR', component: OciintrrComponent },
    { path: 'OUMEEMOV', component: OumeemovComponent },
    { path: 'OUMPURGE', component: OumpurgeComponent },
	{path: 'OIIHLHIS', component: OiihlhisComponent},
	{ path: 'OIDOICAP', component: OidoicapComponent },
 	{ path: 'OCMTEAMMAIN', component: OcmteamMainComponent },
  	{ path: 'OCMPFACC', component: OcmpfaccComponent },
  	{ path: 'OCDADJUS', component: OcdadjusComponent },
  	 { path: 'OCDREVER', component: OcdreverComponent },
  	{ path: 'OCSPROGR', component: OcsprogrComponent},
    { path: 'OCMXPSTM', component: OcmxpstmComponent},
    { path: 'OCONDAWAIT', component: OcondawaitComponent },
    { path: 'OCONDTRF', component: OcondtrfComponent },
    { path: 'OTKCONDTRF', component: OtkcondtrfComponent },
    { path: 'PROSINIT', component: ProsinitComponent},
	{ path: 'OIICIPON', component: OiiciponComponent },
	{ path: 'OSANVIOS', component: OsanviosComponent},
    { path: 'OWEACPLN', component: OweacplnComponent },
	{path : 'OCSPROIN' ,component : OcsproinComponent},
	{path : 'OIMOFFOB' ,component : OimoffobComponent},
    {path : 'OIDOFFOB' ,component : OidoffobComponent},
    {path : 'OIIOFFOB' ,component : OiioffobComponent},
    { path: 'OIMSRLUC', component: OimsrlucComponent },
	{ path: 'OCMCNPER', component: OcmcnperComponent },
	{ path: 'OCICNSRC', component: OcicnsrcComponent },
	{path : 'OIDOWREL' ,component : OidowrelComponent},
	{path :'OIMWORKR' ,component : OimworkrComponent},
	{path : 'OIEXPJRP', component : OiexpjrpComponent},
	{path : 'OIRREPORT', component: OirreportComponent},
	{path: 'OIRMREPOR',  component:OirmreporComponent},
	{path : 'OIIMPJRP', component: OiimpjrpComponent},
	{ path: 'OIMIEPLV', component: OimieplvComponent },
	{ path: 'OIDIEPLV', component: OidieplvComponent },
	{ path: 'OIDOMAIL', component: OidomailComponent},
	{ path: 'OIMRELSC', component: OimrelscComponent},
	{ path: 'OIRMASSET', component: OirmassetComponent},
	{ path: 'OIMRELSC', component: OimrelscComponent},
	{ path: 'OIIMYOFF', component: OiimyoffComponent },
  	{ path: 'OCIMYOFF', component: OcimyoffComponent },
  	{ path: 'OUMRELMD', component: OumrelmdComponent },
    { path: 'OCMSTATS', component: OcmstatsComponent },
    { path: 'OCDSENCH', component: OcdsenchComponent},
  	{ path: 'OCDHEALT', component: OcdhealtComponent},
  	{ path: 'OCDOTRLV', component: OcdotrlvComponent},
  	{ path: 'OCMTIRLV', component: OcmtirlvComponent},
  	{ path: 'OIDPAROE', component: OidparoeComponent},
    { path: 'OCMLESET', component: OcmlesetComponent },
    { path: 'OCMDSPWD', component: OcmdspwdComponent},
    { path: 'OIDCUSTAD', component: OidcustadComponent},
    { path: 'OIMCUSTS', component: OimcustsComponent},
    { path: 'OCMPSSET', component: OcmpssetComponent},
    { path: 'OCMPSPAY', component: OcmpspayComponent},
    { path: 'OCDCGPAY', component: OcdcgpayComponent},
    { path: 'OCIPHIST', component: OciphistComponent},
    {path: 'OIVCTMNG',component: OivctmngComponent},
    { path:  'OIMROUTE', component: OimrouteComponent},
    { path: 'OIMSGLEN', component: OimsglenComponent},
    { path: 'OIMSTRIP', component: OimstripComponent},
	  {path: 'OIDFIXAD',component: OidfixadComponent},
    {path: 'OUMMEROF',component: OummerofComponent},
    { path: 'OIMIITPS', component: OimiitpsComponent },
    {path: 'OIDPHUNC',component: OidphuncComponent},
    {path: 'OIDINPLI',component: OidinpliComponent},
    {path: 'OIDHOUST',component: OidhoustComponent}, 
    { path: 'OCIPENSC', component: OcipenscComponent }, 
    { path: 'OIMALLOW', component: OimallowComponent },
    { path: 'OIDALLOW', component: OidallowComponent },
    {path: 'OIDSMSET', component: OidsmsetComponent},
    { path: 'OIMPROST', component: OimprostComponent },
    
  	]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      {
        enableTracing: false,
        onSameUrlNavigation: 'reload',
        useHash: true
      }
    )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
