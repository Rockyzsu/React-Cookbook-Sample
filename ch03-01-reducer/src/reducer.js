function trySwap(newItems, position, t) {
  // 有null 才交换  t 为null
  if (newItems[t] === null) {
    const temp = newItems[position]
    newItems[position] = newItems[t]
    newItems[t] = temp
  }
}

function arraysEqual(a, b) {
  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) {
      return false
    }
  }
  return true
}

const CORRECT = ['1', '2', '3', '4', '5', '6', '7', '8', null]

function reducer(state, action) {
  switch (action.type) { 
    case 'move': {
      const position = action.payload
      console.log('pos ',position)
      const newItems = [...state.items]
      const col = position % 3
      // 0 1 2
      // 3 4 5
      // 6 7 8
      
      // 1,  
      // 这个算法很精密
      if (position < 6) {
        // 前面2行，position + 3 这个位置为null 才会移动
        trySwap(newItems, position, position + 3)
      }
      if (position > 2) {
        trySwap(newItems, position, position - 3)
      }
      if (col < 2) {
        trySwap(newItems, position, position + 1)
      }
      if (col > 0) {
        trySwap(newItems, position, position - 1)
      }

      return {
        ...state,
        items: newItems,
        complete: arraysEqual(newItems, CORRECT),
      }
    }
    case 'shuffle': {
      let newState = { ...state }
      do {
        for (let i = 0; i < 300; i++) {
          newState = reducer(
            { ...newState },
            {
              type: 'move',
              payload: Math.floor(Math.random() * 9),
            }
          )
        }
      } while (newState.complete)
      return newState
    }
    case 'reset': {
      return {
        ...state,
        items: [...CORRECT],
        complete: true,
      }
    }
    default: {
      throw new Error('Unknown action: ' + action.type)
    }
  }
}

const reducer_v2 = (state,action)=>{
  switch (action.type) { 
    case 'move': {
      const position = action.payload
      console.log('pos ',position)
      const newItems = [...state.items]
      
      if(state.items?.[position+1]=== null){
        console.log(position+1)
        trySwap(newItems,position,position+1)
      }

      if(state.items?.[position-1] === null){
        console.log(position-1)
        trySwap(newItems,position,position-1)
      }

      if(state.items?.[position+3] === null){
        console.log(position+3)
        trySwap(newItems,position,position+3)
      }

      if(state.items?.[position-3] === null){
        console.log(position-3)
        trySwap(newItems,position,position-3)
      }

      return {
        ...state,
        items: newItems,
        complete: arraysEqual(newItems, CORRECT),
      }
    }
    case 'shuffle': {
      let newState = { ...state }
      do {
        for (let i = 0; i < 300; i++) {
          newState = reducer_v2(
            { ...newState },
            {
              type: 'move',
              payload: Math.floor(Math.random() * 9),
            }
          )
        }
      } while (newState.complete)
      return newState
    }
    case 'reset': {
      return {
        ...state,
        items: [...CORRECT],
        complete: true,
      }
    }
    default: {
      throw new Error('Unknown action: ' + action.type)
    }
  }
}
export default reducer_v2
