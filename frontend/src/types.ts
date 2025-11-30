export interface Attachment {
  file_url: string;
  file_type: string;
}
// src/types.ts

// 1. Rename the type definition (Optional, but good for consistency)
export type ContactType = 'Security' | 'Counseling' | 'Admin' | 'Medical';

// 2. Change the interface property to 'type'
export interface EmergencyContactAdmin {
  contact_id: number;
  name: string;
  phone: string;
  email: string;
  type: ContactType; // Match the database column name exactly!
}
// Add this to your existing types.ts file

/*export type ContactRole = 'Security' | 'Counseling' | 'Admin' | 'Medical';

export interface EmergencyContact {
  contact_id: number;
  name: string;
  phone: string;
  email: string;
  role: ContactRole; // Maps to the 'role' column in UI
}*/
// src/types.ts

/*// 1. Rename this from 'ContactType' to 'ContactRole'
export type ContactRole = 'Security' | 'Counseling' | 'Admin' | 'Medical';

// 2. Change the property inside from 'type' to 'role'
export interface EmergencyContact {
  contact_id: number;
  name: string;
  phone: string;
  email: string;
  role: ContactRole; // <--- This MUST be named 'role'
}*/

// ... keep your other interfaces (User, IncidentReport, etc.) below ...
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