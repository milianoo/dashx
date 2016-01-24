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

	var React = __webpack_require__(1);
	var Draggable = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"react-draggable\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));

	var Front = React.createClass({
	    displayName: 'Front',

	    getInitialState: function () {
	        return { html: '' };
	    },
	    componentDidMount: function () {
	        console.log('test');
	        this.timer = setInterval(this.reload, 5000);
	    },
	    displayEditMode: function () {
	        this.props.edit();
	    },
	    reload: function () {
	        console.log(this.props.id + ' called !');

	        this.setState({ html: React.createElement(
	                'div',
	                null,
	                React.createElement(
	                    'h1',
	                    null,
	                    'Widget ',
	                    this.props.id
	                ),
	                React.createElement(
	                    'p',
	                    null,
	                    'The content will aprear here'
	                )
	            ) });
	    },
	    render: function () {
	        return React.createElement(
	            'div',
	            { className: 'front tile' },
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
	            React.createElement(
	                'a',
	                null,
	                this.props.setting.apiUrl
	            ),
	            React.createElement(
	                'p',
	                null,
	                this.state.html
	            )
	        );
	    }
	});

	var Back = React.createClass({
	    displayName: 'Back',

	    saveSetting: function () {
	        var apiUrl = ReactDOM.findDOMNode(this.refs.apiUrl);
	        console.log(apiUrl);
	        var setting = {
	            apiUrl: apiUrl.value
	        };
	        this.props.save(setting);
	    },
	    render: function () {
	        return React.createElement(
	            'div',
	            { className: 'back tile text-center' },
	            React.createElement(
	                'h3',
	                null,
	                'Setting'
	            ),
	            React.createElement('input', { placeholder: 'API URL', ref: 'apiUrl' }),
	            React.createElement(
	                'button',
	                { onClick: this.saveSetting },
	                'Save'
	            )
	        );
	    }
	});

	var Widget = React.createClass({
	    displayName: 'Widget',

	    getInitialState: function () {
	        return {
	            flipped: false,
	            setting: {}
	        };
	    },
	    updateWidgetSetting: function (setting) {
	        console.log("url" + setting.apiUrl);
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
	        console.log(this.props.id);
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
	                React.createElement(Back, { setting: this.state.setting, save: this.updateWidgetSetting })
	            )
	        );
	    }
	});

	var ControlPanel = React.createClass({
	    displayName: 'ControlPanel',

	    handleSubmit: function (e) {
	        e.preventDefault();
	        var widgetName = ReactDOM.findDOMNode(this.refs.widgetName);
	        // add widget to dashboard
	        this.props.addWidget(widgetName.value);
	        widgetName.value = '';
	    },
	    render: function () {
	        return React.createElement(
	            'form',
	            { onSubmit: this.handleSubmit },
	            React.createElement(
	                'h3',
	                null,
	                'Add Widgets'
	            ),
	            React.createElement('input', { placeholder: 'widget name', ref: 'widgetName' }),
	            React.createElement(
	                'button',
	                null,
	                'Add'
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
	                { className: 'row' },
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

	module.exports = React;

/***/ }
/******/ ]);