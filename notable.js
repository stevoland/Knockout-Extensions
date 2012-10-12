// Store a note on observable. Can be a primitive or a map of value => note pairs
ko.extenders.note = function (target, params) {
    target.hasNote = (typeof params !== 'undefined');

    target.note = ko.computed(function () {
        var val = ko.utils.unwrapObservable(target);

        if (typeof params !== 'object' && val) {
            return params;
        } else if (typeof params[val] !== 'undefined') {
            return params[val];
        }

        return false;
    });

    return target;
};