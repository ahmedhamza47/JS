'using strict';
/*
//functions assignment
function describeCountry(country, population, capitalCity) {
    const countryIntro = `${country} has ${population} million people and it's capital is ${capitalCity} .`
    return countryIntro;
}
const country1 = describeCountry('Nepal', 650, 'Kathmandu')
const country2 = describeCountry('India', 1000, 'Delhi')
const country3 = describeCountry('China', 1015, 'Beijing')
console.log(country1)
console.log(country2)
console.log(country3)
*/
//------------------------------------------------------
/*
//function declaration vs function Expression assignment
const worldPopulation = 7900
function percentageOfWorld1(countryName, population) {
    percentagePopulation = Math.round((population / worldPopulation) * 100)
    return (`${countryName} has ${population} million people, so it's about ${percentagePopulation} % of the world population`)
}
const country1 = percentageOfWorld1('Nepal ❤', 60)
console.log(country1)

const country2 = percentageOfWorld1('Bhutan 😊', 84)
*/
//-------------------------------------------------------
/*
//arrow function assignment
const worldPopulation = 7900
const percentageOfWorld3 = (countryName, population) => {
    percentagePopulation = Math.round((population / worldPopulation) * 100)
    return (`${countryName} has ${population} million people, so it's about ${percentagePopulation} % of the world population`)

}
const country3 = percentageOfWorld3('China', 600)
console.log(country3)
*/

//-------------------------------------------------------


/*
// coding challange #1
const calcAverage = (score1, score2, score3) => {
    return (score1 + score2 + score3) / 3
}
const dolphinsScore = calcAverage(95, 54, 41)
const koalasScore = calcAverage(23, 34, 27)

function checkWinner(avgDolphins, avgKoalas) {

    if (avgDolphins >= 2 * avgKoalas) {
        console.log(`Dolphins wins(${avgDolphins} vs${avgKoalas})`)

    }
    else if (avgKoalas >= 2 * avgDolphins) {
        console.log(`Koalas wins(${avgKoalas} vs${avgDolphins})`)
    }
    else {
        console.log('No Team Wins')
    }
}
checkWinner(dolphinsScore, koalasScore)
*/

//---------------------------------------------------------
/*
// 39 Introduction To Arrays

const friends = ['Hamza', 'Soni', 'Ertugrul']
const newFriends = ['Abhisekh', 'Pukar', friends]
console.log(newFriends)
// ARRAYS ASSIGMENT
const populations = ['Nepal', 'China', 'India']
p = []
const worldPopulation = 7900
const percentageOfWorld3 = (countryName, population) => {
    percentagePopulation = Math.round((population / worldPopulation) * 100)
    p.push(percentagePopulation)
    return (`${countryName} has ${population} million people, so it's about ${percentagePopulation} % of the world population`)

}
const country3 = percentageOfWorld3(populations[0], 600)
const country4 = percentageOfWorld3(populations[1], 800)
const country5 = percentageOfWorld3(populations[2], 400)

console.log(p)
*/

//-----------------------------------------------------------
/*
//Coding Challange #2

const calcTip = function (bill) {
    let tip = 0
    bill >= 50 && bill <= 300 ? tip = 0.15 * bill : tip = 0.2 * bill

    // if (bill >= 50 && bill <= 300) {
    //     tip = 0.15 * bill
    // }
    // else {
    //     tip = 0.2 * bill
    // }
    return tip
}
const bills = [125, 555, 44]
const tipValue = []
const tips = calcTip(bills[0])
console.log(`The bill obtained is ${bills[0]} and the tip is ${tips}.`)
tipValue.push(tips)
*/

//--------------------------------------------------------


