import type { ChapterContent } from "./types";

export const chapter11: ChapterContent = {
  id: 11,
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
            cuti: [{ ms: "Tahun Baru Cina", en: "Chinese New Year", es: "Ano Nuevo Chino" }],
            negeri: [{ ms: "Seluruh Negeri", en: "All States", es: "Todos los estados" }],
          },
        },
        {
          id: "c11-all-2026-02-18",
          cells: {
            tarikh: [{ ms: "18 Feb", en: "18 Feb", es: "18 Feb" }],
            hari: [{ ms: "Rabu", en: "Wednesday", es: "Miercoles" }],
            cuti: [{ ms: "Tahun Baru Cina Hari Kedua", en: "Chinese New Year Second Day", es: "Ano Nuevo Chino segundo dia" }],
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
            cuti: [{ ms: "Hari Pekerja", en: "Labour Day", es: "Dia del Trabajador" }],
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
            cuti: [{ ms: "Hari Wesak", en: "Wesak Day", es: "Dia de Wesak" }],
            negeri: [{ ms: "Seluruh Negeri", en: "All States", es: "Todos los estados" }],
          },
        },
        {
          id: "c11-all-2026-06-01",
          cells: {
            tarikh: [{ ms: "1 Jun", en: "1 Jun", es: "1 Jun" }],
            hari: [{ ms: "Isnin", en: "Monday", es: "Lunes" }],
            cuti: [{ ms: "Hari Keputeraan YDP Agong", en: "Birthday of YDP Agong", es: "Cumpleanos de YDP Agong" }],
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
            cuti: [{ ms: "Hari Kebangsaan", en: "National Day", es: "Dia Nacional" }],
            negeri: [{ ms: "Seluruh Negeri", en: "All States", es: "Todos los estados" }],
          },
        },
        {
          id: "c11-all-2026-09-16",
          cells: {
            tarikh: [{ ms: "16 Sep", en: "16 Sep", es: "16 Sep" }],
            hari: [{ ms: "Rabu", en: "Wednesday", es: "Miercoles" }],
            cuti: [{ ms: "Hari Malaysia", en: "Malaysia Day", es: "Dia de Malasia" }],
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
        ms: "Situasi 11 Rancangan Siapa Pintar : Soalan Cuti Umum di Malaysia",
        en: "Situation 11 Siapa Pintar Show: Public Holiday Questions in Malaysia",
        es: "Situacion 11 Programa Siapa Pintar: Preguntas sobre festivos en Malasia",
      },
      context: {
        ms: "Latar tempat: Studio rancangan 'Siapa Pintar'",
        en: "Setting: Studio of the 'Siapa Pintar' show",
        es: "Lugar: Estudio del programa 'Siapa Pintar'",
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
            ms: "Assalamualaikum, kita kembali ke dalam rancangan 'Siapa Pintar'.\nBaik, kita teruskan dengan soalan yang pertama.\nBerapakah jumlah cuti umum dalam setahun di Malaysia?",
            en: "Assalamualaikum, welcome back to the 'Siapa Pintar' show.\nAlright, we continue with the first question.\nHow many public holidays are there in a year in Malaysia?",
            es: "Assalamualaikum, volvemos al programa 'Siapa Pintar'.\nBien, continuamos con la primera pregunta.\nCuantos dias festivos hay en un ano en Malasia?",
          },
        },
        {
          id: "c11-chat1-m2",
          from: "abu",
          text: {
            ms: "Biasanya terdapat sepuluh cuti umum yang penting di Malaysia.",
            en: "Usually there are ten important public holidays in Malaysia.",
            es: "Normalmente hay diez dias festivos importantes en Malasia.",
          },
        },
        {
          id: "c11-chat1-m3",
          from: "pengacara",
          text: {
            ms: "Betul!\nBaik, kita teruskan dengan soalan yang kedua. Apakah cuti umum tersebut?",
            en: "Correct!\nAlright, we continue with the second question. What are those public holidays?",
            es: "Correcto.\nBien, seguimos con la segunda pregunta. Cuales son esos dias festivos?",
          },
        },
        {
          id: "c11-chat1-m4",
          from: "azman",
          text: {
            ms: "Cuti-cuti umum tersebut ialah Hari Raya Aidilfitri, Hari Raya Aidiladha, Krismas, Deepavali, Tahun Baru Cina, Awal Muharam, Maulidur Rasul, Hari Keputeraan Yang Dipertuan Agong, Hari Kebangsaan dan Hari Malaysia.",
            en: "Those public holidays are Hari Raya Aidilfitri, Hari Raya Aidiladha, Christmas, Deepavali, Chinese New Year, Awal Muharam, Maulidur Rasul, the Birthday of Yang Dipertuan Agong, National Day and Malaysia Day.",
            es: "Esos dias festivos son Hari Raya Aidilfitri, Hari Raya Aidiladha, Navidad, Deepavali, Ano Nuevo Chino, Awal Muharam, Maulidur Rasul, el Cumpleanos de Yang Dipertuan Agong, el Dia Nacional y el Dia de Malasia.",
          },
        },
        {
          id: "c11-chat1-m5",
          from: "pengacara",
          text: {
            ms: "Tepat sekali!\nBaik, soalan yang terakhir. Adakah rakyat Malaysia bercuti pada hari-hari tersebut?",
            en: "Exactly right!\nAlright, the last question. Do Malaysians get leave on those days?",
            es: "Exactamente.\nBien, la ultima pregunta. Los malayos descansan en esos dias?",
          },
        },
        {
          id: "c11-chat1-m6",
          from: "azman",
          text: {
            ms: "Ya. Semua rakyat di Malaysia akan bercuti.",
            en: "Yes. All people in Malaysia will be on holiday.",
            es: "Si. Toda la gente en Malasia estara de vacaciones.",
          },
        },
        {
          id: "c11-chat1-m7",
          from: "pengacara",
          text: {
            ms: "Betul! Dengan ini, pemenangnya ialah saudara Azman.",
            en: "Correct. With this, the winner is Azman.",
            es: "Correcto. Con esto, el ganador es Azman.",
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
          text: { ms: "Hari keputeraan Agong", en: "Birthday of Agong", es: "Cumpleanos del Agong" },
          why: {
            ms: "Betul. Hari Keputeraan Yang di-Pertuan Agong ialah cuti umum utama.",
            en: "Correct. The Birthday of Yang di-Pertuan Agong is a major public holiday.",
            es: "Correcto. El Cumpleanos de Yang di-Pertuan Agong es un dia festivo principal.",
          },
        },
        {
          id: "c11-tick-2",
          correct: false,
          text: { ms: "Hari keputeraan Sultan Selangor", en: "Birthday of Sultan Selangor", es: "Cumpleanos del Sultan de Selangor" },
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
            es: "Incorrecto. Las vacaciones escolares no son dias festivos publicos.",
          },
        },
        {
          id: "c11-tick-5",
          correct: false,
          text: { ms: "Hari lahir ketua kampung", en: "Village head's birthday", es: "Cumpleanos del jefe de aldea" },
          why: {
            ms: "Salah. Hari lahir ketua kampung bukan cuti umum.",
            en: "Wrong. A village head's birthday is not a public holiday.",
            es: "Incorrecto. El cumpleanos del jefe de aldea no es un dia festivo publico.",
          },
        },
        {
          id: "c11-tick-6",
          correct: true,
          text: { ms: "Tahun Baru Cina", en: "Chinese New Year", es: "Ano Nuevo Chino" },
          why: {
            ms: "Betul. Tahun Baru Cina ialah cuti umum utama.",
            en: "Correct. Chinese New Year is a major public holiday.",
            es: "Correcto. El Ano Nuevo Chino es un dia festivo principal.",
          },
        },
        {
          id: "c11-tick-7",
          correct: true,
          text: { ms: "Maulidur Rasul", en: "Maulidur Rasul", es: "Maulidur Rasul" },
          why: {
            ms: "Betul. Maulidur Rasul ialah cuti umum utama.",
            en: "Correct. Maulidur Rasul is a major public holiday.",
            es: "Correcto. Maulidur Rasul es un dia festivo principal.",
          },
        },
        {
          id: "c11-tick-8",
          correct: true,
          text: { ms: "Hari puasa", en: "Hari Puasa (Eid al-Fitr)", es: "Hari Puasa (Eid al-Fitr)" },
          why: {
            ms: "Betul. Hari Puasa merujuk kepada Hari Raya Aidilfitri yang merupakan cuti umum utama.",
            en: "Correct. Hari Puasa refers to Hari Raya Aidilfitri, which is a major public holiday.",
            es: "Correcto. Hari Puasa se refiere a Hari Raya Aidilfitri, que es un dia festivo principal.",
          },
        },
        {
          id: "c11-tick-9",
          correct: true,
          text: { ms: "Hari Wesak", en: "Wesak Day", es: "Dia de Wesak" },
          why: {
            ms: "Betul. Hari Wesak ialah cuti umum utama.",
            en: "Correct. Wesak Day is a major public holiday.",
            es: "Correcto. El Dia de Wesak es un dia festivo principal.",
          },
        },
        {
          id: "c11-tick-10",
          correct: false,
          text: { ms: "Cuti sakit", en: "Sick leave", es: "Baja por enfermedad" },
          why: {
            ms: "Salah. Cuti sakit ialah cuti peribadi, bukan cuti umum.",
            en: "Wrong. Sick leave is personal leave, not a public holiday.",
            es: "Incorrecto. La baja por enfermedad es permiso personal, no un festivo publico.",
          },
        },
      ],
    },
  ],
};
