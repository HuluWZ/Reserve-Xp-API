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

const getSlug = async (req, res, next) => {
  try {
    const host = req.get("origin");
    const url = new URL(link);
    const hostname = url.hostname;
    console.log(" Host name ",hostname,url)
    const parts = hostname.split('.');
    console.log(parts)
    if (parts.length >= 3) {
      const subdomain = parts[0];
      console.log(" sub domain ",subdomain)
        req.subdomain = subdomain
        next()
    } else {
      return res.status(404).json({message:"Tenant Subdomain not found."})
    }
  } catch (error) {
      console.error(`Error Finding Subdomain`, error);
      throw error; // Rethrow the error for the calling function to handle
  }
}

const auth = async (req, res, next) => {
   const { subdomain } = req
   console.log(" Slug ",subdomain)
    await connectToDatabase(process.env.DB_NAME);
    const doesItExist = await Tenant.findOne({ businessName: subdomain });
    console.log(" Tenant ", doesItExist);
    if(doesItExist){
      req.user = doesItExist
      req.slug = subdomain
      req.tenant = doesItExist
      next()
    }else{
      return res.status(403).json({message:"Tenant does not found"})
    }
}

const centralAuth = async  (req, res, next) =>{
  console.log(' Central Auth ', req.body)
  await connectToDatabase(process.env.DB_NAME);
  next()
}
module.exports = {auth , centralAuth ,getSlug};