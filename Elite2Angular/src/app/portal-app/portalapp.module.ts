import { NgModule } from '@angular/core';
import {CommonModule} from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '@core/material.module';
import { UiComponentsModule } from '@ui-components/ui-components.module';

import {RejectDialogComponent} from './rejectdialog.component';
import {PortalAppComponent} from './portalapp.component';
import {PortalScheduleComponent} from './portalschedule.component';
import {PortalLegalComponent} from './portallegal.component';
import { PortalAppService } from "./service/portalapp.service";


@NgModule({
    declarations: [
        PortalAppComponent,
		RejectDialogComponent,
		PortalScheduleComponent,
		PortalLegalComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        FlexLayoutModule,
        ReactiveFormsModule,
        UiComponentsModule,
        MaterialModule,
        RouterModule,
    ],
    exports: [
        PortalAppComponent,
		RejectDialogComponent,
		PortalScheduleComponent,
		PortalLegalComponent
        
    ],
    providers: [
                PortalAppService
    ]
})
export class PortalAppModule { }
