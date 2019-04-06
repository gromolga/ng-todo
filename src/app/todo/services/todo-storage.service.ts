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
      map(this.mapTodoList)
    );
  }

  public create(text: String): Observable<ITodoItem> {
    return this.httpClient
    .post("https://todo-api.grom-dev.kh.ua/api/todos/", {
      text,
      completed: 0
    }).pipe(
      map(this.mapTodo)
    )
  }

  public remove(id: Number): Observable<any> {
    return this.httpClient
    .delete("https://todo-api.grom-dev.kh.ua/api/todos/" + id)
  }

  private mapTodoList = (todoList): Array<ITodoItem> => {
    return todoList.map(this.mapTodo);
  }

  public mapTodo(todo): ITodoItem {
    return {
      id: todo.id,
      text: todo.text,
      completed: todo.completed,
      important: false,
      createdAt: todo.created_at * 1000,
      updatedAt: todo.updated_at * 1000
    }
  }
}

