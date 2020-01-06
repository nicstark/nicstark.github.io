
let scale = .0001;
let birthTextHeight = 3000*scale;
let widthMargin = 100000*scale;
// widthMargin = 0*scale;
let birthTextMargin = -9.5;
let heightMargin = 100000*scale;
let deathTextMargin = 5000*scale;
let nameTextMargin = 40000*scale;
let birthTextSize = 10000*scale;
let deathTextSize = 8*scale;
let nameTextSize = 8*scale;
let strokeWidth = scale*1000;
let iconSize = scale*4000;

let lives = []
let livesObj = {}

let backgroundColor1 = 195;
let backgroundColor2 = 215;
let backgroundColor3 = 245;

let widthInt;

let width;
let height;

let historyDuration;
let yearStart;
let yearEnd;
let yearSpan;
function preload() {
    tableVar = loadTable('fh.csv', 'csv', 'header');
}

function immutableMove(arr, from, to) {
  return arr.reduce((prev, current, idx, self) => {
    if (from === to) {
      prev.push(current);
    }
    if (idx === from) {
      return prev;
    }
    if (from < to) {
      prev.push(current);
    }
    if (idx === to) {
      prev.push(self[from]);
    }
    if (from > to) {
      prev.push(current);
    }
    return prev;
  }, []);
}

function livesParse(integer){
  return lives[integer][Object.keys(lives[integer])[0]]
}


function setup() {
  width = windowWidth/2;
  height = windowHeight/2;
  createCanvas(width, height, SVG)
  // frameRate(30)
  noLoop();
}


function predraw() {

  tableVar.getRowCount()

  rows = tableVar.rows;

  let currentMoment;

  for (var i = 0; i < rows.length; i++) {
    let currentPerson ={};
    if (rows[i].obj["Event"] == "Born")
      {
      currentPerson = {"name" : rows[i].obj['Name 1']}
      // currentPerson.birthBackup = rows[i].obj["Date 1"];
      currentPerson.birth = moment(rows[i].obj["Date 1"]);
      // console.log(rows[j].obj["Name 2"]);
      try{currentPerson.parent1 = rows[i].obj["Name 2"];}
        catch {}
      try{currentPerson.parent2 = rows[i].obj["Name 3"];}
        catch {}

      for (var j = 0; j < rows.length; j++) {
        if (rows[j].obj["Name 1"] == currentPerson.name && rows[j].obj["Event"] == "Died"){
          currentPerson.death = moment(rows[j].obj["Date 1"])
        }

        if (rows[j].obj["Name 1"] == currentPerson.name && rows[j].obj["Event"] == "Married"){
          currentPerson.marriageDate = moment(rows[j].obj["Date 1"])
          currentPerson.marriageTo = rows[j].obj["Name 2"];
        }

        if (rows[j].obj["Name 2"] == currentPerson.name && rows[j].obj["Event"] == "Married"){
          currentPerson.marriageDate = moment(rows[j].obj["Date 1"])
          currentPerson.marriageTo = rows[j].obj["Name 1"];
        }
        else {continue};
      };

      let nameString = currentPerson["name"].toString();
      lives.push({[nameString] : currentPerson});
      }
    else continue;

  }

  let marriageSort;

  lives = lives.sort((a, b) => (a[Object.keys(a)[0]].birth > b[Object.keys(b)[0]].birth) ? 1 : -1)

  for (var i = 0; i < lives.length; i++) {
    for (var j = 0; j < lives.length; j++) {
      if (livesParse(i).marriageTo == livesParse(j).name){
        if (Math.abs(j - i) != 1 ){
          lives = immutableMove(lives, j, i+1)
        }
      }
    }
  }


  let startDateAbs = Math.abs(moment(livesParse(0).birth));
  let endDate = moment() + startDateAbs;

  historyDuration = endDate;

  yearSpan = Math.round(endDate/(1000*60*60*24*365))


  for (var i = 0; i < lives.length; i++) {
    if (livesParse(i).birth.length > 4){
      livesParse(i).birth = livesParse(i).birth.slice(-4)
    }

    heightInt = ((height/lives.length))*.2;
    let widthInt = width/5 ;

    livesParse(i).birthDateAbs = moment(livesParse(i).birth) + startDateAbs;

    // let fixDeathDate;
    if (livesParse(i).death){
      // console.log(lives[i].death)
      livesParse(i).deathDateAbs = moment(livesParse(i).death) + startDateAbs;
      livesParse(i).deathYear = moment(livesParse(i).death).format("YYYY");


    }
    else {
      // livesParse(i).death = moment();

      livesParse(i).deathDateAbs = moment() + startDateAbs;
      livesParse(i).deathYear = moment().year();
    }


    // deathCheck()

    livesParse(i).birthPos = (livesParse(i).birthDateAbs / historyDuration) * widthInt;
    livesParse(i).deathPos = (livesParse(i).deathDateAbs / historyDuration) * widthInt;
    // (livesParse(i).deathDateAbs / historyDuration) * heightInt +  widthMargin;

    let marriagePos
    let marriageDateAbs

    if (livesParse(i).marriageDate) {
      livesParse(i).marriageDateAbs = moment(livesParse(i).marriageDate) + startDateAbs;
      livesParse(i).marriagePos = (livesParse(i).marriageDateAbs / historyDuration) * widthInt;
    }

    livesParse(i).birthYear = moment(livesParse(i).birth["_i"]).format("YYYY").toString()

    try {
      if (livesParse(i).marriageDate && livesParse(i-1).marriageTo == livesParse(i).name){
        // console.log()
        if (livesParse(i).deathPos > livesParse(i-1).deathPos){
          livesParse(i).marriageEnd = livesParse(i-1).deathPos
          livesParse(i-1).marriageEnd = livesParse(i-1).deathPos
        }
        else {
          livesParse(i).marriageEnd = livesParse(i).deathPos;
          livesParse(i-1).marriageEnd = livesParse(i).deathPos;
        }
      }
    }

    catch{}
  }
  // FIND CHILDREN
  for (var i = 0; i < lives.length; i++) {
    if (livesParse(i).parent1){
      for (var j = 0; j < lives.length; j++) {
        if (livesParse(j).name == livesParse(i).parent1){
          if (!livesParse(j).offspring){
          livesParse(j).offspring = [];
          }
          livesParse(j).offspring.push(lives[i])
        }
      }
    }
    if (livesParse(i).parent2){
      for (var j = 0; j < lives.length; j++) {
        if (livesParse(j).name == livesParse(i).parent2){
          if (!livesParse(j).offspring){
          livesParse(j).offspring = [];
          }
          livesParse(j).offspring.push(lives[i])
        }
      }
    }
  }

  // SORT CHILDREN

  for (var i = 0; i < lives.length; i++) {
    if (livesParse(i).offspring) {
      try{
      livesParse(i).offspring.sort((a, b) => (a[Object.keys(a)[0]].birth > b[Object.keys(b)[0]].birth) ? 1 : -1)
      }
      catch(error){console.log(error)}
    }
  }
  //
  // // FIND TOP CHILD COUNT
  // let topChlidCount = 0;
  // for (var i = 0; i < lives.length; i++) {
  //   if (livesParse(i).offspring) {
  //     if (livesParse(i).offspring.length > topChlidCount) {
  //       topChlidCount = livesParse(i).offspring.length
  //     }
  //   }
  // }

  // topChlidCount = 100
  //
  // // ADD INDEX
  // for (var i = 0; i < lives.length; i++) {
  //   livesParse(i).index = i * topChlidCount
  // }
  //
  // //FIX INDEX FOR OFFSPRING
  // for (var i = 0; i < lives.length; i++) {
  //   if (livesParse(i).offspring){
  //     // console.log(livesParse(i).offspring.length)
  //     for (var j = 0; j < livesParse(i).offspring.length; j++) {
  //       // console.log()
  //       for (var k = 0; k < lives.length; k++) {
  //         if (Object.keys(livesParse(i).offspring[j])[0] == livesParse(k).name) {
  //           livesParse(k).index = livesParse(i).index + j + 1
  //         }
  //       }
  //       // console.log(Object.keys(livesParse(i).offspring[j])[0])
  //       // livesParse(i).offspring[j].index = livesParse(i).index + 1 + j
  //     }
  //   }
  // }

  // lives = lives.sort((a, b) => (a[Object.keys(a)[0]].index > b[Object.keys(b)[0]].index) ? 1 : -1)

}

function draw(){
    background(backgroundColor1,backgroundColor2,backgroundColor3)

    predraw()
    fill(255)
    // strokeWeight(0)
    noStroke()
    //RENDER GRID
    for (var i = 0; i < yearSpan; i++) {
      noStroke()
      if (i % 2) {fill('rgba(250,250,250, 0)') }
      else if (i % 10) {fill('rgba(255,255,255,.2)')}
      else {fill('rgba(255,255,255,.4)');}
      quad(
        (width/5/yearSpan) * i + widthMargin, 0,
        (width/5/yearSpan) * i + widthMargin, height,
        (width/5/yearSpan) * (i + 1) + widthMargin, height,
        (width/5/yearSpan) * (i + 1) + widthMargin , 0
      )
      // if(i % 10){strokeWeight(strokeWidth); noStroke()} else{stroke(100)}
      noStroke();
    }



    fill(255)
    stroke(0)
    textSize(birthTextSize)
    strokeWeight(strokeWidth);


    //RENDER MARRIAGES
    for (var i = 0; i < lives.length; i++) {
      if (livesParse(i).marriageDate && livesParse(i+1).marriageTo == livesParse(i).name){
         quad(
           livesParse(i).marriagePos + widthMargin, heightInt * i +  heightMargin,
           livesParse(i).marriagePos + widthMargin, heightInt * (i + 1) +  heightMargin,
           livesParse(i).marriageEnd + widthMargin, heightInt * (i + 1) +  heightMargin,
           livesParse(i).marriageEnd + widthMargin, heightInt * i +  heightMargin
         )
      }
    }

    //RENDER LINES
    for (var i = 0; i < lives.length; i++) {
      if(i % 2){livesParse(i).color = 100} else {livesParse(i).color = 0}
      stroke(livesParse(i).color)
        line(
          livesParse(i).birthPos + widthMargin, heightInt * i + heightMargin,
          livesParse(i).deathPos + widthMargin, heightInt * i +  heightMargin
        )
      stroke(0)
    }




    for (var i = 0; i < lives.length; i++) {

        //BIRTH TEXT
        strokeWeight(0)
        fill(0)
        textAlign(RIGHT)
        stroke(livesParse(i).color)
        fill(livesParse(i).color)
        text(livesParse(i).name + " " + livesParse(i).birthYear , livesParse(i).birthPos -  birthTextMargin , heightInt * i + birthTextHeight + heightMargin) ;
        strokeWeight(strokeWidth)
        stroke(0)
        fill(255)


        // DEATH TEXT + ICON + NAME

        if (livesParse(i).death == undefined) {
          strokeWeight(0)
          fill(0)
          // textAlign(LEFT)
          // text(livesParse(i).name, (widthInt * i) + widthMargin, livesParse(i).deathPos + deathTextMargin)
          strokeWeight(strokeWidth)
          fill(255)
          textAlign(CENTER)

          // triangle(widthInt * i +  widthMargin - iconSize/2, deathPos, widthInt * i +  widthMargin + iconSize/2, deathPos, widthInt * i +50, deathPos + iconSize )
        }
        else {
          stroke(livesParse(i).color)
          square(livesParse(i).deathPos - iconSize/2 + widthMargin , heightInt * i +  heightMargin - iconSize/2,  iconSize);
          strokeWeight(0)
          fill(0)
          textAlign(LEFT)
          stroke(livesParse(i).color)
          text(livesParse(i).deathYear,  livesParse(i).deathPos + widthMargin + deathTextMargin, heightInt * i + heightMargin + birthTextHeight)
          // textAlign(LEFT)
          // text(livesParse(i).name, widthInt * i + widthMargin, livesParse(i).deathPos + nameTextMargin)
          strokeWeight(strokeWidth)
          stroke(0)
          fill(255)
          textAlign(CENTER)

        };
      if (livesParse(i).offspring) {
        for (var j = 0; j < livesParse(i).offspring.length; j++) {
          for (var k = 0; k < lives.length; k++) {
            if (Object.keys(livesParse(i).offspring[j])[0] == livesParse(k).name) {
              stroke(livesParse(k).color)
              fill(livesParse(i).color)
              line(
                livesParse(k).birthPos + widthMargin, heightInt * i + heightMargin,
                livesParse(k).birthPos + widthMargin, heightInt * k + heightMargin
              )
              stroke(0)

            }
          }
        }
      }
      stroke(livesParse(i).color)
      fill(255)
      circle(livesParse(i).birthPos + widthMargin, heightInt * i +  heightMargin, iconSize)
      stroke(0)
    };


  save()

}
