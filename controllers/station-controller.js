import { stationStore } from "../models/station-store.js";
import { reportStore } from "../models/report-store.js";
import { accountsController } from "./accounts-controller.js";

export const stationController = {
  async index(request, response) {
    const stationId = request.params.id;
    const user = accountsController.getCurrentUser(request);
    const station = await stationStore.getStationById(stationId);

    if (!station) {
      return response.status(404).send("Station not found");
    }

    const reports = await reportStore.getReportsByStationId(stationId);

    // ✅ Icon mapping using string keys
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

    // ✅ Attach weather icon to each report
    for (const report of reports) {
      const code = report.code?.toString();
      report.icon = iconMap[code]
        ? `https://openweathermap.org/img/wn/${iconMap[code]}@2x.png`
        : "No icon";
    }

    const viewData = {
      title: `${station.name} - Reports`,
      station: station,
      reports: reports,
      user: user,
    };

    response.render("station-view", viewData);
  },
};
