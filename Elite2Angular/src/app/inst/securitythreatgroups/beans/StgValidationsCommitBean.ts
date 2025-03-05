import { BaseModel } from '@commonbeans/BaseModel';
import { StgValidations } from '@instSecurityThreatGroupsbeans/StgValidations';


export class StgValidationsCommitBean extends BaseModel {

    private _insertList: Array<StgValidations>;
    private _updateList: Array<StgValidations>;
    private _deleteList: Array<StgValidations>;

    get insertList(): Array<StgValidations> { return this._insertList; }
    set insertList(insert: Array<StgValidations>) { this._insertList = insert; }

    get updateList(): Array<StgValidations> { return this._updateList; }
    set updateList(update: Array<StgValidations>) { this._updateList = update; }

    get deleteList(): Array<StgValidations> { return this._deleteList; }
    set deleteList(pdeleteList: Array<StgValidations>) { this._deleteList = pdeleteList; }

    toJSON(): any {
        return {
            'insertList': this._insertList,
            'updateList': this._updateList,
            'deleteList': this._deleteList
        };
    }
}
