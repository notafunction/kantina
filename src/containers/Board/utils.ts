import { Board, Item, ItemRecord, List, ListRecord } from "@/types";
import { arrayMoveImmutable } from "array-move";
import ihUpdate from 'immutability-helper'
import _sortBy from 'lodash.sortby'

import { DropResult } from "react-beautiful-dnd";

export function sortByPosition (object: ItemRecord | ListRecord) {
  return _sortBy(object, (o: Item | List) => o.position)
}

function objectifyWithPosition (array: (Item | List)[]): ItemRecord | ListRecord {
  return array.reduce((accum, object, index) => ({
    ...accum,
    [object.id]: {
      ...object,
      position: index
    }
  }), {})
}

export function handleDragEvent (event: DropResult, board: Board) {
  const { destination, source, draggableId } = event

  if (!destination) return board

  switch (event.type) {
    // item
    case 'ITEM': {
      if (source.droppableId === destination.droppableId) {
        // if item moved within source list
        // noop condition
        if (source.index === destination.index) return board

        const { items }: { items: ItemRecord } = board.lists[source.droppableId]

        const movedItems: Item[] = arrayMoveImmutable(sortByPosition(items), source.index, destination.index)

        return ihUpdate(board, {
          lists: {
            [destination.droppableId]: {
              items: {
                $set: objectifyWithPosition(movedItems)
              }
            }
          }
        })

      } else {
        // if item moved outside source list
        const { items: sourceItems } = board.lists[source.droppableId]
        const { items: destinationItems } = board.lists[destination.droppableId]

        const destinationItemsArray: Item[] = sortByPosition(destinationItems)

        const movedDestinationItems = [
          ...(destinationItemsArray ? destinationItemsArray.slice(0, destination.index) : []),
          sourceItems[draggableId],
          ...(destinationItemsArray ? destinationItemsArray.slice(destination.index) : [])
        ]

        const movedSourceItems: Item[] = sortByPosition(sourceItems).filter((item) => item.id !== draggableId)

        return ihUpdate(board, {
          lists: {
            [source.droppableId]: {
              items: {
                $set: objectifyWithPosition(movedSourceItems)
              }
            },
            [destination.droppableId]: {
              items: {
                $set: objectifyWithPosition(movedDestinationItems)
              }
            }
          }
        })
      }
    }
  
    // list
    case 'LIST': {
      const { lists } = board

      const movedLists: List[] = arrayMoveImmutable(sortByPosition(lists), source.index, destination.index)

      return ihUpdate(board, {
        lists: {
          $set: objectifyWithPosition(movedLists)
        }
      })
    }
  }
}