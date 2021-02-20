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

const zodiac = {"Aries":{"startDate":"2020/03/21","endDate":"2020/04/19","description":"Aries is bold and ambitious, dives headfirst into even the most challenging situations. Aries loves to be number one. Aries is a passionate, motivated, and confident leader who builds community with their cheerful disposition and relentless determination."},"Taurus":{"startDate":"2020/04/20","endDate":"2020/05/20","description":"Represented by the bull, Taurus is an earth sign. Taureans loves relaxing in peace, rural environments surrounded by soft sounds, soothing aromas, and succulent flavors. At the same time, Taurus are not afraid to work hard for their goals."},"Gemini":{"startDate":"2020/05/21","endDate":"2020/06/20","description":"Gemini is an air sign that they make themselves be exhausted by chasing their personal achievement. They’re often falsely misrepresented as two-faced. Playful and intellectually curious, Gemini is constantly juggling a variety of passions, hobbies, careers, and friend groups"},"Cancer":{"startDate":"2020/06/21","endDate":"2020/07/22","description":"Cancer is a cardinal water sign, represented by the crab. Their biggest strength is the ability to exist in both emotional and material realms. At first, they might be perceived as cold or distant, with time, they will reveal their gentle nature, genuine compassion, and mystical capabilities."},"Leo":{"startDate":"2020/07/23","endDate":"2020/08/22","description":"Leo is represented by the lion and these spirited fire signs are the king and queens of the celestial jungle. They’re delighted to embrace their royal status: Vivacious theatrical, and passionate, Leos love to bask in the spotlight and celebrate themselves."},"Virgo":{"startDate":"2020/08/23","endDate":"2020/09/22","description":"Virgo is an earth sign represented by the goddess of wheat and agriculture. Virgos are logical, practical, and systematic in their approach to life. They are perfectionist at heart and isn’t afraid to improve skills through diligent and consistent practice. They are hyper-aware of every detail."},"Libra":{"startDate":"2020/09/23","endDate":"2020/10/22","description":"Libra is an air sign represented by the scales, the only inanimate object of the zodiac. Libra is obsessed with symmetry and strives to create equilibrium in all areas of life. They are the aesthetes of the zodiac: the planet that governs love, beauty, money, and intellectualism connoisseurship."},"Scorpio":{"startDate":"2020/10/23","endDate":"2020/11/21","description":"Scorpio is a water sign that derives its strength from the psychic, emotional realm. They are incredibly passion and power. Life is a game of chess for these calculating water signs, who are constantly plotting several steps ahead in order to orchestrate an eventual checkmate."},"Sagittarius":{"startDate":"2020/11/22","endDate":"2020/12/21","description":"Sagittarians are always knowledgable. Sagittarius launches its many pursuits like blazing arrows, chasing after geographical, intellectual, and spiritual adventures. Sagittarius easily attract friends and lovers with their sense of humor."},"Capicorn":{"startDate":"2020/12/22","endDate":"2020/01/19","description":"The last earth sign of the zodiac. Capricorn is represented by the sea goat. They are skilled at navigating both the material and emotional realms. Capicorns tap into their inner fortitude to overcome whatever stands between them and their long-term goals."},"Aquarius":{"startDate":"2020/01/20","endDate":"2020/02/18","description":"The last air sign of the zodiac. Aquarius is represented by the water bearer. Aquarius are revolutionary thinkers, who aspire to change the world through radical social progress. They are rebels at heart, free-spirited and eccentric."},"Pisces":{"startDate":"2020/02/19","endDate":"2020/03/20","description":"The last constellation of the zodiac. It’s symbolized by two fish swimming in opposite directions. Pisces has absorbed every lesson including joys and pains, hopes and fears. This makes them the mostx psychic, empathetic, and compassionate creatures."}}

app.setHandler({
    LAUNCH() {
        return this.toIntent('WelcomeIntent');
    },


    WelcomeIntent() {
        const welcomeMsg = ["Welcome to Zodiac Finder!", "Hello! Welcome to Zodiac Finder", "Hello! This is Zodiac Finder", "Hi! I am a Zodiac Finder"]
        const introMsg = ["I can tell dates of zodiac signs, what your zodiac sign is and facts about it.", "Tell me your birthday and I can tell your zodiac sign."]
        
        this.$speech.addText(welcomeMsg).addBreak("300ms").addText(introMsg)

        // add image card
        let title = "Zodiac Finder"
        let content = "A voice application to help you find your zodiac and tell facts about it"
        let imageUrl = "https://zodiacbucket.s3.amazonaws.com/horoscope_large.jpg"
        this.showImageCard(title, content, imageUrl)
        this.ask(this.$speech)
    },

    ZodiacDatesIntent() {
        this.ask('Zodiac sign!');
    },

    ZodiacFactsIntent() {
        console.log(zodiac.Aries.description)
        console.log(this.$inputs.zodiacSign)
        let userSign = this.$inputs.zodiacSign.value
        if (userSign === "Aries"){

            console.log(userSign)
            return this.tell(zodiac.Aries.description)
        }
        this.tell('Zodiac facts');
    },

    ZodiacFinderIntent() {

        this.tell('Zodiac finder');
    },
});

module.exports.app = app;
