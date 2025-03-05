import {BaseModel} from '@commonbeans/BaseModel';
import { OffenderLimits } from '@inmate/beans/OffenderLimits';

export class OffenderLimitsCommitBean extends BaseModel {

    private _insertList: Array<OffenderLimits>;
    private _deleteList: Array<OffenderLimits>;
    private _updateList: Array<OffenderLimits>;

    get insertList(): Array<OffenderLimits> { return this._insertList; }

    set insertList(pinsertList: Array<OffenderLimits>){ this._insertList = pinsertList; }

    get deleteList(): Array<OffenderLimits> { return this._deleteList; }

    set deleteList(pdeleteList: Array<OffenderLimits>){ this._deleteList = pdeleteList; }

    get updateList(): Array<OffenderLimits> { return this._updateList; }

    set updateList(pupdateList: Array<OffenderLimits>){ this._updateList = pupdateList; }

    toJSON(): any {
        return {
            'insertList': this._insertList,
            'deleteList': this._deleteList,
            'updateList': this._updateList
       };
   }
}