import { BaseModel } from '@commonbeans/BaseModel';
export class TransactionOperation extends BaseModel {
    private _bankCrAccountCode: number;
    private _drAccountCode: number;
    private _txnOperationSeq: number;
    private _bankDrAccountCode: number;
    private _crAccountCode: number;
    private _createUserId: string;
    private _modifyDate: Date;
    private _modifyDatetime: Date;
    private _chequePayeeType: string;
    private _chequeProductionFlag: string;
    private _modifyUserId: string;
    private _moduleName: string;
    private _txnType: string;
    private _txnOperationType: string;
    private _createDatetime: Date;
    private _serialVersionUID: number;
    private _receiptProductionFlag: string;
    private _caseloadId: string;
    private _listSeq: number;
    private _txnUsage: string;
    private _sealFlag: string;
    private _updateAllowedFlag: string;
    private _txnItemCode: string;
    private _invalidAccountsFlag: string;
    private _drAccountCodeTemp: string;
    private _crAccountCodeTemp: string;
    private _bankDrAccountCodeTemp: string;
    private _bankCrAccountCodeTemp: string;
    private _caseloadType: string;

    get bankCrAccountCode(): number { return this._bankCrAccountCode; }

    set bankCrAccountCode( pbankCrAccountCode: number ) { this._bankCrAccountCode = pbankCrAccountCode; }

    get drAccountCode(): number { return this._drAccountCode; }

    set drAccountCode( pdrAccountCode: number ) { this._drAccountCode = pdrAccountCode; }

    get txnOperationSeq(): number { return this._txnOperationSeq; }

    set txnOperationSeq( ptxnOperationSeq: number ) { this._txnOperationSeq = ptxnOperationSeq; }

    get bankDrAccountCode(): number { return this._bankDrAccountCode; }

    set bankDrAccountCode( pbankDrAccountCode: number ) { this._bankDrAccountCode = pbankDrAccountCode; }

    get crAccountCode(): number { return this._crAccountCode; }

    set crAccountCode( pcrAccountCode: number ) { this._crAccountCode = pcrAccountCode; }

    get createUserId(): string { return this._createUserId; }

    set createUserId( pcreateUserId: string ) { this._createUserId = pcreateUserId; }

    get modifyDate(): Date { return this._modifyDate; }

    set modifyDate( pmodifyDate: Date ) { this._modifyDate = pmodifyDate; }

    get modifyDatetime(): Date { return this._modifyDatetime; }

    set modifyDatetime( pmodifyDatetime: Date ) { this._modifyDatetime = pmodifyDatetime; }

    get chequePayeeType(): string { return this._chequePayeeType; }

    set chequePayeeType( pchequePayeeType: string ) { this._chequePayeeType = pchequePayeeType; }

    get chequeProductionFlag(): string { return this._chequeProductionFlag; }

    set chequeProductionFlag( pchequeProductionFlag: string ) { this._chequeProductionFlag = pchequeProductionFlag; }

    get modifyUserId(): string { return this._modifyUserId; }

    set modifyUserId( pmodifyUserId: string ) { this._modifyUserId = pmodifyUserId; }

    get moduleName(): string { return this._moduleName; }

    set moduleName( pmoduleName: string ) { this._moduleName = pmoduleName; }

    get txnType(): string { return this._txnType; }

    set txnType( ptxnType: string ) { this._txnType = ptxnType; }

    get txnOperationType(): string { return this._txnOperationType; }

    set txnOperationType( ptxnOperationType: string ) { this._txnOperationType = ptxnOperationType; }

    get createDatetime(): Date { return this._createDatetime; }

    set createDatetime( pcreateDatetime: Date ) { this._createDatetime = pcreateDatetime; }

    get serialVersionUID(): number { return this._serialVersionUID; }

    set serialVersionUID( pserialVersionUID: number ) { this._serialVersionUID = pserialVersionUID; }

    get receiptProductionFlag(): string { return this._receiptProductionFlag }

    set receiptProductionFlag( preceiptProductionFlag: string ) { this._receiptProductionFlag = preceiptProductionFlag }

    get caseloadId(): string { return this._caseloadId; }

    set caseloadId( pcaseloadId: string ) { this._caseloadId = pcaseloadId; }

    get listSeq(): number { return this._listSeq; }

    set listSeq( plistSeq: number ) { this._listSeq = plistSeq; }

    get txnUsage(): string { return this._txnUsage; }

    set txnUsage( ptxnUsage: string ) { this._txnUsage = ptxnUsage; }

    get sealFlag(): string { return this._sealFlag; }

    set sealFlag( psealFlag: string ) { this._sealFlag = psealFlag; }

    get updateAllowedFlag(): string { return this._updateAllowedFlag; }

    set updateAllowedFlag( pupdateAllowedFlag: string ) { this._updateAllowedFlag = pupdateAllowedFlag; }

    get txnItemCode(): string { return this._txnItemCode; }

    set txnItemCode( ptxnItemCode: string ) { this._txnItemCode = ptxnItemCode; }

    get invalidAccountsFlag(): string { return this._invalidAccountsFlag; }

    set invalidAccountsFlag( pinvalidAccountsFlag: string ) { this._invalidAccountsFlag = pinvalidAccountsFlag; }

    get drAccountCodeTemp(): string { return this._drAccountCodeTemp; }

    set drAccountCodeTemp(pdrAccountCodeTemp: string) { this._drAccountCodeTemp = pdrAccountCodeTemp; }

    get crAccountCodeTemp(): string { return this._crAccountCodeTemp; }

    set crAccountCodeTemp(pcrAccountCodeTemp: string) { this._crAccountCodeTemp = pcrAccountCodeTemp; }

    get bankDrAccountCodeTemp(): string { return this._bankDrAccountCodeTemp; }

    set bankDrAccountCodeTemp(pbankDrAccountCodeTemp: string) { this._bankDrAccountCodeTemp = pbankDrAccountCodeTemp; }

    get bankCrAccountCodeTemp(): string { return this._bankCrAccountCodeTemp; }

    set bankCrAccountCodeTemp(pbankCrAccountCodeTemp: string) { this._bankCrAccountCodeTemp = pbankCrAccountCodeTemp; }

    get caseloadType(): string { return this._caseloadType; }

    set caseloadType( pcaseloadType: string ) { this._caseloadType = pcaseloadType; }


    toJSON(): any {
        return {
            'bankCrAccountCode': this._bankCrAccountCode,
            'drAccountCode': this._drAccountCode,
            'txnOperationSeq': this._txnOperationSeq,
            'bankDrAccountCode': this._bankDrAccountCode,
            'crAccountCode': this._crAccountCode,
            'createUserId': this._createUserId,
            'modifyDate': this._modifyDate,
            'modifyDatetime': this._modifyDatetime,
            'chequePayeeType': this._chequePayeeType,
            'chequeProductionFlag': this._chequeProductionFlag,
            'modifyUserId': this._modifyUserId,
            'moduleName': this._moduleName,
            'txnType': this._txnType,
            'txnOperationType': this._txnOperationType,
            'createDatetime': this._createDatetime,
            'serialVersionUID': this._serialVersionUID,
            'receiptProductionFlag': this._receiptProductionFlag,
            'caseloadId': this._caseloadId,
            'listSeq': this._listSeq,
            'txnUsage': this._txnUsage,
            'sealFlag': this._sealFlag,
            'updateAllowedFlag': this._updateAllowedFlag,
            'txnItemCode': this._txnItemCode,
            'invalidAccountsFlag': this._invalidAccountsFlag,
            'drAccountCodeTemp': this._drAccountCodeTemp,
            'crAccountCodeTemp': this._crAccountCodeTemp,
            'bankCrAccountCodeTemp': this._bankCrAccountCodeTemp,
            'bankDrAccountCodeTemp': this._bankDrAccountCodeTemp,
            'caseloadType': this._caseloadType
        };
    }
 }
