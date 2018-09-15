export interface UserData {
  id: string;
  role: string;

  gender: string;
  lookingFor: string;
  between: string;
  location: string;

  userName: string;
  email: string;
  password: string;
  dateDay: string;
  dateMonth: string;
  dateYear: string;
  education: string;
  children: string;
  region: string;
  district: string;
  image: string;
}

export interface SetRoleModel {
  id: string;
  role: string;
}

export  interface AuthorizationDataModel {
  email: string;
  password: string;
  // rememberData: boolean;
}


export interface SignupFormData {
  gender: string;
  lookingFor: string;
  between: string;
  location: string;
}
