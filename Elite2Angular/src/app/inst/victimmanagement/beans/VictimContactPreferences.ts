export class VictimContactPreferences {
    private _createDatetime: Date;
    private _victimContactPreferencesId: number;
    private _createUserId: string;
    private _modifyDatetime: Date;
    private _modifyUserId: string;
    private _contactType: string;
    private _comment: string;
    private _sealFlag: string;
    private _victimId: number;
    private _activeFlag: string;
    private _deactivatedDatetime: Date;
    private _note: string;

    get createDatetime(): Date{ return this._createDatetime; }
    set createDatetime(pcreateDatetime: Date){ this._createDatetime = pcreateDatetime ;}
    get victimContactPreferencesId(): number{ return this._victimContactPreferencesId; }
    set victimContactPreferencesId(pvictimContactPreferencesId: number){ this._victimContactPreferencesId = pvictimContactPreferencesId ;}
    get createUserId(): string{ return this._createUserId; }
    set createUserId(pcreateUserId: string){ this._createUserId = pcreateUserId ;}
    get modifyDatetime(): Date{ return this._modifyDatetime; }
    set modifyDatetime(pmodifyDatetime: Date){ this._modifyDatetime = pmodifyDatetime ;}
    get modifyUserId(): string{ return this._modifyUserId; }
    set modifyUserId(pmodifyUserId: string){ this._modifyUserId = pmodifyUserId ;}
    get contactType(): string{ return this._contactType; }
    set contactType(pcontactType: string){ this._contactType = pcontactType ;}
    get comment(): string{ return this._comment; }
    set comment(pcomment: string){ this._comment = pcomment ;}
    get sealFlag(): string{ return this._sealFlag; }
    set sealFlag(psealFlag: string){ this._sealFlag = psealFlag ;}
    get victimId(): number{ return this._victimId; }
    set victimId(pvictimId: number){ this._victimId = pvictimId ;}
    get activeFlag(): string{ return this._activeFlag; }
    set activeFlag(pactiveFlag: string){ this._activeFlag = pactiveFlag ;}
    get deactivatedDatetime(): Date{ return this._deactivatedDatetime; }
    set deactivatedDatetime(pdeactivatedDatetime: Date){ this._deactivatedDatetime = pdeactivatedDatetime ;}
    get note(): string{ return this._note; }
    set note(pnote: string){ this._note = pnote ;}

toJSON(): any {
    return { 
       'createDatetime': this._createDatetime,
       'victimContactPreferencesId': this._victimContactPreferencesId,
       'createUserId': this._createUserId,
       'modifyDatetime': this._modifyDatetime,
       'modifyUserId': this._modifyUserId,
       'contactType': this._contactType,
       'comment': this._comment,
       'sealFlag': this._sealFlag,
       'victimId': this._victimId,
       'activeFlag': this._activeFlag,
       'deactivatedDatetime': this._deactivatedDatetime,
       'note': this._note,
        };
    } 

}
