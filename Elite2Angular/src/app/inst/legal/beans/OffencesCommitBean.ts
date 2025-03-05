import { BaseModel } from "@common/beans/BaseModel";
import { OffensesOutcome } from '@inst/legal/beans/OffensesOutcome';

export class OffencesCommitBean extends BaseModel {
    private _deleteList: Array<OffensesOutcome>;
    private _insertList: Array<OffensesOutcome>;
    private _updateList: Array<OffensesOutcome>;
    private _sealFlag: string;

    get deleteList(): Array<OffensesOutcome> { return this._deleteList; }
    set deleteList(pdeleteList: Array<OffensesOutcome>) { this._deleteList = pdeleteList; }
    get insertList(): Array<OffensesOutcome>  { return this._insertList; }
    set insertList(pinsertList: Array<OffensesOutcome> ) { this._insertList = pinsertList; }
    get updateList(): Array<OffensesOutcome>  { return this._updateList; }
    set updateList(pupdateList: Array<OffensesOutcome> ) { this._updateList = pupdateList; }
    get sealFlag(): string { return this._sealFlag; }
    set sealFlag(psealFlag: string) { this._sealFlag = psealFlag; }


    toJSON(): any {
        return {
            'deleteList': this._deleteList,
            'insertList': this._insertList,
            'updateList': this._updateList,
            'sealFlag': this._sealFlag,
        };
    }
}
