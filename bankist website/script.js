'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

/////////////////////////////////////////////////
// Data

// DIFFERENT DATA! Contains movement dates, currency and locale

const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-05-27T17:01:17.194Z',
    '2022-06-20T23:36:17.929Z',
    '2022-06-24T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2];

/////////////////////////////////////////////////
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

/////////////////////////////////////////////////
// Functions
//data of bankist app from the last section
const formatDates = function (movsDate, acc) {
  const calcDaysPassed = (date1, date2) => {
    return Math.round(Math.abs(date1 - date2) / (1000 * 60 * 60 * 24));
  };
  const daysPassed = calcDaysPassed(new Date(), movsDate);
  //console.log(daysPassed);
  if (daysPassed == 0) return `Today`;
  if (daysPassed == 1) return `Yesterday`;
  if (daysPassed < 7) return `${daysPassed} days ago`;
  else {
    // const day = `${movsDate.getDate()}`.padStart(2, 0);
    // const month = `${movsDate.getMonth() + 1}`.padStart(2, 0);
    // const year = movsDate.getFullYear();
    // return `${day}/${month}/${year}`;
    const options = {
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
    };
    return `${new Intl.DateTimeFormat(acc.locale, options).format(movsDate)}`;
  }
};
// to format the currency based on the user
const formatCurrency = function (value, acc) {
  return new Intl.NumberFormat(acc.locale, {
    style: 'currency',
    currency: acc.currency,
  }).format(value);
};
const displayMovements = function (acc, sort = false) {
  containerMovements.innerHTML = '';

  const movs = sort
    ? acc.movements.slice().sort((a, b) => a - b)
    : acc.movements;
  // const movs = movsSort.toFixed(2);

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    //getting date for the movements
    const movsDate = new Date(acc.movementsDates[i]);
    // console.log(movsDate);
    const displayDate = formatDates(movsDate, acc);
    const formattedNum = formatCurrency(mov, acc);
    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
      <div class="movements__date">${displayDate}</div>
        <div class="movements__value">${formattedNum}</div> 
      </div>
    `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${acc.balance.toFixed(2)}€`;
};

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes.toFixed(2)}€`;

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(out).toFixed(2)}€`;

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      // console.log(arr);
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `${interest.toFixed(2)}€`;
};

const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};
createUsernames(accounts);

const updateUI = function (acc) {
  // Display movements
  displayMovements(acc);

  // Display balance
  calcDisplayBalance(acc);

  // Display summary
  calcDisplaySummary(acc);
};

//logout of the account
const startLogOutTimer = function () {
  const tick = function () {
    const min = String(Math.trunc(startTime / 60)).padStart(2, 0);
    const sec = String(startTime % 60).padStart(2, 0);
    labelTimer.textContent = `${min}:${sec}`;
    //when  reached = second stop the timer

    if (startTime === 0) {
      clearInterval(timer);
      labelWelcome.textContent = `Login to get started`;
      containerApp.style.opacity = 0;
    }
    startTime--;
  };

  let startTime = 120; // in seconds
  tick();
  const timer = setInterval(tick, 1000);
  return timer;
};
///////////////////////////////////////
// Event handlers
let currentAccount;
let timer; //globally declared because it needs to store previous timeer of another account  it its login while switching to next account

//---------------------fake login------------------------

// currentAccount = account1;
// updateUI(currentAccount);
// containerApp.style.opacity = 100;

// experimenting API
const current = new Date();

//---------------------------------------------------
btnLogin.addEventListener('click', function (e) {
  // Prevent form from submitting
  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  console.log(currentAccount);

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // Display UI and message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;

    containerApp.style.opacity = 100;

    //create current date and time
    const now = new Date();
    // const day = `${now.getDay()}`.padStart(2, 0);
    // const month = `${now.getMonth()}`.padStart(2, 0);
    // const year = now.getFullYear();
    // const hour = now.getHours();
    // const min = now.getMinutes();
    // const sec = now.getSeconds();

    // labelDate.textContent = `${day}/${month}/${year}, ${hour}:${min}:${sec}`;
    const options = {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      weekday: 'short',
    };
    labelDate.textContent = new Intl.DateTimeFormat(
      currentAccount.locale,
      options
    ).format(now);

    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();
    if (timer) clearInterval(timer);
    timer = startLogOutTimer();
    // Update UI
    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  inputTransferAmount.value = inputTransferTo.value = '';

  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    // Doing the transfer
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);
    //adding the date to the movements
    currentAccount.movementsDates.push(new Date());
    receiverAcc.movementsDates.push(new Date());

    // Update UI
    updateUI(currentAccount);

    //reset the timer
    clearInterval(timer);
    timer = startLogOutTimer();
  }
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Number(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    // Add movement
    currentAccount.movements.push(Math.floor(amount));
    //adding the date to the movements
    currentAccount.movementsDates.push(new Date());

    // Update UI
    updateUI(currentAccount);
  }
  inputLoanAmount.value = '';

  //reset the timer
  clearInterval(timer);
  timer = startLogOutTimer();
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.username &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    console.log(index);
    // .indexOf(23)

    // Delete account
    accounts.splice(index, 1);

    // Hide UI
    containerApp.style.opacity = 0;
  }

  inputCloseUsername.value = inputClosePin.value = '';
});

let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES
//170 in copy
/*
//171 math and rounding

console.log(+(2.789).toFixed(2));

//the remainder operator
const movements = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const evenMovements = movements.filter(mov => mov % 2 == 0);
console.log(evenMovements);
 */

//---------------------------------------------------------------
/*
//big int operator

console.log(2 ** 10);
console.log(2n ** 100n); // n is for bigint
console.log(BigInt(2 ** 50)); //using bigint operator
*/

//------------------------------------------------------------------
/*
//175  creating dates

const now = new Date();
console.log(now);

console.log(new Date().getFullYear());

// get time
const future = new Date(2037, 11, 9, 15, 20, 22);
console.log(future);

console.log(future.getTime());
console.log(new Date(2143964122000));

console.log(now.getHours());
console.log(future.toISOString());
*/

//---------------------------------------------------------------
/*
// 179 internationalizing numbers

const num = 1124.5;

const opt = {
  style: 'unit',
  unit: 'mile-per-hour',
  //unit: 'celsius',
};
console.log(
  `${'en-us-uk'.split('-').splice(0, 1)}: ${new Intl.NumberFormat(
    'en-US',
    opt
  ).format(num)}`
);
*/

//-----------------------------------------------------------
/*
// 180 set timeout and setInterval
//to delay the execution of certain statement we use the set
//timeout function
const ingredients = ['rice', 'pulau'];
const biryaniTimer = setTimeout(
  (arg1, arg2) =>
    console.log(`The items used in the biryani are ${arg1},${arg2} `),
  5000,
  'raita',
  'pulau'
);

console.log('waiting');

//set timoeout interval
setInterval((arg1, arg2) => {
  const now = new Date();
  const options = {
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
  };
  console.log(
    `Current time: ${new Intl.DateTimeFormat(
      navigator.language,
      options
    ).format(now)}`
  );
  // console.log(
  //   `Current time ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`
  // );
}, 1000);
*/

//time out
