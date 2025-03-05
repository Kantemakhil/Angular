import {BaseModel} from '@commonbeans/BaseModel';
import { SecurityThreatGroupsHty } from './SecurityThreatGroupsHty';

export class SecurityThreatGroupsHtyCommitBean extends BaseModel {

    private _insertList: Array<SecurityThreatGroupsHty>;
    private _deleteList: Array<SecurityThreatGroupsHty>;
    private _updateList: Array<SecurityThreatGroupsHty>;

    get insertList(): Array<SecurityThreatGroupsHty> { return this._insertList; }

    set insertList(pinsertList: Array<SecurityThreatGroupsHty>){ this._insertList = pinsertList; }

    get deleteList(): Array<SecurityThreatGroupsHty> { return this._deleteList; }

    set deleteList(pdeleteList: Array<SecurityThreatGroupsHty>){ this._deleteList = pdeleteList; }

    get updateList(): Array<SecurityThreatGroupsHty> { return this._updateList; }

    set updateList(pupdateList: Array<SecurityThreatGroupsHty>){ this._updateList = pupdateList; }

    toJSON(): any {
        return {
            'insertList': this._insertList,
            'deleteList': this._deleteList,
            'updateList': this._updateList
       };
   }
}
