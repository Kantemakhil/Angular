import { BaseModel } from "@common/beans/BaseModel";

export class PaymentPlanTransactions extends BaseModel {
        private _createUserId: string;
        private _modifyDatetime: Date;
        private _paymentPlanSeq: number;
        private _groupId: number;
        private _modifyUserId: string;
        private _transactionDate: number;
        private _informationNumber: string;
        private _createDatetime: Date;
        private _serialVersionUID: number;
        private _transactionAmount: number;
        private _sealFlag: string;
        private _paymentDate: Date;
        private _paymentPlanId: number;
        private _transactionSeq: number;

        get createUserId(): string{ return this._createUserId; }
        set createUserId(pcreateUserId: string){ this._createUserId = pcreateUserId ;}
        get modifyDatetime(): Date{ return this._modifyDatetime; }
        set modifyDatetime(pmodifyDatetime: Date){ this._modifyDatetime = pmodifyDatetime ;}
        get paymentPlanSeq(): number{ return this._paymentPlanSeq; }
        set paymentPlanSeq(ppaymentPlanSeq: number){ this._paymentPlanSeq = ppaymentPlanSeq ;}
        get groupId(): number{ return this._groupId; }
        set groupId(pgroupId: number){ this._groupId = pgroupId ;}
        get modifyUserId(): string{ return this._modifyUserId; }
        set modifyUserId(pmodifyUserId: string){ this._modifyUserId = pmodifyUserId ;}
        get transactionDate(): number{ return this._transactionDate; }
        set transactionDate(ptransactionDate: number){ this._transactionDate = ptransactionDate ;}
        get informationNumber(): string{ return this._informationNumber; }
        set informationNumber(pinformationNumber: string){ this._informationNumber = pinformationNumber ;}
        get createDatetime(): Date{ return this._createDatetime; }
        set createDatetime(pcreateDatetime: Date){ this._createDatetime = pcreateDatetime ;}
        get serialVersionUID(): number{ return this._serialVersionUID; }
        set serialVersionUID(pserialVersionUID: number){ this._serialVersionUID = pserialVersionUID ;}
        get transactionAmount(): number{ return this._transactionAmount; }
        set transactionAmount(ptransactionAmount: number){ this._transactionAmount = ptransactionAmount ;}
        get sealFlag(): string{ return this._sealFlag; }
        set sealFlag(psealFlag: string){ this._sealFlag = psealFlag ;}
        get paymentDate(): Date{ return this._paymentDate; }
        set paymentDate(ppaymentDate: Date){ this._paymentDate = ppaymentDate ;}
        get paymentPlanId(): number{ return this._paymentPlanId; }
        set paymentPlanId(ppaymentPlanId: number){ this._paymentPlanId = ppaymentPlanId ;}
        get transactionSeq(): number{ return this._transactionSeq; }
        set transactionSeq(ptransactionSeq: number){ this._transactionSeq = ptransactionSeq ;}

    toJSON(): any {
        return { 
           'createUserId': this._createUserId,
           'modifyDatetime': this._modifyDatetime,
           'paymentPlanSeq': this._paymentPlanSeq,
           'groupId': this._groupId,
           'modifyUserId': this._modifyUserId,
           'transactionDate': this._transactionDate,
           'informationNumber': this._informationNumber,
           'createDatetime': this._createDatetime,
           'serialVersionUID': this._serialVersionUID,
           'transactionAmount': this._transactionAmount,
           'sealFlag': this._sealFlag,
           'paymentDate': this._paymentDate,
           'paymentPlanId': this._paymentPlanId,
           'transactionSeq': this._transactionSeq,
            };
        }  
}
