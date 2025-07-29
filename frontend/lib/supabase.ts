import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://pwjajsjlzeaamajjeyyw.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB3amFqc2psemVhYW1hampleXl3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM4MDU5MDMsImV4cCI6MjA2OTM4MTkwM30.9D6R2E8CiwUo-0q_nVei2Bpb4EDmf0PKy8L9ZP1SfJs'

export const supabase = createClient(supabaseUrl, supabaseKey)
