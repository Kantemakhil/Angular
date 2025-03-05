
import { ReserveBedLocations } from '@inst/movements/housingchanges/beans/ReserveBedLocations';

export class ReserveBedLocationsCommitBean {
    private _insertList: Array<ReserveBedLocations>;
    private _deleteList: Array<ReserveBedLocations>;
    private _updateList: Array<ReserveBedLocations>;

    get insertList(): Array<ReserveBedLocations> { return this._insertList; }

    set insertList( pinsertList: Array<ReserveBedLocations> ) { this._insertList = pinsertList; }

    get deleteList(): Array<ReserveBedLocations> { return this._deleteList; }

    set deleteList( pdeleteList: Array<ReserveBedLocations> ) { this._deleteList = pdeleteList; }

    get updateList(): Array<ReserveBedLocations> { return this._updateList; }

    set updateList( pupdateList: Array<ReserveBedLocations> ) { this._updateList = pupdateList; }

    toJSON(): any {
        return {
            'insertList': this._insertList,
            'deleteList': this._deleteList,
            'updateList': this._updateList
        };
    }

 }