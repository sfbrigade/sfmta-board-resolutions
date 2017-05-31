var viewModelModule = (function(window, $) {
    var DEFAULTS = {
        startDate: moment().subtract(12, 'months').format('YYYY-MM-DD'),
        endDate: moment().format('YYYY-MM-DD'),
        latitude: null,
        longitude: null,
        searchRadius: 1320,
        searchShapeType: null
    };

    var viewModel = {
        startDate: null,
        endDate: null,
        latitude: null,
        longitude: null,
        searchRadius: null,
        searchShapeType: null, // 'radial' or 'polygon'
        searchAddress: null,
        searchGeoJson: null,
        defaults: DEFAULTS
    };

    _applyDefaults();
    function _applyDefaults() {
        Object.keys(viewModel).forEach(function(field) {
            viewModel[field] = DEFAULTS[field] || viewModel[field];
        });
    }

    return viewModel;
})();
