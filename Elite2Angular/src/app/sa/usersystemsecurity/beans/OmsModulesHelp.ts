import { BaseModel } from '@commonbeans/BaseModel';

export class OmsModulesHelp extends BaseModel {
    private _helpType: string;
    private _helpUrl: string;
    private _helpDesc: string;
    private _moduleName: string;
    private _rowId:string;
   

    
    get helpType(): string { return this._helpType; }
    
    set helpType( pmoduleName: string ) { this._helpType = pmoduleName; }
   
    get moduleName(): string { return this._moduleName; }

    set moduleName( pmoduleName: string ) { this._moduleName = pmoduleName; }
    
    get helpDesc(): string { return this._helpDesc; }
    
    set helpDesc( pmoduleName: string ) { this._helpDesc = pmoduleName; }
    
    get helpUrl(): string { return this._helpUrl; }
    
    set helpUrl( pmoduleName: string ) { this._helpUrl = pmoduleName; }
    
    get rowId(): string { return this._rowId; }
    
    set rowId( pmoduleName: string ) { this._rowId = pmoduleName; }
    
    
   

    toJSON(): any {
        return {
            'moduleName': this._moduleName,
            'helpType':this._helpType ,
            'helpUrl': this._helpUrl,
            'helpDesc':this._helpDesc,
            'rowId':this._rowId
        };
    }
}