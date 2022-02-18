// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyDOUIuwVz5ZLH6GRRqQKsnicsZcZzOyhxA",
    authDomain: "project-93-ba969.firebaseapp.com",
    databaseURL: "https://project-93-ba969-default-rtdb.firebaseio.com",
    projectId: "project-93-ba969",
    storageBucket: "project-93-ba969.appspot.com",
    messagingSenderId: "322958567838",
    appId: "1:322958567838:web:ef6a911b20e7351fff4e8f"
  };
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  //ADD YOUR FIREBASE LINKS HERE

user_name=localStorage.getItem("user_name");
room_name=localStorage.getItem("room_name");

function send() {

    msg=document.getElementById("msg").value;
    firebase.database().ref(room_name).push({
          name:user_name, 
          message:msg,
          like:0
    });
    document.getElementById("msg").value=" ";
}

function getData() { firebase.database().ref("/"+room_name).on('value', function(snapshot) { document.getElementById("output").innerHTML = ""; snapshot.forEach(function(childSnapshot) { childKey  = childSnapshot.key; childData = childSnapshot.val(); if(childKey != "purpose") {
       firebase_message_id = childKey;
       message_data = childData;
//Start code

console.log(firebase_message_id);
         console.log(message_data);
         name=message_data['name'];
         message=message_data['message'];
         like=message_data['like'];
         name_with_tag="<h4>"+name+"<img class='user_tick' src='tick.png'></h4>";
         message_with_tag="<h4 class='message_h4'>"+message+"</h4>";
         like_button="<button class='btn btn-warning' id="+firebase_message_id+" value="+like+" onclick='updateLike(this.id)'>";
         span_with_tag="<span class='glyphicon glyphicon-thumbs-up'>like: "+like+"</span></button><hr>";
         row=name_with_tag+message_with_tag+like_button+span_with_tag;
         document.getElementById("output").innerHTML+=row;
//End code
    } });  }); }
getData();

function updateLike(message_id) {

    console.log("clicked_on_like_button"+message_id);
    button_id=message_id;
    likes=document.getElementById(button_id).value;
    update_likes=Number(likes) + 1;
    firebase.database().ref(room_name).child(message_id).update({
          like : update_likes
    });
} 
function logout() {

    localStorage.removeItem("user_name");
    localStorage.removeItem("room_name");
    window.location.replace("chatter.html");
}