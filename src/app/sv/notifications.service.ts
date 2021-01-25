import { ConfigService } from './config.service';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { firebase } from '@firebase/app';
import '@firebase/messaging';
//import {ConfigService} from './config.service';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  constructor(public configSv:ConfigService) { }
  init(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      navigator.serviceWorker.ready.then((registration) => {
        // Don't crash an error if messaging not supported
        if (!firebase.messaging.isSupported()) {
          resolve();
          return;
        }

        const messaging = firebase.messaging();

        // Register the Service Worker
        messaging.useServiceWorker(registration);

        // Initialize your VAPI key
        messaging.usePublicVapidKey(
          environment.firebase.vapidKey
        );

        // Optional and not covered in the article
        // Listen to messages when your app is in the foreground
        messaging.onMessage((payload) => {
          console.log(payload);
        });
        // Optional and not covered in the article
        // Handle token refresh
        messaging.onTokenRefresh(() => {
          messaging.getToken().then(
            (refreshedToken: string) => {
              console.log(refreshedToken);
            }).catch((err) => {
              console.error(err);
            });
        });

        resolve();
      }, (err) => {
        reject(err);
      });
    });
  }

  requestPermission(): Promise<void> {
    return new Promise<void>(async (resolve) => {
      if (!Notification) {
        resolve();
        return;
      }
      if (!firebase.messaging.isSupported()) {
        resolve();
        return;
      }
      try {
        const messaging = firebase.messaging();
        await messaging.requestPermission();

        const token: string = await messaging.getToken();
       this.configSv.token = token;
       console.log('User notifications token:', token);
      } catch (err) {
        // No notifications granted
      }

      resolve();
    });
  }
}
