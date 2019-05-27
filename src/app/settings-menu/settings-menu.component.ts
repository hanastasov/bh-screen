import { Component, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-settings-menu',
    styleUrls: ['./settings-menu.component.scss'],
    templateUrl: './settings-menu.component.html'
})

export class SettingsMenuComponent {
    @Output()
    public displayDensitySelected = new EventEmitter<any>();

    public changeDisplayDensity(event: any) {
       this.displayDensitySelected.emit(event.target.innerText.toLowerCase());
    }
}
