import { MaterialModule } from './../core/material.module';
import { OdynfrmComponent } from '@sa/admin/view/odynfrm.component';
import { CamundaBpmnComponent } from './admin/view/camundabpmn.component';
import { InstModule } from '@inst/inst.module';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UiComponentsModule } from '@ui-components/ui-components.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { OumaglocComponent } from '@sa/admin/view/oumagloc.component';
import { OumaglocService } from '@sa/admin/service/oumagloc.service';
import { OumacaseComponent } from '@sa/admin/view/oumacase.component';
import { OumacaseService } from '@sa/admin/service/oumacase.service';
import { OumusersComponent } from '@sa/usersystemsecurity/view/oumusers.component';
import { OumusersService } from '@sa/usersystemsecurity/service/oumusers.service';
import { OumpersoComponent } from '@sa/usersystemsecurity/view/oumperso.component';
import { OumpersoService } from '@sa/usersystemsecurity/service/oumperso.service';
import { OumsypflComponent } from '@sa/admin/view/oumsypfl.component';
import { OumsypflService } from '@sa/admin/service/oumsypfl.service';
import { OumrolesComponent } from '@sa/usersystemsecurity/view/oumroles.component';
import { OumrolesService } from '@sa/usersystemsecurity/service/oumroles.service';
import { OumassmuComponent } from '@sa/usersystemsecurity/view/oumassmu.component';
import { OumassmuService } from '@sa/usersystemsecurity/service/oumassmu.service';
import { OmsmoduleComponent } from '@sa/usersystemsecurity/view/omsmodule.component';
import { OmsrolesComponent } from '@sa/usersystemsecurity/view/omsroles.component';
import { OumusersclComponent } from '@sa/usersystemsecurity/view/oumuserscl.component';
import { OumusersrlsComponent } from '@sa/usersystemsecurity/view/oumusersrls.component';
import { OumaglocpopComponent } from '@sa/usersystemsecurity/view/oumaglocpop.component';
//import { OumagyhtService } from '@sa/admin/service/oumagyht.service';
//import { OumagyhtComponent } from '@sa/admin/view/oumagyht.component';
//import { OumpersdComponent } from '@sa/usersystemsecurity/view/oumpersd.component';
//import { OumpersdService } from '@sa/usersystemsecurity/service/oumpersd.service';
import { OumagyhtService } from '@sa/admin/service/oumagyht.service';
import { OumagyhtComponent } from '@sa/admin/view/oumagyht.component';
import { OumsyslabComponent } from '@sa/admin/view/oumsyslab.component';
import { OlisetComponent } from '@sa/admin/view/oliset.component';
import { OmshelpComponent } from '@sa/admin/view/omshelp.component';
import { OumpersdComponent } from '@sa/usersystemsecurity/view/oumpersd.component';
import { OumpersdService } from '@sa/usersystemsecurity/service/oumpersd.service';
import { OuiadactService } from '@sa/audit/service/ouiadact.service';
import { OuiadactComponent } from '@sa/audit/view/ouiadact.component';
import { OumrareaComponent } from '@sa/admin/view/oumrarea.component';
import { OumrareaService } from '@sa/admin/service/oumrarea.service';
//import { OumclfrmComponent } from '@sa/admin/view/oumclfrm.component';
//import { OumclfrmService } from '@sa/admin/service/oumclfrm.service';
import { OumauditComponent } from '@sa/audit/maintenance/view/oumaudit.component';
import { OumauditService } from '@sa/audit/maintenance/service/oumaudit.service';
//import { OumapassComponent } from '@sa/usersystemsecurity/view/oumapass.component';
//import { OumapassService } from '@sa/usersystemsecurity/service/oumapass.service';
//import { OummenusComponent } from '@sa/admin/view/oummenus.component';
//import { OummenusService } from '@sa/admin/service/oummenus.service';
//import { OmunvaryComponent } from '@sa/admin/view/omunvary.component';
//import { OmunvaryService } from '@sa/admin/service/omunvary.service';
import { OummenusComponent } from '@sa/admin/view/oummenus.component';
import { OummenusService } from '@sa/admin/service/oummenus.service';
import { OmunvaryComponent } from '@sa/admin/view/omunvary.component';
import { OmunvaryService } from '@sa/admin/service/omunvary.service';
import { OumagyrgComponent } from '@sa/admin/view/oumagyrg.component';
import { OumagyrgService } from '@sa/admin/service/oumagyrg.service';
import { OuimergeService } from '@sa/admin/mergeoffenders/service/ouimerge.service';
import { OuimergeComponent } from '@sa/admin/mergeoffenders/view/ouimerge.component';
import { OuimtlogComponent } from '@sa/admin/mergeoffenders/view/ouimtlog.component';
import { OuimtlogService } from '@sa/admin/mergeoffenders/service/ouimtlog.service';
import { OuimtstpComponent } from '@sa/admin/mergeoffenders/view/ouimtstp.component';
import { OuimtstpService } from '@sa/admin/mergeoffenders/service/ouimtstp.service';
//import { OuimergeService } from '@sa/admin/mergeoffenders/service/ouimerge.service';
//import { OuimergeComponent } from '@sa/admin/mergeoffenders/view/ouimerge.component';
//import { OuimtlogComponent } from '@sa/admin/mergeoffenders/view/ouimtlog.component';
//import { OuimtlogService } from '@sa/admin/mergeoffenders/service/ouimtlog.service';
import { OumwmenuComponent } from '@sa/admin/view/oumwmenu.component';
import { OumwmenuService } from '@sa/admin/service/oumwmenu.service';
//import { OuimtstpComponent } from '@sa/admin/mergeoffenders/view/ouimtstp.component';
//import { OuimtstpService } from '@sa/admin/mergeoffenders/service/ouimtstp.service';
//import { OumptacaComponent } from '@sa/admin/checkprintercontrolscreens/view/oumptaca.component';
//import { OumptacaService } from '@sa/admin/checkprintercontrolscreens/service/oumptaca.service';
//import { OumpdefiComponent } from '@sa/admin/checkprintercontrolscreens/view/oumpdefi.component';
//import { OumpdefiService } from '@sa/admin/checkprintercontrolscreens/service/oumpdefi.service';
//import { OumwmenuComponent } from '@sa/admin/view/oumwmenu.component';
//import { OumwmenuService } from '@sa/admin/service/oumwmenu.service';
import { OumpurgeService } from '@sa/admin/service/oumpurge.service';
import { OumpurgeComponent } from '@sa/admin/view/oumpurge.component';
//import { OumformsComponent } from '@sa/admin/view/oumforms.component';
//import { OumformsService } from '@sa/admin/service/oumforms.service';
import { OumformsComponent } from '@sa/admin/view/oumforms.component';
import { OumformsService } from '@sa/admin/service/oumforms.service';
//import { OumcfpriComponent } from '@sa/admin/checkprintercontrolscreens/view/oumcfpri.component';
//import { OumcfpriService } from '@sa/admin/checkprintercontrolscreens/service/oumcfpri.service';
import { OuisdireComponent } from '@sa/usersystemsecurity/view/ouisdire.component';
import { OuisdireService } from '@sa/usersystemsecurity/service/ouisdire.service';
import { OumdtempComponent } from '@sa/admin/integratedwordprocessing/view/oumdtemp.component';
import { OumdtempService } from '@sa/admin/integratedwordprocessing/service/oumdtemp.service';
import { OumbmarkComponent } from '@sa/admin/integratedwordprocessing/view/oumbmark.component';
import { OumbmarkService } from '@sa/admin/integratedwordprocessing/service/oumbmark.service';
//import { UpdoffidComponent } from '@sa/admin/view/updoffid.component';
import { UpdoffidComponent } from '@sa/admin/view/updoffid.component';
import { OuiausesComponent } from '@sa/audit/view/ouiauses.component';
import { OuiausesService } from '@sa/audit/service/ouiauses.service';
//import { UpdoffidService } from '@sa/admin/service/updoffid.service';
import { UpdoffidService } from '@sa/admin/service/updoffid.service';
//import { OumdtempdialogComponent } from '@sa/admin/integratedwordprocessing/view/oumdtempdialog.component';
import { OumsmalaComponent } from '@sa/usersystemsecurity/view/oumsmala.component';
import { OumsmalaService } from '@sa/usersystemsecurity/service/oumsmala.service';
import { OumbmarkdialogComponent } from '@sa/admin/integratedwordprocessing/view/oumbmarkdialog.component';
import { OumdtempdialogComponent } from '@sa/admin/integratedwordprocessing/view/oumdtempdialog.component';
import { OmsaljntService } from '@sa/audit/service/omsaljnt.service';
import { OiusmselComponent } from '@sa/audit/view/oiusmsel.component';
import { OiusmselService } from '@sa/audit/service/oiusmsel.service';
import { OmsaljntComponent } from '@sa/audit/view/omsaljnt.component';
import { OuiaflatService } from '@sa/audit/service/ouiaflat.service';
import { OuiaflatComponent } from '@sa/audit/view/ouiaflat.component';
import { NgxFileDropModule } from 'ngx-file-drop';
import { OmsysjntService } from '@sa/audit/maintenance/service/omsysjnt.service';
import { OmsysjntComponent } from '@sa/audit/maintenance/view/omsysjnt.component';
import { OuiauactComponent } from '@sa/audit/view/ouiauact.component';
import { OuiauactService } from '@sa/audit/service/ouiauact.service';
import { OcmpconfComponent } from '@sa/admin/view/ocmpconf.component';
import { CommonModule } from '@angular/common';
import { OumcpassComponent } from '@sa/view/oumcpass.component';
import { OumcpassService } from '@sa/service/oumcpass.service';
import { OumtagreComponent } from '@sa/admin/view/oumtagre.component';
import { OumtagreService } from '@sa/admin/service/oumtagre.service';
import { OumrestaComponent } from '@sa/admin/view/oumresta.component';
import { OumrestaService } from '@sa/admin/service/oumresta.service';
import { OumsyslabService } from '@sa/admin/service/oumsyslab.service';
import { OlisetService } from '@sa/admin/service/oliset.service';
import { OmshelpService } from '@sa/admin/service/omshelp.service';
import { OtmlockrService } from '@sa/admin/service/otmlockr.service';
import { OtmlockrComponent } from '@sa/admin/view/otmlockr.component';
import { OumcdtabComponent } from '@sa/admin/view/oumcdtab.component';
import { OumcdtabService } from '@sa/admin/service/oumcdtab.service';
import { OumsmugaComponent } from '@sa/admin/view/oumsmuga.component';
import { OumsmugaService } from '@sa/admin/service/oumsmuga.service';
import { OymholidComponent } from '@sa/admin/view/oymholid.component';
import { OymholidService } from '@sa/admin/service/oymholid.service';
import { OumbadmiComponent } from '@sa/recordmaintenance/view/oumbadmi.component';
import { OumbadmiService } from '@sa/recordmaintenance/service/oumbadmi.service';
import { OumucreatComponent } from '@sa/usersystemsecurity/view/oumucreat.component';
import { OumucreatService } from '@sa/usersystemsecurity/service/oumucreat.service';
import { OdynFrmRenderComponent } from './admin/view/odynfrmrender.component';
import { OdynFrmBldrComponent } from './admin/view/odynfrmbldr.component';
//import { OumcpassComponent } from '@sa/view/oumcpass.component';
//import { OumcpassService } from '@sa/service/oumcpass.service';
import { OumcamtaskService } from './admin/service/oumcamtask.service';
import { OumcamtaskComponent } from './admin/view/oumcamtask.component';
import { ProsmainService } from './recordmaintenance/service/prosmain.service';
import { CmdworkComponent } from './recordmaintenance/view/cmdwork.component';
import { CmdworkService } from './recordmaintenance/service/cmdwork.service';
import { ProsmainComponent } from './recordmaintenance/view/prosmain.component';
import { CmdhistComponent } from './recordmaintenance/view/cmdhist.component';
import { CmdhistService } from './recordmaintenance/service/cmdhist.service';
import { DmnmainComponent } from '@sa/recordmaintenance/view/dmnmain.component';
import { CmdDmnComponent } from '@sa/admin/view/cmddmn.component';
import { TaskRejectDialogComponent } from '@sa/admin/view/taskrejectdialog.component';
import { OumeemovComponent } from '@sa/recordmaintenance/view/oumeemov.component';
import { OumeemovService } from '@sa/recordmaintenance/service/oumeemov.service';
import { CmdactionComponent } from '@sa/recordmaintenance/view/cmdaction.component';
import { CmdqueryComponent } from '@sa/recordmaintenance/view/cmdquery.component';
import { CmdactionService } from '@sa/recordmaintenance/service/cmdaction.service';
import { ApimainComponent } from './recordmaintenance/view/apimain.component';
import { OiexpproComponent } from './recordmaintenance/view/oiexppro.component';
import { OiexpqacComponent } from './recordmaintenance/view/oiexpqac.component';
import { OiimpproComponent } from './recordmaintenance/view/oiimppro.component';
import { OiimpqacComponent } from './recordmaintenance/view/oiimpqac.component';
import { ApimainService } from './recordmaintenance/service/apimain.service';
import { OumsysetComponent } from './admin/view/oumsyset.component';
import { ProsinitComponent } from '@sa/recordmaintenance/view/prosinit.component';
import { OuminsdbComponent } from '@sa/admin/view/ouminsdb.component';
import { OuminsdbService } from '@sa/admin/service/ouminsdb.service';
import { DashboardBiModule } from '../dashboard-bi/dashboard-bi.module';
import { CmnprossComponent } from './recordmaintenance/view/cmnpross.component';
import { CmnprossService } from './recordmaintenance/service/cmnpross.service';
import { OumrelmdComponent } from '@sa/admin/view/oumrelmd.component';
import { OumrelmdService } from './admin/service/oumrelmd.service';
import { ProsdeacComponent } from './recordmaintenance/view/prosdeac.component';
import { ProsdeacService } from './recordmaintenance/service/prosdeac.service';
import { OummerofComponent } from '@sa/admin/mergeoffenders/view/oummerof.component';
import { OummerofService } from './admin/mergeoffenders/service/oummerof.service';
import { OumtrnbkComponent } from '@sa/admin/mergeoffenders/view/oumtrnbk.component';
import { OumtrnbkService } from '@sa/admin/mergeoffenders/service/oumtrnbk.service';

@NgModule({
    declarations: [
        OumaglocComponent,
        OumacaseComponent,
        OumusersComponent,
        OumpersoComponent,
        OumsypflComponent,
        OumrolesComponent,
        OumassmuComponent,
        OmsmoduleComponent,
        OmsrolesComponent,
        OumusersclComponent,
        OumusersrlsComponent,
        OumaglocpopComponent,
        //OumagyhtComponent,
        //OumpersdComponent,
        OumsyslabComponent,
        OlisetComponent,
        OmshelpComponent,
        OumagyhtComponent,
        OumpersdComponent,
        //OumptacaComponent,
        //OumpurgeComponent,
        OuiadactComponent,
        OumauditComponent,
        OuiausesComponent,
        OumrareaComponent,
        //OumapassComponent,
        //OumclfrmComponent,
        //OummenusComponent,
        //OmunvaryComponent,
        OummenusComponent,
        OmunvaryComponent,
        OumagyrgComponent,
        OuimergeComponent,
        OuimtlogComponent,
        OuimtstpComponent,
        //OuimergeComponent,
        //OuimtlogComponent,
        //OuimtstpComponent,
        //OumpdefiComponent,
        //OumwmenuComponent,
        //OumformsComponent,
        OumwmenuComponent,
        OumformsComponent,
        //OumcfpriComponent,
        OuisdireComponent,
        OumdtempComponent,
        OumbmarkComponent,
        //UpdoffidComponent,
        UpdoffidComponent,
        //OumdtempdialogComponent,
        OumsmalaComponent,
        OiusmselComponent,
        OumbmarkdialogComponent,
		OumdtempdialogComponent,
        OmsaljntComponent,
        OuiaflatComponent,
        OmsysjntComponent,
        OuiauactComponent,
        //OumcpassComponent,
        OcmpconfComponent,
        OumcpassComponent,
       OtmlockrComponent,
       OumcdtabComponent,
       OumsmugaComponent,
        OymholidComponent,
        OumbadmiComponent,
        ProsmainComponent,
        ProsdeacComponent,
        CmnprossComponent,
        CmdworkComponent,
        CmdhistComponent,
        CmdactionComponent,
        CmdqueryComponent,
        ApimainComponent,
        OiexpproComponent,
        OiexpqacComponent,
        OiimpproComponent,
        OiimpqacComponent,
       OumtagreComponent,
        OumrestaComponent,
        OumucreatComponent,
        OdynfrmComponent,
        OdynFrmBldrComponent,
        OdynFrmRenderComponent,
        OumcamtaskComponent,
        CamundaBpmnComponent,
        DmnmainComponent,
        CmdDmnComponent,
        TaskRejectDialogComponent,
        OumpurgeComponent,
        OumeemovComponent,
        OumsysetComponent,
        OuminsdbComponent,
        ProsinitComponent,
        OumrelmdComponent,
	OummerofComponent,
        OumtrnbkComponent,
        
    ],
    imports: [
        FormsModule,
        FlexLayoutModule,
        ReactiveFormsModule,
        UiComponentsModule,
        NgxFileDropModule,
        CommonModule,
        MaterialModule,
        InstModule,
        DashboardBiModule

       
    ],
    exports: [
        UiComponentsModule,
        CamundaBpmnComponent,
        InstModule,
        OumaglocComponent,
        OumacaseComponent,
        OumusersComponent,
        OumpersoComponent,
        OumsypflComponent,
        OumrolesComponent,
        OumassmuComponent,
        OmsmoduleComponent,
        OuiausesComponent,
        OmsrolesComponent,
        OumusersclComponent,
        OumusersrlsComponent,
        OumaglocpopComponent,
        //OumagyhtComponent,
        //OumpersdComponent,
        OumagyhtComponent,
        OumpersdComponent,
        //OumptacaComponent,
        OuiadactComponent,
        OumauditComponent,
        //OumpurgeComponent,
        OumrareaComponent,
        //OumapassComponent,
        //OumclfrmComponent,
        //OummenusComponent,
        //OmunvaryComponent,
        OummenusComponent,
        OmunvaryComponent,
        OumagyrgComponent,
        OuimergeComponent,
        OuimtlogComponent,
        OuimtstpComponent,
        //OuimergeComponent,
        //OuimtlogComponent,
        //OuimtstpComponent,
        //OumpdefiComponent,
        //OumwmenuComponent,
        //OumformsComponent,
        OumwmenuComponent,
        OumformsComponent,
        //OumcfpriComponent,
        OuisdireComponent,
        OumdtempComponent,
        OumbmarkComponent,
        //UpdoffidComponent,
        UpdoffidComponent,
        //OumdtempdialogComponent,
        OumsmalaComponent,
        OiusmselComponent,
        OumbmarkdialogComponent,
        OmsaljntComponent,
        OuiaflatComponent,
        OmsysjntComponent,
        OuiauactComponent,
        //OumcpassComponent,
        OcmpconfComponent,
        OumcpassComponent,
       OtmlockrComponent,
       OumcdtabComponent,
       OumsmugaComponent,
        OymholidComponent,
        OumbadmiComponent,
        ProsmainComponent,
        ProsdeacComponent,
        CmnprossComponent,
        CmdworkComponent,
        CmdhistComponent,
        CmdactionComponent,
        CmdqueryComponent,
        ApimainComponent,
        OiexpproComponent,
        OiexpqacComponent,
        OiimpproComponent,
        OiimpqacComponent,
       OumtagreComponent,
        OumrestaComponent,
        OumucreatComponent,
        OdynfrmComponent,
        OdynFrmBldrComponent,
        OdynFrmRenderComponent,
        OumucreatComponent,
        OumcamtaskComponent,
        DmnmainComponent,
        CmdDmnComponent,
        TaskRejectDialogComponent,
        OumpurgeComponent,
        OumeemovComponent,
        ProsinitComponent,
        OumsysetComponent,
        OuminsdbComponent,
	OummerofComponent,
        OumtrnbkComponent,
    ],
    providers: [
        OumaglocService,
        OumacaseService,
        OumusersService,
        OumpersoService,
        OumsypflService,
        OumrolesService,
        OumassmuService,
        //OumagyhtService,
        //OumpersdService,
        OumagyhtService,
        OumpersdService,
        //OumptacaService,
        //OumpurgeService,
        OuiadactService,
        OumauditService,
        OumrareaService,
        //OumapassService,
        //OumclfrmService,
        //OummenusService,
        //OmunvaryService,
        OummenusService,
        OmunvaryService,
        OuiausesService,
        OumagyrgService,
        OuimergeService,
        OuimtlogService,
        OuimtstpService,
        //OuimergeService,
        //OuimtlogService,
        //OuimtstpService,
        //OumpdefiService,
        //OumwmenuService,
        //OumformsService,
        OumwmenuService,
        OumformsService,
        //OumcfpriService,
        OuisdireService,
        OumdtempService,
        OumbmarkService,
        //UpdoffidService,
        UpdoffidService,
        OiusmselService,
        OumsmalaService,
        OmsaljntService,
        OuiaflatService,
        OmsysjntService,
        OuiauactService,
        OumcpassService,
        OumtagreService,
        OumrestaService,
        OumsyslabService,
        OlisetService,
        OmshelpService,
        OtmlockrService,
        OumcdtabService,
        OumsmugaService,
        OymholidService,
        OumbadmiService,
        ProsmainService,
        ProsdeacService,
        CmnprossService,
        CmdworkService,
        CmdhistService,
        CmdactionService,
        ApimainService,
        OumucreatService,
        OumcamtaskService,
        //OumcpassService,
        OumpurgeService,
        OumeemovService,
        OuminsdbService,
        OumrelmdService,
        OummerofService,
        OumtrnbkService,
        
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SaModule { }
