/*  API/getCourses.js
    Robin Marillia

    Recupere les todos depuis une API
*/

function getTodos(callback){
    
    // le json donné dans l'énoncé contient un virgule en trop qui empeche d'utiliser JSON.parse
    // j'ai donc uploadé une version sur un repo github et utilisé un service de test d'api 

    // ce service n'est pas à utiliser en production et sert juste d'outil pour implémenter les composants react 

    fetch("https://my-json-server.typicode.com/robin4a4/todojson/db"
      ).then(function(response) {

        return response.json()
      }).then(function (value) {
            
            // on utilise le callback en envoyant la liste des taches
            callback(value.tasks)
      })
      
}

export default getTodos 