var Config = require("../config.jsx");
var Front = require("./front.jsx"); 
var Back = require("./back.jsx");

module.exports = React.createClass({
    
    getInitialState: function() {
        var widget = Config.Widgets[this.props.id];
        var setting = {
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
        this.flip();
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