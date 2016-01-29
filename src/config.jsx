exports.Widgets = [{
    name: "TIME",
    apiUrl: "",
    style: {},
    interval: 60000,
    render: function(callback) {
        var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        var d = new Date();
        var day = days[d.getDay()];
        var hr = d.getHours();
        var min = d.getMinutes();
        if (min < 10) {
            min = "0" + min;
        }
        var ampm = hr < 12 ? "AM" : "PM";
        var date = d.getDate();
        var month = months[d.getMonth()];
        var year = d.getFullYear();

        var time = day + " " + hr + ":" + min + ampm + " " + date + " " + month + " " + year;

        callback(time);
    }
},{
    name: "NEWS",
    apiUrl: "https://ajax.googleapis.com/ajax/services/search/news?v=1.0&q=nintex",
    style: {background: 'orange'},
    interval: 10000,
    data: {dataFieldName: 'title', displayType: 'text'},
    render: function(callback) {
        
        $.ajax({
                url: "https://ajax.googleapis.com/ajax/services/search/news?v=1.0&q=nintex", 
                type: "GET",   
                dataType: 'jsonp',
                cache: false,
                success: function(response){                          
                    var news = response.responseData.results;
        
                    callback(news);
                }         
            });
        
    }
} ];