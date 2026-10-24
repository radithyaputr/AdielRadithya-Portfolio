/* ==========================================================================
   SITE CONFIGURATION
   Ganti NASA_API_KEY dengan key pribadi gratis kamu:
   1. Buka https://api.nasa.gov  ->  daftar pakai email (gratis, 2 menit)
   2. Masukkan key di bawah, contoh: NASA_API_KEY: 'AbC123xyz...'
   Key pribadi = 1.000 request/jam (vs DEMO_KEY cuma 30/jam per IP).
   Biarkan 'DEMO_KEY' jika belum mau ganti (tetap jalan, tapi bisa ke-limit).
   ========================================================================== */

const CONFIG = {
  NASA_API_KEY: 'DEMO_KEY',

  EMAILJS: {
    /* CARA AMBIL PUBLIC KEY (2 menit, gratis):
       1. Buka https://dashboard.emailjs.com -> login / daftar pakai email
       2. Menu "Account" -> "API Keys"
       3. Salin "Public Key" (awalannya "user_...") ke bawah ini
    */
    PUBLIC_KEY: 'CVZLBMMGIEHPKUbD5',
    SERVICE_ID: 'service_hcimdm4',
    TEMPLATE_ID: 'template_k0ybpmv',
    TO_EMAIL: 'radith614@gmail.com'
  }
};
