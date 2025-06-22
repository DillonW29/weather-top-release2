import { stationStore } from "../models/station-store.js";
import { reportStore } from "../models/report-store.js";
import {accountsController} from "../controllers/accounts-controller.js";
import { v4 as uuid } from "uuid";
export const reportController = {

  async index(request, res) {
    const stationId = req.params.id;
    const station = await stationStore.getStationById(stationId);
    const reports = await reportStore.getReportsByStationId(stationId);
    const viewData = {
      title: "Station",
      station: station,
      reports: reports,
      user:user,
    };
    res.render("station-view", viewData);
  },

  async addReport(req, res) {
    const stationId = req.params.id;
    const newReport = {
      id:uuid,
      stationId: stationId,
      code: req.body.code,
      temp: req.body.temp,
      windSpeed: req.body.windSpeed,
      windDirection: req.body.windDirection,
      pressure: req.body.pressure
    };
    await reportStore.addReport(stationId,newReport);
    res.redirect("/station/" + stationId);
  }
};
