var Config = require("./config.jsx");

var Widget = require("./lib/widget.jsx");

var ControlPanel = require("./lib/controlPanel.jsx");

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