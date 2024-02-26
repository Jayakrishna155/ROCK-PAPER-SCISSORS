       
       
    document.querySelector('.rock-button').addEventListener('click',()=>
    {
      playGame('Rock');
    })
    document.querySelector('.paper-button').addEventListener('click',()=>
    {
      playGame('Paper');
    })
    document.querySelector('.scissor-button').addEventListener('click',()=>
    {
      playGame('Scissor');
    })
           
    document.body.addEventListener('keydown',(event)=>{
      if(event.key==='r')
      {
        playGame('Rock');
      }
      else if(event.key === 'p')
      {
        playGame('Paper');
      }
      else
      {
        playGame('Scissor');
      }
    })
       let result,randomNumber;
       let Rounds=localStorage.getItem('Rounds') || 0; 
          let score = JSON.parse(localStorage.getItem('score')) || 
          {
            Wins:0,
            Lost:0,
            Tie:0,
          };
          
          function computerchoice()
          {
                randomNumber=Math.random();
                if(randomNumber >=0 && randomNumber< 1/3) { computerMove='Rock';} 
                else if(randomNumber>=1/3 && randomNumber< 2/3)  { computerMove='Paper';} 
                else { computerMove='Scissor';}
                return computerMove;
         }
         function scoreboard()
         {
            document.querySelector('.js-rounds').innerHTML=`--------------------   Rounds played : ${Rounds}   --------------------`;
          document.querySelector('.js-score').innerHTML=` Wins : ${score.Wins}, Loses : ${score.Lost}  Ties : ${score.Tie}`;
         }

         
         function playGame(usermove)
         {
                      const computerMove = computerchoice();
                        if(computerMove === usermove)
                        {
                            result = 'Tie.';
                            score.Tie++;
                        }
                        else if( (computerMove==='Rock' && usermove==='Paper' ) ||  (computerMove==='Paper' && usermove==='Scissor' ) ||
                        (computerMove==='Scissor' && usermove==='Rock' )  )
                        {
                           result = 'You win.';
                           score.Wins++;
                        }
                        else
                        {
                            result = 'You lost.';
                            score.Lost++;
                        }
                        Rounds++;
                        localStorage.setItem('Rounds',Rounds)
                           localStorage.setItem('score',JSON.stringify(score));
                           document.querySelector('.js-res').innerHTML=result;
                           document.querySelector('.js-move').innerHTML=`You <img src="images/${usermove}-emoji.png">
                                               <img src="images/${computerMove}-emoji.png"> Computer`;
                           scoreboard();
         }

        function resetscore()
        {
            score.Lost=0;
            score.Wins=0;
            score.Tie=0;
            Rounds=0;
            localStorage.removeItem('score');
            localStorage.removeItem('Rounds');
            scoreboard();
            document.querySelector('.js-res').innerHTML=null;
            document.querySelector('.js-move').innerHTML=null;
        }
          scoreboard();
          let isplaying = false;
          let intervalId;
        function autoplay()
        {
          if(!isplaying)
          {
       intervalId = setInterval( function()
            {
              playGame(computerchoice());
            },1000);
            isplaying=true;
          }
          else{
                  clearInterval(intervalId);
                  isplaying=false;
          }

        }

