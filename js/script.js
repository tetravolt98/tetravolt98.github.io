 $(document).ready(function() {

 // elements
 var navbar = $(".navbar");
 var footer = $(".footer");
 var footer_main = $(".footer-main");
 var btn_explore = $(".btn-explore");
 var image_text = $(".image-text");
 var gallery = $(".gallery img");
 var left_arrow = $(".ion-chevron-left");
 var right_arrow = $(".ion-chevron-right");
 var img_hide_nav = $(".img-hide-nav");
 var connect_4_modal = $(".connect-4-modal");
 var petly_modal = $(".petly-modal");
 var online_store_modal = $(".online-store-modal")
 var others_modal = $(".others-modal");
 var send_msg_modal = $(".send-msg-modal");
 var modal_title = $("h4.modal-title");
 var modal_body = $("div.modal-body p");
 var navbar_item = $(".navbar-item");
 var btn_send = $(".btn-send");
 var btn_upload = $(".btn-upload");

 /** FIREBASE */

 // Initialize Firebase for TA
 var config = {
  apiKey: "AIzaSyBdD3C9TyD0RNyrUSwoMmJ-DMlaFA5DUJc",
  authDomain: "tafilesdatabase.firebaseapp.com",
  databaseURL: "https://tafilesdatabase.firebaseio.com",
  projectId: "tafilesdatabase",
  storageBucket: "",
  messagingSenderId: "171347798752"
 };
 firebase.initializeApp(config);
 // database
 var database = firebase.database();


 // when I want to add a file to the database, get the file from the computer
 var file_full;
 // file input for ta
 $('#fileinput').change(function(event) {
  file_full = "ta_files/" + this.files[0].name;
  $('#which-file-chosen').animate({
   opacity: 1
  });
  $('#which-file-chosen').text(file_full.substring(9));
  console.log(file_full);
 });

 var radio;
 var tut_num;
 // figure out which radio button they selected for the week number
 $('#radio_forms input').on('change', function() {
  radio = $('input:radio[name=optradio]:checked')["0"].labels["0"].innerText;
  console.log(radio);
  tut_num = "tut" + radio[radio.length - 1];
  if (tut_num == "tut0") {
      tut_num = "tut" + (Number(tut_num[3])+10).toString();
  }
  console.log("tut num is " + tut_num);
 });

 // onclick for when I want to post TA notes to the server
 $('.btn-post-ta-notes').click(function() {
  // write the data by calling the function
  writeUserData(tut_num, file_full);
  console.log("posted");
  // refresh the page
  setTimeout(location.reload.bind(location), 120);
 });

 // function to write the link name to the server
 function writeUserData(week_num, link) {
  firebase.database().ref('csca08_tut/' + week_num).set({
   link: link
  });
 }

 // read all the tutorials from database
 for (i = 1; i < 12; i++) {
  var string = "tut";
  var total = string + i.toString();
  // call the readDB function   
  readDB(total);
 }

 // read from online database
 function readDB(name) {
  // get the reference
  var starCountRef = firebase.database().ref('csca08_tut/' + name);
  starCountRef.on('value', function(snapshot) {
   // if there is a value
   if (snapshot.val() != null) {
    console.log(snapshot.val());
    // add tutorial notes to TA section
    addToList(name, snapshot.val().link);
   }
  });
 }

 // create div element and add it to the DOM
 function addToList(name, linkVal) {
  console.log(name + linkVal);
  $(".ta-files").append("<div class=col-md-4><a href=" + "'" + linkVal + "'" + ">" + name + "</a></div>");
  console.log("<div class=col-md-4><a href=" + "'" + linkVal + "'" + ">" + name + "</a></div>");
 }

 /**********/

 // slideshow
 var image_data = {
  "css/img/prom-photo.jpg": "background text",
  "css/img/bunnies-photo.jpg": "face text",
  "css/img/trampoline-photo.jpg": "fjord text"
 };


 // if first time visit website, show home screen animation, else show different loading animation
 if (!sessionStorage.getItem('hasVisited')) {
  $(".fade-in-first").addClass("animated fadeInUp");
  setTimeout(function() {
   $(".fade-in-second").animate({
    opacity: 1
   });
   $(".btn-explore").addClass("pulse-anim");
  }, 1300);

  sessionStorage.setItem('hasVisited', true);
 } else {
  setTimeout(function() {
   $(".fade-in-second").animate({
    opacity: 1
   });
   $(".btn-explore").addClass("pulse-anim");
  }, 0);

 }

     /*
 // everytime the screen size changes, call this function
 window.onresize = setProperHeight;

 // this function will set the height accordingly
 function setProperHeight() {
  var width = $(window).width();
  console.log(width);
  // if width > 1360, set the sections heights accordingly so they fit the screen
  if (width > 1360) {
   console.log("will now remove class")
   $(".about").animate({
    height: '100vh'
   }, 0);
   $(".hobbies").animate({
    height: '100vh'
   }, 0);
   $(".ta").animate({
    height: '100vh'
   }, 0);
   $(".contact").animate({
    height: '100vh'
   }, 0);
  }
  // otherwise, the heights of the sections are auto (default)
  else if (width <= 1360) {
   $(".about").animate({
    height: 'auto'
   }, 0);
   $(".hobbies").animate({
    height: 'auto'
   }, 0);
   $(".ta").animate({
    height: 'auto'
   }, 0);
   $(".contact").animate({
    height: 'auto'
   }, 0);
  }
  // finally refresh the page
  //location.reload();
 };
*/
 /**** NAVBAR PROPERTIES ****/
 // if we are on the main page (index.html), hide the navbar and footer until we press the explore button
 if ($('body').is('.main-page')) {
  navbar.hide();
  footer_main.hide();
 };

 // navbar slide up and down after we open/close modals
 $('.navbar-collapse ul li a').click(function() {
  $('.navbar-toggle:visible').click();
 });
 img_hide_nav.click(function() {
  navbar.slideUp();

 });

 // whenever a modal is closed, I want to slide the navbar down
 $(".btn-close-modal").click(function() {
  navbar.slideDown();
 })


 /**** SMOOTH SCROLL ****/
 $('a[href*="#"]:not([href="#"])').click(function() {
  if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
   var target = $(this.hash);
   target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
   if (target.length) {
    $('html, body').animate({
     scrollTop: target.offset().top
    }, 500);
    return false;
   }
  }
 });



 /* slideshow - currently not implemented
 var slideIndex = 1;
 showDivs(slideIndex);

 function plusDivs(n) {
     showDivs(slideIndex += n);
 }*/
 /*
    function showDivs(n) {
        //console.log("in the func");
        var i;
        var x = $(".mySlides");
        if (n > x.length) {
            slideIndex = 1
        }
        if (n < 1) {
            slideIndex = x.length
        }
        for (i = 0; i < x.length; i++) {
            x[i].style.display = "none";
        }
        x[slideIndex - 1].style.display = "block";
    }

	*/

 /**** BUTTONS ****/

 // when I click the explore button, then I want the navbar and footer visible
 btn_explore.click(function() {
  console.log(window.location.pathname);
  navbar.slideDown(500);
  footer_main.slideDown(500);
 });

 // MODALS CLICK
 
 online_store_modal.click(function () {
  modal_title.text("Online Store");
  modal_body.html("Online Store is an android app.<br>")
 })
 // text for connect 4 project modal
 connect_4_modal.click(function() {
  modal_title.text("Connect 4");
  modal_body.html("Connect 4 was a group project my friend Vinit and I did in grade 12, as part of our final assigment. It is a Java based, GUI application that is essentially connect 4 as you would play in real life. <br><hr> The neat aspect of our project is that it features single player mode as well as 2P, and in single player mode, our computer AI actually tied/won most of the matches it played against humans. It has a pretty smart system integration. <br> This project was really fun to make and really required all the aspect of computer science to program, such as: OOP, searching, sorting, algorithm, etc. <br><hr> Here is a link if you wish to download it: <br>  <a target=_blank href=https://github.com/dharm1k987/dharmik_vinit_connect4_repo>Connect 4</a>");

 });

 // text for petly project modal
 petly_modal.click(function() {

  modal_title.text("Petly");
  modal_body.html("Petly was a immense project a group of grade 12 students did for the city of Toronto. It was an android application, and it's goal was to connect pet owners in Toronto. It offered many features, such as adding friends, posting updates, searching for parks, meeting new people, creating reminders, and many more. <br> <hr> This project was projected to the city of Toronto who praised it, and my team am I really learned alot from this project. In addition to Android programming, we had to use version control, graphic designing, and many external resources to deliver a finished project. <br><hr> Here is a link if you wish to download it: <br> <a target=_blank href=https://github.com/cybervinit/Petly_final>Petly </a>");

 });

 // text for other projects modal
 others_modal.click(function() {

  modal_title.text("Others");
  modal_body.html("This website is one of my big projects. After I learned the basics of HTML, CSS, JS, I decided to implement them into something I can show to other people, this website. This website was fully created based on online teachings, and that really shows that you can just learn about anything, without having to pay for it. <br> <hr> I watched some basic videos, and starting creating my brand new website, and was always eager to learn more about web development. <br><hr> Please tell me how you thought of my website in the contact section below.");

 });


 // CONTACT FORM SECTION
 // text to show when someone tries to send a message through the contact form
 send_msg_modal.click(function() {

  modal_title.text("Please email me directly");
  modal_body.html("Your text has been copied. Please email me directly at dharmik.shah@mail.utoronto.ca.  Thank you for your message!");
 });

 // change the color when the user clicks an input area
 $("input, textarea").focus(function() {

  $(this).css({
   "background-color": "#eaeaea"
  });
 });

 $("input, textarea").blur(function() {

  $(this).css({
   "background-color": "#ffffff"

  });

 });


 // copy the message the user typed into the contact us box
 var copyTextarea = document.getElementById("message");
 copyTextarea.select();

 try {
  // if we successfully copied, log it, else error
  var successful = document.execCommand('copy');
  var msg = successful ? 'successful' : 'unsuccessful';
  console.log('Copying text command was ' + msg);
 } catch (err) {
  console.log('Oops, unable to copy');
 }
 });