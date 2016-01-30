module.exports = React.createClass({
    
    getInitialState: function() {
        if (typeof this.props.data !== 'string'){
            this.timer = setInterval(this.changeText, 10000);
        }
        
        return { currentIndex: 0};
    },
    changeText: function() {
        $('.text-news').addClass('animated fadeIn');
        $('.text-news').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
            $('.text-news').removeClass('animated fadeIn');
        });
        
        var index = 0;
        if (this.state.currentIndex + 1 < this.props.data.length) {
            index = this.state.currentIndex + 1;
        }
        this.setState({currentIndex: index})
    },
    render: function() {
        
        if (typeof this.props.data !== 'string'){
            var text = this.props.data[this.state.currentIndex];
        }else{
            var text = this.props.data;
        }
        
        return (<div className="text-news">
                    <p dangerouslySetInnerHTML={{__html: text}}></p>
                </div>);
    }
});