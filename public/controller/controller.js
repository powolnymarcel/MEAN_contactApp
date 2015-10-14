var app = angular.module("contactApp", []);

app.controller("appCtrl", function($scope,$http) {
	console.log("hello");

	//refresh pour "populer" les td du tableau ainsi que vider les champs des input + une fois le bouton add cliqué, on a un affichage en direct sans 
	// rafraichir la page. 
	var refresh = function(){
			//Va sur le serveur chercher contactlist et si c'est bon attribue les data au scope contacts
		$http.get('/contactlist').success(function(response){
			console.log("J'ai recu les data");
			$scope.contacts = response;
	
			//Pour vider les champs du modele contact
			$scope.contact='';
	
		});
	}
	refresh();

	//Possibilité de faire un .then
	//.then(function(){
	//	console.log("afficher le message : c'est OK");
	//})

									//DATA statiques comme ceci:
	// person1 = {
	// 	name: "tim",
	// 	email: "tim@tim.com",
	// 	number: "111111",
	// };
	// person2 = {
	// 	name: "natalie",
	// 	email: "natalie@natalie.com",
	// 	number: "222222",
	// };
	// person3 = {
	// 	name: "jean",
	// 	email: "jean@jean.com",
	// 	number: "3333",
	// };
	
	// var contacts = [person1, person2,person3];
	//$scope.contacts = contacts;

									//   OU COMME CA 
	// $scope.contactsV2 = [
	// 	{
	// 		name: "jeanA",
	// 		email: "jean@jean.com",
	// 		number: "3333",
	// 	},
	// 	{
	// 		name: "jeanB",
	// 		email: "jean@jean.com",
	// 		number: "3333",
	// 	},
	// 	{
	// 		name: "jeanC",
	// 		email: "jean@jean.com",
	// 		number: "3333",
	// 	}
	// ];

	$scope.addContact= function(contact){
		console.log($scope.contact);
		$http.post('/contactlist',$scope.contact).success(function(response){
			console.log(response);
			refresh();
		});
	};

	$scope.remove=function(id,name){
		console.log(id);
		if(confirm('Etes-vous certain de vouloir supprimer le contact :' +name+' ?')){
			$http.delete('/contactlist/'+id).success(function(response){
				refresh();
			})
		};
	};

	$scope.edit= function(id){
		console.log(id);
		$http.get('/contactlist/'+id).success(function(response){
			$scope.contact=response;
			$scope.boutonAjout= true;
			$scope.boutonEdit= true;

			//refresh();
			//console.log('contact avec ID: '+id+' mis a jour')
		})
	}
	$scope.updateContact= function(){
		$http.put('/contactlist/'+$scope.contact._id,$scope.contact).success(function(response){
			$scope.boutonAjout= false;
			$scope.boutonEdit= false;
			 refresh();

		})
	}
});