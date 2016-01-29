var Config = require("./config.jsx");

var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

var TextControl = React.createClass({
    render: function() {
        return (<div>
                    <p>{this.props.value}</p>
                </div>);
    }
});

var Front = React.createClass({
    getInitialState: function() {
      return {controls: [], name: ''}; 
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
        this.setState({name: widget.name});
        
        widget.render(function(content){
            
            var controls = [];
            
            if (typeof content === 'object' || typeof content === 'array') {
                
                content.map(function(data, i){
                    
                    var dataContent = data[widget.data.dataFieldName];
                    
                    var control = {content: dataContent, type: widget.data.displayType};
                    
                    controls.push(control);
                });
            }else{
                var control = {content: content, type: 'text'};
                
                controls.push(control);
            }
            
            this.setState({controls: controls});
            
        }.bind(this));
        
    },
    reload: function() {
        var id = "widget_" + this.props.id;
        console.log(id + ' called !');
        
        $('#'+id).addClass('animated flash');
        $('#'+id).one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
            $('#'+id).removeClass('animated flash');
        });
        this.loadWidget();
    },
    render: function() {
        clearInterval(this.timer);
        this.timer = setInterval(this.reload, this.props.setting.interval);
        var id = "widget_" + this.props.id;
        return (<div style={this.props.setting.style} className="front tile">
                    <div className="settingButton" onClick={this.displayEditMode}>
                        <span className="glyphicon glyphicon-cog"></span>
                        <span className="title"> Setting</span>
                    </div>
                    <div>
                        <h3>{this.state.name}</h3>
                    </div>
                    <div id={id}>
                    {this.state.controls.map(function(control, i){
                        switch (control.displayType) {
                            case 'text':
                                return <TextControl key={i} value={control.content} />
                                break;
                            
                            default:
                                return <TextControl key={i} value={control.content} />
                        }
                        
                        
                    })}
                    </div>
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
        return ( <div className="widget col-md-3 flipper-container horizontal">
                        <div className={"flipper" + (this.state.flipped ? " flipped" : "")}>
                            <Front setting={this.state.setting} edit={this.viewWidgetSetting} id={this.props.id}></Front>
                            <Back setting={this.state.setting} save={this.updateWidgetSetting} id={this.props.id}></Back>
                        </div>
                    </div>
            );
    }
});

var ControlPanel = React.createClass({
    handleClick: function(e) {
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
        return {widgets: Config.Widgets};
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