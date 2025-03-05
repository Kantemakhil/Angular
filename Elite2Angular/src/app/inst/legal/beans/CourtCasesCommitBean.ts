import { BaseModel } from "@common/beans/BaseModel";
import { CourtCase } from '@inst/legal/beans/CourtCase';

export class CourtCasesCommitBean extends BaseModel {
    private _deleteList: Array<CourtCase>;
    private _insertList: Array<CourtCase>;
    private _updateList: Array<CourtCase>;
    private _sealFlag: string;

    get deleteList(): Array<CourtCase> { return this._deleteList; }
    set deleteList(pdeleteList: Array<CourtCase>) { this._deleteList = pdeleteList; }
    get insertList(): Array<CourtCase>  { return this._insertList; }
    set insertList(pinsertList: Array<CourtCase> ) { this._insertList = pinsertList; }
    get updateList(): Array<CourtCase>  { return this._updateList; }
    set updateList(pupdateList: Array<CourtCase> ) { this._updateList = pupdateList; }
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
