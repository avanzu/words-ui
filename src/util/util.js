/**
 * Created by avanzu on 23.12.16.
 */
export const labelize = function (items, prefixLabel) {
    let _ = {};
    items.forEach(function (value) {
        _[value] = {label : prefixLabel + value};
    });

    return _;
};

export const copyObject = function (prop) {
    let localState = {};

    if (!prop) {
        return localState;
    }

    Object.keys(prop).forEach(function (key) {
        localState[key] = prop[key];
    });
    return localState;
};

export const materialize = function () {
    let ref;

    if (typeof Materialize !== "undefined" && Materialize !== null) {
        if ((ref = Materialize.updateTextFields) != null) {
            ref.call();
        }
    }
};

export const toast = function(message) {
    let ref;

    if (typeof Materialize !== "undefined" && Materialize !== null) {
        if ((ref = Materialize.toast) != null) {
            ref.call(Materialize, message, 4000);
        }
    }
};

export const processErrors = function (list) {
    let errors = {};
    if(! (list instanceof Array)) {
        return [{'global': list}];
    }

    list.forEach(function (item) {
        let slot = errors[item.param] || (errors[item.param] = []);
        slot.push(item.msg);
    });
    return errors;
};

export const lowerBound  = function (num, limit) {
    return num >= limit ? num : limit
};

/*
export default {
    labelize,
    copyObject,
    materialize,
    toast,
    processErrors
}
*/