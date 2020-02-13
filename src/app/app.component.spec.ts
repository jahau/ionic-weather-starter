import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestBed, async } from '@angular/core/testing';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { createPlatformMock } from 'test/mocks';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        { provide: StatusBar, useFactory: () => jasmine.createSpyObj<StatusBar>('StatusBar', ['styleDefault']) },
        { provide: SplashScreen, useFactory: () => jasmine.createSpyObj<SplashScreen>('SplashScreen', ['hide']) },
        { provide: Platform, useFactory: createPlatformMock }
      ]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should initialize the app', async () => {
    const platform = TestBed.inject(Platform);
    const statusBar = TestBed.inject(StatusBar);
    const splashScreen = TestBed.inject(SplashScreen);
    TestBed.createComponent(AppComponent);
    expect(platform.ready).toHaveBeenCalled();
    await platform.ready();
    expect(statusBar.styleDefault).toHaveBeenCalled();
    expect(splashScreen.hide).toHaveBeenCalled();
  });

  describe('initialization', () => {
    let platform: Platform;
    beforeEach(() => {
      platform = TestBed.inject(Platform);
    });

    it('waits for the platform to be ready', () => {
      TestBed.createComponent(AppComponent);
      expect(platform.ready).toHaveBeenCalled();
    });

    it('sets the default status bar style when ready', async () => {
      const statusBar = TestBed.inject(StatusBar);
      TestBed.createComponent(AppComponent);
      expect(statusBar.styleDefault).not.toHaveBeenCalled();
      await platform.ready();
      expect(statusBar.styleDefault).toHaveBeenCalledTimes(1);
    });

    it('hides the splash screen when ready', async () => {
      const splashScreen = TestBed.inject(SplashScreen);
      TestBed.createComponent(AppComponent);
      expect(splashScreen.hide).not.toHaveBeenCalled();
      await platform.ready();
      expect(splashScreen.hide).toHaveBeenCalledTimes(1);
    });
  });
});
