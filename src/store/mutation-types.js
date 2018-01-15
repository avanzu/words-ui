/**
 * Created by avanzu on 03.02.17.
 */


// ------------------------------------------------------------------------------------------------ AUTHENTICATION TOKEN
export const AUTHENTICATE           = 'AUTHENTICATE';
export const AUTHENTICATE_SUCCESS   = 'AUTHENTICATE_SUCCESS';
export const AUTHENTICATE_SET_TOKEN = 'AUTHENTICATE_SET_TOKEN';
export const AUTHENTICATE_FAILURE   = 'AUTHENTICATE_FAILURE';

// ------------------------------------------------------------------------------------------ RENEW AUTHENTICATION TOKEN
export const AUTHENTICATE_REFRESH         = 'AUTHENTICATE_REFRESH';
export const AUTHENTICATE_REFRESH_SUCCESS = 'AUTHENTICATE_REFRESH_SUCCESS';
export const AUTHENTICATE_REFRESH_FAILURE = 'AUTHENTICATE_REFRESH_FAILURE';

// ------------------------------------------------------------------------------------------ SIGN OUT / DE-AUTHENTICATE
export const USER_SIGN_OUT         = 'USER_SIGN_OUT';
export const USER_SIGN_OUT_SUCCESS = 'USER_SIGN_OUT_SUCCESS';
export const USER_SIGN_OUT_FAILURE = 'USER_SIGN_OUT_FAILURE';

// ----------------------------------------------------------------------------------------------- USER PROFILE HANDLING
export const PROFILE_SET           = 'PROFILE_SET';
export const PROFILE_FETCH         = 'PROFILE_FETCH';
export const PROFILE_FETCH_SUCCESS = 'PROFILE_FETCH_SUCCESS';
export const PROFILE_FETCH_FAILURE = 'PROFILE_FETCH_FAILURE';
export const PROFILE_SAVE          = 'PROFILE_SAVE';
export const PROFILE_SAVE_SUCCESS  = 'PROFILE_SAVE_SUCCESS';
export const PROFILE_SAVE_FAILURE  = 'PROFILE_SAVE_FAILURE';

// -------------------------------------------------------------------------------------------------------- REGISTRATION
export const USER_SIGN_UP         = 'USER_SIGN_UP';
export const USER_SIGN_UP_SUCCESS = 'USER_SIGN_UP_SUCCESS';
export const USER_SIGN_UP_FAILURE = 'USER_SIGN_UP_FAILURE';

// ------------------------------------------------------------------------------------------------------------- PROJECT

export const PROJECTS_FETCH         = 'PROJECTS_FETCH';
export const PROJECTS_FETCH_SUCCESS = 'PROJECTS_FETCH_SUCCESS';
export const PROJECTS_FETCH_FAILURE = 'PROJECTS_FETCH_FAILURE';

export const PROJECT_STATS_FETCH    = 'PROJECT_STATS_FETCH';
export const PROJECT_STATS_FETCH_SUCCESS = 'PROJECT_STATS_FETCH_SUCCESS';
export const PROJECT_STATS_FETCH_FAILURE = 'PROJECT_STATS_FETCH_FAILURE';

// -----------------------------------------------------------------------------------------------------------TRANS-UNIT


// ----------------------------------------------------------------------------------------------------------TRANSLATION


// ---------------------------------------------------------------------------------------------------------------- I18N

export const SET_LOCALE_SUCCESS = 'SET_LOCALE_SUCCESS';
export const SET_LOCALE_FAILURE = 'SET_LOCALE_FAILURE';


export const MENU_ADD         = 'MENU_ADD';
export const MENU_ADD_SUCCESS = 'MENU_ADD_SUCCESS';
export const MENU_ADD_FAILURE = 'MENU_ADD_FAILURE';

export const XDEBUG_ENABLE  = 'XDEBUG_ENABLE';
export const XDEBUG_DISABLE = 'XDEBUG_DISABLE';
export const XDEBUG_TOGGLE  = 'XDEBUG_TOGGLE';

export const APPLICATION_BOOT         = 'APPLICATION_BOOT';
export const APPLICATION_BOOT_SUCCESS = 'APPLICATION_BOOT_SUCCESS';
export const APPLICATION_BOOT_FAILURE = 'APPLICATION_BOOT_FAILURE';