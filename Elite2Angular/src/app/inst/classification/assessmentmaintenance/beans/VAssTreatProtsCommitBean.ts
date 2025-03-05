import { BaseModel } from '@commonbeans/BaseModel';
import { VAssTreatProts } from './VAssTreatProts';


export class VAssTreatProtsCommitBean extends BaseModel {
    private _insertList: Array<VAssTreatProts>;
    private _deleteList: Array<VAssTreatProts>;
    private _updateList: Array<VAssTreatProts>;

    get insertList(): Array<VAssTreatProts> { return this._insertList; }

    set insertList( pinsertList: Array<VAssTreatProts> ) { this._insertList = pinsertList; }

    get deleteList(): Array<VAssTreatProts> { return this._deleteList; }

    set deleteList( pdeleteList: Array<VAssTreatProts> ) { this._deleteList = pdeleteList; }

    get updateList(): Array<VAssTreatProts> { return this._updateList; }

    set updateList( pupdateList: Array<VAssTreatProts> ) { this._updateList = pupdateList; }

    toJSON(): any {
        return {
            'insertList': this._insertList,
            'deleteList': this._deleteList,
            'updateList': this._updateList
        };
    }
}