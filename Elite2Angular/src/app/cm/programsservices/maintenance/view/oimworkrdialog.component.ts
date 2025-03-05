import { TranslateService } from '@common/translate/translate.service';
import { DialogService } from '@core/ui-components/dialog/dialog.service';
import { OimworkrService } from '../service/oimworkr.service';
import {
    Component, OnInit, Injectable, Pipe, PipeTransform, Directive,
    ElementRef,
    ViewChild
} from '@angular/core';
import { DialogComponent } from '@core/ui-components/dialog/dialog.component';
import { CourseActivities } from '@inst/programs-without-schedules/beans/CourseActivities';

@Component({
    selector: 'app-oimworkrdialog',
    templateUrl: './oimworkrdialog.component.html'
})
export class OimworkrdialogComponent implements OnInit {
    @ViewChild('dialog', { static: true }) dialog: DialogComponent;

    projectLocationColumnDef: any[];
    msgs: any[] = [];
    okDisabled: boolean;
    selected = -1;
    crsactyModelTemp: CourseActivities = new CourseActivities();
    providerPartyId: String;
    crsactyModel: CourseActivities[] = [];
    constructor(public translateService: TranslateService, private dialogService: DialogService, private oimworkrFactory: OimworkrService) {
        this.projectLocationColumnDef = [];
    }
    ngOnInit(): void {
        this.providerPartyId = this.dialog.data.placementCorporateId;
        this.okDisabled = true;
        this.projectLocationColumnDef = [
            { fieldName: this.translateService.translate('oimworkrdialog.description'), field: 'description', editable: false, width: 150 },
            { fieldName: this.translateService.translate('oimworkrdialog.suiteNumber'), field: 'suiteNumber', editable: false, width: 150 },
            { fieldName: this.translateService.translate('common.street'), field: 'streetInformation', editable: false, width: 150 },
            { fieldName: this.translateService.translate('common.city'), field: 'cityName', editable: false, width: 150, },
            { fieldName: this.translateService.translate('system-profile.prov-state'), field: 'provStateDesc', editable: false, width: 150, },
            { fieldName: this.translateService.translate('system-profile.zip-post'), field: 'zipPostalCode', editable: false, width: 150, },
        ];
        this.rgProjectLocationRecordGroup();
    }
    show(vldmsg, type?) {
        type = type ? type : 'warn';
        vldmsg = this.translateService.translate(vldmsg);
        const msgval = [{ message: vldmsg, type: type }];
        this.msgs = [...msgval];
    }
    rgProjectLocationRecordGroup() {
        const palcementData = this.oimworkrFactory.rgProjectLocationRecordGroup(this.providerPartyId);
        palcementData.subscribe(data => {
            if (data.length === 0) {
                this.crsactyModel = [];
                this.crsactyModelTemp = new CourseActivities();
            } else {
                this.crsactyModel = data;
                this.crsactyModelTemp = data[0];
                this.okDisabled = false;
                this.selected = 0;
            }
        })
    }

    onRowclickEvent(event) {
        if (event) {
            this.crsactyModelTemp = event;
        } else {
            this.crsactyModelTemp = new CourseActivities();
        }
    }

    onExit() {
        this.dialog.close(null);
    }

    onSelect() {
        this.dialog.close(this.crsactyModelTemp);
    }

}

