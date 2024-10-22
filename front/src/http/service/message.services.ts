import { AxiosResponse } from "axios";
import api from "..";
import { Messages } from "../../types";

export default class MessageService {
  static async sendMessage({
    groupId,
    content,
  }: {
    groupId: number;
    content: string;
  }): Promise<AxiosResponse<Messages>> {
    return api.post<Messages>("messages/message", {
      groupId,
      content,
    });
  }

  static async getMessages(
    groupId: number,
    limit: number,
    offset: number
  ): Promise<AxiosResponse<Messages[]>> {
    return api.get<Messages[]>(`messages/${groupId}`, {
      params: {
        limit,
        offset,
      },
    });
  }

  static async updateMessage({
    id,
    content,
  }: {
    id: number;
    content: string;
  }): Promise<AxiosResponse<Messages>> {
    return api.put<Messages>("messages/message", {
      id,
      content,
    });
  }

  static async deleteMessage(id: number): Promise<void> {
    return api.delete(`messages/message/${id}`);
  }
}
