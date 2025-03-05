export class VictimLinkedOffenders {
    private _note: string;
    private _createUserId: string;
    private _associatedLegalCase: string;
    private _agyLoc: string;
    private _modifyDatetime: Date;
    private _offenderIdDisplay: string;
    private _modifyUserId: string;
    private _createDatetime: Date;
    private _offenderName: string;
    private _offenderId: number;
    private _sealFlag: string;
    private _victimId: number;
    private _activeFlag: string;
    private _deactivatedDatetime: Date;
    private _description: string;
    private _offenderBookId: number;
    private _orderNo: number;
    
    public get orderNo(): number {
        return this._orderNo;
    }
    public set orderNo(value: number) {
        this._orderNo = value;
    }
    private _displayNo: string;

    public get displayNo(): string {
        return this._displayNo;
    }
    public set displayNo(value: string) {
        this._displayNo = value;
    }
    private _orderType: string;
    public get orderType(): string {
        return this._orderType;
    }
    public set orderType(value: string) {
        this._orderType = value;
    }
    private _jsonData: string;

    public get jsonData(): string {
        return this._jsonData;
    }
    public set jsonData(value: string) {
        this._jsonData = value;
    }

    public get offenderBookId(): number {
        return this._offenderBookId;
    }
    public set offenderBookId(value: number) {
        this._offenderBookId = value;
    }

    get note(): string{ return this._note; }
    set note(pnote: string){ this._note = pnote ;}
    get createUserId(): string{ return this._createUserId; }
    set createUserId(pcreateUserId: string){ this._createUserId = pcreateUserId ;}
    get associatedLegalCase(): string{ return this._associatedLegalCase; }
    set associatedLegalCase(passociatedLegalCase: string){ this._associatedLegalCase = passociatedLegalCase ;}
    get agyLoc(): string{ return this._agyLoc; }
    set agyLoc(pagyLoc: string){ this._agyLoc = pagyLoc ;}
    get modifyDatetime(): Date{ return this._modifyDatetime; }
    set modifyDatetime(pmodifyDatetime: Date){ this._modifyDatetime = pmodifyDatetime ;}
    get offenderIdDisplay(): string{ return this._offenderIdDisplay; }
    set offenderIdDisplay(poffenderIdDisplay: string){ this._offenderIdDisplay = poffenderIdDisplay ;}
    get modifyUserId(): string{ return this._modifyUserId; }
    set modifyUserId(pmodifyUserId: string){ this._modifyUserId = pmodifyUserId ;}
    get createDatetime(): Date{ return this._createDatetime; }
    set createDatetime(pcreateDatetime: Date){ this._createDatetime = pcreateDatetime ;}
    get offenderName(): string{ return this._offenderName; }
    set offenderName(poffenderName: string){ this._offenderName = poffenderName ;}
    get offenderId(): number{ return this._offenderId; }
    set offenderId(poffenderId: number){ this._offenderId = poffenderId ;}
    get sealFlag(): string{ return this._sealFlag; }
    set sealFlag(psealFlag: string){ this._sealFlag = psealFlag ;}
    get victimId(): number{ return this._victimId; }
    set victimId(pvictimId: number){ this._victimId = pvictimId ;}
    get activeFlag(): string{ return this._activeFlag; }
    set activeFlag(pactiveFlag: string){ this._activeFlag = pactiveFlag ;}
    get deactivatedDatetime(): Date{ return this._deactivatedDatetime; }
    set deactivatedDatetime(pdeactivatedDatetime: Date){ this._deactivatedDatetime = pdeactivatedDatetime ;}
    get description(): string {return this._description;}
    set description(value: string) {this._description = value;}

toJSON(): any {
    return { 
       'note': this._note,
       'createUserId': this._createUserId,
       'associatedLegalCase': this._associatedLegalCase,
       'agyLoc': this._agyLoc,
       'modifyDatetime': this._modifyDatetime,
       'offenderIdDisplay': this._offenderIdDisplay,
       'modifyUserId': this._modifyUserId,
       'createDatetime': this._createDatetime,
       'offenderName': this._offenderName,
       'offenderId': this._offenderId,
       'sealFlag': this._sealFlag,
       'victimId': this._victimId,
       'activeFlag': this._activeFlag,
       'deactivatedDatetime': this._deactivatedDatetime,
       'description': this._description,
       'offenderBookId':this._offenderBookId
        };
    } 

}
