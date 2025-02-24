import mongoose from 'mongoose';

const bannerSchema = new mongoose.Schema(
  {
    bannerTitle: { type: String, required: true }, 
    bannerDetails: [
      {
        title: { type: String, required: true }, 
        desc: { type: String, required: true },   
        image: { type: String, required: true }    
      }
    ]
  },
  { timestamps: true }  
);

export default mongoose.model('HomeBanner', bannerSchema);
