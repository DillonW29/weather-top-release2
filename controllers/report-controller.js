import { stationStore } from "../models/station-store.js";
import { reportStore } from "../models/report-store.js";
import { accountsController } from "../controllers/accounts-controller.js";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

const API_KEY = "6f7162d9b6c1cddf0394be5f4e462efd";

export const reportController = {
  async index(request, response) {
    const stationId = request.params.id;
    const user = accountsController.getCurrentUser(request);
    const station = await stationStore.getStationById(stationId);
    const reports = await reportStore.getReportsByStationId(stationId);

    const viewData = {
      title: "Station",
      station: station,
      reports: reports,
      user: user,
    };

    response.render("station-view", viewData);
  },

  async addReport(request, response) {
    const stationId = request.params.id;
    const report = {
      id: uuidv4(),
      code: request.body.code,
      temp: Number(request.body.temp),
      windSpeed: Number(request.body.windSpeed),
      windDirection: Number(request.body.windDirection),
      pressure: Number(request.body.pressure),
      timestamp: new Date().toISOString(),
    };

    await reportStore.addReport(stationId, report);
    response.redirect("/station/" + stationId);
  },

  async deleteReport(request, response) {
    const { stationId, reportId } = request.params;
    await reportStore.deleteReport(stationId, reportId);
    response.redirect("/station/" + stationId);
  },
  async autoGenerateReport(request, response) {
    const stationId = request.params.id;
    const station = await stationStore.getStationById(stationId);

    if (!station || !station.lat || !station.lng) {
      return response.status(400).send("Station coordinates missing.");
    }

    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${station.lat}&lon=${station.lng}&appid=${API_KEY}&units=metric`;
      const result = await axios.get(url);
      const data = result.data;

      const report = {
        id: uuidv4(),
        code: data.weather[0].id,
        temp: data.main.temp,
        windSpeed: data.wind.speed,
        windDirection: data.wind.deg,
        pressure: data.main.pressure,
        timestamp: new Date().toISOString()
      };

      await reportStore.addReport(stationId, report);
      response.redirect("/station/" + stationId);
    } catch (err) {
      console.error(err);
      response.status(500).send("Failed to fetch weather data.");
    }
  }
};

