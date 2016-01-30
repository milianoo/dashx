
exports.Widgets = [{
    name: "TIME",
    apiUrl: "",
    style: {},
    interval: 60000,
    type: 'text',
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
    style: {background: 'orange'},
    interval: 100000,
    type: 'text',
    render: function(callback) {
        
        $.ajax({
                url: "https://ajax.googleapis.com/ajax/services/search/news?v=1.0&q=nintex", 
                type: "GET",   
                dataType: 'jsonp',
                cache: false,
                success: function(response){                          
                    var news = [];
                    
                    response.responseData.results.forEach(function(item) {

                        news.push(item.title);
                    });
        
                    callback(news);
                }         
            });
        
    }
},{
    name: "INSTAGRAM",
    style: {background: '#1c5380'},
    interval: 40000,
    type: 'image',
    render: function(access_token, callback) {
        
        var access_token = '';
        var user = 'self';
        
        $.ajax({
                url: "https://api.instagram.com/v1/users/self/media/recent?access_token=" + access_token, 
                type: "GET",   
                dataType: 'jsonp',
                cache: false,
                success: function(response){  
                    
                    var images = [];
                    
                    var posts = response.data;

                    posts.forEach(function(post) {

                        var imageUrl = post.images.thumbnail.url;
                        images.push(imageUrl);
                    });
                    
                    callback(images);
                }         
            });
    }
} ];