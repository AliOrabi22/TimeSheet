'use strict'

function getWorkingHours(checkin, checkout){
  return new Promise(function(resolve, reject){
    // Sanity Checks // 
    if (checkin == undefined || checkin == ''){
      reject(new Error('Checkin is not defined'));
    }
    if (checkout == undefined || checkout == ''){
      reject(new Error('Checkout is not defined'));
    }

    // Calculate Working Hours // 
    const checkinInMinute    = getTimeInMinutes(checkin); 
    const checkoutInMinute   = getTimeInMinutes(checkout);
    const MINUTES_PER_DAY    = 24 * 60; 
    var workingHoursInMinute = checkoutInMinute - checkinInMinute; 
    
    if (workingHoursInMinute < 0){
      workingHoursInMinute += MINUTES_PER_DAY; 
    }

   getTimeInHours(workingHoursInMinute)
    .then(resolve)
    .catch(reject)

  });
}

function getTimeInMinutes(time){
  
  if (time == undefined || time == ''){
    return (new Error('time is undefiend'));
  }

  const timeArray = time.split(':'); 
  if (timeArray.length < 2){
    return (new Error('Invalid Time Format'));
  }
  if (isNaN(timeArray[0]) || isNaN(timeArray[1])){
    return (new Error('Invalid Time Format'));
  }
  if (timeArray[0] == '' || timeArray[1] == ''){
    return (new Error('Invalid Time Format'));
  }

  const hours   = parseInt(timeArray[0]);
  const minutes = parseInt(timeArray[1]); 
  const result  = minutes + (hours * 60); 
  return (result);

}

function getTimeInHours(minutes){
  return new Promise(function(resolve, reject){
    const notValidError = new Error('Not Valid Time');
    if (minutes == ''){
      reject(notValidError);
    }
    if (minutes  == undefined){
      reject(notValidError);
    }
    if (isNaN(minutes)){
      reject(notValidError);
    }

    resolve(Math.round((minutes / 60) * 10) / 10); 
  });
}


$(document).ready(function(){

  $('#button').on('click', function(event){
    const checkin  = $('#checkin').val(); 
    const checkout = $('#checkout').val(); 

    getWorkingHours(checkin, checkout)
      .then(console.log)
      .catch(console.error);

  });
});


