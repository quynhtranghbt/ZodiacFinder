'use strict';

// ------------------------------------------------------------------
// APP INITIALIZATION
// ------------------------------------------------------------------

const { App } = require('jovo-framework');
const { Alexa } = require('jovo-platform-alexa');
const { GoogleAssistant } = require('jovo-platform-googleassistant');
const { JovoDebugger } = require('jovo-plugin-debugger');
const { FileDb } = require('jovo-db-filedb');
const moment = require('moment')
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

const zodiac = { "Aries": { "startDate": "2021-03-21", "endDate": "2021-04-20", "description": "Aries is bold and ambitious, dives headfirst into even the most challenging situations. Aries loves to be number one. Aries is a passionate, motivated, and confident leader who builds community with their cheerful disposition and relentless determination." }, "Taurus": { "startDate": "2021-04-20", "endDate": "2021-05-21", "description": "Taurus is represented by the bull, Taurus is an earth sign. Taureans loves relaxing in peace, rural environments surrounded by soft sounds, soothing aromas, and succulent flavors. At the same time, Taurus are not afraid to work hard for their goals." }, "Gemini": { "startDate": "2021-05-21", "endDate": "2021-06-21", "description": "Gemini is an air sign that they make themselves be exhausted by chasing their personal achievement. They’re often falsely misrepresented as two-faced. Playful and intellectually curious, Gemini is constantly juggling a variety of passions, hobbies, careers, and friend groups" }, "Cancer": { "startDate": "2021-06-21", "endDate": "2021-07-23", "description": "Cancer is a cardinal water sign, represented by the crab. Their biggest strength is the ability to exist in both emotional and material realms. At first, they might be perceived as cold or distant, with time, they will reveal their gentle nature, genuine compassion, and mystical capabilities." }, "Leo": { "startDate": "2021-07-23", "endDate": "2021-08-23", "description": "Leo is represented by the lion and these spirited fire signs are the king and queens of the celestial jungle. They’re delighted to embrace their royal status: Vivacious theatrical, and passionate, Leos love to bask in the spotlight and celebrate themselves." }, "Virgo": { "startDate": "2021-08-23", "endDate": "2021-09-23", "description": "Virgo is an earth sign represented by the goddess of wheat and agriculture. Virgos are logical, practical, and systematic in their approach to life. They are perfectionist at heart and aren't afraid to improve skills through diligent and consistent practice. They are hyper-aware of every detail." }, "Libra": { "startDate": "2021-09-23", "endDate": "2021-10-23", "description": "Libra is an air sign represented by the scales, the only inanimate object of the zodiac. Libra is obsessed with symmetry and strives to create equilibrium in all areas of life. They are the aesthetes of the zodiac: the planet that governs love, beauty, money, and intellectualism connoisseurship." }, "Scorpio": { "startDate": "2021-10-23", "endDate": "2021-11-22", "description": "Scorpio is a water sign that derives its strength from the psychic, emotional realm. They are incredibly passion and power. Life is a game of chess for these calculating water signs, who are constantly plotting several steps ahead in order to orchestrate an eventual checkmate." }, "Sagittarius": { "startDate": "2021-11-22", "endDate": "2021-12-22", "description": "Sagittarians are always knowledgable. Sagittarius launches its many pursuits like blazing arrows, chasing after geographical, intellectual, and spiritual adventures. Sagittarius easily attract friends and lovers with their sense of humor." }, "Capricorn": { "startDate": "2021-12-22", "endDate": "2022-01-01", "description": "Capricorn is the last earth sign of the zodiac. Capricorn is represented by the sea goat. They are skilled at navigating both the material and emotional realms. Capricorns tap into their inner fortitude to overcome whatever stands between them and their long-term goals." }, "Aquarius": { "startDate": "2021-01-20", "endDate": "2021-02-19", "description": "Aquarius is the last air sign of the zodiac. Aquarius is represented by the water bearer. Aquarius are revolutionary thinkers, who aspire to change the world through radical social progress. They are rebels at heart, free-spirited and eccentric." }, "Pisces": { "startDate": "2021-02-19", "endDate": "2021-03-21", "description": "Pisces is the last constellation of the zodiac. It’s symbolized by two fish swimming in opposite directions. Pisces has absorbed every lesson including joys and pains, hopes and fears. This makes them the most psychic, empathetic, and compassionate creatures." } }

app.setHandler({
    LAUNCH() {
        return this.toIntent('WelcomeIntent');
    },

    Help(){
        this.$speech.addText('Please tell me your birthday')
        this.$speech.addBreak('300ms')
        this.$speech.addText('To close the app, say "stop".')
        this.ask(this.$speech);
    }, 
    WelcomeIntent() {
        const welcomeMsg = ["Welcome to Zodiac Finder!", "Hello! Welcome to Zodiac Finder", "Hello! This is Zodiac Finder", "Hi! I am a Zodiac Finder"]
        const appDes = 'I can tell you the date range of a zodiac sign, what your zodiac sign is, and what it is about.'
        const introMsg = [" When is your birthday?", "Please tell me your birthday and I will tell your zodiac sign."]

        this.$speech.addText(welcomeMsg).addBreak("300ms").addText(appDes).addBreak("300ms").addText(introMsg)

        // add image card
        let title = "Zodiac Finder"
        let content = "A voice application to help you find your zodiac sign and tell facts about it"
        let imageUrl = "https://zodiacbucket.s3.amazonaws.com/zodiacsign_wide.jpg"
        this.showImageCard(title, content, imageUrl)
        this.ask(this.$speech)
    },

    ZodiacDatesIntent() {
        let userSign = ''
        if (this.$inputs.zodiacSign.value != '') {
            console.log(this.$inputs.zodiacSign)
            // save the section data
            userSign = this.$inputs.zodiacSign.value
            console.log(userSign + "if statement")
        }

        else if (userSign == '') {
            userSign = this.$session.$data.zodiacSignContext
            console.log(userSign + "else if statement")

        } else {
            return this.ask("Error")
        }


        
        // let userSign = this.$inputs.zodiacSign.value   
        if (zodiac[userSign] != null) {
            let start = moment(zodiac[userSign].startDate).format("MMMM Do")
            let end = moment(zodiac[userSign].endDate).format("MMMM Do")
            this.$speech.addText(userSign + " is from " + start)
            this.$speech.addBreak("400ms")
            this.$speech.addText(" to " + end)
        }
        this.$session.$data.zodiacSignContext = userSign
        this.ask(this.$speech);
    },

    ZodiacFactsIntent() {
        let userSign = ''
        if (this.$inputs.zodiacSign.value != '') {
            console.log(this.$inputs.zodiacSign)
            userSign = this.$inputs.zodiacSign.value
            console.log(userSign + "if statement")
        }

        else if (userSign == '') {
            userSign = this.$session.$data.zodiacSignContext
            console.log(userSign + "else if statement")

        } else {
            return this.ask("Error")
        }

        console.log(userSign + " user sign")

        if (zodiac[userSign]) {
            this.$session.$data.zodiacSignContext = userSign

            return this.ask(zodiac[userSign].description)

        } else {
            return this.ask("Sorry I couldn't find that sign.")
        }

    },



    ZodiacFinderIntent() {
        let userBD = this.$inputs.birthday.value.startDate ?  this.$inputs.birthday.value.startDate :  this.$inputs.birthday.value
        let m = moment(userBD)
        console.log(userBD)
        console.log(m)
        console.log("original year " + m.year())
        m.year(2021)
        console.log(m.format("LL"))

        if (m.isBetween(moment("2021-01-01"), moment("2021-01-20"))) {
            this.$session.$data.zodiacSignContext = "Capricorn"

            console.log("inside if statement")
            return this.ask("Your sign is Capricorn.")
        }

        console.log("after year " + m.year(

        ))
        console.log(m.format("LL Moo"))
        for (var key in zodiac) {
            let mStartDate = moment(zodiac[key].startDate);
            let mEndDate = moment(zodiac[key].endDate);

            let bool = m.isBetween(mStartDate, mEndDate, undefined, '()')
            // console.log(key + " " + mStartDate.format("LL") + " " + mEndDate.format("LL"))
            if (bool) {
                console.log("inside if bool " + m)
                this.$session.$data.zodiacSignContext = key
                this.ask("Your sign is " + key)
                break;
            } else {
                this.ask("Sorry! I can't find your sign")
            }

        }

    }



});

module.exports.app = app;
