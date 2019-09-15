import React, { Component } from 'react'
import './App.css'
import ReactMapGL, { Marker } from 'react-map-gl'
import DeckGL from '@deck.gl/react'
import { HeatmapLayer } from '@deck.gl/aggregation-layers';
import { Modal, Button, Drawer } from 'antd'
import PMlogo from './philip-morris.svg'
import SMlogo1 from './1051360.svg'
import SMlogo2 from './1051364.svg'
import SMlogo3 from './1051382.svg'
import logo2 from './butts_buster-02.svg'
import feathers from '@feathersjs/feathers'
import rest from '@feathersjs/rest-client'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

let modalShowned = false

class App extends Component {
  constructor(props) {
    super(props)

    const app = feathers();
    const restClient = rest('http://localhost:3030')

    app.configure(restClient.fetch(window.fetch));

    this.state = {
      visible: false,
      data: [],
      app
    }
  }

  async componentDidMount () {
    const Ratings = this.state.app.service('ratings')
    const ratings = await Ratings.find({
      query: {
        $limit: 100000
      }
    })

    this.setState({
      data: ratings.data
    })
  }

  render () {
    const estButts = this.state.data.reduce((acc, item) => {
      const weight = item.weight

      switch (weight) {
        case 1:
          return acc + 10
        case 2:
          return acc + 50
        case 3:
          return acc + 100
        default:
          return acc
      }
    }, 0)

    const kiloOfButts = estButts * 0.17 / 1000

    const layers = [
      new HeatmapLayer({
        id: 'heatmapLayer',
        data: this.state.data,
        colorRange: [[255, 255, 178, 100], [254, 217, 118, 110], [254, 178, 76, 120], [253, 141, 60, 130], [240, 59, 32, 140], [255, 0, 0, 190]],
        radiusPixels: 120,
        getPosition: d => d.loc.coordinates,
        getWeight: d => d.weight
      })
    ]

    let loc = {
      long: undefined,
      lat: undefined
    }

    const geolocatorCallback = (pos) => {
      loc.lat = pos.coords.latitude
      loc.long = pos.coords.longitude
    }

    navigator.geolocation.getCurrentPosition(geolocatorCallback, (e) => alert(e.message), { enableHighAccuracy: true })

    if (!loc.lat || !loc.long) {
      loc.lat = 52.2297
      loc.long = 21.0122
    }

    const INITIAL_VIEW_STATE = {
      longitude: loc.long,
      latitude: loc.lat,
      zoom: 13,
      pitch: 0,
      bearing: 0,
      minZoom: 8,
      maxZoom: 15
    }

    const setAgeConfirmed = () => {
      localStorage.setItem('ageConfirmed', true)
    }

    const showAgeModal = () => {
      Modal.warning({
        title: 'You mast be over 18 to see this site!',
        content: `If you are under 18 years old, please close this site.`,
        centered: true,
        okText: 'I am over 18',
        onOk: setAgeConfirmed
      })
    }

    if (!localStorage.getItem('ageConfirmed') && !modalShowned) {
      modalShowned = true
      showAgeModal()
    }

    const MAP_STYLE = 'mapbox://styles/mapbox/dark-v9';

    return (
      <div className="App">

        <div className="App-header theme-light">
          <div style={{flex: 0.33, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start'}}>
          <Button icon="menu" onClick={() => {
            this.setState({visible: true})
          }}/>
          </div>
          <div style={{flex: 0.33, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
            <h2>Butts</h2>
            <img src={logo2} className="App-logo" alt="logo" />
            <h2>Buster</h2>
          </div>
          <div style={{flex: 0.33}}>
          </div>
        </div>

        <Drawer
          title={<div style={{flex: 0.33, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
            <h2>Butts</h2>
            <img src={logo2} className="App-logo" alt="logo" />
            <h2>Buster</h2>
          </div>}
          placement="left"
          onClose={() => this.setState({visible: false})}
          visible={this.state.visible}
        >
          <Button style={{width: '100%', marginBottom: 10}} icon={'facebook'}>
            Share on facebook
          </Button>
          <Button style={{width: '100%', marginBottom: 10}} icon={'twitter'}>Share on twitter</Button>
          <Button style={{width: '100%', marginBottom: 10}} icon={'instagram'}>Share on instagram</Button>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 20,
            cursor: 'pointer'
          }}>
            <img src={'ios.png'} width={200} />
          </div>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 10,
            cursor: 'pointer'
          }}>
            <img src={'android.png'} width={200} />
          </div>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 50
          }}>
            <h4>Stats</h4>
            <p>Users have marked roughly {kiloOfButts.toFixed(0)} Kgs of cigarette butts</p>
            <p>Cigarette butts have been recorded {this.state.data.length} times!</p>
          </div>
          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 80}}>
            <img src={PMlogo} alt="logo" height={100} />
          </div>
        </Drawer>

        {/*{!!kiloOfButts && <div style={{*/}
        {/*  position: 'fixed',*/}
        {/*  zIndex: 10000,*/}
        {/*  width: 310,*/}
        {/*  height: 200,*/}
        {/*  backgroundColor: 'white',*/}
        {/*  bottom: 0,*/}
        {/*  margin: 10,*/}
        {/*  borderRadius: 5,*/}
        {/*  padding: 5,*/}
        {/*  boxShadow: '0 3px 3px 0 rgba(0, 0, 0, 0.15)'*/}
        {/*}}>*/}
        {/*  <p>Users have marked roughly {kiloOfButts.toFixed(0)} Kgs of cigarette butts</p>*/}
        {/*  <p>Cigarette butts have been recorded {this.state.data.length} times!</p>*/}
        {/*</div>}*/}

        <div className='map-wrapper'>
          <DeckGL
            initialViewState={INITIAL_VIEW_STATE}
            controller={true}
            layers={layers}
          >
            <ReactMapGL
              onViewportChange={(viewport) => this.setState({ viewport })}
              mapboxApiAccessToken='pk.eyJ1IjoicGF1bHRlYSIsImEiOiJjazBqZ3Y0MzIwNXFkM21vYnU0ZXpieDVxIn0.5Q8TvP7Ox3WUjzVb8jZ2RA'
            >
              <Marker longitude={loc.long} latitude={loc.lat}>
                <div style={{
                  width: 15,
                  height: 15,
                  borderRadius: '50%',
                  backgroundColor: '#5f6eff'
                }}>
                </div>
              </Marker>
            </ReactMapGL>
          </DeckGL>
        </div>

        <img src={PMlogo} className="pm-logo" alt="logo" />

      </div>
    );
  }
}

export default App;
