module.exports = React.createClass({
    
    getInitialState: function() {

        this.timer = setInterval(this.changeImage, 5000);
        return { images : this.props.data, currentIndex: 0};
    },
    changeImage: function() {
        var index = 0;
        if (this.state.currentImageIndex + 1 <= this.state.images.length) {
            index = this.state.currentIndex + 1;
        }
        this.setState({currentIndex: index})
    },
    render: function() {
        var imageUrl = this.state.images[this.state.currentIndex];
        return (<div>
                <img src={imageUrl} />
            </div>) 
            
    }
});