import { BaseModel } from '@commonbeans/BaseModel';
export class StgCaseNotes extends BaseModel {

    private _createDatetime: Date;
    private _createUserId: string;
    private _modifyDatetime: Date;
    private _modifyUserId: string;
    private _noteDate: Date;
    private _noteSubtype: string;
    private _noteTime: Date;
    private _noteType: string;
    private _sealFlag: string;
    private _text: string;
    private _stgId: number;
    private _moduleName: string;
    private _newText: string;
    private _noteSeq: number;
    private _offenderBookId: number;
    private _stgSeq: number;
    private _assessmentSeq: number;
    private _itemSeq: number;
    private _ptrId: number;
    private _newValue: number;
    private _commentText: string;

    get createDatetime(): Date { return this._createDatetime; }
    set createDatetime(pcreateDateTime: Date) { this._createDatetime = pcreateDateTime; }

    get createUserId(): string { return this._createUserId; }
    set createUserId(pcreateUserId: string) { this._createUserId = pcreateUserId; }

    get modifyDatetime(): Date { return this._modifyDatetime; }
    set modifyDatetime(pmodifyDateTime: Date) { this._modifyDatetime = pmodifyDateTime; }

    get modifyUserId(): string { return this._modifyUserId; }
    set modifyUserId(pmodifyUserId: string) { this._modifyUserId = pmodifyUserId; }

    get noteDate(): Date { return this._noteDate; }
    set noteDate(pnoteDate: Date) { this._noteDate = pnoteDate; }

    get noteSubtype(): string { return this._noteSubtype; }
    set noteSubtype(pnoteSubtype: string) { this._noteSubtype = pnoteSubtype; }

    get noteTime(): Date { return this._noteTime; }
    set noteTime(pnoteTime: Date) { this._noteTime = pnoteTime; }

    get noteType(): string { return this._noteType; }
    set noteType(pnoteType: string) { this._noteType = pnoteType; }

    get sealFlag(): string { return this._sealFlag; }
    set sealFlag(psealFlag: string) { this._sealFlag = psealFlag; }

    get text(): string { return this._text; }
    set text(ptext: string) { this._text = ptext; }

    get stgId(): number { return this._stgId; }
    set stgId(pstgId: number) { this._stgId = pstgId; }

    get noteSeq(): number { return this._noteSeq; }
    set noteSeq(pnoteSeq: number) { this._noteSeq = pnoteSeq; }

    get moduleName(): string { return this._moduleName; }
    set moduleName(pmoduleName: string) { this._moduleName = pmoduleName; }

    get newText(): string { return this._newText; }
    set newText(pnewText: string) { this._newText = pnewText; }

    get offenderBookId(): number { return this._offenderBookId; }
    set offenderBookId(poffenderBookId: number) { this._offenderBookId = poffenderBookId; }

    get stgSeq(): number { return this._stgSeq; }
    set stgSeq(pstgSeq: number) { this._stgSeq = pstgSeq; }

    get assessmentSeq(): number { return this._assessmentSeq; }
    set assessmentSeq(passessmentSeq: number) { this._assessmentSeq = passessmentSeq; }

    get itemSeq(): number { return this._itemSeq; }
    set itemSeq(pitemSeq: number) { this._itemSeq = pitemSeq; }

    get ptrId(): number { return this._ptrId; }
    set ptrId(pptrId: number) { this._ptrId = pptrId; }

    get newValue(): number { return this._newValue; }
    set newValue(pnewValue: number) { this._newValue = pnewValue; }

    get commentText(): string { return this._commentText; }
    set commentText(pcommentText: string) { this._commentText = pcommentText; }

    toJSON(): any {
        return {
            'createDateTime': this._createDatetime,
            'createUserId': this._createUserId,
            'modifyDateTime': this._modifyDatetime,
            'modifyUserId': this._modifyUserId,
            'noteDate': this._noteDate,
            'noteSubtype': this._noteSubtype,
            'noteTime': this._noteTime,
            'noteType': this._noteType,
            'sealFlag': this._sealFlag,
            'text': this._text,
            'stgId': this._stgId,
            'noteSeq': this._noteSeq,
            'moduleName': this._moduleName,
            'newText': this._newText,
            'offenderBookId': this._offenderBookId,
            'stgSeq': this._stgSeq,
            'assessmentSeq': this._assessmentSeq,
            'itemSeq': this._itemSeq,
            'ptrId': this._ptrId,
            'newValue': this._newValue,
            'commentText': this._commentText,
        };
    }
}
