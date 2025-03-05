import {
	Component, OnInit, Injectable, Pipe, PipeTransform, Directive,
	ElementRef,
    ViewChild
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';

import { UserSessionManager } from '@core/classes/userSessionManager';
import { DialogComponent } from '@syncfusion/ej2-angular-popups';
import { VExternalMoves } from '../beans/VExternalMoves';


@Component({
	selector: 'app-oiuschovdialog',
	templateUrl: './oiuschovdialog.component.html',
	
})
export class OiuschovdialogComponent implements OnInit {
    @ViewChild('dialog', { static: true }) dialog: DialogComponent;
    msgs: any[] = [];
    vOffSchdoverw: any[];
    vOffSchdoverwrowData: VExternalMoves[] = [];
    validateRowData:any;
    vOffSchdoverwData: any;

    constructor( public translateService: TranslateService, public sessionManager: UserSessionManager) {
    }
    ngOnInit(): void {  
        this.vOffSchdoverw = [
		
            { fieldName: this.translateService.translate('sch/prop'), field: 'sch/prop', editable: true, width: 150,  },
            { fieldName: this.translateService.translate('int/exnt'), field: 'int/exnt', editable: false, width: 150 },
            { fieldName: this.translateService.translate('Event Date'), field: 'Event Date', editable: false, width: 150 , datatype: 'date'},
            { fieldName: this.translateService.translate('Event Time'), field: 'Event Time', editable: false, width: 150 , datatype: 'time'},
            { fieldName: this.translateService.translate('Type'), field: 'Type', editable: false, width: 150 },
            { fieldName: this.translateService.translate('Reason'), field: 'Reason', editable: false, width: 150 },
          
    
        ];
    }

    onButExitclick() {
        this.dialog.close(null);
    }
}

