const mongoose = require('const mongoose'); 

const pointSchema = new mongoose.Schema({
   timestamp: Number,
   coords: {
     latitude: Number,
     longitude: Number,
     altitude: Number,
     accuracy: Number,
     heading: Number,
     speed: Number
   }
});

const trackSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User' // ref point to a mongoose instance
  },
  name: {
    type: String,
    default: ''
  },
  locations: [pointSchema]
})

mongoose.model('Track', trackSchema);