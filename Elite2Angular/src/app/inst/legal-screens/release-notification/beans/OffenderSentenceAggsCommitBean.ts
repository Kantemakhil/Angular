import { BaseModel } from '@common/beans/BaseModel';
import { OffenderSentenceAggs } from './OffenderSentenceAggs';

export class OffenderSentenceAggsCommitBean extends BaseModel {
    private _deleteList: Array<OffenderSentenceAggs>;
    private _insertList: Array<OffenderSentenceAggs>;
    private _updateList: Array<OffenderSentenceAggs>;
    private _serialVersionUID: number;


    get deleteList(): Array<OffenderSentenceAggs> { return  this._deleteList; }

    set deleteList(pdeleteList: Array<OffenderSentenceAggs>) { this._deleteList = pdeleteList; }

    get serialVersionUID(): number { return  this._serialVersionUID; }

    set serialVersionUID(pserialVersionUID: number) { this._serialVersionUID = pserialVersionUID; }

    get insertList(): Array<OffenderSentenceAggs> { return  this._insertList; }

    set insertList(pinsertList: Array<OffenderSentenceAggs>) { this._insertList = pinsertList; }

    get updateList(): Array<OffenderSentenceAggs> { return  this._updateList; }

    set updateList(pupdateList: Array<OffenderSentenceAggs>) { this._updateList = pupdateList; }


    toJSON(): any  {
       return {
         'deleteList': this._deleteList,
         'serialVersionUID': this._serialVersionUID,
         'insertList': this._insertList,
         'updateList': this._updateList,
          };
       }
}
