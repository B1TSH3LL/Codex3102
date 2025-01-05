import { Router } from "express";
import { sessionController } from "./session.module";

const sessionRoutes = Router();

sessionRoutes.get("/all", sessionController.getAllSession);
sessionRoutes.get("/current", sessionController.getSession);
sessionRoutes.delete("/:id", sessionController.deleteSession);

export default sessionRoutes;
