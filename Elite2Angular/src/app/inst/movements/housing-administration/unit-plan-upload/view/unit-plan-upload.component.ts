import { Component, OnInit, Input, OnChanges, SimpleChanges, ViewChild, ElementRef } from '@angular/core';
import { Subscription, Observable, fromEvent } from 'rxjs';
import { take, map, tap, switchMap } from 'rxjs/operators';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UnitDetails, HousingAdministrationStateService } from '../../service/housing-administration-state.service';
import { Backend } from '../../service/backend.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { TranslateService } from '@common/translate/translate.service';

@Component({
  selector: 'app-unit-plan-upload',
  templateUrl: './unit-plan-upload.component.html',
  styleUrls: ['./unit-plan-upload.component.scss']
})
export class UnitPlanUploadComponent implements OnInit, OnChanges {

  @ViewChild('svgContainer') svgContainerElem: ElementRef;
  @ViewChild('file') fileType:ElementRef;
  @Input() unitDetails: UnitDetails;

  private unitPlanSubscription$: Subscription;
  private zoomLevel = 0;
  private zoomStep = 10;

  public unitImageRaw: string;
  public unitImageSize: ImageSize;
  public fileName: string;

  myForm = new FormGroup({
    file: new FormControl('', [Validators.required]),
    fileSource: new FormControl('', [Validators.required])
  });
  msgs: { message: any; type: any; }[];
  msglist: any[];
  imageSize: any;
  width: number;
  height: number;
  imgSizeNote: boolean = false;


  constructor(private api: Backend, private administrationState: HousingAdministrationStateService,
     public sessionManager: UserSessionManager,public translateService: TranslateService,) { }

  ngOnInit(): void { }

  ngOnChanges(changes: SimpleChanges): void {
     this.fileName = null;
     this.myForm.reset();
    if (changes.unitDetails) {
      this.loadUnitImage();
    }
  }

  get f() {
    return this.myForm.controls;
  }

  onFileChange(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.fileName = file.name;
      this.myForm.patchValue({
        fileSource: file
      });
      const fileExtension=file.type;
      if(fileExtension){
        var fields = fileExtension.split('/');
        const fileTYpe = fields[0];
        if(fileTYpe != 'image'){
          this.show('error', this.translateService.translate('HOUSE_ADM.videonotupload'));
          this.fileName = null;
            this.myForm.reset();
          return;
         }
      }
      this.imageSize = file.size;
      let fr = new FileReader();
      fr.onload = () => {
        const img: any = new Image();
        img.onload = () => {
          this.width = img.width;
          this.height = img.height;

          if (this.width >= 1500) {
            this.show('error', this.translateService.translate('HOUSE_ADM.imageSizeGreater'));
            this.fileName = null;
            this.myForm.reset();
            return;
          }
        };
        img.src = fr.result;
      };
      fr.readAsDataURL(file);
      // this.fileType.nativeElement.value = "";
      
    } else {
      this.fileName = null;
    }
  }

  submit() {
    // TODO: If no image is provided, display a message on UI and do not let the form submit
    
    const formData = new FormData();
    formData.append('file', this.myForm.get('fileSource').value);

    if (!this.administrationState.unitDetails.unitId) {
      if (this.width >= 1500) {
        this.imgSizeNote = true;
        this.show('error', this.translateService.translate('HOUSE_ADM.imageSizeGreater'));
        return false;
      } else {
        this.imgSizeNote = false;
      }
      
      this.api.uploadFacilityPlan(this.administrationState.unitDetails.facilityId,this.sessionManager.getId(), formData).subscribe(
        resp => {
          this.fileName = null;
            this.myForm.reset();
            this.show('success', this.translateService.translate('house_adm.imageupload'));
          this.loadUnitImage();
        },
        err => {
          // TODO: Implement this
          
        }
      );
    } else {
      
      this.api.uploadUnitPlan(this.administrationState.unitDetails.facilityId, this.administrationState.unitDetails.unitId,this.api.floorId,this.sessionManager.getId(), formData).subscribe(
        resp => {
          if(resp && resp.errorMessage === 'No_Parent_Data'){
            this.fileName = null;
            this.myForm.reset();
            this.show('error', this.translateService.translate('house_adm.parentfloormust'));
          }else{
            this.fileName = null;
            this.myForm.reset();
            this.show('success', this.translateService.translate('house_adm.imageupload'));
            this.loadUnitImage();
          }
        },
        err => {
          // TODO: Implement this
          
        }
      );
    }

  }


  toggleHotspots(): void {
    this.administrationState.toggleHotspotsConfiguration();
  }

  zoom(zoomType: string) {
    let newW = 0;
    let newH = 0;
    const width = this.unitImageSize.width;
    const height = this.unitImageSize.height;
    if (zoomType === 'in') {
      this.zoomLevel += this.zoomStep;
      newW = width + Math.round(width * (this.zoomLevel + this.zoomStep) / 100);
      newH = height + Math.round(height * (this.zoomLevel + this.zoomStep) / 100);
    } else {
      this.zoomLevel -= this.zoomStep;
      newW = width + Math.round(width * (this.zoomLevel - this.zoomStep) / 100);
      newH = height + Math.round(height * (this.zoomLevel - this.zoomStep) / 100);
    }

    if (this.svgContainerElem) {
      this.svgContainerElem.nativeElement.style.width = `${newW}px`;
      this.svgContainerElem.nativeElement.style.height = `${newH}px`;
    }
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
    this.unitPlanSubscription$ = this.api.getLivingUnitImage(this.unitDetails.facilityId, this.unitDetails.unitId, false)
      .pipe(
        map(image =>{
          if(!image){
            this.show('info',this.translateService.translate('house_adm.floorimagemust'));
          }else{
            return image;
          }
        }),
        tap(
          image => this.unitImageRaw = image
        ),
        switchMap(image => this.getImgSize(image))
      )
      .subscribe(
        imageSize => {
          this.unitImageSize = imageSize;
        },
        error => {
          // TODO: Implement this
        }
      );
  }

  private getImgSize(imageSrc: string): Observable<ImageSize> {
    let mapLoadedImage = (event): ImageSize => {
      return {
        width: event.target.width,
        height: event.target.height
      };
    }
    var image = new Image();
    let $loadedImg = fromEvent(image, "load").pipe(take(1), map(mapLoadedImage));
    image.src = imageSrc;
    return $loadedImg;
  }

}

interface ImageSize { width: number; height: number; }

