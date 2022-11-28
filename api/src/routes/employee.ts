import express from "express";
import employeeController from "../controllers/employee";
import auth from "../middlewares/auth";

const router = express.Router();

router.post("/register", employeeController.register);
router.post("/login", employeeController.login);
router.get(
    "/",
    auth.verifyToken,
    auth.verifyRole(["ADMIN"]),
    employeeController.getAllEmployees
);
router.get(
    "/:id",
    auth.verifyToken,
    auth.verifyRole(["ADMIN"]),
    employeeController.getAnEmployee
);

export default router;
