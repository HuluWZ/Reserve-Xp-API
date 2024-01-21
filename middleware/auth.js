const Tenant = require('../tenant/tenant')
const mongoose = require("mongoose");

const connectToDatabase = async (dbName) => {
    try {
        await mongoose.connection.close();
        await mongoose.connect(
            `mongodb+srv://${process.env.MONGODB_ACCOUNT}:${process.env.MONGODB_PASS}${process.env.MONGODB_CLUSTER}/${dbName}?retryWrites=true&w=majority`
        );
        console.log(`Connected to database: ${dbName}`);
    } catch (error) {
        console.error('Error connecting to the database:', error);
        throw error; // Rethrow the error for the calling function to handle
    }
};
const auth = async (req, res, next) => {
    const {slug} = req.params
    await connectToDatabase(process.env.DB_NAME);
    const doesItExist = await Tenant.findOne({ businessName: slug });
    console.log(" Tenant ", doesItExist);
    if(doesItExist){
      req.user = doesItExist
      req.slug = slug
      req.tenant = doesItExist
      next()
    }else{
      return res.status(403).json({message:"Tenant does not found~"})
    }
}

const centralAuth = async  (req, res, next) =>{
  console.log(' Central Auth ', req.body)
  await connectToDatabase(process.env.DB_NAME);
  next()
}
module.exports = {auth , centralAuth};