import { Component } from '@angular/core';

import { Forecast } from '@app/models';
import { IconMapService, WeatherService } from '@app/services';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-forecast',
  templateUrl: 'forecast.page.html',
  styleUrls: ['forecast.page.scss']
})
export class ForecastPage {
  forecast: Forecast;

  constructor(
    public iconMap: IconMapService,
    private loadingController: LoadingController,
    private weather: WeatherService
  ) {}

  async ionViewDidEnter() {
    const loading = await this.loadingController.create({ message: 'Loading Forecasts' });
    await loading.present();
    this.weather.forecast().subscribe(f => {
      this.forecast = f;
      loading.dismiss();
    });
  }
}
