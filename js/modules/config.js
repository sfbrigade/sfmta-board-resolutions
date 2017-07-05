var configModule = (function (window, $) {
  return {
    rules: {
      'biking': {
        'approve': {
          iconUrl: './gfx/img_markers_biking_g.png'
        },
        'deny': {
          iconUrl: './gfx/img_markers_biking_r.png'
        }
      },
      'parking': {
        'approve': {
          iconUrl: './gfx/img_markers_parking_g.png'
        },
        'deny': {
          iconUrl: './gfx/img_markers_parking_r.png'
        }
      },
      'transit': {
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