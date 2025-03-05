import {BaseModel} from '@commonbeans/BaseModel';
import { OffenderEducations} from '@instdemographicsbeans/OffenderEducations';

export class OffenderEducationsCommitBean extends BaseModel {

    private _insertList: Array<OffenderEducations>;
    private _deleteList: Array<OffenderEducations>;
    private _updateList: Array<OffenderEducations>;

    get insertList(): Array<OffenderEducations> { return this._insertList; }

    set insertList(pinsertList: Array<OffenderEducations>){ this._insertList = pinsertList; }

    get deleteList(): Array<OffenderEducations> { return this._deleteList; }

    set deleteList(pdeleteList: Array<OffenderEducations>){ this._deleteList = pdeleteList; }

    get updateList(): Array<OffenderEducations> { return this._updateList; }

    set updateList(pupdateList: Array<OffenderEducations>){ this._updateList = pupdateList; }

    toJSON(): any {
        return {
            'insertList': this._insertList,
            'deleteList': this._deleteList,
            'updateList': this._updateList
       };
   }
}