import React,{ Component } from 'react'
import SearchBox from './components/SearchBox'
import SearchResults from './components/SearchResults'
import MapWithList from './components/MapWithList'

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      map: null,
      markers: [],
      searchResults: [],
      activeMarker : -1,
      isDragSearch : false
    };
    this.onSearchBarClick = this.onSearchBarClick.bind(this);
    this.searchOnMapChange = this.searchOnMapChange.bind(this);
    this.getMap = this.getMap.bind(this);
    this.updateActiveIndex = this.updateActiveIndex.bind(this);
  }

  onSearchBarClick(searchBox) {
    this.setState({ activeMarker: -1 });
    var results = searchBox.getPlaces();
    var searchResults = {
      isDragSearch:false,
      results: results
    }
    this.setState({ searchResults });
  }

  searchOnMapChange(searchTerm){
    this.setState({ activeMarker: -1 });
    if(!searchTerm) return;

      var service = new window.google.maps.places.PlacesService(this.state.map);
      service.textSearch({
        query: searchTerm,
        radius: '5000',
        location: this.state.map.center,
       }, callback);

      const that = this;

      function callback(results, status) {
        if (status ===  window.google.maps.places.PlacesServiceStatus.OK) {
          var searchResults = {
            results : results,
            isDragSearch : true
          }
          that.setState({ searchResults });
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
       <div className="main-container">
        <div className="map-search-container">
          <MapWithList isDragSearch={this.state.isDragSearch} getMap={this.getMap}  searchResults={this.state.searchResults} activeIndex={this.state.activeMarker} updateActiveIndex={this.updateActiveIndex} />
          <SearchBox searchOnMapChange={this.searchOnMapChange} onSearch={this.onSearchBarClick} map={this.state.map} />
        </div>
        <div className="searchResultsWrapper row">
          <SearchResults  results={this.state.searchResults.results} activeMarker={this.state.activeMarker} updateActiveIndex={this.updateActiveIndex} />
        </div>
      </div>
    );
  }
}

export default App;
