import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NxExpertModule } from '@aposin/ng-aquila/config';
import { NxInputModule } from '@aposin/ng-aquila/input';
import { NxFormfieldModule } from '@aposin/ng-aquila/formfield';
import { NxPaginationModule } from '@aposin/ng-aquila/pagination';
import { NxDropdownModule } from '@aposin/ng-aquila/dropdown';
import { NxImageModule } from '@aposin/ng-aquila/image';
import { NxGridModule } from '@aposin/ng-aquila/grid';
import { NxSpinnerModule } from '@aposin/ng-aquila/spinner';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        BrowserModule,
        AppRoutingModule,
        NxExpertModule,
        NxInputModule,
        NxFormfieldModule,
        NxPaginationModule,
        FormsModule,
        ReactiveFormsModule,
        NxDropdownModule,
        NxImageModule,
        NxGridModule,
        HttpClientModule,
        NxSpinnerModule 
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'my-allianz-project'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('my-allianz-project');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.content span')?.textContent).toContain('my-allianz-project app is running!');
  });

  it('should apply filter', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.content span')?.textContent).toContain('my-allianz-project app is running!');
  });
});
