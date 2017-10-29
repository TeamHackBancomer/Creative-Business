var config = {
  apiKey: "AIzaSyDiWIivdO83bNC7OwicWC8N7NMq9CpoOYI",
  authDomain: "creative-business-hb.firebaseapp.com",
  databaseURL: "https://creative-business-hb.firebaseio.com",
  projectId: "creative-business-hb",
  storageBucket: "creative-business-hb.appspot.com",
  messagingSenderId: "487883854645"
};
firebase.initializeApp(config);
//database
var database = firebase.database();
var ref_user = database.ref('user');
var latitude, longitude;

function submit() {
  name = $('#first_name').val();
  sex  = $('#sex').val();
  age  = $('#age').val();
  if ( $('#card').val() == 1 ) {
    credit_card = 1;
    debit_card  = 0;
  } else if ( $('#card').val() == 2 ) {
    credit_card = 0;
    debit_card  = 1;
  } else if ( $('#card').val() == 3 ) {
    credit_card = 1;
    debit_card  = 1;
  } else if ( $('#card').val() == 4 ) {
    credit_card = 0;
    debit_card  = 0;
  }
  monthly_income = $('#ingreso').val();
  business = $('#business').val();
  lat = latitude;
  lng = longitude;
  writeUserData(name, sex, age, monthly_income, credit_card, debit_card, lat, lng, business)
}

$('#submit_button').on('click', function () {
  submit();
});

function writeUserData(name, sex, age, monthly_income, credit_card, debit_card, lat, lng, business) {
  ref_user.push({
    name:           name,
    sex:            sex,
    age:            age,
    monthly_income: monthly_income,
    credit_card:    credit_card,
    debit_card:     debit_card,
    lat:            lat,
    lng:            lng,
    shops:          shops
  }).then(function (message) {
    console.log(message,'message');
  });
}


window.onload = getLocation();

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        navigator.geolocation.getCurrentPosition(showPosition);
    }
}
function showPosition(position) {
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;
}
