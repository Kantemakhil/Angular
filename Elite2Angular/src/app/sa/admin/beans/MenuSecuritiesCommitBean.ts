import { BaseModel } from '@commonbeans/BaseModel';
import { MenuSecurities } from '@sa/admin/beans/MenuSecurities';

export class MenuSecuritiesCommitBean extends BaseModel {

    private _insertList: Array<MenuSecurities>;
    private _deleteList: Array<MenuSecurities>;
    private _updateList: Array<MenuSecurities>;

    get insertList(): Array<MenuSecurities> { return this._insertList; }

    set insertList( pinsertList: Array<MenuSecurities> ) { this._insertList = pinsertList; }

    get deleteList(): Array<MenuSecurities> { return this._deleteList; }

    set deleteList( pdeleteList: Array<MenuSecurities> ) { this._deleteList = pdeleteList; }

    get updateList(): Array<MenuSecurities> { return this._updateList; }

    set updateList( pupdateList: Array<MenuSecurities> ) { this._updateList = pupdateList; }

    toJSON(): any {
        return {
            'insertList': this._insertList,
            'deleteList': this._deleteList,
            'updateList': this._updateList,
        };
    }
}
