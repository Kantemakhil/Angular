export class OffenderFeeBenficieries {
private _lastName: string;
private _firstName: string;
private _amount: number;
private _corporateDescription: string;
private _percentage: number;
private _personId: string;
private _priority: number;
private _corporateId: string;

get lastName(): string { return this._lastName; }
set lastName(plastName: string) { this._lastName = plastName ; }
get firstName(): string { return this._firstName; }
set firstName(pfirstName: string) { this._firstName = pfirstName ; }
get amount(): number { return this._amount; }
set amount(pamount: number) { this._amount = pamount ; }
get corporateDescription(): string{ return this._corporateDescription; }
set corporateDescription(pcorporateDescription: string) { this._corporateDescription = pcorporateDescription ; }
get percentage(): number { return this._percentage; }
set percentage(ppercentage: number) { this._percentage = ppercentage ; }
get personId(): string { return this._personId; }
set personId(ppersonId: string) { this._personId = ppersonId ; }
get priority(): number { return this._priority; }
set priority(ppriority: number) { this._priority = ppriority ; }
get corporateId(): string { return this._corporateId; }
set corporateId(pcorporateId: string) { this._corporateId = pcorporateId ; }

toJSON(): any {
return {
'lastName': this._lastName,
'firstName': this._firstName,
'amount': this._amount,
'corporateDescription': this._corporateDescription,
'percentage': this._percentage,
'personId': this._personId,
'priority': this._priority,
'corporateId': this._corporateId,
};
}
}
