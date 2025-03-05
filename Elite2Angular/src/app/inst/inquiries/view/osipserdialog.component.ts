import { Component,OnInit,
        ViewChild} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OcuoccupService } from '../service/ocuoccup.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { DialogComponent } from '@core/ui-components/dialog/dialog.component';
import { ManageAppBarService } from '@core/service/manage-app-bar.service';
import { OsipsearComponent } from '@inst/visits-management/view/osipsear.component';
import { DialogService } from '@ui-components/dialog/dialog.service';
// import required bean declarations

@Component({
    selector: 'app-ocuoccup',
    templateUrl: './osipserdialog.component.html'
})

export class OsipserdialogComponent implements OnInit {
    msgs: any[] = [];
    @ViewChild('dialog', {static: true}) dialog: DialogComponent;
    @ViewChild('osipsear', {static: true}) osipsear: OsipsearComponent;
    personData: any;
    constructor(private ocuoccupFactory: OcuoccupService,
        public translateService: TranslateService,
        private sessionManager: UserSessionManager,
        private appbarService:ManageAppBarService,
        public dialogService: DialogService) {
    }
    ngOnInit() {
        const dialogData = this.dialog.data;
        if (dialogData && dialogData.forwardToDialog) {
            this.personData = dialogData.person;
        }
        if(dialogData && dialogData.sealFlag){
            this.personData = dialogData;
        }

    }
    addRecord(event) {
        if ( event ) {
            this.dialog.close({personName: event.lastName + ',' + event.firstName ,
            age: event.age,
            personId: event.personId, sexDescription:event.sexDescription,
            lastName: event.lastName, firstName: event.firstName, middleName: event.middleName,
            personLastName: event.lastName, personFirstName: event.firstName, address: event.address
        });
        } else {
            this.dialog.close( null );
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

     onCreateNewPerson() {
        this.dialogService.openLinkDialog('/OCUCNPER', this.osipsear.searchparamModel, 70)
        .subscribe(response => {
            this.osipsear.afterPersonCreated(response);
        });
        this.appbarService.manageIcon(true);
     }

     onButAddQueryclick() {
         this.osipsear.onButAddQueryclick();
         this.appbarService.manageIcon(true);
     }

     onButCancelclick() {
         this.osipsear.onButCancelclick();
         this.appbarService.manageIcon(true);
     }

     isCreatable() {
         return this.osipsear.isCreatable;
     }

     isAddable() {
        return this.osipsear.personsData.length <= 0;
     }

}
