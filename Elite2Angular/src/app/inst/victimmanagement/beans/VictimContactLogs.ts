export class VictimContactLogs {
    private _note: string;
    private _createUserId: string;
    private _modifyDatetime: Date;
    private _modifyUserId: string;
    private _type: string;
    private _victimContactLogId: number;
    private _createDatetime: Date;
    private _createdBy: number;
    private _staffName: string;
    private _category: string;
    private _sealFlag: string;
    private _staffId: string;
    private _victimId: number;
    private _logDatetime: Date;
    private _logTime: Date;
    public get logTime(): Date {
        return this._logTime;
    }
    public set logTime(value: Date) {
        this._logTime = value;
    }
    private _contactMethod: string;
 
    get note(): string{ return this._note; }
    set note(pnote: string){ this._note = pnote ;}
    get createUserId(): string{ return this._createUserId; }
    set createUserId(pcreateUserId: string){ this._createUserId = pcreateUserId ;}
    get modifyDatetime(): Date{ return this._modifyDatetime; }
    set modifyDatetime(pmodifyDatetime: Date){ this._modifyDatetime = pmodifyDatetime ;}
    get modifyUserId(): string{ return this._modifyUserId; }
    set modifyUserId(pmodifyUserId: string){ this._modifyUserId = pmodifyUserId ;}
    get type(): string{ return this._type; }
    set type(ptype: string){ this._type = ptype ;}
    get victimContactLogId(): number{ return this._victimContactLogId; }
    set victimContactLogId(pvictimContactLogId: number){ this._victimContactLogId = pvictimContactLogId ;}
    get createDatetime(): Date{ return this._createDatetime; }
    set createDatetime(pcreateDatetime: Date){ this._createDatetime = pcreateDatetime ;}
    get createdBy(): number{ return this._createdBy; }
    set createdBy(pcreatedBy: number){ this._createdBy = pcreatedBy ;}
    get staffName(): string{ return this._staffName; }
    set staffName(pstaffName: string){ this._staffName = pstaffName ;}
    get category(): string{ return this._category; }
    set category(pcategory: string){ this._category = pcategory ;}
    get sealFlag(): string{ return this._sealFlag; }
    set sealFlag(psealFlag: string){ this._sealFlag = psealFlag ;}
    get staffId(): string{ return this._staffId; }
    set staffId(pstaffId: string){ this._staffId = pstaffId ;}
    get victimId(): number{ return this._victimId; }
    set victimId(pvictimId: number){ this._victimId = pvictimId ;}
    get logDatetime(): Date{ return this._logDatetime; }
    set logDatetime(plogDatetime: Date){ this._logDatetime = plogDatetime ;}
    get contactMethod(): string{ return this._contactMethod; }
    set contactMethod(pcontactMethod: string){ this._contactMethod = pcontactMethod ;}

toJSON(): any {
    return { 
       'note': this._note,
       'createUserId': this._createUserId,
       'modifyDatetime': this._modifyDatetime,
       'modifyUserId': this._modifyUserId,
       'type': this._type,
       'victimContactLogId': this._victimContactLogId,
       'createDatetime': this._createDatetime,
       'createdBy': this._createdBy,
       'staffName': this._staffName,
       'category': this._category,
       'sealFlag': this._sealFlag,
       'staffId': this._staffId,
       'victimId': this._victimId,
       'logDatetime': this._logDatetime,
       'contactMethod': this._contactMethod,
        };
    } 
}
