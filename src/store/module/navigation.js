/**
 * Created by avanzu on 06.02.17.
 */
import * as types from "../mutation-types";

const state     = {
    menu: [],
    processing: false,
    error: null
};

const actions   = {
    addMenuItem({commit, state}, menu) {
        commit(types.MENU_ADD);
        commit(types.MENU_ADD_SUCCESS, menu);
    }
};

const mutations = {
    [types.MENU_ADD](state) {
        state.processing = true;
    },
    [types.MENU_ADD_SUCCESS](state, menu){
        state.processing = false;
        state.error = null;
        if( menu ) {
            state.menu.push(menu);
        }
    },
    [types.MENU_ADD_FAILURE](state, reason){
        state.processing = false;
        state.error = reason;
    }
};



export default { state, actions, mutations }
