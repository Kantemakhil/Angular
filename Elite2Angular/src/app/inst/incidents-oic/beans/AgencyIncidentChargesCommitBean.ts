import {BaseModel} from '@commonbeans/BaseModel';
import { AgencyIncidentCharges } from '@instincidentsbeans/AgencyIncidentCharges';
import { AgencyIncidentParties } from '@instincidentsbeans/AgencyIncidentParties';
import { AgencyIncidentRepairs } from '@instincidentsbeans/AgencyIncidentRepairs';

export class AgencyIncidentChargesCommitBean extends BaseModel {
  private _insertList: Array<AgencyIncidentCharges>;
  private _deleteList: Array<AgencyIncidentCharges>;
  private _updateList: Array<AgencyIncidentCharges>;
  private _insertOffenderInvList: Array<AgencyIncidentParties>;
  private _updateOffenderInvList: Array<AgencyIncidentParties>;
  private _insertStaffPartiesList: Array<AgencyIncidentParties>;
  private _insertRepairList: Array<AgencyIncidentRepairs>;
  private _updateRepairList: Array<AgencyIncidentRepairs>;

  get insertList(): Array<AgencyIncidentCharges> { return this._insertList; }

  set insertList(pinsertList: Array<AgencyIncidentCharges>) { this._insertList = pinsertList; }

  get deleteList(): Array<AgencyIncidentCharges> { return this._deleteList; }

  set deleteList(pdeleteList: Array<AgencyIncidentCharges>) { this._deleteList = pdeleteList; }

  get updateList(): Array<AgencyIncidentCharges> { return this._updateList; }

  set updateList(pupdateList: Array<AgencyIncidentCharges>) { this._updateList = pupdateList; }

  get insertOffenderInvList(): Array<AgencyIncidentParties> { return this._insertOffenderInvList; }

  set insertOffenderInvList(pinsertOffenderInvList: Array<AgencyIncidentParties>) { this._insertOffenderInvList = pinsertOffenderInvList; }

  get updateOffenderInvList(): Array<AgencyIncidentParties> { return this._updateOffenderInvList; }

  set updateOffenderInvList(pupdateOffenderInvList: Array<AgencyIncidentParties>) { this._updateOffenderInvList = pupdateOffenderInvList; }

  get insertRepairList(): Array<AgencyIncidentRepairs> { return this._insertRepairList; }

  set insertRepairList(pinsertRepairList: Array<AgencyIncidentRepairs>) { this._insertRepairList = pinsertRepairList; }

  get updateRepairList(): Array<AgencyIncidentRepairs> { return this._updateRepairList; }

  set updateRepairList(pupdateRepairList: Array<AgencyIncidentRepairs>) { this._updateRepairList = pupdateRepairList; }

  get insertStaffPartiesList(): Array<AgencyIncidentParties> { return this._insertStaffPartiesList; }

  set insertStaffPartiesList(pinsertStaffPartiesList: Array<AgencyIncidentParties>) {
     this._insertStaffPartiesList = pinsertStaffPartiesList; }


  toJSON(): any {
    return {
      'insertList': this._insertList,
      'deleteList': this._deleteList,
      'updateList': this._updateList,
      'insertOffenderInvList': this._insertOffenderInvList,
      'updateOffenderInvList': this._updateOffenderInvList,
      'insertRepairList': this._insertRepairList,
      'updateRepairList': this._updateRepairList,
      'insertStaffPartiesList': this._insertStaffPartiesList
    };
  }


}
