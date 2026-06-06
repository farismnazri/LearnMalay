import type { ChapterContent } from "./types";

export const chapter11: ChapterContent = {
  id: 11,
  revision: 1,
  title: {
    ms: "Cuti-Cuti Umum di Malaysia",
    en: "Public Holidays in Malaysia",
    es: "Dias festivos en Malasia",
  },
  pages: [
    {
      id: "c11-p1-kalendar-2026",
      kind: "figure",
      title: {
        ms: "Kalendar Tahun 2026",
        en: "Calendar Year 2026",
        es: "Calendario del ano 2026",
      },
      imageSrc: "/assets/chapters/ch11/calendar-2026.svg",
      alt: {
        ms: "Kalendar tahun 2026",
        en: "Year 2026 calendar",
        es: "Calendario del ano 2026",
      },
      caption: {
        ms: "Kuning: cuti seluruh negeri. Biru lutsinar: cuti bukan seluruh negeri.",
        en: "Yellow: all-state holidays. Translucent blue: non all-state holidays.",
        es: "Amarillo: festivos de todos los estados. Azul translucido: festivos no estatales.",
      },
      maxWidthPx: 1180,
    },
    {
      id: "c11-p2-cuti-seluruh-negeri",
      kind: "table",
      title: {
        ms: "Senarai Cuti Umum 2026 (Seluruh Negeri)",
        en: "Public Holiday List 2026 (All States)",
        es: "Lista de dias festivos 2026 (Todos los estados)",
      },
      columns: [
        { key: "tarikh", label: { ms: "Tarikh", en: "Date", es: "Fecha" } },
        { key: "hari", label: { ms: "Hari", en: "Day", es: "Dia" } },
        { key: "cuti", label: { ms: "Cuti", en: "Holiday", es: "Festivo" } },
        { key: "negeri", label: { ms: "Negeri", en: "State", es: "Estado" } },
      ],
      rows: [
        {
          id: "c11-all-2026-02-17",
          cells: {
            tarikh: [{ ms: "17 Feb", en: "17 Feb", es: "17 Feb" }],
            hari: [{ ms: "Selasa", en: "Tuesday", es: "Martes" }],
            cuti: [{ ms: "Tahun Baru Cina", en: "Chinese New Year", es: "Año Nuevo Chino" }],
            negeri: [{ ms: "Seluruh Negeri", en: "All States", es: "Todos los estados" }],
          },
        },
        {
          id: "c11-all-2026-02-18",
          cells: {
            tarikh: [{ ms: "18 Feb", en: "18 Feb", es: "18 Feb" }],
            hari: [{ ms: "Rabu", en: "Wednesday", es: "Miercoles" }],
            cuti: [{ ms: "Tahun Baru Cina Hari Kedua", en: "Chinese New Year Second Day", es: "Año Nuevo Chino segundo dia" }],
            negeri: [{ ms: "Seluruh Negeri", en: "All States", es: "Todos los estados" }],
          },
        },
        {
          id: "c11-all-2026-03-21",
          cells: {
            tarikh: [{ ms: "21 Mac", en: "21 Mar", es: "21 Mar" }],
            hari: [{ ms: "Sabtu", en: "Saturday", es: "Sabado" }],
            cuti: [{ ms: "Hari Raya Aidilfitri", en: "Hari Raya Aidilfitri", es: "Hari Raya Aidilfitri" }],
            negeri: [{ ms: "Seluruh Negeri", en: "All States", es: "Todos los estados" }],
          },
        },
        {
          id: "c11-all-2026-03-22",
          cells: {
            tarikh: [{ ms: "22 Mac", en: "22 Mar", es: "22 Mar" }],
            hari: [{ ms: "Ahad", en: "Sunday", es: "Domingo" }],
            cuti: [{ ms: "Hari Raya Aidilfitri Hari Kedua", en: "Hari Raya Aidilfitri Second Day", es: "Hari Raya Aidilfitri segundo dia" }],
            negeri: [{ ms: "Seluruh Negeri", en: "All States", es: "Todos los estados" }],
          },
        },
        {
          id: "c11-all-2026-05-01",
          cells: {
            tarikh: [{ ms: "1 Mei", en: "1 May", es: "1 May" }],
            hari: [{ ms: "Jumaat", en: "Friday", es: "Viernes" }],
            cuti: [{ ms: "Hari Pekerja", en: "Labour Day", es: "Día del Trabajador" }],
            negeri: [{ ms: "Seluruh Negeri", en: "All States", es: "Todos los estados" }],
          },
        },
        {
          id: "c11-all-2026-05-27",
          cells: {
            tarikh: [{ ms: "27 Mei", en: "27 May", es: "27 May" }],
            hari: [{ ms: "Rabu", en: "Wednesday", es: "Miercoles" }],
            cuti: [{ ms: "Hari Raya Haji", en: "Hari Raya Haji", es: "Hari Raya Haji" }],
            negeri: [{ ms: "Seluruh Negeri", en: "All States", es: "Todos los estados" }],
          },
        },
        {
          id: "c11-all-2026-05-31",
          cells: {
            tarikh: [{ ms: "31 Mei", en: "31 May", es: "31 May" }],
            hari: [{ ms: "Ahad", en: "Sunday", es: "Domingo" }],
            cuti: [{ ms: "Hari Wesak", en: "Wesak Day", es: "Día de Wesak" }],
            negeri: [{ ms: "Seluruh Negeri", en: "All States", es: "Todos los estados" }],
          },
        },
        {
          id: "c11-all-2026-06-01",
          cells: {
            tarikh: [{ ms: "1 Jun", en: "1 Jun", es: "1 Jun" }],
            hari: [{ ms: "Isnin", en: "Monday", es: "Lunes" }],
            cuti: [{ ms: "Hari Keputeraan YDP Agong", en: "Birthday of YDP Agong", es: "Cumpleaños de YDP Agong" }],
            negeri: [{ ms: "Seluruh Negeri", en: "All States", es: "Todos los estados" }],
          },
        },
        {
          id: "c11-all-2026-06-17",
          cells: {
            tarikh: [{ ms: "17 Jun", en: "17 Jun", es: "17 Jun" }],
            hari: [{ ms: "Rabu", en: "Wednesday", es: "Miercoles" }],
            cuti: [{ ms: "Awal Muharram", en: "Awal Muharram", es: "Awal Muharram" }],
            negeri: [{ ms: "Seluruh Negeri", en: "All States", es: "Todos los estados" }],
          },
        },
        {
          id: "c11-all-2026-08-25",
          cells: {
            tarikh: [{ ms: "25 Ogos", en: "25 Aug", es: "25 Ago" }],
            hari: [{ ms: "Selasa", en: "Tuesday", es: "Martes" }],
            cuti: [{ ms: "Maulidur Rasul", en: "Maulidur Rasul", es: "Maulidur Rasul" }],
            negeri: [{ ms: "Seluruh Negeri", en: "All States", es: "Todos los estados" }],
          },
        },
        {
          id: "c11-all-2026-08-31",
          cells: {
            tarikh: [{ ms: "31 Ogos", en: "31 Aug", es: "31 Ago" }],
            hari: [{ ms: "Isnin", en: "Monday", es: "Lunes" }],
            cuti: [{ ms: "Hari Kebangsaan", en: "National Day", es: "Día Nacional" }],
            negeri: [{ ms: "Seluruh Negeri", en: "All States", es: "Todos los estados" }],
          },
        },
        {
          id: "c11-all-2026-09-16",
          cells: {
            tarikh: [{ ms: "16 Sep", en: "16 Sep", es: "16 Sep" }],
            hari: [{ ms: "Rabu", en: "Wednesday", es: "Miercoles" }],
            cuti: [{ ms: "Hari Malaysia", en: "Malaysia Day", es: "Día de Malasia" }],
            negeri: [{ ms: "Seluruh Negeri", en: "All States", es: "Todos los estados" }],
          },
        },
        {
          id: "c11-all-2026-12-25",
          cells: {
            tarikh: [{ ms: "25 Dis", en: "25 Dec", es: "25 Dic" }],
            hari: [{ ms: "Jumaat", en: "Friday", es: "Viernes" }],
            cuti: [{ ms: "Hari Krismas", en: "Christmas Day", es: "Navidad" }],
            negeri: [{ ms: "Seluruh Negeri", en: "All States", es: "Todos los estados" }],
          },
        },
      ],
    },
    {
      id: "c11-p3-chat-soalan-cuti",
      kind: "chat",
      youId: "azman",
      title: {
        ms: "Situasi 11 Mini Kuiz Siapa Pintar: Soalan Cuti Umum",
        en: "Situation 11 Siapa Pintar Mini Quiz: Public Holiday Questions",
        es: "Situacion 11 Mini concurso? Siapa Pintar: Preguntas sobre festivos",
      },
      context: {
        ms: "Latar tempat: Studio mini kuiz 'Siapa Pintar'",
        en: "Setting: Studio of the 'Siapa Pintar' mini quiz",
        es: "Lugar: Estudio del mini concurso? 'Siapa Pintar'",
      },
      participants: [
        {
          id: "pengacara",
          name: { ms: "Pengacara", en: "Host", es: "Presentador" },
        },
        {
          id: "abu",
          name: { ms: "Abu", en: "Abu", es: "Abu" },
        },
        {
          id: "azman",
          name: { ms: "Azman", en: "Azman", es: "Azman" },
          avatarSrc: "/assets/characters/Bandicoot_Profile.png",
        },
      ],
      messages: [
        {
          id: "c11-chat1-m1",
          from: "pengacara",
          text: {
            ms: "Selamat datang ke pusingan Teka Cuti!",
            en: "Welcome to the Guess the Holiday round!",
            es: "Bienvenidos a la ronda ¡Adivina el festivo!",
          },
        },
        {
          id: "c11-chat1-m2",
          from: "abu",
          text: {
            ms: "Saya sudah bersedia.",
            en: "I am ready.",
            es: "Estoy listo.",
          },
        },
        {
          id: "c11-chat1-m3",
          from: "azman",
          text: {
            ms: "Saya pun bersedia.",
            en: "I am ready too.",
            es: "Yo también estoy listo.",
          },
        },
        {
          id: "c11-chat1-m4",
          from: "pengacara",
          text: {
            ms: "Soalan pertama: Hari Kebangsaan pada bulan apa?",
            en: "First question: What month is National Day in?",
            es: "Primera pregunta: ¿En qué mes es el Día Nacional?",
          },
        },
        {
          id: "c11-chat1-m5",
          from: "abu",
          text: {
            ms: "Bulan Ogos.",
            en: "August.",
            es: "Agosto.",
          },
        },
        {
          id: "c11-chat1-m6",
          from: "pengacara",
          text: {
            ms: "Betul, 31 Ogos. Satu markah untuk Abu.",
            en: "Correct, August 31. One point for Abu.",
            es: "Correcto, 31 de agosto. Un punto para Abu.",
          },
        },
        {
          id: "c11-chat1-m7",
          from: "pengacara",
          text: {
            ms: "Soalan kedua: Krismas pada 25 Disember atau 25 November?",
            en: "Second question: Is Christmas on December 25 or November 25?",
            es: "Segunda pregunta: ¿Navidad es el 25 de diciembre o el 25 de noviembre?",
          },
        },
        {
          id: "c11-chat1-m8",
          from: "azman",
          text: {
            ms: "25 Disember.",
            en: "December 25.",
            es: "25 de diciembre.",
          },
        },
        {
          id: "c11-chat1-m9",
          from: "pengacara",
          text: {
            ms: "Tepat. Soalan bonus: Hari Malaysia pada 16 September?",
            en: "Correct. Bonus question: Is Malaysia Day on September 16?",
            es: "Correcto. Pregunta extra: ¿El Día de Malasia es el 16 de septiembre?",
          },
        },
        {
          id: "c11-chat1-m10",
          from: "abu",
          text: {
            ms: "Betul, 16 September.",
            en: "Correct, September 16.",
            es: "Correcto, 16 de septiembre.",
          },
        },
        {
          id: "c11-chat1-m11",
          from: "pengacara",
          text: {
            ms: "Hebat. Skor seri! Semua dapat pelekat bintang.",
            en: "Great. The score is tied! Everyone gets a star sticker.",
            es: "¡Excelente! El marcador está empatado. Todos reciben una pegatina de estrella.",
          },
        },
        {
          id: "c11-chat1-m12",
          from: "azman",
          text: {
            ms: "Seronok! Saya mahu main lagi.",
            en: "Fun! I want to play again.",
            es: "Divertido! Quiero jugar otra vez.",
          },
        },
      ],
    },
    {
      id: "c11-p4-tick-latihan1",
      kind: "tick",
      title: {
        ms: "Latihan 1",
        en: "Exercise 1",
        es: "Ejercicio 1",
      },
      instructions: {
        ms: "Tandakan (/) bagi hari cuti umum.",
        en: "Tick (/) for public holidays.",
        es: "Marca (/) los dias festivos.",
      },
      items: [
        {
          id: "c11-tick-1",
          correct: true,
          text: { ms: "Hari keputeraan Agong", en: "Birthday of Agong", es: "Cumpleaños del Agong" },
          why: {
            ms: "Betul. Hari Keputeraan Yang di-Pertuan Agong ialah cuti umum utama.",
            en: "Correct. The Birthday of Yang di-Pertuan Agong is a major public holiday.",
            es: "Correcto. El Cumpleaños de Yang di-Pertuan Agong es un día festivo principal.",
          },
        },
        {
          id: "c11-tick-2",
          correct: false,
          text: { ms: "Hari keputeraan Sultan Selangor", en: "Birthday of Sultan Selangor", es: "Cumpleaños del Sultan de Selangor" },
          why: {
            ms: "Salah. Ini cuti negeri Selangor, bukan cuti umum utama seluruh negara.",
            en: "Wrong. This is a Selangor state holiday, not a nationwide major public holiday.",
            es: "Incorrecto. Es un festivo estatal de Selangor, no un festivo nacional principal.",
          },
        },
        {
          id: "c11-tick-3",
          correct: true,
          text: { ms: "Hari Raya Aidiladha", en: "Hari Raya Aidiladha", es: "Hari Raya Aidiladha" },
          why: {
            ms: "Betul. Hari Raya Aidiladha termasuk dalam cuti umum utama.",
            en: "Correct. Hari Raya Aidiladha is one of the major public holidays.",
            es: "Correcto. Hari Raya Aidiladha es uno de los dias festivos principales.",
          },
        },
        {
          id: "c11-tick-4",
          correct: false,
          text: { ms: "Cuti sekolah", en: "School holiday", es: "Vacaciones escolares" },
          why: {
            ms: "Salah. Cuti sekolah bukan cuti umum.",
            en: "Wrong. School holidays are not public holidays.",
            es: "Incorrecto. Las vacaciones escolares no son días festivos públicos.",
          },
        },
        {
          id: "c11-tick-5",
          correct: false,
          text: { ms: "Hari lahir ketua kampung", en: "Village head's birthday", es: "Cumpleaños del jefe de aldea" },
          why: {
            ms: "Salah. Hari lahir ketua kampung bukan cuti umum.",
            en: "Wrong. A village head's birthday is not a public holiday.",
            es: "Incorrecto. El cumpleaños del jefe de aldea no es un día festivo público.",
          },
        },
        {
          id: "c11-tick-6",
          correct: true,
          text: { ms: "Tahun Baru Cina", en: "Chinese New Year", es: "Año Nuevo Chino" },
          why: {
            ms: "Betul. Tahun Baru Cina ialah cuti umum utama.",
            en: "Correct. Chinese New Year is a major public holiday.",
            es: "Correcto. El Año Nuevo Chino es un día festivo principal.",
          },
        },
        {
          id: "c11-tick-7",
          correct: true,
          text: { ms: "Maulidur Rasul", en: "Maulidur Rasul", es: "Maulidur Rasul" },
          why: {
            ms: "Betul. Maulidur Rasul ialah cuti umum utama.",
            en: "Correct. Maulidur Rasul is a major public holiday.",
            es: "Correcto. Maulidur Rasul es un día festivo principal.",
          },
        },
        {
          id: "c11-tick-8",
          correct: true,
          text: { ms: "Hari puasa", en: "Hari Puasa (Eid al-Fitr)", es: "Hari Puasa (Eid al-Fitr)" },
          why: {
            ms: "Betul. Hari Puasa merujuk kepada Hari Raya Aidilfitri yang merupakan cuti umum utama.",
            en: "Correct. Hari Puasa refers to Hari Raya Aidilfitri, which is a major public holiday.",
            es: "Correcto. Hari Puasa se refiere a Hari Raya Aidilfitri, que es un día festivo principal.",
          },
        },
        {
          id: "c11-tick-9",
          correct: true,
          text: { ms: "Hari Wesak", en: "Wesak Day", es: "Día de Wesak" },
          why: {
            ms: "Betul. Hari Wesak ialah cuti umum utama.",
            en: "Correct. Wesak Day is a major public holiday.",
            es: "Correcto. El Día de Wesak es un día festivo principal.",
          },
        },
        {
          id: "c11-tick-10",
          correct: false,
          text: { ms: "Cuti sakit", en: "Sick leave", es: "Baja por enfermedad" },
          why: {
            ms: "Salah. Cuti sakit ialah cuti peribadi, bukan cuti umum.",
            en: "Wrong. Sick leave is personal leave, not a public holiday.",
            es: "Incorrecto. La baja por enfermedad es permiso personal, no un festivo público.",
          },
        },
      ],
    },
  ],
};
