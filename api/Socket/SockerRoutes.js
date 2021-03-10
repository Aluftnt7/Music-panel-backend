module.exports = connectSockets;

function connectSockets(io) {
  io.on("connection", (socket) => {
    socket.on(`volume changed`, ({ idx, inputValue }) => {
      io.emit(`change volume ${idx}`, { newValue: inputValue });
    });
    socket.on(`playing status`, ({ idx, isLocalPlaying }) => {
      io.emit(`new play status ${idx}`, { isLocalPlaying });
    });
    socket.on(`update status from player`, ({ roomIdx, playStatus }) => {
      // console.log(`room numbe r${roomIdx}, has changet to ${playStatus}`);
      io.emit(`new play status from player ${roomIdx}`, { playStatus });
    });
  });
}
