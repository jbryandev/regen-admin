import { type Access, type FieldAccess } from "payload";

export const canAccess: Access = ({ req: { user }, id }) => {
  if (user?.role === "admin") {
    return true;
  } else if (user?.id === id) {
    return true;
  } else {
    return false;
  }
};

export const isAdmin: Access = ({ req: { user } }) => {
  if (user?.role === "admin") {
    return true;
  } else {
    return false;
  }
};

export const canUpdate: FieldAccess = ({ req: { user } }) => {
  if (user?.role === "admin") {
    return true;
  } else {
    return false;
  }
};
