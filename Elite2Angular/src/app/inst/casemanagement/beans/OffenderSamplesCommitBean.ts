import { BaseModel } from '@commonbeans/BaseModel';
import { OffenderSamples } from '@instCaseManagementbeans/OffenderSamples';

export class OffenderSamplesCommitBean extends BaseModel {

    private _insertList: Array<OffenderSamples>;
    private _deleteList: Array<OffenderSamples>;
    private _updateList: Array<OffenderSamples>;

    get insertList(): Array<OffenderSamples> { return this._insertList; }

    set insertList(pinsertList: Array<OffenderSamples>) { this._insertList = pinsertList; }

    get deleteList(): Array<OffenderSamples> { return this._deleteList; }

    set deleteList(pdeleteList: Array<OffenderSamples>) { this._deleteList = pdeleteList; }

    get updateList(): Array<OffenderSamples> { return this._updateList; }

    set updateList(pupdateList: Array<OffenderSamples>) { this._updateList = pupdateList; }

    toJSON(): any {
        return {
            'insertList': this._insertList,
            'deleteList': this._deleteList,
            'updateList': this._updateList
        };
    }
}
