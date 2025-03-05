import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { FlexLayoutModule } from "@angular/flex-layout";
import { UiComponentsModule } from "@core/ui-components/ui-components.module";
import { MaterialModule } from "@core/material.module";
import { RouterModule } from "@angular/router";
import { DashboardBiService } from "./dashboard-bi.service";
import { DashboardListingComponent } from './dashboard-listing/dashboard-listing.component';
import { DatasourceListingComponent } from './datasource-listing/datasource-listing.component';
import { DashboardEditComponent } from './dashboard-listing/dashboard-edit/dashboard-edit.component';
import { DashboardCreateComponent } from './dashboard-listing/dashboard-create/dashboard-create.component';
import { DatasourceEditComponent } from './datasource-listing/datasource-edit/datasource-edit.component';
import { DatasourceCreateComponent } from './datasource-listing/datasource-create/datasource-create.component';
import { DashboardRenderComponent } from './dashboard-listing/dashboard-render/dashboard-render.component';
import { DatasourceRenderComponent } from './datasource-listing/datasource-render/datasource-render.component';
import { DsbmodRendererComponent } from './dashboard-listing/dsbmod-renderer/dsbmod-renderer.component';

@NgModule({
  declarations: [DashboardListingComponent, DatasourceListingComponent, DashboardEditComponent, DashboardCreateComponent, DatasourceEditComponent, DatasourceCreateComponent, DashboardRenderComponent, DatasourceRenderComponent, DsbmodRendererComponent],
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
    UiComponentsModule,
    DashboardListingComponent,
    DatasourceListingComponent,
    DashboardEditComponent
  ],
  providers: [DashboardBiService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DashboardBiModule {}
