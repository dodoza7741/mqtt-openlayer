import React, { useState } from 'react'
import Map from 'components/map-openlayers/Map'
import { Layers, TileLayer, VectorLayer } from 'components/map-openlayers/Layers'
import { Style, Icon } from 'ol/style'
import Feature from 'ol/Feature'
import Point from 'ol/geom/Point'
import { osm, vector } from 'components/map-openlayers/Source'
// import { fromLonLat, get } from 'ol/proj'
import { fromLonLat } from 'ol/proj'
// import GeoJSON from 'ol/format/GeoJSON'
import { Controls, FullScreenControl } from 'components/map-openlayers/Controls'
// import FeatureStyles from 'components/map-openlayers/Features/Styles'

import mapConfig from 'components/map-openlayers/config.json'

// const geojsonObject = mapConfig.geojsonObject
// const geojsonObject2 = mapConfig.geojsonObject2
const markersLonLat = [mapConfig.center]

function addMarkers(lonLatArray) {
  var iconStyle = new Style({
    image: new Icon({
      anchorXUnits: 'fraction',
      anchorYUnits: 'pixels',
      src: mapConfig.markerImage32,
    }),
  })
  let features = lonLatArray.map((item) => {
    let feature = new Feature({
      geometry: new Point(fromLonLat(item)),
    })
    feature.setStyle(iconStyle)
    return feature
  })
  return features
}

const Mapview = () => {
  // const [center, setCenter] = useState(mapConfig.center)
  // const [zoom, setZoom] = useState(20)
  const center = mapConfig.center
  const zoom = 20
  const features = addMarkers(markersLonLat)

  // const [showLayer1, setShowLayer1] = useState(false)
  // const [showLayer2, setShowLayer2] = useState(false)
  const [showMarker, setShowMarker] = useState(true)

  // const [features, setFeatures] = useState(addMarkers(markersLonLat))
  return (
    <div>
      <Map center={fromLonLat(center)} zoom={zoom}>
        <Layers>
          <TileLayer source={osm()} zIndex={0} />
          {/* {showLayer1 && (
            <VectorLayer
              source={vector({
                features: new GeoJSON().readFeatures(geojsonObject, {
                  featureProjection: get('EPSG:3857'),
                }),
              })}
              style={FeatureStyles.MultiPolygon}
            />
          )}
          {showLayer2 && (
            <VectorLayer
              source={vector({
                features: new GeoJSON().readFeatures(geojsonObject2, {
                  featureProjection: get('EPSG:3857'),
                }),
              })}
              style={FeatureStyles.MultiPolygon}
            />
          )} */}
          {showMarker && <VectorLayer source={vector({ features })} />}
        </Layers>
        <Controls>
          <FullScreenControl />
        </Controls>
      </Map>
      {/* <div>
        <input
          type='checkbox'
          checked={showLayer1}
          onChange={(event) => setShowLayer1(event.target.checked)}
        />{' '}
        Johnson County
      </div>
      <div>
        <input
          type='checkbox'
          checked={showLayer2}
          onChange={(event) => setShowLayer2(event.target.checked)}
        />{' '}
        Wyandotte County
      </div> */}
      <hr />
      <div>
        <input
          type='checkbox'
          checked={showMarker}
          onChange={(event) => setShowMarker(event.target.checked)}
        />{' '}
        Show markers
      </div>
    </div>
  )
}

export default Mapview
