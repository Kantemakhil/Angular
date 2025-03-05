export class VisitingMembers {
        private _lastName: string;
        private _identifier: string;
        private _createUserId: string;
        private _idType: string;
        private _memberSeq: number;
        private _modifyDatetime: Date;
        private _groupId: number;
        private _modifyUserId: string;
        private _commentText: string;
        private _verifiedFlag: string;
        private _createDatetime: Date;
        private _firstName: string;
        private _dob: Date;
        private _sealFlag: string;

        get lastName(): string { return this._lastName; }
        set lastName(plastName: string) { this._lastName = plastName; }
        get identifier(): string { return this._identifier; }
        set identifier(pidentifier: string) { this._identifier = pidentifier; }
        get createUserId(): string { return this._createUserId; }
        set createUserId(pcreateUserId: string) { this._createUserId = pcreateUserId; }
        get idType(): string { return this._idType; }
        set idType(pidType: string) { this._idType = pidType; }
        get memberSeq(): number { return this._memberSeq; }
        set memberSeq(pmemberSeq: number) { this._memberSeq = pmemberSeq; }
        get modifyDatetime(): Date { return this._modifyDatetime; }
        set modifyDatetime(pmodifyDatetime: Date) { this._modifyDatetime = pmodifyDatetime; }
        get groupId(): number { return this._groupId; }
        set groupId(pgroupId: number) { this._groupId = pgroupId; }
        get modifyUserId(): string { return this._modifyUserId; }
        set modifyUserId(pmodifyUserId: string) { this._modifyUserId = pmodifyUserId; }
        get commentText(): string { return this._commentText; }
        set commentText(pcommentText: string) { this._commentText = pcommentText; }
        get verifiedFlag(): string { return this._verifiedFlag; }
        set verifiedFlag(pverifiedFlag: string) { this._verifiedFlag = pverifiedFlag; }
        get createDatetime(): Date { return this._createDatetime; }
        set createDatetime(pcreateDatetime: Date) { this._createDatetime = pcreateDatetime; }
        get firstName(): string { return this._firstName; }
        set firstName(pfirstName: string) { this._firstName = pfirstName; }
        get dob(): Date { return this._dob; }
        set dob(pdob: Date) { this._dob = pdob; }
        get sealFlag(): string { return this._sealFlag; }
        set sealFlag(psealFlag: string) { this._sealFlag = psealFlag; }

        toJSON(): any {
                return {
                        'lastName': this._lastName,
                        'identifier': this._identifier,
                        'createUserId': this._createUserId,
                        'idType': this._idType,
                        'memberSeq': this._memberSeq,
                        'modifyDatetime': this._modifyDatetime,
                        'groupId': this._groupId,
                        'modifyUserId': this._modifyUserId,
                        'commentText': this._commentText,
                        'verifiedFlag': this._verifiedFlag,
                        'createDatetime': this._createDatetime,
                        'firstName': this._firstName,
                        'dob': this._dob,
                        'sealFlag': this._sealFlag,
                };
        }
}
