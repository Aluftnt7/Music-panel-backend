const dbService = require("../../services/DbService");
const ObjectId = require("mongodb").ObjectId;

module.exports = {
  query,
  getById,
  remove,
  update,
  add,
  checkIsValidUser,
  updateRoom,
};

async function query(filterBy = {}) {
  const critirea = _buildCriteria(filterBy);
  const collection = await dbService.getCollection("rooms");
  try {
    const rooms = await collection
      .find(critirea.query)
      .sort(critirea.sortBy)
      .toArray();
    return rooms;
  } catch (err) {
    console.log("ERROR: cannot find Rooms");
    throw err;
  }
}

async function getById(filterBy) {
  const collection = await dbService.getCollection("rooms");
  try {
    const room = await collection.findOne({
      roomIdx: parseInt(filterBy.roomIdx),
    });
    return room;
  } catch (err) {
    console.log(`ERROR: while finding room ${filterBy.roomId}`);
    throw err;
  }
}

async function remove(roomId) {
  const collection = await dbService.getCollection("rooms");
  try {
    await collection.deleteOne({ _id: ObjectId(roomId) });
  } catch (err) {
    console.log(`ERROR: cannot remove room ${roomId}`);
    throw err;
  }
}

async function update(songObj, idx) {
  const collection = await dbService.getCollection("rooms");
  try {
    const room = await collection.findOne({ roomIdx: parseInt(idx) });
    room.playlist.push(songObj);
    await collection.updateOne({ roomIdx: parseInt(idx) }, { $set: room });
    return { songObj, idx };
  } catch (err) {
    console.log(`ERROR: cannot update room ${room._id}`);
    throw err;
  }
}

async function updateRoom(room) {
  console.log("inside Update room (wrong one)");
  const collection = await dbService.getCollection("rooms");
  try {
    const roomToUpdate = await collection.findOne({
      _id: ObjectId(room._id),
    });
    roomToUpdate.playlist = room.playlist;
    await collection.updateOne(
      { _id: ObjectId(room._id) },
      { $set: roomToUpdate }
    );
    // return { songObj, idx };
  } catch (err) {
    console.log(`ERROR: cannot update room ${room._id}`);
    throw err;
  }
}

async function add(room) {
  room.createdAt = Date.now();
  const collection = await dbService.getCollection("rooms");
  try {
    await collection.insertOne(room);
    return room;
  } catch (err) {
    console.log(`ERROR: cannot insert room`);
    throw err;
  }
}

async function checkIsValidUser(userId, roomId) {
  const room = await getById({ roomId });
  return room.members.some((memberId) => memberId.toString() === userId);
}

function _buildCriteria(filterBy) {
  const critirea = {
    query: {},
    sortBy: {},
  };
  // if (filterBy.boardId) {
  //     if (filterBy.searchIn === 'genres') critirea.query.boardId = { $in: [filterBy.boardId] };
  // else critirea.query.title = { $regex: filterBy.txt, $options: 'i' };
  // }
  if (filterBy.sortBy === "date") critirea.sortBy.createdAt = -1;
  else critirea.sortBy.title = 1;
  return critirea;
}

// function _buildCriteria(filterBy) {
//     const critirea = {
//         query: {},
//         sortBy: {}
//     };
//     if (filterBy.txt) {
//         if (filterBy.searchIn === 'genres') critirea.query.labels = { $in: [filterBy.txt] };
//         else critirea.query.title = { $regex: filterBy.txt, $options: 'i' };
//     }

//     if (filterBy.sortBy === 'date') critirea.sortBy.createdAt = -1;
//     else critirea.sortBy.title = 1;

//     return critirea;
// }

// NOTE JSON MODEL:
// {
//     "header":"3",
//     "data":"3",
//     "type":"NoteText",
//     "bgColor":"#fff59d",
//     "isPinned":false,
//     "_id":"2c8JKrlbr9Dmtz9q56tIcQ5B",
//     "createdAt":1601986949152,
//     "createdBy": {
//         "_id": "5f16f434f18a3832d8ab3ae8",
//         "imgUrl": "https://res.cloudinary.com/tamir/image/upload/v1597846244/15978462202777382514642915071513_lzmbdn.jpg"
//     }
//  }
