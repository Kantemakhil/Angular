import {BaseModel} from './BaseModel';
import { ImageOriginals } from './ImageOriginals';

export class ImageOriginalsCommitBean extends BaseModel {

    private _insertList: Array<ImageOriginals>;
    private _deleteList: Array<ImageOriginals>;
    private _updateList: Array<ImageOriginals>;

    get insertList(): Array<ImageOriginals> { return this._insertList; }

    set insertList(pinsertList: Array<ImageOriginals>) { this._insertList = pinsertList; }

    get deleteList(): Array<ImageOriginals> { return this._deleteList; }

    set deleteList(pdeleteList: Array<ImageOriginals>) { this._deleteList = pdeleteList; }

    get updateList():  Array<ImageOriginals> { return this._updateList; }

    set updateList(pupdateList:  Array<ImageOriginals>) { this._updateList = pupdateList; }

    toJSON(): any {
        return {
            'insertList': this._insertList,
            'deleteList': this._deleteList,
            'updateList': this._updateList
        };
    }
}
