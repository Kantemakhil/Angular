export class Arrests {
	private _bloodAlcoholContent: number;
	private _arrestTime: Date;
	private _createUserId: string;
	private _officerFirstName: string;
	private _arrestLocationText: string;
	private _offenderBookId: number;
	private _orderId: number;
	private _modifyDatetime: Date;
	private _arrestId: number;
	private _officerLastName: string;
	private _modifyUserId: string;
	private _controlArrestAgyLocId: string;
	private _commentText: string;
	private _createDatetime: Date;
	private _policeStation: string;
	private _serialVersionUID: number;
	private _enforcementAgyLocId: string;
	private _caseId: number;
	private _arrestDate: Date;
	private _sealFlag: string;
	private _staffId: number;

	get bloodAlcoholContent(): number { return this._bloodAlcoholContent; }
	set bloodAlcoholContent(pbloodAlcoholContent: number) { this._bloodAlcoholContent = pbloodAlcoholContent; }
	get arrestTime(): Date { return this._arrestTime; }
	set arrestTime(parrestTime: Date) { this._arrestTime = parrestTime; }
	get createUserId(): string { return this._createUserId; }
	set createUserId(pcreateUserId: string) { this._createUserId = pcreateUserId; }
	get officerFirstName(): string { return this._officerFirstName; }
	set officerFirstName(pofficerFirstName: string) { this._officerFirstName = pofficerFirstName; }
	get arrestLocationText(): string { return this._arrestLocationText; }
	set arrestLocationText(parrestLocationText: string) { this._arrestLocationText = parrestLocationText; }
	get offenderBookId(): number { return this._offenderBookId; }
	set offenderBookId(poffenderBookId: number) { this._offenderBookId = poffenderBookId; }
	get orderId(): number { return this._orderId; }
	set orderId(porderId: number) { this._orderId = porderId; }
	get modifyDatetime(): Date { return this._modifyDatetime; }
	set modifyDatetime(pmodifyDatetime: Date) { this._modifyDatetime = pmodifyDatetime; }
	get arrestId(): number { return this._arrestId; }
	set arrestId(parrestId: number) { this._arrestId = parrestId; }
	get officerLastName(): string { return this._officerLastName; }
	set officerLastName(pofficerLastName: string) { this._officerLastName = pofficerLastName; }
	get modifyUserId(): string { return this._modifyUserId; }
	set modifyUserId(pmodifyUserId: string) { this._modifyUserId = pmodifyUserId; }
	get controlArrestAgyLocId(): string { return this._controlArrestAgyLocId; }
	set controlArrestAgyLocId(pcontrolArrestAgyLocId: string) { this._controlArrestAgyLocId = pcontrolArrestAgyLocId; }
	get commentText(): string { return this._commentText; }
	set commentText(pcommentText: string) { this._commentText = pcommentText; }
	get createDatetime(): Date { return this._createDatetime; }
	set createDatetime(pcreateDatetime: Date) { this._createDatetime = pcreateDatetime; }
	get policeStation(): string { return this._policeStation; }
	set policeStation(ppoliceStation: string) { this._policeStation = ppoliceStation; }
	get serialVersionUID(): number { return this._serialVersionUID; }
	set serialVersionUID(pserialVersionUID: number) { this._serialVersionUID = pserialVersionUID; }
	get enforcementAgyLocId(): string { return this._enforcementAgyLocId; }
	set enforcementAgyLocId(penforcementAgyLocId: string) { this._enforcementAgyLocId = penforcementAgyLocId; }
	get caseId(): number { return this._caseId; }
	set caseId(pcaseId: number) { this._caseId = pcaseId; }
	get arrestDate(): Date { return this._arrestDate; }
	set arrestDate(parrestDate: Date) { this._arrestDate = parrestDate; }
	get sealFlag(): string { return this._sealFlag; }
	set sealFlag(psealFlag: string) { this._sealFlag = psealFlag; }
	get staffId(): number { return this._staffId; }
	set staffId(pstaffId: number) { this._staffId = pstaffId; }

	toJSON(): any {
		return {
			'bloodAlcoholContent': this._bloodAlcoholContent,
			'arrestTime': this._arrestTime,
			'createUserId': this._createUserId,
			'officerFirstName': this._officerFirstName,
			'arrestLocationText': this._arrestLocationText,
			'offenderBookId': this._offenderBookId,
			'orderId': this._orderId,
			'modifyDatetime': this._modifyDatetime,
			'arrestId': this._arrestId,
			'officerLastName': this._officerLastName,
			'modifyUserId': this._modifyUserId,
			'controlArrestAgyLocId': this._controlArrestAgyLocId,
			'commentText': this._commentText,
			'createDatetime': this._createDatetime,
			'policeStation': this._policeStation,
			'serialVersionUID': this._serialVersionUID,
			'enforcementAgyLocId': this._enforcementAgyLocId,
			'caseId': this._caseId,
			'arrestDate': this._arrestDate,
			'sealFlag': this._sealFlag,
			'staffId': this._staffId,
		};
	}
}
