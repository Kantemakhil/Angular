import { BaseModel } from '@commonbeans/BaseModel';
import { WeeklyActivityPlans } from './WeeklyActivityPlans';


export class WeeklyActivityPlansCommitBean extends BaseModel {

private _insertList: Array<WeeklyActivityPlans>;
private _deleteList: Array<WeeklyActivityPlans>;
private _updateList: Array<WeeklyActivityPlans>;
private _finalizedWap: string;
private _htyVersionNo:number;
private _wapStartDate: Date;
private _wapEndDate: Date;

get insertList(): Array<WeeklyActivityPlans> { return this._insertList; }

set insertList(pinsertList: Array<WeeklyActivityPlans>) { this._insertList = pinsertList; }

get deleteList(): Array<WeeklyActivityPlans> { return this._deleteList; }

set deleteList(pdeleteList: Array<WeeklyActivityPlans>) { this._deleteList = pdeleteList; }

get updateList(): Array<WeeklyActivityPlans> { return this._updateList; }

set updateList(pupdateList: Array<WeeklyActivityPlans>) { this._updateList = pupdateList; }

get finalizedWap(): string{ return this._finalizedWap; }
set finalizedWap(pfinalizedWap: string){ this._finalizedWap = pfinalizedWap ;}

get htyVersionNo(): number{ return this._htyVersionNo; }
set htyVersionNo(phtyVersionNo: number){ this._htyVersionNo = phtyVersionNo ;}

    get wapStartDate(): Date { return this._wapStartDate; }
    set wapStartDate(value: Date) { this._wapStartDate = value; }
    get wapEndDate(): Date { return this._wapEndDate; }
    set wapEndDate(value: Date) { this._wapEndDate = value; }

toJSON(): any {
return {
'insertList': this._insertList,
'deleteList': this._deleteList,
'updateList': this._updateList,
'finalizedWap': this._finalizedWap,
'htyVersionNo': this._htyVersionNo,
'wapStartDate' : this._wapStartDate,
'wapEndDate' : this._wapEndDate
};
}
}
