import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://azaicghhznfgwdiwhijb.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF6YWljZ2hoem5mZ3dkaXdoaWpiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMxNjkxNDIsImV4cCI6MjA2ODc0NTE0Mn0.gV2IGm4s4tyukbe26hcmSfVHRJpP-yZVk_xHLywFd30';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
