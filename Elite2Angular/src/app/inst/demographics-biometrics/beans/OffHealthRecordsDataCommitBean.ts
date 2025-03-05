import {BaseModel} from '@commonbeans/BaseModel';
import {OffHealthRecordsData} from './OffHealthRecordsData';

export class OffHealthRecordsDataCommitBean extends BaseModel {
private _insertList: Array<OffHealthRecordsData>;
private _deleteList: Array<OffHealthRecordsData>;
  private _updateList: Array<OffHealthRecordsData>;

  get insertList(): Array<OffHealthRecordsData> { return this._insertList; }

  set insertList(pinsertList: Array<OffHealthRecordsData>){ this._insertList = pinsertList; }


  get deleteList(): Array<OffHealthRecordsData> { return this._deleteList; }

    set deleteList( pdeleteList: Array<OffHealthRecordsData> ) { this._deleteList = pdeleteList; }


  get updateList(): Array<OffHealthRecordsData> { return this._updateList; }

  set updateList(pupdateList: Array<OffHealthRecordsData>){ this._updateList = pupdateList; }

  toJSON(): any {
    return {
      'insertList': this._insertList,
      'deleteList': this._deleteList,
      'updateList': this._updateList
    };
  }

}
