import { Component, OnInit, ViewChild } from '@angular/core';

import { DialogComponent } from '@ui-components/dialog/dialog.component';

import { DomSanitizer } from '@angular/platform-browser';

import { Images } from '@common/beans/Images';

import { OiuimageService } from '../service/oiuimage.service';

import { ImageOriginals } from '@common/beans/ImageOriginals';


@Component({

  selector: 'app-oiuimage-export-screen',

  templateUrl: './propertyimagedialog.component.html',

  // styleUrls: ['./oiuimage-export-screen.component.css']

})

export class PropertyImageDialogComponent implements OnInit {

  fileUrl: any;

  title: any;

  imagesModel: Images = new Images();

  imageoriginalsModel: ImageOriginals = new ImageOriginals();

  imageoriginalsData: ImageOriginals[] = [];

  @ViewChild('dialog',{static:true}) dialog: DialogComponent;

  image: any;


  constructor(private sanitizer: DomSanitizer,private oiuimageFactory: OiuimageService,) { }


  ngOnInit() {

    if (this.dialog && this.dialog.data) {

      //const data = this.dialog.data;

     this.imagesModel = this.dialog.data;
     this.oiuimageexecuteQuery();

      //this.titleDisabled = data.imageUrl;

      // if (data.title) {

      //   this.title = String(data.title).trim();

      // }

      //  if (data.imageUrl) {

      //    this.image = data.imageUrl;

      // //  // const container = document.getElementById('exporting');

      // //   //container.oncontextmenu = this.rightClick;

      // //   // const container = document.getElementById('exportImage');

      // //   // container.style.backgroundImage = `url(${this.image})`;

      // //   // container.style.backgroundRepeat = 'no-repeat';

      // //   // container.style.minHeight = '500px';

      // //   // container.style.minWidth = '500px';

      // //   // container.style.resize = 'both';

      // //   // container.style.overflowX = 'auto';

      //  }

    }

    //this.downloadImage();

  }


  get BASE64IMAGE(): string {

    return 'data:image/JPEG;base64,';

}


get BASE64PNG(): string {

    return 'data:image/PNG;base64,';

}


  oiuimageexecuteQuery() {

    if (this.dialog.data.screenName == 'OIIPTRAN') {
      if (this.imagesModel.imageObjectId) {
        const serviceObj = this.oiuimageFactory.imagesExecuteQuery(this.imagesModel);
        serviceObj.subscribe(data => {
        
          this.imageoriginalsModel = new ImageOriginals();
          this.imageoriginalsModel.imageId = data[0].imageId;
          const imageoriginalsResult = this.oiuimageFactory.imageOriginalsExecuteQuery(this.imageoriginalsModel);
          imageoriginalsResult.subscribe(data => {
            if (data.length === 0) {
              this.imageoriginalsData = [];
            } else {
              this.imageoriginalsData = data;
              if (this.imageoriginalsData[0].imageFull) {
                this.image = this.BASE64IMAGE + this.imageoriginalsData[0].imageFull;
              }
            }
          });
        });
      } else { 
        this.imageoriginalsData = [];
      }
    }
    else{
      this.imageoriginalsModel = new ImageOriginals();
      this.imageoriginalsModel.imageId = this.dialog.data.images[0].imageId;
      const imageoriginalsResult = this.oiuimageFactory.imageOriginalsExecuteQuery(this.imageoriginalsModel);
      imageoriginalsResult.subscribe(data => {
        if (data.length === 0) {
          this.imageoriginalsData = [];
        } else {
          this.imageoriginalsData = data;
          if (this.imageoriginalsData[0].imageFull) {
            this.image = this.BASE64IMAGE + this.imageoriginalsData[0].imageFull;
          }
        }
      });
    }
     }

    

  // downloadImage() {


  //   fetch(this.image).then(res => res.blob())

  //   .then(blob => {

  //     this.fileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(blob));

  //   });


  // }


  // rightClick(event) {

  //      event.preventDefault();

  // }

}