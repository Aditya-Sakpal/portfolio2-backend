const mongoose = require('mongoose');

const DB_USER = process.env.DB_USER
const DB_PASSWORD = process.env.DB_PASSWORD
const DB_CLUSTER = process.env.DB_CLUSTER;
const DB_NAME = process.env.DB_NAME

const connectionString = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_CLUSTER}?retryWrites=true&w=majority`;


mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: 'portfolio'
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB Atlas!');
});

// Define your MongoDB schema
const certificationSchema = new mongoose.Schema({
  cert_name:String,
  issue_date:String,
  expire_date:String,
  credential_id:String,
  org_name:String,
  image: Buffer,
});

const projectSchema = new mongoose.Schema({
  proj_name:String,
  stack:String,
  description:String,
  url:String,
  image: Buffer,
});

const experienceSchema = new mongoose.Schema({
  role:String,
  company:String,
  salary:String,
  work_done:String,
  start_month:String,
  end_month:String,
  image: Buffer,
});

const feedbackSchema = new mongoose.Schema({
  name:String,
  feedback:String,
  label:String
});

const Certification = mongoose.model('Certification', certificationSchema,'certifications');
const Project = mongoose.model('Project', projectSchema,'projects');
const Experience = mongoose.model('Experience',experienceSchema,'experience')
const Feedback=mongoose.model('Feedback',feedbackSchema,'feedback')

module.exports = {Certification,Project,Experience,Feedback};
