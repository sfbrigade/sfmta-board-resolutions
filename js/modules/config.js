var configModule = (function (window, $) {
  return {
    rules: {
      'LARCENY/THEFT': {
        'NONE': {
          iconUrl: './gfx/img_markers_biking_g.png'
        },
        'ARREST, BOOKED': {
          iconUrl: './gfx/img_markers_biking_r.png'
        }
      },
      'ASSAULT': {
        'NONE': {
          iconUrl: './gfx/img_markers_parking_g.png'
        },
        'ARREST, BOOKED': {
          iconUrl: './gfx/img_markers_parking_r.png'
        }
      },
      'VEHICLE THEFT': {
        'NONE': {
          iconUrl: './gfx/img_markers_parking_g.png'
        },
        'ARREST, BOOKED': {
          iconUrl: './gfx/img_markers_parking_r.png'
        }
      }
    },
    popup: {
      title: '',
      body: ''
    }
  }
})(window, jQuery)