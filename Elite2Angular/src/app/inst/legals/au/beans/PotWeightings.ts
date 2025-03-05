import { BaseModel } from "@common/beans/BaseModel";

export class PotWeightings extends BaseModel {
    private _courtType: string;
    private _orderType: string;
    private _rangeCode: string;
    private _active: string;
    private _orderTypeDom: string;
    private _ratingDom: string;
    private _weighting: number;
    private _potWgtId: number;
    private _offenderDangerRating: string;
    private _expiryDate: Date;
    private _courtTypeDom: string;
    private _component: string;
    private _orderCode: string;
    private _componentDom: string;
    private _cgnbtOrderType2: string;
   
    private _cgnbtComponent5: number;
    private _cgnbtOrderCode3: string;
    private _cgnbtOrderCode2: string;
    private _cgnbtOrderType: string;
    private _cgnbtOrderCode: string;

    get cgnbtComponent5(): number { return this._cgnbtComponent5; }
    set cgnbtComponent5(pcgnbtComponent5: number) { this._cgnbtComponent5 = pcgnbtComponent5; }
    get cgnbtOrderCode3(): string { return this._cgnbtOrderCode3; }
    set cgnbtOrderCode3(pcgnbtOrderCode3: string) { this._cgnbtOrderCode3 = pcgnbtOrderCode3; }
    get cgnbtOrderCode2(): string { return this._cgnbtOrderCode2; }
    set cgnbtOrderCode2(pcgnbtOrderCode2: string) { this._cgnbtOrderCode2 = pcgnbtOrderCode2; }
    get cgnbtOrderType(): string { return this._cgnbtOrderType; }
    set cgnbtOrderType(pcgnbtOrderType: string) { this._cgnbtOrderType = pcgnbtOrderType; }
    get cgnbtOrderCode(): string { return this._cgnbtOrderCode; }
    set cgnbtOrderCode(pcgnbtOrderCode: string) { this._cgnbtOrderCode = pcgnbtOrderCode; }

    get cgnbtOrderType2(): string { return this._cgnbtOrderType2; }
    set cgnbtOrderType2(pcgnbtOrderType2: string) { this._cgnbtOrderType2 = pcgnbtOrderType2; }
    get courtType(): string { return this._courtType; }
    set courtType(pcourtType: string) { this._courtType = pcourtType; }
    get orderType(): string { return this._orderType; }
    set orderType(porderType: string) { this._orderType = porderType; }
    get rangeCode(): string { return this._rangeCode; }
    set rangeCode(prangeCode: string) { this._rangeCode = prangeCode; }
    get active(): string { return this._active; }
    set active(pactive: string) { this._active = pactive; }
    get orderTypeDom(): string { return this._orderTypeDom; }
    set orderTypeDom(porderTypeDom: string) { this._orderTypeDom = porderTypeDom; }
    get ratingDom(): string { return this._ratingDom; }
    set ratingDom(pratingDom: string) { this._ratingDom = pratingDom; }
    get weighting(): number { return this._weighting; }
    set weighting(pweighting: number) { this._weighting = pweighting; }
    get potWgtId(): number { return this._potWgtId; }
    set potWgtId(ppotWgtId: number) { this._potWgtId = ppotWgtId; }
    get offenderDangerRating(): string { return this._offenderDangerRating; }
    set offenderDangerRating(poffenderDangerRating: string) { this._offenderDangerRating = poffenderDangerRating; }
    get expiryDate(): Date { return this._expiryDate; }
    set expiryDate(pexpiryDate: Date) { this._expiryDate = pexpiryDate; }
    get courtTypeDom(): string { return this._courtTypeDom; }
    set courtTypeDom(pcourtTypeDom: string) { this._courtTypeDom = pcourtTypeDom; }
    get component(): string { return this._component; }
    set component(pcomponent: string) { this._component = pcomponent; }
    get orderCode(): string { return this._orderCode; }
    set orderCode(porderCode: string) { this._orderCode = porderCode; }
    get componentDom(): string { return this._componentDom; }
    set componentDom(pcomponentDom: string) { this._componentDom = pcomponentDom; }

    toJSON(): any {
        return {
            'courtType': this._courtType,
            'orderType': this._orderType,
            'rangeCode': this._rangeCode,
            'active': this._active,
            'orderTypeDom': this._orderTypeDom,
            'ratingDom': this._ratingDom,
            'weighting': this._weighting,
            'potWgtId': this._potWgtId,
            'offenderDangerRating': this._offenderDangerRating,
            'expiryDate': this._expiryDate,
            'courtTypeDom': this._courtTypeDom,
            'component': this._component,
            'orderCode': this._orderCode,
            'componentDom': this._componentDom,
            'cgnbtOrderType2': this._cgnbtOrderType2,
            'cgnbtComponent5': this._cgnbtComponent5,
            'cgnbtOrderCode2': this._cgnbtOrderCode2,
            'cgnbtOrderType': this._cgnbtOrderType,
            'cgnbtOrderCode': this._cgnbtOrderCode,
        };
    }
}