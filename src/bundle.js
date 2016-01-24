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

	var Front = React.createClass({
	    displayName: 'Front',

	    getInitialState: function () {
	        return { html: '' };
	    },
	    componentDidMount: function () {
	        this.loadWidget();
	    },
	    displayEditMode: function () {
	        this.props.edit();
	    },
	    loadWidget: function () {
	        // if there is a apiUrl call it and in callback render the widget
	        // else just render the widget
	        var widget = Config.Widgets[this.props.id];
	        var content = '';
	        if (widget.apiUrl) {
	            // call api and set content using result
	            $.ajax({
	                url: widget.apiUrl,
	                type: "GET",
	                dataType: 'jsonp',
	                cache: false,
	                success: function (response) {
	                    content = widget.render(response);
	                    this.setState({ html: React.createElement(
	                            'div',
	                            null,
	                            content
	                        ) });
	                }.bind(this)
	            });
	        } else {
	            content = widget.render();
	            this.setState({ html: React.createElement(
	                    'div',
	                    null,
	                    content
	                ) });
	        }
	    },
	    reload: function () {
	        console.log(this.props.id + ' called !');

	        this.loadWidget();
	    },
	    render: function () {
	        clearInterval(this.timer);
	        this.timer = setInterval(this.reload, this.props.setting.interval);

	        return React.createElement(
	            'div',
	            { style: this.props.setting.style, className: 'front tile' },
	            React.createElement(
	                'div',
	                { className: 'settingButton', onClick: this.displayEditMode },
	                React.createElement('span', { className: 'glyphicon glyphicon-cog' }),
	                React.createElement(
	                    'span',
	                    { className: 'title' },
	                    ' Setting'
	                )
	            ),
	            this.state.html
	        );
	    }
	});

	var Back = React.createClass({
	    displayName: 'Back',

	    getInitialState: function () {
	        var widget = Config.Widgets[this.props.id];
	        return {
	            widget: widget
	        };
	    },
	    saveSetting: function () {
	        var apiUrl = ReactDOM.findDOMNode(this.refs.apiUrl);
	        var css = ReactDOM.findDOMNode(this.refs.css);
	        var interval = ReactDOM.findDOMNode(this.refs.interval);

	        var setting = {
	            apiUrl: apiUrl.value,
	            style: JSON.parse(css.value),
	            interval: interval.value
	        };
	        this.props.save(setting);
	    },
	    render: function () {
	        return React.createElement(
	            'div',
	            { className: 'back tile text-center' },
	            React.createElement(
	                'div',
	                { className: 'form-group' },
	                React.createElement(
	                    'label',
	                    null,
	                    'API Url'
	                ),
	                React.createElement('input', { className: 'form-control', placeholder: 'API URL', ref: 'apiUrl', defaultValue: this.state.widget.apiUrl }),
	                React.createElement(
	                    'label',
	                    null,
	                    'Style'
	                ),
	                React.createElement('input', { className: 'form-control', placeholder: 'CSS', ref: 'css', defaultValue: JSON.stringify(this.state.widget.style) }),
	                React.createElement(
	                    'label',
	                    null,
	                    'Interval'
	                ),
	                React.createElement('input', { className: 'form-control', placeholder: 'Interval', ref: 'interval', defaultValue: this.state.widget.interval })
	            ),
	            React.createElement(
	                'button',
	                { className: 'btn btn-default', onClick: this.saveSetting },
	                'Save'
	            )
	        );
	    }
	});

	var Widget = React.createClass({
	    displayName: 'Widget',

	    getInitialState: function () {
	        var widget = Config.Widgets[this.props.id];
	        var setting = {
	            apiUrl: widget.apiUrl,
	            style: widget.style,
	            interval: widget.interval
	        };

	        return {
	            flipped: false,
	            setting: setting
	        };
	    },
	    updateWidgetSetting: function (setting) {
	        this.setState({ setting: setting });
	        this.viewWidgetSetting();
	    },
	    viewWidgetSetting: function () {
	        this.flip();
	    },
	    flip: function () {
	        this.setState({ flipped: !this.state.flipped });
	    },
	    render: function () {
	        return React.createElement(
	            'div',
	            { className: 'widget col-md-3 flipper-container horizontal', flipped: this.state.flipped },
	            React.createElement(
	                'div',
	                { className: "flipper" + (this.state.flipped ? " flipped" : "") },
	                React.createElement(
	                    Front,
	                    { setting: this.state.setting, edit: this.viewWidgetSetting, id: this.props.id },
	                    'the front!'
	                ),
	                React.createElement(Back, { setting: this.state.setting, save: this.updateWidgetSetting, id: this.props.id })
	            )
	        );
	    }
	});

	var ControlPanel = React.createClass({
	    displayName: 'ControlPanel',

	    handleClick: function (e) {
	        // e.preventDefault();
	        // var widgetName = ReactDOM.findDOMNode(this.refs.widgetName);
	        // add widget to dashboard
	        this.props.addWidget();
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
	                            { href: '#', onClick: this.handleClick },
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
	            )
	        );
	    }
	});

	var Dashboard = React.createClass({
	    displayName: 'Dashboard',

	    getInitialState: function () {
	        return { widgets: [] };
	    },
	    addWidget: function (widgetToAdd) {
	        this.setState({ widgets: this.state.widgets.concat(widgetToAdd) });
	    },
	    render: function () {
	        var index = 0;
	        return React.createElement(
	            'div',
	            { id: 'dashboard' },
	            React.createElement(ControlPanel, { addWidget: this.addWidget }),
	            React.createElement(
	                'div',
	                { id: 'widgets', className: 'row' },
	                this.state.widgets.map(function (widget, i) {
	                    return React.createElement(Widget, { key: i, id: i, name: widget });
	                })
	            )
	        );
	    }

	});

	ReactDOM.render(React.createElement(Dashboard, { name: 'Vida Loca' }), document.getElementById('content'));

/***/ },
/* 1 */
/***/ function(module, exports) {

	exports.Widgets = [{
	    name: "time",
	    apiUrl: "",
	    style: {},
	    interval: 60000,
	    render: function () {
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

	        return React.createElement(
	            "div",
	            { className: "text-center" },
	            React.createElement(
	                "h1",
	                null,
	                "Today"
	            ),
	            React.createElement(
	                "h2",
	                null,
	                time
	            )
	        );
	    }
	}, {
	    name: "news",
	    apiUrl: "https://ajax.googleapis.com/ajax/services/search/news?v=1.0&q=nintex",
	    style: { background: 'orange' },
	    interval: 5000,
	    render: function (data) {
	        var news = data.responseData.results;

	        return React.createElement(
	            "div",
	            { className: "text-center" },
	            React.createElement(
	                "b",
	                null,
	                "News"
	            ),
	            React.createElement("p", { dangerouslySetInnerHTML: { __html: news[0].title } }),
	            React.createElement("p", { dangerouslySetInnerHTML: { __html: news[1].title } }),
	            React.createElement("p", { dangerouslySetInnerHTML: { __html: news[3].title } })
	        );
	    }
	}];

/***/ }
/******/ ]);