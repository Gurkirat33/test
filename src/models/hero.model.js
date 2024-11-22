import mongoose from "mongoose";

// Delete the existing model if it exists
if (mongoose.models.Hero) {
  delete mongoose.models.Hero;
}

const heroSchema = new mongoose.Schema({
  subHeading: {
    type: String,
    required: true,
  },
  heading: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  serviceName: {
    type: String,
    required: true,
  },
  serviceUrl: {
    type: String,
    required: true,
  },
  // browserHeading: {
  //   type: String,
  //   required: true,
  // },
  // browserCatagory: {
  //   type: String,
  //   required: true,
  // },
  browserOutcome: {
    type: String,
    default: "",
  },
  images: {
    type: [String],
    required: true,
    validate: [
      {
        validator(array) {
          return array.length === 1;
        },
        message: "Images array must contain exactly 1 images"
      }
    ]
  }
}, {
  timestamps: true,
});

// Create new model
const Hero = mongoose.model("Hero", heroSchema);

export default Hero;
