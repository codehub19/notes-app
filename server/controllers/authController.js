exports.auth = async (req,res) => {
    /**
     * GET AUTH
     */
        const locals = {
            title : 'Auth',
            description : 'Free NodeJs Notes App.'
        }
        res.render('dashboard/index', {
            locals : locals,
            layout: '../views/layouts/dashboard'
    
        });
    }
    