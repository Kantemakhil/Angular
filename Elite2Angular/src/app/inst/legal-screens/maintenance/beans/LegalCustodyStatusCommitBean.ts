import { BaseModel } from '@commonbeans/BaseModel';
import { LegalCustodyStatus } from './LegalCustodyStatus';

export class LegalCustodyStatusCommitBean extends BaseModel {
    private _insertList: Array<LegalCustodyStatus>;
    private _deleteList: Array<LegalCustodyStatus>;
    private _updateList: Array<LegalCustodyStatus>;
    public get updateList(): Array<LegalCustodyStatus> {
        return this._updateList;
    }
    public set updateList(value: Array<LegalCustodyStatus>) {
        this._updateList = value;
    }

    public get insertList(): Array<LegalCustodyStatus> {
        return this._insertList;
    }
    public set insertList(value: Array<LegalCustodyStatus>) {
        this._insertList = value;
    }

    public get deleteList(): Array<LegalCustodyStatus> {
        return this._deleteList;
    }
    public set deleteList(value: Array<LegalCustodyStatus>) {
        this._deleteList = value;
    }

    toJSON(): any {
        return {
            'insertList': this._insertList,
            'deleteList': this._deleteList,
            'updateList': this._updateList
        };
    }
}
