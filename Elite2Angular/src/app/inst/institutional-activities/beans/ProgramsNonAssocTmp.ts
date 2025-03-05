import { BaseModel } from '@commonbeans/BaseModel';
export class ProgramsNonAssocTmp extends BaseModel {


    private _line: number;
    private _offenderId: number;
    private _offenderBookId: number;
    private _programId: number;
    private _crsActyId: number;
    private _warningMsg: string;
    private _warningPrompt: string;
    private _lvOffenderId: number;
    private _lvRootOffenderId: number;
    private _coursePhaseId: number;

    get line(): number { return this._line; }

    set line(pline: number) { this._line = pline; }

    get offenderId(): number { return this._offenderId; }

    set offenderId(poffenderId: number) { this._offenderId = poffenderId; }

    get offenderBookId(): number { return this._offenderBookId; }

    set offenderBookId(poffenderBookId: number) { this._offenderBookId = poffenderBookId; }

    get programId(): number { return this._programId; }

    set programId(pprogramId: number) { this._programId = pprogramId; }

    get crsActyId(): number { return this._crsActyId; }

    set crsActyId(pcrsActyId: number) { this._crsActyId = pcrsActyId; }

    get warningMsg(): string { return this._warningMsg; }

    set warningMsg(pwarningMsg: string) { this._warningMsg = pwarningMsg; }

    get warningPrompt(): string { return this._warningPrompt; }

    set warningPrompt(pwarningPrompt: string) { this._warningPrompt = pwarningPrompt; }

    get lvOffenderId(): number { return this._lvOffenderId; }

    set lvOffenderId(plvOffenderId: number) { this._lvOffenderId = plvOffenderId; }

    get lvRootOffenderId(): number { return this._lvRootOffenderId; }

    set lvRootoffenderId(plvRootOffenderId: number) { this._lvRootOffenderId = plvRootOffenderId; }

    get coursePhaseId(): number { return this._coursePhaseId; }

    set coursePhaseId(pcoursePhaseId: number) { this._coursePhaseId = pcoursePhaseId; }

    toJSON(): any {
        return {
            'offenderBookId': this._offenderBookId,
            'offenderId': this._offenderId,
            'programId': this._programId,
            'crsActyId': this._crsActyId,
            'line': this._line,
            'warningMsg': this._warningMsg,
            'warningPrompt': this._warningPrompt,
            'lvOffenderId': this._lvOffenderId,
            'lvRootOffenderId': this._lvRootOffenderId,
            'coursePhaseId': this._coursePhaseId
        };
    }
}
