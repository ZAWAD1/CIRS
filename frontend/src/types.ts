export type UserRole = 'student' | 'admin';
export type ReportStatus = 'New' | 'Investigating' | 'Resolved';
export type ContactType = 'Security' | 'Counseling' | 'Admin' | 'Medical';


export interface User {
  user_id: string; 
  full_name: string;
  email: string;
  role: UserRole;
  phone?: string;       
  department?: string;  
  student_id?: string;  
  created_at: string;
}

export interface IncidentReport {
  report_id: number;
  reporter_id: string | null;
  is_anonymous: boolean;
  category?: string;
  title: string;
  description: string;
  date_of_incident?: string;
  time_of_incident?: string;
  location?: string;
  status: ReportStatus;
  created_at: string;
  

  users: {
    full_name: string;
    email: string;
    student_id?: string;
    department?: string; 
    phone?: string;      
  } | null;
  
  attachments: {
    file_url: string;
    file_type: string;
  }[];
}

export interface EmergencyContactAdmin {
  contact_id: number;
  name: string;
  phone: string;
  email: string;
  type: ContactType; 
}