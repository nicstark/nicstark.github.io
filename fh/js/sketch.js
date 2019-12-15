
function preload() {
    tableVar = loadTable('fh.csv', 'csv', 'header');
}

function setup() {
  let width = window.innerWidth -25;
  let height = window.innerHeight -25;
  createCanvas(window.innerWidth,window.innerHeight)
  background(195,225,255)
  // line(0,0,width,height)
  let iconSize = 8;

  tableVar.getRowCount()

  rows = tableVar.rows;

  let births = []
  let lives = []
  for (var i = 0; i < rows.length; i++) {
    //
    let currentPerson ={};
    if (rows[i].obj["Event"] == "Born")
      {
      currentPerson = {"name" : rows[i].obj['Name 1']}
      currentPerson.birth = rows[i].obj["Date 1"];
      for (var j = 0; j < rows.length; j++) {
        if (rows[j].obj["Name 1"] == currentPerson.name && rows[j].obj["Event"] == "Died"){
          // console.log("found death")
          currentPerson.death = rows[j].obj["Date 1"]
        }
        else continue
      };
      lives.push(currentPerson);

      }
    else continue;

    // births.push(rows[i])

  }

  let startDate = Math.abs(Date.parse(lives[0].birth));
  let endDate = Math.abs(Date.parse(lives[lives.length-1].birth)) + startDate;
  let historyDuration = endDate;

  // console.log(startDate)
  // console.log(endDate)

  for (var i = 0; i < lives.length; i++) {
    if (lives[i].birth.length > 4){
      lives[i].birth = lives[i].birth.slice(-4)
    }
    if (lives[i].death){
      console.log(lives)
      if (lives[i].death.length > 4){
        lives[i].death = lives[i].death.slice(-4)
      }
    }
    let widthInt = ((width -50 )/lives.length);
    let heightInt = height - 25 ;
    fixBirthDate = Date.parse(lives[i].birth) + startDate
    fixDeathDate = Date.parse(lives[i].death) + startDate
    birthPos = (fixBirthDate / historyDuration) * heightInt + 50;
    deathPos = (fixDeathDate / historyDuration) * heightInt + 50;
    textSize(9)
    text(lives[i].birth, widthInt * i + 50 -11, birthPos -10)
    text(lives[i].death, widthInt * i + 50 -11, deathPos + 15)
    if (fixBirthDate && fixDeathDate){

    line(widthInt * i + 50, birthPos, widthInt * i + 50, deathPos)}
    else if (fixBirthDate) {line(widthInt * i + 50, birthPos, widthInt * i + 50, heightInt)}
    else {line(widthInt * i + 50, 0, widthInt * i + 50, deathPos)}

    square(widthInt * i + 50 - iconSize/2, deathPos - iconSize/2, iconSize)
    circle(widthInt * i + 50, birthPos , iconSize)

  };
}

function draw() {

}
