
export class OmsReportAsset {
	private _assetId: number;
	private _assetCode: string;
	private _assetBody: any;
	private _assetsFilename: string;
	private _createDatetime: Date;
	private _createUserId: string;
	private _modifyDatetime: Date;
	private _modifyUserId: string;

	get assetId(): number { return this._assetId; }

	set assetId(assetId: number) { this._assetId = assetId; }

	get assetCode(): string { return this._assetCode; }

	set assetCode(assetCode: string) { this._assetCode = assetCode; }

	get assetBody(): any { return this._assetBody; }

	set assetBody(assetBody: any) { this._assetBody = assetBody; }

	get assetsFilename(): string { return this._assetsFilename; }

	set assetsFilename(assetsFilename: string) { this._assetsFilename = assetsFilename; }

	get createDatetime(): Date { return this._createDatetime; }

	set createDatetime(createDatetime: Date) { this._createDatetime = createDatetime; }

	get createUserId(): string { return this._createUserId; }

	set createUserId(createUserId: string) { this._createUserId = createUserId; }

	get modifyDatetime(): Date { return this._modifyDatetime; }

	set modifyDatetime(modifyDatetime: Date) { this._modifyDatetime = modifyDatetime; }

	get modifyUserId(): string { return this._modifyUserId; }

	set modifyUserId(modifyUserId: string) { this._modifyUserId = modifyUserId; }

	 toJSON(): any {
	        return {
	            'assetId': this._assetId,
	            'assetCode': this._assetCode,
	            'assetBody': this._assetBody,
	            'assetsFilename': this._assetsFilename,
	            'createDateTime': this._createDatetime,
	            'createUserId': this._createUserId,
	            'modifyDatetime': this._modifyDatetime,
	            'modifyUserId': this._modifyUserId,
	        };
	    }

}   
