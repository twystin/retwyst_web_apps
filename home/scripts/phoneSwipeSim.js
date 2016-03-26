jQuery(function($){
  var image1 = $('#slide1');
  var image2 = $('#slide2');
  var image3 = $('#slide3');
  var timer = 0;
  setInterval(function(){
    timer++;
    if(timer % 3 === 0) {
      timer = 0;
    }
    if(timer === 0) {
      image1.css("display","block");
      image2.css("display","none");
      image3.css("display","none");
    } else if (timer === 2) {
      image1.css("display","none");
      image2.css("display","block");
      image3.css("display","none");
    } else if (timer === 3) {
      image1.css("display","none");
      image2.css("display","none");
      image3.css("display","block");
    }
  },3000);
});
