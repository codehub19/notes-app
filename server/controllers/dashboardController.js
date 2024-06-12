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
        const notes = (await Note.find({}));
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
    const note = await Note.findById({_id : req.params.id})
    .lean();
    try{
        res.render('dashboard/view-notes' , {
            noteID : req.params.id,
            note,
            layout: '../views/layouts/dashboard'});
    }
    catch(error){
        res.send("Something went wrong")
    }
}







/**
 * Put 
 * Update Specific note
 */

exports.dashboardUpdateNote = async (req, res) => {
    try{
        await Note.findOneAndUpdate(
            {_id : req.params.id},
            {title: req.body.title, body:req.body.body}
        );

        res.redirect('/dashboard');
    }
    catch(error){
        console.log(error);
    }
}


/**
 * DELETE
 * Deleting a specific note
 */


exports.dashboardDeleteNote = async (req, res) => {
    try{
        await Note.findOneAndDelete(
            {_id : req.params.id}
        );

        res.redirect('/dashboard');
    }
    catch(error){
        console.log(error);
    }
}



exports.dashboardAddNote = async (req, res) => {
        res.render('dashboard/add-note', {
                layout: '../views/layouts/dashboard'
            });
}


exports.dashboardAddNoteSubmit = async (req, res) => {
    try{
        req.body.user = req.user.id
        await Note.create(req.body);
        res.redirect('/dashboard');
    }
    catch(error){
        console.log(error);
    }
}
