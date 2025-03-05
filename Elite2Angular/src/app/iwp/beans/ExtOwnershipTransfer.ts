import { BaseModel } from '@commonbeans/BaseModel';


export class ExtOwnershipTransfer extends BaseModel {
    private _transferFlag: string;
    private _createUserId: string;
    private _offenderBookId: number;
    private _modifyDatetime: Date;
    private _agyLocIdFrom: string;
    private _modifyUserId: string;
    private _ptrId: number;
    private _transferDate: Date;
    private _assStaffId: number;
    private _createDatetime: Date;
    private _agyIocIdTo: string;
    private _serialVersionUID: number;
    private _extTransferId: number;
    private _sealFlag: string;
    private _sacStaffId: number;
    private _offenderLastName: string;
    private _offenderFirstName: string;
    private _offenderIdDisplay: string;
    private _staffLastName: string;
    private _staffFirstName: string;

    private _dspLastName: string;
    private _dspFirstName: string;
    private _dspLastNameTwo: string;
    private _dspFirstNameTwo: string;
    private _pOffIdDisp: string;
    private _chkSelect: string;
    private _rootOffenderId: number;
    private _offenderId: number;
    private _nbtStaffId: string;
    private _role: string;
    private _position: string;
    private _staffId: number;
    private _caseLoadId: string;
    private _agyLocIdTo: string;
    private _pOffenderBookId: number;
    private _workedStaffMembers: Array<number>;

    get transferFlag(): string { return this._transferFlag; }
    set transferFlag(ptransferFlag: string) { this._transferFlag = ptransferFlag; }
    
    get createUserId(): string { return this._createUserId; }
    set createUserId(pcreateUserId: string) { this._createUserId = pcreateUserId; }

    get offenderBookId(): number { return this._offenderBookId; }
    set offenderBookId(poffenderBookId: number) { this._offenderBookId = poffenderBookId; }

    get modifyDatetime(): Date { return this._modifyDatetime; }
    set modifyDatetime(pmodifyDatetime: Date) { this._modifyDatetime = pmodifyDatetime; }

    get agyLocIdFrom(): string { return this._agyLocIdFrom; }
    set agyLocIdFrom(pagyLocIdFrom: string) { this._agyLocIdFrom = pagyLocIdFrom; }

    get modifyUserId(): string { return this._modifyUserId; }
    set modifyUserId(pmodifyUserId: string) { this._modifyUserId = pmodifyUserId; }

    get ptrId(): number { return this._ptrId; }
    set ptrId(pptrId: number) { this._ptrId = pptrId; }

    get transferDate(): Date { return this._transferDate; }
    set transferDate(ptransferDate: Date) { this._transferDate = ptransferDate; }

    get assStaffId(): number { return this._assStaffId; }
    set assStaffId(passStaffId: number) { this._assStaffId = passStaffId; }

    get createDatetime(): Date { return this._createDatetime; }
    set createDatetime(pcreateDatetime: Date) { this._createDatetime = pcreateDatetime; }

    get agyIocIdTo(): string { return this._agyIocIdTo; }
    set agyIocIdTo(pagyIocIdTo: string) { this._agyIocIdTo = pagyIocIdTo; }

    get serialVersionUID(): number { return this._serialVersionUID; }
    set serialVersionUID(pserialVersionUID: number) { this._serialVersionUID = pserialVersionUID; }

    get extTransferId(): number { return this._extTransferId; }
    set extTransferId(pextTransferId: number) { this._extTransferId = pextTransferId; }
    
    get sealFlag(): string { return this._sealFlag; }
    set sealFlag(psealFlag: string) { this._sealFlag = psealFlag; }

    get sacStaffId(): number { return this._sacStaffId; }
    set sacStaffId(psacStaffId: number) { this._sacStaffId = psacStaffId; }

    get offenderLastName(): string { return this._offenderLastName; }
    set offenderLastName(poffenderLastName: string) { this._offenderLastName = poffenderLastName; }

    get offenderFirstName(): string { return this._offenderFirstName; }
    set offenderFirstName(poffenderFirstName: string) { this._offenderFirstName = poffenderFirstName; }

    get offenderIdDisplay(): string { return this._offenderIdDisplay; }
    set offenderIdDisplay(poffenderIdDisplay: string) { this._offenderIdDisplay = poffenderIdDisplay; }

    get staffLastName(): string { return this._staffLastName; }
    set staffLastName(pstaffLastName: string) { this._staffLastName = pstaffLastName; }

    get staffFirstName(): string { return this._staffFirstName; }
    set staffFirstName(pstaffFirstName: string) { this._staffFirstName = pstaffFirstName; }

    get dspLastName(): string { return this._dspLastName; }
    set dspLastName(pdspLastName: string) { this._dspLastName = pdspLastName; }
    get dspFirstName(): string { return this._dspFirstName; }
    set dspFirstName(pdspFirstName: string) { this._dspFirstName = pdspFirstName; }

    get dspFirstNameTwo(): string { return this._dspFirstNameTwo; }
    set dspFirstNameTwo(pdspFirstNameTwo: string) { this._dspFirstNameTwo = pdspFirstNameTwo; }

    get pOffIdDisp(): string { return this._pOffIdDisp; }
    set pOffIdDisp(ppOffIdDisp: string) { this._pOffIdDisp = ppOffIdDisp; }

    get dspLastNameTwo(): string { return this._dspLastNameTwo; }
    set dspLastNameTwo(pdspLastNameTwo: string) { this._dspLastNameTwo = pdspLastNameTwo; }
    get rootOffenderId(): number { return this._rootOffenderId; }
    set rootOffenderId(prootOffenderId: number) { this._rootOffenderId = prootOffenderId; }

    get offenderId(): number { return this._offenderId; }
    set offenderId(poffenderId: number) { this._offenderId = poffenderId; }

    get nbtStaffId(): string { return this._nbtStaffId; }
    set nbtStaffId(pnbtStaffId: string) { this._nbtStaffId = pnbtStaffId; }

    get chkSelect(): string { return this._chkSelect; }
    set chkSelect(pchkSelect: string) { this._chkSelect = pchkSelect; }


     get role(): string { return this._role; }
     set role(value: string) { this._role = value; }

     get position(): string { return this._position; }
     set position(value: string) {
        this._position = value;
    }
     get staffId(): number { return this._staffId; }
     set staffId(value: number) {
        this._staffId = value;
    }
     get caseLoadId(): string { return this._caseLoadId; }
     set caseLoadId(value: string) { this._caseLoadId = value; }
     get agyLocIdTo(): string { return this._agyLocIdTo; }
    set agyLocIdTo(pagyLocIdTo: string) { this._agyLocIdTo = pagyLocIdTo; }

    get pOffenderBookId(): number { return this._pOffenderBookId; }
    set pOffenderBookId(ppOffenderBookId: number) { this._pOffenderBookId = ppOffenderBookId; }

    get workedStaffMembers(): Array<number> { return this._workedStaffMembers; }
    set workedStaffMembers(value: Array<number>) { this._workedStaffMembers = value; }

    toJSON(): any {
        return {
            'transferFlag': this._transferFlag,
            'createUserId': this._createUserId,
            'offenderBookId': this._offenderBookId,
            'modifyDatetime': this._modifyDatetime,
            'agyLocIdFrom': this._agyLocIdFrom,
            'modifyUserId': this._modifyUserId,
            'ptrId': this._ptrId,
            'transferDate': this._transferDate,
            'assStaffId': this._assStaffId,
            'createDatetime': this._createDatetime,
            'agyIocIdTo': this._agyIocIdTo,
            'serialVersionUID': this._serialVersionUID,
            'extTransferId': this._extTransferId,
            'sealFlag': this._sealFlag,
            'sacStaffId': this._sacStaffId,
            'offenderLastName': this._offenderLastName,
            'offenderFirstName': this._offenderFirstName,
            'offenderIdDisplay': this._offenderIdDisplay,
            'staffLastName': this._staffLastName,
            'staffFirstName': this._staffFirstName,

            'dspFirstName' : this._dspFirstName,
            'dspLastName' : this._dspLastName,
            'dspLastNameTwo' : this._dspLastNameTwo,
            'dspFirstNameTwo' : this._dspFirstNameTwo,
            'pOffIdDisp' : this._pOffIdDisp,
            'chkSelect': this._chkSelect,
            'rootOffenderId' : this._rootOffenderId,
            'offenderId': this._offenderId,
            'nbtStaffId': this._nbtStaffId,
            'position': this._position,
            'role': this._role,
            'staffId': this._staffId,
            'caseLoadId':this._caseLoadId,
            'agyLocIdTo': this._agyLocIdTo,
            'pOffenderBookId': this._pOffenderBookId,
            'workedStaffMembers': this._workedStaffMembers
        };
    }
}
