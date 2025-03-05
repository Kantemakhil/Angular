import { conformToMask } from 'angular2-text-mask';

export enum PhoneNumType {
    NA = 1,
    UK = 2,
    Unknown = 0,
    Default = NA
}
export class ContactType{
    expiryDate: String;
    formatStatus:boolean
    maskFormat:String;
    maskingCode:String;
    maskingDescription:String;
    sequence:number;
}
export class PhoneNumberUtils {
    private static _phoneFormat = '';
    private static _phonePrefix = '';
    private static _getFormatType = '';
    private static _contactType: ContactType | undefined;
    
    static get phonePrefix(): any {
        return PhoneNumberUtils._phonePrefix;
    }
    static set phonePrefix(prefix: any) {
        if (prefix !== PhoneNumberUtils._phonePrefix) {
            this._phonePrefix = prefix;
        }
    }
    static get getFormatType(): any {
        return PhoneNumberUtils._getFormatType;
    }
    static set getFormatType(locale: any) {
        if(locale !== PhoneNumberUtils._getFormatType){
            this._getFormatType = locale;
        }
    }
    static get phoneFormat(): any {
        return PhoneNumberUtils._phoneFormat;
    }
    static set phoneFormat(locale: any) {
        if(locale !== PhoneNumberUtils._phoneFormat){
            this._phoneFormat = locale;
        }
    }
    static get contactType(): any {
        return PhoneNumberUtils._contactType;
    }
    static set contactType(formatTypes: any) {
        if (formatTypes.length){
            this._contactType = formatTypes;
        } else if (!formatTypes.length && formatTypes) {
            this._contactType = formatTypes;
        }
    }
    static composeContactNumberMask(val): any {
        return this.contactNumberMask(val);
    }
    static composePhoneNumberMask(): any {
        return this.phoneNumberMask();
    }

    static composePhoneNumberMaskWithPrefix(locale: PhoneNumType, number: string): any {
        if ( locale == PhoneNumType.NA ) {
            var mask = this.phoneNumberMaskNA(number);
            mask = ['1', ' ', ...mask];
            return mask;
        } else if ( locale == PhoneNumType.UK ) {
            var mask = this.phoneNumberMaskUK(number);
            mask = ['(', '0', ')', ...mask]
            return mask;
        } else {
            return this.phoneNumberMask();
        }
    }
    
    static phoneNumberPrefix(): string {
         return PhoneNumberUtils._phonePrefix;
    }
    
    static phoneNumberGuide(locale: PhoneNumType): boolean {
        return (locale != PhoneNumType.Unknown);
    }
public static getFormattedNumber(type,number){
    if(!number || !type){
       return;
    }
    var result = conformToMask( String( number ),
    PhoneNumberUtils.composeContactNumberMask(type),
    { guide: PhoneNumberUtils.phoneNumberGuide(null) } );
     return  result.conformedValue;
}
    private static phoneNumberMask(): any {
        if (this._phoneFormat) {
            const numberArray = this._phoneFormat.split('');
            const formatArray = [];
            numberArray
            .forEach((obj, idx) => {
                if ((/[1-9]/).test(obj)) {
                    formatArray[idx] = /\d/;
                } else {
                        formatArray[idx] = obj;
                    }
                });
                return formatArray;
            }
        // unknown, allow up to 11 digits
        return [ /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/];
    }
    public static contactNumberMask(val): any {
        if (val){
            const typeArray = this.contactType.find(x => val === x.maskingCode);
            this.getFormatType = typeArray.maskFormat;
            if (this._getFormatType) {
                const numberArray = this._getFormatType.split('');
                const formatArray = [];
            numberArray
            .forEach((obj, idx) => {
                if ((/[1-9]/).test(obj)) {
                    formatArray[idx] = /\d/;
                } else {
                        formatArray[idx] = obj;
                    }
                });
                return formatArray;
            }
        }
        
        // unknown, allow up to 11 digits
        return [ /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/];
    }

    private static phoneNumberMaskNA(number: string): any {
        return ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]
    }

    private static phoneNumberMaskUK(num: string): any {
        var number = String(num);
        
        // http://www.area-codes.org.uk/formatting.php
        // 013873 #####
        // 015242 #####
        // 015394 #####
        // 015395 #####
        // 015396 #####
        // 016973 #####
        // 016974 #####
        // 016977 ####
        // 016977 #####
        // 017683 #####
        // 017684 #####
        // 017687 #####
        // 019467 #####
        if ( number.match( /^13873*\d/ ) ||
            number.match( /^15242*\d/ ) ||
            number.match( /^15394*\d/ ) ||
            number.match( /^15395*\d/ ) ||
            number.match( /^15396*\d/ ) ||
            number.match( /^16973*\d/ ) ||
            number.match( /^16977*\d/ ) ||
            number.match( /^17683*\d/ ) ||
            number.match( /^17684*\d/ ) ||
            number.match( /^17687*\d/ ) ||
            number.match( /^19467*\d/ ) ) {
            return [/[1-9]/, /\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/, /\d/]
        }
        // 011# ### ####
        // 01#1 ### ####
        else if ( number.match( /^11*\d/ ) ||
            number.match( /^1\d1*\d/ ) ) {
            return [/[1-9]/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/]
        }
        // 01### #####
        // 01### ######
        else if ( number.match( /^1*\d/ ) ) {
            return [/[1-9]/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/, /\d/, /\d/]
        }
        // 02# #### ####
        else if ( number.match( /^2*\d/ ) ) {
            return [/[1-9]/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/]
        }
        // 03## ### ####
        else if ( number.match( /^3*\d/ ) ) {
            return [/[1-9]/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/]
        }
        // 05### ######
        // 07### ######
        else if ( number.match( /^5*\d/ ) ||
            number.match( /^6*\d/ ) ) {
            return [/[1-9]/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/, /\d/, /\d/]
        }
        // 0800 ######
        else if ( number.match( /^800*\d/ ) ) {
            return [/[1-9]/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/, /\d/, /\d/]
        }
        // 08## ### ####
        // 09## ### ####
        else if ( number.match( /^8*\d/ ) ||
            number.match( /^9*\d/ ) ) {
            return [/[1-9]/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/]
        } else {
            return [/[1-9]/]
        }
    }

}
