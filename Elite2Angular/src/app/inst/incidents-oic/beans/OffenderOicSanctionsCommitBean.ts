import {BaseModel} from '@commonbeans/BaseModel';;
import {OffenderOicSanctions} from '@instoicbeans/OffenderOicSanctions';

export class OffenderOicSanctionsCommitBean extends BaseModel {

    private _insertList: Array<OffenderOicSanctions>;
    private _deleteList: Array<OffenderOicSanctions>;
    private _updateList: Array<OffenderOicSanctions>;

    get insertList(): Array<OffenderOicSanctions> { return this._insertList; }

    set insertList(pinsertList: Array<OffenderOicSanctions>){ this._insertList = pinsertList; }

    get deleteList(): Array<OffenderOicSanctions> { return this._deleteList; }

    set deleteList(pdeleteList: Array<OffenderOicSanctions>){ this._deleteList = pdeleteList; }

    get updateList(): Array<OffenderOicSanctions> { return this._updateList; }

    set updateList(pupdateList: Array<OffenderOicSanctions>){ this._updateList = pupdateList; }

    toJSON(): any {
        return {
            'insertList': this._insertList,
            'deleteList': this._deleteList,
            'updateList': this._updateList
        };
    }
}