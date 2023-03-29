// const state = {
//   boundary: {
//     //List of coordinates
//   },
//   rooms: {
//     // list of rooms for the department
//   },
//   circulation: {
//     //grid. Contains cols and rows information
//   },
//   spaces: {
//     // list of polygons. This is the valid spaces within the department for the rooms
//   },
// };

function offsetEdges(indexes, state) {
  const { boundary } = state;
  // update state.spaces
  state.spaces = [];
}

function getCirculation(state) {
  const { spaces, boundary } = state;
  // update state.circulation
  state.circulation = [];
}

function extendCirculation({ circulation, boundary }) {
  // update circulation
}

function divideSpaceIntoRooms({ spaces, rooms }) {
  // assign room.polygon
}

function getRemainingSpace({ spaces, circulation, boundary }) {
  // boolean difference. boundary - (spaces + circulation)
}

function divideSpace({ space }) {
  // split the space if it is too long.
  //updates state.space and state.circulation
}
