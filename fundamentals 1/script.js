/*
//10)values and variables
name = 'hamza'
alert(name)
console.log(name)


//assignment
let country = 'Nepal'
continent = 'Asia'
population = '30 million'

console.log(country)
console.log(continent)
console.log(population)
*/
//-------------------------------------------------------
/*
//12)data types
let js = true
console.log(js)

console.log(typeof js)
let year = 2000
console.log(typeof year)

//assignment
let isIsland = false
let language
console.log(isIsland)
console.log(language)
*/
//-------------------------------------------------------
/*
//coding challange #1
let MarksMass = 78
let JohnMass = 92
let MarksHeight = 1.69
let JohnHeight = 1.95
BMIMArks = MarksMass / MarksHeight ** 2
BMIJohn = JohnMass / JohnHeight ** 2

markHIgherBMI = (BMIMArks > BMIJohn)
console.log(markHIgherBMI)
*/
//-----------------------------------------------------------
/*
//17 string and template literals

const firstName = 'Hamza'
const lastName = 'Ahmed'
const hobby = 'reading'

const intro = `My first name is ${firstName} and my lastname is ${lastName}.
My hobby is ${hobby}`
console.log(intro)
*/
//----------------------------------------------------------
//18 if/else statement
/*
const name = 'hamza'

if (name == 'hamza') {
    console.log(name)
}
else {
    console.log('Name doesnot match')
}

//coding challange #2
if (BMIMArks > BMIJohn) {
    console.log(`Marks BMI (${BMIMArks}) is grater than Johns BMI(${BMIJohn})`)
}
else {
    console.log(`John BMI (${BMIJohn}) is grater than Marks BMI(${BMIMArks})`)
}
*/
//--------------------------------------------------
/*
//21 truthy and falsy values
//the false values are 0,'',undefined,Null,NAN;

console.log(Boolean(0))
console.log(Boolean(undefined))

age = undefined
if (age) {
    console.log(`your age is ${age}`)
}
else {
    console.log('your age is not defined')
}
*/

//-------------------------------------------------------
/*
//coding challange #3

const d1 = 97
const d2 = 112
const d3 = 101
const k1 = 109
const k2 = 95
const k3 = 106

dolphinAverageScore = (d1 + d2 + d3) / 3
koalaAverageScore = (k1 + k2 + k3) / 3
console.log(dolphinAverageScore)
console.log(koalaAverageScore)

if (dolphinAverageScore > koalaAverageScore && dolphinAverageScore >= 100) {
    console.log('TeamDolphin Wins')
}
else if (koalaAverageScore > dolphinAverageScore && koalaAverageScore >= 100) {
    console.log('Team Koala Wins')
}
else if (koalaAverageScore == dolphinAverageScore && koalaAverageScore >= 100 && dolphinAverageScore >= 100) {
    console.log('Draw')
}
else {
    console.log('No team wins the trophy')
}
*/

//---------------------------------------------------------
/*
//28 ternary operator
day = 'saturday'
console.log(`${day === 'saturday' ? 'democracy day' : 'normal holiday'} is today`)
*/

//-------------------------------------------------------

//coding challange #4
bill_value = 5
const tip = bill_value >= 50 && bill_value <= 300 ? 0.15 * bill_value : 0.2 * bill_value

console.log(`The bill was ${bill_value}$,the tip was ${tip}$
The total value was ${bill_value + tip}$`)

//------------------------------------------------------
//=---------------------------------------------------