import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Todo } from 'src/app/model/todo.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  @Output() newTodoAdded: EventEmitter<Todo> = new EventEmitter<Todo>()
  @Input() count :number = 0

  newNameTodo : string = ''

  constructor() { }

  addTodo(){
    if(this.newNameTodo.trim().length === 0){
      return
    }

    const newTodo : Todo = {
      id: '01',
      title: this.newNameTodo.trim(),
      completed: false
    }

    this.newNameTodo = ''
    this.newTodoAdded.emit(newTodo)

  }

}
