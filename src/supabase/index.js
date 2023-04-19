
import { createClient } from '@supabase/supabase-js'
const supabaseURL = 'https://mqzxmfgotkkgtwbymphf.supabase.co';
const supabaseAPIKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1xenhtZmdvdGtrZ3R3YnltcGhmIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODE5MjI2MDcsImV4cCI6MTk5NzQ5ODYwN30.xZnHg1vpyCfIbW3vov8dEUrY96CpHXxR0DWpVRxluPU';
export default createClient(supabaseURL, supabaseAPIKey)
