import {BaseModel} from '@commonbeans/BaseModel';
export class ReserveBedLocations extends BaseModel {
     private _agyLocId: string;
     private _commentText: string;
     private _createDateTime: Date;
     private _createUserId: string;
     private _livingUnitId: number;
     private _modifyDateTime: Date;
     private _modifyUserId: string;
     private _offenderId: number;
     private _removeReason: string;
     private _reserveBedId: number;
     private _reserveUntilDate: Date;
     private _sealFlag: string;
     private _livingUnitDesc: string;
     private _lastName: string;
     private _firstName: string;
     private _offenderIdDisplay: string;
     private _button: string;
     private _asnButton: string;
     private _warningFlag: boolean;
     private _warningMsg: string;
     private _warningPrompt: string;
     private _livingUnitCode: string;
     private _offenderBookId: number;
     private _cbFlag: boolean;
     private _ocFlag: boolean;
     private _button1: string;

     get button1(): string { return  this._button1; }

     set button1(pbutton1: string) { this._button1 = pbutton1; }
        get ocFlag(): boolean { return  this._ocFlag; }

        set ocFlag(pocFlag: boolean) { this._ocFlag = pocFlag; }

        get cbFlag(): boolean { return  this._cbFlag; }

        set cbFlag(pcbFlag: boolean) { this._cbFlag = pcbFlag; }

        get offenderBookId(): number { return  this._offenderBookId; }

        set offenderBookId(poffenderBookId: number) { this._offenderBookId = poffenderBookId; }

        get livingUnitCode(): string { return  this._livingUnitCode; }

        set livingUnitCode(plivingUnitCode: string) { this._livingUnitCode = plivingUnitCode; }

        get warningMsg(): string { return  this._warningMsg; }

        set warningMsg(pwarningMsg: string) { this._warningMsg = pwarningMsg; }

        get warningPrompt(): string { return  this._warningPrompt; }

        set warningPrompt(pwarningPrompt: string) { this._warningPrompt = pwarningPrompt; }

        get warningFlag(): boolean { return  this._warningFlag; }

        set warningFlag(pwarningFlag: boolean) { this._warningFlag = pwarningFlag; }

        get button(): string { return  this._button; }

        set button(pbutton: string) { this._button = pbutton; }

        get asnButton(): string { return  this._asnButton; }

        set asnButton(pasnButton: string) { this._asnButton = pasnButton; }

        get livingUnitDesc(): string { return  this._livingUnitDesc; }

        set livingUnitDesc(plivingUnitDesc: string) { this._livingUnitDesc = plivingUnitDesc; }

        get lastName(): string { return  this._lastName; }

        set lastName(plastName: string) { this._lastName = plastName; }

        get firstName(): string { return  this._firstName; }

        set firstName(pfirstName: string) { this._firstName = pfirstName; }

        get offenderIdDisplay(): string { return  this._offenderIdDisplay; }

        set offenderIdDisplay(poffenderIdDisplay: string) { this._offenderIdDisplay = poffenderIdDisplay; }

     get agyLocId(): string { return  this._agyLocId; }

     set agyLocId(pagyLocId: string) { this._agyLocId = pagyLocId; }

     get commentText(): string { return  this._commentText; }

     set commentText(pcommentText: string) { this._commentText = pcommentText; }

     get createDateTime(): Date { return  this._createDateTime; }

     set createDateTime(pcreateDateTime: Date) { this._createDateTime = pcreateDateTime; }

     get createUserId(): string { return  this._createUserId; }

     set createUserId(pcreateUserId: string) { this._createUserId = pcreateUserId; }

     get livingUnitId(): number { return  this._livingUnitId; }

     set livingUnitId(plivingUnitId: number) { this._livingUnitId = plivingUnitId; }

     get modifyDateTime(): Date { return  this._modifyDateTime; }

     set modifyDateTime(pmodifyDateTime: Date) { this._modifyDateTime = pmodifyDateTime; }

     get modifyUserId(): string { return  this._modifyUserId; }

     set modifyUserId(pmodifyUserId: string) { this._modifyUserId = pmodifyUserId; }

     get offenderId(): number { return  this._offenderId; }

     set offenderId(poffenderId: number) { this._offenderId = poffenderId; }

     get removeReason(): string { return  this._removeReason; }

     set removeReason(premoveReason: string) { this._removeReason = premoveReason; }

     get reserveBedId(): number { return  this._reserveBedId; }

     set reserveBedId(preserveBedId: number) { this._reserveBedId = preserveBedId; }

     get reserveUntilDate(): Date { return  this._reserveUntilDate; }

     set reserveUntilDate(preserveUntilDate: Date) { this._reserveUntilDate = preserveUntilDate; }

     get sealFlag(): string { return this._sealFlag; }

    set sealFlag( psealFlag: string ) { this._sealFlag = psealFlag; }


    toJSON(): any {
       return  {
            'agyLocId': this._agyLocId,
            'commentText': this._commentText,
            'createDateTime': this._createDateTime,
            'createUserId': this._createUserId,
            'livingUnitId': this._livingUnitId,
            'modifyDateTime': this._modifyDateTime,
            'modifyUserId': this._modifyUserId,
            'offenderId': this._offenderId,
            'removeReason': this._removeReason,
            'reserveBedId': this._reserveBedId,
            'reserveUntilDate': this._reserveUntilDate,
            'sealFlag': this._sealFlag,
            'offenderIdDisplay': this._offenderIdDisplay,
            'lastName': this._lastName,
            'firstName': this._firstName,
            'livingUnitDesc': this._livingUnitDesc,
            'button': this._button,
            'asnButton': this._asnButton,
            'warningFlag': this._warningFlag,
            'warningMsg': this._warningMsg,
            'warningPrompt': this._warningPrompt,
            'livingUnitCode': this._livingUnitCode,
            'offenderBookId': this._offenderBookId,
            'cbFlag': this._cbFlag,
            'ocFlag': this._ocFlag,
            'button1': this._button1
            };
         }
 }
