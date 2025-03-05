import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app.routes';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { AppHomeDialogComponent } from './app-home/app-homedialog';
import { AppHomeComponent } from './app-home/app-home.component';
import { WelcomeComponent } from './app-home/welcome.component';
import { HttpClientModule } from '@angular/common/http';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { CoreModule } from '@core/core.module';
import { S4CommonModule } from '@common/common.module';
import { InstModule } from '@inst/inst.module';
import { MaterialModule } from '@core/material.module';
import {SaModule} from '@sa/sa.module';
import {WorkspaceModule} from './workspace/workspace.module';
import {PortalAppModule} from './portal-app/portalapp.module';
import {DashboardBiModule} from './dashboard-bi/dashboard-bi.module';
import {CmModule} from '@cm/cm.module';
import 'hammerjs';

import { MyOffendersComponent } from './app-home/menu-components/my-offenders/my-offenders.component'
import { FeatureComponent } from './app-home/menu-components/feature/feature.component';
import {MainMenuComponent} from './app-home/menu-components/main-menu/main-menu.component';
import {MenuContainerComponent} from './app-home/menu-components/menu/menuContainer.component';
import { DynamicMenuComponent } from './app-home/menu-components/dynamic-menu/dynamic-menu.component';
import { RecentOffenderComponent } from './app-home/menu-components/recent-offender/recent-offender.component';
import { WorkspaceMenuComponent } from './app-home/menu-components/workspace-menu/workspacemenu.component';
import { PortalMenuComponent } from './app-home/menu-components/integration-portal/portalmenu.component';
import { InsightsMenuComponent } from './app-home/menu-components/insights-menu/insights-menu.component';
import { ReportMenuComponent } from './app-home/menu-components/report-menu/report-menu.component';
import { ReportInputControllComponent } from './app-home/menu-components/report-menu/report-inputcontroll.component';
import { LandingPageComponent } from '@common/landing-page/landing-page.component';
import { EscapeHtmlPipe } from './app-home/menu-components/report-menu/html-pipe';

import { MyWorkComponent } from './app-home/menu-components/my-work/my-work.component'
import {InmateModule} from '@inmate/inmate.module';
import {ReportService} from '@core/service/report.service';
import { CfModule } from '@cf/cf.module';
import { CurrencyPipe } from '@angular/common';
import { MenuService } from './app-home/menu-components/main-menu/menu.service';
import { IwpModule } from '@iwp/iwp.module';
import { FormioAppConfig } from '@formio/angular';
import { AppConfig } from './config';
import {ReportsModule} from './reports/reports.module';
import { EngineStatusComponent } from './app-home/engine-status/engine-status.component';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
        suppressScrollX: true,
        maxScrollbarLength:150      

      };
@NgModule({
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    declarations: [
        AppComponent,
        AppHomeComponent,
        AppHomeDialogComponent,
        WelcomeComponent,
        MyOffendersComponent,
        MenuContainerComponent,
        DynamicMenuComponent,
        FeatureComponent,
        MainMenuComponent,
        RecentOffenderComponent,
        WorkspaceMenuComponent,
        PortalMenuComponent,
        MyWorkComponent,
        ReportMenuComponent,
        ReportInputControllComponent,
        LandingPageComponent,
        EscapeHtmlPipe,
        InsightsMenuComponent,
        EngineStatusComponent,
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        FlexLayoutModule,
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        HttpClientModule,
        CoreModule,
        InstModule,
        S4CommonModule,
        MaterialModule,
        SaModule,
        WorkspaceModule,
        PortalAppModule,
        DashboardBiModule,
        CmModule,
        PerfectScrollbarModule,
        InmateModule,
        CfModule,
        IwpModule,
        ReportsModule
    ],
    exports: [],
    providers: [
        CurrencyPipe,
        ReportService,
        MenuService,
        {
            provide: PERFECT_SCROLLBAR_CONFIG,
            useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
        },
        { provide: FormioAppConfig, useValue: AppConfig },
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
