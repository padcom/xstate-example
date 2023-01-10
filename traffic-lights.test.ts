// import { crea } from 'xstate'
import { describe, expect, it } from 'vitest'
import { interpret } from 'xstate'
import { createTrafficLightsMachine, LightState, TrafficLights, ts } from './traffic-lights.js'

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

describe('Street lights FSM', () => {
  it('will start with red light', async () => {
    const fsm = interpret(createTrafficLightsMachine({
      INIT_TIME: 10,
      RED_TIME: 100,
      RED_AND_YELLOW_TIME: 20,
      GREEN_TIME: 100,
      YELLOW_TIME: 50,
    }))

    try {
      const state = fsm.getSnapshot()
      expect(state.context.red).toBe(LightState.OFF)
      expect(state.context.yellow).toBe(LightState.OFF)
      expect(state.context.green).toBe(LightState.OFF)
    } finally {
      fsm.stop()
    }
  })

  it('will step through all of the transitions in a timely fashion', async () => {
    const INIT_TIME = 10
    const RED_TIME = 100
    const RED_AND_YELLOW_TIME = 20
    const GREEN_TIME = 80
    const YELLOW_TIME = 40

    const fsm = interpret(createTrafficLightsMachine({
      INIT_TIME,
      RED_TIME,
      RED_AND_YELLOW_TIME,
      GREEN_TIME,
      YELLOW_TIME,
    }))
      .onTransition((state) => {
        console.log(ts(), 'Transition to state', state.event.type, state.context.toString())
      })
      .start()

    function assert(context: TrafficLights, expected: TrafficLights) {
      expect(context.red).toEqual(expected.red)
      expect(context.yellow).toEqual(expected.yellow)
      expect(context.green).toEqual(expected.green)
    }

    try {
      await sleep(INIT_TIME)
      assert(fsm.getSnapshot().context, {
        red: LightState.ON,
        yellow: LightState.OFF,
        green: LightState.OFF,
      })
      await sleep(RED_TIME)
      assert(fsm.getSnapshot().context, {
        red: LightState.ON,
        yellow: LightState.ON,
        green: LightState.OFF,
      })
      await sleep(RED_AND_YELLOW_TIME)
      assert(fsm.getSnapshot().context, {
        red: LightState.OFF,
        yellow: LightState.OFF,
        green: LightState.ON,
      })
      await sleep(GREEN_TIME)
      assert(fsm.getSnapshot().context, {
        red: LightState.OFF,
        yellow: LightState.ON,
        green: LightState.OFF,
      })
      await sleep(YELLOW_TIME)
      assert(fsm.getSnapshot().context, {
        red: LightState.ON,
        yellow: LightState.OFF,
        green: LightState.OFF,
      })
      await sleep(RED_TIME)
      assert(fsm.getSnapshot().context, {
        red: LightState.ON,
        yellow: LightState.ON,
        green: LightState.OFF,
      })
    } finally {
      fsm.stop()
    }
  })
})
