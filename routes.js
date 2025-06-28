import express from "express";
import { dashboardController } from "./controllers/dashboard-controller.js";
import { aboutController } from "./controllers/about-controller.js";
import { stationController } from "./controllers/station-controller.js";
import { reportController } from "./controllers/report-controller.js";
import { accountsController } from "./controllers/accounts-controller.js";  // ✅ FIXED: use named import

export const router = express.Router();

// Public Routes
router.get("/", accountsController.index);
router.get("/about", aboutController.index);
router.get("/signup", accountsController.showSignup);
router.get("/login", accountsController.showLogin);
router.post("/signup", accountsController.signup);
router.post("/login", accountsController.login);
router.get("/logout", accountsController.logout);

// Protected Routes
router.get("/dashboard", dashboardController.index);
router.post("/dashboard/addstation", dashboardController.addStation);
router.get("/dashboard/deletestation/:id", dashboardController.deleteStation);

router.get("/station/:id", stationController.index);
router.post("/station/:id/addreport", reportController.addReport);
router.post("/station/:stationId/deletereport/:reportId", reportController.deleteReport);
