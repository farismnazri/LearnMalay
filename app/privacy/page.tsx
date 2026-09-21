import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Notis Privasi / Privacy Notice | Learn Malay",
  description: "How Red Island Studio handles personal data in Learn Malay.",
};

const CONTACT = "fa.redislandstudio@gmail.com";

function NoticeSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-7 border-t border-[#8e6f38]/25 pt-6 first:mt-0 first:border-0 first:pt-0">
      <h3 className="text-xl font-black text-[#315a36] sm:text-2xl">{title}</h3>
      <div className="mt-3 space-y-3 text-sm leading-7 text-[#302718] sm:text-base">{children}</div>
    </section>
  );
}

const List = ({ children }: { children: React.ReactNode }) => (
  <ul className="list-disc space-y-2 pl-5 marker:text-[#9a6724]">{children}</ul>
);

export default function PrivacyPage() {
  return (
    <main className="chapter-page-shell relative min-h-screen overflow-x-hidden app-page-pad">
      <div className="chapter-viewport-bg" aria-hidden="true">
        <div className="chapter-viewport-bg-image landing-page-bg-image landing-user-mobile-bg-image" />
        <div className="chapter-viewport-bg-fade" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-5xl">
        <header className="rounded-3xl border border-[#d7b45c]/45 bg-[#142a1c]/92 px-5 py-6 text-[#fff7d6] shadow-2xl backdrop-blur sm:px-8 sm:py-8">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-[#f0cc65]">Learn Malay</p>
          <h1 className="mt-2 text-3xl font-black sm:text-5xl">Notis Privasi / Privacy Notice</h1>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-[#f8efcb]/85 sm:text-base">
            Tarikh berkuat kuasa dan kemas kini terakhir / Effective and last updated: 21 September 2026
          </p>
          <nav className="mt-5 flex flex-wrap gap-3" aria-label="Privacy Notice languages">
            <a className="touch-target inline-flex items-center rounded-xl bg-[#f0cc65] px-4 py-2 font-black text-[#312309]" href="#bahasa-melayu">
              Bahasa Melayu
            </a>
            <a className="touch-target inline-flex items-center rounded-xl border border-[#f0cc65]/60 px-4 py-2 font-black text-[#fff7d6]" href="#english">
              English
            </a>
            <Link className="touch-target inline-flex items-center rounded-xl border border-white/25 px-4 py-2 font-black text-[#fff7d6]" href="/">
              Halaman utama / Home
            </Link>
          </nav>
        </header>

        <article id="bahasa-melayu" lang="ms" className="mt-6 scroll-mt-5 rounded-3xl border border-[#d9c58f] bg-[#fff9e8]/97 p-5 shadow-2xl sm:p-8">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-[#8b5a20]">Bahasa Melayu</p>
          <h2 className="mt-2 text-3xl font-black text-[#284d30]">Notis Privasi</h2>

          <NoticeSection title="1. Siapa yang mengendalikan Learn Malay">
            <p>Learn Malay dikendalikan oleh Red Island Studio, sebuah perniagaan yang berdaftar dengan Suruhanjaya Syarikat Malaysia (SSM).</p>
            <p>
              Untuk pertanyaan atau permintaan privasi, e-mel{" "}
              <a className="font-bold text-[#236b3b] underline" href={`mailto:${CONTACT}`}>{CONTACT}</a>.
            </p>
          </NoticeSection>

          <NoticeSection title="2. Maklumat yang kami kendalikan">
            <List>
              <li>Nama pengguna, ikon profil, peranan akaun dan rekod masa akaun. Nama pengguna dinormalkan untuk digunakan sebagai pengecam akaun dalaman.</li>
              <li>Kata laluan diproses untuk log masuk. Aplikasi menyimpan pengesah kata laluan berasaskan hash, garam dan algoritma, bukan nilai kata laluan asal.</li>
              <li>ID sesi dan masa penciptaan, penggunaan terakhir dan tamat tempoh sesi.</li>
              <li>Kedudukan bab semasa, halaman, kemajuan, serta rekod semakan dan penyelesaian bab.</li>
              <li>Rekod permainan dan skor, termasuk permainan, keputusan, masa, ketepatan, percubaan, kesukaran dan butiran permainan lain yang berkenaan.</li>
              <li>Peristiwa aktiviti berkaitan akaun seperti log masuk, bab dimulakan atau diselesaikan, serta minigame dimulakan atau diselesaikan.</li>
              <li>Data teknikal dan penggunaan yang diproses oleh Vercel untuk penyampaian laman, log operasi, Observability dan Web Analytics.</li>
            </List>
          </NoticeSection>

          <NoticeSection title="3. Tujuan penggunaan maklumat">
            <p>Kami menggunakan maklumat ini untuk mewujudkan dan mengesahkan akaun, mengekalkan sesi, menyimpan kemajuan pembelajaran, membuka kandungan, menyimpan dan memaparkan skor, menyediakan analitik pentadbir, mengendalikan permintaan pemadaman, menjaga keselamatan perkhidmatan, serta menyiasat masalah teknikal.</p>
            <p>Vercel Web Analytics digunakan untuk memahami penggunaan laman seperti paparan halaman. Ia berasingan daripada sejarah aktiviti pembelajaran yang dipautkan kepada akaun.</p>
          </NoticeSection>

          <NoticeSection title="4. Papan skor awam">
            <p>Jika anda menyimpan skor minigame, nama pengguna pilihan anda, ikon profil, keputusan permainan dan tarikh boleh dipaparkan pada papan skor awam. Maklumat ini boleh dipautkan kepada akaun anda dan tidak dianggap tanpa nama.</p>
            <p>API papan skor awam tidak mendedahkan ID akaun berasingan, ID larian, metadata bebas atau butiran prestasi dalaman yang tidak diperlukan untuk paparan.</p>
          </NoticeSection>

          <NoticeSection title="5. Penyedia, lokasi dan pemprosesan rentas sempadan">
            <List>
              <li>Vercel menyediakan pengehosan, CDN/proksi global, fungsi aplikasi, Runtime Logs, log binaan/deployment, Observability dan Web Analytics.</li>
              <li>MongoDB Atlas menyimpan data aplikasi pada AWS di Singapura (<code>ap-southeast-1</code>) dalam replica set tiga nod. Papan pemuka Atlas kini menunjukkan <strong>Backups Inactive</strong>.</li>
              <li>Infrastruktur CDN dan fungsi Vercel boleh memproses permintaan di luar Malaysia, termasuk di Amerika Syarikat. Laluan tepat boleh berubah; peratusan trafik yang pernah diperhatikan bukan jaminan lokasi tetap.</li>
            </List>
            <p>Speed Insights tidak diaktifkan dan tiada integrasi pemantauan pihak ketiga dikenal pasti dalam repositori atau Vercel Integrations.</p>
          </NoticeSection>

          <NoticeSection title="6. Tempoh penyimpanan dan pemadaman">
            <List>
              <li>Profil, kemajuan, rekod penyelesaian dan skor disimpan semasa akaun wujud, kecuali skor dipadam lebih awal oleh pentadbir.</li>
              <li>Sesi pelajar sah sehingga 30 hari dan sesi pentadbir sehingga 8 jam. Sesi juga boleh dipadam apabila log keluar, diganti, akaun dipadam atau rekod tamat tempoh diperiksa.</li>
              <li>Paparan analitik pentadbir menggunakan peristiwa aktiviti dalam 90 hari terakhir. Peristiwa mentah yang berusia lebih daripada 90 hari layak dipadam oleh tugas penyelenggaraan harian pada larian berjaya yang seterusnya. Rekod mungkin kekal seketika selepas mencapai tempoh tersebut jika larian dijadualkan lewat atau gagal.</li>
              <li>Pelan Vercel Hobby kini menyediakan satu jam Runtime Logs. Tetingkap pelaporan Web Analytics ialah satu bulan, walaupun Vercel menyatakan data mungkin disimpan lebih lama. Log binaan disimpan bersama deployment mengikut dasar Vercel; tempoh Observability bergantung pada kawalan pelan dan penyedia.</li>
            </List>
          </NoticeSection>

          <NoticeSection title="7. Pemadaman akaun">
            <p>Anda boleh menggunakan “Delete My Account” pada halaman pengguna. Pelaksanaan semasa memadam profil dan kemajuan, semua sesi, serta skor dan peristiwa aktiviti yang dipautkan melalui ID akaun. Jika skor lama kekal kerana tiada pautan akaun yang boleh dipercayai, hubungi kami supaya rekod itu boleh disemak.</p>
          </NoticeSection>

          <NoticeSection title="8. Kuki dan storan pelayar">
            <p>Learn Malay menggunakan kuki sesi <code>learnMalay.sessionId</code> yang HttpOnly dan SameSite=Lax; ia ditandakan Secure dalam persekitaran produksi. Aplikasi juga menggunakan storan setempat pelayar untuk pilihan bahasa, tetapan audio, penolakan arahan pemasangan dan sesetengah pilihan kesukaran permainan. Vercel Web Analytics tidak memerlukan kuki analitik pihak ketiga.</p>
          </NoticeSection>

          <NoticeSection title="9. Permintaan dan pilihan anda">
            <p>Anda boleh meminta maklumat tentang data akaun anda, meminta pembetulan maklumat yang tidak tepat, meminta pemadaman akaun, atau mengemukakan pertanyaan privasi melalui <a className="font-bold text-[#236b3b] underline" href={`mailto:${CONTACT}`}>{CONTACT}</a>. Kami mungkin perlu mengesahkan bahawa anda mengawal akaun sebelum bertindak. Hak dan pengecualian tertentu bergantung pada undang-undang Malaysia yang terpakai.</p>
          </NoticeSection>

          <NoticeSection title="10. Perubahan kepada notis ini">
            <p>Kami boleh mengemas kini notis ini apabila cara Learn Malay mengendalikan data atau penyedianya berubah. Tarikh di bahagian atas akan dikemas kini. Perubahan penting akan dipaparkan dengan cara yang munasabah dalam aplikasi.</p>
          </NoticeSection>
        </article>

        <article id="english" lang="en" className="mt-6 scroll-mt-5 rounded-3xl border border-[#d9c58f] bg-[#fff9e8]/97 p-5 shadow-2xl sm:p-8">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-[#8b5a20]">English</p>
          <h2 className="mt-2 text-3xl font-black text-[#284d30]">Privacy Notice</h2>

          <NoticeSection title="1. Who operates Learn Malay">
            <p>Learn Malay is operated by Red Island Studio, a business registered with the Companies Commission of Malaysia (SSM).</p>
            <p>
              For privacy questions or requests, email{" "}
              <a className="font-bold text-[#236b3b] underline" href={`mailto:${CONTACT}`}>{CONTACT}</a>.
            </p>
          </NoticeSection>

          <NoticeSection title="2. Information we handle">
            <List>
              <li>Your chosen username, profile icon, account role and account timestamps. The username is normalized for use as an internal account identifier.</li>
              <li>Your password is processed for login. The application stores a password verifier made from a hash, salt and algorithm, rather than the original password value.</li>
              <li>A session ID and the session’s creation, last-use and expiry times.</li>
              <li>Your current chapter and page, learning progress, and chapter revision and completion records.</li>
              <li>Game and score records, including the game, result, time, accuracy, attempts, difficulty and other applicable game details.</li>
              <li>Account-linked activity events such as login, chapter started or completed, and minigame started or completed.</li>
              <li>Technical and usage data processed by Vercel to deliver the site and provide operational logs, Observability and Web Analytics.</li>
            </List>
          </NoticeSection>

          <NoticeSection title="3. Why we use this information">
            <p>We use this information to create and authenticate accounts, maintain sessions, save learning progress, unlock content, save and display scores, provide private administrator analytics, handle deletion requests, protect the service, and investigate technical problems.</p>
            <p>Vercel Web Analytics is used to understand site use, such as page views. It is separate from the account-linked learning activity history.</p>
          </NoticeSection>

          <NoticeSection title="4. Public leaderboards">
            <p>If you save a minigame score, your chosen username, profile icon, game result and date may appear on the public leaderboard. This information can be linked to your account and is not anonymous.</p>
            <p>The public leaderboard API does not expose a separate account ID, run ID, arbitrary metadata, or internal performance details that are not needed for display.</p>
          </NoticeSection>

          <NoticeSection title="5. Providers, locations and international processing">
            <List>
              <li>Vercel provides hosting, the global CDN/proxy, application functions, Runtime Logs, deployment/build logs, Observability and Web Analytics.</li>
              <li>MongoDB Atlas stores application data on AWS in Singapore (<code>ap-southeast-1</code>) using a three-node replica set. The Atlas dashboard currently shows <strong>Backups Inactive</strong>.</li>
              <li>Vercel’s CDN and function infrastructure may process requests outside Malaysia, including in the United States. Routing can change, and previously observed traffic percentages are not permanent location guarantees.</li>
            </List>
            <p>Speed Insights is not enabled, and no third-party monitoring integration has been identified in the repository or Vercel Integrations.</p>
          </NoticeSection>

          <NoticeSection title="6. Retention and deletion">
            <List>
              <li>Profiles, progress, completion records and highscores are kept while the account exists, unless scores are reset earlier by an administrator.</li>
              <li>Learner sessions are valid for up to 30 days and administrator sessions for up to 8 hours. Sessions can also be deleted on logout, replacement, account deletion, or when an expired record is checked.</li>
              <li>Administrator analytics use activity events from the latest 90 days. Raw events older than 90 days become eligible for deletion by a daily maintenance task on its next successful run. A record may remain briefly after reaching that age if a scheduled run is delayed or fails.</li>
              <li>The current Vercel Hobby plan provides one hour of Runtime Logs. The Web Analytics reporting window is one month, although Vercel says data may be stored longer. Build logs are kept with deployments under Vercel’s policies; Observability retention depends on provider and plan controls.</li>
            </List>
          </NoticeSection>

          <NoticeSection title="7. Account deletion">
            <p>You can use “Delete My Account” on the user page. The current implementation deletes the profile and progress, all sessions, and scores and activity events linked through the account ID. If an older score remains because it does not have a reliable account link, contact us so it can be reviewed.</p>
          </NoticeSection>

          <NoticeSection title="8. Cookies and browser storage">
            <p>Learn Malay uses the <code>learnMalay.sessionId</code> session cookie with HttpOnly and SameSite=Lax settings; it is marked Secure in production. The application also uses browser local storage for language preference, audio settings, installation-prompt dismissal, and some game difficulty preferences. Vercel Web Analytics does not require third-party analytics cookies.</p>
          </NoticeSection>

          <NoticeSection title="9. Your requests and choices">
            <p>You may ask for information about your account data, ask us to correct inaccurate information, request account deletion, or raise a privacy question by emailing <a className="font-bold text-[#236b3b] underline" href={`mailto:${CONTACT}`}>{CONTACT}</a>. We may need to verify that you control the account before acting. Particular rights and exceptions depend on applicable Malaysian law.</p>
          </NoticeSection>

          <NoticeSection title="10. Changes to this notice">
            <p>We may update this notice when Learn Malay’s data handling or providers change. We will update the date at the top and present material changes in a reasonable way within the application.</p>
          </NoticeSection>
        </article>
      </div>
    </main>
  );
}
