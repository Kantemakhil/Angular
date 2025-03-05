import {
    Component,
    OnInit,
    ViewChild,
    Injectable
} from '@angular/core';

import { TranslateService } from '@common/translate/translate.service';
import { DialogComponent } from '@ui-components/dialog/dialog.component';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { OidmpitmService } from '../service/oidmpitm.service';

@Component({
    selector: 'cameraDialog',
    templateUrl: './cameraDialog.component.html',
    styleUrls: ['./cameraDialog.component.scss']
    
})

@Injectable({providedIn: 'root'})
export class CameraDialogComponent implements OnInit {
    
    type = 'error';
    msglist = [];
    message = ' Invalid.';
    msgs: any[] = [];
    flag: any;
    width = 400;
    height = 300;
    imageurl:any;
    @ViewChild( 'dialog', {static: true}) dialog: DialogComponent;
    @ViewChild("picture") picture: any;
    constructor(public translateService: TranslateService,
            private sessionManager: UserSessionManager,
            private oidmpitmFactory: OidmpitmService){
    }
    ngOnInit() {
        this.dialog.data;
                }
    
    cancel(): void {
        this.dialog.close(true);
        
       }
    
    show() {
        this.msglist = [];
        this.msglist.push({ message: this.message, type: this.type });
        this.msgs = [...this.msglist];
    }
    onCapture(event) {
        
        this.imageurl = event.imageUrl;
        this.dialog.close({imageUrl:this.imageurl});

      }
}