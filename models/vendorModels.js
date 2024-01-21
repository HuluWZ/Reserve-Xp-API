const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const vendorSchema = new mongoose.Schema({
  userName: { type: String, unique: true, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  phoneNumber: { type: String, unique: true, required: true },
  companyName:{ type:String, required:true},
  email: { type: String, required: true },
  password: { type: String, required: true },
  idCard: { type: String, required: true },
  tradeLicense: { type: String, required: true },
  status: { type: String,enum:["Pending","Approved","Rejected"], default: 'Pending' }, 
});

const Vendor = mongoose.model('Vendor', vendorSchema,"Vendor");

module.exports = Vendor;



