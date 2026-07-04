import type { ChapterContent } from "./types";

const coinImageClass = "w-full h-auto max-h-44 object-contain";
const noteImageClass = "w-full h-auto max-h-44 object-contain";
const totalImageClass = "w-full h-auto object-contain";

export const chapter05: ChapterContent = {
  id: 5,
  revision: 3,
  title: { ms: "Nombor, Angka & Alamat", en: "Numbers & Addresses", es: "Numeros y Direcciones" },
  pages: [
    {
      id: "c5-p2-syiling",
      kind: "table",
      title: { ms: "Mata Wang Malaysia (RM)", en: "Malaysian Currency (RM)", es: "Moneda de Malasia (RM)" },
      leadCard: {
        heading: { ms: "Wang syiling digunakan untuk jumlah kecil.", en: "Coins are used for small amounts.", es: "Las monedas se usan para cantidades pequenas." },
        body: {
          ms: "Kenali nilai setiap syiling sebelum kira jumlah.",
          en: "Learn each coin value before calculating totals.",
          es: "Aprende el valor de cada moneda antes de calcular totales.",
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
      title: { ms: "Mata Wang Malaysia (RM)", en: "Malaysian Banknotes (RM)", es: "Billetes de Malasia (RM)" },
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
        heading: { ms: "Cara sebut harga", en: "How to say prices", es: "Como decir precios" },
        body: {
          ms: "Baca RM sebagai ringgit. Jika harga berakhir dengan .00, biasanya sebut ringgit sahaja.",
          en: "Read RM as ringgit. If the price ends in .00, usually say only the ringgit amount.",
          es: "Lee RM como ringgit. Si el precio termina en .00, normalmente se dice solo la cantidad en ringgit.",
        },
      },
      columns: [
        { key: "harga", label: { ms: "Harga", en: "Price", es: "Precio" } },
        { key: "sebutan", label: { ms: "Sebutan", en: "How to say it", es: "Como decirlo" } },
      ],
      rows: [
        {
          id: "h1",
          cells: {
            harga: [{ ms: "RM5.20", en: "RM5.20", es: "RM5.20" }],
            sebutan: [{ ms: "lima ringgit dua puluh sen", en: "five ringgit twenty sen", es: "cinco ringgit con veinte sen" }],
          },
        },
        {
          id: "h2",
          cells: {
            harga: [{ ms: "RM12.00", en: "RM12.00", es: "RM12.00" }],
            sebutan: [{ ms: "dua belas ringgit", en: "twelve ringgit", es: "doce ringgit" }],
          },
        },
        {
          id: "h3",
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
      title: { ms: "Latihan Harga", en: "Price Practice", es: "Practica de precios" },
      instructions: {
        ms: "Padankan tanda harga dengan sebutan yang betul.",
        en: "Match each price tag with the correct spoken form.",
        es: "Empareja cada etiqueta de precio con la forma oral correcta.",
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
        es: "Situacion 5.1: Comprar fruta en un mercado nocturno",
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
          text: { ms: "Selamat malam. Nak cari buah apa?", en: "Good evening. What fruit are you looking for?", es: "Buenas noches. Que fruta busca?" },
        },
        {
          id: "c5-52-m2",
          from: "me",
          text: { ms: "Mangga ini berapa harga satu kilo?", en: "How much are these mangoes per kilo?", es: "Cuanto cuestan estos mangos por kilo?" },
        },
        {
          id: "c5-52-m3",
          from: "jurujual",
          text: { ms: "RM9 satu kilo. Mangga ini manis.", en: "RM9 per kilo. These mangoes are sweet.", es: "RM9 por kilo. Estos mangos son dulces." },
        },
        {
          id: "c5-52-m4",
          from: "me",
          text: { ms: "Kalau saya ambil dua kilo, boleh kurang?", en: "If I take two kilos, can you lower the price?", es: "Si llevo dos kilos, puede bajar el precio?" },
        },
        {
          id: "c5-52-m5",
          from: "jurujual",
          text: { ms: "Boleh. Saya bagi RM8 satu kilo.", en: "Sure. I can give RM8 per kilo.", es: "Si. Se lo dejo a RM8 por kilo." },
        },
        {
          id: "c5-52-m6",
          from: "me",
          text: { ms: "Baik, saya ambil dua kilo mangga. Pisang pula berapa?", en: "Alright, I will take two kilos of mangoes. How much are the bananas?", es: "Bien, llevo dos kilos de mangos. Y cuanto cuestan los platanos?" },
        },
        {
          id: "c5-52-m7",
          from: "jurujual",
          text: { ms: "Pisang RM10 satu kilo.", en: "Bananas are RM10 per kilo.", es: "Los platanos cuestan RM10 por kilo." },
        },
        {
          id: "c5-52-m8",
          from: "me",
          text: { ms: "Tambah setengah kilo pisang, ya.", en: "Add half a kilo of bananas, please.", es: "Anada medio kilo de platanos, por favor." },
        },
        {
          id: "c5-52-m9",
          from: "jurujual",
          text: { ms: "Baik. Jumlah semua RM21.", en: "Alright. The total is RM21.", es: "Muy bien. El total es RM21." },
        },
        {
          id: "c5-52-m10",
          from: "me",
          text: { ms: "Ini wangnya. Terima kasih.", en: "Here is the money. Thank you.", es: "Aqui tiene el dinero. Gracias." },
        },
      ],
    },

    {
      id: "c5-p8-typein-wang",
      kind: "typein",
      title: {
        ms: "Misi Duit: Taip Nilai Wang",
        en: "Money Mission: Type the Currency Value",
        es: "Mision dinero: Escribe el valor",
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
        es: "Mision dinero: Calcula el total",
      },
      instructions: {
        ms: "Taip jumlah dalam RM, nombor sahaja tanpa RM. Contoh: 5.20",
        en: "Type the total in RM, numbers only without RM. Example: 5.20",
        es: "Escribe el total en RM, solo numeros sin RM. Ejemplo: 5.20",
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
          meaning: { ms: "RM20 + 4 x RM1 + 50 sen + 10 sen + 5 sen", en: "20 + four 1s + 0.50 + 0.10 + 0.05", es: "20 + cuatro billetes de 1 + 0.50 + 0.10 + 0.05" },
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
          meaning: { ms: "RM100 + RM10 + RM5 + 3 x RM1 + 50 sen + 20 sen + 10 sen + 5 sen", en: "100 + 10 + 5 + 3 x 1 + 0.50 + 0.20 + 0.10 + 0.05", es: "100 + 10 + 5 + 3 x 1 + 0.50 + 0.20 + 0.10 + 0.05" },
        },
      ],
    },

    {
      id: "c5-p9-alamat-builder",
      kind: "iconRows",
      title: { ms: "Bina Alamat", en: "Build an Address", es: "Forma una direccion" },
      rows: [
        {
          id: "addr-rumah",
          iconSrc: "/assets/chapters/ch5/rumah.webp",
          iconAlt: { ms: "rumah", en: "house", es: "casa" },
          name: { ms: "Rumah atau lot", en: "House or lot", es: "Casa o lote" },
          description: { ms: "Mulakan dengan nombor rumah atau lot.", en: "Start with the house or lot number.", es: "Empieza con el numero de casa o lote." },
          example: { ms: "Lot 153", en: "Lot 153", es: "Lote 153" },
        },
        {
          id: "addr-blok",
          iconSrc: "/assets/chapters/ch5/blok.webp",
          iconAlt: { ms: "blok", en: "block", es: "bloque" },
          name: { ms: "Blok", en: "Block", es: "Bloque" },
          description: { ms: "Tambah blok jika rumah berada dalam kawasan berblok.", en: "Add the block if the home is in a block area.", es: "Anade el bloque si la vivienda esta en una zona con bloques." },
          example: { ms: "Blok B", en: "Block B", es: "Bloque B" },
        },
        {
          id: "addr-jalan",
          iconSrc: "/assets/chapters/ch5/jalan.webp",
          iconAlt: { ms: "jalan", en: "street", es: "calle" },
          name: { ms: "Jalan", en: "Street", es: "Calle" },
          description: { ms: "Jalan menunjukkan nama atau nombor jalan.", en: "Jalan shows the street name or number.", es: "Jalan indica el nombre o numero de la calle." },
          example: { ms: "Jalan 8/30A", en: "Jalan 8/30A", es: "Jalan 8/30A" },
        },
        {
          id: "addr-pangsapuri",
          iconSrc: "/assets/chapters/ch5/pangsapuri.webp",
          iconAlt: { ms: "pangsapuri", en: "apartment", es: "apartamento" },
          name: { ms: "Pangsapuri atau nama perumahan", en: "Apartment or housing name", es: "Apartamento o nombre de vivienda" },
          description: { ms: "Letakkan nama pangsapuri, taman, atau kawasan perumahan.", en: "Add the apartment, garden, or housing area name.", es: "Anade el nombre del apartamento, taman o zona residencial." },
          example: { ms: "Pangsapuri Anggun", en: "Pangsapuri Anggun", es: "Pangsapuri Anggun" },
        },
        {
          id: "addr-daerah",
          iconSrc: "/assets/chapters/ch5/daerah.webp",
          iconAlt: { ms: "daerah", en: "district", es: "distrito" },
          name: { ms: "Kawasan atau daerah", en: "Area or district", es: "Zona o distrito" },
          description: { ms: "Daerah membantu orang tahu kawasan alamat itu.", en: "The district helps people know the address area.", es: "El distrito ayuda a ubicar la zona de la direccion." },
          example: { ms: "Lahad Datu", en: "Lahad Datu", es: "Lahad Datu" },
        },
        {
          id: "addr-poskod",
          iconSrc: "/assets/chapters/ch5/poskod.webp",
          iconAlt: { ms: "poskod", en: "postcode", es: "codigo postal" },
          name: { ms: "Poskod", en: "Postcode", es: "Codigo postal" },
          description: { ms: "Poskod ialah nombor untuk kawasan penghantaran.", en: "A postcode is the number for a delivery area.", es: "El codigo postal es el numero de una zona de entrega." },
          example: { ms: "50470", en: "50470", es: "50470" },
        },
        {
          id: "addr-negeri",
          iconSrc: "/assets/chapters/ch5/negeri.webp",
          iconAlt: { ms: "negeri", en: "state", es: "estado" },
          name: { ms: "Negeri", en: "State", es: "Estado" },
          description: { ms: "Akhiri alamat dengan nama negeri.", en: "Finish the address with the state name.", es: "Termina la direccion con el nombre del estado." },
          example: { ms: "Perak", en: "Perak", es: "Perak" },
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
        es: "Situacion 5.2: Actualizar una direccion",
      },
      context: {
        ms: "Latar tempat: Kaunter bantuan pelanggan di bank.",
        en: "Setting: Customer help counter at the bank.",
        es: "Lugar: Mostrador de atencion al cliente en el banco.",
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
          text: { ms: "Selamat pagi. Boleh saya bantu?", en: "Good morning. How may I help?", es: "Buenos dias. En que puedo ayudarle?" },
        },
        {
          id: "c5-51-m2",
          from: "me",
          text: { ms: "Selamat pagi. Saya mahu kemas kini alamat rumah.", en: "Good morning. I want to update my home address.", es: "Buenos dias. Quiero actualizar mi direccion de casa." },
        },
        {
          id: "c5-51-m3",
          from: "pegawai",
          text: { ms: "Baik. Encik baru pindah rumah?", en: "Alright. Did you recently move house?", es: "Muy bien. Se mudo de casa hace poco?" },
        },
        {
          id: "c5-51-m4",
          from: "me",
          text: { ms: "Ya, saya baru pindah ke Pangsapuri Anggun.", en: "Yes, I just moved to Pangsapuri Anggun.", es: "Si, acabo de mudarme a Pangsapuri Anggun." },
        },
        {
          id: "c5-51-m5",
          from: "pegawai",
          text: { ms: "Sila berikan alamat baharu dari nombor rumah dahulu.", en: "Please give the new address, starting with the house number.", es: "Por favor, indique la nueva direccion empezando con el numero de casa." },
        },
        {
          id: "c5-51-m6",
          from: "me",
          text: { ms: "Lot 153, Blok B, Jalan 8/30A.", en: "Lot 153, Block B, Jalan 8/30A.", es: "Lote 153, Bloque B, Jalan 8/30A." },
        },
        {
          id: "c5-51-m7",
          from: "pegawai",
          text: { ms: "Baik. Nama pangsapuri dan daerah?", en: "Alright. The apartment name and district?", es: "Bien. El nombre del apartamento y el distrito?" },
        },
        {
          id: "c5-51-m8",
          from: "me",
          text: { ms: "Pangsapuri Anggun, Lahad Datu.", en: "Pangsapuri Anggun, Lahad Datu.", es: "Pangsapuri Anggun, Lahad Datu." },
        },
        {
          id: "c5-51-m9",
          from: "pegawai",
          text: { ms: "Poskod dan negeri pula?", en: "And the postcode and state?", es: "Y el codigo postal y el estado?" },
        },
        {
          id: "c5-51-m10",
          from: "me",
          text: { ms: "50470, Perak. Terima kasih kerana kemas kini profil saya.", en: "50470, Perak. Thank you for updating my profile.", es: "50470, Perak. Gracias por actualizar mi perfil." },
        },
      ],
    },

  ],
};
