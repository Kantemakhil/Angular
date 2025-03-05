import { Component, Input, EventEmitter, Output, OnInit, ViewChild, ElementRef, AfterViewInit, HostListener } from '@angular/core';
import { GridCellEditorTextboxComponent } from './grid-cell-editor-textbox';
import { GridCellEditorDateComponent } from './grid-cell-editor-date'; 
import { GridCellEditorSelectboxComponent } from './grid-cell-editor-selectbox';
import { GridCellEditorCheckboxComponent } from './grid-cell-editor-checkbox';
import { GridCellImageComponent } from './grid-cell-image';
import { GridCellRenderDateComponent } from './grid-cell-render-date';
import { GridCellRenderTimeComponent } from './grid-cell-render-time';
import { GridCellEditorNumberComponent } from './grid-cell-editor-number';
import { GridCellEditorPhoneComponent } from './grid-cell-editor-phone';
import { GridCellEditorEmailComponent } from './grid-cell-editor-email';
import { GridCellEditorTimeComponent } from './grid-cell-editor-time';
import { GridCellRenderHyperlinkComponent } from './grid-cell-render-hyperlink';
import { GridCellRenderLaunchbuttonComponent } from './grid-cell-render-launchbutton';
import { GridCellRenderSelectboxComponent } from './grid-cell-render-selectbox';
import { GridCellRenderPhoneComponent } from './grid-cell-render-phone';
import { GridCellEditorLoVComponent } from './grid-cell-editor-lov';
import { GridCellRenderNumberComponent } from './grid-cell-render-number';
import { GridCellRenderLoVComponent } from './grid-cell-render-lov';
import { GridCellRenderCheckboxComponent } from './grid-cell-render-checkbox';
import { GridCellRenderCheckboxLinkComponent } from './grid-cell-render-checkboxlink';
import { GridFilterCheckboxComponent } from './grid-filter-checkbox';
import { GridFilterDateComponent } from './grid-filter-date';
import { GridFilterSelectboxComponent } from './grid-filter-selectbox';
import { GridFilterLovComponent } from './grid-filter-lov';
import { GridFilterTimeComponent } from './grid-filter-time';
import { GridCellRenderDateTimeComponent } from './grid-cell-render-dateTime';
import { TranslateService } from '@common/translate/translate.service';
import { LovService } from '../lov/lov.service';
import { GridCellEditorMonthYearComponent } from './grid-cell-editor-month-year';
import { GridCellRenderMonthYearComponent } from './grid-cell-render-month-year';
import { DateFormat } from '../datepicker/dateFormat';
import {AllModules, GridOptions, GridApi, GridSizeChangedEvent} from '@ag-grid-enterprise/all-modules';

export type RowSelection = 'single' | 'multiple';

export type ColDataType = 'checkbox'|'checkbox-link' | 'date' | 'email' | 'hyperlink' | 'launchbutton' | 'lov'
    | 'number' | 'phone' | 'text' | 'select' | 'image' | 'time' | 'dateTime' | 'monthYear' | 'custom';

export class ValidateRowEvent {
    oldValue: any;
    newValue: any;
    field: string;
    data: any;
}

export class ValidateRowReturn {
    validated: boolean;
    data: any;
}

const noop = () => {
};

@Component({
    selector: 's4-grid-old',
    templateUrl: './grid.component.html',
    styleUrls: ['./grid.component.scss']
})
export class GridComponent implements OnInit, AfterViewInit {
    @Input() id: string;
    @Input() disabled = false;
    @Input() readonly = false;
    // represents gridoptions
    public gridOptions: GridOptions;
    // represents icons
    public icons: any;
    // repesents rowdata (records)
    private innerRowData: any[];
    // represents columns
    @Input() public columnDefs: any[];
    // represents row selection single/multiple
    @Input() public rowSelection: RowSelection = 'single';
    // represents row height
    public rowHeight: number;
    // represents grid (table) height
    public gridHeight = '400px';
    // represents grid width
    public gridWidth = '100%';
    // represents pagination size
    public paginationPageSize = 10;
    // represents enableColResize true/false
    public enableColResize = true;
    // represents header height
    public headerHeight: number;
    @Input() public enableInsert = false;
    @Input() public enableDelete = false;
    @Input() public enableUpdate = false;
    @Input() public allowEdit = false;
    // Indicates that the action to save is triggered outside the grid (i.e. by the form)
    @Input() public externalSave = false;
    @Input() onDelete: (row: any) => any;
    @Input() onInsert: () => any;
    @Input() onClear: () => any;
    @Output() onCommit: EventEmitter<any> = new EventEmitter<any>();
    @Input() validateRow: (event: ValidateRowEvent) => any;
    // represents row clicked event
    @Output() rowClicked: EventEmitter<any> = new EventEmitter<any>();
    @Output() cellClicked:EventEmitter<any> = new EventEmitter<any>();
    @Output() rowDoubleClicked: EventEmitter<any> = new EventEmitter<any>();
    @Output() mapsData: EventEmitter<any> = new EventEmitter<any>();
    @Output() updatedMapsData: EventEmitter<any> = new EventEmitter<any>();
    @Output() clearedData: EventEmitter<any> = new EventEmitter<any>();
    btnDeletedDisabled = true;
    btnSavebtnDisable = true;
    btnClearbtnDisable = true;
    private innerSelected: any;
    // represents pinned row
    innerpinnedBottomRowData: any[] = [];
    // AE: Added temporarily to get the build compiling. Should be replaced with actual code.
    sortable: any;
    filter: any;
    floatingFilter: any;
    pagination: any;
    frameworkComponents: any;
    savebtnDisable: boolean;
    clearbtnDisable: boolean;
    removebtnDisable: boolean;
    domLayout: any;

    agcoldefs: any[] = [];
    private api: GridApi;
    private columnApi;
    private addedMap: Map<number, any>;
    private removedMap: Map<number, any>;
    private updatedMap: Map<number, any>;
    private updatedCellsMap: Map<number, Set<string>>;
    private initDataMap: Map<number, any>;
    private sortModel = [];
    private rowsSelected: any;
    private updatedRows = [];
    private pos : number = 0;
    @ViewChild('paginationRow', { read: ElementRef ,static : true }) paginationRow: ElementRef;
    @ViewChild('gridDiv', { read: ElementRef ,static : true}) gridDiv: ElementRef;
    showPagination : boolean = false;
    selectedCell:any;
    private shiftTabPressed=false;
    private rowDataLength:any;
    private columnDataLength:any;
    private styleClass=" ";
    isLastColumnClicked:boolean=false;
    modules = AllModules;
    gridActualWidth;
    gridBodyContainerWidth;
    isGridLoaded:boolean;
    @HostListener('window:keyup', ['$event'])
    
    keyEvent(e: KeyboardEvent) {
        // focusing on first cell of first grid using control+q shorkey
        if(e.code === "KeyQ" && e.ctrlKey){
            const agCellNoFiocusArray = document.activeElement.tagName;
            if(agCellNoFiocusArray !== "AG-GRID-ANGULAR" && agCellNoFiocusArray !== "DIV"){
                this.gridOptions.api.setFocusedCell(0,this.agcoldefs[0].field); 
            }  
        }
        }
        @HostListener('document:click', ['$event'])
      onClick(event: Event) {
        const eventTargetEl = event.target as HTMLElement;
        if(eventTargetEl.classList.contains("ag-header-icon") || eventTargetEl.classList.contains("ag-icon-menu")){
            const gridFliterLovTag= document.getElementsByTagName('grid-filter-lov');
            if(gridFliterLovTag.length > 0){
                for(let i=0; i<gridFliterLovTag.length; i++){
                    gridFliterLovTag.item(i).parentElement.parentElement.parentElement.parentElement.style.minHeight = "300px";
                }
            }
        }
      }
    constructor(public translateService: TranslateService,
                private lovService: LovService) {
        this.addedMap = new Map();
        this.removedMap = new Map();
        this.updatedMap = new Map();
        this.updatedCellsMap = new Map();
        this.initDataMap = new Map();
        
        this.gridOptions = <GridOptions>{
            pagination: true,
            floatingFilter: false,
            paginationPageSize: 10,
            animateRows: true,
            singleClickEdit: false,
            suppressPaginationPanel:true
        };
        this.gridOptions.rowClass = 'middle';
        this.domLayout = 'autoHeight';
        this.gridOptions.getRowStyle = this.getAddRowClass;
        this.icons = {
            columnRemoveFromGroup: '<i class="fa fa-remove"/>',
            filter: '<i class="fa fa-filter"/>',
            sortAscending: '<i class="fa fa-long-arrow-down"/>',
            sortDescending: '<i class="fa fa-long-arrow-up"/>',
            groupExpanded: '<i class="fa fa-minus-square-o"/>',
            groupContracted: '<i class="fa fa-plus-square-o"/>',
            columnGroupOpened: '<i class="fa fa-plus-square-o"/>',
            columnGroupClosed: '<i class="fa fa-minus-square-o"/>'
        };
        this.frameworkComponents = {};
        this.gridOptions.autoSizePadding = 16; // Add 16 pixels for the menu icon (S4-3034)
        // this.agcoldefs = {
        //     autoHeight: true,
        //   };
        this.isGridLoaded = false;
    }

    clearMaps() {
        this.addedMap.clear();
        this.removedMap.clear();
        this.updatedMap.clear();
        this.updatedCellsMap.clear();
        this.initDataMap.clear();
        this.updatedRows=[];
        this.pos=0;
    }

    ngOnInit() {
        this.prepareAgColumnDef();
        this.btnDeletedDisabled = this.isRemvoedDisabled();
        this.btnSavebtnDisable = this.isSaveDisabled();
        this.btnClearbtnDisable = this.isClearDisabled();
        this.enableFiltersAndSorts();
        this.resizeColumns();
    }

    ngAfterViewInit() {
        if (this.gridOptions && this.gridOptions.api) {
            this.gridOptions.api.clearFocusedCell();
            this.gridOptions.api.setHeaderHeight(40);
            
            this.gridOptions.rowHeight = 40;
            //this.gridOptions.api.sizeColumnsToFit();
            this.resizeColumns();
            setTimeout(() => {
                this.setGridWidth(); 
            }, 500);
            
        }
    }

    getAddRowClass = (params) => {
        if (this.rowData.length <= params.node.rowIndex
            || this.addedMap.has(params.node.rowIndex)) {
            // return 'add-record';
            return { background: '#EEFF41;' };
        }
    }

    updatedCellStyle = (params) => {
       return { backgroundColor: '#e7542f;' };
    }

    isCellValueChanged(data: any, field: string, newValue: any, containsDots: boolean) {
        let value: any;
        if (!containsDots) {
            value = data[field];
        } else {
            // otherwise it is a deep value, so need to dig for it
            const fieldPieces = field.split('.');
            let currentObject = data;
            while (fieldPieces.length > 0 && currentObject) {
                const fieldPiece = fieldPieces.shift();
                if (fieldPieces.length === 0) {
                    value = currentObject[fieldPiece];
                } else {
                    currentObject = currentObject[fieldPiece];
                }
            }
        }
        return value !== newValue;
    }

    prepareAgColumnDef() {
        if (this.columnDefs) {
            this.columnDefs.forEach(e => {
                const textWdth = this.getTextWidth(e.fieldName);
                 if(textWdth < 70){
                     e.width = 100;
                 }else{
                     e.width = textWdth; 
                 }
                 if(e.datatype === "date"){
                     e.width = 150; 
                 }
                 if(e.datatype === "launchbutton"){
                     e.width = 100;
                 }
                 if(e.fieldName === ""){
                     e.width = 100;
                 }
                 if(e.datatype === "checkbox"){
                     e.width = 100;
                 }
                 if(e.field === "goButtonOne"){
                     e.width = 180;
                 }
             });
            this.agcoldefs = [];
            for (const col of this.columnDefs) {
                let agcol = {};
                col.autoHeight = true;
                //col.wrapText = true;
                agcol['headerName'] = col.fieldName;
                agcol['field'] = col.field;
                agcol['autoHeight'] = col.autoHeight;
               // agcol['wrapText'] = col.wrapText;
                
                let canEdit = true;
                if (this.readonly || this.disabled || !this.enableUpdate) {
                    canEdit = false;
                }
                if (col.cellEditable) {
                    if (canEdit) {
                        agcol['editable'] = this.gridCellEditable;
                        agcol['cellEditable'] = col.cellEditable;
                    }
                } else {
                    if (!col.editable) {
                        canEdit = false;
                    }
                    agcol['editable'] = canEdit;
                }
                agcol = this.addEditableData(col, agcol, canEdit);
                if (col.width) {
                    agcol['width'] = col.width;
                }
                // hide property for columns
                if (col.hide) {
                    agcol['hide'] = col.hide;
                }
                // nonSavable property column
                if (col.nonSavable) {
                    agcol['nonSavable'] = col.nonSavable;
                }
                // agcol['cellStyle'] = this.updatedCellStyle;
                if (col.sort) {
                    this.sortModel.push({ colId: col.field, sort: col.sort });
                }
                agcol['resizable'] = true;
                // agcol['cellClass'] = this.getCellClass;
                this.agcoldefs.push(agcol);

            }
        } else {
            throw Error('column definitions required.');
        }
    }

    getTextWidth(text) {
        // re-use canvas object for better performance
        var canvas =  document.createElement("canvas");
        var context = canvas.getContext("2d");
        var metrics = context.measureText(text);
        return metrics.width;
    }
    gridCellEditable = (def: any): boolean => {
        const colField = def.colDef.field;
        if (def.colDef.cellEditable) {
            return def.colDef.cellEditable(def.node.data, def.node.rowIndex, colField, this.calculateIndex(def.node.rowIndex));
        }
        return false;
    }

    getCellClass = (params) => {
        const index = this.calculateIndex(params.node.rowIndex);
        if (this.initDataMap.has(index)) {
            const data = this.initDataMap.get(index);
            if (this.isCellValueChanged(data, params.colDef.field, params.value,
                (params.column && params.column.isFieldContainsDots()))) {
                return 'ag-dirty-cell';
            }
        }
        return '';
    }

    get rowData(): any[] {
        return this.innerRowData;
    }

    @Input()
    set rowData(data: any[]) {
        this.innerRowData = data;
        this.updatePagination();
        this.clearMaps();
        this.clearFilter();
        this.btnSavebtnDisable = this.isSaveDisabled();
        this.btnDeletedDisabled = this.isRemvoedDisabled();
        this.btnClearbtnDisable = this.isClearDisabled();
        if (this.gridOptions && this.gridOptions.api) {
            this.gridOptions.api.clearFocusedCell();
            this.gridOptions.api.setHeaderHeight(42);
            this.gridOptions.rowHeight = 42;
            //this.gridOptions.api.sizeColumnsToFit();
            this.resizeColumns();
            this.setGridWidth();
        }
        this.enableFiltersAndSorts();
    }

    get selected(): any {
        return this.innerSelected;
    }

    @Input()
    set selected(selected: any) {
        if (this.innerSelected !== selected) {
            this.innerSelected = selected;
            this.updateSelection();
        }
    }
    
    rowDoubleClickedEvent(event) {
        this.resizeColumns();
        this.rowsSelected = event.api.getSelectedRows();
        if (this.rowsSelected && this.rowSelection === 'single') {
            this.rowsSelected = this.rowsSelected[0];
        }
        this.rowDoubleClicked.emit(this.rowsSelected);
    }

    onCellClicked(event) {
        this.rowsSelected = event.api.getSelectedRows();
        if (this.rowsSelected && this.rowSelection === 'single') {
            this.rowsSelected = this.rowsSelected[0];
        }
        this.cellClicked.emit(this.rowsSelected);
    }
    get pinnedBottomRowData(): any[]  {
        return this.innerpinnedBottomRowData;
    }
    // pinned Bottom Row Data
    @Input()
    set pinnedBottomRowData(pinnedData) {
        if (this.api) {
            this.api.setPinnedBottomRowData(pinnedData);
        }
        this.innerpinnedBottomRowData = pinnedData;
    }

    private updateSelection() {
        if (this.gridOptions.api) {
            if (typeof this.innerSelected === 'number' && this.innerSelected >= 0) {
                this.gridOptions.api.deselectAll();
                this.gridOptions.api.clearFocusedCell();
                const node = this.gridOptions.api.getDisplayedRowAtIndex(this.innerSelected);
                if (node) {
                    node.setSelected(true);
                }
            } else if (this.innerSelected && this.innerSelected instanceof Array) {
                this.gridOptions.api.deselectAll();
                for (const i of this.innerSelected) {
                    if (typeof i === 'number' && i >= 0) {
                        const node = this.gridOptions.api.getDisplayedRowAtIndex(i);
                        if (node) {
                            node.setSelected(true);
                        }
                    }
                }
            }
        }
    }

    private updatePagination() {
        /*let pgn = false;
        if (this.innerRowData) {
            pgn = this.innerRowData.length > 0;
        }
        if (this.pagination !== pgn) {
            this.pagination = pgn;
            this.gridOptions = {...this.gridOptions, pagination: this.pagination};
        }*/
        this.savebtnDisable = this.isSaveDisabled();
        this.removebtnDisable = this.isRemvoedDisabled();
        this.clearbtnDisable = this.isClearDisabled();
    }

    addEditableData(col, agcol, canEdit: boolean) {
        let celledit, cellrender, cellfilter;
        let filter = true;
        // const filterparams;
        switch (col.datatype) {
            case 'checkbox':
                {
                    celledit = GridCellRenderCheckboxComponent;
                    cellrender = GridCellRenderCheckboxComponent;
                    this.frameworkComponents['checkboxfilter'] = GridFilterCheckboxComponent;
                    cellfilter = 'checkboxfilter';
                    if (col.required) {
                        agcol['required'] = col.required;
            }
                    if (col.editable) {
                        agcol['editable'] = col.editable;   
                    }
                    break;
                }
            case 'date':
                {
                    celledit = GridCellEditorDateComponent;
                    cellrender = GridCellRenderDateComponent;
                    this.frameworkComponents['datefilter'] = GridFilterDateComponent;
                    cellfilter = 'datefilter';
                    if (col.required) {
                        agcol['required'] = col.required;
                    }
                    if (col.minDate) {
                        agcol['minDate'] = col.minDate;
                    }
                    if (col.maxDate) {
                        agcol['maxDate'] = col.maxDate;
                    }
            agcol['comparator'] = this.dateComparator;
                    break;
                }
            case 'email':
                {
                    celledit = GridCellEditorEmailComponent;
                    // use the ag-grid default text render

                    if (col.required) {
                        agcol['required'] = col.required;
                    }
                    break;
                }
            case 'hyperlink':
                {
                    cellrender = GridCellRenderHyperlinkComponent;
                    if (col.link) {
                        agcol['link'] = col.link;
                    }
                    if (col.modal) {
                        agcol['modal'] = col.modal;
                    }
                    if (col.height) {
                        agcol['height'] = col.height;
                    }
                    if (col.dialogWidth) {
                        agcol['dialogWidth'] = col.dialogWidth;
                    }
                    if (col.data) {
                        agcol['data'] = col.data;
                    }
                    if (col.updateField) {
                        agcol['updateField'] = col.updateField;
                    }
                    if (col.displayas) {
                        agcol['displayas'] = col.displayas;
                    }
                    if (col.queryparam) {
                        agcol['queryparam'] = col.queryparam;
                    }
                    if (col.typeValue) {
                        agcol['typeValue'] = col.typeValue;
                    }
                    
                    if(col.styleClass) {
                        agcol['styleClass'] = col.styleClass;
                    }
                    if (col.onLaunchClick) {
                        agcol['onLaunchClick'] = col.onLaunchClick;
                    }
                    agcol['editable'] = false;
                    break;
                }
            case 'checkbox-link':
            {
                celledit = GridCellEditorCheckboxComponent;
                cellrender = GridCellRenderCheckboxLinkComponent;
                if (col.link) {
                    agcol['link'] = col.link;
                }
                if (col.modal) {
                    agcol['modal'] = col.modal;
                }
                if (col.height) {
                    agcol['height'] = col.height;
                }
                if (col.dialogWidth) {
                    agcol['dialogWidth'] = col.dialogWidth;
                }
                if (col.data) {
                    agcol['data'] = col.data;
                }
                if (col.updateField) {
                    agcol['updateField'] = col.updateField;
                }
                if (col.displayas) {
                    agcol['displayas'] = col.displayas;
                }
                if (col.queryparam) {
                    agcol['queryparam'] = col.queryparam;
                }
                if (col.typeValue) {
                    agcol['typeValue'] = col.typeValue;
                }
                if(col.styleClass) {
                    agcol['styleClass'] = col.styleClass;
                }
                this.frameworkComponents['checkboxfilter'] = GridFilterCheckboxComponent;
                cellfilter = 'checkboxfilter';
                break;
            }    
            
            case 'launchbutton':
                {
                    cellrender = GridCellRenderLaunchbuttonComponent;
                    filter = false;
                    if (col.link) {
                        agcol['link'] = col.link;
                    }
                    if (col.modal) {
                        agcol['modal'] = col.modal;
                    }
                    if (col.height) {
                        agcol['height'] = col.height;
                    }
                    if (col.dialogWidth) {
                        agcol['dialogWidth'] = col.dialogWidth;
                    }
                    if (col.data) {
                        agcol['data'] = col.data;
                    }
                    if (col.onLaunchClick) {
                        agcol['onLaunchClick'] = col.onLaunchClick;
                    }
                    if (col.isDisable) {
                        agcol['isDisable'] = col.isDisable;
                    }
                    if (col.updateField) {
                        agcol['updateField'] = col.updateField;
                    }
                    // disable editing for this type of column for now
                    agcol['editable'] = false;
                    agcol['suppressSorting'] = true;
                    agcol['suppressMenu'] = true;
                    break;
                }
            case 'lov':
                {
                    celledit = GridCellEditorLoVComponent;
                    cellrender = GridCellRenderLoVComponent;
                    if (col.link) {
                        agcol['link'] = col.link;
                        if (col.parentField) {
                            this.lovService.clearStartWith(col.link);
                        } else {
                            this.lovService.clear(col.link);
                        }
                    }
                    if (col.domain) {
                        agcol['domain'] = col.domain;
                    }
                    if (col.parent) {
                        agcol['parent'] = col.parent;
                    }
                    if (col.parentField) {
                        agcol['parentField'] = col.parentField;
                    }
                    if (col.parentFieldObserval) {
                        agcol['parentFieldObserval'] = col.parentFieldObserval;
                    }
                    if (col.optionWidth) {
                        agcol['optionWidth'] = col.optionWidth;
                    }
                    if (col.codeTitle) {
                        agcol['codeTitle'] = col.codeTitle;
                    }
                    if (col.descTitle) {
                        agcol['descTitle'] = col.descTitle;
                    }
                    if (col.titles) {
                        agcol['titles'] = col.titles;
                    }
                    if (col.required) {
                        agcol['required'] = col.required;
                    }
                    this.frameworkComponents['lovfilter'] = GridFilterLovComponent;
                    cellfilter = 'lovfilter';
                    break;
                }
            case 'number':
                {
                    celledit = GridCellEditorNumberComponent;
                    cellrender = GridCellRenderNumberComponent;
                    cellfilter = 'agNumberColumnFilter';
                    if (col.required) {
                        agcol['required'] = col.required;
                    }
                    if (col.minValue) {
                        agcol['minValue'] = col.minValue;
                    }
                    if (col.maxValue) {
                        agcol['maxValue'] = col.maxValue;
                    }
                    if (col.whole) {
                        agcol['whole'] = col.whole;
                    }
                    if (col.format) {
                        agcol['format'] = col.format;
                    }
                    if (col.strictFP) {
                        agcol['strictFP'] = col.format;
                    }
                    break;
                }
            case 'phone':
                {
                    celledit = GridCellEditorPhoneComponent;
                    cellrender = GridCellRenderPhoneComponent;
                    cellfilter = 'agNumberColumnFilter';
                    if (col.required) {
                        agcol['required'] = col.required;
                    }
                    break;
                }
            case 'text':
                {
                    celledit = GridCellEditorTextboxComponent;
                    // use the ag-grid default text render

                    if (col.maxlength) {
                        agcol['maxlength'] = col.maxlength;
                    }
                    if (col.required) {
                        agcol['required'] = col.required;
                    }
                    if (col.mask) {
                        agcol['mask'] = col.mask;
                    }
                    if (col.uppercase) {
                        agcol['uppercase'] = col.uppercase;
                    }
                    break;
                }
            case 'select':
                {
                    celledit = GridCellEditorSelectboxComponent;
                    cellrender = GridCellRenderSelectboxComponent;
                    if (col.options) {
                        agcol['options'] = col.options;
                    }
                    if (col.required) {
                        agcol['required'] = col.required;
                    }
                    this.frameworkComponents['selectboxfilter'] = GridFilterSelectboxComponent;
                    cellfilter = 'selectboxfilter';
                    break;
                }
            case 'image':
                {
                    cellrender = GridCellImageComponent;
                    if (col.label) {
                        agcol['label'] = col.label;
                    }
                    // disable editing for this type of column for now
                    agcol['editable'] = false;
                    agcol['suppressSorting'] = true;
                    agcol['suppressMenu'] = true;
                    filter = false;
                    break;
                }
            case 'time':
                {
                    cellrender = GridCellRenderTimeComponent;
                    celledit = GridCellEditorTimeComponent;
                    if (col.required) {
                        agcol['required'] = col.required;
                    }
                    if (col.max) {
                        agcol['max'] = col.max;
                    }
                    if (col.min) {
                        agcol['min'] = col.min;
                    }
                    agcol['comparator'] = this.timeComparator;
                    this.frameworkComponents['timefilter'] = GridFilterTimeComponent;
                    cellfilter = 'timefilter';
                    break;
                }
            case 'dateTime':
                {
                    cellrender = GridCellRenderDateTimeComponent;
                    this.frameworkComponents['datefilter'] = GridFilterDateComponent;
                    cellfilter = 'datefilter';
                    agcol['editable'] = false;
                    break;
                }
                case 'monthYear':
                {
                    celledit = GridCellEditorMonthYearComponent;
                    cellrender = GridCellRenderMonthYearComponent;
                    this.frameworkComponents['datefilter'] = GridFilterDateComponent;
                    cellfilter = 'datefilter';
                    if (col.required) {
                        agcol['required'] = col.required;
                    }
                    if (col.minDate) {
                        agcol['minDate'] = col.minDate;
                    }
                    if (col.maxDate) {
                        agcol['maxDate'] = col.maxDate;
                    }
                    break;
                }
            case 'custom':
                {
                    filter = false;
                    agcol['cellEditorSelector'] = this.cellEditorSelector;
                    agcol['cellRendererSelector'] = this.cellRendererSelector;
                    if (col.editorSelector) {
                        agcol['editorSelector'] = col.editorSelector;
                    }
                    if (col.rendererSelector) {
                        agcol['rendererSelector'] = col.rendererSelector;
                    }
                    if (col.required) {
                        agcol['required'] = col.required;
                    }
                    if (col.minDate) {
                        agcol['minDate'] = col.minDate;
                    }
                    if (col.maxDate) {
                        agcol['maxDate'] = col.maxDate;
                    }
                    if (col.link) {
                        agcol['link'] = col.link;
                    }
                    if (col.modal) {
                        agcol['modal'] = col.modal;
                    }
                    if (col.height) {
                        agcol['height'] = col.height;
                    }
                    if (col.dialogWidth) {
                        agcol['dialogWidth'] = col.dialogWidth;
                    }
                    if (col.data) {
                        agcol['data'] = col.data;
                    }
                    if (col.updateField) {
                        agcol['updateField'] = col.updateField;
                    }
                    if (col.domain) {
                        agcol['domain'] = col.domain;
                    }
                    if (col.parent) {
                        agcol['parent'] = col.parent;
                    }
                    if (col.parentField) {
                        agcol['parentField'] = col.parentField;
                    }
                    if (col.optionWidth) {
                        agcol['optionWidth'] = col.optionWidth;
                    }
                    if (col.codeTitle) {
                        agcol['codeTitle'] = col.codeTitle;
                    }
                    if (col.descTitle) {
                        agcol['descTitle'] = col.descTitle;
                    }
                    if (col.minValue) {
                        agcol['minValue'] = col.minValue;
                    }
                    if (col.maxValue) {
                        agcol['maxValue'] = col.maxValue;
                    }
                    if (col.whole) {
                        agcol['whole'] = col.whole;
                    }
                    if (col.maxlength) {
                        agcol['maxlength'] = col.maxlength;
                    }
                    if (col.mask) {
                        agcol['mask'] = col.mask;
                    }
                    if (col.options) {
                        agcol['options'] = col.options;
                    }
                    if (col.label) {
                        agcol['label'] = col.label;
                    }
                    if (col.max) {
                        agcol['max'] = col.max;
                    }
                    if (col.min) {
                        agcol['min'] = col.min;
                    }
                    break;
                }
        }
        if (celledit && canEdit) {
            agcol['cellEditor'] = celledit;
        }
        if (cellrender) {
            agcol['cellRenderer'] = cellrender;
        }
        if (cellfilter) {
            agcol['filter'] = cellfilter;
        } else if (filter) {
            agcol['filter'] = 'agTextColumnFilter';
        }
        /*if (filterparams) {
            agcol['filterParams'] = filterparams;
        }*/
        return agcol;
    }

    timeComparator = (time1, time2) => {
        if (!time1 && !time2) {
            return 0;
        }
        if (!time1) {
            return -1;
        }
        if (!time2) {
            return 1;
        }
        if(!(time1 instanceof Date)){
            time1 = DateFormat.getDate(time1);
        }
        if(!(time2 instanceof Date)){
            time2 = DateFormat.getDate(time2);
        }
        return DateFormat.compareTime(time1, time2);
    }
    
    dateComparator = (date1, date2) => {
        if (!date1 && !date2) {
            return 0;
        }
        if (!date1) {
            return -1;
        }
        if (!date2) {
            return 1;
        }
        if(!(date1 instanceof Date)){
            date1 = DateFormat.getDate(date1);
        }
        if(!(date2 instanceof Date)){
            date2 = DateFormat.getDate(date2);
        }
        return DateFormat.compareDate(date1, date2);
    }

    cellEditorSelector = (params) => {
        if (params.column.colDef.editorSelector) {
            const type: ColDataType = params.column.colDef.editorSelector(params.rowIndex, params.column.colDef.field, params.data)
            let celledit: any;
            switch (type) {
                case 'checkbox':
                    {
                        celledit = GridCellEditorCheckboxComponent;
                        break;
                    }
                case 'checkbox-link':
                {
                    celledit = GridCellEditorCheckboxComponent;
                    break;
                }
                case 'date':
                    {
                        celledit = GridCellEditorDateComponent;
                        break;
                    }
                case 'email':
                    {
                        celledit = GridCellEditorEmailComponent;
                        break;
                    }
                case 'lov':
                    {
                        celledit = GridCellEditorLoVComponent;
                        break;
                    }
                case 'number':
                    {
                        celledit = GridCellEditorNumberComponent;
                        break;
                    }
                case 'phone':
                    {
                        celledit = GridCellEditorPhoneComponent;
                        break;
                    }
                case 'text':
                    {
                        celledit = GridCellEditorTextboxComponent;
                        break;
                    }
                case 'select':
                    {
                        celledit = GridCellEditorSelectboxComponent;
                        break;
                    }
                case 'time':
                    {
                        celledit = GridCellEditorTimeComponent;
                    }
            }
            if (celledit) {
                return { component: celledit };
            } else {
                return null;
            }
        }
        return { component: GridCellEditorTextboxComponent };
    }

    cellRendererSelector = (params) => {
        if (params.column.colDef.rendererSelector) {
            const type: ColDataType = params.column.colDef.rendererSelector(params.rowIndex, params.column.colDef.field, params.data)
            let cellrender: any;
            switch (type) {
                case 'checkbox':
                    {
                        cellrender = GridCellRenderCheckboxComponent;
                        break;
                    }
                case 'checkbox-link':
                {
                    cellrender = GridCellRenderCheckboxLinkComponent;
                    break;
                }
                case 'date':
                    {
                        cellrender = GridCellRenderDateComponent;
                        break;
                    }
                case 'hyperlink':
                    {
                        cellrender = GridCellRenderHyperlinkComponent;
                        break;
                    }
                case 'launchbutton':
                    {
                        cellrender = GridCellRenderLaunchbuttonComponent;
                        break;
                    }
                case 'lov':
                    {
                        cellrender = GridCellRenderLoVComponent;
                        break;
                    }
                case 'number':
                    {
                        cellrender = GridCellRenderNumberComponent;
                        break;
                    }
                case 'phone':
                    {
                        cellrender = GridCellRenderPhoneComponent;
                        break;
                    }
                case 'select':
                    {
                        cellrender = GridCellRenderSelectboxComponent;
                        break;
                    }
                case 'image':
                    {
                        cellrender = GridCellImageComponent;
                        break;
                    }
                case 'time':
                    {
                        cellrender = GridCellRenderTimeComponent;
                        break;
                    }
                case 'dateTime':
                    {

                        cellrender = GridCellRenderDateTimeComponent;
                    }
            }
            if (cellrender) {
                return { component: cellrender };
            } else {
                return null;
            }
        }
        return null;
    }

    public onReady(params) {
        this.api = params.api;
        this.columnApi = params.columnApi;
        if (this.sortModel) {
            this.columnApi.applyColumnState(this.sortModel);
        }
        this.resizeColumns();
        this.updateSelection();
        this.enableFiltersAndSorts();
        
    }
    onGridSizeChanged(params: GridSizeChangedEvent) {
        // params.api.sizeColumnsToFit();
        this.resizeColumns();
        this.setGridWidth();
      }
    
    private resizeColumns() {
        let availableGridWidth = this.gridDiv.nativeElement.offsetWidth;
        let width = 0;
        if  (this.columnApi != undefined) {
           for (let i =0; i < this.columnApi.getAllDisplayedColumns().length; i++  ) {
                let columnWidth = this.columnApi.columnModel.autoWidthCalculator.getPreferredWidthForColumn(this.columnApi.getAllDisplayedColumns()[i]);
                
                width = width + columnWidth;
                this.gridBodyContainerWidth = width;
                this.gridActualWidth = availableGridWidth;
            }
            if(width < availableGridWidth) {
              //this.api.sizeColumnsToFit();
              var allColumnIds = [];
                this.agcoldefs.forEach(function(column) {
                    allColumnIds.push(column.field);
                });
                this.columnApi.autoSizeColumns(allColumnIds);
                this.api.resetRowHeights();
                this.isGridLoaded = true;
            } else {
                var allColumnIds = [];
                this.agcoldefs.forEach(function(column) {
                    allColumnIds.push(column.field);
                });
                this.columnApi.autoSizeColumns(allColumnIds);
                this.api.resetRowHeights();
                this.isGridLoaded = true;
            }   
        }
    }
    onColumnResized(params) {
      this.setGridWidth();
      }
    // private resizeColumns() {
    //     let availableGridWidth = this.paginationRow.nativeElement.offsetWidth;
    //     let width = 0;
    //     let lastColumnwidth = 0;
    //     //let columnsAutosized = [];
    //     
    //     debugger;
        
    //     if  (this.columnApi != undefined) {
	// 		let sizableColumns = this.columnApi.getColumnState().map(e=>e.width);
    //         sizableColumns.forEach(e=>this.columnApi.setColumnWidth(e, e));
    //     }
    // }

    /**************************reset grid width based upon actual width and column width***************************************** */
    setGridWidth(){
        let girdNativeEl = this.gridDiv.nativeElement;
        let gridWidth = girdNativeEl.offsetWidth;
        let gridEl = girdNativeEl.getElementsByClassName('ag-center-cols-container');
        let gridHeaderRowEl = girdNativeEl.getElementsByClassName('ag-header-container');
       if(this.gridBodyContainerWidth< gridWidth){
        for (let i = 0; i < gridEl.length; i++) {
            gridEl.item(i).style.width = "100%";
            gridHeaderRowEl.item(i).children[0].style.width = "100%";
            // gridEl.item(i).classList.add('width--full');
            // gridHeaderRowEl.item(i).children[0].classList.add('width--full');
        }
    }    
}

    public onSelectionChanged(event) {
        this.rowsSelected = event.api.getSelectedRows();
        if (this.rowsSelected && this.rowSelection === 'single') {
            this.rowsSelected = this.rowsSelected[0];
        }
        this.btnDeletedDisabled = this.isRemvoedDisabled();
        this.rowClicked.emit(this.rowsSelected);
    }

    addRecord(gridOptions) {
        this.clearFilter();
        const column=this.gridOptions.columnDefs;
        let requiredFields = [];
       for(const col of column) {
           if(col["required"]) {
               requiredFields.push(col);
           }
       }
       
       for(const row of this.gridOptions.rowData) {
           for(const requiredField of  requiredFields) {
               if(row[requiredField.field]===undefined || row[requiredField.field]==='' || row[requiredField.field]===null ){
                   return;
               }
           }
       }
        let newRowData = {};
        if (this.onInsert && typeof this.onInsert === 'function') {
            newRowData = this.onInsert();
            if (!newRowData) {
                return;
            }
        }
        const res = this.gridOptions.api.applyTransaction({ add: [newRowData] });
        let index;
        let lastNode;
        if (res.add) {
            for (const node of res.add) {
                this.rowData.splice(node.rowIndex, 0, node.data);
                lastNode = node;
                index = node.rowIndex;
            }
        }
        this.rowsSelected = lastNode.data;
        lastNode.setSelected(true);
        this.gridOptions.api.clearFocusedCell();
        this.gridOptions.api.startEditingCell({
            rowIndex: index,
            colKey: this.agcoldefs[0].field
        });
        //this.columnApi.autoSizeColumn(this.agcoldefs[0].field);
        //this.resizeColumns();
        this.gridOptions.api.setFocusedCell(index,this.agcoldefs[0].field); 
        this.addedMap.set(this.calculateIndex(index), newRowData);
        this.updatePagination();
        if(this.gridOptions.rowData.length > 0 && !this.showPagination) {
            this.showPagination = true;
            this.showHidePaginationRecord("visible");
        }
        if(this.gridOptions.rowData.length ==1) {
            this.resizeColumns();
        }
        if(this.gridOptions.rowData.length > this.gridOptions.paginationPageSize) {
            this.onBtLast();
        }
        this.btnDeletedDisabled = this.isRemvoedDisabled();
        this.btnSavebtnDisable = this.isSaveDisabled();
        this.btnClearbtnDisable = this.isClearDisabled();
        this.mapsData.emit({ added: newRowData});
        this.enableFiltersAndSorts();
        setTimeout(() => {
            this.resizeColumns();
            this.setGridWidth();
        }, 100);
    }
    removeRecord(gridOptions) {
        this.clearFilter();
        const selectedData = this.gridOptions.api.getSelectedRows();
        let removeflag = true;
        if (this.onDelete) {
            removeflag = this.onDelete(selectedData);
        }
        if (removeflag) {
            for (let data of selectedData) {
                const index = this.calculateIndex(this.rowData.indexOf(data));
                if (this.addedMap.has(index)) {
                    this.addedMap.forEach(
                        (v: any, k: number) => {
                            if (k > index) {
                                this.addedMap.set(k - 1, v);
                            }
                        }
                    );
                    this.addedMap.delete(index);
                } else {
                    if (this.updatedMap.has(index)) {
                        this.updatedMap.delete(index);
                    }

                    if (this.initDataMap.has(index)) {
                        data = this.initDataMap.get(index);
                        this.initDataMap.delete(index);
                    }
                    this.removedMap.set(index, data);
                }
            }
            if (selectedData && selectedData.length > 0) {
                const res = this.gridOptions.api.applyTransaction({ remove: selectedData });
                let nextIndex = -1;
                if (res.remove) {
                    for (const node of res.remove) {
                        nextIndex = node.rowIndex;
                        this.rowData.splice(node.rowIndex, 1);
                    }
                }
                if (nextIndex >= 0) {
                    if (nextIndex >= this.rowData.length) {
                        nextIndex = this.rowData.length - 1;
                    }
                    if (nextIndex >= 0) {
                        this.gridOptions.api.getDisplayedRowAtIndex(nextIndex).setSelected(true);
                        this.gridOptions.api.setFocusedCell(nextIndex,this.agcoldefs[0].field);
                    }
                }
            }
            this.updatePagination();
        }
        this.btnDeletedDisabled = this.isRemvoedDisabled();
        this.btnSavebtnDisable = this.isSaveDisabled();
        this.btnClearbtnDisable = this.isClearDisabled();
        this.enableFiltersAndSorts();
    }

    calculateIndex(curIndex: number): number {
        let index = curIndex;
        const indexes = [];
        for (let i = 0; i < this.rowData.length; i++) {
            if (i !== index) {
                indexes[i] = i;
            } else {
                indexes[i] = -1;
            }
        }
        const removeKeys = Array.from(this.removedMap.keys());
        removeKeys.sort((a, b) =>  a - b );
        removeKeys.forEach((k: number) => {
            indexes.splice(k, 0, k);
        });
        for (let i = 0; i < indexes.length; i++) {
            if (indexes[i] === -1) {
                index = i;
            }
        }
        return index;
    }

    clearRecords(gridOptions) {
        let clearResult;
        if (this.onClear && typeof this.onClear === 'function') {
            clearResult = this.onClear();
            if (!clearResult) {
                return;
            }
        }
        this.clearFilter();
        if (this.removedMap.size > 0) {
            const removeKeys = Array.from(this.removedMap.keys());
            removeKeys.sort((a, b) =>  a - b );
            removeKeys.forEach((k: number) => {
                this.rowData.splice(k, 0, this.removedMap.get(k));
            });
            this.removedMap.clear();
        }
        if (this.addedMap.size > 0) {
            Array.from(this.addedMap.keys()).reverse().forEach(
                (k: number) => {
                    this.rowData.splice(k, 1);
                }
            );
            this.addedMap.clear();
        }
        if (this.initDataMap.size > 0) {
            this.initDataMap.forEach(
                (v: any, k: number) => {
                    this.rowData.splice(k, 1, v);
                }
            );
            this.initDataMap.clear();
            this.updatedMap.clear();
            this.updatedRows=[];
            this.pos=0;
        }
        this.updatePagination();
        gridOptions.api.setRowData(this.rowData);
        this.rowsSelected = undefined;
        this.btnDeletedDisabled = this.isRemvoedDisabled();
        this.btnSavebtnDisable = this.isSaveDisabled();
        this.btnClearbtnDisable = this.isClearDisabled();
        if (this.gridOptions && this.gridOptions.api) {
            this.gridOptions.api.clearFocusedCell();
        }
        this.enableFiltersAndSorts();
        this.clearedData.emit({cleared : this.addedMap});
        this.setGridWidth();
    }

    onSave(gridOptions) {
        this.clearFilter();
        this.btnSavebtnDisable = true;
        const added = [];
        this.addedMap.forEach((value) => { added.push(value); });
        const removed = [];
        this.removedMap.forEach((value) => { removed.push(value); });
        const updated = [];
        this.updatedMap.forEach((value) => { updated.push(value); });
        this.onCommit.emit({ added: added, updated: updated, removed: removed });
        this.btnClearbtnDisable = this.isClearDisabled();
        this.enableFiltersAndSorts();
        setTimeout(() => {
            this.resizeColumns();
            this.setGridWidth();
        }, 100);
    }

    onCellValueChanged(event) {
        let isSavable = true;
        const  coldefs = this.columnDefs.filter(element => {
            return element.field === event.colDef.field && element.nonSavable;
        });
        if (coldefs.length > 0) {
            isSavable = false;
        }
        this.btnSavebtnDisable = this.isSaveDisabled();
        if (event.oldValue !== event.newValue) {
            if (this.validateRow && typeof this.validateRow === 'function') {
                const eventdata = new ValidateRowEvent();
                eventdata.oldValue = event.oldValue;
                eventdata.newValue = event.newValue;
                eventdata.field = event.colDef.field;
                eventdata.data = event.data;
                const validrow: ValidateRowReturn = this.validateRow(eventdata);
                if (!isSavable) {
                    return;
                }
                if (validrow && validrow.validated) {
                    if (validrow.data) {
                        for (const property in validrow.data) {
                            if (validrow.data.hasOwnProperty(property) && event.data.hasOwnProperty(property)) {
                                event.node.setDataValue(property, validrow.data[property]);
                                if (event.data[property] !== validrow.data[property]) {
                                    event.data[property] = validrow.data[property];
                                }
                            }
                        }
                    }
                } else {
                    event.node.setDataValue(event.colDef.field, event.oldValue);
                    return;
                }
            }
            const index = this.calculateIndex(event.rowIndex);
            if (!this.addedMap.has(index)) {
                if (!this.initDataMap.has(index)) {
                    const colField = event.colDef.field;
                    const oldData = { ...event.data};
                    oldData[colField] = event.oldValue;
                    this.initDataMap.set(index, oldData);
                }
                if (!this.updatedMap.has(index)) {
                    this.updatedMap.set(index, event.data);
                    this.updatedRows[this.pos]=event.data;
                    ++this.pos;
                }
                let updatedCells = null;
                if (this.updatedCellsMap.has(index)) {
                    updatedCells = this.updatedCellsMap.get(index);
                } else {
                    updatedCells = new Set<string>();
                }
                updatedCells.add(event.colDef.field);
                this.updatedCellsMap.set(index, updatedCells);
                // const fcell = this.api.getFocusedCell();
                // this.api.redrawRows({ rowNodes: [event.node] });
                // this.api.setFocusedCell(fcell.rowIndex, fcell.column, fcell.floating);
                /*const params = {
                    force: true,
                    columns: [event.colDef.field]
                };
                setTimeout(function () {
                    this.api.refreshCells(params);
                }, 100);*/
            }
            this.btnSavebtnDisable = this.isSaveDisabled();
            this.btnClearbtnDisable = this.isClearDisabled();
        }
        this.updatePagination();
        this.updatedMapsData.emit({ updated: event.data});
    }

    onCellEditingStarted(event) {
        const index = this.calculateIndex(event.rowIndex);
        if (!this.initDataMap.has(index) && !this.addedMap.has(index)) {
            this.initDataMap.set(index, { ...event.data });
        }
        //this.columnApi.autoSizeColumn(event.colDef.field);
    }
    onCellEditingStopped(event) {
        const index = this.calculateIndex(event.rowIndex);
        if (!this.initDataMap.has(index) && !this.addedMap.has(index)) {
            this.initDataMap.set(index, { ...event.data });
        }
        //this.columnApi.autoSizeColumn(event.colDef.field);
    }
    isSaveDisabled(): boolean {
        return this.readonly || this.disabled || (this.addedMap.size === 0
            && this.removedMap.size === 0 && this.updatedMap.size === 0);
    }

    isClearDisabled(): boolean {
        return this.readonly || this.disabled || (this.addedMap.size === 0
            && this.removedMap.size === 0 && this.updatedMap.size === 0);
    }

    isRemvoedDisabled(): boolean {
        return this.readonly || this.disabled || (this.innerRowData && this.innerRowData.length === 0)
            || this.rowsSelected === null || this.rowsSelected === undefined;
    }

    onRowDataChanged(event) {
        //this.resizeColumns();
        this.updateSelection();
        this.resizeColumns();
        this.setGridWidth();
    }
    public setRowData(index: number, data: any) {
        const node = this.gridOptions.api.getDisplayedRowAtIndex(index);
        if (node) {
            node.setData(data);
        }
    }

    public setColumnData(colKey: string, index: number, data: any) {
        const node = this.gridOptions.api.getDisplayedRowAtIndex(index);
        if (node) {
            node.setDataValue(colKey, data);
        }
    }

    clearFilter() {
        try {
            if (this.gridOptions && this.gridOptions.api && this.columnDefs) {
                this.gridOptions.api.setFilterModel(null);
                this.columnDefs.forEach(column => {
                    if (column.datatype && column.datatype === 'select' || column.datatype === 'lov') {
                        const filterComponent = this.gridOptions.api.getFilterInstance(column.field);
                        filterComponent.setModel('selectAllFilter');

                    }
                });
            }
        } catch (e) {
            
        }
    }

    setColumnHeader(field: string, fieldName: string) {
        const col = this.gridOptions.columnApi.getColumn(field);
        if (col) {
            const colDef = col.getColDef();
            if (colDef) {
                colDef.headerName = fieldName;
                this.gridOptions.api.refreshHeader();
            }
        }
        // grid header hight increases as per <br> tag added
        if (this.gridOptions) {
        if (fieldName.includes('<br/>') || fieldName.includes('<br>')) {
            const numOfLine = fieldName.includes('<br/>') ? (fieldName.split('<br/>').length - 1 ) * 100 :
             (fieldName.split('<br>').length - 1 ) * 100;
             this.gridOptions.api.setHeaderHeight(numOfLine);
             //this.gridOptions.api.sizeColumnsToFit();
             //this.resizeColumns();
        }
        }
    }
    /**
     * Custom Pagination
     */
    setText(selector, text) {
        if(this.paginationRow) {
            this.paginationRow.nativeElement.querySelector(selector).innerHTML = text;
        }
    }
    
    setLastButtonDisabled(isDisabled) {
        if(this.paginationRow) {
            this.paginationRow.nativeElement.querySelector('#btLast').disabled = isDisabled;
        }
    }
    
    onBtFirst() {
        this.gridOptions.api.paginationGoToFirstPage();
    }
    
    onBtLast() {
        this.gridOptions.api.paginationGoToLastPage();
    }

    onBtNext() {
        this.gridOptions.api.paginationGoToNextPage();
    }

    onBtPrevious() {
        this.gridOptions.api.paginationGoToPreviousPage();
    }
    showHidePaginationRecord(value) {
        if(this.paginationRow) {
            this.paginationRow.nativeElement.querySelector("#paginationRecord").style.visibility = value;
        }
    }
    onPaginationChanged(event) {
        // Workaround for bug in events order
        if(this.gridOptions.rowData && this.gridOptions.rowData.length > 0) {
            this.showPagination = true;
            this.showHidePaginationRecord("visible");
        } else {
            this.showPagination = false;
            this.showHidePaginationRecord("hidden");
        }
        if (this.gridOptions.api && this.gridOptions.rowData && this.gridOptions.rowData.length > 0) {
            let totalRecords = this.gridOptions.rowData.length;
            let currentPage = this.gridOptions.api.paginationGetCurrentPage();
            let pagesize = this.gridOptions.paginationPageSize;
            let recordsFrom = currentPage*pagesize+1;
            let recordsTo = recordsFrom + pagesize-1;
            this.setText('#lbCurrent', currentPage + 1);
            this.setText('#lbTotal', this.gridOptions.api.paginationGetTotalPages());
            recordsTo = recordsTo>totalRecords?totalRecords:recordsTo;
            this.setText('#lbFirstRowOnPage', recordsFrom);
            this.setText('#lbLastRowOnPage', recordsTo);
            this.setText('#lbRecordCount', totalRecords);
            this.setLastButtonDisabled(!this.gridOptions.api.paginationIsLastPageFound());
        }
    }

    enableFiltersAndSorts() {

        /* if (this.gridOptions && this.gridOptions.api) {
            if(this.innerRowData && this.innerRowData.length > 0){
                this.agcoldefs.forEach(function(column) {
                    column['sortable'] = true;
                    column['filter'] = true;
                });
            }
            this.gridOptions.api.refreshHeader();
        } else {
            this.agcoldefs.forEach(function(column) {
                column['sortable'] = false;
                column['filter'] = false;
            });
            
        }
        setTimeout(() => {
            this.setGridWidth();  
        }, 500); */
    }
    
    focusGrid() {
        if ( !this.shiftTabPressed ) {
            this.clearFilter();
            const node = this.gridOptions.api.getDisplayedRowAtIndex( 0 );
            this.rowsSelected = node.data;
            node.setSelected( true );
            this.gridOptions.api.clearFocusedCell();
            if ( this.agcoldefs[0]['editable'] == false ) {
                for ( var i = 0; i < this.gridOptions.columnDefs.length; i++ ) {
                    if ( this.gridOptions.columnDefs[i]['editable'] == true ) {
                        let availableGridWidth = this.paginationRow.nativeElement.offsetWidth;
                        let columnWidth = this.columnApi.columnModel.autoWidthCalculator.getPreferredWidthForColumn(this.columnApi.getAllDisplayedColumns()[i]);
                        let width=0;
                        if(columnWidth==-1) {
                            columnWidth = this.columnApi.getAllDisplayedColumns()[i].getActualWidth();
                        } 
                        width = width + columnWidth;
                        if(width < availableGridWidth) {
                            this.api.sizeColumnsToFit();
                        }
                        this.gridOptions.api.setFocusedCell( 0, this.agcoldefs[i].field );
                        i = this.gridOptions.columnDefs.length + 1;
                    }
                }
            }else{
                this.gridOptions.api.setFocusedCell( 0, this.agcoldefs[0].field );
            }

        } else {
            this.shiftTabPressed = false;
            this.isLastColumnClicked=true;
            this.gridOptions.api.clearFocusedCell();
        }
    }
    
    
    onKeyDown( event ) {
        this.rowDataLength = this.gridOptions.api.getDisplayedRowCount();
        this.columnDataLength = this.gridOptions.columnApi.getAllColumns();
        const gridRowIndex = this.gridOptions.api.getFocusedCell();
        if ( event.shiftKey ) {
            if ( event.keyCode == 9 ) {
                if ( gridRowIndex == null || this.columnDataLength[0].colId === gridRowIndex.column.getColId() ) {
                    if ( !this.isLastColumnClicked ) {
                        this.shiftTabPressed = true;
                    } else {
                        this.isLastColumnClicked = false;
                    }
                    this.gridOptions.api.clearFocusedCell();
                }
            }
        } else if ( event.keyCode == 9 ) {
            if ( gridRowIndex != null ) {
                if ( this.rowDataLength >= gridRowIndex.rowIndex + 1 && this.columnDataLength[this.gridOptions.columnDefs.length - 1].colId === gridRowIndex.column.getColId() ) {
                    this.gridOptions.api.clearFocusedCell();
                }
            } else {
                this.gridOptions.api.clearFocusedCell();
            }
        }
    }
    suppressKeyboardEvent(params) {
        if (params.code == 'Tab' || params.key == 'Tab') {
            //this.gridOptions.api.forEachNode(node => node.rowIndex ? 0 : node.setSelected(true));
            if(this.gridOptions.columnDefs[this.gridOptions.columnDefs.length-1]['editable'] === false){
                for ( let i = 0; i < this.gridOptions.columnDefs.length; i++ ){
                    if(this.gridOptions.columnDefs[i]["displayas"] === "button"){
                        this.gridOptions.api.setFocusedCell(i,this.gridOptions.columnDefs[i]["displayas"]);
                        break;
                    }
                }
            }
        
      }
      if(params.keyCode == 65 && params.ctrlKey){
         
         if(this.paginationRow.nativeElement.getElementsByClassName('add-btn')[0]){
            this.addRecord(this.gridOptions);
         }
      }
      if(params.keyCode == 46 && params.ctrlKey){
        
        if(this.paginationRow.nativeElement.getElementsByClassName('delete-btn')[0]){
            this.removeRecord(this.gridOptions);
         }
      }
      if(params.keyCode == 27 || params.code == 'Escape' || params.key == 'Escape'){
        
        if(this.paginationRow.nativeElement.getElementsByClassName('cancel-btn')[0]){
            this.clearRecords(this.gridOptions);
        }
      }
      if(params.keyCode == 45 && params.ctrlKey){
        
        if(this.paginationRow.nativeElement.getElementsByClassName('save-btn')[0]){
            this.onSave(this.gridOptions);
        }
      }
    }
}
