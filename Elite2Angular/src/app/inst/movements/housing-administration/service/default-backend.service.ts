import { HttpService } from '@core/service/http.service';
import { Housing } from './../../housingchanges/beans/Housing';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap, map, catchError, switchMap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Observable, of, forkJoin, EmptyError } from 'rxjs';
import { LivingUnit, Facility, RollListItem, OffenderDetails, ScheduledEvent, HousingConflict, HotspotDetails, UnitProfile, DeactivateReason, SubUnitDetail } from './backend.service';
import { Time } from '@angular/common';
import { Backend } from './backend.service';
import { TokenStore } from './token-store.service';
import { TranslateService } from '@common/translate/translate.service';
import { UserSessionManager } from '@core/classes/userSessionManager';

@Injectable()
export class DefaultBackend extends Backend {

  public cachedAllImagesResponse: GetAllImagesResponse[];
  private imageCache = {};
  msgs: { message: any; type: any; }[];
  
  constructor(private store: TokenStore, private http: HttpService,public translateService: TranslateService,
    public sessionManager: UserSessionManager,private httpClient: HttpClient) {
    super();
  }

  login(username: string, password: string): Observable<boolean> {
    return this.http.post('/Elite2Web/oauth/token', {
      grant_type: 'password',
      username,
      password
    })
      .pipe(
        tap(response => {
          this.store.accessToken = response.access_token;
          this.store.refreshToken = response.refresh_token;
        }),
        map(response => true),
        catchError(err => of(false))
      );
  }

  logout(): Observable<boolean> {
    return this.http.get('/Elite2Web/oauth/logout').pipe(
      tap(() => this.store.clear()),
      map(() => true),
      catchError(() => of(false))
    );
  }

  getCurrentCaseload(): Observable<string> {
    return this.http.get('omss40/getCurrentCaseload', {
      responseType: 'text'
    });
  }

  getFacilities(agencyId: string): Observable<Facility[]> {
    return this.http.get('oidcholo/cgfkcrtmvtmpagylocidrecordgroup?caseload=' + agencyId).pipe(
      map(resp => resp.map((item) => {
        return {
          id: item.code,
          description: item.description
        } as Facility;
      }))
    );
  }

  getLivingUnits(facilityId: string): Observable<LivingUnit[]> {
    return this.http.post('oiiproll/lvUntSmExecuteQuery?type='+'E', {
      agyLocId: facilityId
    }
    ).pipe(
      map(resp => this.mapLivingUnits(resp)),
      map(units => units.filter(unit => unit.level1Code !== 'ADM'))
    );
  }

  getChildLivingUnits(facilityId: string, parentLivingUnitId: number): Observable<LivingUnit[]> {
    return this.http.post('oiiproll/lvUntSmExecuteQuery?type='+'N' ,{
      agyLocId: facilityId,
      livingUnitId: parentLivingUnitId
    }
    ).pipe(
      map(resp => this.mapLivingUnits(resp))
    );
  }

  getRollList(facilityId: string, livingUnitId: number): Observable<RollListItem[]> {
    return this.http.post('oiiunrol/rollListExecuteQuery', {
      rootLivingUnitId: livingUnitId,
      agyLocId: facilityId,
      cellType: 'CA'
    }, {
      responseType: 'json'
    }).pipe(
      map(resp => this.mapRollListItem(resp))
    );
  }

  getOffenderDetails(facilityId: string, offenderId: number): Observable<OffenderDetails> {
    return this.http.post('osiosear/offbkgGlobalQuery', {
      offenderId,
      agyLocId: facilityId
    }).pipe(
      map(resp => this.mapOffenderDetails(resp)),
      map(resp => resp[0])
    );
  }

  public getOfenderImage(imageId: number): Observable<string> {
    return this.getImageBase64(imageId).pipe(
      map(response => {
        if (!response) {
          return null;
        } else {
          return 'data:image/jpeg;base64,' + response;
        }
      })
    );
  }

  public getFacilityImage(facilityId: string, useCache: boolean): Observable<string> {
    if (this.imageCache[facilityId] && useCache) {
      return of(this.imageCache[facilityId]).pipe(
        map(response => {
          if (!response) {
            return null;
          } else {
            return 'data:image/jpeg;base64,' + response;
          }
        })
      );
    }

    let obs: Observable<GetAllImagesResponse[]>;
    if (!!this.cachedAllImagesResponse) {
      obs = of(this.cachedAllImagesResponse);
    } else {
      obs = this.getAllImages();
    }

    return obs.pipe(
      tap(images => this.cachedAllImagesResponse = images),
      map(images => {
        const match = images.find(image => image.rootFloorPlan === 'Y' && image.agyLocId === facilityId);
        if (match === undefined) {
          throw new EmptyError();
        }

        return match;
      }),
      switchMap(image => this.getImageBase64(image.imageId)),
      tap(imageBase64 => this.imageCache[facilityId] = imageBase64),
      map(response => {
        if (!response) {
          return null;
        } else {
          return 'data:image/jpeg;base64,' + response;
        }
      }),
      catchError(() => of(undefined))
    );
  }
  
  public getLivingUnitImage(facilityId: string, livingUnitId: number, useCache: boolean): Observable<string> {

    if (this.imageCache[livingUnitId] && useCache) {
      return of(this.imageCache[livingUnitId]).pipe(
        map(response => {
          if (!response) {
            return null;
          } else {
            return 'data:image/jpeg;base64,' + response;
          }
        })
      );
    }
    
    /* if (livingUnitId) {

      return this.getImageBase64(livingUnitId).pipe(
        map(response => {
          if (!response) {
            return null;
          } else {
            return 'data:image/jpeg;base64,' + response;
          }
        })
      );
    } */
      /* case 6013: return of('/assets/images/units/unit_' + livingUnitId + '.jpg');
      case 6050: return of('/assets/images/units/unit_' + livingUnitId + '.jpg');
      case 6215: return of('/assets/images/units/unit_' + livingUnitId + '.jpg');
      case 6216: return of('/assets/images/units/unit_' + livingUnitId + '.jpg'); */
    

    let obs: Observable<any>;
    //obs = this.getAllImages();
    if (!!this.cachedAllImagesResponse) {
      obs = of(this.cachedAllImagesResponse);
    } else {
      obs = this.getAllImages();
    }

    const level = 0;
    return obs.pipe(
      tap(images => this.cachedAllImagesResponse = images),
      switchMap(() => this.findBaseFloorPlanId(facilityId)),
      switchMap((floorPlanId) => this.getFloorPlan(floorPlanId)),
      switchMap(floorPlan => this.findMatchingImage(floorPlan, livingUnitId, level + 1)),
      tap(imageBase64 => this.imageCache[livingUnitId] = imageBase64)
    ).pipe(
      map(response => {
        if (!response) {
          return null;
        } else {
          return 'data:image/jpeg;base64,' + response;
        }
      })
    );
  }

  public getSchedule(
    facilityId: string, floorId: number, cellBlockId: number,
    eventDate: Date, fromTime?: Time, toTime?: Time): Observable<ScheduledEvent[]> {

    const date = new Date(eventDate.getTime());
    date.setUTCHours(0, 0, 0, 0);

    return this.http.post('oidintmv/offBlkExecuteQuery', {
      agyLocId: facilityId,
      luLevel1Code: floorId,
      luLevel2Code: cellBlockId || null,
      eventDate: date,
      eventType: 'SCHEDULED',
      startTime: this.converToTimeToStr(fromTime),
      endTime: this.converToTimeToStr(toTime)
    }).pipe(
      map(resp => this.mapScheduledEvent(resp))
    );
  }

  public changeHousingLocation(bookId: number, livingUnitId: number): Observable<boolean> {
    return this.http.post('oidchloc/offBookingUpdate', {
      offenderBookId: bookId,
      livingUnitId
    }, {
      responseType: 'text'
    }).pipe(
      map(resp => resp === '1')
    );
  }

  public getHousingConflicts(
    offenderBookId: number, facilityId: string, floorCode?: string,
    unitCode?: string, cellCode?: string, bedCode?: string): Observable<HousingConflict[]> {

    return this.http.post('omuavbed/livingUnitsExecuteQuery', {
      pOffenderBookId: offenderBookId,
      pAgyLocId: facilityId,
      pLevel1Code: floorCode,
      pLevel2Code: unitCode,
      pLevel3Code: cellCode,
      pLevel4Code: bedCode
    }).pipe(
      map(resp => this.mapHousingConflict(resp))
    );
  }

  public getFacilityHotspotDetails(agyLocId: string): Observable<HotspotDetails[]> {
    return this.http.get('housing/facilityHotspotDetails?agyLocId=' + agyLocId ).pipe(
      map(resp => this.mapHotspotDetails(resp))
    );
  }

  public getUnitHotspotDetails(agyLocId: string, unitId: number): Observable<HotspotDetails[]> {
    return this.http.get('housing/unitHotspotDetails?agyLocId=' + agyLocId+'&unitInternalLocationId='+unitId.toString()).pipe(
      map(resp => this.mapHotspotDetails(resp))
    );
  }

  public setHotspotDetails(unitId: number, hotspotId: number, xCoordinate, yCoordinate,floorId :number,agyLocId: string): Observable<void> {
    return this.http.post('housing/unitHotspotDetails', {
      internalLocationId: unitId,
      internalLocHotspotId: hotspotId,
      xCoordinate: xCoordinate,
      yCoordinate: yCoordinate,
      parentId :floorId,
      agyLocId: agyLocId,
    });
  }

  public uploadFacilityPlan(agyLocId: string,userId: string, data: FormData): Observable<Housing> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': this.sessionManager.getTokenType()
        + ' ' + this.sessionManager.getAccessToken() ,
        'Accept' : '*/*'
      })
};
httpOptions.headers.append('Content-Type' , '');
    return this.httpClient.post<any>('/Elite2Web/api/housing/facility-image?agyLocId='+agyLocId+'&userId='+userId, data,httpOptions).pipe(
      tap(resp => {
        if(resp && resp.agyLocId)
        this.cachedAllImagesResponse.push(resp);
      }),
    )
  }

  public uploadUnitPlan(agyLocId: string, unitId: number,floorPlanId:number,userId: string, data: FormData): Observable<Housing> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': this.sessionManager.getTokenType()
        + ' ' + this.sessionManager.getAccessToken() ,
        'Accept' : '*/*'
      })
};
httpOptions.headers.append('Content-Type' , '');
    return this.httpClient.post<any>('/Elite2Web/api/housing/unit-image?agyLocId='+agyLocId+'&unitInternalLocationId='+unitId.toString()+'&floorId='+floorPlanId.toString()+'&userId='+userId, data,httpOptions).pipe(
      tap(resp => {
        if(resp && resp.agyLocId)
        this.cachedAllImagesResponse.push(resp);
      }),
      map(resp =>{
        
        return {
          floorPlanId: resp.floorPlanId,
          imageId: resp.imageId,
          internalLocationId :resp.internalLocationId,
          agyLocId: resp.agyLocId,
          errorMessage : resp.errorMessage
        } as Housing;
      })
    );
  }

  public getUnitProfiles(unitId: number): Observable<UnitProfile[]> {
    return this.http.get('housing/unit-profiles?unitInternalLocationId'+unitId.toString()).pipe(
      map(resp => this.mapUnitProfiles(resp))
    );
  }

  public getDeactivateReasonCodes(userId: string, moduleName: string): Observable<DeactivateReason[]> {
    return this.http.get('getReferenceDomainCodes?params='+'LIV_UN_RSN&moduleName='+moduleName).pipe(
      map(resp => this.mapDeactivateCodes(resp))
    );
  }

  public getSubUnitsDetails(agyLocId: string, parentUnitId: number): Observable<SubUnitDetail[]> {

    if(parentUnitId){
      return this.http.post('oimmholo/livUnitsDialogExecuteQuery', {
        agyLocId,
        parentLivingUnitId: parentUnitId.toString()
      });
    }else{
      return this.http.post('oimmholo/livUnitsExecuteQuery', {
        agyLocId,
      });
    }
  }

  public updateUnit(unit: SubUnitDetail): Observable<void>{
    return this.http.post('oimmholo/livUnitsCommit', {
      deleteList: [],
      insertList: [],
      updateList: [unit]
    });
  }

  private findMatchingImage(floorPlan: any, livingUnitId: number, level: number): Observable<string> {
    if(!floorPlan){
      return of(undefined);
    }
    if (level > 3) {
      return of(undefined);
    }
        
    // using == intentionally here
    if (floorPlan.livingUnitId == livingUnitId) {
      const match = this.cachedAllImagesResponse.find(item => item.floorPlanId === floorPlan.floorPlanId);
      return this.getImageBase64(match.imageId);
    }

    const children = this.cachedAllImagesResponse.filter(child => child.parentFloorPlan === floorPlan.floorPlanId);
    if (children.length === 0) {
      return of(undefined);
    }

    const observables = children.map((child) => {
      return this.getFloorPlan(child.floorPlanId).pipe(
        switchMap((fp) => this.findMatchingImage(fp, livingUnitId, level + 1))
      );
    });

    return forkJoin(observables).pipe(
      map((joined) => {
        const result = joined.filter(item => item !== undefined);
        if (result.length === 0) {
          return undefined;
        }

        return result[0];
      })
    );
  }

  private getAllImages(): Observable<GetAllImagesResponse[]> {
    return this.http.get('housing/getAllImages');
  }

  private findBaseFloorPlanId(facilityId: string): Observable<number> {
    return this.http.get('housing/findBaseImageArch?agyLocId='+facilityId).pipe(
      tap(resp => this.floorId = Number(resp) ),
      map(resp => Number(resp))
    );
    
  }

  private getFloorPlan(floorPlanId: number): Observable<FloorPlan> {
    return this.http.post('housing/getFloorDetails', floorPlanId).pipe(
      map(resp => {
        if(resp.length> 0){
        const item = resp.find(element => element.floorPlanId === floorPlanId);
        return {
          floorPlanId: item.floorPlanId,
          imageId: item.imageId,
          livingUnitId: item.internalLocationId
        } as FloorPlan;
      }
      })
    );
  }

  private getImageBase64(imageId: number): Observable<string> {
    return this.http.post('osiosear/imageExecuteQuery', {
      imageId
    }).pipe(
      map(resp => resp[0].imageThumbnail)
    );
  }

  private converToTimeToStr(time: Time): string {
    if (!time) {
      return null;
    }

    const date = new Date();
    const currentMonth = this.quickNrToStrConvert(date.getMonth());
    const day = this.quickNrToStrConvert(date.getDate());
    const hour = this.quickNrToStrConvert(time.hours);
    const minutes = this.quickNrToStrConvert(time.minutes);

    // crude conversion to time str bypassing time offset
    return date.getFullYear() + '-' + currentMonth + '-' + day + 'T' + hour + ':' + minutes + ':00.000Z';
  }

  private quickNrToStrConvert(nr: number): string {
    if (nr < 10) {
      return '0' + nr;
    } else {
      return '' + nr;
    }
  }

  private mapLivingUnits(resp: LvUntSmExecuteQueryResponse[]): LivingUnit[] {
    return resp.map<LivingUnit>((item) => {
      return {
        id: item.livingUnitId,
        parentId: item.parentLivingUnitId,
        active: item.activeFlag === 'Y',
        facilityId: item.agyLocId,
        allocated: item.allocated,
        capacity: item.capacity,
        filled: item.filledFlag === 'Y',
        offenderCount: {
          cell: item.inLivingUnits,
          internal: item.outOfLivingUnits,
          out: item.outOfAgy,
          outOfCell: item.outOfLivingUnits + item.outOfAgy
        },
        hasChildUnits: item.nextButton === 'Y',
        description: item.livingUnitDesc,
        type: {
          name: item.livingUnitType,
          description: item.livingUnitTypeDesc
        },
        level1Code: item.level1Code,
        level2Code: item.level2Code,
        level3Code: item.level3Code,
        level4Code: item.level4Code
      } as LivingUnit;
    });
  }

  private mapRollListItem(resp: RollListResponse[]): RollListItem[] {
    return resp.map<RollListItem>((item) => {
      return {
        active: item.activeFlag === 'Y',
        facilityId: item.agyLocId,
        firstName: item.firstName,
        lastName: item.lastName,
        livingUnitId: item.livingUnitId,
        parentLivingUnitId: item.parentLivingUnitId,
        rootLivingUnitId: item.rootLivingUnitId,
        bookId: item.offenderBookId,
        offenderId: item.offenderId,
        offenderIdDisplay: item.offenderIdDisplay,
        livingUnitDescription: item.livingUnitDesc,
        inCell: item.inOutStatus === 'IN'
      } as RollListItem;
    });
  }

  private mapOffenderDetails(resp: OffenderBackgroundQueryResponse[]): OffenderDetails[] {
    return resp.map<OffenderDetails>((item) => {
      return {
        firstName: item.firstName,
        lastName: item.lastName,
        offenderId: item.offenderId,
        offenderIdDisplay: item.offenderIdDisplay,
        bookId: item.offenderBookId,
        birthDate: item.birthDate,
        age: item.age,
        gender: item.gender,
        alerts: item.offAlerts,
        location: item.prisonLocation,
        status: item.statusDisplay,
        inOut: item.inOutStatus,
        reason: item.statusReason,
        custody: item.status2,
        imageId: item.imageId
      };
    });
  }

  private mapScheduledEvent(resp: any[]): ScheduledEvent[] {
    return resp.map<ScheduledEvent>(item => {
      return {
        id: item.eventId,
        facilityId: item.agyLocId,
        type: item.eventType,
        description: item.eventTypeDesc,
        activity: {
          type: item.eventSubType,
          description: item.eventSubTypeDesc,
          location: item.toIntLocUserDesc
        },
        livingUnit: {
          id: item.livingUnitId,
          description: item.livingUnitDesc
        },
        offender: {
          id: item.offenderId,
          idDisplay: item.offenderIdDisplay,
          firstName: item.offenderFirstName,
          lastName: item.offenderLastName
        },
        startTime: item.startTime ? new Date(item.startTime + '.000Z') : null
      } as ScheduledEvent;
    }).sort((a, b) => {
      if (a.startTime < b.startTime) {
        return -1;
      }
      if (a.startTime > b.startTime) {
        return 1;
      }
      return 0;
    });
  }

  private mapHousingConflict(resp: any[]): HousingConflict[] {
    return resp.map<HousingConflict>(item => ({
      livingUnitId: item.livingUnitId,
      livingUnitDescription: item.description,
      prisonerConflict: item.prisonerConflict === 'Y',
      securityConflict: item.securityConflict === 'Y',
      cellSharingConflict: item.cellSharingConflict === 'Y'
    } as HousingConflict));
  }

  private mapHotspotDetails(resp: any[]): HotspotDetails[] {
    return resp.map<HotspotDetails>(item => ({
      agyLocId: item.agyLocId,
      internalLocationId: item.internalLocationId,
      internalLocationCode: item.internalLocationCode,
      parentId: item.parentId,
      internalLocHotspotId: item.internalLocHotspotId,
      activeFlag: item.activeFlag,
      xCoordinate: item.xCoordinate,
      yCoordinate: item.yCoordinate,
      type: item.internalLocationType,
    } as HotspotDetails));
  }

  private mapUnitProfiles(resp: any[]): UnitProfile[] {
    return resp.map<UnitProfile>(item => ({
      internalLocationId: item.internalLocationId,
      profileType: item.profileType,
      locCode: item.locCode,
      sealFlag: item.sealFlag
    } as UnitProfile));
  }

  private mapDeactivateCodes(resp: any[]): DeactivateReason[] {
    return resp.map<DeactivateReason>(item => ({
      description: item.description,
      listSeq: item.listSeq,
      domain: item.domain,
      code: item.code,
      canDisplay: item.canDisplay
    } as DeactivateReason));
  }

  private mapSubunitDetails(resp: any[]): SubUnitDetail[] {
    return resp.map<SubUnitDetail>(item => ({
      capacity: item.capacity,
      acaCapRating: item.acaCapRating,
      activeFlag: item.acaCapRating,
      agyLocId: item.agyLocId,
      certifiedFlag: item.certifiedFlag,
      cnaNo: item.cnaNo,
      listSeq: item.listSeq,
      deactivateDate: item.deactivateDate,
      deactivateReasonCode: item.deactivateReasonCode,
      housingUnitType: item.housingUnitType,
      noOfOccupant: item.noOfOccupant,
      description: item.description
    } as SubUnitDetail));
  }
}



export interface TokenResponse {
  access_token: string;
  refresh_token: string;
  token_type: string;
  expires_in: string;
  scope?: string;
}

//
// internal interfaces, used only in this backend implementation
//

type YesNo = 'Y' | 'N';
type InOut = 'IN' | 'OUT';

interface RgAgyLocRecordGroupResponse {
  agyLocId: string;
  description: string;
}
interface LvUntSmExecuteQueryResponse {
  activeFlag: YesNo;
  agyLocId: string;
  allocated: number;
  capacity: number;
  deactivateDate?: string;
  filledFlag: YesNo;
  inLivingUnits: number;
  level1Code: string;
  level2Code?: string;
  level3Code?: string;
  level4Code?: string;
  listSeq: number;
  livingUnitDesc: string;
  livingUnitId: number;
  livingUnitType: string;
  livingUnitTypeDesc: string;
  outOfAgy: number;
  outOfLivingUnits: number;
  parentLivingUnitId: number;
  reservedBeds: number;
  userDesc?: string;
  vacancy: number;
  nextButton: YesNo;
}

interface RollListResponse {
  activeFlag: YesNo;
  agencyImlDesc: string;
  agencyImlId?: string;
  agyLocId: string;
  alertFlag: YesNo;
  firstName: string;
  inOutStatus: InOut;
  lastName: string;
  livingUnitDesc: string;
  livingUnitId: number;
  offenderBookId: number;
  offenderId: number;
  offenderIdDisplay: string;
  parentLivingUnitId: number;
  rootLivingUnitId: number;
  cellType?: string;
  errorMessage?: string;
}

interface OffenderBackgroundQueryResponse {
  createUserId?: string;
  errorMessage?: string;
  activeFlag: YesNo;
  age: number;
  agencyImlId?: string;
  agyLocId: string;
  agyLocType: string;
  aliasOffenderId?: string;
  assignedStaffId?: number;
  birthDate: Date;
  bookingBeginDate: Date;
  bookingCreatedDate?: Date;
  bookingEndDate?: Date;
  bookingNo: string;
  bookingStatus: string;
  bookingType: string;
  communityActiveFlag?: string;
  communityStatus?: string;
  createAgyLocId: string;
  createIntakeAgyLocId?: string;
  disclosureFlag: YesNo;
  ethnicity?: string;
  firstName: string;
  gender: string;
  headerStatus: YesNo;
  imageId?: number;
  imageThumbnail?: string;
  inOutStatus: InOut;
  intakeAgyLocId?: string;
  lastName: string;
  livUnitDesc: string;
  livingUnitDescription: string;
  livingUnitId: number;
  locationCode?: string;
  middleName?: string;
  movementReason: string;
  offAlerts?: string;
  offSupLevel: string;
  offenderBookId: number;
  offenderId: number;
  offenderIdDisplay: string;
  officer?: string;
  prisonLocation: string;
  rootOffenderId: number;
  status1: string;
  status2: string;
  status3?: string;
  statusDisplay: string;
  statusReason: string;
  suffix?: string;
  caseLoadId?: string;
  userId?: string;
  createuserId?: string;
  createDatetime?: Date;
  activeDatetime?: Date;
  nbtAssignReason?: Date;
  nbtOffenderBookId?: string;
  nbtNonAssBProceed: boolean;
  nbtNonAssVProceed: boolean;
  nbtChkSecBProceed: boolean;
  nbtChkSecVProceed: boolean;
  insertedFlag: boolean;
  assignmentDate?: string;
  assignmentTime?: string;
}


interface GetAllImagesResponse {
  agyLocId: string;
  imageId: number;
  floorPlanId: number;
  parentFloorPlan?: number;
  rootFloorPlan: YesNo;
}


interface GetBreadcrumbsResponse {
  imageId: number;
  floorPlanId: number;
  internalLocationId?: number;
}

interface FloorPlan {
  floorPlanId: number;
  imageId?: number;
  livingUnitId?: number;
}