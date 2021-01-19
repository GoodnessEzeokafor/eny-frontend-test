
import React, { Component } from 'react';
import Header from "./Header"
import axios from "axios";
import ReactPaginate from 'react-paginate';
// require("bootstrap/less/bootstrap.less");

export default class App extends Component {

    state = {
      profiles:[],
      offset: 0,
      data: [],
      perPage: 20,
      currentPage: 0
    }


 

    componentDidMount(){
      console.log("HELLO");
      axios
      .get(`https://api.enye.tech/v1/challenge/records`)
      .then(res =>{
        const data = res.data.records.profiles
        const slice = data.slice(this.state.offset, this.state.offset + this.state.perPage)
        const postData = slice.map(profile => <>
            <div className="col-md-3">
                  <div className="card">
            <img 
            width="100"
            src="https://www.flaticon.com/svg/vstatic/svg/149/149071.svg?token=exp=1611052606~hmac=2ce38e66234955cdccdb6321da0abf4e" className="card-img-top" alt="..." />
            <div className="card-body">
              <h5 className="card-title">
                    {profile.FirstName} {profile.LastName}
                    <small> Gender: {profile.Gender}</small>
              </h5>
              <p>Username: <b>{profile.UserName}</b></p>
              <p>Email:<b>{profile.Email}</b></p>
              <p>Credit Card: <b>{profile.CreditCardNumber}</b></p>          
              <p>Credit Card Type: <b>{profile.CreditCardType}</b></p>
              <p>Phone Number: <b>{profile.PhoneNumber}</b></p>
              <p>Mac Address: <b>{profile.MacAddress}</b></p>
              <p>Url: <b>{profile.URL}</b></p>
              <p>Domain Name: <b>{profile.DomainName}</b></p>
              <p>Longitude: <b>{profile.Longitude}</b></p>
              <p>Latitude: <b>{profile.Latitude}</b></p>
              <p>PaymentMethod:<b>{profile.PaymentMethod}</b></p>
            </div>
            <div className="card-footer">
              <small className="text-muted">Last login {profile.LastLogin}</small>
            </div>
          </div>
        </div>

        </>);

        this.setState({
          pageCount: Math.ceil(data.length / this.state.perPage),
        
          postData
        })
        // console.log("Slice",slice)
        // this.setState({
        //   profiles:res.data.records.profiles
        // })

        //   this.setState({
        //     pageCount: Math.ceil(this.state.profiles.length / this.state.perPage),
        // })
        }
      )
  }

  handlePageClick = (e) => {
    const selectedPage = e.selected;
    const offset = selectedPage * this.state.perPage;

    this.setState({
        currentPage: selectedPage,
        offset: offset
    }, () => {
        this.receivedData()
    });

};

  render() {
    return (
      <>
      <Header />
      <div class="container">
        <div class="row">
        {this.state.postData}
        </div>
      </div>
      {/* <ReactPaginate
                    previousLabel={"prev"}
                    nextLabel={"next"}
                    breakLabel={"..."}
                    breakClassName={"break-me"}
                    pageCount={this.state.pageCount}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={this.handlePageClick}
                    containerClassName={"pagination"}
                    subContainerClassName={"pages pagination"}
                    activeClassName={"active"}/> */}

      </>
    );
  }
}

