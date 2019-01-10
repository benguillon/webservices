import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

import Issue from './models/Issue';
import User from './models/User';

const app = express();
const router = express.Router();

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/issues');

const connection = mongoose.connection;

connection.once('open', () => {
    console.log('MongoDB database connection established successfully!');
});

router.route('/issues').get((req, res) => {
    Issue.find((err, issues) => {
        if (err)
            console.log(err);
        else
            res.json(issues);
    });
});


router.route('/issues/:id').get((req, res) => {
    Issue.findById(req.params.id, (err, issue) => {
        if (err)
            console.log(err);
        else
            res.json(issue);
    });
});

router.route('/issues/add').post((req, res) => {
    let issue = new Issue(req.body);
    issue.save()
        .then(issue => {
            res.status(200).json({'issue': 'Added successfully'});
        })
        .catch(err => {
            res.status(400).send('Failed to create new record');
        });
});

router.route('/issues/update/:id').post((req, res) => {
    Issue.findById(req.params.id, (err, issue) => {
        if (!issue)
            return next(new Error('Could not load document'));
        else {
            issue.title = req.body.title;
            issue.responsible = req.body.responsible;
            issue.description = req.body.description;
            issue.severity = req.body.severity;
            issue.status = req.body.status;

            issue.save().then(issue => {
                res.json('Update done');
            }).catch(err => {
                res.status(400).send('Update failed');
            });
        }
    });
});

router.route('/users/authenticate').post((req, res) => {
    console.log("ici debut");
    console.log(req.body.username);
    console.log(req.body.password);

    
    
    // if (User.find({username: req.username, password: req.password})) {
    //     // if login details are valid return 200 OK with a fake jwt token
    //     let body = {
    //         username: req.username,
    //         password: req.password,
    //         token: 'fake-jwt-token'
    //     };
    //     res.json({status: 200, body});
    // } else {
    //     // else return 400 bad request
    //     console.log("ici");
    //     res.status(400).send('Username or password is incorrect.');
    // }

    User.findOne({username: req.body.username, password: req.body.password}, function(err, user) {
        if (err) { return next(err) }
        let body = {
            username: req.body.username,
            password: req.body.password,
            token: 'fake-jwt-token'
        };
        if (!user) {
            res.status(400).send('Username or password is incorrect');
        } else {
            res.json({status: 200, user});
        }
      })
});

router.route('/issues/delete/:id').get((req, res) => {
    Issue.findByIdAndRemove({_id: req.params.id}, (err, issue) => {
        if (err)
            res.json(err);
        else
            res.json('Remove successfully');
    })
})

app.use('/', router);

app.listen(4000, () => console.log('Express server running on port 4000'));