import { Component, Output, Input, EventEmitter, OnInit } from '@angular/core';
import { Todo } from 'src/app/model/todo.model';
import { ActivatedRoute, Router, UrlSegment } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  @Output() deleteTodoCompleted: EventEmitter<boolean> = new EventEmitter<boolean>()
  @Output() Todos : Todo[] = []
  @Input() countPending :number = 0
  @Input() countComplete: number = 0
  currentUrl : string = ''

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }
  ngOnInit(): void {
    this.activatedRoute.url.subscribe((urlSegment) => {
      const currentUrl = urlSegment.join('/');
      switch (currentUrl) {
        case 'all':
          this.currentUrl = 'all'
          break
        case 'pending':
          this.currentUrl = 'pending'
          break
        case 'completed':
          this.currentUrl = 'completed'
          break
        default:

      }

    })
  }

  onDeleteTodoCompleted(){
    return this.deleteTodoCompleted.emit(true)
  }

  onRouter(path: string){
    console.log(path)
    this.router.navigate([path])
  }

}
