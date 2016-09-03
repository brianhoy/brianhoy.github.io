import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { Router, NavigationStart  } from '@angular/router'
import {NgStyle} from '@angular/common';

@Component({
	selector: 'app',
	directives: [NavbarComponent, NgStyle],
	template: `
	<navbar></navbar>
	<router-outlet></router-outlet>
	`,
	styleUrls: ['./app.component.css']
})
export class AppComponent {
	navigating: boolean;

	constructor(private router: Router) {
		this.navigating = false;
		this.router.events.subscribe((event) => {
			if(event instanceof NavigationStart) {
				//this.flipAnimation();
			}
		})
	}

}