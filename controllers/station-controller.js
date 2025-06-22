import { stationStore } from "../models/station-store.js";
import { reportStore } from "../models/report-store.js";
import {accountsController} from "../controllers/accounts-controller.js";

export const stationController = {
  async index(request, response) {
    const user = accountsController.getCurrentUser(request);
    const station = await stationStore.getStationById(request.params.id);
    // 🔽 Add icon codes here
    const iconMap = {
      "800": "01d",
      "801": "02d",
      "802": "03d",
      "803": "04d",
      "804": "04d",
      "500": "10d",
      "600": "13d",
      "701": "50d",
    };
    if (!station) {
      return response.status(404).send("Station not found");
    }
    const reports=reportStore.getReportsByStationId(station.id);
    for (const report of reports) {
      report.iconCode = iconMap[report.code] || "01d"; 
    }
    let minTemp = null, maxTemp = null;
    let minWind = null, maxWind = null;
    let minPressure = null, maxPressure = null;
    for (const report of reports) {
      const temp = Number(report.temperature);
      const wind = Number(report.windSpeed);
      const pressure = Number(report.pressure);

      if (minTemp === null || temp < minTemp) minTemp = temp;
      if (maxTemp === null || temp > maxTemp) maxTemp = temp;

      if (minWind === null || wind < minWind) minWind = wind;
      if (maxWind === null || wind > maxWind) maxWind = wind;

      if (minPressure === null || pressure < minPressure) minPressure = pressure;
      if (maxPressure === null || pressure > maxPressure) maxPressure = pressure;
    }
    const viewData = {
      title: "Station",
      station,
      reports,
      user,
      minTemp,
      maxTemp,
      minWind,
      maxWind,
      minPressure,
      maxPressure,
    };
    response.render("station-view", viewData);
  },
};
