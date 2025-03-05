import { BaseModel } from '@commonbeans/BaseModel';
import { OffenderStgAssociations } from '@instSecurityThreatGroupsbeans/OffenderStgAssociations';

export class OffenderStgAssociationsCommitBean extends BaseModel {

    private _insertList: Array<OffenderStgAssociations>;
    private _deleteList: Array<OffenderStgAssociations>;
    private _updateList: Array<OffenderStgAssociations>;

    get insertList(): Array<OffenderStgAssociations> { return this._insertList; }

    set insertList(pinsertList: Array<OffenderStgAssociations>) { this._insertList = pinsertList; }

    get deleteList(): Array<OffenderStgAssociations> { return this._deleteList; }

    set deleteList(pdeleteList: Array<OffenderStgAssociations>) { this._deleteList = pdeleteList; }

    get updateList(): Array<OffenderStgAssociations> { return this._updateList; }

    set updateList(pupdateList: Array<OffenderStgAssociations>) { this._updateList = pupdateList; }

    toJSON(): any {
        return {
            'insertList': this._insertList,
            'deleteList': this._deleteList,
            'updateList': this._updateList
        };
    }
}
