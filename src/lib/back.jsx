var Config = require("../config.jsx");

module.exports = React.createClass({
     getInitialState: function() {
        var widget = this.props.setting;
        return {
            widget: widget
        };
    },
    saveSetting: function(){

        var css = ReactDOM.findDOMNode(this.refs.css);
        var interval = ReactDOM.findDOMNode(this.refs.interval);
        
        var setting = {
            style: JSON.parse(css.value),
            interval: interval.value
        }
        this.props.save(setting);
    },
    render: function() {
        return (<div className="back tile text-center">
                    <label>OAuth 2.0</label>
                    <div className="form-group">
                        <button className="btn btn-default" onClick={this.saveSetting}><i className="fa fa-instagram"></i></button>
                        <button className="btn btn-default" onClick={this.saveSetting}><i className="fa fa-facebook"></i></button>
                        <button className="btn btn-default" onClick={this.saveSetting}><i className="fa fa-twitter"></i></button>
                    </div>
                    <div className="form-group">
                        <label>Style</label>
                        <input className="form-control" placeholder="CSS" ref="css" defaultValue={JSON.stringify(this.state.widget.style)} />
                        <label>Interval</label>
                        <input className="form-control" placeholder="Interval" ref="interval" defaultValue={this.state.widget.interval} />
                    </div> 
                    <button className="btn btn-default" onClick={this.saveSetting}>Save</button>
                </div>);
    }
});