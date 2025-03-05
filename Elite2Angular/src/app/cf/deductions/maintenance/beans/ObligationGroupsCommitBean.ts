import { BaseModel } from '@commonbeans/BaseModel';
import { ObligationGroups } from './ObligationGroups';

// import { ObligationGroups } from '@inst/classification/beans/ObligationGroups';

export class ObligationGroupsCommitBean extends BaseModel {

    private _insertList: Array<ObligationGroups>;
    private _deleteList: Array<ObligationGroups>;
    private _updateList: Array<ObligationGroups>;

    get insertList(): Array<ObligationGroups> { return this._insertList; }

    set insertList(pinsertList: Array<ObligationGroups>) { this._insertList = pinsertList; }

    get deleteList(): Array<ObligationGroups> { return this._deleteList; }

    set deleteList(pdeleteList: Array<ObligationGroups>) { this._deleteList = pdeleteList; }

    get updateList(): Array<ObligationGroups> { return this._updateList; }

    set updateList(pupdateList: Array<ObligationGroups>) { this._updateList = pupdateList; }

    toJSON(): any {
        return {
            'insertList': this._insertList,
            'deleteList': this._deleteList,
            'updateList': this._updateList,
        };
    }
}
