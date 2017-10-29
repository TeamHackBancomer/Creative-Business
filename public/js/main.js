// JS PRINCIPAL
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

$(document).ready(function(){
    $('.parallax').parallax();
});
