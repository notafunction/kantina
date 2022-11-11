export type BoardPermissions =
  | 'board:read'
  | 'board:edit'
  | 'board:create'
  | 'board.delete'

export type ListPermissions =
  | 'list:read'
  | 'list:edit'
  | 'list:create'
  | 'list:delete'

export type ItemPermissions =
  | 'item:read'
  | 'item:edit'
  | 'item:create'
  | 'item:delete'

export type MemberPermissions =
  | 'member:read'
  | 'member:edit'
  | 'member:create'
  | 'member:delete'

export type Permission =
  | BoardPermissions
  | ListPermissions
  | ItemPermissions
  | MemberPermissions

export type UserPermissionRole =
  | 'viewer'
  | 'editor'
  | 'admin'

export type Membership = {
  role: UserPermissionRole
}
export type MembershipRecord = Record<string, Membership>

export type ItemRecord = Record<string, Item>
export type ItemType = 'checkbox' | 'text'
export type Item = {
  color?: string
  content?: string
  createdBy: string
  id: string
  list: string
  position: number
  type: ItemType
}

export type ListRecord = Record<string, List>
export type List = {
  board: string
  color?: string
  createdBy: string
  id: string
  items: ItemRecord
  position: number
  title: string
}

export type BoardRecord = Record<string, Board>
export type Board = {
  id: string
  color?: string
  public: boolean
  lists: ListRecord
  locked: boolean
  title: string
  members: MembershipRecord
}

export type UserProfile = {
  uid: string
  boards?: Membership[]
  displayName: string
  email: string
  photoURL: string
}
