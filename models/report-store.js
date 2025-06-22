import { v4 as uuid} from "uuid";
import { initStore } from "../utils/store-utils.js";

const db = initStore("reports");

export const reportStore = {
  reports:[],
  async getReportsByStationId(stationId) {
    await db.read();
    return db.data.reports.filter((r) => r.stationId === stationId);
  },

  async addReport(stationId,report) {
    report.stationId = stationId;
    report.id = uuid(); 
    this.reports.push(report);
  },
  getReportsByStationId(stationId) {
    return this.reports.filter((r) => r.stationId === stationId);
  }
};
