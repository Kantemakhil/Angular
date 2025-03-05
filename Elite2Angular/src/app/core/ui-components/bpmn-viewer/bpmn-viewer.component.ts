import { Component, Input, AfterContentInit, OnChanges, OnDestroy, ViewChild, ElementRef, SimpleChanges } from '@angular/core';
import * as BpmnJS from 'bpmn-js/dist/bpmn-modeler.production.min.js';
import * as BpmnJSViewer from 'bpmn-js/dist/bpmn-navigated-viewer.production.min.js';
import { UiCustomizeService } from '@core/service/ui-customize.service';


@Component({
  selector: 'app-bpmnviewer',
  templateUrl: './bpmn-viewer.component.html',
  styleUrls: ['./bpmn-viewer.component.css']
})
export class BpmnViewerComponent implements AfterContentInit, OnChanges, OnDestroy {

  private bpmnJS: BpmnJS;
  // retrieve DOM element reference
  @ViewChild('ref', { static: true }) private el: ElementRef;


  @Input() private xmlData: string;

  @Input() private activityId: string;
  strokeColor = 'rgb(0, 0, 0)';
  fillColor = 'rgb(0, 255, 0)';

  viewer: any;
  constructor(private uiCustomizeService: UiCustomizeService) {

    this.viewer = new BpmnJSViewer();
    if(this.uiCustomizeService && this.uiCustomizeService.taskManagementConfig && this.uiCustomizeService.taskManagementConfig.strokeColor ){
      this.strokeColor=this.uiCustomizeService.taskManagementConfig.strokeColor;
  }  if(this.uiCustomizeService && this.uiCustomizeService.taskManagementConfig && this.uiCustomizeService.taskManagementConfig.refreshTime ){
    this.fillColor=this.uiCustomizeService.taskManagementConfig.fillColor;
}

  }

  ngAfterContentInit(): void {
    this.viewer.attachTo(this.el.nativeElement);
    if (this.xmlData) {
      if(this.activityId){
        this.parseXml(this.xmlData);
      }else{
        this.importDiagram(this.xmlData);
      }
     
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
    // destroy BpmnJS instance
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


  parseXml(xml){
    var parsedXml = new DOMParser().parseFromString(xml,'text/xml');
    var xmlSerializer = new XMLSerializer();
    var elements = parsedXml.getElementsByTagName('bpmndi:BPMNShape');
    if(elements.length>0){
      for(var i=0;i<elements.length;i++){
        if(elements[i].getAttribute('bpmnElement') == this.activityId){
          elements[i].setAttribute('bioc:stroke',this.strokeColor);
          elements[i].setAttribute('bioc:fill',this.fillColor);
        }
      }
    }
    /* elements.forEach(obj=>{
      if(obj.getAttribute('bpmnElement') == this.activityId){
        obj.setAttribute('bioc:stroke','rgb(0, 0, 0)');
        obj.setAttribute('bioc:fill','rgb(0, 255, 0)');
      }
    }) */
    var serializedXml = xmlSerializer.serializeToString(parsedXml);
  
  
    this.importDiagram(serializedXml);
  
  }






  importDiagram(xml) {
    this.viewer.importXML(xml)
    
    setTimeout(() => {
    this.resetZoom();
    },1)
    setTimeout(() => {
       var canvas = this.viewer.get('canvas');
       canvas.addMarker('User_Approval', 'highlight');
    }, 1000)

  }
  

}