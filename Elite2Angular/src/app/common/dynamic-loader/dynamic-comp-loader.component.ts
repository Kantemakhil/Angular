import { Component, ComponentRef, ViewContainerRef, ViewChild, ComponentFactoryResolver, OnInit, OnDestroy } from '@angular/core';
import { OumcamtaskService } from '@sa/admin/service/oumcamtask.service';
import { Router } from '@angular/router';
import { DynamicCompLoaderService } from './service/dynamic-comp-loader.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'app-dynamiccomp',
    templateUrl: './dynamic-comp-loader.component.html',
  })

export class DynamicCompLoader implements OnInit,OnDestroy{

    name = 'Angular';
    childLoaded: boolean = false;
    componentName : any;
    componentRef: ComponentRef<any>;
    dialogRef: MatDialogRef<any> | null;
    @ViewChild('template', {static: true,read: ViewContainerRef}) viewTemplate: ViewContainerRef;
  
    constructor(private cfr: ComponentFactoryResolver,private oumcamtaskService:OumcamtaskService,
      private router: Router,
      private dynamicCompLoaderService:DynamicCompLoaderService) {

    }
  ngOnInit() {
    this.loadComponent();
  }
  ngOnDestroy() {
    if (this.componentRef) {
      this.componentRef.destroy();
    }
  } 
    loadComponent() {
      
      let routes = this.router.config;
      routes.forEach((route)=>{
          if(route.children) {
              route.children.filter(child=>{
                  if(child.path === this.dynamicCompLoaderService.moduleName) {
                    const componentFactory = this.cfr.resolveComponentFactory(child.component);
                    this.componentRef = this.viewTemplate.createComponent(componentFactory);
                      return;
                  }
                })
             
          }
          else if(route.path === this.dynamicCompLoaderService.moduleName){
            const componentFactory = this.cfr.resolveComponentFactory(route.component);
            this.componentRef = this.viewTemplate.createComponent(componentFactory);
              return;
          }
      });
      
     
    }




}