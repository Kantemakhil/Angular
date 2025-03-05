    export class VClearAccountPayables {
         private _corporateName: string;
         private _totalAmount: number;
         private _serialVersionUID: number;
         private _accountCode: number;
         private _caseloadId: string;
         private _personId: number;
         private _corporateId: number;
         private _minBalAmount: number;
         private _caseloadIdTemp: string;
         private _cgnbtCaseloadId: string;

        get cgnbtCaseloadId(): string { return this._cgnbtCaseloadId; }

        set cgnbtCaseloadId(pcgnbtCaseloadId: string) { this._cgnbtCaseloadId = pcgnbtCaseloadId; }

        get caseloadIdTemp(): string { return this._caseloadIdTemp; }

        set caseloadIdTemp(pcaseloadIdTemp: string) { this._corporateName = pcaseloadIdTemp; }

        get minBalAmount(): number { return this._minBalAmount; }

        set minBalAmount(pminBalAmount: number) { this._minBalAmount = pminBalAmount; }

         get corporateName(): string { return  this._corporateName; }

         set corporateName(pcorporateName: string) { this._corporateName = pcorporateName; }

         get totalAmount(): number { return  this._totalAmount; }

         set totalAmount(ptotalAmount: number) { this._totalAmount = ptotalAmount; }

         get serialVersionUID(): number { return  this._serialVersionUID; }

         set serialVersionUID(pserialVersionUID: number) { this._serialVersionUID = pserialVersionUID; }

         get accountCode(): number { return  this._accountCode; }

         set accountCode(paccountCode: number) { this._accountCode = paccountCode; }

         get caseloadId(): string { return  this._caseloadId; }

         set caseloadId(pcaseloadId: string) { this._caseloadId = pcaseloadId; }

         get personId(): number { return  this._personId; }

         set personId(ppersonId: number) { this._personId = ppersonId; }

         get corporateId(): number { return  this._corporateId; }

         set corporateId(pcorporateId: number) { this._corporateId = pcorporateId; }


     toJSON(): any {
         return {
            'corporateName': this._corporateName,
            'totalAmount': this._totalAmount,
            'serialVersionUID': this._serialVersionUID,
            'accountCode': this._accountCode,
            'caseloadId': this._caseloadId,
            'personId': this._personId,
            'corporateId': this._corporateId,
            'minBalAmount': this._minBalAmount,
            'caseloadIdTemp': this._caseloadIdTemp,
            'cgnbtCaseloadId': this._cgnbtCaseloadId
             };
         }
 }
