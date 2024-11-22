import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema(
  {
    heading: {
      type: String,
      required: [true, "Service heading is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
    },
    longDescription: {
      type: String,
      required: [true, "Long description is required"],
      trim: true,
    },
    imageUrl: {
      type: String,
      required: [true, "Image URL is required"],
      trim: true,
    },
    keyPoints: {
      type: [String],
      required: [true, "At least one key point is required"],
      validate: {
        validator: function(v) {
          return Array.isArray(v) && v.length > 0;
        },
        message: "At least one key point is required"
      }
    },
    slug: {
      type: String,
      required: [true, "URL slug is required"],
      trim: true,
      unique: true,
    },
  },
  { 
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// Add middleware to handle errors
serviceSchema.post('save', function(error, doc, next) {
  if (error.name === 'MongoServerError' && error.code === 11000) {
    next(new Error('URL slug must be unique'));
  } else {
    next(error);
  }
});

// Clean the data before saving
serviceSchema.pre('save', function(next) {
  if (this.isModified()) {
    // Trim all string fields
    this.heading = this.heading.trim();
    this.description = this.description.trim();
    this.longDescription = this.longDescription.trim();
    this.imageUrl = this.imageUrl.trim();
    this.slug = this.slug.trim();
    
    // Clean key points
    this.keyPoints = this.keyPoints
      .map(point => point.trim())
      .filter(point => point);
  }
  next();
});

const Service = mongoose.models.Service || mongoose.model("Service", serviceSchema);
export default Service;
