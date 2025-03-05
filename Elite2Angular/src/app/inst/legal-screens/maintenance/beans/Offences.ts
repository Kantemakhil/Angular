export class  Offences {


     private _statuteCode: string;
     private  _offenceCode: string;
     private  _activeFlag: string;
     private  _checkBox1: string;
     private  _checkBox2: string;
     private  _checkBox3: string;
     private  _createDate: Date;
     private  _createDatetime: Date;
     private  _createUserId: string;
     private  _defaultOffenceType: string;
     private  _description: string;
     private  _expiryDate: Date;
     private  _hoCode: string;
     private  _listSeq: number;
     private  _maxGoodTimePerc: number;
     private  _maxSentenceLength: number;
     private  _modifyDatetime: Date;
     private  _modifyUserId: string;
     private  _offenceGroup: string;
     private  _offenseDegree: string;
     private  _oldStatuteCode: string;
     private  _repealedDate: Date;
     private  _sealFlag: string;
     private  _sentenceUnitCode: number;
     private  _severityRanking: string;
     private  _updateAllowedFlag: string;
     private  _shortDescription: string;
     private  _offenceId: number;

     get statuteCode(): string{ return this._statuteCode; }
     set statuteCode(pstatuteCode: string){ this._statuteCode = pstatuteCode ;}

     get offenceCode(): string{ return this._offenceCode; }
     set offenceCode(poffenceCode: string){ this._offenceCode = poffenceCode ;}

     get activeFlag(): string{ return this._activeFlag; }
     set activeFlag(pactiveFlag: string){ this._activeFlag = pactiveFlag ;}


     get checkBox1(): string{ return this._checkBox1; }
     set checkBox1(pcheckBox1: string){ this._checkBox1 = pcheckBox1 ;}

     get checkBox2(): string{ return this._checkBox2; }
     set checkBox2(pcheckBox2: string){ this._checkBox2 = pcheckBox2 ;}

     get checkBox3(): string{ return this._checkBox3; }
     set checkBox3(pcheckBox3: string){ this._checkBox3 = pcheckBox3 ;}

     get createDate(): Date{ return this._createDate; }
     set createDate(pcreateDate: Date){ this._createDate = pcreateDate ;}

     get createDatetime(): Date{ return this._createDatetime; }
     set createDatetime(pcreateDatetime: Date){ this._createDatetime = pcreateDatetime ;}

      get createUserId(): string{ return this._createUserId; }
    set createUserId(_createUserId: string){ this._createUserId = _createUserId ;}

    get defaultOffenceType(): string{ return this._defaultOffenceType; }
    set defaultOffenceType(_defaultOffenceType: string){ this._defaultOffenceType = _defaultOffenceType ;}

    get description(): string{ return this._description; }
    set description(_description: string){ this._description = _description ;}

    get expiryDate(): Date{ return this._expiryDate; }
    set expiryDate(_expiryDate: Date){ this._expiryDate = _expiryDate ;}

    get hoCode(): string{ return this._hoCode; }
    set hoCode(phoCode: string){ this._hoCode = phoCode ;}

    get listSeq(): number{ return this._listSeq; }
    set listSeq(plistSeq: number){ this._listSeq = plistSeq ;}

    get maxGoodTimePerc(): number{ return this._maxGoodTimePerc; }
    set maxGoodTimePerc(pmaxGoodTimePerc: number){ this._maxGoodTimePerc = pmaxGoodTimePerc ;}

    get maxSentenceLength(): number{ return this._maxSentenceLength; }
    set maxSentenceLength(pmaxSentenceLength: number){ this._maxSentenceLength = pmaxSentenceLength ;}

    get modifyDatetime(): Date{ return this.modifyDatetime; }
    set modifyDatetime(pmodifyDatetime: Date){ this._modifyDatetime = pmodifyDatetime ;}

    get modifyUserId(): string{ return this._modifyUserId; }
    set modifyUserId(pmodifyUserId: string){ this._modifyUserId = pmodifyUserId ;}

    get offenceGroup(): string{ return this._offenceGroup; }
    set offenceGroup(poffenceGroup: string){ this._offenceGroup = poffenceGroup ;}

    get offenseDegree(): string{ return this._offenseDegree; }
    set offenseDegree(_offenseDegree: string){ this._offenseDegree = _offenseDegree ;}

    get oldStatuteCode(): string{ return this._oldStatuteCode; }
    set oldStatuteCode(poldStatuteCode: string){ this._oldStatuteCode = poldStatuteCode ;}

    get repealedDate(): Date{ return this._repealedDate; }
    set repealedDate(prepealedDate: Date){ this._repealedDate = prepealedDate ;}

    get sealFlag(): string{ return this._sealFlag; }
    set sealFlag(_sealFlag: string){ this._sealFlag = _sealFlag ;}

    get sentenceUnitCode(): number{ return this._sentenceUnitCode; }
    set sentenceUnitCode(psentenceUnitCode: number){ this._sentenceUnitCode = psentenceUnitCode ;}

    get severityRanking(): string{ return this._severityRanking; }
    set severityRanking(pseverityRanking: string){ this._severityRanking = pseverityRanking ;}

    get updateAllowedFlag(): string{ return this._updateAllowedFlag; }
    set updateAllowedFlag(pupdateAllowedFlag: string){ this._updateAllowedFlag = pupdateAllowedFlag ;}

    get shortDescription(): string{ return this._shortDescription; }
    set shortDescription(_shortDescription: string){ this._shortDescription = _shortDescription ;}
    
    get offenceId(): number{ return this._offenceId; }
    set offenceId(offenceId: number){ this._offenceId = offenceId ;}
    
toJSON(): any {
    return { 
       'statuteCode': this._statuteCode,
       'offenceCode': this._offenceCode,
       'expiryDate': this._expiryDate,
       'checkBox1': this._checkBox1,
       'checkBox2': this._checkBox2,
       'checkBox3': this._checkBox3,
       'createDate': this._createDate,
       'createDatetime': this._createDatetime,
       'createUserId': this._createUserId,
       'defaultOffenceType': this._defaultOffenceType,
       'description': this._description,
       'hoCode': this._hoCode,
       'listSeq': this._listSeq,
       'maxGoodTimePerc': this._maxGoodTimePerc,
       'maxSentenceLength': this._maxSentenceLength,
       'modifyDatetime': this._modifyDatetime,
       'modifyUserId': this._modifyUserId,
       'offenceGroup': this._offenceGroup,
       'offenseDegree': this._offenseDegree,
       'oldStatuteCode': this._oldStatuteCode,
       'sealFlag': this._sealFlag,
       'activeFlag': this._sentenceUnitCode,
       'severityRanking': this._severityRanking,
       'updateAllowedFlag' :this._updateAllowedFlag,
       'shortDescription': this._shortDescription,
       'offenceId': this._offenceId
        };
        
    }   


    
}