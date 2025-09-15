export const COOKIE_SIDEBAR_STATE_NAME = 'chao_market_sidebar_state';
export const APP_THEME_STATE_NAME = 'chao_market_theme_state';

const APP_CONSULTATION_QUERY_KEY = {
    CONSULTATIONS_SERVICES: 'consultations-services',
};

const APP_USER_QUERY_KEY = {
    USER_PROFILE: 'user-profile',
};

export const APP_QUERY_KEY = {
    ...APP_CONSULTATION_QUERY_KEY,
    ...APP_USER_QUERY_KEY,
};
