	



// request({
//       method: "POST",
//       uri: "https://www.googleapis.com/gmail/v1/users/me/messages/send",
//       headers: {
//         "Authorization": "Bearer 'access_token'",
//         "Content-Type": "application/json"
//       },
//       body: JSON.stringify({
//         "raw": encodedMail
//       })
//     },
//     function(err, response, body) {
//       if(err){
//         console.log(err); // Failure
//       } else {
//         console.log(body); // Success!
//       }
//     });