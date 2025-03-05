import { BaseModel} from '@commonbeans/BaseModel';

export class OmuavbedLivUnitsQuery extends BaseModel {

  private _createDatetime: Date;
  private _createUserId: string;
  private _modifyDatetime: Date;
  private _modifyUserId: string;
  private _profileCode: string;
  private _profileType: string;
  private _inserted: boolean;
  private _livingUnitId: number;
  private _description: string;
  private _noOfOccupant: number;
  private _capacity: number;
  private _noOfAvailable: number;
  private _unitAtCapacity: string;
  private _prisonerConflict: string;
  private _securityConflict: string;
  private _cellSharingConflict: string;
  private _pOffenderBookId: number;
  private _pOffenderId: number;
  private _pCaseloadId: string;
  private _pAgyLocId: string;
  private _pLivingUnitType: string;
  private _pLevel1Code: string;
  private _pLevel2Code: string;
  private _pLevel3Code: string;
  private _pLevel4Code: string;
  private _profileTypeOne: string;
  private _profileCodeOne: string;

  get createDatetime(): Date { return this._createDatetime; }

  set createDatetime(pcreateDatetime: Date) { this._createDatetime = pcreateDatetime; }

  get createUserId(): string { return this._createUserId; }

  set createUserId(pcreateUserId: string) { this._createUserId = pcreateUserId; }

  get modifyDatetime(): Date { return this._modifyDatetime; }

  set modifyDatetime(pmodifyDatetime: Date) { this._modifyDatetime = pmodifyDatetime; }

  get modifyUserId(): string { return this._modifyUserId; }

  set modifyUserId(pmodifyUserId: string) { this._modifyUserId = pmodifyUserId; }

  get profileCode(): string { return this._profileCode; }

  set profileCode(pprofileCode: string) { this._profileCode = pprofileCode; }

  get profileType(): string { return this._profileType; }

  set profileType(pprofileType: string) { this._profileType = pprofileType;}

  get inserted(): boolean { return this._inserted; }

  set inserted(pinserted: boolean) { this._inserted = pinserted; }

  get livingUnitId(): number { return this._livingUnitId; }

  set livingUnitId(plivingUnitId: number) { this._livingUnitId = plivingUnitId; }

  get description(): string { return this._description; }

  set description(pdescription: string) { this._description = pdescription; }

  get noOfOccupant(): number { return this._noOfOccupant; }

  set noOfOccupant(pnoOfOccupant: number) { this._noOfOccupant = pnoOfOccupant; }

  get capacity(): number { return this._capacity; }

  set capacity(pcapacity: number) { this._capacity = pcapacity; }

  get noOfAvailable(): number { return this._noOfAvailable; }

  set noOfAvailable(pnoOfAvailable: number) { this._noOfAvailable = pnoOfAvailable; }

  get unitAtCapacity(): string { return this._unitAtCapacity; }

  set unitAtCapacity(punitAtCapacity: string) { this._unitAtCapacity = punitAtCapacity; }

  get prisonerConflict(): string { return this._prisonerConflict; }

  set prisonerConflict(pprisonerConflict: string) { this._prisonerConflict = pprisonerConflict; }

  get securityConflict(): string { return this._securityConflict; }

  set securityConflict(psecurityConflict: string) { this._securityConflict = psecurityConflict; }

  get cellSharingConflict(): string { return this._cellSharingConflict; }

  set cellSharingConflict(pcellSharingConflict: string) { this._cellSharingConflict = pcellSharingConflict;}

  get pOffenderBookId(): number { return this._pOffenderBookId; }

  set pOffenderBookId(pOffenderBookId: number) { this._pOffenderBookId = pOffenderBookId; }

  get pOffenderId(): number { return this._pOffenderId; }

  set pOffenderId(pOffenderId: number) { this._pOffenderId = pOffenderId; }

  get pCaseloadId(): string { return this._pCaseloadId; }

  set pCaseloadId(pCaseloadId: string) { this._pCaseloadId = pCaseloadId; }

  get pAgyLocId(): string { return this._pAgyLocId; }

  set pAgyLocId(pAgyLocId: string) { this._pAgyLocId = pAgyLocId; }

  get pLivingUnitType(): string { return this._pLivingUnitType; }

  set pLivingUnitType(pLivingUnitType: string) { this._pLivingUnitType = pLivingUnitType; }

  get pLevel1Code(): string { return this._pLevel1Code; }

  set pLevel1Code(pLevel1Code: string) { this._pLevel1Code = pLevel1Code; }

  get pLevel2Code(): string { return this._pLevel2Code; }

  set pLevel2Code(pLevel2Code: string) { this._pLevel2Code = pLevel2Code; }

  get pLevel3Code(): string { return this._pLevel3Code; }

  set pLevel3Code(pLevel3Code: string) { this._pLevel3Code = pLevel3Code; }

  get pLevel4Code(): string { return this._pLevel4Code; }

  set pLevel4Code(pLevel4Code: string) { this._pLevel4Code = pLevel4Code; }

  get profileTypeOne(): string { return this._profileTypeOne; }

  set profileTypeOne(pprofileTypeOne: string) { this._profileTypeOne = pprofileTypeOne;}

  get profileCodeOne(): string { return this._profileCodeOne; }

  set profileCodeOne(pprofileCodeOne: string) { this._profileCodeOne = pprofileCodeOne; }


  toJSON(): any {
    return {
      'createDatetime': this._createDatetime,
      'createUserId': this._createUserId,
      'modifyDatetime': this._modifyDatetime,
      'modifyUserId': this._modifyUserId,
      'profileCode': this._profileCode,
      'profileType': this._profileType,
      'inserted': this._inserted,
      'livingUnitId': this._livingUnitId,
      'capacity': this._capacity,
      'noOfOccupant': this._noOfOccupant,
      'noOfAvailable': this._noOfAvailable,
      'description': this._description,
      'unitAtCapacity': this._unitAtCapacity,
      'prisonerConflict': this._prisonerConflict,
      'securityConflict': this._securityConflict,
      'cellSharingConflict': this._cellSharingConflict,
      'pOffenderBookId': this._pOffenderBookId,
      'pOffenderId': this._pOffenderId,
      'pCaseloadId': this._pCaseloadId,
      'pAgyLocId': this._pAgyLocId,
      'pLivingUnitType': this._pLivingUnitType,
      'pLevel1Code': this._pLevel1Code,
      'pLevel2Code': this._pLevel2Code,
      'pLevel3Code': this._pLevel3Code,
      'pLevel4Code': this._pLevel4Code,
      'profileTypeOne': this._profileTypeOne,
      'profileCodeOne': this._profileCodeOne
    };
  }
}
