const TEST_APP_CONFIG = {
    'app-url': 'localhost:3006',
    'views-directory': '../unsecure-app/views/',
    'routes': {
        'login': {
            'url': 'login',
            'successContent': 'Welcome to your profile'
        }
    }
}

module.exports = {
    config: TEST_APP_CONFIG
}