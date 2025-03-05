
import { VAcpSchedules } from "./VAcpSchedules";
export class VAcpSchedulesCommitBean {
    private _insertList: VAcpSchedules[] = [];

    private _updateList: VAcpSchedules[] = [];


    get insertList(): Array<VAcpSchedules> { return this._insertList; }

    set insertList(pinsertList: Array<VAcpSchedules>) { this._insertList = pinsertList; }


    get updateList(): Array<VAcpSchedules> { return this._updateList; }

    set updateList(pupdateList: Array<VAcpSchedules>) { this._updateList = pupdateList; }

    toJSON(): any {
        return {
            'insertList': this._insertList,
            'updateList': this._updateList
        };
    }
}