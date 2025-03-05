import { BaseModel } from "@common/beans/BaseModel";

export class InsightBeans extends BaseModel {
        private _Name: string;
        private _CreatedByDisplayName: string;
        private _CategoryName: string; 
        private _Description: string;
        private _Id: string;
        private _CanRead: boolean;
        private _CanWrite: boolean;
        private _CanDelete: boolean;

        get Name(): string{ return this._Name; }
        set Name(dashboardName: string){ this._Name = dashboardName ;}
        get CreatedByDisplayName(): string{ return this._CreatedByDisplayName; }
        set CreatedByDisplayName(createdBy: string){ this._CreatedByDisplayName = createdBy ;}
        get CategoryName(): string{ return this._CategoryName; }
        set CategoryName(dashboardCategory: string){ this._CategoryName = dashboardCategory ;}
        get Description(): string{ return this._Description; }
        set Description(description: string){ this._Description = description ;}
        get Id(): string{ return this._Id; }
        set Id(id: string){ this._Id = id ;}
        get CanRead(): boolean{ return this._CanRead; }
        set CanRead(canRead: boolean){ this._CanRead = canRead;}
        get CanWrite(): boolean{ return this._CanWrite; }
        set CanWrite(canWrite: boolean){ this._CanWrite = canWrite ;}
        get CanDelete(): boolean{ return this._CanDelete; }
        set CanDelete(canDelete: boolean){ this._CanDelete = canDelete ;}

        toJSON(): any {
            return { 
                "Name": this._Name,
                "CreatedByDisplayName": this._CreatedByDisplayName,
                "CategoryName": this._CategoryName,
                "Description": this._Description,
                "Id": this._Id,
                "CanRead": this._CanRead,
                "CanWrite": this._CanWrite,
                "CanDelete": this._CanDelete,
                };
            } 
}