class Quiz {
  constructor(){}

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      contestant = new Contestant();
      var contestantCountRef = await database.ref('contestantCount').once("value");
      if(contestantCountRef.exists()){
        contestantCount = contestantCountRef.val();
        contestant.getCount();
      }
      question = new Question()
      question.display();
    }
  }

  play(){
    //write code here to hide question elements
    question.hide();

    //write code to change the background color here
    background("yellow");

    //write code to show a heading for showing the result of Quiz
    fill("black");
    textSize(25);
    text("Result of the Quiz", 300, 30);

    //call getContestantInfo( ) here
    Contestant.getPlayerInfo();
    //write condition to check if contestantInfor is not undefined
    console.log(allContestants);
    if(allContestants !== undefined){
      var Y = 240;
      fill("blue");
      textSize(20);
      text("*NOTE: Contestants who answered correct are highlighted in green color!", 130, 230);

      for(var i in allContestants){
        var correctAnswer = "2";
        if(correctAnswer === allContestants[i].answer){
          fill("green");
        }else{
          fill("red");
      }
      Y = Y+20;
      textSize(20);
      text(allContestants[i].name + ":" + allContestants[i].answer, 250, Y);
      }
    }

    //write code to highlight contest who answered correctly
    
  }

}
