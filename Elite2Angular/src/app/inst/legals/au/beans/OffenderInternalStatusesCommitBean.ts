
import { OffenderInternalStatuses } from "./OffenderInternalStatuses";
import { OffenderCipCauses } from "@inst/legals/au/beans/OffenderCipCauses";
import { OffenderCipReasons } from "@inst/legals/au/beans/OffenderCipReasons";
export class OffenderInternalStatusesCommitBean {
    private _insertList: Array<OffenderInternalStatuses>;
    private _deleteList: Array<OffenderInternalStatuses>;
    private _updateList: Array<OffenderInternalStatuses>;
    private _cipCausesinsertList: Array<OffenderCipCauses>;
    private _cipCausesdeleteList: Array<OffenderCipCauses>;
    private _cipCausesupdateList: Array<OffenderCipCauses>;
    private _cipReasonsinsertList: Array<OffenderCipReasons>;
    private _cipReasonsdeleteList: Array<OffenderCipReasons>;
    private _cipReasonsupdateList: Array<OffenderCipReasons>;

    get cipReasonsinsertList(): Array<OffenderCipReasons> { return this._cipReasonsinsertList; }

    set cipReasonsinsertList(pcipReasonsinsertList: Array<OffenderCipReasons>) { this._cipReasonsinsertList = pcipReasonsinsertList; }

    get cipReasonsdeleteList(): Array<OffenderCipReasons> { return this._cipReasonsdeleteList; }

    set cipReasonsdeleteList(pcipReasonsdeleteList: Array<OffenderCipReasons>) { this._cipReasonsdeleteList = pcipReasonsdeleteList; }

    get cipReasonsupdateList(): Array<OffenderCipReasons> { return this._cipReasonsupdateList; }

    set cipReasonsupdateList(pcipReasonsupdateList: Array<OffenderCipReasons>) { this._cipReasonsupdateList = pcipReasonsupdateList; }

    get cipCausesinsertList(): Array<OffenderCipCauses> { return this._cipCausesinsertList; }

    set cipCausesinsertList(pcipCausesinsertList: Array<OffenderCipCauses>) { this._cipCausesinsertList = pcipCausesinsertList; }

    get cipCausesdeleteList(): Array<OffenderCipCauses> { return this._cipCausesdeleteList; }

    set cipCausesdeleteList(pcipCausesdeleteList: Array<OffenderCipCauses>) { this._cipCausesdeleteList = pcipCausesdeleteList; }

    get cipCausesupdateList(): Array<OffenderCipCauses> { return this._cipCausesupdateList; }

    set cipCausesupdateList(pcipCausesupdateList: Array<OffenderCipCauses>) { this._cipCausesupdateList = pcipCausesupdateList; }

    get insertList(): Array<OffenderInternalStatuses> { return this._insertList; }

    set insertList(pinsertList: Array<OffenderInternalStatuses>) { this._insertList = pinsertList; }

    get deleteList(): Array<OffenderInternalStatuses> { return this._deleteList; }

    set deleteList(pdeleteList: Array<OffenderInternalStatuses>) { this._deleteList = pdeleteList; }

    get updateList(): Array<OffenderInternalStatuses> { return this._updateList; }

    set updateList(pupdateList: Array<OffenderInternalStatuses>) { this._updateList = pupdateList; }

    toJSON(): any {
        return {
            'insertList': this._insertList,
            'deleteList': this._deleteList,
            'updateList': this._updateList,
            'cipReasonsinsertList': this._cipReasonsinsertList,
            'cipReasonsdeleteList': this._cipReasonsdeleteList,
            'cipReasonsupdateList': this._cipReasonsupdateList,
            'cipCausesinsertList': this._cipCausesinsertList,
            'cipCausesdeleteList': this._cipCausesdeleteList,
            'cipCausesupdateList': this._cipCausesupdateList,

        };
    }
}
