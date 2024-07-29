import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { getDatabase, onValue, ref } from "firebase/database";
import { StoreInterface } from "../../../store/model/store.model";
import { sendNotificationData } from "../../../store/actions/notification.actions";
import { Notification } from "../../../modules/notifications/@shared/interfaces/notification.interface";


@Injectable()

export class NotificationApiService {
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
      this.store.dispatch(sendNotificationData({ data: data }));
    });
  }



  public updateNotification(idUser: string, data: Notification) {
    return this.http.post<Notification>(`${this.baseUrl}/users/${idUser}/notification.json`, data).subscribe(() => {
      this.getNotification(idUser);
    })
  }

  public updateMaintenanceList(idUser: string, key: string, data: Notification) {
    return this.http.put<Notification>(`${this.baseUrl}/users/${idUser}/notification/${key}.json`, data).subscribe(() => {
      this.getNotification(idUser);
    })
  }

  public getNotification(idUser: string) {
    return this.http.get<Notification[]>(`${this.baseUrl}/users/${idUser}/notification.json`).subscribe((data: Notification[]) => {
      this.store.dispatch(sendNotificationData({ data: data }))
    })
  }
}