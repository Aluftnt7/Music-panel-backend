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
      io.emit(`new play status from player ${roomIdx}`, { playStatus });
    });
    socket.on(`checking for active players on room`, ({ idx }) => {
      io.emit(`check for volume status in room ${idx}`);
    });
    socket.on(`Active`, ({ roomIdx, volume }) => {
      io.emit(`Active player in room ${roomIdx}`, { volume });
    });
    socket.on(`main fader volume changed`, ({ volume }) => {
      io.emit(`main fader new volume`, { volume });
    });
  });
}
