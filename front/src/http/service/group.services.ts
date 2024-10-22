import { AxiosResponse } from "axios";
import api from "..";
import { Group } from "../../types";

export default class GroupService {
  static async createGroup({
    name,
  }: {
    name: string;
  }): Promise<AxiosResponse<Group>> {
    return api.post<Group>("groups/groups", {
      name,
    });
  }

  static async getGroups(): Promise<AxiosResponse<Group[]>> {
    return api.get<Group[]>("groups");
  }

  static async deleteGroup(id: number): Promise<void> {
    return api.delete(`groups/groups/${id}`);
  }
}
