const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    email: {
      type: String,
      unique: true,
      require: true
    },
    password: {
      type: String,
      require: true
    }
});


userSchema.pre('save', function(next) {         // hook which runs before saving user(INSTANCE) to database`
   const user = this;
   if(!user.isModified('password')){
  return next();
   }

   bcrypt.genSalt(10, (err, salt ) => {
     if(err){
       return next(err);
     } 
     bcrypt.hash(user.password, salt, (err, hash) => {
       if(err) {
         return next(err);
       }
       user.password = hash;
       next();
     }); 
  });
});

//  "this" keyword inside a non arrow function will be pointing to single context we are operating on but in case of arrow function "this" refers to total file

userSchema.methods.comparePassword = function comparePassword (candidatePassword) {
  const user = this;

  return new Promise((resolve,reject) => {
       bcrypt.compare(candidatePassword, user.password, (err, isMatch)=> {
           if(err) {
             return reject(err);
           }

           if(!isMatch) {
             return reject(false);
           }

           resolve(true);
       }); 
  });
 
} 

mongoose.model('User', userSchema);