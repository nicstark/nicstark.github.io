
var ParentCategories = [];

console.log("hello")

const
// width = window.innerWidth,
  width = document.body.clientWidth,
  height = window.innerHeight;

var maxRadius;

if (width>height)
  {maxRadius = (height / 2.8)}
else{maxRadius = width/4.5} ;

const formatNumber = d3.format(',d');
var parseDate = d3.timeFormat("%B %Y");

function stripPunctSpace(string){
  return string.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"").replace(/\s+/g, '')
}

function hasChild(obj){
  return !!Object.keys(obj).length;
}

function hasChildren(obj){
  return obj.hasOwnProperty('children')
}

const x = d3.scaleLinear()
  .range([0, 2 * Math.PI])
  .clamp(true);

const y = d3.scaleLinear()
  .range([maxRadius*.1, maxRadius]);

const partition = d3.partition();

const arc = d3.arc()
  .startAngle(d => x(d.x0))
  .endAngle(d => x(d.x1))
  .innerRadius(function(d){if (d.depth == 1) {return Math.max(0, 0)} else {
    return Math.max(0, y(d.y0)*.5)
  }})
  .outerRadius(function(d){if (d.depth == 1) {return Math.max(0, y(d.y1))} else {
    return Math.max(0, y(d.y1)*.7)
  }})

const middleArcLine = d => {
  const halfPi = Math.PI/2;
  const angles = [x(d.x0) - halfPi, x(d.x1) - halfPi];
  const r = Math.max(0, (y(d.y0) + y(d.y1)) / 2);
  const middleAngle = (angles[1] + angles[0]) / 2;
  const invertDirection = middleAngle > 0 && middleAngle < Math.PI;

  if (invertDirection) { angles.reverse(); }
  const path = d3.path();
  path.arc(0, 0, r, angles[0], angles[1], invertDirection);

  return path.toString();
};

var environmentArc = d3.arc()
  .outerRadius(maxRadius*.65)
  .innerRadius(0);

var actionsPie = d3.pie()
  .sort(null)
  .value(function(d) { return d.actions; });

var savedPie = d3.pie()
  .sort(null)
  .value(function(d) { return d.saved; });

const treemap = d3.treemap()
  .size([maxRadius*2, maxRadius*2.00001])
  .paddingOuter(3)
  .paddingInner(3)
  .round(true);


var stackedWidth = width*.855;
var stackedHeight = height*.65;

var TotalBarWidth = width/2 - width/30;
var TotalBarHeight = height/5;

const pageNumX = width*.48;
const pageNumY = height*.495;
const pageNumWeight = 400;
const pageNumColor = "grey"
const pageNumSize = "2vh";


//-------------Read in JSON

d3.json('data.json', (error, data) => {
  if (error) {errorPage();  throw error; }

  const partner = data.institution;
  const date = data.date;



  var borderLine = d3.line()
    .x(function(d) {return d.x})
    .y(function(d) { return d.y})

  var pageBorderTop = [
    {"x": width/-2, "y": height/-2},
    {"x": width/2, "y": height/-2}
  ]



  //---------------Parsing Data
  cover()

  var pageCounter = 1;

  for (var i = 0; i < data.categories.length; i++) {
    if (data.categories[i].category.toUpperCase() == "USER BREAKDOWN"){
      var userBreakdownProto = data.children[i].children[0];
      var userBreakdownData = d3.hierarchy(userBreakdownProto).sum(function(d) { return d.value; });
    }

    else if (data.categories[i].category.toUpperCase() == "TOTAL USERS"){
      var userTotalData = data.categories[i]
    }

    else if (data.categories[i].category.toUpperCase() == "EARN ACTIVITY"){
      var earnActivityData = data.categories[i]
    }

    else if (data.categories[i].category.toUpperCase() == "ACTIONS TAKEN OVER TIME"){
      var actionsOverTimeData = data.categories[i]
    }

    else if (data.categories[i].category.toUpperCase() == "ALL USE ACTIVITY"){
      var useActivityData = data.categories[i]
      var useActivityActionsData = d3.hierarchy(useActivityData).sum(function(d) { return d.actions; });
      var useActivityPIPsData = d3.hierarchy(useActivityData).sum(function(d) { return d.used; });
    }

    else if (data.categories[i].category.toUpperCase() == "ENVIRONMENT"){
      var environmentData = data.categories[i]
    }

    else if (data.categories[i].category.toUpperCase() == "INVESTMENT IN EDUCATION"){
      var investmentEducationData = data.categories[i]
    }

    else if (data.categories[i].category.toUpperCase() == "LOCAL ECONOMY"){
      var localEconomyData = data.categories[i]
    }

    else if (data.categories[i].category.toUpperCase() == "COMMUNITY & LEARNING"){
      var communityLearningData = data.categories[i]
    }

    else if (data.categories[i].category.toUpperCase() == "HEALTH & WELLNESS"){
      var healthWellnessData = data.categories[i]
    }


    else continue
  }

    var environmentBreakdownColor = d3.scaleOrdinal()
      .domain(actionsPie(environmentData.children))
      .range([
        "#FFF",
        "#e26442",
        "#e9bc57",
        "#4d5494",
        "#75c4b7",
        "grey",
        "#e8806c",
        "#c04f8a"
      ])

  if (userBreakdownData != null){
    try {userBreakdown(); pageCounter +=1;} catch (err){console.log(err)}}
  if (userTotalData != null){
    try {totalUsers(); pageCounter +=1;} catch (err){console.log(err)}}
  if (earnActivityData != null){
    try {earnActivity(); pageCounter +=1;} catch (err){console.log(err)}}
  if (actionsOverTimeData != null){
    try {actionsOverTime(); pageCounter +=1;} catch (err){console.log(err)}}
  if (useActivityData != null){
    try {useActivity(); pageCounter +=1;} catch (err){console.log(err)}}
  if (environmentData != null){
    try {environment(); pageCounter +=1;} catch (err){console.log(err)}}
  if (investmentEducationData != null || localEconomyData != null){
    try {page8(); pageCounter +=1;} catch (err){console.log(err)}}
  if (communityLearningData != null || healthWellnessData != null){
    try {page9(); pageCounter +=1;} catch (err){console.log(err)}}




  thanks()

  // d3.selectAll(".page")
  //   .append("path")
  //   .attr("d", borderLine(pageBorderTop))
  //   .style("stroke-width", "1px")
  //   .style("stroke", "322f2b");

  d3.selectAll(".page")
    .append("rect")
    .attr("x", width/-2)
    .attr("y", (height/-2) +1)
    .attr("width", width)
    .attr("height", "1px")
    .style("opacity", .1)
    .style("fill", "322f2b");

  d3.selectAll(".page").append("svg:image")
    .attr('width', "10%")
    .attr('height', "10%")
    .attr('x', function(){return  width/-2 + width/30 })
    .attr('y', function(){return height*-.481})
    .attr("xlink:href", "LOGO.svg");

  d3.selectAll(".page").append("rect")
    .attr('x', function(){return width/-2.6 + width/30})
    .attr('y', function(){return height*-.455})
    .attr("height", width/30)
    .attr("width", "1px")
    .style('fill', 'grey');

  d3.selectAll(".page").append("text")
    .attr('x', function(){return width/-2.7 + width/30})
    .attr('y', function(){return height*-.435})
    .style("text-anchor", "left")
    .style("vertical-align", "text-bottom")
    .attr("font-family", "Bryant Pro, sans-serif")
    .attr("font-weight", "500")
    .attr("font-size", "2vh")
    .style('fill', 'grey')
    .text('Performance Dashboard/Report — ' + partner);

  d3.selectAll(".page").append("text")
    .attr('x', function(){return width/-2.7 + width/30})
    .attr('y', function(){return height*-.41})
    .style("text-anchor", "left")
    .style("vertical-align", "text-bottom")
    .attr("font-family", "Bryant Pro, sans-serif")
    .attr("font-weight", "500")
    .attr("font-size", "1.8vh")
    .style('fill', 'grey')
    .text(date);

    function PageNumberGenerator(svgNumber){
          svgNumber.append('text')
            .attr('x', pageNumX)
            .attr('y', pageNumY)
            .style("text-anchor", "end")
            .attr("font-family", "Bryant Pro, sans-serif")
            .attr("font-weight", pageNumWeight)
            .attr("font-size", pageNumSize)
            .style('fill', pageNumColor)
            .text(pageCounter);
    }



  function userBreakdownMouseOver(d, i) {
    d3.selectAll("." + stripPunctSpace(d.data.name)).transition()
      .style("opacity", .5);
  }

  function userBreakdownMouseOut(d, i) {
    d3.selectAll("." + stripPunctSpace(d.data.name)).transition()
      .style("opacity", 1);
  }

  function actionsTakenOverTimeMouseOver(d, i) {
    d3.selectAll("." + stripPunctSpace(d)).transition()
      .style("opacity", .5);
  }

  function actionsTakenOverTimeMouseOut(d, i) {
    d3.selectAll("." + stripPunctSpace(d)).transition()
      .style("opacity", 1);
  }




  //------------------1 Cover Page

  function cover(){

    const svg1 = d3.select('#page1').append('svg')
      .attr('class', "svg1")
      .style('width', '100vw')
      .style('height', '100vh')
      .attr('viewBox', `${-width / 2} ${-height / 2} ${width} ${height}`);

    svg1.append("svg:image")
      .attr('width', "33%")
      .attr('height', "33%")
      .attr('x', function(){return width/-5.5})
      .attr('y', function(){return height/-4})
      .attr("xlink:href", "LOGO.svg");

    svg1.append('text')
      .attr('y', "10%")
      .style("text-anchor", "middle")
      .attr("font-family", "Bryant Pro, sans-serif")
      .attr("font-weight", "normal")
      .attr("font-size", "4vh")
      .style('fill', 'black')
      .text('Performance Dashboard/Report');

    svg1.append('text')
      .attr('y', "15%")
      .style("text-anchor", "middle")
      .attr("font-family", "Bryant Pro, sans-serif")
      // .attr("font-family", "Bryant Pro, sans-serif")
      .attr("font-weight", "bold")
      .attr("font-size", "4vh")
      .style('fill', 'black')
      .text(partner);

    svg1.append('text')
      .attr('y', "20%")
      .style("text-anchor", "middle")
      .attr("font-family", "Bryant Pro, sans-serif")
      .attr("font-weight", "500")
      .attr("font-size", "2vh")
      .style('fill', 'black')
      .text(date);
  }


    function errorPage(){

      const svg1 = d3.select('#page1').append('svg')
        .attr('class', "svg1")
        .style('width', '100vw')
        .style('height', '100vh')
        .attr('viewBox', `${-width / 2} ${-height / 2} ${width} ${height}`);

      svg1.append("svg:image")
        .attr('width', "33%")
        .attr('height', "33%")
        .attr('x', function(){return parseFloat(d3.select(this).style('width'))/-2})
        .attr('y', function(){return parseFloat(d3.select(this).style('height'))/-1})
        .attr("xlink:href", "LOGO.svg");



        svg1.append('text')
          .style("text-anchor", "middle")
          .attr("font-family", "Bryant Pro, sans-serif")
          .attr("font-weight", "900")
          .attr("font-size", "8vw")
          .attr("font-style", "italic")
          .style('fill', '#322f2b')
          .text('APOLOGIES');

        svg1.append('text')
          .attr('y', "6%")
          .style("text-anchor", "middle")
          .attr("font-family", "Bryant Pro, sans-serif")
          .attr("font-weight", "Regular")
          .attr("font-size", "3vw")
          .style('fill', 'black')
          .text('There Seems To Be An Error. Please Contact:');

        svg1.append('text')
          .attr('y', "12%")
          .style("text-anchor", "middle")
          .attr("font-family", "Bryant Pro, sans-serif")
          .attr("font-weight", "100")
          .attr("font-size", "3vw")
          .style('fill', 'black')
          .text('support@pipsrewards.com')
          .on("click", function() { window.open("mailto: support@pipsrewards.com" ); });


    }


  //----------------------- 2 User Breakdown

  function userBreakdown() {

    const svg2 = d3.select('#page2').append('svg')
      .attr('class', "page svg2")
      .style('width', '100vw')
      .style('height', '100vh')
      .attr('viewBox', `${-width / 2} ${-height / 2} ${width} ${height}`);

    const UserBreakdown = d3.select('.svg2')
      .attr('width', width/2)
      .attr('height', height/2)
      .append('g');

    const UserBreakdownLegend = d3.select('.svg2')
      .attr('width', width/2)
      .attr('height', height/2)
      .append('g');





    treemap(userBreakdownData);

    var sortedUserGroups = userBreakdownData.descendants().sort((a, b) => (a.value < b.value) ? 1 : (a.value === b.value) ? ((a.size < b.size) ? 1 : -1) : -1 );


    var userBreakDownColor = d3.scaleOrdinal().domain(sortedUserGroups)
      .range(["#000",
      "#a43034",
      "#d35634",
      "#e8806c",
      "#FFF"]);

    var cell = UserBreakdown
      .selectAll(".node")
      .data(sortedUserGroups)
      .enter().append("g")
        .attr("transform", function(d) { return "translate(" + d.x0 + "," + d.y0 + ")"; })
        .attr("class", "node")
        .attr("value", function(d) {return d.value})
        .each(function(d) { d.node = this; });

    var treemapSize;

    cell.append("rect")
      .attr("class", function(d) { return "users " + d.data.name.split(" ")[1] + " " + stripPunctSpace(d.data.name); })
      .attr("width", function(d, i) {if (i == 0) {treemapSize = d.x1 - d.x0};  return d.x1 - d.x0; })
      .attr("height", function(d) { return d.y1 - d.y0; })
      .style("fill", function(d,i) {
        if (i == 0){return '#000'}
        // else if (d.data.name.includes('Active')) {return '#fff'}
        else {return userBreakDownColor(i); }});

    cell.append("clipPath")
      .attr("id", function(d) { return "clip-" + d.data.name; })
      .append("use")
      .attr("xlink:href", function(d) { return "#rect-" + d.data.name + ""; });

    cell.append("title")
      .text(function(d) { return d.data.name + "\n" + formatNumber(d.value); });

    UserBreakdown.attr('transform', 'translate('+ maxRadius*-2 + ',' + height/-5 + ')');

    svg2.append('text')
      .attr("x", width/-2 + width/30)
      .attr("y", height/-3)
      .text("USER BREAKDOWN")
      .style("text-anchor", "start")
      .attr("font-family", "Bryant Pro, sans-serif")
      .attr("font-weight", "500")
      .attr("font-size", "3em")
      .style('fill', '#d35634');


    const userlegend = UserBreakdown.selectAll('g.userlegend')
      .data(sortedUserGroups);


    userlegend.exit().remove();

    const newUserLegend = userlegend.enter()
        .append('g').attr('class', 'userlegend');

    var userLegendHeight = treemapSize
    var userLegendBarHeight = userLegendHeight/sortedUserGroups.length;

    newUserLegend.append('rect')
      .attr("x", width/10)
      .attr("y", function(d, i) {
        return (i * userLegendBarHeight);
      })
      .attr("width", userLegendHeight)
      .attr("height", userLegendBarHeight)
      .style("fill", function(d,i) {
        if (d.data.name == 'Users'){return '#000'}
        // else if (d.data.name.includes('Active')) {return '#fff'}
        else {return userBreakDownColor(i); }})
      .attr('class', function (d) {return stripPunctSpace(d.data.name)})
      .style('stroke', function(d, i){if (userBreakDownColor(i) == "#FFF"){return 'black'} else {'none'}})
      .style('stroke-width', function(d,i ){if (userBreakDownColor(i) == "#FFF"){return '1px'} else {'0px'}})
      .on("mouseover", userBreakdownMouseOver)
      .on("mouseout", userBreakdownMouseOut);

    newUserLegend.append('text')
      .attr("x", width/9)
      .attr("y", function(d, i) {
        return  userLegendBarHeight/2 + (i * userLegendBarHeight);
      })
      .attr("dy", ".35em")
      .text(d => {return formatNumber(d.value) + '\n' + d.data.name})
      .style("text-anchor", "start")
      .attr("font-family", "museo-sans-rounded, sans-serif")
      .attr("font-weight", "900")
      .attr("font-size", "4vmin")
      .style('fill', 'white')
      .style('stroke', function(d,i){if (userBreakDownColor(i) == "#FFF"){return 'black'} else {'none'}})
      .style('stroke-width', function(d,i){if (userBreakDownColor(i) == "#FFF"){return '1px'} else {'0px'}})
      // .style('stroke', function(d){if (d.data.name.includes('Active')){return 'black'} else {'none'}})
      // .style('stroke-width', function(d){if (d.data.name.includes('Active')){return '1px'} else {'0px'}})
      .attr('class', function (d) {return stripPunctSpace(d.data.name)})
      .on("mouseover", userBreakdownMouseOver)
      .on("mouseout", userBreakdownMouseOut);

    newUserLegend.append('title')

      .text(d => d.data.name + '\n' + formatNumber(d.value) );

    newUserLegend.attr('transform', 'translate(' + width/3 + ',' + 0 + ')');
  }

  //-----------------------3 Total Users

//Create SVG on Page
  function totalUsers(){
    const svg3 = d3.select('#page3').append('svg')
      .attr('class', "page svg3")
      .style('width', '100vw')
      .style('height', '100vh')
      .attr('viewBox', `${-width / 2} ${-height / 2} ${width} ${height}`);

    const UserTotal = d3.select('.svg3')
      .attr("class", "UserTotal page")
      .attr('width', width)
      .attr('height', height)
      .append('g');

    //Add Title text
    svg3.append('text')
      .attr("x", width/-2 + width/30)
      .attr("y", height/-3)
      .text("TOTAL USERS")
      .style("text-anchor", "start")
      .attr("font-family", "Bryant Pro, sans-serif")
      .attr("font-weight", "500")
      .attr("font-size", "3em")
      .style('fill', '#d35634');


    const UserTotalFigures = d3.select('.UserTotal')
      .attr("class", "UserTotalFigures page")
      .attr('width', width)
      .attr('height', height)
      .append('g');


    UserTotalFigures.append('text')
      .attr("x", 0)
      .attr("y", 0)
      .text(function (){return parseDate(new Date(userTotalData.children[userTotalData.children.length-1].date))})
      .attr("class", "totalUsersDate")
      .style("text-anchor", "end")
      .attr("font-family", "Bryant Pro, sans-serif")
      .attr("font-weight", "500")
      .attr("font-size", "2vw")
      .style('fill', '#000');

    UserTotalFigures.append('text')
      .attr("x", "15%")
      .attr("y", 0)
      .text(" Total Number of Users: ")
      .style("text-anchor", "end")
      .attr("font-family", "Bryant Pro, sans-serif")
      .attr("font-weight", "400")
      .attr("font-size", "1.3vw")
      .style('fill', '#000');


    UserTotalFigures.append('text')
      .attr("x", "15.5%")
      .attr("y", 0)
      .text(function (){return formatNumber(userTotalData.children[userTotalData.children.length-1].categories[0].value)})
      .attr("class", "totalUsersLabel")
      .style("text-anchor", "start")
      .attr("font-family", "Bryant Pro, sans-serif")
      .attr("font-weight", "500")
      .attr("font-size", "2vw")
      .style('fill', '#000');


    UserTotalFigures.append('text')
      .attr("x", "30%")
      .attr("y", 0)
      .text(" New Users: ")
      .style("text-anchor", "end")
      .attr("font-family", "Bryant Pro, sans-serif")
      .attr("font-weight", "400")
      .attr("font-size", "1.3vw")
      .style('fill', '#000');


    UserTotalFigures.append('text')
      .attr("x", "30.5%")
      .attr("y", 0)
      .text(function (){return formatNumber(userTotalData.children[userTotalData.children.length-1].categories[1].value)})
      .attr("class", "newUsersLabel")
      .style("text-anchor", "start")
      .attr("font-family", "Bryant Pro, sans-serif")
      .attr("font-weight", "500")
      .attr("font-size", "2vw")
      .style('fill', '#000');

    UserTotalFigures.attr('transform', 'translate(' + width/-10 + ',' + height/-3.5 + ')');



      PageNumberGenerator(svg3)


    // Extract Data from object children

    var userTotalDataVerbose = []

    for (var i = 0; i < userTotalData.children.length; i++) {
      var currentDatum = userTotalData.children[i];
      var currentDate = new Date(userTotalData.children[i].date.toString());

      // Check each date entry for children + values
      if (currentDatum.categories.length > 0) {
        for (var j = 0; j < currentDatum.categories.length; j++) {
          userTotalDatum = {'date': currentDate, "value": currentDatum.categories[j].value, "category": currentDatum.categories[j].category};
          userTotalDataVerbose.push(userTotalDatum)

          if (currentDatum.categories[j].subcategories) {
            var currentChild = currentDatum.categories[j].subcategories;
            for (var k = 0; k < currentChild.length; k++) {
              userTotalDatum = {'date': currentDate, "value": currentChild[k].value, "category": currentChild[k].subcategory};
              userTotalDataVerbose.push(userTotalDatum)
            }
          }
        }
      }
      else {continue};
    }



    var sumstat = d3.nest()
      .key(function(d) { return d.date;})
      .entries(userTotalDataVerbose);

    var userGroupNames = []
    var userGroupOrder = []



    for (var i = 0; i < sumstat[0].values.length; i++) {
      userGroupNames.push(sumstat[0].values[i].category)
      userGroupOrder.push(i)
    }

    var stackedData = d3.stack()
      .keys(userGroupOrder)
      .value(function(d, key){
        return d.values[key].value
      })
      (sumstat)



    // Add X axis --> it is a date format
    var x = d3.scaleTime()
      .domain(d3.extent(userTotalDataVerbose, function(d) { return d.date; }))
      .range([ 0, stackedWidth]);


    UserTotal.append("g")
      .attr("transform", "translate(0," + stackedHeight + ")")
      .attr("class", "axis")
      .call(d3.axisBottom(x)
      .tickFormat(d3.utcFormat("%b %y"))
      .tickValues(x.ticks().concat(x.domain())));

    // Add Y axis
    var y = d3.scaleLinear()
      .domain([0, d3.max(userTotalDataVerbose, function(d) { return +d.value; })*1.2])
      .range([ stackedHeight, 0 ]);

    UserTotal.append("g")
      .attr("class", "axis")
      .call(d3.axisLeft(y));

    var line = d3.line()
      .x(function(d, i) { return x(new Date(d.data.key)) })
      .y(function(d) { return y(d[1]) - 2; });

    // gridlines in x axis function
    function make_y_gridlines() {
        return d3.axisLeft(y)
            .ticks(10)
    }


    function totalUsersMouseOver(d, i) {
      d3.selectAll(".totalUsersLabel").transition()
        .text(function (){return formatNumber(d[1] + d.data.values[1].value)})
      d3.selectAll(".newUsersLabel").transition()
        .text(function (){return formatNumber(d.data.values[1].value)})
      d3.selectAll(".totalUsersDate").transition()
        .text(function (){return parseDate(new Date(d.data.key))})

      UserTotal.append("rect")
        .attr("class", "hoverMarker")
        .attr("x", x(new Date(d.data.key)))
        .attr("y", 0)
        .attr("width", "2px")
        .attr("height", stackedHeight)
        .style("fill", "balck");
    }

    function totalUsersMouseOut(d, i) {
      d3.selectAll(".totalUsersLabel").transition()
        .text(function (){return formatNumber(userTotalData.children[userTotalData.children.length-1].categories[0].value)})
      // d3.selectAll(".NewUsersLabel").transition()
      //   .text(function (){return formatNumber(userTotalData.children[userTotalData.children.length-1].categories[0].value)})
      d3.selectAll(".totalUsersDate").transition()
        .text(function (){return parseDate(new Date(userTotalData.children[userTotalData.children.length-1].date))})
      d3.selectAll(".hoverMarker").remove()
    }

    // add the Y gridlines
    UserTotal.append("g")
      .attr("class", "grid")
      .call(make_y_gridlines()
        .tickSize(-stackedWidth)
        .tickFormat("")
      )

    // color palette
    var stackedColor = d3.scaleOrdinal()
      .domain(userGroupNames)
      .range([
      // "#a43034",
      "#d35634",
      "#e8806c",
      "#FFF"]);

    // Show the areas

    UserTotal.selectAll("mylayers")
      .data(stackedData)
      .enter()
      .append("path")
      .attr("class", function(d) {return '"' + stripPunctSpace(userGroupNames[d.key]) + '"'})
      .style("fill", function(d) {
        name = userGroupNames[d.key]; return stackedColor(name);
      })

      .attr("d", d3.area()
        .x(function(d, i) { return x(new Date(d.data.key)); })
        .y0(function(d) { return y(d[0]); })
        .y1(function(d) { return y(d[1]); })
      )

      .append("title")
      .text(function(d) {return userGroupNames[d.key]});


    UserTotal.selectAll("mylayers")
      .data(stackedData[0])
      .enter()
      .append("rect")
      .attr("x", function (d,i) {return x(new Date(d.data.key)) -10;})
      .attr("y", 0)
      .attr("height", stackedHeight + stackedHeight/10)
      .attr("width", function(d,i) {return stackedWidth/d.length})
      // .attr("r", stackedWidth/50)
      .style("fill", "white")
      .style("opacity", 0)
      .on("mouseover", totalUsersMouseOver)
      .on("mouseout", totalUsersMouseOut)
      .append("title")
      .text(function(d) {
        return parseDate(new Date(d.data.key)) + '\n' + "Total Number of Users: " + formatNumber(d[1])
      });


//LEGEND STUFF FOR CATEGORIES


    // UserTotal.selectAll("mylayers")
    //   .data(stackedData[0])
    //   .enter()
    //   .append("circle")
    //   .attr("cx", function (d,i) {return x(new Date(d.data.key));})
    //   .attr("cy", function (d,i) {return y(d[1]) -2})
    //   .attr("r", stackedWidth/50)
    //   .style("fill", "black")
    //   .style("opacity", 0)
    //   .append("title")
    //   .text(function(d) {
    //     return parseDate(new Date(d.data.key)) + '\n' + "Total Number of Users: " + formatNumber(d[1])
    //   });
    //
    // UserTotal.selectAll("mylayers")
    //   .data(stackedData)
    //   .enter()
    //   .append("path")
    //   .style("stroke", "black")
    //   .style("fill", "none")
    //   .style("stroke-width", function(d,i) {
    //     if (i == stackedData.length - 1) {return"2px" } else return "0px";
    //   })
    //   .attr("d", function(d) {return line(d)})

    var stackedLegenedScale = d3.scaleLinear()
      .domain([0, stackedData.length + 1])
      .range([width*-.5, width*.35])

    var size = Math.min(width,height)/30

    svg3.selectAll("mydots")
      .data(stackedData)
      .enter()
      .append("rect")
      .attr("x", function(d,i){ return  stackedLegenedScale(i + 1) + size*i + 1})
      .attr("y", height*.45) // 100 is where the first dot appears. 25 is the distance between dots
      .attr("width", size)
      .attr("height", size)
      .style("fill", function(d) { name = userGroupNames[d.key] ; return stackedColor(name) })
      .style("stroke", "black")
      .style("stroke-width", function(d) { name = userGroupNames[d.key] ; if (stackedColor(name) == "#FFF"){return "2px"} else {return "0px";} });

    svg3.selectAll("mylabels")
      .data(stackedData)
      .enter()
      .append("text")
      .attr("x", function(d,i){ return  stackedLegenedScale(i + 1) + (size) + size*i +10})
      .attr("y", height*.47)
      .text(function(d){return userGroupNames[d.key]})
      .attr("font-family", "Bryant Pro, sans-serif")
      .attr("font-weight", "400")
      .attr("font-size", "2vw")
      .attr("text-anchor", "start")
      .style("alignment-baseline", "middle")
      .style("font-size", "1.5vw");

    // svg3.append('rect')
    //   .attr("x", function(d,i){ return  stackedLegenedScale(0 )})
    //   .attr("y", height*.4 + size/2)
    //   .attr("width", width/30)
    //   .attr("height", width/360);
    //
    // svg3.append('circle')
    //   .attr("cx", function(d,i){ return  stackedLegenedScale(0 ) + width/60})
    //   .attr("cy", height*.4 + size/2 + width/720)
    //   .attr("r", stackedWidth/150)
    //
    // svg3.append('text')
    //   .attr("x", function(d,i){ return  stackedLegenedScale(0 ) + width/60})
    //   .attr("y", height*.47)
    //   .text("Total Users")
    //   .attr("text-anchor", "middle")
    //   .style("alignment-baseline", "middle")
    //   .style("font-size", "1.5vw");

    UserTotal.attr('transform', 'translate(' + width*-.425 + ',' + height*-.25 + ')');
  }

  //-------------------------------- 4 - Earn Activity

  function earnActivity(){

    ActionsTakenData = d3.hierarchy(earnActivityData);
    ActionsTakenData.sum(d => d.actions);
    PointsEarnedData = d3.hierarchy(earnActivityData);
    PointsEarnedData.sum(d => d.earned);


    const ActionsTakenColor = d3.scaleOrdinal().domain(ActionsTakenData)
      .range([
        "#fff",
        "#75c4b7",
        "#b1d381",
        "#e9bc57",
        "#e8806c",
        "#e26442",
        "#a43034",
        "#882458",
        "#be4f89",
        "#3b2b68",
        "#5065a1",
        "#4ba2ac",
        "#75c4b7",
        "grey"])


    function handleMouseOver(d, i) {
      let target = d3.select(d3.event.target);
      let fill = d3.color(target.style("fill"));
      d3.selectAll("." + stripPunctSpace(d.category)).transition()
        .style("fill-opacity", 1)
        .style("fill", fill.brighter())
      // d3.selectAll("." + stripPunctSpace(d.category)).transition()
      //   .style("opacity", .5);
      d3.selectAll(".ActionsTakenFigure")
        .text(formatNumber(d.actions));
      d3.selectAll(".PointsEarnedFigure")
        .text(formatNumber(d.earned));
      d3.selectAll(".ActionsTakenLabel")
        .text(d.category + " Actions Taken");
      d3.selectAll(".PointsEarnedLabel")
        .text(d.category + " Points Earned");
    }

    function handleMouseOut(d, i) {
      d3.selectAll("." + stripPunctSpace(d.category)).transition()
        .style('fill-opacity',  function(d) {  if (d.depth > 1) {return 0}})
        .style('fill', ActionsTakenColor(d.category));
      d3.selectAll(".ActionsTakenFigure")
        .text(formatNumber(ParentCategories.map(item => item.actions).reduce((prev, next) => prev + next)))
      d3.selectAll(".PointsEarnedFigure")
        .text(formatNumber(ParentCategories.map(item => item.earned).reduce((prev, next) => prev + next)))
      d3.selectAll(".ActionsTakenLabel")
        .text("Total Actions Taken");
      d3.selectAll(".PointsEarnedLabel")
        .text("Total Points Earned");
    }

    function EarnBreakdownSunburstColorFiller (d){
      if (d.category) {
        return ActionsTakenColor(d.category);}
      else if (d.depth > 1) {
        return ActionsTakenColor(d.parent.data.category)}
      else {
        return ActionsTakenColor(d.data.category)}
    }

    function handleEarnBreakdownMouseOver(d, i) {
      let target = d3.select(d3.event.target);
      let fill = d3.color(target.style("fill"));
      d3.selectAll("." + stripPunctSpace(d.data.category)).transition()
        .style("fill-opacity", 1)
        .style("fill", fill.brighter())
      d3.selectAll(".ActionsTakenFigure")
        .text( function() {if (hasChildren(d)) {return formatNumber(d.children.map(item => item.data.actions).reduce((prev, next) => prev + next))}
        else {return formatNumber(d.data.actions)}});
      d3.selectAll(".PointsEarnedFigure")
        .text( function() {if (hasChildren(d)) {return formatNumber(d.children.map(item => item.data.earned).reduce((prev, next) => prev + next))}
        else {return formatNumber(d.data.earned)}});
      d3.selectAll(".ActionsTakenLabel")
        .text(d.data.category + " Actions Taken");
      d3.selectAll(".PointsEarnedLabel")
        .text(d.data.category + " Points Earned");
    }

    function handleEarnBreakdownMouseOut(d, i) {

      d3.selectAll("." + stripPunctSpace(d.data.category)).transition()
        .style('fill-opacity',  function(d) {  if (d.depth > 1) {return 0}})
        .style('fill',  function(d) { if (d.depth > 1)
          {
            return ActionsTakenColor(d.parent.data.category)
          } else {
            if (d.data)
              {return ActionsTakenColor(d.data.category)}
            else
              {return ActionsTakenColor(d.category)}
          }
        })
      d3.selectAll(".ActionsTakenFigure")
        .text(function (d) { return formatNumber(ParentCategories.map(item => item.actions).reduce((prev, next) => prev + next))})
      d3.selectAll(".PointsEarnedFigure")
        .text(formatNumber(ParentCategories.map(item => item.earned).reduce((prev, next) => prev + next)))
      d3.selectAll(".ActionsTakenLabel")
        .text("Total Actions Taken");
      d3.selectAll(".PointsEarnedLabel")
        .text("Total Points Earned");
    }

    const svg4 = d3.select('#page4').append('svg')
      .attr('class', "page svg4")
      .style('width', '100vw')
      .style('height', '100vh')
      .attr('viewBox', `${-width / 2} ${-height / 2} ${width} ${height}`);

    PageNumberGenerator(svg4)


    const ActionsTaken = d3.select('.svg4')
      .attr('width', width)
      .attr('height', height)
      .append('g');

    const Earned = d3.select('.svg4')
      .attr('width', width/2)
      .attr('height', height/2)
      .append('g');

    const Legend = d3.select('.svg4')
      .attr('width', width/2)
      .attr('height', height/2)
      .append('g');

    const TotalBar = d3.select('.svg4')
      .attr('width', width/2)
      .attr('height', height/2)
      .append('g');

    const EarnActivity = d3.select('.svg4')
      .attr('width', width)
      .attr('height', height)
      .append('g');

    EarnActivity.append('text')
      .attr("x", width/-2 + width/30)
      .attr("y", height/-3)
      .text("EARN ACTIVITY")
      .style("text-anchor", "start")
      .attr("font-family", "Bryant Pro, sans-serif")
      .attr("font-weight", "500")
      .attr("font-size", "3vmin")
      .style('fill', '#646464');

    const ActionsSlice = ActionsTaken.selectAll('g.ActionsSlice')
      .data(partition(ActionsTakenData).descendants());

    ActionsSlice.exit().remove();

    const newActionsSlice = ActionsSlice.enter()
      .append('g').attr('class', 'ActionsSlice');

    newActionsSlice.append('title')

      .text(d => d.data.category + '\n' + formatNumber(d.value));

    newActionsSlice.append('path')
      .style('fill',  function(d) {if (d.depth > 1) {return ActionsTakenColor(d.parent.data.category);} else {return ActionsTakenColor(d.data.category)}})
      .style('fill-opacity', function(d) {if (d.depth > 1) {return 0} else {return 1}})
      .attr("display", function (d) {return d.depth ? null : "none"; })
      .attr('class', function (d) {return stripPunctSpace(d.data.category);})
      .attr('d', arc)
      .style("cursor", "default")
      .on("mouseover", handleEarnBreakdownMouseOver)
      .on("mouseout", handleEarnBreakdownMouseOut);

    EarnActivity.append('text')
      .attr("x", TotalBarWidth/-1.5)
      .attr("y", height/2.1)
      .text("Breakdown by Earn Actions")
      .style("text-anchor", "middle")
      .attr("font-family", "Bryant Pro, sans-serif")
      .attr("font-weight", "500")
      .attr("font-size", "1vw")
      .style('fill', 'black');



    const EarnedSlice = Earned.selectAll('g.EarnedSlice')
      .data(partition(PointsEarnedData).descendants());
    EarnedSlice.exit().remove();

    const newEarnedSlice = EarnedSlice.enter()
      .append('g').attr('class', 'EarnedSlice');

    newEarnedSlice.append('title')

      .text(d => d.data.category + '\n' + formatNumber(d.value));

    newEarnedSlice.append('path')
      .attr('class', 'main-arc')
      // .style('fill',  d => {if (d.depth>1){return "none"} else {while (d.depth > 1) d = d.parent; return ActionsTakenColor(d.data.category);}})
      .style('fill',  function(d) {if (d.depth > 1) {return ActionsTakenColor(d.parent.data.category);} else {return ActionsTakenColor(d.data.category)}})
      .attr("display", function (d) { return d.depth ? null : "none"; })
      .attr('class', function (d) { return stripPunctSpace(d.data.category);})
      .attr('d', arc)
      .on("mouseover", handleEarnBreakdownMouseOver)
      .on("mouseout", handleEarnBreakdownMouseOut);

    EarnActivity.append('text')
      .attr("x", TotalBarWidth/1.5)
      .attr("y", height/2.1)
      .text("Breakdown by Points Earned")
      .style("text-anchor", "middle")
      .attr("font-family", "Bryant Pro, sans-serif")
      .attr("font-weight", "500")
      .attr("font-size", "1vw")
      .style('fill', 'black');


    for (var i = 0; i < ActionsTakenData.data.children.length; i++) {
      if (ActionsTakenData.data.children[i].children){
        var ParentActions = ActionsTakenData.data.children[i].children.map(item => item.actions).reduce((prev, next) => prev + next)
        var ParentEarned = ActionsTakenData.data.children[i].children.map(item => item.earned).reduce((prev, next) => prev + next)
        ParentCategories.push({category:ActionsTakenData.data.children[i].category, actions:ParentActions, earned:ParentEarned})
      }
      else{ParentCategories.push(ActionsTakenData.data.children[i])
      }
    }

    const legend = Legend.selectAll('g.legend')
      .data(ParentCategories);
    legend.exit().remove();

    const newLegend = legend.enter()
      .append('g').attr('class', 'legend');

    var legendHeight = maxRadius*1.3;
    var barHeight = legendHeight/ParentCategories.length;

    newLegend.append('rect')
      .attr("x", width/-8)
      .attr("y", function(d, i) {
       		return (i * barHeight);
      })
      .attr("width", width/4)
      .attr("height", barHeight)
      .style('fill',  d => {return ActionsTakenColor(d.category)})
      .attr('class', function (d) {return stripPunctSpace(d.category);})
      .on("mouseover", handleMouseOver)
      .on("mouseout", handleMouseOut);

    newLegend.append('text')
      .attr("x", 0)
      .attr("y", function(d, i) {
        return barHeight /1.6 + (i * barHeight);
      })
      // .attr("dy", "0.7vmin")
      .text(d => {return d.category.toUpperCase()})
      .style("text-anchor", "middle")
      .attr("font-family", "Bryant Pro, sans-serif")
      .attr("font-weight", "Bold")
      .attr("font-size", "1.5vmin")
      .attr("dominant-baseline", "center")
      .style('fill', 'white')
      .on("mouseover", handleMouseOver)
      .on("mouseout", handleMouseOut);

    newLegend.append('title')

      .text(d => d.category + '\n' + "Actions: " + formatNumber(d.actions) + '\n' + "Points: " + formatNumber(d.earned) );

    TotalBar.append('rect')
      .attr("x", width/-2 + width/30)
      .attr("y", (height/-10) * 3)
      .attr("width", TotalBarWidth)
      .attr("height", TotalBarHeight)
      .style('fill', "grey");

    TotalBar.append('rect')
      .attr("x", 0)
      .attr("y", (height/-10) * 3)
      .attr("width", TotalBarWidth)
      .attr("height", TotalBarHeight)
      .style('fill', "#646464");

    TotalBar.append('text')
      .attr("x",  width/-2 + width/30 + TotalBarWidth/2 )
      .attr("y", (height/-5.5) - TotalBarHeight/4)
      .attr("class", "ActionsTakenLabel")
      .text("Total Actions Taken")
      .style("text-anchor", "middle")
      .attr("font-family", "museo-sans-rounded, sans-serif")
      .attr("font-weight", "300")
      .attr("font-size", "2.5vw")
      .style('fill', 'white');

    TotalBar.append('text')
      .attr("x",  width/-2 + width/30 + TotalBarWidth/2  )
      .attr("y", (height/-20) - TotalBarHeight/2)
      .attr("class", "ActionsTakenFigure")
      .text(formatNumber(ParentCategories.map(item => item.actions).reduce((prev, next) => prev + next)))
      .style("text-anchor", "middle")
      .attr("font-family", "museo-sans-rounded, sans-serif")
      .attr("font-weight", "900")
      .attr("font-size", "8vmin")
      .style('fill', 'white');


    TotalBar.append('text')
      .attr("x",  0 + TotalBarWidth/2 )
      .attr("y", (height/-5.5) - TotalBarHeight/4)
      .attr("class", "PointsEarnedLabel")
      .text("Total PIPs Earned")
      .style("text-anchor", "middle")
      .attr("font-family", "museo-sans-rounded, sans-serif")
      .attr("font-weight", "300")
      .attr("font-size", "2.5vw")
      .style('fill', 'white');

    TotalBar.append('text')
      .attr("x",  0 + TotalBarWidth/2 )
      .attr("y", (height/-20) - TotalBarHeight/2)
      .attr("class", "PointsEarnedFigure")
      .text(formatNumber(ParentCategories.map(item => item.earned).reduce((prev, next) => prev + next)))
      .style("text-anchor", "middle")
      .attr("font-family", "museo-sans-rounded, sans-serif")
      .attr("font-weight", "900")
      .attr("font-size", "8vmin")
      .style('fill', 'white');

    newLegend.attr('transform', 'translate(' + 0 + ',' + (maxRadius*.5 - legendHeight/2)  + ')');
    ActionsTaken.attr('transform', 'translate(' + (TotalBarWidth*-1 + maxRadius*.7 ) + ',' + maxRadius*.5 + ')');
    Earned.attr('transform', 'translate('  + (TotalBarWidth*1 - maxRadius*.7 ) + ',' + maxRadius*.5 + ')');
  }

  //----------------------- 5 Earn Activity 2 Actions Over time

  function actionsOverTime(){
    const svg5 = d3.select('#page5').append('svg')
      .attr('class', "page svg5")
      .style('width', '100vw')
      .style('height', '100vh')
      .attr('viewBox', `${-width / 2} ${-height / 2} ${width} ${height}`);

    const EarnActivity2 = d3.select('.svg5')
      .attr('width', width)
      .attr('height', height)
      .append('g');

    svg5.append('text')
      .attr("x", width/-2 + width/30)
      .attr("y", height/-3)
      .text("EARN ACTIVITY")
      .style("text-anchor", "start")
      .attr("font-family", "Bryant Pro, sans-serif")
      .attr("font-weight", "500")
      .attr("font-size", "3vmin")
      .style('fill', '#71bf93');

    svg5.append('text')
      .attr("x", width/-2 + width/30)
      .attr("y", height/-4)
      .text("Actions Taken Over Time")
      .style("text-anchor", "left")
      .attr("font-family", "Bryant Pro, sans-serif")
      .attr("font-weight", "Bold")
      .attr("font-size", "3vmin")
      .style('fill', '#71bf93');

    PageNumberGenerator(svg5)


    function checkIfValuesExist(object) {
      if (object.hasOwnProperty("actions") && object.hasOwnProperty("name"))
      {return true}
      else {return false}
    }

    var actionsOverTimeDataVerbose = []

    if (actionsOverTimeData.hasOwnProperty("children")){
      for (var i = 0; i < actionsOverTimeData.children.length; i++) {
        currentActionsTakenDatum = actionsOverTimeData.children[i];
        currentActionsTakenDate = currentActionsTakenDatum.name;

        if (checkIfValuesExist(currentActionsTakenDatum)){
          actionsTakenVerboseDatum = {"date": currentActionsTakenDate, "name": currentActionsTakenDatum.name, "value": currentActionsTakenDatum.actions};
          actionsOverTimeDataVerbose.push(actionsTakenVerboseDatum);
        };

        if (currentActionsTakenDatum.hasOwnProperty("children")){
          for (var j = 0; j < currentActionsTakenDatum.children.length; j++) {
            currentActionsTakenDatumChildren = currentActionsTakenDatum.children[j];

            if (checkIfValuesExist(currentActionsTakenDatumChildren)){
              actionsTakenVerboseDatum = {"date": currentActionsTakenDate, "name": currentActionsTakenDatumChildren.name, "value": currentActionsTakenDatumChildren.actions};
              actionsOverTimeDataVerbose.push(actionsTakenVerboseDatum);
            };

            if (currentActionsTakenDatumChildren.hasOwnProperty("children")){
              for (var k = 0; k < currentActionsTakenDatumChildren.children.length; k++) {
                currentActionsTakenDatumSubChildren = currentActionsTakenDatumChildren.children[k];

                if (checkIfValuesExist(currentActionsTakenDatumSubChildren)){
                  actionsTakenVerboseDatum = {"date": currentActionsTakenDate, "name": currentActionsTakenDatumSubChildren.name, "value": currentActionsTakenDatumSubChildren.actions};
                  actionsOverTimeDataVerbose.push(actionsTakenVerboseDatum);
                }
              }
            }
          }
        }
      }
    }

    // group the data: one array for each value of the X axis.
    var actionsOverTimeSumStat = d3.nest()
      .key(function(d) { return d.date;})
      .entries(actionsOverTimeDataVerbose);


    var actionsOverTimeStackCategories = [] // list of group names
    var actionsOverTimeStackOrder = []

    for (var i = 0; i < actionsOverTimeSumStat[0].values.length; i++) {
      actionsOverTimeStackCategories.push(actionsOverTimeSumStat[0].values[i].name)
      actionsOverTimeStackOrder.push(i)
    }

    var actionsOverTimeStackOrder = actionsOverTimeStackOrder.reverse();

    var actionsOverTimeStackedData = d3.stack()
      .keys(actionsOverTimeStackOrder)
      .value(function(d, key){
        return d.values[key].value
      })
      (actionsOverTimeSumStat)

    var actionsStackedWidth = width*.5;
    var actionsStackedHeight = height*.65;

    // Add X axis --> it is a date format
    var actionsOverTimex = d3.scaleTime()
      .domain(d3.extent(actionsOverTimeDataVerbose, function(d) {return new Date(d.date); }))
      .range([ 0, actionsStackedWidth]);

    EarnActivity2.append("g")
      .attr("transform", "translate(0," + actionsStackedHeight + ")")
      .attr("class", "axis")
      .call(d3.axisBottom(actionsOverTimex)
      .tickFormat(d3.utcFormat("%b %y"))
      .tickValues(actionsOverTimex.ticks().concat(actionsOverTimex.domain())));


    var maxDateVal = d3.max(actionsOverTimeSumStat, function(d){
      var vals = d3.keys(d).map(function(key){ return key !== 'date' ? d[key] : 0 });
      return d3.sum(vals[1].map(function(d){return d.value}));
    });

    // Add Y axis
    var actionsOverTimey = d3.scaleLinear()
      .domain([0, maxDateVal])
      .range([ actionsStackedHeight, 0 ]);

    EarnActivity2.append("g")
      .attr("class", "axis")
      .call(d3.axisLeft(actionsOverTimey));

    // color palette
    var actionsOverTimeColor = d3.scaleOrdinal()
      .domain(actionsOverTimeStackCategories)
      .range([
      "#75c4b7",
      "#b1d381",
      "#e9bc57",
      "#e8806c",
      "#e26442",
      "#a43034",
      "#882458",
      "#be4f89",
      "#3b2b68",
      "#5065a1",
      "#4ba2ac",
      "#75c4b7",
      "grey"])

    // Show the areas
    EarnActivity2.selectAll("mylayers2")
      .data(actionsOverTimeStackedData)
      .enter()
      .append("path")
      // .attr("class", function(d) {return actionsOverTimeStackCategories[d.key].replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"").replace(/\s+/g, '') })
      .attr("class", function(d) {return stripPunctSpace(actionsOverTimeStackCategories[d.key])})
      .style("fill", function(d) { name = actionsOverTimeStackCategories[d.key] ; if (name.includes(' - ')){return actionsOverTimeColor(name.split(' - ')[0])} else {return actionsOverTimeColor(name);} })
      .attr("d", d3.area()
        .x(function(d, i) { return actionsOverTimex(new Date(d.data.key))})
        .y0(function(d) { return actionsOverTimey(d[0]); })
        .y1(function(d) { return actionsOverTimey(d[1]); })
      )
      .append("title")
      .text(function(d) {return actionsOverTimeStackCategories[d.key]});

    // Add one dot in the legend for each name.
    var actionsOverTimeLegendBarHeight = stackedHeight/actionsOverTimeStackCategories.length;

    svg5.selectAll("mydots")
      .data(actionsOverTimeStackCategories)
      .enter()
      .append("rect")
      .attr('class', function (d) { return stripPunctSpace(d);})
      .attr("x", width/6)
      .attr("y", function(d,i){ return height*-.2 + i*(actionsOverTimeLegendBarHeight)}) // 100 is where the first dot appears. 25 is the distance between dots
      .attr("width", width/4)
      .attr("height", stackedHeight/actionsOverTimeStackCategories.length)
      .style("fill", function(d) {if (d.includes(' - ')){
        return actionsOverTimeColor(d.split(' - ')[0])} else {return actionsOverTimeColor(d);}
      })
      .on("mouseover", actionsTakenOverTimeMouseOver)
      .on("mouseout", actionsTakenOverTimeMouseOut);

    // Add one dot in the legend for each name.
    svg5.selectAll("mylabels2")
      .data(actionsOverTimeStackCategories)
      .enter()
      .append("text")
      .attr("x", width/6 + width/8)
      .attr("y", function(d,i){ return height*-.2 + i*(actionsOverTimeLegendBarHeight) + ((actionsOverTimeLegendBarHeight)/1.5)}) // 100 is where the first dot appears. 25 is the distance between dots
      .text(function(d){ return d})
      .attr('class', function (d) { return stripPunctSpace(d);})
      .style("fill", "white")
      .attr("text-anchor", "middle")
      .attr("font-family", "Bryant Pro, sans-serif")
      .attr("font-weight", "Bold")
      .attr("font-size", "1.5vmin")
      .on("mouseover", actionsTakenOverTimeMouseOver)
      .on("mouseout", actionsTakenOverTimeMouseOut);

    EarnActivity2.attr('transform', 'translate(' + width*-.4 + ',' + height*-.2 + ')');

  }

  //------------------ 6 Use Activity

  function useActivity() {
    const svg6 = d3.select('#page6').append('svg')
      .attr('class', "page svg6")
      .style('width', '100vw')
      .style('height', '100vh')
      .attr('viewBox', `${-width / 2} ${-height / 2} ${width} ${height}`);

    svg6.append('text')
      .attr("x", width/-2 + width/30)
      .attr("y", height/-3)
      .text("USE ACTIVITY")
      .style("text-anchor", "start")
      .attr("font-family", "Bryant Pro, sans-serif")
      .attr("font-weight", "500")
      .attr("font-size", "3vmin")
      .style('fill', '#58bbc0');

    PageNumberGenerator(svg6)


    UseTotalBar = d3.select('.svg6')
      .attr('width', width/2)
      .attr('height', height/2)
      .append('g');

    UseTotalBar.append('rect')
      .attr("x", width/-2 + width/30)
      .attr("y", (height/-10) * 3)
      .attr("width", TotalBarWidth)
      .attr("height", TotalBarHeight)
      .style('fill', "#58bbc0");

    UseTotalBar.append('rect')
      .attr("x", 0)
      .attr("y", (height/-10) * 3)
      .attr("width", TotalBarWidth)
      .attr("height", TotalBarHeight)
      .style('fill', "#5065a1");

    var UseParentCategories = [];


    for (var i = 0; i < useActivityData.children.length; i++) {
      if (useActivityData.children[i].children){
        var UseParentActions = useActivityData.children[i].children.map(item => item.actions).reduce((prev, next) => prev + next)
        var UseParentPIPs = useActivityData.children[i].children.map(item => item.used).reduce((prev, next) => prev + next)
        UseParentCategories.push({category:useActivityData.children[i].category.toUpperCase(), actions: UseParentActions, used: UseParentPIPs})
      }
      else{UseParentCategories.push(useActivityData.children[i])
      }
    }

    var UseActionsTotal = UseParentCategories.map(item => item.actions).reduce((prev, next) => prev + next);
    var UsePIPsTotal = UseParentCategories.map(item => item.used).reduce((prev, next) => prev + next);
    UseParentCategories.unshift({category: "ALL USE ACTIVITY", actions: UseActionsTotal, used: UsePIPsTotal, depth: 0});

    var originalColor
    var highlightColor

    function handleUseMouseOver(d, i) {
      let target = d3.select(d3.event.target);
      let fill = d3.color(target.style("fill"));
      d3.selectAll("." + stripPunctSpace(d.category).toUpperCase()).transition()
        .style("fill", fill.brighter())
      d3.selectAll(".UseActionsLabel")
        .text(formatNumber(d.actions));
      d3.selectAll(".UsePIPsLabel")
        .text(formatNumber(d.used));
      d3.selectAll(".UsePIPsCategory")
        .text(function() {if (d.category == "ALL USE ACTIVITY") {return "Total Points Used"} else {return (d.category) + " Points Used"}});
      d3.selectAll(".UseActionsCategory")
        .text(function() {if (d.category == "ALL USE ACTIVITY") {return "Total Actions Taken"} else {return (d.category) + " Actions Taken"}});
    }

    function handleUseMouseOut(d, i) {
      d3.selectAll("." + stripPunctSpace(d.category).toUpperCase()).transition()
        .style("fill", function(d,i){
          if (d.hasOwnProperty('data')) {
            return useActivityColor(d.data.category.split(" ")[0].toUpperCase() + d.depth)}
          else{
              if (d.category.split(" ")[0].toUpperCase() == "ALL"){
                return useActivityColor("ALL0")
              } else {
                return useActivityColor(d.category.split(" ")[0].toUpperCase() + "1")
              }}})
      d3.selectAll(".UsePIPsLabel")
        .text(formatNumber(UsePIPsTotal))
      d3.selectAll(".UseActionsLabel")
        .text(formatNumber(UseActionsTotal));
      d3.selectAll(".UseActionsCategory")
        .text("Total Actions Taken")
        .style("text-transform", "capitalize");
      d3.selectAll(".UsePIPsCategory")
        .text("Total Points Used")
        .style("text-transform", "capitalize");
    }

    function handleUseTreeMouseover(d, i) {
      let target = d3.select(d3.event.target);
      let fill = d3.color(target.style("fill"));
      d3.selectAll("." + stripPunctSpace(d.data.category).toUpperCase()).transition()
        .style("fill", fill.brighter())
      d3.selectAll(".UseActionsLabel")
        .text(formatNumber(d.data.actions));
      d3.selectAll(".UsePIPsLabel")
        .text(formatNumber(d.data.used));
      d3.selectAll(".UsePIPsCategory")
        .text(function() {return (d.data.category) + " Points Used"});
      d3.selectAll(".UseActionsCategory")
        .text(function() {return (d.data.category) + " Actions Taken"});
    }

    function handleUseTreeMouseOut(d, i) {
      d3.selectAll("." + stripPunctSpace(d.data.category).toUpperCase()).transition()
        .style("fill", function(d,i){
          if (d.hasOwnProperty('data')) {
            return useActivityColor(d.data.category.split(" ")[0].toUpperCase() + d.depth)}
          else{
              if (d.category.split(" ")[0].toUpperCase() == "ALL"){
                return useActivityColor("ALL0")
              } else {
                return useActivityColor(d.category.split(" ")[0].toUpperCase() + "1")
              }}})
      d3.selectAll(".UsePIPsLabel")
        .text(formatNumber(UsePIPsTotal))
      d3.selectAll(".UseActionsLabel")
        .text(formatNumber(UseActionsTotal));
      d3.selectAll(".UseActionsCategory")
        .text("Total Actions Taken");
      d3.selectAll(".UsePIPsCategory")
        .text("Total Points Used");

    }

    UseTotalBar.append('text')
      .attr("x",  width/-2 + width/30 + TotalBarWidth/2  )
      .attr("y", (height/-10) - TotalBarHeight/4)
      .attr("class","UseActionsLabel")
      .text(formatNumber(UseActionsTotal))
      .style("text-anchor", "middle")
      .attr("font-family", "museo-sans-rounded, sans-serif")
      .attr("font-weight", "900")
      .attr("font-size", "8vmin")
      .style('fill', 'white');


    UseTotalBar.append('text')
      .attr("x",  width/-2 + width/30 + TotalBarWidth/2 )
      .attr("y", (height/-10) - TotalBarHeight/1.5)
      .attr("class", "UseActionsCategory")
      .text("Total Use Actions")
      .style("text-anchor", "middle")
      .attr("font-family", "museo-sans-rounded, sans-serif")
      .attr("font-weight", "300")
      .attr("font-size", "2.5vw")
      .style('fill', 'white');

    UseTotalBar.append('text')
      .attr("x",  0 + TotalBarWidth/2 )
      .attr("y", (height/-10) - TotalBarHeight/4)
      .text(formatNumber(UsePIPsTotal))
      .attr("class","UsePIPsLabel")
      .style("text-anchor", "middle")
      .attr("font-family", "museo-sans-rounded, sans-serif")
      .attr("font-weight", "900")
      .attr("font-size", "8vmin")
      .style('fill', 'white');

    UseTotalBar.append('text')
      .attr("x",  0 + TotalBarWidth/2 )
      .attr("y", (height/-10) - TotalBarHeight/1.5)
      .attr("class", "UsePIPsCategory")
      .text("Total PIPs Used")
      .style("text-anchor", "middle")
      .attr("font-family", "museo-sans-rounded, sans-serif")
      .attr("font-weight", "300")
      .attr("font-size", "2.5vw")
      .style('fill', 'white');


    svg6.append('text')
      .attr("x", TotalBarWidth/-1.5)
      .attr("y", height/2.1)
      .text("Breakdown by Use Actions")
      .style("text-anchor", "middle")
      .attr("font-family", "Bryant Pro, sans-serif")
      .attr("font-weight", "500")
      .attr("font-size", "1vw")
      .style('fill', 'black');

    svg6.append('text')
      .attr("x", TotalBarWidth/1.5)
      .attr("y",height/2.1)
      .text("Breakdown by Points Used")
      .style("text-anchor", "middle")
      .attr("font-family", "Bryant Pro, sans-serif")
      .attr("font-weight", "500")
      .attr("font-size", "1vw")
      .style('fill', 'black');

    UseBreakdown = d3.select('.svg6')
      .attr('width', width/2)
      .attr('height', height/2)
      .append('g');

    const useTreemap = d3.treemap()
      .size([maxRadius*1.45, maxRadius*1.4500001])
      .paddingOuter(3)
      .paddingInner(3)
      .round(true);

    useTreemap(useActivityActionsData);


    useActivityActionCategories = ["ALL0"];

    for (var i = 0; i < useActivityActionsData.data.children.length; i++) {
      if(useActivityActionsData.data.children[i].hasOwnProperty("categories"))
      {

      useActivityActionCategories.push(useActivityActionsData.data.children[i].category.split(" ")[0].toUpperCase() + 1)
      useActivityActionCategories.push(useActivityActionsData.data.children[i].category.split(" ")[0].toUpperCase() + 2)
      }
      else {
        useActivityActionCategories.push(useActivityActionsData.data.children[i].category.split(" ")[0].toUpperCase() + 1)}
      }

    var useActivityColor = d3.scaleOrdinal().domain(useActivityActionCategories)
      .range([
      "grey",
      "#e9bc56",
      "#b1d280",
      "#49a26d",
      "#e46542",
      "#e8806c",
      "#c04f8a"
      ]);

    var useActivityCell = UseBreakdown
      .selectAll(".node")
      .data(useActivityActionsData.descendants())
      .enter().append("g")
        .attr("transform", function(d) { return "translate(" + d.x0 + "," + d.y0 + ")"; })
        .attr("class", "node")
        .on("mouseover", handleUseTreeMouseover)
        .on("mouseout", handleUseTreeMouseOut)
        .attr("value", function(d) {return d.actions})
        .each(function(d) { d.node = this; });


    var UseTreemapSize;


    useActivityCell.append("rect")
      .attr("class", function(d) {return "ALLUSEACTIONS" + " "+ "useActivity " + d.data.category.split(" ")[0].toUpperCase() + " " + stripPunctSpace(d.data.category).toUpperCase(); })
      .attr("width", function(d, i) {if (i == 0) {UseTreemapSize = d.x1 - d.x0};  return d.x1 - d.x0; })
      .attr("height", function(d) { return d.y1 - d.y0; })
      .style("fill", function(d,i) {
       return useActivityColor(d.data.category.split(" ")[0].toUpperCase() + d.depth); });

    useActivityCell.append("clipPath")
      .attr("id", function(d) { return "clip-" + d.data.category.toUpperCase(); })
      .append("use")
      .attr("xlink:href", function(d) { return "#rect-" + d.data.category.toUpperCase() + ""; });

    useActivityCell.append("title")
      .text(function(d) { return d.data.category + "\n" + formatNumber(d.value); });

    UseBreakdown.attr('transform', 'translate('+ ((width/-2) + (width/30) + 0) + ',' + height/-15 + ')');

    PIPsBreakdown = d3.select('.svg6')
      .attr('width', width/2)
      .attr('height', height/2)
      .append('g');

    useTreemap(useActivityPIPsData);

    var usePIPsCell = PIPsBreakdown
      .selectAll(".node")
      .data(useActivityPIPsData.descendants())
      .enter().append("g")
      .attr("transform", function(d) { return "translate(" + d.x0 + "," + d.y0 + ")"; })
      .attr("class", "node")
      .on("mouseover", handleUseTreeMouseover)
      .on("mouseout", handleUseTreeMouseOut)
      .attr("value", function(d) {return d.value})
      .each(function(d) { d.node = this; });

    usePIPsCell.append("rect")
      .attr("class", function(d) { return "ALLUSEACTIONS" + " " + "usePIPs " + d.data.category.split(" ")[0].toUpperCase() + " " + stripPunctSpace(d.data.category).toUpperCase(); })
      .attr("width", function(d, i) {if (i == 0) {UseTreemapSize = d.x1 - d.x0};  return d.x1 - d.x0; })
      .attr("height", function(d) { return d.y1 - d.y0; })
      .style("fill", function(d,i) {
        // return useActivityColor(d.data.name.split(" ")[0] + d.depth); });
        return useActivityColor(d.data.category.split(" ")[0].toUpperCase() + d.depth); });

    usePIPsCell.append("clipPath")
      .attr("id", function(d) { return "clip-" + d.data.category.toUpperCase(); })
      .append("use")
      .attr("xlink:href", function(d) { return "#rect-" + d.data.category.toUpperCase() + ""; });

    usePIPsCell.append("title")
      .text(function(d) { return d.data.category.toUpperCase() + "\n" + formatNumber(d.value); });

    PIPsBreakdown.attr('transform', 'translate('+ ((width/2) - (width/30) - UseTreemapSize) + ',' + height/-15 + ')');

    UseLegend = d3.select('.svg6')
      .attr('width', width/2)
      .attr('height', height/2)
      .append('g');


    const useLegend = UseLegend.selectAll('g.useLegend')
      .data(UseParentCategories);
    useLegend.exit().remove();

    const newUseLegend = useLegend.enter()
      .append('g')
      .attr('class', 'useLegend');

    var useLegendHeight = UseTreemapSize;
    var useLegendBarHeight = useLegendHeight/UseParentCategories.length;

    newUseLegend.append('rect')
      .attr("x", width/-8)
      .attr("y", function(d, i) {
       		return (i * useLegendBarHeight);
      })
      .attr("width", width/4)
      .attr("height", useLegendBarHeight)
      .style('fill',  d => {
        // return useActivityColor(d.name)
        if (d.category.split(" ")[0].toUpperCase() == "ALL"){return useActivityColor("ALL0")}
        else{
        return useActivityColor(d.category.split(" ")[0].toUpperCase() + 1);
      }
      })
      .attr('class', function (d) { return stripPunctSpace(d.category).toUpperCase()})
      .on("mouseover", handleUseMouseOver)
      .on("mouseout", handleUseMouseOut);

    newUseLegend.append('text')
      .attr("x", 0)
      .attr("y", function(d, i) {
        return useLegendBarHeight /2 + (i * useLegendBarHeight);
      })
      // .attr("dy", ".7vmin")
      .text(d => {return d.category.toUpperCase()})
      .style("text-anchor", "middle")
      .attr("font-family", "Bryant Pro, sans-serif")
      .attr("font-weight", "Bold")
      .attr("font-size", "1.5vmin")
      .attr("pointer-events", "none")
      .style('fill', 'white')
      .on("mouseover", handleUseMouseOver)
      .on("mouseout", handleUseMouseOut);

    newUseLegend.append('title')

      .text(d => d.category + '\n' + "Actions: " + formatNumber(d.actions) + '\n' + "PIPs: " + formatNumber(d.used) );

    newUseLegend.attr('transform', 'translate(' + 0 + ',' + ( height/-15)  + ')');

  }

  //--------------- 7 Impact - Environment


  function environment(){

      const EnvironmentTotalActions =  environmentData.children.map(item => item.actions).reduce((prev, next) => prev + next);
      const EnvironmentTotalSaved =  environmentData.children.map(item => item.saved).reduce((prev, next) => prev + next);
      const TreeEquivalents = Math.round(EnvironmentTotalSaved/48);

      var EnvironmentBarSections = 3
      // var EnvironmentBarSections = environmentData.children.length;
      var EnvironmentTotalBarWidth = (width/EnvironmentBarSections) - (width/180);
      var EnvironmentTotalBarHeight = Math.round(height*.2);
      var EnvironmentTotalBarY = height*-.23;
      var EnvironmentTotalBarTextY1 = Math.round(TotalBarHeight*.8);
      var EnvironmentTotalBarTextY2 = Math.round(TotalBarHeight*.5);



    const svg7 = d3.select('#page7').append('svg')
      .attr('class', "page svg7")
      .style('width', '100vw')
      .style('height', '100vh')
      .attr('viewBox', `${-width / 2} ${-height / 2} ${width} ${height}`);

    svg7.append('text')
      .attr("x", width/-2 + width/30)
      .attr("y", height/-3)
      .text("IMPACT")
      .style("text-anchor", "start")
      .attr("font-family", "Bryant Pro, sans-serif")
      .attr("font-weight", "500")
      .attr("font-size", "3vmin")
      .style('fill', '#efa73a');

    svg7.append('text')
      .attr("x", width/-2 + width/30)
      .attr("y", height/-3.8)
      .text("ENVIRONMENT")
      .style("text-anchor", "left")
      .attr("font-family", "Bryant Pro, sans-serif")
      .attr("font-weight", 500)
      .attr("font-size", "2.5vmin")
      .style('fill', '#efa73a');

    PageNumberGenerator(svg7);


    var EnvironmentTotalBarScaler = d3.scaleLinear()
      .domain([0,EnvironmentBarSections])
      .range([width/-2 + width/30,  width/2 - width/30]);


    var EnvironmentTotalBarColor = d3.scaleLinear()
      .domain([1,EnvironmentBarSections])
      .range([d3.rgb("#49a26d"), d3.rgb('#b1d381')]);


    EnvironmentTotalBar = d3.select('.svg7')
      .attr('width', width/2)
      .attr('height', height/2)
      .append('g');

    environmentTotalBarData = [{"name": "Total Carbon Reduction Actions", "value": EnvironmentTotalActions},{"name" : "Tree Equivalents", "value": TreeEquivalents}, {"name" : "Total lbs Carbon Saved", "value" : EnvironmentTotalSaved}]

    const environmentTotalBar = EnvironmentTotalBar.selectAll('g.environmentTotalBar')
        .data(environmentTotalBarData);
    EnvironmentTotalBar.exit().remove();

    const newEnvironmentTotalBar = environmentTotalBar.enter()
      .append('g').attr('class', 'environmentTotalBar');


    newEnvironmentTotalBar.append('rect')
      .attr("x", function(d, i){return EnvironmentTotalBarScaler(i)})
      .attr("y", EnvironmentTotalBarY)
      .attr("width", EnvironmentTotalBarWidth)
      .attr("height", EnvironmentTotalBarHeight)
      .style('fill',  function(d,i) {return EnvironmentTotalBarColor(i)})
      .attr('class', function (d) { return stripPunctSpace(d.name)});

    newEnvironmentTotalBar.append('text')
      .attr("x", function(d, i){if (i==0) {return EnvironmentTotalBarScaler(i) + EnvironmentTotalBarWidth/2.08} else {return EnvironmentTotalBarScaler(i) + EnvironmentTotalBarWidth/2}})
      .attr("y", function(d, i) {
        return EnvironmentTotalBarY + EnvironmentTotalBarHeight*.3;
      })
      .attr("dy", ".7vmin")
      .attr("class", function(d) {return stripPunctSpace(d.name) +"Label"})
      .text(d => {return d.name})
      .style("text-anchor", "middle")
      .attr("font-family", "museo-sans-rounded, sans-serif")
      .attr("font-weight", "300")
      .attr("font-size", "1.8vw")
      .style('fill', 'white');

    newEnvironmentTotalBar.append('text')
      .attr("x", function(d, i){return EnvironmentTotalBarScaler(i) + EnvironmentTotalBarWidth/2})
      .attr("y", function(d, i) {
        return EnvironmentTotalBarY + EnvironmentTotalBarHeight*.7;
      })
      .attr("dy", ".7vmin")
      .attr("class", function(d) {return stripPunctSpace(d.name) +"Figure"})
      .text(d => {return formatNumber(d.value)})
      .style("text-anchor", "middle")
      .attr("font-family", "museo-sans-rounded, sans-serif")
      .attr("font-weight", "900")
      .attr("font-size", 20/EnvironmentBarSections + "vmin")
      .style('fill', 'white');



    var EnvironmentLegendBarWidth = width/4;
    var EnvironmentTotalBarHeight = Math.round(height*.2);
    var EnvironmentTotalBarY = 0;
    var EnvironmentTotalBarTextY1 = Math.round(TotalBarHeight*.8);
    var EnvironmentTotalBarTextY2 = Math.round(TotalBarHeight*.5);

    function handleEnvironmentMouseOver(d, i) {
      d3.selectAll("." + stripPunctSpace(d.category)).transition()
        .style("opacity", .5);
      d3.selectAll(".TotalCarbonReductionActionsFigure")
        .text(formatNumber(d.actions));
      d3.selectAll(".TotallbsCarbonSavedFigure")
        .text(formatNumber(d.saved));
      d3.selectAll(".TotalCarbonReductionActionsLabel")
        .text(d.category + " Actions Taken");
      d3.selectAll(".TotallbsCarbonSavedLabel")
        .text("lbs Carbon Saved " + d.category);
      d3.selectAll(".TreeEquivalentsFigure")
        .text(formatNumber(Math.round(d.saved/48)));
    }

    function handleEnvironmentMouseOut(d, i) {
      d3.selectAll("." + stripPunctSpace(d.category)).transition()
        .style("opacity", 1);
      d3.selectAll(".TotalCarbonReductionActionsFigure")
        .text(formatNumber(EnvironmentTotalActions));
      d3.selectAll(".TotallbsCarbonSavedFigure")
        .text(formatNumber(EnvironmentTotalSaved));
      d3.selectAll(".TotalCarbonReductionActionsLabel")
        .text("Total Actions Taken");
      d3.selectAll(".TotallbsCarbonSavedLabel")
        .text("Total lbs Carbon Saved");
      d3.selectAll(".TreeEquivalentsFigure")
        .text(formatNumber(TreeEquivalents));
    }
    function handleEnvironmentBreakdownMouseOver(d, i) {
      d3.selectAll("." + stripPunctSpace(d.data.category)).transition()
        .style("opacity", .5);
      d3.selectAll(".TotalCarbonReductionActionsFigure")
        .text(formatNumber(d.data.actions));
      d3.selectAll(".TotallbsCarbonSavedFigure")
        .text(formatNumber(d.data.saved));
      d3.selectAll(".TotalCarbonReductionActionsLabel")
        .text(d.data.category + " Actions Taken");
      d3.selectAll(".TotallbsCarbonSavedLabel")
        .text("lbs Carbon Saved " + d.data.category);
      d3.selectAll(".TreeEquivalentsFigure")
        .text(formatNumber(Math.round(d.data.saved/48)));
    }

    function handleEnvironmentBreakdownMouseOut(d, i) {
      d3.selectAll("." + stripPunctSpace(d.data.category)).transition()
        .style("opacity", 1);
      d3.selectAll(".TotalCarbonReductionActionsFigure")
        .text(formatNumber(EnvironmentTotalActions));
      d3.selectAll(".TotallbsCarbonSavedFigure")
        .text(formatNumber(EnvironmentTotalSaved));
      d3.selectAll(".TotalCarbonReductionActionsLabel")
        .text("Total Actions Taken");
      d3.selectAll(".TotallbsCarbonSavedLabel")
        .text("Total lbs Carbon Saved");
      d3.selectAll(".TreeEquivalentsFigure")
        .text(formatNumber(TreeEquivalents));
    }


    const EnvironmentBreakdown = d3.select('.svg7')
      .attr('width', width)
      .attr('height', height)
      .append('g');

    var environmentActionsBreakdownPie = EnvironmentBreakdown.selectAll(".environmentActionsArc")
      .data(actionsPie(environmentData.children))
      .enter().append("g")
      .attr("class", "environmentActionsArc");


    environmentActionsBreakdownPie.append('text')
      .attr("x",0 )
      .attr("y",EnvironmentTotalBarHeight*1.28)
      .text("Actions Taken Breakdown")
      .style("text-anchor", "middle")
      .attr("font-family", "Bryant Pro, sans-serif")
      .attr("font-weight", "400")
      .attr("font-size", "1vw")
      .style('fill', 'black');

    environmentActionsBreakdownPie.append('text')
      .attr("x", TotalBarWidth*1.35)
      .attr("y",EnvironmentTotalBarHeight*1.28)
      .text("Carbon Saved Breakdown")
      .style("text-anchor", "middle")
      .attr("font-family", "Bryant Pro, sans-serif")
      .attr("font-weight", "400")
      .attr("font-size", "1vw")
      .style('fill', 'black');

    environmentActionsBreakdownPie.append("path")
      .attr("d", environmentArc)
      .attr("class", function(d) {return stripPunctSpace(d.data.category)})
      .style("fill", function(d, i) { return environmentBreakdownColor(i); })
      .style("stroke", "white")
      .style("stroke-width", "1px")
      .on("mouseover", handleEnvironmentBreakdownMouseOver)
      .on("mouseout", handleEnvironmentBreakdownMouseOut)
      .append("title")
      .data(environmentData.children)
      .text(function(d){return d.category + '\n' + 'Actions: ' + formatNumber(d.actions) })

    var environmentSavedBreakdownPie = EnvironmentBreakdown.selectAll(".environmentSavedArc")
      .data(savedPie(environmentData.children))
      .enter().append("g")
      .attr("class", "environmentSavedArc");

    environmentSavedBreakdownPie.append("path")
      .attr("d", environmentArc)
      .attr("class", function(d) {return stripPunctSpace(d.data.category)})
      .style("fill", function(d, i) { return environmentBreakdownColor(i); })
      .style("stroke", "white")
      .style("stroke-width", "1px")
      .on("mouseover", handleEnvironmentBreakdownMouseOver)
      .on("mouseout", handleEnvironmentBreakdownMouseOut)
      .append("title")
      .data(environmentData.children)
      .text(function(d){return d.category + '\n' + 'Saved: ' + formatNumber(d.saved) })


    const EnvironmentBreakdownLegend = d3.select('.svg7')
      .attr('width', width)
      .attr('height', height)
      .append('g');

    const environmentBreakdownLegend = EnvironmentBreakdownLegend.selectAll('g.environmentBreakdownLegend')
        .data(environmentData.children);
    EnvironmentBreakdownLegend.exit().remove();

    const newEnvironmentBreakdownLegend = environmentBreakdownLegend.enter()
      .append('g').attr('class', 'environmentBreakdownLegend');

    var environmentBreakdownLegendHeight = maxRadius*1.25
    var environmentBreakdownLegendBarHeight = environmentBreakdownLegendHeight/environmentData.children.length;

    newEnvironmentBreakdownLegend.append('rect')
      .attr("x", EnvironmentLegendBarWidth*-.5)
      .attr("y", function(d, i) {
       		return (i * environmentBreakdownLegendBarHeight);
       })
      .attr("width", width/4)
      .attr("height", environmentBreakdownLegendBarHeight)
      .style('fill',  function(d,i) {return environmentBreakdownColor(i)})
      .attr('class', function (d) { return stripPunctSpace(d.category)})
      .on("mouseover", handleEnvironmentMouseOver)
      .on("mouseout", handleEnvironmentMouseOut);

    newEnvironmentBreakdownLegend.append('text')
      .attr("x", 0)
      .attr("y", function(d, i) {
        return environmentBreakdownLegendBarHeight /2 + (i * environmentBreakdownLegendBarHeight);
      })
      .attr("dy", ".7vmin")
      .text(d => {return d.category.toUpperCase()})
      .style("text-anchor", "middle")
      .attr("font-family", "Bryant Pro, sans-serif")
      .attr("font-weight", "Bold")
      .attr("font-size", "1.5vmin")
      .style('fill', 'white')
      .on("mouseover", handleEnvironmentMouseOver)
      .on("mouseout", handleEnvironmentMouseOut);

    newEnvironmentBreakdownLegend.append('title')

      .text(d => d.category + '\n' + "Actions: " + formatNumber(d.actions) + '\n' + "Saved: " + formatNumber(d.saved) );

    environmentSavedBreakdownPie.attr('transform', 'translate('  + (TotalBarWidth*1 - maxRadius*.7 ) + ',' + maxRadius*.63 + ')');
    environmentActionsBreakdownPie.attr('transform', 'translate(' + (TotalBarWidth*-1 + maxRadius*.7 ) + ',' + maxRadius*.63 + ')');
    newEnvironmentBreakdownLegend.attr('transform', 'translate(' + 0 + ',' + (maxRadius*.63- environmentBreakdownLegendHeight/2)  + ')');

  }

  //-------------- 8 Impact 2 - Education and Economy
  function page8(){

    if  (investmentEducationData != null || localEconomyData != null ){
      const svg8 = d3.select('#page8').append('svg')
        .attr('class', "page svg8")
        .style('width', '100vw')
        .style('height', '100vh')
        .attr('viewBox', `${-width / 2} ${-height / 2} ${width} ${height}`);

      svg8.append('text')
        .attr("x", width/-2 + width/30)
        .attr("y", height/-3)
        .text("IMPACT")
        .style("text-anchor", "start")
        .attr("font-family", "Bryant Pro, sans-serif")
        .attr("font-weight", "500")
        .attr("font-size", "3vmin")
        .style('fill', '#efa73a');

      PageNumberGenerator(svg8)


      if (investmentEducationData != null ){

        svg8.append('text')
          .attr("x", width/-2 + width/30)
          .attr("y", height/-4)
          .text("INVESTMENT IN EDUCATION")
          .style("text-anchor", "left")
          .attr("font-family", "Bryant Pro, sans-serif")
          .attr("font-weight", 500)
          .attr("font-size", "2.5vmin")
          .style('fill', '#efa73a');

        EducationTotalBar = d3.select('.svg8')
          .attr('width', width/2)
          .attr('height', height/2)
          .append('g');



        var EducationTotalBarSections = investmentEducationData.children.length
        var EducationTotalBarWidth = (width/EducationTotalBarSections) - (width/22.5);
        var EducationTotalBarHeight = height/4;
        var EducationTotalBarY = height*-.2;
        var EducationTotalBarTextY1 = EducationTotalBarHeight*.25;
        var EducationTotalBarTextY2 = EducationTotalBarHeight*.75;

        var EducationTotalBarScaler = d3.scaleLinear()
          .domain([1,EducationTotalBarSections])
          .range([width/45, (width/2)-width/45]);


        var EducationTotalBarColor = d3.scaleLinear()
          .domain([1,EducationTotalBarSections])
          .range([d3.rgb("#5065a1"), d3.rgb('#3b2b68')]);


        const educationTotalBar = EducationTotalBar.selectAll('g.educationTotalBar')
            .data(investmentEducationData.children);
        EducationTotalBar.exit().remove();

        const newEducationTotalBar = educationTotalBar.enter()
          .append('g').attr('class', 'educationTotalBar');

        newEducationTotalBar.append('rect')
          .attr("x", function(d, i){return EducationTotalBarScaler(i)})
          .attr("y", EducationTotalBarY)
          .attr("width", EducationTotalBarWidth)
          .attr("height", EducationTotalBarHeight)
          .style('fill',  function(d,i) {return EducationTotalBarColor(i)})
          .attr('class', function (d) { return stripPunctSpace(d.name)});

        newEducationTotalBar.append('text')
          .attr("x", function(d, i){return EducationTotalBarScaler(i) + EducationTotalBarWidth/2})
          .attr("y", function(d, i) {
            return EducationTotalBarY + EducationTotalBarHeight/3.2;
          })
          .attr("dy", ".7vmin")
          .text(d => {return d.name})
          .style("text-anchor", "middle")
          .attr("font-family", "museo-sans-rounded, sans-serif")
          .attr("font-weight", "300")
          .attr("font-size", "2.5vw")
          .style('fill', 'white');

        newEducationTotalBar.append('text')
          .attr("x", function(d, i){return EducationTotalBarScaler(i) + EducationTotalBarWidth/2})
          .attr("y", function(d, i) {
            return EducationTotalBarY + EducationTotalBarHeight/1.4;
          })
          .attr("dy", ".7vmin")
          .text(d => {if (d.name == "Donations to PIPs Education Fund"){return "$"+formatNumber(d.value);} else {return formatNumber(d.value)}})
          .style("text-anchor", "middle")
          .attr("font-family", "museo-sans-rounded, sans-serif")
          .attr("font-weight", "900")
          .attr("font-size", "8vmin")
          .style('fill', 'white');

        EducationTotalBar.attr('transform', 'translate(' + (width*-.03) + ',' + 0 + ')');
      }

      if (localEconomyData != null ){

        svg8.append('text')
          .attr("x", width/-2 + width/30)
          .attr("y", height/6)
          .text("LOCAL ECONOMY")
          .style("text-anchor", "left")
          .attr("font-family", "Bryant Pro, sans-serif")
          .attr("font-weight", 500)
          .attr("font-size", "2.5vmin")
          .style('fill', '#efa73a');

        LocalEconomyTotalBar = d3.select('.svg8')
          .attr('width', width/2)
          .attr('height', height/2)
          .append('g');

        var LocalEconomyTotalBarWidth = width/2 - width/30;
        var LocalEconomyTotalBarHeight = height/4;
        var LocalEconomyTotalBarY = 0;
        var LocalEconomyTotalBarTextY1 = LocalEconomyTotalBarHeight*.35;
        var LocalEconomyTotalBarTextY2 = LocalEconomyTotalBarHeight*.75;

        LocalEconomyTotalBar.append('rect')
          .attr("x", width/-2 + width/30)
          .attr("y", LocalEconomyTotalBarY)
          .attr("width", LocalEconomyTotalBarWidth)
          .attr("height", LocalEconomyTotalBarHeight)
          .style('fill', "#efa73a");

        LocalEconomyTotalBar.append('text')
          .attr("x",  width/-2 + width/30 + LocalEconomyTotalBarWidth/2 )
          .attr("y", LocalEconomyTotalBarTextY2)
          .text("$" + formatNumber(localEconomyData.children[0].value))
          .style("text-anchor", "middle")
          .attr("font-family", "museo-sans-rounded, sans-serif")
          .attr("font-weight", "900")
          .attr("font-size", "8vmin")
          .style('fill', 'white');

        LocalEconomyTotalBar.append('text')
          .attr("x",  width/-2 + width/30 + LocalEconomyTotalBarWidth/2 )
          .attr("y", LocalEconomyTotalBarTextY1)
          .text(localEconomyData.children[0].name)
          .style("text-anchor", "middle")
          .attr("font-family", "museo-sans-rounded, sans-serif")
          .attr("font-weight", "300")
          .attr("font-size", "2.5vw")
          .style('fill', 'white');

        LocalEconomyTotalBar.append('rect')
          .attr("x", 0)
          .attr("y", LocalEconomyTotalBarY)
          .attr("width", TotalBarWidth)
          .attr("height", LocalEconomyTotalBarHeight)
          .style('fill', "#e9bc57");

        LocalEconomyTotalBar.append('text')
          .attr("x",  0 + LocalEconomyTotalBarWidth/2 )
          .attr("y", LocalEconomyTotalBarTextY2)
          .text("$" + formatNumber(localEconomyData.children[1].value))
          .style("text-anchor", "middle")
          .attr("font-family", "museo-sans-rounded, sans-serif")
          .attr("font-weight", "900")
          .attr("font-size", "8vmin")
          .style('fill', 'white');

        LocalEconomyTotalBar.append('text')
          .attr("x",  0 + LocalEconomyTotalBarWidth/2 )
          .attr("y", LocalEconomyTotalBarTextY1)
          .text(localEconomyData.children[1].name)
          .style("text-anchor", "middle")
          .attr("font-family", "museo-sans-rounded, sans-serif")
          .attr("font-weight", "300")
          .attr("font-size", "2.5vw")
          .style('fill', 'white');

        LocalEconomyTotalBar.attr('transform', 'translate(' +0 + ',' + height*.2 + ')');
      }
    }
  }

  //------------------9 IMPACT 3 Community and Health

  function page9(){
    if  (communityLearningData != null || healthWellnessData != null ){

      const svg9 = d3.select('#page9').append('svg')
        .attr('class', "page svg9")
        .style('width', '100vw')
        .style('height', '100vh')
        .attr('viewBox', `${-width / 2} ${-height / 2} ${width} ${height}`);

      svg9.append('text')
        .attr("x", width/-2 + width/30)
        .attr("y", height/-3)
        .text("IMPACT")
        .style("text-anchor", "start")
        .attr("font-family", "Bryant Pro, sans-serif")
        .attr("font-weight", "500")
        .attr("font-size", "3vmin")
        .style('fill', '#efa73a');

      PageNumberGenerator(svg9)


        if (communityLearningData != null){

          svg9.append('text')
            .attr("x", width/-2 + width/30)
            .attr("y", height/-4)
            .text("COMMUNITY & LEARNING")
            .style("text-anchor", "left")
            .attr("font-family", "Bryant Pro, sans-serif")
            .attr("font-weight", 500)
            .attr("font-size", "2.5vmin")
            .style('fill', '#efa73a');

          var CommunityTotalBarWidth = width/3 - width/45;
          var CommunityTotalBarHeight = height/3;
          var CommunityTotalBarX = width/-2 + width/30 + CommunityTotalBarWidth*.2;
          var CommunityTotalBarY = 0;
          var CommunityTotalBarTextX = width/-2 + width/30 + CommunityTotalBarWidth*.5;
          var CommunityTotalBarTextY0 = CommunityTotalBarHeight*.75;
          var CommunityTotalBarTextY1 = CommunityTotalBarHeight*.3;
          var CommunityTotalBarTextY2 = CommunityTotalBarHeight*.45;

          CommunityTotalBar = d3.select('.svg9')
            .attr('width', width/2)
            .attr('height', height/2)
            .append('g');

          CommunityTotalBar.append('rect')
            .attr("x", width/-2 + width/30)
            .attr("y", CommunityTotalBarY)
            .attr("width", CommunityTotalBarWidth)
            .attr("height", CommunityTotalBarHeight)
            .style('fill', "#be4f89");

          CommunityTotalBar.append('text')
            .attr("x",  CommunityTotalBarWidth*-1)
            .attr("y", CommunityTotalBarTextY0)
            .text(formatNumber(communityLearningData.children[0].value))
            .style("text-anchor", "middle")
            .attr("font-family", "museo-sans-rounded, sans-serif")
            .attr("font-weight", "900")
            .attr("font-size", "8vmin")
            .style('fill', 'white');

          CommunityTotalBar.append('text')
            .attr("x",  CommunityTotalBarX)
            .attr("y", CommunityTotalBarTextY1)
            .text("Participating in")
            .style("text-anchor", "left")
            .attr("font-family", "museo-sans-rounded, sans-serif")
            .attr("font-weight", "300")
            .attr("font-size", "2.5vw")
            .style('fill', 'white');

          CommunityTotalBar.append('text')
            .attr("x",  CommunityTotalBarX)
            .attr("y", CommunityTotalBarTextY2)
            .text("Volunteer Activity")
            .style("text-anchor", "Left")
            .attr("font-family", "museo-sans-rounded, sans-serif")
            .attr("font-weight", "300")
            .attr("font-size", "2.5vw")
            .style('fill', 'white');

          CommunityTotalBar.append('rect')
            .attr("x", CommunityTotalBarWidth*-.5)
            .attr("y", CommunityTotalBarY)
            .attr("width", CommunityTotalBarWidth)
            .attr("height", CommunityTotalBarHeight)
            .style('fill', "#882458");

          CommunityTotalBar.append('text')
            .attr("x",  0)
            .attr("y", CommunityTotalBarTextY0)
            .text(formatNumber(communityLearningData.children[1].value))
            .style("text-anchor", "middle")
            .attr("font-family", "museo-sans-rounded, sans-serif")
            .attr("font-weight", "900")
            .attr("font-size", "8vmin")
            .style('fill', 'white');

          CommunityTotalBar.append('text')
            .attr("x",  0 - CommunityTotalBarWidth*.3  )
            .attr("y", CommunityTotalBarTextY1)
            .text("Participating in")
            .style("text-anchor", "left")
            .attr("font-family", "museo-sans-rounded, sans-serif")
            .attr("font-weight", "300")
            .attr("font-size", "2.5vw")
            .style('fill', 'white');

          CommunityTotalBar.append('text')
            .attr("x",  0 - CommunityTotalBarWidth*.3  )
            .attr("y", CommunityTotalBarTextY2)
            .text("Campus Events")
            .style("text-anchor", "left")
            .attr("font-family", "museo-sans-rounded, sans-serif")
            .attr("font-weight", "300")
            .attr("font-size", "2.5vw")
            .style('fill', 'white');

          CommunityTotalBar.append('rect')
            .attr("x", CommunityTotalBarWidth*.5)
            .attr("y", CommunityTotalBarY)
            .attr("width", CommunityTotalBarWidth)
            .attr("height", CommunityTotalBarHeight)
            .style('fill', "#a43034");

          CommunityTotalBar.append('text')
            .attr("x",  CommunityTotalBarWidth)
            .attr("y", CommunityTotalBarTextY0)
            .text(formatNumber(communityLearningData.children[2].value))
            .style("text-anchor", "middle")
            .attr("font-family", "museo-sans-rounded, sans-serif")
            .attr("font-weight", "900")
            .attr("font-size", "8vmin")
            .style('fill', 'white');

          CommunityTotalBar.append('text')
            .attr("x",  0 + CommunityTotalBarWidth*.6 )
            .attr("y", CommunityTotalBarTextY1)
            .text("Participating in Applied")
            .style("text-anchor", "left")
            .attr("font-family", "museo-sans-rounded, sans-serif")
            .attr("font-weight", "300")
            .attr("font-size", "2.5vw")
            .style('fill', 'white');

          CommunityTotalBar.append('text')
            .attr("x",  0 + CommunityTotalBarWidth*.6 )
            .attr("y", CommunityTotalBarTextY2)
            .text("Learning Events")
            .style("text-anchor", "left")
            .attr("font-family", "museo-sans-rounded, sans-serif")
            .attr("font-weight", "300")
            .attr("font-size", "2.5vw")
            .style('fill', 'white');

          CommunityTotalBar.attr('transform', 'translate(' + 0 + ',' + height*-.2 + ')');

        }

    if (healthWellnessData != null){

      svg9.append('text')
        .attr("x", width/-2 + width/30)
        .attr("y", height/4)
        .text("HEALTH & WELLNESS")
        .style("text-anchor", "left")
        .attr("font-family", "Bryant Pro, sans-serif")
        .attr("font-weight", 500)
        .attr("font-size", "2.5vmin")
        .style('fill', '#efa73a');

      HealthTotalBar = d3.select('.svg9')
        .attr('width', width/2)
        .attr('height', height/2)
        .append('g');

      var HealthTotalBarWidth = width - width/15;
      var HealthTotalBarHeight = height/8;
      var HealthTotalBarY = 0;
      var HealthTotalBarTextY = HealthTotalBarHeight*.7;

      HealthTotalBar.append('rect')
        .attr("x", width/-2 + width/30)
        .attr("y", HealthTotalBarY)
        .attr("width", HealthTotalBarWidth)
        .attr("height", HealthTotalBarHeight)
        .style('fill', "#4ba2ac");


      HealthTotalBar.append('text')
        .attr("x",  width/3.5 - width/30  )
        .attr("y", HealthTotalBarTextY)
        .text(healthWellnessData.children[0].name)
        .style("text-anchor", "end")
        .attr("font-family", "museo-sans-rounded, sans-serif")
        .attr("font-weight", "300")
        .attr("font-size", "3vw")
        .style('fill', 'white');

      HealthTotalBar.append('text')
        .attr("x",  width/3 - width/30  )
        .attr("dx", width/-60)
        .attr("y", HealthTotalBarTextY)
        .text(formatNumber(healthWellnessData.children[0].value))
        .style("text-anchor", "start")
        .attr("font-family", "museo-sans-rounded, sans-serif")
        .attr("font-weight", "900")
        .attr("font-size", "8vmin")
        .style('fill', 'white');

      HealthTotalBar.attr('transform', 'translate(' +0 + ',' + height*.3 + ')');
    }
  }
}

  //---------------------10 Thanks

  function thanks(){
    const svg10 = d3.select('#page10').append('svg')
      .attr('class', "page svg10")
      .style('width', '100vw')
      .style('height', '100vh')
      .attr('viewBox', `${-width / 2} ${-height / 2} ${width} ${height}`);


    svg10.append('text')
      .style("text-anchor", "middle")
      .attr("font-family", "Bryant Pro, sans-serif")
      .attr("font-weight", "900")
      .attr("font-size", "8vw")
      .attr("font-style", "italic")
      .style('fill', '#322f2b')
      .text('THANKS');

    svg10.append('text')
      .attr('y', "6%")
      .style("text-anchor", "middle")
      .attr("font-family", "Bryant Pro, sans-serif")
      .attr("font-weight", "Regular")
      .attr("font-size", "1.6vw")
      .style('fill', 'black')
      .text('For Questions or More Info Please Contact:');

    svg10.append('text')
      .attr('y', "10%")
      .style("text-anchor", "middle")
      .attr("font-family", "Bryant Pro, sans-serif")
      .attr("font-weight", "100")
      .attr("font-size", "2.6vw")
      .style('fill', 'black')
      .text('support@pipsrewards.com')
      .style("cursor", "pointer")
      .on("click", function() { window.open("mailto: support@pipsrewards.com" ); });
  }

});
