    const Note = require('../models/Notes');
    const mongoose = require('mongoose');
/**
 * GET DASHBOARD
 */

exports.dashboard = async (req,res) => {

    
    let perPage = 12;
    let page = req.query.page || 1;

    const locals = {
        title : 'Dashboard',
        description : 'Free NodeJs Notes App.'
    }


    try{
        const notes = await Note.find({});
        res.render('dashboard/index', {
            userName : req.user.firstName,
            locals,
            notes,
            layout: '../views/layouts/dashboard'
        });

    
    }
    catch(error){
        console.log(error);
    }
}



/**
 * Get 
 * View Specific note
 */


exports.dashboardViewNote = async (req, res) => {
    try{
        const noteView = await Note.findOne({_id : req.params.id});
        res.render('dashboard/view-notes' , {noteView, layout: '../views/layouts/dashboard'}).where({user: req.user.id}).lean();
    }
    catch(error){
        console.log(error);
    }
}







/**
 * Put 
 * Update Specific note
 */

exports.dashboardUpdateNote = async (req, res) => {
    try{
        const noteView = await Note.findOne({_id : req.params.id});
        res.render('dashboard/update-notes' , {noteView, layout: '../views/layouts/dashboard'})
    }
    catch(error){
        console.log(error);
    }
}