import { Component, OnInit, ViewChild } from '@angular/core';
import { DialogComponent } from '@ui-components/dialog/dialog.component';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-oiuimage-export-screen',
  templateUrl: './oiuimage-export-screen.component.html',
  // styleUrls: ['./oiuimage-export-screen.component.css']
})
export class OiuimageExportScreenComponent implements OnInit {
  fileUrl: any;
  title: any;
  @ViewChild('dialog', {static: true}) dialog: DialogComponent;
  image: any;

  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit() {
    if (this.dialog && this.dialog.data) {
      const data = this.dialog.data;
      if (data.title) {
        this.title = String(data.title).trim();
      }
      if (data.imageFull) {
        this.image = data.imageFull;
        const container = document.getElementById('exportimg');
        container.oncontextmenu = this.rightClick;
        // const container = document.getElementById('exportImage');
        // container.style.backgroundImage = `url(${this.image})`;
        // container.style.backgroundRepeat = 'no-repeat';
        // // container.style.minHeight = '500px';
        // container.style.resize = 'both';
        // container.style.overflowX = 'auto';
      }
    }
    this.downloadImage();
  }

  downloadImage() {

    fetch(this.image).then(res => res.blob())
    .then(blob => {
      this.fileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(blob));
    });

  }

  rightClick(event) {
       event.preventDefault();
  }
}
