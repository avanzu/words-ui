/**
 * Created by avanzu on 16.02.17.
 */
import * as types from "../mutation-types";
const enabled = (process.env.NODE_ENV !== 'production');

const state = {
    enabled: enabled,
    xDebug: false,
    errors: {},

};

const mutations = {
    [types.XDEBUG_ENABLE](state) {
        state.xDebug = true;
    },
    [types.XDEBUG_DISABLE](state) {
        state.xDebug = false;
    },
    [types.XDEBUG_TOGGLE](state) {
        state.xDebug = !state.xDebug;
    }
};

if( enabled ) {
    Object.keys(types).forEach((key) => {
        let val = types[key];
        if (val.indexOf('FAILURE') > -1) {
            mutations[key] = function (state, reason) {
                state.errors[val] = reason;
            }
        }
    });
}


const actions = {
    xDebugEnable({commit}) {
        commit(types.XDEBUG_ENABLE);
    },
    xDebugDisable({commit})  {
        commit(types.XDEBUG_DISABLE);
    },
    xDebugToggle({commit}) {
        commit(types.XDEBUG_TOGGLE);
    }
};

export default { state, actions, mutations }