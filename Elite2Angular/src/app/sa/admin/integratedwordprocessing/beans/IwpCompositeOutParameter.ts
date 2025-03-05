export class IwpCompositeOutParameter {
	
    private  _bookmarkName: string;
	private  _parameterName: string;
	private  _parameterDesc: string;
	
	get parameterName(): string { return this._parameterName; }
    set parameterName(outParameterName: string) { this._parameterName = outParameterName; }

    get parameterDesc(): string { return this._parameterDesc; }
    set parameterDesc(outParameterDescription: string) { this._parameterDesc = outParameterDescription; }
    
    get bookmarkName(): string { return this._bookmarkName; }
    set bookmarkName(bookmarkName: string) { this._bookmarkName = bookmarkName; }

 toJSON(): any {
        return {
            'bookmarkName': this._bookmarkName,
            'parameterName': this._parameterName,
            'parameterDesc': this._parameterDesc
        }
      }      
}