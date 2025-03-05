import { BaseModel } from './BaseModel';

export class Fileupload extends BaseModel {

    private _documentId: string;     // RECORD NO
    private _status: string;
    private _createdDate: string;
    private _documentAuthor: string;
    private _fileName: string;
    private _documentName: string;
    private _documentType: string;   // TEMPLATE NAME
    private _image: any;
    private _metaDataLabel: string;
    private _file: any;
    private _uri: string;
    private _templateName:string;
    private _crtDate:string;
    private _modifiedDate:string;
    private _templateId:string;
    private _statusImage:any;
    private _templateUri:string;
    private _moduleName:string;
    private _btnTitle:string;
    private _finalBtnTitle:string;
    private _fileTypeLabel:string;
    private _checkOut:boolean;
    private _statusdesc:string;
    private _fileExtension:string;
    private _createdDateAsDate: Date;
    private _modifiedDateAsDate:Date;
    private _commentText: string;

    get commentText(): string { return this._commentText; }

    set commentText( pcommentText: string ) { this._commentText = pcommentText; }

    get fileExtension(): string { return this._fileExtension; }

    set fileExtension( pfileExtension: string ) { this._fileExtension = pfileExtension; }

    get fileTypeLabel(): string { return this._fileTypeLabel; }

    set fileTypeLabel( fileTypeLabel: string ) { this._fileTypeLabel = fileTypeLabel; }

    get btnTitle(): string { return this._btnTitle; }

    set btnTitle( btnTitle: string ) { this._btnTitle = btnTitle; }

    get finalBtnTitle(): string { return this._finalBtnTitle; }

    set finalBtnTitle( finalBtnTitle: string ) { this._finalBtnTitle = finalBtnTitle; }

    get templateUri(): string { return this._templateUri; }
    
    set templateUri( templateUri: string ) { this._templateUri = templateUri; }
    
    get uri(): string { return this._uri; }
    
    set uri( uri: string ) { this._uri = uri; }
    
    get documentId(): string { return this._documentId; }
    
    set documentId( documentId: string ) { this._documentId = documentId; }
    
    get crtDate(): string { return this._crtDate; }

    set crtDate( crtDate: string ) { this._crtDate = crtDate; }
    
    get templateName(): string { return this._templateName; }
    
    set templateName( templateName: string ) { this._templateName = templateName; }

    get fileName(): string { return this._fileName; }

    set fileName( fileName: string ) { this._fileName = fileName; }
    
    get createdDate(): string { return this._createdDate; }

    set createdDate( createdDate: string ) { this._createdDate = createdDate; }
    
    get modifiedDate(): string { return this._modifiedDate; }

    set modifiedDate( modifyDate: string ) { this._modifiedDate = modifyDate; }

    get documentName(): string { return this._documentName; }
    
    set documentName( documentName: string ) { this._documentName = documentName; }

    get documentType(): string { return this._documentType; }

    set documentType( documentType: string ) { this._documentType = documentType; }

    get image(): any { return this._image; }

    set image( image: any ) { this._image = image; }

    get metaDataLabel(): string { return this._metaDataLabel; }

    set metaDataLabel( metaDataLabel: string ) { this._metaDataLabel = metaDataLabel; }
    
    get templateId(): string { return this._templateId; }

    set templateId( templateId: string ) { this._templateId = templateId; }

    get file(): any {
        return this._file;
    }
    set file( value: any ) {
        this._file = value;
    }
    
    get status(): string { return this._status; }
    
    set status( status: string ) { this._status = status; }
    
    get statusdesc(): string { return this._statusdesc; }
    
    set statusdesc( statusdesc: string ) { this._statusdesc =statusdesc; }
    
    get statusImage(): any { return this._statusImage; }

    set statusImage( statusImage: any ) { this._statusImage = statusImage; }
    
    get documentAuthor(): string { return this._documentAuthor; }
    
    set documentAuthor( documentAuthor: string ) { this._documentAuthor = documentAuthor; }
    
    get moduleName(): string { return this._moduleName; }
    
    set moduleName( moduleName: string ) { this._moduleName = moduleName; }
    
    get checkOut(): boolean { return this._checkOut; }
    
    set checkOut( isCheckOut: boolean ) { this._checkOut = isCheckOut; }
    
    get createdDateAsDate(): Date { return this._createdDateAsDate; }

    set createdDateAsDate( createdDate: Date ) { this._createdDateAsDate = createdDate; }
    
    get modifiedDateAsDate(): Date { return this._modifiedDateAsDate; }

    set modifiedDateAsDate( modifyDate: Date ) { this._modifiedDateAsDate = modifyDate; }

    toJSON(): any {
        return {

            'documentId': this._documentId,
            'status': this._status,
            'createdDate': this._createdDate,
            'documentAuthor': this._documentAuthor,
            'templateUri':this._templateUri,
            'fileName': this._fileName,
            'documentName': this._documentName,
            'documentType': this._documentType,
            'templateId' : this._templateId,
            'file': this._file,
            'moduleName':this._moduleName,
            'checkOut':this._checkOut,
            'createdDateAsDate':this._createdDateAsDate,
            'fileExtension':this._fileExtension,
            'pcommentText':this._commentText
        };
    }
}