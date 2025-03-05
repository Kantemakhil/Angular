import { MatMenuTrigger } from '@angular/material/menu';
import { MultiSelectComponent } from '@syncfusion/ej2-angular-dropdowns';
import {
    Component, Input, OnInit, forwardRef,
    ViewChild, Output, EventEmitter, AfterViewInit
} from '@angular/core';
import { Observable } from 'rxjs';

import {
    NG_VALUE_ACCESSOR,
    ControlValueAccessor
} from '@angular/forms';
import { ReferenceDomainService } from '../lov/reference-domain.service';
import { LovService } from '../lov/lov.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';


export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => EjsMultiSelectComponent),
    multi: true
};
const noop = () => {
};

@Component({
    selector: 's4-multiselect',
    templateUrl: './ejs-multi-select.component.html',
    styleUrls: ['./ejs-multi-select.component.scss'],
    providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR]
    
})
export class EjsMultiSelectComponent implements  OnInit, AfterViewInit,ControlValueAccessor {

    // Pull the control from the template instead of creating manually. 
    @ViewChild('multiSelectObj' ,{static : true}) multiSelectObj: MultiSelectComponent;
   
    // The current value entered by the user
    public innerValue: any;

    // The last valid option (object) selected.
    public innerOption: any;

    public innerOptions: any = [];

    innerTitles = { text: 'Description', value: 'Code' };

    titlesWidth: any;

    fontcss: string;

    objectKeys = Object.keys;

    totalWidth = 0;

    // id in auto-complete
    @Input() mode: string;
    // disabled in auto-complete
    @Input() dataSource  : Object;
    // read only in auto-complete
    @Input() fields: Object;
    // required in auto-complete
    @Input() required = false;
    // placeholder in auto-complete
    @Input() placeholder: string;

    @Input() makeLovSmall = false;

    @Input() fieldName: string;

    @Output() optionChange: EventEmitter<any> = new EventEmitter();
    
    @Output() blur: EventEmitter<any> = new EventEmitter();
    
    @Input() filterOptions: (val: any, opts: any[]) => any;

    @Input() cacheLink: boolean = false;
    @Input() readonly: boolean = false;
    
    @Input() id: string;
    @Input() source: string;
    
    // to filter the values
    filteredOptions: Observable<any[]>;

    innerDomain: string;

    innerParent: string;

    innerLink: string;

    optionClass: string;

    enableTitles = false;
    modelValue : any;
    ctx: any;
    standarLeftOffset:number;
    private onTouchedCallback: () => void = noop;
    private onChangeCallback: (_: any) => void = noop;

    // constructor( private provider: LovProvider, private refCodeService: ReferenceDomainService ) { }
    constructor(private refCodeService: ReferenceDomainService,
        private router: Router,
        public dialog: MatDialog,
        private sessionManager: UserSessionManager,
        private lovOptionsService: LovService) {
    }
    // get accessor for ngModel
   
    // From ControlValueAccessor interface
    writeValue(value: any) {
        if (value !== this.innerValue) {
            this.innerValue = value;
        }
    }

    ngOnInit() {
    }

    ngAfterViewInit() {
        
        
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
    get options(): any {
        return this.innerOptions;
    }

    @Input()
    set options(v: any) {
        if (v !== this.innerOptions) {
            this.innerOptions = v;
            if (this.innerOptions.length == 1) {
                this.value = this.innerOptions[0].code?.split(',');
            }
        }
    }

    private updateOptions(): void {
        // ??? Will this cause a memory leak since we are not unsubscribing ???
        if (this.innerLink) {
            this.lovOptionsService.getOptions(this.innerLink).subscribe(options => {
                this.options = this.filterDisplayedItem(options)
            });
        }
        else if (this.innerDomain || this.innerParent) {
            this.refCodeService.getRefCodes(this.innerDomain, this.innerParent).subscribe(options => {
                this.options = this.filterDisplayedItem(options)
            });
        }
    }

    filterDisplayedItem(options) {
        return options.filter(option =>
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
            this.onChangeCallback(v);
            
           
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

    get option(): any {
        return this.innerOption;
    }

    @Input()
    set option(v: any) {
        if (v != this.innerOption) {
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

    @ViewChild(MatMenuTrigger, {static:true}) contextMenu: MatMenuTrigger;
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
        } else if (this.source && isSourceAccessable) {
            this.router.navigate([this.source]);
        }
    }
    
}