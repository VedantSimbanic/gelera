import { Request, Response } from "express";
import Property, { IProperty } from "../../models/property";
import { propertyValidationSchema } from "../../helpers/validation/propertyvalidation";
import path from "path";
import fs from "fs";

const updateProperty = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    // Check if the property exists and is not deleted
    const existingProperty: IProperty | null = await Property.findOne({
      _id: id,
    });

    if (!existingProperty) {
      res.status(404).json({
        status: false,
        message: "Property not found or already deleted",
      });
      return;
    }

    // Validate request data
    const { error } = propertyValidationSchema.validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      res.status(400).json({
        status: false,
        message: error.details.map((detail) => detail.message).join(", "),
      });
      return;
    }

    // Handle file uploads
    const files = req.files as Express.Multer.File[];
    const imageUrls: string[] = files?.map((file) => file.filename) || [];

    // Prepare update data
    const updateData: Partial<IProperty> = {
      ...req.body,
      propertyImages: imageUrls.length
        ? imageUrls
        : existingProperty.propertyImages,
    };

    // Delete old images if new ones are provided
    if (imageUrls.length) {
      existingProperty.propertyImages.forEach((imageUrl) => {
        const imagePath = path.join(__dirname, "../../../images", imageUrl);
        fs.unlink(imagePath, (err) => {
          if (err) console.log(err);
          else console.log(`Deleted file: ${imagePath}`);
        });
      });
    }

    // Update property in the database
    existingProperty.set(updateData);
    const updatedProperty: IProperty = await existingProperty.save();

    // Ensure the properties directory exists
    const propertiesDirPath = path.join(__dirname, "../../data");
    const propertiesFilePath = path.join(propertiesDirPath, "properties.json");

    if (!fs.existsSync(propertiesDirPath)) {
      fs.mkdirSync(propertiesDirPath, { recursive: true });
    }

    // Read existing properties from file
    let properties: IProperty[] = [];
    if (fs.existsSync(propertiesFilePath)) {
      const data = fs.readFileSync(propertiesFilePath, "utf8");
      properties = JSON.parse(data);
    }

    // Update property in the file
    const propertyIndex = properties.findIndex(
      (property) => property?._id?.toString() === id
    );
    if (propertyIndex !== -1) {
      properties[propertyIndex] = updatedProperty.toObject();
    } else {
      properties.push(updatedProperty.toObject());
    }

    fs.writeFileSync(
      propertiesFilePath,
      JSON.stringify(properties, null, 2),
      "utf8"
    );

    // Send success response
    res.status(200).json({
      status: true,
      message: "Property updated successfully",
      property: updatedProperty,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: false, message: "Internal Server Error" });
  }
};

export default updateProperty;
