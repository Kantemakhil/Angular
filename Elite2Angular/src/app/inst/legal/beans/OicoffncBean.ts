import { BaseModel } from '@commonbeans/BaseModel';

export class OicoffncBean extends BaseModel {


    private _offenderBookId: number;
    private _caseId: number;
    private _vclFlag: string;
    private _offenderChargeId: number;
    private _offenceDescription: string;
    private _complicityTypeDesc: string;
    private _applyFlag: string;
    private _offenceCode: number;
    private _statuteCode: string;
    private _chargeInfoNumber: string;
    private _offenceDate: Date;
    private _dispositionCode: string;
    private _convictionFlag: string;
    private _offenceType: string;
    private _orderId: number;
    private _sentenceSeq: number;
    private _chkModal: boolean;

    /**
     * Getter offenderBookId
     * @return {number}
     */
    public get offenderBookId(): number {
        return this._offenderBookId;
    }

    /**
     * Getter caseId
     * @return {number}
     */
    public get caseId(): number {
        return this._caseId;
    }

    /**
     * Getter vclFlag
     * @return {string}
     */
    public get vclFlag(): string {
        return this._vclFlag;
    }

    /**
     * Getter offenderChargeId
     * @return {number}
     */
    public get offenderChargeId(): number {
        return this._offenderChargeId;
    }

    /**
     * Getter offenceDescription
     * @return {string}
     */
    public get offenceDescription(): string {
        return this._offenceDescription;
    }

    /**
     * Getter complicityTypeDesc
     * @return {string}
     */
    public get complicityTypeDesc(): string {
        return this._complicityTypeDesc;
    }

    /**
     * Getter applyFlag
     * @return {string}
     */
    public get applyFlag(): string {
        return this._applyFlag;
    }

    /**
     * Getter offenceCode
     * @return {number}
     */
    public get offenceCode(): number {
        return this._offenceCode;
    }

    /**
     * Getter statuteCode
     * @return {string}
     */
    public get statuteCode(): string {
        return this._statuteCode;
    }

    /**
     * Getter chargeInfoNumber
     * @return {string}
     */
    public get chargeInfoNumber(): string {
        return this._chargeInfoNumber;
    }

    /**
     * Getter offenceDate
     * @return {Date}
     */
    public get offenceDate(): Date {
        return this._offenceDate;
    }

    /**
     * Getter dispositionCode
     * @return {string}
     */
    public get dispositionCode(): string {
        return this._dispositionCode;
    }

    /**
     * Getter convictionFlag
     * @return {string}
     */
    public get convictionFlag(): string {
        return this._convictionFlag;
    }

    /**
     * Getter offenceType
     * @return {string}
     */
    public get offenceType(): string {
        return this._offenceType;
    }

    /**
     * Getter orderId
     * @return {number}
     */
    public get orderId(): number {
        return this._orderId;
    }

    /**
     * Getter sentenceSeq
     * @return {number}
     */
    public get sentenceSeq(): number {
        return this._sentenceSeq;
    }

    /**
     * Setter offenderBookId
     * @param {number} value
     */
    public set offenderBookId(value: number) {
        this._offenderBookId = value;
    }

    /**
     * Setter caseId
     * @param {number} value
     */
    public set caseId(value: number) {
        this._caseId = value;
    }

    /**
     * Setter vclFlag
     * @param {string} value
     */
    public set vclFlag(value: string) {
        this._vclFlag = value;
    }

    /**
     * Setter offenderChargeId
     * @param {number} value
     */
    public set offenderChargeId(value: number) {
        this._offenderChargeId = value;
    }

    /**
     * Setter offenceDescription
     * @param {string} value
     */
    public set offenceDescription(value: string) {
        this._offenceDescription = value;
    }

    /**
     * Setter complicityTypeDesc
     * @param {string} value
     */
    public set complicityTypeDesc(value: string) {
        this._complicityTypeDesc = value;
    }

    /**
     * Setter applyFlag
     * @param {string} value
     */
    public set applyFlag(value: string) {
        this._applyFlag = value;
    }

    /**
     * Setter offenceCode
     * @param {number} value
     */
    public set offenceCode(value: number) {
        this._offenceCode = value;
    }

    /**
     * Setter statuteCode
     * @param {string} value
     */
    public set statuteCode(value: string) {
        this._statuteCode = value;
    }

    /**
     * Setter chargeInfoNumber
     * @param {string} value
     */
    public set chargeInfoNumber(value: string) {
        this._chargeInfoNumber = value;
    }

    /**
     * Setter offenceDate
     * @param {Date} value
     */
    public set offenceDate(value: Date) {
        this._offenceDate = value;
    }

    /**
     * Setter dispositionCode
     * @param {string} value
     */
    public set dispositionCode(value: string) {
        this._dispositionCode = value;
    }

    /**
     * Setter convictionFlag
     * @param {string} value
     */
    public set convictionFlag(value: string) {
        this._convictionFlag = value;
    }

    /**
     * Setter offenceType
     * @param {string} value
     */
    public set offenceType(value: string) {
        this._offenceType = value;
    }

    /**
     * Setter orderId
     * @param {number} value
     */
    public set orderId(value: number) {
        this._orderId = value;
    }

    /**
     * Setter sentenceSeq
     * @param {number} value
     */
    public set sentenceSeq(value: number) {
        this._sentenceSeq = value;
    }

    /**
     * Getter chkModal
     * @return {boolean}
     */
    public get chkModal(): boolean {
        return this._chkModal;
    }

    /**
     * Setter chkModal
     * @param {boolean} value
     */
    public set chkModal(value: boolean) {
        this._chkModal = value;
    }


    toJSON(): any {
        return {

            'offenderBookId': this._offenderBookId,
            'caseId': this._caseId,
            'vclFlag': this._vclFlag,
            'offenderChargeId': this._offenderChargeId,
            'offenceDescription': this._offenceDescription,
            'complicityTypeDesc': this._complicityTypeDesc,
            'applyFlag': this._applyFlag,
            'offenceCode': this._offenceCode,
            'statuteCode': this._statuteCode,
            'chargeInfoNumber': this._chargeInfoNumber,
            'offenceDate': this._offenceDate,
            'dispositionCode': this._dispositionCode,
            'convictionFlag': this._convictionFlag,
            'offenceType': this._offenceType,
            'orderId': this._orderId,
            'sentenceSeq': this._sentenceSeq

        };
    }
}
