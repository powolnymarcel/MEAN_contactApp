var mongojs = require('mongojs');
var express = require('express');
var app = express();
				//Quel BD et quel collection utiliser
var db = mongojs('contactlist',['contactlist'])

var bodyParser=require('body-parser');

// app.get('',function(req,res){
// 	res.send('Hello from server.js');
// });

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());


		app.get('/contactlist', function(req,res){
			console.log("J'ai recu une requete GET");

		db.contactlist.find(function(err,docs){
			console.log(docs);
			res.json(docs);
		});


		//Venir chercher des data statique sur le serveur
// 	person1 = {
// 		name: "tim",
// 		email: "tim@tim.com",
// 		number: "111111",
// 	};
// 	person2 = {
// 		name: "natalie",
// 		email: "natalie@natalie.com",
// 		number: "222222",
// 	};
// 	person3 = {
// 		name: "jean",
// 		email: "jean@jean.com",
// 		number: "3333",
// 	};
	
// 	var contactlist = [person1, person2,person3];

// 	res.json(contactlist);

});

	//Ecoute les requetes POST du controlleur
app.post('/contactlist',function(req,res){
	//req.body -> Ne fonctionnera que si le module bodyParser est activé
	console.log(req.body);
		console.log('***********AJOUT DE 1 CONTACT ********************' )
	db.contactlist.insert(req.body,function(err, doc){
		res.json(doc);
	});

});

app.delete('/contactlist/:id',function(req,res){
	var id = req.params.id;
		console.log('***********DELETE DE L\'ID: '+id+'********************' )
	db.contactlist.remove({_id:mongojs.ObjectId(id)},function(err,doc){
		res.json(doc);
	});
});

	app.get('/contactlist/:id',function(req,res){
		var id = req.params.id;
			console.log('***********RECUPERATION INFOS DE L\'ID: '+id+'********************' );
			db.contactlist.findOne({_id:mongojs.ObjectId(id)},function(err,doc){
				//Je renvoie les infos vers le Ctrl
				res.json(doc);
			});
	});

	app.put('/contactlist/:id',function(req,res){
		var id = req.params.id;
			console.log('***********UPDATE Du nom: '+req.body.name+'********************' );
			db.contactlist.findAndModify({
											query:{_id:mongojs.ObjectId(id)},
											update:{$set:{name:req.body.name,email:req.body.email,tel:req.body.tel}},
											new :true
										},function(err,doc){
					res.json(doc);
			})
	});

app.listen(3000);
console.log('server running on port 3000');