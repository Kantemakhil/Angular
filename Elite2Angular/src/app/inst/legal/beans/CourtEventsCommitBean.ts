import { BaseModel } from "@common/beans/BaseModel";
import { CourtEvents } from '@inst/legal/beans/CourtEvents';

export class CourtEventsCommitBean extends BaseModel {
    private _deleteList: Array<CourtEvents>;
    private _insertList: Array<CourtEvents>;
    private _updateList: Array<CourtEvents>;
    private _sealFlag: string;
    private _agyLocId: string;

    get deleteList(): Array<CourtEvents> { return this._deleteList; }
    set deleteList(pdeleteList: Array<CourtEvents>) { this._deleteList = pdeleteList; }
    get insertList(): Array<CourtEvents>  { return this._insertList; }
    set insertList(pinsertList: Array<CourtEvents> ) { this._insertList = pinsertList; }
    get updateList(): Array<CourtEvents>  { return this._updateList; }
    set updateList(pupdateList: Array<CourtEvents> ) { this._updateList = pupdateList; }
    get sealFlag(): string { return this._sealFlag; }
    set sealFlag(psealFlag: string) { this._sealFlag = psealFlag; }
    get agyLocId(): string { return this._agyLocId; }
    set agyLocId(agyLocId: string) { this._agyLocId = agyLocId; }

    toJSON(): any {
        return {
            'deleteList': this._deleteList,
            'insertList': this._insertList,
            'updateList': this._updateList,
            'sealFlag': this._sealFlag,
            'agyLocId': this._agyLocId,
        };
    }
}
