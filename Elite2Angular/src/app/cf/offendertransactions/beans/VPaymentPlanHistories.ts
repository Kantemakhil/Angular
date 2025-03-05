export class VPaymentPlanHistories {
    private _paymentClosedDate: Date;
    private _endDate: Date;
    private _paymentPlanSeq: number;
    private _groupId: number;
    private _transactionDate: Date;
    private _paymentAmount: string;
    private _frequency: string;
    private _informationNumber: string;
    private _serialVersionUID: number;
    private _offenderId: number;
    private _paymentDate: Date;
    private _paidAmount: string;
    private _paymentPlanId: number;
    private _startDate: Date;
    private _groupCode: string;

    get paymentClosedDate(): Date{ return this._paymentClosedDate; }
    set paymentClosedDate(ppaymentClosedDate: Date){ this._paymentClosedDate = ppaymentClosedDate ;}
    get endDate(): Date{ return this._endDate; }
    set endDate(pendDate: Date){ this._endDate = pendDate ;}
    get paymentPlanSeq(): number{ return this._paymentPlanSeq; }
    set paymentPlanSeq(ppaymentPlanSeq: number){ this._paymentPlanSeq = ppaymentPlanSeq ;}
    get groupId(): number{ return this._groupId; }
    set groupId(pgroupId: number){ this._groupId = pgroupId ;}
    get transactionDate(): Date{ return this._transactionDate; }
    set transactionDate(ptransactionDate: Date){ this._transactionDate = ptransactionDate ;}
    get paymentAmount(): string{ return this._paymentAmount; }
    set paymentAmount(ppaymentAmount: string){ this._paymentAmount = ppaymentAmount ;}
    get frequency(): string{ return this._frequency; }
    set frequency(pfrequency: string){ this._frequency = pfrequency ;}
    get informationNumber(): string{ return this._informationNumber; }
    set informationNumber(pinformationNumber: string){ this._informationNumber = pinformationNumber ;}
    get serialVersionUID(): number{ return this._serialVersionUID; }
    set serialVersionUID(pserialVersionUID: number){ this._serialVersionUID = pserialVersionUID ;}
    get offenderId(): number{ return this._offenderId; }
    set offenderId(poffenderId: number){ this._offenderId = poffenderId ;}
    get paymentDate(): Date{ return this._paymentDate; }
    set paymentDate(ppaymentDate: Date){ this._paymentDate = ppaymentDate ;}
    get paidAmount(): string{ return this._paidAmount; }
    set paidAmount(ppaidAmount: string){ this._paidAmount = ppaidAmount ;}
    get paymentPlanId(): number{ return this._paymentPlanId; }
    set paymentPlanId(ppaymentPlanId: number){ this._paymentPlanId = ppaymentPlanId ;}
    get startDate(): Date{ return this._startDate; }
    set startDate(pstartDate: Date){ this._startDate = pstartDate ;}
    get groupCode(): string{ return this._groupCode; }
    set groupCode(pgroupCode: string){ this._groupCode = pgroupCode ;}

toJSON(): any {
    return { 
       'paymentClosedDate': this._paymentClosedDate,
       'endDate': this._endDate,
       'paymentPlanSeq': this._paymentPlanSeq,
       'groupId': this._groupId,
       'transactionDate': this._transactionDate,
       'paymentAmount': this._paymentAmount,
       'frequency': this._frequency,
       'informationNumber': this._informationNumber,
       'serialVersionUID': this._serialVersionUID,
       'offenderId': this._offenderId,
       'paymentDate': this._paymentDate,
       'paidAmount': this._paidAmount,
       'paymentPlanId': this._paymentPlanId,
       'startDate': this._startDate,
       'groupCode': this._groupCode,
        };
    }  
}