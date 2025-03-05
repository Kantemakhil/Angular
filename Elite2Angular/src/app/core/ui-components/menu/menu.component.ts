import { Component, Input, ViewChild, OnInit, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 's4-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  closemenu: string;
  nodes: any;
  //      isExpand = true;
  constructor(private router: Router) { }
  isVisible_div = true;
  @Input() homeNodes: any;
  @Input() sidenav :any;
  @ViewChild('one' ,{static : true}) one: ElementRef;
  @ViewChild('two' ,{static : true}) two: ElementRef;
  @ViewChild('three',{static : true}) three: ElementRef;
  @ViewChild('four' ,{static : true}) four: ElementRef;
  @ViewChild('five' ,{static : true}) five: ElementRef;
  @ViewChild('tree' ,{static : true}) tree: any;
  mainNodes = [
                {
                  id: 1,
                  name: 'Menu',
                  img: 'assets/images/Menu_icon.svg',
                  nodes:[],
                  showChild:false,
                  menuBorder:"center-align menurow"
                },
                {
                    id: 2,
                    name: 'Features',
                    img:'assets/images/Features_icon.svg',
                    nodes:[],
                    showChild:false,
                    menuBorder:"center-align menurow"
                },
                {
                    id: 3,
                    name: 'My calendar',
                    img:'assets/images/Mycalendar_Icon.svg',
                    nodes:[],
                    showChild:false,
                    menuBorder:"center-align menurow"
                },
                {
                    id: 4,
                    name: 'My tasks',
                    img:'assets/images/Mytasks_icon.svg',
                    nodes:[],
                    showChild:false,
                    menuBorder:"center-align menurow"
                },
                {
                    id: 5,
                    name: 'My offenders',
                    img:'assets/images/Myoffenders_icon.svg',
                    nodes:[],
                    showChild:false,
                    menuBorder:"center-align menurow"
                },
                {
                    id: 6,
                    name: 'Recentoffenders',
                    img:'assets/images/Recentoffenders_icon.svg',
                    nodes:[],
                    showChild:false,
                    menuBorder:"center-align menurow"
                }
                
              ];

  ngOnInit() {
  }
  reDirect(link) {
    if (link !== null && link !== undefined && link !== '') {
      this.router.navigate([link]);
    }
  }
  doSomething(nodeName) {
    if (nodeName === 'child1') {
      this.router.navigate(['./login']);
    }

  }
  openSubMenu(id) {
      this.mainNodes[id-1].showChild = !this.mainNodes[id-1].showChild;
      this.mainNodes[id-1].menuBorder = this.mainNodes[id-1].showChild?"menuBorder center-align menurow":"center-align menurow";
      if(id==1) {
          
          this.nodes = this.homeNodes;
          this.mainNodes[0].nodes = this.nodes;
      } else if(id==2) {
          this.mainNodes[1].nodes = [
                                     {
                                         id: 1,
                                         name: 'System Settings',
                                         children: [

                                           {
                                             id: 7,
                                             name: 'Profile Settings',
                                           },
                                           {
                                             id: 13,
                                             name: 'Incidents & OIC'
                                           }

                                         ]
                                       },
                                       {
                                           id: 2,
                                           name: 'Theme',
                                           img:'assets/images/Recentoffenders_icon.svg',
                                           children: [
                                                                                                                  
                                                            {
                                                                id: 21,
                                                                name: 'Default theme',
                                                                
                                                            },
                                                            {
                                                                  id: 22,
                                                                  name: 'Deep Purple/Amber',
                                                                  
                                                            },
                                                            {
                                                                id: 23,
                                                                name: 'Pink/Blue Grey',
                                                                
                                                            },
                                                            {
                                                                  id: 24,
                                                                  name: 'Purple/Green',
                                                                  
                                                            }
                                                      
                                                      ]
                                       },
                                     ];
      } 
      
      //this.removeNonImplementedNodes();
  }
  toggleChild(node) {
  
      const fieldElement = <HTMLInputElement>document.getElementById('subMenu'+node.id);
      fieldElement.hidden = !fieldElement.hidden;
      const arrowKeyUp = <HTMLInputElement>document.getElementById('aup'+node.id);
      const arrowKeyDown = <HTMLInputElement>document.getElementById('adown'+node.id);
      arrowKeyUp.hidden = fieldElement.hidden;
      arrowKeyDown.hidden=!fieldElement.hidden;
  }
  toggleGChild(node) {
  
      const fieldElement = <HTMLInputElement>document.getElementById('subMenu'+node.parentId+node.order);
      fieldElement.hidden = !fieldElement.hidden;
      const arrowKeyUp = <HTMLInputElement>document.getElementById('aup'+node.parentId+node.order);
      const arrowKeyDown = <HTMLInputElement>document.getElementById('adown'+node.parentId+node.order);
      arrowKeyUp.hidden = fieldElement.hidden;
      arrowKeyDown.hidden=!fieldElement.hidden;
  }
  
  toggleG1Child(node) {
      const fieldElement = <HTMLInputElement>document.getElementById('g1Menu'+node.parentId+node.order);
      fieldElement.hidden = !fieldElement.hidden;
      const arrowKeyUp = <HTMLInputElement>document.getElementById('g1up'+node.id);
      const arrowKeyDown = <HTMLInputElement>document.getElementById('g1down'+node.id);
      arrowKeyUp.hidden = fieldElement.hidden;
      arrowKeyDown.hidden=!fieldElement.hidden;
  }
  
  changeTheme(id) {
      const fieldElement = <HTMLBodyElement>(document.getElementsByTagName('body')[0]);
      fieldElement.classList.remove("s4-theme","deeppurple-amber","pink-bluegrey","purple-green", "light-and-clean", "aqua-theme");
      if(id == 21) {
          fieldElement.classList.add("s4-theme");
      } else if(id == 22) {
          fieldElement.classList.add("deeppurple-amber");
      } else if(id == 23) {
          fieldElement.classList.add("pink-bluegrey");
      } else if(id == 24) {
          fieldElement.classList.add("purple-green");
      } else if(id == 26) {
      	  fieldElement.classList.add("light-and-clean");
  	  } else if(id == 27) {
      	  fieldElement.classList.add("aqua-theme");
      } else {
          fieldElement.classList.add("s4-theme");
      }
  }
  
}
