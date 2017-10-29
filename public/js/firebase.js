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
var latlng = [];

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
    business:       business
  }).then(function (message) {
    $('#preloader-onsubmit').css('display','block');
    console.log(message,'message');
    window.location.href = 'thank.html';
  });
}

ref_user.on('child_added',function (snapshot) {
    // var users = snapshot.val();
    // console.log(snapshot.key);
    // console.log(snapshot.val());
    latlng.push({
      key: snapshot.key,
      lat: snapshot.val().lat,
      lng: snapshot.val().lng
    })

})
