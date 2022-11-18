import express from "express";
import employeeController from "../controllers/employee";

const router = express.Router();

router.post("/register", employeeController.register);
router.post("/login", employeeController.login);

export default router;
