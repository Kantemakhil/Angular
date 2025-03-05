import { Router } from '@angular/router';
import {
    Component, Input, OnInit, forwardRef,
    ViewChild, Output, EventEmitter, AfterViewInit,ElementRef, ChangeDetectionStrategy, ChangeDetectorRef, HostListener, OnChanges, SimpleChanges
} from '@angular/core';
import { FormControl, NgModel } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map, distinctUntilChanged } from 'rxjs/operators';
// import { LovProvider } from './lov-provider';
// import { MatAutocompleteTrigger,MatAutocomplete } from '@angular/material';
import { MatAutocompleteTrigger,MatAutocomplete } from '@angular/material/autocomplete';

import {
    NG_VALUE_ACCESSOR,
    ControlValueAccessor
} from '@angular/forms';
import { ReferenceDomainService } from "./reference-domain.service";
import { LovService } from "./lov.service";
import { MatMenuTrigger } from '@angular/material/menu';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { MatDialog } from '@angular/material/dialog';

export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => LovComponent),
    multi: true
};

const noop = () => {
};

@Component({
    selector: 's4-lov',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './lov.component.html',
    styleUrls: ['./lov.component.scss'],
    providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR]
})
export class LovComponent implements ControlValueAccessor, OnInit, AfterViewInit,OnChanges {

    // Pull the control from the template instead of creating manually. 
    inputControl = new FormControl('');
    @ViewChild('autoTrigger' ,{static : true}) autoTrigger: MatAutocompleteTrigger;
    @ViewChild('autCompleteDropDown', { read: ElementRef, static : true }) autComepleteDropDown: ElementRef;
    @ViewChild('auto' ,{static : true}) auto:MatAutocomplete;
    @ViewChild('inputRef' ,{static : true}) inputRef: any;
    // The current value entered by the user
    private innerValue: any;

    // The last valid option (object) selected.
    private innerOption: any;

    private innerOptions: any = [];

    innerTitles = { description: 'Description', code: 'Code' };

    titlesWidth: any;

    fontcss: string;

    objectKeys = Object.keys;

    totalWidth = 0;

    // id in auto-complete
    @Input() id: string;
    // disabled in auto-complete
    @Input() disabled = false;
    // read only in auto-complete
    @Input() readonly: boolean;
    // required in auto-complete
    @Input() required = false;
    // placeholder in auto-complete
    @Input() placeholder: string;
    @Input() makeLovSmall = false;
    @Input() source: string;

    @Input() sourceDomain: string;

    @Output() public lovManualChangeEvent = new EventEmitter<any>();

    @Output() optionChange: EventEmitter<any> = new EventEmitter();
    
    @Output('blur') parentEvent: EventEmitter<any> = new EventEmitter();
    
    @Input() filterOptions: (val: any, opts: any[]) => any;

    @Input() cacheLink: boolean = false;
    
    // by the Control Value Accessor
    private onTouchedCallback: () => void = noop;
    private onChangeCallback: (_: any) => void = noop;

    // to filter the values
    filteredOptions: Observable<any[]>;

    innerDomain: string;

    innerParent: string;

    innerLink: string;

    optionClass: string;

    enableTitles = false;

    ctx: any;
    standarLeftOffset:number;

    @HostListener('document:click', ['$event'])
    onClick(event: Event) {
        const eventTargetEl = event.target as HTMLElement;
        if(eventTargetEl == undefined || eventTargetEl.parentElement == undefined){
        return;
        }
        if( eventTargetEl.parentElement.className === "lov-input" || eventTargetEl.classList.contains('lov-header--title')){
        setTimeout(() => {
            this.setLovPos(); 
            }, 200);
        }else if(this.auto.isOpen === true){
                this.autoTrigger.closePanel();
        }
    }

    // constructor( private provider: LovProvider, private refCodeService: ReferenceDomainService ) { }
    constructor(private refCodeService: ReferenceDomainService,
        private lovOptionsService: LovService, 
        private cd: ChangeDetectorRef, private router: Router,
        private sessionManager: UserSessionManager,
        public dialog: MatDialog) {
    }

    ngOnInit() {}

    ngOnChanges(changes: SimpleChanges) {
        if(changes.disabled){
            changes.disabled.currentValue ? this.inputControl.disable() : this.inputControl.enable();
        }
    }

    ngAfterViewInit() {
        /*setTimeout(() => {
            const matoptions = document.querySelectorAll('.mat-option') ;
            const matoption = matoptions[0] as HTMLElement;
            let left = window.screenLeft !== undefined ? window.screenLeft : window.screenX;
            if (left === 0) {
                left = window.screen.width;
            }
            left = left + 20;
            const panelCss = document.querySelector('.cdk-overlay-pane') as HTMLElement;
            if (panelCss) {
                const panelLeft = parseFloat(window.getComputedStyle(panelCss, '').getPropertyValue('left'));
                if (left < (panelLeft + this.totalWidth)) {
                    panelCss.style.left = (left - this.totalWidth) + 'px';
                }

            }
        });*/
        
    }

    onLovChange(e){
        this.lovManualChangeEvent.emit(e);
    }

    filterOptionsByName(name: any, opts: any[]) {
        if (this.filterOptions && this.inputControl && typeof this.filterOptions === 'function') {
            return this.filterOptions(this.inputControl.value, opts);
        } else {
            if (name && typeof name === 'string') {
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

    filterOptionsByCode(code: any) {
        if (this.filterOptions && this.inputControl && typeof this.filterOptions === 'function') {
            return this.filterOptions(this.inputControl.value, this.options);
        } else {
            if (code && typeof code === 'string') {
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

    filterOptionByValue(value: any) {
        if (value && typeof value === 'string') {
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
        return this.options.filter(option =>
            (!option.hasOwnProperty('canDisplay') ||
                (option.hasOwnProperty('canDisplay') && option['canDisplay'])));
    }

    // get accessor
    get value(): string {
        return this.innerValue;
    }

    // set accessor
    set value(v: string) {
        if (v != this.innerValue) {
            this.innerValue = v;

            if (this.innerValue) {
                const optionsList = this.filterOptionByValue(this.innerValue);
                const options = optionsList.filter(element => {
                    return element.code === this.innerValue;
                });
                if (options.length == 1 &&
                    options[0].code == this.innerValue) {
                    // exact match to an option so select it.
                    this.option = options[0];
                }
            } else {
                // user has cleared the value so deselect the current option
                this.option = undefined;
            }
            if (!this.innerValue && !this.option && this.inputControl.value) {
                this.inputControl.setValue('');
            }
            this.onChangeCallback(this.innerValue);
        }
    }

    get option(): any {
        return this.innerOption;
    }

    @Input()
    set option(v: any) {
        if (v != this.innerOption) {
            if(v && v.disable){
                this.option = this.innerOption = this.value = undefined;
                this.inputControl.setValue('');
                return;
            }
            this.innerOption = v;
            this.value = this.innerOption ? this.innerOption.code : undefined;
            this.optionChange.next(this.innerOption);
        }
    }

    @Input()
    set titles(titles: any) {
        if (titles !== this.innerTitles) {
            this.innerTitles = titles;
        }
    }

    get titles(): any {
        return this.innerTitles;
    }

    // list of values in auto-complete
    get options(): any {
        return this.innerOptions;
    }

    @Input()
    set options( v: any ) {
        if ( v !== this.innerOptions ) {
            this.cd.markForCheck();
            if( v && v.length > 0 ) {
                v = this.sortOptions(v);                
            }

            this.innerOptions = v;
            this.filteredOptions = this.inputControl.valueChanges.pipe(distinctUntilChanged()).pipe(startWith( null ))
                .pipe(map( option => option ? this.filterOptionsByName( option, this.options ) : this.filterDisplayedItem() ));
                this.option = undefined;

            //S4-2524 the LoV field is empty, AND the LoV field is required,
            //set the default value of the LoV to the option
            if ( this.innerValue === undefined && this.required) {
                if ( this.options.length == 1 ) {
                    this.getSelectedText( this.options[0] );
                }
            }
            if ( this.options ) {
                this.titlesWidth = undefined;
                this.enableTitles = false;
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
            }
        }
    }

    @Input()
    set codeTitle(codeTitles: string) {
        if (codeTitles) {
            this.titles['code'] = codeTitles;
        }
    }

    @Input()
    set descTitle(descTitle: string) {
        if (descTitle) {
            this.titles['description'] = descTitle;
        }
    }


    // From ControlValueAccessor interface
    writeValue(value: any) {
        if (value !== this.innerValue) {
            this.value = value;
        }
    }

    // From ControlValueAccessor interface
    registerOnChange(fn: any) {
        this.onChangeCallback = fn;
    }

    // From ControlValueAccessor interface
    registerOnTouched(fn: any) {
        this.onTouchedCallback = fn;
    }

    getSelectedText = (sel) => {
        if (sel) {
            this.option = sel;
            this.value = sel.code;
        }
        return sel ? sel.description : sel;
    }

    // Set touched on blur
    // onBlur fn calls 2 times.. first when user select option..second when user leaves the focus from input 
    onBlur() {
        setTimeout(() => {
            // Select the option if  the user has entered a partial string that 
            // matches a single option. Otherwise clear the selection.
            if (this.inputControl.value) {
                // ignore if the value is an object<option>. This occurs when the 
                // user selects an option from the dropdown.
                if (!this.inputControl.value.code) {
                    const options = this.filterOptionsByName(this.inputControl.value, this.options);
                    if (options.length == 1) {
                        // exact match to a new option so select it.
                        this.option = options[0];
                        // Added for S4-6059. Manually updates the view.
                        this.autoTrigger.writeValue(this.option);
                    } else {
                        //  clear the current selection (no than one option)
                        this.option = undefined;
                        this.inputControl.setValue('');
                    }
                }
            } else {
                // clear the current selection (user has cleared the field)
                this.option = undefined;
                this.inputControl.setValue('');
            }

            this.onTouchedCallback();
            this.parentEvent.emit();
        }, 500)
    }

    get domain() {
        return this.innerDomain;
    }

    @Input()
    set domain(v: string) {
        if (this.innerDomain !== v) {
            this.innerDomain = v;
            this.option = undefined;
            this.updateOptions();
        }
    }

    get link() {
        return this.innerLink;
    }

    @Input()
    set link(v: string) {
        if (this.innerLink !== v) {
            if ((this.cacheLink == false) && v) {
                this.lovOptionsService.clear(v);
            }
            this.innerLink = v;
            this.option = undefined;
            this.updateOptions();
        }
    }

    get parent() {
        return this.innerParent;
    }

    @Input()
    set parent(v: string) {
        if (this.innerParent !== v) {
            this.innerParent = v;
            this.option = undefined;
            this.updateOptions();
        }
    }

    private updateOptions(): void {
        // ??? Will this cause a memory leak since we are not unsubscribing ???
        if (this.innerLink) {
              this.lovOptionsService.getOptions(this.innerLink).subscribe(options => {
                this.options = options;
                this.filteredOptions = this.inputControl.valueChanges.pipe(startWith(null))
                    .pipe(map(option => option ? this.filterOptionsByName(option, this.options) : this.filterDisplayedItem()));
                if (this.innerValue && !this.option) {
                    const optsList = this.filterOptionByValue(this.innerValue);
                    const opts = optsList.filter(element => {
                        return element.code === this.innerValue;
                        });
                    if (opts.length === 1 &&
                        opts[0].code === this.innerValue) {
                        // exact match to an option so select it.
                        this.option = opts[0];
                    } else {
                        // user has cleared the value so deselect the current option
                        this.option = undefined;
                    }
                }
            });
        } else if (this.innerDomain || this.innerParent) {
            
            this.refCodeService.getRefCodes(this.innerDomain, this.innerParent).subscribe(options => {
                this.options = options;
                this.filteredOptions = this.inputControl.valueChanges.pipe(distinctUntilChanged()).pipe(
                    startWith(null))
                    .pipe(map(option => option ? this.filterOptionsByName(option, this.options) : this.filterDisplayedItem()));
                if (this.innerValue && !this.option) {
                    const optsList = this.filterOptionByValue(this.innerValue);
                    const opts = optsList.filter(element => {
                        return element.code === this.innerValue;
                        });
                    if (opts.length === 1 &&
                        opts[0].code === this.innerValue) {
                        // exact match to an option so select it.
                        this.option = opts[0];
                    } else {
                        // user has cleared the value so deselect the current option
                        this.option = undefined;
                    }
                }
            });
        } else {
            //this.options = [];
            this.filteredOptions = this.inputControl.valueChanges.pipe(startWith(null))
                .pipe(map(option => option ? this.filterOptionsByName(option, this.options) : this.filterDisplayedItem()));
        }
    }

    calculateTextWidth(value: string) {
        if (!this.ctx) {
            const canvas = document.createElement('canvas');
            this.ctx = canvas.getContext('2d');
            this.ctx.font = this.fontcss;
        }
        return this.ctx.measureText(value).width;
    }

    createFontCss(element: any) {
        const size = window.getComputedStyle(element._element.nativeElement, '').getPropertyValue('font-size');
        const fontFamily = window.getComputedStyle(element._element.nativeElement, '').getPropertyValue('font-family');
        if (size) {
            this.fontcss = size + ' ' + fontFamily;
        } else {
            this.fontcss = this.lovOptionsService.fontDetails;
        }
    }

    prepareWidths(element: any) {
        if (element && this.titlesWidth) {
            return;
        }
        if (element && !this.fontcss) {
            this.createFontCss(element);
        }
        if (this.fontcss) {
            this.titlesWidth = {};
            if (this.innerTitles) {
                this.objectKeys(this.innerTitles).forEach(
                    key => {
                        let width = this.calculateTextWidth(this.innerTitles[key]);
                        width = Math.ceil(width);
                        if (!this.titlesWidth[key]) {
                            this.titlesWidth[key] = width;
                        } else if (this.titlesWidth[key] < width) {
                            this.titlesWidth[key] = width;
                        }
                    }
                );
            }
            if (this.options) {
                this.options.forEach(ele => {
                    if(ele['canDisplay'] || ele['canDisplay'] === undefined || ele['canDisplay'] === null){
                        this.objectKeys(ele).forEach(
                            key => {
                                let width = this.calculateTextWidth(ele[key]);
                                width = Math.ceil(width);
                                if (!this.titlesWidth[key]) {
                                    this.titlesWidth[key] = width;
                                } else if (this.titlesWidth[key] < width) {
                                    this.titlesWidth[key] = width;
                                }
                            }
                        );
                    }
                });
            }
            if (this.titlesWidth) {
                this.totalWidth = 0;
                this.objectKeys(this.titlesWidth).forEach(key => {
                    this.totalWidth += this.titlesWidth[key];
                });
            }
        }
    }

    getTitleStyle(key: string): any {
        if (this.enableTitles && this.titlesWidth) {
            const width = ( +this.titlesWidth[key] + 20) + 'px';
            
            return {
                'flex': '0 0 ' + width,
                'width': width,
                // 'min-width': width,
            }
        } else {
            return { }
        }
    }

    getOptionStyle(key: string,index: number,size: number): any {
        let result = {};
        
        if (this.titlesWidth) {
            const width = ( +this.titlesWidth[key] + 20) + 'px';
            
            result = {
                'flex': '0 0 ' + width,
                'width': width,
                // 'min-width': width
            }
        }

        if(!this.enableTitles && index == size - 1){
            this.enableTitles = true;
           /* setTimeout(() => {
                this.enableTitles = true;
            }, 100);*/
        }
        return result;
    }
    setLovPos(){
        if(screen.width <= 1366){
            this.standarLeftOffset = 900;
            this.calculateLovPos();
        }else if(screen.width <= 1024){
            this.standarLeftOffset = 600;
            this.calculateLovPos();
        } 
    }
    calculateLovPos(){
        let cdKOverLay =  document.getElementsByClassName('cdk-overlay-pane');
        for(let i=0; i< cdKOverLay.length; i++){
            let cdKEle = cdKOverLay.item(i) as HTMLElement;
            let eLeft= cdKEle.style.left;
              if(parseInt(eLeft.split("px")[0]) > this.standarLeftOffset){
              var cdk= cdKOverLay.item(i) as HTMLElement;
              let cdkItem=  cdk.children;
              let cdkChild = cdkItem.item(0) as HTMLElement;
              if(cdkChild !=null){
                cdkChild.style.cssFloat ="right";
              }
           }       
    }
}

    openCloseAutocomplete(evt) {
        if (this.auto.isOpen === false) {
            this.updateOptions();
            evt.stopPropagation();
            this.autoTrigger.openPanel();
            setTimeout(() => {
                this.setLovPos();
            }, 100); 
            this.inputRef.nativeElement.click();
        } else {
            evt.stopPropagation();
            this.autoTrigger.closePanel();
        }
    }
    
    private updateLiveOptions(): void {
        // ??? Will this cause a memory leak since we are not unsubscribing ???
        if (this.innerLink) {
              this.lovOptionsService.getOptions(this.innerLink).subscribe(options => {
                this.options = options;
                this.filteredOptions = this.inputControl.valueChanges.pipe(distinctUntilChanged()).pipe(startWith( null ))
                .pipe(map(option => option ? this.filterOptionsByName(option, this.options) : this.filterDisplayedItem()));
                if (this.innerValue && !this.option) {
                    const optsList = this.filterOptionByValue(this.innerValue);
                    const opts = optsList.filter(element => {
                        return element.code === this.innerValue;
                        });
                    if (opts.length === 1 &&
                        opts[0].code === this.innerValue) {
                        // exact match to an option so select it.
                        this.option = opts[0];
                    } else {
                        // user has cleared the value so deselect the current option
                        this.option = undefined;
                    }
                }
            });
        } else if (this.innerDomain || this.innerParent) {
            
            this.refCodeService.getRefCodes(this.innerDomain, this.innerParent).subscribe(options => {
                this.options = options;
                this.filteredOptions = this.inputControl.valueChanges.pipe(distinctUntilChanged()).pipe(startWith( null ))
                .pipe(map(option => option ? this.filterDisplayedItem() : this.filterDisplayedItem()));
                //this.filteredOptions = this.filterDisplayedItem();
                if (this.innerValue && !this.option) {
                    const optsList = this.filterOptionByValue(this.innerValue);
                    const opts = optsList.filter(element => {
                        return element.code === this.innerValue;
                        });
                    if (opts.length === 1 &&
                        opts[0].code === this.innerValue) {
                        // exact match to an option so select it.
                        this.option = opts[0];
                    } else {
                        // user has cleared the value so deselect the current option
                        this.option = undefined;
                    }
                }
            });
        } else {
            //this.options = [];
            /*this.filteredOptions = this.inputControl.valueChanges.startWith(null)
            .map(option => option ? this.filterOptionsByName(option, this.options) : this.filterDisplayedItem());*/
            this.filteredOptions = this.inputControl.valueChanges.pipe(distinctUntilChanged()).pipe(startWith( null ))
            .pipe(map(option => option ? this.filterDisplayedItem() : this.filterDisplayedItem()));
        }
    }
      @ViewChild(MatMenuTrigger,{static:true})
      contextMenu: MatMenuTrigger;
    
      contextMenuPosition = { x: '0px', y: '0px' };
    
      onContextMenu(event: MouseEvent) {
        let isAccessable = false;
        let isSourceAccessable = false;
        if(this.sessionManager.userRoles.roles['OUMSYPFL'] === 'full' || this.sessionManager.userRoles.roles['OUMSYPFL'] === 'read') {
          isAccessable = true;
        }
        if(this.sessionManager.userRoles.roles[this.source] === 'full' || this.sessionManager.userRoles.roles[this.source] === 'read') {
            isSourceAccessable = true;
        }
        if((this.domain && isAccessable) || (this.source && isSourceAccessable)){
            event.preventDefault();
            this.contextMenuPosition.x = event.clientX + 'px';
            this.contextMenuPosition.y = event.clientY + 'px';
            this.contextMenu.menuData = {};
            this.contextMenu.menu.focusFirstItem('mouse');
            this.contextMenu.openMenu();
        } 
      }
    
      onContextMenuAction1() {
          let isAccessable = false;
          let isSourceAccessable = false;
          if(this.sessionManager.userRoles.roles['OUMSYPFL'] === 'full' || this.sessionManager.userRoles.roles['OUMSYPFL'] === 'read') {
              isAccessable = true;
          }
          if(this.sessionManager.userRoles.roles[this.source] === 'full' || this.sessionManager.userRoles.roles[this.source] === 'read') {
                isSourceAccessable = true;
          }
          if(this.domain && isAccessable) {
              this.dialog.closeAll();
              this.router.navigate(["OUMRCODE"], { queryParams: { domain: this.domain } });
          } else if (this.source && isSourceAccessable && this.source === 'OUMRCODE') {           
            this.router.navigate(["OUMRCODE"], { queryParams: { domain: this.sourceDomain } });

          } else if (this.source && isSourceAccessable){
            if(this.dialog.openDialogs.length){
                this.dialog.closeAll();
            }
            this.router.navigate([this.source]);
          }
      }


    sortOptions(records) {
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
        return finalArr;
    }


}