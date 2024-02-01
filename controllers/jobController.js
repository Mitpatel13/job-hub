const Job = require('../models/Job');
module.exports = {
    createJob :async (req,res)=>{
        const newJob = new Job(req.body);
        try{
            
           const savedJob = await newJob.save();
           const {createdAt,updatedAt,__v, ...newJobInfo} = savedJob._doc;
           res.status(200).send({s:0,m:'New job added successfully.',r:newJobInfo})
        }
        catch(e){
            res.status(500).send({msg:e.message})
        }
    },
    updateJob:async(req,res)=>{
        try{
            const job = await Job.findByIdAndUpdate(
                req.params.id,
                {
                $set:req.body
            },{new:true});
            const {createdAt,updatedAt,__v, ...newJobInfo} = job._doc;
            res.status(200).send({s:0,m:"Job update successfully.",r:newJobInfo})
        }
        catch(e){

            res.status(500).send({msg:e.message})
        }
    },
    deleteJob:async(req,res)=>{
        try{
            await Job.findByIdAndDelete(req.params.id);
            res.status(200).send({s:0,m:"Job deleted successfully."})
        }
        catch(e){
            res.status(500).send({msg:e.message})
        }
    },
    getJob:async(req,res)=>{
        try{
            const job = await Job.findById(req.params.id);
            const {__v,createdAt,updatedAt,...otherData} = job._doc;
            res.status(200).send({s:0,m:"Job get success",r:otherData});
        }
        catch(e){
            res.status(500).send({msg:e.message})
        }
    },
    getAllJob:async(req,res)=>{
        try{
            const jobs = await Job.find();
            res.status(200).send({s:0,m:"All job get successfully.",r:{jobs}})
        }
        catch(e){
            res.status(500).send({msg:e.message})        }
    },
    searchJob:async(req,res)=>{
        try{
            const result = await Job.aggregate(
                [
                    {
                      $search: {
                        index: "jobsearch",
                        text: {
                          query: req.params.key,
                          path: {
                            wildcard: "*"
                          }
                        }
                      }
                    }
                  ]
            );
            res.status(200).send({s:0,m:"Searching result",r:result})
        }catch(e){
            res.status(500).send({msg:e.message})
        }
    }
}