import React, { Component } from 'react';
import _ from 'lodash';

class SearchResults extends Component{
  // const x = [{ name: 'abc' }];

  constructor(props){
    super(props);
    this.state = {
      activeMarker: this.props.activeMarker,
      results: this.props.results
    };
  }

  componentWillReceiveProps(nextProps) {
    if(JSON.stringify(this.props.results) !== JSON.stringify(nextProps.results))
           this.setState({ results : nextProps.results });

    if(this.props.activeMarker !==  nextProps.activeMarker){
      this.setState({ activeMarker: nextProps.activeMarker });
    }
  }

  render(){
    return (
      <ul className="nav-group list-group">
        {
          _.map(this.state.results, (result, index) => {
            if(index !== this.state.activeMarker){
              return <li key={index} onClick={()=> {
                this.setState({ activeMarker: index });
                this.props.updateActiveIndex(index);

              }} className={"list-group-item list-group-item-action "+(this.state.activeMarker === index ? 'activeComponent' : '')} >{result.name}</li>;
            }
            return (
              <div key={index} className="list-group-item list-group-item-action" style={{ backgroundColor: '#eee' }}>
                <div className="result-card-title">
                  {result.name}
                </div>
                <br />
                <div className="result-card-address">
                  {result.formatted_address}
                </div>

              </div>
            );

          })
        }
      </ul>
    );
  }
}

export default SearchResults;
