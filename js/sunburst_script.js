
var ParentCategories = [];

const width = window.innerWidth,
  height = window.innerHeight,
  // maxRadius = (Math.min(width, height) / 3) ;
  maxRadius = (width / 5) ;

const formatNumber = d3.format(',d');
var parseDate = d3.timeFormat("%B %Y");

function stripPunctSpace(string){
  return string.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"").replace(/\s+/g, '')
}

function hasChild(obj){
  return !!Object.keys(obj).length;
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


const treemap = d3.treemap()
  .size([maxRadius*2, maxRadius*2.00001])
  .paddingOuter(3)
  .paddingInner(3)
  .round(true);

const svg1 = d3.select('#page1').append('svg')
  .attr('class', "svg1")
  .style('width', '100vw')
  .style('height', '100vh')
  .attr('viewBox', `${-width / 2} ${-height / 2} ${width} ${height}`);

const svg2 = d3.select('#page2').append('svg')
  .attr('class', "page svg2")
  .style('width', '100vw')
  .style('height', '100vh')
  .attr('viewBox', `${-width / 2} ${-height / 2} ${width} ${height}`);

const svg3 = d3.select('#page3').append('svg')
  .attr('class', "page svg3")
  .style('width', '100vw')
  .style('height', '100vh')
  .attr('viewBox', `${-width / 2} ${-height / 2} ${width} ${height}`);

const svg4 = d3.select('#page4').append('svg')
  .attr('class', "page svg4")
  .style('width', '100vw')
  .style('height', '100vh')
  .attr('viewBox', `${-width / 2} ${-height / 2} ${width} ${height}`);

const svg5 = d3.select('#page5').append('svg')
  .attr('class', "page svg5")
  .style('width', '100vw')
  .style('height', '100vh')
  .attr('viewBox', `${-width / 2} ${-height / 2} ${width} ${height}`);

const svg6 = d3.select('#page6').append('svg')
  .attr('class', "page svg6")
  .style('width', '100vw')
  .style('height', '100vh')
  .attr('viewBox', `${-width / 2} ${-height / 2} ${width} ${height}`);

const svg7 = d3.select('#page7').append('svg')
  .attr('class', "page svg7")
  .style('width', '100vw')
  .style('height', '100vh')
  .attr('viewBox', `${-width / 2} ${-height / 2} ${width} ${height}`);

const svg8 = d3.select('#page8').append('svg')
  .attr('class', "page svg8")
  .style('width', '100vw')
  .style('height', '100vh')
  .attr('viewBox', `${-width / 2} ${-height / 2} ${width} ${height}`);

const svg9 = d3.select('#page9').append('svg')
  .attr('class', "page svg9")
  .style('width', '100vw')
  .style('height', '100vh')
  .attr('viewBox', `${-width / 2} ${-height / 2} ${width} ${height}`);

const svg10 = d3.select('#page10').append('svg')
  .attr('class', "page svg10")
  .style('width', '100vw')
  .style('height', '100vh')
  .attr('viewBox', `${-width / 2} ${-height / 2} ${width} ${height}`);



const EarnActivity2 = d3.select('.svg5')
  .attr('width', width)
  .attr('height', height)
  .append('g');

const UserTotal = d3.select('.svg3')
  .attr('width', width)
  .attr('height', height)
  .append('g');

const UserBreakdown = d3.select('.svg2')
  .attr('width', width/2)
  .attr('height', height/2)
  .append('g');

const UserBreakdownLegend = d3.select('.svg2')
  .attr('width', width/2)
  .attr('height', height/2)
  .append('g');

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


//-------------Read in JSON

d3.json('flare.json', (error, data) => {
  if (error) throw error;

  const partner = data.name;
  const date = data.date;


  d3.selectAll(".page").append("svg:image")
    .attr('width', "10%")
    .attr('height', "10%")
    .attr('x', function(){return width*.5 - width/30 - parseFloat(d3.select(this).style('width'))})
    .attr('y', function(){return height*-.47})
    .attr("xlink:href", "LOGO.svg");

  d3.selectAll(".page").append("text")
    .attr('x', function(){return width*-.5 + width/30})
    .attr('y', function(){return height*-.43})
    .style("text-anchor", "left")
    .style("vertical-align", "text-bottom")
    .attr("font-family", "Bryant Pro, sans-serif")
    .attr("font-weight", "500")
    .attr("font-size", "2vh")
    .style('fill', '#322f2b')
    .text('Performance Dashboard/Report — ' + partner);


  d3.selectAll(".page").append("text")
    .attr('x', function(){return width*-.5 + width/30})
    .attr('y', function(){return height*-.40})
    .style("text-anchor", "left")
    .style("vertical-align", "text-bottom")
    .attr("font-family", "Bryant Pro, sans-serif")
    .attr("font-weight", "500")
    .attr("font-size", "2vh")
    .style('fill', '#322f2b')
    .text(date);

  var borderLine = d3.line()
    .x(function(d) {return d.x})
    .y(function(d) { return d.y})

  var pageBorderTop = [
    {"x": width/-2, "y": height/-2},
    {"x": width/2, "y": height/-2}
  ]

  d3.selectAll(".page")
    .append("path")
    .attr("d", borderLine(pageBorderTop))
    .style("stroke-width", "1px")
    .style("stroke", "322f2b");

  //---------------Parsing Data

  for (var i = 0; i < data.children.length; i++) {
    if (data.children[i].name == "USER BREAKDOWN"){
      var userBreakdownProto = data.children[i].children[0];
      var userBreakdownData = d3.hierarchy(userBreakdownProto).sum(function(d) { return d.value; });
    }
    else if (data.children[i].name == "EARN ACTIVITY"){
      var earnActivityData = data.children[i]}
    else if (data.children[i].name == "TOTAL USERS"){
      var userTotalData = data.children[i]}
    else if (data.children[i].name == "ACTIONS TAKEN OVER TIME"){
      var actionsOverTimeData = data.children[i]}
    else if (data.children[i].name == "ENVIRONMENT"){
      var environmentData = data.children[i]}
    else if (data.children[i].name == "INVESTMENT IN EDUCATION"){
      var investmentEducationData = data.children[i]}
    else if (data.children[i].name == "LOCAL ECONOMY"){
      var localEconomyData = data.children[i]}
    else if (data.children[i].name == "COMMUNITY & LEARNING"){
      var communityLearningData = data.children[i]}
    else if (data.children[i].name == "HEALTH & WELLNESS"){
      var healthWellnessData = data.children[i]}
    else if (data.children[i].name == "ENVIRONMENT BREAKDOWN"){
    var environmentBreakdownData = data.children[i]}
    else if (data.children[i].name == "ALL USE ACTIVITY"){
    var useActivityData = data.children[i]
    var useActivityActionsData = d3.hierarchy(useActivityData).sum(function(d) { return d.actions; });
    var useActivityPIPsData = d3.hierarchy(useActivityData).sum(function(d) { return d.pips; });
    }

    else continue
  }

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
    d3.selectAll("." + d.name.replace(/\s+/g, '')).transition()
      .style("opacity", .5);
    d3.selectAll(".ActionsTakenLabel")
      .text(formatNumber(d.actions) + " Actions Taken")
      .style("fill", ActionsTakenColor(d.name));
    d3.selectAll(".PointsEarnedLabel")
      .text(formatNumber(d.earned) + " Points Earned")
      .style("fill", ActionsTakenColor(d.name));
  }

  function handleMouseOut(d, i) {
    d3.selectAll("." + d.name.replace(/\s+/g, '')).transition()
      .style("opacity", 1);
    d3.selectAll(".PointsEarnedLabel")
      .text("Points Earned Breakdown")
      .style('fill', '#4ba26c');
    d3.selectAll(".ActionsTakenLabel")
      .text("Actions Taken Breakdown")
      .style('fill', '#71bf93');
  }

  function userBreakdownMouseOver(d, i) {
    d3.selectAll("." + d.data.name.replace(/\s+/g, '')).transition()
      .style("opacity", .5);
  }

  function userBreakdownMouseOut(d, i) {
    d3.selectAll("." + d.data.name.replace(/\s+/g, '')).transition()
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

  svg1.append("svg:image")
    .attr('width', "33%")
    .attr('height', "33%")
    .attr('x', function(){return parseFloat(d3.select(this).style('width'))/-2})
    .attr('y', function(){return parseFloat(d3.select(this).style('height'))/-1.5})
    .attr("xlink:href", "images/LOGO.svg");

  svg1.append('text')
    .attr('y', "10%")
    .style("text-anchor", "middle")
    .attr("font-family", "Bryant Pro, sans-serif")
    .attr("font-weight", "Regular")
    .attr("font-size", "4vh")
    .style('fill', 'black')
    .text('Performance Dashboard/Report');

  svg1.append('text')
    .attr('y', "15%")
    .style("text-anchor", "middle")
    .attr("font-family", "Bryant Pro, sans-serif")
    .attr("font-weight", "Bold")
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


    //----------------------- 2 User Breakdown


  treemap(userBreakdownData);

  var userBreakDownColor = d3.scaleOrdinal().domain(userBreakdownData.children)
    .range(["#000","#e8806c", "#d35634", "#a43034"]);

  var cell = UserBreakdown
    .selectAll(".node")
    .data(userBreakdownData.descendants())
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
      else if (d.data.name.includes('Active')) {return '#fff'}
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
    .attr("font-family", "Bryant Pro")
    .attr("font-weight", "500")
    .attr("font-size", "3em")
    .style('fill', '#d35634');

  const userlegend = UserBreakdown.selectAll('g.userlegend')
    .data(userBreakdownData.descendants());

  userlegend.exit().remove();

  const newUserLegend = userlegend.enter()
      .append('g').attr('class', 'userlegend');

  var userLegendHeight = treemapSize
  var userLegendBarHeight = userLegendHeight/userBreakdownData.descendants().length;

  newUserLegend.append('rect')
    .attr("x", width/10)
    .attr("y", function(d, i) {
      return (i * userLegendBarHeight);
    })
    .attr("width", userLegendHeight)
    .attr("height", userLegendBarHeight)
    .style("fill", function(d,i) {
      if (d.data.name == 'Users'){return '#000'}
      else if (d.data.name.includes('Active')) {return '#fff'}
      else {return userBreakDownColor(i); }})
    .attr('class', function (d) {return d.data.name.replace(/\s+/g, '')})
    .style('stroke', function(d){if (d.data.name.includes('Active')){return 'black'} else {'none'}})
    .style('stroke-width', function(d){if (d.data.name.includes('Active')){return '1px'} else {'0px'}})
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
    .style('stroke', function(d){if (d.data.name.includes('Active')){return 'black'} else {'none'}})
    .style('stroke-width', function(d){if (d.data.name.includes('Active')){return '1px'} else {'0px'}})
    .attr('class', function (d) {return d.data.name.replace(/\s+/g, '')})
    .on("mouseover", userBreakdownMouseOver)
    .on("mouseout", userBreakdownMouseOut);

  newUserLegend.append('title')
    .text(d => d.data.name + '\n' + formatNumber(d.value) );

  newUserLegend.attr('transform', 'translate(' + width/3 + ',' + 0 + ')');

  //-----------------------3 Total Users

  svg3.append('text')
    .attr("x", width/-2 + width/30)
    .attr("y", height/-3)
    .text("TOTAL USERS")
    .style("text-anchor", "start")
    .attr("font-family", "Bryant Pro")
    .attr("font-weight", "500")
    .attr("font-size", "3em")
    .style('fill', '#d35634');

  var userTotalDataVerbose = []

  for (var i = 0; i < userTotalData.children.length; i++) {
    var currentDatum = userTotalData.children[i];
    var currentDate = new Date(userTotalData.children[i].name.toString());

    if (currentDatum.children.length > 0) {
      for (var j = 0; j < currentDatum.children.length; j++) {
        userTotalDatum = {'date': currentDate, "value": currentDatum.children[j].value, "name": currentDatum.children[j].name};
        userTotalDataVerbose.push(userTotalDatum)

        if (currentDatum.children[j].children.length > 0) {
          var currentChild = currentDatum.children[j].children;
          for (var k = 0; k < currentChild.length; k++) {
            userTotalDatum = {'date': currentDate, "value": currentChild[k].value, "name": currentChild[k].name};
            userTotalDataVerbose.push(userTotalDatum)
          }
        }
      }
    }
  }

  var sumstat = d3.nest()
    .key(function(d) { return d.date;})
    .entries(userTotalDataVerbose);

  var mygroups = ["Students", "Active Students", "Faculty", "Active Faculty"] // list of group names
  var mygroup = [0,1,2,3]

  var stackedData = d3.stack()
    .keys(mygroup)
    .value(function(d, key){
      return d.values[key].value
    })
    (sumstat)

  var stackedWidth = width*.8;
  var stackedHeight = height*.65;

  // Add X axis --> it is a date format
  var x = d3.scaleTime()
    .domain(d3.extent(userTotalDataVerbose, function(d) { return d.date; }))
    .range([ 0, stackedWidth]);

  UserTotal.append("g")
    .attr("transform", "translate(0," + stackedHeight + ")")
    .attr("class", "axis")
    .call(d3.axisBottom(x).tickFormat(d3.utcFormat("%b %y")).tickValues(x.ticks().concat(x.domain())));

  // Add Y axis
  var y = d3.scaleLinear()
    .domain([0, d3.max(userTotalDataVerbose, function(d) { return +d.value; })*1.2])
    .range([ stackedHeight, 0 ]);

  UserTotal.append("g")
    .attr("class", "axis")
    .call(d3.axisLeft(y));

  var line = d3.line()
    .x(function(d, i) {return x(new Date(d.data.key)) })
    .y(function(d) { return y(d[1]) - 2; });

  // gridlines in x axis function
  function make_y_gridlines() {
      return d3.axisLeft(y)
          .ticks(10)
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
    .domain(mygroups)
    .range([
      "#e8806c",
      "#e26442",
      "#a43034"
    ])

  // Show the areas
  UserTotal.selectAll("mylayers")
    .data(stackedData)
    .enter()
    .append("path")
    .attr("class", function(d) {return '"' + mygroups[d.key] + '"'})
    .style("fill", function(d) {
      name = mygroups[d.key] ; if (name.includes('Active')){return "#FFF"} else {return stackedColor(name);}
    })
    .attr("d", d3.area()
      .x(function(d, i) { return x(new Date(d.data.key)); })
      .y0(function(d) { return y(d[0]); })
      .y1(function(d) { return y(d[1]); })
    )
    .append("title")
    .text(function(d) {return mygroups[d.key]});

  UserTotal.selectAll("mylayers")
    .data(stackedData[stackedData.length - 1])
    .enter()
    .append("circle")
    .attr("cx", function (d,i) {return x(new Date(d.data.key));})
    .attr("cy", function (d,i) {return y(d[1]) -2})
    .attr("r", stackedWidth/150)
    .style("fill", "black")
    .append("title")
    .text(function(d) {
      return parseDate(new Date(d.data.key)) + '\n' + "Total Number of Users: " + formatNumber(d[1])
    });

  UserTotal.selectAll("mylayers")
    .data(stackedData)
    .enter()
    .append("path")
    .style("stroke", "black")
    .style("fill", "none")
    .style("stroke-width", function(d,i) {
      if (i == stackedData.length - 1) {return"2px" } else return "0px";
    })
    .attr("d", function(d) {return line(d)})

  var stackedLegenedScale = d3.scaleLinear()
    .domain([0, stackedData.length + 1])
    .range([width*-.4, width*.4])

  var size = Math.min(width,height)/30

  svg3.selectAll("mydots")
    .data(stackedData)
    .enter()
    .append("rect")
    .attr("x", function(d,i){ return  stackedLegenedScale(i +1)+ size*i +1})
    .attr("y", height*.4) // 100 is where the first dot appears. 25 is the distance between dots
    .attr("width", size)
    .attr("height", size)
    .style("fill", function(d) { name = mygroups[d.key] ; if (name.includes('Active')){return "#FFF"} else {return stackedColor(name);} })
    .style("stroke", "black")
    .style("stroke-width", function(d) { name = mygroups[d.key] ; if (name.includes('Active')){return "2px"} else {return "0px";} });

  svg3.selectAll("mylabels")
    .data(stackedData)
    .enter()
    .append("text")
    .attr("x", function(d,i){ return  stackedLegenedScale(i +1)+ (size/2) + size*i +1})
    .attr("y", height*.46)
    .text(function(d){return mygroups[d.key]})
    .attr("text-anchor", "middle")
    .style("alignment-baseline", "middle")
    .style("font-size", "1.5vw");

  svg3.append('rect')
    .attr("x", function(d,i){ return  stackedLegenedScale(0 )})
    .attr("y", height*.4 + size/2)
    .attr("width", width/30)
    .attr("height", width/360);

  svg3.append('circle')
    .attr("cx", function(d,i){ return  stackedLegenedScale(0 ) + width/60})
    .attr("cy", height*.4 + size/2 + width/720)
    .attr("r", stackedWidth/150)

  svg3.append('text')
    .attr("x", function(d,i){ return  stackedLegenedScale(0 ) + width/60})
    .attr("y", height*.46)
    .text("Total Users")
    .attr("text-anchor", "middle")
    .style("alignment-baseline", "middle")
    .style("font-size", "1.5vw");

  UserTotal.attr('transform', 'translate(' + width*-.4 + ',' + height*-.3 + ')');

  //-------------------------------- 4 - Earn Activity

  const EarnActivity = d3.select('.svg4')
    .attr('width', width)
    .attr('height', height)
    .append('g');

  var TotalBarWidth = width/2 - width/30;
  var TotalBarHeight = height/5;

  EarnActivity.append('text')
    .attr("x", width/-2 + width/30)
    .attr("y", height/-3)
    .text("EARN ACTIVITY")
    .style("text-anchor", "start")
    .attr("font-family", "Bryant Pro")
    .attr("font-weight", "500")
    .attr("font-size", "3vmin")
    .style('fill', '#71bf93');

  const ActionsSlice = ActionsTaken.selectAll('g.ActionsSlice')
    .data(partition(ActionsTakenData).descendants());

  ActionsSlice.exit().remove();

  const newActionsSlice = ActionsSlice.enter()
    .append('g').attr('class', 'ActionsSlice');

  newActionsSlice.append('title')
    .text(d => d.data.name + '\n' + formatNumber(d.value));

  newActionsSlice.append('path')
    .style('fill',  d => { while (d.depth > 1) d = d.parent; return ActionsTakenColor(d.data.name); })
    .attr("display", function (d) { return d.depth ? null : "none"; })
    .attr('class', function (d) { return d.data.name.replace(/\s+/g, '');})
    .attr('d', arc);

  EarnActivity.append('text')
    .attr("class", "ActionsTakenLabel")
    .attr("x", TotalBarWidth/-2)
    .attr("y",0)
    .text("Actions Taken Breakdown")
    .style("text-anchor", "middle")
    .attr("font-family", "Bryant Pro, sans-serif")
    .attr("font-weight", "Bold")
    .attr("font-size", "4vmin")
    .style('fill', '#71bf93');

  const EarnedSlice = Earned.selectAll('g.EarnedSlice')
    .data(partition(PointsEarnedData).descendants());
  EarnedSlice.exit().remove();

  const newEarnedSlice = EarnedSlice.enter()
    .append('g').attr('class', 'EarnedSlice');

  newEarnedSlice.append('title')
    .text(d => d.data.name + '\n' + formatNumber(d.value));

  newEarnedSlice.append('path')
    .attr('class', 'main-arc')
    .style('fill',  d => { while (d.depth > 1) d = d.parent; return ActionsTakenColor(d.data.name); })
    .attr("display", function (d) { return d.depth ? null : "none"; })
    .attr('class', function (d) { return d.data.name.replace(/\s+/g, '');})
    .attr('d', arc);

  EarnActivity.append('text')
    .attr("class", "PointsEarnedLabel")
    .attr("x", TotalBarWidth/2)
    .attr("y", 0)
    .text("Points Earned Breakdown")
    .style("text-anchor", "middle")
    .attr("font-family", "Bryant Pro, sans-serif")
    .attr("font-weight", "Bold")
    .attr("font-size", "4vmin")
    .style('fill', '#4ba26c');


  for (var i = 0; i < ActionsTakenData.data.children.length; i++) {
    if (ActionsTakenData.data.children[i].children){
      var ParentActions = ActionsTakenData.data.children[i].children.map(item => item.actions).reduce((prev, next) => prev + next)
      var ParentEarned = ActionsTakenData.data.children[i].children.map(item => item.earned).reduce((prev, next) => prev + next)
      ParentCategories.push({name:ActionsTakenData.data.children[i].name, actions:ParentActions, earned:ParentEarned})
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
    .style('fill',  d => {return ActionsTakenColor(d.name)})
    .attr('class', function (d) { return d.name.replace(/\s+/g, '');})
    .on("mouseover", handleMouseOver)
    .on("mouseout", handleMouseOut);

  newLegend.append('text')
    .attr("x", 0)
    .attr("y", function(d, i) {
      return barHeight /2 + (i * barHeight);
    })
    .attr("dy", ".7vmin")
    .text(d => {return d.name})
    .style("text-anchor", "middle")
    .attr("font-family", "Bryant Pro")
    .attr("font-weight", "Bold")
    .attr("font-size", "1.5vmin")
    .style('fill', 'white')
    .on("mouseover", handleMouseOver)
    .on("mouseout", handleMouseOut);

  newLegend.append('title')
    .text(d => d.name + '\n' + "Actions: " + formatNumber(d.actions) + '\n' + "Points: " + formatNumber(d.earned) );

  TotalBar.append('rect')
    .attr("x", width/-2 + width/30)
    .attr("y", (height/-10) * 3)
    .attr("width", TotalBarWidth)
    .attr("height", TotalBarHeight)
    .style('fill', "#71bf93");

  TotalBar.append('rect')
    .attr("x", 0)
    .attr("y", (height/-10) * 3)
    .attr("width", TotalBarWidth)
    .attr("height", TotalBarHeight)
    .style('fill', "#4ba26c");

  TotalBar.append('text')
    .attr("x",  width/-2 + width/30 + TotalBarWidth/2 )
    .attr("y", (height/-10) - TotalBarHeight/4)
    .text("Total Actions Taken")
    .style("text-anchor", "middle")
    .attr("font-family", "museo-sans-rounded, sans-serif")
    .attr("font-weight", "300")
    .attr("font-size", "4vmin")
    .style('fill', 'white');

  TotalBar.append('text')
    .attr("x",  width/-2 + width/30 + TotalBarWidth/2  )
    .attr("y", (height/-10) - TotalBarHeight/2)
    .text(formatNumber(ParentCategories.map(item => item.actions).reduce((prev, next) => prev + next)))
    .style("text-anchor", "middle")
    .attr("font-family", "museo-sans-rounded, sans-serif")
    .attr("font-weight", "900")
    .attr("font-size", "8vmin")
    .style('fill', 'white');


  TotalBar.append('text')
    .attr("x",  0 + TotalBarWidth/2 )
    .attr("y", (height/-10) - TotalBarHeight/4)
    .text("Total PIPs Earned")
    .style("text-anchor", "middle")
    .attr("font-family", "museo-sans-rounded, sans-serif")
    .attr("font-weight", "300")
    .attr("font-size", "4vmin")
    .style('fill', 'white');

  TotalBar.append('text')
    .attr("x",  0 + TotalBarWidth/2 )
    .attr("y", (height/-10) - TotalBarHeight/2)
    .text(formatNumber(ParentCategories.map(item => item.earned).reduce((prev, next) => prev + next)))
    .style("text-anchor", "middle")
    .attr("font-family", "museo-sans-rounded, sans-serif")
    .attr("font-weight", "900")
    .attr("font-size", "8vmin")
    .style('fill', 'white');

  newLegend.attr('transform', 'translate(' + 0 + ',' + (maxRadius*.8 - legendHeight/2)  + ')');
  ActionsTaken.attr('transform', 'translate(' + (TotalBarWidth*-1 + maxRadius*.7 ) + ',' + maxRadius*.8 + ')');
  Earned.attr('transform', 'translate('  + (TotalBarWidth*1 - maxRadius*.7 ) + ',' + maxRadius*.8 + ')');

  //----------------------- 5 Earn Activity 2 Actions Over time

  svg5.append('text')
    .attr("x", width/-2 + width/30)
    .attr("y", height/-3)
    .text("EARN ACTIVITY")
    .style("text-anchor", "start")
    .attr("font-family", "Bryant Pro")
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
    .domain(d3.extent(actionsOverTimeDataVerbose, function(d) { return new Date(d.date); }))
    .range([ 0, actionsStackedWidth]);

  EarnActivity2.append("g")
    .attr("transform", "translate(0," + actionsStackedHeight + ")")
    .attr("class", "axis")
    .call(d3.axisBottom(actionsOverTimex)
    .tickFormat(d3.utcFormat("%b %y"))
    .tickValues(x.ticks().concat(x.domain())));


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
    .attr("class", function(d) {return actionsOverTimeStackCategories[d.key].replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"").replace(/\s+/g, '') })
    .style("fill", function(d) { name = actionsOverTimeStackCategories[d.key] ; if (name.includes(' - ')){return actionsOverTimeColor(name.split(' - ')[0])} else {return actionsOverTimeColor(name);} })
    .attr("d", d3.area()
      .x(function(d, i) { return actionsOverTimex(new Date(d.data.key)); })
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
    .attr("font-family", "Bryant Pro")
    .attr("font-weight", "Bold")
    .attr("font-size", "1.5vmin")
    .on("mouseover", actionsTakenOverTimeMouseOver)
    .on("mouseout", actionsTakenOverTimeMouseOut);

  EarnActivity2.attr('transform', 'translate(' + width*-.4 + ',' + height*-.2 + ')');


  //------------------6 Use Activity

  svg6.append('text')
    .attr("x", width/-2 + width/30)
    .attr("y", height/-3)
    .text("USE ACTIVITY")
    .style("text-anchor", "start")
    .attr("font-family", "Bryant Pro")
    .attr("font-weight", "500")
    .attr("font-size", "3vmin")
    .style('fill', '#58bbc0');

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
      var UseParentPIPs = useActivityData.children[i].children.map(item => item.pips).reduce((prev, next) => prev + next)
      UseParentCategories.push({name:useActivityData.children[i].name, actions: UseParentActions, pips: UseParentPIPs})
    }
    else{UseParentCategories.push(useActivityData.children[i])
    }
  }

  var UseActionsTotal = UseParentCategories.map(item => item.actions).reduce((prev, next) => prev + next);
  var UsePIPsTotal = UseParentCategories.map(item => item.pips).reduce((prev, next) => prev + next);
  UseParentCategories.unshift({name: "ALL USE ACTIONS", actions: UseActionsTotal, pips: UsePIPsTotal, depth: 0});


  UseTotalBar.append('text')
    .attr("x",  width/-2 + width/30 + TotalBarWidth/2  )
    .attr("y", (height/-10) - TotalBarHeight/2)
    .text(formatNumber(UseActionsTotal))
    .style("text-anchor", "middle")
    .attr("font-family", "museo-sans-rounded, sans-serif")
    .attr("font-weight", "900")
    .attr("font-size", "8vmin")
    .style('fill', 'white');


  UseTotalBar.append('text')
    .attr("x",  width/-2 + width/30 + TotalBarWidth/2 )
    .attr("y", (height/-10) - TotalBarHeight/4)
    .text("Total Use Actions")
    .style("text-anchor", "middle")
    .attr("font-family", "museo-sans-rounded, sans-serif")
    .attr("font-weight", "300")
    .attr("font-size", "4vmin")
    .style('fill', 'white');

  UseTotalBar.append('text')
    .attr("x",  0 + TotalBarWidth/2 )
    .attr("y", (height/-10) - TotalBarHeight/2)
    .text(formatNumber(UsePIPsTotal))
    .style("text-anchor", "middle")
    .attr("font-family", "museo-sans-rounded, sans-serif")
    .attr("font-weight", "900")
    .attr("font-size", "8vmin")
    .style('fill', 'white');

  UseTotalBar.append('text')
    .attr("x",  0 + TotalBarWidth/2 )
    .attr("y", (height/-10) - TotalBarHeight/4)
    .text("Total PIPs Used")
    .style("text-anchor", "middle")
    .attr("font-family", "museo-sans-rounded, sans-serif")
    .attr("font-weight", "300")
    .attr("font-size", "4vmin")
    .style('fill', 'white');

  svg6.append('text')
    .attr("class", "UseActionsLabel")
    .attr("x", TotalBarWidth/-1.5)
    .attr("y",EnvironmentTotalBarHeight/3)
    .text("Use Actions Breakdown")
    .style("text-anchor", "middle")
    .attr("font-family", "Bryant Pro, sans-serif")
    .attr("font-weight", "Bold")
    .attr("font-size", "2.5vw")
    .style('fill', '#58bbc0');

  svg6.append('text')
    .attr("class", "UsePIPsLabel")
    .attr("x", TotalBarWidth/1.5)
    .attr("y",EnvironmentTotalBarHeight/3)
    .text("Use PIPs Breakdown")
    .style("text-anchor", "middle")
    .attr("font-family", "Bryant Pro, sans-serif")
    .attr("font-weight", "Bold")
    .attr("font-size", "2.5vw")
    .style('fill', '#5065a1');

  UseBreakdown = d3.select('.svg6')
    .attr('width', width/2)
    .attr('height', height/2)
    .append('g');

  const useTreemap = d3.treemap()
    .size([maxRadius*1.3, maxRadius*1.300001])
    .paddingOuter(3)
    .paddingInner(3)
    .round(true);

  useTreemap(useActivityActionsData);


  useActivityActionCategories = ["ALL0"];


  for (var i = 0; i < useActivityActionsData.children.length; i++) {
    if(useActivityActionsData.children[i].data.hasOwnProperty("children"))
    {
    useActivityActionCategories.push(useActivityActionsData.children[i].data.name.split(" ")[0] + 1)
    useActivityActionCategories.push(useActivityActionsData.children[i].data.name.split(" ")[0] + 2)}
    else {useActivityActionCategories.push(useActivityActionsData.children[i].data.name.split(" ")[0] +1)}
  }

  var useActivityColor = d3.scaleOrdinal().domain(useActivityActionCategories)
    .range([
    "#76c4b7",
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
      .attr("value", function(d) {return d.value})
      .each(function(d) { d.node = this; });

  var UseTreemapSize;

  useActivityCell.append("rect")
    .attr("class", function(d) { return "ALLUSEACTIONS" + " "+ "useActivity " + d.data.name.split(" ")[0] + " " + stripPunctSpace(d.data.name); })
    .attr("width", function(d, i) {if (i == 0) {UseTreemapSize = d.x1 - d.x0};  return d.x1 - d.x0; })
    .attr("height", function(d) { return d.y1 - d.y0; })
    .style("fill", function(d,i) {

     return useActivityColor(d.data.name.split(" ")[0] + d.depth); });

  useActivityCell.append("clipPath")
    .attr("id", function(d) { return "clip-" + d.data.name; })
    .append("use")
    .attr("xlink:href", function(d) { return "#rect-" + d.data.name + ""; });

  useActivityCell.append("title")
    .text(function(d) { return d.data.name + "\n" + formatNumber(d.value); });

  UseBreakdown.attr('transform', 'translate('+ ((width/-2) + (width/30) + 0) + ',' + height/20 + ')');

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
      .attr("value", function(d) {return d.value})
      .each(function(d) { d.node = this; });

  usePIPsCell.append("rect")
    .attr("class", function(d) { return "ALLUSEACTIONS" + " " + "usePIPs " + d.data.name.split(" ")[0] + " " + stripPunctSpace(d.data.name); })
    .attr("width", function(d, i) {if (i == 0) {UseTreemapSize = d.x1 - d.x0};  return d.x1 - d.x0; })
    .attr("height", function(d) { return d.y1 - d.y0; })
    .style("fill", function(d,i) {
      // return useActivityColor(d.data.name.split(" ")[0] + d.depth); });
      return useActivityColor(d.data.name.split(" ")[0] + d.depth); });

  usePIPsCell.append("clipPath")
    .attr("id", function(d) { return "clip-" + d.data.name; })
    .append("use")
    .attr("xlink:href", function(d) { return "#rect-" + d.data.name + ""; });

  usePIPsCell.append("title")
    .text(function(d) { return d.data.name + "\n" + formatNumber(d.value); });

  PIPsBreakdown.attr('transform', 'translate('+ ((width/2) - (width/30) - UseTreemapSize) + ',' + height/20 + ')');

  function handleUseMouseOver(d, i) {
    d3.selectAll("." + d.name.replace(/\s+/g, '')).transition()
      .style("opacity", .5);
    d3.selectAll(".UseActionsLabel")
      .text(formatNumber(d.actions) + " Actions Taken")
      .style("fill", useActivityColor(d.name));
    d3.selectAll(".UsePIPsLabel")
      .text(formatNumber(d.pips) + " Points Earned")
      .style("fill", useActivityColor(d.name));
  }

  function handleUseMouseOut(d, i) {
    d3.selectAll("." + d.name.replace(/\s+/g, '')).transition()
      .style("opacity", 1);
    d3.selectAll(".UsePIPsLabel")
      .text("Use PIPs Breakdown")
      .style('fill', '#4ba26c');
    d3.selectAll(".UseActionsLabel")
      .text("Use Actions Breakdown")
      .style('fill', '#71bf93');
  }

  UseLegend = d3.select('.svg6')
    .attr('width', width/2)
    .attr('height', height/2)
    .append('g');

  const useLegend = UseLegend.selectAll('g.useLegend')
    .data(UseParentCategories);
  useLegend.exit().remove();

  const newUseLegend = useLegend.enter()
    .append('g').attr('class', 'useLegend');

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
      if (d.name.split(" ")[0] == "ALL"){console.log("ALL0"); return useActivityColor("ALL0")}
      else{
      return useActivityColor(d.name.split(" ")[0] + 1);
    }
    })
    .attr('class', function (d) { return stripPunctSpace(d.name)})
    .on("mouseover", handleUseMouseOver)
    .on("mouseout", handleUseMouseOut);

  newUseLegend.append('text')
    .attr("x", 0)
    .attr("y", function(d, i) {
      return useLegendBarHeight /2 + (i * useLegendBarHeight);
    })
    .attr("dy", ".7vmin")
    .text(d => {return d.name})
    .style("text-anchor", "middle")
    .attr("font-family", "Bryant Pro")
    .attr("font-weight", "Bold")
    .attr("font-size", "1.5vmin")
    .style('fill', 'white')
    .on("mouseover", handleUseMouseOver)
    .on("mouseout", handleUseMouseOut);

  newUseLegend.append('title')
    .text(d => d.name + '\n' + "Actions: " + formatNumber(d.actions) + '\n' + "PIPs: " + formatNumber(d.pips) );

  newUseLegend.attr('transform', 'translate(' + 0 + ',' + ( height/20)  + ')');


  //---------------7 Impact - Environment

  svg7.append('text')
    .attr("x", width/-2 + width/30)
    .attr("y", height/-3)
    .text("IMPACT")
    .style("text-anchor", "start")
    .attr("font-family", "Bryant Pro")
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

  var EnvironmentTotalBarWidth = width/3 - width/45;
  var EnvironmentTotalBarHeight = height/5;
  var EnvironmentTotalBarY = 0;
  var EnvironmentTotalBarTextY1 = TotalBarHeight*.8;
  var EnvironmentTotalBarTextY2 = TotalBarHeight*.5;

  EnvironmentTotalBar = d3.select('.svg7')
    .attr('width', width/2)
    .attr('height', height/2)
    .append('g');

  EnvironmentTotalBar.append('rect')
    .attr("x", width/-2 + width/30)
    .attr("y", EnvironmentTotalBarY)
    .attr("width", EnvironmentTotalBarWidth)
    .attr("height", TotalBarHeight)
    .style('fill', "#71bf93");

  EnvironmentTotalBar.append('text')
    .attr("x",  width/-2 + width/30 + EnvironmentTotalBarWidth*.5 )
    .attr("y", EnvironmentTotalBarTextY2)
    .text(formatNumber(environmentData.children[0].value))
    .style("text-anchor", "middle")
    .attr("font-family", "museo-sans-rounded, sans-serif")
    .attr("font-weight", "900")
    .attr("font-size", "8vmin")
    .style('fill', 'white');

  EnvironmentTotalBar.append('text')
    .attr("x",  width/-2 + width/30 + EnvironmentTotalBarWidth*.5 )
    .attr("y", EnvironmentTotalBarTextY1)
    .text("lbs Carbon Saved")
    .style("text-anchor", "middle")
    .attr("font-family", "museo-sans-rounded, sans-serif")
    .attr("font-weight", "300")
    .attr("font-size", "2.5vw")
    .style('fill', 'white');

  EnvironmentTotalBar.append('rect')
    .attr("x", EnvironmentTotalBarWidth*-.5)
    .attr("y", EnvironmentTotalBarY)
    .attr("width", EnvironmentTotalBarWidth)
    .attr("height", TotalBarHeight)
    .style('fill', "#4ba26c");

  EnvironmentTotalBar.append('text')
    .attr("x", 0)
    .attr("y", EnvironmentTotalBarTextY2)
    .text(formatNumber(environmentData.children[1].value))
    .style("text-anchor", "middle")
    .attr("font-family", "museo-sans-rounded, sans-serif")
    .attr("font-weight", "900")
    .attr("font-size", "8vmin")
    .style('fill', 'white');

  EnvironmentTotalBar.append('text')
    .attr("x",  0  )
    .attr("y", EnvironmentTotalBarTextY1)
    .text("Tree Equivalents")
    .style("text-anchor", "middle")
    .attr("font-family", "museo-sans-rounded, sans-serif")
    .attr("font-weight", "300")
    .attr("font-size", "2.5vw")
    .style('fill', 'white');

  EnvironmentTotalBar.append('rect')
    .attr("x", EnvironmentTotalBarWidth*.5)
    .attr("y", EnvironmentTotalBarY)
    .attr("width", EnvironmentTotalBarWidth)
    .attr("height", TotalBarHeight)
    .style('fill', "#b1d381");

  EnvironmentTotalBar.append('text')
    .attr("x",  0 + EnvironmentTotalBarWidth )
    .attr("y", EnvironmentTotalBarTextY2)
    .text(formatNumber(environmentData.children[2].value))
    .style("text-anchor", "middle")
    .attr("font-family", "museo-sans-rounded, sans-serif")
    .attr("font-weight", "900")
    .attr("font-size", "8vmin")
    .style('fill', 'white');

  EnvironmentTotalBar.append('text')
    .attr("x",  0 + EnvironmentTotalBarWidth )
    .attr("y", EnvironmentTotalBarTextY1)
    .text("lbs Landfill Diversion")
    .style("text-anchor", "middle")
    .attr("font-family", "museo-sans-rounded, sans-serif")
    .attr("font-weight", "300")
    .attr("font-size", "2.5vw")
    .style('fill', 'white');

  EnvironmentTotalBar.attr('transform', 'translate(' + 0 + ',' + height*-.23 + ')');


  svg7.append('text')
    .attr("class", "EnvironmentActionsLabel")
    .attr("x", TotalBarWidth/-1.5)
    .attr("y",EnvironmentTotalBarHeight/3)
    .text("Actions Taken Breakdown")
    .style("text-anchor", "middle")
    .attr("font-family", "Bryant Pro, sans-serif")
    .attr("font-weight", "Bold")
    .attr("font-size", "2.5vw")
    .style('fill', '#71bf93');

  svg7.append('text')
    .attr("class", "EnvironmentSavedLabel")
    .attr("x", TotalBarWidth/1.5)
    .attr("y",EnvironmentTotalBarHeight/3)
    .text("Carbon Saved Breakdown")
    .style("text-anchor", "middle")
    .attr("font-family", "Bryant Pro, sans-serif")
    .attr("font-weight", "Bold")
    .attr("font-size", "2.5vw")
    .style('fill', '#4ba26c');


  var environmentArc = d3.arc()
    .outerRadius(maxRadius*.5)
    .innerRadius(0);


  function handleEnvironmentMouseOver(d, i) {
    d3.selectAll("." + stripPunctSpace(d.name)).transition()
      .style("opacity", .5);
    d3.selectAll(".EnvironmentActionsLabel")
      .text(formatNumber(d.actions) + " Actions Taken")
      // .data(environmentArc)
      .style("fill", environmentBreakdownColor(i));
    d3.selectAll(".EnvironmentSavedLabel")
      .text(formatNumber(d.saved) + " lbs Carbon Saved")
      // .attr("d", environmentArc)
      .style("fill", environmentBreakdownColor(i));
  }

  function handleEnvironmentMouseOut(d, i) {
    d3.selectAll("." + stripPunctSpace(d.name)).transition()
      .style("opacity", 1);
      d3.selectAll(".EnvironmentActionsLabel")
      .text("Actions Taken Breakdown")
      .style('fill', '#71bf93');
    d3.selectAll(".EnvironmentSavedLabel")
      .text("Carbon Saved Breakdown")
      .style('fill', '#4ba26c');
  }

  const EnvironmentBreakdown = d3.select('.svg7')
    .attr('width', width)
    .attr('height', height)
    .append('g');

  var actionsPie = d3.pie()
    .sort(null)
    .value(function(d) { return d.actions; });

  var savedPie = d3.pie()
    .sort(null)
    .value(function(d) { return d.saved; });

  var environmentBreakdownColor = d3.scaleOrdinal()
    .domain(actionsPie(environmentBreakdownData.children))
    .range([
      "#FFF",
      "#e26442",
      "#e9bc57",
      "#4d5494",
      "#75c4b7",
      "#4ba26c"
    ])

  var environmentActionsBreakdownPie = EnvironmentBreakdown.selectAll(".environmentActionsArc")
    .data(actionsPie(environmentBreakdownData.children))
    .enter().append("g")
    .attr("class", "environmentActionsArc");

  environmentActionsBreakdownPie.append("path")
    .attr("d", environmentArc)
    .attr("class", function(d) {return stripPunctSpace(d.data.name) })
    .style("fill", function(d, i) { return environmentBreakdownColor(i); })
    .append("title")
    .data(environmentBreakdownData.children)
    .text(function(d){return d.name + '\n' + 'Actions: ' + formatNumber(d.actions) })

  var environmentSavedBreakdownPie = EnvironmentBreakdown.selectAll(".environmentSavedArc")
    .data(savedPie(environmentBreakdownData.children))
    .enter().append("g")
    .attr("class", "environmentSavedArc");

  environmentSavedBreakdownPie.append("path")
    .attr("d", environmentArc)
    .attr("class", function(d) {return stripPunctSpace(d.data.name)})
    .style("fill", function(d, i) { return environmentBreakdownColor(i); })
    .append("title")
    .data(environmentBreakdownData.children)
    .text(function(d){return d.name + '\n' + 'Saved: ' + formatNumber(d.saved) })


  const EnvironmentBreakdownLegend = d3.select('.svg7')
    .attr('width', width)
    .attr('height', height)
    .append('g');

  const environmentBreakdownLegend = EnvironmentBreakdownLegend.selectAll('g.environmentBreakdownLegend')
      .data(environmentBreakdownData.children);
  EnvironmentBreakdownLegend.exit().remove();

  const newEnvironmentBreakdownLegend = environmentBreakdownLegend.enter()
    .append('g').attr('class', 'environmentBreakdownLegend');

  var environmentBreakdownLegendHeight = maxRadius*1;
  var environmentBreakdownLegendBarHeight = environmentBreakdownLegendHeight/environmentBreakdownData.children.length;

  newEnvironmentBreakdownLegend.append('rect')
    .attr("x", EnvironmentTotalBarWidth*-.5)
    .attr("y", function(d, i) {
     		return (i * environmentBreakdownLegendBarHeight);
     })
    .attr("width", EnvironmentTotalBarWidth)
    .attr("height", environmentBreakdownLegendBarHeight)
    .style('fill',  function(d,i) {return environmentBreakdownColor(i)})
    .attr('class', function (d) { return stripPunctSpace(d.name)})
    .on("mouseover", handleEnvironmentMouseOver)
    .on("mouseout", handleEnvironmentMouseOut);

  newEnvironmentBreakdownLegend.append('text')
    .attr("x", 0)
    .attr("y", function(d, i) {
      return environmentBreakdownLegendBarHeight /2 + (i * environmentBreakdownLegendBarHeight);
    })
    .attr("dy", ".7vmin")
    .text(d => {return d.name})
    .style("text-anchor", "middle")
    .attr("font-family", "Bryant Pro")
    .attr("font-weight", "Bold")
    .attr("font-size", "1.5vmin")
    .style('fill', 'white')
    .on("mouseover", handleEnvironmentMouseOver)
    .on("mouseout", handleEnvironmentMouseOut);

  newEnvironmentBreakdownLegend.append('title')
    .text(d => d.name + '\n' + "Actions: " + formatNumber(d.actions) + '\n' + "Saved: " + formatNumber(d.saved) );

  environmentSavedBreakdownPie.attr('transform', 'translate('  + (TotalBarWidth*1 - maxRadius*.7 ) + ',' + maxRadius*.9 + ')');
  environmentActionsBreakdownPie.attr('transform', 'translate(' + (TotalBarWidth*-1 + maxRadius*.7 ) + ',' + maxRadius*.9 + ')');
  newEnvironmentBreakdownLegend.attr('transform', 'translate(' + 0 + ',' + (maxRadius*.9 - environmentBreakdownLegendHeight/2)  + ')');


  //--------------8 Impact 2

  svg8.append('text')
    .attr("x", width/-2 + width/30)
    .attr("y", height/-3)
    .text("IMPACT")
    .style("text-anchor", "start")
    .attr("font-family", "Bryant Pro")
    .attr("font-weight", "500")
    .attr("font-size", "3vmin")
    .style('fill', '#efa73a');

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

  var EducationTotalBarWidth = width/2 - width/30;
  var EducationTotalBarHeight = height/4;
  var EducationTotalBarY = 0;
  var EducationTotalBarTextY1 = EducationTotalBarHeight*.75;
  var EducationTotalBarTextY2 = EducationTotalBarHeight*.5;

  EducationTotalBar.append('rect')
    .attr("x", width/-2 + width/30)
    .attr("y", EducationTotalBarY)
    .attr("width", EducationTotalBarWidth)
    .attr("height", EducationTotalBarHeight)
    .style('fill', "#5065a1");

  EducationTotalBar.append('text')
    .attr("x",  width/-2 + width/30 + EducationTotalBarWidth/2 )
    .attr("y", EducationTotalBarTextY2)
    .text("$" + formatNumber(investmentEducationData.children[0].value))
    .style("text-anchor", "middle")
    .attr("font-family", "museo-sans-rounded, sans-serif")
    .attr("font-weight", "900")
    .attr("font-size", "8vmin")
    .style('fill', 'white');

  EducationTotalBar.append('text')
    .attr("x",  width/-2 + width/30 + EducationTotalBarWidth/2 )
    .attr("y", EducationTotalBarTextY1)
    .text(investmentEducationData.children[0].name)
    .style("text-anchor", "middle")
    .attr("font-family", "museo-sans-rounded, sans-serif")
    .attr("font-weight", "300")
    .attr("font-size", "2.5vw")
    .style('fill', 'white');

  EducationTotalBar.append('rect')
    .attr("x", 0)
    .attr("y", EducationTotalBarY)
    .attr("width", EducationTotalBarWidth)
    .attr("height", EducationTotalBarHeight)
    .style('fill', "#3b2b68");

  EducationTotalBar.append('text')
    .attr("x",  0 + EducationTotalBarWidth/2 )
    .attr("y", EducationTotalBarTextY2)
    .text("$" + formatNumber(investmentEducationData.children[1].value))
    .style("text-anchor", "middle")
    .attr("font-family", "museo-sans-rounded, sans-serif")
    .attr("font-weight", "900")
    .attr("font-size", "8vmin")
    .style('fill', 'white');

  EducationTotalBar.append('text')
    .attr("x",  0 + EducationTotalBarWidth/2 )
    .attr("y", EducationTotalBarTextY1)
    .text(investmentEducationData.children[1].name)
    .style("text-anchor", "middle")
    .attr("font-family", "museo-sans-rounded, sans-serif")
    .attr("font-weight", "300")
    .attr("font-size", "2.5vw")
    .style('fill', 'white');

  EducationTotalBar.attr('transform', 'translate(' +0 + ',' + height*-.2 + ')');


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
  var LocalEconomyTotalBarTextY1 = LocalEconomyTotalBarHeight*.75;
  var LocalEconomyTotalBarTextY2 = LocalEconomyTotalBarHeight*.5;

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


  //------------------9 IMPACT 3

  svg9.append('text')
    .attr("x", width/-2 + width/30)
    .attr("y", height/-3)
    .text("IMPACT")
    .style("text-anchor", "start")
    .attr("font-family", "Bryant Pro")
    .attr("font-weight", "500")
    .attr("font-size", "3vmin")
    .style('fill', '#efa73a');

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
  var CommunityTotalBarTextY0 = CommunityTotalBarHeight*.4;
  var CommunityTotalBarTextY1 = CommunityTotalBarHeight*.6;
  var CommunityTotalBarTextY2 = CommunityTotalBarHeight*.75;

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
    .attr("x",  width/-3 + width/30  )
    .attr("dx", width/-60)
    .attr("y", HealthTotalBarTextY)
    .text(formatNumber(healthWellnessData.children[0].value))
    .style("text-anchor", "end")
    .attr("font-family", "museo-sans-rounded, sans-serif")
    .attr("font-weight", "900")
    .attr("font-size", "8vmin")
    .style('fill', 'white');

  HealthTotalBar.append('text')
    .attr("x",  width/-3 + width/30  )
    .attr("y", HealthTotalBarTextY)
    .text(healthWellnessData.children[0].name)
    .style("text-anchor", "start")
    .attr("font-family", "museo-sans-rounded, sans-serif")
    .attr("font-weight", "300")
    .attr("font-size", "3vw")
    .style('fill', 'white');

  HealthTotalBar.attr('transform', 'translate(' +0 + ',' + height*.3 + ')');


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
    .attr("font-size", "3vw")
    .style('fill', 'black')
    .text('For Questions or More Info Please Contact:');

  svg10.append('text')
    .attr('y', "12%")
    .style("text-anchor", "middle")
    .attr("font-family", "Bryant Pro, sans-serif")
    .attr("font-weight", "100")
    .attr("font-size", "3vw")
    .style('fill', 'black')
    .text('support@pipsrewards.com')
    .on("click", function() { window.open("mailto: support@pipsrewards.com" ); });

});
