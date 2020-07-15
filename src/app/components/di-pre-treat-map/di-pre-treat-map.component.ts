import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { environment, positions } from '../../../environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
import { PremiseService } from '../../services/premises/premise.service';

@Component({
  selector: 'app-di-pre-treat-map',
  templateUrl: './di-pre-treat-map.component.html',
  styleUrls: ['./di-pre-treat-map.component.css']
})
export class DiPreTreatMapComponent implements OnInit {
  map: mapboxgl.Map;
  style = 'mapbox://styles/mapbox/streets-v11';
  lat: number;
  lng: number;
  selectedCountry: string;
  arrayAllPremises: [];
  constructor(private router: Router, private activatedRoute: ActivatedRoute, private premiseService: PremiseService) {
    //by default
    this.lat = 37.75;
    this.lng = -122.41;
    this.arrayAllPremises = []
  }

  ngOnInit() {
    var premises$ = this.premiseService.getAllPremises()

    // param passed in query string
    this.activatedRoute.queryParams.subscribe((param) => {
      if (param['country']) {
        this.selectedCountry = param['country'];

        positions.forEach(element => {
          if (element.country == this.selectedCountry) {
            this.lat = Number(element.latitude);
            this.lng = Number(element.longitude);
          }
        });
      }

      premises$.subscribe((premises) => {

        //set access token 
        let map = mapboxgl
        map.accessToken = environment.mapbox.accessToken;

        this.map = new mapboxgl.Map({
          container: 'map',
          style: this.style,
          zoom: 5,
          center: [this.lng, this.lat]
        });

        let premiseArray = premises as [];

        this.arrayAllPremises = premiseArray

        //element is a premise
        this.arrayAllPremises.forEach(element => {

          let e: any
          e = element

          let lat: number
          let lng: number

          lat = e.premises_geom.x
          lng = e.premises_geom.y

          let premiseId = e.premises_id
          let premiseName = e.premises_name
          let corrosion_level = Number(e.corrosion_level)

          let popup = new mapboxgl.Popup({ offset: 25 })
            .setText(`Name: ${premiseName} - Corrosion level: ${corrosion_level}`);

          // add the marker to the map corresponding to the position of the premises
          let marker = new mapboxgl.Marker()
            .setLngLat([lng, lat])
            .setPopup(popup) // sets a popup on this marker
            .addTo(this.map);

          marker.getElement().addEventListener('mouseenter', () => marker.togglePopup());
          marker.getElement().addEventListener('mouseleave', () => marker.togglePopup());

          marker.getElement().addEventListener('click', () => this.router.navigate(['premiseDetails'], { queryParams: { premiseId: premiseId}}))

        })

        //  //Add searchbar
        //   var geocoder = new MapboxGeocoder({ // Initialize the geocoder
        //     accessToken: mapboxgl.accessToken, // Set the access token
        //     mapboxgl: mapboxgl, // Set the mapbox-gl instance
        //     marker: false, // Do not use the default marker style
        //   });

        // // Add the geocoder to the map
        // this.map.addControl(geocoder);

        // Add map controls
        this.map.addControl(new mapboxgl.NavigationControl());

        this.map.addControl(new mapboxgl.GeolocateControl({
          positionOptions: {
            enableHighAccuracy: true
          },
          trackUserLocation: true
        }));




      })
    })

  }
}
