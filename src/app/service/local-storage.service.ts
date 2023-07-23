import { Injectable } from '@angular/core';
import { Todo } from '../model/todo.model';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  private readonly localStorageKey = 'mydayapp-angular'
  // private Todos : Todo[] = [
  //   {
  //     id: '01',
  //     title:'Learn JavaScript',
  //     completed: true,
  //     editing: false
  //   },
  //   {
  //     id: '02',
  //     title:'Buy a unicorn',
  //     completed: false,
  //     editing: false
  //   },
  //   {
  //     id: '03',
  //     title:'Make dishes',
  //     completed: false,
  //     editing: false
  //   }
  // ]

  constructor( ) {
    // this.setTodos(this.Todos)
  }

  public setTodos(todos: Todo[]): void {
    localStorage.setItem(this.localStorageKey, JSON.stringify(todos))
  }

  public getTodos(): Todo[] {
    const aux = localStorage.getItem(this.localStorageKey)
    if (aux) {
      return JSON.parse(aux)
    }
    return []
  }

}
