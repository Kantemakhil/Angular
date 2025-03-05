export class OffenderChecklistDetails {
     private _createUserId: string;
     private _checklistType: string;
     private _modifyUserId: string;
     private _caseloadType: string;
     private _commentText: string;
     private _createDateTime: Date;
     private _profileSeq: number;
     private _serialVersionUID: number;
     private _offenderChecklistId: number;
     private _modifyDateTime: Date;
     private _profileType: string;
     private _listSeq: number;
     private _profileCode: string;
     private _sealFlag: string;
     private _descriprion: string;
     private _count: number;
     private _codevalueType: string;
     private _updateAllowedFlag: string;
     private _profileCodeVal: string;
     private _readonly: Boolean;
     private _mandatoryFlag: string;
     public get mandatoryFlag(): string {
          return this._mandatoryFlag;
     }
     public set mandatoryFlag(value: string) {
          this._mandatoryFlag = value;
     }

     get readonly(): Boolean { return this._readonly; }
     set readonly(preadonly: Boolean) { this._readonly = preadonly; }
     get profileCodeVal(): string { return this._profileCodeVal; }
     set profileCodeVal(pprofileCodeVal: string) { this._profileCodeVal = pprofileCodeVal; }
     get codevalueType(): string { return this._codevalueType; }
     set codevalueType(pcodevalueType: string) { this._codevalueType = pcodevalueType; }
     get updateAllowedFlag(): string { return this._updateAllowedFlag; }
     set updateAllowedFlag(pupdateAllowedFlag: string) { this._updateAllowedFlag = pupdateAllowedFlag; }
     get count(): number { return this._count; }
     set count(pcount: number) { this._count = pcount; }
     get createUserId(): string { return this._createUserId; }
     set createUserId(pcreateUserId: string) { this._createUserId = pcreateUserId; }
     get checklistType(): string { return this._checklistType; }
     set checklistType(pchecklistType: string) { this._checklistType = pchecklistType; }
     get modifyUserId(): string { return this._modifyUserId; }
     set modifyUserId(pmodifyUserId: string) { this._modifyUserId = pmodifyUserId; }
     get caseloadType(): string { return this._caseloadType; }
     set caseloadType(pcaseloadType: string) { this._caseloadType = pcaseloadType; }
     get commentText(): string { return this._commentText; }
     set commentText(pcommentText: string) { this._commentText = pcommentText; }
     get createDateTime(): Date { return this._createDateTime; }
     set createDateTime(pcreateDateTime: Date) { this._createDateTime = pcreateDateTime; }
     get profileSeq(): number { return this._profileSeq; }
     set profileSeq(pprofileSeq: number) { this._profileSeq = pprofileSeq; }
     get serialVersionUID(): number { return this._serialVersionUID; }
     set serialVersionUID(pserialVersionUID: number) { this._serialVersionUID = pserialVersionUID; }
     get offenderChecklistId(): number { return this._offenderChecklistId; }
     set offenderChecklistId(poffenderChecklistId: number) { this._offenderChecklistId = poffenderChecklistId; }
     get modifyDateTime(): Date { return this._modifyDateTime; }
     set modifyDateTime(pmodifyDateTime: Date) { this._modifyDateTime = pmodifyDateTime; }
     get profileType(): string { return this._profileType; }
     set profileType(pprofileType: string) { this._profileType = pprofileType; }
     get listSeq(): number { return this._listSeq; }
     set listSeq(plistSeq: number) { this._listSeq = plistSeq; }
     get profileCode(): string { return this._profileCode; }
     set profileCode(pprofileCode: string) { this._profileCode = pprofileCode; }
     get sealFlag(): string { return this._sealFlag; }
     set sealFlag(psealFlag: string) { this._sealFlag = psealFlag; }
     get descriprion(): string { return this._descriprion; }
     set descriprion(pdescriprion: string) { this._descriprion = pdescriprion; }

     toJSON(): any {
          return {
               'createUserId': this._createUserId,
               'checklistType': this._checklistType,
               'modifyUserId': this._modifyUserId,
               'caseloadType': this._caseloadType,
               'commentText': this._commentText,
               'createDateTime': this._createDateTime,
               'profileSeq': this._profileSeq,
               'serialVersionUID': this._serialVersionUID,
               'offenderChecklistId': this._offenderChecklistId,
               'modifyDateTime': this._modifyDateTime,
               'profileType': this._profileType,
               'listSeq': this._listSeq,
               'profileCode': this._profileCode,
               'sealFlag': this._sealFlag,
               'descriprion': this._descriprion,
               'count': this._count,
               'codevalueType': this._codevalueType,
               'updateAllowedFlag': this._updateAllowedFlag,
               'profileCodeVal': this._profileCodeVal,
               'readonly': this._readonly,
               'mandatoryFlag':this._mandatoryFlag
          };
     }
}
