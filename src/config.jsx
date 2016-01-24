exports.Widgets = [{
    name: "time",
    apiUrl: "",
    style: {},
    interval: 60000,
    render: function() {
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

        return (<div className="text-center">
                    <h1>Today</h1>
                    <h2>{time}</h2>
                </div>);
    }
},{
    name: "news",
    apiUrl: "https://ajax.googleapis.com/ajax/services/search/news?v=1.0&q=nintex",
    style: {background: 'orange'},
    interval: 5000,
    render: function(data) {
        var news = data.responseData.results;
        
        return (<div className="text-center">
                    <b>News</b>
                    <p dangerouslySetInnerHTML={{__html: news[0].title}}></p>
                    <p dangerouslySetInnerHTML={{__html: news[1].title}}></p>
                    <p dangerouslySetInnerHTML={{__html: news[3].title}}></p>
                </div>);
    }
} ];