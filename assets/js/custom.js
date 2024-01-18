// next prev
var divs = $('.show-section .steps');
var now = 1; // currently shown div
divs.hide().first().show(); // hide all divs except first

function next()
{
    divs.eq(now).hide();
    now = (now + 1 < divs.length) ? now + 1 : 0;
    divs.eq(now).show(); // show next
}

$(".prev").click(function() {
    divs.eq(now).hide();
    now = (now > 0) ? now - 1 : divs.length - 1;
    divs.eq(now).show(); // show previous
});




// show file name and upload
    $(".file").on('change', function(e){
        // alert("file is selected");
        var filename = e.target.files[0].name;
        $(".upload-field label span").text(filename);
         $(".upload-field label").addClass("to-right");
    });


        
//show thankyou page

// $(document).ready(function(){
//     $('.submit').click(function()
//     {
//         $(this).closest('.thankyou-page').addClass('show-thankyou');
//     })
// })

var change = document.getElementById("move");
var section1 = document.getElementById("section-1");
var section2 = document.getElementById("section-2");

change.onchange = function()
{
    section1.style.display = "none";
    section2.style.display = "block";
}




// disable on enter
$('form').on('keyup keypress', function(e) {
    var keyCode = e.keyCode || e.which;
    if (keyCode === 13) { 
      e.preventDefault();
      return false;
    }
  });
  
  
  
  
// form validiation
var inputschecked = false;


function formvalidate(stepnumber)
{
  // check if the required fields are empty
  inputvalue = $("#step"+stepnumber+" :input").not("button").map(function()
  {
    if(this.value.length > 0)
    {
      $(this).removeClass('invalid');
      return true;

    }
    else
    {
      
      if($(this).prop('required'))
      {
        $(this).addClass('invalid');
        return false
      }
      else
      {
        return true;
      }
      
    }
  }).get();
  

  // console.log(inputvalue);

  inputschecked = inputvalue.every(Boolean);

  // console.log(inputschecked);
}



var inputschecked = false;

  $(document).ready(function()
   {

        //number validiation
        var numbers = /^[0-9]+$/;
        //email validiation




        // check step2
    $("#step2btn").on('click', function()
    {
        formvalidate(2);

        var re = /^\w+([-+.'][^\s]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
        var email = $("#mail-email").val();
        var emailFormat = re.test(email);
        

        if(inputschecked == false)
        {
          formvalidate(2);
        }

        else if(emailFormat == false)
        {
          (function (el) {
            setTimeout(function () {
                el.children().remove('.reveal');
            }, 3000);
          }($('#error').append('<div class="reveal alert alert-danger">Email address is invalid!</div>')));
          if(emailFormat == true)
          {
            $("#mail-email").removeClass('invalid');
          }
          else
          {
            $("#mail-email").addClass('invalid');
          }

        }
        else
        {
            next();
        }
    })

    // check last step

    $("#sub").on('click' , function()
    {

        formvalidate(3);

        if(inputschecked == false)
        {
        formvalidate(3);
        }
        
        else
        {
            $("#sub").html("<img src='assets/images/loading.gif'>");

            

            var dataString = new FormData(document.getElementById("steps"));


            console.log(dataString);

            
            // send form to send.php
            $.ajax({
                        type: "POST",
                        url: "form handling/send.php",
                        data: dataString,
                        processData: false,
                        contentType: false,
                        cache: false,
                        success: function(data,status)
                        {

                        $("#sub").html("Success!");
                        console.log(data);
                        
                        window.location = "thankyou.html";
                        
                        },
                        error: function(data, status)
                        {
                        $("#sub").html("failed!");
                        console.log(data);
                        }
                    });
        }

    });
   }
   );