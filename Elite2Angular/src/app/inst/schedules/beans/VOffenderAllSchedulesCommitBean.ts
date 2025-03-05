
import {BaseModel} from '@commonbeans/BaseModel';
import { VOffenderAllSchedules } from '@instschedulebeans/VOffenderAllSchedules';
import { ScheduleSeries } from './ScheduleSeries';

export class VOffenderAllSchedulesCommitBean extends BaseModel {
private _insertList: Array<VOffenderAllSchedules>;
  private _deleteList: Array<VOffenderAllSchedules>;
  private _updateList: Array<VOffenderAllSchedules>;
  private _seriesInsertList: ScheduleSeries;

  get insertList(): Array<VOffenderAllSchedules> { return this._insertList; }

  set insertList(pinsertList: Array<VOffenderAllSchedules>) { this._insertList = pinsertList; }

  get deleteList(): Array<VOffenderAllSchedules> { return this._deleteList; }

  set deleteList(pdeleteList: Array<VOffenderAllSchedules>) { this._deleteList = pdeleteList; }

  get updateList(): Array<VOffenderAllSchedules> { return this._updateList; }

  set updateList(pupdateList: Array<VOffenderAllSchedules>) { this._updateList = pupdateList; }

  get seriesInsertList(): ScheduleSeries { return this._seriesInsertList; }

  set seriesInsertList(value: ScheduleSeries) { this._seriesInsertList = value; }

  toJSON(): any {
    return {
      'insertList': this._insertList,
      'deleteList': this._deleteList,
      'updateList': this._updateList,
      'seriesInsertList': this._seriesInsertList
    };
  }


}
