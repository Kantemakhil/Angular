import { BaseModel } from '@commonbeans/BaseModel';

export class OmsModules extends BaseModel {

    private _moduleName: string;
    private _applnCode: string;
    private _createDatetime: Date;
    private _createUserId: string;
    private _defaultCopy: number;
    private _description: string;
    private _helpDirectory: string;
    private _modifyDatetime: Date;
    private _modifyUserId: string;
    private _moduleType: string;
    private _outputType: string;
    private _previewFlag: string;
    private _printFormatCode: string;
    private _sealFlag: string;
    private _accessPrivilege: string;
    private _verificationFlag: string;
    private _code: string;
    private _accessModuleName: string;
    private _listSeq: number;


    public get listSeq(): number {
        return this._listSeq;
    }
    public set listSeq(value: number) {
        this._listSeq = value;
    }

    public get accessModuleName(): string {
        return this._accessModuleName;
    }

    public set accessModuleName(value: string) {
        this._accessModuleName = value;
    }

    get code(): string { return this._code; }

    set code( pcode: string ) { this._code = pcode; }

    get verificationFlag(): string { return this._verificationFlag; }

    set verificationFlag( pverificationFlag: string ) { this._verificationFlag = pverificationFlag; }

    get accessPrivilege(): string { return this._accessPrivilege; }

    set accessPrivilege( paccessPrivilege: string ) { this._accessPrivilege = paccessPrivilege; }

    get moduleName(): string { return this._moduleName; }

    set moduleName( pmoduleName: string ) { this._moduleName = pmoduleName; }

    get applnCode(): string { return this._applnCode; }

    set applnCode( papplnCode: string ) { this._applnCode = papplnCode; }

    get createDatetime(): Date { return this._createDatetime; }

    set createDatetime( pcreateDatetime: Date ) { this._createDatetime = pcreateDatetime; }

    get createUserId(): string { return this._createUserId; }

    set createUserId( pcreateUserId: string ) { this._createUserId = pcreateUserId; }

    get defaultCopy(): number { return this._defaultCopy; }

    set defaultCopy( pdefaultCopy: number ) { this._defaultCopy = pdefaultCopy; }

    get description(): string { return this._description; }

    set description( pdescription: string ) { this._description = pdescription; }

    get helpDirectory(): string { return this._helpDirectory; }

    set helpDirectory( phelpDirectory: string ) { this._helpDirectory = phelpDirectory; }

    get modifyDatetime(): Date { return this._modifyDatetime; }

    set modifyDatetime( pmodifyDatetime: Date ) { this._modifyDatetime = pmodifyDatetime; }

    get modifyUserId(): string { return this._modifyUserId; }

    set modifyUserId( pmodifyUserId: string ) { this._modifyUserId = pmodifyUserId; }

    get moduleType(): string { return this._moduleType; }

    set moduleType( pmoduleType: string ) { this._moduleType = pmoduleType; }

    get outputType(): string { return this._outputType; }

    set outputType( poutputType: string ) { this._outputType = poutputType; }

    get previewFlag(): string { return this._previewFlag; }

    set previewFlag( ppreviewFlag: string ) { this._previewFlag = ppreviewFlag; }

    get printFormatCode(): string { return this._printFormatCode; }

    set printFormatCode( pprintFormatCode: string ) { this._printFormatCode = pprintFormatCode; }

    get sealFlag(): string { return this._sealFlag; }

    set sealFlag( psealFlag: string ) { this._sealFlag = psealFlag; }


    toJSON(): any {
        return {
            'moduleName': this._moduleName,
            'applnCode': this._applnCode,
            'createDatetime': this._createDatetime,
            'createUserId': this._createUserId,
            'defaultCopy': this._defaultCopy,
            'description': this._description,
            'helpDirectory': this._helpDirectory,
            'modifyDatetime': this._modifyDatetime,
            'modifyUserId': this._modifyUserId,
            'moduleType': this._moduleType,
            'outputType': this._outputType,
            'previewFlag': this._previewFlag,
            'printFormatCode': this._printFormatCode,
            'sealFlag': this._sealFlag,
            'accessPrivilege': this._accessPrivilege,
            'verificationFlag': this._verificationFlag,
            'code': this._code,
            'accessModuleName':this._accessModuleName,
            'listSeq':this._listSeq,
        };
    }
}