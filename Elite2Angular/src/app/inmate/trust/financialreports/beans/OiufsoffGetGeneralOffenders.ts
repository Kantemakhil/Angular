import { BaseModel } from '@commonbeans/BaseModel';

    export class OiufsoffGetGeneralOffenders extends BaseModel  {
         private _lastName: string;
         private _prisonLocation: string;
         private _offenderBookId: number;
         private _dspLvOneId: string;
         private _offenderIdDisplay: string;
         private _pMiddleName: string;
         private _pActiveFlag: string;
         private _pLv3Id: number;
         private _serialVersionUID: number;
         private _nbtActvTrustFlag: string;
         private _pLv1Id: number;
         private _pLv2Id: number;
         private _pLastName: string;
         private _pOffenderIdDisplay: string;
         private _dspLvTwoId: string;
         private _pAgyLocId: string;
         private _pReportApplnCode: string;
         private _pCaseloadId: string;
         private _rootOffenderId: number;
         private _firstName: string;
         private _pFirstName: string;
         private _agyLocId: string;
         private _dspLvThreeId: string;
         private _middleName: string;
         private _offenderId: number;

         get lastName(): string { return this._lastName; }
         set lastName(plastName: string) { this._lastName = plastName; }
         get prisonLocation(): string { return this._prisonLocation; }
         set prisonLocation(pprisonLocation: string) { this._prisonLocation = pprisonLocation; }
         get offenderBookId(): number { return this._offenderBookId; }
         set offenderBookId(poffenderBookId: number) { this._offenderBookId = poffenderBookId; }
         get dspLvOneId(): string { return this._dspLvOneId; }
         set dspLvOneId(pdspLvOneId: string) { this._dspLvOneId = pdspLvOneId; }
         get offenderIdDisplay(): string { return this._offenderIdDisplay; }
         set offenderIdDisplay(poffenderIdDisplay: string) { this._offenderIdDisplay = poffenderIdDisplay; }
         get pMiddleName(): string { return this._pMiddleName; }
         set pMiddleName(ppMiddleName: string) { this._pMiddleName = ppMiddleName; }
         get pActiveFlag(): string { return this._pActiveFlag; }
         set pActiveFlag(ppActiveFlag: string) { this._pActiveFlag = ppActiveFlag; }
         get pLv3Id(): number { return this._pLv3Id; }
         set pLv3Id(ppLv3Id: number) { this._pLv3Id = ppLv3Id; }
         get serialVersionUID(): number { return this._serialVersionUID; }
         set serialVersionUID(pserialVersionUID: number) { this._serialVersionUID = pserialVersionUID; }
         get nbtActvTrustFlag(): string { return this._nbtActvTrustFlag; }
         set nbtActvTrustFlag(pnbtActvTrustFlag: string) { this._nbtActvTrustFlag = pnbtActvTrustFlag; }
         get pLv1Id(): number { return this._pLv1Id; }
         set pLv1Id(ppLv1Id: number) { this._pLv1Id = ppLv1Id; }
         get pLv2Id(): number { return this._pLv2Id; }
         set pLv2Id(ppLv2Id: number) { this._pLv2Id = ppLv2Id; }
         get pLastName(): string { return this._pLastName; }
         set pLastName(ppLastName: string) { this._pLastName = ppLastName; }
         get pOffenderIdDisplay(): string { return this._pOffenderIdDisplay; }
         set pOffenderIdDisplay(ppOffenderIdDisplay: string) { this._pOffenderIdDisplay = ppOffenderIdDisplay; }
         get dspLvTwoId(): string { return this._dspLvTwoId; }
         set dspLvTwoId(pdspLvTwoId: string) { this._dspLvTwoId = pdspLvTwoId; }
         get pAgyLocId(): string { return this._pAgyLocId; }
         set pAgyLocId(ppAgyLocId: string) { this._pAgyLocId = ppAgyLocId; }
         get pReportApplnCode(): string { return this._pReportApplnCode; }
         set pReportApplnCode(ppReportApplnCode: string) { this._pReportApplnCode = ppReportApplnCode; }
         get pCaseloadId(): string { return this._pCaseloadId; }
         set pCaseloadId(ppCaseloadId: string) { this._pCaseloadId = ppCaseloadId; }
         get rootOffenderId(): number { return this._rootOffenderId; }
         set rootOffenderId(prootOffenderId: number) { this._rootOffenderId = prootOffenderId; }
         get firstName(): string { return this._firstName; }
         set firstName(pfirstName: string) { this._firstName = pfirstName; }
         get pFirstName(): string { return this._pFirstName; }
         set pFirstName(ppFirstName: string) { this._pFirstName = ppFirstName; }
         get agyLocId(): string { return this._agyLocId; }
         set agyLocId(pagyLocId: string) { this._agyLocId = pagyLocId; }
         get dspLvThreeId(): string { return this._dspLvThreeId; }
         set dspLvThreeId(pdspLvThreeId: string) { this._dspLvThreeId = pdspLvThreeId; }
         get middleName(): string { return this._middleName; }
         set middleName(pmiddleName: string) { this._middleName = pmiddleName; }
         get offenderId(): number { return this._offenderId; }
         set offenderId(poffenderId: number) { this._offenderId = poffenderId; }

     toJSON(): any  {
         return {
            'lastName': this._lastName,
            'prisonLocation': this._prisonLocation,
            'offenderBookId': this._offenderBookId,
            'dspLvOneId': this._dspLvOneId,
            'offenderIdDisplay': this._offenderIdDisplay,
            'pMiddleName': this._pMiddleName,
            'pActiveFlag': this._pActiveFlag,
            'pLv3Id': this._pLv3Id,
            'serialVersionUID': this._serialVersionUID,
            'nbtActvTrustFlag': this._nbtActvTrustFlag,
            'pLv1Id': this._pLv1Id,
            'pLv2Id': this._pLv2Id,
            'pLastName': this._pLastName,
            'pOffenderIdDisplay': this._pOffenderIdDisplay,
            'dspLvTwoId': this._dspLvTwoId,
            'pAgyLocId': this._pAgyLocId,
            'pReportApplnCode': this._pReportApplnCode,
            'pCaseloadId': this._pCaseloadId,
            'rootOffenderId': this._rootOffenderId,
            'firstName': this._firstName,
            'pFirstName': this._pFirstName,
            'agyLocId': this._agyLocId,
            'dspLvThreeId': this._dspLvThreeId,
            'middleName': this._middleName,
            'offenderId': this._offenderId,
             };
         }
 }
