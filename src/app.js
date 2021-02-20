'use strict';

// ------------------------------------------------------------------
// APP INITIALIZATION
// ------------------------------------------------------------------

const { App } = require('jovo-framework');
const { Alexa } = require('jovo-platform-alexa');
const { GoogleAssistant } = require('jovo-platform-googleassistant');
const { JovoDebugger } = require('jovo-plugin-debugger');
const { FileDb } = require('jovo-db-filedb');

const app = new App();

app.use(
    new Alexa(),
    new GoogleAssistant(),
    new JovoDebugger(),
    new FileDb()
);


// ------------------------------------------------------------------
// APP LOGIC
// ------------------------------------------------------------------

app.setHandler({
    LAUNCH() {
        return this.toIntent('HelloWorldIntent');
    },

    WelcomIntent() {
        this.ask('Welcome');
    },

    ZodiacDatesIntent() {
        this.ask('Zodiac sign!');
    },

    ZodiacFactsIntent() {
        this.tell('Zodiac facts');
    },

    ZodiacFinderIntent() {
        this.tell('Zodiac finder');
    },
});

module.exports.app = app;
