import { AxiosResponse } from "axios";
import api from "..";
import { Tokens } from "../../types";

export default class AuthService {
  static async login({
    user_name,
    user_password,
  }: {
    user_name: string;
    user_password: string;
  }): Promise<AxiosResponse<Tokens>> {
    return api.post<Tokens>("/auth/local/signIn", { user_name, user_password });
  }

  static async registration({
    user_name,
    user_password,
  }: {
    user_name: string;
    user_password: string;
  }): Promise<AxiosResponse<Tokens>> {
    return api.post<Tokens>("/auth/local/signUp", { user_name, user_password });
  }

  static async logout(): Promise<AxiosResponse<{ message: string }>> {
    return api.post<{ message: string }>("/auth/logout");
  }
}
