import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Account, LoginModalService, Principal } from '../shared';
import { PreferencesService } from '../entities/preferences/preferences.service';
import { Preferences } from '../entities/preferences/preferences.model';
import { PointsService } from '../entities/points/points.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
    selector: 'jhi-home',
    templateUrl: './home.component.html',
    styleUrls: [
        'home.scss'
    ]

})
export class HomeComponent implements OnInit, OnDestroy {
    account: Account;
    modalRef: NgbModalRef;
    preferences: Preferences;
    pointsThisWeek: any = {};
    pointsPercentage: number;
    eventSubscriber: Subscription;

    constructor(
        private principal: Principal,
        private loginModalService: LoginModalService,
        private eventManager: JhiEventManager,
        private preferencesService: PreferencesService,
        private pointsService: PointsService
    ) {
    }

    ngOnInit() {
        this.principal.identity().then((account) => {
            this.account = account;
            if (this.isAuthenticated()) {
                this.getUserData();
            }
        });
        this.registerAuthenticationSuccess();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerAuthenticationSuccess() {
        this.eventManager.subscribe('authenticationSuccess', (message) => {
            this.principal.identity().then((account) => {
                this.account = account;
                this.getUserData();
            });
        });
        this.eventSubscriber = this.eventManager.subscribe('pointsListModification', () => this.getUserData());
        this.eventSubscriber = this.eventManager.subscribe('preferencesListModification', () => this.getUserData());
        this.eventSubscriber = this.eventManager.subscribe('bloodPressureListModification', () => this.getUserData());
        this.eventSubscriber = this.eventManager.subscribe('weightListModification', () => this.getUserData());
    }

    getUserData() {
        // Get preferences
        this.preferencesService.user().subscribe((preferences) => {
            this.preferences = preferences;

            // Get points for the current week
            this.pointsService.thisWeek().subscribe((points: any) => {
                // points = points.json;
                points = points.body;
                console.log('getUserData -> pointsperweek: ' + points.points);
                this.pointsThisWeek = points;
                this.pointsPercentage = (points.points / this.preferences.weekly_goal) * 100;

                // calculate success, warning, or danger
                if (points.points >= preferences.weekly_goal) {
                    this.pointsThisWeek.progress = 'success';
                } else if (points.points < 10) {
                    this.pointsThisWeek.progress = 'danger';
                } else if (points.points > 10 && points.points < this.preferences.weekly_goal) {
                    this.pointsThisWeek.progress = 'warning';
                }
            });
        });
    }

    isAuthenticated() {
        return this.principal.isAuthenticated();
    }

    login() {
        this.modalRef = this.loginModalService.open();
    }
}
