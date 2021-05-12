'''
=-=-=-= A Tic Tac Toe =-=-=-=-=
=-= Composer: Brandon Rimes =-=
=-=-=-=- 11 Feb 20201 =-=-=-=-=

Type "exit" any time to quit.
Player chooses and enters a number representing the board position
they want to occupy. Game displays the board in the CLI, alternates
between two players, and resets automatically when the game ends.
'''

class Player:
    def __init__(self,name=0,token=''):
        self.name = name
        self.token = token

class Game(Player):
    def __init__(self,board='0|1|2\n3|4|5\n6|7|8'):
        super().__init__()
        self.board = board

    def __repr__(self): #create command line board visual
        return '\033[4m'+self.board[0:11]+'\033[0m'+self.board[11:17]

    def move(self,place,player): #replace board number with player token
        self.token = player
        self.board = self.board.replace(place, self.token)
    
    def calc_winner(self): #strip board visuals, slice board into winning shapes to determine if a win condition has been met
        win = self.board.replace('\n','').replace('|','')
        won = win[::4],win[2:8:2],win[::3],win[1::3],win[2::3],win[0:3],win[3:6],win[6:9]
        if 'XXX' in won:
            return 1
        elif 'OOO' in won:
            return 2

    def is_full(self): #returns true if board full
        return ''.join(sorted(self.board.replace('\n','').replace('|',''))) == 'OOOOXXXXX'

    def is_game_over(self): #returns true if board full or player won
        if self.is_full() == True or self.calc_winner() == 1 or self.calc_winner() == 2:
            return True

    def reset_board(self): #set board to initial state
        self.board = '0|1|2\n3|4|5\n6|7|8'

game = Game()

players = 1
while True:

    print(f'\n{game.__repr__()}') #display board in CLI

    if players == 1: #assign player token
        player = 'X'
    else:
        player = 'O'

    move = input(f'\nPlayer {players}\nPlace Token: >>> ') #player chooses numbered board position
    if move == 'exit':
        break
    if move in game.board and move not in 'XxOo': #account for illegal/invalid placement
        game.move(move, player)
    else:
        print('\nInvalid Placement')
        continue   
    if game.calc_winner() != None: #check for win conditions
        print(f'\n{game.__repr__()}')
        print(f'\nWinner: Player {game.calc_winner()}')
    if game.is_game_over() == True: #handle game end/reset
        print('\nGame Over')
        game.reset_board()
        players = 1
        continue
    
    if players == 1: #alternate between Players one and two
        players += 1
    else:
        players -= 1