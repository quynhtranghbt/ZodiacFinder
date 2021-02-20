ZodiacFactsIntent()

function ZodiacFinderIntent() {

  const moment = require('moment')

  const zodiac = require('./zodiac')
  // console.log("Hi world")
  // console.log(zodiac)

  // console.log(zodiac["Aries"].startDate)

  for (var key in zodiac) {
    let userBD = moment("2020-03-22")
    let mStartDate = moment(zodiac[key].startDate);
    let mEndDate = moment(zodiac[key].endDate);
    let bool = userBD.isBetween(mStartDate,mEndDate)
    // console.log(bool)
    if (bool) {
      console.log("hiiii " + key)
    }else {
      // console.log("Fail")
    }

  }



  // let today = moment()
  // let boolean = today.isBetween("1991-03-18", "2021-06-18")
  // console.log("today is" + boolean)



}