export type TicketType = 'CONTACT' | 'FEEDBACK' | 'ISSUE';

export type TicketStatus = 'OPEN' | 'IN_PROGRESS' | 'RESOLVED';

export type SupportTicketUser = {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
  profileImage?: string | null;
  role: string;
};

export type SupportTicket = {
  id: string;
  userId: string;
  type: TicketType;
  subject: string;
  message: string;
  rating?: number | null;
  status: TicketStatus;
  createdAt: string;
  updatedAt: string;
  user?: SupportTicketUser | null;
};

export type CreateTicketInput = {
  type: TicketType;
  subject: string;
  message: string;
  rating?: number;
};

export type UpdateTicketStatusInput = {
  id: string;
  status: TicketStatus;
};

export type AdminTicketsFilter = {
  type?: TicketType;
  status?: TicketStatus;
};
