import { NgModule } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { MaterialModule } from '@core/material.module';
import { UiComponentsModule } from '@ui-components/ui-components.module';
import { HttpService } from '@core/service/http.service';
import {InjectOffenderService} from '@core/service/inject-offender.service';
import { LoaderService } from '@core/loader/loader.service';
import { AuthGuard } from '@core/classes/authGuard';
import { RedirectUtil } from '@core/classes/redirectUtil';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { TranslateService } from '@common/translate/translate.service';
import { ManageAppBarService} from '@core/service/manage-app-bar.service';
import { MessagesService } from './service/messages.service';
import { DynamicMenuService } from './service/dynamic-menu.service';
import { EngineStatusService } from './service/engine-status.service';
import { DeploymentDetectionService } from './service/deployment-detection.service';
import { SsoService } from '@common/sso-logout/service/sso.service';
@NgModule({
    declarations: [

    ],
    imports: [
        MaterialModule,
        HttpClientModule,
        UiComponentsModule
    ],
    exports: [
        UiComponentsModule
    ],
    providers: [
         InjectOffenderService,
         ManageAppBarService,
         
        {
            provide: HttpService,
            deps: [HttpClient, LoaderService, Router, RedirectUtil, UserSessionManager, TranslateService, MessagesService],
            useFactory: httpFactory
        },
        AuthGuard,
        LoaderService,
        RedirectUtil,
        UserSessionManager,
        TranslateService,
        HttpClient,
        MessagesService,
        DynamicMenuService,
        EngineStatusService,
        DeploymentDetectionService
    ]
})
export class CoreModule { }

export function httpFactory(httpClient: HttpClient,
    loaderService: LoaderService, router: Router, redirectUtil: RedirectUtil,
    sessionManager: UserSessionManager, translateService: TranslateService, messagesService: MessagesService, ssoService: SsoService) {
    return new HttpService(httpClient, loaderService, router, redirectUtil, sessionManager, translateService, messagesService, ssoService);

}
