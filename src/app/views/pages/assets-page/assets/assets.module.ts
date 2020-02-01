// Angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import {MatTableModule} from '@angular/material';
import { MatPaginatorModule,MatInputModule, MatSortModule} from '@angular/material';


// Core Module

import { AssetsComponent } from './assets.component';


@NgModule({
	imports: [
		CommonModule,FormsModule,MatTableModule,
		MatPaginatorModule,MatInputModule, MatSortModule,
	RouterModule.forChild([
			{
				path: '',
				component: AssetsComponent
			},
		]),
	],
	providers: [],
	declarations: [
		AssetsComponent,
	]
})
export class AssetsModule {
}
