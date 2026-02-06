import type { ChapterContent } from "./types";

export const chapter07: ChapterContent = {
  id: 7,
  title: {
    ms: "Makanan & Kuih-muih",
    en: "Food & Snacks",
    es: "Comida y Bocadillos",
  },
  pages: [
    {
      id: "c7-p1-jenis-nasi",
      kind: "table",
      title: {
        ms: "Jenis Nasi",
        en: "Types of Rice Dishes",
        es: "Tipos de Platos de Arroz",
      },
      columns: [
        {
          key: "img",
          label: { ms: "Gambar", en: "Image", es: "Imagen" },
        },
        {
          key: "nama",
          label: { ms: "Nama", en: "Name", es: "Nombre" },
        },
      ],
      rows: [
        {
          id: "c7-nasi-putih",
          cells: {
            img: [
              {
                kind: "image",
                src: "/assets/chapters/ch7/placeholder-nasi.svg",
                alt: { ms: "nasi putih", en: "white rice", es: "arroz blanco" },
                w: 720,
                h: 420,
                className: "w-full h-auto max-h-64 object-contain rounded-xl",
              },
            ],
            nama: [{ ms: "nasi putih", en: "white rice", es: "arroz blanco" }],
          },
        },
        {
          id: "c7-nasi-lemak",
          cells: {
            img: [
              {
                kind: "image",
                src: "/assets/chapters/ch7/placeholder-nasi.svg",
                alt: { ms: "nasi lemak", en: "nasi lemak", es: "nasi lemak" },
                w: 720,
                h: 420,
                className: "w-full h-auto max-h-64 object-contain rounded-xl",
              },
            ],
            nama: [{ ms: "nasi lemak", en: "nasi lemak", es: "nasi lemak" }],
          },
        },
        {
          id: "c7-nasi-ayam",
          cells: {
            img: [
              {
                kind: "image",
                src: "/assets/chapters/ch7/placeholder-nasi.svg",
                alt: { ms: "nasi ayam", en: "chicken rice", es: "arroz con pollo" },
                w: 720,
                h: 420,
                className: "w-full h-auto max-h-64 object-contain rounded-xl",
              },
            ],
            nama: [{ ms: "nasi ayam", en: "chicken rice", es: "arroz con pollo" }],
          },
        },
        {
          id: "c7-nasi-kerabu",
          cells: {
            img: [
              {
                kind: "image",
                src: "/assets/chapters/ch7/placeholder-nasi.svg",
                alt: { ms: "nasi kerabu", en: "nasi kerabu", es: "nasi kerabu" },
                w: 720,
                h: 420,
                className: "w-full h-auto max-h-64 object-contain rounded-xl",
              },
            ],
            nama: [{ ms: "nasi kerabu", en: "nasi kerabu", es: "nasi kerabu" }],
          },
        },
        {
          id: "c7-nasi-dagang",
          cells: {
            img: [
              {
                kind: "image",
                src: "/assets/chapters/ch7/placeholder-nasi.svg",
                alt: { ms: "nasi dagang", en: "nasi dagang", es: "nasi dagang" },
                w: 720,
                h: 420,
                className: "w-full h-auto max-h-64 object-contain rounded-xl",
              },
            ],
            nama: [{ ms: "nasi dagang", en: "nasi dagang", es: "nasi dagang" }],
          },
        },
        {
          id: "c7-nasi-air",
          cells: {
            img: [
              {
                kind: "image",
                src: "/assets/chapters/ch7/placeholder-nasi.svg",
                alt: { ms: "nasi air / bubur nasi", en: "rice porridge", es: "gachas de arroz" },
                w: 720,
                h: 420,
                className: "w-full h-auto max-h-64 object-contain rounded-xl",
              },
            ],
            nama: [{ ms: "nasi air / bubur nasi", en: "rice porridge", es: "gachas de arroz" }],
          },
        },
        {
          id: "c7-nasi-tomato",
          cells: {
            img: [
              {
                kind: "image",
                src: "/assets/chapters/ch7/placeholder-nasi.svg",
                alt: { ms: "nasi tomato", en: "tomato rice", es: "arroz con tomate" },
                w: 720,
                h: 420,
                className: "w-full h-auto max-h-64 object-contain rounded-xl",
              },
            ],
            nama: [{ ms: "nasi tomato", en: "tomato rice", es: "arroz con tomate" }],
          },
        },
        {
          id: "c7-nasi-minyak",
          cells: {
            img: [
              {
                kind: "image",
                src: "/assets/chapters/ch7/placeholder-nasi.svg",
                alt: { ms: "nasi minyak", en: "nasi minyak", es: "nasi minyak" },
                w: 720,
                h: 420,
                className: "w-full h-auto max-h-64 object-contain rounded-xl",
              },
            ],
            nama: [{ ms: "nasi minyak", en: "nasi minyak", es: "nasi minyak" }],
          },
        },
        {
          id: "c7-nasi-goreng",
          cells: {
            img: [
              {
                kind: "image",
                src: "/assets/chapters/ch7/placeholder-nasi.svg",
                alt: { ms: "nasi goreng", en: "fried rice", es: "arroz frito" },
                w: 720,
                h: 420,
                className: "w-full h-auto max-h-64 object-contain rounded-xl",
              },
            ],
            nama: [{ ms: "nasi goreng", en: "fried rice", es: "arroz frito" }],
          },
        },
        {
          id: "c7-nasi-hujan-panas",
          cells: {
            img: [
              {
                kind: "image",
                src: "/assets/chapters/ch7/placeholder-nasi.svg",
                alt: { ms: "nasi hujan panas", en: "nasi hujan panas", es: "nasi hujan panas" },
                w: 720,
                h: 420,
                className: "w-full h-auto max-h-64 object-contain rounded-xl",
              },
            ],
            nama: [{ ms: "nasi hujan panas", en: "nasi hujan panas", es: "nasi hujan panas" }],
          },
        },
      ],
    },
    {
      id: "c7-p2-lauk-ayam",
      kind: "table",
      title: {
        ms: "Lauk Ayam",
        en: "Chicken Side Dishes",
        es: "Guarniciones de Pollo",
      },
      columns: [
        {
          key: "img",
          label: { ms: "Gambar", en: "Image", es: "Imagen" },
        },
        {
          key: "nama",
          label: { ms: "Nama", en: "Name", es: "Nombre" },
        },
      ],
      rows: [
        {
          id: "c7-ayam-kari",
          cells: {
            img: [
              {
                kind: "image",
                src: "/assets/chapters/ch7/placeholder-lauk-ayam.svg",
                alt: { ms: "kari ayam", en: "chicken curry", es: "curry de pollo" },
                w: 720,
                h: 420,
                className: "w-full h-auto max-h-64 object-contain rounded-xl",
              },
            ],
            nama: [{ ms: "kari ayam", en: "chicken curry", es: "curry de pollo" }],
          },
        },
        {
          id: "c7-ayam-goreng",
          cells: {
            img: [
              {
                kind: "image",
                src: "/assets/chapters/ch7/placeholder-lauk-ayam.svg",
                alt: { ms: "ayam goreng", en: "fried chicken", es: "pollo frito" },
                w: 720,
                h: 420,
                className: "w-full h-auto max-h-64 object-contain rounded-xl",
              },
            ],
            nama: [{ ms: "ayam goreng", en: "fried chicken", es: "pollo frito" }],
          },
        },
        {
          id: "c7-ayam-sup",
          cells: {
            img: [
              {
                kind: "image",
                src: "/assets/chapters/ch7/placeholder-lauk-ayam.svg",
                alt: { ms: "ayam sup", en: "chicken soup", es: "sopa de pollo" },
                w: 720,
                h: 420,
                className: "w-full h-auto max-h-64 object-contain rounded-xl",
              },
            ],
            nama: [{ ms: "ayam sup", en: "chicken soup", es: "sopa de pollo" }],
          },
        },
        {
          id: "c7-ayam-kicap",
          cells: {
            img: [
              {
                kind: "image",
                src: "/assets/chapters/ch7/placeholder-lauk-ayam.svg",
                alt: { ms: "ayam masak kicap", en: "soy sauce chicken", es: "pollo con salsa de soya" },
                w: 720,
                h: 420,
                className: "w-full h-auto max-h-64 object-contain rounded-xl",
              },
            ],
            nama: [{ ms: "ayam masak kicap", en: "soy sauce chicken", es: "pollo con salsa de soya" }],
          },
        },
        {
          id: "c7-ayam-bakar",
          cells: {
            img: [
              {
                kind: "image",
                src: "/assets/chapters/ch7/placeholder-lauk-ayam.svg",
                alt: { ms: "ayam bakar", en: "grilled chicken", es: "pollo a la parrilla" },
                w: 720,
                h: 420,
                className: "w-full h-auto max-h-64 object-contain rounded-xl",
              },
            ],
            nama: [{ ms: "ayam bakar", en: "grilled chicken", es: "pollo a la parrilla" }],
          },
        },
        {
          id: "c7-ayam-tom-yam",
          cells: {
            img: [
              {
                kind: "image",
                src: "/assets/chapters/ch7/placeholder-lauk-ayam.svg",
                alt: { ms: "ayam tom yam", en: "tom yam chicken", es: "pollo tom yam" },
                w: 720,
                h: 420,
                className: "w-full h-auto max-h-64 object-contain rounded-xl",
              },
            ],
            nama: [{ ms: "ayam tom yam", en: "tom yam chicken", es: "pollo tom yam" }],
          },
        },
        {
          id: "c7-ayam-masak-merah",
          cells: {
            img: [
              {
                kind: "image",
                src: "/assets/chapters/ch7/placeholder-lauk-ayam.svg",
                alt: { ms: "ayam masak merah", en: "red chili chicken", es: "pollo en salsa roja" },
                w: 720,
                h: 420,
                className: "w-full h-auto max-h-64 object-contain rounded-xl",
              },
            ],
            nama: [{ ms: "ayam masak merah", en: "red chili chicken", es: "pollo en salsa roja" }],
          },
        },
        {
          id: "c7-ayam-rendang",
          cells: {
            img: [
              {
                kind: "image",
                src: "/assets/chapters/ch7/placeholder-lauk-ayam.svg",
                alt: { ms: "ayam rendang", en: "chicken rendang", es: "rendang de pollo" },
                w: 720,
                h: 420,
                className: "w-full h-auto max-h-64 object-contain rounded-xl",
              },
            ],
            nama: [{ ms: "ayam rendang", en: "chicken rendang", es: "rendang de pollo" }],
          },
        },
      ],
    },
    {
      id: "c7-p3-lauk-ikan",
      kind: "table",
      title: {
        ms: "Lauk Ikan",
        en: "Fish Side Dishes",
        es: "Guarniciones de Pescado",
      },
      columns: [
        {
          key: "img",
          label: { ms: "Gambar", en: "Image", es: "Imagen" },
        },
        {
          key: "nama",
          label: { ms: "Nama", en: "Name", es: "Nombre" },
        },
      ],
      rows: [
        {
          id: "c7-ikan-goreng",
          cells: {
            img: [
              {
                kind: "image",
                src: "/assets/chapters/ch7/placeholder-lauk-ikan.svg",
                alt: { ms: "ikan goreng", en: "fried fish", es: "pescado frito" },
                w: 720,
                h: 420,
                className: "w-full h-auto max-h-64 object-contain rounded-xl",
              },
            ],
            nama: [{ ms: "ikan goreng", en: "fried fish", es: "pescado frito" }],
          },
        },
        {
          id: "c7-ikan-kukus",
          cells: {
            img: [
              {
                kind: "image",
                src: "/assets/chapters/ch7/placeholder-lauk-ikan.svg",
                alt: { ms: "ikan kukus", en: "steamed fish", es: "pescado al vapor" },
                w: 720,
                h: 420,
                className: "w-full h-auto max-h-64 object-contain rounded-xl",
              },
            ],
            nama: [{ ms: "ikan kukus", en: "steamed fish", es: "pescado al vapor" }],
          },
        },
        {
          id: "c7-ikan-rebus",
          cells: {
            img: [
              {
                kind: "image",
                src: "/assets/chapters/ch7/placeholder-lauk-ikan.svg",
                alt: { ms: "ikan rebus", en: "boiled fish", es: "pescado hervido" },
                w: 720,
                h: 420,
                className: "w-full h-auto max-h-64 object-contain rounded-xl",
              },
            ],
            nama: [{ ms: "ikan rebus", en: "boiled fish", es: "pescado hervido" }],
          },
        },
        {
          id: "c7-ikan-goreng-sambal",
          cells: {
            img: [
              {
                kind: "image",
                src: "/assets/chapters/ch7/placeholder-lauk-ikan.svg",
                alt: { ms: "ikan goreng sambal", en: "fried fish with sambal", es: "pescado frito con sambal" },
                w: 720,
                h: 420,
                className: "w-full h-auto max-h-64 object-contain rounded-xl",
              },
            ],
            nama: [{ ms: "ikan goreng sambal", en: "fried fish with sambal", es: "pescado frito con sambal" }],
          },
        },
        {
          id: "c7-ikan-kari",
          cells: {
            img: [
              {
                kind: "image",
                src: "/assets/chapters/ch7/placeholder-lauk-ikan.svg",
                alt: { ms: "ikan kari", en: "fish curry", es: "curry de pescado" },
                w: 720,
                h: 420,
                className: "w-full h-auto max-h-64 object-contain rounded-xl",
              },
            ],
            nama: [{ ms: "ikan kari", en: "fish curry", es: "curry de pescado" }],
          },
        },
        {
          id: "c7-ikan-bakar",
          cells: {
            img: [
              {
                kind: "image",
                src: "/assets/chapters/ch7/placeholder-lauk-ikan.svg",
                alt: { ms: "ikan bakar", en: "grilled fish", es: "pescado a la parrilla" },
                w: 720,
                h: 420,
                className: "w-full h-auto max-h-64 object-contain rounded-xl",
              },
            ],
            nama: [{ ms: "ikan bakar", en: "grilled fish", es: "pescado a la parrilla" }],
          },
        },
      ],
    },
    {
      id: "c7-p4-lauk-sotong",
      kind: "table",
      title: {
        ms: "Lauk Sotong",
        en: "Squid Side Dishes",
        es: "Guarniciones de Calamar",
      },
      columns: [
        {
          key: "img",
          label: { ms: "Gambar", en: "Image", es: "Imagen" },
        },
        {
          key: "nama",
          label: { ms: "Nama", en: "Name", es: "Nombre" },
        },
      ],
      rows: [
        {
          id: "c7-sotong-goreng",
          cells: {
            img: [
              {
                kind: "image",
                src: "/assets/chapters/ch7/placeholder-lauk-sotong.svg",
                alt: { ms: "sotong goreng", en: "fried squid", es: "calamar frito" },
                w: 720,
                h: 420,
                className: "w-full h-auto max-h-64 object-contain rounded-xl",
              },
            ],
            nama: [{ ms: "sotong goreng", en: "fried squid", es: "calamar frito" }],
          },
        },
        {
          id: "c7-sotong-sambal",
          cells: {
            img: [
              {
                kind: "image",
                src: "/assets/chapters/ch7/placeholder-lauk-sotong.svg",
                alt: { ms: "sotong sambal", en: "sambal squid", es: "calamar sambal" },
                w: 720,
                h: 420,
                className: "w-full h-auto max-h-64 object-contain rounded-xl",
              },
            ],
            nama: [{ ms: "sotong sambal", en: "sambal squid", es: "calamar sambal" }],
          },
        },
        {
          id: "c7-sotong-kari",
          cells: {
            img: [
              {
                kind: "image",
                src: "/assets/chapters/ch7/placeholder-lauk-sotong.svg",
                alt: { ms: "sotong kari", en: "squid curry", es: "curry de calamar" },
                w: 720,
                h: 420,
                className: "w-full h-auto max-h-64 object-contain rounded-xl",
              },
            ],
            nama: [{ ms: "sotong kari", en: "squid curry", es: "curry de calamar" }],
          },
        },
        {
          id: "c7-sotong-masak-lemak",
          cells: {
            img: [
              {
                kind: "image",
                src: "/assets/chapters/ch7/placeholder-lauk-sotong.svg",
                alt: { ms: "sotong masak lemak", en: "squid in coconut gravy", es: "calamar en salsa de coco" },
                w: 720,
                h: 420,
                className: "w-full h-auto max-h-64 object-contain rounded-xl",
              },
            ],
            nama: [{ ms: "sotong masak lemak", en: "squid in coconut gravy", es: "calamar en salsa de coco" }],
          },
        },
        {
          id: "c7-sotong-bakar",
          cells: {
            img: [
              {
                kind: "image",
                src: "/assets/chapters/ch7/placeholder-lauk-sotong.svg",
                alt: { ms: "sotong bakar", en: "grilled squid", es: "calamar a la parrilla" },
                w: 720,
                h: 420,
                className: "w-full h-auto max-h-64 object-contain rounded-xl",
              },
            ],
            nama: [{ ms: "sotong bakar", en: "grilled squid", es: "calamar a la parrilla" }],
          },
        },
        {
          id: "c7-sotong-celup-tepung",
          cells: {
            img: [
              {
                kind: "image",
                src: "/assets/chapters/ch7/placeholder-lauk-sotong.svg",
                alt: { ms: "sotong celup tepung", en: "battered fried squid", es: "calamar rebozado" },
                w: 720,
                h: 420,
                className: "w-full h-auto max-h-64 object-contain rounded-xl",
              },
            ],
            nama: [{ ms: "sotong celup tepung", en: "battered fried squid", es: "calamar rebozado" }],
          },
        },
      ],
    },
    {
      id: "c7-p5-jenis-kuih",
      kind: "table",
      title: {
        ms: "Makanan Tradisional / Kuih - Jenis Kuih",
        en: "Traditional Food / Kuih - Types of Kuih",
        es: "Comida Tradicional / Kuih - Tipos de Kuih",
      },
      columns: [
        {
          key: "img",
          label: { ms: "Gambar", en: "Image", es: "Imagen" },
        },
        {
          key: "nama",
          label: { ms: "Nama", en: "Name", es: "Nombre" },
        },
      ],
      rows: [
        {
          id: "c7-kuih-karipap",
          cells: {
            img: [
              {
                kind: "image",
                src: "/assets/chapters/ch7/placeholder-kuih.svg",
                alt: { ms: "karipap", en: "curry puff", es: "empanadilla de curry" },
                w: 720,
                h: 420,
                className: "w-full h-auto max-h-64 object-contain rounded-xl",
              },
            ],
            nama: [{ ms: "karipap", en: "curry puff", es: "empanadilla de curry" }],
          },
        },
        {
          id: "c7-kuih-lapis",
          cells: {
            img: [
              {
                kind: "image",
                src: "/assets/chapters/ch7/placeholder-kuih.svg",
                alt: { ms: "kuih lapis", en: "layer kuih", es: "kuih en capas" },
                w: 720,
                h: 420,
                className: "w-full h-auto max-h-64 object-contain rounded-xl",
              },
            ],
            nama: [{ ms: "kuih lapis", en: "layer kuih", es: "kuih en capas" }],
          },
        },
        {
          id: "c7-kuih-sagu",
          cells: {
            img: [
              {
                kind: "image",
                src: "/assets/chapters/ch7/placeholder-kuih.svg",
                alt: { ms: "kuih sagu", en: "sago kuih", es: "kuih de sagu" },
                w: 720,
                h: 420,
                className: "w-full h-auto max-h-64 object-contain rounded-xl",
              },
            ],
            nama: [{ ms: "kuih sagu", en: "sago kuih", es: "kuih de sagu" }],
          },
        },
        {
          id: "c7-kuih-pelita",
          cells: {
            img: [
              {
                kind: "image",
                src: "/assets/chapters/ch7/placeholder-kuih.svg",
                alt: { ms: "kuih pelita", en: "kuih pelita", es: "kuih pelita" },
                w: 720,
                h: 420,
                className: "w-full h-auto max-h-64 object-contain rounded-xl",
              },
            ],
            nama: [{ ms: "kuih pelita", en: "kuih pelita", es: "kuih pelita" }],
          },
        },
        {
          id: "c7-kuih-onde-onde",
          cells: {
            img: [
              {
                kind: "image",
                src: "/assets/chapters/ch7/placeholder-kuih.svg",
                alt: { ms: "onde-onde", en: "onde-onde", es: "onde-onde" },
                w: 720,
                h: 420,
                className: "w-full h-auto max-h-64 object-contain rounded-xl",
              },
            ],
            nama: [{ ms: "onde-onde", en: "onde-onde", es: "onde-onde" }],
          },
        },
        {
          id: "c7-kuih-apam",
          cells: {
            img: [
              {
                kind: "image",
                src: "/assets/chapters/ch7/placeholder-kuih.svg",
                alt: { ms: "apam", en: "apam", es: "apam" },
                w: 720,
                h: 420,
                className: "w-full h-auto max-h-64 object-contain rounded-xl",
              },
            ],
            nama: [{ ms: "apam", en: "apam", es: "apam" }],
          },
        },
        {
          id: "c7-kuih-roti-jala",
          cells: {
            img: [
              {
                kind: "image",
                src: "/assets/chapters/ch7/placeholder-kuih.svg",
                alt: { ms: "roti jala", en: "net crepe", es: "crepa de red" },
                w: 720,
                h: 420,
                className: "w-full h-auto max-h-64 object-contain rounded-xl",
              },
            ],
            nama: [{ ms: "roti jala", en: "net crepe", es: "crepa de red" }],
          },
        },
        {
          id: "c7-kuih-seri-muka",
          cells: {
            img: [
              {
                kind: "image",
                src: "/assets/chapters/ch7/placeholder-kuih.svg",
                alt: { ms: "seri muka", en: "seri muka", es: "seri muka" },
                w: 720,
                h: 420,
                className: "w-full h-auto max-h-64 object-contain rounded-xl",
              },
            ],
            nama: [{ ms: "seri muka", en: "seri muka", es: "seri muka" }],
          },
        },
        {
          id: "c7-kuih-bingka",
          cells: {
            img: [
              {
                kind: "image",
                src: "/assets/chapters/ch7/placeholder-kuih.svg",
                alt: { ms: "bingka", en: "bingka", es: "bingka" },
                w: 720,
                h: 420,
                className: "w-full h-auto max-h-64 object-contain rounded-xl",
              },
            ],
            nama: [{ ms: "bingka", en: "bingka", es: "bingka" }],
          },
        },
        {
          id: "c7-kuih-nasi-manis",
          cells: {
            img: [
              {
                kind: "image",
                src: "/assets/chapters/ch7/placeholder-kuih.svg",
                alt: { ms: "nasi manis", en: "sweet sticky rice dessert", es: "postre de arroz dulce" },
                w: 720,
                h: 420,
                className: "w-full h-auto max-h-64 object-contain rounded-xl",
              },
            ],
            nama: [{ ms: "nasi manis", en: "sweet sticky rice dessert", es: "postre de arroz dulce" }],
          },
        },
      ],
    },
    {
      id: "c7-p6-chat-membeli-kuih",
      kind: "chat",
      youId: "ahmad",
      title: {
        ms: "Situasi 7.1 Membeli Kuih-muih",
        en: "Situation 7.1 Buying Kuih",
        es: "Situacion 7.1 Comprar Kuih",
      },
      context: {
        ms: "Latar tempat: Pasar malam dan kolej kediaman.",
        en: "Setting: Night market and residential college.",
        es: "Lugar: Mercado nocturno y residencia universitaria.",
      },
      participants: [
        {
          id: "azman",
          name: { ms: "Azman", en: "Azman", es: "Azman" },
          avatarSrc: "/assets/characters/Bandicoot_Profile.png",
        },
        {
          id: "ahmad",
          name: { ms: "Ahmad", en: "Ahmad", es: "Ahmad" },
        },
      ],
      messages: [
        {
          id: "c7-71-m1",
          from: "azman",
          text: { ms: "Ahmad...", en: "Ahmad...", es: "Ahmad..." },
        },
        {
          id: "c7-71-m2",
          from: "ahmad",
          text: { ms: "Sampai pun.", en: "You finally arrived.", es: "Por fin llegaste." },
        },
        {
          id: "c7-71-m3",
          from: "azman",
          text: {
            ms: "Cuba awak tengok kuih-kuih ni. Saya beli di pasar malam tadi. Semuanya nampak sedap.",
            en: "Try looking at these kuih. I bought them at the night market earlier. They all look delicious.",
            es: "Mira estos kuih. Los compre en el mercado nocturno. Todos se ven deliciosos.",
          },
        },
        {
          id: "c7-71-m4",
          from: "ahmad",
          text: { ms: "Yalah, banyaknya kuih.", en: "Wow, so many kuih.", es: "Vaya, hay muchisimos kuih." },
        },
        {
          id: "c7-71-m5",
          from: "azman",
          text: { ms: "Banyak kan? Saya beli khas untuk awak.", en: "A lot, right? I bought them specially for you.", es: "Muchos, verdad? Los compre especialmente para ti." },
        },
        {
          id: "c7-71-m6",
          from: "ahmad",
          text: { ms: "Wah!", en: "Wow!", es: "Guau!" },
        },
        {
          id: "c7-71-m7",
          from: "azman",
          text: { ms: "Awak suka makan kuih apa?", en: "What kuih do you like to eat?", es: "Que kuih te gusta comer?" },
        },
        {
          id: "c7-71-m8",
          from: "ahmad",
          text: {
            ms: "Saya suka makan kuih lapis dan tepung pelita.",
            en: "I like kuih lapis and tepung pelita.",
            es: "Me gustan el kuih lapis y el tepung pelita.",
          },
        },
        {
          id: "c7-71-m9",
          from: "azman",
          text: {
            ms: "Tepung pelita. Saya ada beli untuk awak.",
            en: "Tepung pelita. I bought it for you.",
            es: "Tepung pelita. Compre para ti.",
          },
        },
        {
          id: "c7-71-m10",
          from: "ahmad",
          text: { ms: "Sedap ni.", en: "This is tasty.", es: "Esto esta rico." },
        },
        {
          id: "c7-71-m11",
          from: "azman",
          text: { ms: "Saya beli karipap.", en: "I bought karipap.", es: "Compre karipap." },
        },
        {
          id: "c7-71-m12",
          from: "ahmad",
          text: { ms: "Wah!", en: "Wow!", es: "Guau!" },
        },
        {
          id: "c7-71-m13",
          from: "azman",
          text: { ms: "Saya beli kuih sagu.", en: "I bought kuih sagu.", es: "Compre kuih sagu." },
        },
        {
          id: "c7-71-m14",
          from: "ahmad",
          text: { ms: "Wah!", en: "Wow!", es: "Guau!" },
        },
        {
          id: "c7-71-m15",
          from: "azman",
          text: { ms: "Nasi manis.", en: "Sweet rice dessert.", es: "Postre de arroz dulce." },
        },
        {
          id: "c7-71-m16",
          from: "ahmad",
          text: { ms: "Wah!", en: "Wow!", es: "Guau!" },
        },
        {
          id: "c7-71-m17",
          from: "azman",
          text: {
            ms: "Selain tepung pelita, awak suka makan kuih apa?",
            en: "Other than tepung pelita, what kuih do you like?",
            es: "Ademas de tepung pelita, que kuih te gusta?",
          },
        },
        {
          id: "c7-71-m18",
          from: "ahmad",
          text: {
            ms: "Saya suka makan kuih apam dan roti jala.",
            en: "I like apam and roti jala.",
            es: "Me gustan el apam y el roti jala.",
          },
        },
        {
          id: "c7-71-m19",
          from: "azman",
          text: {
            ms: "Kalau saya pula, saya suka makan kuih onde-onde. Lepas itu, lepat pisang. Tetapi, tadi tidak jumpalah.",
            en: "As for me, I like onde-onde. After that, lepat pisang. But I could not find it earlier.",
            es: "En mi caso, me gusta el onde-onde. Despues, el lepat pisang. Pero no lo encontre antes.",
          },
        },
        {
          id: "c7-71-m20",
          from: "ahmad",
          text: {
            ms: "Tidak mengapa. Kita makan dulu ni. Nanti kita pergi beli lain kali.",
            en: "Its okay. Lets eat these first. Next time we can go buy more.",
            es: "No pasa nada. Comamos esto primero. La proxima vez iremos a comprar mas.",
          },
        },
      ],
    },
    {
      id: "c7-p7-chat-beli-nasi-lauk",
      kind: "chat",
      youId: "ahmad",
      title: {
        ms: "Situasi 7.2 Membeli Nasi dan Lauk-pauk",
        en: "Situation 7.2 Buying Rice and Side Dishes",
        es: "Situacion 7.2 Comprar Arroz y Guarniciones",
      },
      context: {
        ms: "Latar tempat: Sebuah restoran.",
        en: "Setting: A restaurant.",
        es: "Lugar: Un restaurante.",
      },
      participants: [
        {
          id: "adam",
          name: { ms: "Adam", en: "Adam", es: "Adam" },
          avatarSrc: "/assets/characters/Bandicoot_Profile.png",
        },
        {
          id: "ahmad",
          name: { ms: "Ahmad", en: "Ahmad", es: "Ahmad" },
        },
      ],
      messages: [
        {
          id: "c7-72-m1",
          from: "adam",
          text: { ms: "Ahmad.", en: "Ahmad.", es: "Ahmad." },
        },
        {
          id: "c7-72-m2",
          from: "ahmad",
          text: { ms: "Ya.", en: "Yes.", es: "Si." },
        },
        {
          id: "c7-72-m3",
          from: "adam",
          text: {
            ms: "Di restoran sana ada menjual pelbagai jenis nasi dan lauk-pauk. Jom kita pergi tengok.",
            en: "That restaurant over there sells many types of rice and side dishes. Lets go take a look.",
            es: "Ese restaurante de alla vende muchos tipos de arroz y guarniciones. Vamos a ver.",
          },
        },
        {
          id: "c7-72-m4",
          from: "ahmad",
          text: { ms: "Jom.", en: "Lets go.", es: "Vamos." },
        },
        {
          id: "c7-72-m5",
          from: "adam",
          text: {
            ms: "... (Tiba di restoran)",
            en: "... (Arriving at the restaurant)",
            es: "... (Llegando al restaurante)",
          },
        },
        {
          id: "c7-72-m6",
          from: "adam",
          text: {
            ms: "Wah! Banyaknya pilihan. Ada nasi ayam, nasi lemak, nasi kerabu, nasi dagang dan nasi tomato.",
            en: "Wow! So many choices. There is chicken rice, nasi lemak, nasi kerabu, nasi dagang and tomato rice.",
            es: "Guau! Hay muchisimas opciones. Hay nasi ayam, nasi lemak, nasi kerabu, nasi dagang y nasi tomato.",
          },
        },
        {
          id: "c7-72-m7",
          from: "ahmad",
          text: {
            ms: "Saya hendak nasi kerabu.",
            en: "I want nasi kerabu.",
            es: "Quiero nasi kerabu.",
          },
        },
        {
          id: "c7-72-m8",
          from: "adam",
          text: {
            ms: "Saya pula hendak nasi ayam.",
            en: "I want chicken rice.",
            es: "Yo quiero nasi ayam.",
          },
        },
        {
          id: "c7-72-m9",
          from: "adam",
          text: {
            ms: "Tengok, ada lauk ayam masak merah, ikan goreng, daging bakar dan banyak lagi. Sungguh menyerlahkan.",
            en: "Look, there is red chili chicken, fried fish, grilled beef and many more. It is really impressive.",
            es: "Mira, hay pollo en salsa roja, pescado frito, carne asada y mucho mas. Realmente impresionante.",
          },
        },
        {
          id: "c7-72-m10",
          from: "ahmad",
          text: { ms: "Betul tu.", en: "Thats true.", es: "Es cierto." },
        },
      ],
    },
  ],
};
