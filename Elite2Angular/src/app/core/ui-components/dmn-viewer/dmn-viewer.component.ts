import { Component, Input, AfterContentInit, OnChanges, OnDestroy, ViewChild, ElementRef, SimpleChanges } from '@angular/core';

import * as DmnJSViewer from 'dmn-js/dist/dmn-navigated-viewer.production.min.js';
import { UiCustomizeService } from '@core/service/ui-customize.service';


@Component({
  selector: 'app-dmnviewer',
  templateUrl: './dmn-viewer.component.html',
  styleUrls: ['./dmn-viewer.component.css']
})
export class DmnViewerComponent implements AfterContentInit, OnChanges, OnDestroy {

  // retrieve DOM element reference
  @ViewChild('ref', { static: true }) private el: ElementRef;


  @Input() private xmlData: string;

  @Input() private activityId: string;
  strokeColor = 'rgb(0, 0, 0)';
  fillColor = 'rgb(0, 255, 0)';

  viewer: any;
  xmlFlag = false;
  xmlText: any;
  hideModular = false;
  hideOnXml = false;
  constructor(private uiCustomizeService: UiCustomizeService) {

    this.viewer = new DmnJSViewer();
    if (document.getElementsByTagName('mat-sidenav')[0]['style'].visibility === 'visible') {
      document.getElementsByClassName('s4-sidenav-button')[0].dispatchEvent(new Event('click'));
    }
  }

  ngAfterContentInit(): void {
    this.viewer.attachTo(this.el.nativeElement);
    if (this.xmlData) {
      this.importDiagram(this.xmlData);
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    // re-import whenever the url changes
    if (changes.xmlData) {
      this.importDiagram(changes.xmlData.currentValue);
      // this.loadUrl(changes.url.currentValue);
    }
  }

  ngOnDestroy(): void {
    this.viewer.destroy();
  }

  zoomIn() {
    this.viewer.get('zoomScroll').stepZoom(1);

  }
  zoomOut() {
    this.viewer.get('zoomScroll').stepZoom(-1);
  }

  resetZoom() {
    this.viewer.get('zoomScroll').reset();
  }


  importDiagram(xml) {
    this.viewer.importXML(xml)

  }
  
  checkXml(){
    if(this.xmlFlag === true){
      this.viewer.saveXML({ format: true }, (err, xml) => {
        if (err) {
        } else {
        this.xmlText = xml;
        }
      });
      this.hideModular = true;
      this.hideOnXml = true;
    } else {
      this.hideModular = false;
      this.hideOnXml = false;
      this.importDiagram(this.xmlText);
     
    }
  }
}