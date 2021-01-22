const prompt = require('prompt-sync')({sigint: true});

const hatTile = '^';
const holeTile = 'O';
const fieldTile = '░';
const pathTile = '*';
const playerTile = '|';
const deathTile = 'X';

class Field {
  constructor () {
    this.count = 0;
    this.xSize = 0;
    this.ySize = 0;
    this.hatX = 0;
    this.hatY = 0;
    this.y = 0;
    this.x = 0;
    this.testY = 0;
    this.testX = 0;
    this.map = [];
    this.testMap = [];
    this.verified = false;
    this.exit = false;
    this.validMoves = {
      'u': {y:-1 ,x:0}, 
      'd': {y:+1 ,x:0}, 
      'l': {y:0 ,x:-1}, 
      'r': {y:0 ,x:+1}
    };
    this.gameOver = true;

  };

  //***Number Randomiser***
  random(numRange) {
    const randNo = Math.floor(Math.random()*numRange);
    return randNo;
  };

  
  //***Ask User to Select Level***
  chooseLevel() {
    const mapSizes = {
      small: {x:10, y:7},
      medium: {x:20, y:10},
      large: {x:30, y:14}
    };
    while(!this.exit && this.gameOver) {
      let input = prompt('Choose a map size (small(s), medium(m) or large(l)): ')
      let correctedInput = input.toLowerCase();
      if(correctedInput==='s') {
        this.xSize=mapSizes.small.x;
        this.ySize=mapSizes.small.y;
        this.gameOver=false;
      }
      else if(correctedInput==='m') {
        this.xSize=mapSizes.medium.x;
        this.ySize=mapSizes.medium.y;
        this.gameOver=false;
      }
      else if(correctedInput==='l') {
        this.xSize=mapSizes.large.x;
        this.ySize=mapSizes.large.y; 
        this.gameOver=false; 
      }
      else{console.log('Try again, choose from l, m or s')};
    }
  }

  //***Randomise Hat Placement***
  placeHat() {
    this.hatX=0;
    this.hatY=0;
    this.hatX = this.random(this.xSize);
    //hat must be at east 4 rows down
    while(this.hatY<Math.floor(this.ySize/3)) {
        this.hatY = this.random(this.ySize);
    }
  };

  //***Create Map***
  createMap() {
    this.map = [];
    let rowPlaceholder = [];
    const clearPlaceholder = () => rowPlaceholder = [];
    this.placeHat();
    
    for(let i=0; i<this.ySize; i++) {
      for(let j=0; j<this.xSize; j++) {
        const randomiser = this.random(100);
          if (i===0 && j===0) {
            rowPlaceholder.push(playerTile);
            }
          else if(
            this.hatY===i 
            && 
            this.hatX===j
          ) {
            rowPlaceholder.push(hatTile);
            }
          else if(
            randomiser>=0 
            && 
            randomiser<= 19
          ) {
            rowPlaceholder.push(holeTile);
            }
          else {
            rowPlaceholder.push(fieldTile);
            };
      }
      this.map.push(rowPlaceholder);
      clearPlaceholder();
    }
    console.log('map created');
  };

  //***Create verifably playable map***
  verifiedMap() {
    this.createMap();
    //console.log('verify map started');
    this.verified=false;
    const arrayOfMoves = Object.keys(this.validMoves);
    console.log(`array: ${arrayOfMoves}, 0: ${arrayOfMoves[0]} 1: ${arrayOfMoves[1]} 2: ${arrayOfMoves[2]} 3: ${arrayOfMoves[3]}`)
    this.testMap = this.map;
    const testNode = {y:0, x:0};
    const testArray = [testNode];
    let i=0; 


    const updateIndex = () => i=testArray.length-1;
    const selectTestNode = () => {
      this.y=testArray[i].y;
      this.x=testArray[i].x;
    }
     const unqueueCompletedTest = () => testArray.splice(i,1);

    while(!this.verified && i>=0) {
      
      console.log('do...while loop started');
      
      updateIndex();
      console.log(`index: ${i}`)
      selectTestNode();
      console.log(`Array: ${testArray[i].y} ${testArray[i].x}`);
      console.log(`selected node: y:${this.y} x:${this.x}`);
      console.log(this.testMap);
      
      //loop test through possible moves for each node
      for(let k=0; k<arrayOfMoves.length; k++) {
        console.log(`k: ${k}`);
        const move = this.nextTile(arrayOfMoves[k], this.testMap);
        if(move===hatTile) {
          console.log('next is hat')
          this.verified = true;
          this.print();
        }
        else if(move===fieldTile) {
          console.log(`next is field`)
          this.testMap[this.testY][this.testX] = pathTile;
          testNode.y = this.testY;
          testNode.x = this.testX;
          testArray.unshift(testNode);
        }
        else if(!move || move===holeTile || move===pathTile) {
          console.log(`next is false`)
          //return;
        }
      }
      updateIndex();
      unqueueCompletedTest();
      updateIndex();
    }; 

    if(!this.verified) {
      console.log('did not verify')
      this.verifiedMap();
    }
  };
      
  //***Print Map to Console***
  print() {
    //this.createMap();
    process.stdout.cursorTo(0,0);
    process.stdout.clearScreenDown();
    for(let i=0; i<this.ySize; i++) {
      process.stdout.cursorTo(0,i);
      process.stdout.write(this.map[i].join(''));
      if(i===this.ySize-1) {
        process.stdout.cursorTo(0,i+1);
      }
    }
  };

  //***Reset Game (new map)***
  reset() {
    process.stdout.cursorTo(0,0);
    process.stdout.clearScreenDown();
    this.map=[];
    this.x=0;
    this.y=0;
  };

  //***Retry?***
  retry() {
      while(this.gameOver && !this.exit) {
        let input = prompt('Play another? y/n: ');
        if(input==='y') {
          this.play();
          this.gameOver=false;
        }
        else if(input==='n') {
          process.stdout.cursorTo(0,0);
          process.stdout.clearScreenDown();
          this.exit=true;
        }
        else {
          process.stdout.cursorTo(0,this.ySize);
          process.stdout.clearScreenDown();
          console.log(
            `What does \'${input}\' even mean?\nI'll ask again...`
          )
        };
      }
    };

  //***Types Out a Message Letter by Letter***
  message(text, letterInterval) {
    const timeoutInterval = text.length * letterInterval;
    let typeText = {};
    let clearTO = {};
    let i=0;
    let newString = text[0];
    process.stdout.write(newString);
    i++;

    const letters = () => {
        if(text[i]==='|' && i<text.length) {
            newString='';
        } 
        else if(i<text.length) {
            newString+=text[i];
        }
        process.stdout.clearLine();
        process.stdout.cursorTo(0);
        process.stdout.write(newString);
        i++;     
    }
    const clearTypeText =  () => {
        clearInterval(typeText);
        typeText = {};
        clearTimeout(clearTO);
        clearTO = {};
    }

    typeText = setInterval(letters,letterInterval);
    clearTO = setTimeout(clearTypeText, timeoutInterval)
  }    

  //***Repeat Message for Win/Lose then Retry***
  endMessage(text, letterInterval) {
    let retryTO = {};
    const timeoutInterval = (text.length * letterInterval) + letterInterval;
   
    this.message(text, letterInterval);
      
    const retryGame = () => {
      process.stdout.clearLine();
      process.stdout.cursorTo(0);
      this.gameOver = true;
      this.retry();  
      clearTimeout(retryTO);
      retryTO = {};
    }
    retryTO = setTimeout(retryGame, timeoutInterval)
  };

  //***Win Animation***
  win() {
    this.endMessage('WINNER!!!|WINNER!!!|WIENER!!!', 250);
  }

  //***Lose Animation***
  lose() {
    this.endMessage('LOSER!!!|LOSER!!!|LOSER!!!', 250); 
  };

  //***Character in Current Position***
  currentTile() {
    if(this.y>=0 && this.x>=0) {
      this.map[this.y][this.x];
    } 
    else {
      return;
    }
  };

  //***Character One Move Away***// 
  nextTile(input, map) {
    if(input==='u') this.testY=this.y-1;
    else if(input==='d') this.testY=this.y+1;
    else if(input==='l') this.testX=this.x-1;
    else if(input==='r') this.testX=this.x+1;
    console.log()
    console.log(map);
    console.log(`nextTile: testY: ${this.testY} testX: ${this.testX}`);
    if(
      this.testY<0 
      ||
      this.testX<0 
      ||
      this.testY>=this.ySize 
      ||
      this.testX>=this.xSize
    )
    {
      return false;
    }
    else 
    {
      return map[this.testY][this.testX];
    }
  };

  //***Set Character***
  setCharacter(newCharacter) {
    this.map[this.y][this.x]=newCharacter;
  };

  updateCoordinates(input) {
      if(input==='u') {this.y-=1}
      else if(input==='d') {this.y+=1}
      else if(input==='l') {this.x-=1}
      else if(input==='r') {this.x+=1};
  };


  //***Make the Move***
  makeMove(input) {
    const next = this.nextTile(input, this.map);

    if(
      next===fieldTile
      ||
      next===pathTile
    ) 
    {
      this.setCharacter(pathTile);
      this.updateCoordinates(input);
      this.setCharacter(playerTile);
      this.print();
    }

    else if(next===holeTile) 
    {
      this.setCharacter(pathTile);
      this.updateCoordinates(input);
      this.setCharacter(deathTile);
      this.gameOver=true;
      this.lose();
    }

    else if(next===hatTile) 
    {
      {
        this.gameOver=true;
        this.win();
      } 
    }

    else if(!next) 
    {
      prompt('You step off the edge of the Earth and\nsome time later land right back where\nyou started.\n\nHow strange.\n\nPress Enter to continue...');
      this.print();
    }  
  };

  //***Execute Game***
  game() {
    let mainInstructions = 'Move u, d, l, r (exit(x) or reset(s)): ';
    while
    (
    !this.exit
    &&
    !this.gameOver
    ) 
    {
      process.stdout.cursorTo(0,this.ySize);
      process.stdout.clearScreenDown();
      let rawUserInput = prompt(`${mainInstructions}`);
      let userInput = rawUserInput.toLowerCase();

        //***EXIT***
        if(
            userInput==='exit'
            ||
            userInput==='x'
        ){
          process.stdout.cursorTo(0,0);
          process.stdout.clearScreenDown();
          this.exit=true;
        }

        //***Reset Game (creates new map)***
        else if (
            userInput==='reset'
            ||
            userInput==='s'
        ) {
            this.reset();
            //this.verifyMap();
            while(!this.verified) {
              this.createMap();
              this.verifiedMap();
            }
            this.print();
            this.game();
            }
            

        //***Move***
        else if(this.validMoves[userInput]) {
            this.makeMove(userInput);
            process.stdout.cursorTo(0,this.ySize);
            process.stdout.clearScreenDown();
        }

        //***Bad Entry Error***
        else {
        process.stdout.cursorTo(0,this.ySize);
        process.stdout.clearScreenDown();
        userInput = prompt('Wut, that maked NO sense. Press \'enter\' and try again ')
        }
    }
  } 
  play() {
    this.chooseLevel();
    this.reset();
    this.verified=false;
      console.log('lets clean this mutha')  
    this.verifiedMap();
    console.log(`should this play? ` + this.verified)
    console.log('print...')
    
    //this.print();
    this.game();
  }  
};

const newField = new Field();
newField.play();
