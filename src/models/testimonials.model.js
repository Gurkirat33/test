import mongoose from "mongoose";

const testimonialSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true
    }
},
);

const testimonialModel = mongoose.models.Testimonial || mongoose.model('Testimonial', testimonialSchema);

export default testimonialModel;