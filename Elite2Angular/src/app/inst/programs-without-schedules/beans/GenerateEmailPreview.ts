import { BaseModel } from '@commonbeans/BaseModel';
export class GenerateEmailPreview extends BaseModel {
    private _pWorkflowType: string;
    private _pWorkId: number;
    private _pOffenderBookId: number;
    private _pXml: string;

    get pWorkflowType(): string { return this._pWorkflowType; }
    set pWorkflowType(pWorkflowType: string) { this._pWorkflowType = pWorkflowType; }

    get pWorkId(): number { return this._pWorkId; }
    set pWorkId(pWorkId: number) { this._pWorkId = pWorkId; }

    get pOffenderBookId(): number { return this._pOffenderBookId; }
    set pOffenderBookId(pOffenderBookId: number) { this._pOffenderBookId = pOffenderBookId; }

    get pXml(): string { return this._pXml; }
    set pXml(pXml: string) { this._pXml = pXml; }


    toJSON(): any {
        return {
            'pWorkflowType': this._pWorkflowType,
            'pWorkId': this._pWorkId,
            'pOffenderBookId': this._pOffenderBookId,
            'pXml': this._pXml,
        };
    }
}