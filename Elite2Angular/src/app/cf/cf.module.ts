import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UiComponentsModule } from '@ui-components/ui-components.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CommonModule } from '@angular/common';
import { OcdbreciComponent } from '@cf/offendertransactions/view/ocdbreci.component';
import { OcdbreciService } from '@cf/offendertransactions/service/ocdbreci.service';
import { OcidoaccComponent } from '@cf/offendertransactions/view/ocidoacc.component';
import { OcidoaccService } from '@cf/offendertransactions/service/ocidoacc.service';
import { OcdreceiComponent } from '@cf/offendertransactions/view/ocdrecei.component';
import { OcdreceiService } from '@cf/offendertransactions/service/ocdrecei.service';
import { OcmgobliComponent } from '@cf/deductions/maintenance/view/ocmgobli.component';
import { OcmgobliService } from '@cf/deductions/maintenance/service/ocmgobli.service';
import { OcupayplComponent } from '@cf/offendertransactions/view/ocupaypl.component';
import { OcupayplService } from '@cf/offendertransactions/service/ocupaypl.service';
import { OcipphisComponent } from '@cf/offendertransactions/view/ocipphis.component';
import { OcipphisService } from '@cf/offendertransactions/service/ocipphis.service';
import { OcdcppayComponent } from '@cf/offendertransactions/view/ocdcppay.component';
import { OcdcppayService } from '@cf/offendertransactions/service/ocdcppay.service';
import { OcugltrdComponent } from '@cf/offendertransactions/view/ocugltrd.component';
import { OcugltrdService } from '@cf/offendertransactions/service/ocugltrd.service';
import { OcmsnotiService } from '@cf/sanctionnotices/service/ocmsnoti.service';
import { OcmsnotiComponent } from '@cf/sanctionnotices/view/ocmsnoti.component';
import { OtmcfeesComponent } from '@cf/deductions/maintenance/view/otmcfees.component';
import { OtmcfeesService } from '@cf/deductions/maintenance/service/otmcfees.service';
import { OcsreceiComponent } from '@cf/statements/view/ocsrecei.component';
import { OcmfaproComponent } from '@cf/deductions/maintenance/view/ocmfapro.component';
import { OcmfaproService } from '@cf/deductions/maintenance/service/ocmfapro.service';
import { OcsreceiService } from '@cf/statements/service/ocsrecei.service';
import { OcuotrahComponent } from '@cf/offendertransactions/view/ocuotrah.component';
import { OcuotrahService } from '@cf/offendertransactions/service/ocuotrah.service';
import { OcudpdisService } from '@cf/offendertransactions/service/ocudpdis.service';
import { OcudpdisComponent } from '@cf/offendertransactions/view/ocudpdis.component';
import { OtdocfeeComponent } from '@cf/deductions/view/otdocfee.component';
import { OtdocfeeService } from '@cf/deductions/service/otdocfee.service';
import { OcdcrefuComponent } from './offendertransactions/view/ocdcrefu.component';
import { OcdcrefuService } from './offendertransactions/service/ocdcrefu.service';
import { OcdofaccComponent } from '@cf/deductions/view/ocdofacc.component';
import { OcdofaccService } from '@cf/deductions/service/ocdofacc.service';
import { OcufovdtComponent } from '@cf/deductions/view/ocufovdt.component';
import { OcuachisComponent } from '@cf/deductions/view/ocuachis.component';
import { OcutrdetComponent } from '@cf/deductions/view/ocutrdet.component';
import { OcmpfaccComponent } from '@cf/maintenance/view/ocmpfacc.component';
import { OcubadjsComponent } from '@cf/deductions/view/ocubadjs.component';
import { OcdadjusService } from '@cf/offendertransactions/service/ocdadjus.service';
import { OcdadjusComponent } from '@cf/offendertransactions/view/ocdadjus.component';
import { OcdreverComponent } from '@cf/offendertransactions/view/ocdrever.component';
import { OcufovdtdialogComponent } from '@cf/deductions/view/ocufovdtdialog.component';

@NgModule({
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    declarations: [
        OcdbreciComponent,
        OcidoaccComponent,
        OcdreceiComponent,
        OcmgobliComponent,
        OcupayplComponent,
        OcugltrdComponent,
        OcmfaproComponent,
        OcipphisComponent,
        OcdcppayComponent,
        OcmsnotiComponent,
        OtmcfeesComponent,
        OcsreceiComponent,
        OcuotrahComponent,
        OcudpdisComponent,
        OtdocfeeComponent,
        OcdcrefuComponent,
        OcdofaccComponent,
 		OcufovdtComponent,
        OcuachisComponent,
		OcutrdetComponent,
        OcmpfaccComponent,
        OcubadjsComponent,
        OcdadjusComponent,
        OcdreverComponent,
		OcufovdtdialogComponent

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
        OcdbreciComponent,
        OcidoaccComponent,
        OcdreceiComponent,
        OcmgobliComponent,
        OcupayplComponent,
        OcugltrdComponent,
		OcipphisComponent,
        OcmfaproComponent,
        OcdcppayComponent,
        OcmsnotiComponent,
        OtmcfeesComponent,
        OcsreceiComponent,
        OcuotrahComponent,
        OcudpdisComponent,
        OtdocfeeComponent,
        OcdcrefuComponent,
        OcdofaccComponent,
        OcufovdtComponent,
        OcuachisComponent,
        OcutrdetComponent,
        OcubadjsComponent,
        OcdadjusComponent,
        OcufovdtdialogComponent

    ],
    providers: [
        OcdbreciService,
        OcidoaccService,
        OcdreceiService,
        OcmgobliService,
        OcupayplService,
        OcugltrdService,
        OcipphisService,
        OcdcppayService,
        OcmfaproService,
        OcmsnotiService,
        OtmcfeesService,
        OcsreceiService,
        OcuotrahService,
        OcudpdisService,
        OtdocfeeService,
		OcdcrefuService,
        OcdofaccService,
        OcdadjusService,
        OcdreverComponent,
    ]
})
export class CfModule { }
