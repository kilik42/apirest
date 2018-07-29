const express = require('express');
const router = express.Router();
const Ninja = require('../models/ninja');

// get a list of ninjas from the db
router.get('/ninjas', function(req, res, next){
     // res.send({type: 'GET'});
     // Ninja.find({}).then(function(ninjas){
     //   res.send(ninjas);
     //
     // });

    Ninja.geoNear(
      {
        type: 'Point',
        coordinates: [parseFloat(req.query.lng), parseFloat(req.query.lat)]
      },
      {maxDistance:100000, spherical: true}
    ).then(function(ninjas){
      res.send(ninjas);
    });
});

//add a new ninja
router.post('/ninjas', function(req, res, next){
     // console.log(req.body);
     Ninja.create(req.body).then(function(ninja){
       res.send({
         res.send(ninja);
       }).catch(next);
     });

});


//update a ninja in the db
router.put('/ninjas/:id', function(req, res, next){
     Ninja.findByIdAndUpdate({_id: req.params.id}, req.body)
     .then(function(ninja){
       Ninja.findOne({_id: req.params.id}).then(function(ninjas){
         res.send(ninja);
       });

     });
     res.send({type: 'PUT'});

});

//delete from db

router.delete('/ninjas/:id', function(req, res, next){
     //res.send({type: 'DELETE'});
     //console.log(req.params.id);
     Ninja.findByIdAndRemove({_id: req.params.id})
     .then(function(ninja){
       res.send(ninja);
     });

});


module.exports = router;
