import { BaseModel } from '@commonbeans/BaseModel';
export class StgSearchV1 extends BaseModel {
        private _code: string;
        private _description: string;
        private _source: string;
        private _stgId: number;
        private _seq: number;
        private _goPushbutton: string;
        private _identifier: string;
        private _keywordText: string;

        get code(): string { return this._code; }
        set code(pcode: string) { this._code = pcode; }
        get description(): string { return this._description; }
        set description(pdescription: string) { this._description = pdescription; }
        get source(): string { return this._source; }
        set source(psource: string) { this._source = psource; }
        get stgId(): number { return this._stgId; }
        set stgId(pstgId: number) { this._stgId = pstgId; }
        get seq(): number { return this._seq; }
        set seq(pseq: number) { this._seq = pseq; }
        get goPushbutton(): string { return this._goPushbutton; }
        set goPushbutton(pgoPushbutton: string) { this._goPushbutton = pgoPushbutton; }
        get identifier(): string { return this._identifier; }
        set identifier(pidentifier: string) { this._identifier = pidentifier; }
        get keywordText(): string { return this._keywordText; }
        set keywordText(pkeywordText: string) { this._keywordText = pkeywordText; }
        toJSON(): any {
                return {
                        'code': this._code,
                        'description': this._description,
                        'source': this._source,
                        'stgId': this._stgId,
                        'seq': this._seq,
                        'goPushbutton': this._goPushbutton,
                        'identifier': this._identifier,
                        'keywordText': this._keywordText,
                };
        }
}
