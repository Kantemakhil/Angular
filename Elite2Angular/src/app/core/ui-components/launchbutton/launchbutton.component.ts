import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
// import { MatDialog, MatDialogRef, MatDialogConfig, MAT_DIALOG_DATA } from '@angular/material';
import { MatDialog } from '@angular/material/dialog';
// import { DOCUMENT } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';

enum AccessLevel {
    none,
    view,
    full
}

@Component( {
    selector: 's4-launchbutton',
    templateUrl: './launchbutton.component.html',
    styleUrls: ['./launchbutton.component.scss']
} )
export class LaunchbuttonComponent implements OnInit {

    // assume the user has no permission to access the component
    private userAccess: AccessLevel = AccessLevel.none;
    private innerDisabled: boolean;
    private innerRoleId: string;

    // attribute of route navigation to another page
    @Input() link = '';
    // the id of the component
    @Input() id: string;
    @Input() position: any;
    // link points to a modal dialog (requires different launch logic)
    @Input() modal = false;
    // the data to pass to the modal dialog
    @Input() modalData: any;
    @Input() height: string = "auto";
    @Input() width: string = "50%";
    @Input() onLaunchClick: () => any;
    @Input() colorType: "";
    @Input() isLink: boolean;
    @Input() module: string;
    // the event signaling the closure of the dialog including any data passed back.
    @Output() afterDialogClosed: EventEmitter<any> = new EventEmitter<any>();

    constructor( public dialog: MatDialog, @Inject( DOCUMENT ) private doc: any, private router: Router, private route: ActivatedRoute ) {
        dialog.afterOpened.subscribe(() => {
            if ( !doc.body.classList.contains( 'no-scroll' ) ) {
                doc.body.classList.add( 'no-scroll' );
            }
        } );
    }

    ngOnInit() {
        this.roleId = '';
        // TODO: Need to validate the user has route (link) access
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

    launchClicked() {
        if(this.disabled === true){
            return;
        }

            let launchResult;
            if (this.onLaunchClick && typeof this.onLaunchClick === 'function') {
                launchResult = this.onLaunchClick();
                if (!launchResult) {
                    return;
                }
            }
        if ( this.modal ) {
            if ( this.link ) {
                this.openModal();
            }
        } else {
            if ( this.link ) {
                this.router.navigate( [this.link] );
            }
        }
    }

    openModal() {
        const config = this.router.config;
        const tlink = this.link.replace( '/', '' );
        let component = null;
        for ( const r of config ) {
            if ( tlink === r['path'] ) {
                component = r['component'];
            }
        }

        const dialogConfig = {
            disableClose: true,
            hasBackdrop: true,
            data: this.modalData,
            minWidth: this.width,
            height: this.height,
            maxWidth: "85%",
            maxHeight: "100%",
            position: this.position
        };

        let dialogRef = this.dialog.open( component, dialogConfig );

        dialogRef.afterClosed().subscribe(( result ) => {
            dialogRef = null;
            this.doc.body.classList.remove( 'no-scroll' );
            if ( this.afterDialogClosed ) {
                this.afterDialogClosed.emit( result );
            }
        } );
    }
}
