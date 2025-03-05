import { BaseModel } from './BaseModel';

export class TagSearchPopulateOffDetails extends BaseModel {

  private _pRootOffenderId: number;
  private _pPrisonLocation: string;
  private _pCommunityOfficer: string;
  private _pPrisonStatus: string;
  private _pCommunityStatus: string;
  private _pOffenderBookId: number;
  private _pAddress: string;

    get pRootOffenderId(): number { return this._pRootOffenderId; }

    set pRootOffenderId(ppRootOffenderId: number) { this._pRootOffenderId = ppRootOffenderId; }

    get pPrisonLocation(): string { return this._pPrisonLocation; }

    set pPrisonLocation(ppPrisonLocation: string) { this._pPrisonLocation = ppPrisonLocation; }

    get pCommunityOfficer(): string { return this._pCommunityOfficer; }

    set pCommunityOfficer(ppCommunityOfficer: string) { this._pCommunityOfficer = ppCommunityOfficer; }

    get pPrisonStatus(): string { return this._pPrisonStatus; }

    set pPrisonStatus(ppPrisonStatus: string) { this._pPrisonStatus = ppPrisonStatus; }

    get pCommunityStatus(): string { return this._pCommunityStatus; }

    set pCommunityStatus(ppCommunityStatus: string) { this._pCommunityStatus = ppCommunityStatus; }

    get pOffenderBookId(): number { return this._pOffenderBookId; }

    set pOffenderBookId(ppOffenderBookId: number) { this._pOffenderBookId = ppOffenderBookId; }

    get pAddress(): string { return this._pAddress; }

    set pAddress(ppAddress: string) { this._pAddress = ppAddress; }

    toJSON(): any {
        return {
            'pRootOffenderId': this._pRootOffenderId,
            'pPrisonLocation': this._pPrisonLocation,
            'pCommunityOfficer': this._pCommunityOfficer,
            'pPrisonStatus': this._pPrisonStatus,
            'pCommunityStatus': this._pCommunityStatus,
            'pOffenderBookId': this._pOffenderBookId,
            'pAddress': this._pAddress
        };
    }
}
