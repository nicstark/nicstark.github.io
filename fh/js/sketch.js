
let scale = .0001;
let birthTextMargin = 10000*scale;
let margin2 = 10000*scale;
let deathTextMargin = 20000*scale;
let birthTextSize = 10000*scale;
let deathTextSize = 8*scale;
let nameTextSize = 8*scale;
let strokeWidth = scale*1000;
let iconSize = scale*10000;

function preload() {
    tableVar = loadTable('fh.csv', 'csv', 'header');
}

let lives = []

let backgroundColor1 = 195;
let backgroundColor2 = 215;
let backgroundColor3 = 245;





let widthInt;


let width;
let height;


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
      try{currentPerson.parent1 = rows[j].obj["Name 2"];}
        catch {}
      try{currentPerson.parent2 = rows[j].obj["Name 3"];}
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



        // if (rows[j].obj["Name 2"] == currentPerson.name && rows[j].obj["Event"] == "Born"){
        //   currentPerson.parent1 = rows[j].obj["Name 2"];
        //   currentPerson.parent2 =rows[j].obj["Name 3"];
        // }


        else {continue};
      };




      // livesParse(j).children =

      let nameString = currentPerson["name"].toString();
      lives.push({[nameString] : currentPerson});


      }
    else continue;

  }

  for (var i = 0; i < lives.length; i++) {
    for (var j = 0; j < lives.length; j++) {
          // livesParse(i).children =
        }
      lives[i]
      }

  // console.log(Object.keys(lives[0])[0]);
  // console.log(lives[0][Object.keys(lives[0])[0]].birth);
  // console.log(livesParse(0).birth)

  let marriageSort;

  lives = lives.sort((a, b) => (a[Object.keys(a)[0]].birth > b[Object.keys(b)[0]].birth) ? 1 : -1)

  for (var i = 0; i < lives.length; i++) {
    for (var j = 0; j < lives.length; j++) {
      if (livesParse(i).marriageTo == livesParse(j).name){
        if (Math.abs(j - i) != 1 ){
          lives = immutableMove(lives, j, i+1)
        }
        // square(widthInt * i, height/2, 200)
        // console.log("found marriage")
      }
    }
  }

  for (var i = 0; i < lives.length; i++) {
    lives[i]
  }

  let startDateAbs = Math.abs(moment(livesParse(0).birth));
  // let startDate = 0;
  let endDate = moment() + startDateAbs;
  let historyDuration = endDate + startDateAbs/2;

  for (var i = 0; i < lives.length; i++) {
    if (livesParse(i).birth.length > 4){
      livesParse(i).birth = livesParse(i).birth.slice(-4)
    }

    widthInt = (((width)/lives.length))/4;
    let heightInt = height/4 ;
    livesParse(i).birthDateAbs = moment(livesParse(i).birth) + startDateAbs;

    // let fixDeathDate;
    function deathCheck() {
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
    }

    deathCheck()

    livesParse(i).birthPos = (livesParse(i).birthDateAbs / historyDuration) * heightInt +  margin2;
    livesParse(i).deathPos = (livesParse(i).deathDateAbs / historyDuration) * heightInt +  margin2;
    // (livesParse(i).deathDateAbs / historyDuration) * heightInt +  margin2;

    let marriagePos
    let marriageDateAbs

    if (livesParse(i).marriageDate) {
      livesParse(i).marriageDateAbs = moment(livesParse(i).marriageDate) + startDateAbs;
      livesParse(i).marriagePos = (livesParse(i).marriageDateAbs / historyDuration) * heightInt + margin2;
    }

    livesParse(i).birthYear = moment(livesParse(i).birth["_i"]).format("YYYY").toString()

    try{
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
    finally{}

      // quad(widthInt * i +  margin2, livesParse(i).marriagePos, widthInt * (i + 1) +  margin2, livesParse(i).marriagePos, widthInt * (i + 1) +  margin2, marriageEnd, widthInt * i +  margin2, marriageEnd)

  }
  console.log("predraw ran")
}

function draw(){
    background(backgroundColor1,backgroundColor2,backgroundColor3)
    fill(255)
    stroke(0)
    textSize(birthTextSize)
    pg = createGraphics(width, height, SVG);
    // pg.background(backgroundColor1,backgroundColor2,backgroundColor3);
    pg.rotate(HALF_PI)

    predraw()
    for (var i = 0; i < lives.length; i++) {

    strokeWeight(strokeWidth);
    pg.textSize(nameTextSize)

    //RENDER LINES

    //BIRTH + DEATH
    if (livesParse(i).birthDateAbs && livesParse(i).deathDateAbs){
      line(widthInt * i +  margin2, livesParse(i).birthPos, widthInt * i +  margin2, livesParse(i).deathPos)
    }

    //BIRTH ONLY
    else if (livesParse(i).birthDateAbs) {line(widthInt * i +  margin2, livesParse(i).birthPos, widthInt * i +  margin2, heightInt)}

    //DEATH ONLY
    else {
      line(widthInt * i +  margin2, margin2, widthInt * i +  margin2, livesParse(i).deathPos)}

      //BIRTH TEXT
      strokeWeight(0)
      fill(0)
      textAlign(CENTER)
      text(livesParse(i).birthYear, widthInt * i + margin2, livesParse(i).birthPos -  birthTextMargin) ;
      strokeWeight(strokeWidth)
      fill(255)
      if (livesParse(i).marriageDate && livesParse(i+1).marriageTo == livesParse(i).name){
         quad(widthInt * i +  margin2, livesParse(i).marriagePos, widthInt * (i + 1) +  margin2, livesParse(i).marriagePos, widthInt * (i + 1) +  margin2, livesParse(i).marriageEnd, widthInt * i +  margin2, livesParse(i).marriageEnd)
      }

      //DEATH TEXT + ICON

      if (livesParse(i).death == undefined) {
        // triangle(widthInt * i +  margin2 - iconSize/2, deathPos, widthInt * i +  margin2 + iconSize/2, deathPos, widthInt * i +50, deathPos + iconSize )
      }
      else {
        square(widthInt * i +  margin2 - iconSize/2, livesParse(i).deathPos - iconSize/2, iconSize);
        strokeWeight(0)
        fill(0)
        text(livesParse(i).deathYear, widthInt * i + margin2, livesParse(i).deathPos + deathTextMargin)
        strokeWeight(strokeWidth)
        fill(255)
      };
    circle(widthInt * i +  margin2, livesParse(i).birthPos , iconSize)
    };
  image(pg, 0,0 )


  save()

}
