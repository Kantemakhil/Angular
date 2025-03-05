import { Component, OnInit, ViewChild} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { DialogComponent } from '@core/ui-components/dialog/dialog.component';
import { DialogService } from '@core/ui-components/dialog/dialog.service';


@Component({
    selector: 'app-paramquery',
    templateUrl: './oirreportParameterQuery.component.html'
})

export class OirreportParameterQueryComponent implements OnInit {

    @ViewChild('dialog', {static: true}) dialog: DialogComponent;
    @ViewChild('buildGrid', {static: true}) buildGrid: any;
    actionName: string;
    lovModel: any[];
    msgs: any[] = [];
    msglist: any[];
    message: any;
    type: any;
    saveDisable: boolean;
    exitDisable: boolean;
    parameterLovSelect: string;

    constructor(public translateService: TranslateService, public dialogService: DialogService,
        public sessionManager: UserSessionManager ) {
    }

    ngOnInit() {
        this.parameterLovSelect = this.dialog.data.parameterLovSelect;
    }
     
    show() {
    this.msglist = [];
    this.msglist.push({ message: this.message, type: this.type });
    this.msgs = [...this.msglist];
    }

    queryInsert(event) {

	}

    onSave() {
        this.dialog.close(this.parameterLovSelect);
    }

    onButExitclick() {
        this.dialog.close(null);
    }

}
