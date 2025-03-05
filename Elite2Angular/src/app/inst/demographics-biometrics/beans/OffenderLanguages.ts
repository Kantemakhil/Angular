export class OffenderLanguages {
        private _createUserId: string;
        private _languageType: string;
        private _numeracySkill: string;
        private _speakSkill: string;
        private _modifyDatetime: Date;
        private _offenderBookId: number;
        private _modifyUserId: string;
        private _languageCode: string;
        private _commentText: string;
        private _preferedSpeakFlag: string;
        private _readSkill: string;
        private _createDatetime: Date;
        private _interpreterRequestedFlag: string;
        private _serialVersionUID: number;
        private _preferedWriteFlag: string;
        private _writeSkill: string;
        private _sealFlag: string;
        private _languageCodeTemp: string;

        get languageCodeTemp(): string { return this._languageCodeTemp;  }

        set languageCodeTemp(planguageCodeTemp: string) { this._languageCodeTemp = planguageCodeTemp;  }
        get createUserId(): string { return this._createUserId;  }

        set createUserId(pcreateUserId: string) { this._createUserId = pcreateUserId;  }

        get languageType(): string { return this._languageType;  }

        set languageType(planguageType: string) { this._languageType = planguageType;  }

        get numeracySkill(): string { return this._numeracySkill;  }

        set numeracySkill(pnumeracySkill: string) { this._numeracySkill = pnumeracySkill;  }

        get speakSkill(): string { return this._speakSkill;  }

        set speakSkill(pspeakSkill: string) { this._speakSkill = pspeakSkill;  }

        get modifyDatetime(): Date { return this._modifyDatetime;  }

        set modifyDatetime(pmodifyDatetime: Date) { this._modifyDatetime = pmodifyDatetime;  }

        get offenderBookId(): number { return this._offenderBookId;  }

        set offenderBookId(poffenderBookId: number) { this._offenderBookId = poffenderBookId;  }

        get modifyUserId(): string { return this._modifyUserId;  }

        set modifyUserId(pmodifyUserId: string) { this._modifyUserId = pmodifyUserId;  }

        get languageCode(): string { return this._languageCode;  }

        set languageCode(planguageCode: string) { this._languageCode = planguageCode;  }

        get commentText(): string { return this._commentText;  }

        set commentText(pcommentText: string) { this._commentText = pcommentText;  }

        get preferedSpeakFlag(): string { return this._preferedSpeakFlag;  }

        set preferedSpeakFlag(ppreferedSpeakFlag: string) { this._preferedSpeakFlag = ppreferedSpeakFlag;  }

        get readSkill(): string { return this._readSkill;  }

        set readSkill(preadSkill: string) { this._readSkill = preadSkill;  }

        get createDatetime(): Date { return this._createDatetime;  }

        set createDatetime(pcreateDatetime: Date) { this._createDatetime = pcreateDatetime;  }

        get interpreterRequestedFlag(): string { return this._interpreterRequestedFlag;  }

        set interpreterRequestedFlag(pinterpreterRequestedFlag: string) { this._interpreterRequestedFlag = pinterpreterRequestedFlag;  }

        get serialVersionUID(): number { return this._serialVersionUID;  }

        set serialVersionUID(pserialVersionUID: number) { this._serialVersionUID = pserialVersionUID;  }

        get preferedWriteFlag(): string { return this._preferedWriteFlag;  }

        set preferedWriteFlag(ppreferedWriteFlag: string) { this._preferedWriteFlag = ppreferedWriteFlag;  }

        get writeSkill(): string { return this._writeSkill;  }

        set writeSkill(pwriteSkill: string) { this._writeSkill = pwriteSkill;  }

        get sealFlag(): string { return this._sealFlag;  }

        set sealFlag(psealFlag: string) { this._sealFlag = psealFlag;  }


        toJSON(): any {
                return {
                        'createUserId': this._createUserId,
                        'languageType': this._languageType,
                        'numeracySkill': this._numeracySkill,
                        'speakSkill': this._speakSkill,
                        'modifyDatetime': this._modifyDatetime,
                        'offenderBookId': this._offenderBookId,
                        'modifyUserId': this._modifyUserId,
                        'languageCode': this._languageCode,
                        'commentText': this._commentText,
                        'preferedSpeakFlag': this._preferedSpeakFlag,
                        'readSkill': this._readSkill,
                        'createDatetime': this._createDatetime,
                        'interpreterRequestedFlag': this._interpreterRequestedFlag,
                        'serialVersionUID': this._serialVersionUID,
                        'preferedWriteFlag': this._preferedWriteFlag,
                        'writeSkill': this._writeSkill,
                        'sealFlag': this._sealFlag,
                        'languageCodeTemp': this._languageCodeTemp,
                 }       ;
         }
}
