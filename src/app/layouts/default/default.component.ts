import { ChangeDetectorRef, Component, CUSTOM_ELEMENTS_SCHEMA, OnDestroy, OnInit, Input, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, NavigationEnd, Router, RouterModule } from '@angular/router';

import { MaterialModule } from '../../shared/modules/material.module';
import { MediaMatcher } from '@angular/cdk/layout';
import { filter, map, Subscription } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';
import { User } from '../../shared/models/user.model';
import { AuthService } from '../../shared/services/auth.service';
import { ApplicationModule } from 'src/app/shared/models/modules.model';
import { ModulesListComponent } from '../../select-module/modules-list/modules-list.component';
import { MatDialog } from '@angular/material/dialog';
import { ModulesContainerComponent } from 'src/app/shared/dialogs/modules-container/modules-container.component';
import { AppService } from 'src/app/app.service';


@Component({
  selector: 'default-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    MaterialModule,
    ModulesListComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class DefaultLayoutComponent implements OnInit, OnDestroy {
  @ViewChild("modalButton", { read: ElementRef }) modalButton: ElementRef;

  @Input() subModules: ApplicationModule[];
  @Input() modules: ApplicationModule[];
  selectedModule: ApplicationModule;

  themeColor: string;
  mobileQuery: MediaQueryList;
  currentRouteSubscription: Subscription;
  currentRoute: string;
  user: User;

  private _mobileQueryListener: () => void;
  dialogRef: any;

  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    public dialog: MatDialog,
    public appService: AppService
  ) {

    this.mobileQuery = media.matchMedia("(max-width: 768px)");
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addEventListener('change', this._mobileQueryListener);
    this.currentRouteSubscription = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => {
        return this.getRouteTitle(this.route.firstChild);
      })
    ).subscribe((title: string) => {
      this.currentRoute = title;
    });
  }

  ngOnInit(): void {
    this.user = this.authService.currentUser;
  }

  getRouteTitle(child) {
    while (child) {
      if (child.firstChild) {
        child = child.firstChild;
      } else if (child.snapshot.data && child.snapshot.data['title']) {
        return child.snapshot.data['title'];
      } else {
        return null;
      }
    }
    return null;
  }

  logout() {
    this.authService.logout();
  }

  OpenSelectModulesDialog() {
    this.dialogRef = this.dialog.open(ModulesContainerComponent,
      {
        data: {
          modules: this.modules,
          positionRelativeToElement: this.modalButton
        },
        height: '355px',
        width: '355px',
        hasBackdrop: false
      });

    this.dialogRef.afterClosed().subscribe((module: ApplicationModule) => {
      if (module) {
        this.router.navigate(['/' + module.path]);
        this.appService.selectedModule = module;
      }
    });
  }

  ngOnDestroy(): void {
    this.currentRouteSubscription.unsubscribe();
  }

}