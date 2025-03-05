import { BaseModel } from '@commonbeans/BaseModel';

export class BaseHelpUrl extends BaseModel {
    private _id: number;
    private _baseHelpPdfUrl: string;
    private _baseHelpVideoUrl: string;
    private _status: string;
    private  _pId:number;
    private _baseHelpHtmlUrl;
   

    
    get id(): number { return this._id; }
    
    set id( pmoduleName: number ) { this._id = pmoduleName; }
    
    get pid(): number { return this._pId; }
    
    set pid( pmoduleName: number ) { this._pId = pmoduleName; }
   
    get baseHelpPdfUrl(): string { return this._baseHelpPdfUrl; }

    set baseHelpPdfUrl( pmoduleName: string ) { this._baseHelpPdfUrl = pmoduleName; }
    
    get baseHelpVideoUrl(): string { return this._baseHelpVideoUrl; }
    
    set baseHelpVideoUrl( pmoduleName: string ) { this._baseHelpVideoUrl = pmoduleName; }
    
    get status(): string { return this._status; }
    
    set status( pmoduleName: string ) { this._status = pmoduleName; }
    
    get baseHelpHtmlUrl(): string { return this._baseHelpHtmlUrl; }
       
    set baseHelpHtmlUrl( pmoduleName: string ) { this._baseHelpHtmlUrl = pmoduleName; }


    toJSON(): any {
        return {
            'id': this._id,
            'baseHelpPdfUrl':this._baseHelpPdfUrl ,
            'baseHelpVideoUrl': this._baseHelpVideoUrl,
            'status':this._status,
            'baseHelpHtmlUrl':this._baseHelpHtmlUrl,
            'pId':this._pId
        };
    }
}