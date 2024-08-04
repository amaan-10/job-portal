import resumeModel from "../models/resumeModel";

export const ResumeController = async (req, res) => {
  try {
    const newResume = new resumeModel({
      filename: req.file.filename,
      path: req.file.path,
      contentType: req.file.mimetype,
      size: req.file.size,
    });

    await newResume.save();
    res
      .status(201)
      .json({ message: "PDF uploaded successfully", pdf: newResume });
  } catch (error) {
    res.status(500).json({ error: "Failed to upload PDF" });
  }
};
