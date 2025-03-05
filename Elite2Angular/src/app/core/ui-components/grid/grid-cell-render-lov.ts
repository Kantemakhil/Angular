import { AfterViewInit, Component, OnDestroy, Renderer2 } from '@angular/core';
// import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ReferenceDomainService } from '../lov/reference-domain.service';
import { LovService } from '../lov/lov.service';
import { ICellRendererAngularComp } from '@ag-grid-community/angular';

@Component( {
    selector: 'grid-cell-renderer-lov',
    template: `
    
    <div style="width: 100%">
                <div style="float: left;" class="render-lov-text">
                   {{value}}
                </div>
                <div class="render-lov-margin">
            
                    <mat-icon  class="s4-material-icons s4-menu-icon-render">keyboard_arrow_down</mat-icon>
                   
                </div>
            </div>
    
    `,
    styleUrls: ['./grid-cell-render-lov.scss']
} )
export class GridCellRenderLoVComponent implements ICellRendererAngularComp, AfterViewInit, OnDestroy {
    public value: any;

    private params: any;
    private selectedCell: any;

    // The current value entered by the user
    private innerCode: any;
    private domain: string;
    private parent: string;
    private link: string;
    private parentField: string;

    private parentFieldListener: any;

    constructor( private refCodeService: ReferenceDomainService,
        private lovOptionsService: LovService,
        private renderer: Renderer2 ) { }

    ngOnDestroy() {
        if ( this.parentFieldListener ) {
            // remove the listener (https://stackoverflow.com/questions/35080387/dynamically-add-event-listener-in-angular-2)
            this.parentFieldListener();
        }
    }

    ngAfterViewInit() {
    }

    agInit( params: any ): void {
        this.params = params;
        this.code = params.value;
        if(this.code && typeof this.code === 'string'){
            this.code = this.code.trim();
        }
        const data = this.params.column.colDef;
        if ( data.domain ) {
            this.domain = this.params.column.colDef.domain;
        }
        if ( data.parent ) {
            this.parent = this.params.column.colDef.parent;
        }
        if ( data.link ) {
            this.link = this.params.column.colDef.link;
        }
        if ( data.parentField ) {
            this.parentField = this.params.column.colDef.parentField;

            this.parentFieldListener = this.renderer.listen( this.params.node, 'cellChanged', ( event ) => {
                if (event && event.column && event.column.colId === this.parentField ) {
                    this.updateField();
                }
            } );
        }
        if (this.params.api) {
            this.selectedCell = this.params.api.getFocusedCell();  
        }
        

        this.updateField();
    }

    refresh( params: any ): boolean {
        return false;
    }

    private get code(): any {
        return this.innerCode;
    }

    private set code( v: any ) {
        if ( this.innerCode !== v ) {
            this.innerCode = v;
            if ( this.params.value !== this.innerCode ) {
                this.params.node.setDataValue( this.params.column.colDef.field, this.innerCode );
            }
        }
    }

    private updateField(): void {

        // Priority of supplied parameters:
        //    1. link
        //    2. domain & parentField
        //    3. domain & parent
        //    4. domain
        if ( !this.code ) {
            this.value = '';
            return;
        }

        // ??? Will this cause a memory leak since we are not unsubscribing ???
        if ( this.link ) {
            if (this.parentField) {
                this.link = this.link + this.params.node.data[this.parentField];
            }
            this.lovOptionsService.getOptions( this.link ).subscribe( options => {
                this.updateOption( options );
            } );
        } else if ( this.domain && this.parentField ) {
            const parentDomain = this.params.node.data[this.parentField];
            this.refCodeService.getRefCodes( this.domain, parentDomain ).subscribe( options => {
                this.updateOption( options );
            } );
        } else if ( this.domain && this.parent ) {
            this.refCodeService.getRefCodes( this.domain, this.parent ).subscribe( options => {
                this.updateOption( options );
            } );
        } else if ( this.domain ) {
            this.refCodeService.getRefCodes( this.domain, undefined ).subscribe( options => {
                this.updateOption( options );
            } );
        } else {
            this.value = '';
        }
    }

    private updateOption( options: any[] ): void {
        const selectedOption = options.find( obj => obj.code === this.code );
        if ( selectedOption ) {
            if(this.params.column.colDef.lovRender){
                this.value = selectedOption[this.params.column.colDef.lovRender];
            }
            else{
                this.value = selectedOption.description;
            }
            setTimeout(() => {
                this.params.columnApi.autoSizeColumn(this.params.colDef.field);
            }, 10); 
        } 
        else {
            this.code = '';
            this.value = '';
        }
    }
}
