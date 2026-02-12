import type { ChapterContent } from "./types";

export const chapter05: ChapterContent = {
  id: 5,
  title: { ms: "Nombor, Angka & Alamat", en: "Numbers & Addresses", es: "Números y Direcciones" },
  pages: [

    // Currency (coins & notes)
    {
      id: "c5-p2-mata-wang",
      kind: "table",
      title: { ms: "Mata Wang Malaysia (RM)", en: "Malaysian Currency (RM)", es: "Moneda de Malasia (RM)" },
      columns: [
        { key: "img", label: { ms: "Gambar", en: "Image", es: "Imagen" } },
        { key: "nilai", label: { ms: "Nilai", en: "Value", es: "Valor" } },
      ],
      rows: [
        {
          id: "c5-coin-5sen",
          cells: {
            img: [
              { kind: "image", src: "/assets/chapters/ch5/Malaysian_Money_5_Sen.jpg", alt: { ms: "5 sen", en: "5 sen coin", es: "moneda de 5 sen" }, w: 520, h: 300, className: "w-full h-auto max-h-44 object-contain" },
            ],
            nilai: [{ ms: "lima sen (5 ¢)", en: "five sen (5 ¢)", es: "cinco sen (5 ¢)" }],
          },
        },
        {
          id: "c5-coin-10sen",
          cells: {
            img: [
              { kind: "image", src: "/assets/chapters/ch5/Malaysian_Money_10_Sen.jpg", alt: { ms: "10 sen", en: "10 sen coin", es: "moneda de 10 sen" }, w: 520, h: 300, className: "w-full h-auto max-h-44 object-contain" },
            ],
            nilai: [{ ms: "sepuluh sen (10 ¢)", en: "ten sen (10 ¢)", es: "diez sen (10 ¢)" }],
          },
        },
        {
          id: "c5-coin-20sen",
          cells: {
            img: [
              { kind: "image", src: "/assets/chapters/ch5/Malaysian_Money_20_Sen.jpg", alt: { ms: "20 sen", en: "20 sen coin", es: "moneda de 20 sen" }, w: 520, h: 300, className: "w-full h-auto max-h-44 object-contain" },
            ],
            nilai: [{ ms: "dua puluh sen (20 ¢)", en: "twenty sen (20 ¢)", es: "veinte sen (20 ¢)" }],
          },
        },
        {
          id: "c5-coin-50sen",
          cells: {
            img: [
              { kind: "image", src: "/assets/chapters/ch5/Malaysian_Money_50_Sen.jpg", alt: { ms: "50 sen", en: "50 sen coin", es: "moneda de 50 sen" }, w: 520, h: 300, className: "w-full h-auto max-h-44 object-contain" },
            ],
            nilai: [{ ms: "lima puluh sen (50 ¢)", en: "fifty sen (50 ¢)", es: "cincuenta sen (50 ¢)" }],
          },
        },
        {
          id: "c5-note-1rm",
          cells: {
            img: [
              { kind: "image", src: "/assets/chapters/ch5/Malaysian_Money_1_Ringgit.jpg", alt: { ms: "1 ringgit", en: "1 ringgit note", es: "billete de 1 ringgit" }, w: 520, h: 300, className: "w-full h-auto max-h-44 object-contain" },
            ],
            nilai: [{ ms: "satu ringgit (RM1)", en: "one ringgit (RM1)", es: "un ringgit (RM1)" }],
          },
        },
        {
          id: "c5-note-5rm",
          cells: {
            img: [
              { kind: "image", src: "/assets/chapters/ch5/Malaysian_Money_5_Ringgit.jpg", alt: { ms: "5 ringgit", en: "5 ringgit note", es: "billete de 5 ringgit" }, w: 520, h: 300, className: "w-full h-auto max-h-44 object-contain" },
            ],
            nilai: [{ ms: "lima ringgit (RM5)", en: "five ringgit (RM5)", es: "cinco ringgit (RM5)" }],
          },
        },
        {
          id: "c5-note-10rm",
          cells: {
            img: [
              { kind: "image", src: "/assets/chapters/ch5/Malaysian_Money_10_ringgit.jpg", alt: { ms: "10 ringgit", en: "10 ringgit note", es: "billete de 10 ringgit" }, w: 520, h: 300, className: "w-full h-auto max-h-44 object-contain" },
            ],
            nilai: [{ ms: "sepuluh ringgit (RM10)", en: "ten ringgit (RM10)", es: "diez ringgit (RM10)" }],
          },
        },
        {
          id: "c5-note-20rm",
          cells: {
            img: [
              { kind: "image", src: "/assets/chapters/ch5/Malaysian_Money_20_Ringgit.jpg", alt: { ms: "20 ringgit", en: "20 ringgit note", es: "billete de 20 ringgit" }, w: 520, h: 300, className: "w-full h-auto max-h-44 object-contain" },
            ],
            nilai: [{ ms: "dua puluh ringgit (RM20)", en: "twenty ringgit (RM20)", es: "veinte ringgit (RM20)" }],
          },
        },
        {
          id: "c5-note-50rm",
          cells: {
            img: [
              { kind: "image", src: "/assets/chapters/ch5/Malaysian_Money_50_Ringgit.jpg", alt: { ms: "50 ringgit", en: "50 ringgit note", es: "billete de 50 ringgit" }, w: 520, h: 300, className: "w-full h-auto max-h-44 object-contain" },
            ],
            nilai: [{ ms: "lima puluh ringgit (RM50)", en: "fifty ringgit (RM50)", es: "cincuenta ringgit (RM50)" }],
          },
        },
        {
          id: "c5-note-100rm",
          cells: {
            img: [
              { kind: "image", src: "/assets/chapters/ch5/Malaysian_Money_100_Ringgit.jpg", alt: { ms: "100 ringgit", en: "100 ringgit note", es: "billete de 100 ringgit" }, w: 520, h: 300, className: "w-full h-auto max-h-44 object-contain" },
            ],
            nilai: [{ ms: "seratus ringgit (RM100)", en: "one hundred ringgit (RM100)", es: "cien ringgit (RM100)" }],
          },
        },
      ],
    },

    // Price expressions
    {
      id: "c5-p4-harga",
      kind: "table",
      title: { ms: "Contoh Harga", en: "Price Examples", es: "Ejemplos de precios" },
      columns: [
        { key: "harga", label: { ms: "Harga", en: "Price", es: "Precio" } },
        { key: "sebutan", label: { ms: "Sebutan", en: "How to say", es: "Cómo decir" } },
      ],
      rows: [
        {
          id: "h1",
          cells: {
            harga: [{ ms: "RM5.20", en: "RM5.20", es: "RM5.20" }],
            sebutan: [{ ms: "Lima ringgit dua puluh sen", en: "Five ringgit twenty sen", es: "Cinco ringgit con veinte sen" }],
          },
        },
        {
          id: "h2",
          cells: {
            harga: [{ ms: "RM12.00", en: "RM12.00", es: "RM12.00" }],
            sebutan: [{ ms: "Dua belas ringgit", en: "Twelve ringgit", es: "Doce ringgit" }],
          },
        },
        {
          id: "h3",
          cells: {
            harga: [{ ms: "RM24.50", en: "RM24.50", es: "RM24.50" }],
            sebutan: [{ ms: "Dua puluh empat ringgit lima puluh sen", en: "Twenty-four ringgit fifty sen", es: "Veinticuatro ringgit con cincuenta sen" }],
          },
        },
      ],
    },

    // Address components
    {
      id: "c5-p5-alamat",
      kind: "table",
      title: { ms: "Alamat", en: "Address", es: "Dirección" },
      columns: [
        { key: "jenis", label: { ms: "Jenis", en: "Type", es: "Tipo" } },
        { key: "img", label: { ms: "Gambar", en: "Image", es: "Imagen" } },
        { key: "contoh", label: { ms: "Contoh alamat", en: "Example address", es: "Ejemplo" } },
      ],
      rows: [
        {
          id: "addr-rumah",
          cells: {
            jenis: [{ ms: "Rumah", en: "House", es: "Casa" }],
            img: [
              {
                kind: "image",
                src: "/assets/chapters/ch5/Rumah.png",
                alt: { ms: "rumah", en: "house", es: "casa" },
                w: 520,
                h: 320,
                className: "w-full h-auto max-h-64 object-contain rounded-xl",
              },
            ],
            contoh: [{ ms: "Lot 153", en: "Lot 153", es: "Lote 153" }],
          },
        },
        {
          id: "addr-blok",
          cells: {
            jenis: [{ ms: "Blok", en: "Block", es: "Bloque" }],
            img: [
              {
                kind: "image",
                src: "/assets/chapters/ch5/Blok.png",
                alt: { ms: "blok", en: "block", es: "bloque" },
                w: 520,
                h: 320,
                className: "w-full h-auto max-h-64 object-contain rounded-xl",
              },
            ],
            contoh: [{ ms: "Blok B", en: "Block B", es: "Bloque B" }],
          },
        },
        {
          id: "addr-jalan",
          cells: {
            jenis: [{ ms: "Jalan", en: "Street", es: "Calle" }],
            img: [
              {
                kind: "image",
                src: "/assets/chapters/ch5/Jalan.png",
                alt: { ms: "jalan", en: "street", es: "calle" },
                w: 520,
                h: 320,
                className: "w-full h-auto max-h-64 object-contain rounded-xl",
              },
            ],
            contoh: [{ ms: "Jalan 8/30A", en: "Jalan 8/30A", es: "Jalan 8/30A" }],
          },
        },
        {
          id: "addr-pangsapuri",
          cells: {
            jenis: [{ ms: "Jenis rumah/taman", en: "Housing type", es: "Tipo de vivienda" }],
            img: [
              {
                kind: "image",
                src: "/assets/chapters/ch5/Pangsapuri.png",
                alt: { ms: "pangsapuri", en: "apartment", es: "apartamento" },
                w: 520,
                h: 320,
                className: "w-full h-auto max-h-64 object-contain rounded-xl",
              },
            ],
            contoh: [{ ms: "Pangsapuri Anggun", en: "Pangsapuri Anggun", es: "Pangsapuri Anggun" }],
          },
        },
        {
          id: "addr-daerah",
          cells: {
            jenis: [{ ms: "Kawasan/daerah", en: "Area/district", es: "Zona/distrito" }],
            img: [
              {
                kind: "image",
                src: "/assets/chapters/ch5/Daerah.png",
                alt: { ms: "daerah", en: "district", es: "distrito" },
                w: 520,
                h: 320,
                className: "w-full h-auto max-h-64 object-contain rounded-xl",
              },
            ],
            contoh: [{ ms: "Lahad Datu", en: "Lahad Datu", es: "Lahad Datu" }],
          },
        },
        {
          id: "addr-poskod",
          cells: {
            jenis: [{ ms: "Poskod", en: "Postcode", es: "Código postal" }],
            img: [
              {
                kind: "image",
                src: "/assets/chapters/ch5/Poskod.png",
                alt: { ms: "poskod", en: "postcode", es: "código postal" },
                w: 520,
                h: 320,
                className: "w-full h-auto max-h-64 object-contain rounded-xl",
              },
            ],
            contoh: [{ ms: "50470", en: "50470", es: "50470" }],
          },
        },
        {
          id: "addr-negeri",
          cells: {
            jenis: [{ ms: "Negeri", en: "State", es: "Estado" }],
            img: [
              {
                kind: "image",
                src: "/assets/chapters/ch5/Negeri.png",
                alt: { ms: "negeri", en: "state", es: "estado" },
                w: 520,
                h: 320,
                className: "w-full h-auto max-h-64 object-contain rounded-xl",
              },
            ],
            contoh: [{ ms: "Perak", en: "Perak", es: "Perak" }],
          },
        },
      ],
    },

    // Chat: Bank account opening
    {
      id: "c5-p6-chat-bank",
      kind: "chat",
      youId: "pelanggan",
      title: {
        ms: "Situasi 5.1 Maklumat Diri (Buka Akaun Simpanan)",
        en: "Situation 5.1 Personal Info (Open a Savings Account)",
        es: "Situación 5.1 Datos personales (abrir cuenta de ahorro)",
      },
      context: {
        ms: "Latar tempat: Kaunter Perkhidmatan Pelanggan di bank.",
        en: "Setting: Customer service counter at the bank.",
        es: "Lugar: Mostrador de atención al cliente en el banco.",
      },
      participants: [
        {
          id: "pegawai",
          name: { ms: "Pegawai bank", en: "Bank officer", es: "Empleado del banco" },
          avatarSrc: "/assets/characters/Bandicoot_Profile.png",
        },
        { id: "pelanggan", name: { ms: "Pelanggan", en: "Customer", es: "Cliente" } },
      ],
      messages: [
        {
          id: "c5-51-m1",
          from: "pegawai",
          text: {
            ms: "Selamat pagi, encik. Boleh saya bantu?",
            en: "Good morning, sir. How may I help?",
            es: "Buenos días, señor. ¿En qué puedo ayudarle?",
          },
        },
        {
          id: "c5-51-m2",
          from: "pelanggan",
          text: {
            ms: "Selamat pagi. Saya hendak membuka akaun simpanan.",
            en: "Good morning. I’d like to open a savings account.",
            es: "Buenos días. Quiero abrir una cuenta de ahorros.",
          },
        },
        {
          id: "c5-51-m3",
          from: "pegawai",
          text: {
            ms: "Baik. Boleh encik berikan kad pengenalan?",
            en: "Sure. May I have your identification card?",
            es: "Claro. ¿Puede darme su documento de identidad?",
          },
        },
        {
          id: "c5-51-m4",
          from: "pelanggan",
          text: {
            ms: "Boleh. Ini kad pengenalan saya.",
            en: "Sure. Here is my ID card.",
            es: "Claro. Aquí está mi documento.",
          },
        },
        {
          id: "c5-51-m5",
          from: "pegawai",
          text: {
            ms: "Nombor kad pengenalan encik 960420135431. Betul?",
            en: "Your ID number is 960420135431. Correct?",
            es: "Su número de identificación es 960420135431. ¿Correcto?",
          },
        },
        {
          id: "c5-51-m6",
          from: "pelanggan",
          text: {
            ms: "Ya, betul. Nombor kad pengenalan diri saya ialah 960420135431.",
            en: "Yes, correct. My ID number is 960420135431.",
            es: "Sí, correcto. Mi número de identificación es 960420135431.",
          },
        },
        {
          id: "c5-51-m7",
          from: "pegawai",
          text: {
            ms: "Boleh encik berikan alamat tempat tinggal encik di sini?",
            en: "May I have your local address?",
            es: "¿Podría darme su dirección aquí?",
          },
        },
        {
          id: "c5-51-m8",
          from: "pelanggan",
          text: {
            ms: "Boleh. C512, Pangsapuri Harmoni, 43500 Semenyih, Selangor.",
            en: "Sure. C512, Pangsapuri Harmoni, 43500 Semenyih, Selangor.",
            es: "Claro. C512, Pangsapuri Harmoni, 43500 Semenyih, Selangor.",
          },
        },
        {
          id: "c5-51-m9",
          from: "pegawai",
          text: {
            ms: "Boleh berikan saya nombor telefon encik?",
            en: "May I have your phone number?",
            es: "¿Me da su número de teléfono?",
          },
        },
        {
          id: "c5-51-m10",
          from: "pelanggan",
          text: {
            ms: "Boleh. 012-1234567.",
            en: "Sure. 012-1234567.",
            es: "Claro. 012-1234567.",
          },
        },
        {
          id: "c5-51-m11",
          from: "pegawai",
          text: {
            ms: "Sebentar ya. Baik, akaun simpanan encik telah aktif.",
            en: "One moment. Alright, your savings account is now active.",
            es: "Un momento. Bien, su cuenta de ahorros está activa.",
          },
        },
        {
          id: "c5-51-m12",
          from: "pelanggan",
          text: {
            ms: "Terima kasih.",
            en: "Thank you.",
            es: "Gracias.",
          },
        },
        {
          id: "c5-51-m13",
          from: "pegawai",
          text: {
            ms: "Sama-sama.",
            en: "You're welcome.",
            es: "De nada.",
          },
        },
      ],
    },

    // Chat: Shopping
    {
      id: "c5-p7-chat-beli",
      kind: "chat",
      youId: "pelanggan",
      title: {
        ms: "Situasi 5.2 Membeli-belah",
        en: "Situation 5.2 Shopping",
        es: "Situación 5.2 De compras",
      },
      context: {
        ms: "Latar tempat: Sebuah kedai menjual pakaian.",
        en: "Setting: A clothing shop.",
        es: "Lugar: Una tienda de ropa.",
      },
      participants: [
        { id: "jurujual", name: { ms: "Jurujual", en: "Salesperson", es: "Vendedor" }, avatarSrc: "/assets/characters/Bandicoot_Profile.png" },
        { id: "pelanggan", name: { ms: "Pelanggan", en: "Customer", es: "Cliente" } },
      ],
      messages: [
        { id: "c5-52-m1", from: "jurujual", text: { ms: "Ya, abang. Cari apa?", en: "Hi, what are you looking for?", es: "Hola, ¿qué busca?" } },
        { id: "c5-52-m2", from: "pelanggan", text: { ms: "Berapakah harga baju ini?", en: "How much is this shirt?", es: "¿Cuánto cuesta esta camisa?" } },
        { id: "c5-52-m3", from: "jurujual", text: { ms: "Oo, baju ini berharga RM40 sahaja.", en: "This one is RM40.", es: "Esta cuesta RM40." } },
        { id: "c5-52-m4", from: "pelanggan", text: { ms: "Boleh kurang?", en: "Can you lower it?", es: "¿Puede rebajarla?" } },
        { id: "c5-52-m5", from: "jurujual", text: { ms: "Maaflah abang, harganya tetap sebab kainnya berkualiti.", en: "Sorry, the price is firm because the fabric is good quality.", es: "Lo siento, el precio es fijo porque la tela es de buena calidad." } },
        { id: "c5-52-m6", from: "pelanggan", text: { ms: "Ada yang lebih murah?", en: "Do you have anything cheaper?", es: "¿Tiene algo más barato?" } },
        { id: "c5-52-m7", from: "jurujual", text: { ms: "Ada. Baju ini berharga RM28.90 tetapi kainnya agak nipis. Kalau abang hendak, saya boleh bagi harga RM25.", en: "Yes. This shirt is RM28.90 but the fabric is thinner. If you like, I can give it for RM25.", es: "Sí. Esta camisa vale RM28.90 pero la tela es algo fina. Si quiere, se la dejo en RM25." } },
        { id: "c5-52-m8", from: "pelanggan", text: { ms: "Baiklah, saya pilih baju ini. Berikan saya lima pasang dengan saiz M.", en: "Alright, I’ll take this one. Give me five pieces in size M.", es: "De acuerdo, me llevo esta. Deme cinco unidades talla M." } },
        { id: "c5-52-m9", from: "jurujual", text: { ms: "Semuanya RM125.", en: "That’s RM125 in total.", es: "Son RM125 en total." } },
        { id: "c5-52-m10", from: "pelanggan", text: { ms: "Ini wangnya.", en: "Here’s the cash.", es: "Aquí tiene el dinero." } },
        { id: "c5-52-m11", from: "jurujual", text: { ms: "Baik, terima kasih.", en: "Alright, thank you.", es: "Muy bien, gracias." } },
        { id: "c5-52-m12", from: "pelanggan", text: { ms: "Sama-sama.", en: "You’re welcome.", es: "De nada." } },
      ],
    },

    // ------------------------------------------------------------
    // Page 8: Type-in — Kenal pasti nilai mata wang
    // ------------------------------------------------------------
    {
      id: "c5-p8-typein-wang",
      kind: "typein",
      title: {
        ms: "Latihan: Nyatakan nilai wang",
        en: "Exercise: State the currency value",
        es: "Ejercicio: Indica el valor de la moneda",
      },
      instructions: {
        ms: "Taipkan nilai wang (dalam BM) bagi setiap gambar. Contoh: \"lima sen\" atau \"sepuluh ringgit\".",
        en: "Type the value in Malay for each image (e.g., “lima sen”, “sepuluh ringgit”).",
        es: "Escribe el valor en malayo para cada imagen (p. ej., “lima sen”, “sepuluh ringgit”).",
      },
      items: [
        {
          id: "c5-ti-5sen",
          n: 1,
          scrambled: "",
          image: { src: "/assets/chapters/ch5/Malaysian_Money_5_Sen.jpg", alt: "5 sen", w: 520, h: 320, className: "w-full h-auto max-h-44 object-contain" },
          answer: "lima sen",
          meaning: { ms: "5 sen", en: "5 sen", es: "5 sen" },
        },
        {
          id: "c5-ti-10sen",
          n: 2,
          scrambled: "",
          image: { src: "/assets/chapters/ch5/Malaysian_Money_10_Sen.jpg", alt: "10 sen", w: 520, h: 320, className: "w-full h-auto max-h-44 object-contain" },
          answer: "sepuluh sen",
          meaning: { ms: "10 sen", en: "10 sen", es: "10 sen" },
        },
        {
          id: "c5-ti-20sen",
          n: 3,
          scrambled: "",
          image: { src: "/assets/chapters/ch5/Malaysian_Money_20_Sen.jpg", alt: "20 sen", w: 520, h: 320, className: "w-full h-auto max-h-44 object-contain" },
          answer: "dua puluh sen",
          meaning: { ms: "20 sen", en: "20 sen", es: "20 sen" },
        },
        {
          id: "c5-ti-50sen",
          n: 4,
          scrambled: "",
          image: { src: "/assets/chapters/ch5/Malaysian_Money_50_Sen.jpg", alt: "50 sen", w: 520, h: 320, className: "w-full h-auto max-h-44 object-contain" },
          answer: "lima puluh sen",
          meaning: { ms: "50 sen", en: "50 sen", es: "50 sen" },
        },
        {
          id: "c5-ti-1rm",
          n: 5,
          scrambled: "",
          image: { src: "/assets/chapters/ch5/Malaysian_Money_1_Ringgit.jpg", alt: "1 ringgit", w: 520, h: 320, className: "w-full h-auto max-h-44 object-contain" },
          answer: "satu ringgit",
          meaning: { ms: "RM1", en: "RM1", es: "RM1" },
        },
        {
          id: "c5-ti-5rm",
          n: 6,
          scrambled: "",
          image: { src: "/assets/chapters/ch5/Malaysian_Money_5_Ringgit.jpg", alt: "5 ringgit", w: 520, h: 320, className: "w-full h-auto max-h-44 object-contain" },
          answer: "lima ringgit",
          meaning: { ms: "RM5", en: "RM5", es: "RM5" },
        },
        {
          id: "c5-ti-10rm",
          n: 7,
          scrambled: "",
          image: { src: "/assets/chapters/ch5/Malaysian_Money_10_ringgit.jpg", alt: "10 ringgit", w: 520, h: 320, className: "w-full h-auto max-h-44 object-contain" },
          answer: "sepuluh ringgit",
          meaning: { ms: "RM10", en: "RM10", es: "RM10" },
        },
        {
          id: "c5-ti-20rm",
          n: 8,
          scrambled: "",
          image: { src: "/assets/chapters/ch5/Malaysian_Money_20_Ringgit.jpg", alt: "20 ringgit", w: 520, h: 320, className: "w-full h-auto max-h-44 object-contain" },
          answer: "dua puluh ringgit",
          meaning: { ms: "RM20", en: "RM20", es: "RM20" },
        },
        {
          id: "c5-ti-50rm",
          n: 9,
          scrambled: "",
          image: { src: "/assets/chapters/ch5/Malaysian_Money_50_Ringgit.jpg", alt: "50 ringgit", w: 520, h: 320, className: "w-full h-auto max-h-44 object-contain" },
          answer: "lima puluh ringgit",
          meaning: { ms: "RM50", en: "RM50", es: "RM50" },
        },
        {
          id: "c5-ti-100rm",
          n: 10,
          scrambled: "",
          image: { src: "/assets/chapters/ch5/Malaysian_Money_100_Ringgit.jpg", alt: "100 ringgit", w: 520, h: 320, className: "w-full h-auto max-h-44 object-contain" },
          answer: "seratus ringgit",
          meaning: { ms: "RM100", en: "RM100", es: "RM100" },
        },
      ],
    },

    // ------------------------------------------------------------
    // Page 9: Type-in — Kira jumlah wang
    // ------------------------------------------------------------
    {
      id: "c5-p9-typein-jumlah",
      kind: "typein",
      title: {
        ms: "Latihan: Kira jumlah wang",
        en: "Exercise: Calculate the total amount",
        es: "Ejercicio: Calcula el importe total",
      },
      instructions: {
        ms: 'Taip jumlah dalam RM (nombor sahaja, tanpa \"RM\"). Contoh: 5.20',
        en: 'Type the total in RM (numbers only, no “RM”). Example: 5.20',
        es: 'Escribe el total en RM (solo números, sin “RM”). Ejemplo: 5.20',
      },
      items: [
        {
          id: "c5-sum-1",
          n: 1,
          scrambled: "RM ______",
          images: [
            { src: "/assets/chapters/ch5/Malaysian_Money_Front_Only_5_Ringgit.webp", alt: "RM5", w: 320, h: 200 },
            { src: "/assets/chapters/ch5/Malaysian_Money_Front_Only_20_Sen.webp", alt: "20 sen", w: 160, h: 120 },
          ],
          answer: "5.20",
          meaning: { ms: "RM5 + 20 sen", en: "RM5 + 20 sen", es: "RM5 + 20 sen" },
        },
        {
          id: "c5-sum-2",
          n: 2,
          scrambled: "RM ______",
          images: [
            { src: "/assets/chapters/ch5/Malaysian_Money_Front_Only_20_Ringgit.webp", alt: "RM20", w: 320, h: 200 },
            { src: "/assets/chapters/ch5/Malaysian_Money_Front_Only_1_Ringgit.webp", alt: "RM1", w: 200, h: 140 },
            { src: "/assets/chapters/ch5/Malaysian_Money_Front_Only_1_Ringgit.webp", alt: "RM1", w: 200, h: 140 },
            { src: "/assets/chapters/ch5/Malaysian_Money_Front_Only_1_Ringgit.webp", alt: "RM1", w: 200, h: 140 },
            { src: "/assets/chapters/ch5/Malaysian_Money_Front_Only_1_Ringgit.webp", alt: "RM1", w: 200, h: 140 },
            { src: "/assets/chapters/ch5/Malaysian_Money_Front_Only_50_Sen.webp", alt: "50 sen", w: 160, h: 120 },
            { src: "/assets/chapters/ch5/Malaysian_Money_Front_Only_10_Sen.webp", alt: "10 sen", w: 160, h: 120 },
            { src: "/assets/chapters/ch5/Malaysian_Money_Front_Only_5_Sen.webp", alt: "5 sen", w: 160, h: 120 },
          ],
          answer: "24.65",
          meaning: { ms: "RM20 + 4 × RM1 + 50 sen + 10 sen + 5 sen", en: "20 + four 1s + 0.50 + 0.10 + 0.05", es: "20 + cuatro billetes de 1 + 0.50 + 0.10 + 0.05" },
        },
        {
          id: "c5-sum-3",
          n: 3,
          scrambled: "RM ______",
          images: [
            { src: "/assets/chapters/ch5/Malaysian_Money_Front_Only_100_Ringgit.webp", alt: "RM100", w: 360, h: 220 },
            { src: "/assets/chapters/ch5/Malaysian_Money_Front_Only_50_Ringgit.webp", alt: "RM50", w: 320, h: 200 },
            { src: "/assets/chapters/ch5/Malaysian_Money_Front_Only_20_Ringgit.webp", alt: "RM20", w: 300, h: 190 },
            { src: "/assets/chapters/ch5/Malaysian_Money_Front_Only_10_ringgit.webp", alt: "RM10", w: 280, h: 180 },
            { src: "/assets/chapters/ch5/Malaysian_Money_Front_Only_1_Ringgit.webp", alt: "RM1", w: 200, h: 140 },
            { src: "/assets/chapters/ch5/Malaysian_Money_Front_Only_1_Ringgit.webp", alt: "RM1", w: 200, h: 140 },
          ],
          answer: "182.00",
          meaning: { ms: "RM100 + RM50 + RM20 + RM10 + RM1 + RM1", en: "100 + 50 + 20 + 10 + 1 + 1", es: "100 + 50 + 20 + 10 + 1 + 1" },
        },
        {
          id: "c5-sum-4",
          n: 4,
          scrambled: "RM ______",
          images: [
            { src: "/assets/chapters/ch5/Malaysian_Money_Front_Only_100_Ringgit.webp", alt: "RM100", w: 360, h: 220 },
            { src: "/assets/chapters/ch5/Malaysian_Money_Front_Only_10_ringgit.webp", alt: "RM10", w: 280, h: 180 },
            { src: "/assets/chapters/ch5/Malaysian_Money_Front_Only_5_Ringgit.webp", alt: "RM5", w: 260, h: 170 },
            { src: "/assets/chapters/ch5/Malaysian_Money_Front_Only_1_Ringgit.webp", alt: "RM1", w: 200, h: 140 },
            { src: "/assets/chapters/ch5/Malaysian_Money_Front_Only_1_Ringgit.webp", alt: "RM1", w: 200, h: 140 },
            { src: "/assets/chapters/ch5/Malaysian_Money_Front_Only_1_Ringgit.webp", alt: "RM1", w: 200, h: 140 },
            { src: "/assets/chapters/ch5/Malaysian_Money_Front_Only_50_Sen.webp", alt: "50 sen", w: 160, h: 120 },
            { src: "/assets/chapters/ch5/Malaysian_Money_Front_Only_20_Sen.webp", alt: "20 sen", w: 160, h: 120 },
            { src: "/assets/chapters/ch5/Malaysian_Money_Front_Only_10_Sen.webp", alt: "10 sen", w: 160, h: 120 },
            { src: "/assets/chapters/ch5/Malaysian_Money_Front_Only_5_Sen.webp", alt: "5 sen", w: 160, h: 120 },
          ],
          answer: "118.85",
          meaning: { ms: "RM100 + RM10 + RM5 + 3 × RM1 + 50 + 20 + 10 + 5 sen", en: "100 + 10 + 5 + 3×1 + 0.50 + 0.20 + 0.10 + 0.05", es: "100 + 10 + 5 + 3×1 + 0.50 + 0.20 + 0.10 + 0.05" },
        },
      ],
    },
  ],
};
