import { BaseModel } from './../../../../common/beans/BaseModel';
export class AssessSectionNotifications extends BaseModel {
    private _messageText: string;
    private _createUserId: string;
    private _scoreSeq: number;
    private _minScore: number;
    private _modifyDatetime: Date;
    private _nextSectionFlag: string;
    private _modifyUserId: string;
    private _scoreType: string;
    private _maxScore: number;
    private _createDatetime: Date;
    private _expiryDate: Date;
    private _serialVersionUID: number;
    private _sealFlag: string;
    private _assessmentId: number;
    private  _nextAssessmentId: number;
    private _activeFlag: string;
    private _nextAssCode: string;
    private _assCodeTemp: string;


    get messageText(): string{ return  this._messageText; }
set messageText(pmessageText: string){ this._messageText = pmessageText; }
    set nextAssCode(pnextAssCode: string){ this._nextAssCode = pnextAssCode; }
     get nextAssCode(): string{ return  this._nextAssCode; }


    get createUserId(): string{ return  this._createUserId; }

    set createUserId(pcreateUserId: string){ this._createUserId = pcreateUserId; }

    get scoreSeq(): number{ return  this._scoreSeq; }

    set scoreSeq(pscoreSeq: number){ this._scoreSeq = pscoreSeq; }

    get minScore(): number{ return  this._minScore; }

    set minScore(pminScore: number){ this._minScore = pminScore; }

    get modifyDatetime(): Date{ return  this._modifyDatetime; }

    set modifyDatetime(pmodifyDatetime: Date){ this._modifyDatetime = pmodifyDatetime; }

    get nextSectionFlag(): string{ return  this._nextSectionFlag; }

    set nextSectionFlag(pnextSectionFlag: string){ this._nextSectionFlag = pnextSectionFlag; }

    get modifyUserId(): string{ return  this._modifyUserId; }

    set modifyUserId(pmodifyUserId: string){ this._modifyUserId = pmodifyUserId; }

    get scoreType(): string{ return  this._scoreType; }

    set scoreType(pscoreType: string){ this._scoreType = pscoreType; }

    get maxScore(): number{ return  this._maxScore; }

    set maxScore(pmaxScore: number){ this._maxScore = pmaxScore; }

    get createDatetime(): Date{ return  this._createDatetime; }

    set createDatetime(pcreateDatetime: Date){ this._createDatetime = pcreateDatetime; }

    get expiryDate(): Date{ return  this._expiryDate; }

    set expiryDate(pexpiryDate: Date){ this._expiryDate = pexpiryDate; }

    get serialVersionUID(): number{ return  this._serialVersionUID; }

    set serialVersionUID(pserialVersionUID: number){ this._serialVersionUID = pserialVersionUID; }

    get sealFlag(): string{ return  this._sealFlag; }

    set sealFlag(psealFlag: string){ this._sealFlag = psealFlag; }

    get assessmentId(): number{ return  this._assessmentId; }

    set assessmentId(passessmentId: number){ this._assessmentId = passessmentId; }
    get nextAssessmentId(): number{ return  this._nextAssessmentId; }

    set nextAssessmentId(pnextAssessmentId: number){ this._nextAssessmentId = pnextAssessmentId; }

    get activeFlag(): string{ return  this._activeFlag; }

    set activeFlag(pactiveFlag: string){ this._activeFlag = pactiveFlag; }

    get assCodeTemp(): string {return this._assCodeTemp;}

    set assCodeTemp(value: string) {this._assCodeTemp = value;}


toJSON(): any {
    return { 
       'messageText': this._messageText,
       'createUserId': this._createUserId,
       'scoreSeq': this._scoreSeq,
       'minScore': this._minScore,
       'modifyDatetime': this._modifyDatetime,
       'nextSectionFlag': this._nextSectionFlag,
       'modifyUserId': this._modifyUserId,
       'scoreType': this._scoreType,
       'maxScore': this._maxScore,
       'createDatetime': this._createDatetime,
       'expiryDate': this._expiryDate,
       'serialVersionUID': this._serialVersionUID,
       'sealFlag': this._sealFlag,
       'assessmentId': this._assessmentId,
       'activeFlag': this._activeFlag,
       'nextAssCode': this._nextAssCode,
       'assCodeTemp': this._assCodeTemp,
        };
    }  
}