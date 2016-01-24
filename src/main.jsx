var Front = React.createClass({
    getInitialState: function() {
      return {html: ''}; 
    },
    componentDidMount: function(){
        this.timer = setInterval(this.reload, 5000);
    },
    displayEditMode: function() {
        this.props.edit();
    },
    reload: function() {
        console.log(this.props.id + ' called !');
        
        this.setState({html: <div><h1>Widget {this.props.id}</h1><p>The content will aprear here</p></div>});
    },
    render: function() {
        return (<div className="front tile">
                    <div className="settingButton" onClick={this.displayEditMode}>
                        <span className="glyphicon glyphicon-cog"></span>
                        <span className="title"> Setting</span>
                    </div>
                <a>{this.props.setting.apiUrl}</a>
                {this.state.html}
            </div>);
    }
});

var Back = React.createClass({
    saveSetting: function(){
        var apiUrl = ReactDOM.findDOMNode(this.refs.apiUrl);

        var setting = {
            apiUrl: apiUrl.value
        }
        this.props.save(setting);
    },
    render: function() {
        return (<div className="back tile text-center">
                    <h3>Setting</h3>
                    <input placeholder="API URL" ref="apiUrl" />
                    <button onClick={this.saveSetting}>Save</button>
                </div>);
    }
});

var Widget = React.createClass({
    getInitialState: function() {
        return {
            flipped: false,
            setting : {}
        };
    },
    updateWidgetSetting: function (setting){
        console.log("url" + setting.apiUrl);
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
        console.log(this.props.id);
        return (
            <div className="widget col-md-3 flipper-container horizontal" flipped={this.state.flipped}>
                <div className={"flipper" + (this.state.flipped ? " flipped" : "")}>
                    <Front setting={this.state.setting} edit={this.viewWidgetSetting} id={this.props.id}>the front!</Front>
                    <Back setting={this.state.setting} save={this.updateWidgetSetting}></Back>
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