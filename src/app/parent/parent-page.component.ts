import {
  AfterViewInit,
  ApplicationRef,
  Component,
  ComponentFactoryResolver,
  ElementRef,
  Inject,
  Injector,
  OnInit,
  TemplateRef,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import {DomPortalHost, TemplatePortal} from '@angular/cdk/portal';
import {CONTAINER} from '../common/desktop-js/container.service';
import {Container, ContainerWindow} from '@morgan-stanley/desktopjs';

@Component({
  selector: 'fx-parent-page',
  template: `
    <ng-template #counterTemplate>
      <h3>Counter Page</h3>
      <fx-counter></fx-counter>
    </ng-template>
    <div class="row">
      <div>
        <button class="btn btn-primary-outline" (click)="tearoff()">DOM Tearoff</button>
        <button class="btn btn-primary-outline" (click)="attach()">DOM Re-attach</button>
      </div>
      <div class="col-md-12" #hostElement></div>
    </div>

  `,
  styles: []
})
export class ParentPageComponent implements OnInit, AfterViewInit {

  constructor(private _componentFactoryResolver: ComponentFactoryResolver,
              private _injector: Injector,
              private _appRef: ApplicationRef,
              @Inject(CONTAINER) private _container: Container,
              private _viewContainerRef: ViewContainerRef) {
  }

  @ViewChild('counterTemplate') counterTemplate: TemplateRef<any>;
  @ViewChild('hostElement') hostElement: ElementRef;

  private _portalHost: DomPortalHost;
  private _tearOffHost: DomPortalHost;
  private _templatePortal: TemplatePortal;
  private _tearOffContainer: ContainerWindow;

  ngOnInit() {
  }

  ngAfterViewInit() {

    // Create a portalHost from a DOM element
    this._portalHost = new DomPortalHost(
      this.hostElement.nativeElement,
      this._componentFactoryResolver,
      this._appRef,
      this._injector
    );

    // Create a template portal
    this._templatePortal = new TemplatePortal(
      this.counterTemplate,
      this._viewContainerRef,
      {}
    );

    this._portalHost.attach(this._templatePortal);
  }


  tearoff() {
    this._container.createWindow('assets/tearoff.html').then((container: ContainerWindow) => {
      this._tearOffContainer = container;
      let tearOffWin: Window;

      const tearOffReady = () => {
        const outletElement: Element = tearOffWin.document.body;
        this._tearOffHost = new DomPortalHost(
          // Create the Portal Host on the app element
          outletElement,
          this._componentFactoryResolver,
          this._appRef,
          this._injector
        );
        this._portalHost.detach();
        this._tearOffHost.attach(this._templatePortal);
      };

      // TODO should desktopJS provide an accessor for window?
      if (container.innerWindow.getNativeWindow) {
        tearOffWin = container.innerWindow.getNativeWindow();
        // openfin is already loaded when the promise is resolved
        tearOffReady();
      } else {
        tearOffWin = container.innerWindow;
        // TODO should desktopjs smooth out that web windows aren't loaded by the time they're created
        tearOffWin.addEventListener('DOMContentLoaded', tearOffReady);
      }

    });
  }

  attach() {
    this._tearOffHost.detach();
    this._tearOffContainer.close().then(() => {
      this._portalHost.attach(this._templatePortal);
    });
  }


}
