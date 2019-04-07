import { Component, Input, EventEmitter, Output } from '@angular/core';
import { ITodoItem } from '../../models/ITodoItem';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { TodoStorageService } from '../../services/todo-storage.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent {

  public faStar = faStar;
  public faTrash = faTrash;
  public faEdit = faEdit;
  public editTodoPopupValue:boolean = false;
  public editTodoText = "";
  public updateTodoId:number; 

  constructor(private todoStorage: TodoStorageService) {}

  public editTodoPopup(todo: ITodoItem) {
    this.editTodoPopupValue = !this.editTodoPopupValue;
    this.editTodoText = todo.text;
    this.updateTodoId = todo.id;
  }

  public closePopup() {
    this.editTodoPopupValue = !this.editTodoPopupValue;
  }

  public updateTodo() {
    this.todoStorage.updateTodo(this.updateTodoId, this.editTodoText)
    .subscribe(
      (todo: ITodoItem) => {
        this.todoUpdated.emit(todo);
        this.editTodoPopupValue = false;
      },
      error => console.log(error)
    )
  }

  @Input() public todoList: Array<ITodoItem>;

  @Output() todoUpdated: EventEmitter<ITodoItem> = new EventEmitter();
  @Output() removeTodo: EventEmitter<ITodoItem> = new EventEmitter();
  @Output() completeToggle: EventEmitter<ITodoItem> = new EventEmitter();
  @Output() starToggle: EventEmitter<ITodoItem> = new EventEmitter();
}
