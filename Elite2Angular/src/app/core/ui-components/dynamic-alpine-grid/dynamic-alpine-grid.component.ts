import { Router } from '@angular/router';
import { UiCustomizeService } from '@core/service/ui-customize.service';
import { Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output, ViewChild } from '@angular/core';
import { AllModules, GridApi, GridOptions, GridSizeChangedEvent, CellKeyDownEvent, SuppressKeyboardEventParams, TabToNextCellParams, CellPosition } from '@ag-grid-enterprise/all-modules';
import { TranslateService } from '@common/translate/translate.service';
import { LovService } from '../lov/lov.service';
import { GridFilterCheckboxComponent } from '../grid/grid-filter-checkbox';
import { GridCellRenderCheckboxComponent } from '../grid/grid-cell-render-checkbox';
import { GridCellEditorDateComponent } from '../grid/grid-cell-editor-date';
import { GridCellRenderDateComponent } from '../grid/grid-cell-render-date';
import { GridFilterDateComponent } from '../grid/grid-filter-date';
import { GridCellEditorEmailComponent } from '../grid/grid-cell-editor-email';
import { GridCellRenderHyperlinkComponent } from '../grid/grid-cell-render-hyperlink';
import { GridCellEditorCheckboxComponent } from '../grid/grid-cell-editor-checkbox';
import { GridCellRenderCheckboxLinkComponent } from '../grid/grid-cell-render-checkboxlink';
import { GridCellRenderLaunchbuttonComponent } from '../grid/grid-cell-render-launchbutton';
import { GridCellRenderLoVComponent } from '../grid/grid-cell-render-lov';
import { GridCellEditorLoVComponent } from '../grid/grid-cell-editor-lov';
import { GridFilterLovComponent } from '../grid/grid-filter-lov';
import { GridCellEditorNumberComponent } from '../grid/grid-cell-editor-number';
import { GridCellRenderNumberComponent } from '../grid/grid-cell-render-number';
import { GridCellEditorPhoneComponent } from '../grid/grid-cell-editor-phone';
import { GridCellRenderPhoneComponent } from '../grid/grid-cell-render-phone';
import { GridCellEditorTextboxComponent } from '../grid/grid-cell-editor-textbox';
import { GridCellEditorPasswordComponent } from '../grid/grid-cell-editor-password';
import { GridCellRenderSelectboxComponent } from '../grid/grid-cell-render-selectbox';
import { GridCellEditorSelectboxComponent } from '../grid/grid-cell-editor-selectbox';
import { GridFilterSelectboxComponent } from '../grid/grid-filter-selectbox';
import { GridCellImageComponent } from '../grid/grid-cell-image';
import { GridCellRenderTimeComponent } from '../grid/grid-cell-render-time';
import { GridCellTooltipComponent } from '../grid/grid-cell-tooltip';
import { GridCellEditorTimeComponent } from '../grid/grid-cell-editor-time';
import { GridFilterTimeComponent } from '../grid/grid-filter-time';
import { GridCellRenderDateTimeComponent } from '../grid/grid-cell-render-dateTime';
import { GridCellRenderMonthYearComponent } from '../grid/grid-cell-render-month-year';
import { GridCellEditorMonthYearComponent } from '../grid/grid-cell-editor-month-year';
import { GridCellRenderPasswordComponent } from '../grid/grid-cell-render-password';
import { DateFormat } from '../datepicker/dateFormat';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { TimeFormat } from '../time/timeFormat';
import { GridPinnedEmptyRenderer } from '../grid/grid-pinned-empty-renderer';
import { DialogService } from '../dialog/dialog.service';
import { GridCellRenderTextboxComponent } from '../grid/grid-cell-render-textbox';

export type RowSelection = 'single' | 'multiple';

export type ColDataType = 'checkbox' | 'checkbox-link' | 'date' | 'email' | 'hyperlink' | 'launchbutton' | 'lov'
  | 'number' | 'phone' | 'text' | 'password' | 'select' | 'image' | 'time' | 'dateTime' | 'monthYear' | 'custom' | 'default';

export class ValidateRowEvent {
  oldValue: any;
  newValue: any;
  field: string;
  data: any;
  rowIndex: number;
}

export class ValidateRowReturn {
  validated: boolean;
  data: any;
}

const noop = () => {
};


@Component({
  selector: 's4-dynamic-grid',
  templateUrl: './dynamic-alpine-grid.component.html',
  styleUrls: ['./dynamic-alpine-grid.component.scss']
})

export class DynamicAlpineGridComponent implements OnInit{
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
  @Input() public columnDefs: any[] = [];
  // represents row selection single/multiple
  @Input() public rowSelection: RowSelection = 'single';
  // represents row height
  public rowHeight: number;
  // represents grid (table) height
  public gridHeight = '400px';
  // represents grid width
  public gridWidth = '100%';
  // for pagination true/false
  @Input() hidePagination = false;
  // represents pagination size
  public paginationPageSize = this.uiCustomizeService.gridConfig && this.uiCustomizeService.gridConfig.pagType? +this.uiCustomizeService.gridConfig.pagType : 10;
  // represents enableColResize true/false
  public enableColResize = true;
  // represents header height
  public headerHeight: number;
  @Input() public enableInsert = false;
  @Input() public enableDelete = false;
  @Input() public enableUpdate = false;
  @Input() public allowEdit = false;
  @Input() public enableQuickFilter = false;
  // Indicates that the action to save is triggered outside the grid (i.e. by the form)
  @Input() public externalSave = false;
  @Input() onDelete: (row: any) => any;
  @Input() onInsert: () => any;
  @Input() onClear: () => any;
  @Output() onCommit: EventEmitter<any> = new EventEmitter<any>();
  @Input() validateRow: (event: ValidateRowEvent) => any;
  // represents row clicked event
  @Output() rowClicked: EventEmitter<any> = new EventEmitter<any>();
  @Output() cellClicked: EventEmitter<any> = new EventEmitter<any>();
  @Output() rowDoubleClicked: EventEmitter<any> = new EventEmitter<any>();
  @Output() mapsData: EventEmitter<any> = new EventEmitter<any>();
  @Output() updatedMapsData: EventEmitter<any> = new EventEmitter<any>();
  @Output() clearedData: EventEmitter<any> = new EventEmitter<any>();
  // editStart and editStop output events
  @Output() editStart: EventEmitter<any> = new EventEmitter<any>();
  @Output() editStop: EventEmitter<any> = new EventEmitter<any>();
  @Output() cellKeyDownOutputEvent: EventEmitter<any> = new EventEmitter<any>();
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
  domLayout: any;

  agcoldefs: any[] = [];
  private gridApi: GridApi;
  private gridColumnApi;
  private addedMap: Map<number, any>;
  private removedMap: Map<number, any>;
  private updatedMap: Map<number, any>;
  private updatedCellsMap: Map<number, Set<string>>;
  private initDataMap: Map<number, any>;
  private sortModel = [];
  private rowsSelected: any;
  private updatedRows = [];
  private pos: number = 0;
  @Input() quickFilterPlaceHolder = 'Search Table...';
  paginationSizeList = [
                {"code":5, "description":5},{"code":10, "description":10},
                {"code":15, "description":15},{"code":20, "description":20},
                {"code":25, "description":25},{"code":50, "description":50},{"code":100, "description":100}];
  @ViewChild('paginationRow', { read: ElementRef, static: true }) paginationRow: ElementRef;
  @ViewChild('gridDiv', { read: ElementRef, static: true }) gridDiv: ElementRef;
  showPagination: boolean = false;
  selectedCell: any;
  private shiftTabPressed = false;
  private rowDataLength: any;
  private columnDataLength: any;
  private styleClass = " ";

  isLastColumnClicked: boolean = false;
  gridActualWidth;
  gridBodyContainerWidth;
  isGridLoaded: boolean;

  public modules = AllModules;
  public defaultColDef;
  public statusBar;
  public popupParent;
  public postProcessPopup;
  searchValue:any;
  isFirstBtnDisabled: boolean;
  isLastBtnDisabled: boolean;
  originalData = [];
  allColumnIds = [];
  gridEditMode = false;

  rowColorConfiguration = this.uiCustomizeService.gridConfig && this.uiCustomizeService.gridConfig.rowWarningColor ? this.uiCustomizeService.gridConfig.rowWarningColor : '#FF0000';
  rowFontWeightConfiguration = this.uiCustomizeService.gridConfig && this.uiCustomizeService.gridConfig.rowWarningFontWeight ? this.uiCustomizeService.gridConfig.rowWarningFontWeight : 'normal';
  rowColor:string;
  @Input() rowHighlight: (rD: object) => void;
  getRowStyle;


  cellColorConfiguration = this.uiCustomizeService.gridConfig && this.uiCustomizeService.gridConfig.cellWarningColor ? this.uiCustomizeService.gridConfig.cellWarningColor : '#FF0000';
  cellFontWeightConfiguration = this.uiCustomizeService.gridConfig && this.uiCustomizeService.gridConfig.cellWarningFontWeight ? this.uiCustomizeService.gridConfig.cellWarningFontWeight : 'normal';
  @Input() cellHighlight: (cell: string, rD: object) => void;
  getCellStyle;

  constructor(public translateService: TranslateService,
    private lovService: LovService,public uiCustomizeService: UiCustomizeService,
    private router: Router, private sessionManager: UserSessionManager, private dialog: DialogService) {
    this.addedMap = new Map();
    this.removedMap = new Map();
    this.updatedMap = new Map();
    this.updatedCellsMap = new Map();
    this.initDataMap = new Map();
    this.gridOptions = <GridOptions>{
      pagination: true,
      floatingFilter: (this.uiCustomizeService && this.uiCustomizeService.gridConfig && this.uiCustomizeService.gridConfig.filterType == '2'),
      paginationPageSize: this.uiCustomizeService.gridConfig && this.uiCustomizeService.gridConfig.pagType? +this.uiCustomizeService.gridConfig.pagType : 10,
      animateRows: true,
      singleClickEdit: false,
      suppressPaginationPanel: true,
      accentedSort : true,
      suppressPropertyNamesCheck : true
    };
    this.gridOptions.rowClass = 'middle';
    this.gridOptions.getContextMenuItems = (params) => this.getContextMenuItems(params);
    this.domLayout = 'autoHeight';
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
    this.gridOptions.autoSizePadding = 25; // Add 16 pixels for the menu icon (S4-3034)
    // this.agcoldefs = {
    //     autoHeight: true,
    //   };
    this.isGridLoaded = false;
    this.defaultColDef = {
      flex: 1,
      enableRowGroup: true,
      enablePivot: true,
      enableValue: true,
      sortable: true,
      filter: true,
      resizable: true,
      wrapText: false,
      autoHeight: false,
      tooltipComponent: GridCellTooltipComponent,
      floatingFilter: (this.uiCustomizeService && this.uiCustomizeService.gridConfig && this.uiCustomizeService.gridConfig.filterType == '2')
    };
    this.postProcessPopup = function (params) {
      if (params.type !== 'columnMenu') {
        return;
      }
      let firstTabEle = params.ePopup.__agComponent.items[0].eHeaderButton;
      setTimeout(() => {
          if(firstTabEle.classList.length === 1){
            firstTabEle.click()
          } 
      }, 0); 
    }
  }

  keyEvent(e: KeyboardEvent) {
    // focusing on first cell of first grid using control+q shorkey
    if (e.code === "KeyQ" && e.ctrlKey) {
      const agCellNoFiocusArray = document.activeElement.tagName;
      if (agCellNoFiocusArray !== "AG-GRID-ANGULAR" && agCellNoFiocusArray !== "DIV") {
        this.gridOptions.api.setFocusedCell(0, this.agcoldefs[0].field);
      }
    }
  }

  @HostListener('document:click', ['$event'])
  onClick(event: Event) {
    const eventTargetEl = event.target as HTMLElement;
    if (eventTargetEl.classList.contains("ag-header-icon") || eventTargetEl.classList.contains("ag-icon-menu")) {
      const gridFliterLovTag = document.getElementsByTagName('grid-filter-lov');
      if (gridFliterLovTag.length > 0) {
        for (let i = 0; i < gridFliterLovTag.length; i++) {
          gridFliterLovTag.item(i).parentElement.parentElement.parentElement.parentElement.style.minHeight = "300px";
        }
      }
    }
  }

  clearMaps() {
    this.addedMap.clear();
    this.removedMap.clear();
    this.updatedMap.clear();
    this.updatedCellsMap.clear();
    this.initDataMap.clear();
    this.updatedRows = [];
    this.pos = 0;
  }

  showAllButton : boolean = true; 
  ngOnInit() {
    this.handleRowStyle();
    this.handleCellStyle();
    this.prepareAgColumnDef();
    this.btnDeletedDisabled = this.isRemvoedDisabled();
    this.btnSavebtnDisable = this.isSaveDisabled();
    this.btnClearbtnDisable = this.isClearDisabled();
    
    // this.resizeColumns();
    
    if (this.sessionManager && this.sessionManager.isSessionValied()) {
        if (this.sessionManager.userRoles) {
            let url : string = this.router.url;
            if(url.indexOf("?")>0) {
               url = url.split("?")[0];
            }
            if (url.startsWith('/')) {
               url = url.substring(1);
            }
            const currentCaseLoadIdObj = this.sessionManager.caseLoads.filter(e => e.caseloadId === this.sessionManager.currentCaseLoad );
            let screenRole = this.sessionManager.userRoles.roles[url];
            if((currentCaseLoadIdObj[0] && currentCaseLoadIdObj[0].updateAllowedFlag === 'N') || screenRole !== 'full') {
                this.showAllButton =  false;
            } else {
                this.showAllButton = true;
            }
        }
    }
  }

  ngAfterViewInit() {
    if (this.gridOptions && this.gridOptions.api) {
      this.gridOptions.api.clearFocusedCell();
      this.gridOptions.api.setHeaderHeight(40);
      this.gridOptions.rowHeight = 40;
      setTimeout(() => {
        this.setGridWidth();
      }, 500);
    }
  }
  
    onFilterTextBoxChanged(){
       this.gridOptions.api.setQuickFilter(this.searchValue);
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
    let agcoldefs = [];
    let headerSet = new Set();
    if (this.columnDefs) {
      // this.columnDefs.forEach(e => {
      //   const textWdth = this.getTextWidth(e.fieldName);
      //   if (textWdth < 70) {
      //     e.width = 100;
      //   } else {
      //     e.width = textWdth;
      //   }
      //   if (e.datatype === "date") {
      //     e.width = 150;
      //   }
      //   if (e.datatype === "launchbutton") {
      //     e.width = 100;
      //   }
      //   if (e.fieldName === "") {
      //     e.width = 100;
      //   }
      //   if (e.datatype === "checkbox") {
      //     e.width = 100;
      //   }
      //   if (e.field === "goButtonOne") {
      //     e.width = 180;
      //   }
      //   if(e.fieldName && e.fieldName.indexOf('*') !== -1){
      //     e.fieldName= e.fieldName.replace('*','');
      //     e.required = true;
      //   }
      //   if (e.datatype === "default") {
      //     e.width = 180;
      //   }
      // });
      for (const col of this.columnDefs) {
        let agcol = {};
        // col.autoHeight = true;
        //col.wrapText = true;
        agcol['headerName'] = col.fieldName;
        agcol['field'] = col.field;
        if(col.externalColumn) {
          agcol['externalColumn'] = true;
        }
        if(col.wrapText){
          agcol['autoHeight'] = true;
          agcol['wrapText'] = true;
        }
        agcol['wrapText'] = col.wrapText;

        if(col.headerGroup){
          headerSet.add(col.headerGroup);
          agcol['headerGroup'] = col.headerGroup;
        }
        if(col.columnGroupShow){ // 'open' | 'closed'
          agcol['columnGroupShow'] = col.columnGroupShow;
        }
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
        if (col.cellVisible) {
          agcol['cellVisible'] = col.cellVisible;
        }

        agcol['coltype']= col.datatype;
        agcol = this.addEditableData(col, agcol, canEdit);
        if (col.width) {
          agcol['width'] = col.width;
        }
        // hide property for columns
        agcol['hide'] = col.hide ? col.hide : false;
        
        // nonSavable property column
        if (col.nonSavable) {
          agcol['nonSavable'] = col.nonSavable;
        }
        agcol['cellStyle'] = this.getCellStyle;
        if (col.sort && col.sortIndex) {
          this.sortModel.push({ colId: col.field, sort: col.sort, sortIndex: col.sortIndex });
        }
        else if(col.sort){
          this.sortModel.push({ colId: col.field, sort: col.sort });
        }
        agcol['resizable '] = true;
        // agcol['cellClass'] = this.getCellClass;
        agcoldefs.push(agcol);

      }
      if ( headerSet.size > 0 ) {
        let agcoldefsWithOutGroup = [];
        headerSet.forEach(header => {
          let agObj = {headerName : header, children : []};
          let children = agcoldefs.filter(agcol => agcol['headerGroup'] === header);
          agObj.children = children;
          this.agcoldefs.push(agObj);
        });
        agcoldefsWithOutGroup = agcoldefs.filter(agcol => !agcol['headerGroup']);
        this.agcoldefs = this.agcoldefs.concat(agcoldefsWithOutGroup);
        
      } else {
        this.agcoldefs = agcoldefs;
      }
    } else {
      throw Error('column definitions required.');
    }
  }
  onProcessCellCallback = (params) => {
    var value = params.value;
    if(params.column.getColDef()['coltype'] == 'lov'){
      let colDef = params.column.getColDef();
      value = colDef.getQuickFilterText(params);
    }
    else if(params.column.getColDef()['coltype'] == 'date'){
      if (value && !(value instanceof Date)) {
        value = DateFormat.getDate(value);
      }
      value = DateFormat.format(value);
    }
    else if(params.column.getColDef()['coltype'] == 'time'){
      if (value && !(value instanceof Date)) {
        value = DateFormat.getDate(value);
      }
      if (value && value instanceof Date) {
        value = TimeFormat.format(value);
      }
    }
    else if(params.column.getColDef()['coltype'] == 'dateTime'){
      var cellDate = '';
      var time = '';
      if (value && !(value instanceof Date)) {
        value = DateFormat.getDate(value);
      }
      cellDate = DateFormat.format(value);
      if (value && value instanceof Date) {
        time = TimeFormat.format(value);
      }
      value = cellDate + ' ' + time;
    }
    return value;
  }
  exportAsExcel(exportMode?:any, fileName?: any): void {
    this.gridApi.exportDataAsExcel({
      exportMode: exportMode,
      fileName: fileName,
      columnKeys: this.getExportedColumns(),
      processCellCallback: (params) => this.onProcessCellCallback(params)
    })
  }
  exportAsCsv(fileName?: any): void {
    this.gridApi.exportDataAsCsv({
      fileName: fileName,
      columnKeys: this.getExportedColumns(),
      processCellCallback: (params) => this.onProcessCellCallback(params)
    })
  }
  getExportedColumns(){
    return this.gridColumnApi
      .getAllColumns()
      .map(column => ((column.colDef.externalColumn || !column.colDef.hide) && !['hyperlink','launchbutton'].includes(column.colDef.coltype)) && column.getColId());
  }

  getTextWidth(text) {
    // re-use canvas object for better performance
    var canvas = document.createElement("canvas");
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

  @Output() rowDataChange: EventEmitter<any> = new EventEmitter<any>();
  @Input()
  set rowData(data: any[]) {
    this.columnDefs.forEach(col => {
      if(col.datatype == "launchbutton"){
        data.forEach(row => {
          if(!row[col.field]) {
            row[col.field] = '...';
          }
        })
      }
      if(col.hide == true){
        data.forEach(row => {
          if(!row[col.field]) {
            row[col.field] = '';
          }
        })
      }
    });
    this.innerRowData = data;
    this.originalData = JSON.parse(JSON.stringify(data));
    this.clearMaps();
    this.clearFilter();
    this.btnSavebtnDisable = this.isSaveDisabled();
    this.btnDeletedDisabled = this.isRemvoedDisabled();
    this.btnClearbtnDisable = this.isClearDisabled();
    if (this.gridOptions && this.gridOptions.api) {
      this.gridOptions.api.clearFocusedCell();
      this.gridOptions.api.setHeaderHeight(42);
      this.gridOptions.rowHeight = 42;
      this.setGridWidth();
    }
    this.gridOptions && this.gridOptions.api && this.gridOptions.api.paginationGoToFirstPage();
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

  @Input()
  set rowHighlightColor(color: string) {
    this.rowColor = color;
  }

  handleRowStyle() {
    let ref = this;
    if(!this.rowColor){
      this.rowColor = this.rowColorConfiguration;
    }
    this.getRowStyle = function (params) {
      if (ref.isRowHighlight(params.node.data)) {
        return { color: ref.rowColor, fontWeight: ref.rowFontWeightConfiguration }
      }
      return { color: '', fontWeight: '' };
    }
  }

  isRowHighlight(row) {
    if (this.rowHighlight && typeof this.rowHighlight === 'function') {
      let isColor = this.rowHighlight(row);
      return isColor;
    }
    return false;
  }


  handleCellStyle() {
    let ref = this;
    this.getCellStyle = function (params) {
      if (ref.isCellHighlight(params.colDef.field,params.data)) {
        return { color: ref.cellColorConfiguration, fontWeight: ref.cellFontWeightConfiguration }
      }
      return { color: '', fontWeight: '' };
    }
  }

  isCellHighlight(cell, rowData) {
    if (this.cellHighlight && typeof this.cellHighlight === 'function') {
      let isStyle = this.cellHighlight(cell,rowData);
      return isStyle;
    }
    return false;
  }

  rowDoubleClickedEvent(event) {
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
  get pinnedBottomRowData(): any[] {
    return this.innerpinnedBottomRowData;
  }
  // pinned Bottom Row Data
  @Input()
  set pinnedBottomRowData(pinnedData) {
    if (this.gridApi) {
      this.gridApi.setPinnedBottomRowData(pinnedData);
    }
    this.innerpinnedBottomRowData = pinnedData;
  }


  private updateSelection() {
    if (this.gridOptions.api) {
      if (typeof this.innerSelected === 'number' && this.innerSelected >= 0) {
        this.gridOptions.api.deselectAll();
        this.gridOptions.api.clearFocusedCell();
        const node = this.gridOptions.api.getRowNode(this.innerSelected.toString());
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
      else if(this.innerSelected == undefined || this.innerSelected.length == 0){
        this.gridOptions.api.forEachNode(node => {
          if(node.rowIndex == null || node.rowIndex == undefined || node.rowIndex == 0){
            const firstNode = this.gridOptions.api.getRowNode('0');
            if (firstNode) {
              firstNode.setSelected(true);
            }
          }
        });
      }
      if(this.gridOptions.api.getSelectedRows().length > 0){
        this.onRowClicked();
      }
    }
  }

  addEditableData(col, agcol, canEdit: boolean) {
    let celledit, cellrender, cellfilter;
    let filter = true;
    // const filterparams;
    switch (col.datatype) {
      case 'checkbox':
        {
          cellrender = GridCellRenderCheckboxComponent;
          this.frameworkComponents['checkboxfilter'] = GridFilterCheckboxComponent;
          this.frameworkComponents['checkboxEmptyRenderer'] = GridPinnedEmptyRenderer;
          if (!col.showPinData) {
            agcol['pinnedRowCellRenderer'] = 'checkboxEmptyRenderer';
          }
          cellfilter = 'checkboxfilter';
          if (col.required) {
            agcol['required'] = col.required;
          }
          if (col.editable) {
            agcol['isCheckboxEditable'] = col.editable;
            agcol['editable'] = false;
          }
          if(agcol.cellEditable){
            agcol['isCheckboxEditableCallback'] = agcol.cellEditable;
            delete agcol.cellEditable;
          } 
          if(agcol.cellVisible){
            agcol['isCheckboxVisibleRuntime'] = agcol.cellVisible;
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
          agcol['getQuickFilterText'] =  function( params) { 
            var cellDate = params.value;
            var time;
            var date;
            if (cellDate) {
              cellDate = DateFormat.getDate(cellDate);
              date= DateFormat.format(cellDate);
            }
           
            return date;
         }
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
            agcol['cellClass'] = 'hyperlinkCellOf'+col.displayas;
          }
          if (col.queryparam) {
            agcol['queryparam'] = col.queryparam;
          }
          if (col.typeValue) {
            agcol['typeValue'] = col.typeValue;
          }
          if (col.linkField) {
              agcol['linkField'] = col.linkField;
          }
          if (col.styleClass) {
            agcol['styleClass'] = col.styleClass;
          }
          if (col.hyperLinkText) {
            agcol['hyperLinkText'] = col.hyperLinkText;
          }
          if (col.onLaunchClick) {
            agcol['onLaunchClick'] = col.onLaunchClick;
          }
          if (col.parentField) {
            agcol['parentField'] = col.parentField;
          }
          if (col.lovUrl) {
            agcol['lovUrl'] = col.lovUrl;
          }
          if (col.displayFields) {
            agcol['displayFields'] = col.displayFields;
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
          if (col.styleClass) {
            agcol['styleClass'] = col.styleClass;
          }
          this.frameworkComponents['checkboxfilter'] = GridFilterCheckboxComponent;
          this.frameworkComponents['checkboxEmptyRenderer'] = GridPinnedEmptyRenderer;
          if (!col.showPinData) {
            agcol['pinnedRowCellRenderer'] = 'checkboxEmptyRenderer';
          }
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
          if (col.parentField) {
            agcol['parentField'] = col.parentField;
          }
          if (col.lovUrl) {
            agcol['lovUrl'] = col.lovUrl;
          }
          if (col.displayFields) {
            agcol['displayFields'] = col.displayFields;
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
            if (col.parentField || col.parentFields) {
              this.lovService.clearStartWith(col.link);
            } else {
              this.lovService.clear(col.link);
            }
          }
          if (col.domain) {
            agcol['domain'] = col.domain;
          }
          if (col.source) {
            agcol['source'] = col.source;
          }
          if (col.sourceDomain) {
            agcol['sourceDomain'] = col.sourceDomain;
          }
          if (col.parent) {
            agcol['parent'] = col.parent;
          }
          if (col.parentField) {
            agcol['parentField'] = col.parentField;
          }
          if (col.parentFields) {
            agcol['parentFields'] = col.parentFields;
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
          if (col.sort) {
            agcol['sort'] = col.sort;
          }
          if(col.lovRender){
            agcol['lovRender'] = col.lovRender;
          }
          this.frameworkComponents['lovfilter'] = GridFilterLovComponent;
          cellfilter = 'lovfilter';
          agcol['getQuickFilterText'] =  ( params) => { 
            let defaultLovFilter = params.column.colDef.lovRender ? params.column.colDef.lovRender : 'description';
            let options = [];
            let instance = params.api.getFilterInstance(params.column.colId);
            if(instance.options){
              options = instance.options
            }
            else{
              let parentLink;
              if(params.column.getColDef().parentField && params.node.data[params.column.getColDef().parentField]){ // "eventType"
                parentLink = instance.link + params.node.data[params.column.getColDef().parentField] // APP
              }
              let mapArr = instance.lovOptionsService.data;
              mapArr.forEach(function(v,k){
                if( parentLink && k == parentLink){
                  options = v;
                }
                else if(options.length == 0 && k.includes(instance.link)){
                  options = v;
                }
              })
            }
            let finalLovVal = options.filter(element =>  element.code===params.value)[0]?.description; 
            return finalLovVal; 
         }
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
          if (col.restrictCharacters) {
            agcol['restrictCharacters'] = col.restrictCharacters;
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
          cellrender = GridCellRenderTextboxComponent;

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
          if (col.maxWidth) {
            agcol['maxWidth'] = col.maxWidth;
          }
          if (col.renderLength) {
            agcol['renderLength'] = col.renderLength;
          }
          if (col.restrictCharacters) {
            agcol['restrictCharacters'] = col.restrictCharacters;
          }
          break;
        }
      case 'password':
        {
          celledit = GridCellEditorPasswordComponent;
          cellrender = GridCellRenderPasswordComponent;
          //cellfilter = 'agNumberColumnFilter';
          if (col.maxlength) {
            agcol['maxlength'] = col.maxlength;
          }
          if (col.required) {
            agcol['required'] = col.required;
          }
          if (col.styleClass) {
            agcol['styleClass'] = col.styleClass;
          }
          if (col.maxWidth) {
            agcol['maxWidth'] = col.maxWidth;
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
          agcol['getQuickFilterText'] =  function( params) { 
            var cellDate = params.value;
            var time;
            var date;
            if (cellDate && !(cellDate instanceof Date)) {
              cellDate = DateFormat.getDate(cellDate);
            }
            date= DateFormat.format(cellDate);
            if (cellDate && cellDate instanceof Date) {
              time=TimeFormat.format(cellDate);
              }
            return date + time;
         }
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
          if (col.uppercase) {
            agcol['uppercase'] = col.uppercase;
          }
          break;
        }
        case 'default':
          {
            filter = false;
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
    if (col.tooltip) {
        agcol['tooltipField'] = col.field;
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
    if (col.required) {
      agcol['headerClass'] = 'header-col';
    }
    if (col.displayas === 'image'){
      agcol['headerClass'] = 'align-center';
      agcol['cellClass'] = 'align-center';
    }
    if (col.displayas === 'href' && col.datatype === 'hyperlink'){
      agcol['cellClass'] = 'hyperLinkText';
    }
    else if (col.displayas === 'image' && col.datatype === 'hyperlink'){
      agcol['cellClass'] = 'hyperLinkImage';
    }
    if (col.datatype === 'number'){
      // agcol['headerClass'] = 'ag-align-left';
      agcol['cellClass'] = 'ag-align-left';
    }
    /*if (filterparams) {
        agcol['filterParams'] = filterparams;
    }*/
    if(col.suppressMenu){
      agcol['suppressMenu'] = true;
    }
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
    if (!(time1 instanceof Date)) {
      time1 = DateFormat.getDate(time1);
    }
    if (!(time2 instanceof Date)) {
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
    if (!(date1 instanceof Date)) {
      date1 = DateFormat.getDate(date1);
    }
    if (!(date2 instanceof Date)) {
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
        case 'password':
          {
            celledit = GridCellEditorPasswordComponent;
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
        case 'text':
          {
            cellrender = GridCellRenderTextboxComponent;
            break;
          }
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
        case 'password':
          {
            cellrender = GridCellRenderPasswordComponent;
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
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    if (this.sortModel && this.sortModel.length > 0) {
      this.gridColumnApi.applyColumnState({ state: this.sortModel });
    }
    this.gridColumnApi.getAllColumns().forEach((column) => {
      this.allColumnIds.push(column.colId);
    });
    this.popupParent = this.gridDiv.nativeElement.parentElement;
  }
  onGridSizeChanged(params: GridSizeChangedEvent) {
    this.gridColumnApi.autoSizeColumns(this.allColumnIds, false);
    this.setGridWidth();
  }

  onColumnResized(params) {
    this.setGridWidth();
  }

  /**************************reset grid width based upon actual width and column width***************************************** */
  setGridWidth() {
    let girdNativeEl = this.gridDiv.nativeElement;
    let gridWidth = girdNativeEl.offsetWidth;
    let gridEl = girdNativeEl.getElementsByClassName('ag-center-cols-container');
    let gridHeaderRowEl = girdNativeEl.getElementsByClassName('ag-header-container');
    if (this.gridBodyContainerWidth < gridWidth) {
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
    this.clearSorting();
    const column = this.gridOptions.columnDefs;
    let requiredFields = [];
    for (const col of column) {
      if (col["required"]) {
        requiredFields.push(col);
      }
    }

    for (const row of this.gridOptions.rowData) {
      for (const requiredField of requiredFields) {
        if (row[requiredField.field] === undefined || row[requiredField.field] === '' || row[requiredField.field] === null) {
          // return;
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
    this.columnDefs.forEach(col => {
      if (col.datatype == "launchbutton") {
        if (!newRowData[col.field]) {
          newRowData[col.field] = '...';
        }
      }
      if(col.hide == true){
          if(!newRowData[col.field]) {
            newRowData[col.field] = '';
          }
      }
    });
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
    //this.gridColumnApi.autoSizeColumn(this.agcoldefs[0].field);
    //// this.resizeColumns();
    this.gridOptions.api.setFocusedCell(index, this.agcoldefs[0].field);
    this.addedMap.set(this.calculateIndex(index), newRowData);
    if (this.gridOptions.rowData.length > 0 && !this.showPagination) {
      this.showPagination = true;
      this.showHidePaginationRecord("visible");
    }
    if (this.gridOptions.rowData.length > this.gridOptions.paginationPageSize) {
      this.onBtLast();
    }
    this.btnDeletedDisabled = this.isRemvoedDisabled();
    this.btnSavebtnDisable = this.isSaveDisabled();
    this.btnClearbtnDisable = this.isClearDisabled();
    this.mapsData.emit({ added: newRowData });
    this.refreshGridSize();
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
            nextIndex = node.childIndex;
            this.rowData.splice(node.childIndex, 1);
          }
        }
        if (nextIndex >= 0) {
          if (nextIndex >= this.rowData.length) {
            nextIndex = this.rowData.length - 1;
          }
          if (nextIndex >= 0) {
            if(this.gridOptions.api.getDisplayedRowAtIndex(nextIndex)){
              this.gridOptions.api.getDisplayedRowAtIndex(nextIndex).setSelected(true);
            }
            this.gridOptions.api.setFocusedCell(nextIndex, this.agcoldefs[0].field);
          }
        }
      }
    }
    this.btnDeletedDisabled = this.isRemvoedDisabled();
    this.btnSavebtnDisable = this.isSaveDisabled();
    this.btnClearbtnDisable = this.isClearDisabled();
    
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
    removeKeys.sort((a, b) => a - b);
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
      removeKeys.sort((a, b) => a - b);
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
    // if (this.initDataMap.size > 0) {
      // this.originalData.forEach(
      //   (v: any, k: number) => {
      //     // this.rowData.forEach((obj,index)=>{
      //       // if( k === index){
      //         this.rowData.splice(k, 1, v);
      //         // }
      //         // })
      //         /*  if(this.rowData.indexOf(v) >=0){
      //           this.rowData.splice(k, 1, v);
      //         } */
              
      //     }
      //   );
      this.rowData.splice(0, this.rowData.length); // Remove all present records
      this.rowData = this.rowData.concat(this.originalData); // Add the original data to grid
      this.initDataMap.clear();
      this.updatedMap.clear();
      this.updatedRows = [];
      this.pos = 0;
    
    gridOptions.api.setRowData(this.rowData);
    this.rowDataChange.emit(this.rowData);
    this.rowsSelected = undefined;
    this.btnDeletedDisabled = this.isRemvoedDisabled();
    this.btnSavebtnDisable = this.isSaveDisabled();
    this.btnClearbtnDisable = this.isClearDisabled();
    if (this.gridOptions && this.gridOptions.api) {
      this.gridOptions.api.clearFocusedCell();
      this.gridOptions.api.clearRangeSelection();
    }
    
    this.clearedData.emit({ cleared: this.addedMap });
    this.refreshGridSize();
  }

  onSave(gridOptions) {
    this.gridApi.clearFocusedCell();
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
    
    setTimeout(() => {
      // this.resizeColumns();
      this.setGridWidth();
    }, 100);
  }

  onCellValueChanged(event) {
    let isSavable = true;
    const coldefs = this.columnDefs.filter(element => {
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
        eventdata.rowIndex = event.rowIndex;
        const validrow: ValidateRowReturn = this.validateRow(eventdata);
        if (!isSavable) {
          return;
        }
        if (validrow && validrow.validated) {
          if (validrow.data) {
            for (const property in validrow.data) {
              var column = this.gridColumnApi.getPrimaryColumns();
              if(column==null && validrow.data.hasOwnProperty(property) && event.data.hasOwnProperty(property) ){
                if (event.data[property] !== validrow.data[property]) {
                  event.data[property] = validrow.data[property];
                }
            }
              if (validrow.data.hasOwnProperty(property) && event.data.hasOwnProperty(property) 
                  && column != null) {
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
          const oldData = { ...event.data };
          oldData[colField] = event.oldValue;
          this.initDataMap.set(index, oldData);
        }
        if (!this.updatedMap.has(index)) {
          this.updatedMap.set(index, event.data);
          this.updatedRows[this.pos] = event.data;
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
        // const fcell = this.gridApi.getFocusedCell();
        // this.gridApi.redrawRows({ rowNodes: [event.node] });
        // this.gridApi.setFocusedCell(fcell.rowIndex, fcell.column, fcell.floating);
        /*const params = {
            force: true,
            columns: [event.colDef.field]
        };
        setTimeout(function () {
            this.gridApi.refreshCells(params);
        }, 100);*/
      }
      this.btnSavebtnDisable = this.isSaveDisabled();
      this.btnClearbtnDisable = this.isClearDisabled();
    }
    this.updatedMapsData.emit({ updated: event.data, index : event.rowIndex});
  }

  onCellKeyDown(e: CellKeyDownEvent) {
    if (this.gridEditMode) {
      let startingValue = e.value;
      let latestValue = (e.event.target as HTMLInputElement).value;
      if(latestValue && startingValue !== latestValue) {
        this.btnSavebtnDisable = false;
      }
    }
    let row = JSON.parse(JSON.stringify(e.node.data));
    row[e.colDef.field] = (e.event.target as HTMLInputElement).value;
    this.cellKeyDownOutputEvent.emit({cellField : e.colDef.field, rowIndex: e.rowIndex, rowData: row, colType: e.colDef["coltype"], isSaveButtonDisable : this.btnSavebtnDisable});
  }

  onCellEditingStarted(event) {
    this.editStart.emit({ rowData: event.data, rowIndex: event.rowIndex, cellField: event.colDef.field });
    this.gridEditMode = true;
    const index = this.calculateIndex(event.rowIndex);
    if (!this.initDataMap.has(index) && !this.addedMap.has(index)) {
      this.initDataMap.set(index, { ...event.data });
    }
    //this.gridColumnApi.autoSizeColumn(event.colDef.field);
  }
  onCellEditingStopped(event) {
    this.editStop.emit({ rowData: event.data, rowIndex: event.rowIndex, cellField: event.colDef.field });
    this.gridEditMode = false;
    const index = this.calculateIndex(event.rowIndex);
    if (!this.initDataMap.has(index) && !this.addedMap.has(index)) {
      this.initDataMap.set(index, { ...event.data });
    }
    //this.gridColumnApi.autoSizeColumn(event.colDef.field);
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
    //// this.resizeColumns();
    this.updateSelection();
    // this.resizeColumns();
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
          this.searchValue = '';
          this.gridOptions.api.setQuickFilter(this.searchValue);
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
        const numOfLine = fieldName.includes('<br/>') ? (fieldName.split('<br/>').length - 1) * 100 :
          (fieldName.split('<br>').length - 1) * 100;
        this.gridOptions.api.setHeaderHeight(numOfLine);
        //this.gridOptions.api.sizeColumnsToFit();
        //// this.resizeColumns();
      }
    }
  }
  /**
   * Custom Pagination
   */
  setText(selector, text) {
    if (this.paginationRow) {
      this.paginationRow.nativeElement.querySelector(selector).innerHTML = text;
    }
  }

  setLastButtonDisabled(isDisabled) {
    if (this.paginationRow) {
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
    if (this.paginationRow) {
      this.paginationRow.nativeElement.querySelector("#paginationRecord").style.visibility = value;
    }
  }
  onPaginationChanged(event) {
    // Workaround for bug in events order
    if (this.gridOptions.rowData && this.gridOptions.rowData.length > 0) {
      this.showPagination = true;
      this.showHidePaginationRecord("visible");
    } else {
      this.showPagination = false;
      this.showHidePaginationRecord("hidden");
    }
    if (this.gridOptions.api && this.gridOptions.rowData && this.gridOptions.rowData.length > 0) {
      let totalRecords = this.gridOptions.api.getDisplayedRowCount() ? this.gridOptions.api.getDisplayedRowCount() : this.gridOptions.rowData.length;
      let currentPage = this.gridOptions.api.paginationGetCurrentPage();
      let pagesize = this.gridOptions.paginationPageSize;
      let recordsFrom = currentPage * pagesize + 1;
      let recordsTo = recordsFrom + pagesize - 1;
      recordsTo = recordsTo > totalRecords ? totalRecords : recordsTo;
      this.setText('#lbFirstRowOnPage', recordsFrom);
      this.setText('#lbLastRowOnPage', recordsTo);
      this.setText('#lbRecordCount', totalRecords);
      if(this.gridOptions.api.getDisplayedRowCount() === 0){
        this.setText('#lbFirstRowOnPage', 0);
        this.setText('#lbLastRowOnPage', 0);
        this.setText('#lbRecordCount', 0);
      }
      // this.setLastButtonDisabled(this.gridOptions.api.paginationIsLastPageFound());
      this.isLastBtnDisabled = ( this.gridOptions.api.paginationGetCurrentPage() + 1 === this.gridOptions.api.paginationGetTotalPages() );
      this.isFirstBtnDisabled = this.gridOptions.api.paginationGetCurrentPage() === 0;
    }
  }

  updatePaginationSize() {
    this.gridApi && this.gridApi.paginationSetPageSize(this.paginationPageSize);
  }
  onKeyDown(event) {
    this.rowDataLength = this.gridOptions.api.getDisplayedRowCount();
    this.columnDataLength = this.gridOptions.columnApi.getAllColumns();
    const gridRowIndex = this.gridOptions.api.getFocusedCell();
    if (event.shiftKey) {
      if (event.keyCode == 9) {
        if (gridRowIndex == null || this.columnDataLength[0].colId === gridRowIndex.column.getColId()) {
          if (!this.isLastColumnClicked) {
            this.shiftTabPressed = true;
          } else {
            this.isLastColumnClicked = false;
          }
          this.gridOptions.api.clearFocusedCell();
        }
      }
    } else if (event.keyCode == 9) {
      if (gridRowIndex != null) {
        if (this.rowDataLength >= gridRowIndex.rowIndex + 1 && this.columnDataLength[this.gridOptions.columnDefs.length - 1].colId === gridRowIndex.column.getColId()) {
          this.gridOptions.api.clearFocusedCell();
        }
      } else {
        this.gridOptions.api.clearFocusedCell();
      }
    }
  }
  

  suppressKeyboardEvent(params) {

    if(params.keyCode == 32 && params.code == 'Space' && params.target.children[0] && params.target.children[0].nodeName == 'GRID-CELL-RENDER-CHECKBOX'){
      let gridCellRenderCheckbox = params.target.getElementsByTagName("input")[0];
      gridCellRenderCheckbox.click();
      params.stopPropagation();
    }

    if (params.code == 'Tab' || params.key == 'Tab') {
      //this.gridOptions.api.forEachNode(node => node.rowIndex ? 0 : node.setSelected(true));
      if (this.gridOptions.columnDefs[this.gridOptions.columnDefs.length - 1]['editable'] === false) {
        for (let i = 0; i < this.gridOptions.columnDefs.length; i++) {
          if (this.gridOptions.columnDefs[i]["displayas"] === "button") {
            this.gridOptions.api.setFocusedCell(i, this.gridOptions.columnDefs[i]["displayas"]);
            break;
          }
        }
      }

    }
    if (params.keyCode == 65 && params.ctrlKey) {
      
      if (this.paginationRow.nativeElement.getElementsByClassName('add-btn')[0]) {
        this.addRecord(this.gridOptions);
      }
    }
    if (params.keyCode == 46 && params.ctrlKey) {
      
      if (this.paginationRow.nativeElement.getElementsByClassName('delete-btn')[0]) {
        this.removeRecord(this.gridOptions);
      }
    }
    if (params.keyCode == 27 || params.code == 'Escape' || params.key == 'Escape') {
      
      if (this.paginationRow.nativeElement.getElementsByClassName('cancel-btn')[0]) {
        this.clearRecords(this.gridOptions);
      }
    }
    if (params.keyCode == 45 && params.ctrlKey) {
      
      if (this.paginationRow.nativeElement.getElementsByClassName('save-btn')[0]) {
        this.onSave(this.gridOptions);
      }
    }
  }
  
  getContextMenuItems(params) {
    let isAccessable = false;
  	let isSourceAccessable = false;
    let sourceDomain = params.column.colDef.sourceDomain;
	  if(this.sessionManager.userRoles.roles['OCDLEGLO'] === 'full' || this.sessionManager.userRoles.roles['OUMSYPFL'] === 'full' || this.sessionManager.userRoles.roles['OUMSYPFL'] === 'read') {
	      isAccessable = true;
	  }
	  if(this.sessionManager.userRoles.roles[params.column.colDef.source] === 'full' || this.sessionManager.userRoles.roles[params.column.colDef.source] === 'read') {
	        isSourceAccessable = true;
	  }
    const router = this.router;
    const dialog = this.dialog;
    if(isAccessable && params.column.colDef.filter === 'lovfilter' && params.column.colDef.domain){
      var result = [
        {
          name: 'Domain : ' + params.column.colDef.domain,
          disabled: true,
          cssClasses: ['context-menu-custom'],
        },
        {
          name: 'Manage',
          action: function () {
            dialog.dialog.closeAll();
            if(params.column.colDef.domain) {
            	router.navigate(["OUMRCODE"], { queryParams: { domain: params.column.colDef.domain } });
            } else if(params.column.colDef.source) {
            	router.navigate([params.column.colDef.source]);
            }
          },
        },'separator','copy','copyWithHeaders','paste','separator',
        {
          name: 'Export',
          subMenu: [
            {
              name: 'CSV Export',
              action: ()=>this.exportAsCsv(),
            },
            {
              name: 'Excel Export (.xlsx)',
              action: ()=>this.exportAsExcel('xlsx'),
            },
            {
              name: 'Excel Export (.xml)',
              action: ()=>this.exportAsExcel('xml'),
            }
          ]
        }
      ];
      return result;
    }
    // IF LOV HAD SOURCE &  SOURCEdOMAIN BOTH
    else if(isSourceAccessable && params.column.colDef.filter === 'lovfilter' &&  params.column.colDef.source && sourceDomain) {
      var result1 = [
        {
          name: 'Source : ' + params.column.colDef.source,
          disabled: true,
          cssClasses: ['context-menu-custom'],
        },
        {
          name: 'Source Domain : ' + params.column.colDef.sourceDomain,
          disabled: true,
          cssClasses: ['context-menu-custom'],
        },
        {
          name: 'Manage',
          action: function () {
            dialog.dialog.closeAll();
            if(params.column.colDef.source && params.column.colDef.sourceDomain) {
              router.navigate([params.column.colDef.source], { queryParams: { domain: params.column.colDef.sourceDomain } });
            } else if(params.column.colDef.source && !params.column.colDef.sourceDomain) {
              router.navigate([params.column.colDef.source]);
            }
          },
        },'separator','copy','copyWithHeaders','paste','separator',
        {
          name: 'Export',
          subMenu: [
            {
              name: 'CSV Export',
              action: ()=>this.exportAsCsv(),
            },
            {
              name: 'Excel Export (.xlsx)',
              action: ()=>this.exportAsExcel('xlsx'),
            },
            {
              name: 'Excel Export (.xml)',
              action: ()=>this.exportAsExcel('xml'),
            }
          ]
        }
      ];
      return result1;
    }  
    else if(isSourceAccessable && params.column.colDef.filter === 'lovfilter' &&  params.column.colDef.source && !sourceDomain) {
      	var result1 = [
	        {
	          name: 'Source : ' + params.column.colDef.source,
	          disabled: true,
	          cssClasses: ['context-menu-custom'],
	        },
	        {
	          name: 'Manage',
	          action: function () {
	            dialog.dialog.closeAll();
	            if(params.column.colDef.source) {
	            	router.navigate([params.column.colDef.source]);
	            }
	          },
	        },'separator','copy','copyWithHeaders','paste','separator',
          {
            name: 'Export',
            subMenu: [
              {
                name: 'CSV Export',
                action: ()=>this.exportAsCsv(),
              },
              {
                name: 'Excel Export (.xlsx)',
                action: ()=>this.exportAsExcel('xlsx'),
              },
              {
                name: 'Excel Export (.xml)',
                action: ()=>this.exportAsExcel('xml'),
              }
            ]
          }
      	];
      	return result1;
    } else {
      return ['copy','copyWithHeaders','paste','separator',
      {
        name: 'Export',
        subMenu: [
          {
            name: 'CSV Export',
            action: ()=>this.exportAsCsv(),
          },
          {
            name: 'Excel Export (.xlsx)',
            action: ()=>this.exportAsExcel('xlsx'),
          },
          {
            name: 'Excel Export (.xml)',
            action: ()=>this.exportAsExcel('xml'),
          }
        ]
      }
    ];
    }
  }

  requiredOn(colName) {
    this.gridApi.getColumnDef(colName).headerClass = 'header-col';
    this.gridApi.refreshHeader();
  }

  requiredOff(colName) {
    if(this.gridApi.getColumnDef(colName).headerClass){
      this.gridApi.getColumnDef(colName).headerClass = this.gridApi.getColumnDef(colName).headerClass.toString().replace('header-col','');
      this.gridApi.refreshHeader();
    }
  }

  suppressSpaceKey = (params: SuppressKeyboardEventParams) => {
    var KEY_SPACE = ' ';
    var event = params.event;
    var key = event.key || event.code == "Space";
    var suppress = key === KEY_SPACE;
    return suppress;
  }
  selectOnEnter() {
    let rowIndex = 0;
    if (this.gridOptions.api.getFocusedCell() == null || this.gridOptions.api.getFocusedCell() == undefined) {
      rowIndex = this.innerSelected;
    }
    else {
      rowIndex = this.gridOptions.api.getFocusedCell().rowIndex;
    }
    var rowNode = this.gridOptions.api.getDisplayedRowAtIndex(rowIndex);
    if(rowNode){
      rowNode.setSelected(true);
    }
  }
  onRowClicked(){
    this.selectOnEnter();
    this.rowsSelected = this.gridOptions.api.getSelectedRows();
    if (this.rowsSelected && this.rowSelection === 'single') {
      this.rowsSelected = this.rowsSelected[0];
    }
    this.btnDeletedDisabled = this.isRemvoedDisabled();
    this.rowClicked.emit(this.rowsSelected);
  }
  customEnableDisable(ev){
    if (ev.key == "Enter" && ev.keyCode === 13){
      this.clickHyperlinkImageOnEnter(ev);
      this.onRowClicked();
    }
  }
  
  clearSorting() {
    if (this.gridColumnApi) {
      this.gridColumnApi.applyColumnState({
        defaultState: { sort: null },
      });
    }
  }

  setFocusToHyperlinkImageOnTabPress(nextCell){
    setTimeout(() => {
      this.gridOptions.api.setFocusedCell(nextCell.rowIndex, nextCell.column);
    },0);
  }

  tabToNextCell = (param: TabToNextCellParams): CellPosition => {
    if(param.editing){
      let nextCell = param.nextCellPosition;
      if(nextCell && nextCell.column.getColDef().cellClass == 'hyperLinkImage'){
        this.setFocusToHyperlinkImageOnTabPress(nextCell);
        return null
      }
    }
    return param.nextCellPosition;
  };

  clickHyperlinkImageOnEnter(e) {
    if (e && e.target && e.target.classList && e.target.classList.length > 0) {
      const classArr = [...e.target.classList];
      if (classArr.includes('hyperLinkImage')) {
        let image = e.target.getElementsByTagName("s4-image")[0];
        if (image) {
          image.click();
        }
      }
    }
  }

  refreshGridSize() {
    var eGridDiv = this.gridDiv.nativeElement;
    if (eGridDiv) {
      let size = '99%';
      eGridDiv.style.setProperty('width', size);
      setTimeout(() => {
        eGridDiv.style.removeProperty('width');
      }, 0);
    }
  }

  
}
