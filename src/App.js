import React, { Component } from 'react';
import './App.css';
import SearchBox from './components/SearchBox';
import SearchResults from './components/SearchResults';
import MapWithList from './components/MapWithList';

// const API_KEY_PLACES = "AIzaSyCnYKd9fnvBWH3U6qIWdxRVJgWpsm1p7ss";

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      map: null,
      markers: null,
      searchResults: null,
      activeMarker : null
    };
    this.onSearchBarClick = this.onSearchBarClick.bind(this);
    this.getMap = this.getMap.bind(this);
    this.updateActiveIndex = this.updateActiveIndex.bind(this);
  }

  onSearchBarClick(searchTerm) {
    var service = new window.google.maps.places.PlacesService(this.state.map);
    service.textSearch({
      query: searchTerm,
      radius: '5000',
      location: {lat: 37.7749, lng: -122.4194},
     }, callback);

    const that = this;

    function callback(results, status) {
      if (status ==   window.google.maps.places.PlacesServiceStatus.OK) {
        console.log(JSON.stringify(results));
        that.setState({ searchResults: results });
      }
    }
  }

  getMap(map){
    this.setState({ map });
  }

  updateActiveIndex(index){
    this.setState({ activeMarker: index });
  }

  render() {
    return (
      <div>
        <SearchBox onSearch={this.onSearchBarClick} />
        <div className="searchResultsWrapper">

          <SearchResults  results={this.state.searchResults} activeMarker={this.state.activeMarker} updateActiveIndex={this.updateActiveIndex} />
        </div>
        <MapWithList getMap={this.getMap}  locations={this.state.searchResults} activeIndex={this.state.activeMarker} updateActiveIndex={this.updateActiveIndex} />

      </div>
    );
  }
}

export default App;
