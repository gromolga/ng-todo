import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoComponent } from './todo.component';
import { TodoRoutes } from './todo.routing';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { TodoCreateFormComponent } from './todo-create-form/todo-create-form.component'
import { ModalComponent } from 'src/app/components/modal/modal.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { TodoListComponent } from './todo-list/todo-list.component';
import { HttpClientModule } from  '@angular/common/http';
import { TodoStorageService } from '../services/todo-storage.service';

@NgModule({
  imports: [
    CommonModule,
    TodoRoutes,
    FontAwesomeModule,
    FormsModule,
    NgSelectModule,
    HttpClientModule
  ],
  declarations: [
    TodoComponent,
    TodoCreateFormComponent,
    ModalComponent,
    TodoListComponent
  ],
  providers: [TodoStorageService]
})

export class TodoModule { }
