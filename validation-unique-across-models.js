/* Ensure at least one of the specified fields is different in each of the supplied modals. Eg:
    obsv.extend({
        uniqueAcrossModels: {
            message: 'Different rooms cannot have the same lead guest',
            params: {
                fields: ['firstName', 'lastName'],
                model: room,    // Model of the current observable
                models: rooms   // Array of all models
            }
        });
 */
ko.validation.rules.uniqueAcrossModels = {
    validator: function (val, config) {
        var each = ko.utils.arrayForEach,
            valid = true,
            tried = false;

        each(config.models, function (model) {
            var match = true;

            if (model !== config.model) {
                each(config.fields, function (field) {
                    tried = true;
                    if (model[field]() !== config.model[field]()) {
                        match = false;
                    }
                });
            }

            if (match && tried) {
                valid = false;
            }
        });

        return valid;
    },
    message: 'Fields must be unique'
};