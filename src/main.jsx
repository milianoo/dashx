var Config = require("./config.jsx");

var Widget = require("./lib/widget.jsx");

var ControlPanel = require("./lib/controlPanel.jsx");

var Dashboard = React.createClass({
    getInitialState: function() {
        return {widgets: []};
    },
    addWidget: function(widget) {
        var widgetConfig = {};
        switch (widget.type.toLowerCase()) {
          case "time": widgetConfig = Config.Widgets[0]; break;
          case "news": widgetConfig = Config.Widgets[1]; break;
          case "instagram":  widgetConfig = Config.Widgets[2]; break;
          default: widgetConfig = {};
        }
        this.setState({widgets: this.state.widgets.concat(widgetConfig)});
    },
    render: function() {
        var index = 0;
    return (
        <div id="dashboard">
            <ControlPanel addWidget={this.addWidget} />
            <div id="widgets" className="row">
            {this.state.widgets.map(function(widgetConfig, i) {
                return <Widget key={i} id={i} config={widgetConfig} />;
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