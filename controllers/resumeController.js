import resumeModel from "../models/resumeModel.js";

export const ResumeController = async (req, res) => {
  try {
    const newResume = new resumeModel({
      filename: req.file.originalname,
      contentType: req.file.mimetype,
      data: req.file.buffer,
      uploadedBy: req.body.user.userId,
    });

    await newResume.save();
    res.status(200).send("File uploaded successfully");
  } catch (error) {
    res.status(500).json({ error: "Failed to upload PDF" });
    console.log(error);
  }
};

export const getResumeController = async (req, res) => {
  try {
    const file = await resumeModel.findById(req.params.id);
    if (!file) return res.status(404).send("File not found");

    res.set("Content-Type", file.contentType);
    res.send(file.data);
  } catch (error) {
    res.status(500).send("Error retrieving file");
  }
};
