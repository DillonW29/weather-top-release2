import { stationStore } from "../models/station-store.js";
import { reportStore } from "../models/report-store.js";
import { accountsController } from "../controllers/accounts-controller.js";
import { v4 as uuidv4 } from "uuid";

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
  }
};
