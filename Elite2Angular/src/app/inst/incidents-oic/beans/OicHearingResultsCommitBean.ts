import {BaseModel} from '@commonbeans/BaseModel'; 
import { OicHearingResults } from '@instincidentsbeans/OicHearingResults';

export class OicHearingResultsCommitBean extends BaseModel {

    private _insertList: Array<OicHearingResults>;
    private _deleteList: Array<OicHearingResults>;
    private _updateList: Array<OicHearingResults>;

    get insertList(): Array<OicHearingResults> { return this._insertList; }

    set insertList(pinsertList: Array<OicHearingResults>) { this._insertList = pinsertList; }

    get deleteList(): Array<OicHearingResults> { return this._deleteList; }

    set deleteList(pdeleteList: Array<OicHearingResults>) { this._deleteList = pdeleteList; }

    get updateList(): Array<OicHearingResults> { return this._updateList; }

    set updateList(pupdateList: Array<OicHearingResults>) { this._updateList = pupdateList; }

    toJSON(): any {
        return {
            'insertList': this._insertList,
            'deleteList': this._deleteList,
            'updateList': this._updateList
        };
    }
}
