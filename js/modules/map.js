var mapModule = (function(window,$) {

    var MAPBOX_ACCESS_TOKEN = resourceTokensModule.MAPBOX_ACCESS_TOKEN;
    var MAPBOX_MAP_STYLE_ID = 'lightfox.1n10e3dp';
    var MAP_CONTAINER_ELEMENT_ID = 'map';
    var ICON_RULES = configModule.rules
    var DEFAULT_ICON = './gfx/img_markers_walking.png'

    var SEARCH_MARKER_GEOJSON = {
        type: 'Feature',
        geometry: { type: 'Point' },
        properties: { 'marker-size': 'large' }
    };
/*the following is an added object property that dictates t
he icon properties using Mapbox Maki icons replaced with leaflet code*/
    /*var INCIDENT_MARKER_PROPERTIES = {
        'marker-color': '#000080',
        'marker-symbol': 'police',
        'marker-size': 'small'
    };*/
    var METERS_PER_FOOT = 0.3048;

    var searchAreaGroup = L.featureGroup();
    var incidentLayer, incidentClusterGroup;

    var SHAPE_STYLE_SETTINGS = {
        color: '#0033ff',
        fillColor: '#0033ff',
        weight: 5,
        fillOpacity: 0.2,
        opacity: 0.5
    };

    var DRAW_CONTROL_SETTINGS = {
        draw: {
            polyline: false,
            polygon: { shapeOptions: SHAPE_STYLE_SETTINGS },
            rectangle: { shapeOptions: SHAPE_STYLE_SETTINGS },
            circle: { shapeOptions: SHAPE_STYLE_SETTINGS }
        },
        edit: {
            featureGroup: searchAreaGroup,
            edit: false
        }
    };

    var INCIDENT_CLUSTER_LAYER_SETTINGS = {
        showCoverageOnHover: false,
        maxClusterRadius: function(z) {
          return z >= 17 ? 10 : 70
        }
    };

    var map;

    function _init() {
        L.mapbox.accessToken = MAPBOX_ACCESS_TOKEN;
        map = L.mapbox.map(MAP_CONTAINER_ELEMENT_ID, MAPBOX_MAP_STYLE_ID);
        
        searchAreaGroup.addTo(map);
        var drawControl = new L.Control.Draw(DRAW_CONTROL_SETTINGS).addTo(map);
        map.on('draw:created', _afterDraw);
        map.on('draw:deleted', _onClearSearchArea);
    }

    function _afterDraw(e) {
        switch(e.layerType) {
            case 'polygon':
            case 'rectangle': _afterDrawPolygon(e);
                break;
            case 'circle': _afterDrawCircle(e);
                break;
            case 'marker': _afterDrawMarker(e);
                break;
        }
    }

    function _afterDrawPolygon(e) {
        viewModelModule.searchShapeType = 'polygon';
        viewModelModule.searchGeoJson = e.layer.toGeoJSON();
        pageModule.loadIncidentData({ reverseGeocoding: false });
    }

    function _afterDrawCircle(e) {
        viewModelModule.searchShapeType = 'radial';
        viewModelModule.latitude = e.layer._latlng.lat;
        viewModelModule.longitude = e.layer._latlng.lng;
        viewModelModule.searchRadius = _convertFromMetersToFeet(e.layer._mRadius);
        viewModelModule.searchAddress = null;
        pageModule.loadIncidentData();
    }

    function _afterDrawMarker(e) {
        viewModelModule.searchShapeType = 'radial';
        viewModelModule.latitude = e.layer._latlng.lat;
        viewModelModule.longitude = e.layer._latlng.lng;
        viewModelModule.searchAddress = null;
        pageModule.loadIncidentData();
    }

    function _drawPolygonIncidents(incidentGeoJson) {
        _drawPolygonSearchArea();
        _drawIncidents(incidentGeoJson);
    }

    function _drawRadialIncidents(incidentGeoJson) {
        _drawRadialSearchArea();
        _drawIncidents(incidentGeoJson);
    }

    function _drawPolygonSearchArea() {
        var searchAreaGeoJson = viewModelModule.searchGeoJson;
        var searchAreaLayer = L.mapbox.featureLayer(searchAreaGeoJson)
            .setStyle(SHAPE_STYLE_SETTINGS);

        searchAreaGroup.clearLayers()
            .addLayer(searchAreaLayer);
    }

    function _drawRadialSearchArea() {
        var latitude = viewModelModule.latitude,
            longitude = viewModelModule.longitude,
            radius = _convertFromFeetToMeters(viewModelModule.searchRadius);

        var searchMarkerGeoJson = $.extend(true, {}, SEARCH_MARKER_GEOJSON, {
            geometry: { coordinates: [ longitude, latitude ] }
        });

        var searchMarkerLayer = L.mapbox.featureLayer(searchMarkerGeoJson);
        var searchAreaLayer = L.circle([latitude, longitude], radius);

        searchAreaGroup.clearLayers()
            .addLayer(searchMarkerLayer)
            .addLayer(searchAreaLayer);
    }

    function _onClearSearchArea() {
        // on clear, reload data without geom
        viewModelModule.latitude = null;
        viewModelModule.longitude = null;
        viewModelModule.searchShapeType = null;
        pageModule.loadIncidentData({ pushState: true })
    }

    /*_drawIncident function is the actual rendering process of putting a incdidentGeoJson on
    to a map*/
    function _drawIncidents(incidentGeoJson) {
        if(incidentLayer) {
            map.removeLayer(incidentLayer)
        }

        if(incidentClusterGroup) {
            map.removeLayer(incidentClusterGroup);
        }
        /*makes a MapBox featurelayer that adds geojson to a map read lyzidiamond.com/posts/external-geojson-mapbox*/
        incidentLayer = L.mapbox.featureLayer();
        /*maker clustering with leaflet read: asmaloney.com/2015/06/code/clustering-markers-on-leaflet-maps*/
        incidentClusterGroup = new L.MarkerClusterGroup(INCIDENT_CLUSTER_LAYER_SETTINGS);
        /*the below code is the old way of assigning icon to a incident using built in mapbox Maki icons*/
        /*$.each(incidentGeoJson.features, function(index, feature) {
            $.extend(feature.properties, INCIDENT_MARKER_PROPERTIES);
        });*/
        /*the following is the actual descision making process of assigning icons to a certain CSCategory*/
        var actionMapping = {
            'establish': 'g',
            'rescind': 'r',
            'revoke': 'r',
            'extend': 'g',
            'remove': 'r',
            're-open': 'g',
            'estabish': 'g',
            'install': 'g',
            'red zone': 'g',
            'expand hours': 'g',
            'recind': 'r',
            'relocate': 'g'
        }
        incidentLayer.setGeoJSON(incidentGeoJson).eachLayer(function (layer) {
          var iconUrl = './gfx/img_markers_' + layer.feature.properties.category + '_' + actionMapping[layer.feature.properties.action.trim()] + '.png'
          layer.setIcon(L.icon({
            iconUrl: iconUrl,
            iconSize: [40, 40],
            iconAnchor: [20, 37],
            popupAnchor: [-3, -22]
          }))
          incidentClusterGroup.addLayer(layer)
          layer.bindPopup(_buildPopupContent(layer.feature.properties))
        })
        incidentLayer.clearLayers();

        map.addLayer(incidentLayer)
            .addLayer(incidentClusterGroup)
            .fitBounds(searchAreaGroup.getBounds());
    }

    function _buildPopupContent(properties) {
        var newDate = properties.date
        var formattedDate = newDate.slice(5,7) + "/" + newDate.slice(8, 10) + "/" + newDate.slice(0,4)
        var content = '<h1>Resolution ' + properties.resolution_numbers + ' ' + properties.resolution_letter + '</h1>'
        content += '<p>' + formattedDate + '</p>'
        content += '<p>' + properties.action + ' - ' + properties.type + ': ' + properties.description + '</p>'
        content += '<p><a href="https://sfmta.xtreet.org/docs/sfmta/' + properties.pdf + '" target="_blank">Board meeting minutes (PDF)</a></p>'
        content += '<p><a href="' + properties.video + '" target="_blank">Board meeting video</a></p>'
        return content
    }

    function _convertFromFeetToMeters(feet) {
        return feet * METERS_PER_FOOT;
    }

    function _convertFromMetersToFeet(meters) {
        return meters / METERS_PER_FOOT;
    }

    return {
        init: _init,
        drawPolygonIncidents: _drawPolygonIncidents,
        drawRadialIncidents: _drawRadialIncidents,
        drawRecords: _drawIncidents
    };

})(window, jQuery);
