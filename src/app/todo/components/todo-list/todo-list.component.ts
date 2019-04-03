import { Component, Input, EventEmitter, Output } from '@angular/core';
import { ITodoItem } from '../../models/ITodoItem';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent {

  public faStar = faStar;
  public faTrash = faTrash;

  @Input() public todoList: Array<ITodoItem>;

  @Output() removeTodo: EventEmitter<ITodoItem> = new EventEmitter();
  @Output() completeToggle: EventEmitter<ITodoItem> = new EventEmitter();
  @Output() starToggle: EventEmitter<ITodoItem> = new EventEmitter();

}
