import { BaseModel } from "@common/beans/BaseModel";

export class FixedAssets extends BaseModel {
	private _acquisitionDate: Date;
	private _dispositionPrice: number;
	private _lifeSpanCode: string;
	private _createUserId: string;
	private _color: string;
	private _year: Date;
	private _modifyDatetime: Date;
	private _modifyUserId: string;
	private _description: string;
	private _assetClass: string;
	private _dispositionDate: Date;
	private _assetLocationId: number;
	private _dispositionCorporateId: number;
	private _assetId: number;
	private _manufactureDate: Date;
	private _model: string;
	private _dispositionCommentText: string;
	private _make: string;
	private _cost: number;
	private _acquisitionCorporationId: number;
	private _assetType: string;
	private _serialNo: string;
	private _acquisitionPersonId: number;
	private _createDatetime: Date;
	private _dispositionPersonId: number;
	private _status: string;
	private _assignCount: number;


	get acquisitionDate(): Date { return this._acquisitionDate; }
	set acquisitionDate(pacquisitionDate: Date) { this._acquisitionDate = pacquisitionDate; }
	get dispositionPrice(): number { return this._dispositionPrice; }
	set dispositionPrice(pdispositionPrice: number) { this._dispositionPrice = pdispositionPrice; }
	get lifeSpanCode(): string { return this._lifeSpanCode; }
	set lifeSpanCode(plifeSpanCode: string) { this._lifeSpanCode = plifeSpanCode; }
	get createUserId(): string { return this._createUserId; }
	set createUserId(pcreateUserId: string) { this._createUserId = pcreateUserId; }
	get color(): string { return this._color; }
	set color(pcolor: string) { this._color = pcolor; }
	get year(): Date { return this._year; }
	set year(pyear: Date) { this._year = pyear; }
	get modifyDatetime(): Date { return this._modifyDatetime; }
	set modifyDatetime(pmodifyDatetime: Date) { this._modifyDatetime = pmodifyDatetime; }
	get modifyUserId(): string { return this._modifyUserId; }
	set modifyUserId(pmodifyUserId: string) { this._modifyUserId = pmodifyUserId; }
	get description(): string { return this._description; }
	set description(pdescription: string) { this._description = pdescription; }
	get assetClass(): string { return this._assetClass; }
	set assetClass(passetClass: string) { this._assetClass = passetClass; }
	get dispositionDate(): Date { return this._dispositionDate; }
	set dispositionDate(pdispositionDate: Date) { this._dispositionDate = pdispositionDate; }
	get assetLocationId(): number { return this._assetLocationId; }
	set assetLocationId(passetLocationId: number) { this._assetLocationId = passetLocationId; }
	get dispositionCorporateId(): number { return this._dispositionCorporateId; }
	set dispositionCorporateId(pdispositionCorporateId: number) { this._dispositionCorporateId = pdispositionCorporateId; }
	get assetId(): number { return this._assetId; }
	set assetId(passetId: number) { this._assetId = passetId; }
	get manufactureDate(): Date { return this._manufactureDate; }
	set manufactureDate(pmanufactureDate: Date) { this._manufactureDate = pmanufactureDate; }
	get model(): string { return this._model; }
	set model(pmodel: string) { this._model = pmodel; }
	get dispositionCommentText(): string { return this._dispositionCommentText; }
	set dispositionCommentText(pdispositionCommentText: string) { this._dispositionCommentText = pdispositionCommentText; }
	get make(): string { return this._make; }
	set make(pmake: string) { this._make = pmake; }
	get cost(): number { return this._cost; }
	set cost(pcost: number) { this._cost = pcost; }
	get acquisitionCorporationId(): number { return this._acquisitionCorporationId; }
	set acquisitionCorporationId(pacquisitionCorporationId: number) { this._acquisitionCorporationId = pacquisitionCorporationId; }
	get assetType(): string { return this._assetType; }
	set assetType(passetType: string) { this._assetType = passetType; }
	get serialNo(): string { return this._serialNo; }
	set serialNo(pserialNo: string) { this._serialNo = pserialNo; }
	get acquisitionPersonId(): number { return this._acquisitionPersonId; }
	set acquisitionPersonId(pacquisitionPersonId: number) { this._acquisitionPersonId = pacquisitionPersonId; }
	get createDatetime(): Date { return this._createDatetime; }
	set createDatetime(pcreateDatetime: Date) { this._createDatetime = pcreateDatetime; }
	get dispositionPersonId(): number { return this._dispositionPersonId; }
	set dispositionPersonId(pdispositionPersonId: number) { this._dispositionPersonId = pdispositionPersonId; }
	get status(): string { return this._status; }
	set status(pstatus: string) { this._status = pstatus; }
	get assignCount(): number { return this._assignCount; }
	set assignCount(value: number) { this._assignCount = value; }


	toJSON(): any {
		return {
			'acquisitionDate': this._acquisitionDate,
			'dispositionPrice': this._dispositionPrice,
			'lifeSpanCode': this._lifeSpanCode,
			'createUserId': this._createUserId,
			'color': this._color,
			'year': this._year,
			'modifyDatetime': this._modifyDatetime,
			'modifyUserId': this._modifyUserId,
			'description': this._description,
			'assetClass': this._assetClass,
			'dispositionDate': this._dispositionDate,
			'assetLocationId': this._assetLocationId,
			'dispositionCorporateId': this._dispositionCorporateId,
			'assetId': this._assetId,
			'manufactureDate': this._manufactureDate,
			'model': this._model,
			'dispositionCommentText': this._dispositionCommentText,
			'make': this._make,
			'cost': this._cost,
			'acquisitionCorporationId': this._acquisitionCorporationId,
			'assetType': this._assetType,
			'serialNo': this._serialNo,
			'acquisitionPersonId': this._acquisitionPersonId,
			'createDatetime': this._createDatetime,
			'dispositionPersonId': this._dispositionPersonId,
			'status': this._status,
			'assignCount': this._assignCount,
		};
	}
}