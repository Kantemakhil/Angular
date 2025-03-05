import {BaseModel} from '@commonbeans/BaseModel';
import { CorporateTypes } from './CorporateTypes';


export class CorporateTypesCommitBean extends BaseModel {

    private _insertList: Array<CorporateTypes>;
    private _deleteList: Array<CorporateTypes>;
    private _updateList: Array<CorporateTypes>;

    get insertList(): Array<CorporateTypes> { return this._insertList; }

    set insertList(pinsertList: Array<CorporateTypes>) { this._insertList = pinsertList; }

    get deleteList(): Array<CorporateTypes> { return this._deleteList; }

    set deleteList(pdeleteList: Array<CorporateTypes>) { this._deleteList = pdeleteList; }

    get updateList(): Array<CorporateTypes> { return this._updateList; }

    set updateList(pupdateList: Array<CorporateTypes>) { this._updateList = pupdateList; }

    toJSON(): any {
        return {
            'insertList': this._insertList,
            'deleteList': this._deleteList,
            'updateList': this._updateList
       };
   }
}