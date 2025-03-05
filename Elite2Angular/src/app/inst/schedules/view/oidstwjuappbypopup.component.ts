import {
    Component, OnInit, ViewChild
  } from '@angular/core';
  import {TranslateService} from '@common/translate/translate.service';
  import {OidstwjuService} from '../service/oidstwju.service';
  import {DialogComponent} from '@ui-components/dialog/dialog.component';
  import {StaffMembers} from '@instincidentsbeans/StaffMembers';
  import { UserSessionManager } from '@core/classes/userSessionManager';
@Component({
    selector: 'app-oidstwjuappbypopup',
    templateUrl: './oidstwjuappbypopup.component.html'
})

  export class OidstwjuappbypopupComponent implements OnInit {
    @ViewChild('dialog', {static: true}) dialog: DialogComponent;
    lovColumnDef: any[];
    lovData: StaffMembers[] = [];
    staffMembersModel: StaffMembers = new StaffMembers();
    caseLoadId: any;
    constructor(private oidstwjuFactory: OidstwjuService,
        public translateService: TranslateService, private sessionManager: UserSessionManager) {
      this.lovColumnDef = [];
    }
    ngOnInit() {
        this.caseLoadId = this.sessionManager.currentCaseLoad;
      this.lovColumnDef = [
        {
          fieldName: this.translateService.translate('oidstwju.appbylastname'), field: 'lastName', datatype: 'text',
          editable: false, width: 160
        },
        {
          fieldName: this.translateService.translate('oidstwju.appbyfirstname'), field: 'firstName', datatype: 'text',
          editable: false, width: 350
        },
        {
            fieldName: this.translateService.translate('oidstwju.appbymiddlename'), field: 'middleName', datatype: 'text',
            editable: false, width: 350
          },
      ];
const rgapprovedbyServiceObj = this.oidstwjuFactory.rgApprovedByRecordGroup(this.caseLoadId);
    rgapprovedbyServiceObj.subscribe(rgApprovedbyList => {
            if (rgApprovedbyList.length === 0) {
                 this.lovData = [];
             } else {
                this.lovData = rgApprovedbyList;
        }
    });

    }

    onRowClickLov(event) {
      this.staffMembersModel = new StaffMembers();
      this.staffMembersModel.lastName = event.lastName;
      this.staffMembersModel.firstName = event.firstName;
      this.staffMembersModel.middleName = event.middleName;
      this.staffMembersModel.staffId = event.staffId;
    }

    processResult() {
      if (this.staffMembersModel.lastName) {
        this.dialog.close({
          nbtLastName: this.staffMembersModel.lastName,
          nbtFirstName: this.staffMembersModel.firstName,
          nbtMiddleName: this.staffMembersModel.middleName,
          staffId: this.staffMembersModel.staffId
        });
      } else {
        this.dialog.close(null);
      }

    }
    clearData() {
      this.dialog.close(null);
    }

  }
