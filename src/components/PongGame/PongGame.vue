
<template id="">
  <div class="gamePage flex flex-center">
    <div class="background"></div>

    <div class="gameBoardWrap">
      <div class="gameBoard is-primary"
        v-bind:style="gameConfig.boardConfig">

        <div class="paddle top"
          v-bind:style="[gameConfig.paddleTopConfig, {
            left: paddleTopState.left + '%',
            top: paddleTopState.top + '%'
          }]"
        ></div>

        <div id='ball' class='ball'
          v-bind:style="[gameConfig.ballConfig, {
            left: ballState.left + '%',
            top: ballState.top + '%'
        }]"></div>

        <div class="paddle bottom"
          v-bind:style="[gameConfig.paddleBottompConfig, {
            left: paddleBottomState.left + '%',
            top: 100 - paddleBottomState.top + '%'
          }]"
        ></div>

      </div>
    </div>

  </div>
</template>

<style media="screen" scoped>
  .background {
    background: url('https://d3ui957tjb5bqd.cloudfront.net/images/screenshots/products/29/294/294444/1-o.jpg?1420807091');
    opacity: 0.2;
    position: absolute;
    top: 0px;
    left: 0px;
    right: 0px;
    bottom: 0px;
  }
  .gamePage {
    position: absolute;
    top: 52px;
    left: 0px;
    right: 0px;
    bottom: 0px;
  }
  .gameBoardWrap {
    padding: 10px;
    background: #00d1b2;
    border-radius: 10px;
    box-shadow: inset 0px 0px 20px rgba(0, 0, 0, 0.2);
    z-index: 1;
  }
  .gameBoard {
    width: 300px;
    height: 500px;
    position: relative;
  }
  .ball {
    background: #ff2f00;
    border-radius: 100%;
    position: absolute;
    box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.1);
  }
  .paddle {
    background: white;
    border-radius: 100px;
    position: absolute;
    box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.1);
  }
</style>

<script type="text/javascript">
  import { globalState } from '@/store/store.js'
  // import Paddle from './Paddle'
  const state = globalState
  const ballState = {
    top: 50,
    left: 50
  }
  const ballDirections = {
    down: true,
    right: true
  }
  const nextTick = () => {
    setTimeout(function () {
      if (ballDirections.down) {
        ballState.top += 0.2
      } else {
        ballState.top -= 0.2
      }
      if (ballDirections.right) {
        ballState.left += 0.5
      } else {
        ballState.left -= 0.5
      }

      if (ballState.top >= 100 || ballState.top <= 0) {
        ballDirections.down = !ballDirections.down
      }
      if (ballState.left >= 100 || ballState.left <= 0) {
        ballDirections.right = !ballDirections.right
      }
      nextTick()
    }, 0.05)
  }
  nextTick()
  export default {
    name: 'ChallengeFlow',
    data: () => {
      return {
        gameStates: state.gameStates,
        ballState: ballState,
        paddleTopState: {
          left: 50,
          top: 2
        },
        paddleBottomState: {
          left: 50,
          top: 2
        },
        gameConfig: {
          boardConfig: {
            width: '300px',
            height: '500px'
          },
          paddleTopConfig: {
            width: '50px',
            height: '10px',
            marginLeft: '-25px',
            marginTop: '-5px'
          },
          paddleBottompConfig: {
            width: '50px',
            height: '10px',
            marginLeft: '-25px',
            marginTop: '-5px'
          },
          ballConfig: {
            width: '20px',
            height: '20px',
            marginTop: '-10px',
            marginLeft: '-10px'
          }
        }
      }
    }
  }
</script>
