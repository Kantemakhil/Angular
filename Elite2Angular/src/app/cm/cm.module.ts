import { OcdintakService } from './intakeclosure/service/ocdintak.service';
import { OcdintakComponent } from './intakeclosure/view/ocdintak.component';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UiComponentsModule } from '@ui-components/ui-components.module';
import { MaterialModule } from "@core/material.module";
import { FlexLayoutModule } from '@angular/flex-layout';
import { OsinamesComponent } from '@cm/searchassaign/view/osinames.component';
import { OsinamesService } from '@cm/searchassaign/service/osinames.service';
import { OsinamesdialogComponent } from '@cm/searchassaign/view/osinamesdialog.component';
import { OcdaworkService } from '@cm/teams-workflow/service/ocdawork.service';
import { OcdaworkComponent } from '@cm/teams-workflow/view/ocdawork.component';
import { ocdaworkdailogComponent } from '@cm/teams-workflow/view/ocdaworkdailog.component';
import { OcdtworkService } from '@cm/teams-workflow/service/ocdtwork.service';
import { OcdtworkComponent } from '@cm/teams-workflow/view/ocdtwork.component';
import { OcdcloseComponent } from '@cm/intakeclosure/view/ocdclose.component';
import { OcusmoduComponent } from './programsservices/view/ocusmodu.component';
import { OcdcloseService } from '@cm/intakeclosure/service/ocdclose.service';
import { CommonModule } from '@angular/common';
import { OcinamesComponent } from '@cm/searchassaign/view/ocinames.component';
import { OcinamesService } from '@cm/searchassaign/service/ocinames.service';
import { OcdaltccComponent } from '@cm/intakeclosure/addremoveoffices/view/ocdaltcc.component';
import { OcdaltccService } from '@cm/intakeclosure/addremoveoffices/service/ocdaltcc.service';
import { OcinamesDialogComponent } from '@cm/searchassaign/view/ocinamesdialog.component';
import { OcdrlfccComponent } from '@cm/intakeclosure/addremoveoffices/view/ocdrlfcc.component';
import { OcdrlfccService } from '@cm/intakeclosure/addremoveoffices/service/ocdrlfcc.service';
import { OimsreqsService } from './courtcasesandorders/maintenance/service/oimsreqs.service';
import { OimsreqsComponent } from './courtcasesandorders/maintenance/view/oimsreqs.component';
import { OcmnoqueComponent } from './assessments/maintenance/view/ocmnoque.component';
import { OcmnoqueService } from './assessments/maintenance/service/ocmnoque.service';
import { OcmohstaComponent } from '@cmdemographics/maintenance/view/ocmohsta.component';
import { OcmohstaService } from '@cmdemographics/maintenance/service/ocmohsta.service';
import { OcduatteComponent } from '@cm/programsservices/view/ocduatte.component';
import { OcduprojComponent } from './programsservices/view/ocduproj.component';
import { OcuoscpvComponent } from '@cm/programsservices/view/ocuoscpv.component';
import { OcuoscpvService } from '@cm/programsservices/service/ocuoscpv.service';
import { OcussessComponent } from '@cm/programsservices/view/ocussess.component';
import { OcussessService } from '@cm/programsservices/service/ocussess.service';
import { ProglocaDialogComponent } from '@cm/programsservices/view/proglocaDialog.component';
import { OcdpatteComponent } from './programsservices/view/ocdpatte.component';
import { OcdpatteService } from './programsservices/service/ocdpatte.service';
import { OcmsvmodComponent } from '@cm/programsservices/maintenance/view/ocmsvmod.component';
import { OcmsvmodService } from '@cm/programsservices/maintenance/service/ocmsvmod.service';
import { OcmsvphaComponent } from '@cm/programsservices/maintenance/view/Ocmsvpha.component';
import { OcmsvphaService } from '@cm/programsservices/maintenance/service/ocmsvpha.service';
import { OidpwaitComponent } from '@cm/programsservices/view/oidpwait.component';
import { OcdprogrComponent } from '@cm/programsservices/view/ocdprogr.component';
import { OcdprogrService } from '@cm/programsservices/service/ocdprogr.service';
import { OcdprogrDialogComponent } from '@cm/programsservices/view/ocdprogrDialog.component';
import { OcmschprComponent } from '@cm/programsservices/view/ocmschpr.component';
import { OcmschprformboxComponent } from '@cm/programsservices/view/ocmschprformbox.component';
import { OcmschprService } from '@cm/programsservices/service/ocmschpr.service';
import { OcuschprComponent } from '@cm/programsservices/view/ocuschpr.component';
import { OcuschprService } from '@cm/programsservices/service/ocuschpr.service';
import { OcmphmodComponent } from '@cm/programsservices/view/ocmphmod.component';
import { OcmsvacpComponent } from '@cm/programsservices/view/ocmsvacp.component';
import { OcmsvacpDialougComponent } from '@cm/programsservices/view/ocmsvacpdialoug.component';
import { OcupatofComponent } from './programsservices/view/ocupatof.component';
import { OcupatofService } from './programsservices/service/ocupatof.service';
import { OcuscupsComponent } from './programsservices/view/ocuscups.component';
import { OcuscupsService } from './programsservices/service/ocuscups.service';
import { OcumultiComponent } from '@cm/programsservices/view/ocumulti.component';
import { OcumultiService } from '@cm/programsservices/service/ocumulti.service';
import { OcdsupstComponent } from '@cm/intakeclosure/view/ocdsupst.component';
import { OcdsupstService } from '@cm/intakeclosure/service/ocdsupst.service';
import { OciintrrComponent } from '@cm/intakeclosure/view/ociintrr.component';
import { OciintrrService } from '@cm/intakeclosure/service/ociintrr.service';
import { OcmxpstmComponent } from './programsservices/view/Ocmxpstm.component';
import { OcsproinComponent } from '../inst/legal/view/ocsproin.component';
import { OcsproindialogComponent } from '../inst/legal/view/ocsproindialog.component';
import { OweacplnComponent } from './weeklyactivityplans/view/oweacpln.component';
import { OidowrelComponent } from './programsservices/maintenance/view/oidowrel.component';
import { OidowrelService } from './programsservices/maintenance/service/oidowrel.service';
import { OimworkrComponent } from './programsservices/maintenance/view/oimworkr.component';
import { OimworkrService } from './programsservices/maintenance/service/oimworkr.service';
import { OimworkrdialogComponent } from './programsservices/maintenance/view/oimworkrdialog.component';
import {OcdlodetdialogComponent} from '../inst/legal/view/ocdlodetdialog.component';
import { OcimyoffComponent } from '@cm/searchassaign/view/ocimyoff.component';
import { OcimyoffService } from '@cm/searchassaign/service/ocimyoff.service';
import { OcmtidetComponent } from './communitysupervisiontiers/maintenance/view/ocmtidet.component'; 
import { OcmtidetService } from '@cm/communitysupervisiontiers/maintenance/service/ocmtidet.service';
import { OcdotrlvComponent } from '@cm/communitysupervisiontiers/view/ocdotrlv.component';
import { OcdotrlvService } from '@cm/communitysupervisiontiers/service/ocdotrlv.service';
import { OcmtirlvComponent } from './communitysupervisiontiers/maintenance/view/ocmtirlv.component';
import { OcmtirlvService } from '@cm/communitysupervisiontiers/maintenance/service/ocmtirlv.service';
import { OcmdspwdComponent } from './communitysupervisiontiers/maintenance/view/ocmdspwd.component';
import { OcmdspwdService } from '@cm/communitysupervisiontiers/maintenance/service/ocmdspwd.service';
import { OcdonostComponent } from './communitysupervisiontiers/maintenance/view/ocdonost.component';
import { OcdonostService } from '@cm/communitysupervisiontiers/maintenance/service/ocdonost.service';
import { OcuallcoComponent } from '@cm/searchassaign/view/ocuallco.component';




@NgModule({
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    declarations: [
        OsinamesComponent,
        OsinamesdialogComponent,
        OcdaworkComponent,
        ocdaworkdailogComponent,
        OcdtworkComponent,
        OcdcloseComponent,
        OcusmoduComponent,
        OcdintakComponent,
        OcinamesComponent,
        OcdaltccComponent,
        OcinamesDialogComponent,
        OcdrlfccComponent,
        OimsreqsComponent,
        OcmnoqueComponent,
        OcmohstaComponent,
        OcduatteComponent,
        OcduprojComponent,
        OcuoscpvComponent,
        OcussessComponent,
        ProglocaDialogComponent,
        OcdpatteComponent,
        OcmsvmodComponent,
        OcmsvphaComponent,
        OidpwaitComponent,
        OcdprogrComponent,
        OcdprogrDialogComponent,
		OcmschprComponent,
        OcmschprformboxComponent,
        OcuschprComponent,
        OcmphmodComponent,
        OcmsvacpComponent,
        OcmsvacpDialougComponent,
        OcupatofComponent,
        OcumultiComponent,
        OcuscupsComponent,
        OcdsupstComponent,
        OciintrrComponent,
        OcmxpstmComponent,
        OcsproinComponent,
        OcsproindialogComponent,
        OweacplnComponent,
        OidowrelComponent,
        OimworkrComponent,
        OimworkrdialogComponent,
        OcdlodetdialogComponent,
        OcimyoffComponent,
        ocdaworkdailogComponent,
        OcdotrlvComponent,
        OcmtirlvComponent,
        OcmtidetComponent,
        OcmdspwdComponent,
        OcdonostComponent,
        OcuallcoComponent
        
    ],
    imports: [
        FormsModule,
        FlexLayoutModule,
        ReactiveFormsModule,
        UiComponentsModule,
        CommonModule,
        MaterialModule
    ],
    exports: [
        UiComponentsModule,
        OsinamesComponent,
        OsinamesdialogComponent,
        OcdaworkComponent,
        ocdaworkdailogComponent,
        OcdtworkComponent,
        OcdcloseComponent,
        OcusmoduComponent,
        OcdintakComponent,
        OcinamesComponent,
        OcdaltccComponent,
        OcinamesDialogComponent,
        OcdrlfccComponent,
        OimsreqsComponent,
        OcmnoqueComponent,
        OcmohstaComponent,
        OcduatteComponent,
        OcduprojComponent,
        OcuoscpvComponent,
        OcussessComponent,
        ProglocaDialogComponent,
        OcdpatteComponent,
        OcmsvmodComponent,
        OcmsvphaComponent,
        OidpwaitComponent,
        OcdprogrComponent,
        OcdprogrDialogComponent,
		OcmschprComponent,
        OcmschprformboxComponent,
        OcuschprComponent,
        OcmphmodComponent,
        OcmsvacpComponent,
        OcmsvacpDialougComponent,
        OcupatofComponent,
        OcumultiComponent,
        OcuscupsComponent,
        OcdsupstComponent,
        OciintrrComponent,
        OcmxpstmComponent,
        OcsproinComponent,
        OcsproindialogComponent,
        OweacplnComponent,
        OidowrelComponent,
        OimworkrdialogComponent,
        OcdlodetdialogComponent,
        OcimyoffComponent,
		ocdaworkdailogComponent,
        OcdotrlvComponent,
        OcmtirlvComponent,
        OcmtidetComponent,
        OcmdspwdComponent,
        OcdonostComponent,
        OcuallcoComponent
        
    ],
    providers: [
        OsinamesService,
        OcdaworkService,
        OcdtworkService,
        OcdcloseService,
        OcdintakService,
        OcinamesService,
        OcdaltccService,
        OcdrlfccService,
        OimsreqsService,
        OcmnoqueService,
        OcmohstaService,
        OcuoscpvService,
        OcussessService,
        OcdpatteService,
        OcmsvmodService,
        OcmsvphaService,
        OcdprogrService,
		OcmschprService,
        OcuschprService,
        OcupatofService,
        OcumultiService,
        OcuscupsService,
        OcdsupstService,
        OciintrrService,
        OidowrelService,
        OimworkrService,
        OcimyoffService,
        OcdotrlvService,
        OcmtirlvService,
        OcmtidetService,
        OcmdspwdService,
        OcdonostService,        
    ]
})
export class CmModule { }
