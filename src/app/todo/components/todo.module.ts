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

@NgModule({
  imports: [
    CommonModule,
    TodoRoutes,
    FontAwesomeModule,
    FormsModule,
    NgSelectModule
  ],
  declarations: [
    TodoComponent,
    TodoCreateFormComponent,
    ModalComponent,
    TodoListComponent
  ]
})

export class TodoModule { }
