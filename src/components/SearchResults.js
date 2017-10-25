import React, { Component } from 'react';
import _ from 'lodash';

class SearchResults extends Component{

  constructor(props){
    super(props);
    this.state = {
      activeMarker: this.props.activeMarker,
      results: this.props.results
    };
    this.photos  = [];
    this.openNow = false;
  }

  componentWillReceiveProps(nextProps) {
    if(JSON.stringify(this.props.results) !== JSON.stringify(nextProps.results)){
      this.setState({ results : nextProps.results });
    }

    if(this.props.activeMarker !==  nextProps.activeMarker){
      this.setState({ activeMarker: nextProps.activeMarker });
      if(nextProps.activeMarker>=0){
        var currElement = document.getElementById(nextProps.activeMarker);
        currElement.scrollIntoView();
      }
    }
  }

  render(){
    return (
      <div className="list-results col">
      <ul className="list-group">
        {
          _.map(this.state.results, (result, index) => {
              this.photoUrl = (result.photos ? result.photos[0].getUrl({'maxWidth': 150, 'maxHeight': 150}) : "")
              this.openNow = (result.opening_hours ? (result.opening_hours.open_now ? "Open Now" : "Closed"): "Call for availability")

            return(
              <li id={index} key={index} className={"list-group-item list-group-item-action "+(this.state.activeMarker === index ? 'selected-place' : '')} onClick={()=> {
                this.setState({ activeMarker: index });
                this.props.updateActiveIndex(index);
                }}>
                <div className="container-fluid" id={"name"+index}>

                  <div className="row">
                    <div className="col col-md-8 place-name">{result.name}</div>
                    <div className="col col-md-4">{this.openNow}</div>
                  </div>

                </div>

                <div  id={"detail"+index} className={"container-fluid "+(this.state.activeMarker !== index ? 'collapse' : '')}>

                  <div className="row">
                    <div className="col col-md-8">Rating: {result.rating || 'No ratings yet'}</div>
                    <div className="col col-md-4">{'$'.repeat(result.price_level)}</div>
                  </div>

                  <div className="row">
                    <div className=" col col-md-12">
                      <img src={this.photoUrl} alt="Image not available for this place"/>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col col-md-12">{result.formatted_address}</div>
                  </div>

                </div>
              </li>
            );
          })
        }
      </ul>
    </div>
    );
  }
}

export default SearchResults;
