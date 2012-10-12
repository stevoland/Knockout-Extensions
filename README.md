# Knockout extensions

A collection of bindings, extenders, validation rules etc. for [Knockout.js](http://knockoutjs.com)

---

## hydrate.js

When binding an element with 'text', 'value' or 'checked', the content of the markup is overriden by the value of the view model. These custom bindings 'hydrateText', 'hydrateValue' and 'hydrateChecked' hydrate the model with the content of the markup - useful if you're progressively enhancing a non-JS view.

## restorable.js

Simple extender to store and restore observable values

## notable.js

Simple extender to store a note on an observable. The note can be a primitive or a map of value => note pairs. obs.note() returns the appropriate note based on the current value.


## validation-label.js

Extension for [Knockout-Validation](https://github.com/ericmbarnard/Knockout-Validation). Add a CSS class [config.errorLabelClass] if observable is invalid. Can automatically add the binding to the appropriate label when using 'value' or 'checked' bindings. Requires jQuery.


## validation-unique-across-models.js

Ensure at least one of the specified fields is different in each of the supplied models