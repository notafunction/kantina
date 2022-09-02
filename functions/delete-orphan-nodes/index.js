const functions = require('firebase-functions')

exports.deleteOrphanListNodes = functions.database
  .ref('/boards/{boardId}')
  .onDelete((snapshot, event) => {
    const listIds = Object.keys(snapshot.val().lists)

    if (!listIds.length) return
    listIds.forEach((listId) => snapshot.ref.database.ref(`/lists/${listId}`).remove())
  })

exports.deleteOrphanItemNodes = functions.database
  .ref('/lists/{listId}')
  .onDelete(async (snapshot, event) => {
    const itemIds = Object.keys(snapshot.val().items)

    if (!itemIds.length) return
    itemIds.forEach((itemId) => snapshot.ref.database.ref(`/itrms/${itemId}`).remove())
  })
