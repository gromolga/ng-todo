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
import { HttpClient } from  "@angular/common/http";
import { Observable } from 'rxjs';

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

  constructor(private httpClient: HttpClient) { }

  completeToggle(todo:ITodoItem) {
    todo.completed = !todo.completed;
    this.saveInLocalstorage();
  }

  saveInLocalstorage():void {
    localStorage.setItem("todo-list", JSON.stringify(this.todoList));
  }

  todoObservable: Observable<any>

  ngOnInit() {
    this.todoObservable = this.httpClient
    .get("https://todo-api.grom-dev.kh.ua/api/todos/");
    this.todoObservable.subscribe((todoList)=>{
      this.todoList = todoList.map(this.mapTodo)
    })
  }

  mapTodo(todo):ITodoItem {
    return {
      id: todo.id,
      text: todo.text,
      completed: todo.completed,
      important: false,
      createdAt: todo.created_at,
      updatedAt: todo.updated_at
    }
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


