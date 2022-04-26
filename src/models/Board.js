import firebase from '../services/firebase'

export default class Board {
  static collection = 'boards'

  constructor(attributes) {
    this.title = attributes.title
    this.type = attributes.type
    this.members = attributes.members || {}
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
