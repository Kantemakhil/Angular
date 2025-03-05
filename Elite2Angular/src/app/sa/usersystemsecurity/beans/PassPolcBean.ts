
export class PassPolcBean {
    private _beginWith: string;
    private _expireWithIn: number;
    private _createUserId: string;
    private _contain: string;
    private _modifyDatetime: Date;
    private _minLength: number;
    private _prevPasswords: number;
    private _modifyUserId: string;
    private _nonDictionryFlag: string;
    private _createDatetime: Date;
    private _serialVersionUID: number;
    private _nonUserIdFlag: string;
    private _maxLength: number;
    private _unitTime: string;

    get beginWith(): string{ return this._beginWith; }
    set beginWith(pbeginWith: string){ this._beginWith = pbeginWith ;}
    get expireWithIn(): number{ return this._expireWithIn; }
    set expireWithIn(pexpireWithIn: number){ this._expireWithIn = pexpireWithIn ;}
    get createUserId(): string{ return this._createUserId; }
    set createUserId(pcreateUserId: string){ this._createUserId = pcreateUserId ;}
    get contain(): string{ return this._contain; }
    set contain(pcontain: string){ this._contain = pcontain ;}
    get modifyDatetime(): Date{ return this._modifyDatetime; }
    set modifyDatetime(pmodifyDatetime: Date){ this._modifyDatetime = pmodifyDatetime ;}
    get minLength(): number{ return this._minLength; }
    set minLength(pminLength: number){ this._minLength = pminLength ;}
    get prevPasswords(): number{ return this._prevPasswords; }
    set prevPasswords(pprevPasswords: number){ this._prevPasswords = pprevPasswords ;}
    get modifyUserId(): string{ return this._modifyUserId; }
    set modifyUserId(pmodifyUserId: string){ this._modifyUserId = pmodifyUserId ;}
    get nonDictionryFlag(): string{ return this._nonDictionryFlag; }
    set nonDictionryFlag(pnonDictionryFlag: string){ this._nonDictionryFlag = pnonDictionryFlag ;}
    get createDatetime(): Date{ return this._createDatetime; }
    set createDatetime(pcreateDatetime: Date){ this._createDatetime = pcreateDatetime ;}
    get serialVersionUID(): number{ return this._serialVersionUID; }
    set serialVersionUID(pserialVersionUID: number){ this._serialVersionUID = pserialVersionUID ;}
    get nonUserIdFlag(): string{ return this._nonUserIdFlag; }
    set nonUserIdFlag(pnonUserIdFlag: string){ this._nonUserIdFlag = pnonUserIdFlag ;}
    get maxLength(): number{ return this._maxLength; }
    set maxLength(pmaxLength: number){ this._maxLength = pmaxLength ;}
    get unitTime(): string{ return this._unitTime; }
    set unitTime(punitTime: string){ this._unitTime = punitTime ;}

toJSON(): any {
    return { 
       'beginWith': this._beginWith,
       'expireWithIn': this._expireWithIn,
       'createUserId': this._createUserId,
       'contain': this._contain,
       'modifyDatetime': this._modifyDatetime,
       'minLength': this._minLength,
       'prevPasswords': this._prevPasswords,
       'modifyUserId': this._modifyUserId,
       'nonDictionryFlag': this._nonDictionryFlag,
       'createDatetime': this._createDatetime,
       'serialVersionUID': this._serialVersionUID,
       'nonUserIdFlag': this._nonUserIdFlag,
       'maxLength': this._maxLength,
       'unitTime': this._unitTime,
        };
    }

}
