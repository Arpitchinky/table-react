import React, { Component } from "react";
import L from "leaflet";

// center of the map
var center = [18.4339230205526, 77.3208450000667];

function Map_geojson() {
  var map = L.map("map").setView(center, 6);
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);
}

class SurMap extends Component {
  constructor() {
    super();
    this.state = {
      test_query: [],
      test_demo: [],
      feature_demo: [],
      users_demo: [],
      minster_query: []
    };
  }

  //there is department and ministries---------/////
  handleMinister() {
      var id = this.refs.id.value;
    //console.log(`Minister_name`, id);

    fetch(`/minst/${id}`)
      .then(res => res.json())
      .then(test_query =>
        this.setState({ test_query }, () => {
          //console.log("minister_fetched...", test_query);
        })
      );
  }

  handleDepartment() {
    var department_name = this.refs.department_name.value;
   // console.log(` Department_fetched`, department_name);

    fetch(`/Depart/:${department_name}`)
      .then(res => res.json())
      .then(depart =>
        this.setState({ depart }, () => {
          //console.log("depart_fetched...", depart);
        })
      );
  }

  //there is categories and features options-------////

  handleClick() {
    var id = this.refs.idd.value;
    // console.log( `Subcategories name`,id);

    fetch(`/feat/${id}`)
      .then(res => res.json())
      .then(feature_demo =>
        this.setState({ feature_demo }, () => {
          // console.log('feature_demo fetched...', feature_demo);
        })
      );
  }

  handleChange() {
    var name = this.refs.name.value;
    // console.log( ` feature categories`,name);

    fetch(`/Done/:${name}`)
      .then(res => res.json())
      .then(done =>
        this.setState({ done }, () => {
          //console.log('categories fetched...', done);
        })
      );
  }

  //Component Did mount Options

  componentDidMount() {

    fetch("/utility")
      .then(res => res.json())
      .then(utilitiey_query =>
        this.setState({ utilitiey_query }, () => {
           console.log('utilitiey_fetched...', utilitiey_query.features);
        })
      );





    fetch("/ministeres")
      .then(res => res.json())
      .then(minster_query =>
        this.setState({ minster_query }, () => {
          // console.log('minister_fetched...', minster_query);
        })
      );

    //Department Option Fetch data
    fetch("/department")
      .then(res => res.json())
      .then(test_query =>
        this.setState({ test_query }, () => {
           //console.log('department fetched...', test_query);
        })
      );

    // SubCategories options fetch data
    fetch("/subcat")
      .then(res => res.json())
      .then(test_demo =>
        this.setState({ test_demo }, () => {
          // console.log('Subcategories fetched...', test_demo);
        })
      );
    //Feature Subcategories options fetch data
    fetch("/subfeature")
      .then(res => res.json())
      .then(feature_demo =>
        this.setState({ feature_demo }, () => {
          //console.log('Subfeature fetched...', feature_demo);
        })
      );
    // Users data fetch data in options ---/////
    fetch("/users")
      .then(res => res.json())
      .then(users_demo =>
        this.setState({ users_demo }, () => {
          //console.log(' users fetched...', users_demo);
        })
      );

    Map_geojson();
  }

  render() {
    let ministerOpt = this.state.minster_query.map(minster_query => {
      return (
        <option key={minster_query.id} value={minster_query.id}>
          {minster_query.ministry_name}
        </option>
      );
    });

    let depatmentOpt = this.state.test_query.map(test_query => {
      return (
        <option key={test_query.id} value={test_query.id}>
          {test_query.department_name}
        </option>
      );
    });

    let categoriesOpt = this.state.test_demo.map(test_demo => {
      return (
        <option key={test_demo.id} value={test_demo.id}>
          {test_demo.name}
        </option>
      );
    });

    let featuresOpt = this.state.feature_demo.map(feature_demo => {
      return (
        <option key={feature_demo.id} value={feature_demo.id}>
          {feature_demo.name}
        </option>
      );
    });

    let usersOpt = this.state.users_demo.map(users_demo => {
      return (
        <option key={users_demo.id} value={users_demo.id}>
          {users_demo.name}
        </option>
      );
    });

    return (
      <div>
        <h2> Welcome to react js map </h2>
        <div id="map">xx</div>

        <div className="container" style={{ color: "red", marginTop: "5px" }}>
          <form>
            <label>
              Ministery department label:
              <select ref="id" onChange={this.handleMinister.bind(this)}>
                {ministerOpt}
              </select>
              <br />
              {/* this is the  select Department  in dropdown  */}
              department:
              <select
                ref="department_name"
                onChange={this.handleDepartment.bind(this)}
              >
                {depatmentOpt}
              </select>
              <br />
              {/* This is the select Categories dropdown   */}
              Categories:
              <select ref="idd" onChange={this.handleClick.bind(this)}>
                {categoriesOpt}
              </select>
              <br />
              {/* This is the select  features dropdown   */}
              features-Categories:
              <select ref="name" onChange={this.handleChange.bind(this)}>
                {featuresOpt}
              </select>
              <br />
              {/* This is the select Users dropdown   */}
              Users:
              <select>{usersOpt}</select>
            </label>

            <input type="submit" value="Submit" />
          </form>
        </div>
      </div>
    );
  }
}

export default SurMap;
