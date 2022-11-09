import { useContext } from "react";
import PermissionContext from "@/containers/Permission/PermissionContext";
import { Permission } from "@/types";

const usePermission = (permission: Permission) => {
  const { isAllowedTo } = useContext(PermissionContext)

  return isAllowedTo(permission)
}

export default usePermission