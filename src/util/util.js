/**
 * Created by avanzu on 23.12.16.
 */

/**
 * Most indexOf functions will return -1 as "not found"
 * @constant {number}
 */
export const OUT_OF_BOUNDS = -1;

export const labelize = function (items, prefixLabel) {
    let _ = {};
    items.forEach(function (value) {
        _[value] = {label: prefixLabel + value};
    });

    return _;
};

/**
 *  Creates a deep array copy
 * @param arr
 * @return {Array}
 */
const copyArray = function (arr) {
    let arrayResult = [];
    arr.forEach(el => arrayResult.push(cloneObjOrArray(el)));
    return arrayResult;
};

/**
 * Creates a deep object copy
 * @param obj
 * @return {{}}
 */
const copyObj = function (obj) {
    let objResult = {};
    Object.keys(obj).forEach(key => {
        if (obj.hasOwnProperty(key)) {
            objResult[key] = cloneObjOrArray(obj[key]);
        }
    });

    return objResult;
};

/**
 * creates a deep clone of the given object, array or primitive
 *
 * @param el
 * @return {*}
 */
const cloneObjOrArray = function (el) {
    if (Array.isArray(el)) return copyArray(el);
    if (typeof el === 'object') return copyObj(el);
    return el;
};

/**
 * Creates a deep copy of the given object.
 * The primary intent for this function would be to copy an object registered in the store
 * into an unmanaged one, serving as the local state within editor components.
 *
 * This allows to update a complete data set rather than a partially modified one as it would be
 * the case with the conventional vuex recommendation.
 *
 *
 * @param objOrArray
 * @return {*}
 */
export const copyObject = function (objOrArray) {
    return cloneObjOrArray(objOrArray);
};


/**
 * materializecss initializer function
 *
 */
export const materialize = function () {
    let ref;

    if (typeof Materialize !== 'undefined' && Materialize !== null) {
        if ((ref = Materialize.updateTextFields) != null) {
            ref.call();
        }
    }
};

/**
 * materializecss.toast function
 *
 * @param message
 */
export const toast = function (message) {
    let ref;

    if (typeof Materialize !== 'undefined' && Materialize !== null) {
        if ((ref = Materialize.toast) != null) {
            ref.call(Materialize, message, 4000);
        }
    }
};

export const processErrors = function (list) {
    let errors = {};
    if (!(list instanceof Array)) {
        return [{'global': list}];
    }

    list.forEach(function (item) {
        let slot = errors[item.param] || (errors[item.param] = []);
        slot.push(item.msg);
    });
    return errors;
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