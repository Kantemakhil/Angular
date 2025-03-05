import { BaseModel } from '@commonbeans/BaseModel';
import { OffenderLanguages } from '@instdemographicsbeans/OffenderLanguages';

export class OffenderLanguagesCommitBean extends BaseModel {
    private _deleteList: Array<OffenderLanguages>;
    private _insertList: Array<OffenderLanguages>;
    private _updateList: Array<OffenderLanguages>;

    get deleteList(): Array<OffenderLanguages> { return this._deleteList; }

    set deleteList(pdeleteList: Array<OffenderLanguages>) { this._deleteList = pdeleteList; }

    get insertList(): Array<OffenderLanguages> { return this._insertList; }

    set insertList(pinsertList: Array<OffenderLanguages>) { this._insertList = pinsertList; }

    get updateList(): Array<OffenderLanguages> { return this._updateList; }

    set updateList(pupdateList: Array<OffenderLanguages>) { this._updateList = pupdateList; }


    toJSON(): any {
        return {
            'deleteList': this._deleteList,
            'insertList': this._insertList,
            'updateList': this._updateList,
        };
    }
}
