/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var Config = __webpack_require__(1);

	var Widget = __webpack_require__(2);

	var ControlPanel = __webpack_require__(7);

	var Dashboard = React.createClass({
	    displayName: "Dashboard",

	    getInitialState: function () {
	        return { widgets: [] };
	    },
	    addWidget: function (widget) {
	        var widgetConfig = {};
	        switch (widget.type.toLowerCase()) {
	            case "time":
	                widgetConfig = Config.Widgets[0];break;
	            case "news":
	                widgetConfig = Config.Widgets[1];break;
	            case "instagram":
	                widgetConfig = Config.Widgets[2];break;
	            default:
	                widgetConfig = {};
	        }
	        this.setState({ widgets: this.state.widgets.concat(widgetConfig) });
	    },
	    render: function () {
	        var index = 0;
	        return React.createElement(
	            "div",
	            { id: "dashboard" },
	            React.createElement(ControlPanel, { addWidget: this.addWidget }),
	            React.createElement(
	                "div",
	                { id: "widgets", className: "row" },
	                this.state.widgets.map(function (widgetConfig, i) {
	                    return React.createElement(Widget, { key: i, id: i, config: widgetConfig });
	                })
	            )
	        );
	    }

	});

	ReactDOM.render(React.createElement(Dashboard, { name: "Vida Loca" }), document.getElementById('content'));

/***/ },
/* 1 */
/***/ function(module, exports) {

	
	exports.Widgets = [{
	    name: "TIME",
	    apiUrl: "",
	    style: {},
	    interval: 60000,
	    type: 'text',
	    render: function (callback) {
	        var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
	        var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
	        var d = new Date();
	        var day = days[d.getDay()];
	        var hr = d.getHours();
	        var min = d.getMinutes();
	        if (min < 10) {
	            min = "0" + min;
	        }
	        var ampm = hr < 12 ? "AM" : "PM";
	        var date = d.getDate();
	        var month = months[d.getMonth()];
	        var year = d.getFullYear();

	        var time = day + " " + hr + ":" + min + ampm + " " + date + " " + month + " " + year;

	        callback(time);
	    }
	}, {
	    name: "NEWS",
	    style: { background: 'orange' },
	    interval: 100000,
	    type: 'text',
	    render: function (callback) {

	        $.ajax({
	            url: "https://ajax.googleapis.com/ajax/services/search/news?v=1.0&q=nintex",
	            type: "GET",
	            dataType: 'jsonp',
	            cache: false,
	            success: function (response) {
	                var news = [];

	                response.responseData.results.forEach(function (item) {

	                    news.push(item.title);
	                });

	                callback(news);
	            }
	        });
	    }
	}, {
	    name: "INSTAGRAM",
	    style: { background: '#1c5380' },
	    interval: 40000,
	    type: 'image',
	    render: function (access_token, callback) {

	        var access_token = '';
	        var user = 'self';

	        $.ajax({
	            url: "https://api.instagram.com/v1/users/self/media/recent?access_token=" + access_token,
	            type: "GET",
	            dataType: 'jsonp',
	            cache: false,
	            success: function (response) {

	                var images = [];

	                var posts = response.data;

	                posts.forEach(function (post) {

	                    var imageUrl = post.images.thumbnail.url;
	                    images.push(imageUrl);
	                });

	                callback(images);
	            }
	        });
	    }
	}];

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var Config = __webpack_require__(1);
	var Front = __webpack_require__(3);
	var Back = __webpack_require__(6);

	module.exports = React.createClass({
	    displayName: "exports",

	    getInitialState: function () {
	        return {
	            flipped: false,
	            setting: this.props.config
	        };
	    },
	    updateWidgetSetting: function (setting) {
	        this.setState({ setting: setting });
	        this.flip();
	    },
	    viewWidgetSetting: function () {
	        this.flip();
	    },
	    flip: function () {
	        this.setState({ flipped: !this.state.flipped });
	    },
	    render: function () {
	        return React.createElement(
	            "div",
	            { className: "widget col-md-3 flipper-container horizontal" },
	            React.createElement(
	                "div",
	                { className: "flipper" + (this.state.flipped ? " flipped" : "") },
	                React.createElement(Front, { setting: this.state.setting, edit: this.viewWidgetSetting, id: this.props.id }),
	                React.createElement(Back, { setting: this.state.setting, save: this.updateWidgetSetting, id: this.props.id })
	            )
	        );
	    }
	});

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var Config = __webpack_require__(1);

	var TextControl = __webpack_require__(4);
	var ImageControl = __webpack_require__(5);

	module.exports = React.createClass({
	    displayName: "exports",

	    getInitialState: function () {
	        return { content: React.createElement("p", null), name: '' };
	    },
	    componentDidMount: function () {
	        this.loadWidget();
	    },
	    displayEditMode: function () {
	        this.props.edit();
	    },
	    loadWidget: function () {

	        var widget = this.props.setting;
	        this.setState({ name: widget.name });
	        // rendering widget data
	        widget.render(function (data) {
	            console.log(data);
	            var newContent;
	            switch (widget.type) {
	                case 'text':
	                    newContent = React.createElement(TextControl, { data: data });
	                    break;
	                case 'image':
	                    newContent = React.createElement(ImageControl, { data: data });
	                    break;

	                default:
	                    newContent = React.createElement(
	                        "p",
	                        null,
	                        "Error loading widget"
	                    );
	            }

	            this.setState({ content: newContent });
	        }.bind(this));
	    },
	    reload: function () {
	        var id = "widget_" + this.props.id;
	        console.log(id + ' called !');

	        $('#' + id).addClass('animated flash');
	        $('#' + id).one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
	            $('#' + id).removeClass('animated flash');
	        });
	        this.loadWidget();
	    },
	    render: function () {
	        clearInterval(this.timer);
	        this.timer = setInterval(this.reload, this.props.setting.interval);
	        var widgetId = "widget_" + this.props.id;
	        return React.createElement(
	            "div",
	            { style: this.props.setting.style, className: "front tile" },
	            React.createElement(
	                "div",
	                { className: "settingButton", onClick: this.displayEditMode },
	                React.createElement("span", { className: "glyphicon glyphicon-cog" }),
	                React.createElement(
	                    "span",
	                    { className: "title" },
	                    " Setting"
	                )
	            ),
	            React.createElement(
	                "div",
	                null,
	                React.createElement(
	                    "h5",
	                    null,
	                    this.state.name
	                )
	            ),
	            React.createElement(
	                "div",
	                { id: widgetId },
	                this.state.content
	            )
	        );
	    }
	});

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = React.createClass({
	    displayName: 'exports',

	    getInitialState: function () {
	        if (typeof this.props.data !== 'string') {
	            this.timer = setInterval(this.changeText, 10000);
	        }

	        return { currentIndex: 0 };
	    },
	    changeText: function () {
	        $('.text-news').addClass('animated fadeIn');
	        $('.text-news').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
	            $('.text-news').removeClass('animated fadeIn');
	        });

	        var index = 0;
	        if (this.state.currentIndex + 1 < this.props.data.length) {
	            index = this.state.currentIndex + 1;
	        }
	        this.setState({ currentIndex: index });
	    },
	    render: function () {

	        if (typeof this.props.data !== 'string') {
	            var text = this.props.data[this.state.currentIndex];
	        } else {
	            var text = this.props.data;
	        }

	        return React.createElement(
	            'div',
	            { className: 'text-news' },
	            React.createElement('p', { dangerouslySetInnerHTML: { __html: text } })
	        );
	    }
	});

/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = React.createClass({
	    displayName: "exports",

	    getInitialState: function () {

	        this.timer = setInterval(this.changeImage, 5000);
	        return { currentIndex: 0 };
	    },
	    changeImage: function () {
	        var index = 0;
	        if (this.state.currentImageIndex + 1 <= this.props.data.length) {
	            index = this.state.currentIndex + 1;
	        }
	        this.setState({ currentIndex: index });
	    },
	    render: function () {

	        var imageUrl = this.props.data[this.state.currentIndex];
	        return React.createElement(
	            "div",
	            null,
	            React.createElement("img", { src: imageUrl })
	        );
	    }
	});

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var Config = __webpack_require__(1);

	module.exports = React.createClass({
	    displayName: "exports",

	    getInitialState: function () {
	        var widget = this.props.setting;
	        return {
	            widget: widget
	        };
	    },
	    saveSetting: function () {

	        var css = ReactDOM.findDOMNode(this.refs.css);
	        var interval = ReactDOM.findDOMNode(this.refs.interval);

	        var setting = {
	            style: JSON.parse(css.value),
	            interval: interval.value
	        };
	        this.props.save(setting);
	    },
	    render: function () {
	        return React.createElement(
	            "div",
	            { className: "back tile text-center" },
	            React.createElement(
	                "label",
	                null,
	                "OAuth 2.0"
	            ),
	            React.createElement(
	                "div",
	                { className: "form-group" },
	                React.createElement(
	                    "button",
	                    { className: "btn btn-default", onClick: this.saveSetting },
	                    React.createElement("i", { className: "fa fa-instagram" })
	                ),
	                React.createElement(
	                    "button",
	                    { className: "btn btn-default", onClick: this.saveSetting },
	                    React.createElement("i", { className: "fa fa-facebook" })
	                ),
	                React.createElement(
	                    "button",
	                    { className: "btn btn-default", onClick: this.saveSetting },
	                    React.createElement("i", { className: "fa fa-twitter" })
	                )
	            ),
	            React.createElement(
	                "div",
	                { className: "form-group" },
	                React.createElement(
	                    "label",
	                    null,
	                    "Style"
	                ),
	                React.createElement("input", { className: "form-control", placeholder: "CSS", ref: "css", defaultValue: JSON.stringify(this.state.widget.style) }),
	                React.createElement(
	                    "label",
	                    null,
	                    "Interval"
	                ),
	                React.createElement("input", { className: "form-control", placeholder: "Interval", ref: "interval", defaultValue: this.state.widget.interval })
	            ),
	            React.createElement(
	                "button",
	                { className: "btn btn-default", onClick: this.saveSetting },
	                "Save"
	            )
	        );
	    }
	});

/***/ },
/* 7 */
/***/ function(module, exports) {

	"use strict";

	var WidgetAddFrom = React.createClass({
	  displayName: 'WidgetAddFrom',

	  getInitialState: function () {
	    return {
	      widgetName: '',
	      widgetType: '',
	      url: '',
	      response: '',
	      dataField: '',
	      dataSourceAccepted: 'Not Yet'
	    };
	  },
	  handleNameChange: function (e) {
	    this.setState({ widgetName: e.target.value });
	  },
	  handleWidgetTypeChange: function (e) {
	    this.setState({ widgetType: e.target.value });
	  },
	  handleDataFieldChange: function (e) {
	    this.setState({ dataField: e.target.value });
	  },
	  handleUrlChange: function (e) {
	    this.setState({ url: e.target.value }, function () {
	      $.ajax({
	        url: this.state.url,
	        type: "GET",
	        dataType: 'jsonp',
	        cache: false,
	        success: function (response) {
	          var result;
	          // TODO: set one data source as array + field names to display
	          if (this.state.dataField) {
	            result = eval("response.responseData." + this.state.dataField);
	          } else {
	            result = response.responseData;
	          }
	          console.log($.isArray(result));
	          if ($.isArray(result)) {
	            this.setState({ dataSourceAccepted: 'Yes! Found ' + result.length + ' items.' });
	            for (var key in result[0]) {
	              console.log(key);
	            }
	          }

	          this.setState({ response: JSON.stringify(result, null, 4) });
	        }.bind(this),
	        error: function (xhr, ajaxOptions, thrownError) {
	          this.setState({ response: thrownError });
	        }.bind(this)
	      });
	    });
	  },
	  handleSubmit: function () {
	    if (this.state.widgetName.length > 0 && this.state.widgetType.length > 0) {

	      // add new widget
	      this.props.onSubmit({ name: this.state.widgetName, type: this.state.widgetType });
	    }
	  },
	  render: function () {
	    return React.createElement(
	      'div',
	      { id: 'myModal', className: 'modal fade', role: 'dialog' },
	      React.createElement(
	        'div',
	        { className: 'modal-dialog' },
	        React.createElement(
	          'div',
	          { className: 'modal-content' },
	          React.createElement(
	            'div',
	            { className: 'modal-header' },
	            React.createElement(
	              'button',
	              { type: 'button', className: 'close', 'data-dismiss': 'modal' },
	              '×'
	            ),
	            React.createElement(
	              'h4',
	              { className: 'modal-title' },
	              React.createElement('i', { className: 'fa fa-plus-circle' }),
	              ' New Widget'
	            )
	          ),
	          React.createElement(
	            'div',
	            { className: 'modal-body' },
	            React.createElement(
	              'div',
	              { className: 'form-group' },
	              React.createElement(
	                'label',
	                null,
	                'Widget Name'
	              ),
	              React.createElement('input', { type: 'text', className: 'form-control', placeholder: 'Widget Name', onChange: this.handleNameChange })
	            ),
	            React.createElement(
	              'form',
	              { className: 'widgetAddForm' },
	              React.createElement(
	                'div',
	                { className: 'form-group' },
	                React.createElement(
	                  'label',
	                  null,
	                  'Widget to add'
	                ),
	                React.createElement(
	                  'select',
	                  { className: 'form-control', id: 'widgetType', onChange: this.handleWidgetTypeChange },
	                  React.createElement(
	                    'option',
	                    null,
	                    'Time'
	                  ),
	                  React.createElement(
	                    'option',
	                    null,
	                    'News'
	                  ),
	                  React.createElement(
	                    'option',
	                    null,
	                    'Instagram'
	                  )
	                )
	              ),
	              React.createElement('hr', null),
	              React.createElement(
	                'div',
	                { className: 'form-group row' },
	                React.createElement(
	                  'div',
	                  { className: 'col-md-6' },
	                  React.createElement(
	                    'label',
	                    null,
	                    'HTTP GET Request URL'
	                  ),
	                  React.createElement('input', { type: 'text', className: 'form-control', placeholder: 'Data Source URL', onChange: this.handleUrlChange })
	                ),
	                React.createElement(
	                  'div',
	                  { className: 'col-md-6' },
	                  React.createElement(
	                    'label',
	                    null,
	                    'JSON Data Field Name'
	                  ),
	                  React.createElement('input', { type: 'text', className: 'form-control', placeholder: 'Data Field', onChange: this.handleDataFieldChange })
	                )
	              ),
	              React.createElement(
	                'div',
	                { className: 'form-group' },
	                React.createElement(
	                  'label',
	                  null,
	                  'Data Source Provided : ',
	                  this.state.dataSourceAccepted
	                ),
	                React.createElement('textarea', { className: 'form-control', value: this.state.response })
	              )
	            )
	          ),
	          React.createElement(
	            'div',
	            { className: 'modal-footer' },
	            React.createElement(
	              'button',
	              { type: 'button', className: 'btn btn-default', 'data-dismiss': 'modal', onClick: this.handleSubmit },
	              'Add'
	            )
	          )
	        )
	      )
	    );
	  }
	});

	module.exports = React.createClass({
	  displayName: 'exports',

	  addNewWidget: function (widget) {
	    this.props.addWidget(widget);
	  },
	  render: function () {
	    return React.createElement(
	      'nav',
	      { className: 'navbar navbar-inverse navbar-fixed-top' },
	      React.createElement(
	        'div',
	        { className: 'navbar-header' },
	        React.createElement(
	          'a',
	          { className: 'navbar-brand', href: '#' },
	          React.createElement('i', { className: 'fa fa-tachometer' }),
	          ' DashX'
	        )
	      ),
	      React.createElement(
	        'div',
	        { className: 'collapse navbar-collapse' },
	        React.createElement(
	          'ul',
	          { className: 'nav navbar-nav' },
	          React.createElement(
	            'li',
	            null,
	            React.createElement(
	              'a',
	              { href: '#', 'data-toggle': 'modal', 'data-target': '#myModal' },
	              React.createElement('i', { className: 'fa fa-plus-circle' }),
	              ' New Widget'
	            )
	          )
	        ),
	        React.createElement(
	          'div',
	          { id: 'signature' },
	          'By Milad Rezazadeh'
	        )
	      ),
	      React.createElement(
	        'div',
	        null,
	        React.createElement(WidgetAddFrom, { onSubmit: this.addNewWidget })
	      )
	    );
	  }
	});

/***/ }
/******/ ]);