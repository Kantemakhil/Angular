import { BaseModel } from '@commonbeans/BaseModel';
import { MovementReasons } from '@inst/movements/maintenance/beans/MovementReasons';



export class MovementReasonsCommitBean extends BaseModel {
    private _insertList: Array<MovementReasons>;
    private _deleteList: Array<MovementReasons>;
    private _updateList: Array<MovementReasons>;

    get insertList(): Array<MovementReasons> { return this._insertList; }

    set insertList( pinsertList: Array<MovementReasons> ) { this._insertList = pinsertList; }

    get deleteList(): Array<MovementReasons> { return this._deleteList; }

    set deleteList( pdeleteList: Array<MovementReasons> ) { this._deleteList = pdeleteList; }

    get updateList(): Array<MovementReasons> { return this._updateList; }

    set updateList( pupdateList: Array<MovementReasons> ) { this._updateList = pupdateList; }

    toJSON(): any {
        return {
            'insertList': this._insertList,
            'deleteList': this._deleteList,
            'updateList': this._updateList
        };
    }
}
