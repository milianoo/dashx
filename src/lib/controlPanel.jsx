"use strict"

var WidgetAddFrom = React.createClass({
  getInitialState: function() {
        return {
          widgetName: '',
          widgetType: '',
          url: '',
          response: '',
          dataField: '',
          dataSourceAccepted: 'Not Yet'
        };
  },
  handleNameChange: function(e){
    this.setState({widgetName: e.target.value});
  },
  handleWidgetTypeChange: function(e){
    this.setState({widgetType: e.target.value});
  },
  handleDataFieldChange: function(e){
    
    // TODO: onChange call ajax request again.
    
    this.setState({dataField: e.target.value});
  },
  handleUrlChange: function(e){
    this.setState({url: e.target.value}, function() {
        $.ajax({
          url: this.state.url, 
          type: "GET",   
          dataType: 'jsonp',
          cache: false,
          success: function(response){ 
              var result;
              // TODO: set one data source as array + field names to display 
              if (this.state.dataField){
                result = eval("response.responseData." + this.state.dataField);
              }else{
                result = response.responseData;
              }
              console.log($.isArray(result));
              if ($.isArray(result)) {
                this.setState({dataSourceAccepted: 'Yes! Found ' + result.length + ' items.'});
                for (var fieldsToDisplay in result[0]) {
                  
                  // TODO : ability to select fields to display
                  console.log(fieldsToDisplay);
                }
              }
              
              this.setState({response: JSON.stringify(result, null, 4)});
          }.bind(this),
          error: function (xhr, ajaxOptions, thrownError) {
              this.setState({response: thrownError});
          }.bind(this)
        });
    });
  },
  handleSubmit: function() {
    if (this.state.widgetName.length > 0 && this.state.widgetType.length > 0){

       // add new widget
       this.props.onSubmit({name: this.state.widgetName, type: this.state.widgetType});
    }
  },
  render: function() {
    return (
      <div id="myModal" className="modal fade" role="dialog">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal">&times;</button>
              <h4 className="modal-title"><i className="fa fa-plus-circle"></i> New Widget</h4>
            </div>
            <div className="modal-body">
              <div className="form-group">
                  <label>Widget Name</label>
                  <input type="text" className="form-control" placeholder="Widget Name" onChange={this.handleNameChange}></input>
              </div>
              <form className="widgetAddForm">
                <div className="form-group">
                  <label>Widget to add</label>
                  <select className="form-control" id="widgetType" onChange={this.handleWidgetTypeChange}>
                    <option>Time</option>
                    <option>News</option>
                    <option>Instagram</option>
                  </select>
                </div>
                <hr/>
                <div className="form-group row">
                  <div className="col-md-6">
                    <label>HTTP GET Request URL</label>
                    <input type="text" className="form-control" placeholder="Data Source URL" onChange={this.handleUrlChange}></input>
                  </div>
                  <div className="col-md-6">
                    <label>JSON Data Field Name</label>
                    <input type="text" className="form-control" placeholder="Data Field" onChange={this.handleDataFieldChange}></input>
                  </div>
                </div>
                <div className="form-group">
                  <label>Data Source Provided : {this.state.dataSourceAccepted}</label>
                  <textarea className="form-control" value={this.state.response} ></textarea>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-default" data-dismiss="modal" onClick={this.handleSubmit}>Add</button>
            </div>
          </div>
        </div>
      </div>
      );
    
  }
});

module.exports = React.createClass({
    addNewWidget: function(widget) {
        this.props.addWidget(widget);
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
                    <WidgetAddFrom onSubmit={this.addNewWidget} />
                </div>
            </nav>
            
        );
    }
});