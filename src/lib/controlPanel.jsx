module.exports = React.createClass({
    
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