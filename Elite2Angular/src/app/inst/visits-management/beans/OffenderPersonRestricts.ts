    export class OffenderPersonRestricts {
         private _createUserId: string;
         private _restrictionEffectiveDate: Date;
         private _modifyDatetime: Date;
         private _modifyUserId: string;
         private _offenderPersonRestrictId: number;
         private _description: string;
         private _enteredStaffId: number;
         private _commentText: string;
         private _offenderContactPersonId: number;
         private _createDatetime: Date;
         private _restrictionType: string;
         private _inserted: number;
         private _restrictionExpiryDate: Date;
         private _authorizedStaffId: number;
         private _sealFlag: string;
         private _offenderBookId: number;
         private _personId: number;
         private _stringEnteredStaffId: string;

         get createUserId(): string { return  this._createUserId; }

         set createUserId(pcreateUserId: string) { this._createUserId = pcreateUserId; }

         get restrictionEffectiveDate(): Date { return  this._restrictionEffectiveDate; }

         set restrictionEffectiveDate(prestrictionEffectiveDate: Date) { this._restrictionEffectiveDate = prestrictionEffectiveDate; }

         get modifyDatetime(): Date { return  this._modifyDatetime; }

         set modifyDatetime(pmodifyDatetime: Date) { this._modifyDatetime = pmodifyDatetime; }

         get modifyUserId(): string { return  this._modifyUserId; }

         set modifyUserId(pmodifyUserId: string) { this._modifyUserId = pmodifyUserId; }

         get offenderPersonRestrictId(): number { return  this._offenderPersonRestrictId; }

         set offenderPersonRestrictId(poffenderPersonRestrictId: number) { this._offenderPersonRestrictId = poffenderPersonRestrictId; }

         get description(): string { return  this._description; }

         set description(pdescription: string) { this._description = pdescription; }

         get enteredStaffId(): number { return  this._enteredStaffId; }

         set enteredStaffId(penteredStaffId: number) { this._enteredStaffId = penteredStaffId; }

         get commentText(): string { return  this._commentText; }

         set commentText(pcommentText: string) { this._commentText = pcommentText; }

         get offenderContactPersonId(): number { return  this._offenderContactPersonId; }

         set offenderContactPersonId(poffenderContactPersonId: number) { this._offenderContactPersonId = poffenderContactPersonId; }

         get createDatetime(): Date { return  this._createDatetime; }

         set createDatetime(pcreateDatetime: Date) { this._createDatetime = pcreateDatetime; }

         get restrictionType(): string { return  this._restrictionType; }

         set restrictionType(prestrictionType: string) { this._restrictionType = prestrictionType; }

         get inserted(): number { return  this._inserted; }

         set inserted(pinserted: number) { this._inserted = pinserted; }

         get restrictionExpiryDate(): Date { return  this._restrictionExpiryDate; }

         set restrictionExpiryDate(prestrictionExpiryDate: Date) { this._restrictionExpiryDate = prestrictionExpiryDate; }

         get authorizedStaffId(): number { return  this._authorizedStaffId; }

         set authorizedStaffId(pauthorizedStaffId: number) { this._authorizedStaffId = pauthorizedStaffId; }

         get sealFlag(): string  { return  this._sealFlag; }

         set sealFlag(psealFlag: string) { this._sealFlag = psealFlag; }

         get offenderBookId(): number { return this._offenderBookId; }

         set offenderBookId(poffenderBookId: number) { this._offenderBookId = poffenderBookId; }

         get personId(): number { return this._personId; }

        set personId(ppersonId: number) { this._personId = ppersonId; }

        get stringEnteredStaffId(): string { return  this._stringEnteredStaffId; }

        set stringEnteredStaffId(stringEnteredStaffId: string) { this._stringEnteredStaffId = stringEnteredStaffId; }

     toJSON(): any {
         return {
            'createUserId': this._createUserId,
            'restrictionEffectiveDate': this._restrictionEffectiveDate,
            'modifyDatetime': this._modifyDatetime,
            'modifyUserId': this._modifyUserId,
            'offenderPersonRestrictId': this._offenderPersonRestrictId,
            'description': this._description,
            'enteredStaffId': this._enteredStaffId,
            'commentText': this._commentText,
            'offenderContactPersonId': this._offenderContactPersonId,
            'createDatetime': this._createDatetime,
            'restrictionType': this._restrictionType,
            'inserted': this._inserted,
            'restrictionExpiryDate': this._restrictionExpiryDate,
            'authorizedStaffId': this._authorizedStaffId,
            'sealFlag': this._sealFlag,
            'offenderBookId' : this._offenderBookId,
            'personId' : this._personId,
            'stringEnteredStaffId': this._stringEnteredStaffId
             };
         }
 }
