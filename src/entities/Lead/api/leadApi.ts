import { api } from "@/shared/api";
import type { LeadCreated, LeadInput } from "../model/types";

/** POST /api/leads — создать заявку. */
export async function createLead(input: LeadInput): Promise<LeadCreated> {
  const { data } = await api.post<LeadCreated>("/leads", input);
  return data;
}
