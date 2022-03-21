import { Component } from '@angular/core';
import {Router} from '@angular/router'; 

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  template:'<img src="assets.image/image/1200px-Montreal_Canadiens.svg.png">',
  
})
export class AppComponent {
  title = 'Canadiens du Montréal';
  constructor(private route:Router){} 

  ngOnInit(){
		this.route.navigate(['/home']);
	}
}

