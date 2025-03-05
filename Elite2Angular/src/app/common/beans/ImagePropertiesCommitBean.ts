import {BaseModel} from './BaseModel';
import {ImageProperties} from './ImageProperties';

export class ImagePropertiesCommitBean extends BaseModel {

    private _insertList: Array<ImageProperties>;
    private _deleteList: Array<ImageProperties>;
    private _updateList: Array<ImageProperties>;

    get insertList(): Array<ImageProperties> { return this._insertList; }

    set insertList(pinsertList: Array<ImageProperties>) { this._insertList = pinsertList; }

    get deleteList(): Array<ImageProperties> { return this._deleteList; }

    set deleteList(pdeleteList: Array<ImageProperties>) { this._deleteList = pdeleteList; }

    get updateList(): Array<ImageProperties> { return this._updateList; }

    set updateList(pupdateList: Array<ImageProperties>) { this._updateList = pupdateList; }

    toJSON(): any {
        return {
            'insertList': this._insertList,
            'deleteList': this._deleteList,
            'updateList': this._updateList
        };
    }
}