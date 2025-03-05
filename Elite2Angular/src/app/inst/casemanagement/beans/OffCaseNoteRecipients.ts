export class OffCaseNoteRecipients {
    private _caseNoteId: number;
    private _offCaseNoteRecipientId: number;
    private _createDatetime: Date;
    private _createUserId: String;
    private _modifyDatetime: Date;
    private _teamId: number;
    private _modifyUserId: String;
    private _sealFlag: String;
    private _commentText: String;
    private _staffId: number;
    private _teamIdDesc: string;
    private _staffIdDesc: string;
    private _button: string;

    get caseNoteId(): number { return this._caseNoteId; }
    set caseNoteId(pcaseNoteId: number) { this._caseNoteId = pcaseNoteId; }
    get offCaseNoteRecipientId(): number { return this._offCaseNoteRecipientId; }
    set offCaseNoteRecipientId(poffCaseNoteRecipientId: number) { this._offCaseNoteRecipientId = poffCaseNoteRecipientId; }
    get createDatetime(): Date { return this._createDatetime; }
    set createDatetime(pcreateDatetime: Date) { this._createDatetime = pcreateDatetime; }
    get createUserId(): String { return this._createUserId; }
    set createUserId(pcreateUserId: String) { this._createUserId = pcreateUserId; }
    get modifyDatetime(): Date { return this._modifyDatetime; }
    set modifyDatetime(pmodifyDatetime: Date) { this._modifyDatetime = pmodifyDatetime; }
    get teamId(): number { return this._teamId; }
    set teamId(pteamId: number) { this._teamId = pteamId; }
    get modifyUserId(): String { return this._modifyUserId; }
    set modifyUserId(pmodifyUserId: String) { this._modifyUserId = pmodifyUserId; }
    get sealFlag(): String { return this._sealFlag; }
    set sealFlag(psealFlag: String) { this._sealFlag = psealFlag; }
    get commentText(): String { return this._commentText; }
    set commentText(pcommentText: String) { this._commentText = pcommentText; }
    get staffId(): number { return this._staffId; }
    set staffId(pstaffId: number) { this._staffId = pstaffId; }
    get teamIdDesc(): string { return this._teamIdDesc; }
    set teamIdDesc(pteamIdDesc: string) { this._teamIdDesc = pteamIdDesc; }
    get staffIdDesc(): string { return this._staffIdDesc; }
    set staffIdDesc(pstaffIdDesc: string) { this._staffIdDesc = pstaffIdDesc; }
    get button(): string { return this._button; }
    set button(pbutton: string) { this._button = pbutton; }

    toJSON(): any {
        return {
            'caseNoteId': this._caseNoteId,
            'offCaseNoteRecipientId': this._offCaseNoteRecipientId,
            'createDatetime': this._createDatetime,
            'createUserId': this._createUserId,
            'modifyDatetime': this._modifyDatetime,
            'teamId': this._teamId,
            'modifyUserId': this._modifyUserId,
            'sealFlag': this._sealFlag,
            'commentText': this._commentText,
            'staffId': this._staffId,
            'teamIdDesc': this._teamIdDesc,
            'staffIdDesc' : this._staffIdDesc,
            'button': this._button,
        };
    }
}
