<template id="">
  <div class="content columns">
    <nav class="nav is-primary"></nav>
    <div class="column flex flex-center flex-column"
      style="overflow: scroll; height: 100%">
      <div v-if="errorMessage">ERROR: {{ errorMessage }}</div>
      <div class="">
        <div>{{ sessionId }}</div>
      </div>
      <table class="table">
        <tr>
          <th>Challengers</th>
          <th></th>
          <th></th>
        </tr>
        <tr v-for="request in challengeRequests">
          <td> {{ request.challenger }} </td>
          <td> <button class="button is-primary" type="button" v-on:click="onAcceptClick(request)"> Accept </button> </td>
          <td> <button class="button" type="button" v-on:click="declineChallenge(request)"> Decline </button> </td>
        </tr>
      </table>
      <table class="table">
        <tr>
          <th>Challenges Sent</th>
          <th></th>
        </tr>
        <tr v-for="challenge in challengesSent">
          <td>challenge.opponent</td>
          <td> <button class="button" type="button" v-on:click="onChallengeCancelClick(challenge)"> Cancel </button> </td>
        </tr>
      </table>
    </div>
    <div class="column is-4">
      <div class="card">
        <div class="card-content column">
          <div class="column"><input class="input" v-model="defenderSessionId"></input></div>
          <div class="column flex-center"><button class="button is-primary" type="button" v-on:click="onConnectClick()">Send data</button></div>
        </div>
      </div>
    </div>
  </div>
</template>

<style media="screen" scoped>
  .content {
    display: flex;
    flex-direction: row;
    position: absolute;
    top: 0px;
    left: 0px;
    right: 0px;
    bottom: 0px;
    align-items: center;
    justify-content: center;
  }
</style>

<script type='text/javascript'>
  import socket from '../socket/socket.js'
  import { globalState } from '../store/store.js'

  const state = globalState

  const instance = {
    name: 'ChallengeFlow',
    data: () => {
      return state
    },
    methods: {
      onAcceptClick: function (request) {
        socket.emit('challenge/accept', { gameId: request.gameId })
        this.challengeRequests.splice(this.challengeRequests.indexOf(request), 1)
      },
      onConnectClick: function () {
        socket.emit('challenge/request', { defenderSessionId: this.defenderSessionId })
      },
      showError: function (errMsg) {
        this.errorMessage = errMsg
        setTimeout(() => {
          this.errorMessage = null
        }, 2000)
      },
      onGameStart: function () {
        state.isInGameSession = true
        location.href = '#/game'
      },
      onGameStateReceived: function (gameState) {
        state.gameStates.push(gameState)
      },
      declineChallenge: function (request) {
        socket.emit('challenge/decline', { gameId: request.gameId })
        state.challengeRequests.splice(state.challengeRequests.indexOf(request), 1)
      },
      onChallengeCancelClick: function (challenge) {
        socket.emit('challenge/cancel', {
          gameId: challenge.gameId
        })
        state.challengesSent = state.challengesSent.filter(otherChallenge => challenge !== otherChallenge)
      },
      onChallengeDeclined: function (declineData) {
        this.showError(
          'player ' +
          declineData.defenderId +
          ' has declined your challenge for game ' +
          declineData.gameId
        )
        state.challengesSent = state.challengesSent.filter(challenge => challenge.gameId !== declineData.gameId)
      }
    }
  }

  socket.on('challenge/request', (payload) => {
    state.challengeRequests.push({
      gameId: payload.gameId,
      challenger: payload.challenger
    })
  })
  socket.on('session/id', (payload) => {
    state.sessionId = payload.sessionId
  })
  socket.on('challenge/same_socket', () => {
    instance.methods.showError('You cannot challenge yourself!')
  })
  socket.on('game/start', () => {
    instance.methods.onGameStart()
  })
  socket.on('game/state', (gameState) => {
    instance.methods.onGameStateReceived(gameState)
  })
  socket.on('challenge/decline', (payload) => {
    instance.methods.onChallengeDeclined(payload)
  })
  socket.on('game/opponent/disconnect', () => {
    instance.methods.showError('Your opponent has been disconnect')
    state.gameStates = []
    state.isInGameSession = false
  })
  socket.on('game/opponent/canceled', (payload) => {
    instance.methods.showError('Your opponent has canceled the game')
    state.challengeRequests = state.challengeRequests.filter(challenge => state.gameId !== payload.gameId)
  })
  socket.on('challenge/request/confirm', (payload) => {
    state.challengesSent.push({
      gameId: payload.gameId,
      opponent: payload.defender
    })
  })
  export default instance
</script>
