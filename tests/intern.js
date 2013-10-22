define({
    loader: {
        packages: [{
            name: 'tests',
            location: './tests/onx'
        },{
            name: 'onx',
            location: './src'
        },{
            name: 'dojo',
            location: './bower_components/dojo'
        },{
            name: 'mout',
            location: './bower_components/mout/src'
        }]
    },

    suites: [
        'tests/delay',
        'tests/buffer',
        'tests/topic/buffer',
        'tests/topic/delay',
        'tests/aspect/buffer',
        'tests/aspect/delay'
    ],

    excludeInstrumentation: /^tests\//
});
