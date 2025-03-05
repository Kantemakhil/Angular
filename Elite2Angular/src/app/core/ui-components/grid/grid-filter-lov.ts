import { Component, ViewChild } from '@angular/core';
import { MatSelectionList } from '@angular/material/list';
import { ReferenceDomainService } from '../lov/reference-domain.service';
import { LovService } from '../lov/lov.service';
import { IFilterAngularComp } from '@ag-grid-community/angular';
import { IFilterParams, IDoesFilterPassParams } from '@ag-grid-enterprise/all-modules';

@Component({
    selector: 'grid-filter-lov',
    template: `<mat-checkbox class="grid-filter-select-check"
                    [(ngModel)]="checkedAll"
                    (change)="onChange($event)"
                    >
                    Select all
                </mat-checkbox>
                <mat-selection-list class="grid-filter-select-options"*ngIf="options && options.length > 0" (selectionChange)="onSelectionChange($event)" #sellist>
                    <mat-list-option  
                    *ngFor="let option of options" checkboxPosition="before" value="{{option.code}}">
                    {{option.description}}
                    </mat-list-option>
                </mat-selection-list>`,

                styleUrls : ['./grid-filter-lov.scss']
})
export class GridFilterLovComponent implements IFilterAngularComp  {
    private params: IFilterParams;
    public innerValue: string;
    options: any[];
    private innerCode: any;
    private domain: string;
    private parent: string
    private link: string;
    checkedAll = true;
    columnField:string;

    @ViewChild('sellist', {static : false, read: MatSelectionList }) public sellist: MatSelectionList;

    constructor(private refCodeService: ReferenceDomainService,
        private lovOptionsService: LovService ) { }

    agInit(params: IFilterParams): void {
        this.params = params;
        this.columnField = this.params.colDef.field;
        const data = this.params.colDef;
        if (params.colDef['options']) {
            this.options = params.colDef['options'];
        } 
        else if (data['link']) {
                this.link = data['link'];
                if (data['parentField'] || this.link.charAt(this.link.length - 1) == '=') {
                    this.handleParentDependantOptions();
                }
                else {
                    this.lovOptionsService.getOptions(this.link).subscribe(options => {
                        this.options = options;
                        this.checkedAll = true;
                        this.selectAll();
                    });
                }
        }
        else if (data['domain']) {
            this.domain = data['domain'];
            if (data['parent']) {
                this.parent = data['parent'];
                this.refCodeService.getRefCodes(this.domain, this.parent).subscribe(options => {
                    this.options = options;
                    this.checkedAll = true;
                    this.selectAll();
                });

            } else {
                this.refCodeService.getRefCodes(this.domain, undefined).subscribe(options => {
                    this.options = options;
                    this.checkedAll = true;
                    this.selectAll();
                });
            }
        }
    }

    isFilterActive(): boolean {
        return this.sellist && this.sellist.selectedOptions.selected && this.options &&
            this.sellist.selectedOptions.selected.length !== this.options.length;
    }

    doesFilterPass(params: IDoesFilterPassParams): boolean {
        const { api, colDef, column, columnApi, context, valueGetter, } = this.params;
        const { node } = params;
        const value = valueGetter({ api, colDef, column, columnApi, context, data: node.data, getValue: (field) => node.data[field], node, });
        const cellValue = value;

        let index = 0;
        if (this.sellist) {
            index = this.sellist.selectedOptions.selected.findIndex(opt => {
                return opt.value == cellValue;
            }
            );
        }
        return index >= 0;
    }

    getModel() {}
 
    setModel(model: any) {}

    handleParentDependantOptions() {
            let colDef = this.params.colDef;
            let link = colDef['link'];
            let parentField = colDef['parentField'];
            let gridApi = this.params.api;
            let alreadyCalled = [];
            let arr = [];
            gridApi.forEachLeafNode((rowNode) => {
                let parentCode = rowNode.data[parentField];
                let compltLink = link + parentCode;
                if (!alreadyCalled.includes(compltLink)) {
                    alreadyCalled.push(compltLink);
                    this.lovOptionsService.getOptions(compltLink).subscribe(res => {
                        for(let i=0;i<res.length;i++){
                            arr.push(res[i])
                        }
                        this.pushAndSelectNewOptions(arr);
                    }); 
                }
            })
    }

    pushAndSelectNewOptions(arr) {
        this.options = arr;
        setTimeout(() => {
            this.selectAll();
        }, 0);
    }
 
    updateFilter() {
        this.params.filterChangedCallback();
    }

    selectAll() {
        setTimeout(() => {
            if (this.sellist) {
                this.checkedAll = true;
                this.sellist.selectAll();
                this.params.filterChangedCallback();
            }
        });
    }

    onChange(event) {
        if (event.checked) {
            this.checkedAll = true;
            if (this.sellist) {
                this.sellist.selectAll();
            }
        } else {
            this.checkedAll = false;
            if (this.sellist) {
                this.sellist.deselectAll();
                const gridFliterLovTag = document.getElementsByTagName('grid-filter-lov');
                if (gridFliterLovTag.length > 0) {
                    for (let i = 0; i < gridFliterLovTag.length; i++) {
                        gridFliterLovTag.item(i).parentElement.parentElement.parentElement.parentElement.style.minHeight = "300px";
                    }
                }
            }
        }
        this.params.filterChangedCallback();
    }

    onSelectionChange(event) {
        this.params.filterChangedCallback();
    }

}
