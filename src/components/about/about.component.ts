import {Component} from '@angular/core';

@Component({
	selector: 'about',
	template: `<img class="profile" src="/public/images/close-portrait.png">
<p>Hi, I'm Brian, a junior in high school with a passion for developing websites. I'm currently interested in making a realistic procedural generated terrain in a web browser. If you'd like to hire me to create a website, feel free to contact me and I'll let you know if I think I can do it. </p>
<p>I'm best at creating websites using the Angular 2 framework and Three.JS, but I can create basic backends with user authentication.`,
	styleUrls: ['./about.component.css']
})
export class AboutComponent {
	
}