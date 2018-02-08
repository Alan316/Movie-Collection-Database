function RandomImage()
{
  var i = true;
  var random = Math.floor(Math.random()*8);
  var bigImage= 
    ["url('movie-background1.jpg')",
    "url('movie-background2.jpg')",
    "url('movie-background3.jpg')",
    "url('movie-background4.jpg')",
    "url('movie-background5.jpg')",
    "url('movie-background6.jpg')",
    "url('movie-background7.jpg')",
    "url('movie-background8.jpg')",];
  //Removed images for cell phone. No reason to Have Them. Grey is displayed in background now.
  var smallImage= 
    "";

  if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
    document.getElementById("random").style.backgroundImage=smallImage[random];
}
  else
    document.getElementById("random").style.backgroundImage=bigImage[random];
}