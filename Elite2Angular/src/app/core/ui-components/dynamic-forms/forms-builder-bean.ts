import { BaseModel } from "@common/beans/BaseModel";

export class FormsBuilderBean extends BaseModel {
        private _createUserId: string;
        private _modifyUserId: string;
        private _createDatetime: Date;
        private _modifyDatetime: Date;
        private _formId: number;
        private _moduleName: string;
        private _formName: string;
        private _formJson: string;
        private _formIdentifier: string;

        get createUserId(): string{ return this._createUserId; }
        set createUserId(createUserId: string){ this._createUserId = createUserId ;}
        get modifyUserId(): string{ return this._modifyUserId; }
        set modifyUserId(modifyUserId: string){ this._modifyUserId = modifyUserId ;}
        get createDatetime(): Date{ return this._createDatetime; }
        set createDatetime(createDatetime: Date){ this._createDatetime = createDatetime ;}
        get modifyDatetime(): Date{ return this._modifyDatetime; }
        set modifyDatetime(modifyDatetime: Date){ this._modifyDatetime = modifyDatetime ;}
        get formId(): number{ return this._formId; }
        set formId(formId: number){ this._formId = formId ;}
        get moduleName(): string{ return this._moduleName; }
        set moduleName(moduleName: string){ this._moduleName = moduleName ;}
        get formName(): string{ return this._formName; }
        set formName(formName: string){ this._formName = formName ;}
        get formJson(): string{ return this._formJson; }
        set formJson(formJson: string){ this._formJson = formJson ;}
        get formIdentifier(): string{ return this._formIdentifier; }
        set formIdentifier(formIdentifier: string){ this._formIdentifier = formIdentifier ;}

        toJSON(): any {
            return { 
                "createUserId": this._createUserId,
                "modifyUserId": this._modifyUserId,
                "createDatetime": this._createDatetime,
                "modifyDatetime": this._modifyDatetime,
                "formId": this._formId,
                "moduleName":this._moduleName,
                "formName":this._formName,
                "formJson": this._formJson,
                "formIdentifier": this._formIdentifier
                };
            } 
}