import {BaseModel} from '@commonbeans/BaseModel';
import { OicHearings } from '@instincidentsbeans/OicHearings';

export class OicHearingsCommitBean extends BaseModel {

    private _insertList: Array<OicHearings>;
    private _deleteList: Array<OicHearings>;
    private _updateList: Array<OicHearings>;

    get insertList(): Array<OicHearings> { return this._insertList; }

    set insertList(pinsertList: Array<OicHearings>) { this._insertList = pinsertList; }

    get deleteList(): Array<OicHearings> { return this._deleteList; }

    set deleteList(pdeleteList: Array<OicHearings>) { this._deleteList = pdeleteList; }

    get updateList(): Array<OicHearings> { return this._updateList; }

    set updateList(pupdateList: Array<OicHearings>) { this._updateList = pupdateList; }

    toJSON(): any {
        return {
            'insertList': this._insertList,
            'deleteList': this._deleteList,
            'updateList': this._updateList
       };
   }
}
