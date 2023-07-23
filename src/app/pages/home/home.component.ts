import { Component, OnInit } from '@angular/core';
import { Todo } from 'src/app/model/todo.model';
import { ActivatedRoute, Router, UrlSegment } from '@angular/router';
import { LocalStorageService } from 'src/app/service/local-storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})

export class HomeComponent implements OnInit {

  countPending :number = 0
  count: number = 0
  Todos : Todo[] = []
  filterTodos : Todo[] = []
  newTodo : Todo | null = null
  editName : string = ''
  currentUrl : string = ''

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private localStorageService: LocalStorageService
  ) {
    this.Todos = this.localStorageService.getTodos()
  }
  ngOnInit(): void {
    this.Todos = this.localStorageService.getTodos()
    this.activatedRoute.url.subscribe((urlSegment) => {
      this.currentUrl = urlSegment.join('/')
      // console.log(currentUrl)
      this.filterTodosByStatus(this.currentUrl)
    })
  }

  private filterTodosByStatus(status: string): void {
    switch (status) {
      case 'all':
        this.filterTodos = this.Todos
        break
      case 'pending':
        this.filterTodos = this.Todos.filter(data => !data.completed)
        break
      case 'completed':
        this.filterTodos = this.Todos.filter(data => data.completed)
        break
      default:
        this.router.navigate(['/all'])
    }
    this.countPending = this.Todos.filter(data => !data.completed).length
    this.count = this.Todos.length
    this.localStorageService.setTodos(this.Todos)
  }

  newTodoAdded(todo : Todo){
    // Format "1" to "01"
    todo.id = ( this.Todos.length + 1 ).toString().padStart(2, '0')
    console.log(todo)
    this.Todos.push(todo)
    this.filterTodosByStatus(this.currentUrl)
  }

  onEdit(todo: Todo){
    this.editName = todo.title
    this.Todos = this.Todos.map(data => { return {...data, editing: false} })
    const index = this.Todos.findIndex(data => data.id === todo.id)
    if (index !== -1) {
      this.Todos[index].editing = true
    }
    this.filterTodosByStatus(this.currentUrl)
  }

  onEditName(todo : Todo){
    const index = this.Todos.findIndex(data => data.id === todo.id)
    if (index !== -1) {
      this.Todos[index].title = this.editName.trim()
      this.Todos[index].editing = false
    }
    this.filterTodosByStatus(this.currentUrl)
  }

  onComplete(todo: Todo){
    const index = this.Todos.findIndex(data => data.id === todo.id)
    if (index !== -1) {
      this.Todos[index].completed = !this.Todos[index].completed
    }
    this.filterTodosByStatus(this.currentUrl)
  }

  onCancelEdit(todo : Todo){
    const index = this.Todos.findIndex(data => data.id === todo.id)
    if (index !== -1) {
      this.Todos[index].editing = false
    }
  }

  onDeleteTodoCompleted(){
    this.Todos = this.Todos.filter(data => !data.completed)
    this.filterTodosByStatus(this.currentUrl)
  }

  onDeleteTodo(todo: Todo){
    this.Todos = this.Todos.filter(data => data.id !== todo.id)
    this.filterTodosByStatus(this.currentUrl)
  }

}

