exports.homepage = async (req,res) => {

    const locals = {
        title : 'My Home Page',
        description : 'Hey dear this is my home page!'
    }
    res.render('index', {
        locals : locals,
        layout: '../views/layouts/front-page'

    });
}

exports.about = async (req, res) => {
    const locals = {
        title : 'About - NodeJs Notes',
        description : 'Free Nodejs Notes App'
    }

    res.render('about', {locals : locals});
}