import express from "express";
import { handleUploadAndValidation } from "../config/multer-config";
import createProperty from "../controllers/property/createproperty";
import updateProperty from "../controllers/property/updateproperty";
import deleteProperty from "../controllers/property/deleteproperty";
import getPropertyById from "../controllers/property/getpropertybyid";

const router = express.Router();

router.post("/", handleUploadAndValidation, createProperty);
router.get("/:id", getPropertyById);
router.put("/:id", handleUploadAndValidation, updateProperty);
router.delete("/:agentId/:id", deleteProperty);

export default router;
