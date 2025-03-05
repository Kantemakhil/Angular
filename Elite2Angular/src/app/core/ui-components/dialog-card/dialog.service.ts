import { Injectable, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
// import { MatDialog, MatDialogRef, MatDialogConfig, MAT_DIALOG_DATA } from '@angular/material';
import { Observable } from 'rxjs';
// import { DOCUMENT } from '@angular/platform-browser';
import { MatDialog } from '@angular/material/dialog';
import { DOCUMENT } from '@angular/common';

@Injectable({providedIn:'root'})
export class DialogService {

    constructor( public dialog: MatDialog, @Inject( DOCUMENT ) private doc: any, private router: Router, private route: ActivatedRoute ) {
        dialog.afterOpened.subscribe(() => {
            if ( !doc.body.classList.contains( 'no-scroll' ) ) {
                doc.body.classList.add( 'no-scroll' );
            }
        } );
    }

    openLinkDialog(link: string, modalData?: any, width?: number, height?: number, position?: any, panelClass?:any ): Observable<any> {
        return new Observable((observer) => {
            const config = this.router.config;
            const tlink = link.replace( '/', '' );
            let component = null;
            for ( const r of config ) {
                if ( tlink === r['path'] ) {
                    component = r['component'];
                }
            }

            const dialogConfig = {
                disableClose: true,
                hasBackdrop: true,
                panelClass: panelClass 
            };

            if (modalData) {
                dialogConfig['data'] = modalData;
            }

            if (width) {
                dialogConfig['width'] = width + '%';
            }

            if (height) {
                dialogConfig['height'] = height + '%';
            }

            if (position) {
                dialogConfig['position'] = position;
            }

            let dialogRef = this.dialog.open( component, dialogConfig );

            dialogRef.afterClosed().subscribe(( result ) => {
                dialogRef = null;
                this.doc.body.classList.remove( 'no-scroll' );
                observer.next(result);
                observer.complete();
            } );
        });
    }

}


