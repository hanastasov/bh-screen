import { Component, ViewChild, OnInit, ElementRef } from '@angular/core';
import { athletesData } from './data';
import { IgxGridComponent, HorizontalAlignment, VerticalAlignment,
  CloseScrollStrategy, IgxToggleDirective, AutoPositionStrategy } from 'igniteui-angular';
import { AnimationMetadata, style, animate, AnimationReferenceMetadata, animation } from '@angular/animations';
import { SettingsMenuComponent } from './settings-menu/settings-menu.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
    @ViewChild('grid1') public grid1: IgxGridComponent;
    public data: any[];
    title = 'BakerHughes';

    @ViewChild('target')
    public target: ElementRef;

    @ViewChild('settingsMeny')
    public settingsMenu: SettingsMenuComponent;

    @ViewChild(IgxToggleDirective) public igxToggle: IgxToggleDirective;

    public density = 'cosy';

    public positionSettings = {
        horizontalStartPoint: HorizontalAlignment.Left,
        verticalStartPoint: VerticalAlignment.Bottom,
        horizontalDirection: HorizontalAlignment.Left
    };

    public overlaySettings = {
      closeOnOutsideClick: false,
      modal: false,
      positionStrategy: new AutoPositionStrategy(this.positionSettings),
      scrollStrategy: new CloseScrollStrategy()
    };

    public ngOnInit(): void {
      this.data = athletesData;
    }

    public showMenu(horizontalDirection: HorizontalAlignment, verticalDirection: VerticalAlignment) {
        this.overlaySettings.positionStrategy.settings.target = this.target.nativeElement;
        this.igxToggle.toggle(this.overlaySettings);
    }

    public mouseenter(ev) {
      const openAnimationMetaData: AnimationMetadata[] = [
          style({ opacity: `0`, transform: `scale(0.5)`, transformOrigin: `50% 50%` }),
          animate(`100ms`, style({ opacity: `1`, transform: `scale(1)`, transformOrigin: `50% 50%` }))
      ];
      const openAnimation: AnimationReferenceMetadata = animation(openAnimationMetaData);
      this.overlaySettings.positionStrategy.settings.openAnimation = openAnimation;
      this.overlaySettings.closeOnOutsideClick = false;

      const closeAnimationMetaData: AnimationMetadata[] = [
          style({ opacity: `1`, transform: `scale(1)`, transformOrigin: `50% 50%` }),
          animate(`100ms`, style({ opacity: `0`, transform: `scale(0.5)`, transformOrigin: `50% 50%` }))
      ];
      const closeAnimation: AnimationReferenceMetadata = animation(closeAnimationMetaData);
      this.overlaySettings.positionStrategy.settings.closeAnimation = closeAnimation;
      this.overlaySettings.positionStrategy.settings.target = this.target.nativeElement;
      this.overlaySettings.positionStrategy.settings.horizontalDirection = HorizontalAlignment.Left;
      this.igxToggle.open(this.overlaySettings);
  }

  public mouseleave(ev) {
     this.igxToggle.close();
  }

  public changeDisplayDensity(event: any) {
    this.density = event;
  }

}
