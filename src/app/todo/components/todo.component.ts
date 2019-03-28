import { Component, OnInit } from '@angular/core';
import { faCalendar, faThumbsDown } from '@fortawesome/free-solid-svg-icons';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { ITodoItem } from '../models/ITodoItem'

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})

export class TodoComponent implements OnInit {
  public faCalendar = faCalendar;
  public faStar = faStar;
  public faTrash = faTrash;

  public starToggleStatus:boolean = true;

  public todoList:Array<ITodoItem> = [];

  public starTitle = "Mark with a star"

  public get uncompletedTodoList() {
    return this.todoList.filter(todo => !todo.completed);
  }

  public get completedTodoList() {
    return this.todoList.filter(todo => todo.completed);
  }

  starToggle(todo:ITodoItem) {
    todo.important = !todo.important;
    this.saveInLocalstorage();
    if(this.starTitle === "Mark with a star") {
      this.starTitle = "Remove star"
    } else {
      this.starTitle = "Mark with a star"
    }
  }

  constructor() {}

  completeToggle(todo:ITodoItem) {
    todo.completed = !todo.completed;
    this.saveInLocalstorage();
  }

  saveInLocalstorage():void {
    localStorage.setItem("todo-list", JSON.stringify(this.todoList));
  }

  ngOnInit() {
    const todoList:Array<ITodoItem> = JSON.parse(localStorage.getItem("todo-list"));
    if (todoList) {
      this.todoList = todoList;
    }
  }

  onTodoCreated(todo:ITodoItem) {
    this.todoList.push(todo);
    this.saveInLocalstorage();
  }

  removeTodo(todo) {
    this.todoList = this.todoList.filter(item => item !== todo)
  }

}


