import jwtDecode from "jwt-decode";

export enum AccountType {
  ADMIN = 1,
  DOCTOR = 2,
  DONOR = 3,
}
export interface JwtKeys {
  id: string
  accountType: string
}

const useAuth = (): JwtKeys | undefined => {
  const jwt = localStorage.getItem("jwt");

  if(jwt) return jwtDecode(jwt);
  else return undefined;
};

export default useAuth;