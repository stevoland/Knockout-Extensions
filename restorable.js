ko.extenders.restorable = function (target) {
    var _stored,
        _isChanged = ko.observable(false),
        _subscription;

    target.isRestorable = true;

    target.store = function () {
        _stored = target();
        _isChanged(false);

        if (!_subscription) {
            _subscription = target.subscribe(function () {
                _isChanged(true);
            });
        }
    };

    target.restore = function () {
        if (_isChanged) {
            target(_stored);
        }
    };

    target.isDirty = ko.computed(function () {
        if (!_isChanged()) {
            return false;
        }
        return (target() !== _stored);
    });

    return target;
};