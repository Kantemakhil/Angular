import { Component, EventEmitter, ViewChild, Input, Output} from '@angular/core';


export interface CameraSnapshot {
  height: number;
  width: number;
  imageUrl: string;
  imageFile: File;
}


@Component({
  selector: 's4-camera',
  templateUrl: './camera.component.html',
  styleUrls: []
})
export class CameraComponent {

  private localStream: any;

  started = false;
  value: CameraSnapshot = null;

  @Input("id") id = '';
  @Input("width") width = 400;
  @Input("height") height = 300;
  @Input("disabled ") disabled = true;

  @Input("imageRef") imageRef: HTMLImageElement;
  @Input("placeholderCameraUrl") placeholderCameraUrl = "assets/images/placeholder-camera.png";
  @Input("placeholderPictureUrl") placeholderPictureUrl = "assets/images/placeholder-headshot.png";

  @Output("onCapture") onCapture: EventEmitter<CameraSnapshot> = new EventEmitter<CameraSnapshot>();
  @Output("onStart") onStart: EventEmitter<any> = new EventEmitter();
  @Output("onStop") onStop: EventEmitter<any> = new EventEmitter();

  @ViewChild('videoCapture' ,{static : false}) videoCapture: any;

  ngAfterViewInit() {
    console.log(!this.disabled)
    if (!this.disabled) {
      this.start();
    }
  }

  start() {
    console.log("===== In start()");
    if (!this.started) {
      console.log("===== Trying to start camera.");
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        console.log("===== Camera device identified.");
        navigator.mediaDevices.getUserMedia({ video: true })
          .then(stream => {
            console.log("===== Setting Camera device.");
            this.localStream = stream;
            this.videoCapture.nativeElement.srcObject = stream;
            this.videoCapture.nativeElement.play();
            console.log("===== Camera device is setting completed.");
        });
        if (this.onStart) {
          console.log("===== Starting Camera device.");
          this.onStart.emit();
          console.log("===== Camera device is started.");
        }
        else{
          console.log("===== Unable to start Camera device.");
        }
        this.started = true;
      }
    }
  }

  stop() {
    if (this.started) {
      this.videoCapture.nativeElement.pause();
      this.videoCapture.nativeElement.currentTime = 0;
      this.videoCapture.nativeElement.src = "";
      this.localStream.getTracks().forEach(track => track.stop());
      if (this.placeholderPictureUrl) {
        this.imageRef.src = this.placeholderPictureUrl;
      }
      if (this.onStop) {
        this.onStop.emit();
      }
      this.started = false;
    }
  }

  capture() {
    if (this.started) {
      let canvas: HTMLCanvasElement = document.createElement("canvas");
      canvas.width = this.width;
      canvas.height = this.height;
      let canvasCtx = canvas.getContext('2d');
      canvasCtx.drawImage(this.videoCapture.nativeElement, 0, 0, this.width, this.height);
      if (this.imageRef) {
        this.imageRef.src = canvas.toDataURL();
      }
      if (this.onCapture) {
        var file = this.dataURLtoFile(canvas.toDataURL(), 'test.png');
        this.value = {
          height: this.height,
          width: this.width,
          imageUrl: canvas.toDataURL(),
          imageFile: file
        }
        this.onCapture.emit(this.value);
      }
    }
  }

  dataURLtoFile(dataurl, filename) {
    var arr = dataurl.split(','),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[arr.length - 1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  }

}

