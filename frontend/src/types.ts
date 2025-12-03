export interface Attachment {
  file_url: string;
  file_type: string;
}

export type ContactType = 'Security' | 'Counseling' | 'Admin' | 'Medical';

export interface EmergencyContactAdmin {
  contact_id: number;
  name: string;
  phone: string;
  email: string;
  type: ContactType; 
}


export interface IncidentReport {
  report_id: number;
  description: string;
  category: string;
  status: 'New' | 'Investigating' | 'Resolved';
  created_at: string;
  is_anonymous: boolean;
  users: {
    full_name: string;
    student_id?: string;
  } | null;
  attachments: Attachment[];
}