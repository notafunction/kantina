import firebase from '../services/firebase'

export default class List {
  static collection = 'lists'

  constructor(attributes) {
    this.board = attributes.board
    this.color = attributes.color
    this.order = attributes.order
    this.title = attributes.title
  }

  async save() {
    if (!firebase.auth().currentUser) throw new Error('must be authorized')

    this.createdBy = firebase.auth().currentUser.uid

    this.$ref = await firebase
      .firestore()
      .collection(this.constructor.collection)
      .add(Object.assign({}, this))

    return this
  }
}
