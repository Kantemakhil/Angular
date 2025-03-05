import { Component, OnInit, Input, ViewChild, TemplateRef, ViewContainerRef } from '@angular/core';

enum AccessLevel {
    none,
    view,
    full
}

@Component( {
    selector: 's4-tab',
    templateUrl: './tab.component.html',
    styleUrls: []
} )
export class TabComponent implements OnInit {

    // assume the user has no permission to access the component
    userAccess: AccessLevel = AccessLevel.full;
    innerReadOnly = false;
    innerDisabled = false;
    innerRoleId: string;
    innerLabel: string;
    innerStyleClass: string;
    /** Template inside the MatTab view that contains an <ng-content>. */
    @ViewChild( TemplateRef  ,{static : true}) content: TemplateRef<any>;

    @Input()
    id: string;

    constructor( private _viewContainerRef: ViewContainerRef ) {
    }

    ngOnInit() {
    }
    
    get class(): string {
        return this.innerStyleClass;
    }
    
    @Input()
    set class( v: string ) {
        this.innerStyleClass = v;
    }
    get label(): string {
        return this.innerLabel;
    }

    @Input()
    set label( v: string ) {
        this.innerLabel = v;
    }

    get roleId(): any {
        return this.innerRoleId;
    }

    @Input()
    set roleId( v: any ) {
        if ( v !== this.innerRoleId ) {
            this.innerRoleId = v;
            if ( this.roleId === undefined || this.roleId === '' ) {
                // This pane does not utilize RBAC
                this.userAccess = AccessLevel.full;
            } else {

                // TODO: Replace test code with logic to get the user permission for this form. (service call)
                switch ( this.roleId ) {
                    case 'role_full':
                        this.userAccess = AccessLevel.full;
                        break;
                    case 'role_view':
                        this.userAccess = AccessLevel.view;
                        break;
                    default:
                        this.userAccess = AccessLevel.none;
                }

            }
        }
    }

    get readonly(): boolean {
        return ( ( this.userAccess !== AccessLevel.full ) || this.innerReadOnly );
    }

    @Input()
    set readonly( v: boolean ) {
        if ( v !== this.innerReadOnly ) {
            this.innerReadOnly = v;

            // TODO: Add code to set inner elements to readonly (when applicable)
        }
    }

    // Disabled hides the contents of the pane from the user.
    get disabled(): boolean {
        return ( ( this.userAccess === AccessLevel.none ) || this.innerDisabled );
    }

    @Input()
    set disabled( v: boolean ) {
        if ( v !== this.innerDisabled ) {
            this.innerDisabled = v;
        }
    }

}
