const mongoose = require("mongoose");
const Tenant = require('../tenant/tenant')

const connectToDatabase = async ( dbName) => {
    try {
        await mongoose.connection.close();
        await mongoose.connect(
            `mongodb+srv://${process.env.MONGODB_ACCOUNT}:${process.env.MONGODB_PASS}${process.env.MONGODB_CLUSTER}/${dbName}?retryWrites=true&w=majority`
        );
        console.log(`Connected to database: ${dbName}`);
    } catch (error) {
        console.error(`Error connecting to the database ${dbName}:`, error);
        throw error; // Rethrow the error for the calling function to handle
    }
};

const tenantDb = async function (req, res, next) {
    const {subdomain} = req
    console.log('Tenant Database',subdomain)
    await connectToDatabase(subdomain);
    next()
}
const centralDb = async function (req, res, next) {
    console.log('Central Database')
    await connectToDatabase(process.env.DB_NAME);
    next()
}
module.exports = {tenantDb , centralDb};