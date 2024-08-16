
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://nmwcfdaagityrjstcgca.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5td2NmZGFhZ2l0eXJqc3RjZ2NhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTc2ODIyOTksImV4cCI6MjAzMzI1ODI5OX0.E6tBditNdoBlimH9MefPMWUyRDlkdIxwX7ItJ1src9o"
const supabase = createClient(supabaseUrl, supabaseKey)


export default supabase