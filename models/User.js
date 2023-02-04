const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    Name:{
        default: "null",
        type: "String",
    },
    
    Email:{
        default: "null",
        type: "String",
    },
    ContactNumber:{
        default: "null",
        type: "String",
    },
    SponserCode:{
        default: "null",
        type: "String",
    },
    UpperLineSponserUser:{
        default: "null",
        type: "String",
    },
    Password:{
        default: "null",
        type: "String",
    },
    Country:{
        default: "null",
        type: "String",
    },
    Purpose:[{
        default: "null",
        type: "String",
    }],
    Interest:[{
        default: "null",
        type: "String",
    }],
    Gender:{
        default: "null",
        type: "String",
    },
    MyReferId:{
        default: "null",
        type: "String",
    },
    Wallete:{
        default: "0",
        type: "String",
    },
    UserIP:{
        default: "null",
        type: "String",
    },
    PedometerAccess:{
        default: "false",
        type: "String",
    },
    RechargeWallete:{
        default: "0",
        type: "String",
    },
    PackageName:{
        default: "0",
        type: "String",
    },
    PackageID:{
        default: "0",
        type: "String",
    },
    PackageAmount:{
        default: "0",
        type: "String",
    },
    WalletAddress:{
        default: "null",
        type: "String",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("MyUserss", UserSchema);
