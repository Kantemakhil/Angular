import { HousingService } from '@inst/movements/housingchanges/service/housing.service';
import {
    Component,
    OnInit,
    Input,
    SimpleChanges,
    ViewChild,
    ElementRef,
    OnChanges,
} from '@angular/core';
import { Subscription, Observable, fromEvent, forkJoin } from 'rxjs';

import { take, map, tap, switchMap } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { UnitDetails, HousingAdministrationStateService } from '../../service/housing-administration-state.service';
import { LivingUnitConfig } from '../beans/living-unit-config.interface';
import { Backend, SubUnitDetail, LivingUnit, HotspotDetails } from '../../service/backend.service';
import { EditUnitDetails } from '../../beans/unit-details';
import { EditUnitDialogComponent } from '../../edit-unit-dialog/view/edit-unit-dialog.component';
import { HousingBean } from '../../../beans/HousingBean';
import { Sort } from '@angular/material/sort';
import { TranslateService } from '@common/translate/translate.service';

@Component({
    selector: 'app-bed-administration',
    templateUrl: './bed-administration.component.html',
    styleUrls: ['./bed-administration.component.scss'],
})
export class BedAdministrationComponent implements OnInit, OnChanges {
    @ViewChild('svgDrawer') svgContainerElem: ElementRef;
    @Input() unitDetails: UnitDetails;

    private unitPlanSubscription$: Subscription;
    public selectedChildLivingUnit: LivingUnitConfig;
    private isDragActive: boolean;
    private moveBtnTimeout = null;

    public isLoading = false;
    public searchedValue: string;
    public unitImageRaw: string;
    public unitImageSize: ImageSize;
    private childLivingUnits: LivingUnitConfig[] = []; // contains the full list of child living units for this floor plan
    public sortedData: LivingUnitConfig[] = []; // the sorted child living units that should be used for displaying data only
    public hotSpotList: HousingBean[]=[];
  
    msglist: any[];
    msgs: any[];
    radius: number;

    constructor(
        private api: Backend,
        private administrationState: HousingAdministrationStateService,
        public dialog: MatDialog,
        private housingService:HousingService,
        public translateService: TranslateService
    ) { }

    ngOnInit(): void { }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.unitDetails) {
            this.loadUnitImage();
            this.loadUnitHotspots();
        }
    }
    private selectUnit(unitList: LivingUnitConfig[], unitId: string) {
        unitList.forEach((unit) => {
            if (unit.unitId.toString() === unitId && !unit.selected) {
                unit.selected = true;
                this.selectedChildLivingUnit = unit;
            } else {
                unit.selected = false;
            }
            if (unit.childUnits.length) {
                this.selectUnit(unit.childUnits, unitId);
            }
        });
    }

    // function uses side effects to update the original item through the editFunction
    private findUnit(
        unitList: LivingUnitConfig[],
        unitId: string,
        editFunction?: (LivingUnitConfig) => LivingUnitConfig
    ) {
        let foundUnit: LivingUnitConfig;

        for (const item of unitList) {
            if (item.unitId.toString() === unitId) {
                foundUnit = item;
                break;
            } else if (item.childUnits.length) {
                const result = this.findUnit(item.childUnits, unitId);
                if (result) {
                    foundUnit = result;
                    break;
                }
            }
        }

        if (editFunction) {
            return editFunction(foundUnit);
        }

        return foundUnit;
    }

    selectUnitEvent(unitId: any): void {
        this.selectedChildLivingUnit = null;
        this.selectUnit(this.sortedData, unitId.toString());
    }

    startDrag(evt) {
        if (evt.target.classList.contains('draggable')) {
            const selectedUnitId = evt.target.attributes.getNamedItem('id')
                .value;
            this.selectUnitEvent(selectedUnitId);
            this.selectedChildLivingUnit = this.findUnit(
                this.sortedData,
                selectedUnitId
            );
            this.selectedChildLivingUnit.selected = true;
            this.selectedChildLivingUnit.originalXCoordinate = this.selectedChildLivingUnit.xCoordinate;
            this.selectedChildLivingUnit.originalYCoordinate = this.selectedChildLivingUnit.yCoordinate;
            this.isDragActive = true;
        }
    }
    drag(evt) {
        if (this.isDragActive) {
            evt.preventDefault();
            const coord = this.getMousePosition(evt);
            this.selectedChildLivingUnit.xCoordinate = coord.x;
            this.selectedChildLivingUnit.yCoordinate = coord.y;
        }
    }

    endDrag(evt) {
        if (this.isDragActive) {
            if (
                this.selectedChildLivingUnit.xCoordinate !==
                this.selectedChildLivingUnit.originalXCoordinate ||
                this.selectedChildLivingUnit.yCoordinate !==
                this.selectedChildLivingUnit.originalYCoordinate
            ) {
                this.updateHotspot(this.selectedChildLivingUnit).subscribe(
                    () => {
                        this.findUnit(
                            this.sortedData,
                            this.selectedChildLivingUnit.unitId.toString(),
                            (item) => {
                                item.xCoordinate = this.selectedChildLivingUnit.xCoordinate;
                                item.yCoordinate = this.selectedChildLivingUnit.yCoordinate;
                                item.originalXCoordinate = this.selectedChildLivingUnit.xCoordinate;
                                item.originalYCoordinate = this.selectedChildLivingUnit.yCoordinate;
                                return item;
                            }
                        );

                        this.findUnit(
                            this.childLivingUnits,
                            this.selectedChildLivingUnit.unitId.toString(),
                            (item) => {
                                item.xCoordinate = this.selectedChildLivingUnit.xCoordinate;
                                item.yCoordinate = this.selectedChildLivingUnit.yCoordinate;
                                item.originalXCoordinate = this.selectedChildLivingUnit.xCoordinate;
                                item.originalYCoordinate = this.selectedChildLivingUnit.yCoordinate;
                                return item;
                            }
                        );
                    }
                );
            }
            this.isDragActive = false;
        }
    }
 
    resetHotspotDeatils(){
        this.hotSpotList=[];
       this.sortedData.forEach(obj=>{
        if(obj.unitId){
         let hotspotData=new HousingBean();
         hotspotData.xCoordinate=0;
         hotspotData.yCoordinate=0;
         hotspotData.internalLocHotspotId=obj.hotspotId;
         hotspotData.internalLocationId=obj.unitId;
         if(obj.hotspotId){
            this.hotSpotList.push(hotspotData);
         }
         if(obj.childUnits){
           this.setHotSpotData(obj.childUnits);
         }
          }
       })
       this.housingService.updateHotSpotDetails(this.hotSpotList).subscribe( data => {
        if(data === 1) {
            this.show('success', this.translateService.translate('house_adm.resetallhotspots'));
            this.sortedData.forEach(obj=>{
                obj.xCoordinate = 0;
                obj.yCoordinate = 0;
                obj.selected = false;
                if(obj.childUnits){
                  this.resetChildHotSpot(obj.childUnits);  
                }
            })
        }
       })

    }


    sortData(sort: Sort) {
        const data = this.sortedData.slice();
        if (!sort.active || sort.direction === '') {
          this.sortedData = data;
          return;
        }
    
        this.sortedData = data.sort((a, b) => {
          const isAsc = sort.direction === 'asc';
          switch (sort.active) {
            case 'unitCode': return this.compare(a.unitCode, b.unitCode, isAsc);
            default: return 0;
          }
        });
      }
    
    
    compare(a: number | string, b: number | string, isAsc: boolean) {
      return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
    }

    calculateChildUnitRadius(childUnits : LivingUnitConfig[]){
        childUnits.forEach(obj=>{
            if(obj.unitId){
                obj.radius = (this.radius*15);
            }
        })


    }

    resetChildHotSpot(childUnits : LivingUnitConfig[]){
        childUnits.forEach(obj=>{
            if(obj.unitId){
                obj.xCoordinate = 0;
                obj.yCoordinate = 0;
                obj.selected = false;
            }
        })
    }

    setHotSpotData(childUnits : LivingUnitConfig[]){
        childUnits.forEach(obj=>{
            if(obj.hotspotId){
                let hotspotData=new HousingBean();
                hotspotData.xCoordinate=0;
                hotspotData.yCoordinate=0;
                hotspotData.internalLocHotspotId=obj.hotspotId;
                hotspotData.internalLocationId=obj.unitId;
                this.hotSpotList.push(hotspotData);
                 }
        })
    }



    resetCircle() {
        if (this.selectedChildLivingUnit.xCoordinate === 0 && this.selectedChildLivingUnit.yCoordinate === 0) {
            return;
        }

        this.selectedChildLivingUnit.xCoordinate = 0;
        this.selectedChildLivingUnit.yCoordinate = 0;

        this.updateHotspot(this.selectedChildLivingUnit).subscribe(() => {
            this.findUnit(
                this.sortedData,
                this.selectedChildLivingUnit.unitId.toString(),
                (item) => {
                    item.xCoordinate = this.selectedChildLivingUnit.xCoordinate;
                    item.yCoordinate = this.selectedChildLivingUnit.yCoordinate;
                    item.originalXCoordinate = this.selectedChildLivingUnit.xCoordinate;
                    item.originalYCoordinate = this.selectedChildLivingUnit;
                    return item;
                }
            );

            this.findUnit(
                this.childLivingUnits,
                this.selectedChildLivingUnit.unitId.toString(),
                (item) => {
                    item.xCoordinate = this.selectedChildLivingUnit.xCoordinate;
                    item.yCoordinate = this.selectedChildLivingUnit.yCoordinate;
                    item.originalXCoordinate = this.selectedChildLivingUnit.xCoordinate;
                    item.originalYCoordinate = this.selectedChildLivingUnit.yCoordinate;
                    return item;
                }
            );
        });
    }

    move(direction: string) {
        if (this.moveBtnTimeout) {
            clearTimeout(this.moveBtnTimeout);
        }

        switch (direction) {
            case 'right':
                if (
                    this.selectedChildLivingUnit.xCoordinate <
                    this.unitImageSize.width
                ) {
                    this.selectedChildLivingUnit.xCoordinate += 1;
                }
                break;
            case 'up':
                if (this.selectedChildLivingUnit.yCoordinate > 0) {
                    this.selectedChildLivingUnit.yCoordinate -= 1;
                }
                break;
            case 'down':
                if (
                    this.selectedChildLivingUnit.yCoordinate <
                    this.unitImageSize.height
                ) {
                    this.selectedChildLivingUnit.yCoordinate += 1;
                }
                break;
            case 'left':
                if (this.selectedChildLivingUnit.xCoordinate > 0) {
                    this.selectedChildLivingUnit.xCoordinate -= 1;
                }
                break;
            default:
                break;
        }

        this.moveBtnTimeout = setTimeout(() => {
            this.updateHotspot(this.selectedChildLivingUnit).subscribe(() => {
                this.findUnit(
                    this.sortedData,
                    this.selectedChildLivingUnit.unitId.toString(),
                    (item) => {
                        item.xCoordinate = this.selectedChildLivingUnit.xCoordinate;
                        item.yCoordinate = this.selectedChildLivingUnit.yCoordinate;
                        item.originalXCoordinate = this.selectedChildLivingUnit.xCoordinate;
                        item.originalYCoordinate = this.selectedChildLivingUnit;
                        return item;
                    }
                );

                this.findUnit(
                    this.childLivingUnits,
                    this.selectedChildLivingUnit.unitId.toString(),
                    (item) => {
                        item.xCoordinate = this.selectedChildLivingUnit.xCoordinate;
                        item.yCoordinate = this.selectedChildLivingUnit.yCoordinate;
                        item.originalXCoordinate = this.selectedChildLivingUnit.xCoordinate;
                        item.originalYCoordinate = this.selectedChildLivingUnit.yCoordinate;
                        return item;
                    }
                );
            });
        }, 300);
    }

    toggleUnitUpload(): void {
        this.administrationState.toggleUnitUploadConfiguration();
    }

    filterList(): void {
        if (!this.searchedValue) {
            this.sortedData = this.childLivingUnits.slice();
            return;
        }
        const searchStr = this.searchedValue.toLowerCase();

        this.sortedData = this.childLivingUnits.reduce((acc, item) => {
            if (item.unitCode.toLowerCase().includes(searchStr)) {
                acc.push(item);
                return acc;
            }

            const sortedSubUnits = item.childUnits.filter((childUnit) => {
                if (childUnit.unitCode.toLowerCase().includes(searchStr)) {
                    return true;
                }
                childUnit.selected = false;
                return false;
            });

            if (sortedSubUnits.length) {
                const newItem = Object.assign({}, item, {
                    childUnits: sortedSubUnits,
                });
                acc.push(newItem);
                return acc;
            }

            item.selected = false;
            return acc;
        }, []);

        this.sortedData = this.sortedData.filter((item) => {
            if (item.childUnits.length) {
                return true;
            }
            return item.unitCode.toLowerCase().includes(searchStr);
        });
    }

    resetFilter(): void {
        this.searchedValue = '';
        this.sortedData = this.childLivingUnits.slice();
    }

    pritifyCellName(rolLocation: string): string {
        let location = rolLocation.replace(/\s/g, '').toUpperCase();
        location = location
            .replace('FLOOR', '')
            .replace('UNIT', '')
            .replace('CELL', '')
            .replace('BED', '');
        return location;
    }

    openEditPanel(event, bedUnit: LivingUnitConfig) {
        event.stopPropagation();
        const editData = new EditUnitDetails();
        editData.agyLocId = this.administrationState.unitDetails.facilityId;
        editData.unitId = bedUnit.unitId;
        editData.parentId = bedUnit.parentId;

        const dialogRef = this.dialog.open(EditUnitDialogComponent, {
            width: '500px',
            data: editData,
        });

        dialogRef.afterClosed().subscribe((result) => {
            if (result) {
                const unitDetails = result as SubUnitDetail;
                this.findUnit(
                    this.sortedData,
                    bedUnit.unitId.toString(),
                    (item) => {
                        item.active = unitDetails.activeFlag === 'Y';
                        return item;
                    }
                );

                this.findUnit(
                    this.childLivingUnits,
                    bedUnit.unitId.toString(),
                    (item) => {
                        item.active = unitDetails.activeFlag === 'Y';
                        return item;
                    }
                );
                this.api.updateUnit(result).pipe(take(1)).subscribe();
            }
        });
    }

    private loadUnitHotspots(): void {
        const requiredCalls: Observable<object>[] = [];

        requiredCalls.push(
            this.api.getChildLivingUnits(
                this.unitDetails.facilityId,
                this.unitDetails.unitId
            )
        );

        requiredCalls.push(
            this.api.getUnitHotspotDetails(
                this.unitDetails.facilityId,
                this.unitDetails.unitId
            )
        );

        forkJoin(requiredCalls).subscribe(
            (response) => this.buildHotspotResponse(response),
            (err) => {
                
            }
        );
    }

    private buildHotspotResponse(response: object[]): void {
        const availableCells = response[0] as LivingUnit[];
        const hotSpotDetails = response[1] as HotspotDetails[];
        this.childLivingUnits.length = 0;

        let unitConfiguration: LivingUnitConfig;
        const beds: LivingUnitConfig[] = [];


        availableCells.forEach((unit, index) => {
            const unitCfg = new LivingUnitConfig();
            unitCfg.unit = unit;
            unitCfg.childUnits = this.getChildLivingUnits(
                unit.id,
                unit.parentId,
                hotSpotDetails
            );
            unitCfg.parentId = unit.parentId;
            unitCfg.unitCode = !unit.level3Code
                ? unitCfg.unitCode
                : unit.level3Code;
            unitCfg.unitId = unit.id;
            unitCfg.agyLocId = unit.facilityId;
            this.childLivingUnits.push(unitCfg);
        });

        this.childLivingUnits.forEach(obj => {
            hotSpotDetails.forEach(hotSpot => {
                if (obj.unitId === hotSpot.internalLocationId) {
                    obj.xCoordinate = hotSpot.xCoordinate;
                    obj.yCoordinate = hotSpot.yCoordinate;
                    obj.active = hotSpot.activeFlag === 'Y';
                    obj.type = hotSpot.type;
                    obj.hotspotId = hotSpot.internalLocHotspotId;
                    obj.unitId = hotSpot.internalLocationId;
                }

            })

        })


        /* hotSpotDetails.forEach((hotSpot) => {
            const unitCfg = new LivingUnitConfig();
            unitCfg.hotspotId = hotSpot.internalLocHotspotId;
            unitCfg.unitId = hotSpot.internalLocationId;
            unitCfg.xCoordinate = hotSpot.xCoordinate;
            unitCfg.yCoordinate = hotSpot.yCoordinate;
            unitCfg.active = hotSpot.activeFlag === 'Y';
            unitCfg.type = hotSpot.type;
            unitCfg.unitCode = hotSpot.internalLocationCode;
            unitCfg.parentId = hotSpot.parentId;

            if (hotSpot.type === 'BLOCK' ) {
                unitConfiguration = unitCfg;
            } else {
                const cellDetails = availableCells.find(
                    (cell) => cell.id === hotSpot.parentId
                );
                if (cellDetails) {
                    
                }
                beds.push(unitCfg);
            }
        });

        if(unitConfiguration){
        unitConfiguration.childUnits = beds;
        } */


        // this.childLivingUnits.push(unitConfiguration);


        /* this.childLivingUnits.forEach(elem => {
            if (elem.childUnits && elem.childUnits.length > 0) {
                elem.childUnits.forEach(bed => {
                    this.api.getUnitProfiles(bed.unitId).subscribe(
                        profiles => {
                            profiles.forEach(profile => {
                                if (profile.locCode === 'MAXCAP') {
                                    bed.maxCapCode = true;
                                }
                            });
                        }
                    );
                });

            }
        }); */
        this.sortedData = this.childLivingUnits.slice();
    }


    private getChildLivingUnits(
        parentUnitId: number,
        parentFloorId : number,
        hotSpotDetails: HotspotDetails[]
    ): LivingUnitConfig[] {
        const childUnits: LivingUnitConfig[] = [];

        hotSpotDetails.forEach((hotSpot) => {
            if (hotSpot.parentId === parentUnitId) {
                const unitCfg = new LivingUnitConfig();
                unitCfg.hotspotId = hotSpot.internalLocHotspotId;
                unitCfg.unitId = hotSpot.internalLocationId;
                unitCfg.active = hotSpot.activeFlag === 'Y';
                unitCfg.parentId = parentFloorId;
                unitCfg.xCoordinate = hotSpot.xCoordinate;
                unitCfg.yCoordinate = hotSpot.yCoordinate;
                unitCfg.type = hotSpot.type;
                unitCfg.unitCode = hotSpot.internalLocationCode;
                childUnits.push(unitCfg);
            }
        });
        return childUnits;
    }
    show(type, message) {
        this.msglist = [];
        this.msglist.push({ message: message, type: type });
        this.msgs = [...this.msglist];
    }
    private loadUnitImage(): void {
        if (!this.unitDetails) {
            return;
        }

        this.unitImageRaw = undefined;
        if (this.unitPlanSubscription$) {
            this.unitPlanSubscription$.unsubscribe();
        }

        this.unitPlanSubscription$ = this.api
            .getLivingUnitImage(
                this.unitDetails.facilityId,
                this.unitDetails.unitId,
                false
            )
            .pipe(
                map(image =>{
                    if(!image){
                        this.show('warn',this.translateService.translate('house_adm.imagemandatory'));
                    }else{
                      return image;
                    }
                  }),
                tap((image) => (this.unitImageRaw = image)),
                switchMap((image) => this.getImgSize(image))
            )
            .subscribe(
                (imageSize) => {
                    this.unitImageSize = imageSize;
                    if(this.unitImageSize && this.unitImageSize.width){
                        this.radius=(this.unitImageSize.width)/1500;
                        for ( var i = 0; i < this.sortedData.length; i++ ) {
                            this.sortedData.forEach(obj=>{
                                obj.radius = (this.radius*15);
                                if(obj.childUnits){
                                  this.calculateChildUnitRadius(obj.childUnits);  
                                }
                            })
                            
                        }
                        
                    }
                },
                (error) => {
                    
                }
            );
    }

    private getImgSize(imageSrc: string): Observable<ImageSize> {
        const mapLoadedImage = (event): ImageSize => {
            return {
                width: event.target.width,
                height: event.target.height,
            };
        };
        const image = new Image();
        const $loadedImg = fromEvent(image, 'load').pipe(
            take(1),
            map(mapLoadedImage)
        );
        image.src = imageSrc;
        return $loadedImg;
    }

    private getMousePosition(evt) {
        const CTM = this.svgContainerElem.nativeElement.getScreenCTM();
        return {
            x: (evt.clientX - CTM.e) / CTM.a,
            y: (evt.clientY - CTM.f) / CTM.d,
        };
    }

    private updateHotspot(livingUnit: LivingUnitConfig): Observable<any> {
        return this.api.setHotspotDetails(
            livingUnit.unitId,
            livingUnit.hotspotId,
            livingUnit.xCoordinate,
            livingUnit.yCoordinate,
            livingUnit.parentId,
            livingUnit.agyLocId
        );
    }
}

interface ImageSize {
    width: number;
    height: number;
}
