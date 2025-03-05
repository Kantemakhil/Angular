
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UiComponentsModule } from '@ui-components/ui-components.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CommonModule } from '@angular/common';
import { OcmshierComponent } from '@iwp/view/ocmshier.component';
import { OcmshierService } from '@iwp/service/ocmshier.service';
import { OcumaoffComponent } from '@iwp/view/ocumaoff.component';
import { OcumaoffService } from '@iwp/service/ocumaoff.service';
import { OcmsuwpjComponent } from '@iwp/view/ocmsuwpj.component';
import { OcmsuwpjService } from '@iwp/service/ocmsuwpj.service';
import { OcdatpowComponent } from '@iwp/view/ocdatpow.component';
import { OcdenforComponent } from '@iwp/view/ocdenfor.component';
import { OcdexpowComponent } from '@iwp/view/ocdexpow.component';
import { OcdorassComponent } from '@iwp/view/ocdorass.component';
import { OcdpsrepComponent } from '@iwp/view/ocdpsrep.component';
import { OcdtapowComponent } from '@iwp/view/ocdtapow.component';
import { OcidiaryComponent } from '@iwp/view/ocidiary.component';
import { OcipowloComponent } from '@iwp/view/ocipowlo.component';
import { OcipowofComponent } from '@iwp/view/ocipowof.component';
import { OcittpowComponent } from '@iwp/view/ocittpow.component';
import { OcmcprevComponent } from '@iwp/view/ocmcprev.component';
import { OcmeventComponent } from '@iwp/view/ocmevent.component';
import { OcuadjcrComponent } from '@iwp/view/ocuadjcr.component';
import { OcuaoffiComponent } from '@iwp/view/ocuaoffi.component';
import { OcuauthrComponent } from '@iwp/view/ocuauthr.component';
import { OcuwarniComponent } from '@iwp/view/ocuwarni.component';
import { OcumpvavComponent } from '@iwp/view/ocumpvav.component';
import { OcdclogsComponent } from '@iwp/view/ocdclogs.component';
import { OcdcschComponent } from '@iwp/view/ocdcsch.component';
// import { OumpurgeComponent } from '@iwp/view/oumpurge.component';
// import { OumpurgeService } from '@iwp/service/oumpurge.service';
import { OcmsuwpjDlglComponent } from '@iwp/view/ocmsuwpjDlgl.component';
import { OcmssvasComponent } from '@iwp/view/ocmssvas.component';
import { OcdpsrepdialogComponent } from '@iwp/view/ocdpsrepdialog.component';
import { OcicnsrcComponent } from '@iwp/view/ocicnsrc.component';
import { ChargesdialogComponent } from './view/chargesdialog.component';

@NgModule({
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    declarations: [
        OcmshierComponent,
        OcumaoffComponent,
        OcmsuwpjComponent,
        OcdatpowComponent,
        OcdenforComponent,
        OcdexpowComponent,
        OcdorassComponent,
        OcdpsrepComponent,
        OcdtapowComponent,
        OcidiaryComponent,
        OcipowloComponent,
        OcipowofComponent,
        OcittpowComponent,
        OcmcprevComponent,
        OcmeventComponent,
        OcuadjcrComponent,
        OcuaoffiComponent,
        OcuauthrComponent,
        OcuwarniComponent,
        OcumpvavComponent,
        OcdclogsComponent,
        OcdcschComponent,
        // OumpurgeComponent,
        OcmsuwpjDlglComponent,
        OcmssvasComponent,
        OcdpsrepdialogComponent,
        OcicnsrcComponent,
        ChargesdialogComponent


    ],
    imports: [
        FormsModule,
        FlexLayoutModule,
        ReactiveFormsModule,
        UiComponentsModule,
        CommonModule
    ],
    exports: [
        OcmshierComponent,
        OcumaoffComponent,
        OcmsuwpjComponent,
        OcdatpowComponent,
        OcdenforComponent,
        OcdexpowComponent,
        OcdorassComponent,
        OcdpsrepComponent,
        OcdtapowComponent,
        OcidiaryComponent,
        OcipowloComponent,
        OcipowofComponent,
        OcittpowComponent,
        OcmcprevComponent,
        OcmeventComponent,
        OcuadjcrComponent,
        OcuaoffiComponent,
        OcuauthrComponent,
        OcuwarniComponent,
        OcumpvavComponent,
        OcdclogsComponent,
        // OumpurgeComponent,
        OcmsuwpjDlglComponent,
        OcmssvasComponent,
        OcdpsrepdialogComponent,
        OcicnsrcComponent,
        ChargesdialogComponent
    ],
    providers: [
        OcmshierService,
        OcumaoffService,
        OcmsuwpjService,
        // OumpurgeService
    ]
})
export class IwpModule {}
