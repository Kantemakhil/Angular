import {BaseModel} from '@commonbeans/BaseModel';
import { OffenderStgDetails } from './OffenderStgDetails';

export class OffenderStgDetailsCommitBean extends BaseModel {

    private _insertList: Array<OffenderStgDetails>;
    private _deleteList: Array<OffenderStgDetails>;
    private _updateList: Array<OffenderStgDetails>;

    get insertList(): Array<OffenderStgDetails> { return this._insertList; }

    set insertList(pinsertList: Array<OffenderStgDetails>) { this._insertList = pinsertList; }

    get deleteList(): Array<OffenderStgDetails> { return this._deleteList; }

    set deleteList(pdeleteList: Array<OffenderStgDetails>) { this._deleteList = pdeleteList; }

    get updateList(): Array<OffenderStgDetails> { return this._updateList; }

    set updateList(pupdateList: Array<OffenderStgDetails>) { this._updateList = pupdateList; }

    toJSON(): any {
        return {
            'insertList': this._insertList,
            'deleteList': this._deleteList,
            'updateList': this._updateList
       };
   }
}
