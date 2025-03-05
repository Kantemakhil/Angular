
import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { MenuService } from './menu.service';

@Component({
  selector: 'main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.scss']
})
export class MainMenuComponent implements OnInit {
  @Input() nodes: any;

  constructor(private router: Router, private menuService: MenuService) { }

  ngOnInit() { }
  reDirect( link, ...parentnodes: any[] ) {
      if (link) {
        this.menuService.selectedMenuLink = link;
      }
      this.checkEachChild();
      link.active=true;
      for(var i=0;i<parentnodes.length;i++){
              parentnodes[i].active=true;
          }
          if (link.dynamicForm==null && link.insDashboard==null) {
                if (link.href !== null && link.href !== undefined && link.href !== '') {
                    this.router.navigate([link.href]);
                } 
            } else if(link.dynamicForm=='Y') {
                this.router.navigate(["FRMRENDER"], { queryParams: { 'form' :  link.href} });
            } else {
                this.router.navigate(["INSDSBVW"], { queryParams: { 'form' :  link.href} });
            }
          
      }
  
  
  checkEachChild() {
      if(this.nodes) {
          //Check Nodes Item has been implemented in route or not.
          for( var index=0; index<this.nodes.length; index++) {
             let node = this.nodes[index];
              this.makeNonActive(this.nodes, node, index);
              if(!node.children || node.children.length === 0) {
                  //Remove it from parent node if all children has been removed.
              this.nodes.splice(index, 1);
                  index--;
              }
          }
      }
  }
  makeNonActive(parents, node, indexP): any {
      if(node.children) {
          
          for( var i=0; i<node.children.length; i++) {
              var child = node.children[i];
              if(parents[i] !=undefined){
              parents[i].active=false;
                  }
              child.active=false;
              let route = this.makeNonActive(node.children, child, i);
              if((!route || route === undefined) && (!child.children || child.children.length==0)) {
                  node.children.splice(i, 1);
                  i--;
              }
          }
        } else {
          return 1;               
 
      }
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
        let lineElement = arrowKeyUp.parentElement.parentElement.parentElement;
        if(!arrowKeyUp.hidden) {
            lineElement.classList.add("sub-menu-ul-li-open");
        } else {
            lineElement.classList.remove("sub-menu-ul-li-open");
        } 
    }
    toggleG1Child(node) {
        const fieldElement = <HTMLInputElement>document.getElementById('g1Menu'+node.parentId+node.order);
        fieldElement.hidden = !fieldElement.hidden;
        const arrowKeyUp = <HTMLInputElement>document.getElementById('g1up'+node.id);
        const arrowKeyDown = <HTMLInputElement>document.getElementById('g1down'+node.id);
        arrowKeyUp.hidden = fieldElement.hidden;
        arrowKeyDown.hidden=!fieldElement.hidden;
    }
    
    toggleG2Child(node, index) {
        const fieldElement = <HTMLInputElement>document.getElementById('g'+index+'Menu'+node.parentId+node.order);
        fieldElement.hidden = !fieldElement.hidden;
        const arrowKeyUp = <HTMLInputElement>document.getElementById('g'+index+'up'+node.id);
        const arrowKeyDown = <HTMLInputElement>document.getElementById('g'+index+'down'+node.id);
        arrowKeyUp.hidden = fieldElement.hidden;
        arrowKeyDown.hidden=!fieldElement.hidden;
    }
    
    
}
