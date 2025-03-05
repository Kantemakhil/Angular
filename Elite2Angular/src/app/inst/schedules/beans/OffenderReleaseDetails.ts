import { OffenderAlerts } from '@inst/demographics-biometrics/beans/OffenderAlerts';
import { OffenceIndicators } from '@inst/legal-screens/maintenance/beans/OffenceIndicators';
import {KeyDateValueBean} from '@instschedulebeans/KeyDateValueBean';
export class OffenderReleaseDetails {
    private _dtoApprovedDate: Date;
    private _eventId: number;
    private _createUserId: string;
    private _offenderBookId: number;
    private _modifyDatetime: Date;
    private _movementReasonCode: string;
    private _releaseDate: Date;
    private _modifyUserId: string;
    private _approvedReleaseDate: Date;
    private _commentText: string;
    private _dtoMidTermDate: Date;
    private _createDatetime: Date;
    private _verifiedFlag: string;
    private _serialVersionUID: number;
    private _movementType: string;
    private _eventStatus: string;
    private _autoReleaseDate: Date;
    private _sealFlag: string;
    private _facility: string;
    private _dateType: string;
    private _offenderIdDisplay: string;
    private _fromDate: Date;
    private _toDate: Date;
    private _nbtName: string;
    private _returnValue: number;
    private _offenderId: number;
    private _rootOffenderId: number;
    private _caseLoadId: string;
    private _commentTextTemp: string;
    private _searchResult: number;
    private _verifiedFlagBolean: boolean;

    private _keyDateListObj: Array<KeyDateValueBean>;

    private _alertsList: Array<OffenderAlerts>;

    private _chargeIndData: Array<OffenceIndicators>
    private _alertsData: string;
    private _indicatorsData: string;
    private _dataExistFlag: string;
    private _releaseDateTemp: Date;
    private _verifyPopUpCloseFlag: string;
    private _agyLocIdDesc: string;
    private _facilityList: [];

    get verifiedFlagBolean(): boolean { return this._verifiedFlagBolean; }
    set verifiedFlagBolean(pverifiedFlagBolean: boolean) { this._verifiedFlagBolean = pverifiedFlagBolean; }
    get searchResult(): number { return this._searchResult; }
    set searchResult(psearchResult: number) { this._searchResult = psearchResult; }

    get offenderId(): number { return this._offenderId; }
    set offenderId(poffenderId: number) { this._offenderId = poffenderId; }
    get rootOffenderId(): number { return this._rootOffenderId; }
    set rootOffenderId(prootOffenderId: number) { this._rootOffenderId = prootOffenderId; }

    get returnValue(): number { return this._returnValue; }
    set returnValue(preturnValue: number) { this._returnValue = preturnValue; }

    get fromDate(): Date { return this._fromDate; }
    set fromDate(pfromDate: Date) { this._fromDate = pfromDate; }
    get toDate(): Date { return this._toDate; }
    set toDate(ptoDate: Date) { this._toDate = ptoDate; }

    get dtoApprovedDate(): Date { return this._dtoApprovedDate; }
    set dtoApprovedDate(pdtoApprovedDate: Date) { this._dtoApprovedDate = pdtoApprovedDate; }
    get eventId(): number { return this._eventId; }
    set eventId(peventId: number) { this._eventId = peventId; }
    get createUserId(): string { return this._createUserId; }
    set createUserId(pcreateUserId: string) { this._createUserId = pcreateUserId; }
    get offenderBookId(): number { return this._offenderBookId; }
    set offenderBookId(poffenderBookId: number) { this._offenderBookId = poffenderBookId; }
    get modifyDatetime(): Date { return this._modifyDatetime; }
    set modifyDatetime(pmodifyDatetime: Date) { this._modifyDatetime = pmodifyDatetime; }
    get movementReasonCode(): string { return this._movementReasonCode; }
    set movementReasonCode(pmovementReasonCode: string) { this._movementReasonCode = pmovementReasonCode; }
    get releaseDate(): Date { return this._releaseDate; }
    set releaseDate(preleaseDate: Date) { this._releaseDate = preleaseDate; }
    get modifyUserId(): string { return this._modifyUserId; }
    set modifyUserId(pmodifyUserId: string) { this._modifyUserId = pmodifyUserId; }
    get approvedReleaseDate(): Date { return this._approvedReleaseDate; }
    set approvedReleaseDate(papprovedReleaseDate: Date) { this._approvedReleaseDate = papprovedReleaseDate; }
    get commentText(): string { return this._commentText; }
    set commentText(pcommentText: string) { this._commentText = pcommentText; }
    get dtoMidTermDate(): Date { return this._dtoMidTermDate; }
    set dtoMidTermDate(pdtoMidTermDate: Date) { this._dtoMidTermDate = pdtoMidTermDate; }
    get createDatetime(): Date { return this._createDatetime; }
    set createDatetime(pcreateDatetime: Date) { this._createDatetime = pcreateDatetime; }
    get verifiedFlag(): string { return this._verifiedFlag; }
    set verifiedFlag(pverifiedFlag: string) { this._verifiedFlag = pverifiedFlag; }
    get serialVersionUID(): number { return this._serialVersionUID; }
    set serialVersionUID(pserialVersionUID: number) { this._serialVersionUID = pserialVersionUID; }
    get movementType(): string { return this._movementType; }
    set movementType(pmovementType: string) { this._movementType = pmovementType; }
    get eventStatus(): string { return this._eventStatus; }
    set eventStatus(peventStatus: string) { this._eventStatus = peventStatus; }
    get autoReleaseDate(): Date { return this._autoReleaseDate; }
    set autoReleaseDate(pautoReleaseDate: Date) { this._autoReleaseDate = pautoReleaseDate; }
    get sealFlag(): string { return this._sealFlag; }
    set sealFlag(psealFlag: string) { this._sealFlag = psealFlag; }


    get facility(): string { return this._facility; }
    set facility(pfacility: string) { this._facility = pfacility; }
    get dateType(): string { return this._dateType; }
    set dateType(pdateType: string) { this._dateType = pdateType; }
    get offenderIdDisplay(): string { return this._offenderIdDisplay; }
    set offenderIdDisplay(poffenderIdDisplay: string) { this._offenderIdDisplay = poffenderIdDisplay; }

    get nbtName(): string { return this._nbtName; }
    set nbtName(pnbtName: string) { this._nbtName = pnbtName; }
    get caseLoadId(): string { return this._caseLoadId; }
    set caseLoadId(pcaseLoadId: string) { this._caseLoadId = pcaseLoadId; }
    get commentTextTemp(): string { return this._commentTextTemp; }
    set commentTextTemp(pcommentTextTemp: string) { this._commentTextTemp = pcommentTextTemp; }

    get keyDateListObj(): Array<KeyDateValueBean> { return this._keyDateListObj; }

    set keyDateListObj(pkeyDateListObj: Array<KeyDateValueBean>) { this._keyDateListObj = pkeyDateListObj; }

    get alertsList(): Array<OffenderAlerts> { return this._alertsList; }

    set alertsList(palertsList: Array<OffenderAlerts>) { this._alertsList = palertsList; }

    get alertsData(): string { return this._alertsData; }
    set alertsData(palertsData: string) { this._alertsData = palertsData; }
    get indicatorsData(): string { return this._indicatorsData; }
    set indicatorsData(pindicatorsData: string) { this._indicatorsData = pindicatorsData; }


    get chargeIndData(): Array<OffenceIndicators> { return this._chargeIndData; }

    set chargeIndData(pchargeIndData: Array<OffenceIndicators>) { this._chargeIndData = pchargeIndData; }

    get dataExistFlag(): string { return this._dataExistFlag; }
    set dataExistFlag(pdataExistFlag: string) { this._dataExistFlag = pdataExistFlag; }

    get releaseDateTemp(): Date { return this._releaseDateTemp; }
    set releaseDateTemp(preleaseDateTemp: Date) { this._releaseDateTemp = preleaseDateTemp; }

    get verifyPopUpCloseFlag(): string {return this._verifyPopUpCloseFlag; }
    set verifyPopUpCloseFlag(value: string) {this._verifyPopUpCloseFlag = value; }

    get agyLocIdDesc(): string { return this._agyLocIdDesc;  }
    set agyLocIdDesc(value: string) { this._agyLocIdDesc = value; }

    get facilityList(): [] { return this._facilityList; }
    set facilityList(value: []) { this._facilityList = value; }

    toJSON(): any {
        return {
            'dtoApprovedDate': this._dtoApprovedDate,
            'eventId': this._eventId,
            'createUserId': this._createUserId,
            'offenderBookId': this._offenderBookId,
            'modifyDatetime': this._modifyDatetime,
            'movementReasonCode': this._movementReasonCode,
            'releaseDate': this._releaseDate,
            'modifyUserId': this._modifyUserId,
            'approvedReleaseDate': this._approvedReleaseDate,
            'commentText': this._commentText,
            'dtoMidTermDate': this._dtoMidTermDate,
            'createDatetime': this._createDatetime,
            'verifiedFlag': this._verifiedFlag,
            'serialVersionUID': this._serialVersionUID,
            'movementType': this._movementType,
            'eventStatus': this._eventStatus,
            'autoReleaseDate': this._autoReleaseDate,
            'sealFlag': this._sealFlag,
            'offenderIdDisplay': this._offenderIdDisplay,
            'dateType': this._dateType,
            'facility': this._facility,
            'fromDate': this._fromDate,
            'toDate': this._toDate,
            'nbtName': this._nbtName,
            'returnValue': this._returnValue,
            'offenderId': this._offenderId,
            'rootOffenderId': this._rootOffenderId,
            'caseLoadId': this._caseLoadId,
            'commentTextTemp': this._commentTextTemp,
            'searchResult': this._searchResult,
            'verifiedFlagBolean': this._verifiedFlagBolean,
            'keyDateListObj': this._keyDateListObj,
            'alertsList': this._alertsList,
            'alertsData': this._alertsData,
            'indicatorsData': this._indicatorsData,
            'chargeIndData': this._chargeIndData,
            'dataExistFlag': this._dataExistFlag,
            'releaseDateTemp': this._releaseDateTemp,
            'verifyPopUpCloseFlag': this._verifyPopUpCloseFlag,
            'agyLocIdDesc' : this._agyLocIdDesc,
            'facilityList': this._facilityList
        };
    }
}