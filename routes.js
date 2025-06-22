import express from "express";
import { dashboardController } from "./controllers/dashboard-controller.js";
import { aboutController } from "./controllers/about-controller.js";
import { stationController } from "./controllers/station-controller.js";
import { reportController } from "./controllers/report-controller.js";
import accountsController from "./controllers/accounts-controller.js";
export const router = express.Router();

router.get("/", dashboardController.index);
router.get("/", dashboardController.dashboard);
router.get("/about", aboutController.index);
router.get("/station/:id", stationController.index);
router.get("/station/:id", reportController.index);
router.get("/",accountsController.index);
router.get("/signup", accountsController.showSignup);
router.get("/login", accountsController.showLogin);
router.get("/logout", accountsController.logout)
router.get("/dashboard", dashboardController.dashboard);
router.post("/station/:id/addreport", reportController.addReport);
router.post("/dashboard/addstation", dashboardController.addStation);
router.post("/login", accountsController.login);
router.post("/signup", accountsController.signup);




