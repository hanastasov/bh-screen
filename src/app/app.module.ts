import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { IgxInputGroupModule, IgxIconModule, IgxButtonModule, IgxRippleModule, IgxGridModule, IgxAvatarModule,
    IgxOverlayService, IgxToggleModule} from 'igniteui-angular';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SettingsMenuComponent } from './settings-menu/settings-menu.component';

@NgModule({

    declarations: [
        AppComponent,
        SettingsMenuComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        IgxInputGroupModule,
        IgxIconModule,
        IgxToggleModule,
        IgxButtonModule,
        IgxGridModule,
        IgxRippleModule,
        IgxAvatarModule,
        CommonModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        FormsModule
    ],
    providers: [IgxOverlayService],
    bootstrap: [AppComponent],
    exports: [
        RouterModule
    ]
})
export class AppModule {
}
