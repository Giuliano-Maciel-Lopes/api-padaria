import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const products = [
  // ACHOCOLATADOS
  {
    name: "chocolate em pó",
    category: "achocolatados",
    price: 6.49,
    description: "Chocolate em pó para bebidas e receitas.",
    imageUrl: "/fotos/achocolatados/chocolate em po.png",
  },
  {
    name: "creme de leite",
    category: "achocolatados",
    price: 3.99,
    description: "Creme de leite fresco para diversas preparações.",
    imageUrl: "/fotos/achocolatados/creme de leite.png",
  },
  {
    name: "leite em pó",
    category: "achocolatados",
    price: 4.99,
    description: "Leite em pó de alta qualidade e sabor.",
    imageUrl: "/fotos/achocolatados/leite em po.png",
  },
  {
    name: "nescau",
    category: "achocolatados",
    price: 4.49,
    description: "Achocolatado em pó saboroso e prático.",
    imageUrl: "/fotos/achocolatados/nescau.png",
  },

  // BEBIDAS
  {
    name: "café personalizado",
    category: "bebidas",
    price: 6.99,
    description: "Café personalizado para o seu momento.",
    imageUrl: "/fotos/bebidas/cafe-personalizado.png",
  },
  {
    name: "capuccino",
    category: "bebidas",
    price: 5.99,
    description: "Delicioso capuccino cremoso e quentinho.",
    imageUrl: "/fotos/bebidas/capuccino.png",
  },
  {
    name: "coca-cola",
    category: "bebidas",
    price: 3.99,
    description: "Refrigerante clássico para qualquer ocasião.",
    imageUrl: "/fotos/bebidas/coca.png",
  },
  {
    name: "gatorade",
    category: "bebidas",
    price: 4.99,
    description: "Bebida isotônica para hidratação rápida.",
    imageUrl: "/fotos/bebidas/gatorade.png",
  },
  {
    name: "leite",
    category: "bebidas",
    price: 3.49,
    description: "Leite fresco e nutritivo.",
    imageUrl: "/fotos/bebidas/leite.png",
  },
  {
    name: "refrigerante",
    category: "bebidas",
    price: 3.99,
    description: "Refrigerantes variados para sua escolha.",
    imageUrl: "/fotos/bebidas/refrigerantes.png",
  },

  // BOLOS E TORTAS
  {
    name: "bola de morango",
    category: "bolos-e-tortas",
    price: 14.99,
    description: "Bolo de morango fresco e saboroso.",
    imageUrl: "/fotos/bolos-e-tortas/bola de morango.png",
  },
  {
    name: "bolo de oreo",
    category: "bolos-e-tortas",
    price: 17.99,
    description: "Bolo cremoso com pedaços de Oreo.",
    imageUrl: "/fotos/bolos-e-tortas/bolo de oreo.png",
  },
  {
    name: "bolo de chocolate",
    category: "bolos-e-tortas",
    price: 13.99,
    description: "Bolo de chocolate delicioso e macio.",
    imageUrl: "/fotos/bolos-e-tortas/bolo_de_chocolate.png",
  },
  {
    name: "torta de frutas",
    category: "bolos-e-tortas",
    price: 15.99,
    description: "Torta com frutas frescas e creme suave.",
    imageUrl: "/fotos/bolos-e-tortas/torta_de_frutas.png",
  },

  // COMBOS
  {
    name: "combo café da manhã",
    category: "combos",
    price: 19.99,
    description: "Combo especial para seu café da manhã.",
    imageUrl: "/fotos/combos/combo cafe da manha.png",
  },
  {
    name: "combo de salgados",
    category: "combos",
    price: 24.99,
    description: "Variedade de salgados para seu lanche.",
    imageUrl: "/fotos/combos/combo de salgados.png",
  },

  // DOCES
  {
    name: "doce de leite",
    category: "doces",
    price: 5.99,
    description: "Doce de leite caseiro e cremoso.",
    imageUrl: "/fotos/doces/doce de leite.png",
  },
  {
    name: "macarone",
    category: "doces",
    price: 4.99,
    description: "Macarons delicados e coloridos.",
    imageUrl: "/fotos/doces/macarone.png",
  },
  {
    name: "milkshake",
    category: "doces",
    price: 7.99,
    description: "Milkshake gelado com sabor intenso.",
    imageUrl: "/fotos/doces/milkshake.png",
  },
  {
    name: "panqueca de chocolate e sorvete",
    category: "doces",
    price: 11.99,
    description: "Panqueca doce com chocolate e sorvete.",
    imageUrl: "/fotos/doces/panqueca de chocolate e sorvete.png",
  },
  {
    name: "rosquinhas",
    category: "doces",
    price: 5.99,
    description: "Rosquinhas fresquinhas para o lanche.",
    imageUrl: "/fotos/doces/rosquinhas.png",
  },

  // PÃES
  {
    name: "croissant",
    category: "paes",
    price: 4.49,
    description: "Croissant amanteigado e folhado.",
    imageUrl: "/fotos/paes/croissant.png",
  },
  {
    name: "pães de queijo",
    category: "paes",
    price: 5.49,
    description: "Pães de queijo quentinhos e saborosos.",
    imageUrl: "/fotos/paes/paes de queijo.png",
  },
  {
    name: "pão doce",
    category: "paes",
    price: 3.99,
    description: "Pão doce macio com toque especial.",
    imageUrl: "/fotos/paes/pao doce.png",
  },
  {
    name: "pão francês",
    category: "paes",
    price: 2.99,
    description: "Pão francês fresquinho do dia.",
    imageUrl: "/fotos/paes/pao frances.png",
  },

  // QUEIJOS
  {
    name: "queijo branco caseiro",
    category: "queijos",
    price: 9.99,
    description: "Queijo branco caseiro, sabor tradicional.",
    imageUrl: "/fotos/queijos/queijo branco caseiro.png",
  },
  {
    name: "queijo coalho",
    category: "queijos",
    price: 11.99,
    description: "Queijo coalho perfeito para churrasco.",
    imageUrl: "/fotos/queijos/queijo coalho.png",
  },
  {
    name: "queijo gorgonzola",
    category: "queijos",
    price: 14.99,
    description: "Queijo gorgonzola forte e cremoso.",
    imageUrl: "/fotos/queijos/queijo gorgonzola.png",
  },
  {
    name: "queijo gourmet",
    category: "queijos",
    price: 13.99,
    description: "Queijo gourmet para paladares exigentes.",
    imageUrl: "/fotos/queijos/queijo gourmet.png",
  },
  {
    name: "queijo minas",
    category: "queijos",
    price: 10.99,
    description: "Queijo minas tradicional mineiro.",
    imageUrl: "/fotos/queijos/queijo minas.png",
  },

  // SALGADOS
  {
    name: "coxinha",
    category: "salgados",
    price: 4.99,
    description: "Coxinha crocante e recheada.",
    imageUrl: "/fotos/salgados/coxinha.png",
  },
  {
    name: "coxinhas",
    category: "salgados",
    price: 5.49,
    description: "Coxinhas fresquinhas para seu lanche.",
    imageUrl: "/fotos/salgados/coxinhas.png",
  },
  {
    name: "kibis",
    category: "salgados",
    price: 5.99,
    description: "Kibis crocantes e saborosos.",
    imageUrl: "/fotos/salgados/kibis.png",
  },
  {
    name: "pastel",
    category: "salgados",
    price: 4.49,
    description: "Pastel quentinho e recheado.",
    imageUrl: "/fotos/salgados/pastel.png",
  },

  // SANDUÍCHES
  {
    name: "sanduíche alface tomate",
    category: "sanduiches",
    price: 6.99,
    description: "Sanduíche leve com alface e tomate.",
    imageUrl: "/fotos/sanduiches/sanduiche alface tomate.png",
  },
];

export async  function ProductsSedd() {
  console.log("Starting seed...");

  for (const product of products) {
    try {
      await prisma.product.create({ data: product });
      console.log(`Created product: ${product.name}`);
    } catch (error) {
      console.error(`Failed to create product: ${product.name}`, error);
    }
  }

  console.log("Seed finished.");
 
}


