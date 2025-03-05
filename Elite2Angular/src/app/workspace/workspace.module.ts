import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {CommonModule} from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '@core/material.module';
import { UiComponentsModule } from '@ui-components/ui-components.module';

import {DashBoardComponent} from './inmate-summary/dashboard.component';
import { ScheduleCalendarDialogComponent } from './inmate-summary/dashboard-component/schedule-dialog.component';
import { AlertComponent } from './inmate-summary/dashboard-component/alert.component';
import { AssessmentComponent } from './inmate-summary/dashboard-component/assessment.component';
import { LegalComponent } from './inmate-summary/dashboard-component/legal.component';
import { MovementsComponent } from './inmate-summary/dashboard-component/movements.component';
import { NewtrustComponent } from './inmate-summary/dashboard-component/newtrust.component';
import { PersonalComponent } from './inmate-summary/dashboard-component/personal.component';
import { PrivilegeComponent } from './inmate-summary/dashboard-component/privilege.component';
import { ScheduleComponent } from './inmate-summary/dashboard-component/schedule.component';
import { DndModule } from 'ng2-dnd';
import { IntakeService } from "./inmate-intake-summary/service/intake.service";
import { InmateIntakeSummaryComponent } from "./inmate-intake-summary/inmate-intake-summary.component";
import { SupervisionComponent } from './inmate-summary/dashboard-component/supervision.component';
import { iepComponent } from './inmate-summary/dashboard-component/iep.component';


@NgModule({
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    declarations: [
        DashBoardComponent,
        AlertComponent,
        AssessmentComponent,
        LegalComponent,
        MovementsComponent,
        NewtrustComponent,
        PersonalComponent,
        PrivilegeComponent,
        ScheduleComponent,
        InmateIntakeSummaryComponent,
        ScheduleCalendarDialogComponent,
        SupervisionComponent,
        iepComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        FlexLayoutModule,
        ReactiveFormsModule,
        UiComponentsModule,
        MaterialModule,
        RouterModule,
        DndModule.forRoot()
    ],
    exports: [
        DashBoardComponent,
        AlertComponent,
        AssessmentComponent,
        LegalComponent,
        MovementsComponent,
        NewtrustComponent,
        PersonalComponent,
        PrivilegeComponent,
        ScheduleComponent,
        InmateIntakeSummaryComponent,
        ScheduleCalendarDialogComponent,
        SupervisionComponent,
        iepComponent
    ],
    providers: [
    IntakeService
    ]
})
export class WorkspaceModule { }
