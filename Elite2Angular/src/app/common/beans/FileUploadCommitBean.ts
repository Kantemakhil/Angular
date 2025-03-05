import { Fileupload } from './Fileupload';
import { BaseModel } from './BaseModel';


export class FileUploadCommitBean extends BaseModel {

    private _insertList: Array<Fileupload>;
    private _deleteList: Array<Fileupload>;
    private _updateList: Array<Fileupload>;

    get insertList(): Array<Fileupload> { return this._insertList; }

    set insertList(pinsertList: Array<Fileupload>) { this._insertList = pinsertList; }
    get updateList(): Array<Fileupload> { return this._updateList; }

    set updateList(pupdateList: Array<Fileupload>) { this._updateList = pupdateList; }

    get deleteList(): Array<Fileupload> { return this._deleteList; }

    set deleteList(pdeleteList: Array<Fileupload>) { this._deleteList = pdeleteList; }

    toJSON(): any {
        return {
            'insertList': this._insertList,
            'deleteList': this._deleteList,
            'updateList': this._updateList
        };
    }
}