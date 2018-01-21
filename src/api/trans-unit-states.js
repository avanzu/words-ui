/**
 * Subset of the xliff state attributes
 *
 * @type {{STATE_NEW: string, STATE_TRANSLATED: string, STATE_NEEDS_TRANSLATION: string, STATE_NEEDS_REVIEW_TRANSLATION: string, STATE_FINAL: string, STATE_SIGNED_OFF: string}}
 */
export const states = {
    STATE_NEW                     : 'new',
    STATE_TRANSLATED              : 'translated',
    STATE_NEEDS_TRANSLATION       : 'needs-translation',
    STATE_NEEDS_REVIEW_TRANSLATION: 'needs-review-translation',
    STATE_FINAL                   : 'final',
    STATE_SIGNED_OFF              : 'signed-off'
};

/**
 * maps states to colors
 *
 * @type {{}}
 */
export const colorMap = {

    [states.STATE_NEW]                     : 'cyan-text text-lighten-5',
    [states.STATE_TRANSLATED]              : 'blue-text text-lighten-4',
    [states.STATE_NEEDS_TRANSLATION]       : 'deep-orange-text text-lighten-4',
    [states.STATE_NEEDS_REVIEW_TRANSLATION]: 'purple-text text-lighten-4',
    [states.STATE_FINAL]                   : '',
    [states.STATE_SIGNED_OFF]              : ''

};

// export const STATE_NEEDS_ADAPTATION = 'needs-adaptation';
// export const STATE_NEEDS_L10N = 'needs-l10n';
// export const STATE_NEEDS_REVIEW_ADAPTATION = 'needs-review-adaptation';
// export const STATE_NEEDS_REVIEW_L10N = 'needs-review-l10n';
