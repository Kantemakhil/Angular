import { BaseModel } from "@common/beans/BaseModel";
import { VCbCustodyPeriod } from "./VCbCustodyPeriod";

export  class VCbCustodyPeriodCommitBean extends BaseModel {

    private _deleteList: Array<VCbCustodyPeriod>;
    private _insertList: Array<VCbCustodyPeriod>;
    private _updateList: Array<VCbCustodyPeriod>;

    get deleteList(): Array<VCbCustodyPeriod> { return this._deleteList; }
    set deleteList(pdeleteList: Array<VCbCustodyPeriod>) { this._deleteList = pdeleteList ; }
    get insertList(): Array<VCbCustodyPeriod> { return this._insertList; }
    set insertList(pinsertList: Array<VCbCustodyPeriod> ) { this._insertList = pinsertList ; }
    get updateList(): Array<VCbCustodyPeriod> { return this._updateList; }
    set updateList(pupdateList: Array<VCbCustodyPeriod> ) { this._updateList = pupdateList ; }

toJSON(): any {
    return {
       'deleteList': this._deleteList,
       'insertList': this._insertList,
       'updateList': this._updateList,
        };
    }
}
