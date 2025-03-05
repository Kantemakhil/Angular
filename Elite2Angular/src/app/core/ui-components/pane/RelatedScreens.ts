
export class RelatedScreens  {

    private _accessModuleName: string;
    private _moduleName: string;
    private _description: string;
    private _listSeq: number;

    get accessModuleName(): string { return this._accessModuleName; }

    set accessModuleName(paccessModuleName: string){ this._accessModuleName = paccessModuleName; }

    get moduleName(): string { return this._moduleName; }

    set moduleName(pmoduleName: string){ this._moduleName = pmoduleName; }

    get description(): string { return this._description; }

    set description(pdescription: string){ this._description = pdescription; }

    get listSeq(): number { return this._listSeq; }

    set listSeq(plistSeq: number){ this._listSeq = plistSeq; }


    toJSON(): any {
        return {
            'accessModuleName': this._accessModuleName,
            'moduleName': this._moduleName,
            'description': this._description,
            'listSeq': this._listSeq,
        };
    }
}