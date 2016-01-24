var Config = require("./config.jsx");

var Front = React.createClass({
    getInitialState: function() {
      return {html: ''}; 
    },
    componentDidMount: function(){
        this.loadWidget();
    },
    displayEditMode: function() {
        this.props.edit();
    },
    loadWidget: function() {
        // if there is a apiUrl call it and in callback render the widget
        // else just render the widget 
        var widget = Config.Widgets[this.props.id];
        var content = '';
        if (widget.apiUrl) {
            // call api and set content using result 
            $.ajax({
                url: widget.apiUrl, 
                type: "GET",   
                dataType: 'jsonp',
                cache: false,
                success: function(response){                          
                    content = widget.render(response);
                    this.setState({html: <div>{content}</div>});
                }.bind(this)         
            });
            
        }else{
            content = widget.render();
            this.setState({html: <div>{content}</div>});
        }
    },
    reload: function() {
        console.log(this.props.id + ' called !');
        
        this.loadWidget();
    },
    render: function() {
        clearInterval(this.timer);
        this.timer = setInterval(this.reload, this.props.setting.interval);
        
        return (<div style={this.props.setting.style} className="front tile">
                    <div className="settingButton" onClick={this.displayEditMode}>
                        <span className="glyphicon glyphicon-cog"></span>
                        <span className="title"> Setting</span>
                    </div>
                {this.state.html}
            </div>);
    }
});

var Back = React.createClass({
     getInitialState: function() {
        var widget = Config.Widgets[this.props.id];
        return {
            widget: widget
        };
    },
    saveSetting: function(){
        var apiUrl = ReactDOM.findDOMNode(this.refs.apiUrl);
        var css = ReactDOM.findDOMNode(this.refs.css);
        var interval = ReactDOM.findDOMNode(this.refs.interval);
        
        var setting = {
            apiUrl: apiUrl.value,
            style: JSON.parse(css.value),
            interval: interval.value
        }
        this.props.save(setting);
    },
    render: function() {
        return (<div className="back tile text-center">
                    <div className="form-group">
                        <label>API Url</label>
                        <input className="form-control" placeholder="API URL" ref="apiUrl" defaultValue={this.state.widget.apiUrl} />
                        <label>Style</label>
                        <input className="form-control" placeholder="CSS" ref="css" defaultValue={JSON.stringify(this.state.widget.style)} />
                        <label>Interval</label>
                        <input className="form-control" placeholder="Interval" ref="interval" defaultValue={this.state.widget.interval} />
                    </div> 
                    <button className="btn btn-default" onClick={this.saveSetting}>Save</button>
                </div>);
    }
});

var Widget = React.createClass({
    getInitialState: function() {
        var widget = Config.Widgets[this.props.id];
        var setting = {
            apiUrl: widget.apiUrl,
            style: widget.style,
            interval: widget.interval
        }
        
        return {
            flipped: false,
            setting : setting
        };
    },
    updateWidgetSetting: function (setting){
        this.setState({setting: setting});
        this.viewWidgetSetting();
    },
    viewWidgetSetting: function() {
        this.flip();
    },
    flip: function() {
        this.setState({flipped: !this.state.flipped});
    },
    render: function() {
        return (
            <div className="widget col-md-3 flipper-container horizontal" flipped={this.state.flipped}>
                <div className={"flipper" + (this.state.flipped ? " flipped" : "")}>
                    <Front setting={this.state.setting} edit={this.viewWidgetSetting} id={this.props.id}>the front!</Front>
                    <Back setting={this.state.setting} save={this.updateWidgetSetting} id={this.props.id}></Back>
                </div>
            </div>
            );
    }
});

var ControlPanel = React.createClass({
    handleClick: function(e) {
        // e.preventDefault();
        // var widgetName = ReactDOM.findDOMNode(this.refs.widgetName);
        // add widget to dashboard 
        this.props.addWidget();
    },
    render: function() {
        return (
            <nav className="navbar navbar-inverse navbar-fixed-top">
                <div className="navbar-header">
                  <a className="navbar-brand" href="#"><i className="fa fa-tachometer"></i> DashX</a>
                </div>
                <div className="collapse navbar-collapse">
                  <ul className="nav navbar-nav">
                    <li><a href="#" onClick={this.handleClick}><i className="fa fa-plus-circle"></i> New Widget</a></li>
                  </ul>
                  <div id="signature">By Milad Rezazadeh</div>
                </div>
            </nav>
        );
    }
});


var Dashboard = React.createClass({
    getInitialState: function() {
        return {widgets: []};
    },
    addWidget: function(widgetToAdd) {
        this.setState({widgets: this.state.widgets.concat(widgetToAdd)});
    },
    render: function() {
        var index = 0;
    return (
        <div id="dashboard">
            <ControlPanel addWidget={this.addWidget} />
            <div id="widgets" className="row">
            {this.state.widgets.map(function(widget, i) {
                return <Widget key={i} id={i} name={widget} />;
            })}
            </div>
        </div>
    );
}
,
});

ReactDOM.render(
    <Dashboard name="Vida Loca" />,
    document.getElementById('content')
);