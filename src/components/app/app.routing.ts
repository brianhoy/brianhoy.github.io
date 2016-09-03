import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule }   from '@angular/router';
import { AboutComponent } from '../about/about.component';
import { WorkComponent } from '../work/work.component';
import { ContactComponent } from '../contact/contact.component';

const appRoutes: Routes = [
  { path: 'work', component: WorkComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'about', component: AboutComponent },
  { path: '**', component: AboutComponent },
];

export const appRoutingProviders: any[] = [

];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);