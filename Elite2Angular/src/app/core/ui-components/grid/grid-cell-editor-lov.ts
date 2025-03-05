import {
    AfterViewInit, Component, ViewChild, ViewContainerRef, ChangeDetectorRef, OnDestroy
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable ,  of,  Subscription } from 'rxjs';
import { ReferenceDomainService } from '../lov/reference-domain.service';
import { LovService } from '../lov/lov.service';
import { MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { startWith, map, distinctUntilChanged } from 'rxjs/operators';
import { AgEditorComponent } from '@ag-grid-community/angular';


export interface OptionType {
    description: any;
    code: any;
}

@Component({
    selector: 'grid-cell-editor-lov',
    template: `
        <mat-form-field class="example-full-width" (keydown)="onKeyDown($event)">
            
            <input matInput type="text" #inputEle [required]="required" [(ngModel)]="inputObj" 
            [matAutocomplete]="auto" [formControl]="lovInputControl" (input)="onLovInputChange()" 
            [validOptions]="options" [nameFilter]="filterOptionsByName" (contextmenu)="onRightClick($event)"
            (focusout)="focusOut()">

            <mat-icon matSuffix (click)="openCloseAutocomplete($event)" class="s4-material-icons s4-menu-icon-grid">keyboard_arrow_down</mat-icon>

            <mat-autocomplete  #auto="matAutocomplete" [panelWidth]="totalWidth" [displayWith]="displayFn" 
                (opened)="panelOpened($event)" class="mat-body-1 s4-lov grid-cell-lov" (optionSelected)="onOptionChange()">
                <ul class="lov-vals">
                    <mat-option *ngIf="fontcss" class="lov-option-row pointer-none headerDesc">
                        <li [ngStyle]="getTitleStyle(key)">
                            <ng-template ngFor let-key [ngForOf]="objectKeys(titles)">
                                <span><strong>{{titles[key]}}</strong></span>
                            </ng-template>
                        </li>
                    </mat-option>
                    <mat-option *ngIf="!enableTitles && blankLov" #matOption>
                        <div class="lov-option-row" [style]="prepareWidths(matOption)">&nbsp;</div>
                    </mat-option>
                    <ng-template ngFor let-option let-idx="index" let-len="count" [ngForOf]="filteredOptions | async" >
                        <mat-option [value]="option">
                            <li>
                                <ng-template ngFor let-key [ngForOf]="objectKeys(titles)">
                                        <span>{{option[key]}}</span>
                                      <!-- [ngStyle]="getOptionStyle(key,idx,len)" -->
                                </ng-template>
                            </li>
                        </mat-option>
                    </ng-template>
                </ul>                 
            </mat-autocomplete>
            <mat-error *ngIf="lovInputControl.hasError('required') ">
                Select a value.
            </mat-error>
            <mat-error *ngIf="lovInputControl.hasError('validOption')">
                Select a value from the list.
            </mat-error>
        </mat-form-field>`,
    styleUrls: ['./grid-cell-editor-lov.scss']
})
export class GridCellEditorLoVComponent implements AgEditorComponent, AfterViewInit, OnDestroy {

    lovInputControl = new FormControl();
    inputObj: OptionType = { code : '', description: ''};
    completeData:any[];
    @ViewChild(MatAutocompleteTrigger, { read: MatAutocompleteTrigger,static: false }) autoTrigger: MatAutocompleteTrigger;
    @ViewChild( 'inputEle', { read: ViewContainerRef ,static : true} ) public inputView;
    inputCode:any;
    parentField:any;


    private params: any;
    private selectedCell: any;
    public required = false;
    subscription: Subscription;

    // The current value entered by the user
    private innerValue: any;

    // The last valid option (object) selected.
    private innerOption: any;
    private innerOptions: any = [];

    // to filter the values
    filteredOptions: Observable<any[]>;

    private innerDomain: string;
    private innerParent: string;
    private innerLink: string;

    optionClass: string;
    blankLov = true;
    innerTitles = { description: 'Description', code: 'Code' };

    enableTitles = false;

    titlesWidth: any;

    fontcss: string;

    objectKeys = Object.keys;

    totalWidth = 0;

    filterOptions: ( val: any, opts: any[] ) => any;

    sort:boolean = true;

    innerParentFields;

    constructor( private refCodeService: ReferenceDomainService,
        private lovOptionsService: LovService,
        private cd: ChangeDetectorRef ) {  
    }

    ngOnInit() {}

    onLovInputChange(){
        //this.sendAddressEvent.emit(this.inputObj);
    }

    focusOut() {
        setTimeout(() => {
            this.params.api.stopEditing();
        }, 500)
    }

    ngAfterViewInit() {
        setTimeout(() => {
            this.blankLov = false;
            this.inputView.element.nativeElement.focus();
            this.inputView.element.nativeElement.select();
        } );
    }

    agInit( params: any ): void {
        this.params = params;
        this.inputCode = params.value;
        if(this.inputCode && typeof this.inputCode === 'string'){
            this.inputCode = this.inputCode.trim();
        }
        const data = this.params.column.colDef;
        if ( data.required ) {
            this.required = data.required;
        }
        if ( data.parentField ) {
            this.parentField = data.parentField;
        }
        if ( data.titles ) {
            this.innerTitles = data.titles;
        }
        if ( data.domain ) {
            this.domain = data.domain;
        }
        if ( data.parent ) {
            this.parent = data.parent;
        }
        if ( data.link ) {
            this.link = data.link;
        }
        if ( data.parentFields ) {
            this.parentFields = data.parentFields;
        }
        // parentFieldObserval
        if ( data.parentFieldObserval ) {
            this.subscription = data.parentFieldObserval.subscribe( parentField => {
                this.updateOptions( parentField );
                this.selectedCell = this.params.api.getFocusedCell();
            } );
        }
        if ( data.codeTitle ) {
            this.innerTitles['code'] = data.codeTitle;
        }
        if ( data.descTitle ) {
            this.innerTitles['description'] = data.descTitle;
        }
        
        if( data.sort){
            this.sort = data.sort;
        }
       
        this.selectedCell = this.params.api.getFocusedCell();
    }


    getValue(): any {
        return this.value;
    }

    isPopup(): boolean {
        return false;
    }

    onKeyDown( event ): void {

        const key = event.which || event.keyCode;

        // Note: we do not want to capture the tab key.
        const isNavigationKey =
            key === 37 ||  // left
            key === 38 ||    // up
            key === 39 ||    // right
            key === 40 ||    // down
            key === 33 ||    // page up
            key === 34 ||    // page down
            key === 36 ||    // page home
            key === 35;

        if ( key === 9 || key === 13 ) {
            this.verifySelection();
        }

        if ( key === 13 ) {
            this.params.api.stopEditing();
            this.params.api.setFocusedCell( this.params.rowIndex,
                this.params.column.colDef.field );
        }

        if ( isNavigationKey ) {    // page end
            event.stopPropagation();
        }
    }

    // TODO: add logic to call this when editing the cell has finished. (currently this only works for keyboard events)
    // Set touched on blur
    verifySelection() {
        // Select the option if  the user has entered a partial string that
        // matches a single option. Otherwise clear the selection.
        if ( this.lovInputControl.value ) {
            // ignore if the value is an object<option>. This occurs when the
            // user selects an option from the dropdown.
            if ( !this.lovInputControl.value.code ) {
                const options = this.filterOptionsByName( this.lovInputControl.value, this.options );
                if ( options.length === 1 ) {
                    // exact match to a new option so select it.
                    this.option = options[0];
                } else {
                    //  clear the current selection (no than one option)
                    this.option = undefined;
                }
            }
        } else {
            // clear the current selection (user has cleared the field)
            this.option = undefined;
        }
    }

    onRightClick(event) {
        this.autoTrigger.closePanel();
        event.preventDefault(); /* this will disable default action of the context menu */
    }
    

    filterOptionsByName( name: any, opts: any[] ) {
        if ( this.filterOptions ) {
            return this.filterOptions( name, opts );
        } else {
            if ( name && typeof name === 'string' ) {
                name = name.toLowerCase();
            }
                        
            return opts.filter(option => {
                if(option && typeof option.code === 'string') {
                    return ((!option.hasOwnProperty('canDisplay') ||
                    (option.hasOwnProperty('canDisplay') && option['canDisplay'])) &&
                    ((option.description && ('' + option.description).toLowerCase().indexOf(name) === 0)
                            || option.code.toLowerCase().indexOf(name) === 0));
                } else {
                    return ((!option.hasOwnProperty('canDisplay') ||
                            (option.hasOwnProperty('canDisplay') && option['canDisplay'])) &&
                            ((option.description && ('' + option.description).toLowerCase().indexOf(name) === 0)
                                    || option.code === name));
                }
            });            
                        
                        
                        
            
        }
    }

    filterOptionsByCode( code: any ) {
        if ( this.filterOptions ) {
            return this.filterOptions( code, this.options );
        } else {
            if ( code && typeof code === 'string' ) {
                code = code.toLowerCase();
            }
            
            return this.options.filter(option => {
                if(option && typeof option.code === 'string') {
                    return (!option.hasOwnProperty('canDisplay') ||
                    (option.hasOwnProperty('canDisplay') && option['canDisplay']) &&
                    option.code.toLowerCase().indexOf(code) === 0);
                } else {
                   return (!option.hasOwnProperty('canDisplay') ||
                           (option.hasOwnProperty('canDisplay') && option['canDisplay']) &&
                           option.code === code); 
                }
            });
        }
    }

    filterOptionByValue( value: any ) {
        if ( value && typeof value === 'string' ) {
            value = value.toLowerCase();
        }
        return this.options.filter(option => {
            if(option.code && typeof option.code === 'string') {
                return option.code.toLowerCase().indexOf(value) === 0;
            } else {
                return option.code === value;
            }
            
        }
       );    
    }

    filterDisplayedItem() {
        this.verifySelection();
        return this.options.filter( option =>
            ( !option.hasOwnProperty( 'canDisplay' ) ||
                ( option.hasOwnProperty( 'canDisplay' ) && option['canDisplay'] ) ) );
    }

    // get accessor
    get value(): string {
        return this.innerValue;
    }

    // set accessor
    set value( v: string ) {
        if ( v !== this.innerValue ) {
            this.innerValue = v;
            if ( this.innerValue ) {
                const options = this.filterOptionByValue( this.innerValue );
                if ( options.length === 1 &&
                    options[0].code === this.innerValue ) {
                    // exact match to an option so select it.
                    this.option = options[0];
                }
            } else {
                // user has cleared the value so deselect the current option
                this.option = undefined;
            }
        }
        setTimeout(() => {
            this.params.columnApi.autoSizeColumn(this.params.colDef.field);
        }, 10);
    }

    get option(): any {
        return this.innerOption;
    }

    set option( v: any ) {
        if ( v !== this.innerOption ) {
            this.innerOption = v;
            if ( this.innerValue === this.innerOption ) {
                this.value = this.innerOption ? this.innerOption.code : undefined;
            } else if ( this.innerOption === undefined && this.innerValue ) {
                this.value = undefined;
            }
        }
    }

    // list of values in auto-complete
    get options(): any {
        return this.innerOptions;
    }

    set options( v: any ) {
        if ( v !== this.innerOptions ) {
            this.cd.markForCheck();
            this.innerOptions = v;
            this.filteredOptions = this.lovInputControl.valueChanges.pipe(distinctUntilChanged()).pipe(startWith( null ))
            .pipe(map( option => option ? this.filterOptionsByName( option, this.options ) : this.filterDisplayedItem() ));
            this.option = undefined;
            if ( this.innerValue === undefined && this.required) {
                if ( this.options.length === 1 ) {
                    this.displayFn( this.options[0] );
                }
            }
            if ( this.options ) {
                //this.titlesWidth = undefined;
                if ( this.innerValue && !this.option ) {
                    const optList = this.filterOptionByValue( this.innerValue );
                    const opts = optList.filter( element => {
                        return element.code === this.innerValue;
                    } );

                    if ( opts.length === 1 &&
                        opts[0].code === this.innerValue ) {
                        // exact match to an option so select it.
                        this.option = opts[0];
                    } else {
                        // user has cleared the value so deselect the current option
                        this.option = undefined;
                    }
                }
            }
        }
    }

    get domain() {
        return this.innerDomain;
    }

    set domain( v: string ) {
        if ( this.innerDomain !== v ) {
            this.innerDomain = v;
            this.option = undefined;
            this.updateOptions();
        }
    }

    get link() {
        return this.innerLink;
    }

    set link( v: string ) {
        if ( this.innerLink !== v ) {
            this.innerLink = v;
            this.updateOptions();
        }
    }

    get parent() {
        return this.innerParent;
    }

    set parent( v: string ) {
        if ( this.innerParent !== v ) {
            this.innerParent = v;
            this.option = undefined;
            this.updateOptions();
        }
    }

    get parentFields() {
        return this.innerParentFields;
    }

    set parentFields( v ) {
        if ( this.innerParentFields !== v ) {
            this.innerParentFields = v;
            this.option = undefined;
            this.updateOptions();
            // Changes to the parentField do not need to be monitored
            // here as the user is editing this field and not the parent
        }
    }

    get titles(): any {
        return this.innerTitles;
    }

    private updateOptions( updateParentField?): void {
        // Priority of supplied parameters:
        //    1. link
        //    2. domain & parentField
        //    3. domain & parent
        //    4. domain

        // ??? Will this cause a memory leak since we are not unsubscribing ???
        if ( this.link ) {
            if ( !updateParentField && (this.parentField || this.parentFields)) {
                if(this.parentFields) {
                    this.parentFields.forEach(obj => {
                        this.innerLink = this.link.replace(':'+obj,this.params.node.data[obj]);
                    })
                } else {
                    this.innerLink = this.link + this.params.node.data[this.parentField];
                }
            }
            if ( updateParentField ) {
                this.innerLink = this.link + updateParentField;
            }

            this.lovOptionsService.getOptions( this.link ).subscribe( options => {
                this.completeData = options;
                this.getSelectedOption();
                this.options = options;

                this.filteredOptions = this.lovInputControl.valueChanges.pipe(distinctUntilChanged()).pipe(startWith( null ))
                .pipe(map( option => option ? this.filterOptionsByName( option, this.options ) : this.filterDisplayedItem() ));
                
                if ( this.innerValue && !this.option ) {
                    const opts = this.filterOptionByValue( this.innerValue );
                    if ( opts.length === 1 &&
                        opts[0].code === this.innerValue ) {
                        // exact match to an option so select it.
                        this.option = opts[0];
                    } else {
                        // user has cleared the value so deselect the current option
                        this.option = undefined;
                    }
                }
                
                if(this.sort){
                    this.sortApply();
                }
            });
        } 
        else if ( this.domain ) {
            let parentDomain;
            if ( this.parentField ) {
                parentDomain = this.params.node.data[this.parentField];
                if ( !parentDomain ) {
                    // the parent field has not been set so do not try to load the child options
                    this.options = [];
                    this.filteredOptions = this.lovInputControl.valueChanges.pipe(distinctUntilChanged()).pipe(startWith( null ))
                    .pipe(map( option => option ? this.filterOptionsByName( option, this.options ) : this.filterDisplayedItem() ));
                    return;
                }
            } 
            else if ( this.parent ) {
                parentDomain = this.innerParent;
            }
            this.refCodeService.getRefCodes( this.innerDomain, parentDomain ).subscribe( options => {
                this.completeData = options;
                this.getSelectedOption();
                this.options = options;
                this.filteredOptions = this.lovInputControl.valueChanges.pipe(distinctUntilChanged()).pipe(startWith( null ))
                .pipe(map( option => option ? this.filterOptionsByName( option, this.options ) : this.filterDisplayedItem() ));
                if ( this.innerValue && !this.option ) {
                    const opts = this.filterOptionByValue( this.innerValue );
                    if ( opts.length === 1 &&
                        opts[0].code === this.innerValue ) {
                        // exact match to an option so select it.
                        this.option = opts[0];
                    } else {
                        // user has cleared the value so deselect the current option
                        this.option = undefined;
                    }
                }
                if(this.sort){
                    this.sortApply();
                }
            } );
        } 
        else {
            this.options = [];
            this.completeData = [];
            this.filteredOptions = this.lovInputControl.valueChanges.pipe(distinctUntilChanged()).pipe(startWith( null ))
            .pipe(map( option => option ? this.filterOptionsByName( option, this.options ) : this.filterDisplayedItem() ));
        } 
    }


    sortApply(){
        this.filteredOptions.subscribe(val => {
          if(val.length > 1){
            this.filteredOptions = this.sortOptions(val);
          }
          else{
            this.filteredOptions = of(val);
          }
        });  
    }

    sortOptions(records): Observable<any>{
        let firstPriority = 'listSeq';
        let firstLovColumn = Object.keys(this.innerTitles)[0];
        let secondPriority = firstLovColumn ? firstLovColumn : 'description';
        let withSeqArr = [];
        let withoutSeqArr = [];
        for (let s = 0; s < records.length; s++) {
            if (records[s][firstPriority]) {
                withSeqArr.push(records[s])
            }
            else {
                withoutSeqArr.push(records[s])
            }
        }

        withSeqArr.sort((option1: any, option2: any) => {
            if (option1[firstPriority] > option2[firstPriority]) {
                return 1;
            }
            if (option1[firstPriority] < option2[firstPriority]) {
                return -1;
            }
            if (option1[firstPriority] == option2[firstPriority]) {
                if (option1[secondPriority] > option2[secondPriority]) {
                    return 1;
                }
                if (option1[secondPriority] < option2[secondPriority]) {
                    return -1;
                }
                return 0;
            }
        });
        
        withoutSeqArr.sort((option1: any, option2: any) => {
            if (option1[secondPriority] > option2[secondPriority]) {
                return 1;
            }
            if (option1[secondPriority] < option2[secondPriority]) {
                return -1;
            }
            return 0;
        });

        let finalArr = withSeqArr.concat(withoutSeqArr);
        return of(finalArr);
    }

    calculateTextWidth( value: string ) {
        const canvas = document.createElement( 'canvas' );
        const ctx = canvas.getContext( '2d' );
        ctx.font = this.fontcss;
        return ctx.measureText( value ).width;
    }

    createFontCss( element: any ) {
        const size = window.getComputedStyle( element._element.nativeElement, '' ).getPropertyValue( 'font-size' );
        const fontFamily = window.getComputedStyle( element._element.nativeElement, '' ).getPropertyValue( 'font-family' );
        if ( size ) {
            this.fontcss = size + ' ' + fontFamily;
        } else {
            this.fontcss = this.lovOptionsService.fontDetails;
        }
    }

    prepareWidths( element: any ) {
        if ( element && this.titlesWidth ) {
            return;
        }
        if ( element && !this.fontcss ) {
            this.createFontCss( element );
        }
        if ( this.fontcss ) {
            this.titlesWidth = {};
            if ( this.innerTitles ) {
                this.objectKeys( this.innerTitles ).forEach(
                    key => {
                        let width = this.calculateTextWidth( this.innerTitles[key] );
                        width = Math.ceil( width );
                        if ( !this.titlesWidth[key] ) {
                            this.titlesWidth[key] = width;
                        } else if ( this.titlesWidth[key] < width ) {
                            this.titlesWidth[key] = width;
                        }
                    }
                );
            }
            if ( this.options ) {
                this.options.forEach( ele => {
                    this.objectKeys( ele ).forEach(
                        key => {
                            let width = this.calculateTextWidth( ele[key] );
                            width = Math.ceil( width );
                            if ( !this.titlesWidth[key] ) {
                                this.titlesWidth[key] = width;
                            } else if ( this.titlesWidth[key] < width ) {
                                this.titlesWidth[key] = width;
                            }
                        }
                    );
                } );
            }
            if ( this.titlesWidth ) {
                this.totalWidth = 0;
                this.objectKeys( this.titlesWidth ).forEach( key => {
                    this.totalWidth += this.titlesWidth[key];
                } );
            }
        }
    }


    getTitleStyle( key: string ): any {
        if ( this.enableTitles && this.titlesWidth ) {
            const width = this.titlesWidth[key] + 'px';

            return {
                'flex': '0 0 ' + width,
                'max-width': width,
                'min-width': width,
            }
        } else {
            return {}
        }
    }

    getOptionStyle( key: string, index: number, size: number ): any {
        let result = {};

        if ( this.titlesWidth ) {
            const width = this.titlesWidth[key] + 'px';

            result = {
                'flex': '0 0 ' + width,
                'max-width': width,
                'min-width': width
            }
        }

        if ( !this.enableTitles && index == size - 1 ) {
            setTimeout(() => {
                this.enableTitles = true;
            }, 100 );
        }
        return result;
    }

    panelOpened( event ) {
        if ( this.parentField && typeof this.link === 'string' && this.link != null ) {
            this.link = this.link.replace( this.params.node.data[this.parentField], '' );
            this.autoTrigger.openPanel();
        } else {
            this.updateOptions();
            this.autoTrigger.openPanel();
        }
    }

    openCloseAutocomplete( evt ) {
        if ( this.autoTrigger.autocomplete.isOpen === false ) {
            if ( this.parentField && typeof this.link === 'string' && this.link != null ) {
                this.link = this.link.replace( this.params.node.data[this.parentField], '' );
                evt.stopPropagation();
                this.autoTrigger.openPanel();
            } else {
                this.updateOptions();
                evt.stopPropagation();
                this.autoTrigger.openPanel();
            }
        }
        else {
            evt.stopPropagation();
            this.autoTrigger.closePanel();
        }
    }

    ngOnDestroy() {
        if ( this.subscription ) {
            this.subscription.unsubscribe();
        }
    }

    onOptionChange(){
        this.params.api.stopEditing();
        this.params.api.tabToNextCell();
    }

    getSelectedOption(): void {
        const selectedOption = this.completeData.find( obj => obj.code === this.inputCode );
        if ( selectedOption ) {
            if(this.params.column.colDef.lovRender){
                this.inputObj.code = selectedOption.code;
                this.inputObj.description = selectedOption[this.params.column.colDef.lovRender];
            }
            else{
                this.inputObj.code = selectedOption.code;
                this.inputObj.description = selectedOption.description;
            }
            setTimeout(() => {
                this.params.columnApi.autoSizeColumn(this.params.colDef.field);
            }, 10); 
        } 
    }


    displayFn = ( sel ) => {
        if ( sel ) {
            this.option = sel;
            this.value = sel.code;
        }
        return sel ? sel.description : sel;
    }

}

