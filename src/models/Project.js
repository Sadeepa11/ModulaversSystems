import mongoose from 'mongoose';

const ProjectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please provide a project title'],
      trim: true,
    },
    slug: {
      type: String,
      required: [true, 'Please provide a project slug'],
      trim: true,
    },
    type: {
      type: String,
      enum: ['web', 'app'],
      default: 'web',
    },
    category: {
      type: String,
      default: '',
    },
    client: {
      type: String,
      default: '',
    },
    description: {
      type: String,
      default: '',
    },
    technologies: {
      type: [String],
      default: [],
    },
    projectLink: {
      type: String,
      default: '',
    },
    githubLink: {
      type: String,
      default: '',
    },
    images: {
      type: [String],
      default: [],
    },
    featured: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Map _id to id for seamless frontend usage
ProjectSchema.set('toJSON', {
  virtuals: true,
  transform: (doc, ret) => {
    ret.id = ret._id.toString();
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});

export default mongoose.models.Project || mongoose.model('Project', ProjectSchema);
