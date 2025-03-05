import { LivingUnits } from './../../demographics-biometrics/beans/LivingUnits';
import { DialogComponent } from '@core/ui-components/dialog/dialog.component';
import {
  Component,
  OnInit,
  ViewChild
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { VStgLocationMembers } from '@instSecurityThreatGroupsbeans/VStgLocationMembers';
import { OiistgmbService } from '@inst/securitythreatgroups/service/oiistgmb.service';
import { AgencyLocations } from '@sa/admin/beans/AgencyLocations';


@Component({
  selector: 'app-oiistgmb',
  templateUrl: './oiistgmb.component.html'
})

export class OiistgmbComponent implements OnInit {
  @ViewChild('dialog', {static: true}) dialog: DialogComponent;
  actionName: string;
  lovModel: any[];
  msgs: any[] = [];
  nameOfLovPage: string;
  listToCompare: any[] = [];
  livingunitsData: LivingUnits[] = [];
  livingunitsDataTemp: LivingUnits[] = [];
  livingunitsModel: LivingUnits = new LivingUnits();
  livingunitsIndex: Number;
  livingunitsInsertList: LivingUnits[] = [];
  livingunitsUpdatetList: LivingUnits[] = [];
  livingunitsDeleteList: LivingUnits[] = [];
  vstglocationmembersData: any[] = [];
  VStgLocationMembers: any[] = [];
  vstglocationmembersDataTemp: VStgLocationMembers[] = [];
  vstglocationmembersModel: VStgLocationMembers = new VStgLocationMembers();
  vstglocationmembersIndex: number;
  vstglocationmembersInsertList: VStgLocationMembers[] = [];
  vstglocationmembersUpdatetList: VStgLocationMembers[] = [];
  vstglocationmembersDeleteList: VStgLocationMembers[] = [];
  minDate: Date;
  display: boolean;
  errorMessage: string;
  headerMessage: string;
  disabled: Boolean;
  editable: Boolean = true;
  livingUnitsColumnDef: any[];
  vStgLocationMembersColumnDef: any[];
  locationModel: any;
  screenId: string;
  agencyLocationsModel: AgencyLocations = new AgencyLocations();
  agyLocId: string;
  description: string;
  tableIndex = -1;
  constructor(private oiistgmbFactory: OiistgmbService,
    public translateService: TranslateService,
    public sessionManager: UserSessionManager) {
    this.livingUnitsColumnDef = [];
    this.vStgLocationMembersColumnDef = [];
  }
  trMsg(msg, astr?) {
    return astr ? this.translateService.translate(msg).concat(astr) : this.translateService.translate(msg);
  }
  ngOnInit() {
    this.agencyLocationsModel = new AgencyLocations();
    this.agencyLocationsModel.agyLocId = this.dialog.data.agyLocId;
    this.description = this.dialog.data.locationDescription;
    this.livingUnitsExecuteQuery();
    this.livingUnitsColumnDef = [
      { fieldName: this.trMsg('oiistgmb.housinglocations'), field: 'livingUnitCode', editable: false, width: 150 },
      { fieldName: this.trMsg('oiistgmb.noofmembers'), field: 'numbers', editable: false, width: 150 },
    ];
    this.vStgLocationMembersColumnDef = [
      { fieldName: this.trMsg('system-profile.off-id-code'), field: 'offenderIdDisplay', editable: false, width: 150 },
      { fieldName: this.trMsg('system-profile.name-last'), field: 'lastName', editable: false, width: 150 },
      { fieldName: this.trMsg('system-profile.name-given-1'), field: 'firstName', editable: false, width: 150 },
      { fieldName: this.trMsg('common.housinglocation'), field: 'description', editable: false, width: 150 },
      { fieldName: this.trMsg('common.status'), field: 'status', editable: false, width: 150 },
    ];
  }
  /**
   * This function displays the messages
   */
  show(vldmsg, type?) {
    type = type ? type : 'warn';
    vldmsg = this.translateService.translate(vldmsg);
    const msgval = [{ message: vldmsg, type: type }];
    this.msgs = [...msgval];
  }
  allowNumbers(event) {
  }
  onRowClicklivingunits(event) {
    if (event) {
      this.livingunitsModel = event;
      if (this.dialog.data.stgId) {
        this.vstglocationmembersModel = new VStgLocationMembers();
        this.vstglocationmembersModel.stgId = this.dialog.data.stgId;
        this.vstglocationmembersModel.livingUnitId = this.livingunitsModel.livingUnitId;
        this.vstglocationmembersModel.agyLocId = this.livingunitsModel.agyLocId;
        this.vStgLocationMembersExecuteQuery();
      }
    }
  }
  livingUnitsExecuteQuery() {
    this.livingunitsModel.agyLocId = this.dialog.data.agyLocId;
    this.livingunitsModel.stgId = this.dialog.data.stgId;
    const livingunitsResult = this.oiistgmbFactory.livingUnitsExecuteQueryService(this.livingunitsModel);
    livingunitsResult.subscribe(data => {
      if (data.length === 0) {
        this.livingunitsData = [];
      } else {
        this.livingunitsData = data;
        this.tableIndex = 0;
      }
    });
  }
  vStgLocationMembersExecuteQuery() {
    const vstglocationmembersResult = this.oiistgmbFactory.vStgLocationMembersExecuteQuery(this.vstglocationmembersModel);
    vstglocationmembersResult.subscribe(data => {
      if (data.length === 0) {
        this.vstglocationmembersData = [];
      } else {
        this.vstglocationmembersData = data;
      }
    });
  }
}
