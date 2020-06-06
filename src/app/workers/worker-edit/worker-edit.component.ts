import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router'; import { isNullOrUndefined } from 'util';
import { MyWorker } from 'src/app/shared/models/worker.model';
import { WorkerService } from 'src/app/shared/services/worker.service';

@Component({
  selector: 'app-worker-edit',
  templateUrl: './worker-edit.component.html',
  styleUrls: ['./worker-edit.component.css']
})
export class WorkerEditComponent implements OnInit {

  id: number;
  worker: MyWorker;
  workerForm: FormGroup;
  maskPhone = ['\+', '7', '(', /[1-9]/, /\d/, /\d/, ')', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  maskDate = [/[0-3]/, /\d/, '.', /[0-1]/, /\d/, '.', /[1-2]/, /\d/, /\d/, /\d/];

  constructor(
    private activatedRoute: ActivatedRoute,
    private workerService: WorkerService,
    private router: Router
  ) {
    this.activatedRoute.params.subscribe(params => {
      if (!isNullOrUndefined(params.id)) {
        this.id = +params.id;
      } else {
        this.id = null;
      }
    });
  }

  ngOnInit(): void {
    this.workerForm = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      surname: new FormControl(null, [Validators.required]),
      patronymic: new FormControl(null, [Validators.required]),
      phone: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      date: new FormControl(null, [Validators.required]),
      role: new FormControl(null, [Validators.required]),
    });
    this.getData();
  }

  async onSave() {
    this.workerForm.value.role = +this.workerForm.value.role;
    if (!isNullOrUndefined(this.id)) {
      try {
        await this.workerService.putWorker(this.id, this.workerForm.value);
      } catch (err) {
        console.error(err);
      }
    } else {
      try {
        let res = await this.workerService.postWorker(this.workerForm.value)
        this.router.navigate([this.router.url, res.id]);
        this.getData();
      } catch (err) {
        console.error(err);
      }
    }
  }
  async onDelete() {
    try {
      await this.workerService.deleteWorker(this.id);
    } catch (err) {
      console.error(err);
    }
    this.router.navigate(['/workers']);
  }

  async getData() {
    if (!isNullOrUndefined(this.id)) {
      try {
        let worker = this.workerService.getWorker(this.id);
        this.worker = await worker;
      } catch (err) {
        console.log(err);
      }
      this.workerForm.patchValue({
        name: this.worker.name,
        surname: this.worker.surname,
        patronymic: this.worker.patronymic,
        phone: this.worker.phone,
        email: this.worker.email,
        date: this.worker.date,
        role: this.worker.role
      });
    }
  }
}
