// Custom binding which populates the model with the original text of the element
ko.bindingHandlers.hydrateText = {
    init: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
        var observable = valueAccessor();
        observable($(element).text());
    },
    update: ko.bindingHandlers.text.update
};


// Custom binding which populates the model with the original value of the element
ko.bindingHandlers.hydrateValue = {
    init: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
        var observable = valueAccessor();
        observable($(element).val());
        ko.bindingHandlers.value.init(element, valueAccessor, allBindingsAccessor, bindingContext);
    },
    update: ko.bindingHandlers.value.update
};


// Custom binding which populates the model with the value of the original checked element
ko.bindingHandlers.hydrateChecked = {
    init: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
        var valueToWrite = null,
            modelValue = valueAccessor();

        if (element.type === "checkbox") {
            valueToWrite = element.checked;
        } else if ((element.type === "radio") && (element.checked)) {
            valueToWrite = element.value;
        }

        if (valueToWrite !== null) {
            if ((element.type === "checkbox") && (ko.utils.unwrapObservable(modelValue) instanceof Array)) {
                var existingEntryIndex = ko.utils.arrayIndexOf(ko.utils.unwrapObservable(modelValue), element.value);
                if (element.checked && (existingEntryIndex < 0)) {
                    modelValue.push(element.value);
                } else if ((!element.checked) && (existingEntryIndex >= 0)) {
                    modelValue.splice(existingEntryIndex, 1);
                }
            } else {
                modelValue(valueToWrite);
            }
        }

        ko.bindingHandlers.checked.init(element, valueAccessor, allBindingsAccessor, bindingContext);
    },
    update: ko.bindingHandlers.checked.update
};