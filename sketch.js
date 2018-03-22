var osc, fft, amp, freq, envelope; 

var zipcode = 0;

var objZip = {};

var zipCache = [];

var yearZip = [];

var dataCache = [];

var twentyTen = [];
var twentyEle = [];
var twentyTwe = [];
var twentyThi = [];
var twentyFou = [];
var twentyFif = [];
var twentySix = [];
var twentySev = [];
var twentyEig = [];

var responseArray = [];

var masterAmp = 0;

var partyValue = 0;
var constructionValue = 0;
var barkValue = 0;
var bangValue = 0;
var otherValue = 0;
var talkValue = 0;
var partyValue2010 = 0;
var constructionValue2010 = 0;
var barkValue2010 = 0;
var bangValue2010 = 0;
var otherValue2010 = 0;
var talkValue2010 = 0;
var partyValue2011 = 0;
var constructionValue2011 = 0;
var barkValue2011 = 0;
var bangValue2011 = 0;
var otherValue2011 = 0;
var talkValue2011 = 0;
var partyValue2012 = 0;
var constructionValue2012 = 0;
var barkValue2012 = 0;
var bangValue2012 = 0;
var otherValue2012 = 0;
var talkValue2012 = 0;
var partyValue2013 = 0;
var constructionValue2013 = 0;
var barkValue2013 = 0;
var bangValue2013 = 0;
var otherValue2013 = 0;
var talkValue2013 = 0;
var partyValue2014 = 0;
var constructionValue2014 = 0;
var barkValue2014 = 0;
var bangValue2014 = 0;
var otherValue2014 = 0;
var talkValue2014 = 0;
var partyValue2015 = 0;
var constructionValue2015 = 0;
var barkValue2015 = 0;
var bangValue2015 = 0;
var otherValue2015 = 0;
var talkValue2015 = 0;
var partyValue2016 = 0;
var constructionValue2016 = 0;
var barkValue2016 = 0;
var bangValue2016 = 0;
var otherValue2016 = 0;
var talkValue2016 = 0;
var partyValue2017 = 0;
var constructionValue2017 = 0;
var barkValue2017 = 0;
var bangValue2017 = 0;
var otherValue2017 = 0;
var talkValue2017 = 0;
var partyValue2018 = 0;
var constructionValue2018 = 0;
var barkValue2018 = 0;
var bangValue2018 = 0;
var otherValue2018 = 0;
var talkValue2018 = 0;
var toggleWave = 1;
var loading = 0;
var place = 0;
var lastFeatureId;
var beginTime;
var subsubSort;

var sortArray = [];
var subsubSort2010, subsubSort2011, subsubSort2012, subsubSort2013, subsubSort2014, subsubSort2015, subsubSort2016, subsubSort2017, subsubSort2018, subsubSort2019;

var scaleArray = [twentyTen.length, twentyTwe.length, twentyThi.length, twentyFou.length, twentyFif.length, twentySix.length, twentySev.length, twentyEig.length];
var note = 0;


function allZero(){
  var partyValue = 0;
var constructionValue = 0;
var barkValue = 0;
var bangValue = 0;
var otherValue = 0;
var talkValue = 0;
var partyValue2010 = 0;
var constructionValue2010 = 0;
var barkValue2010 = 0;
var bangValue2010 = 0;
var otherValue2010 = 0;
var talkValue2010 = 0;
var partyValue2011 = 0;
var constructionValue2011 = 0;
var barkValue2011 = 0;
var bangValue2011 = 0;
var otherValue2011 = 0;
var talkValue2011 = 0;
var partyValue2012 = 0;
var constructionValue2012 = 0;
var barkValue2012 = 0;
var bangValue2012 = 0;
var otherValue2012 = 0;
var talkValue2012 = 0;
var partyValue2013 = 0;
var constructionValue2013 = 0;
var barkValue2013 = 0;
var bangValue2013 = 0;
var otherValue2013 = 0;
var talkValue2013 = 0;
var partyValue2014 = 0;
var constructionValue2014 = 0;
var barkValue2014 = 0;
var bangValue2014 = 0;
var otherValue2014 = 0;
var talkValue2014 = 0;
var partyValue2015 = 0;
var constructionValue2015 = 0;
var barkValue2015 = 0;
var bangValue2015 = 0;
var otherValue2015 = 0;
var talkValue2015 = 0;
var partyValue2016 = 0;
var constructionValue2016 = 0;
var barkValue2016 = 0;
var bangValue2016 = 0;
var otherValue2016 = 0;
var talkValue2016 = 0;
var partyValue2017 = 0;
var constructionValue2017 = 0;
var barkValue2017 = 0;
var bangValue2017 = 0;
var otherValue2017 = 0;
var talkValue2017 = 0;
var partyValue2018 = 0;
var constructionValue2018 = 0;
var barkValue2018 = 0;
var bangValue2018 = 0;
var otherValue2018 = 0;
var talkValue2018 = 0;
}

function lerpAll(){

partyValue = lerp(partyValue,0,.05);
constructionValue = lerp(constructionValue,0,.05);
barkValue = lerp(barkValue,0,.05);
bangValue = lerp(bangValue,0,.05);
otherValue = lerp(otherValue,0,.05);
talkValue = lerp(talkValue,0,.05);
partyValue2010 = lerp(partyValue2010,0,.05);
constructionValue2010 = lerp(constructionValue2010,0,.05);
barkValue2010 = lerp(barkValue2010,0,.05);
bangValue2010 = lerp(bangValue2010,0,.05);
otherValue2010 = lerp(otherValue2010,0,.05);
talkValue2010 = lerp(talkValue2010,0,.05);
partyValue2011 = lerp(partyValue2011,0,.05);
constructionValue2011 = lerp(constructionValue2011,0,.05);
barkValue2011 = lerp(barkValue2011,0,.05);
bangValue2011 = lerp(bangValue2011,0,.05);
otherValue2011 = lerp(otherValue2011,0,.05);
talkValue2011 = lerp(talkValue2011,0,.05);
partyValue2012 = lerp(partyValue2012,0,.05);
constructionValue2012 = lerp(constructionValue2012,0,.05);
barkValue2012 = lerp(barkValue2012,0,.05);
bangValue2012 = lerp(bangValue2012,0,.05);
otherValue2012 = lerp(otherValue2012,0,.05);
talkValue2012 = lerp(talkValue2012,0,.05);
partyValue2013 = lerp(partyValue2013,0,.05);
constructionValue2013 = lerp(constructionValue2013,0,.05);
barkValue2013 = lerp(barkValue2013,0,.05);
bangValue2013 = lerp(bangValue2013,0,.05);
otherValue2013 = lerp(otherValue2013,0,.05);
talkValue2013 = lerp(talkValue2013,0,.05);
partyValue2014 = lerp(partyValue2014,0,.05);
constructionValue2014 = lerp(constructionValue2014,0,.05);
barkValue2014 = lerp(barkValue2014,0,.05);
bangValue2014 = lerp(bangValue2014,0,.05);
otherValue2014 = lerp(otherValue2014,0,.05);
talkValue2014 = lerp(talkValue2014,0,.05);
partyValue2015 = lerp(partyValue2015,0,.05);
constructionValue2015 = lerp(constructionValue2015,0,.05);
barkValue2015 = lerp(barkValue2015,0,.05);
bangValue2015 = lerp(bangValue2015,0,.05);
otherValue2015 = lerp(otherValue2015,0,.05);
talkValue2015 = lerp(talkValue2015,0,.05);
partyValue2016 = lerp(partyValue2016,0,.05);
constructionValue2016 = lerp(constructionValue2016,0,.05);
barkValue2016 = lerp(barkValue2016,0,.05);
bangValue2016 = lerp(bangValue2016,0,.05);
otherValue2016 = lerp(otherValue2016,0,.05);
talkValue2016 = lerp(talkValue2016,0,.05);
partyValue2017 = lerp(partyValue2017,0,.05);
constructionValue2017 = lerp(constructionValue2017,0,.05);
barkValue2017 = lerp(barkValue2017,0,.05);
bangValue2017 = lerp(bangValue2017,0,.05);
otherValue2017 = lerp(otherValue2017,0,.05);
talkValue2017 = lerp(talkValue2017,0,.05);
partyValue2018 = lerp(partyValue2018, 0,.05);
constructionValue2018 = lerp(constructionValue2018,0,.05);
barkValue2018 = lerp(barkValue2018,0,.05);
bangValue2018 = lerp(bangValue2018,0,.05);
otherValue2018 = lerp(otherValue2018,0,.05);
talkValue2018 = lerp(talkValue2018,0,.05);
 masterAmp = lerp(1,0,.05);
};

   function buttonFunction() {
    if (toggleWave == 0){
    toggleWave = 1;
   } else{
    toggleWave = 0;
   }};

function preload() {
   mapboxgl.accessToken = 'pk.eyJ1IjoiZXVmb3VyaWEiLCJhIjoiY2phdXJlYWppMDRzNjM3bzFzZmttdnIweSJ9.n_uzHxpGaFsahacYZjV5Eg';
   // Set bounds to New York, New York

   var bounds = [
    [-74.34728500751165, 40.49392799015035], // Southwest coordinates
    [-73.41058699000139, 40.937764500765852]  // Northeast coordinates
   ];


   var myMap = new mapboxgl.Map({
     container: 'myMap', // container id
     style: 'mapbox://styles/eufouria/cjazn7t6v2nle2spg571gb90r',
     maxBounds: bounds, // Sets bounds as max
     maxZoom: 14,
     minZoom: 10,
     center: [-73.84728500751165, 40.70392799015035],
     zoom: 10,
   });

   myMap.on('load', function() {
     var layers = ['1: All Noise Complaints', '2: Loud Music/Party', '3: Banging/Pounding', '4: Loud Talking', '5: Construction', '6: Barking Dog'];
     var colors = ['#33a3ff'];

     myMap.addSource('zip-data',{
       'type': 'vector', 'url': 'mapbox://eufouria.b9odokkr'
     });

     myMap.addLayer({
       "id": "state-fills",
       "type": "fill",
       "source": "composite",
       "source-layer": "ZIP_CODE_040114-3jzbnj",
       "layout": {},
       "paint": {
          "fill-color": "#627BC1",
          "fill-opacity": 0.0
       }
     });

     myMap.addLayer({
       "id": "state-borders",
       "type": "line",
       "source": "composite",
       "source-layer": "ZIP_CODE_040114-3jzbnj",
       "layout": {},
       "paint": {
         "line-color": "#FFF",
         "line-width": 0
       }
     });

     myMap.addLayer({
       "id": "state-fills-hover",
       "type": "fill",
       "source": "composite",
       "source-layer": "ZIP_CODE_040114-3jzbnj",
       "layout": {},
       "paint": {
         "fill-color": "#3d3d3d",
         "fill-opacity": 1
       },
       "filter": ["==", "ZIPCODE", ""]
     });

   //hover to show zip code and generate tone
   myMap.on('click', function(e) {
                   masterAmp = 1;

     var hoverzip = myMap.queryRenderedFeatures(e.point, {layers: ["zip-data"]});
     //keeps hover from running endlessly
     if (hoverzip.length > 0) {
       myMap.setFilter("state-fills-hover", ["==", "ZIPCODE", hoverzip[0].properties.ZIPCODE]);
     



         zipcode = hoverzip[0].properties.ZIPCODE;
         // if (!(zipcode in objZip)){     
          console.log("ready")
           document.getElementById('pd').innerHTML = '<left><h3><strong>Loading</strong></h3></left><p><strong><em>';
         lerpAll();
         loading = 1;
         place = windowHeight*-2;

           $.ajax({
             url:"https://data.cityofnewyork.us/resource/fhrw-4uyv.json?$where=complaint_type LIKE 'Noise' AND incident_zip='"+zipcode+"' OR complaint_type LIKE 'Noise - Residential' AND incident_zip='"+zipcode+"'OR complaint_type LIKE 'Noise - Commercial' AND incident_zip='"+zipcode+"'OR complaint_type LIKE 'Noise - Street/Sidewalk' AND incident_zip='"+zipcode+"'",
             type: "GET",
             data: {
               "$limit" : 300000,
               "$$app_token" : "DFqRvJbV28kb8DtqCAuyKwXW8"
             }                   
           }).done(function(data) {
            console.log("done")
                   document.getElementById('pd').innerHTML = '<left><h3><strong>' + hoverzip[0].properties.ZIPCODE + '</strong></h3></left><p><strong><em>';
                  loading = 0;

               for (var h = 0; h < data.length; h++) {
                 data[h].year = data[h].created_date.substr(0,4);

                 zipcode = data[h].incident_zip;
                
                 if (_.includes(data[h].descriptor, 'Party')) {
                   data[h].complaintCode = "Party"
                 } else
                 if (_.includes(data[h].descriptor, 'Banging')) {
                   data[h].complaintCode = "Banging"
                 } else 
                 if (_.includes(data[h].descriptor, 'Talking')) {
                   data[h].complaintCode = "Talking"
                 } else
                 if (_.includes(data[h].descriptor, 'Construction')) {
                   data[h].complaintCode = "Construction"
                 } else 
                 if (_.includes(data[h].descriptor, 'Barking')) {
                   data[h].complaintCode = "Barking"
                 };
               };               
          
           yearSorted = _.groupBy(data, "year");
           typeSorted = _.groupBy(data, "complaintCode");
           var key = zipcode;
           objZip[key] = typeSorted;
           yearZip[key] = yearSorted;
           var subSort = $.each(yearSorted, function(key, value){
            if (key==2010) {
       subsubSort2010=_.groupBy(value, "complaintCode")
     }
     if (key==2011) {
       subsubSort2011=_.groupBy(value, "complaintCode")
     }if (key==2012) {
       subsubSort2012=_.groupBy(value, "complaintCode")
     }if (key==2013) {
       subsubSort2013=_.groupBy(value, "complaintCode")
     }if (key==2014) {
       subsubSort2014=_.groupBy(value, "complaintCode")
     }if (key==2015) {
       subsubSort2015=_.groupBy(value, "complaintCode")
     }if (key==2016) {
       subsubSort2016=_.groupBy(value, "complaintCode")
     }if (key==2017) {
       subsubSort2017=_.groupBy(value, "complaintCode")
     }if (key==2018) {
       subsubSort2018=_.groupBy(value, "complaintCode")
     }if (key==2019) {
       subsubSort2019=_.groupBy(value, "complaintCode")
     }
 })

         console.log(subsubSort2010);
         console.log(subsubSort2014);
         console.log(subsubSort2017);

           // console.log(objZip);
           return zipcode;
           // console.log(responseArray);

           });
      
       
     // }
                        // document.getElementById('pd').innerHTML = '<left><h3><strong>' + hoverzip[0].properties.ZIPCODE + '</strong></h3></left><p><strong><em>';

     } else {
       myMap.setFilter("state-fills-hover", ["==", "ZIPCODE", ""]);
     lastFeatureId = 0;
     zipcode = 0;
     masterAmp = 0;
     document.getElementById('pd').innerHTML = '<p1>Click on a zipcode</p1>';
     loading = 0;
     lerpAll();
       };
   });


   myMap.getCanvas().style.cursor = 'default';

   });
}

  
function setup() {

   createCanvas(window.innerWidth,window.innerHeight);

   place = windowHeight*-2


   oscParty = new p5.SinOsc(); // set frequency and type
   oscBang = new p5.SinOsc();
   oscTalk = new p5.SinOsc();
   oscConst = new p5.SinOsc();
   oscBark = new p5.SinOsc();
   oscOther = new p5.SinOsc();
   oscParty.start();
   oscBang.start();
   oscTalk.start();
   oscConst.start();
   oscBark.start();
   oscOther.start();
   oscParty.amp(0);
   oscBang.amp(0);
   oscTalk.amp(0);
   oscConst.amp(0);
   oscBark.amp(0);
   oscOther.amp(0);

   fft = new p5.FFT();

   oscParty.freq(261.63);
   oscBang.freq(329.63);
   oscTalk.freq(392.00);
   oscConst.freq(493.88);
   oscBark.freq(523.25);
   oscOther.freq(659.25)
};

function keyPressed() {
  if (keyCode === 87) {
     buttonFunction();
  } }

function draw() {

   background(255);

 fill('black')







   var ampParty = map(partyValue, 0, 27000, 0,1)
   var ampBang = map(bangValue, 0, 27000, 0,1)
   var ampTalk = map(talkValue, 0, 27000, 0,1)
   var ampConst = map(constructionValue, 0, 27000, 0,1)
   var ampBark = map(barkValue, 0, 27000, 0,1)
   var ampOther = map(otherValue,0,27000, 0,1)


   if (masterAmp == 0) {
     oscParty.amp(0);
     oscBang.amp(0);
     oscTalk.amp(0);
     oscConst.amp(0);
     oscBark.amp(0);
     oscOther.amp(0);
   } else {


   if (zipcode > 0) {
    masterAmp = 1;
     zipKey = zipcode
     yearCache = yearZip[zipKey];
         zipCache = objZip[zipKey];

 // for (var yea = 2009; yea < 2020; yea++) {
 //   console.log(yearCache)
 // }
var toBe = $.each(zipCache, function(key, value){
         // console.log(key + " : " +value.length);
         if (key == "Party"){
           partyValue = value.length;
         } else 
         if (key == "Banging") {
           bangValue = value.length;
                     
         } else 
         if (key == "Talking") {
           talkValue = value.length;
                   
         } else
         if (key == "Construction") {
           constructionValue = value.length;
                    
         } else
         if (key == "Barking") {
           barkValue = value.length;
                    
         } else {
         otherValue = value.length;
                 
         };
     })

     var toBe = $.each(subsubSort2010, function(key, value){
         // console.log(key + " : " +value.length);
         if (key == "Party"){
           partyValue2010 = value.length;
         } else 
         if (key == "Banging") {
           bangValue2010 = value.length;
                     
         } else 
         if (key == "Talking") {
           talkValue2010 = value.length;
                   
         } else
         if (key == "Construction") {
           constructionValue2010 = value.length;
                    
         } else
         if (key == "Barking") {
           barkValue2010 = value.length;
                    
         } else {
         otherValue2010 = value.length;
                 
         };
     })
     var toBe = $.each(subsubSort2011, function(key, value){
         // console.log(key + " : " +value.length);
         if (key == "Party"){
           partyValue2011 = value.length;
         } else 
         if (key == "Banging") {
           bangValue2011 = value.length;
                     
         } else 
         if (key == "Talking") {
           talkValue2011 = value.length;
                   
         } else
         if (key == "Construction") {
           constructionValue2011 = value.length;
                    
         } else
         if (key == "Barking") {
           barkValue2011 = value.length;
                    
         } else {
         otherValue2011 = value.length;
                 
         };
     })
     var toBe = $.each(subsubSort2012, function(key, value){
         // console.log(key + " : " +value.length);
         if (key == "Party"){
           partyValue2012 = value.length;
         } else 
         if (key == "Banging") {
           bangValue2012 = value.length;
                     
         } else 
         if (key == "Talking") {
           talkValue2012 = value.length;
                   
         } else
         if (key == "Construction") {
           constructionValue2012 = value.length;
                    
         } else
         if (key == "Barking") {
           barkValue2012 = value.length;
                    
         } else {
         otherValue2012 = value.length;
                 
         };
     })
     var toBe = $.each(subsubSort2013, function(key, value){
         // console.log(key + " : " +value.length);
         if (key == "Party"){
           partyValue2013 = value.length;
         } else 
         if (key == "Banging") {
           bangValue2013 = value.length;
                     
         } else 
         if (key == "Talking") {
           talkValue2013 = value.length;
                   
         } else
         if (key == "Construction") {
           constructionValue2013 = value.length;
                    
         } else
         if (key == "Barking") {
           barkValue2013 = value.length;
                    
         } else {
         otherValue2013 = value.length;
                 
         };
     })
     var toBe = $.each(subsubSort2014, function(key, value){
         // console.log(key + " : " +value.length);
         if (key == "Party"){
           partyValue2014 = value.length;
         } else 
         if (key == "Banging") {
           bangValue2014 = value.length;
                     
         } else 
         if (key == "Talking") {
           talkValue2014 = value.length;
                   
         } else
         if (key == "Construction") {
           constructionValue2014 = value.length;
                    
         } else
         if (key == "Barking") {
           barkValue2014 = value.length;
                    
         } else {
         otherValue2014 = value.length;
                 
         };
     })
     var toBe = $.each(subsubSort2015, function(key, value){
         // console.log(key + " : " +value.length);
         if (key == "Party"){
           partyValue2015 = value.length;
         } else 
         if (key == "Banging") {
           bangValue2015 = value.length;
                     
         } else 
         if (key == "Talking") {
           talkValue2015 = value.length;
                   
         } else
         if (key == "Construction") {
           constructionValue2015 = value.length;
                    
         } else
         if (key == "Barking") {
           barkValue2015 = value.length;
                    
         } else {
         otherValue2015 = value.length;
                 
         };
     })
     var toBe = $.each(subsubSort2016, function(key, value){
         // console.log(key + " : " +value.length);
         if (key == "Party"){
           partyValue2016 = value.length;
         } else 
         if (key == "Banging") {
           bangValue2016 = value.length;
                     
         } else 
         if (key == "Talking") {
           talkValue2016 = value.length;
                   
         } else
         if (key == "Construction") {
           constructionValue2016 = value.length;
                    
         } else
         if (key == "Barking") {
           barkValue2016 = value.length;
                    
         } else {
         otherValue2016 = value.length;
                 
         };
     })
     var toBe = $.each(subsubSort2017, function(key, value){
         // console.log(key + " : " +value.length);
         if (key == "Party"){
           partyValue2017 = value.length;
         } else 
         if (key == "Banging") {
           bangValue2017 = value.length;
                     
         } else 
         if (key == "Talking") {
           talkValue2017 = value.length;
                   
         } else
         if (key == "Construction") {
           constructionValue2017 = value.length;
                    
         } else
         if (key == "Barking") {
           barkValue2017 = value.length;
                    
         } else {
         otherValue2017 = value.length;
                 
         };
     })
     var toBe = $.each(subsubSort2018, function(key, value){
         // console.log(key + " : " +value.length);
         if (key == "Party"){
           partyValue2018 = value.length;
         } else 
         if (key == "Banging") {
           bangValue2018 = value.length;
                     
         } else 
         if (key == "Talking") {
           talkValue2018 = value.length;
                   
         } else
         if (key == "Construction") {
           constructionValue2018 = value.length;
                    
         } else
         if (key == "Barking") {
           barkValue2018 = value.length;
                    
         } else {
         otherValue2018 = value.length;
                 
         };
     })
   } else{
    lerpAll();
    };
     oscParty.amp(ampParty);
     oscBang.amp(ampBang);
     oscTalk.amp(ampTalk);
     oscConst.amp(ampConst);
     oscBark.amp(ampBark);
     oscOther.amp(ampOther);

     if (keyCode == 49) {
       document.getElementById('filter1').style.fontWeight = "bold ";
       document.getElementById('filter2').style.fontWeight = "bold ";
       document.getElementById('filter3').style.fontWeight = "bold ";
       document.getElementById('filter4').style.fontWeight = "bold ";
       document.getElementById('filter5').style.fontWeight = "bold ";
       document.getElementById('filter6').style.fontWeight = "bold ";
       document.getElementById('filter7').style.fontWeight = "bold ";
       document.getElementById('filter1').style.backgroundColor = "transparent";
       document.getElementById('filter2').style.backgroundColor = "#8dd3c7";
       document.getElementById('filter3').style.backgroundColor = "#ffffb3";
       document.getElementById('filter4').style.backgroundColor = "#bebada";
       document.getElementById('filter5').style.backgroundColor = "#fb8072";
       document.getElementById('filter6').style.backgroundColor = "#80b1d3";
       document.getElementById('filter7').style.backgroundColor = "#fdb462";

     } else if (keyCode == 50) {
        oscParty.amp(ampParty);
         oscBang.amp(0);
         oscTalk.amp(0);
         oscConst.amp(0);
         oscBark.amp(0);
         oscOther.amp(0);
         // lerpAll();
         allZero();
        partyValue = partyValue;
        partyValue2010 = partyValue2010;
        partyValue2011 = partyValue2011;
        partyValue2012 = partyValue2012;
        partyValue2013 = partyValue2013;
        partyValue2014 = partyValue2014;
        partyValue2015 = partyValue2015
        partyValue2016 = partyValue2016;
        partyValue2017 = partyValue2017;
        partyValue2018 = partyValue2018;
                // constructionValue = 0;
        // barkValue = 0;
        // bangValue = 0;
        // otherValue = 0;
        // talkValue = 0;
       document.getElementById('filter2').style.fontWeight = "bold ";
       document.getElementById('filter1').style.fontWeight = "normal ";
       document.getElementById('filter3').style.fontWeight = "normal ";
       document.getElementById('filter4').style.fontWeight = "normal ";
       document.getElementById('filter5').style.fontWeight = "normal ";
       document.getElementById('filter6').style.fontWeight = "normal ";
       document.getElementById('filter7').style.fontWeight = "normal ";
       document.getElementById('filter1').style.backgroundColor = "transparent";
       document.getElementById('filter2').style.backgroundColor = "#8dd3c7";
       document.getElementById('filter3').style.backgroundColor = "transparent";
       document.getElementById('filter4').style.backgroundColor = "transparent";
       document.getElementById('filter5').style.backgroundColor = "transparent";
       document.getElementById('filter6').style.backgroundColor = "transparent";
       document.getElementById('filter7').style.backgroundColor = "transparent";
     } else if (keyCode == 51) {
      oscParty.amp(0);
     oscBang.amp(ampBang);
     oscTalk.amp(0);
     oscConst.amp(0);
     oscBark.amp(0);
     oscOther.amp(0);
      partyValue = 0;
       bangValue = bangValue;
       constructionValue = 0;
        barkValue = 0;
        otherValue = 0;
        talkValue = 0;
       document.getElementById('filter3').style.fontWeight = "bold ";
       document.getElementById('filter1').style.fontWeight = "normal ";
       document.getElementById('filter2').style.fontWeight = "normal ";
       document.getElementById('filter4').style.fontWeight = "normal ";
       document.getElementById('filter5').style.fontWeight = "normal ";
       document.getElementById('filter6').style.fontWeight = "normal ";
       document.getElementById('filter7').style.fontWeight = "normal ";
              document.getElementById('filter1').style.backgroundColor = "transparent";
       document.getElementById('filter2').style.backgroundColor = "transparent";
       document.getElementById('filter3').style.backgroundColor = "#ffffb3";
       document.getElementById('filter4').style.backgroundColor = "transparent";
       document.getElementById('filter5').style.backgroundColor = "transparent";
       document.getElementById('filter6').style.backgroundColor = "transparent";
       document.getElementById('filter7').style.backgroundColor = "transparent";
     } else if (keyCode == 52) {
      oscParty.amp(0);
     oscBang.amp(0);
     oscTalk.amp(ampTalk);
     oscConst.amp(0);
     oscBark.amp(0);
     oscOther.amp(0);
       partyValue = 0;
        constructionValue = 0;
        barkValue = 0;
        bangValue = 0;
        otherValue = 0;
        talkValue = talkValue;
       document.getElementById('filter4').style.fontWeight = "bold ";
       document.getElementById('filter1').style.fontWeight = "normal ";
       document.getElementById('filter2').style.fontWeight = "normal ";
       document.getElementById('filter3').style.fontWeight = "normal ";
       document.getElementById('filter5').style.fontWeight = "normal ";
       document.getElementById('filter6').style.fontWeight = "normal ";
       document.getElementById('filter7').style.fontWeight = "normal ";
              document.getElementById('filter1').style.backgroundColor = "transparent";
       document.getElementById('filter2').style.backgroundColor = "transparent";
       document.getElementById('filter3').style.backgroundColor = "transparent";
       document.getElementById('filter4').style.backgroundColor = "#bebada";
       document.getElementById('filter5').style.backgroundColor = "transparent";
       document.getElementById('filter6').style.backgroundColor = "transparent";
       document.getElementById('filter7').style.backgroundColor = "transparent";
     } else if (keyCode == 53) {
      oscParty.amp(0);
     oscBang.amp(0);
     oscTalk.amp(0);
     oscConst.amp(ampConst);
     oscBark.amp(0);
     oscOther.amp(0);
        partyValue = 0;
        constructionValue = constructionValue;
        barkValue = 0;
        bangValue = 0;
        otherValue = 0;
        talkValue = 0;
       document.getElementById('filter5').style.fontWeight = "bold ";
       document.getElementById('filter1').style.fontWeight = "normal ";
       document.getElementById('filter2').style.fontWeight = "normal ";
       document.getElementById('filter3').style.fontWeight = "normal ";
       document.getElementById('filter4').style.fontWeight = "normal ";
       document.getElementById('filter6').style.fontWeight = "normal ";
       document.getElementById('filter7').style.fontWeight = "normal ";
              document.getElementById('filter1').style.backgroundColor = "transparent";
       document.getElementById('filter2').style.backgroundColor = "transparent";
       document.getElementById('filter3').style.backgroundColor = "transparent";
       document.getElementById('filter4').style.backgroundColor = "transparent";
       document.getElementById('filter5').style.backgroundColor = "#fb8072";
       document.getElementById('filter6').style.backgroundColor = "transparent";
       document.getElementById('filter7').style.backgroundColor = "transparent";

     } else if (keyCode == 54) {
      oscParty.amp(0);
     oscBang.amp(0);
     oscTalk.amp(0);
     oscConst.amp(0);
     oscBark.amp(ampBark);
     oscOther.amp(0);
        partyValue = 0;
        constructionValue = 0;
        barkValue = barkValue;
        bangValue = 0;
        otherValue = 0;
        talkValue = 0;
       document.getElementById('filter6').style.fontWeight = "bold ";
       document.getElementById('filter1').style.fontWeight = "normal ";
       document.getElementById('filter2').style.fontWeight = "normal ";
       document.getElementById('filter3').style.fontWeight = "normal ";
       document.getElementById('filter4').style.fontWeight = "normal ";
       document.getElementById('filter5').style.fontWeight = "normal ";
       document.getElementById('filter7').style.fontWeight = "normal ";
              document.getElementById('filter1').style.backgroundColor = "transparent";
       document.getElementById('filter2').style.backgroundColor = "transparent";
       document.getElementById('filter3').style.backgroundColor = "transparent";
       document.getElementById('filter4').style.backgroundColor = "transparent";
       document.getElementById('filter5').style.backgroundColor = "transparent";
       document.getElementById('filter6').style.backgroundColor = "#80b1d3";
       document.getElementById('filter7').style.backgroundColor = "transparent";

     } 
      else if (keyCode == 55) {
        oscParty.amp(0);
     oscBang.amp(0);
     oscTalk.amp(0);
     oscConst.amp(0);
     oscBark.amp(0);
     oscOther.amp(ampOther);
        partyValue = 0;
        constructionValue = 0;
        barkValue = 0;
        bangValue = 0;
        talkValue = 0; 
        otherValue = otherValue;
       document.getElementById('filter7').style.fontWeight = "bold ";
       document.getElementById('filter1').style.fontWeight = "normal ";
       document.getElementById('filter2').style.fontWeight = "normal ";
       document.getElementById('filter3').style.fontWeight = "normal ";
       document.getElementById('filter4').style.fontWeight = "normal ";
       document.getElementById('filter5').style.fontWeight = "normal ";
       document.getElementById('filter6').style.fontWeight = "normal ";
       document.getElementById('filter1').style.backgroundColor = "transparent";
       document.getElementById('filter2').style.backgroundColor = "transparent";
       document.getElementById('filter3').style.backgroundColor = "transparent";
       document.getElementById('filter4').style.backgroundColor = "transparent";
       document.getElementById('filter5').style.backgroundColor = "transparent";
       document.getElementById('filter6').style.backgroundColor = "transparent";
       document.getElementById('filter7').style.backgroundColor = "#fdb462";       
    }

     else {

       oscParty.amp(ampParty);
       oscBang.amp(ampBang);
       oscTalk.amp(ampTalk);
       oscConst.amp(ampConst);
       oscBark.amp(ampBark);
       oscOther.amp(ampOther);
       partyValue = partyValue;
        constructionValue = constructionValue;
        barkValue = barkValue;
        bangValue = bangValue;
        talkValue = talkValue; 
        otherValue = otherValue;
       document.getElementById('filter1').style.fontWeight = "bold ";
       document.getElementById('filter2').style.fontWeight = "bold ";
       document.getElementById('filter3').style.fontWeight = "bold ";
       document.getElementById('filter4').style.fontWeight = "bold ";
       document.getElementById('filter5').style.fontWeight = "bold ";
       document.getElementById('filter6').style.fontWeight = "bold ";
       document.getElementById('filter7').style.fontWeight = "bold ";
       document.getElementById('filter1').style.backgroundColor = "transparent";
       document.getElementById('filter2').style.backgroundColor = "#8dd3c7";
       document.getElementById('filter3').style.backgroundColor = "#ffffb3";
       document.getElementById('filter4').style.backgroundColor = "#bebada";
       document.getElementById('filter5').style.backgroundColor = "#fb8072";
       document.getElementById('filter6').style.backgroundColor = "#80b1d3";
       document.getElementById('filter7').style.backgroundColor = "#fdb462";
}

 noStroke();
 var scale = 7;
 var divisions = 7;
fill('#fdb462')
    rect(20, windowHeight-20, windowWidth/divisions,(-1*(otherValue2010/scale)))
 fill('#80b1d3')
 rect(20, ((windowHeight-20)-(otherValue2010/scale)), windowWidth/divisions, (-1*(barkValue2010/scale)))
  fill('#fb8072')
 rect(20, ((windowHeight-20)-(otherValue2010/scale)-(barkValue2010/scale)), windowWidth/divisions, (-1*(constructionValue2010/scale)))
   fill('#bebada')
 rect(20, ((windowHeight-20)-(otherValue2010/scale)-(barkValue2010/scale)-(constructionValue2010/scale)), windowWidth/divisions, (-1*(talkValue2010/scale)))
    fill('#ffffb3')
 rect(20, ((windowHeight-20)-(otherValue2010/scale)-(barkValue2010/scale)-(constructionValue2010/scale)-(talkValue2010/scale)), windowWidth/divisions, (-1*(bangValue2010/scale)))
     fill('#8dd3c7')
 rect(20, ((windowHeight-20)-(otherValue2010/scale)-(barkValue2010/scale)-(constructionValue2010/scale)-(talkValue2010/scale)-(bangValue2010/scale)), windowWidth/divisions, (-1*(partyValue2010/scale)));
     }

     fill('#fdb462')
    rect(20+(windowWidth/divisions), windowHeight-20, windowWidth/divisions,(-1*(otherValue2011/scale)))
 fill('#80b1d3')
 rect(20+(windowWidth/divisions), ((windowHeight-20)-(otherValue2011/scale)), windowWidth/divisions, (-1*(barkValue2011/scale)))
  fill('#fb8072')
 rect(20+(windowWidth/divisions), ((windowHeight-20)-(otherValue2011/scale)-(barkValue2011/scale)), windowWidth/divisions, (-1*(constructionValue2011/scale)))
   fill('#bebada')
 rect(20+(windowWidth/divisions), ((windowHeight-20)-(otherValue2011/scale)-(barkValue2011/scale)-(constructionValue2011/scale)), windowWidth/divisions, (-1*(talkValue2011/scale)))
    fill('#ffffb3')
 rect(20+(windowWidth/divisions), ((windowHeight-20)-(otherValue2011/scale)-(barkValue2011/scale)-(constructionValue2011/scale)-(talkValue2011/scale)), windowWidth/divisions, (-1*(bangValue2011/scale)))
     fill('#8dd3c7')
 rect(20+(windowWidth/divisions), ((windowHeight-20)-(otherValue2011/scale)-(barkValue2011/scale)-(constructionValue2011/scale)-(talkValue2011/scale)-(bangValue2011/scale)), windowWidth/divisions, (-1*(partyValue2011/scale)));
fill('#fdb462')
    rect(20+(windowWidth/divisions)*2, windowHeight-20, windowWidth/divisions,(-1*(otherValue2012/scale)))
 fill('#80b1d3')
 rect(20+(windowWidth/divisions)*2, ((windowHeight-20)-(otherValue2012/scale)), windowWidth/divisions, (-1*(barkValue2012/scale)))
  fill('#fb8072')
 rect(20+(windowWidth/divisions)*2, ((windowHeight-20)-(otherValue2012/scale)-(barkValue2012/scale)), windowWidth/divisions, (-1*(constructionValue2012/scale)))
   fill('#bebada')
 rect(20+(windowWidth/divisions)*2, ((windowHeight-20)-(otherValue2012/scale)-(barkValue2012/scale)-(constructionValue2012/scale)), windowWidth/divisions, (-1*(talkValue2012/scale)))
    fill('#ffffb3')
 rect(20+(windowWidth/divisions)*2, ((windowHeight-20)-(otherValue2012/scale)-(barkValue2012/scale)-(constructionValue2012/scale)-(talkValue2012/scale)), windowWidth/divisions, (-1*(bangValue2012/scale)))
     fill('#8dd3c7')
 rect(20+(windowWidth/divisions)*2, ((windowHeight-20)-(otherValue2012/scale)-(barkValue2012/scale)-(constructionValue2012/scale)-(talkValue2012/scale)-(bangValue2012/scale)), windowWidth/divisions, (-1*(partyValue2012/scale)));
  fill('#fdb462')
    rect(20+(windowWidth/divisions)*3, windowHeight-20, windowWidth/divisions,(-1*(otherValue2013/scale)))
 fill('#80b1d3')
 rect(20+(windowWidth/divisions)*3, ((windowHeight-20)-(otherValue2013/scale)), windowWidth/divisions, (-1*(barkValue2013/scale)))
  fill('#fb8072')
 rect(20+(windowWidth/divisions)*3, ((windowHeight-20)-(otherValue2013/scale)-(barkValue2013/scale)), windowWidth/divisions, (-1*(constructionValue2013/scale)))
   fill('#bebada')
 rect(20+(windowWidth/divisions)*3, ((windowHeight-20)-(otherValue2013/scale)-(barkValue2013/scale)-(constructionValue2013/scale)), windowWidth/divisions, (-1*(talkValue2013/scale)))
    fill('#ffffb3')
 rect(20+(windowWidth/divisions)*3, ((windowHeight-20)-(otherValue2013/scale)-(barkValue2013/scale)-(constructionValue2013/scale)-(talkValue2013/scale)), windowWidth/divisions, (-1*(bangValue2013/scale)))
     fill('#8dd3c7')
 rect(20+(windowWidth/divisions)*3, ((windowHeight-20)-(otherValue2013/scale)-(barkValue2013/scale)-(constructionValue2013/scale)-(talkValue2013/scale)-(bangValue2013/scale)), windowWidth/divisions, (-1*(partyValue2013/scale)));
  fill('#fdb462')
    rect(20+(windowWidth/divisions)*4, windowHeight-20, windowWidth/divisions,(-1*(otherValue2014/scale)))
 fill('#80b1d3')
 rect(20+(windowWidth/divisions)*4, ((windowHeight-20)-(otherValue2014/scale)), windowWidth/divisions, (-1*(barkValue2014/scale)))
  fill('#fb8072')
 rect(20+(windowWidth/divisions)*4, ((windowHeight-20)-(otherValue2014/scale)-(barkValue2014/scale)), windowWidth/divisions, (-1*(constructionValue2014/scale)))
   fill('#bebada')
 rect(20+(windowWidth/divisions)*4, ((windowHeight-20)-(otherValue2014/scale)-(barkValue2014/scale)-(constructionValue2014/scale)), windowWidth/divisions, (-1*(talkValue2014/scale)))
    fill('#ffffb3')
 rect(20+(windowWidth/divisions)*4, ((windowHeight-20)-(otherValue2014/scale)-(barkValue2014/scale)-(constructionValue2014/scale)-(talkValue2014/scale)), windowWidth/divisions, (-1*(bangValue2014/scale)))
     fill('#8dd3c7')
 rect(20+(windowWidth/divisions)*4, ((windowHeight-20)-(otherValue2014/scale)-(barkValue2014/scale)-(constructionValue2014/scale)-(talkValue2014/scale)-(bangValue2014/scale)), windowWidth/divisions, (-1*(partyValue2014/scale)));
    fill('#fdb462')
    rect(20+(windowWidth/divisions)*5, windowHeight-20, windowWidth/divisions,(-1*(otherValue2015/scale)))
 fill('#80b1d3')
 rect(20+(windowWidth/divisions)*5, ((windowHeight-20)-(otherValue2015/scale)), windowWidth/divisions, (-1*(barkValue2015/scale)))
  fill('#fb8072')
 rect(20+(windowWidth/divisions)*5, ((windowHeight-20)-(otherValue2015/scale)-(barkValue2015/scale)), windowWidth/divisions, (-1*(constructionValue2015/scale)))
   fill('#bebada')
 rect(20+(windowWidth/divisions)*5, ((windowHeight-20)-(otherValue2015/scale)-(barkValue2015/scale)-(constructionValue2015/scale)), windowWidth/divisions, (-1*(talkValue2015/scale)))
    fill('#ffffb3')
 rect(20+(windowWidth/divisions)*5, ((windowHeight-20)-(otherValue2015/scale)-(barkValue2015/scale)-(constructionValue2015/scale)-(talkValue2015/scale)), windowWidth/divisions, (-1*(bangValue2015/scale)))
     fill('#8dd3c7')
 rect(20+(windowWidth/divisions)*5, ((windowHeight-20)-(otherValue2015/scale)-(barkValue2015/scale)-(constructionValue2015/scale)-(talkValue2015/scale)-(bangValue2015/scale)), windowWidth/divisions, (-1*(partyValue2015/scale)));
       fill('#fdb462')
    rect(20+(windowWidth/divisions)*6, windowHeight-20, windowWidth/divisions,(-1*(otherValue2016/scale)))
 fill('#80b1d3')
 rect(20+(windowWidth/divisions)*6, ((windowHeight-20)-(otherValue2016/scale)), windowWidth/divisions, (-1*(barkValue2016/scale)))
  fill('#fb8072')
 rect(20+(windowWidth/divisions)*6, ((windowHeight-20)-(otherValue2016/scale)-(barkValue2016/scale)), windowWidth/divisions, (-1*(constructionValue2016/scale)))
   fill('#bebada')
 rect(20+(windowWidth/divisions)*6, ((windowHeight-20)-(otherValue2016/scale)-(barkValue2016/scale)-(constructionValue2016/scale)), windowWidth/divisions, (-1*(talkValue2016/scale)))
    fill('#ffffb3')
 rect(20+(windowWidth/divisions)*6, ((windowHeight-20)-(otherValue2016/scale)-(barkValue2016/scale)-(constructionValue2016/scale)-(talkValue2016/scale)), windowWidth/divisions, (-1*(bangValue2016/scale)))
     fill('#8dd3c7')
 rect(20+(windowWidth/divisions)*6, ((windowHeight-20)-(otherValue2016/scale)-(barkValue2016/scale)-(constructionValue2016/scale)-(talkValue2016/scale)-(bangValue2016/scale)), windowWidth/divisions, (-1*(partyValue2016/scale)));
                 fill('#fdb462')
    rect(20+(windowWidth/divisions)*7, windowHeight-20, windowWidth/divisions,(-1*(otherValue2017/scale)))
 fill('#80b1d3')
 rect(20+(windowWidth/divisions)*7, ((windowHeight-20)-(otherValue2017/scale)), windowWidth/divisions, (-1*(barkValue2017/scale)))
  fill('#fb8072')
 rect(20+(windowWidth/divisions)*7, ((windowHeight-20)-(otherValue2017/scale)-(barkValue2017/scale)), windowWidth/divisions, (-1*(constructionValue2017/scale)))
   fill('#bebada')
 rect(20+(windowWidth/divisions)*7, ((windowHeight-20)-(otherValue2017/scale)-(barkValue2017/scale)-(constructionValue2017/scale)), windowWidth/divisions, (-1*(talkValue2017/scale)))
    fill('#ffffb3')
 rect(20+(windowWidth/divisions)*7, ((windowHeight-20)-(otherValue2017/scale)-(barkValue2017/scale)-(constructionValue2017/scale)-(talkValue2017/scale)), windowWidth/divisions, (-1*(bangValue2017/scale)))
     fill('#8dd3c7')
 rect(20+(windowWidth/divisions)*7, ((windowHeight-20)-(otherValue2017/scale)-(barkValue2017/scale)-(constructionValue2017/scale)-(talkValue2017/scale)-(bangValue2017/scale)), windowWidth/divisions, (-1*(partyValue2017/scale)));
        
  if (loading == 1){
         place = place - 2; 
      if (place >windowHeight) { 
        place = 0+windowHeight;
 }
         noFill()
      rect(0,place,windowWidth,windowHeight/7)
       fill('#8dd3c7')
      rect(0,place+(windowHeight/7),windowWidth,windowHeight/7)
       fill('#ffffb3') 
      rect(0,place+(windowHeight/7)*2,windowWidth,windowHeight/7)
       fill('#bebada')
      rect(0,place+(windowHeight/7)*3,windowWidth,windowHeight/7)
      fill('#fb8072') 
      rect(0,place+(windowHeight/7)*4,windowWidth,windowHeight/7)
      fill('#80b1d3')
      rect(0,place+(windowHeight/7)*5,windowWidth,windowHeight/7)
       fill('#fdb462')
      rect(0,place+(windowHeight/7)*6,windowWidth,windowHeight/7)
    
    
  }

  if (toggleWave == 1){     //analyze the waveform
   waveform = fft.waveform();

   //draw the shape of the waveform
   drawWaveform();
   function drawWaveform() {
    noFill();
     stroke(240);
     strokeWeight(4);
     beginShape();
     for (var i = 0; i<waveform.length; i++){
       var x = map(i, 0, waveform.length, 20, width);
       var y = map(waveform[i], -1, 1, -height/2, height/2);
       vertex(x, y + height/2);
     }
     endShape();
  }}

fill('#7a7a7a');
noStroke();
number = map(9000, 0, 9000, 0, windowHeight-20);
divisor = number/9;
for (var y = 0; y < number;) {
 rect(20,y,8,1);
 y=y+(divisor/10);
};

fill('black');
for (var y = 0; y < number+1;) {
 rect(20,y,10,2);
 y=y+divisor;
};

for (var y = 0; y < 10;) {
position = Math.round(y*divisor);
number = (9000 - (y*1000))
if (number==9000){
  text(number,40,position+14);
} else{text(number,40,position+5)}
  y=y+1;
};

for (var y = 0; y <7; y++){
  text(2010+y, (windowWidth/14)+((windowWidth-10)/7)*y,windowHeight-8);
}


translate(14, window.innerHeight/2);
rotate(3*PI/2);
text("Number of Complaints", 0, 0);

 

};

function windowResized() {
   resizeCanvas(windowWidth, windowHeight);
};

