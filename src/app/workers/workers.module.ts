import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { TextMaskModule } from 'angular2-text-mask';

import { WorkersRoutingModule } from './workers-routing.module';
import { WorkersComponent } from './workers.component';
import { WorkerListComponent } from './worker-list/worker-list.component';
import { WorkerEditComponent } from './worker-edit/worker-edit.component';
import { SearchFilterPipe } from '../shared/pipes/search-filter.pipe';
import { SortFilterPipe } from '../shared/pipes/sort-filter.pipe';

@NgModule({
  declarations: [WorkersComponent, WorkerListComponent, WorkerEditComponent, SearchFilterPipe, SortFilterPipe],
  imports: [
    CommonModule,
    WorkersRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    TextMaskModule
  ]
})
export class WorkersModule { }
