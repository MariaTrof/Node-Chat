import { AxiosResponse } from "axios";
import api from "..";
import { User } from "../../types";

export default class UserService {
  static async fetchUser(): Promise<AxiosResponse<User>> {
    return api.get<User>("/users");
  }

  static async updateUser({
    id,
    user_password,
  }: {
    id: number;
    user_password: string;
  }): Promise<AxiosResponse<User>> {
    return api.patch<User>(`/users/${id}`, { user_password });
  }

  static async uploadProfilePicture({
    id,
    file,
  }: {
    id: number;
    file: File;
  }): Promise<AxiosResponse<string>> {
    const formData = new FormData();
    formData.append("profile_picture", file);
    return api.post<string>(`/users/${id}/upload`, formData);
  }
}
