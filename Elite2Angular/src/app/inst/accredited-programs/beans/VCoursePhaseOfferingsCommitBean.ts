import { VCoursePhaseOfferings } from "./VCoursePhaseOfferings";

export class VCoursePhaseOfferingsCommitBean {

    private _insertList: Array<VCoursePhaseOfferings>;
    private _deleteList: Array<VCoursePhaseOfferings>;
    private _updateList: Array<VCoursePhaseOfferings>;

    get insertList(): Array<VCoursePhaseOfferings> { return this._insertList; }

    set insertList(pinsertList: Array<VCoursePhaseOfferings>) { this._insertList = pinsertList; }

    get deleteList(): Array<VCoursePhaseOfferings> { return this._deleteList; }

    set deleteList(pdeleteList: Array<VCoursePhaseOfferings>) { this._deleteList = pdeleteList; }

    get updateList(): Array<VCoursePhaseOfferings> { return this._updateList; }

    set updateList(pupdateList: Array<VCoursePhaseOfferings>) { this._updateList = pupdateList; }

    toJSON(): any {
        return {
            'insertList': this._insertList,
            'deleteList': this._deleteList,
            'updateList': this._updateList
        };
    }


}