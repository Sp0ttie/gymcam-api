import express from "express";
import cors from "cors";
import multer from "multer";

const app = express();
app.use(cors());
const upload = multer({ dest: "uploads/" });

app.get("/health", (req, res) => {
  res.json({ ok: true });
});

app.post("/analyze", upload.single("image"), (req, res) => {
  res.json({
    equipment: {
      name: "Lat Pulldown Machine",
      confidence: 0.82,
      alt_guesses: ["Seated Row Machine", "Cable Pulldown Station"]
    },
    primary_muscles: ["Lats", "Biceps", "Rear delts"],
    exercises: [
      {
        name: "Wide-Grip Lat Pulldown",
        difficulty: "beginner",
        muscles: ["Lats", "Biceps"],
        cues: ["Pull elbows down", "Chest tall", "Control the return"],
        mistakes: ["Swinging torso", "Pulling behind neck"]
      }
    ],
    safety_notes: [
      "Avoid momentum",
      "Do not pull behind the neck"
    ],
    follow_up: {
      needs_second_photo: false,
      suggested_angles: [],
      question: ""
    }
  });
});

app.listen(process.env.PORT || 3000, () =>
  console.log("GymCam API running")
);

