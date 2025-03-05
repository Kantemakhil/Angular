import {BaseModel} from '@commonbeans/BaseModel';
import { OffenderPptyItems } from '@instproperty/OffenderPptyItems';

export class OffenderPptyItemsCommitBean extends BaseModel {
private _insertList: Array<OffenderPptyItems>;
  private _deleteList: Array<OffenderPptyItems>;
  private _updateList: Array<OffenderPptyItems>;

  get insertList(): Array<OffenderPptyItems> { return this._insertList;}

  set insertList(pinsertList: Array<OffenderPptyItems>){ this._insertList = pinsertList; }

  get deleteList(): Array<OffenderPptyItems> { return this._deleteList; }

  set deleteList(pdeleteList: Array<OffenderPptyItems>){ this._deleteList = pdeleteList;}

  get updateList(): Array<OffenderPptyItems> { return this._updateList; }

  set updateList(pupdateList: Array<OffenderPptyItems>){ this._updateList = pupdateList; }

  toJSON(): any {
    return {
      'insertList': this._insertList,
      'deleteList': this._deleteList,
      'updateList': this._updateList
    };
  }
  
  
}