import React, { Component } from 'react';

class SearchBox extends Component {

  constructor(props) {
    super(props);
    this.state = {
      searchTerm: ''
    };
    this.onInputChange = this.onInputChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

  }

 onInputChange(event) {
   this.setState({ searchTerm: event.target.value });
   console.log(event.target.value);
 }

 onSubmit(event) {
   this.props.onSearch(this.state.searchTerm); 
 }


  render() {
    return (
      <div className="col-lg-6">
        <div className="input-group">
          <input type="text" onChange={this.onInputChange} className="form-control" placeholder="Search for..." />
          <span className="input-group-btn">
            <button className="btn btn-default" onClick={this.onSubmit} type="Sumbit">Submit</button>
          </span>
        </div>
      </div>
    );

  }
}
export default SearchBox;
