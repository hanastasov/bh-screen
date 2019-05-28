import { Component, ViewChild, OnInit, ElementRef } from '@angular/core';
import { athletesData } from './data';
import { IgxGridComponent, HorizontalAlignment, VerticalAlignment,
  CloseScrollStrategy, IgxToggleDirective, AutoPositionStrategy, IgxNavigationDrawerComponent } from 'igniteui-angular';
import { AnimationMetadata, style, animate, AnimationReferenceMetadata, animation } from '@angular/animations';
import { SettingsMenuComponent } from './settings-menu/settings-menu.component';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlattener, MatTreeFlatDataSource } from '@angular/material/tree';

interface FoodNode {
  name: string;
  children?: FoodNode[];
}

const TREE_DATA: FoodNode[] = [
  {
    name: 'Fruit',
    children: [
      {name: 'Apple'},
      {name: 'Banana'},
      {name: 'Fruit loops'},
    ]
  }, {
    name: 'Vegetables',
    children: [
      {
        name: 'Green',
        children: [
          {name: 'Broccoli'},
          {name: 'Brussel sprouts'},
        ]
      }, {
        name: 'Orange',
        children: [
          {name: 'Pumpkins'},
          {name: 'Carrots'},
        ]
      },
    ]
  },
];

interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
}

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

    @ViewChild('grid1') public grid: IgxGridComponent;

    @ViewChild(IgxToggleDirective) public igxToggle: IgxToggleDirective;

    @ViewChild(IgxNavigationDrawerComponent)
    public drawer: IgxNavigationDrawerComponent;

    public density = 'cosy';
    public searchText = '';
    public caseSensitive = false;
    public exactMatch = false;

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

    public drawerState = {
      open: false,
      pin: true
    };

    private transformer = (node: FoodNode, level: number) => {
      return {
        expandable: !!node.children && node.children.length > 0,
        name: node.name,
        // tslint:disable-next-line:object-literal-shorthand
        level: level,
      };
    }

    // tslint:disable-next-line:member-ordering
    treeControl = new FlatTreeControl<ExampleFlatNode>(
      node => node.level, node => node.expandable);

    // tslint:disable-next-line:member-ordering
    treeFlattener = new MatTreeFlattener(
      this.transformer, node => node.level, node => node.expandable, node => node.children);

    // tslint:disable-next-line:member-ordering
    dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

    hasChild = (_: number, node: ExampleFlatNode) => node.expandable;

    constructor() {
      this.dataSource.data = TREE_DATA;
    }

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

    public clearSearch() {
      this.searchText = '';
      this.grid.clearSearch();
    }

    public searchKeyDown(ev) {
        if (ev.key === 'Enter' || ev.key === 'ArrowDown' || ev.key === 'ArrowRight') {
            ev.preventDefault();
            this.grid.findNext(this.searchText, this.caseSensitive, this.exactMatch);
        } else if (ev.key === 'ArrowUp' || ev.key === 'ArrowLeft') {
            ev.preventDefault();
            this.grid.findPrev(this.searchText, this.caseSensitive, this.exactMatch);
        }
    }

    public updateSearch() {
        this.caseSensitive = !this.caseSensitive;
        this.grid.findNext(this.searchText, this.caseSensitive, this.exactMatch);
    }

    public updateExactSearch() {
        this.exactMatch = !this.exactMatch;
        this.grid.findNext(this.searchText, this.caseSensitive, this.exactMatch);
    }
}
