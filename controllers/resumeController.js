import resumeModel from "../models/resumeModel.js";

export const ResumeController = async (req, res) => {
  try {
    let resume = await resumeModel.findOne({
      uploadedBy: req.body.user.userId,
      forJob: req.body.jobId,
    });

    if (resume) {
      resume.filename = req.file.originalname;
      resume.data = req.file.buffer;
      resume.contentType = req.file.mimetype;
      resume.uploadDate = new Date();
      resume.__v += 1;
    } else {
      resume = new resumeModel({
        filename: req.file.originalname,
        data: req.file.buffer,
        contentType: req.file.mimetype,
        uploadedBy: req.body.user.userId,
        uploadDate: new Date(),
        forJob: req.body.jobId,
        __v: 0,
      });
    }
    //console.log(req);

    await resume.save();

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
