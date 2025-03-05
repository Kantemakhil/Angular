export class OffenderBailConditions {
    private _eventId: number;
    private _cashDepositDist: string;
    private _createUserId: string;
    private _bailConditionCode: string;
    private _modifyDatetime: Date;
    private _offenderBookId: number;
    private _modifyUserId: string;
    private _securityDeposit: number;
    private _cashDepositReceipt: string;
    private _commentText: string;
    private _suretyName2: string;
    private _suretyName1: string;
    private _serialVersionUID: number;
    private _forfeitedFundsDist: string;
    private _bailConditionId: number;
    private _cashDeposit: number;
    private _securityDepositDistCode: string;
    private _forfeitedFunds: number;
    private _createDate: Date;

    get eventId(): number{ return this._eventId; }
    set eventId(peventId: number){ this._eventId = peventId ;}
    get cashDepositDist(): string{ return this._cashDepositDist; }
    set cashDepositDist(pcashDepositDist: string){ this._cashDepositDist = pcashDepositDist ;}
    get createUserId(): string{ return this._createUserId; }
    set createUserId(pcreateUserId: string){ this._createUserId = pcreateUserId ;}
    get bailConditionCode(): string{ return this._bailConditionCode; }
    set bailConditionCode(pbailConditionCode: string){ this._bailConditionCode = pbailConditionCode ;}
    get modifyDatetime(): Date{ return this._modifyDatetime; }
    set modifyDatetime(pmodifyDatetime: Date){ this._modifyDatetime = pmodifyDatetime ;}
    get offenderBookId(): number{ return this._offenderBookId; }
    set offenderBookId(poffenderBookId: number){ this._offenderBookId = poffenderBookId ;}
    get modifyUserId(): string{ return this._modifyUserId; }
    set modifyUserId(pmodifyUserId: string){ this._modifyUserId = pmodifyUserId ;}
    get securityDeposit(): number{ return this._securityDeposit; }
    set securityDeposit(psecurityDeposit: number){ this._securityDeposit = psecurityDeposit ;}
    get cashDepositReceipt(): string{ return this._cashDepositReceipt; }
    set cashDepositReceipt(pcashDepositReceipt: string){ this._cashDepositReceipt = pcashDepositReceipt ;}
    get commentText(): string{ return this._commentText; }
    set commentText(pcommentText: string){ this._commentText = pcommentText ;}
    get suretyName2(): string{ return this._suretyName2; }
    set suretyName2(psuretyName2: string){ this._suretyName2 = psuretyName2 ;}
    get suretyName1(): string{ return this._suretyName1; }
    set suretyName1(psuretyName1: string){ this._suretyName1 = psuretyName1 ;}
    get serialVersionUID(): number{ return this._serialVersionUID; }
    set serialVersionUID(pserialVersionUID: number){ this._serialVersionUID = pserialVersionUID ;}
    get forfeitedFundsDist(): string{ return this._forfeitedFundsDist; }
    set forfeitedFundsDist(pforfeitedFundsDist: string){ this._forfeitedFundsDist = pforfeitedFundsDist ;}
    get bailConditionId(): number{ return this._bailConditionId; }
    set bailConditionId(pbailConditionId: number){ this._bailConditionId = pbailConditionId ;}
    get cashDeposit(): number{ return this._cashDeposit; }
    set cashDeposit(pcashDeposit: number){ this._cashDeposit = pcashDeposit ;}
    get securityDepositDistCode(): string{ return this._securityDepositDistCode; }
    set securityDepositDistCode(psecurityDepositDistCode: string){ this._securityDepositDistCode = psecurityDepositDistCode ;}
    get forfeitedFunds(): number{ return this._forfeitedFunds; }
    set forfeitedFunds(pforfeitedFunds: number){ this._forfeitedFunds = pforfeitedFunds ;}
    get createDate(): Date{ return this._createDate; }
    set createDate(pcreateDate: Date){ this._createDate = pcreateDate ;}

toJSON(): any {
    return { 
       'eventId': this._eventId,
       'cashDepositDist': this._cashDepositDist,
       'createUserId': this._createUserId,
       'bailConditionCode': this._bailConditionCode,
       'modifyDatetime': this._modifyDatetime,
       'offenderBookId': this._offenderBookId,
       'modifyUserId': this._modifyUserId,
       'securityDeposit': this._securityDeposit,
       'cashDepositReceipt': this._cashDepositReceipt,
       'commentText': this._commentText,
       'suretyName2': this._suretyName2,
       'suretyName1': this._suretyName1,
       'serialVersionUID': this._serialVersionUID,
       'forfeitedFundsDist': this._forfeitedFundsDist,
       'bailConditionId': this._bailConditionId,
       'cashDeposit': this._cashDeposit,
       'securityDepositDistCode': this._securityDepositDistCode,
       'forfeitedFunds': this._forfeitedFunds,
       'createDate': this._createDate,
        };
    } 
}