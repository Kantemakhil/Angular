import { BaseModel } from '@commonbeans/BaseModel';
import { LegalSettings } from './LegalSettings';

export class LegalSettingsCommitBean extends BaseModel {
    private _insertList: Array<LegalSettings>;
    private _deleteList: Array<LegalSettings>;
    private _updateList: Array<LegalSettings>;
    public get updateList(): Array<LegalSettings> {
        return this._updateList;
    }
    public set updateList(value: Array<LegalSettings>) {
        this._updateList = value;
    }

    public get insertList(): Array<LegalSettings> {
        return this._insertList;
    }
    public set insertList(value: Array<LegalSettings>) {
        this._insertList = value;
    }

    public get deleteList(): Array<LegalSettings> {
        return this._deleteList;
    }
    public set deleteList(value: Array<LegalSettings>) {
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
