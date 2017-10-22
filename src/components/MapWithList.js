import React,{Component} from 'react';
import _ from 'lodash';


class MapWithList extends Component {

  constructor(props){
    super(props);
    this.state = {
      // activeMarkerElement: this.props.activeMarker,
      map : null,
      markers: null
    }
    this.generateMarker = this.generateMarker.bind(this);
  }

  componentDidMount() {
    var myLatLng = {lat: 37.7749, lng: -122.4194};
    var map = new window.google.maps.Map(document.getElementById('map'), {
      center: myLatLng,
      zoom: 12
    });

    this.setState({ map: map });
    this.props.getMap(map);
  }

  componentWillReceiveProps(nextProps){


    if(JSON.stringify(this.props.locations) !== JSON.stringify(nextProps.locations)){
      _.map(this.state.markers, (marker) => {
        marker.setMap(null);
      })
    var markers = [];
      // _.map(nextProps.locations, (result,index) => {
      for(let index = 0; index < nextProps.locations.length;index++){
        var marker = this.generateMarker(nextProps.locations[index],index);
        markers.push(marker);

      }
      this.setState({ markers :markers });
    }


    if(this.props.activeIndex !== nextProps.activeIndex){
            if(this.props.activeIndex)this.state.markers[this.props.activeIndex].setAnimation(null);
            this.state.markers[nextProps.activeIndex].setAnimation(window.google.maps.Animation.BOUNCE);

          }
      }



  generateMarker(result,index){
    var that = this;

    // window.setTimeout(function() {
    var marker = new window.google.maps.Marker({
      position: result.geometry.location,
      map: that.state.map,
      indx: index,
      animation: window.google.maps.Animation.DROP,
      draggable : false,
      // icon: result.icon,
      title: result.name
    });

    marker.addListener('click', function(mkr){
      return function() {
        that.setState({ activeIndex: mkr.indx });
        that.props.updateActiveIndex(mkr.indx);
      }
    }(marker));

    return marker;

  // },index*50);
  }

  render() {
    return (
      <div id="map">
      </div>
    );
  }

}
export default MapWithList;
