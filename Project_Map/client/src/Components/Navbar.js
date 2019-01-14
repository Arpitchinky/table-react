import React, { Component } from 'react';
import L from 'leaflet';





class NavbarApp  extends Component {
    state = {  }
    componentDidMount() {
        this.map();
      }
    
      map() {
        var map = L.map('map').setView([51.505, -0.09], 13);
    
        L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);
      }
    render() { 
        return ( 
        <div>
          <h2> Welcome to leaflet map</h2>
          <div id="map">xxx</div>  
            

        </div>
         );
    }
}
 
export default NavbarApp ;