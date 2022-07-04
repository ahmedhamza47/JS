'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

//151 computing username
//shows the usecase of the map keyword
const computeUserName = function (accs) {
  accs.forEach(function (acc) {
    acc.userName = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};
computeUserName(accounts);

//displaying all the current account data

//showing the movements
const displayMovements = function (movements, sort = false) {
  //sorting the movements

  //we cant use movements.sort() directly because it will change the original movment array
  //so we use the slice()  method that creates a shallow copy of the original movement array
  const sorted = sort ? movements.slice().sort((a, b) => a - b) : movements;
  containerMovements.innerHTML = '';
  sorted.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
        <div class="movements__value">${mov}</div>
      </div>`;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

//calculating and displaying the balance
const calcBalance = function (acc) {
  const balance = acc.movements.reduce((acc, cur) => acc + cur, 0);
  labelBalance.innerHTML = `${balance}€`;
  //creating new method named balance in account object
  acc.balance = balance;
};

// interest deposit and withdrawal section

const activity = function (acc) {
  const deposit = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, cur) => acc + cur, 0);
  labelSumIn.innerHTML = `${deposit}€`;

  const withdrawal = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, cur) => acc + cur, 0);
  labelSumOut.innerHTML = `${Math.abs(withdrawal)}€`;

  const interest = movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .reduce((acc, cur) => acc + cur, 0);
  labelSumInterest.innerHTML = `${interest}€`;
};
const updateUI = function () {
  displayMovements(currentAccount.movements);
  calcBalance(currentAccount);
  activity(currentAccount);
};
// 158 implementing user login

let currentAccount;
btnLogin.addEventListener('click', function (e) {
  e.preventDefault();
  currentAccount = accounts.find(
    acc => acc.userName === inputLoginUsername.value
  );
  console.log(currentAccount);
  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    labelWelcome.textContent = `Welcome Back ${
      currentAccount.owner.split(' ')[0]
    }!!!`;
    console.log('you have logged in');
    containerApp.style.opacity = 100;

    //clear fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();
    updateUI();
  } else {
    console.log('Password Error');
  }
});

//to transfer the amount
let transferAccount;
btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  transferAccount = accounts.find(
    acc => acc.userName === inputTransferTo.value
  );

  const amount = Number(inputTransferAmount.value);
  if (
    amount > 0 &&
    currentAccount.balance >= amount &&
    transferAccount &&
    transferAccount?.userName != currentAccount.userName
  ) {
    //changes in current account
    currentAccount.movements.push(-amount);
    updateUI();

    //changes in transfer account

    transferAccount.movements.push(Number(inputTransferAmount.value));
    inputTransferAmount.value = inputTransferTo.value = '';
    inputTransferAmount.blur();
  } else {
    alert('The input amount is greater than the balance.');
  }
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();
  if (
    currentAccount.userName == inputCloseUsername.value &&
    currentAccount.pin == inputClosePin.value
  ) {
    const curAccountIndex = accounts.findIndex(
      acc => acc.userName === currentAccount.userName
    );
    console.log(curAccountIndex);
    accounts.splice(curAccountIndex, 1);
    console.log(accounts);

    //hide the User interface
    containerApp.style.opacity = 0;
    labelWelcome.textContent = `Log in to get started`;
  } else {
    console.log('error');
  }
});

//request loan method
btnLoan.addEventListener('click', function (e) {
  e.preventDefault();
  const deposit = currentAccount.movements.filter(mov => mov > 0);
  console.log(deposit);
  const loanAmount = Number(inputLoanAmount.value);
  console.log(loanAmount);
  const loanReqValidity = deposit.some(mov => mov >= 0.1 * loanAmount);
  console.log(loanReqValidity);
  if (loanAmount > 0 && loanReqValidity) {
    currentAccount.movements.push(loanAmount);
    updateUI();
  } else alert(`Loan amount should be atleast 10% of any of your deposits`);
});

//sorting the movements
let sortedmovs = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount.movements, !sortedmovs);
  sortedmovs = !sortedmovs;
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// /////////////////////////////////////////////////

// console.log(currencies.get('USD'));

//-------------------------------------------------------------------------------------------------------
/*
//145 for each method
//for each method is similar to the for of method the difference is that it uses a function and its easier for key-value pair
currencies.forEach(function (value, key) {
  console.log(`The currency at ${key} current value is ${value} `);
});
*/
//---------------------------------------------------------------------------------------------
/*
// 148 coding challange #1
const checkDogs = function (dogsJulia, dogsKate) {
  const newDogsJulia = dogsJulia;
  newDogsJulia.splice(-2);
  newDogsJulia.splice(0, 1);
  console.log(newDogsJulia);

  const combinedData = [...newDogsJulia, ...dogsKate];

  combinedData.forEach(function (age, i) {
    let dogAge = age > 3 ? 'adult' : 'puppy';
    console.log(
      `Dog number ${i + 1} is an ${dogAge}, and is ${age} years old.`
    );
  });
};

const juliaData = [3, 5, 2, 12, 7];
const katesData = [4, 1, 15, 8, 3];

checkDogs(juliaData, katesData);
*/

//--------------------------------------------------------------------------------
/*
// 150 map method
const eurToUSD = 1.1;

const movementsUSd = account1.movements.map(mov => mov * eurToUSD);

console.log(movementsUSd);
*/

//--------------------------------------------------------------------------
/*

*/

//-------------------------------------------------------------------------------------
/*
// 152 filter method
const deposits = movements.filter(value => value > 0);
console.log(deposits);

const withdrawals = movements.filter(value => value < 0);
console.log(withdrawals);
*/
//-----------------------------------------------------------------------------
/*
// the reduce method
// acc = snowball
const balance = movements.reduce((acc, cur, i, arr) => {
  console.log(`Iteration ${i + 1}: ${acc}`);
  return cur + acc;
}, 0);
console.log(`Total Balance is ${balance}`);

const highestValue = movements.reduce((acc, cur) => {
  if (acc > cur) return acc;
  else return cur;
}, 0);

console.log(highestValue);
*/

//----------------------------------------------------------------------
/*
//coding challange #2

const calcAverageAge = function (ages) {
  const humanAge = ages.map(function (dogAge) {
    if (dogAge <= 2) {
      return 2 * dogAge;
    } else return 16 + dogAge * 4;
  });
  const newDog = ages.filter(function (age) {
    return age > 1.67;
  });
  const avgHumanAge = newDog.reduce(function (acc, curAge) {
    return acc + curAge;
  }, 0);

  console.log(`The human age based on the given dog age is ${humanAge}`);
  console.log(`The dogs ages which are atleast 18 months old are ${newDog}`);
  console.log(`The avg human age for adult dogs is ${avgHumanAge / 5}`);
};
const data1 = [5, 2, 4, 1, 15, 8, 3];
const data2 = [16, 6, 10, 5, 6, 1, 4];
calcAverageAge(data1);
console.log('--------------------------------------');
calcAverageAge(data2);
*/
//--------------------------------------------------------------------------------
/*
//coding challange #3

const calcAverageHumanAge = function (ages) {
  const humanAge = ages
    .map(dogAge => (dogAge <= 2 ? 2 * dogAge : 16 + dogAge * 4))
    .filter(age => age > 1.67)
    .reduce((acc, cur) => acc + cur, 0);
  return humanAge / ages.length;
};
console.log(calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]));
*/

//-----------------------------------------------------------------------------------
/*
// 157 the find method

const account = accounts.find(acc => acc.owner === 'Jessica Davis');
console.log(account);

*/

//-------------------------------------------------------------------
/*
// 162 flat and flat map
const mov = [];
const flatMovement = accounts.forEach(function (acc) {
  console.log(acc);
});
console.log(flatMovement);
*/
//------------------------------------------------------
/*
//coding challange practice 
const juliaDogs = [3, 5, 2, 12, 7];
const katesDogs = [4, 1, 15, 8, 3];

const checkDogs = function (juliaDogs, katesDogs) {
  const newDogsJulia = juliaDogs;
  newDogsJulia.splice(0, 1);
  newDogsJulia.splice(-2);
  console.log(newDogsJulia);
  const combinedData = [...juliaDogs, ...katesDogs];

  combinedData.forEach(function (age, i) {
    age >= 3
      ? console.log(`Dog ${i + 1} ia an adult and is ${age} years old.`)
      : console.log(`Dog ${i + 1} is still a puppy and is ${age} years old.`);
  });
};
checkDogs(juliaDogs, katesDogs);

const calcAverageAge = function (dogAges) {
  console.log(typeof dogAges);
  const humanAge = dogAges.map(dogAge =>
    dogAge <= 2 ? dogAge * 2 : 16 + dogAge * 4
  );
  const adults = humanAge.filter(age => age > 18);
  console.log(humanAge);

  const calcAverageHumanAge = adults.reduce((acc, cur) => acc + cur, 0);
  console.log(typeof calcAverageHumanAge);
  console.log(
    `The average human age is ${calcAverageHumanAge / adults.length}`
  );
};

calcAverageAge([5, 2, 4, 1, 15, 8, 3]);
 */

//-------------------------------------------------------------------------------------------------
/*
//163 sorting arrays

console.log(movements);
movements.sort((a, b) => a - b);
console.log(movements);
*/

//-----------------------------------------------------------------------------------------------

//coding challange #4

const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] },
];

dogs.forEach(dogobject => {
  let recommendedFood = dogobject.weight ** 0.75 * 28;
  console.log(typeof recommendedFood);
  dogobject.foodrecommendation = parseInt(recommendedFood.toFixed(2));
});
console.log(dogs);

let sarahDog = dogs.find(dogobject => dogobject.owners.includes('Sarah'));

console.log(sarahDog);

if (
  sarahDog.curFood >
  sarahDog.foodrecommendation + 0.1 * sarahDog.foodrecommendation
)
  console.log('Dog is eating more');
else if (
  sarahDog.curFood <
  sarahDog.foodrecommendation - 0.1 * sarahDog.foodrecommendation
)
  console.log('DOg is eating less');
else console.log('Dog is eating okay amount ');

let ownersEatTooMuch = dogs
  .filter(dogobject => dogobject.curFood > dogobject.foodrecommendation)
  .map(dogobject => dogobject.owners)
  .flat();
console.log(ownersEatTooMuch);
let ownersEatTooLittle = dogs
  .filter(dogobject => dogobject.curFood < dogobject.foodrecommendation)
  .map(dogobject => dogobject.owners)
  .flat();
console.log(ownersEatTooLittle);

console.log(`${ownersEatTooMuch.join(' and ')}'s eats too much}`);
console.log(`${ownersEatTooLittle.join(' and ')}'s eats too less}`);

console.log(
  dogs.some(dogobject => dogobject.curFood === dogobject.foodrecommendation)
);
console.log(
  dogs.some(
    dogobject =>
      dogobject.curFood >
        dogobject.foodrecommendation - 0.1 * dogobject.foodrecommendation &&
      dogobject.curFood <
        dogobject.foodrecommendation + 0.1 * dogobject.foodrecommendation
  )
);

const shallowDogsCopy = dogs;
shallowDogsCopy.sort(
  (dog1, dog2) => dog2.foodrecommendation - dog1.foodrecommendation
);
console.log(shallowDogsCopy);
