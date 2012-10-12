// Add a CSS class to element if value doesn't validate. Also adds errorLabel property to
// observable containing text of the element (with text of all child nodes stripped.)
ko.bindingHandlers.validationLabel = {
    init: function (element, valueAccessor) {
        var obsv = valueAccessor(),
            val = ko.utils.unwrapObservable(obsv),
            $clone = $(element).clone();

        $clone.children().remove();

        obsv._errorLabel = $.trim($clone.text());
    },
    update: function (element, valueAccessor) {
        var obsv = valueAccessor(),
            config = ko.validation.utils.getConfigOptions(element),
            val = ko.utils.unwrapObservable(obsv),
            isModified = false,
            isValid = false;

        obsv.extend({ validatable: true });

        isModified = obsv.isModified();
        isValid = obsv.isValid();

        obsv.errorLabel = (isValid) ?
            false :
            obsv._errorLabel;

        // create an evaluator function that will return something like:
        // css: { validationLabel: true }
        var cssSettingsAccessor = function () {
            var css = {};

            var shouldShow = (isModified ? !isValid : false);

            if (!config.decorateLabel) { shouldShow = false; }

            // css: { validationLabel: false }
            css[config.errorLabelClass] = shouldShow;

            return css;
        };

        //add or remove class on the element;
        ko.bindingHandlers.css.update(element, cssSettingsAccessor);
    }
};


// Mokey patch KO binding handlers 'value' and 'checked'.
// Find the appropriate label and add validationLabel bindings
(function () {
    var valueInit = ko.bindingHandlers.value.init,
        checkedInit = ko.bindingHandlers.checked.init,
        validationLabelInit = function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
            var config = ko.validation.utils.getConfigOptions(element),
                id = element.id,
                label,
                vm;

            // if requested, add binding to the appropriate label
            if (config.decorateLabel && ko.validation.utils.isValidatable(valueAccessor())) {
                if (element.type === 'checkbox' || element.type === 'radio') {
                    label = $(element).parent().find('span.label');
                } else if (id) {
                    label = $('label[for=' + id + ']');
                }

                if (label && label.size()) {
                    ko.applyBindingsToNode(label[0], { validationLabel: valueAccessor() });
                }
            }
        };

    ko.bindingHandlers.value.init = function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
        validationLabelInit(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext);

        return valueInit(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext);
    };

    ko.bindingHandlers.checked.init = function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
        validationLabelInit(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext);

        return checkedInit(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext);
    };
} ());