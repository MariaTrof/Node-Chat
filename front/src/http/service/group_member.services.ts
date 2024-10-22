import { AxiosResponse } from "axios";
import api from "..";
import { Group_Members } from "../../types/group_members.interface";

export default class GroupService {
  // Добавить пользователя в группу
  static async addUserToGroup(
    dto: Group_Members
  ): Promise<AxiosResponse<Group_Members>> {
    return api.post<Group_Members>("group_members/group/members", dto);
  }

  // Удалить пользователя из группы
  static async removeUserFromGroup(
    dto: Group_Members
  ): Promise<AxiosResponse<void>> {
    return api.delete("group_members/group/members/delete", { data: dto });
  }

  // Получить членов группы
  static async getGroupMembers(
    groupId: number
  ): Promise<AxiosResponse<Group_Members[]>> {
    return api.get<Group_Members[]>(`group_members/group/${groupId}`);
  }
}
