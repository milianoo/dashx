var Config = require("../config.jsx");

var TextControl = require("./controls/textControl.jsx");
var ImageControl = require("./controls/imageControl.jsx");

module.exports = React.createClass({
    getInitialState: function() {
      return {content: <p></p>, name: ''}; 
    },
    componentDidMount: function(){
        this.loadWidget();
    },
    displayEditMode: function() {
        this.props.edit();
    },
    loadWidget: function() {

        var widget = this.props.setting;
        this.setState({name: widget.name});
        // rendering widget data
        widget.render(function(data) {
            console.log(data);
            var newContent;
            switch (widget.type) {
                case 'text':
                    newContent = <TextControl data={data} />
                    break;
                case 'image':
                    newContent = <ImageControl data={data} />
                    break;
                
                default:
                    newContent = <p>Error loading widget</p>
            }
            
            this.setState({content : newContent});
            
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
        var widgetId = "widget_" + this.props.id;
        return (<div style={this.props.setting.style} className="front tile">
                    <div className="settingButton" onClick={this.displayEditMode}>
                        <span className="glyphicon glyphicon-cog"></span>
                        <span className="title"> Setting</span>
                    </div>
                    <div>
                        <h5>{this.state.name}</h5>
                    </div>
                    <div id={widgetId}>
                        {this.state.content}
                    </div>
                </div>);
    }
});