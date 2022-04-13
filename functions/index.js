const admin = require('firebase-admin')
const { deleteOrphanListNodes, deleteOrphanItemNodes } = require('./delete-orphan-nodes')

admin.initializeApp()

exports.deleteOrphanListNodes = deleteOrphanListNodes
exports.deleteOrphanItemNodes = deleteOrphanItemNodes
