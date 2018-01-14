/**
 * Created by avanzu on 29.12.16.
 */

const avatars = [
    "american-football-player",
    "baseball-player",
    "basketball-player-1",
    "basketball-player",
    "boxer",
    "climber",
    "cricket-player",
    "cyclist",
    "driver",
    "fencer",
    "gymnast",
    "horsewoman",
    "karate",
    "mountaineer",
    "referee",
    "runner",
    "scuba-diver",
    "snowboarder",
    "soccer-player-1",
    "soccer-player-2",
    "soccer-player",
    "sportswear-1",
    "sportswear-2",
    "sportswear",
    "sumotori",
    "swimmer-1",
    "swimmer",
    "tennis-player-1",
    "tennis-player",
    "wrestler",
];

export const list = function () {
    return avatars;
};
export const byIndex = function () {
    return avatars[index];
};
export const path = function(name) {
    if( null === name || typeof name === 'undefined' ) {
        name = avatars[0];
    }

    return '/static/img/avatars/svg/' + name + '.svg';
};
export const pathByIndex = function(index) {
    return path(byIndex(index));
};

/**
export default {
    list,
    byIndex,
    path,
    pathByIndex
};
*/