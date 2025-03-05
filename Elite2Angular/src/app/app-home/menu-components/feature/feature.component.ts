import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'feature',
  templateUrl: './feature.component.html',
  styleUrls: []
})
export class FeatureComponent implements OnInit {
    
    @Input() nodes: any;

    constructor(private router: Router) { }

    ngOnInit() {
    }
  
  changeTheme(id) {
    console.log(id);
      const fieldElement = <HTMLBodyElement>(document.getElementsByTagName('body')[0]);
      fieldElement.classList.remove("s4-theme","deeppurple-amber","pink-bluegrey","purple-green", "indigo-pink", "light-and-clean", "aqua-theme", "teal-color-theme", "orange-color-theme");
      if(id == 21) {
          fieldElement.classList.add("s4-theme");
      } else if(id == 22) {
          fieldElement.classList.add("deeppurple-amber");
      } else if(id == 23) {
          fieldElement.classList.add("pink-bluegrey");
      } else if(id == 24) {
          fieldElement.classList.add("purple-green");
      } else if(id == 25) {
          fieldElement.classList.add("indigo-pink");
      } else if(id == 26) {
      	  fieldElement.classList.add("light-and-clean");
  	  } else if(id == 27) {
      	  fieldElement.classList.add("aqua-theme");
      } else {
          fieldElement.classList.add("teal-color-theme");
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
  }
  reDirect(link) {
      if (link !== null && link !== undefined && link !== '') {
        this.router.navigate([link]);
      }
    }

}
