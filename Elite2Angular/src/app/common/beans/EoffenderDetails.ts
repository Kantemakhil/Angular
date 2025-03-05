import { BaseModel } from './BaseModel';

export class EoffenderDetails extends BaseModel {

    private _keyLogin: string;
    private _userId: string;
    private _offenderBookId: number;
    private _offenderBookingNo: string;
    private _objectType: string;
    private _objectId: number;
    private _moduleName: string;
    private _offenderId:number;
    private _description:string;
    private _osUser:string;
    private _userRole:string;
    private _offenderIdDisplay:string;
    private _lastName:string;
    private _firstName:string;
    private _middleName:string;
    private _currentCaseLoad:string;
    private _prisonLocation:string;
    private _offSupLevel:string;
    private _templateType:string;
    private _trimUser:string;
    private _fileUploadLimit:string;
    private _fileUploadSizeLimit:string;
    private _statusDisplay:string;
    private _birthDate: Date;
    private _completeFlag:string;
    private _objectData:string;
    private _deleteReason:string;

    get objectData(): string { return this._objectData; }

    set objectData( pobjectData: string ) { this._objectData = pobjectData; }

    get keyLogin(): string { return this._keyLogin; }

set keyLogin( keyLogin: string ) { this._keyLogin = keyLogin; }

get userId(): string { return this._userId; }

set userId( userId: string ) { this._userId = userId; }

get objectType(): string { return this._objectType; }

set objectType( objectType: string ) { this._objectType = objectType; }

get objectId(): number { return this._objectId; }

set objectId( objectId: number ) { this._objectId = objectId; }

get offenderBookId(): number { return this._offenderBookId; }

set offenderBookId( offenderBookId: number ) { this._offenderBookId = offenderBookId; }

get offenderBookingNo(): string { return this._offenderBookingNo; }

set offenderBookingNo( offenderBookingNo: string ) { this._offenderBookingNo = offenderBookingNo; }

get moduleName(): string { return this._moduleName; }

set moduleName( moduleName: string ) { this._moduleName = moduleName; }

get offenderId(): number { return this._offenderId; }

set offenderId( offenderId: number ) { this._offenderId = offenderId; }

get description(): string { return this._description; }

set description( description: string ) { this._description = description; }

get osUser(): string { return this._osUser; }

set osUser( osUser: string ) { this._osUser = osUser; }

get userRole(): string { return this._userRole; }

set userRole( userRole: string ) { this._userRole = userRole; }

get offenderIdDisplay(): string { return this._offenderIdDisplay; }

set offenderIdDisplay( offenderIdDisplay: string ) { this._offenderIdDisplay = offenderIdDisplay; }

get lastName(): string { return this._lastName; }

set lastName( lastName: string ) { this._lastName = lastName; }

get firstName(): string { return this._firstName; }

set firstName( firstName: string ) { this._firstName = firstName; }

get middleName(): string { return this._middleName; }

set middleName( middleName: string ) { this._middleName = middleName; }

get currentCaseLoad(): string { return this._currentCaseLoad; }

set currentCaseLoad( currentCaseLoad: string ) { this._currentCaseLoad = currentCaseLoad; }

get prisonLocation(): string { return this._prisonLocation; }

set prisonLocation( prisonLocation: string ) { this._prisonLocation = prisonLocation; }

get offSupLevel(): string { return this._offSupLevel; }

set offSupLevel( offSupLevel: string ) { this._offSupLevel = offSupLevel; }

get templateType(): string { return this._templateType; }

set templateType( templateType: string ) { this._templateType = templateType; }

get trimUser(): string { return this._trimUser; }

set trimUser( trimUser: string ) { this._trimUser = trimUser; }

get fileUploadLimit(): string { return this._fileUploadLimit; }

set fileUploadLimit( fileUploadLimit: string ) { this._fileUploadLimit = fileUploadLimit; }

get fileUploadSizeLimit(): string { return this._fileUploadSizeLimit; }

set fileUploadSizeLimit( fileUploadSizeLimit: string ) { this._fileUploadSizeLimit = fileUploadSizeLimit; }

get statusDisplay(): string { return this._statusDisplay; }

set statusDisplay( statusDisplay: string ) { this._statusDisplay = statusDisplay; }

get birthDate(): Date { return this._birthDate; }

set birthDate( pbirthDate: Date ) { this._birthDate = pbirthDate; }

get completeFlag(): string { return this._completeFlag; }

set completeFlag(pcompleteFlag: string ) { this._completeFlag = pcompleteFlag; }

get deleteReason(): string { return this._deleteReason; }

set deleteReason( pdeleteReason: string ) { this._deleteReason = pdeleteReason; }

toJSON(): any {
    return {
        
        'keyLogin': this._keyLogin,
        'userId': this._userId,
        'objectType':this._objectType,
        'objectId':this.objectId,
        'offenderBookId':this.offenderBookId,
        'offenderBookingNo':this._offenderBookingNo,
        'moduleName':this._moduleName,
        'offenderId':this._offenderId,
        'description':this._description,
        'osUser':this._osUser,
        'userRole':this._userRole,
        'offenderIdDisplay':this._offenderIdDisplay,
        'lastName':this._lastName,
        'firstName':this._firstName,
        'middleName':this._middleName,
        'currentCaseLoad': this._currentCaseLoad,
        'offSupLevel': this._offSupLevel,
        'prisonLocation': this._prisonLocation,
        'templateType': this._templateType,
        'trimUser': this._trimUser,
        'statusDisplay': this._statusDisplay,
        'birthDate': this._birthDate,
        'completeFlag':this._completeFlag,
        'objectData':this._objectData,
        'deleteReason':this._deleteReason
    };
}

}