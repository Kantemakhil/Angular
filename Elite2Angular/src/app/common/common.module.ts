import { deleteDocumentDialog } from './iwp/delete-document-dialog.component.';

import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LoginComponent } from '@common/login/login.component';
import { SsoLogoutComponent } from '@common/sso-logout/sso-logout.component';
import { ServerErrorComponent } from '@common/server-error/server-error.component';
import { UnauthorizeComponent } from '@common/unauthorize/unauthorize.component';
import { LoginService } from '@common/login/service/login.service';
import { OsiosearComponent } from '@common/offender-records/view/osiosear.component';
import { OsioseardialogComponent } from '@common/offender-records/view/osioseardialog.component';
import { OsiosearService } from '@common/offender-records/service/osiosear.service';
import { TranslateService } from '@common/translate/translate.service';
import { CoreModule } from '@core/core.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { OcucoffeComponent } from '@common/offender-records/view/ocucoffe.component';
import { OcucoffeService } from '@common/offender-records/service/ocucoffe.service';
import { CommonModule } from '@angular/common';
import { OcualertComponent } from '@common/offender-records/view/ocualert.component';
import { OcualertService } from '@common/offender-records/service/ocualert.service';
import { OcucoffeconfirmboxComponent } from '@common/offender-records/view/ocucoffeconfirmbox.component';
import { NameFormatUtil } from '@common/utility/nameFormatUtil';
import { ScheduleDateUtil } from '@common/utility/scheduleDateUtil';
import {OffenderSearchService} from "@common/offender-records/service/offender-search.service";
import { IntakedialogComponent } from "@common/mini-header/intakedialog";
import { OcdmworkComponent } from '@common/workspace/view/ocdmwork.component';
import { OcdmworkService } from '@common/workspace/service/ocdmwork.service';
import { AmountFormatUtil } from '@common/utility/amountFormatUtil';
import { HelpVideoComponent } from "@common/help-media/helpvideo.component";
import { CancelGenerateComponent } from './iwp/cancel-generate/cancel-generate.component';
import { ViewFileComponent } from './iwp/viewFile.component';
import { UploadDocumentComponent } from './iwp/uploaddocument.component';
import { GenerateDialogComponent } from './iwp/generateDialog.component';
import { CheckOutComponent } from './iwp/checkout.component';
import { ActionComponent } from './iwp/action.component';
import { FinalActionButtonComponent } from './iwp/finalActionButton.component';
import { EoffenderComponent } from './iwp/eoffender.component';
import { EoffenderService } from './iwp/service/eoffender.service';
import { SigndocService } from './iwp/service/signdoc.service';
import { OcdsmemoService } from '@common//workspace/service/ocdsmemo.service';
import { OcdsmemodialogComponent } from '@common/workspace/view/ocdsmemodialog.component';
import { NgxFileDropModule } from 'ngx-file-drop';
import { EditDocumentComponent } from './iwp/edit-document.component';
import { DynamicCompLoader } from '@common/dynamic-loader/dynamic-comp-loader.component';
import { TaskFormDialogComponent } from '@common/dynamic-loader/taskformdialog.component';
import { OcunawarnComponent } from '@common/offender-records/view/ocunawrn.component';
import { OcunawarnService } from '@common/offender-records/service/ocunawrn.service';
import { SignComponent } from './iwp/sign/sign.component';
import { UploadtemplateComponent } from './iwp/uploadtemplate.component';
import { SplashScreenComponent } from './splash-screen/splash-screen.component';
import { SplashScreenService } from './splash-screen/splash-screen.service';

@NgModule({
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    declarations: [
        LoginComponent,
        SsoLogoutComponent,
        ServerErrorComponent,
        UnauthorizeComponent,
        OsiosearComponent,
        OsioseardialogComponent,
        OcucoffeComponent,
        OcualertComponent,
        OcucoffeconfirmboxComponent,
        OcucoffeconfirmboxComponent,
        IntakedialogComponent,
        HelpVideoComponent,
        OcdmworkComponent,
        CancelGenerateComponent,
        ViewFileComponent,
        UploadDocumentComponent,
        EditDocumentComponent,
        SignComponent,
        UploadtemplateComponent,
        ActionComponent,
        FinalActionButtonComponent,
        CheckOutComponent,
        ViewFileComponent,
  	GenerateDialogComponent,
  	EoffenderComponent,
    OcdsmemodialogComponent,
    DynamicCompLoader,
    TaskFormDialogComponent,
	OcunawarnComponent,
    SplashScreenComponent,
    deleteDocumentDialog
    ],
    imports: [
        FormsModule,
        ReactiveFormsModule,
        CoreModule,
        FlexLayoutModule,
        CommonModule,
        NgxFileDropModule
    ],
    exports: [
        LoginComponent,
        SsoLogoutComponent,
        ServerErrorComponent,
        UnauthorizeComponent,
        SplashScreenComponent,
        OsiosearComponent,
        OsioseardialogComponent,
        OcucoffeComponent,
        OcualertComponent,
        OcucoffeconfirmboxComponent,
        IntakedialogComponent,
        OcdmworkComponent,
        EoffenderComponent,
    OcdsmemodialogComponent,
    DynamicCompLoader,
    TaskFormDialogComponent,
	OcunawarnComponent

    ],
    providers: [
        LoginService,
        SplashScreenService,
        OffenderSearchService,
        OsiosearService,
        TranslateService,
        OcucoffeService,
        OcualertService,
        NameFormatUtil,
        OcualertService,
        ScheduleDateUtil,
        OcdmworkService,
        AmountFormatUtil,
        EoffenderService,
        SigndocService,
	OcdsmemoService,
	OcunawarnService

    ]
})
export class S4CommonModule { }
