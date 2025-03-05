import { Component, OnInit, ViewChild} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { DialogComponent } from '@core/ui-components/dialog/dialog.component';
import { DialogService } from '@core/ui-components/dialog/dialog.service';
import { IFrameSettings } from '@syncfusion/ej2-richtexteditor/src/rich-text-editor/models/iframe-settings';


@Component({
    selector: 'app-staffreportdetail',
    templateUrl: './staffreportdetail.component.html'
})

export class StaffReportDetailComponent implements OnInit {

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
    forceDetail: string;
    equipmentDetail : string;
    modelData : string

    constructor(public translateService: TranslateService, public dialogService: DialogService,
        public sessionManager: UserSessionManager ) {
    }

    ngOnInit() {
        if(this.dialog.data.forceUsed){
            this.modelData = this.dialog.data.forceDetail;
    }
    if(this.dialog.data.equipmentUsed){
        this.modelData = this.dialog.data.equipmentDetail;


    }
}
     
    show() {
    this.msglist = [];
    this.msglist.push({ message: this.message, type: this.type });
    this.msgs = [...this.msglist];
    }

    detailsInsert(event) {

	}

    onSave() {
        if(this.dialog.data.forceUsed){
            this.dialog.close(this.modelData);

    }
    if(this.dialog.data.equipmentUsed){
        this.dialog.close( this.modelData);
    }
    }

    onButExitclick() {
        this.dialog.close(null);
    }

}
