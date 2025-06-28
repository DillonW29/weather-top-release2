import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";

const db = new Low(new JSONFile("models/db.json"));

async function ensureDbInitialized() {
  await db.read();
  if (!db.data) {
    db.data = { reports: [] };
  } else if (!db.data.reports) {
    db.data.reports = [];
  }
  return db;
}

export const reportStore = {
  async getReportsByStationId(stationId) {
    const db = await ensureDbInitialized();
    return db.data.reports.filter((report) => report.stationId === stationId);
  },

  async addReport(stationId, report) {
    const db = await ensureDbInitialized();
    report.stationId = stationId;
    db.data.reports.push(report);
    await db.write();
  },

  async deleteReport(stationId, reportId) {
    const db = await ensureDbInitialized();
    db.data.reports = db.data.reports.filter(
      (report) => !(report.stationId === stationId && report.id === reportId)
    );
    await db.write();
  }
};
async function removeReport(reportId) {
  await db.read();
  db.data.reports = db.data.reports.filter((r) => r.id !== reportId);
  await db.write();
}