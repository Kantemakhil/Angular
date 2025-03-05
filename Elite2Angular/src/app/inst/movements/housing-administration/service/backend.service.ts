import { Housing } from './../../housingchanges/beans/Housing';
import { Observable, Subject } from 'rxjs';
import { Time } from '@angular/common';

export abstract class Backend {

   floorId : number;
   showAllChildData : boolean;
   showAllChild  = new Subject<any>();;
  abstract login(username: string, password: string): Observable<boolean>;
  abstract logout(): Observable<boolean>;

  /**
   * Returns the id of last agency used by the currently logged in user
   */
  abstract getCurrentCaseload(): Observable<string>;

  /**
   * Returns the facilities in the agency with the given id.
   * @param agencyId the id of the agency for which facilities are requested
   */
  abstract getFacilities(agencyId: string): Observable<Facility[]>;

  /**
   * Returns the main living units in the facility with the given id. These
   * living units may be subdivided into smaller living units. To obtain the
   * smaller living units, see getChildLivingUnits.
   * @param facilityId the id of the facility for which living units are requested
   */
  abstract getLivingUnits(facilityId: string): Observable<LivingUnit[]>;

  /**
   * Returns the living unit sub-divisions of a larger living unit, such as a floor,
   * wing or cell block.
   * @param facilityId the id of the facility for which living units are requested
   * @param parentLivingUnitId the id of the living unit for which subdivions are requested
   */
  abstract getChildLivingUnits(facilityId: string, parentLivingUnitId: number): Observable<LivingUnit[]>;

  /**
   * Returns a roll list of offenders assigned to the given living unit within the given facility.
   *
   * @param facilityId the id of the facility for which a roll list is requested
   * @param livingUnitId the id of the living unit within the facility
   */
  abstract getRollList(facilityId: string, livingUnitId: number): Observable<RollListItem[]>;

  abstract getOffenderDetails(facilityId: string, offenderId: number): Observable<OffenderDetails>;

  abstract getFacilityImage(facilityId: string, useCache: boolean): Observable<string>;

  abstract getLivingUnitImage(facilityId: string, livingUnitId: number, useCache: boolean): Observable<string>;

  abstract getOfenderImage(offenderId: number): Observable<string>;

  /**
   * Returns all events for the given facility and floor (optionally also cell block)
   * for the given date (and optionally, between the given times on that date).
   *
   * @param facilityId the id of the facility for which scheduled events are requested (not null)
   * @param floorId the id of the floor/tier for which scheduled events are reqested (not null)
   * @param cellBlockId (optional) the id of the cell block for which events are requested (may be null)
   * @param eventDate the date (year, month, day) for which events are requested (not null)
   * @param (optional) the starting time for events
   * @package (optional) the end time for events
   */
  abstract getSchedule(
    facilityId: string, floorId: number, cellBlockId: number,
    eventDate: Date, fromTime?: Time, toTime?: Time): Observable<ScheduledEvent[]>;

  /**
   * Changes the housing location of the offender with the given booking id to the
   * living unit with the given id.
   *
   * NOTE: this method uses the offender booking id, not the offender id!
   *
   * @param bookId the offender booking id
   * @param livingUnitId  the destination living unit id
   */
  abstract changeHousingLocation(bookId: number, livingUnitId: number): Observable<boolean>;

  abstract getHousingConflicts(
    offenderBookId: number, facilityId: string, floorCode?: string,
    unitCode?: string, cellCode?: string, bedCode?: string): Observable<HousingConflict[]>;

  abstract getUnitHotspotDetails(agyLocId: string, unitId: number): Observable<HotspotDetails[]>;

  abstract getFacilityHotspotDetails(agyLocId: string): Observable<HotspotDetails[]>;

  abstract setHotspotDetails(unitId: number, hotspotId: number, xCoordinate, yCoordinate,floorId:number,agyLocId: string): Observable<void>;

  abstract uploadFacilityPlan(agyLocId: string,userId: string, data: FormData): Observable<Housing>;

  abstract uploadUnitPlan(agyLocId: string, unitId: number,floorId:number,userId: string, data: FormData): Observable<Housing>;

  abstract getUnitProfiles(unitId: number): Observable<UnitProfile[]>;

  abstract getDeactivateReasonCodes(userId: string, moduleName: string): Observable<DeactivateReason[]>;

  abstract getSubUnitsDetails(agyLocId: string, parentUnitId: number): Observable<SubUnitDetail[]>;

  abstract updateUnit(unit: SubUnitDetail): Observable<void>;
}

export interface Agency {
  id: string;
  name: string;
}

export interface Facility {
  id: string;
  description: string;
}

export interface LivingUnit {
  id: number; // livingUnitId
  parentId?: number; // parentLivingUnitId
  active: boolean; // activeFlag: 'Y'
  facilityId: string; // agyLocId
  allocated: number;
  capacity: number;
  filled: boolean; // filledFlag: 'N'
  offenderCount: {
    cell: number; // inLivingUnits
    internal: number; // outOfLivingUnits
    out: number; // outOfAgy
    outOfCell: number; // computer as internal + out
  };
  hasChildUnits: boolean; // nextButton: 'Y'
  description: string; // livingUnitDesc
  type: LivingUnitType; // computed from livingUnitType and livingUnitTypeDesc
  level1Code: string;
  level2Code?: string;
  level3Code?: string;
  level4Code?: string;
  floorPlanId: number;
}

export interface LivingUnitType {
  name: string;
  description: string;
}

export interface RollListItem {
  active: boolean;
  facilityId: string;
  firstName: string;
  lastName: string;
  livingUnitId: number;
  parentLivingUnitId: number;
  rootLivingUnitId: number;
  bookId: number;
  offenderId: number;
  offenderIdDisplay: string;
  livingUnitDescription: string;
  inCell: boolean;
}

export interface OffenderDetails {
  firstName: string;
  lastName: string;
  offenderId: number;
  offenderIdDisplay: string;
  bookId: number;
  birthDate: Date;
  age: number;
  gender: string;
  alerts: string;
  location: string;
  status: string;
  inOut: string;
  reason: string;
  custody: string;
  imageId: number;
  locationDisplay?: string;
}

export interface ScheduledEvent {
  id: number;
  facilityId: string;
  type: string;
  description: string;
  activity: {
    type: string;
    description: string;
    location: string;
  };
  livingUnit: {
    id: number;
    description: string;
  };
  offender: {
    id: number;
    idDisplay: string;
    firstName: string;
    lastName: string;
  };
  startTime: Date;
}

export interface HousingConflict {
  livingUnitId: number;
  livingUnitDescription: string;
  prisonerConflict: boolean;
  securityConflict: boolean;
  cellSharingConflict: boolean;
}

export interface HotspotDetails {
  internalLocationId: number;
  internalLocationCode: string;
  parentId: number;
  activeFlag: string;
  internalLocHotspotId: number;
  xCoordinate: number;
  yCoordinate: number;
  type: string;
}

export interface UnitProfile {
  internalLocationId: number;
  profileType: string;
  locCode: string;
  sealFlag: string;
}

export interface DeactivateReason {
  description: string;
  listSeq: number;
  domain: string;
  code: string;
  canDisplay: boolean;
}

export interface SubUnitDetail {
  acaCapRating: null;
  activeFlag: string;
  agyLocId: string;
  capacity: number;
  certifiedFlag: string;
  cnaNo: number;
  commentText: null;
  controlActiveFlag: string;
  deactivateDate: string;
  deactivateReasonCode: string;
  description: string;
  housingUnitType: string;
  level1Code: string;
  level2Code: string;
  level3Code: string;
  level4Code: string;
  listSeq: number;
  livingUnitCode: string;
  livingUnitId: number;
  livingUnitType: string;
  lowestLevelFlag: string;
  noOfOccupant: number;
  operationCapacity: number;
  parentLivingUnitId: number;
  reachOperCapacityFlag: string;
}
