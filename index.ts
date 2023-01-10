#!/usr/bin/env -S npx ts-node

import { interpret } from 'xstate'
import { createTrafficLightsMachine } from './traffic-lights'

const fsm = interpret(createTrafficLightsMachine())
.onTransition(({ context }) => {
  console.log(context.toString())
})
.start()
