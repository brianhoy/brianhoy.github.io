import { NgModule, enableProdMode }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';

import { routing,
         appRoutingProviders } from './components/app/app.routing';

import { AppComponent }       from './components/app/app.component';
import { AboutComponent }       from './components/about/about.component';
import { WorkComponent }       from './components/work/work.component';
import { ContactComponent }       from './components/contact/contact.component';

enableProdMode();

@NgModule({
	imports: [
		BrowserModule,
		FormsModule,
   	 	routing
	],
	declarations: [
		AppComponent,
		AboutComponent,
		WorkComponent,
		ContactComponent
	],
	providers: [
		appRoutingProviders	
	],
	bootstrap: [ AppComponent ]
})
export class AppModule { }
