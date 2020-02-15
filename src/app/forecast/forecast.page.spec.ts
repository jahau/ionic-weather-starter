import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';
import { IonicModule, LoadingController } from '@ionic/angular';
import { of } from 'rxjs';

import { ForecastPage } from './forecast.page';
import { WeatherService } from '@app/services';
import { createWeatherServiceMock } from '@app/services/testing';
import { createOverlayControllerMock, createOverlayElementMock } from '@test/mocks';

describe('ForecastPage', () => {
  let component: ForecastPage;
  let loading;
  let fixture: ComponentFixture<ForecastPage>;

  beforeEach(async(() => {
    loading = createOverlayElementMock('Loading');
    TestBed.configureTestingModule({
      declarations: [ForecastPage],
      imports: [IonicModule],
      providers: [
        { provide: LoadingController, useFactory: () => createOverlayControllerMock('LoadingController', loading) },
        { provide: WeatherService, useFactory: createWeatherServiceMock }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(ForecastPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('entering the page', () => {
    it('displays a loading indicator', async () => {
      const loadingController = TestBed.inject(LoadingController);
      await component.ionViewDidEnter();
      expect(loadingController.create).toHaveBeenCalledTimes(1);
      expect(loading.present).toHaveBeenCalledTimes(1);
    });

    it('gets the forecast', async () => {
      const weather = TestBed.inject(WeatherService);
      await component.ionViewDidEnter();
      expect(weather.forecast).toHaveBeenCalledTimes(1);
    });

    it('shows the forecast items', async () => {
      const weather = TestBed.inject(WeatherService);
      (weather.forecast as any).and.returnValue(
        of([
          [
            {
              temperature: 300,
              condition: 200,
              date: new Date(2018, 8, 19)
            }
          ],
          [
            {
              temperature: 265,
              condition: 601,
              date: new Date(2018, 8, 20)
            }
          ],
          [
            {
              temperature: 293,
              condition: 800,
              date: new Date(2018, 8, 21)
            }
          ]
        ])
      );
      await component.ionViewDidEnter();
      fixture.detectChanges();
      const f = fixture.debugElement.queryAll(By.css('kws-daily-forecast'));
      expect(f.length).toEqual(3);
    });

    it('dismisses the loading indicator', async () => {
      const weather = TestBed.inject(WeatherService);
      (weather.forecast as any).and.returnValue(of([]));
      await component.ionViewDidEnter();
      expect(loading.dismiss).toHaveBeenCalledTimes(1);
    });
  });
});
