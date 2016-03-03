"use strict"
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
                    <li><a href="#" data-toggle="modal" data-target="#myModal"><i className="fa fa-plus-circle"></i> New Widget</a></li>
                  </ul>
                  <div id="signature">By Milad Rezazadeh</div>
                </div>
                
                <div>
                    <div id="myModal" className="modal fade" role="dialog">
                  <div className="modal-dialog">
                
                    <div className="modal-content">
                      <div className="modal-header">
                        <button type="button" className="close" data-dismiss="modal">&times;</button>
                        <h4 className="modal-title"><i className="fa fa-plus-circle"></i> New Widget</h4>
                      </div>
                      <div className="modal-body">
                        <div className="form-group">
                            <label for="exampleInputEmail1">Widget Name</label>
                            <input type="text" className="form-control" id="inputName" placeholder="Widget Name"></input>
                        </div>
                        <div className="form-group">
                          <label for="sel1">Widget to add</label>
                          <select className="form-control" id="widgetType">
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                          </select>
                        </div>
                      </div>
                      <div className="modal-footer">
                        <button type="button" className="btn btn-default" data-dismiss="modal" onClick={this.handleClick}>Add</button>
                      </div>
                    </div>
                      </div>
                    </div>
                </div>
            </nav>
            
        );
    }
});