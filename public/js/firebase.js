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
var myDoughnut, myDoughnutBusiness;
window.onload = function() {

   var canvas = document.getElementById("pie-chart");
       canvas.height = 100;
   var canvasB = document.getElementById("business");
       canvasB.height = 100;
   var ctx = document.getElementById("pie-chart").getContext("2d");
   var ctxB = document.getElementById("business").getContext("2d");
   window.myDoughnut = new Chart(ctx, config);
   window.myDoughnutBusiness = new Chart(ctxB, configB);
}


ref_user.on('child_added',function (snapshot) {
    cards(snapshot);
    business(snapshot);
    myDoughnut.update();
    myDoughnutBusiness.update();
});

function cards(snapshot) {
  if (snapshot.val().credit_card == 1 && snapshot.val().debit_card == 1) {
    config['data'].datasets[0]['data'][2] += 1;
  } else if ( snapshot.val().credit_card == 0 && snapshot.val().debit_card == 0 ) {
    config['data'].datasets[0]['data'][3] += 1;
  } else if ( snapshot.val().credit_card == 1 && snapshot.val().debit_card == 0 ) {
    config['data'].datasets[0]['data'][0] += 1;
  } else if ( snapshot.val().credit_card == 0 && snapshot.val().debit_card == 1 ) {
    config['data'].datasets[0]['data'][1] += 1;
  }
}

function business(snapshot) {
  console.log(snapshot.val().business);
  if (snapshot.val().business == 'Supermercado') {
    configB['data'].datasets[0]['data'][0] += 1;
  }else if (snapshot.val().business == 'Farmacia') {
    configB['data'].datasets[0]['data'][1] += 1;
  }else if (snapshot.val().business == 'Tiendas de Electronicos') {
    configB['data'].datasets[0]['data'][2] += 1;
  }else if (snapshot.val().business == 'Cine') {
    configB['data'].datasets[0]['data'][3] += 1;
  }else if (snapshot.val().business == 'Médico') {
    configB['data'].datasets[0]['data'][4] += 1;
  }else if (snapshot.val().business == 'Restaurantes') {
    configB['data'].datasets[0]['data'][5] += 1;
  }else if (snapshot.val().business == 'Banco') {
    configB['data'].datasets[0]['data'][6] += 1;
  }else if (snapshot.val().business == 'Expendedora') {
    configB['data'].datasets[0]['data'][7] += 1;
  }else if (snapshot.val().business == 'Bares') {
    configB['data'].datasets[0]['data'][8] += 1;
  }
}

var config = {
    type: 'doughnut',
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

var configB = {
    type: 'polarArea',
    data: {
        labels: ["Supermercado", "Farmacia","Electronicos","Cine","Médico","Restaurantes","Banco","Expendedora","Bares"],
        datasets: [{
            label: 'Tarjetas',
            data: [0,0,0,0,0,0,0,0,0],
            backgroundColor: [
                'rgba(25, 118, 210, 1)',
                'rgba(245, 124, 0, 1)',
                'rgba(104, 159, 56, 1)',
                'rgba(194, 24, 91, 1)',
                'rgba(192, 21, 31, 1)',
                'rgba(25, 128, 110, 1)',
                'rgba(241, 124, 3, 1)',
                'rgba(134, 159, 56, 1)',
                'rgba(144, 14, 91, 1)'
            ],
            // borderColor: [
            //     'rgba(13, 71, 161, 1)',
            //     'rgba(230, 81, 0, 1)',
            //     'rgba(51, 105, 30, 1)',
            //     'rgba(136, 14, 79, 1)'
            // ],
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
