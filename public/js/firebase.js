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

window.onload = function() {

  window.myDoughnut = new Chart(ctx, config);
}
var canvas = document.getElementById("pie-chart");
    canvas.height =50;
var ctx = document.getElementById("pie-chart").getContext("2d");

ref_user.on('child_added',function (snapshot) {
    if (snapshot.val().credit_card == 1 && snapshot.val().debit_card == 1) {
      config['data'].datasets[0]['data'][2] += 1;
    } else if ( snapshot.val().credit_card == 0 && snapshot.val().debit_card == 0 ) {
      config['data'].datasets[0]['data'][3] += 1;
    } else if ( snapshot.val().credit_card == 1 && snapshot.val().debit_card == 0 ) {
      config['data'].datasets[0]['data'][0] += 1;
    } else if ( snapshot.val().credit_card == 0 && snapshot.val().debit_card == 1 ) {
      config['data'].datasets[0]['data'][1] += 1;
    }
    window.myDoughnut.update();
});




var config = {
    type: 'pie',
    data: {
        labels: ["Crédito", "Débito","Ambas [Crédito/Débito]","Ninguna"],
        datasets: [{
            label: 'Tarjetas',
            data: [0, 0, 0, 0],
            backgroundColor: [
                'rgba(25, 118, 210, 1)',
                'rgba(245, 124, 0, 1)',
                'rgba(104, 159, 56, 1)',
                'rgba(194, 24, 91, 1)'
            ],
            borderColor: [
                'rgba(13, 71, 161, 1)',
                'rgba(230, 81, 0, 1)',
                'rgba(51, 105, 30, 1)',
                'rgba(136, 14, 79, 1)'
            ],
            borderWidth: 2,
            hoverBackgroundColor: [
                'rgba(33, 150, 243, 1)',
                'rgba(255, 152, 0, 1)',
                'rgba(139, 195, 74, 1)',
                'rgba(233, 30, 99, 1)'
            ]
        }]
    },
    options: {
        title: {
            display: true,
            text: 'Tarjetas con respecto a los usuarios'
        }
    }
};
function update() {
    window.myDoughnut.update();
}
