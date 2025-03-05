import {BaseModel} from '@commonbeans/BaseModel';
import {HealthRecordDetails} from './HealthRecordDetails';

export class HealthRecordDetailsCommitBean extends BaseModel {
private _insertList: Array<HealthRecordDetails>;
  private _deleteList: Array<HealthRecordDetails>;
  private _updateList: Array<HealthRecordDetails>;

  get insertList(): Array<HealthRecordDetails> { return this._insertList; }

  set insertList(pinsertList: Array<HealthRecordDetails>){ this._insertList = pinsertList; }

  get deleteList(): Array<HealthRecordDetails> { return this._deleteList; }

  set deleteList(pdeleteList: Array<HealthRecordDetails>){ this._deleteList = pdeleteList; }

  get updateList(): Array<HealthRecordDetails> { return this._updateList; }

  set updateList(pupdateList: Array<HealthRecordDetails>){ this._updateList = pupdateList; }

  toJSON(): any {
    return {
      'insertList': this._insertList,
      'deleteList': this._deleteList,
      'updateList': this._updateList
    };
  }

}
