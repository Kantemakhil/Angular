import { BaseModel } from '@commonbeans/BaseModel';
export class VOffGroupedPaymentPlans extends BaseModel {

    private _groupId: number;

    private _informationNumber: string;

    private _minDeductionId: number;

    private _offenderId: number;

    private _paymentClosedFlag: string;

    private _paymentPlanId: number;

    private _balOwing: number;

    private _dueDate: Date;

    private _amount: number;

    private _arrears: number;

    private _daysLate: number;

    private _reason: string;

    get balOwing(): number { return this._balOwing; }
    set balOwing(pbalOwing: number) { this._balOwing = pbalOwing; }

    get dueDate(): Date { return this._dueDate; }
    set dueDate(pdueDate: Date) { this._dueDate = pdueDate; }

    get amount(): number { return this._amount; }
    set amount(pamount: number) { this._amount = pamount; }

    get arrears(): number { return this._arrears; }
    set arrears(parrears: number) { this._arrears = parrears; }

    get daysLate(): number { return this._daysLate; }
    set daysLate(pdaysLate: number) { this._daysLate = pdaysLate; }

    get reason(): string { return this._reason; }
    set reason(preason: string) { this._reason = preason; }

    get informationNumber(): string { return this._informationNumber; }
    set informationNumber(pinformationNumber: string) { this._informationNumber = pinformationNumber; }

    get minDeductionId(): number { return this._minDeductionId; }
    set minDeductionId(pminDeductionId: number) { this._minDeductionId = pminDeductionId; }

    get groupId(): number { return this._groupId; }
    set groupId(pgroupId: number) { this._groupId = pgroupId; }

    get offenderId(): number { return this._offenderId; }
    set offenderId(poffenderId: number) { this._offenderId = poffenderId; }

    get paymentClosedFlag(): string { return this._paymentClosedFlag; }
    set paymentClosedFlag(ppaymentClosedFlag: string) { this._paymentClosedFlag = ppaymentClosedFlag; }

    get paymentPlanId(): number { return this._paymentPlanId; }
    set paymentPlanId(ppaymentPlanId: number) { this._paymentPlanId = ppaymentPlanId; }

    toJSON(): any {
        return {
            'groupId': this._groupId,
            'informationNumber': this._informationNumber,
            'minDeductionId': this._minDeductionId,
            'offenderId': this._offenderId,
            'paymentClosedFlag': this._paymentClosedFlag,
            'paymentPlanId': this._paymentPlanId,
            'balOwing': this._balOwing,
            'dueDate': this._dueDate,
            'amount': this._amount,
            'arrears': this._arrears,
            'daysLate': this._daysLate,
            'reason': this._reason,
        };
    }
}
