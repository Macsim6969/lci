import { setMaintenanceDashboardData, setMaintenanceList } from './../../../store/actions/maintenance.actions';
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { StoreInterface } from "../../../store/model/store.model";
import { SalaryDefinition } from "../../../modules/payroll/@shared/interfaces/salary.interface";
import { MaintanceList, MaintenanceDashboard } from '../../../modules/maintenance/@shared/interfaces/maintenance.interface';
import { getDatabase, onValue, ref } from 'firebase/database';


@Injectable()

export class MaintenanceApiService {
  private baseUrl = 'https://lcii-cd674-default-rtdb.firebaseio.com';
  private db = getDatabase();
  constructor(
    private http: HttpClient,
    private store: Store<{ store: StoreInterface }>,) {
    this.setupRealtimeListeners();
  }

  private setupRealtimeListeners() {
    const maintenanceRef = ref(this.db, 'maintenance');
    onValue(maintenanceRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const newData: MaintenanceDashboard = {
          scheduled: Object.values(data).length,
          completed: Object.values((data as MaintanceList)).filter(e => e.status === 'Close').length,
          pending: Object.values((data as MaintanceList)).filter(e => e.status === 'Open').length,
          overdue: Object.values((data as MaintanceList)).filter(e => {
            const taskDate = new Date(e.date);
            taskDate.setHours(0, 0, 0, 0);
            return taskDate < today;
          }).length
        };
        this.store.dispatch(setMaintenanceDashboardData({ data: newData }));
        this.store.dispatch(setMaintenanceList({ data: Object.values(data) }));
      }
    });
  }

  public updateMaintenanceDashboard(data: MaintanceList) {
    return this.http.post<MaintanceList[]>(`${this.baseUrl}/maintenance.json`, data).subscribe(() => {
      this.getMaintenanceDashboard();
    })
  }

  public updateMaintenanceList(key: string, data: MaintanceList) {
    return this.http.put<MaintanceList[]>(`${this.baseUrl}/maintenance/${key}.json`, data).subscribe(() => {
      this.getMaintenanceDashboard();
    })
  }

  public getMaintenanceDashboard() {
    return this.http.get<MaintanceList[]>(`${this.baseUrl}/maintenance.json`).subscribe((data) => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const newData: MaintenanceDashboard = {
        scheduled: Object.values(data).length,
        completed: Object.values(data).filter(e => e.status === 'Close').length,
        pending: Object.values(data).filter(e => e.status === 'Open').length,
        overdue: Object.values(data).filter(e => {
          const taskDate = new Date(e.date);
          taskDate.setHours(0, 0, 0, 0);
          return taskDate < today;
        }).length
      }
      this.store.dispatch(setMaintenanceDashboardData({ data: newData }));
      this.store.dispatch(setMaintenanceList({ data: data }))

    })
  }
}