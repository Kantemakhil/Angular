export class ContactPersonTypes {

    private  _contactType: string;
    private  _relationshipType: string;
    private  _listSeq: number;
    private  _activeFlag: string;
    private  _updateAllowedFlag: string;
    private  _modifyUserId: string;
    private  _expiryDate: Date;
    private  _createDateTime: Date;
    private  _createUserId: string;
    private  _modifyDateTime: Date;
    private  _sealFlag: string;

    get contactType(): string { return this._contactType ; }
    set contactType(pcontactType: string) { this._contactType = pcontactType ; }
    get relationshipType(): string { return this._relationshipType; }
    set relationshipType(prelationshipType: string ) { this._relationshipType = prelationshipType; }
    get listSeq(): number { return this._listSeq; }
    set listSeq( plistSeq: number ) { this._listSeq = plistSeq; }
    get activeFlag(): string { return this._activeFlag; }
    set activeFlag( pactiveFlag: string ) { this._activeFlag = pactiveFlag; }
    get updateAllowedFlag(): string { return this._updateAllowedFlag; }
    set updateAllowedFlag( pupdateAllowedFlag: string ) { this._updateAllowedFlag = pupdateAllowedFlag; }
    get modifyUserId(): string { return this._modifyUserId  ; }
    set modifyUserId( pmodifyUserId: string) { this._modifyUserId = pmodifyUserId ; }
    get expiryDate(): Date { return this._expiryDate ; }
    set expiryDate( pexpiryDate: Date ) { this._expiryDate = pexpiryDate; }
    get createDateTime(): Date { return this._createDateTime; }
    set createDateTime( pcreateDateTime: Date ) { this._createDateTime = pcreateDateTime; }
    get createUserId(): string { return this._createUserId; }
    set createUserId( pcreateUserId: string  ) { this._createUserId = pcreateUserId; }
    get modifyDateTime(): Date { return this.modifyDateTime = this.modifyDateTime; }
    set modifyDateTime( pmodifyDateTime: Date ) { this.modifyDateTime = pmodifyDateTime; }
    get sealFlag(): string {return this._sealFlag; }
    set sealFlag( psealFlag: string ) { this._sealFlag = psealFlag; }

    toJSON(): any {
        return {
            'contactType': this._contactType,
            'relationshipType': this._relationshipType,
            'listSeq': this._listSeq,
            'activeFlag': this._activeFlag,
            'updateAllowedFlag': this._updateAllowedFlag,
            'modifyUserId': this._modifyUserId,
            'expiryDate': this._expiryDate,
            'createDateTime': this._createDateTime,
            'createUserId': this._createUserId,
            'modifyDateTime': this._modifyDateTime,
            'sealFlag': this._sealFlag,
            };
    }
}
