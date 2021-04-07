function makeServiceAjax(){
    var urlBase = "http://musicbrainz.org/ws/2/";

    var service = {
        getListItems:getListItems,
        getItemInfo:getItemInfo
    };

    function getListItems(category, input){
        var url;

        switch(category){
            case "artists":
            default:

                if(input == ""){
                    url = urlBase+"artist/?query=artist&limit=100&fmt=json";
                }else{
                    url = urlBase+"artist/?query=artist:"+input+"&limit=50&fmt=json";
                }

                break;

            case "releases":

                if(input == ""){
                    url = urlBase+"release/?query=release&limit=100&fmt=json";
                }else{
                    url = urlBase+"release/?query=release:"+input+"&limit=50&fmt=json";
                }

                break;

            case "recordings":

                if(input == ""){
                    url = urlBase+"recording/?query=recording&limit=100&fmt=json";
                }else{
                    url = urlBase+"recording/?query=recording:"+input+"&limit=50&fmt=json";
                }

                break;
        }

        return new Promise(function(resolve, reject){
            var http = new XMLHttpRequest();

            http.open("GET", url);
            http.responseType = "json";
            http.send();

            http.onload = function(){
                resolve(http.response);
            };

            http.onerror = function(){
                reject("Erreur");
            };
        });
    }

    function getItemInfo(category, id){
        var url;

        switch(category){
            case "artists":
            default:
                url = urlBase+"artist/"+id+"?inc=recordings+releases&fmt=json";
                break;

            case "releases":
                url = urlBase+"release/"+id+"?inc=artists+recordings&fmt=json";
                break;

            case "recordings":
                url = urlBase+"recording/"+id+"?inc=artists+releases&fmt=json";
                break;
        }

        return new Promise(function(resolve, reject){
            var http = new XMLHttpRequest();

            http.open("GET", url);
            http.responseType = "json";
            http.send();

            http.onload = function(){
                if(http.status == 200){
                    resolve(http.response);
                }else{
                    reject("Erreur");
                }
            };

            http.onerror = function(){
                reject("Erreur");
            };
        });
    }

    return service;
}