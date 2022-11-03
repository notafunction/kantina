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

export type Permission = BoardPermissions | ListPermissions | ItemPermissions

declare enum MembershipRole {
  VIEWER = 'viewer',
  EDITOR = 'editor',
  ADMIN = 'admin'
}

export type Membership = {
  role: MembershipRole
}

export type Item = {
  color?: string
  content?: string
  id: string
  createdBy: string
  list: string
  position: number
}

export type List = {
  id: string
  color?: string
  createdBy: string
  position: number
  title: string
  items: Item[]
}

export type Board = {
  id: string
  color?: string
  lists: List[]
  locked: boolean
  title: string
  members: Membership[]
}

export type UserProfile = {
  boards: Membership[]
  displayName: string
  email: string,
  photoURL: string
}