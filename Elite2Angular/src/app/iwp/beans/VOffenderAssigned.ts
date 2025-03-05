
export class VOffenderAssigned {
    private _offenderBookId: number;
    private _agyLocId: string;
    private _sacStaffId: number;
    private _offenderLastName: string;
    private _offenderFirstName: string;
    private _offenderIdDisplay: string;
    private _staffLastName: string;
    private _staffFirstName: string;
    private _transferFlag: string;
    private _agyLocIdFrom: string;
    private _agyIocIdTo: string;
    private _assStaffId: string;
    private _transferDate: Date;
    private _caseloadId: string;
    private _userId: string;

    get caseloadId(): string { return this._caseloadId; }
    set caseloadId(pcaseloadId: string) { this._caseloadId = pcaseloadId; }

    get userId(): string { return this._userId; }
    set userId(puserId: string) { this._userId = puserId; }
    
    get transferDate(): Date { return this._transferDate; }
    set transferDate(ptransferDate: Date) { this._transferDate = ptransferDate; }

    get agyLocIdFrom(): string { return this._agyLocIdFrom; }
    set agyLocIdFrom(pagyLocIdFrom: string) { this._agyLocIdFrom = pagyLocIdFrom; }

    get agyIocIdTo(): string { return this._agyIocIdTo; }
    set agyIocIdTo(pagyIocIdTo: string) { this._agyIocIdTo = pagyIocIdTo; }


    get assStaffId(): string { return this._assStaffId; }
    set assStaffId(passStaffId: string) { this._assStaffId = passStaffId; }

    get transferFlag(): string { return this._transferFlag; }
    set transferFlag(ptransferFlag: string) { this._transferFlag = ptransferFlag; }

    get offenderBookId(): number { return this._offenderBookId; }
    set offenderBookId(poffenderBookId: number) { this._offenderBookId = poffenderBookId; }

    get agyLocId(): string { return this._agyLocId; }
    set agyLocId(pagyLocId: string) { this._agyLocId = pagyLocId; }

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


    toJSON(): any {
        return {
            'offenderBookId': this._offenderBookId,
            'agyLocId': this._agyLocId,
            'sacStaffId': this._sacStaffId,
            'offenderLastName': this._offenderLastName,
            'offenderFirstName': this._offenderFirstName,
            'offenderIdDisplay': this._offenderIdDisplay,
            'staffLastName': this._staffLastName,
            'staffFirstName': this._staffFirstName,
            'transferFlag': this._transferFlag,
            'agyLocIdFrom': this._agyLocIdFrom,
            'agyIocIdTo': this._agyIocIdTo,
            'assStaffId': this._assStaffId,
            'transferDate': this._transferDate,
            'caseloadId': this._caseloadId,
            'userId': this._userId
        };
    }

}



