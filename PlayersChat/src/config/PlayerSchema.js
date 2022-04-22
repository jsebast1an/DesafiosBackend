
const { default: mongoose } = require('mongoose')
const {Schema, model} = require('mongoose')

const URL = 'mongodb://127.0.0.1:27017/chat'
mongoose.connect(URL,{useNewUrlParser:true,useUnifiedTopology:true})

const PlayerSchema = new Schema({
    player: {
        type:String,
        require:true,
        max:15,
    },
    position:{
        type:String,
        require:true,
        max:15
    },
    calification:{
        type:Number,
        require:true,
    },
    img:String
    

})

let playersSchemaService = model('players', PlayerSchema)


module.exports = playersSchemaService