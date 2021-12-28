const mongoose = require('mongoose');




const dbConnection = async() => {


    
    await mongoose.connect(process.env.MONGODB_CNN,{
        useNewUrlParser:true,
        useUniFiedTopology: true
    },(err, resp) => {
        if(err) throw err;
        console.log('conectada bd')


    });

}






module.exports = {
    dbConnection
}