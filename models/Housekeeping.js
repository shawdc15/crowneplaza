const mongoose = require('mongoose')

const HousekeepingSchema = new mongoose.Schema({
  roomNo: {
    type: String,
  },
  roomFloor: {
    type: String,
  },
  roomName: {
    type: String,
  },
  roomStatus: {
    type: String,
  },
  reservationStatus: {
    type: String,
  },
  cleanBedroom: {
    type: {
      done: { type: Boolean },
      broken: { type: Boolean },
      repaired: { type: Boolean },
      outOfOrder: { type: Boolean },
      notes: { type: String },
    },
  },
  cleanToilet: {
    type: {
      done: { type: Boolean },
      broken: { type: Boolean },
      repaired: { type: Boolean },
      outOfOrder: { type: Boolean },
      notes: { type: String },
    },
  },
  cleanWindows: {
    type: {
      done: { type: Boolean },
      broken: { type: Boolean },
      repaired: { type: Boolean },
      outOfOrder: { type: Boolean },
      notes: { type: String },
    },
  },
  cleanFridge: {
    type: {
      done: { type: Boolean },
      broken: { type: Boolean },
      repaired: { type: Boolean },
      outOfOrder: { type: Boolean },
      notes: { type: String },
    },
  },
  cleanFurnitures: {
    type: {
      done: { type: Boolean },
      broken: { type: Boolean },
      repaired: { type: Boolean },
      outOfOrder: { type: Boolean },
      notes: { type: String },
    },
  },
  cleanBathtub: {
    type: {
      done: { type: Boolean },
      broken: { type: Boolean },
      repaired: { type: Boolean },
      outOfOrder: { type: Boolean },
      notes: { type: String },
    },
  },
  sweepFloor: {
    type: {
      done: { type: Boolean },
      broken: { type: Boolean },
      repaired: { type: Boolean },
      outOfOrder: { type: Boolean },
      notes: { type: String },
    },
  },
  mopFloor: {
    type: {
      done: { type: Boolean },
      broken: { type: Boolean },
      repaired: { type: Boolean },
      outOfOrder: { type: Boolean },
      notes: { type: String },
    },
  },
  emptyTrash: {
    type: {
      done: { type: Boolean },
      broken: { type: Boolean },
      repaired: { type: Boolean },
      outOfOrder: { type: Boolean },
      notes: { type: String },
    },
  },
  changeBedsheets: {
    type: {
      done: { type: Boolean },
      broken: { type: Boolean },
      repaired: { type: Boolean },
      outOfOrder: { type: Boolean },
      notes: { type: String },
    },
  },
  changePillowCase: {
    type: {
      done: { type: Boolean },
      broken: { type: Boolean },
      repaired: { type: Boolean },
      outOfOrder: { type: Boolean },
      notes: { type: String },
    },
  },
  changeBlankets: {
    type: {
      done: { type: Boolean },
      broken: { type: Boolean },
      repaired: { type: Boolean },
      outOfOrder: { type: Boolean },
      notes: { type: String },
    },
  },
  changeTowels: {
    type: {
      done: { type: Boolean },
      broken: { type: Boolean },
      repaired: { type: Boolean },
      outOfOrder: { type: Boolean },
      notes: { type: String },
    },
  },
  changeTrashBags: {
    type: {
      done: { type: Boolean },
      broken: { type: Boolean },
      repaired: { type: Boolean },
      outOfOrder: { type: Boolean },
      notes: { type: String },
    },
  },
  replaceToiletries: {
    type: {
      done: { type: Boolean },
      broken: { type: Boolean },
      repaired: { type: Boolean },
      outOfOrder: { type: Boolean },
      notes: { type: String },
    },
  },
  replaceRugs: {
    type: {
      done: { type: Boolean },
      broken: { type: Boolean },
      repaired: { type: Boolean },
      outOfOrder: { type: Boolean },
      notes: { type: String },
    },
  },
  cleaner: {
    type: String,
  },
  verifiedBy: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
})

module.exports =
  mongoose.models.Housekeeping ||
  mongoose.model('Housekeeping', HousekeepingSchema)
