import type { ChapterContent } from "./types";

const pagi = "/assets/chapters/ch4/pagi.webp";
const tengahHari = "/assets/chapters/ch4/tengahhari.webp";
const petang = "/assets/chapters/ch4/petang.webp";
const malam = "/assets/chapters/ch4/malam.webp";

export const chapter04: ChapterContent = {
  id: 4,
  revision: 3,
  title: { ms: "Masa\n& Arah Jalan", en: "Time & Simple Routes", es: "Tiempo y Rutas Sencillas" },
  pages: [
    {
      id: "c4-p1-masa",
      kind: "iconRows",
      title: { ms: "Asas Masa", en: "Time Basics", es: "Conceptos Básicos del Tiempo" },
      rows: [
        {
          id: "c4-masa-def",
          iconSrc: "/assets/chapters/ch4/ch4_hour.webp",
          iconAlt: { ms: "Jam", en: "Clock", es: "Reloj" },
          name: { ms: "Masa", en: "Time", es: "Tiempo" },
          description: { ms: "Masa = waktu, ketika", en: "Masa means time or when.", es: "Masa significa tiempo o momento." },
        },
        {
          id: "c4-jam-minit",
          iconSrc: "/assets/chapters/ch4/ch4_hour.webp",
          iconAlt: { ms: "Satu jam", en: "One hour", es: "Una hora" },
          name: { ms: "1 jam = 60 minit", en: "1 hour = 60 minutes", es: "1 hora = 60 minutos" },
          description: { ms: "Jam mengandungi minit.", en: "An hour contains minutes.", es: "Una hora contiene minutos." },
        },
        {
          id: "c4-minit-saat",
          iconSrc: "/assets/chapters/ch4/ch4_minute.webp",
          iconAlt: { ms: "Satu minit", en: "One minute", es: "Un minuto" },
          name: { ms: "1 minit = 60 saat", en: "1 minute = 60 seconds", es: "1 minuto = 60 segundos" },
          description: { ms: "Minit mengandungi saat.", en: "A minute contains seconds.", es: "Un minuto contiene segundos." },
        },
        {
          id: "c4-hari-minggu",
          iconSrc: "/assets/chapters/ch4/ch4_7hari.webp",
          iconAlt: { ms: "Tujuh hari", en: "Seven days", es: "Siete días" },
          name: { ms: "7 hari = 1 minggu", en: "7 days = 1 week", es: "7 días = 1 semana" },
          description: { ms: "Tujuh hari membentuk satu minggu.", en: "Seven days make one week.", es: "Siete días forman una semana." },
        },
        { id: "c4-day-isnin", iconSrc: "/assets/chapters/ch4/ch4_7hari.webp", iconAlt: { ms: "Isnin", en: "Monday", es: "Lunes" }, name: { ms: "Isnin", en: "Monday", es: "Lunes" }, description: { ms: "Isnin", en: "Monday", es: "Lunes" } },
        { id: "c4-day-selasa", iconSrc: "/assets/chapters/ch4/ch4_7hari.webp", iconAlt: { ms: "Selasa", en: "Tuesday", es: "Martes" }, name: { ms: "Selasa", en: "Tuesday", es: "Martes" }, description: { ms: "Selasa", en: "Tuesday", es: "Martes" } },
        { id: "c4-day-rabu", iconSrc: "/assets/chapters/ch4/ch4_7hari.webp", iconAlt: { ms: "Rabu", en: "Wednesday", es: "Miércoles" }, name: { ms: "Rabu", en: "Wednesday", es: "Miércoles" }, description: { ms: "Rabu", en: "Wednesday", es: "Miércoles" } },
        { id: "c4-day-khamis", iconSrc: "/assets/chapters/ch4/ch4_7hari.webp", iconAlt: { ms: "Khamis", en: "Thursday", es: "Jueves" }, name: { ms: "Khamis", en: "Thursday", es: "Jueves" }, description: { ms: "Khamis", en: "Thursday", es: "Jueves" } },
        { id: "c4-day-jumaat", iconSrc: "/assets/chapters/ch4/ch4_7hari.webp", iconAlt: { ms: "Jumaat", en: "Friday", es: "Viernes" }, name: { ms: "Jumaat", en: "Friday", es: "Viernes" }, description: { ms: "Jumaat", en: "Friday", es: "Viernes" } },
        { id: "c4-day-sabtu", iconSrc: "/assets/chapters/ch4/ch4_7hari.webp", iconAlt: { ms: "Sabtu", en: "Saturday", es: "Sábado" }, name: { ms: "Sabtu", en: "Saturday", es: "Sábado" }, description: { ms: "Sabtu", en: "Saturday", es: "Sábado" } },
        { id: "c4-day-ahad", iconSrc: "/assets/chapters/ch4/ch4_7hari.webp", iconAlt: { ms: "Ahad", en: "Sunday", es: "Domingo" }, name: { ms: "Ahad", en: "Sunday", es: "Domingo" }, description: { ms: "Ahad", en: "Sunday", es: "Domingo" } },
      ],
    },
    {
      id: "c4-p2-waktu-harian",
      kind: "table",
      title: { ms: "Waktu dalam Sehari", en: "Times of Day", es: "Momentos del Día" },
      columns: [
        { key: "gambar", label: { ms: "Gambar", en: "Image", es: "Imagen" } },
        { key: "waktu", label: { ms: "Waktu", en: "Time of day", es: "Momento del día" } },
      ],
      rows: [
        { id: "c4-time-pagi", cells: { gambar: [{ kind: "image", src: pagi, alt: { ms: "pagi", en: "morning", es: "mañana" }, w: 360, h: 240, className: "h-full w-full object-contain" }], waktu: [{ ms: "pagi", en: "morning", es: "mañana" }, { ms: "1.00 pagi – 11.59 pagi", en: "1:00 a.m. – 11:59 a.m.", es: "1:00 a. m. – 11:59 a. m." }] } },
        { id: "c4-time-tengah-hari", cells: { gambar: [{ kind: "image", src: tengahHari, alt: { ms: "tengah hari", en: "midday", es: "mediodía" }, w: 360, h: 240, className: "h-full w-full object-contain" }], waktu: [{ ms: "tengah hari", en: "midday", es: "mediodía" }, { ms: "12.00 tengah hari – 1.59 tengah hari", en: "12:00 midday – 1:59 p.m.", es: "12:00 del mediodía – 1:59 p. m." }] } },
        { id: "c4-time-petang", cells: { gambar: [{ kind: "image", src: petang, alt: { ms: "petang", en: "evening", es: "tarde" }, w: 360, h: 240, className: "h-full w-full object-contain" }], waktu: [{ ms: "petang", en: "evening", es: "tarde" }, { ms: "2.00 petang – 6.59 petang", en: "2:00 p.m. – 6:59 p.m.", es: "2:00 p. m. – 6:59 p. m." }] } },
        { id: "c4-time-malam", cells: { gambar: [{ kind: "image", src: malam, alt: { ms: "malam", en: "night", es: "noche" }, w: 360, h: 240, className: "h-full w-full object-contain" }], waktu: [{ ms: "malam", en: "night", es: "noche" }, { ms: "7.00 malam – 11.59 malam", en: "7:00 p.m. – 11:59 p.m.", es: "7:00 p. m. – 11:59 p. m." }] } },
      ],
    },
    {
      id: "c4-p3-latihan-waktu",
      kind: "imageMatch",
      title: { ms: "Padankan Waktu", en: "Match the Time of Day", es: "Empareja el Momento del Día" },
      instructions: { ms: "Padankan setiap gambar dengan perkataan yang betul.", en: "Match each image to the correct word.", es: "Empareja cada imagen con la palabra correcta." },
      items: [
        { id: "petang", imageSrc: petang, imageAlt: { ms: "Gambar petang", en: "Evening image", es: "Imagen de la tarde" }, answer: { ms: "petang", en: "evening", es: "tarde" } },
        { id: "pagi", imageSrc: pagi, imageAlt: { ms: "Gambar pagi", en: "Morning image", es: "Imagen de la mañana" }, answer: { ms: "pagi", en: "morning", es: "mañana" } },
        { id: "malam", imageSrc: malam, imageAlt: { ms: "Gambar malam", en: "Night image", es: "Imagen de la noche" }, answer: { ms: "malam", en: "night", es: "noche" } },
        { id: "tengah-hari", imageSrc: tengahHari, imageAlt: { ms: "Gambar tengah hari", en: "Midday image", es: "Imagen del mediodía" }, answer: { ms: "tengah hari", en: "midday", es: "mediodía" } },
      ],
    },
    {
      id: "c4-p4-chat-masa",
      kind: "chat",
      youId: "me",
      title: { ms: "Situasi 4.1: Masa", en: "Situation 4.1: Time", es: "Situación 4.1: Tiempo" },
      participants: [
        { id: "me", name: { ms: "{currentUsername}", en: "{currentUsername}", es: "{currentUsername}" } },
        { id: "b", name: { ms: "Muthu", en: "Muthu", es: "Muthu" } },
      ],
      messages: [
        { id: "c4-time-chat-1", from: "me", text: { ms: "Muthu, pukul berapa sekarang?", en: "Muthu, what time is it now?", es: "Muthu, ¿qué hora es ahora?" } },
        { id: "c4-time-chat-2", from: "b", text: { ms: "Sekarang pukul lapan pagi.", en: "It is eight in the morning now.", es: "Ahora son las ocho de la mañana." } },
        { id: "c4-time-chat-3", from: "me", text: { ms: "Kita jumpa pukul sembilan?", en: "Shall we meet at nine?", es: "¿Nos vemos a las nueve?" } },
        { id: "c4-time-chat-4", from: "b", text: { ms: "Boleh. Jumpa pukul sembilan.", en: "Sure. See you at nine.", es: "Sí. Nos vemos a las nueve." } },
        { id: "c4-time-chat-5", from: "me", text: { ms: "Kita jumpa di mana?", en: "Where shall we meet?", es: "¿Dónde nos vemos?" } },
        { id: "c4-time-chat-6", from: "b", text: { ms: "Di sini saja.", en: "Just here.", es: "Aquí mismo." } },
        { id: "c4-time-chat-7", from: "me", text: { ms: "Baik, jumpa nanti.", en: "Okay, see you later.", es: "Bueno, nos vemos luego." } },
        { id: "c4-time-chat-8", from: "b", text: { ms: "Jumpa nanti.", en: "See you later.", es: "Nos vemos luego." } },
      ],
    },
    {
      id: "c4-p5-masa-dalam-ayat",
      kind: "table",
      title: { ms: "Masa dalam Ayat", en: "Time in Sentences", es: "El Tiempo en Oraciones" },
      leadCard: {
        heading: { ms: "Nota ringkas: sampai", en: "Quick note: sampai", es: "Nota breve: sampai" },
        body: { ms: "Dengan masa: hingga. Dengan pergerakan atau arah: tiba / mencapai.", en: "With time: until. With movement or directions: arrive / reach.", es: "Con tiempo: hasta. Con movimiento o direcciones: llegar / alcanzar." },
      },
      columns: [
        { key: "fokus", label: { ms: "Kata fokus", en: "Focus word", es: "Palabra clave" } },
        { key: "contoh", label: { ms: "Contoh ayat", en: "Example sentences", es: "Oraciones de ejemplo" } },
      ],
      rows: [
        { id: "c4-sampai", cells: { fokus: [{ kind: "image", src: "/assets/chapters/ch4/ch4_direction.webp", alt: { ms: "Ikon sampai", en: "Reach icon", es: "Icono de llegar" }, w: 96, h: 96, className: "h-16 w-16 object-contain" }, { ms: "sampai", en: "until / arrive", es: "hasta / llegar" }], contoh: [
          { ms: "Saya belajar sampai petang.", en: "I study until the evening.", es: "Estudio hasta la tarde.", highlight: { ms: "sampai petang", en: "until the evening", es: "hasta la tarde" } },
          { ms: "Kedai ini buka sampai pukul 10.00 malam.", en: "This shop is open until 10:00 at night.", es: "Esta tienda abre hasta las 10:00 de la noche.", highlight: { ms: "sampai pukul 10.00 malam", en: "until 10:00 at night", es: "hasta las 10:00 de la noche" } },
          { ms: "Kami tunggu sampai tengah hari.", en: "We wait until midday.", es: "Esperamos hasta el mediodía.", highlight: { ms: "sampai tengah hari", en: "until midday", es: "hasta el mediodía" } },
        ] } },
        { id: "c4-dari", cells: { fokus: [{ kind: "image", src: "/assets/chapters/ch4/ch4_year.webp", alt: { ms: "Ikon dari", en: "From icon", es: "Icono de desde" }, w: 96, h: 96, className: "h-16 w-16 object-contain" }, { ms: "dari", en: "from / since", es: "de / desde" }], contoh: [
          { ms: "Dari pagi saya di sini.", en: "I have been here since morning.", es: "Estoy aquí desde la mañana.", highlight: { ms: "Dari pagi", en: "since morning", es: "desde la mañana" } },
          { ms: "Dia bekerja dari pukul 8.00 pagi.", en: "They work from 8:00 in the morning.", es: "Trabaja desde las 8:00 de la mañana.", highlight: { ms: "dari pukul 8.00 pagi", en: "from 8:00 in the morning", es: "desde las 8:00 de la mañana" } },
          { ms: "Kami berjalan dari petang sampai malam.", en: "We walk from the evening until night.", es: "Caminamos desde la tarde hasta la noche.", highlight: { ms: "dari petang sampai malam", en: "from the evening until night", es: "desde la tarde hasta la noche" } },
        ] } },
        { id: "c4-pada", cells: { fokus: [{ kind: "image", src: "/assets/chapters/ch4/ch4_hour.webp", alt: { ms: "Ikon pada", en: "At-time icon", es: "Icono de hora" }, w: 96, h: 96, className: "h-16 w-16 object-contain" }, { ms: "pada", en: "at", es: "a / en" }], contoh: [
          { ms: "Saya pergi ke sekolah pada pukul 7.00 pagi.", en: "I go to school at 7:00 in the morning.", es: "Voy a la escuela a las 7:00 de la mañana.", highlight: { ms: "pada pukul 7.00 pagi", en: "at 7:00 in the morning", es: "a las 7:00 de la mañana" } },
          { ms: "Kami makan pada waktu tengah hari.", en: "We eat at midday.", es: "Comemos al mediodía.", highlight: { ms: "pada waktu tengah hari", en: "at midday", es: "al mediodía" } },
          { ms: "Kelas bermula pada pukul 8.30 pagi.", en: "Class starts at 8:30 in the morning.", es: "La clase empieza a las 8:30 de la mañana.", highlight: { ms: "pada pukul 8.30 pagi", en: "at 8:30 in the morning", es: "a las 8:30 de la mañana" } },
        ] } },
      ],
    },
    {
      id: "c4-p6-kata-arah",
      kind: "table",
      title: { ms: "Kata Arah Mudah", en: "Simple Direction Words", es: "Palabras Sencillas de Dirección" },
      columns: [
        { key: "gambar", label: { ms: "Gambar", en: "Image", es: "Imagen" } },
        { key: "kata", label: { ms: "Kata", en: "Word", es: "Palabra" } },
      ],
      rows: [
        { id: "c4-kiri", cells: { gambar: [{ kind: "image", src: "/assets/chapters/ch4/kiri.webp", alt: { ms: "kiri", en: "left", es: "izquierda" }, w: 320, h: 200, className: "w-full h-auto max-h-44 object-cover rounded-xl" }], kata: [{ ms: "kiri", en: "left", es: "izquierda" }] } },
        { id: "c4-kanan", cells: { gambar: [{ kind: "image", src: "/assets/chapters/ch4/kanan.webp", alt: { ms: "kanan", en: "right", es: "derecha" }, w: 320, h: 200, className: "w-full h-auto max-h-44 object-cover rounded-xl" }], kata: [{ ms: "kanan", en: "right", es: "derecha" }] } },
        { id: "c4-sini", cells: { gambar: [{ kind: "image", src: "/assets/chapters/ch4/sini.webp", alt: { ms: "sini", en: "here", es: "aquí" }, w: 320, h: 200, className: "w-full h-auto max-h-44 object-cover rounded-xl" }], kata: [{ ms: "sini", en: "here", es: "aquí" }] } },
        { id: "c4-sana", cells: { gambar: [{ kind: "image", src: "/assets/chapters/ch4/sana.webp", alt: { ms: "sana", en: "there", es: "allá" }, w: 320, h: 200, className: "w-full h-auto max-h-44 object-cover rounded-xl" }], kata: [{ ms: "sana", en: "there", es: "allá" }] } },
        { id: "c4-terus", cells: { gambar: [{ ms: "→", en: "→", es: "→" }], kata: [{ ms: "terus", en: "straight", es: "recto" }] } },
      ],
    },
    {
      id: "c4-p8-chat-arah",
      kind: "chat",
      youId: "me",
      title: { ms: "Situasi 4.2: Tanya Arah", en: "Situation 4.2: Asking Directions", es: "Situación 4.2: Pedir Direcciones" },
      participants: [
        { id: "me", name: { ms: "{currentUsername}", en: "{currentUsername}", es: "{currentUsername}" } },
        { id: "b", name: { ms: "Muthu", en: "Muthu", es: "Muthu" } },
      ],
      messages: [
        { id: "c4-dir-chat-1", from: "me", text: { ms: "Maaf, tandas di mana?", en: "Excuse me, where is the toilet?", es: "Disculpa, ¿dónde está el baño?" } },
        { id: "c4-dir-chat-2", from: "b", text: { ms: "Tandas di sana.", en: "The toilet is over there.", es: "El baño está allá." } },
        { id: "c4-dir-chat-3", from: "me", text: { ms: "Saya jalan terus?", en: "Do I go straight?", es: "¿Sigo recto?" } },
        { id: "c4-dir-chat-4", from: "b", text: { ms: "Ya, jalan terus.", en: "Yes, go straight.", es: "Sí, sigue recto." } },
        { id: "c4-dir-chat-5", from: "me", text: { ms: "Lepas itu?", en: "After that?", es: "¿Después de eso?" } },
        { id: "c4-dir-chat-6", from: "b", text: { ms: "Belok kiri.", en: "Turn left.", es: "Gira a la izquierda." } },
        { id: "c4-dir-chat-7", from: "me", text: { ms: "Oh, di sana?", en: "Oh, over there?", es: "Ah, ¿allá?" } },
        { id: "c4-dir-chat-8", from: "b", text: { ms: "Ya, di sana.", en: "Yes, over there.", es: "Sí, allá." } },
      ],
    },
    {
      id: "c4-p9-arah-jalan-practice",
      kind: "arahJalanPractice",
      title: { ms: "Arah Jalan: Mod Mudah", en: "Arah Jalan: Easy Mode", es: "Arah Jalan: Modo Fácil" },
      instructions: { ms: "Bina satu laluan dari Mula ke Destinasi. Tamatkan arahan dengan Sampai.", en: "Build one route from Start to Destination. Finish with Sampai.", es: "Crea una ruta de Inicio a Destino. Termina con Sampai." },
    },
    {
      id: "c4-p11-wordsearch",
      kind: "wordsearch",
      title: { ms: "Cari Kata: Masa & Arah", en: "Word Search: Time & Routes", es: "Sopa de Letras: Tiempo y Rutas" },
      instructions: { ms: "Cari perkataan yang sudah dipelajari.", en: "Find the words you learned.", es: "Encuentra las palabras que aprendiste." },
      autoGenerate: true,
      size: 12,
      allowDiagonal: true,
      allowReverse: true,
      targets: [
        { id: "ws-masa", word: "MASA", label: { ms: "Masa", en: "Time", es: "Tiempo" } },
        { id: "ws-jam", word: "JAM", label: { ms: "Jam", en: "Hour", es: "Hora" } },
        { id: "ws-minit", word: "MINIT", label: { ms: "Minit", en: "Minute", es: "Minuto" } },
        { id: "ws-pagi", word: "PAGI", label: { ms: "Pagi", en: "Morning", es: "Mañana" } },
        { id: "ws-petang", word: "PETANG", label: { ms: "Petang", en: "Evening", es: "Tarde" } },
        { id: "ws-malam", word: "MALAM", label: { ms: "Malam", en: "Night", es: "Noche" } },
        { id: "ws-kiri", word: "KIRI", label: { ms: "Kiri", en: "Left", es: "Izquierda" } },
        { id: "ws-kanan", word: "KANAN", label: { ms: "Kanan", en: "Right", es: "Derecha" } },
        { id: "ws-terus", word: "TERUS", label: { ms: "Terus", en: "Straight", es: "Recto" } },
        { id: "ws-sampai", word: "SAMPAI", label: { ms: "Sampai", en: "Arrive", es: "Llegar" } },
        { id: "ws-belok", word: "BELOK", label: { ms: "Belok", en: "Turn", es: "Girar" } },
        { id: "ws-balik", word: "BALIK", label: { ms: "Balik", en: "Back", es: "Vuelta" } },
      ],
    },
  ],
};
