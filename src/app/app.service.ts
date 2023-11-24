import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  apiPath: string = environment.apiPath;
  applicationModules: any[];

  constructor(
    private http: HttpClient
  ) {
    this.applicationModules = [
      {
        module: "admin",
        path: "admin",
        title: "Admin",
        icon: "settings",
        group: {
          id: 'admin',
          label: 'Manage'
        },
        allow: ['super', 'admin'],
        sub: [
          {
            module: "users",
            path: "users",
            title: "Users",
            icon: "people",
            allow: ['super', 'admin'],
          },
          {
            module: "roles",
            path: "roles",
            title: "Roles",
            icon: "accessibility",
            allow: ['super', 'admin'],
          },
          {
            module: "permissions",
            path: "permissions",
            title: "Permissions",
            icon: "lock_open",
            allow: ['super'],
          }
        ]
      }
    ];
  }

  getMenuItems(module) {
    return this.applicationModules.find(m => module === m.module).sub;
  }

}

// UI Modules back in UI + refactoring
// to access modules role is reqired
// for all other things permissions are required
