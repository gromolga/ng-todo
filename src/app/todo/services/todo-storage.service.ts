import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ITodoItem } from '../models/ITodoItem';
import { map } from 'rxjs/operators';

@Injectable()
export class TodoStorageService {

  public getTodoListObservable: Observable<Array<ITodoItem>>

  constructor(private httpClient: HttpClient) {
    this.getTodoListObservable = this.httpClient
    .get("https://todo-api.grom-dev.kh.ua/api/todos/")
    .pipe(
      map(this.mapTodo)
    );
  }

  private mapTodo(todoList): Array<ITodoItem> {
    return todoList.map(todo => {
      return {
        id: todo.id,
        text: todo.text,
        completed: todo.completed,
        important: false,
        createdAt: todo.created_at * 1000,
        updatedAt: todo.updated_at * 1000
      }
    });
  }
}

