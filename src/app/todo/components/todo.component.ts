import { Component, OnInit } from '@angular/core';
import { ITodoItem } from '../models/ITodoItem';
import { TodoStorageService } from '../services/todo-storage.service';
import { SortableService, SortOption } from '../services/sortable.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})

export class TodoComponent implements OnInit {

  public items: Array<SortOption> = this.sortableService.sortOption;

  public starToggleStatus:boolean = true;

  public todoList:Array<ITodoItem> = [];

  public sortId: String = '';

  constructor(
    private todoStorage: TodoStorageService,
    private sortableService: SortableService
  ) {}

  public get sorted(): Array<ITodoItem> {
    return this.sortableService.sorting(this.todoList, this.sortId)
  }

  public get uncompletedTodoList(): Array<ITodoItem> {
    return this.sorted.filter(todo => !todo.completed);
  }

  public get completedTodoList(): Array<ITodoItem> {
    return this.sorted.filter(todo => todo.completed);
  }

  public starToggle(todo:ITodoItem) {
    todo.important = !todo.important;
    todo.updatedAt = Date.now();
    this.saveInLocalstorage();
  }

  public onSortChanged(sortOption: SortOption) {
    this.sortId = sortOption.id;
  }

  public completeToggle(todo: ITodoItem) {
    todo.completed = !todo.completed;
    this.saveInLocalstorage();
  }

  public saveInLocalstorage():void {
    localStorage.setItem("todo-list", JSON.stringify(this.todoList));
  }

  public ngOnInit() {
    this.todoStorage.getTodoListObservable
    .subscribe((todoList: Array<ITodoItem>) => {
      this.todoList = todoList;
    })
  }

  public onTodoCreated(todo: ITodoItem) {
    this.todoList.push(todo);
    this.saveInLocalstorage();
  }

  public removeTodo(todo: ITodoItem) {
    this.todoList = this.todoList.filter(item => item !== todo);
    this.saveInLocalstorage();
  }
}

