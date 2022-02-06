import firebase from '../services/firebase'
import { Board as BoardInterface, BoardInput, BoardTypeEnum } from '../common/types'

export default class Board implements BoardInterface {
  id: string
  title: string
  type: BoardTypeEnum
  createdBy: string

  constructor(attributes: BoardInput) {
    this.title = attributes.title
    this.type = attributes.type
  }

  save() {
    if (!firebase.auth().currentUser) throw new Error('must be authorized')

    this.createdBy = firebase.auth().currentUser.uid

    this.$ref = firebase.database().ref().child('boards').push(this)

    return this
  }
}
