import { BpmnModulerComponent } from './bpmn-moduler/bpmn-moduler.component';
import { CheckBoxSelectionService, MultiSelectModule } from '@syncfusion/ej2-angular-dropdowns';
import { FormsBuilder } from './dynamic-forms/forms-builder';
import { GridPinnedEmptyRenderer } from './grid/grid-pinned-empty-renderer';
import { DocEditorComponent } from './document-editor/document-editor.component';
import { SaveConfirmationComponent } from './save-confirmation/save-confirmation.component';
import { NgModule , CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material.module';
import { TextMaskModule } from 'angular2-text-mask';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DatePipe } from '@angular/common';
import { A11yModule } from '@angular/cdk/a11y';
// import { AgGridModule } from 'ag-grid-angular/main';
//import { AgGridModule } from 'ag-grid-angular';
import {AgGridModule} from '@ag-grid-community/angular';
import { CalendarModule } from 'angular-calendar';

// import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';

import { MinValueDirective, MaxValueDirective } from './number/number-validators.directive';
import { OptionValidatorDirective } from './autocomplete/option-validator.directive';
import { UppercaseDirective } from './textbox/uppercase.directive';

import { OffenderSearchService } from './search-block/offender-search.service';
import { ReferenceDomainService } from './lov/reference-domain.service';

import { AddressblockComponent } from './address-block/address-block.component';
import { AutocompleteComponent } from './autocomplete/autocomplete.component';
import { ButtonComponent } from './button/button.component';
import { CameraComponent } from './camera/camera.component';
import { CheckboxComponent } from './checkbox/checkbox.component';
import { DatepickerComponent } from './datepicker/datepicker.component';
import { DialogActionsComponent } from './dialog/dialog-actions/dialog-actions.component';
import { DialogComponent } from './dialog/dialog.component';
import { DialogContentComponent } from './dialog/dialog-content/dialog-content.component';

import { DialogCardActionsComponent } from './dialog-card/dialog-card-actions/dialog-card-actions.component';
import { DialogCardComponent } from './dialog-card/dialog-card.component';
import { DialogCardContentComponent } from './dialog-card/dialog-card-content/dialog-card-content.component';

import { DialogService } from './dialog/dialog.service';
import { EmailComponent } from './email/email.component';
import { GridComponent } from './grid/grid.component';
import { GridCellEditorCheckboxComponent } from './grid/grid-cell-editor-checkbox';
import { GridCellRenderCheckboxLinkComponent } from './grid/grid-cell-render-checkboxlink';
import { GridCellEditorDateComponent } from './grid/grid-cell-editor-date';
import { GridCellEditorEmailComponent } from './grid/grid-cell-editor-email';
import { GridCellImageComponent } from './grid/grid-cell-image';
import { GridCellEditorLoVComponent } from './grid/grid-cell-editor-lov';
import { GridCellEditorMonthYearComponent } from './grid/grid-cell-editor-month-year';
import { GridCellEditorNumberComponent } from './grid/grid-cell-editor-number';
import { GridCellEditorPhoneComponent } from './grid/grid-cell-editor-phone';
import { GridCellEditorSelectboxComponent } from './grid/grid-cell-editor-selectbox';
import { GridCellEditorTextboxComponent } from './grid/grid-cell-editor-textbox';
import { GridCellEditorPasswordComponent } from './grid/grid-cell-editor-password';
import { GridCellEditorTimeComponent } from './grid/grid-cell-editor-time';
import { GridCellRenderCheckboxComponent } from './grid/grid-cell-render-checkbox';
import { GridCellRenderDateComponent } from './grid/grid-cell-render-date';
import { GridCellRenderTimeComponent } from './grid/grid-cell-render-time';
import { GridCellTooltipComponent } from './grid/grid-cell-tooltip';
import { GridCellRenderHyperlinkComponent } from './grid/grid-cell-render-hyperlink';
import { GridCellRenderLaunchbuttonComponent } from './grid/grid-cell-render-launchbutton';
import { GridCellRenderLoVComponent } from './grid/grid-cell-render-lov';
import { GridCellRenderMonthYearComponent } from './grid/grid-cell-render-month-year';
import { GridCellRenderNumberComponent } from './grid/grid-cell-render-number';
import { GridCellRenderPhoneComponent } from './grid/grid-cell-render-phone';
import { GridCellRenderSelectboxComponent } from './grid/grid-cell-render-selectbox';
import { GridCellRenderTextboxComponent } from './grid/grid-cell-render-textbox';
import { GridCellRenderPasswordComponent } from './grid/grid-cell-render-password';
import { GridCellRenderDateTimeComponent } from './grid/grid-cell-render-dateTime';
import { HeaderBlockComponent } from './header-block/header-block.component';
import { IconComponent } from './icon/icon.component';
import { ImageComponent } from './image/image.component';
import { LaunchbuttonComponent } from './launchbutton/launchbutton.component';
import { LovComponent } from './lov/lov.component';
import { LovService } from './lov/lov.service';
import { MessageComponent } from './message/message.component';
import { NumberComponent } from './number/number.component';
import { PaneComponent } from './pane/pane.component';
import { PaneActionsComponent } from './pane/pane-actions/pane-actions.component';
import { PaneHeaderContentComponent } from './pane/pane-header-content/pane-header-content.component';
import { PaneSearchBlockComponent } from './pane/pane-search-block/pane-search-block.component';
import { PanelComponent } from './panel/panel.component';
import { PhoneComponent } from './phone/phone.component';
import { RadiogroupComponent } from './radiogroup/radiogroup.component';
import { SearchBlockComponent } from './search-block/search-block.component';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { SelectboxComponent } from './selectbox/selectbox.component';
import { TextareaComponent } from './textarea/textarea.component';
import { TextboxComponent } from './textbox/textbox.component';
import { TooltipComponent } from './tooltip/tooltip.component';
import { TabComponent } from './tab/tab.component';
import { TabgroupComponent } from './tabgroup/tabgroup.component';
import { PasswordComponent } from './password/password.component';
import { MenuComponent } from './menu/menu.component';
import { CUSTOM_DATE_FORMATS, CustomDateAdapter } from './datepicker/customDateAdapter';
import { DateFormatPipe } from './datepicker/dateFormatPipe';
import { GridFilterCheckboxComponent } from './grid/grid-filter-checkbox';
import { GridFilterDateComponent } from './grid/grid-filter-date';
import { GridFilterSelectboxComponent } from './grid/grid-filter-selectbox';
import { GridFilterLovComponent } from './grid/grid-filter-lov';
import { GridFilterTimeComponent } from './grid/grid-filter-time';
import { SpinnerComponent } from './spinner/spinner.component';
import { TimeComponent } from './time/time.component';
import { MinTimeDirective, MaxTimeDirective } from './time/time-validators.directive';
import { MonthYearComponent } from './month-year/month-year.component';
import { HyperlinkComponent } from './hyperlink/hyperlink.component';
import {CalendarComponent} from './calendar/calendar.component';
import {WeekCalendarComponent} from './calendar-week/weekcalendar.component';
import { NoCommaPipe } from './number/nocomma.pipe';
import {ScreenWorkFlowService} from'./pane/screen-workflow.service';
import {RelatedScreensService} from'./pane/relatedScreens.service';	
import {IWPPaneService} from './pane/iwppane.service';
import { ChipComponent } from './chip/chip.component';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { ScheduleModule } from '@syncfusion/ej2-angular-schedule';
import { SchedulerComponent } from './schedule/scheduler.component';
import { SchedulerService } from './schedule/scheduler.service';
import { AlpineGrid } from './alpine-grid/alpine-grid.component'
import { DynamicAlpineGridComponent } from './dynamic-alpine-grid/dynamic-alpine-grid.component';
import { DocumentEditorModule } from '@syncfusion/ej2-angular-documenteditor';
import { DocumentEditorContainerModule } from '@syncfusion/ej2-angular-documenteditor';
import { ToolbarModule, TabModule, TreeViewModule, SidebarModule  } from '@syncfusion/ej2-angular-navigations';
import { DropDownButtonModule, SplitButtonModule } from '@syncfusion/ej2-angular-splitbuttons';
import { CheckBoxModule, ButtonModule } from '@syncfusion/ej2-angular-buttons';

import { ListViewModule, ListViewAllModule } from '@syncfusion/ej2-angular-lists';
import { EjsMultiSelectComponent } from './ejs-multi-select/ejs-multiselect.component';
import { FormioModule } from '@formio/angular';
import { FormsRenderer } from './dynamic-forms/forms-renderer';
import { SplitterModule } from '@syncfusion/ej2-angular-layouts';
import { RichTextEditorModule } from '@syncfusion/ej2-angular-richtexteditor';
import { BpmnModulerService } from './bpmn-moduler/bpmn-moduler.service';
import { BpmnViewerComponent } from './bpmn-viewer/bpmn-viewer.component';
import { DmnModulerComponent } from './dmn-moduler/dmn-moduler.component';
import { DmnViewerComponent } from './dmn-viewer/dmn-viewer.component';
import { GridLovDialog } from './grid/grid-lov-dialog';
import { AddEditScheduleComponent } from '../../inst/schedules/view/add-edit-schedule.component';

import { UserSignatureComponent } from './user-signature/user-signature.component';
// import the PdfViewer Module for the PDF Viewer component
import { PdfViewerModule, LinkAnnotationService, BookmarkViewService, MagnificationService, ThumbnailViewService,
    ToolbarService, NavigationService, TextSearchService, TextSelectionService, PrintService } from '@syncfusion/ej2-angular-pdfviewer';
import { PasswordDialogComponent } from './grid/password-dialog.component';
import { OverlayContainer} from '@angular/cdk/overlay';
import { CustomOverlayContainer } from './custom-overlay-container';
import { CdkOverlayContainerDirective } from './custom-overlay-container.directive';

@NgModule({
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    imports: [
        A11yModule,
        AgGridModule.withComponents([
            GridCellEditorCheckboxComponent,
            GridCellEditorDateComponent,
            GridCellEditorEmailComponent,
            GridCellImageComponent,
            GridCellEditorLoVComponent,
            GridCellEditorMonthYearComponent,
            GridCellEditorNumberComponent,
            GridCellEditorPhoneComponent,
            GridCellEditorSelectboxComponent,
            GridCellEditorTextboxComponent,
            GridCellEditorPasswordComponent,
            GridCellEditorTimeComponent,
            GridCellRenderCheckboxComponent,
            GridCellRenderCheckboxLinkComponent,
            GridCellRenderDateComponent,
            GridCellRenderTimeComponent,
            GridCellTooltipComponent,
            GridCellRenderHyperlinkComponent,
            GridCellRenderLaunchbuttonComponent,
            GridCellRenderLoVComponent,
            GridCellRenderMonthYearComponent,
            GridCellRenderNumberComponent,
            GridCellRenderPhoneComponent,
            GridCellRenderSelectboxComponent,
            GridCellRenderTextboxComponent,
            GridCellRenderPasswordComponent,
            GridCellRenderDateTimeComponent,
            GridFilterCheckboxComponent,
            GridFilterDateComponent,
            GridFilterSelectboxComponent,
            GridFilterLovComponent,
            GridFilterTimeComponent,
            GridPinnedEmptyRenderer
        ]),
        BrowserModule,
        PdfViewerModule,
        CommonModule,
        FlexLayoutModule,
        FormsModule,
        MaterialModule,
        ReactiveFormsModule,
        TextMaskModule,
        CalendarModule.forRoot({
            provide: DateAdapter,
            useFactory: adapterFactory,
        }),
        ScheduleModule,
        DocumentEditorModule,
        DocumentEditorContainerModule,
        ToolbarModule,
        SplitButtonModule,
        ButtonModule,
        TabModule,
        DropDownButtonModule,
        CheckBoxModule,
        ListViewModule,
        FormioModule,
        MultiSelectModule,
        SplitterModule,
        RichTextEditorModule,
        TreeViewModule,
        ListViewAllModule,
        SidebarModule
    ],
    declarations: [
        MinValueDirective,
        MaxValueDirective,
        OptionValidatorDirective,
        UppercaseDirective,
        AutocompleteComponent,
        ButtonComponent,
        CameraComponent,
        CheckboxComponent,
        DatepickerComponent,
        DialogActionsComponent,
        UserSignatureComponent,
        AddEditScheduleComponent,
        DialogComponent,
        DialogContentComponent,
        DialogCardActionsComponent,
        DialogCardComponent,
        DialogCardContentComponent,
        EmailComponent,
        GridComponent,
        GridCellEditorCheckboxComponent,
        GridCellEditorDateComponent,
        GridCellEditorEmailComponent,
        GridCellImageComponent,
        GridCellEditorLoVComponent,
        GridCellEditorMonthYearComponent,
        GridCellEditorNumberComponent,
        GridCellEditorPhoneComponent,
        GridCellEditorSelectboxComponent,
        GridCellEditorTextboxComponent,
        GridCellEditorPasswordComponent,
        GridCellEditorTimeComponent,
        GridCellRenderCheckboxComponent,
        GridCellRenderCheckboxLinkComponent,
        GridCellRenderDateComponent,
        GridCellRenderTimeComponent,
        GridCellTooltipComponent,
        GridCellRenderHyperlinkComponent,
        GridCellRenderLaunchbuttonComponent,
        GridCellRenderLoVComponent,
        GridCellRenderMonthYearComponent,
        GridCellRenderNumberComponent,
        GridCellRenderSelectboxComponent,
        GridCellRenderPhoneComponent,
        GridCellRenderTextboxComponent,
        GridCellRenderPasswordComponent,
        GridCellRenderDateTimeComponent,
        GridFilterCheckboxComponent,
        GridFilterDateComponent,
        GridFilterSelectboxComponent,
        GridFilterLovComponent,
        GridFilterTimeComponent,
        GridPinnedEmptyRenderer,
        HeaderBlockComponent,
        HyperlinkComponent,
        IconComponent,
        ImageComponent,
        LaunchbuttonComponent,
        LovComponent,
        MessageComponent,
        NumberComponent,
        PaneComponent,
        PaneActionsComponent,
        PaneHeaderContentComponent,
        PanelComponent,
        PaneSearchBlockComponent,
        PhoneComponent,
        RadiogroupComponent,
        SearchBlockComponent,
        ConfirmationDialogComponent,
        PasswordDialogComponent,
        SelectboxComponent,
        TabComponent,
        TabgroupComponent,
        TextareaComponent,
        TextboxComponent,
        TooltipComponent,
        PasswordComponent,
        DateFormatPipe,
        MenuComponent,
        SpinnerComponent,
        AddressblockComponent,
        TimeComponent,
        MinTimeDirective,
        MaxTimeDirective,
        MonthYearComponent,
        CalendarComponent,
        WeekCalendarComponent,
        NoCommaPipe,
        ChipComponent,
        SchedulerComponent,
        AlpineGrid,
        DynamicAlpineGridComponent,
        DocEditorComponent,
        SaveConfirmationComponent,
        EjsMultiSelectComponent,
        FormsBuilder,
        FormsRenderer,
        BpmnModulerComponent,
        BpmnViewerComponent,
        DmnModulerComponent,
        DmnViewerComponent,
        GridLovDialog,
        CdkOverlayContainerDirective,
    ],
    exports: [
        AgGridModule,
        AutocompleteComponent,
        ButtonComponent,
        CameraComponent,
        CheckboxComponent,
        DatepickerComponent,
        UserSignatureComponent,
        DialogActionsComponent,
        AddEditScheduleComponent,
        DialogComponent,
        DialogContentComponent,
        DialogCardActionsComponent,
        DialogCardComponent,
        DialogCardContentComponent,
        EmailComponent,
        GridComponent,
        HeaderBlockComponent,
        HyperlinkComponent,
        ImageComponent,
        LaunchbuttonComponent,
        LovComponent,
        MessageComponent,
        NumberComponent,
        PaneComponent,
        PaneActionsComponent,
        PaneHeaderContentComponent,
        PanelComponent,
        PaneSearchBlockComponent,
        PhoneComponent,
        RadiogroupComponent,
        SearchBlockComponent,
        ConfirmationDialogComponent,
        PasswordDialogComponent,
        SelectboxComponent,
        TabComponent,
        TabgroupComponent,
        TextareaComponent,
        TextboxComponent,
        TooltipComponent,
        IconComponent,
        PasswordComponent,
        MenuComponent,
        SpinnerComponent,
        MinValueDirective,
        MaxValueDirective,
        OptionValidatorDirective,
        UppercaseDirective,
        AddressblockComponent,
        TimeComponent,
        MinTimeDirective,
        MaxTimeDirective,
        MonthYearComponent,
        CalendarComponent,
        WeekCalendarComponent,
        NoCommaPipe,
        ChipComponent,
        ScheduleModule,
        SchedulerComponent,
        AlpineGrid,
        DynamicAlpineGridComponent,
        DocumentEditorModule,
        DocumentEditorContainerModule,
        DocEditorComponent,
        SaveConfirmationComponent,
        ToolbarModule,
        SplitButtonModule,
        ButtonModule,
        TabModule,
        DropDownButtonModule,
        CheckBoxModule,
        FormioModule,
        FormsBuilder,
        FormsRenderer,
        MultiSelectModule,
        EjsMultiSelectComponent,
        SplitterModule,
        RichTextEditorModule,
        TreeViewModule,
        ListViewAllModule,
        BpmnModulerComponent,
        SidebarModule,
        BpmnViewerComponent,
        DmnModulerComponent,
        DmnViewerComponent,
        GridLovDialog
    ],
    providers: [
        LinkAnnotationService, BookmarkViewService, MagnificationService,
        ThumbnailViewService, ToolbarService, NavigationService, TextSearchService, TextSelectionService, PrintService,
        OffenderSearchService,
        ReferenceDomainService,
        LovService,
        DialogService,
        DatePipe,
        ScreenWorkFlowService,
        RelatedScreensService,
        IWPPaneService,
        SchedulerService,
        BpmnModulerService,
        CheckBoxSelectionService,
        {
            provide: DateAdapter, useClass: CustomDateAdapter
        },
        {
            provide: MAT_DATE_FORMATS, useValue: CUSTOM_DATE_FORMATS
        },
        {
            provide: 'dateFormat', useValue: DateFormatPipe
        }
    ]
})
export class UiComponentsModule { }
