import { VCorporateAddresses } from "@inst/schedules/beans/VCorporateAddresses";

export class Corporates {
    private _createUserId: string;
    private _modifyDatetime: Date;
    private _modifyUserId: string;
    private _updatedDate: Date;
    private _commentText: string;
    private _corporateId: number;
    private _corporateName: string;
    private _expiryDate: Date;
    private _serialVersionUID: number;
    private _accountTermCode: string;
    private _maximumPurchaseAmount: number;
    private _sealFlag: string;
    private _taxNo: string;
    private _activeFlag: string;
    private _userId: string;
    private _createDatetime: Date;
    private _suspendedFlag: string;
    private _contactPersonName: string;
    private _createdDate: Date;
    private _minimumPurchaseAmount: number;
    private _feiNumber: string;
    private _shippingTermCode: string;
    private _caseloadId: string;
    private _suspendedDate: Date;
    private _memoText: string;
    private _startDate: Date;
    private _telephoneNo: string;
    private _addrData: VCorporateAddresses = new VCorporateAddresses();

    get telephoneNo(): string { return this._telephoneNo; }

    set telephoneNo( ptelephoneNo: string ) { this._telephoneNo = ptelephoneNo; }

    get createUserId(): string { return this._createUserId; }

    set createUserId( pcreateUserId: string ) { this._createUserId = pcreateUserId; }

    get modifyDatetime(): Date { return this._modifyDatetime; }

    set modifyDatetime( pmodifyDatetime: Date ) { this._modifyDatetime = pmodifyDatetime; }

    get modifyUserId(): string { return this._modifyUserId; }

    set modifyUserId( pmodifyUserId: string ) { this._modifyUserId = pmodifyUserId; }

    get updatedDate(): Date { return this._updatedDate; }

    set updatedDate( pupdatedDate: Date ) { this._updatedDate = pupdatedDate; }

    get commentText(): string { return this._commentText; }

    set commentText( pcommentText: string ) { this._commentText = pcommentText; }

    get corporateId(): number { return this._corporateId; }

    set corporateId( pcorporateId: number ) { this._corporateId = pcorporateId; }

    get corporateName(): string { return this._corporateName; }

    set corporateName( pcorporateName: string ) { this._corporateName = pcorporateName; }

    get expiryDate(): Date { return this._expiryDate; }

    set expiryDate( pexpiryDate: Date ) { this._expiryDate = pexpiryDate; }

    get serialVersionUID(): number { return this._serialVersionUID; }

    set serialVersionUID( pserialVersionUID: number ) { this._serialVersionUID = pserialVersionUID; }

    get accountTermCode(): string { return this._accountTermCode; }

    set accountTermCode( paccountTermCode: string ) { this._accountTermCode = paccountTermCode; }

    get maximumPurchaseAmount(): number { return this._maximumPurchaseAmount; }

    set maximumPurchaseAmount( pmaximumPurchaseAmount: number ) { this._maximumPurchaseAmount = pmaximumPurchaseAmount; }

    get sealFlag(): string { return this._sealFlag; }

    set sealFlag( psealFlag: string ) { this._sealFlag = psealFlag; }

    get taxNo(): string { return this._taxNo; }

    set taxNo( ptaxNo: string ) { this._taxNo = ptaxNo; }

    get activeFlag(): string { return this._activeFlag; }

    set activeFlag( pactiveFlag: string ) { this._activeFlag = pactiveFlag; }

    get userId(): string { return this._userId; }

    set userId( puserId: string ) { this._userId = puserId; }

    get createDatetime(): Date { return this._createDatetime; }

    set createDatetime( pcreateDatetime: Date ) { this._createDatetime = pcreateDatetime; }

    get suspendedFlag(): string { return this._suspendedFlag; }

    set suspendedFlag( psuspendedFlag: string ) { this._suspendedFlag = psuspendedFlag; }

    get contactPersonName(): string { return this._contactPersonName; }

    set contactPersonName( pcontactPersonName: string ) { this._contactPersonName = pcontactPersonName; }

    get createdDate(): Date { return this._createdDate; }

    set createdDate( pcreatedDate: Date ) { this._createdDate = pcreatedDate; }

    get minimumPurchaseAmount(): number { return this._minimumPurchaseAmount; }

    set minimumPurchaseAmount( pminimumPurchaseAmount: number ) { this._minimumPurchaseAmount = pminimumPurchaseAmount; }

    get feiNumber(): string { return this._feiNumber; }

    set feiNumber( pfeiNumber: string ) { this._feiNumber = pfeiNumber; }

    get shippingTermCode(): string { return this._shippingTermCode; }

    set shippingTermCode( pshippingTermCode: string ) { this._shippingTermCode = pshippingTermCode; }

    get caseloadId(): string { return this._caseloadId; }

    set caseloadId( pcaseloadId: string ) { this._caseloadId = pcaseloadId; }

    get suspendedDate(): Date { return this._suspendedDate; }

    set suspendedDate( psuspendedDate: Date ) { this._suspendedDate = psuspendedDate; }

    get memoText(): string { return this._memoText; }

    set memoText( pmemoText: string ) { this._memoText = pmemoText; }

    get startDate(): Date { return this._startDate; }

    set startDate( pstartDate: Date ) { this._startDate = pstartDate; }

    get addrData(): VCorporateAddresses { return this._addrData; }
    
    set addrData(value: VCorporateAddresses) { this._addrData = value; }


    toJSON(): any {
        return {
            'createUserId': this._createUserId,
            'modifyDatetime': this._modifyDatetime,
            'modifyUserId': this._modifyUserId,
            'updatedDate': this._updatedDate,
            'commentText': this._commentText,
            'corporateId': this._corporateId,
            'corporateName': this._corporateName,
            'expiryDate': this._expiryDate,
            'serialVersionUID': this._serialVersionUID,
            'accountTermCode': this._accountTermCode,
            'maximumPurchaseAmount': this._maximumPurchaseAmount,
            'sealFlag': this._sealFlag,
            'taxNo': this._taxNo,
            'activeFlag': this._activeFlag,
            'userId': this._userId,
            'createDatetime': this._createDatetime,
            'suspendedFlag': this._suspendedFlag,
            'contactPersonName': this._contactPersonName,
            'createdDate': this._createdDate,
            'minimumPurchaseAmount': this._minimumPurchaseAmount,
            'feiNumber': this._feiNumber,
            'shippingTermCode': this._shippingTermCode,
            'caseloadId': this._caseloadId,
            'suspendedDate': this._suspendedDate,
            'memoText': this._memoText,
            'startDate': this._startDate,
            'telephoneNo': this._telephoneNo
        };
    }
 }