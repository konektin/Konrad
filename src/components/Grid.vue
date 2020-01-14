<template>
	<div>
		<div class="gameStatus" :class="gameStatusColor">
			{{ gameStatusMessage }}
		</div>
		<table class="grid">
		  <tr>
		    <cell name="1"></cell>
		    <cell name="2"></cell>
		    <cell name="3"></cell>
			<cell name="4"></cell>
			<cell name="5"></cell>
		  </tr>
		  <tr>
		    <cell name="6"></cell>
		    <cell name="7"></cell>
		    <cell name="8"></cell>
			<cell name="9"></cell>
			<cell name="10"></cell>
		  </tr>
		  <tr>
		    <cell name="11"></cell>
			<cell name="12"></cell>
		    <cell name="13"></cell>
		    <cell name="14"></cell>
			<cell name="15"></cell>
		  </tr>
		  <tr>
		    <cell name="16"></cell>
			<cell name="17"></cell>
		    <cell name="18"></cell>
		    <cell name="19"></cell>
			<cell name="20"></cell>
		  </tr>
		  <tr>
		    <cell name="21"></cell>
			<cell name="22"></cell>
		    <cell name="23"></cell>
		    <cell name="24"></cell>
			<cell name="25"></cell>
		  </tr>
		</table>
	</div>
</template>

<script>
import Cell from './Cell.vue'
export default {
	components: { Cell },
  data () {
    return {
    	activePlayer: 'O',
    	gameStatus: 'turn',
    	gameStatusMessage: 'Tura O',
    	gameStatusColor: 'statusTurn',
    	moves: 0,
			cells: {
				1: '', 2: '', 3: '', 4: '', 5: '', 
				6: '', 7: '', 8: '', 9: '', 10: '', 
				11: '', 12: '', 13: '', 14: '', 15: '',
				16: '', 17: '', 18: '', 19: '', 20: '',
				21: '', 22: '', 23: '', 24: '', 25: ''
			},
			
			winConditions: [
				[1, 2, 3, 4], [2, 3, 4, 5], [6, 7, 8, 9], [7, 8, 9, 10], [11, 12, 13, 14], [12, 13, 14, 15], [16, 17, 18, 19], [17, 18, 19, 20], [21, 22, 23, 24], [22, 23, 24, 25],// rows
				[1, 6, 11, 16], [6, 11, 16, 21], [2, 7, 12, 17], [7, 12, 17, 22], [3, 8, 13, 18], [8, 13, 18, 23], [4, 9, 14, 19], [9, 14, 19, 24], [5, 10, 15, 20], [10, 15, 20, 25], // columns
				[1, 7, 13, 19], [7, 13, 19, 25], [6, 12, 18, 24], [2, 8, 14, 20], [4, 8, 12, 16], [5, 9, 13, 17], [9, 13, 17, 21], [10, 14, 18, 22]       // diagonals
			],
    }
  },
   computed: {
  	nonActivePlayer () {
  		if (this.activePlayer === 'O') {
  			return 'X'
  		}
  		return 'O'
  	}
  },
  watch: {
  	gameStatus () {
  		if (this.gameStatus === 'win') {
  			this.gameStatusColor = 'statusWin'
  			return
  		} else if (this.gameStatus === 'draw') {
  			this.gameStatusColor = 'statusDraw'
  			this.gameStatusMessage = 'Draw !'
  			return
  		}
		  else if (this.gameStatus === 'turn') {
  			this.gameStatusColor = 'statusTurn'
  			this.gameStatusMessage = `Tura ${this.activePlayer}`
  			return
  		}
			 
  	}
  },
  methods: {
  	changePlayer () {
			this.activePlayer = this.nonActivePlayer
		},
		checkForWin () {
			for (let i = 0; i < this.winConditions.length; i++) {
				let wc = this.winConditions[i]
				let cells = this.cells
				if (this.areEqual(cells[wc[0]], cells[wc[1]], cells[wc[2]], cells[wc[3]])) {
					return true
				}
			}
			return false
		},
		gameIsWon () {			
			Event.$emit('win', this.activePlayer)
			this.gameStatusMessage = `${this.activePlayer} Wins !`
			Event.$emit('freeze')
			return 'win'
		},
		changeGameStatus () {
			if (this.checkForWin()) {
				return this.gameIsWon()
			} else if (this.moves === 25) {
				return 'draw'
			}
			return 'turn'
		},
		areEqual () {
		  var len = arguments.length;
		  for (var i = 1; i < len; i++){
		    if (arguments[i] === '' || arguments[i] !== arguments[i-1])
		      return false;
		   }
		   return true;
		}
  },
  created () {
  	Event.$on('strike', (cellNumber) => {
			this.cells[cellNumber] = this.activePlayer
			this.moves++
			this.gameStatus = this.changeGameStatus()
			this.changePlayer()
  	})

  	Event.$on('gridReset', () => {
  		Object.assign(this.$data, this.$options.data())
  	})
  }
}
</script>

<style>
.grid {
	background-color: #34495e;
	color: #fff;
  width: 100%;
  border-collapse: collapse;
}
.gameStatus {
	margin: 0px;
	padding: 15px;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  background-color: #f1c40f;
  color: #fff;	
  font-size: 1.4em;
  font-weight: bold;
}
.statusTurn {
	background-color: #f1c40f;
}
.statusWin {
	background-color: #2ecc71;
}
.statusDraw {
	background-color: #9b59b6;
}
</style>