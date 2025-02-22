// models/Item.js
import mongoose from 'mongoose';

const UserScheme = new mongoose.Schema({

  name: {
    type: String,
    default: ''
    
  },
    email: {
        type: String,
        //unique: true,
        default: ''
        
    },
    matchId:{
        type:Number,
        default:1,
    },
    data:{
        type:Object,
        default:{}
        
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    LuckyNumber:{
        type:Number,
        default:0
    },
});

export default mongoose.models.User || mongoose.model('User', UserScheme);