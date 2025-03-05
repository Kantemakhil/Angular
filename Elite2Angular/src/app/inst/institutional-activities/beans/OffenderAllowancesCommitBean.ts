import { BaseModel } from '@commonbeans/BaseModel';
import { OffenderAllowances } from './OffenderAllowances';


export class OffenderAllowancesCommitBean extends BaseModel {

    private _insertList: Array<OffenderAllowances>;
    private _deleteList: Array<OffenderAllowances>;
    private _updateList: Array<OffenderAllowances>;
    


    get insertList(): Array<OffenderAllowances> { return this._insertList; }

    set insertList(pinsertList: Array<OffenderAllowances>) { this._insertList = pinsertList; }

    get deleteList(): Array<OffenderAllowances> { return this._deleteList; }

    set deleteList(pdeleteList: Array<OffenderAllowances>) { this._deleteList = pdeleteList; }

    get updateList(): Array<OffenderAllowances> { return this._updateList; }

    set updateList(pupdateList: Array<OffenderAllowances>) { this._updateList = pupdateList; }
    
       toJSON(): any {
        return {
            'insertList': this._insertList,
            'deleteList': this._deleteList,
            'updateList': this._updateList,
        };
    }
}
