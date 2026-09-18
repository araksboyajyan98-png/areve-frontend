/** Заявка, как её отправляет форма. Совпадает с телом POST /api/leads. */
export interface LeadInput {
  name: string;
  phone: string;
  message?: string;
  /** Ловушка для ботов: у человека всегда пустая. Имя поля задано сервером. */
  website?: string;
}

/** Ответ сервера на созданную заявку. */
export interface LeadCreated {
  id: string;
}
