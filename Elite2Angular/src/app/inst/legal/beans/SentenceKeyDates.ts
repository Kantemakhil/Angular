import { BaseModel } from '@commonbeans/BaseModel'
export class SentenceKeyDates extends BaseModel {
    private _date: Date;
    private _time: string;
    private _calculationReason: string;
    private _staffName: string;
    private _comment: string;
    private _offenderBookId: number;
    private _userId: string;
    private _staffId: number;
    private _HDCED_Calculated_Date: Date;
    private _HDCED_Overrided_Date: Date;
    private _HDCAD_Calculated_Date: Date;
    private _HDCAD_Overrided_Date: Date;
    private _ETD_Calculated_Date: Date;
    private _ETD_Overrided_Date: Date;
    private _MTD_Calculated_Date: Date;
    private _MTD_Overrided_Date: Date;
    private _LTD_Calculated_Date: Date;
    private _LTD_Overrided_Date: Date;
    private _ARD_Calculated_Date: Date;
    private _ARD_Overrided_Date: Date;
    private _CRD_Calculated_Date: Date;
    private _CRD_Overrided_Date: Date;
    private _PED_Calculated_Date: Date;
    private _PED_Overrided_Date: Date;
    private _APD_Calculated_Date: Date;
    private _APD_Overrided_Date: Date;
    private _NPD_Calculated_Date: Date;
    private _NPD_Overrided_Date: Date;
    private _LED_Calculated_Date: Date;
    private _LED_Overrided_Date: Date;
    private _SED_Calculated_Date: Date;
    private _SED_Overrided_Date: Date;
    private _PRRD_Calculated_Date: Date;
    private _PRRD_Overrided_Date: Date;
    private _TARIFF_Calculated_Date: Date;
    private _TARIFF_Overrided_Date: Date;

    get date(): Date { return this._date; }

    set date( date: Date ) { this._date = date; }

    get time(): string { return this._time; }

    set time( time: string ) { this._time = time; }

    get calculationReason(): string { return this._calculationReason; }

    set calculationReason( calculationReason: string ) { this._calculationReason = calculationReason; }

    get staffName(): string { return this._staffName; }

    set staffName( staffName: string ) { this._staffName = staffName; }

    get comment(): string { return this._comment; }

    set comment( comment: string ) { this._comment = comment; }

    get offenderBookId(): number { return this._offenderBookId; }

    set offenderBookId( offenderBookId: number ) { this._offenderBookId = offenderBookId; }

    get userId(): string { return this._userId; }

    set userId( userId: string ) { this._userId = userId; }

    get staffId(): number { return this._staffId; }

    set staffId( staffId: number ) { this._staffId = staffId; }

    get HDCED_Calculated_Date(): Date { return this._HDCED_Calculated_Date; }

    set HDCED_Calculated_Date(HDCED_Calculated_Date: Date ) { this._HDCED_Calculated_Date = HDCED_Calculated_Date; }
    
    get HDCED_Overrided_Date(): Date { return this._HDCED_Overrided_Date; }

    set HDCED_Overrided_Date(HDCED_Overrided_Date: Date ) { this._HDCED_Overrided_Date = HDCED_Overrided_Date; }
   
    get HDCAD_Calculated_Date(): Date { return this._HDCAD_Calculated_Date; }

    set HDCAD_Calculated_Date(HDCAD_Calculated_Date: Date ) { this._HDCAD_Calculated_Date = HDCAD_Calculated_Date; }
    
    get HDCAD_Overrided_Date(): Date { return this._HDCAD_Overrided_Date; }

    set HDCAD_Overrided_Date(HDCAD_Overrided_Date: Date ) { this. _HDCAD_Overrided_Date = HDCAD_Overrided_Date; }
    
    get ETD_Calculated_Date(): Date { return this._ETD_Calculated_Date; }

    set ETD_Calculated_Date(ETD_Calculated_Date: Date ) { this._ETD_Calculated_Date = ETD_Calculated_Date; }
    
    get ETD_Overrided_Date(): Date { return this._ETD_Overrided_Date; }

    set ETD_Overrided_Date(ETD_Overrided_Date: Date ) { this._ETD_Overrided_Date = ETD_Overrided_Date; }
    
    get MTD_Calculated_Date(): Date { return this._MTD_Calculated_Date; }

    set MTD_Calculated_Date(MTD_Calculated_Date: Date ) { this._MTD_Calculated_Date = MTD_Calculated_Date; }
    
    get MTD_Overrided_Date(): Date { return this._MTD_Overrided_Date; }

    set MTD_Overrided_Date(MTD_Overrided_Date: Date ) { this._MTD_Overrided_Date = MTD_Overrided_Date; }
    
    get LTD_Calculated_Date(): Date { return this._LTD_Calculated_Date; }

    set LTD_Calculated_Date(LTD_Calculated_Date: Date ) { this._LTD_Calculated_Date = LTD_Calculated_Date; }
    
    get LTD_Overrided_Date(): Date { return this._LTD_Overrided_Date; }

    set LTD_Overrided_Date(LTD_Overrided_Date: Date ) { this._LTD_Overrided_Date = LTD_Overrided_Date; }
    
    get ARD_Calculated_Date(): Date { return this._ARD_Calculated_Date; }

    set ARD_Calculated_Date(ARD_Calculated_Date: Date ) { this._ARD_Calculated_Date =  ARD_Calculated_Date; }
   
    get ARD_Overrided_Date(): Date { return this._ARD_Overrided_Date; }

    set ARD_Overrided_Date(ARD_Overrided_Date: Date ) { this._ARD_Overrided_Date =  ARD_Overrided_Date; }
    
    get CRD_Calculated_Date(): Date { return this._CRD_Calculated_Date; }

    set CRD_Calculated_Date(CRD_Calculated_Date: Date ) { this._CRD_Calculated_Date =  CRD_Calculated_Date; }
    
    get CRD_Overrided_Date(): Date { return this._CRD_Overrided_Date; }

    set CRD_Overrided_Date( CRD_Overrided_Date: Date ) { this._CRD_Overrided_Date =   CRD_Overrided_Date; }
   
    get PED_Calculated_Date(): Date { return this._PED_Calculated_Date; }

    set PED_Calculated_Date(PED_Calculated_Date: Date ) { this._PED_Calculated_Date =   PED_Calculated_Date; }
    
    get PED_Overrided_Date(): Date { return this._PED_Overrided_Date; }

    set PED_Overrided_Date(PED_Overrided_Date: Date ) { this._PED_Overrided_Date =   PED_Overrided_Date; }
    
    get APD_Calculated_Date(): Date { return this._APD_Calculated_Date; }

    set APD_Calculated_Date(APD_Calculated_Date: Date ) { this._APD_Calculated_Date =   APD_Calculated_Date; }
    
    get APD_Overrided_Date(): Date { return this._APD_Overrided_Date; }

    set APD_Overrided_Date(APD_Overrided_Date: Date ) { this._APD_Overrided_Date =   APD_Overrided_Date; }
    
    get NPD_Calculated_Date(): Date { return this._NPD_Calculated_Date; }

    set NPD_Calculated_Date(NPD_Calculated_Date: Date ) { this._NPD_Calculated_Date =   NPD_Calculated_Date; }
    
    get NPD_Overrided_Date(): Date { return this._NPD_Overrided_Date; }

    set NPD_Overrided_Date(NPD_Overrided_Date: Date ) { this._NPD_Overrided_Date =   NPD_Overrided_Date; }
    
    get LED_Calculated_Date(): Date { return this._LED_Calculated_Date; }

    set LED_Calculated_Date(LED_Calculated_Date: Date ) { this._LED_Calculated_Date =   LED_Calculated_Date; }
    
    get LED_Overrided_Date(): Date { return this._LED_Overrided_Date; }

    set LED_Overrided_Date(LED_Overrided_Date: Date ) { this._LED_Overrided_Date =   LED_Overrided_Date; }
    
    get SED_Calculated_Date(): Date { return this._SED_Calculated_Date; }

    set SED_Calculated_Date(SED_Calculated_Date: Date ) { this._SED_Calculated_Date =   SED_Calculated_Date; }
    
    get SED_Overrided_Date(): Date { return this._SED_Overrided_Date; }

    set SED_Overrided_Date(SED_Overrided_Date: Date ) { this._SED_Overrided_Date =   SED_Overrided_Date; }
    
    get PRRD_Calculated_Date(): Date { return this._PRRD_Calculated_Date; }

    set PRRD_Calculated_Date(PRRD_Calculated_Date: Date ) { this._PRRD_Calculated_Date =   PRRD_Calculated_Date; }
    
    get PRRD_Overrided_Date(): Date { return this._PRRD_Overrided_Date; }

    set PRRD_Overrided_Date(PRRD_Overrided_Date: Date ) { this._PRRD_Overrided_Date =   PRRD_Overrided_Date; }
    
    get TARIFF_Calculated_Date(): Date { return this._TARIFF_Calculated_Date; }

    set TARIFF_Calculated_Date(TARIFF_Calculated_Date: Date ) { this._TARIFF_Calculated_Date =   TARIFF_Calculated_Date; }
    
    get TARIFF_Overrided_Date(): Date { return this._TARIFF_Overrided_Date; }

    set TARIFF_Overrided_Date(TARIFF_Overrided_Date: Date ) { this._TARIFF_Overrided_Date =   TARIFF_Overrided_Date; }
    
    toJSON(): any {
        return {
            'offenderBookId': this._offenderBookId,
            'date': this._date,
            'time': this._time,
            'calculationReason': this._calculationReason,
            'staffName': this._staffName,
            'comment': this._comment,
            'userId': this._userId,
            'staffId': this._staffId,
            'HDCED_Calculated_Date':this._HDCED_Calculated_Date,
            'HDCED_Overrided_Date':this._HDCED_Overrided_Date,
            'HDCAD_Calculated_Date':this._HDCAD_Calculated_Date,
            'HDCAD_Overrided_Date':this._HDCAD_Overrided_Date,
            'ETD_Calculated_Date':this._ETD_Calculated_Date,
            'ETD_Overrided_Date':this._ETD_Overrided_Date,
            'MTD_Calculated_Date':this._MTD_Calculated_Date,
            'MTD_Overrided_Date':this._MTD_Overrided_Date,
            'LTD_Calculated_Date':this._LTD_Calculated_Date,
            'LTD_Overrided_Date':this._LTD_Overrided_Date,
            'ARD_Calculated_Date':this._ARD_Calculated_Date,
            'ARD_Overrided_Date':this._ARD_Overrided_Date,
            'CRD_Calculated_Date':this._CRD_Calculated_Date,
            'CRD_Overrided_Date':this._CRD_Overrided_Date,
            'PED_Calculated_Date':this._PED_Calculated_Date,
            'PED_Overrided_Date':this._PED_Overrided_Date,
            'APD_Calculated_Date':this._APD_Calculated_Date,
            'APD_Overrided_Date':this._APD_Overrided_Date,
            'NPD_Calculated_Date':this._NPD_Calculated_Date,
            'NPD_Overrided_Date':this._NPD_Overrided_Date,
            'LED_Calculated_Date':this._LED_Calculated_Date,
            'LED_Overrided_Date':this._LED_Overrided_Date,
            'SED_Calculated_Date':this._SED_Calculated_Date,
            'SED_Overrided_Date':this._SED_Overrided_Date,
            'PRRD_Calculated_Date':this._PRRD_Calculated_Date,
            'PRRD_Overrided_Date':this._PRRD_Overrided_Date,
            'TARIFF_Calculated_Date':this._TARIFF_Calculated_Date,
            'TARIFF_Overrided_Date':this._TARIFF_Overrided_Date
            
        }
    }
}



