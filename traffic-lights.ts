import { createMachine } from 'xstate'
import chalk from 'chalk'

export const INIT_TIME           = 100
export const RED_TIME            = 5000
export const RED_AND_YELLOW_TIME = 1000
export const GREEN_TIME          = 4000
export const YELLOW_TIME         = 2000

export function ts() {
  const [ date, time ] = new Date().toISOString().split('T')
  return `${chalk.cyan('[')}${chalk.magenta(date)} ${chalk.magenta(time)}${chalk.cyan(']')}`
}

export enum LightState {
  OFF = 1,
  ON = 2,
}

export interface TrafficLights {
  red: LightState
  yellow: LightState
  green: LightState
}

export class NoopTrafficLights implements TrafficLights {
  red    = LightState.OFF
  yellow = LightState.OFF
  green  = LightState.OFF

  toString() {
    const red = this.red === LightState.ON ? chalk.redBright.bgRedBright : chalk.dim.red
    const yellow = this.yellow === LightState.ON ? chalk.yellowBright.bgYellowBright : chalk.dim.yellow
    const green = this.green === LightState.ON ? chalk.greenBright.bgGreenBright : chalk.dim.green
    return `${chalk.cyan('[')}${red('*')} ${yellow('*')} ${green('*')}${chalk.cyan(']')}`
  }
}

function turnRedLightOn(lights: TrafficLights) {
  console.log(ts(), 'Turning red light on')
  if (lights.red === LightState.ON) {
    throw new Error('Red light is already on')
  } else {
    lights.red = LightState.ON
    console.log(ts(), 'Red light on')
  }
}

function turnRedLightOff(lights: TrafficLights) {
  console.log(ts(), 'Turning red light off')
  if (lights.red === LightState.OFF) {
    throw new Error('Red light is already off')
  } else {
    lights.red = LightState.OFF
    console.log(ts(), 'Red light off')
  }
}

function turnYellowLightOn(lights: TrafficLights) {
  console.log(ts(), 'Turning yellow light on')
  if (lights.yellow === LightState.ON) {
    throw new Error('Yellow light is already on')
  } else {
    lights.yellow = LightState.ON
    console.log(ts(), 'Yellow light on')
  }
}

function turnYellowLightOff(lights: TrafficLights) {
  console.log(ts(), 'Turning yellow light off')
  if (lights.yellow === LightState.OFF) {
    throw new Error('Yellow light is already off')
  } else {
    lights.yellow = LightState.OFF
    console.log(ts(), 'Yellow light off')
  }
}

function turnGreenLightOn(lights: TrafficLights) {
  console.log(ts(), 'Turning green light on')
  if (lights.green === LightState.ON) {
    throw new Error('Green light is already on')
  } else {
    lights.green = LightState.ON
    console.log(ts(), 'Green light on')
  }
}

function turnGreenLightOff(lights: TrafficLights) {
  console.log(ts(), 'Turning green light off')
  if (lights.green === LightState.OFF) {
    throw new Error('Green light is already off')
  } else {
    lights.green = LightState.OFF
    console.log(ts(), 'Green light off')
  }
}

export function createTrafficLightsMachine(
  delays: any = {}
) {
  return createMachine<TrafficLights>({
    id: 'traffic-lights',
    initial: 'init',
    context: new NoopTrafficLights(),
    predictableActionArguments: true,
    states: {
      'init': {
        entry(context, event, meta) {
          console.log(ts(), 'Entered "init" state')
        },
        after: {
          INIT_TIME: {
            actions: [turnRedLightOn],
            target: 'red',
          }
        }
      },
      'red': {
        entry(context, event, meta) {
          console.log(ts(), 'Entered "red" state')
        },
        after: {
          RED_TIME: {
            actions: ['turnYellowLightOn'],
            target: 'red-and-yellow',
          }
        }
      },
      'red-and-yellow': {
        entry(context, event, meta) {
          console.log(ts(), 'Entered "red-and-yellow" state')
        },
        after: {
          RED_AND_YELLOW_TIME: {
            actions: ['turnRedLightOff', 'turnYellowLightOff', 'turnGreenLightOn'],
            target: 'green',
          }
        }
      },
      'green': {
        entry(context, event, meta) {
          console.log(ts(), 'Entered "green" state')
        },
        after: {
          GREEN_TIME: {
            actions: ['turnGreenLightOff', 'turnYellowLightOn'],
            target: 'yellow',
          },
        }
      },
      'yellow': {
        entry(context, event, meta) {
          console.log(ts(), 'Entered "yellow" state')
        },
        after: {
          YELLOW_TIME: {
            actions: ['turnYellowLightOff', 'turnRedLightOn'],
            target: 'red',
          },
        }
      },
    },
  })
  .withConfig({
    actions: {
      turnRedLightOn,
      turnRedLightOff,
      turnYellowLightOn,
      turnYellowLightOff,
      turnGreenLightOn,
      turnGreenLightOff,
    },
    delays: {
      INIT_TIME,
      RED_TIME,
      RED_AND_YELLOW_TIME,
      GREEN_TIME,
      YELLOW_TIME,
      ...delays
    }
  })
}
