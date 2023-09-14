
const Report = require('../models/reports');
const User = require('../models/user')

// Patient Registeration 
module.exports.register = async function(req,res){
    console.log("inside", req.body)
    try {
        
        let user = await User.findOne({username:req.body.number});

        if(user){
            return res.status(200).json({
                message: 'User Already Registered',
                data: {
                    user:user
                }
            });
        }

        user = await User.create({
            username: req.body.number,
            name: req.body.name,
            password:'12345',
            type:'Patient'
        });

        return res.status(201).json({
            message: 'Patient registered successfully',
            data: user
        });
    } 
    catch (error){
        console.log(error);
        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
}

// Patient Report-Creation
module.exports.createReport = async function(req,res){
    console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>..", req.params.id)
    try {
        
        const user = await User.findById(req.params.id)

        if(!user){
            return res.status(422).json({
                message: "Patient Does not exist"
            });
        }

        let report = await Report.create({
            createdByDoctor: req.body.createdByDoctor,
            patient: req.params.id,
            status: req.body.status,
            date: new Date()
        });

        user.reports.push(report);
        
        return res.status(201).json({
            message: 'Report created successfully',
            data: report
        })
        
    } 
    catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
}


// Showing Patient Reports
module.exports.patientReports = async function(req,res){
    try {
        const reports = await Report.find({patient:req.params.id}).populate('createdByDoctor').sort('date')

        const reportData = reports.map(report => {
            const originalDate = report.date;
            const dateObj = new Date(originalDate);

            const formattedDate = dateObj.toLocaleString("en-US", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
                hour12: false
            });

            return {
              createdByDoctor: report.createdByDoctor.name,
              status: report.status,
              date: formattedDate
            };
          });

        return res.status(200).json({
            message: `List of Reports of User with id -  ${req.params.id}`,
            reports:reportData    
        });
    } 
    catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
}



module.exports.reportStatus = async function(req,res){
    try {
        const reports = await Report.find({status:req.params.status}).populate('createdByDoctor').populate('patient').sort('date')
        console.log("reportssssssssssssssssssssssssss", reports)
        const reportData = reports.map(report => {
            const originalDate = report.date;
            const dateObj = new Date(originalDate);

            const formattedDate = dateObj.toLocaleString("en-US", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
                hour12: false
            });
    
            return {
              createdByDoctor: report.createdByDoctor.name,
              status: report.status,
              patient_name : report.patient.name, 
              date: formattedDate
            };
          });

        return res.status(200).json({
            message: `List of Reports of User with id -  ${req.params.id}`,
            reports:reportData    
        });
    } 
    catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
}