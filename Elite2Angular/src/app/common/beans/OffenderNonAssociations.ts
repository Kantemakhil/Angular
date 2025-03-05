import { OffenderNaDetails } from "./OffenderNaDetails";

export class OffenderNonAssociations {
  private _createUserId: string;
  private _recipNsReasonCode: string;
  private _modifyDatetime: Date;
  private _offenderBookId: number;
  private _transportFlag: string;
  private _modifyUserId: string;
  private _nsOffenderId: number;
  private _createDatetime: Date;
  private _internalLocationFlag: string;
  private _serialVersionUID: number;
  private _nsReasonCode: string;
  private _nsLevelCode: string;
  private _offenderId: number;
  private _sealFlag: string;
  private _nsOffenderBookId: number;
  private _launchbtn: string;
  private _commitBean: OffenderNonAssociations;
  private _nsType: string;
  private _nsEffectiveDate: Date;
  private _nsExpiryDate: Date;
  private _authorizedStaff: string;
  private _commentText: string;
  private _typeSeq: number;
  private _offenderIdDisplay: string;
  private _activeFlag: string;
  private _updateNonAssociation: string;
  private _expDateFlag: boolean;
  private _lastName: string;
  private _firstName: string;
  private _prisionLocation: string;
  private _livingUnitDescription: string;

  private _naDetailsList: Array<OffenderNaDetails>;
  

  get lastName(): string { return this._lastName; }
  set lastName(plastName: string) { this._lastName = plastName; }
  get firstName(): string { return this._firstName; }
  set firstName(pfirstName: string) { this._firstName= pfirstName; }
  get prisionLocation(): string { return this._prisionLocation; }
  set prisionLocation(pprisionLocation: string) { this._prisionLocation = pprisionLocation; }

  get expDateFlag(): boolean { return this._expDateFlag; }
  set expDateFlag(pexpDateFlag: boolean) { this._expDateFlag = pexpDateFlag; }
  get updateNonAssociation(): string { return this._updateNonAssociation; }
  set updateNonAssociation(pupdateNonAssociation: string) { this._updateNonAssociation = pupdateNonAssociation; }

  get activeFlag(): string { return this._activeFlag; }
  set activeFlag(pactiveFlag: string) { this._activeFlag = pactiveFlag; }

  get offenderIdDisplay(): string { return this._offenderIdDisplay; }
  set offenderIdDisplay(poffenderIdDisplay: string) { this._offenderIdDisplay = poffenderIdDisplay; }

  get commitBean(): OffenderNonAssociations {
    return this._commitBean;
  }

  set commitBean(pcommitBean: OffenderNonAssociations) {
    this._commitBean = pcommitBean;
  }

  get typeSeq(): number { return this._typeSeq; }
  set typeSeq(ptypeSeq: number) { this._typeSeq = ptypeSeq; }

  get nsExpiryDate(): Date { return this._nsExpiryDate; }
  set nsExpiryDate(pnsExpiryDate: Date) { this._nsExpiryDate = pnsExpiryDate; }

  get nsEffectiveDate(): Date { return this._nsEffectiveDate; }
  set nsEffectiveDate(pnsEffectiveDate: Date) { this._nsEffectiveDate = pnsEffectiveDate; }

  get nsType(): string { return this._nsType; }
  set nsType(pnsType: string) { this._nsType = pnsType; }

  get commentText(): string { return this._commentText; }
  set commentText(pcommentText: string) { this._commentText = pcommentText; }
  get authorizedStaff(): string { return this._authorizedStaff; }
  set authorizedStaff(pauthorizedStaff: string) { this._authorizedStaff = pauthorizedStaff; }

  get launchbtn(): string { return this._launchbtn; }
  set launchbtn(plaunchbtn: string) { this._launchbtn = plaunchbtn; }
  get createUserId(): string { return this._createUserId; }
  set createUserId(pcreateUserId: string) { this._createUserId = pcreateUserId; }
  get recipNsReasonCode(): string { return this._recipNsReasonCode; }
  set recipNsReasonCode(precipNsReasonCode: string) { this._recipNsReasonCode = precipNsReasonCode; }
  get modifyDatetime(): Date { return this._modifyDatetime; }
  set modifyDatetime(pmodifyDatetime: Date) { this._modifyDatetime = pmodifyDatetime; }
  get offenderBookId(): number { return this._offenderBookId; }
  set offenderBookId(poffenderBookId: number) { this._offenderBookId = poffenderBookId; }
  get transportFlag(): string { return this._transportFlag; }
  set transportFlag(ptransportFlag: string) { this._transportFlag = ptransportFlag; }
  get modifyUserId(): string { return this._modifyUserId; }
  set modifyUserId(pmodifyUserId: string) { this._modifyUserId = pmodifyUserId; }
  get nsOffenderId(): number { return this._nsOffenderId; }
  set nsOffenderId(pnsOffenderId: number) { this._nsOffenderId = pnsOffenderId; }
  get createDatetime(): Date { return this._createDatetime; }
  set createDatetime(pcreateDatetime: Date) { this._createDatetime = pcreateDatetime; }
  get internalLocationFlag(): string { return this._internalLocationFlag; }
  set internalLocationFlag(pinternalLocationFlag: string) { this._internalLocationFlag = pinternalLocationFlag; }
  get serialVersionUID(): number { return this._serialVersionUID; }
  set serialVersionUID(pserialVersionUID: number) { this._serialVersionUID = pserialVersionUID; }
  get nsReasonCode(): string { return this._nsReasonCode; }
  set nsReasonCode(pnsReasonCode: string) { this._nsReasonCode = pnsReasonCode; }
  get nsLevelCode(): string { return this._nsLevelCode; }
  set nsLevelCode(pnsLevelCode: string) { this._nsLevelCode = pnsLevelCode; }
  get offenderId(): number { return this._offenderId; }
  set offenderId(poffenderId: number) { this._offenderId = poffenderId; }
  get sealFlag(): string { return this._sealFlag; }
  set sealFlag(psealFlag: string) { this._sealFlag = psealFlag; }
  get nsOffenderBookId(): number { return this._nsOffenderBookId; }
  set nsOffenderBookId(pnsOffenderBookId: number) { this._nsOffenderBookId = pnsOffenderBookId; }


  get livingUnitDescription(): string { return this._livingUnitDescription; }

    set livingUnitDescription( plivingUnitDescription: string ) { this._livingUnitDescription = plivingUnitDescription; }


  get naDetailsList(): Array<OffenderNaDetails> { return this._naDetailsList; }

  set naDetailsList(pnaDetailsList: Array<OffenderNaDetails>) { this._naDetailsList= pnaDetailsList; }

  toJSON(): any {
    return {
      'createUserId': this._createUserId,
      'recipNsReasonCode': this._recipNsReasonCode,
      'modifyDatetime': this._modifyDatetime,
      'offenderBookId': this._offenderBookId,
      'transportFlag': this._transportFlag,
      'modifyUserId': this._modifyUserId,
      'nsOffenderId': this._nsOffenderId,
      'createDatetime': this._createDatetime,
      'internalLocationFlag': this._internalLocationFlag,
      'serialVersionUID': this._serialVersionUID,
      'nsReasonCode': this._nsReasonCode,
      'nsLevelCode': this._nsLevelCode,
      'offenderId': this._offenderId,
      'sealFlag': this._sealFlag,
      'nsOffenderBookId': this._nsOffenderBookId,
      'launchbtn': this._launchbtn,
      'commitBean': this._commitBean,
      'nsType': this._nsType,
      'commentText': this._commentText,
      'nsEffectiveDate': this.nsEffectiveDate,
      'authorizedStaff': this.authorizedStaff,
      'nsExpiryDate': this.nsExpiryDate,
      'typeSeq': this.typeSeq,
      'offenderIdDisplay' : this.offenderIdDisplay,
      'activeFlag': this._activeFlag,
      'updateNonAssociation': this._updateNonAssociation,
      'expDateFlag': this._expDateFlag,
      'lastName': this._lastName,
      'firstName': this._firstName,
      'prisionLocation': this._prisionLocation,
      'livingUnitDescription': this._livingUnitDescription,
      'naDetailsList': this._naDetailsList

    };
  }
}
