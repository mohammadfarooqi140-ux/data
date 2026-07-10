export interface DbUser {
  id: string;
  email: string;
  name?: string;
  subscription_tier: "free" | "starter" | "growth" | "agency";
  stripe_customer_id?: string;
  stripe_subscription_id?: string;
  trial_ends_at?: string;
  created_at: string;
  updated_at: string;
}

export interface DbCampaign {
  id: string;
  user_id?: string;
  name: string;
  status: "active" | "paused" | "completed" | "archived";
  lead_count?: number;
  created_at: string;
  updated_at: string;
}

export interface DbLead {
  id: string;
  campaign_id?: string | null;
  url: string;
  status: "pending" | "screenshotting" | "analyzing" | "contact_found" | "emailed" | "error";
  screenshot_path?: string | null;
  audit_results?: Record<string, any> | null;
  contact_name?: string | null;
  contact_email?: string | null;
  contact_linkedin?: string | null;
  drafted_email?: string | null;
  error_message?: string | null;
  created_at: string;
  updated_at: string;
}

export interface DbProcessingJob {
  id: string;
  lead_id: string;
  job_type: "screenshot" | "audit" | "contact" | "email";
  status: "pending" | "running" | "completed" | "failed";
  result: Record<string, any>;
  error?: string;
  created_at: string;
  updated_at: string;
}

export interface DashboardStats {
  total_leads: number;
  emailed: number;
  leads_this_week: number;
  open_rate?: number;
  conversion_rate?: number;
}

export const STATUS_LABELS: Record<string, string> = {
  pending: "Pending",
  screenshotting: "Screenshotting",
  analyzing: "Analyzing",
  contact_found: "Contact Found",
  emailed: "Emailed",
  error: "Error",
};

export const STATUS_STYLES: Record<string, string> = {
  pending: "bg-gray-100 text-gray-700",
  screenshotting: "bg-blue-100 text-blue-700",
  analyzing: "bg-yellow-100 text-yellow-700",
  contact_found: "bg-green-100 text-green-700",
  emailed: "bg-purple-100 text-purple-700",
  error: "bg-red-100 text-red-700",
};