import { BaseModel } from '@commonbeans/BaseModel';	
import { OffenceResultCodes } from './OffenceResultCodes';
export class OffenceResultCodesCommitBean  extends BaseModel {
    private _insertList: Array<OffenceResultCodes>;
    private _deleteList: Array<OffenceResultCodes>;
    private _updateList: Array<OffenceResultCodes>;

    get insertList(): Array<OffenceResultCodes> { return this._insertList; }

    set insertList(pinsertList: Array<OffenceResultCodes>) { this._insertList = pinsertList; }

    get deleteList(): Array<OffenceResultCodes> { return this._deleteList; }

    set deleteList(pdeleteList: Array<OffenceResultCodes>) { this._deleteList = pdeleteList; }

    get updateList(): Array<OffenceResultCodes> { return this._updateList; }

    set updateList(pupdateList: Array<OffenceResultCodes>) { this._updateList = pupdateList; }

    toJSON(): any {
        return {
            'insertList': this._insertList,
            'deleteList': this._deleteList,
            'updateList': this._updateList,
        };
    }
}