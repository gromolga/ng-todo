import { Component, OnInit } from '@angular/core';
import { 
  faCalendar,
  faStar,
  faTrash,
  faSort,
  faSortAlphaDown,
  faCalendarAlt,
  faCheck
 } from '@fortawesome/free-solid-svg-icons';
import { ITodoItem } from '../models/ITodoItem';
import { TodoStorageService } from '../services/todo-storage.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})

export class TodoComponent implements OnInit {
  public faCalendar = faCalendar;
  public faStar = faStar;
  public faTrash = faTrash;
  public faSort = faSort;
  public faSortAlphaDown = faSortAlphaDown;
  public faCalendarAlt = faCalendarAlt;
  public faCheck = faCheck;

  items = [
    {id: 'none', name: 'Sorting', faClass: faSort},
    {id: 'alphabet', name: 'alphabetically', faClass: faSortAlphaDown},
    {id: 'creationDate', name: 'by creation date', faClass: faCalendarAlt},
    {id: 'executionDate', name: 'by execution date', faClass: faCheck},
    {id: 'inImportance', name: 'in importance', faClass: faStar}
  ];

  public starToggleStatus:boolean = true;

  public todoList:Array<ITodoItem> = [];

  public get sorted() {
    if (this.sortId === "alphabet") {
      return this.todoList.sort(
        (a, b) => {
          var textA = a.text.toLowerCase(), textB = b.text.toLowerCase()
          if (textA > textB) 
            return -1
          else if (textA < textB)
            return 1
          return 0 
          }
      );
    } else if (this.sortId === "creationDate") {
      return this.todoList.sort(
        (a, b) => {
          return b.createdAt - a.createdAt
        }
      )
    } else if (this.sortId === "executionDate") {
      return this.todoList.sort(
        (a, b) => {
          return b.updatedAt - a.updatedAt
        }
      )
    } else if (this.sortId === "inImportance") {
      return this.todoList.sort(
        (a, b) => {
          return +b.important - +a.important
        }
      )
    }
    return this.todoList;
  }

  public get uncompletedTodoList() {
    return this.sorted.filter(todo => !todo.completed);
  }

  public get completedTodoList() {
    return this.sorted.filter(todo => todo.completed);
  }

  public sortId = '';

  starToggle(todo:ITodoItem) {
    todo.important = !todo.important;
    todo.updatedAt = Date.now();
    this.saveInLocalstorage();
  }

  onSortChanged($event) {
    this.sortId = $event.id;
  }

  constructor(
    private todoStorage: TodoStorageService
  ) {}

  completeToggle(todo:ITodoItem) {
    todo.completed = !todo.completed;
    this.saveInLocalstorage();
  }

  saveInLocalstorage():void {
    localStorage.setItem("todo-list", JSON.stringify(this.todoList));
  }

  ngOnInit() {
    this.todoStorage.getTodoListObservable.subscribe(todoList => {
      this.todoList = todoList;
    })
  }

  onTodoCreated(todo:ITodoItem) {
    this.todoList.push(todo);
    this.saveInLocalstorage();
  }

  removeTodo(todo) {
    this.todoList = this.todoList.filter(item => item !== todo);
    this.saveInLocalstorage();
  }
}


