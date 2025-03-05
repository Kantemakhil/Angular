import { Component, OnInit, ViewChild } from '@angular/core';
import { DialogComponent } from '@ui-components/dialog/dialog.component';
import { CameraComponent } from '@ui-components/camera/camera.component';
import { OiuimageService } from '@common/offender-records/service/oiuimage.service';

@Component({
  selector: 'app-image-capture-screen',
  templateUrl: './imagecapturedialog.component.html',
  // styleUrls: ['./oiuimage-export-screen.component.css']
})
export class ImageCaptureDialogComponent implements OnInit {
  isCapture = false;
  @ViewChild('dialog', {static: true}) dialog: DialogComponent;
  @ViewChild('camera', {static: true}) camera: CameraComponent;
  image: any;
  imageFile: File;

  constructor(private oiuimageFactory: OiuimageService) { }

  ngOnInit() {
      this.oiuimageFactory.image = null;
      this.oiuimageFactory.cameraCompoent = this.camera;
       try {
        this.onStream();
       } catch (e) {
        console.log('Error : ');
        console.log(e);
         
       }
  }

  onStream() {
      console.log(this.camera.started)
      if (this.camera.started) {
            this.closeCamera();
        } else {
            this.camera.start();
        }
  }

  onCapture() {
    this.oiuimageFactory.image = null;
    this.camera.capture();
  }
  onImageCapture(event) {
    if (event && event.imageUrl) {
        this.image =  event.imageUrl;
        this.oiuimageFactory.image = this.image;
    }
    if (event && event.imageFile) {
      this.imageFile =  event.imageFile;
    }
  }
  onSelect() {
    this.closeCamera();
    this.oiuimageFactory.image = null;
    this.dialog.close({ base64Image : this.image , imageFile : this.imageFile});
  }
  onCancel() {
      this.closeCamera();
      this.oiuimageFactory.image = null;
      this.dialog.close(null);
  }
  closeCamera() {
      try {
        this.camera.stop();
      } catch (e) {
        console.error('Error Occured while stoping S4-Camera : \n' + e.message );
        console.error(e.stack);
      }
  }

  onStartCamera() {
    this.isCapture = true;
    console.log('Capture Button enabled? ' + this.isCapture);
  }
}
