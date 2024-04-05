const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
    {
       name:{
        type: String,
        required: true
       },
       email: {
        type: String,
        required: true,
        unique: true,
        trim: true
       },
       password : {
        type: String,
        required: true
       },
       PhoneNumber : {
        type: String,
        required: true
       },
       companyName : {
        type: String,
        required: true
       },
       image:{
        type: String,
        required: true,
        default: 'http://ui-avatars.com/api/?background=DDEDFC&color=3474E3&name=Profile&size=1'
       },
       isAdmin:{
        type: Boolean,
        required: true,
        default:false
       },
    },{
        timestamps: true,
    }
)


module.exports = mongoose.model('user',userSchema);
