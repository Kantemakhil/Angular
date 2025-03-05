import {
    Component, OnInit, Injectable, ViewChild
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OffenderPptyItems } from '@instproperty/OffenderPptyItems';
import { OidmpitmService } from '../service/oidmpitm.service';
import { DialogComponent } from '@core/ui-components/dialog/dialog.component';
@Component({
    templateUrl: './manage-properties-dialog.component.html',
    providers: [],
    styleUrls: ['./oidmpitm.component.scss'],
    selector: 'manage-properties-dialog'
})

@Injectable({providedIn: 'root'})
export class ManagePropertiesDialogComponent implements OnInit {
    @ViewChild('dialog', {static: true}) dialog: DialogComponent;
    offPpItmtxModel: OffenderPptyItems;
    label: string;
    toPersonLink: string;
    agencyLink: string;
    toAgyFlag: boolean;
    launchBtnFlag: boolean;
    lockFlagDisable: boolean;
    lockFlag: boolean;
    noLabel: string;
    yesLabel: string;
    type: string;
    msglist = [];
    message = ' Invalid.';
    msgs: any[] = [];
    offProperties: OffenderPptyItems[];
    showValidation: boolean;
    constructor(public translateService: TranslateService, private oidmpitmFactory: OidmpitmService) {
    }
    ngOnInit(): void {
        this.toPersonLink = 'oiddprop/rgDisposedToPersonRecordGroup';
        this.agencyLink = 'oiddprop/cgfkOffConTrnToAgyLocIdRecordGroup?agyLocId=1';
        this.offPpItmtxModel = new OffenderPptyItems();
        if (this.dialog.data.offPpItmtxModel) {
            this.offPpItmtxModel = this.dialog.data.offPpItmtxModel;
        }
        if (this.dialog.data.label) {
            this.label = this.dialog.data.label;
        }
        if (this.dialog.data.offProperties && this.dialog.data.offProperties.length > 0) {
            this.toAgyFlag = false;
            this.lockFlagDisable = false;
            this.launchBtnFlag = false;
            this.showValidation = true;
        } else {
            this.toAgyFlag = true;
            this.lockFlagDisable = true;
            this.launchBtnFlag = true;
            this.showValidation = false;
        }
        this.yesLabel = this.translateService.translate('common.btnsave');
        this.noLabel = this.translateService.translate('common.btnCancel');

    }
    yes() {
        if (this.showValidation) {
        if (!(this.lockFlag || this.offPpItmtxModel.disposedToCorpId || this.offPpItmtxModel.disposedToPersonId)) {
            this.type = 'warn';
            this.message = this.translateService.translate('oiddprop.youmustdisposeitems');
            this.show();
            return;
        }
        if (this.lockFlag) {
            this.offPpItmtxModel.disposedToOffenderFlag = 'Y';
        } else {
            this.offPpItmtxModel.disposedToOffenderFlag = 'N';
            }
        }
        this.dialog.close(this.offPpItmtxModel);
    }
    show() {
        this.msglist = [];
        this.msglist.push({ message: this.message, type: this.type });
        this.msgs = [...this.msglist];
    }
    no() { this.dialog.close(false); }

    toOffClicked(event) {
        if (event.checked) {
            this.toAgyFlag = true;
            this.launchBtnFlag = true;
        } else {
            this.toAgyFlag = false;
            this.lockFlagDisable = false;
            this.launchBtnFlag = false;
        }
        this.offPpItmtxModel.disposedToCorpId = undefined;
        this.offPpItmtxModel.disposedToPersonId = undefined;

    }
    agencyChange(event) {
        if (event && event.code) {
            this.lockFlagDisable = true;
            this.launchBtnFlag = true;
        } else {
            this.toAgyFlag = false;
            this.lockFlagDisable = false;
            this.launchBtnFlag = false;
        }
        this.offPpItmtxModel.disposedToPersonId = undefined;
        this.lockFlag = false;
    }
    personChange(event) {
        if (event && event.code) {
            this.toAgyFlag = true;
            this.lockFlagDisable = true;
            this.offPpItmtxModel.disposedToPerson = event.description;
            this.offPpItmtxModel.disposedToPersonId = event.code;
        } else {
            this.toAgyFlag = false;
            this.lockFlagDisable = false;
            this.launchBtnFlag = false;
        }
        this.offPpItmtxModel.disposedToCorpId = undefined;
        this.lockFlag = false;
    }
}
