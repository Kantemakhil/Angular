import { BaseModel } from '@commonbeans/BaseModel';

export class PropertyBundleItems extends BaseModel {
	
	private _propertyItemId: number;
	
	private _groupId: string;

	private _propertyDescription: string;
	
	private _propertyTypeCode: string;
	
	private _sequence: number;
	
	private _receivedFrom: string;

	private _conditionCode: string;

	private _quantity: number;
	
	private _createUserId: string;

	private _modifyUserId: string;

	private _createDateTime: Date;

	private _modifyDateTime: Date;
	
	get propertyItemId(): number { return this._propertyItemId; }
	set propertyItemId(propertyItemId: number) { this._propertyItemId = propertyItemId; }

	get groupId(): string { return this._groupId; }
	set groupId(groupId: string) { this._groupId = groupId; }

	get propertyDescription(): string { return this._propertyDescription; }
	set propertyDescription(propertyDescription: string) { this._propertyDescription = propertyDescription; }
	
	get propertyTypeCode(): string { return this._propertyTypeCode; }
	set propertyTypeCode(propertyTypeCode: string) { this._propertyTypeCode = propertyTypeCode; }
	
	get sequence(): number { return this._sequence; }
	set sequence(sequence: number) { this._sequence = sequence; }
	
	get receivedFrom(): string { return this._receivedFrom; }
	set receivedFrom(receivedFrom: string) { this._receivedFrom = receivedFrom; }
	
	get conditionCode(): string { return this._conditionCode; }
	set conditionCode(conditionCode: string) { this._conditionCode = conditionCode; }
	
	get quantity(): number { return this._quantity; }
	set quantity(quantity: number) { this._quantity = quantity; }	
	
	get createUserId(): string { return this._createUserId; }
	set createUserId(createUserId: string) { this._createUserId = createUserId; }

	get modifyUserId(): string { return this._modifyUserId; }
	set modifyUserId(modifyUserId: string) { this._modifyUserId = modifyUserId; }

	get createDateTime(): Date { return this._createDateTime; }
	set createDateTime(createDateTime: Date) { this._createDateTime = createDateTime; }

	get modifyDateTime(): Date { return this._modifyDateTime; }
	set modifyDateTime(modifyDateTime: Date) { this._modifyDateTime = modifyDateTime; }
	
	toJSON(): any {
		return {
			'propertyItemId': this._propertyItemId,
			'groupId': this._groupId,
			'propertyDescription': this._propertyDescription,
			'propertyTypeCode': this._propertyTypeCode,
			'sequence': this._sequence,
			'quantity': this._quantity,
			'receivedFrom': this._receivedFrom,
			'conditionCode': this._conditionCode,
			'createDatetime': this._createDateTime,
			'createUserId': this._createUserId,
			'modifyDatetime': this._modifyDateTime,
			'modifyUserId': this._modifyUserId
		};
	}

	
}