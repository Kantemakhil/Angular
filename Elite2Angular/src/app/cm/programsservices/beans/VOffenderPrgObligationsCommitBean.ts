import { BaseModel } from "@common/beans/BaseModel";
import { VOffenderPrgObligations } from "./VOffenderPrgObligations";

export class VOffenderPrgObligationsCommitBean extends BaseModel {
    private _insertList: Array<VOffenderPrgObligations>;
    private _deleteList: Array<VOffenderPrgObligations>;
    private _updateList: Array<VOffenderPrgObligations>;
    get insertList(): Array<VOffenderPrgObligations> { return this._insertList; }

    set insertList(pinsertList: Array<VOffenderPrgObligations>) { this._insertList = pinsertList; }

    get deleteList(): Array<VOffenderPrgObligations> { return this._deleteList; }

    set deleteList(pdeleteList: Array<VOffenderPrgObligations>) { this._deleteList = pdeleteList; }

    get updateList(): Array<VOffenderPrgObligations> { return this._updateList; }

    set updateList(pupdateList: Array<VOffenderPrgObligations>) { this._updateList = pupdateList; }


    toJSON(): any {
        return {
            'insertList': this._insertList,
            'deleteList': this._deleteList,
            'updateList': this._updateList,
        };
    }
}
