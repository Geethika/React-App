import React,{Component} from 'react';
import _ from 'lodash';


class MapWithList extends Component {

  constructor(props){
    super(props)
    this.state = {
      map : null,
      markers: null
    }
    this.generateMarker = this.generateMarker.bind(this)
  }

  componentDidMount() {
    var myLatLng = {lat: 37.7749, lng: -122.4194};
    var map = new window.google.maps.Map(document.getElementById('map'), {
      center: myLatLng,
      zoom: 12
    })
    this.setState({ map: map })
    this.props.getMap(map)
  }

  componentWillReceiveProps(nextProps){

    if(JSON.stringify(this.props.searchResults) !== JSON.stringify(nextProps.searchResults)){
      var results = nextProps.searchResults.results;
      var isDragSearch = nextProps.searchResults.isDragSearch;
      if(!results)return;
      _.map(this.state.markers, (marker) => {
        marker.setMap(null);
      })
      var markers = [];
      var bounds = new window.google.maps.LatLngBounds();
      var that = this;
      results.forEach((location,index) =>{
        var marker = that.generateMarker(location,index);
        markers.push(marker);

      if(!isDragSearch){
        if (location.geometry.viewport)
          bounds.union(location.geometry.viewport);
        else bounds.extend(location.geometry.location);
      }

      })
      if(!isDragSearch) this.state.map.fitBounds(bounds);
      this.setState({ markers :markers });
    }

    if(this.props.activeIndex !== nextProps.activeIndex){
            if(this.props.activeIndex >=0)if(this.props.activeIndex)this.state.markers[this.props.activeIndex].setAnimation(null);
            if(nextProps.activeIndex >=0)this.state.markers[nextProps.activeIndex].setAnimation(window.google.maps.Animation.Qo);
    }
  }

  generateMarker(result,index){
    var that = this;
    var icon = {
      url : result.icon,
      scaledSize: new window.google.maps.Size(25, 25),
      origin: new window.google.maps.Point(0,0),
      anchor: new window.google.maps.Point(0, 0)
    }
    var marker = new window.google.maps.Marker({
      position: result.geometry.location,
      map: that.state.map,
      indx: index,
      draggable : false,
      icon: icon,
      title: result.name
    });

    marker.addListener('click', function(mkr){
      return function() {
        that.setState({ activeIndex: mkr.indx });
        that.props.updateActiveIndex(mkr.indx);
      }
    }(marker));
    
    return marker;
  }

  render() {
    return (
      <div id="map" className="col map">
      </div>
    );
  }

}
export default MapWithList;
