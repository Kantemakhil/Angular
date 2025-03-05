
import { BaseModel } from "@common/beans/BaseModel";
import { GrievanceTypes } from "./GrievanceTypes";


export class GrievanceTypesCommitBean extends BaseModel {
    private _insertList: Array<GrievanceTypes>;
    private _deleteList: Array<GrievanceTypes>;
    private _updateList: Array<GrievanceTypes>;

    get insertList(): Array<GrievanceTypes> { return this._insertList; }

    set insertList( pinsertList: Array<GrievanceTypes> ) { this._insertList = pinsertList; }

    get deleteList(): Array<GrievanceTypes> { return this._deleteList; }

    set deleteList( pdeleteList: Array<GrievanceTypes> ) { this._deleteList = pdeleteList; }

    get updateList(): Array<GrievanceTypes> { return this._updateList; }

    set updateList( pupdateList: Array<GrievanceTypes> ) { this._updateList = pupdateList; }

    toJSON(): any {
        return {
            'insertList': this._insertList,
            'deleteList': this._deleteList,
            'updateList': this._updateList
        };
    }
}