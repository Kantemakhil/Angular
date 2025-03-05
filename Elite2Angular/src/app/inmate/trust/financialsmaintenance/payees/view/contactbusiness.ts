import { Component, OnInit, ViewChild } from '@angular/core';
import { DialogComponent } from '@ui-components/dialog/dialog.component';
import { OumagencService } from '@inmate/trust/financialsmaintenance/payees/service/oumagenc.service';
import { Addresses } from '@inst/demographics-biometrics/beans/Addresses';
import { AddressCommitBean } from '@inst/demographics-biometrics/beans/AddressCommitBean';
import { TranslateService } from '@common/translate/translate.service';
  @Component({
    selector: 'app-contact-business',
    templateUrl: './contactbusiness.html'
  })
  export class ContactBusinessComponent implements OnInit {
    @ViewChild('dialog', {static: true}) dialog: DialogComponent;
    msgs = [];
    data: any;
    addrModel: Addresses = new Addresses();
    addressesUpdatetList: Addresses[] = [];
    addressesCommitModel: AddressCommitBean = new AddressCommitBean();
    constructor(private oumagencFactory: OumagencService,
                public translateService: TranslateService) {}
      ngOnInit(): void {
        this.data = this.dialog.data;
        this.addrModel = JSON.parse(JSON.stringify(this.data));
        }
      /**
     *  This function will be executed when commit event is
    * fired
    */
    oumagencSaveaddressesForm(event) {
        this.addressesUpdatetList = event.updated;
        this.addressesCommitModel.insertList = [];
        this.addressesCommitModel.updateList = [];
        this.addressesCommitModel.deleteList = [];
       if (this.addressesUpdatetList.length > 0) {
            for (let i = 0; i < this.addressesUpdatetList.length; i++) {
            }
            this.addressesCommitModel.updateList = this.addressesUpdatetList;
        }
        const addressesSaveData = this.oumagencFactory.addressesCommit(this.addressesCommitModel);
        addressesSaveData.subscribe(data => {
            if (data === 1) {
                this.show('common.addupdateremoverecordsuccess', 'success');
                this.data = JSON.parse(JSON.stringify(this.addrModel));
            } else {
                this.show('common.addupdateremoverecordfailed', 'error');
                this.addrModel = JSON.parse(JSON.stringify(this.data));
            }
        });

    }
    save() {
        const event = {updated: []};
        event.updated.push(JSON.parse(JSON.stringify(this.addrModel)));
        this.oumagencSaveaddressesForm(event);
    }
    get sveFlag(): boolean {
        if (this.addrModel.contactPersonName !== this.data.contactPersonName || this.addrModel.businessHour !== this.data.businessHour) {
            return false;
        } else {
            return true;
        }
    }
    show(vldmsg, type?) {
        type = type ? type : 'warn';
        vldmsg = this.translateService.translate(vldmsg);
        const msgval = [{ message: vldmsg, type: type }];
        this.msgs = [...msgval];
    }
    trMsg(msg, astr?) {
        return astr ? this.translateService.translate(msg).concat(astr) : this.translateService.translate(msg);
    }

  }
