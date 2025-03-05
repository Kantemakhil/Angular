export class StaffSkills {
    private _createUserId: string;
    private _skillType: string;
    private _modifyDatetime: Date;
    private _modifyUserId: string;
    private _createDatetime: Date;
    private _expiryDate: Date;
    private _serialVersionUID: number;
    private _staffMember: number;
    private _staffSkillId: number;
    private _subType: string;
    private _rowId: string;
    private _stskComment: string;
    private _asOfDate: Date;
    private _sealFlag: string;
    private _programId: number;
    private _staffId: number;
    private _activeFlag: string;
    private _progId: string;

    get rowId(): string{ return this._rowId; }
    set rowId(prowId: string){ this._rowId = prowId ;}
    get createUserId(): string{ return this._createUserId; }
    set createUserId(pcreateUserId: string){ this._createUserId = pcreateUserId ;}
    get skillType(): string{ return this._skillType; }
    set skillType(pskillType: string){ this._skillType = pskillType ;}
    get modifyDatetime(): Date{ return this._modifyDatetime; }
    set modifyDatetime(pmodifyDatetime: Date){ this._modifyDatetime = pmodifyDatetime ;}
    get modifyUserId(): string{ return this._modifyUserId; }
    set modifyUserId(pmodifyUserId: string){ this._modifyUserId = pmodifyUserId ;}
    get createDatetime(): Date{ return this._createDatetime; }
    set createDatetime(pcreateDatetime: Date){ this._createDatetime = pcreateDatetime ;}
    get expiryDate(): Date{ return this._expiryDate; }
    set expiryDate(pexpiryDate: Date){ this._expiryDate = pexpiryDate ;}
    get serialVersionUID(): number{ return this._serialVersionUID; }
    set serialVersionUID(pserialVersionUID: number){ this._serialVersionUID = pserialVersionUID ;}
    get staffMember(): number{ return this._staffMember; }
    set staffMember(pstaffMember: number){ this._staffMember = pstaffMember ;}
    get staffSkillId(): number{ return this._staffSkillId; }
    set staffSkillId(pstaffSkillId: number){ this._staffSkillId = pstaffSkillId ;}
    get subType(): string{ return this._subType; }
    set subType(psubType: string){ this._subType = psubType ;}
    get stskComment(): string{ return this._stskComment; }
    set stskComment(pstskComment: string){ this._stskComment = pstskComment ;}
    get asOfDate(): Date{ return this._asOfDate; }
    set asOfDate(pasOfDate: Date){ this._asOfDate = pasOfDate ;}
    get sealFlag(): string{ return this._sealFlag; }
    set sealFlag(psealFlag: string){ this._sealFlag = psealFlag ;}
    get programId(): number{ return this._programId; }
    set programId(pprogramId: number){ this._programId = pprogramId ;}
    get staffId(): number{ return this._staffId; }
    set staffId(pstaffId: number){ this._staffId = pstaffId ;}
    get activeFlag(): string{ return this._activeFlag; }
    set activeFlag(pactiveFlag: string){ this._activeFlag = pactiveFlag ;}
    get progId(): string { return this._progId; }
    set progId(progId: string) { this._progId = progId ;}

toJSON(): any {
    return { 
       'createUserId': this._createUserId,
       'skillType': this._skillType,
       'modifyDatetime': this._modifyDatetime,
       'modifyUserId': this._modifyUserId,
       'createDatetime': this._createDatetime,
       'expiryDate': this._expiryDate,
       'serialVersionUID': this._serialVersionUID,
       'staffMember': this._staffMember,
       'staffSkillId': this._staffSkillId,
       'subType': this._subType,
       'stskComment': this._stskComment,
       'asOfDate': this._asOfDate,
       'sealFlag': this._sealFlag,
       'programId': this._programId,
       'staffId': this._staffId,
       'activeFlag': this._activeFlag,
       'rowId': this._rowId,
        };
    }  
}