const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

async function register(email, password) {
  const { user, error } = await supabase.auth.signUp({ email, password });
  if (error) throw error;
  return user;
}

async function login(email, password) {
  const { user, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw error;
  return user;
}

module.exports = { register, login };
