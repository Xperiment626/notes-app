const controller = {}

controller.index = (req, res) => {
    res.render('index');
};

controller.about = (req, res) => {
    res.render('about');
};

module.exports = controller;