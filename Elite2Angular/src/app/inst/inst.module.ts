
import { LivingUnitToolbarComponent } from './movements/housing-administration/living-unit-toolbar/view/living-unit-toolbar.component';
import { DefaultTokenStore } from './movements/housing-administration/service/default-token-store.service';
import { HousingAdministrationStateService } from './movements/housing-administration/service/housing-administration-state.service';
import { DefaultBackend } from './movements/housing-administration/service/default-backend.service';
import { AppStateService } from './movements/housing-administration/service/app-state.service';
import { FlattenUnitListPipe } from './movements/housing-administration/unit-administration/flatten-unit-list.pipe';
import { HousingAdministrationComponent } from './movements/housing-administration/view/housing-administration.component';
import { UnitPlanUploadComponent } from './movements/housing-administration/unit-plan-upload/view/unit-plan-upload.component';
import { UnitAdministrationComponent } from './movements/housing-administration/unit-administration/view/unit-administration.component';
import { BedAdministrationComponent } from './movements/housing-administration/bed-administration/view/bed-administration.component';
import { EditUnitDialogComponent } from './movements/housing-administration/edit-unit-dialog/view/edit-unit-dialog.component';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OidincdeComponent } from '@inst/incidents-oic/view/oidincde.component';
import { OidincdeService } from '@inst/incidents-oic/service/oidincde.service';
import {OidstfrpService} from '@inst/incidents-oic/service/oidstfrp.service'
import { IncidentHeaderBlockComponent } from '@inst/incidents-oic/view/incidentheader-block/incidentheader-block.component';
import { IncidentSearchComponent } from '@inst/incidents-oic/view/incident-search/incident-search.component';
import { IncidentSearchService } from '@inst/incidents-oic/service/incident-search.service';
import { UiComponentsModule } from '@ui-components/ui-components.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { OcdaliasComponent } from '@inst/demographics-biometrics/view/ocdalias.component';
import { OcdaliasService } from '@inst/demographics-biometrics/service/ocdalias.service';
import { OcdalertComponent } from '@inst/demographics-biometrics/view/ocdalert.component';
import { OiuimageComponent } from '@inst/demographics-biometrics/view/oiuimage.component';
import { OcdalertService } from '@inst/demographics-biometrics/service/ocdalert.service';
import { OcuoicinComponent } from '@inst/incidents-oic/view/ocuoicin.component';
import { OidoicusComponent } from '@inst/incidents-oic/view/oidoicus.component';
import { OidoicusService } from '@inst/incidents-oic/service/oidoicus.service';
import { OcuoicinService } from '@inst/incidents-oic/service/ocuoicin.service';
import { OidpinfoService } from '@inst/demographics-biometrics/service/oidpinfo.service';
import { OidpinfoComponent } from '@inst/demographics-biometrics/view/oidpinfo.component';
import { OcuoicheComponent } from '@inst/incidents-oic/view/ocuoiche.component';
import { OcuoicheService } from '@inst/incidents-oic/service/ocuoiche.service';
import { OcdaddreComponent } from '@inst/demographics-biometrics/view/ocdaddre.component';
import { OcdaddreService } from '@inst/demographics-biometrics/service/ocdaddre.service';
import { OcuoicchComponent } from '@inst/incidents-oic/view/ocuoicch.component';
import { OcuoicchService } from '@inst/incidents-oic/service/ocuoicch.service';
import { OiioicusComponent } from '@inst/incidents-oic/view/oiioicus.component';
import { OiioicusService } from '@inst/incidents-oic/service/oiioicus.service';
import { OcuincwpService } from '@inst/incidents-oic/service/ocuincwp.service';
import { OimoicoidialogComponent } from '@inst/incidents-oic/view/Oimoicoidialog.component';
import { OcuoichnComponent } from '@inst/incidents-oic/view/ocuoichn.component';
import { OcuoichnService } from '@inst/incidents-oic/service/ocuoichn.service';
import { OidadmisService } from '@inst/demographics-biometrics/service/oidadmis.service';
import { OidadmisComponent } from '@inst/demographics-biometrics/view/oidadmis.component';
import { OmuavbedService } from '@inst/demographics-biometrics/service/omuavbed.service';
import { OmuavbedComponent } from '@inst/demographics-biometrics/view/omuavbed.component';
import { OidpidenComponent } from '@inst/demographics-biometrics/view/oidpiden.component';
import { OidpidenService } from '@inst/demographics-biometrics/service/oidpiden.service';
import { OidreleaComponent } from '@inst/movement-external/view/oidrelea.component';
import { OidreleaService } from '@inst/movement-external/service/oidrelea.service';
import { OcuoicawComponent } from '@inst/incidents-oic/view/ocuoicaw.component';
import { OcuoicawService } from '@inst/incidents-oic/service/ocuoicaw.service';
import { OimoicmpdialogComponent } from '@inst/incidents-oic/view/oimoicmpdialog.component';
import { OcuoicpeComponent } from '@inst/incidents-oic/view/ocuoicpe.component';
import { OiiinlogComponent } from '@inst/incidents-oic/view/oiiinlog.component';
import { OiuincrpComponent } from '@inst/incidents-oic/view/oiuincrp.component';
import { OiuincrpService } from '@inst/incidents-oic/service/oiuincrp.service';
import { OiiinlogService } from "@inst/incidents-oic/service/oiiinlog.service";
import { OiiinlogpopupComponent } from '@inst/incidents-oic/view/oiiinlogpopup.component';
import { OcdedempComponent } from '@inst/demographics-biometrics/view/ocdedemp.component';
import { OcdedempService } from '@inst/demographics-biometrics/service/ocdedemp.service';
import { OcdccontComponent } from '@inst/demographics-biometrics/view/ocdccont.component';
import { OcdccontService } from '@inst/demographics-biometrics/service/ocdccont.service';
import { OcdgnumbComponent } from '@inst/demographics-biometrics/view/ocdgnumb.component';
import { OcdgnumbService } from '@inst/demographics-biometrics/service/ocdgnumb.service';
import { OcdoapopComponent } from '@inst/demographics-biometrics/view/ocdoapop.component';
import { OcdoapopService } from '@inst/demographics-biometrics/service/ocdoapop.service';
import { OidmpconComponent } from '@inst/property/view/oidmpcon.component';
import { OidmpconService } from '@inst/property/service/oidmpcon.service';
import { OiddpropComponent } from '@inst/property/view/oiddprop.component';
import { OiddpropService } from '@inst/property/service/oiddprop.service';
import { OiiptranComponent } from '@inst/property/view/oiiptran.component';
import { OiiptranService } from '@inst/property/service/oiiptran.service';
import { OiipclocComponent } from '@inst/property/view/oiipcloc.component';
import { OiipclocService } from '@inst/property/service/oiipcloc.service';
import { OidtpconComponent } from '@inst/property/view/oidtpcon.component';
import { OidtpconService } from '@inst/property/service/oidtpcon.service';
import { OiinamesComponent } from '@inst/movement-external/view/oiinames.component';
import { OiinamesService } from '@inst/movement-external/service/oiinames.service';
import { OiditranComponent } from '@inst/movement-external/view/oiditran.component';
import { OiditranService } from '@inst/movement-external/service/oiditran.service';
import { OidtpritComponent } from '@inst/property/view/oidtprit.component';
import { OidtpritService } from '@inst/property/service/oidtprit.service';
import { OiipctraComponent } from '@inst/property/view/oiipctra.component';
import { OiipctraService } from '@inst/property/service/oiipctra.service';
import { OidvcontComponent } from '@inst/property/view/oidvcont.component';
import { OidvcontService } from '@inst/property/service/oidvcont.service';
import { OidrpitmComponent } from '@inst/property/view/oidrpitm.component';
import { OidrpitmService } from '@inst/property/service/oidrpitm.service';
import { OidrtconComponent } from '@inst/property/view/oidrtcon.component';
import { OidrtconService } from '@inst/property/service/oidrtcon.service';
import { OidtrwjuComponent } from '@inst/movement-external/view/oidtrwju.component';
import { OidtrwjuService } from '@inst/movement-external/service/oidtrwju.service';
import { OcuoicawPopUpComponent } from '@inst/incidents-oic/view/ocuoicawpopup.component';
import { OumrcodeComponent } from '@sa/admin/view/oumrcode.component';
import { OumrcodeService } from '@sa/admin/service/oumrcode.service';
//import { OcmsvacpComponent } from './accredited-programs/view/ocmsvacp.component';
import { OidincdeChargePopUpComponent } from '@inst/incidents-oic/view/oidincdeChargepopup.component';
import { OiditranagylocsComponent } from '@inst/movement-external/view/oiditranagylocs.component';
import { OiustgasComponent } from '@inst/incidents-oic/view/oiustgas.component';
import { OiustgasService } from '@inst/incidents-oic/service/oiustgas.service';
import { OiustgaslovComponent } from '@inst/incidents-oic/view/oiustgaslov.component';
import { OidincdeStaffPopUpComponent } from '@inst/incidents-oic/view/oidincdeStaffPop.component';
import { OimuhebyComponent } from '@inst/incidents-oic/view/oimuheby.component';
import { OidstabsService } from '@inst/schedules/service/oidstabs.service';
import { OidstabsComponent } from '@inst/schedules/view/oidstabs.component';
import { OidstabsagylocpopupComponent } from '@inst/schedules/view/oidstabsagylocpopup.component';
import { OidstabsbuspopupComponent } from '@inst/schedules/view/oidstabsbuspopup.component';
import { OidstabsothpopupComponent } from '@inst/schedules/view/oidstabsothpopup.component';
import { OidscmovService } from '@inst/schedules/service/oidscmov.service';
import { OidscmovComponent } from '@inst/schedules/view/oidscmov.component';
import { OidscmovconfirmboxComponent } from '@inst/schedules/view/oidscmovconfirmbox.component';
import { OidscexmComponent } from '@inst/movement-external/view/oidscexm.component';
import { OidscexmService } from '@inst/movement-external/service/oidscexm.service';
import { OiuscinqComponent } from '@inst/schedules/view/oiuscinq.component';
import { OiuscinqService } from '@inst/schedules/service/oiuscinq.service';
import { OumorcodComponent } from "@inst/legal/view/oumorcod.component";
import { OcurwarnComponent } from '@inst/movement-external/view/ocurwarn.component';
import { OcurwarnService } from '@inst/movement-external/service/ocurwarn.service';
import { OidtrojuComponent } from '@inst/movement-external/view/oidtroju.component';
import { OidtrojuService } from '@inst/movement-external/service/oidtroju.service';
import { OiiwltwjComponent } from '@inst/movement-external/view/oiiwltwj.component';
import { OiiwltwjService } from '@inst/movement-external/service/oiiwltwj.service';
import { OiiemoveComponent } from '@inst/offenderspecific/view/oiiemove.component';
import { OiiemoveService } from '@inst/offenderspecific/service/oiiemove.service';
import { OidbutabComponent } from '@inst/movement-external/view/oidbutab.component';
import { OidbutabService } from '@inst/movement-external/service/oidbutab.service';
import { OidstwjuService } from '@inst/schedules/service/oidstwju.service';
import { OidstwjuComponent } from '@inst/schedules/view/oidstwju.component';
import { OidstojuService } from '@inst/schedules/service/oidstoju.service';
import { OidstojuComponent } from '@inst/schedules/view/oidstoju.component';
import { OidstwjuappbypopupComponent } from '@inst/schedules/view/oidstwjuappbypopup.component';
import { OidstwjuconfirmationpopupComponent } from '@inst/schedules/view/oidstwjuconfirmationpopup.component';
import { OcdclistComponent } from '@instlegalscreens/view/ocdclist.component';
import { OcdclistService } from '@instlegalscreens/service/ocdclist.service';
import { OidbstrnComponent } from '@inst/movement-external/view/oidbstrn.component';
import { OidbstrnService } from '@inst/movement-external/service/oidbstrn.service';
import { OidstwjudelnotifipopupComponent } from '@inst/schedules/view/oidstwjudelnotifipopup.component';
import { OidunctaComponent } from '@inst/movement-external/view/oiduncta.component';
import { OidunctaService } from '@inst/movement-external/service/oiduncta.service';
import { OidescapComponent } from '@inst/movement-external/view/oidescap.component';
import { OidescapService } from '@inst/movement-external/service/oidescap.service';
import { OmuerrcoComponent } from '@inst/movement-external/view/omuerrco.component';
import { OmuerrcoService } from '@inst/movement-external/service/omuerrco.service';
import { OiioscedComponent } from '@inst/casemanagement/view/oiiosced.component';
import { OiioscedService } from '@inst/casemanagement/service/oiiosced.service';
import { OiicmociComponent } from '@inst/movement-external/view/oiicmoci.component';
import { OiicmociService } from '@inst/movement-external/service/oiicmoci.service';
import { OidbsiapService } from '@inst/schedules/service/oidbsiap.service';
import { OidbsiapComponent } from '@inst/schedules/view/oidbsiap.component';
import { OmuerrcoconfirmationpopupComponent } from '@inst/movement-external/view/omuerrcoconfirmationpopup.component';
import { OidintmvComponent } from '@inst/movements/view/oidintmv.component';
import { OidintmvService } from '@inst/movements/service/oidintmv.service';
import { OiintlocComponent } from '@inst/movements/view/oiintloc.component';
import { OiintlocService } from '@inst/movements/service/oiintloc.service';
import { OidsiappService } from '@inst/schedules/service/oidsiapp.service';
import { OidsiappComponent } from '@inst/schedules/view/oidsiapp.component';
import { OcucalcrComponent } from "@inst/legal/view/ocucalcr.component";
import { OcucalcrService } from "@inst/legal/service/ocucalcr.service";
import { OcusofncComponent } from "@inst/legal/view/ocusofnc.component";
import { OcusofncService } from "@inst/legal/service/ocusofnc.service";
import { OiidmoveComponent } from '@inst/movement-external/view/oiidmove.component';
import { OiidmoveService } from '@inst/movement-external/service/oiidmove.service';
import { OidrhlocComponent } from '@inst/movements/housingchanges/view/oidrhloc.component';
import { OidrhlocService } from '@inst/movements/housingchanges/service/oidrhloc.service';
import { OidcholoComponent } from '@inst/movements/housingchanges/view/oidcholo.component';
import { OidchlocComponent } from '@inst/movements/housingchanges/view/oidchloc.component';
import { OidchlocService } from '@inst/movements/housingchanges/service/oidchloc.service';
import { OmurmresComponent } from '@inst/movements/housingchanges/view/omurmres.component';
import { OmurmresService } from '@inst/movements/housingchanges/service/omurmres.service';
import { OmuavlocComponent } from '@inst/movements/housingchanges/view/omuavloc.component';
import { OmuavlocService } from '@inst/movements/housingchanges/service/omuavloc.service';
import { OidcholoService } from '@inst/movements/housingchanges/service/oidcholo.service';
import { OidadmisconfirmboxComponent } from '@inst/demographics-biometrics/view/oidadmisconfirmbox.component';
import { OidehlocComponent } from '@inst/movements/housingchanges/view/oidehloc.component';
import { OidehlocService } from '@inst/movements/housingchanges/service/oidehloc.service';
import { OidciponComponent } from '@inst/care-in-placement/view/oidcipon.component';
import { OidciponService } from '@inst/care-in-placement/service/oidcipon.service';
import { OcuwarngComponent } from '@inst/movements/housingchanges/view/ocuwarng.component';
import { OcuwarngService } from '@inst/movements/housingchanges/service/ocuwarng.service';
import { OiinamesdialogComponent } from '@inst/movement-external/view/oiinamesdialog.component';
import { OidehlocconfirmationpopupComponent } from '@inst/movements/housingchanges/view/oidehlocconfirmationpopup.component';
import { OcupsrdeComponent } from "@inst/legal/view/ocupsrde.component";
import { OcupsrdeService } from "@inst/legal/service/ocupsrde.service";
import { OcdlangsComponent } from '@inst/demographics-biometrics/view/ocdlangs.component';
import { OcdlangsService } from '@inst/demographics-biometrics/service/ocdlangs.service';
import { OidcnoteComponent } from '@inst/casemanagement/view/oidcnote.component';
import { OidcnoteService } from '@inst/casemanagement/service/oidcnote.service';
import { OcdnoqueComponent } from '@inst/classification/view/ocdnoque.component';
import { OcdnoqueService } from '@inst/classification/service/ocdnoque.service';
import { OidmhistComponent } from '@inst/demographics-biometrics/view/oidmhist.component';
import { OidmhistService } from '@inst/demographics-biometrics/service/oidmhist.service';
import { OidcapprComponent } from '@inst/classification/view/oidcappr.component';
import { OidcapprService } from '@inst/classification/service/oidcappr.service';
import { OcunoqueComponent } from '@inst/classification/view/ocunoque.component';
import { OcunoqueService } from '@inst/classification/service/ocunoque.service';
import { OmuclassComponent } from '@inst/classification/view/omuclass.component';
import { OmuclassService } from '@inst/classification/service/omuclass.service';
import { OiiclassService } from '@inst/classification/service/oiiclass.service';
import { OiiclassComponent } from '@inst/classification/view/oiiclass.component';
import { OcunotcmComponent } from '@inst/casemanagement/view/ocunotcm.component';
import { OcunotcmService } from '@inst/casemanagement/service/ocunotcm.service';
import { OcustfasService } from '@inst/casemanagement/service/ocustfas.service';
import { OcustfasComponent } from '@inst/casemanagement/view/ocustfas.component';
import { OciiplanService } from '@inst/casemanagement/service/ociiplan.service';
import { OciiplanComponent } from '@inst/casemanagement/view/ociiplan.component';
import { OiiiscouComponent } from '@inst/casemanagement/view/oiiiscou.component';
import { OiiiscouService } from '@inst/casemanagement/service/oiiiscou.service';
import { OcustfaspopupComponent } from '@inst/casemanagement/view/ocustfaspopup.component';
import { OcutasatComponent } from '@inst/casemanagement/view/ocutasat.component';
import { OcutasatService } from '@inst/casemanagement/service/ocutasat.service';
import { OidshlogComponent } from '@inst/shift-logs/view/oidshlog.component';
import { OidshlogService } from '@inst/shift-logs/service/oidshlog.service';
import { OiishlogComponent } from '@inst/shift-logs/view/oiishlog.component';
import { OiishlogService } from '@inst/shift-logs/service/oiishlog.service';
import { OidistatComponent } from '@inst/casemanagement/view/oidistat.component';
import { OidistatService } from '@inst/casemanagement/service/oidistat.service';
import { OidshlogconfirmationpopupComponent } from '@inst/shift-logs/view/oidshlogconfirmationpopup.component';
import { OcdiplanService } from '@inst/casemanagement/service/ocdiplan.service';
import { OcdiplanComponent } from '@inst/casemanagement/view/ocdiplan.component';
import { OidrplanComponent } from '@inst/movement-external/view/oidrplan.component';
import { OidrplanService } from '@inst/movement-external/service/oidrplan.service';
import { OidrplanpopupComponent } from '@inst/movement-external/view/oidrplanpopup.component';
import { OiishlogdetailspopupComponent } from '@inst/shift-logs/view/oiishlogdetailspopup.component';
import { OcucnameComponent } from '@inst/casemanagement/view/ocucname.component';
import { OcucnameService } from '@inst/casemanagement/service/ocucname.service';
import { OciocnotService } from '@inst/casemanagement/service/ociocnot.service';
import { OciocnotComponent } from '@inst/casemanagement/view/ociocnot.component';
import { OiddecasComponent } from "@inst/legal/view/oiddecas.component";
import { OiddecasService } from "@inst/legal/service/oiddecas.service";
import { OiddecasconfirmboxComponent } from "@inst/legal/view/oiddecasconfirmbox.component";
// import { OiddecasService } from "@inst/legal/service/oiddecas.service";
import { OcdlegstComponent } from "@inst/legal/view/ocdlegst.component";
import { OcdlegstService } from "@inst/legal/service/ocdlegst.service";
// import { OcucondiComponent } from "@inst/legal/view/ocucondi.component";
// import { OcucondiService } from "@inst/legal/service/ocucondi.service";
import { OidrplanproposedemplomentpopupComponent } from '@inst/movement-external/view/oidrplanproposedemplomentpopup.component';
import { OcdpersoComponent } from '@inst/demographics-biometrics/view/ocdperso.component';
import { OcdpersoService } from '@inst/demographics-biometrics/service/ocdperso.service';
import { OsipsearService } from '@inst/visits-management/service/osipsear.service';
import { OsipsearComponent } from '@inst/visits-management/view/osipsear.component';
import { OcucnperService } from '@inst/visits-management/service/ocucnper.service';
import { OcucnperComponent } from '@inst/visits-management/view/ocucnper.component';
import { OcuperprComponent } from '@inst/visits-management/view/ocuperpr.component';
import { OcuperprService } from '@inst/visits-management/service/ocuperpr.service';
import { OcuoccupService } from '@inst/inquiries/service/ocuoccup.service';
import { OcuoccupComponent } from '@inst/inquiries/view/ocuoccup.component';
import { OiiprollComponent } from '@inst/automated-counts/view/oiiproll.component';
import { OiiprollService } from '@inst/automated-counts/service/oiiproll.service';
import { OidremcsComponent } from '@inst/automated-counts/view/oidremcs.component';
import { OidremcsService } from '@inst/automated-counts/service/oidremcs.service';
import { OidcountComponent } from '@inst/automated-counts/view/oidcount.component';
import { OidcountloaderComponent } from '@inst/automated-counts/view/oidcountloader.component';
import { OidcountService } from '@inst/automated-counts/service/oidcount.service';
import { OiiunrolComponent } from '@inst/automated-counts/view/oiiunrol.component';
import { OiiunrolService } from '@inst/automated-counts/service/oiiunrol.service';
import { OiiinrolService } from '@inst/automated-counts/service/oiiinrol.service';
import { OiiinrolComponent } from '@inst/automated-counts/view/oiiinrol.component';
import { OcuverifComponent } from '@inst/demographics-biometrics/view/ocuverif.component';
import { OcuverifService } from '@inst/demographics-biometrics/service/ocuverif.service';
import { OcuoccupnamedlgComponent } from '@inst/inquiries/view/ocuoccupnamedlg.component';
import { OcucloffComponent } from '@inst/visits-management/view/ocucloff.component';
import { OcucloffService } from '@inst/visits-management/service/ocucloff.service';
import { OidsublcComponent } from '@inst/automated-counts/view/oidsublc.component';
import { OidsublcService } from '@inst/automated-counts/service/oidsublc.service';
import { OidcountPopUpComponent } from '@inst/automated-counts/view/oidcountpopup.component';
import { OidojoinComponent } from "@inst/legal/view/oidojoin.component";
import { OidojoinService } from '@inst/legal/service/oidojoin.service';
import { OffenderScheduleComponent } from '@inst/schedules/view/offenderschedule.component';
import { OidverccComponent } from '@inst/automated-counts/view/oidvercc.component';
import { OidverccService } from '@inst/automated-counts/service/oidvercc.service';
import { OiihiscoComponent } from '@inst/automated-counts/view/oiihisco.component';
import { OiihiscoService } from '@inst/automated-counts/service/oiihisco.service';
import { OsipserdialogComponent } from '@inst/inquiries/view/osipserdialog.component';
import { OcuavlocService } from '@inst/visits-management/service/ocuavloc.service';
import { OcuavlocComponent } from '@inst/visits-management/view/ocuavloc.component';
import { OcuprestService } from '@inst/visits-management/service/ocuprest.service';
import { OcuprestComponent } from '@inst/visits-management/view/ocuprest.component';
import { OmuaprisService } from '@inst/visits-management/service/omuapris.service';
import { OmuaprisComponent } from '@inst/visits-management/view/omuapris.component';
import { OidvtourComponent } from '@inst/visits-management/view/oidvtour.component';
import { OidvtourService } from '@inst/visits-management/service/oidvtour.service';
import { OiuincreComponent } from '@inst/offender-issues-tracking/view/oiuincre.component';
import { OiuincreService } from '@inst/offender-issues-tracking/service/oiuincre.service';
import { OidvisitComponent } from '@inst/visits-management/view/oidvisit.component';
import { OidvisitService } from '@inst/visits-management/service/oidvisit.service';
import { OidrecorComponent } from '@inst/automated-counts/view/oidrecor.component';
import { OidrecorService } from '@inst/automated-counts/service/oidrecor.service';
import { OiivisitComponent } from '@inst/visits-management/view/oiivisit.component';
import { OiivisitService } from '@inst/visits-management/service/oiivisit.service';
import { OidissueComponent } from '@inst/offender-issues-tracking/view/oidissue.component';
import { OidissueService } from '@inst/offender-issues-tracking/service/oidissue.service';
import { OidsenhyComponent } from '@inst/legal/view/oidsenhy.component';
import { OidsenhyService } from '@inst/legal/service/oidsenhy.service';
import { OidsenkdComponent } from "@inst/legal/view/oidsenkd.component";
import { OidsenkdService } from "@inst/legal/service/oidsenkd.service";
import { KeyDatesComponent } from '@inst/legal/view/keyDates.component';
import { KeyDatesService } from '@inst/legal/service/keyDates.service';
import { OidhwdetComponent } from "@inst/legal/view/oidhwdet.component";
import { OidhwdetService } from "@inst/legal/service/oidhwdet.service";
import { OiigrievService } from '@inst/offender-issues-tracking/service/oiigriev.service';
import { OiigrievComponent } from '@inst/offender-issues-tracking/view/oiigriev.component';
import { OiuprresComponent } from '@inst/offender-issues-tracking/view/oiuprres.component';
import { OiuprresService } from '@inst/offender-issues-tracking/service/oiuprres.service';
import { OidsenadComponent } from '@inst/legal/view/oidsenad.component';
import { OidsenadService } from '@inst/legal/service/oidsenad.service';
import { OidviresService } from '@inst/visits-management/service/oidvires.service';
import { OidviresComponent } from '@inst/visits-management/view/oidvires.component';
import { OmuvrestComponent } from '@inst/visits-management/view/omuvrest.component';
import { OmuvrestService } from '@inst/visits-management/service/omuvrest.service';
import { OcuavisnComponent } from '@inst/visits-management/view/ocuavisn.component';
import { OcuavisnService } from '@inst/visits-management/service/ocuavisn.service';
import { OiuovresService } from '@inst/visits-management/service/oiuovres.service';
import { OiuovresComponent } from '@inst/visits-management/view/oiuovres.component';
import { OmuvrestdialogComponent } from '@inst/visits-management/view/omuvrestdialog.component';
import { OcdxprogComponent } from '@inst/programs-without-schedules/view/ocdxprog.component';
import { OcdxprogService } from '@inst/programs-without-schedules/service/ocdxprog.service';
import { OcuupstaComponent } from '@inst/programs-without-schedules/view/ocuupsta.component';
import { OcuupstaService } from '@inst/programs-without-schedules/service/ocuupsta.service';
import { OciscataComponent } from '@inst/institutional-activities/view/ociscata.component';
import { OciscataService } from '@inst/institutional-activities/service/ociscata.service';
import { ConsToLineComponent } from '@inst/legal/view/consToLine.component';
import { TermToLineComponent } from '@inst/legal/view/term-to-line.component';
import { MulticountComponent } from '@inst/legal/view/multicount.component';
import { NoncustdurationComponent } from '@inst/legal/view/noncustduration.component';
import { RelatedToLineComponent } from '@inst/legal/view/related-to-line.component';
import { OcdintpaComponent } from '@inst/legal/view/ocdintpa.component';
import { OcdotaskComponent } from '@cm/teams-workflow/view/ocdotask.component';
import { OcdotaskService } from '@cm/teams-workflow/service/ocdotask.service';
import { OcdpnoteService } from '@inst/programs-without-schedules/service/ocdpnote.service';
import { OcdpnoteComponent } from '@inst/programs-without-schedules/view/ocdpnote.component';
import { OiuiwpveService } from '@inst/casemanagement/service/oiuiwpve.service';
import { OiuiwpveComponent } from '@inst/casemanagement/view/oiuiwpve.component';
import { OciscataadvancesearchpopupComponent } from '@inst/institutional-activities/view/ociscataadvancesearchpopup.component';
import { OciscatadialogComponent } from '@inst/institutional-activities/view/ociscatadialog.component';
//import { OiuiwpgnService } from '@inst/casemanagement/service/oiuiwpgn.service';
//import { OiuiwpgnComponent } from '@inst/casemanagement/view/oiuiwpgn.component';
//import { OmsrelstService } from '@inst/service/omsrelst.service';
//import { OmsrelstComponent } from '@inst/view/omsrelst.component';
import { OcuvwarnComponent } from '@inst/visits-management/view/ocuvwarn.component';
import { OcuvwarnService } from '@inst/visits-management/service/ocuvwarn.service';
import { OidstestComponent } from '@inst/casemanagement/view/oidstest.component';
import { OidstestService } from '@inst/casemanagement/service/oidstest.service';
import { HousingActionComponent } from '@inst/movements/housingchanges/view/housing_action.component';
import { HousingAllocationComponent } from '@inst/movements/housingchanges/view/housing_allocation.component';
import { HousingComponent } from '@inst/movements/housingchanges/view/housing.component';
import { HousingInfoComponent } from '@inst/movements/housingchanges/view/housing_info.component';
import { HousingService } from '@inst/movements/housingchanges/service/housing.service';
import { HousingConflictsViewComponent } from '@inst/movements/housingchanges/view/housing_conflicts.component';
import { OcdccaseComponent } from "@inst/legal/view/ocdccase.component";
import { OcdlegloComponent } from "@inst/legal/view/ocdleglo.component";
import { OcdleglnComponent } from '@inst/legal/view/ocdlegln.component';
import { OcdleglsComponent } from '@inst/legal/view/ocdlegls.component';
import { OidcrtevComponent } from '@inst/legal/view/oidcrtev.component';
import { OcdchgsuComponent } from '@inst/legal/view/ocdchgsu.component';
import { OcdccaseService } from "@inst/legal/service/ocdccase.service";
import { OcdlegloService } from "@inst/legal/service/ocdleglo.service";
import { OcdbailoService } from "@inst/legal/service/ocdbailo.service";
import { OcdintpaService } from "@inst/legal/service/Ocdintpa.service";
import { OcdleglnService } from "@inst/legal/service/ocdlegln.service";
import { OcdleglsService } from "@inst/legal/service/ocdlegls.service";
import { OidcrtevService } from "@inst/legal/service/oidcrtev.service";
import { OcdchgsuService } from "@inst/legal/service/ocdchgsu.service";
import { OcuoffenComponent } from "@inst/legal/view/ocuoffen.component";
import { OcuholdsComponent } from "@inst/legal/view/ocuholds.component";
import { OcuholdsService } from "@inst/legal/service/ocuholds.service";
import { OcuccideComponent } from "@inst/legal/view/ocuccide.component";
import { OicuccideService } from "@inst/legal/service/ocuccide.service";
import { OculcaseComponent } from "@inst/legal/view/oculcase.component";
import { OculcaseService } from "@inst/legal/service/oculcaseService";
import { OculegstComponent } from "@inst/legal/view/oculegst.component";
import { OculegstService } from "@inst/legal/service/oculegst.service";
import { OculegstSentenceComponent } from "@inst/legal/view/oculegst-sentence.component";
import { OculegstSentenceService } from "@inst/legal/service/oculegst-sentence.service";
import { OculegstConditionComponent } from "@inst/legal/view/oculegstCondition.component";
import { OcucondiService } from "@inst/legal/service/ocucondi.service";
import { OcucondiComponent } from "@inst/legal/view/ocucondi.component";
import { OcucondiDialogComponent } from './legal/view/ocucondidialog.component';
import { MaterialModule } from "@core/material.module";
import { HousingCleanupComponent } from "@inst/movements/housingchanges/view/housing_cleanup.Component";
import { HousingCleanUpService } from '@inst/movements/housingchanges/service/housing_cleanup.service';
import { OiuimagedialogComponent } from '@common/offender-records/view/oiuimagedialog.component';
import { OiuimageExportScreenComponent } from '@common/offender-records/view/oiuimage-export-screen.component';
import { ImageCaptureDialogComponent } from '@common/offender-records/view/imagecapturedialog.component';
import { OiuimageService } from '@common/offender-records/service/oiuimage.service';
import { OidmpitmComponent } from '@inst/property/view/oidmpitm.component';
import { OidmpitmService } from '@inst/property/service/oidmpitm.service';
import { ManagePropertiesComponent } from '@inst/property/view/manage-properties.component';
import { ManagePropertiesDialogComponent } from '@inst/property/view/manage-properties-dialog.component';
import {SealdialogComponent} from '@inst/property/view/sealdialog.component';
import {WarndialogComponent} from '@inst/property/view/warndialog.component';
import { ContainerComponent } from '@inst/property/view/container.component';
import { NewContainerComponent } from '@inst/property/view/newContainer.component';
import { CameraDialogComponent } from '@inst/property/view/cameraDialog.component';
import { DndModule } from 'ng2-dnd';
import { OidarfplComponent } from '@inst/demographics-biometrics/view/oidarfpl.component';
import { OidarfplService } from '@inst/demographics-biometrics/service/oidarfpl.service';
import { OidarhplComponent } from '@inst/demographics-biometrics/view/oidarhpl.component';
import { OiitgdetComponent } from '@inst/securitythreatgroups/view/oiitgdet.component';
import { OiitgdetService } from '@inst/securitythreatgroups/service/oiitgdet.service';
import { OimtgngsComponent } from '@inst/securitythreatgroups/view/oimtgngs.component';
import { OimtgngsService } from '@inst/securitythreatgroups/service/oimtgngs.service';
import { OiistgmiComponent } from '@inst/securitythreatgroups/view/oiistgmi.component';
import { OiistgmiService } from '@inst/securitythreatgroups/service/oiistgmi.service';
import { OiitgdetDialogComponent } from '@inst/securitythreatgroups/view/oiitgdetdialog.component';
import { OimtgoptComponent } from '@inst/securitythreatgroups/view/oimtgopt.component';
import { OimtgoptService } from '@inst/securitythreatgroups/service/oimtgopt.service';
import { OidstgvlComponent } from '@inst/securitythreatgroups/view/oidstgvl.component';
import { OidstgvlService } from '@inst/securitythreatgroups/service/oidstgvl.service';
import { OiistgmbComponent } from '@inst/securitythreatgroups/view/oiistgmb.component';
import { OiistgmbService } from '@inst/securitythreatgroups/service/oiistgmb.service';
import { OidmbrdtComponent } from '@inst/securitythreatgroups/view/oidmbrdt.component';
import { OidmbrdtService } from '@inst/securitythreatgroups/service/oidmbrdt.service';
import { OidstgidComponent } from '@inst/securitythreatgroups/view/oidstgid.component';
import { OidstgidService } from '@inst/securitythreatgroups/service/oidstgid.service';
import { OidononaComponent } from '@common/offender-records/view/oidonona.component';
import { OidononaService } from '@common/offender-records/service/oidonona.service';
import { OidmbrvlComponent } from '@inst/securitythreatgroups/view/oidmbrvl.component';
import { OidmbrvlService } from '@inst/securitythreatgroups/service/oidmbrvl.service';
import { OsistgkwComponent } from '@inst/securitythreatgroups/view/osistgkw.component';
import { OsistgkwService } from '@inst/securitythreatgroups/service/osistgkw.service';
import { OidmbrasComponent } from '@inst/securitythreatgroups/view/oidmbras.component';
import { OidmbrasService } from '@inst/securitythreatgroups/service/oidmbras.service';
import { OidappndComponent } from './securitythreatgroups/view/oidappnd.component';
import { OidappndService } from './securitythreatgroups/service/oidappnd.service';
import { OidononaDialogComponent } from '@common/offender-records/view/oidononadialog.component';
import { OidstgcnService } from '@inst/securitythreatgroups/service/oidstgcn.service';
import { OidstgcnComponent } from '@inst/securitythreatgroups/view/oidstgcn.component';
import { OcdaliasDialogComponent } from '@inst/demographics-biometrics/view/ocdaliasdialog.component';
import { OidpidenDialogComponent } from '@inst/demographics-biometrics/view/oidpidendialog.component';
import { OcdnoqueDialogComponent } from '@inst/classification/view/ocdnoquedialog.component';
import { OidstginService } from '@inst/securitythreatgroups/service/oidstgin.service';
import { OidstginComponent } from '@inst/securitythreatgroups/view/oidstgin.component';
import { OidstgaeComponent } from '@inst/securitythreatgroups/view/oidstgae.component';
import { OidstgaeService } from '@inst/securitythreatgroups/service/oidstgae.service';
import { OidstghlComponent } from '@inst/securitythreatgroups/view/oidstghl.component';
import { OidstghlService } from '@inst/securitythreatgroups/service/oidstghl.service';
import { OidoicusDialogComponent } from '@inst/securitythreatgroups/view/oidoicusdialog.component';
import { OcmserviComponent } from '@inst/institutional-activities/maintenance/view/ocmservi.component';
import { OcmserviService } from '@inst/institutional-activities/maintenance/service/ocmservi.service';
import { OcmsvassComponent } from '@inst/institutional-activities/maintenance/view/ocmsvass.component';
import { OcmsvassService } from '@inst/institutional-activities/maintenance/service/ocmsvass.service';
//import { OcmsvphaComponent } from '@inst/institutional-activities/maintenance/view/ocmsvpha.component';
//import { OcmsvphaService } from '@inst/institutional-activities/maintenance/service/ocmsvpha.service';
import { OcmphblkComponent } from '@inst/institutional-activities/maintenance/view/ocmphblk.component';
import { OcmphblkService } from '@inst/institutional-activities/maintenance/service/ocmphblk.service';
import { OimilocaComponent } from '@inst/movements/maintenance/view/oimiloca.component';
import { OimilocaService } from '@inst/movements/maintenance/service/oimiloca.service';
import { OimslevlService } from '@inst/classification/assessmentmaintenance/service/oimslevl.service';
import { OimslevlComponent } from './classification/assessmentmaintenance/view/oimslevl.component';
import { OimulocaComponent } from '@inst/movements/maintenance/view/oimuloca.component';
import { OimulocaService } from '@inst/movements/maintenance/service/oimuloca.service';
import { OiunonasComponent } from '@inst/movements/maintenance/view/oiunonas.component';
import { OiunonasService } from '@inst/movements/maintenance/service/oiunonas.service';
import { OuminoutComponent } from './movements/maintenance/view/ouminout.component';
import { OuminoutService } from '@inst/movements/maintenance/service/ouminout.service';
import { OimctactComponent } from '@inst/booking/maintainence/view/oimctact.component';
import { OimctactService } from '@inst/booking/maintainence/service/oimctact.service';
import { OcuintlcComponent } from '@inst/movements/maintenance/view/ocuintlc.component';
import { OcuintlcService } from '@inst/movements/maintenance/service/ocuintlc.service';
import { OimprfcaComponent } from '@inst/booking/maintainence/view/oimprfca.component';
import { OimprfcaService } from '@inst/booking/maintainence/service/oimprfca.service';
import { OimstatuService } from '@inst/legal-screens/service/oimstatu.service';
import { OimstatuComponent } from '@inst/legal-screens/view/oimstatu.component';
import { OumhlhisComponent } from '@inst/movements/maintenance/view/oumhlhis.component';
import { OumhlhisService } from '@inst/movements/maintenance/service/oumhlhis.service';
import { OimpldurService } from '@inst/care-in-placement/maintenance/service/oimpldur.service';
import { OimpldurComponent } from '@inst/care-in-placement/maintenance/view/oimpldur.component';
import { OcmorcodService } from '@inst/legal-screens/service/ocmorcod.service';
import { OcmorcodComponent } from '@inst/legal-screens/view/ocmorcod.component';
import { OimvdtslComponent } from '@inst/visits-management/maintenance/view/oimvdtsl.component';
import { OimvdtslService } from '@inst/visits-management/maintenance/service/oimvdtsl.service';
import { OimsenotService } from '@inst/classification/assessmentmaintenance/service/oimsenot.service';
import { OimsenotComponent } from '@inst/classification/assessmentmaintenance/view/oimsenot.component';
import { OumemoveComponent } from '@inst/movements/maintenance/view/oumemove.component';
import { OumemoveService } from '@inst/movements/maintenance/service/oumemove.service';
import { OimvlimtComponent } from '@inst/visits-management/maintenance/view/oimvlimt.component';
import { OimvlimtService } from '@inst/visits-management/maintenance/service/oimvlimt.service';
import { OimlegstService } from '@inst/legal-screens/maintenance/service/oimlegst.service';
import { OimlegstComponent } from '@inst/legal-screens/maintenance/view/oimlegst.component';
import { OimcountComponent } from '@inst/automated-counts/maintenance/view/oimcount.component';
import { OimcountService } from '@inst/automated-counts/maintenance/service/oimcount.service';
import { OumhocodComponent } from '@inst/legal-screens/maintenance/view/oumhocod.component';
import { OumhocodService } from '@inst/legal-screens/maintenance/service/oumhocod.service';
import { OimlegsuComponent } from '@inst/legal-screens/maintenance/view/oimlegsu.component';
import { OimlegsuService } from '@inst/legal-screens/maintenance/service/oimlegsu.service';
import { OimmholoComponent } from '@inst/movements/maintenance/view/oimmholo.component';
import { OimmholoService } from '@inst/movements/maintenance/service/oimmholo.service';
import { OcmcondiComponent } from '@inst/legal-screens/maintenance/view/ocmcondi.component';
import { OcmcondiService } from '@inst/legal-screens/maintenance/service/ocmcondi.service';
import { OimsatypComponent } from "@inst/legal-screens/maintenance/view/oimsatyp.component";
import { OimsatypService } from "@inst/legal-screens/maintenance/service/oimsatyp.service";
import { OimprfcoComponent } from '@inst/booking/maintainence/view/oimprfco.component';
import { OimprfcoService } from '@inst/booking/maintainence/service/oimprfco.service';
import { OimoffenComponent } from '@inst/legal-screens/maintenance/view/oimoffen.component';
import { OimoffenService } from '@inst/legal-screens/maintenance/service/oimoffen.service';
import { OimcrtorComponent } from '@inst/legal-screens/maintenance/view/oimcrtor.component';
import { OimcrtorService } from '@inst/legal-screens/maintenance/service/oimcrtor.service';
import { OimisreaComponent } from '@inst/schedules/maintenance/view/oimisrea.component';
import { OimisreaService } from '@inst/schedules/maintenance/service/oimisrea.service';
import { OimissueComponent } from '@inst/offender-issues-tracking/maintenance/view/oimissue.component';
import { OimissueService } from '@inst/offender-issues-tracking/maintenance/service/oimissue.service';
import { OimmholoDialogComponent } from '@inst/movements/maintenance/view/oimmholodialog.component';
import { OimmholopopupComponent } from '@inst/movements/maintenance/view/oimmholopopup.component';
import { OimmholoDialogOneComponent } from '@inst/movements/maintenance/view/oimmholodialogone.component';
import { OimmholoDialogTwoComponent } from '@inst/movements/maintenance/view/oimmholodialogtwo.component';
import { OumhlhisdialogComponent } from '@inst/movements/maintenance/view/oumhlhisdialog.component';
import { OiddisreComponent } from '@inst/automated-counts/view/oiddisre.component';
import { OiddisreService } from '@inst/automated-counts/service/oiddisre.service';
import { OcdvteamComponent } from '@inst/workflow/managingteams/view/ocdvteam.component';
import { OcdvteamService } from '@inst/workflow/managingteams/service/ocdvteam.service';
//import { OcidocumService } from '@inst/casemanagement/service/ocidocum.service';
import { OidpawliComponent } from '@inst/institutional-activities/view/oidpawli.component';
import { OidpawliService } from '@inst/institutional-activities/service/oidpawli.service';
//import { OcidocumComponent } from '@inst/casemanagement/view/ocidocum.component';
import { OcmdeftmService } from '@inst/workflow/maintenance/service/ocmdeftm.service';
import { OcmdeftmComponent } from '@inst/workflow/maintenance/view/ocmdeftm.component';
import { OiuvlcteComponent } from '@inst/programs-without-schedules/view/oiuvlcte.component';
import { OcuhvteaComponent } from '@inst/workflow/managingteams/view/ocuhvtea.component';
import { OcuhvteaService } from '@inst/workflow/managingteams/service/ocuhvtea.service';
import { OcittaskService } from '@inst/workflow/managingteams/service/ocittask.service';
import { OumstafcService } from '@inst/workflow/managingworkassignments/servies/oumstafc.service';
import { OiischedService } from '@inst/inquiries/service/oiisched.service';
import { OsunmemoService } from '@inst/programs-without-schedules/service/osunmemo.service';
import { OsunmemoComponent } from '@inst/programs-without-schedules/view/osunmemo.component';
import { OsucnoteComponent } from '@inst/programs-without-schedules/view/osucnote.component';
import { OsucnoteService } from '@inst/programs-without-schedules/service/osucnote.service';
import { OcmssvctComponent } from '@inst/institutional-activities/view/ocmssvct.component';
import { OcmstoffComponent } from '@inst/institutional-activities/maintenance/view/ocmstoff.component';
import { OcmssvctService } from '@inst/institutional-activities/service/ocmssvct.service';
import { OcmstoffService } from '@inst/institutional-activities/maintenance/service/ocmstoff.service';
import { OcdsabusService } from '@inst/booking/service/ocdsabus.service';
import { OcdsabusComponent } from '@inst/booking/view/ocdsabus.component';
import { OcmspracComponent } from '@inst/institutional-activities/maintenance/view/ocmsprac.component';
import { OcmspracService } from '@inst/institutional-activities/maintenance/service/ocmsprac.service';
import { OcupaoffComponent } from '@inst/institutional-activities/view/ocupaoff.component';
import { OcmctoffComponent } from '@cm/programsservices/maintenance/view/ocmctoff.component';
import { OcmctoffService } from '@cm/programsservices/maintenance/service/ocmctoff.service';
import { OcuwkhtyComponent } from '@inst/workflow/managingworkassignments/view/ocuwkhty.component';
import { OcuwkhtyService } from '@inst/workflow/managingworkassignments/servies/ocuwkhty.service';
import { OidcoasiComponent } from '@inst/workflow/managingworkassignments/view/oidcoasi.component';
import { OidcoasiService } from '@inst/workflow/managingworkassignments/servies/oidcoasi.service';
import { OcupaoffService } from '@inst/institutional-activities/service/ocupaoff.service';
import { OidrelscService } from '@inst/schedules/service/oidrelsc.service';
import { OidrelscComponent } from '@inst/schedules/view/oidrelsc.component';
import { OsuntaskComponent } from '@inst/programs-without-schedules/view/osuntask.component';
import { OsuntaskService } from '@inst/programs-without-schedules/service/osuntask.service';
import { OidcnoteDialogComponent } from '@inst/casemanagement/view/oidcnotedialog.component';
import { OcmworksService } from '@inst/workflow/maintenance/service/ocmworks.service';
import { OcmworksComponent } from '@inst/workflow/maintenance/view/ocmworks.component';
import { OcmschrcService } from '@inst/institutional-activities/maintenance/service/ocmschrc.service';
import { OcmschrcComponent } from '@inst/institutional-activities/maintenance/view/ocmschrc.component';
import { OcmteamsComponent } from '@inst/workflow/maintenance/view/ocmteams.component';
import { OcmteamsService } from '@inst/workflow/maintenance/service/ocmteams.service';
import { OcucstafComponent } from '@inst/workflow/maintenance/view/ocucstaf.component';
import { OcucstafService } from '@inst/workflow/maintenance/service/ocucstaf.service';
import { OidschacComponent } from '@inst/institutional-activities/view/oidschac.component';
import { OidschacService } from '@inst/institutional-activities/service/oidschac.service';
import { OidacselComponent } from '@inst/institutional-activities/view/oidacsel.component';
import { OidacselService } from '@inst/institutional-activities/service/oidacsel.service';
import { OidpaattComponent } from '@inst/institutional-activities/view/oidpaatt.component';
import { OidpaattService } from '@inst/institutional-activities/service/oidpaatt.service';
import { OcmxprogComponent } from '@inst/programs-without-schedules/view/ocmxprog.component';
import { OcmxprogService } from '@inst/programs-without-schedules/service/ocmxprog.service';
import { OcmsoschComponent } from '@inst/institutional-activities/maintenance/view/ocmsosch.component';
import { OcmsoschService } from '@inst/institutional-activities/maintenance/service/ocmsosch.service';
//import { OcmsvacpService } from '@inst/accredited-programs/service/ocmsvacp.service';
import { OumstafcComponent } from '@inst/workflow/managingworkassignments/view/oumstafc.component';
import { OsuemailComponent } from '@inst/programs-without-schedules/view/osuemail.component';
import { OsuemailService } from '@inst/programs-without-schedules/service/osuemail.service';
import { OcittaskComponent } from '@inst/workflow/managingteams/view/ocittask.component';
import { OiischedComponent } from '@inst/inquiries/view/oiisched.component';
import { OiuvlcteService } from '@inst/programs-without-schedules/service/oiuvlcte.service';
//import { OcmssvasService } from './../cm/programsservices/maintenance/service/ocmssvas.service';
//import { OcmssvasComponent } from './../cm/programsservices/maintenance/view/ocmssvas.component';
//import { oidreleaDialogComponent } from '@inst/movement-external/view/oidreleadialog.component';
//import { OidpactiComponent } from '@inst/institutional-activities/view/oidpacti.component';
//import { OidpactiService } from '@inst/institutional-activities/service/oidpacti.service';
//import { OcdhealtComponent } from '@inst/booking/view/ocdhealt.component';
//import { OcdhealtService } from '@inst/booking/service/ocdhealt.service';
import { OidpactiComponent } from '@inst/institutional-activities/view/oidpacti.component';
import { OidpactiService } from '@inst/institutional-activities/service/oidpacti.service';
import { OcuincwpComponent } from '@inst/incidents-oic/view/ocuincwp.component';
import { OcuincwpHistoryComponent } from '@inst/incidents-oic/view/ocuincwpHistory.component';
import { OcuoicapComponent } from '@inst/incidents-oic/view/ocuoicap.component';
import { OidstfrpdialogComponent } from '@inst/incidents-oic/view/oidstfrpdialog.component';
import { OsuoicusComponent } from '@inst/incidents-oic/view/osuoicus.component';
import { OcuincfeComponent } from './incidents-oic/view/ocuincfe.component';
import { OcuincfeService } from '@inst/incidents-oic/service/ocuincfe.service';
import { OidstfrppopupComponent } from '@inst/incidents-oic/view/oidstfrppopup.component';
import { OiuirameComponent } from '@inst/incidents-oic/view/oiuirame.component';
import { OidincdepopupComponent } from './incidents-oic/view/oidincdepopup.component';
// import { OcdhealtComponent } from '@inst/booking/view/ocdhealt.component';
// import { OcdhealtService } from '@inst/booking/service/ocdhealt.service';
import { CalScheduleComponent } from '@inst/schedules/view/calschedule.component';
import { OsihrsumComponent } from '@inst/systemsearch/view/osihrsum.component';
import { OiiobalxComponent } from '@inst/systemsearch/view/oiiobalx.component';
import { OsihrsumService } from '@inst/systemsearch/service/osihrsum.service';
import { OiiobalxService } from '@inst/systemsearch/service/oiiobalx.service';
import { OimadmisComponent } from '@inst/booking/maintainence/view/oimadmis.component';
import { OimadmisService } from '@inst/booking/maintainence/service/oimadmis.service';
import { OiibooksComponent } from '../inst/offenderspecific/view/oiibooks.component';
import { OiibooksService } from '../inst/offenderspecific/service/oiibooks.service';
import { OiustinvComponent } from '@inst/offender-issues-tracking/view/oiustinv.component';
import { OiustinvService } from '@inst/offender-issues-tracking/service/oiustinv.service';
import { PropertyImageDialogComponent } from '@common/offender-records/view/propertyimagedialog.component';
import { Backend }  from '../inst/movements/housing-administration/service/backend.service';
import { TokenStore } from '../inst/movements/housing-administration/service/token-store.service';
import { OimoicmpComponent } from '@inst/incidents-oic/maintenance/view/oimoicmp.component';
import { OimoicoiComponent } from '@inst/incidents-oic/maintenance/view/oimoicoi.component';
import { OimoicoiService } from '@inst/incidents-oic/maintenance/service/oimoicoi.service';
import { OimoicmpService } from '@inst/incidents-oic/maintenance/service/oimoicmp.service';
import { OiihlhisComponent } from './inquiries/view/oiihlhis.component';
import { OiihlhisService } from './inquiries/service/oiihlhis.service';
import { OidoicapPopUpComponent } from './incidents-oic/view/OidoicapPopUp.component';
import { OidoicapComponent } from './incidents-oic/view/oidoicap.component';
import { OidoicapService } from './incidents-oic/service/oidoicap.service';
import { OidoicapPenaltyPopUpComponent } from './incidents-oic/view/oidoicappenaltypopup.component';
import { OimcsummService } from '@inst/classification/assessmentmaintenance/service/oimcsumm.service';
import { OimcsummComponent } from '@inst/classification/assessmentmaintenance/view/oimcsumm.component';
import { teamDialogComponent } from '@inst/workflow/maintenance/view/teamDialog.component';
import { OcmteamMainComponent } from '@inst/workflow/maintenance/view/ocmteamMain.component';
import { OcdchgsuDlgComponent } from './legal/view/ocdchgsu_dlg.component';
import { OcdchgdtComponent } from './legal/view/ocdchgdt.component';
import { OcuchgouComponent } from './legal/view/ocuchgou.component';

import { OcmteamMainService } from '@inst/workflow/maintenance/service/ocmteamMain.service';
import { OcuucondComponent } from './legal/view/ocuucond.component';
import { OcucondiDialogProgref } from './legal/view/ocucondidialog-progref.component';
import { OcsprogrComponent } from './legal/view/ocsprogr.component';
import { OcsprogrService } from './legal/service/ocsprogr.service';
import { OcmxpstmService } from '../cm/programsservices/service/ocmxpstm.service';
import { OcondawaitComponent } from './legal/view/ocondawait.component';
import { OcondtrfComponent } from './legal/view/ocondtrf.component';
import { OtkcondtrfComponent } from './legal/view/otkcondtrf.component';
import { CondLegalTextComponent } from './legal/view/condLegalText.component';
import { OiiciponComponent } from '@inst/care-in-placement/view/oiicipon.component';
import { OiiciponService } from '@inst/care-in-placement/service/oiicipon.service';
import { OsanviosComponent } from '@inst/legal/view/osanvios.component';
import { OsanviosCommentText } from './legal/view/osanvioscommenttext.component';
import { NonCustRelatedComponent } from './legal/view/noncustrelated.component';
import { MigadusrComponent } from './demographics-biometrics/view/migadusr.component';
import { OimoffobComponent } from '@inst/offenderobservations/maintenance/view/oimoffob.component';
import { OiuzohosComponent } from '@inst/offenderobservations/maintenance/view/oiuzohos.component';
import { OidoffobComponent } from '@inst/offenderobservations/view/oidoffob.component';
import { OidoobadComponent } from '@inst/offenderobservations/view/oidoobad.component';
import { OiioffobComponent } from '@inst/offenderobservations/view/oiioffob.component';
import { OimsrlucComponent } from '@inst/incidents-oic/maintenance/view/oimsrluc.component';
import { OimsrlucService } from '@inst/incidents-oic/maintenance/service/oimsrluc.service';
import { OcmcnperService } from '@inst/workflow/maintenance/service/ocmcnper.service';
import { OcmcnperComponent } from '@inst/workflow/maintenance/view/ocmcnper.component';
import { OcdbailoComponent } from '@inst/legal/view/ocdbailo.component';
import { OcunoqueDialogComponent } from './classification/view/ocunoquedialog.component';
import { OidieplvComponent } from './visits-management/view/oidieplv.component';
import { OimieplvComponent } from '@inst/visits-management/view/oimieplv.component';
import {StaffReportDetailComponent} from '@inst/incidents-oic/view/staffreportdetail.component';
import { OidomailComponent } from '@inst/correspondencetracking/view/oidomail.component';
import { OidomailService } from '@inst/correspondencetracking/servie/oidomail.service';
import { OimrelscComponent } from '@inst/schedules/maintenance/view/oimrelsc.component';
import { OumbundlComponent } from '@inst/property/view/oumbundl.component';
import { OumbundlService } from '@inst/property/service/oumbundl.service';
import { OcdparorComponent } from '@inst/legal/view/ocdparor.component';
import { DurationToLineComponent } from '@inst/legal/view/duration-to-line.component';
import { OcdparorService } from "@inst/legal/service/ocdparor.service";
import { OcucieidComponent } from '@inst/incidents-oic/view/ocucieid.component';
import { OidshlogDialogComponent } from './shift-logs/view/oidshlogDialog.component';
import {AddOffenderComponent  } from './shift-logs/view/addoffender.component';
import {OcuovkeyComponent} from './legal/view/ocuovkey.component';
import {OcuverkdComponent} from './legal/view/ocuverkd.component';
import { OiimyoffComponent } from '@inst/systemsearch/view/oiimyoff.component';
import { OiimyoffService } from '@inst/systemsearch/service/oiimyoff.service';
import { OcmstatsComponent } from '@inst/legal-screens/maintenance/view/ocmstats.component';
import { OcmstatsService } from '@inst/legal-screens/maintenance/service/ocmstats.service';
import { OcdhealtComponent } from '@inst/demographics-biometrics/view/ocdhealt.component';
import { OcdhealtService } from '@inst/demographics-biometrics/service/ocdhealt.service';
import { OcmlesetComponent } from '@inst/legal-screens/maintenance/view/ocmleset.component';
import { OcmlesetService } from '@inst/legal-screens/maintenance/service/ocmleset.service';
import { OidparoeComponent } from '@inst/legal/view/oidparoe.component';
import { OidparoeService } from '@inst/legal/service/oidparoe.service';
import { OidcustadComponent } from './legal-screens/maintenance/view/oidcustad.component';
import { OidcustadService } from '@inst/legal-screens/maintenance/service/oidcustad.service';
import { RemissionDurationComponent } from '@inst/legal-screens/maintenance/view/remission-duration.component';
import { OcdiplacService } from './casemanagement/service/ocdiplac.service';
import { OcdiplacComponent } from './casemanagement/view/ocdiplac.component';
import { OimcustsComponent } from './legal-screens/maintenance/view/oimcusts.component';
import { OimcustsService } from '@inst/legal-screens/maintenance/service/oimcusts.service';

import { OcudcondComponent } from './legal/view/ocudcond.component';
import { OcdcgpayComponent } from '@inst/institutional-activities/view/ocdcgpay.component';
import { OcdcgpayService } from '@inst/institutional-activities/service/ocdcgpay.service';
import { OcmpssetComponent } from '@inst/institutional-activities/maintenance/view/ocmpsset.component';
import { OcmpssetService } from '@inst/institutional-activities/maintenance/service/ocmpsset.service';
import { OcmpspayComponent } from '@inst/institutional-activities/maintenance/view/ocmpspay.component';
import { OcmpspayService } from '@inst/institutional-activities/maintenance/service/ocmpspay.service';
import { OcupdetaComponent } from '@inst/institutional-activities/view/ocupdeta.component';
import { OcupdetaService } from '@inst/institutional-activities/service/ocupdeta.service';
import { OciphistComponent } from '@inst/institutional-activities/view/ociphist.component';
import { OciphistService } from '@inst/institutional-activities/service/ociphist.service';
import { OivctmngComponent } from '@inst/victimmanagement/view/oivctmng.component';
import { OivctmngService } from '@inst/victimmanagement/service/oivctmng.service';

import { OimrouteService } from '@inst/transportation/maintenance/service/oimroute.service';
import { OimsglenService } from '@inst/transportation/maintenance/service/oimsglen.service';
import { OimstripService } from '@inst/transportation/maintenance/service/oimstrip.service';
import { OidfixadService } from '@inst/transportation/maintenance/service/oidfixad.service';
import { OidgenstService } from '@inst/transportation/maintenance/service/oidgenst.service';
import { OimrouteComponent } from '@inst/transportation/maintenance/view/oimroute.component';
import { OimsglenComponent } from '@inst/transportation/maintenance/view/oimsglen.component';
import { OimstripComponent } from '@inst/transportation/maintenance/view/oimstrip.component';
import { OidfixadComponent } from '@inst/transportation/maintenance/view/oidfixad.component';
import { OidgenstComponent } from '@inst/transportation/maintenance/view/oidgenst.component';
import { OiuselveComponent } from '@inst/transportation/maintenance/view/oiuselve.component';
import { OiuselveService } from '@inst/transportation/maintenance/service/oiuselve.service';
import { OiurepinComponent } from '@inst/incidents-oic/view/oiurepin.component';
import { OiurepinService } from '@inst/incidents-oic/service/oiurepin.service';
import { OimiitpsComponent } from './offender-issues-tracking/maintenance/view/oimiitps.component';
import { OcureminComponent} from '@inst/schedules/view/ocuremin.component';
import { OcureminService } from '@inst/schedules/service/ocuremin.service';
import { OidphuncComponent } from './movements/proposedmovements/view/oidphunc.component';
import { OidinpliComponent } from './movements/proposedmovements/view/oidinpli.component';
import { OidhoustComponent } from './movements/proposedmovements/view/oidhoust.component';
import { OidphuncService } from './movements/proposedmovements/service/oidphunc.service';
import { OidinpliService } from './movements/proposedmovements/service/oidinpli.service';
import { OidhoustService } from './movements/proposedmovements/service/oidhoust.service';
import { OiuschovComponent } from './movements/proposedmovements/view/oiuschov.component';
import { OiusanctComponent } from './movements/proposedmovements/view/oiusanct.component';
import { OiuschovService } from './movements/proposedmovements/service/oiuschov.service';
import { OiusanctService } from './movements/proposedmovements/service/oiusanct.service';
import { OiuononaService } from './movements/proposedmovements/service/oiuonona.service';
import { OiuononaComponent } from './movements/proposedmovements/view/oiuonona.component';
import {OiuschcoComponent}  from '@inst/movements/proposedmovements/view/oiuschco.component';
import {OiuschcoService}  from '@inst/movements/proposedmovements/service/oiuschco.service';
import { OcipenscComponent } from '@inst/legal/view/ocipensc.component';
import { OcipenscService } from "@inst/legal/service/ocipensc.service";
import { OsipsearidialogComponent } from '@inst/visits-management/view/osipsearidialog.component';
import { OsipsearidialogService } from '@inst/visits-management/service/osipsearidialog.service';
import { JiscommonconfirmboxComponent } from './visits-management/view/jiscommonconfirmbox.component';
import { JiscommonconfirmboxService } from '@inst/visits-management/service/jiscommonconfirmbox.service'; 
import { OimallowComponent } from './institutional-activities/maintenance/view/oimallow.component';
import { OimallowService } from '@inst/institutional-activities/maintenance/service/oimallow.service';
import { OidallowComponent } from '@inst/institutional-activities/view/oidallow.component';
import {OidsmsetComponent} from '@inst/schedules/maintenance/view/oidsmset.component';
import { OimprostComponent } from '@inst/property/view/oimprost.component';
import { OimprostService } from '@inst/property/service/oimprost.service';
















@NgModule({
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    declarations: [
        OidincdeComponent,
        IncidentHeaderBlockComponent,
        IncidentSearchComponent,
        OcdaliasComponent,
        OcdalertComponent,
        OiuimageComponent,
        OcuoicinComponent,
        OidoicusComponent,
        OidpinfoComponent,
        OcuoicheComponent,
        OcdaddreComponent,
        OcuoicchComponent,
        OiioicusComponent,
        OimoicoidialogComponent,
        OcuoichnComponent,
        OidadmisComponent,
        OmuavbedComponent,
        OidpidenComponent,
        OidreleaComponent,
        OcuoicawComponent,
        OimoicmpdialogComponent,
        OcuoicpeComponent,
        //OimoicmpComponent,
        OiiinlogComponent,
        OiuincrpComponent,
        OiiinlogpopupComponent,
        OcdedempComponent,
        OcdccontComponent,
        OcdgnumbComponent,
        OcdoapopComponent,
        OidmpconComponent,
        OcdoapopComponent,
        OiddpropComponent,
        OiiptranComponent,
        OiipclocComponent,
        OiiptranComponent,
        OsunmemoComponent,
        OsucnoteComponent,
        OiiptranComponent,
        OidtpconComponent,
        OiinamesComponent,
        OidtpritComponent,
        OiipctraComponent,
        OidtpritComponent,
        OidvcontComponent,
        OidrpitmComponent,
        OidrtconComponent,
        OidtrwjuComponent,
        OcuoicawPopUpComponent,
        OumrcodeComponent,
        OiditranComponent,
        OidincdeChargePopUpComponent,
        OiditranagylocsComponent,
        OiustgasComponent,
        OiustgaslovComponent,
        OidincdeStaffPopUpComponent,
        OimuhebyComponent,
        OidstabsComponent,
        OidscmovComponent,
        OidstabsagylocpopupComponent,
        OidstabsbuspopupComponent,
        OidstabsothpopupComponent,
        OidscmovconfirmboxComponent,
        OidscexmComponent,
        OidscmovconfirmboxComponent,
        OiuscinqComponent,
        OumorcodComponent,
        OcurwarnComponent,
        OidtrojuComponent,
        OiiemoveComponent,
        OmuerrcoComponent,
        OiiwltwjComponent,
        OidbutabComponent,
        OidstwjuComponent,
        OidstojuComponent,
        OidstwjuappbypopupComponent,
        OidstwjuconfirmationpopupComponent,
        OcdclistComponent,
        OidbstrnComponent,
        OidstwjudelnotifipopupComponent,
        OidunctaComponent,
        OidescapComponent,
        OiioscedComponent,
        OiicmociComponent,
        OmuerrcoconfirmationpopupComponent,
        OidintmvComponent,
        OiintlocComponent,
        OidbsiapComponent,
        OmuerrcoconfirmationpopupComponent,
        OidsiappComponent,
        OidsiappComponent,
        OiidmoveComponent,
        OidrhlocComponent,
        OidchlocComponent,
        OidcholoComponent,
        OmurmresComponent,
        OmuavlocComponent,
        OidadmisconfirmboxComponent,
        OidehlocComponent,
        OidciponComponent,
        OcuwarngComponent,
        OiinamesdialogComponent,
        OidehlocconfirmationpopupComponent,
        OcupsrdeComponent,
        OcdlangsComponent,
        OidcnoteComponent,
        OidmhistComponent,
        OcdnoqueComponent,
        OidcapprComponent,
        OcunoqueComponent,
        OmuclassComponent,
        OiiclassComponent,
        OcunotcmComponent,
        OcucalcrComponent,
        OcusofncComponent,
        OcustfasComponent,
        OciiplanComponent,
        OiiiscouComponent,
        OcustfaspopupComponent,
        OcutasatComponent,
        OidshlogComponent,
        OiishlogComponent,
        OidistatComponent,
        OidshlogconfirmationpopupComponent,
        OcdiplanComponent,
        OidrplanComponent,
        OidrplanpopupComponent,
        OiishlogdetailspopupComponent,
        OcucnameComponent,
        OciocnotComponent,
        OiddecasComponent,
        OiddecasconfirmboxComponent,
        OcdlegstComponent,
        // OcucondiComponent
        OidrplanproposedemplomentpopupComponent,
        OcdpersoComponent,
        OsipsearComponent,
        OcucnperComponent,
        OcuperprComponent,
        OcuoccupComponent,
        OiiprollComponent,
        OidremcsComponent,
        OidcountComponent,
        OidcountloaderComponent,
        OiiunrolComponent,
        OiiinrolComponent,
        OcuverifComponent,
        OcuoccupnamedlgComponent,
        OcucloffComponent,
        OidsublcComponent,
        OidcountPopUpComponent,
        OidojoinComponent,
        OffenderScheduleComponent,
        OidverccComponent,
        OiihiscoComponent,
        OsipserdialogComponent,
        OcuavlocComponent,
        OcuprestComponent,
        OmuaprisComponent,
        OidvtourComponent,
        OiuincreComponent,
        OidpawliComponent,
        OidvisitComponent,
        OidrecorComponent,
        OiivisitComponent,
        OidissueComponent,
        OidsenhyComponent,
        OidsenkdComponent,
        KeyDatesComponent,
        OidhwdetComponent,
        OiigrievComponent,
        OiuprresComponent,
        OidsenadComponent,
        OidviresComponent,
        OmuvrestComponent,
        OcuavisnComponent,
        OiuovresComponent,
        OmuvrestdialogComponent,
        OcdxprogComponent,
        OcuupstaComponent,
        OciscataComponent,
        ConsToLineComponent,
        TermToLineComponent,
        DurationToLineComponent,
        MulticountComponent,
        NoncustdurationComponent,
        RelatedToLineComponent,
        OcdintpaComponent,
        NonCustRelatedComponent,
        OcdotaskComponent,
        OcdpnoteComponent,
        OiuvlcteComponent,
        OiuiwpveComponent,
        OciscataadvancesearchpopupComponent,
        OciscatadialogComponent,
        //OiuiwpgnComponent,
        //OmsrelstComponent,
        OcuvwarnComponent,
        OidstestComponent,
        HousingActionComponent,
        HousingAllocationComponent,
        HousingComponent,
        HousingInfoComponent,
        HousingConflictsViewComponent,
        OcdccaseComponent,
        OcdchgsuComponent,
        OcdlegloComponent,
        OcdbailoComponent,
        OcdparorComponent,
        OcdleglnComponent,
        OcdleglsComponent,
        OidcrtevComponent,
        OcuoffenComponent,
        OcuholdsComponent,
        OcuccideComponent,
        OculcaseComponent,
        OculegstComponent,
        OculegstSentenceComponent,
        OculegstConditionComponent,
        OcucondiComponent,
        OcuucondComponent,
        OcucondiDialogComponent,
        HousingCleanupComponent,
        OiuimagedialogComponent,
        OidmpitmComponent,
        ManagePropertiesComponent,
        ManagePropertiesDialogComponent,
        SealdialogComponent,
        WarndialogComponent,
        ContainerComponent,
        NewContainerComponent,
        CameraDialogComponent,
        OiuimageExportScreenComponent,
        ImageCaptureDialogComponent,
        PropertyImageDialogComponent,
        OidarfplComponent,
        MigadusrComponent,
        OidarhplComponent,
        OiitgdetComponent,
        OimtgngsComponent,
        OiistgmiComponent,
        OiitgdetDialogComponent,
        OimtgoptComponent,
        OidstgvlComponent,
        OiistgmbComponent,
        OidmbrdtComponent,
        OidstgidComponent,
        OidononaComponent,
        OidmbrvlComponent,
        OsistgkwComponent,
        OidmbrasComponent,
        OidappndComponent,
        OidstgcnComponent,
        OidononaDialogComponent,
        OcdaliasDialogComponent,
        OidpidenDialogComponent,
        OcdnoqueDialogComponent,
        OidstginComponent,
        OidstgaeComponent,
        OidstghlComponent,
        OidoicusDialogComponent,
        OcmserviComponent,
        OcmsvassComponent,
        //OcmsvphaComponent,
        OcmphblkComponent,
        OimilocaComponent,
        OimprfcaComponent,
        OimprfcoComponent,
        //OcidocumComponent,
        OimstatuComponent,
        OidcoasiComponent,
        OcmorcodComponent,
        OimslevlComponent,
        OimulocaComponent,
        OiunonasComponent,
        OuminoutComponent,
        OimctactComponent,
        OcuintlcComponent,
        OumhlhisComponent,
        OimpldurComponent,
        OimvdtslComponent,
        OimsenotComponent,
        OidschacComponent,
        OidacselComponent,
        OumemoveComponent,
        OimvlimtComponent,
        OimlegstComponent,
        OimcountComponent,
        OumhocodComponent,
        OimlegsuComponent,
        OimmholoComponent,
        OcmcondiComponent,
        OimsatypComponent,
        OimoffenComponent,
        OimcrtorComponent,
        OimisreaComponent,
        OimissueComponent,
        //OcmssvasComponent,
        OsuntaskComponent,
        OcmsoschComponent,
        OumstafcComponent,
        OsuemailComponent,
        OimmholoDialogComponent,
        OimmholopopupComponent,
        OimmholoDialogOneComponent,
        OimmholoDialogTwoComponent,
        OumhlhisdialogComponent,
        OiddisreComponent,
        OcdvteamComponent,
        OcittaskComponent,
        OiischedComponent,
        OcmdeftmComponent,
        OcuhvteaComponent,
        OcmssvctComponent,
        OcmstoffComponent,
        OcdsabusComponent,
        OcmspracComponent,
        OcmctoffComponent,
        OcuwkhtyComponent,
        OcupaoffComponent,
        OidrelscComponent,
        OidcnoteDialogComponent,
        OcmworksComponent,
        OcmschrcComponent,
        //OcmsvacpComponent,
        OcmteamsComponent,
        OcucstafComponent,
        OidpaattComponent,
        OcmxprogComponent,
        //oidreleaDialogComponent,
        OidpactiComponent,
        OcuincwpHistoryComponent,
        OcuincwpComponent,
        OcuoicapComponent,
        OidstfrpdialogComponent,
        OsuoicusComponent,
        OcuincfeComponent,
        OiuirameComponent,
        OidstfrppopupComponent,
        OidincdepopupComponent,
        //OcdhealtComponent,
        CalScheduleComponent,
        OsihrsumComponent,
        OiiobalxComponent,
        OimadmisComponent,
        OiibooksComponent,
        OiustinvComponent,
        EditUnitDialogComponent,
        BedAdministrationComponent,
        UnitAdministrationComponent,
        UnitPlanUploadComponent,
        HousingAdministrationComponent,
        FlattenUnitListPipe,
        LivingUnitToolbarComponent,
        OimoicmpComponent,
        OimoicoiComponent,
        OimsrlucComponent,
        OiihlhisComponent,
        OidoicapComponent,
        OidoicapPopUpComponent,
        OidoicapPenaltyPopUpComponent,
        OimcsummComponent,
        OcmteamMainComponent,
        teamDialogComponent,
        OcdchgsuDlgComponent,
        OcdchgdtComponent,
        OcuchgouComponent,
        OcucondiDialogProgref,
        OcsprogrComponent,
        OcondawaitComponent,
        OcondtrfComponent,
        OtkcondtrfComponent,
        CondLegalTextComponent,
        OiiciponComponent,
        OsanviosComponent,
        OsanviosCommentText, 
        OimoffobComponent,
        OiuzohosComponent,
        OidoffobComponent,
        OidoobadComponent,
        OiioffobComponent,
        OcmcnperComponent,
        OcunoqueDialogComponent,
        OidieplvComponent,
		OimieplvComponent,
		StaffReportDetailComponent,
		OidomailComponent,
		OimrelscComponent,
		OumbundlComponent,
		 OidshlogDialogComponent,
        OcdbailoComponent,
        OidomailComponent,
        OimrelscComponent,
        AddOffenderComponent,
	OcucieidComponent,
    OcuovkeyComponent,
    OcuverkdComponent,
    OiimyoffComponent,
    OcmstatsComponent,
    OcdhealtComponent,
    OcmlesetComponent,
    OidparoeComponent,
    OidcustadComponent,
    RemissionDurationComponent,
    OcdiplacComponent,
    OimcustsComponent,
    OcudcondComponent,
    OcdcgpayComponent,
    OcmpssetComponent,
    OcmpspayComponent,
    OcupdetaComponent,
    OciphistComponent,
    OivctmngComponent,
    OimrouteComponent,
	OiuselveComponent,
	OimsglenComponent,
	OimstripComponent,
	OidfixadComponent,
	OidgenstComponent,
    OiurepinComponent,
    OimiitpsComponent,
    OcureminComponent,
    OidphuncComponent,
    OidinpliComponent,
    OidhoustComponent,
    OiuschovComponent,
    OiusanctComponent,
    OiuononaComponent,
    OiuschcoComponent,
    OcipenscComponent,
    JiscommonconfirmboxComponent, 
    OsipsearidialogComponent,
    OimallowComponent,
    OidallowComponent,
    OidsmsetComponent,
    OimprostComponent    

    ],
    imports: [
        FormsModule,
        FlexLayoutModule,
        ReactiveFormsModule,
        UiComponentsModule,
        CommonModule,
        MaterialModule,
        DndModule.forRoot(),
    ],
    exports: [
        OidincdeComponent,
        UiComponentsModule,
        OcdccaseComponent,
        OcdchgsuComponent,
        OcdlegloComponent,
        OcdbailoComponent,
        OcdparorComponent,
        OcdleglnComponent,
        OcdleglsComponent,
        OidcrtevComponent,
        IncidentHeaderBlockComponent,
        IncidentSearchComponent,
        OcdaliasComponent,
        OcdalertComponent,
        OiuimageComponent,
        OcuoicinComponent,
        OidoicusComponent,
        OidpinfoComponent,
        OcuoicheComponent,
        OcdaddreComponent,
        OcuoicchComponent,
        OiioicusComponent,
        OimoicoidialogComponent,
        OcuoichnComponent,
        OidadmisComponent,
        OmuavbedComponent,
        OidpidenComponent,
        OidreleaComponent,
        OcuoicawComponent,
        OimoicmpdialogComponent,
        OcuoicpeComponent,
        //OimoicmpComponent,
        OiiinlogComponent,
        OiuincrpComponent,
        OiiinlogpopupComponent,
        OcdedempComponent,
        OcdccontComponent,
        OcdgnumbComponent,
        OcdoapopComponent,
        OidmpconComponent,
        OsunmemoComponent,
        OsucnoteComponent,
        OcdoapopComponent,
        OiddpropComponent,
        OiiptranComponent,
        OiipclocComponent,
        OiiptranComponent,
        OiiptranComponent,
        OidtpconComponent,
        OiinamesComponent,
        OidtpritComponent,
        OiipctraComponent,
        OidtpritComponent,
        OidvcontComponent,
        OidrpitmComponent,
        OidrtconComponent,
        OidtrwjuComponent,
        OcuoicawPopUpComponent,
        OumrcodeComponent,
        OiditranComponent,
        OidincdeChargePopUpComponent,
        OiditranagylocsComponent,
        OiustgasComponent,
        OiustgaslovComponent,
        OidincdeStaffPopUpComponent,
        OimuhebyComponent,
        OidstabsComponent,
        OidscmovComponent,
        OidstabsagylocpopupComponent,
        OidstabsbuspopupComponent,
        OidstabsothpopupComponent,
        OidscmovconfirmboxComponent,
        OidscexmComponent,
        OidscmovconfirmboxComponent,
        OiuscinqComponent,
        OcurwarnComponent,
        OidtrojuComponent,
        OiiemoveComponent,
        OmuerrcoComponent,
        OiiwltwjComponent,
        OidbutabComponent,
        OidstwjuComponent,
        OidstojuComponent,
        OidstwjuappbypopupComponent,
        OidstwjuconfirmationpopupComponent,
        OcdclistComponent,
        OidbstrnComponent,
        OidstwjudelnotifipopupComponent,
        OidunctaComponent,
        OidescapComponent,
        OiioscedComponent,
        OiicmociComponent,
        OmuerrcoconfirmationpopupComponent,
        OidintmvComponent,
        OiintlocComponent,
        OidbsiapComponent,
        OmuerrcoconfirmationpopupComponent,
        OidsiappComponent,
        OidsiappComponent,
        OiidmoveComponent,
        OidrhlocComponent,
        OidchlocComponent,
        OidcholoComponent,
        OmurmresComponent,
        OmuavlocComponent,
        OidadmisconfirmboxComponent,
        OidehlocComponent,
        OidciponComponent,
        OcuwarngComponent,
        OiinamesdialogComponent,
        OidehlocconfirmationpopupComponent,
        OcdlangsComponent,
        OidcnoteComponent,
        OidmhistComponent,
        OcdnoqueComponent,
        OidcapprComponent,
        OcunoqueComponent,
        OmuclassComponent,
        OiiclassComponent,
        OcunotcmComponent,
        OcustfasComponent,
        OciiplanComponent,
        OiiiscouComponent,
        OcustfaspopupComponent,
        OcutasatComponent,
        OidshlogComponent,
        OiishlogComponent,
        OidistatComponent,
        OidshlogconfirmationpopupComponent,
        OcdiplanComponent,
        OidrplanComponent,
        OidrplanpopupComponent,
        OiishlogdetailspopupComponent,
        OcucnameComponent,
        OciocnotComponent,
        // OcucondiComponent,
        OiddecasconfirmboxComponent,
        OcdlegstComponent,
        OidrplanproposedemplomentpopupComponent,
        OcdpersoComponent,
        OsipsearComponent,
        OcucnperComponent,
        OcuperprComponent,
        OcuoccupComponent,
        OiiprollComponent,
        OidremcsComponent,
        OidcountComponent,
        OidcountloaderComponent,
        OiiunrolComponent,
        OiiinrolComponent,
        OcuverifComponent,
        OcuoccupnamedlgComponent,
        OcucloffComponent,
        OidsublcComponent,
        OidcountPopUpComponent,
        OidverccComponent,
        OiihiscoComponent,
        OsipserdialogComponent,
        OcuavlocComponent,
        OcuprestComponent,
        OmuaprisComponent,
        OidvtourComponent,
        OiuincreComponent,
        OidpawliComponent,
        OidvisitComponent,
        OidrecorComponent,
        OiivisitComponent,
        OidissueComponent,
        OiigrievComponent,
        OiuprresComponent,
        OidviresComponent,
        OmuvrestComponent,
        OcuavisnComponent,
        OiuovresComponent,
        OmuvrestdialogComponent,
        OcdxprogComponent,
        OcuupstaComponent,
        OciscataComponent,
        ConsToLineComponent,
        TermToLineComponent,
        DurationToLineComponent,
        MulticountComponent,
        NoncustdurationComponent,
        RelatedToLineComponent,
        OcdintpaComponent,
        NonCustRelatedComponent,
        OcdotaskComponent,
        OcdpnoteComponent,
        OiuvlcteComponent,
        OiuiwpveComponent,
        OciscataadvancesearchpopupComponent,
        OciscatadialogComponent,
        //OiuiwpgnComponent,
        //OmsrelstComponent,
        OcuvwarnComponent,
        OidstestComponent,
        HousingActionComponent,
        HousingAllocationComponent,
        HousingComponent,
        HousingInfoComponent,
        HousingConflictsViewComponent,
        OiuimagedialogComponent,
        OiuimageExportScreenComponent,
        PropertyImageDialogComponent,
        OidmpitmComponent,
        ManagePropertiesComponent,
        ManagePropertiesDialogComponent,
        SealdialogComponent,
        WarndialogComponent,
        ContainerComponent,
        NewContainerComponent,
        OidmpitmComponent,
        CameraDialogComponent,
        ImageCaptureDialogComponent,
        OidarfplComponent,
        MigadusrComponent,
        OidarhplComponent,
        OiitgdetComponent,
        OimtgngsComponent,
        OiistgmiComponent,
        OiitgdetDialogComponent,
        OimtgoptComponent,
        OidstgvlComponent,
        OiistgmbComponent,
        OidmbrdtComponent,
        OidstgidComponent,
        OidononaComponent,
        OidmbrvlComponent,
        OsistgkwComponent,
        OidmbrasComponent,
        OidstgcnComponent,
        OidononaDialogComponent,
        OcdaliasDialogComponent,
        OidpidenDialogComponent,
        OcdnoqueDialogComponent,
        OidstginComponent,
        OidstgaeComponent,
        OidstghlComponent,
        OidoicusDialogComponent,
        OcmserviComponent,
        OcmsvassComponent,
        //OcmsvphaComponent,
        OcmphblkComponent,
        OimilocaComponent,
        OimprfcaComponent,
        OimprfcoComponent,
        //OcidocumComponent,
        OimstatuComponent,
        OidcoasiComponent,
        OcmorcodComponent,
        OimslevlComponent,
        OimulocaComponent,
        OiunonasComponent,
        OuminoutComponent,
        OimctactComponent,
        OcuintlcComponent,
        OumhlhisComponent,
        OimpldurComponent,
        OimvdtslComponent,
        OimsenotComponent,
        OidschacComponent,
        OidacselComponent,
        OumemoveComponent,
        OimvlimtComponent,
        OimlegstComponent,
        OimcountComponent,
        OumhocodComponent,
        OimlegsuComponent,
        OimmholoComponent,
        OcmcondiComponent,
        OimsatypComponent,
        OimoffenComponent,
        OimcrtorComponent,
        OimisreaComponent,
        OimissueComponent,
        //OcmssvasComponent,
        OsuntaskComponent,
        OcmsoschComponent,
        OumstafcComponent,
        OsuemailComponent,
        OimmholoDialogComponent,
        OimmholopopupComponent,
        OimmholoDialogOneComponent,
        OimmholoDialogTwoComponent,
        OumhlhisdialogComponent,
        OiddisreComponent,
        OcdvteamComponent,
        OcittaskComponent,
        OiischedComponent,
        OcmdeftmComponent,
        OcuhvteaComponent,
        OcmssvctComponent,
        OcmstoffComponent,
        OcdsabusComponent,
        OcmspracComponent,
        OcmctoffComponent,
        OcuwkhtyComponent,
        OcupaoffComponent,
        OidrelscComponent,
        OidcnoteDialogComponent,
        OcmworksComponent,
        OcmschrcComponent,
        //OcmsvacpComponent,
        OcmteamsComponent,
        OcucstafComponent,
        OidpaattComponent,
        OcmxprogComponent,
        //oidreleaDialogComponent,
        OidpactiComponent,
        OcuincwpComponent,
        OcuoicapComponent,
        OidstfrpdialogComponent,
        OsuoicusComponent,
        OcuincfeComponent,
        //OcdhealtComponent,
        CalScheduleComponent,
        OsihrsumComponent,
        OiiobalxComponent,
        OimadmisComponent,
        OiibooksComponent,
        OiustinvComponent,
        BedAdministrationComponent,
        UnitAdministrationComponent,
        UnitPlanUploadComponent,
        HousingAdministrationComponent,
        FlattenUnitListPipe,
        LivingUnitToolbarComponent,
        OimoicmpComponent,
        OimoicoiComponent,
        OiihlhisComponent,
        OidoicapComponent,
        OidoicapPopUpComponent,
        OidoicapPenaltyPopUpComponent,
        OimcsummComponent,
        OcmteamMainComponent,
        teamDialogComponent,
        OcdchgsuDlgComponent,
        OcdchgdtComponent,
        OcuchgouComponent,
        OcucondiDialogProgref,
        OcsprogrComponent,
        OcondawaitComponent,
        OcondtrfComponent,
        OtkcondtrfComponent,
        CondLegalTextComponent,
        OiiciponComponent,
        OsanviosComponent,
        OsanviosCommentText,
        OidoffobComponent,
        OidoobadComponent,
        OiioffobComponent,
        OcmcnperComponent,
        OidieplvComponent,
        OimieplvComponent,
        StaffReportDetailComponent,
        OidomailComponent,
        OimrelscComponent,
        OcucieidComponent,
        OidshlogDialogComponent,
        AddOffenderComponent,
        OiimyoffComponent,
        OcmstatsComponent,
        OcdhealtComponent,
        OcmlesetComponent,
        OidparoeComponent,
        RemissionDurationComponent,
        OimcustsComponent,
        OcdcgpayComponent,
        OcmpssetComponent,
        OcmpspayComponent,
        OcupdetaComponent,
        OciphistComponent,
        OivctmngComponent,
		OimrouteComponent,
	OiuselveComponent,
	OimsglenComponent,
	OimstripComponent,
	OidfixadComponent,
	OidgenstComponent,
    OiurepinComponent,
    OimiitpsComponent,
    OcureminComponent,
    OidphuncComponent,
    OidinpliComponent,
    OidhoustComponent,
    OiuschovComponent,
    OiusanctComponent,
    OiuononaComponent,
    OiuschcoComponent, 
    OcipenscComponent,
    OsipsearidialogComponent,
    JiscommonconfirmboxComponent, 
    OimallowComponent,
    OidallowComponent,
    OimprostComponent
    ],
    providers: [
        OidincdeService,
        IncidentSearchService,
        OcdaliasService,
        OcdalertService,
        OidstfrpService,
        OcuincfeService,
        OidoicusService,
        OcuoicinService,
        OidpinfoService,
        OcuoicheService,
        OcdaddreService,
        OcuoicchService,
        OiioicusService,
        OcuoichnService,
        OcuincwpService,
        OidadmisService,
        OmuavbedService,
        OidpidenService,
        OidreleaService,
        OcuoicawService,
        OiiinlogService,
        OiuincrpService,
        OcdedempService,
        OcdccontService,
        OcdgnumbService,
        OcdoapopService,
        OidmpconService,
        OcdoapopService,
        OiddpropService,
        OiiptranService,
        OiipclocService,
        OiiptranService,
        OsunmemoService,
        OsucnoteService,
        OiiptranService,
        OidtpconService,
        OiinamesService,
        OidtpritService,
        OiipctraService,
        OidpawliService,
        OidtpritService,
        OidvcontService,
        OidrpitmService,
        OidrtconService,
        OidtrwjuService,
        OumrcodeService,
        OiditranService,
        OiustgasService,
        OidstabsService,
        OidscmovService,
        OidscexmService,
        OidscmovService,
        OiuscinqService,
        OcurwarnService,
        OidtrojuService,
        OiiemoveService,
        OmuerrcoService,
        OiiwltwjService,
        OidbutabService,
        OidstwjuService,
        OidstojuService,
        OcdclistService,
        OidbstrnService,
        OidunctaService,
        OidescapService,
        OiioscedService,
        OiicmociService,
        OidintmvService,
        OiintlocService,
        OiicmociService,
        OidbsiapService,
        OidsiappService,
        OiidmoveService,
        OsuemailService,
        //OcmssvasService,
        OsuntaskService,
        OcmsoschService,
        OidrhlocService,
        OidchlocService,
        OmurmresService,
        OmuavlocService,
        OidcholoService,
        OidehlocService,
        OidciponService,
        OcuwarngService,
        OcupsrdeService,
        OcdlangsService,
        OidcnoteService,
        OidmhistService,
        OcdnoqueService,
        OidcapprService,
        OcunoqueService,
        OmuclassService,
        OiiclassService,
        OcunotcmService,
        OcucalcrService,
        OcusofncService,
        OcustfasService,
        OciiplanService,
        OiiiscouService,
        OcutasatService,
        OidshlogService,
        OiishlogService,
        OidistatService,
        OcdiplanService,
        OidrplanService,
        OcucnameService,
        OciocnotService,
        OiddecasService,
        OcdlegstService,
        // OcucondiService
        OcdpersoService,
        OsipsearService,
        OcucnperService,
        OcuperprService,
        OcuoccupService,
        OiiprollService,
        OidremcsService,
        OidcountService,
        OiiunrolService,
        OiiinrolService,
        OcuverifService,
        OcucloffService,
        OidsublcService,
        OidojoinService,
        OidverccService,
        OiihiscoService,
        OcuavlocService,
        OcuprestService,
        OmuaprisService,
        OidvtourService,
        OiuincreService,
        OidvisitService,
        OidrecorService,
        OiivisitService,
        OidissueService,
        OidsenhyService,
        OidsenkdService,
        KeyDatesService,
        OidhwdetService,
        OiigrievService,
        OiuprresService,
        OidsenadService,
        OidviresService,
        OmuvrestService,
        OcuavisnService,
        OiuovresService,
        OcdxprogService,
        OcuupstaService,
        OciscataService,
        OcdotaskService,
        OcdpnoteService,
        OiuvlcteService,
        OiuiwpveService,
        //OiuiwpgnService,
        OiuimageService,
        //OmsrelstService,
        OcuvwarnService,
        OidstestService,
        HousingService,
        OcdccaseService,
        OcdchgsuService,
        OcdlegloService,
        OcdbailoService,
        OcdparorService,
        OcdintpaService,
        OcdleglnService,
        OcdleglsService,
        OidcrtevService,
        OcuholdsService,
        OicuccideService,
        OculcaseService,
        OculegstService,
        OculegstSentenceService,
        OcucondiService,
        HousingCleanUpService,
        OidarfplService,
        OidmpitmService,
        OiitgdetService,
        OimtgngsService,
        OiistgmiService,
        OimtgoptService,
        OidstgvlService,
        OidmbrdtService,
        OiistgmbService,
        OidstgidService,
        OidononaService,
        OidmbrvlService,
        OsistgkwService,
        OidmbrasService,
        OidappndService,
        OidstgcnService,
        OidstginService,
        OidstgaeService,
        OidstghlService,
        OcmserviService,
        OcmsvassService,
        //OcmsvphaService,
        OcmphblkService,
        OimprfcaService,
        OimprfcoService,
        //OcidocumService,
        OimstatuService,
        OidcoasiService,
        OcmorcodService,
        OimilocaService,
        OimslevlService,
        OimulocaService,
        OiunonasService,
        OuminoutService,
        OimctactService,
        OcuintlcService,
        OumhlhisService,
        OimpldurService,
        OimvdtslService,
        OimsenotService,
        OidschacService,
        OidacselService,
        OumemoveService,
        OimvlimtService,
        OimlegstService,
        OimcountService,
        OumhocodService,
        OimlegsuService,
        OimmholoService,
        OcmcondiService,
        OimsatypService,
        OimoffenService,
        OimcrtorService,
        OimisreaService,
        OumstafcService,
        OimissueService,
        OiddisreService,
        OcdvteamService,
        OcittaskService,
        OiischedService,
        OcmdeftmService,
        OcuhvteaService,
        OcmssvctService,
        OcmstoffService,
        OcdsabusService,
        OcmspracService,
        OcmctoffService,
        OcuwkhtyService,
        OcupaoffService,
        OidrelscService,
        OcmworksService,
        OcmschrcService,
        //OcmworksService,
        //OcmworksService,
        //OcmsvacpService,
        OcmteamsService,
        OcucstafService,
        OidpaattService,
        OcmxprogService,
        //OidpactiService,
        //OcdhealtService,
        OidpactiService,
        OimadmisService,
        OsihrsumService,
        OiiobalxService,
        OiibooksService,
        OiustinvService,
        AppStateService,
        HousingAdministrationStateService,
        OimoicoiService,
        OimoicmpService,
        OimsrlucService,
        OiihlhisService,
        OidoicapService,
        OimcsummService,
        OcmteamMainService,
        OcsprogrService,
        OcmxpstmService,
        OiiciponService,
        OcmcnperService,
        OidomailService,
        OumbundlService,
        OiimyoffService,
        OcmstatsService,
        OcdhealtService,
        OcmlesetService,
        OidparoeService,
        OidcustadService,
        OcdiplacService,
        OimcustsService,
        OcmpssetService,
        OcmpspayService,
        OcupdetaService,
        OciphistService,
        OcdcgpayService,
        OivctmngService, 
		OimrouteService,
		OiuselveService,
		OimsglenService,
		OimstripService,
		OidfixadService,
		OidgenstService,
        OiurepinService,
        OcureminService,
        OidphuncService,
        OidinpliService,
        OidhoustService, 
        OiuschovService,
        OiusanctService,
        OiuononaService,
        OiuschcoService,
        OcipenscService,
        OsipsearidialogService,
        JiscommonconfirmboxService,
        OimallowService,
        OimprostService,
        { provide: Backend, useClass: DefaultBackend },
        { provide: TokenStore, useClass: DefaultTokenStore },
        /*  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true } */
    ]
})

export class InstModule { }
