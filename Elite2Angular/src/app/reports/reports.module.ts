import { NgModule } from '@angular/core';
import {CommonModule} from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '@core/material.module';
import { UiComponentsModule } from '@ui-components/ui-components.module';
import { ManageReportService } from './service/managereport.service';
import { OiexpjrpComponent } from './oiexpjrp.component';
import { OirreportComponent } from './oirreport.component';
import { OirmreporComponent } from './oirmrepor.component';
import { OiimpjrpComponent } from './oiimpjrp.component';
import { OirreportdialogComponent } from './oirreportdialog.component'
import { OirreportParameterDialogComponent }from './oirreportParameterDialog.component';
import { OirreportParameterQueryComponent }from './oirreportParameterQuery.component';
import { OirmassetComponent } from './oirmasset.component';
import { OirreportEditAssetComponent } from './oirEditAssetDialog.component';
import { OcdsenchComponent } from './ocdsench.component';
import { OcdsenchService } from './service/ocdsench.service';


@NgModule({
    declarations: [
        OiexpjrpComponent,
        OirreportComponent,
        OirmreporComponent,
        OiimpjrpComponent,
        OirreportdialogComponent,
		OirreportParameterDialogComponent,
		OirreportParameterQueryComponent,
		OirmassetComponent,
		OirreportEditAssetComponent,
		OcdsenchComponent,
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
        
    ],
    providers: [
        ManageReportService,OcdsenchService
    ]
})
export class ReportsModule { }
