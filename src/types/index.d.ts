export type BoardPermissions =
    'board:read'
  | 'board:edit'
  | 'board:create'
  | 'board.delete'
  
export type ListPermissions =
    'list:read'
  | 'list:edit'
  | 'list:create'
  | 'list:delete'

export type ItemPermissions =
    'item:read'
  | 'item:edit'
  | 'item:create'
  | 'item:delete'

export type MemberPermissions =
    'member:read'
  | 'member:edit'
  | 'member:create'
  | 'member:delete'

export type Permission = BoardPermissions | ListPermissions | ItemPermissions | MemberPermissions

export type UserPermissionRole = 
    'viewer'
  | 'editor'
  | 'admin'

export type Membership = {
  role: UserPermissionRole
}

export type Item = {
  color?: string
  content?: string
  id: string
  createdBy: string
  list: string
  position: number
}

export type ItemRecord = {
  [key: string]: Item
}

export type List = {
  id: string
  color?: string
  createdBy: string
  position: number
  title: string
  items: Item[]
}

export type ListRecord = {
  [key: string]: List
}

export type Board = {
  id: string
  color?: string
  public: boolean
  lists: List[]
  locked: boolean
  title: string
  members: Membership[]
}

export type BoardRecord = {
  [key: string]: Board
}

export type UserProfile = {
  uid: string
  boards: Membership[]
  displayName: string
  email: string,
  photoURL: string
}