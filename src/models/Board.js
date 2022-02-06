import firebase from '../services/firebase'

export default class Board {
  constructor(attributes) {
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
