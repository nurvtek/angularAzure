import { Component, OnInit, Input, Output, EventEmitter, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from './app.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  modalRef: BsModalRef;
  constructor(private modalService: BsModalService, private route: ActivatedRoute,
    private router: Router, private appService: AppService) { }

  @Input() tasks: any[];
  @Output() deleteTask = new EventEmitter<any>();
  @Output() editTask = new EventEmitter<any>();

  editingId: any;

  editForm = new FormGroup({
    id: new FormControl('', Validators.nullValidator && Validators.required),
    task: new FormControl('', Validators.nullValidator && Validators.required),
    assignee: new FormControl('', Validators.nullValidator && Validators.required),
    status: new FormControl('', Validators.nullValidator && Validators.required)
  });

  ngOnInit(): void {
  }

  gotoDetail(task) {
    localStorage.setItem('task', JSON.stringify(task));
    this.router.navigate(['detail']);
  }

  onSubmit() {
    console.log(this.editForm.value);
    this.modalService.hide(1);
    this.editTask.emit(this.editForm.value);
  }

  delTask(task) {
    this.deleteTask.emit(task);
  }

  openModal(template: TemplateRef<any>, task) {
    this.editingId = task.id;
    this.editForm.setValue({id: task.id, task: task.task, assignee: task.assignee, status: task.status});
    this.modalRef = this.modalService.show(template);
  }

}
