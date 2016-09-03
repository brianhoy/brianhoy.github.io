import { Component } from '@angular/core';
import { ProjectModel } from '../../models/project.model';

@Component({
	selector: 'project',
	inputs: ['project'],
	template: `
	<a href="{{project.link}}">
		<div class="overlay"></div>
		<h3>{{project.title}}</h3>
		<img src="{{project.image}}">
		<p>{{project.description}}</p>
	</a>
	`,
	styleUrls: ['./project.component.css']
})
export class ProjectComponent {
	private project;
}