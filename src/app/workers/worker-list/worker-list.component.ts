import { Component, OnInit } from '@angular/core'; import { isNullOrUndefined } from 'util';
import { Router } from '@angular/router';
import { MyWorker, MyWorkerRole } from 'src/app/shared/models/worker.model';
import { WorkerService } from 'src/app/shared/services/worker.service';

@Component({
  selector: 'app-worker-list',
  templateUrl: './worker-list.component.html',
  styleUrls: ['./worker-list.component.css']
})
export class WorkerListComponent implements OnInit {

  workers: MyWorker[];
  workersRoles = MyWorkerRole;

  constructor(private workerService: WorkerService, private router: Router) { }

  searchStr = '';
  sortType = 0;
  isLoaded = false;

  ngOnInit(): void {
    this.getData().then(() => this.isLoaded = true);
  }

  onAddProfile() {
    this.router.navigate([this.router.url, 'profile']);
  }
  onLinkProfile(id: number) {
    this.router.navigate([this.router.url, 'profile', id]);
  }

  async getData() {
    try {
      let workers = this.workerService.getAll();
      this.workers = isNullOrUndefined(await workers) ? [] : await workers;
    } catch (err) {
      console.error(err);
    }
  }
  getRole(role: number) {
    switch (role) {
      case 0: return 'IT отдел';
      case 1: return 'Отдел продаж';
      case 2: return 'Отдел доставки';
      case 3: return 'Юридический отдел';
      default: return 'Ошибка отдела';
    }
  }
}