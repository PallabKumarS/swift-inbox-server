import { Router } from "express";
import { UserController } from "./user.controller";

const router = Router();

// Define routes
router.get("/", UserController.getAllUser);

router.put("/:id", UserController.updateUser);

router.delete("/:id", UserController.deleteUser);

export const UserRoutes = router;
