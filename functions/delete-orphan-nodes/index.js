const functions = require('firebase-functions')

exports.deleteOrphanListNodes = functions.database
  .ref('/boards/{boardId}')
  .onDelete((snapshot, event) =>
    snapshot.ref.database.ref(`/lists/${event.params.boardId}`).remove()
  )

exports.deleteOrphanItemNodes = functions.database
  .ref('/lists/{boardId}/{listId}')
  .onDelete(async (snapshot, event) =>
    snapshot.ref.database.ref(`/items/${event.params.listId}`).remove()
  )
