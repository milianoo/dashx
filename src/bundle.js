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
	        return { widgets: Config.Widgets };
	    },
	    addWidget: function (widgetToAdd) {
	        this.setState({ widgets: this.state.widgets.concat(widgetToAdd) });
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
	                this.state.widgets.map(function (widget, i) {
	                    return React.createElement(Widget, { key: i, id: i, name: widget });
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

	                    console.log(item);

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

	        var access_token = '46880316.47f374f.ebd92575730a4b12bd9e3cd3298b3322';
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
	        var widget = Config.Widgets[this.props.id];
	        var setting = {
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

	        var widget = Config.Widgets[this.props.id];
	        this.setState({ name: widget.name });
	        // rendering widget data
	        widget.render(function (data) {

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

	        return { text: this.props.data, currentIndex: 0 };
	    },
	    changeText: function () {
	        $('.text-news').addClass('animated fadeIn');
	        $('.text-news').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
	            $('.text-news').removeClass('animated fadeIn');
	        });

	        var index = 0;
	        if (this.state.currentIndex + 1 < this.state.text.length) {
	            index = this.state.currentIndex + 1;
	        }
	        this.setState({ currentIndex: index });
	    },
	    render: function () {

	        if (typeof this.props.data !== 'string') {
	            var text = this.state.text[this.state.currentIndex];
	        } else {
	            var text = this.state.text;
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
	        return { images: this.props.data, currentIndex: 0 };
	    },
	    changeImage: function () {
	        var index = 0;
	        if (this.state.currentImageIndex + 1 <= this.state.images.length) {
	            index = this.state.currentIndex + 1;
	        }
	        this.setState({ currentIndex: index });
	    },
	    render: function () {
	        var imageUrl = this.state.images[this.state.currentIndex];
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
	        var widget = Config.Widgets[this.props.id];
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

	module.exports = React.createClass({
	    displayName: "exports",

	    handleClick: function (e) {
	        this.props.addWidget();
	    },
	    render: function () {
	        return React.createElement(
	            "nav",
	            { className: "navbar navbar-inverse navbar-fixed-top" },
	            React.createElement(
	                "div",
	                { className: "navbar-header" },
	                React.createElement(
	                    "a",
	                    { className: "navbar-brand", href: "#" },
	                    React.createElement("i", { className: "fa fa-tachometer" }),
	                    " DashX"
	                )
	            ),
	            React.createElement(
	                "div",
	                { className: "collapse navbar-collapse" },
	                React.createElement(
	                    "ul",
	                    { className: "nav navbar-nav" },
	                    React.createElement(
	                        "li",
	                        null,
	                        React.createElement(
	                            "a",
	                            { href: "#", onClick: this.handleClick },
	                            React.createElement("i", { className: "fa fa-plus-circle" }),
	                            " New Widget"
	                        )
	                    )
	                ),
	                React.createElement(
	                    "div",
	                    { id: "signature" },
	                    "By Milad Rezazadeh"
	                )
	            )
	        );
	    }
	});

/***/ }
/******/ ]);