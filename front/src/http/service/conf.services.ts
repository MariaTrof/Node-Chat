import { AxiosResponse } from "axios";
import api from "..";
import { Conference } from "../../types";

export default class ConferenceService {
  static async createConference({
    title,
    description,
    groupId,
    startTime,
    endTime,
  }: {
    title: string;
    description: string;
    groupId: number;
    startTime: Date;
    endTime: Date; 
  }): Promise<AxiosResponse<Conference>> {
    return api.post<Conference>("conferences", {
      title,
      description,
      groupId,
      startTime,
      endTime,
    });
  }

  static async getConferencesByGroup(
    groupId: number
  ): Promise<AxiosResponse<Conference[]>> {
    return api.get<Conference[]>(`conferences/group/${groupId}`);
  }

  static async endConference(id: number): Promise<void> {
    return api.delete(`conferences/${id}`);
  }
}
