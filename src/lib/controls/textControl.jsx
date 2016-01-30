module.exports = React.createClass({
    
    getInitialState: function() {
        if (typeof this.props.data !== 'string'){
            this.timer = setInterval(this.changeText, 10000);
        }
        
        return { text : this.props.data, currentIndex: 0};
    },
    changeText: function() {
        $('.text-news').addClass('animated fadeIn');
        $('.text-news').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
            $('.text-news').removeClass('animated fadeIn');
        });
        
        var index = 0;
        if (this.state.currentIndex + 1 < this.state.text.length) {
            index = this.state.currentIndex + 1;
        }
        this.setState({currentIndex: index})
    },
    render: function() {
        
        if (typeof this.props.data !== 'string'){
            var text = this.state.text[this.state.currentIndex];
        }else{
            var text = this.state.text;
        }
        
        return (<div className="text-news">
                    <p dangerouslySetInnerHTML={{__html: text}}></p>
                </div>);
    }
});