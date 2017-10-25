import React, { Component } from 'react';

class SearchBox extends Component {

  constructor(props) {
    super(props);
    this.state = {
      searchTerm: '',
      input: null,
      searchBox: null
    };
    this.search = this.search.bind(this);
    this.linkSearchBoxWithMap = this.linkSearchBoxWithMap.bind(this);
  }

  componentDidMount() {
    this.input = document.getElementById('search-box');
    this.searchBox = new window.google.maps.places.SearchBox(this.input );

    this.linkSearchBoxWithMap(this.props.map);
    this.searchBox.addListener('places_changed', this.search);
  }

  componentWillReceiveProps(nextProps){
    if(this.props.map !== nextProps.map) {
        this.linkSearchBoxWithMap(nextProps.map);
      }
  }

  linkSearchBoxWithMap(map){
    if(!map || !this.searchBox ) return;
    map.controls[window.google.maps.ControlPosition.TOP_LEFT].push(this.input);
    var that = this;
    this.searchBox.setBounds(map.getBounds());

    var l =  map.addListener('bounds_changed', function() {
      that.searchBox.setBounds(map.getBounds());
      window.google.maps.event.removeListener(l);
    });

    map.addListener('dragend', function() {

      that.searchBox.setBounds(map.getBounds());
      var inputValue = document.getElementById("search-box").value;
      that.props.searchOnMapChange(inputValue);
    });
  }

  search() {
   this.props.onSearch(this.searchBox);
  }
  render() {
    return (
          <input id="search-box" placeholder="Search for restaurants, movies, etc.." className="" onChange={this.onInputChange} type="text"/>
    );
  }
}

export default SearchBox;
