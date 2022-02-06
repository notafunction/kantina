export interface UserProfile {
  uid: string
  email: string
  avatarUrl?: string
  displayName?: string
}

export interface Board {
  id: string
  title: string
  type: BoardTypeEnum
  createdBy: string
}

export interface List {
  [index: string]: string
  id: string
  title: string
  createdBy: string
  color: string
}

export interface Item {
  id: string
  content: string
  createdBy: string
  color: string
}

export enum BoardTypeEnum {
  Public = 'public',
  Private = 'private'
}
