function getBathValue() {
  var uiBathrooms = document.getElementsByName("uiBathrooms");
  for(var i in uiBathrooms) {
    if(uiBathrooms[i].checked) {
        return parseInt(i)+1;
    }
  }
  return -1; // Invalid Value
}

function getBHKValue() {
  var uiBHK = document.getElementsByName("uiBHK");
  for(var i in uiBHK) {
    if(uiBHK[i].checked) {
        return parseInt(i)+1;
    }
  }
  return -1; // Invalid Value
}

function onClickedEstimatePrice() {
  console.log("Estimate price button clicked");
  var sqft = document.getElementById("uiSqft");
  var bhk = getBHKValue();
  var bathrooms = getBathValue();
  var location = document.getElementById("uiLocations");
  var estPrice = document.getElementById("uiEstimatedPrice");

  var url = "http://127.0.0.1:5000/predict_home_price"; //Use this if you are NOT using nginx which is first 7 tutorials
  //var url = "/api/predict_home_price"; // Use this if  you are using nginx. i.e tutorial 8 and onwards

  $.post(url, {
      total_sqft: parseFloat(sqft.value),
      bhk: bhk,
      bath: bathrooms,
      location: location.value
  },function(data, status) {
      const x = 5;
      const y = data.estimated_price + x;
      console.log(data.estimated_price);
      estPrice.innerHTML = "<h2>" + data.estimated_price.toString()+"-" + y + " Lakh</h2>";
      console.log(status);
  });
}


function onPageLoad() {
  console.log( "document loaded" );
  var url = "http://127.0.0.1:5000/get_location_names"; // Use this if you are NOT using nginx which is first 7 tutorials
  //var url = "/api/get_location_names"; // Use this if  you are using nginx. i.e tutorial 8 and onwards
  $.get(url,function(data, status) {
      console.log("got response for get_location_names request");
      if(data) {
          var locations = data.locations;
          var uiLocations = document.getElementById("uiLocations");
          $('#uiLocations').empty();
          for(var i in locations) {
              var opt = new Option(locations[i]);
              $('#uiLocations').append(opt);
          }
      }
  });
}

function showImages() {
  var block = document.getElementById('imageBlock');
  block.style.display = block.style.display === 'none' ? 'block' : 'none';
}


function changeImages(){
  const index = Math.floor(Math.random() * 22)
  fetch('images.txt')
      .then(response => response.text())
      .then(data => {
          const imagePaths = data.split('\n');
          document.getElementById('image1').src = imagePaths[0+index];
          document.getElementById('image2').src = imagePaths[5+index];
          document.getElementById('image3').src = imagePaths[10+index];
          document.getElementById('image4').src = imagePaths[15+index];
      });
}

function togglecomparison() {
  var popup = document.getElementById('comparison');
  popup.style.display = popup.style.display === 'none' ? 'block' : 'none';
}

function togglebankcomparison() {
  var popup = document.getElementById('Bank-comparison');
  popup.style.display = popup.style.display === 'none' ? 'block' : 'none';
  // const block = document.getElementById('photoBlockloan');
  // block.classList.toggle('hiddenloan');
}

function showDealers() {
  fetch('dealers.txt')
  .then(response => response.text())
  .then(data => {
      const dealers = data.split('\n');
      const dealerBlock = document.getElementById('dealerBlock');
      dealerBlock.innerHTML = '';
      dealerBlock.innerHTML += `<H2 style="text-align: centre;" ><u>Dealers Comparison</u></h2>`;
      dealerBlock.innerHTML += `<b><table><tr><td>Name</td><td>price (per sq.ft.)</td></tr><br></table><b>`;
     
      for (let i = 0; i < 4; i++) {
          const randomIndex = Math.floor(Math.random() * dealers.length);
          const [name, price] = dealers[randomIndex].split(',');
          // dealerBlock.innerHTML += `<p><strong>Name:</strong> ${name} - <strong>Price:</strong> ${price}</p>`;
          // dealerBlock.innerHTML = "<p>"+ name.toString() + price.toString()+"</p>"; 
          dealerBlock.innerHTML +=`<table> <tr><td>${name}</td><td>${price}</td></tr><br></table>`;
      }
      dealerBlock.innerHTML += '<span class="close" onclick="closeDealerInfo()">Close</span>';
      dealerBlock.style.display = 'block';
  });
 
}

function closeDealerInfo() {
  document.getElementById('dealerBlock').style.display = 'none';
}

function loactionvalue() {
  var x = document.getElementById("uiLocations").value;
  document.getElementById("locatioval").innerHTML = "<b>Loaction : " + x +"</b>";
}





function toggleNavbar() {
  var navbar = document.getElementById("navbar");
  if (navbar.style.display === "none") {
      navbar.style.display = "block";
  } else {
      navbar.style.display = "none";
  }
}









window.onload = onPageLoad;