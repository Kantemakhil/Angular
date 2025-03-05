import { BaseModel } from '@commonbeans/BaseModel';
import { OffenderVisitVisitors } from '@inst/visits-management/beans/OffenderVisitVisitors';
import { VOffenderVisitVisitors } from '@inst/visits-management/beans/VOffenderVisitVisitors';

export class ValidateVisitorBean extends BaseModel {
    private _visitorList: Array<VOffenderVisitVisitors>;
    private _visitOfflist: Array<OffenderVisitVisitors>;
    private _vPersonId: number;
    private _vOffenderBookId: number;

    get visitorList(): Array<VOffenderVisitVisitors> { return this._visitorList; }

    set visitorList( pvisitorList: Array<VOffenderVisitVisitors> ) { this._visitorList = pvisitorList; }

    get visitOfflist(): Array<OffenderVisitVisitors> { return this.visitOfflist; }

    set visitOfflist( pvisitOfflist: Array<OffenderVisitVisitors> ) { this._visitOfflist = pvisitOfflist; }

    get vPersonId(): number { return this.vPersonId; }

    set vPersonId(pvPersonId: number) { this._vPersonId = pvPersonId; }

    get vOffenderBookId(): number { return this.vOffenderBookId; }

    set vOffenderBookId(pvOffenderBookId: number) { this._vOffenderBookId = pvOffenderBookId; }

    toJSON(): any {
        return {
            'visitorList': this._visitorList,
            'visitOfflist': this._visitOfflist,
            'vPersonId': this._vPersonId,
            'vOffenderBookId': this._vOffenderBookId
        };
    }
}
