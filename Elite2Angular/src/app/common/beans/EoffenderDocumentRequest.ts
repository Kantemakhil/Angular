import { BaseModel } from './BaseModel';
import { EoffenderDetails } from '@commonbeans/EoffenderDetails';

export class EoffenderDocumentRequest extends BaseModel {

    private _docDetails: EoffenderDetails;
    private _templateName: string;
    private _templateType: string;
    private _templateId: string;
    private _offenderBookingId:number;
    private _moduleName:string;
    private _objectId:string;
    private _objectData:any;

    get objectData(): any { return this._objectData; }

    set objectData( pobjectData: any ) { this._objectData = pobjectData; }

    public get objectId (): string {
        return this._objectId;
    }
    public set objectId( value: string ) {
        this._objectId = value;
    }

    public get offenderBookingId(): number {
        return this._offenderBookingId;
    }
    public set offenderBookingId( value: number ) {
        this._offenderBookingId = value;
    }
    public get moduleName(): string {
        return this._moduleName;
    }
    public set moduleName( value: string ) {
        this._moduleName = value;
    }

    public get templateType(): string {
        return this._templateType;
    }
    public set templateType( value: string ) {
        this._templateType = value;
    }

    public get templateName(): string {
        return this._templateName;
    }
    public set templateName( value: string ) {
        this._templateName = value;
    }

    public get docDetails(): EoffenderDetails {
        return this._docDetails;
    }
    public set docDetails( value: EoffenderDetails ) {
        this._docDetails = value;
    }
    
    public get templateId(): string {
        return this._templateId;
    }
    public set templateId( value: string ) {
        this._templateId = value;
    }

    toJSON(): any {
        return {
            'templateId' : this._templateId,
            'docDetails': this._docDetails,
            'templateName': this._templateName,
            'templateType': this._templateType,
            'offenderBookingId':this._offenderBookingId,
            'moduleName':this._moduleName,
            'objectId':this._objectId,
            'objectData':this._objectData
        };
    }

}