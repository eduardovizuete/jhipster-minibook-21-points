import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TwentyOnePointsSharedModule } from '../shared';

import { HOME_ROUTE, HomeComponent } from './';
import { NvD3Module } from 'ng2-nvd3';
import 'd3';
import 'nvd3';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
    imports: [
        TwentyOnePointsSharedModule,
        NvD3Module,
        BrowserAnimationsModule,
        RouterModule.forChild([ HOME_ROUTE ])
    ],
    declarations: [
        HomeComponent,
    ],
    providers: [
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TwentyOnePointsHomeModule {}
