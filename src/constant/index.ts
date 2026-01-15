export const COOKIE_SIDEBAR_STATE_NAME = 'chao_market_sidebar_state';
export const APP_THEME_STATE_NAME = 'chao_market_theme_state';

const APP_CONSULTATION_QUERY_KEY = {
    CONSULTATIONS_SERVICES: 'consultations-services_holistic',
    CONSULTATION_SERVICES_MODULAR: 'consultations-services_modular',
    SELECTED_CONSULTATION_SERVICES: 'selected-consultations-services',
};

const APP_USER_QUERY_KEY = {
    USER_PROFILE: 'user-profile',
    USER_TRANSACTIONS: 'user-transactions',
};

export const APP_QUERY_KEY = {
    ...APP_CONSULTATION_QUERY_KEY,
    ...APP_USER_QUERY_KEY,
};
