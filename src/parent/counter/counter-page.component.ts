import { Component, OnInit, ComponentFactoryResolver, Injector, ApplicationRef, ViewChild, TemplateRef, ViewContainerRef, ElementRef } from '@angular/core';
import { DomPortalHost, Portal, ComponentPortal, TemplatePortal } from '@angular/cdk/portal';

@Component({
  selector: 'fx-counter-page',
  template: `
   <ng-template #counterTemplate>
    <h3>Counter Page</h3>
    <fx-counter></fx-counter>
   </ng-template>
   <div class="row">
    <div>
      <button class="btn btn-primary-outline" (click)="tearoff()">Tearoff</button>
      <button class="btn btn-primary-outline" (click)="attach()">Re-attach</button>
    </div>
    <div class="col-md-12" #hostElement></div>
   </div>

  `,
  styles: []
})
export class CounterPageComponent implements OnInit {

  constructor(
    private _componentFactoryResolver: ComponentFactoryResolver,
    private _injector: Injector,
    private _appRef: ApplicationRef,
    private _viewContainerRef: ViewContainerRef
  ) { }

  @ViewChild('counterTemplate') counterTemplate: TemplateRef<any>;
  @ViewChild('hostElement') hostElement: ElementRef;

  private _portalHost: DomPortalHost;
  private _tearOffHost: DomPortalHost;
  private _templatePortal: TemplatePortal;
  private _tearOffWindow:Window;

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
    this._tearOffWindow = window.open('', 'windowName');
    this._tearOffHost = new DomPortalHost(
      // Create the Portal Host on the parent element
      this._tearOffWindow.document.body,
      this._componentFactoryResolver,
      this._appRef,
      this._injector
    );

    this._portalHost.detach();
    this._tearOffHost.attach(this._templatePortal);
  }

  attach() {
    this._tearOffHost.detach();
    this._tearOffWindow.close();
    this._portalHost.attach(this._templatePortal);
  }


}
