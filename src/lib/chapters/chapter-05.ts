import type { ChapterContent } from "./types";

const coinImageClass = "w-full h-auto max-h-44 object-contain";
const noteImageClass = "w-full h-auto max-h-44 object-contain";
const totalImageClass = "w-full h-auto object-contain";

export const chapter05: ChapterContent = {
  id: 5,
  revision: 5,
  title: { ms: "Nombor, Angka & Alamat", en: "Numbers & Addresses", es: "Números y direcciones" },
  pages: [
    {
      id: "c5-p1-nombor",
      kind: "table",
      title: { ms: "Nombor untuk Wang", en: "Numbers for Money", es: "Números para el dinero" },
      leadCard: {
        heading: { ms: "Kenali nombor sebelum membaca harga.", en: "Learn the numbers before reading prices.", es: "Aprende los números antes de leer precios." },
        body: {
          ms: "Nombor di sebelah kanan digunakan untuk menyebut harga, ringgit dan sen dalam bab ini.",
          en: "The numbers on the right are used to say prices, ringgit, and sen in this chapter.",
          es: "Los números de la derecha se usan para decir precios, ringgit y sen en este capítulo.",
        },
      },
      columns: [
        { key: "asas", label: { ms: "Nombor asas", en: "Basic numbers", es: "Números básicos" } },
        { key: "harga", label: { ms: "Nombor untuk harga", en: "Numbers for prices", es: "Números para precios" } },
      ],
      rows: [
        { id: "c5-num-1-12", cells: { asas: [{ ms: "1 — satu", en: "1 — one", es: "1 — uno" }], harga: [{ ms: "12 — dua belas", en: "12 — twelve", es: "12 — doce" }] } },
        { id: "c5-num-2-15", cells: { asas: [{ ms: "2 — dua", en: "2 — two", es: "2 — dos" }], harga: [{ ms: "15 — lima belas", en: "15 — fifteen", es: "15 — quince" }] } },
        { id: "c5-num-3-20", cells: { asas: [{ ms: "3 — tiga", en: "3 — three", es: "3 — tres" }], harga: [{ ms: "20 — dua puluh", en: "20 — twenty", es: "20 — veinte" }] } },
        { id: "c5-num-4-24", cells: { asas: [{ ms: "4 — empat", en: "4 — four", es: "4 — cuatro" }], harga: [{ ms: "24 — dua puluh empat", en: "24 — twenty-four", es: "24 — veinticuatro" }] } },
        { id: "c5-num-5-27", cells: { asas: [{ ms: "5 — lima", en: "5 — five", es: "5 — cinco" }], harga: [{ ms: "27 — dua puluh tujuh", en: "27 — twenty-seven", es: "27 — veintisiete" }] } },
        { id: "c5-num-6-30", cells: { asas: [{ ms: "6 — enam", en: "6 — six", es: "6 — seis" }], harga: [{ ms: "30 — tiga puluh", en: "30 — thirty", es: "30 — treinta" }] } },
        { id: "c5-num-7-40", cells: { asas: [{ ms: "7 — tujuh", en: "7 — seven", es: "7 — siete" }], harga: [{ ms: "40 — empat puluh", en: "40 — forty", es: "40 — cuarenta" }] } },
        { id: "c5-num-8-50", cells: { asas: [{ ms: "8 — lapan", en: "8 — eight", es: "8 — ocho" }], harga: [{ ms: "50 — lima puluh", en: "50 — fifty", es: "50 — cincuenta" }] } },
        { id: "c5-num-9-80", cells: { asas: [{ ms: "9 — sembilan", en: "9 — nine", es: "9 — nueve" }], harga: [{ ms: "80 — lapan puluh", en: "80 — eighty", es: "80 — ochenta" }] } },
        { id: "c5-num-10-100", cells: { asas: [{ ms: "10 — sepuluh", en: "10 — ten", es: "10 — diez" }], harga: [{ ms: "100 — seratus", en: "100 — one hundred", es: "100 — cien" }] } },
      ],
    },
    {
      id: "c5-p2-syiling",
      kind: "table",
      title: { ms: "Syiling Malaysia", en: "Malaysian Coins", es: "Monedas de Malasia" },
      leadCard: {
        heading: { ms: "Syiling digunakan untuk jumlah kecil.", en: "Coins are used for small amounts.", es: "Las monedas se usan para cantidades pequeñas." },
        body: {
          ms: "Baca nombor dahulu, kemudian sebut nilai dengan perkataan sen.",
          en: "Read the number first, then say the value with the word sen.",
          es: "Lee primero el número y después di el valor con la palabra sen.",
        },
      },
      columns: [
        { key: "img", label: { ms: "Gambar", en: "Image", es: "Imagen" } },
        { key: "nilai", label: { ms: "Nilai", en: "Value", es: "Valor" } },
      ],
      rows: [
        {
          id: "c5-coin-5sen",
          cells: {
            img: [
              {
                kind: "image",
                src: "/assets/chapters/ch5/Malaysian_Money_5_Sen.jpg",
                alt: { ms: "5 sen", en: "5 sen coin", es: "moneda de 5 sen" },
                w: 520,
                h: 300,
                className: coinImageClass,
              },
            ],
            nilai: [{ ms: "lima sen (5 sen)", en: "five sen (5 sen)", es: "cinco sen (5 sen)" }],
          },
        },
        {
          id: "c5-coin-10sen",
          cells: {
            img: [
              {
                kind: "image",
                src: "/assets/chapters/ch5/Malaysian_Money_10_Sen.jpg",
                alt: { ms: "10 sen", en: "10 sen coin", es: "moneda de 10 sen" },
                w: 520,
                h: 300,
                className: coinImageClass,
              },
            ],
            nilai: [{ ms: "sepuluh sen (10 sen)", en: "ten sen (10 sen)", es: "diez sen (10 sen)" }],
          },
        },
        {
          id: "c5-coin-20sen",
          cells: {
            img: [
              {
                kind: "image",
                src: "/assets/chapters/ch5/Malaysian_Money_20_Sen.jpg",
                alt: { ms: "20 sen", en: "20 sen coin", es: "moneda de 20 sen" },
                w: 520,
                h: 300,
                className: coinImageClass,
              },
            ],
            nilai: [{ ms: "dua puluh sen (20 sen)", en: "twenty sen (20 sen)", es: "veinte sen (20 sen)" }],
          },
        },
        {
          id: "c5-coin-50sen",
          cells: {
            img: [
              {
                kind: "image",
                src: "/assets/chapters/ch5/Malaysian_Money_50_Sen.jpg",
                alt: { ms: "50 sen", en: "50 sen coin", es: "moneda de 50 sen" },
                w: 520,
                h: 300,
                className: coinImageClass,
              },
            ],
            nilai: [{ ms: "lima puluh sen (50 sen)", en: "fifty sen (50 sen)", es: "cincuenta sen (50 sen)" }],
          },
        },
      ],
    },

    {
      id: "c5-p3-not",
      kind: "table",
      title: { ms: "Wang Kertas Malaysia", en: "Malaysian Banknotes", es: "Billetes de Malasia" },
      leadCard: {
        heading: { ms: "Wang kertas digunakan untuk jumlah yang lebih besar.", en: "Banknotes are used for larger amounts.", es: "Los billetes se usan para cantidades mayores." },
        body: {
          ms: "Kenali warna dan nilai wang kertas untuk membeli dan membayar.",
          en: "Learn the colors and values of banknotes to buy and pay.",
          es: "Aprende los colores y valores de los billetes para comprar y pagar.",
        },
      },
      columns: [
        { key: "img", label: { ms: "Gambar", en: "Image", es: "Imagen" } },
        { key: "nilai", label: { ms: "Nilai", en: "Value", es: "Valor" } },
      ],
      rows: [
        {
          id: "c5-note-1rm",
          cells: {
            img: [
              {
                kind: "image",
                src: "/assets/chapters/ch5/Malaysian_Money_1_Ringgit.jpg",
                alt: { ms: "1 ringgit", en: "1 ringgit note", es: "billete de 1 ringgit" },
                w: 520,
                h: 300,
                className: noteImageClass,
              },
            ],
            nilai: [{ ms: "satu ringgit (RM1)", en: "one ringgit (RM1)", es: "un ringgit (RM1)" }],
          },
        },
        {
          id: "c5-note-5rm",
          cells: {
            img: [
              {
                kind: "image",
                src: "/assets/chapters/ch5/Malaysian_Money_5_Ringgit.jpg",
                alt: { ms: "5 ringgit", en: "5 ringgit note", es: "billete de 5 ringgit" },
                w: 520,
                h: 300,
                className: noteImageClass,
              },
            ],
            nilai: [{ ms: "lima ringgit (RM5)", en: "five ringgit (RM5)", es: "cinco ringgit (RM5)" }],
          },
        },
        {
          id: "c5-note-10rm",
          cells: {
            img: [
              {
                kind: "image",
                src: "/assets/chapters/ch5/Malaysian_Money_10_ringgit.jpg",
                alt: { ms: "10 ringgit", en: "10 ringgit note", es: "billete de 10 ringgit" },
                w: 520,
                h: 300,
                className: noteImageClass,
              },
            ],
            nilai: [{ ms: "sepuluh ringgit (RM10)", en: "ten ringgit (RM10)", es: "diez ringgit (RM10)" }],
          },
        },
        {
          id: "c5-note-20rm",
          cells: {
            img: [
              {
                kind: "image",
                src: "/assets/chapters/ch5/Malaysian_Money_20_Ringgit.jpg",
                alt: { ms: "20 ringgit", en: "20 ringgit note", es: "billete de 20 ringgit" },
                w: 520,
                h: 300,
                className: noteImageClass,
              },
            ],
            nilai: [{ ms: "dua puluh ringgit (RM20)", en: "twenty ringgit (RM20)", es: "veinte ringgit (RM20)" }],
          },
        },
        {
          id: "c5-note-50rm",
          cells: {
            img: [
              {
                kind: "image",
                src: "/assets/chapters/ch5/Malaysian_Money_50_Ringgit.jpg",
                alt: { ms: "50 ringgit", en: "50 ringgit note", es: "billete de 50 ringgit" },
                w: 520,
                h: 300,
                className: noteImageClass,
              },
            ],
            nilai: [{ ms: "lima puluh ringgit (RM50)", en: "fifty ringgit (RM50)", es: "cincuenta ringgit (RM50)" }],
          },
        },
        {
          id: "c5-note-100rm",
          cells: {
            img: [
              {
                kind: "image",
                src: "/assets/chapters/ch5/Malaysian_Money_100_Ringgit.jpg",
                alt: { ms: "100 ringgit", en: "100 ringgit note", es: "billete de 100 ringgit" },
                w: 520,
                h: 300,
                className: noteImageClass,
              },
            ],
            nilai: [{ ms: "seratus ringgit (RM100)", en: "one hundred ringgit (RM100)", es: "cien ringgit (RM100)" }],
          },
        },
      ],
    },

    {
      id: "c5-p4-harga",
      kind: "table",
      title: { ms: "Tanda Harga", en: "Price Tags", es: "Etiquetas de precio" },
      leadCard: {
        heading: { ms: "Pecahkan harga kepada ringgit dan sen", en: "Split a price into ringgit and sen", es: "Divide un precio entre ringgit y sen" },
        body: {
          ms: "Baca nombor sebelum titik sebagai ringgit dan nombor selepas titik sebagai sen. Jika harga berakhir dengan .00, sebut ringgit sahaja.",
          en: "Read the number before the decimal point as ringgit and the number after it as sen. If a price ends in .00, say only the ringgit amount.",
          es: "Lee el número antes del punto decimal como ringgit y el número después como sen. Si un precio termina en .00, di solo la cantidad en ringgit.",
        },
      },
      columns: [
        { key: "harga", label: { ms: "Harga", en: "Price", es: "Precio" } },
        { key: "sebutan", label: { ms: "Sebutan", en: "How to say it", es: "Cómo decirlo" } },
      ],
      rows: [
        {
          id: "h1",
          cells: {
            harga: [{ ms: "RM5.00", en: "RM5.00", es: "RM5.00" }],
            sebutan: [{ ms: "lima ringgit", en: "five ringgit", es: "cinco ringgit" }],
          },
        },
        {
          id: "h2",
          cells: {
            harga: [{ ms: "RM5.20", en: "RM5.20", es: "RM5.20" }],
            sebutan: [{ ms: "lima ringgit dua puluh sen", en: "five ringgit twenty sen", es: "cinco ringgit con veinte sen" }],
          },
        },
        {
          id: "h3",
          cells: {
            harga: [{ ms: "RM12.00", en: "RM12.00", es: "RM12.00" }],
            sebutan: [{ ms: "dua belas ringgit", en: "twelve ringgit", es: "doce ringgit" }],
          },
        },
        {
          id: "h4",
          cells: {
            harga: [{ ms: "RM24.50", en: "RM24.50", es: "RM24.50" }],
            sebutan: [{ ms: "dua puluh empat ringgit lima puluh sen", en: "twenty-four ringgit fifty sen", es: "veinticuatro ringgit con cincuenta sen" }],
          },
        },
      ],
    },

    {
      id: "c5-p5-latihan-harga",
      kind: "dragfill",
      title: { ms: "Latihan Harga", en: "Price Practice", es: "Práctica de precios" },
      instructions: {
        ms: "Baca ringgit dahulu, kemudian sen. Padankan setiap tanda harga dengan sebutan yang betul.",
        en: "Read the ringgit first, then the sen. Match each price tag with the correct spoken form.",
        es: "Lee primero los ringgit y después los sen. Empareja cada etiqueta de precio con la forma oral correcta.",
      },
      options: [
        {
          id: "harga-rm630",
          ms: "enam ringgit tiga puluh sen",
          en: "six ringgit thirty sen",
          es: "seis ringgit con treinta sen",
        },
        {
          id: "harga-rm1540",
          ms: "lima belas ringgit empat puluh sen",
          en: "fifteen ringgit forty sen",
          es: "quince ringgit con cuarenta sen",
        },
        {
          id: "harga-rm2780",
          ms: "dua puluh tujuh ringgit lapan puluh sen",
          en: "twenty-seven ringgit eighty sen",
          es: "veintisiete ringgit con ochenta sen",
        },
      ],
      items: [
        {
          id: "c5-price-practice-rm630",
          n: 1,
          q: { kind: "text", text: { ms: "RM6.30", en: "RM6.30", es: "RM6.30" } },
          a: {
            kind: "blank",
            before: { ms: "Sebutan: ", en: "Say it as: ", es: "Se dice: " },
            after: { ms: ".", en: ".", es: "." },
            correctOptionId: "harga-rm630",
          },
        },
        {
          id: "c5-price-practice-rm1540",
          n: 2,
          q: { kind: "text", text: { ms: "RM15.40", en: "RM15.40", es: "RM15.40" } },
          a: {
            kind: "blank",
            before: { ms: "Sebutan: ", en: "Say it as: ", es: "Se dice: " },
            after: { ms: ".", en: ".", es: "." },
            correctOptionId: "harga-rm1540",
          },
        },
        {
          id: "c5-price-practice-rm2780",
          n: 3,
          q: { kind: "text", text: { ms: "RM27.80", en: "RM27.80", es: "RM27.80" } },
          a: {
            kind: "blank",
            before: { ms: "Sebutan: ", en: "Say it as: ", es: "Se dice: " },
            after: { ms: ".", en: ".", es: "." },
            correctOptionId: "harga-rm2780",
          },
        },
      ],
    },

    {
      id: "c5-p6-chat-pasar-malam",
      kind: "chat",
      youId: "me",
      title: {
        ms: "Situasi 5.1: Beli Buah di Pasar Malam",
        en: "Situation 5.1: Buying Fruit at a Night Market",
        es: "Situación 5.1: Comprar fruta en un mercado nocturno",
      },
      context: {
        ms: "Latar tempat: Gerai buah di pasar malam.",
        en: "Setting: A fruit stall at the night market.",
        es: "Lugar: Un puesto de frutas en el mercado nocturno.",
      },
      participants: [
        { id: "jurujual", name: { ms: "Jurujual", en: "Salesperson", es: "Vendedor" } },
        { id: "me", name: { ms: "{currentUsername}", en: "{currentUsername}", es: "{currentUsername}" } },
      ],
      messages: [
        {
          id: "c5-52-m1",
          from: "jurujual",
          text: { ms: "Selamat malam. Nak cari buah apa?", en: "Good evening. What fruit are you looking for?", es: "Buenas noches. ¿Qué fruta busca?" },
        },
        {
          id: "c5-52-m2",
          from: "me",
          text: { ms: "Mangga ini berapa harga satu kilo?", en: "How much are these mangoes per kilo?", es: "¿Cuánto cuestan estos mangos por kilo?" },
        },
        {
          id: "c5-52-m3",
          from: "jurujual",
          text: { ms: "RM9 satu kilo. Mangga ini manis.", en: "RM9 per kilo. These mangoes are sweet.", es: "RM9 por kilo. Estos mangos son dulces." },
        },
        {
          id: "c5-52-m4",
          from: "me",
          text: { ms: "Kalau saya ambil dua kilo, boleh kurang?", en: "If I take two kilos, can you lower the price?", es: "Si llevo dos kilos, ¿puede bajar el precio?" },
        },
        {
          id: "c5-52-m5",
          from: "jurujual",
          text: { ms: "Boleh. Saya bagi RM8 satu kilo.", en: "Sure. I can give RM8 per kilo.", es: "Sí. Se los dejo a RM8 por kilo." },
        },
        {
          id: "c5-52-m6",
          from: "me",
          text: { ms: "Baik, saya ambil dua kilo mangga. Pisang pula berapa?", en: "Alright, I will take two kilos of mangoes. How much are the bananas?", es: "Bien, llevo dos kilos de mangos. ¿Y cuánto cuestan los plátanos?" },
        },
        {
          id: "c5-52-m7",
          from: "jurujual",
          text: { ms: "Pisang RM10 satu kilo.", en: "Bananas are RM10 per kilo.", es: "Los plátanos cuestan RM10 por kilo." },
        },
        {
          id: "c5-52-m8",
          from: "me",
          text: { ms: "Tambah lagi setengah kilo pisang, ya.", en: "Please add another half kilo of bananas.", es: "Añada medio kilo más de plátanos, por favor." },
        },
        {
          id: "c5-52-m9",
          from: "jurujual",
          text: { ms: "Baik. Jumlah semua RM21.", en: "Alright. The total is RM21.", es: "Muy bien. El total es RM21." },
        },
        {
          id: "c5-52-m10",
          from: "me",
          text: { ms: "Ini wangnya. Terima kasih.", en: "Here is the money. Thank you.", es: "Aquí tiene el dinero. Gracias." },
        },
      ],
    },

    {
      id: "c5-p8-typein-wang",
      kind: "typein",
      title: {
        ms: "Misi Duit: Taip Nilai Wang",
        en: "Money Mission: Type the Currency Value",
        es: "Misión de dinero: Escribe el valor",
      },
      instructions: {
        ms: "Taipkan nilai wang dalam BM bagi setiap gambar. Contoh: lima sen atau sepuluh ringgit.",
        en: "Type the value in Malay for each image. Example: lima sen or sepuluh ringgit.",
        es: "Escribe el valor en malayo para cada imagen. Ejemplo: lima sen o sepuluh ringgit.",
      },
      items: [
        {
          id: "c5-ti-20rm",
          n: 1,
          scrambled: "",
          image: { src: "/assets/chapters/ch5/Malaysian_Money_20_Ringgit.jpg", alt: "20 ringgit", w: 520, h: 320, className: noteImageClass },
          answer: "dua puluh ringgit",
          meaning: { ms: "RM20", en: "RM20", es: "RM20" },
        },
        {
          id: "c5-ti-10sen",
          n: 2,
          scrambled: "",
          image: { src: "/assets/chapters/ch5/Malaysian_Money_10_Sen.jpg", alt: "10 sen", w: 520, h: 320, className: coinImageClass },
          answer: "sepuluh sen",
          meaning: { ms: "10 sen", en: "10 sen", es: "10 sen" },
        },
        {
          id: "c5-ti-1rm",
          n: 3,
          scrambled: "",
          image: { src: "/assets/chapters/ch5/Malaysian_Money_1_Ringgit.jpg", alt: "1 ringgit", w: 520, h: 320, className: noteImageClass },
          answer: "satu ringgit",
          meaning: { ms: "RM1", en: "RM1", es: "RM1" },
        },
        {
          id: "c5-ti-50sen",
          n: 4,
          scrambled: "",
          image: { src: "/assets/chapters/ch5/Malaysian_Money_50_Sen.jpg", alt: "50 sen", w: 520, h: 320, className: coinImageClass },
          answer: "lima puluh sen",
          meaning: { ms: "50 sen", en: "50 sen", es: "50 sen" },
        },
        {
          id: "c5-ti-100rm",
          n: 5,
          scrambled: "",
          image: { src: "/assets/chapters/ch5/Malaysian_Money_100_Ringgit.jpg", alt: "100 ringgit", w: 520, h: 320, className: noteImageClass },
          answer: "seratus ringgit",
          meaning: { ms: "RM100", en: "RM100", es: "RM100" },
        },
      ],
    },

    {
      id: "c5-p9-typein-jumlah",
      kind: "typein",
      title: {
        ms: "Misi Duit: Kira Jumlah",
        en: "Money Mission: Calculate the Total",
        es: "Misión de dinero: Calcula el total",
      },
      instructions: {
        ms: "Taip jumlah dalam RM, nombor sahaja tanpa RM. Contoh: 5.20",
        en: "Type the total in RM, numbers only without RM. Example: 5.20",
        es: "Escribe el total en RM, solo números y sin RM. Ejemplo: 5.20",
      },
      items: [
        {
          id: "c5-sum-1",
          n: 1,
          scrambled: "RM ______",
          images: [
            { src: "/assets/chapters/ch5/Malaysian_Money_Front_Only_5_Ringgit.webp", alt: "RM5", w: 320, h: 200, className: totalImageClass },
            { src: "/assets/chapters/ch5/Malaysian_Money_Front_Only_20_Sen.webp", alt: "20 sen", w: 160, h: 120, className: totalImageClass },
          ],
          answer: "5.20",
          meaning: { ms: "RM5 + 20 sen", en: "RM5 + 20 sen", es: "RM5 + 20 sen" },
        },
        {
          id: "c5-sum-2",
          n: 2,
          scrambled: "RM ______",
          images: [
            { src: "/assets/chapters/ch5/Malaysian_Money_Front_Only_20_Ringgit.webp", alt: "RM20", w: 320, h: 200, className: totalImageClass },
            { src: "/assets/chapters/ch5/Malaysian_Money_Front_Only_1_Ringgit.webp", alt: "RM1", w: 200, h: 140, className: totalImageClass },
            { src: "/assets/chapters/ch5/Malaysian_Money_Front_Only_1_Ringgit.webp", alt: "RM1", w: 200, h: 140, className: totalImageClass },
            { src: "/assets/chapters/ch5/Malaysian_Money_Front_Only_1_Ringgit.webp", alt: "RM1", w: 200, h: 140, className: totalImageClass },
            { src: "/assets/chapters/ch5/Malaysian_Money_Front_Only_1_Ringgit.webp", alt: "RM1", w: 200, h: 140, className: totalImageClass },
            { src: "/assets/chapters/ch5/Malaysian_Money_Front_Only_50_Sen.webp", alt: "50 sen", w: 160, h: 120, className: totalImageClass },
            { src: "/assets/chapters/ch5/Malaysian_Money_Front_Only_10_Sen.webp", alt: "10 sen", w: 160, h: 120, className: totalImageClass },
            { src: "/assets/chapters/ch5/Malaysian_Money_Front_Only_5_Sen.webp", alt: "5 sen", w: 160, h: 120, className: totalImageClass },
          ],
          answer: "24.65",
          meaning: { ms: "RM20 + 4 × RM1 + 50 sen + 10 sen + 5 sen", en: "RM20 + 4 × RM1 + 50 sen + 10 sen + 5 sen", es: "RM20 + 4 × RM1 + 50 sen + 10 sen + 5 sen" },
        },
        {
          id: "c5-sum-3",
          n: 3,
          scrambled: "RM ______",
          images: [
            { src: "/assets/chapters/ch5/Malaysian_Money_Front_Only_100_Ringgit.webp", alt: "RM100", w: 360, h: 220, className: totalImageClass },
            { src: "/assets/chapters/ch5/Malaysian_Money_Front_Only_50_Ringgit.webp", alt: "RM50", w: 320, h: 200, className: totalImageClass },
            { src: "/assets/chapters/ch5/Malaysian_Money_Front_Only_20_Ringgit.webp", alt: "RM20", w: 300, h: 190, className: totalImageClass },
            { src: "/assets/chapters/ch5/Malaysian_Money_Front_Only_10_ringgit.webp", alt: "RM10", w: 280, h: 180, className: totalImageClass },
            { src: "/assets/chapters/ch5/Malaysian_Money_Front_Only_1_Ringgit.webp", alt: "RM1", w: 200, h: 140, className: totalImageClass },
            { src: "/assets/chapters/ch5/Malaysian_Money_Front_Only_1_Ringgit.webp", alt: "RM1", w: 200, h: 140, className: totalImageClass },
          ],
          answer: "182.00",
          meaning: { ms: "RM100 + RM50 + RM20 + RM10 + RM1 + RM1", en: "100 + 50 + 20 + 10 + 1 + 1", es: "100 + 50 + 20 + 10 + 1 + 1" },
        },
        {
          id: "c5-sum-4",
          n: 4,
          scrambled: "RM ______",
          images: [
            { src: "/assets/chapters/ch5/Malaysian_Money_Front_Only_100_Ringgit.webp", alt: "RM100", w: 360, h: 220, className: totalImageClass },
            { src: "/assets/chapters/ch5/Malaysian_Money_Front_Only_10_ringgit.webp", alt: "RM10", w: 280, h: 180, className: totalImageClass },
            { src: "/assets/chapters/ch5/Malaysian_Money_Front_Only_5_Ringgit.webp", alt: "RM5", w: 260, h: 170, className: totalImageClass },
            { src: "/assets/chapters/ch5/Malaysian_Money_Front_Only_1_Ringgit.webp", alt: "RM1", w: 200, h: 140, className: totalImageClass },
            { src: "/assets/chapters/ch5/Malaysian_Money_Front_Only_1_Ringgit.webp", alt: "RM1", w: 200, h: 140, className: totalImageClass },
            { src: "/assets/chapters/ch5/Malaysian_Money_Front_Only_1_Ringgit.webp", alt: "RM1", w: 200, h: 140, className: totalImageClass },
            { src: "/assets/chapters/ch5/Malaysian_Money_Front_Only_50_Sen.webp", alt: "50 sen", w: 160, h: 120, className: totalImageClass },
            { src: "/assets/chapters/ch5/Malaysian_Money_Front_Only_20_Sen.webp", alt: "20 sen", w: 160, h: 120, className: totalImageClass },
            { src: "/assets/chapters/ch5/Malaysian_Money_Front_Only_10_Sen.webp", alt: "10 sen", w: 160, h: 120, className: totalImageClass },
            { src: "/assets/chapters/ch5/Malaysian_Money_Front_Only_5_Sen.webp", alt: "5 sen", w: 160, h: 120, className: totalImageClass },
          ],
          answer: "118.85",
          meaning: { ms: "RM100 + RM10 + RM5 + 3 × RM1 + 50 sen + 20 sen + 10 sen + 5 sen", en: "RM100 + RM10 + RM5 + 3 × RM1 + 50 sen + 20 sen + 10 sen + 5 sen", es: "RM100 + RM10 + RM5 + 3 × RM1 + 50 sen + 20 sen + 10 sen + 5 sen" },
        },
      ],
    },

    {
      id: "c5-p9-alamat-builder",
      kind: "iconRows",
      title: { ms: "Bina Alamat", en: "Build an Address", es: "Crea una dirección" },
      rows: [
        {
          id: "addr-rumah",
          iconSrc: "/assets/chapters/ch5/rumah.webp",
          iconAlt: { ms: "rumah", en: "house", es: "casa" },
          name: { ms: "Rumah atau lot", en: "House or lot", es: "Casa o lote" },
          description: { ms: "Mulakan dengan nombor rumah atau lot.", en: "Start with the house or lot number.", es: "Empieza con el número de casa o lote." },
          example: { ms: "No. 153", en: "No. 153", es: "N.º 153" },
        },
        {
          id: "addr-blok",
          iconSrc: "/assets/chapters/ch5/blok.webp",
          iconAlt: { ms: "blok", en: "block", es: "bloque" },
          name: { ms: "Blok", en: "Block", es: "Bloque" },
          description: { ms: "Tambah blok jika rumah berada dalam kawasan berblok.", en: "Add the block if the home is in a block area.", es: "Añade el bloque si la vivienda está en una zona de bloques." },
          example: { ms: "Blok B", en: "Block B", es: "Bloque B" },
        },
        {
          id: "addr-jalan",
          iconSrc: "/assets/chapters/ch5/jalan.webp",
          iconAlt: { ms: "jalan", en: "street", es: "calle" },
          name: { ms: "Jalan", en: "Street", es: "Calle" },
          description: { ms: "Jalan menunjukkan nama atau nombor jalan.", en: "Jalan shows the street name or number.", es: "Jalan indica el nombre o número de la calle." },
          example: { ms: "Jalan Raja Laut", en: "Jalan Raja Laut", es: "Jalan Raja Laut" },
        },
        {
          id: "addr-pangsapuri",
          iconSrc: "/assets/chapters/ch5/pangsapuri.webp",
          iconAlt: { ms: "pangsapuri", en: "apartment", es: "apartamento" },
          name: { ms: "Pangsapuri atau nama perumahan", en: "Apartment or housing name", es: "Apartamento o nombre de urbanización" },
          description: { ms: "Letakkan nama pangsapuri, taman, atau kawasan perumahan.", en: "Add the apartment, housing estate, or residential-area name.", es: "Añade el nombre del apartamento, la urbanización o la zona residencial." },
          example: { ms: "Pangsapuri Anggun", en: "Pangsapuri Anggun", es: "Pangsapuri Anggun" },
        },
        {
          id: "addr-daerah",
          iconSrc: "/assets/chapters/ch5/daerah.webp",
          iconAlt: { ms: "daerah", en: "district", es: "distrito" },
          name: { ms: "Bandar atau daerah", en: "City or district", es: "Ciudad o distrito" },
          description: { ms: "Bandar atau daerah membantu mengenal pasti kawasan alamat.", en: "The city or district helps identify the address area.", es: "La ciudad o el distrito ayuda a identificar la zona de la dirección." },
          example: { ms: "Kuala Lumpur", en: "Kuala Lumpur", es: "Kuala Lumpur" },
        },
        {
          id: "addr-poskod",
          iconSrc: "/assets/chapters/ch5/poskod.webp",
          iconAlt: { ms: "poskod", en: "postcode", es: "código postal" },
          name: { ms: "Poskod", en: "Postcode", es: "Código postal" },
          description: { ms: "Poskod ialah nombor untuk kawasan penghantaran.", en: "A postcode is the number for a delivery area.", es: "El código postal indica una zona de reparto." },
          example: { ms: "50350", en: "50350", es: "50350" },
        },
        {
          id: "addr-negeri",
          iconSrc: "/assets/chapters/ch5/negeri.webp",
          iconAlt: { ms: "negeri", en: "state", es: "estado" },
          name: { ms: "Negeri", en: "State", es: "Estado" },
          description: { ms: "Akhiri alamat dengan nama negeri atau wilayah persekutuan.", en: "Finish the address with the state or federal territory name.", es: "Termina la dirección con el nombre del estado o territorio federal." },
          example: { ms: "Wilayah Persekutuan Kuala Lumpur", en: "Federal Territory of Kuala Lumpur", es: "Territorio Federal de Kuala Lumpur" },
        },
      ],
    },

    {
      id: "c5-p10-chat-kemas-kini-alamat",
      kind: "chat",
      youId: "me",
      title: {
        ms: "Situasi 5.2: Kemas Kini Alamat",
        en: "Situation 5.2: Updating an Address",
        es: "Situación 5.2: Actualizar una dirección",
      },
      context: {
        ms: "Latar tempat: Kaunter bantuan pelanggan di bank.",
        en: "Setting: Customer help counter at the bank.",
        es: "Lugar: Mostrador de atención al cliente en el banco.",
      },
      participants: [
        {
          id: "pegawai",
          name: { ms: "Pegawai bank", en: "Bank officer", es: "Empleado del banco" },
        },
        { id: "me", name: { ms: "{currentUsername}", en: "{currentUsername}", es: "{currentUsername}" } },
      ],
      messages: [
        {
          id: "c5-51-m1",
          from: "pegawai",
          text: { ms: "Selamat pagi. Boleh saya bantu?", en: "Good morning. How may I help?", es: "Buenos días. ¿En qué puedo ayudarle?" },
        },
        {
          id: "c5-51-m2",
          from: "me",
          text: { ms: "Selamat pagi. Saya mahu kemas kini alamat rumah.", en: "Good morning. I want to update my home address.", es: "Buenos días. Quiero actualizar la dirección de mi casa." },
        },
        {
          id: "c5-51-m3",
          from: "pegawai",
          text: { ms: "Baik. Tuan atau puan baru pindah rumah?", en: "Alright. Have you recently moved house?", es: "De acuerdo. ¿Se ha mudado hace poco?" },
        },
        {
          id: "c5-51-m4",
          from: "me",
          text: { ms: "Ya, saya baru pindah ke Pangsapuri Harmoni.", en: "Yes, I just moved to Pangsapuri Harmoni.", es: "Sí, acabo de mudarme a Pangsapuri Harmoni." },
        },
        {
          id: "c5-51-m5",
          from: "pegawai",
          text: { ms: "Sila berikan alamat baharu, bermula dengan nombor rumah.", en: "Please give the new address, starting with the house number.", es: "Por favor, indique la nueva dirección empezando por el número de casa." },
        },
        {
          id: "c5-51-m6",
          from: "me",
          text: { ms: "No. 153, Blok B, Pangsapuri Harmoni, Jalan Raja Laut.", en: "No. 153, Block B, Pangsapuri Harmoni, Jalan Raja Laut.", es: "N.º 153, Bloque B, Pangsapuri Harmoni, Jalan Raja Laut." },
        },
        {
          id: "c5-51-m7",
          from: "pegawai",
          text: { ms: "Baik. Bandar atau daerah pula?", en: "Alright. And the city or district?", es: "De acuerdo. ¿Y la ciudad o el distrito?" },
        },
        {
          id: "c5-51-m8",
          from: "me",
          text: { ms: "Kuala Lumpur.", en: "Kuala Lumpur.", es: "Kuala Lumpur." },
        },
        {
          id: "c5-51-m9",
          from: "pegawai",
          text: { ms: "Poskod dan wilayah pula?", en: "And the postcode and territory?", es: "¿Y el código postal y el territorio?" },
        },
        {
          id: "c5-51-m10",
          from: "me",
          text: { ms: "50350, Wilayah Persekutuan Kuala Lumpur. Terima kasih kerana kemas kini profil saya.", en: "50350, Federal Territory of Kuala Lumpur. Thank you for updating my profile.", es: "50350, Territorio Federal de Kuala Lumpur. Gracias por actualizar mi perfil." },
        },
      ],
    },

  ],
};
