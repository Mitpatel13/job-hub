const Bookmark = require('../models/Bookmark');
const Job = require('../models/Job');
module.exports = {
    addBookMark:async(req,res)=>{
        const  jobID = req.body.job; 
        try{
            const job = await Job.findById(jobID);
            if(!job){
                return res.status(404).send({msg:"Job not found."})
            }
            const newBook  = new Bookmark({job:job,userId:req.user.id})
            const {__v,createdAt,updatedAt,...otherData} = newBook._doc;
            await newBook.save();
            res.status(200).send({msg:"New bookmark added successfully.",otherData})

        }catch(e){
            res.status(500).send({msg:e.message})
        }
    },
    deleteBookMark:async(req,res)=>{
        try{
            await Bookmark.findByIdAndDelete(req.params.id);
            res.status(200).send({msg:"Book mark deleted successfully."})
            
        }catch(e){
            res.status(500).send({msg:e.message})
        }
    },
    getBookMark:async(req,res)=>{
        try{
            const bookmarks = await Bookmark.find({userId:req.params.userId});
            res.status(200).send({msg:"Books mark get successfully.",bookmarks})
            
        }catch(e){
            res.status(500).send({msg:e.message})
        }
    }
}