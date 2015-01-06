var mongoose = require('mongoose');


var electionSchema = mongoose.schema({

    name	: {type: String, required: true},
    start	: {type: Date, default: Date.now},
    end         : {type: Date},
    method      : {type: String, required: true},
    users       : [String]

    });

