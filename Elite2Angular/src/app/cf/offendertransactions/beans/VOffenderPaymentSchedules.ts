import { BaseModel } from "@common/beans/BaseModel";

export class VOffenderPaymentSchedules extends BaseModel {
        private _offenderDeductionId: number;
        private _modifyDatetime: Date;
        private _paymentPlanSeq: number;
        private _groupId: number;
        private _modifyUserId: string;
        private _paymentAmount: number;
        private _informationNumber: string;
        private _serialVersionUID: number;
        private _recursiveAmount: number;
        private _paymentClosedFlag: string;
        private _paymentDate: Date;
        private _paidAmount: number;
        private _paidRecursiveAmount: number;
        private _paymentPlanId: number;

        get offenderDeductionId(): number{ return this._offenderDeductionId; }
        set offenderDeductionId(poffenderDeductionId: number){ this._offenderDeductionId = poffenderDeductionId ;}
        get modifyDatetime(): Date{ return this._modifyDatetime; }
        set modifyDatetime(pmodifyDatetime: Date){ this._modifyDatetime = pmodifyDatetime ;}
        get paymentPlanSeq(): number{ return this._paymentPlanSeq; }
        set paymentPlanSeq(ppaymentPlanSeq: number){ this._paymentPlanSeq = ppaymentPlanSeq ;}
        get groupId(): number{ return this._groupId; }
        set groupId(pgroupId: number){ this._groupId = pgroupId ;}
        get modifyUserId(): string{ return this._modifyUserId; }
        set modifyUserId(pmodifyUserId: string){ this._modifyUserId = pmodifyUserId ;}
        get paymentAmount(): number{ return this._paymentAmount; }
        set paymentAmount(ppaymentAmount: number){ this._paymentAmount = ppaymentAmount ;}
        get informationNumber(): string{ return this._informationNumber; }
        set informationNumber(pinformationNumber: string){ this._informationNumber = pinformationNumber ;}
        get serialVersionUID(): number{ return this._serialVersionUID; }
        set serialVersionUID(pserialVersionUID: number){ this._serialVersionUID = pserialVersionUID ;}
        get recursiveAmount(): number{ return this._recursiveAmount; }
        set recursiveAmount(precursiveAmount: number){ this._recursiveAmount = precursiveAmount ;}
        get paymentClosedFlag(): string{ return this._paymentClosedFlag; }
        set paymentClosedFlag(ppaymentClosedFlag: string){ this._paymentClosedFlag = ppaymentClosedFlag ;}
        get paymentDate(): Date{ return this._paymentDate; }
        set paymentDate(ppaymentDate: Date){ this._paymentDate = ppaymentDate ;}
        get paidAmount(): number{ return this._paidAmount; }
        set paidAmount(ppaidAmount: number){ this._paidAmount = ppaidAmount ;}
        get paidRecursiveAmount(): number{ return this._paidRecursiveAmount; }
        set paidRecursiveAmount(ppaidRecursiveAmount: number){ this._paidRecursiveAmount = ppaidRecursiveAmount ;}
        get paymentPlanId(): number{ return this._paymentPlanId; }
        set paymentPlanId(ppaymentPlanId: number){ this._paymentPlanId = ppaymentPlanId ;}

    toJSON(): any {
        return { 
           'offenderDeductionId': this._offenderDeductionId,
           'modifyDatetime': this._modifyDatetime,
           'paymentPlanSeq': this._paymentPlanSeq,
           'groupId': this._groupId,
           'modifyUserId': this._modifyUserId,
           'paymentAmount': this._paymentAmount,
           'informationNumber': this._informationNumber,
           'serialVersionUID': this._serialVersionUID,
           'recursiveAmount': this._recursiveAmount,
           'paymentClosedFlag': this._paymentClosedFlag,
           'paymentDate': this._paymentDate,
           'paidAmount': this._paidAmount,
           'paidRecursiveAmount': this._paidRecursiveAmount,
           'paymentPlanId': this._paymentPlanId,
            };
        }  
}
