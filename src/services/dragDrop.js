import { db } from './firebase'
import store from '../store'

// Helper function to move an item within an array
const move = (arr, from, to) => {
  const copy = [ ...arr ]
  copy.splice(to, 0, copy.splice(from, 1)[0])
  return copy
}

export const onDragEnd = ({ source, destination, draggableId }) => {
  // Item drag was cancelled or dropped back into place, nothing to see here...
  if (!destination) return

  // Deconstruct firestore redux state for sanity
  const { firestore: { data: { lists }}} = store.getState()

  // Source list items array
  const sourceItems = lists[source.droppableId].items
  // Destination list items array
  const destItems = lists[destination.droppableId].items

  // Item was moved within the source list, just update the source array
  if (source.droppableId === destination.droppableId) {
    db.collection('lists').doc(source.droppableId).update({
      items: move(sourceItems, source.index, destination.index)
    })
  }

  // Item was moved into another list, update both lists with new items arrays
  if (source.droppableId !== destination.droppableId) {
    // The item
    const movedItem = sourceItems[source.index]
    // Remove item from source array
    const nextSourceItems = sourceItems.filter((_, i) => (i !== source.index))
    // Insert item into destination array
    const nextDestItems = [
      ...destItems.slice(0, destination.index),
      movedItem,
      ...destItems.slice(destination.index)
    ]

    // Create the write batch
    const batch = db.batch()

    // Source list reference
    const sourceRef = db.collection('lists').doc(source.droppableId)
    // Destination list reference
    const destRef = db.collection('lists').doc(destination.droppableId)

    // Batch the source list update
    batch.update(sourceRef, { items: nextSourceItems })
    // Batch the destination list update
    batch.update(destRef, { items: nextDestItems })

    // Fire updates
    batch.commit()
  }
  
}