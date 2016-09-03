import { Component } from '@angular/core';
import { ProjectComponent } from './project.component';
import { ProjectModel } from '../../models/project.model';

@Component({
	selector: 'work',
	directives: [ProjectComponent],
	template: `
	<project [project]='project' *ngFor="let project of projects"></project>
	`,
	styleUrls: ['./work.component.css']
})
export class WorkComponent {
	private projects: Array<ProjectModel>

	constructor() {
		this.projects = new Array<ProjectModel>();
		this.projects.push(new ProjectModel("Noise Visualizer", "public/images/noise-visualizer.png", 
			"A tool built with Angular and Three.JS for visualizing Simplex and Cellular noise through heightmaps.", 
			"https://brianhoy.github.io/noise-visualizer/"));
		this.projects.push(new ProjectModel("Task Manager", "public/images/taskmanager.png", 
			"A collaborative effort to make a task manager with members of the weeklydev group. I wrote the Angular. ", 
			"http://blue-eagles-todo.herokuapp.com/"));
		this.projects.push(new ProjectModel("Neural Network Tic Tac Toe", "public/images/tictactoe.png", 
			"A sophomore-year science fair project that about training a neural network to play Tic Tac Toe.", 
			"public/sites/tictactoe/index.html"));
		this.projects.push(new ProjectModel("Wakefern Floral", "public/images/wakefern.png", 
			"A flower marketing website originally intended for Wordpress. My sister, who works at a flower company, asked me to make this website for her client.", 
			"public/sites/wakefern/index.html"));
	}
}