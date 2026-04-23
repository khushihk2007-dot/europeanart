export type Painting = {
  title: string;
  artist: string;
  year: string;
  description: string;
  image: string;
};

// Image URLs from Wikimedia Commons (public domain) via the hotlink-friendly
// Special:FilePath endpoint, which 302->301->200 to the right thumbnail.
// Pass the bare filename (last segment) — the helper handles encoding + width.
const wm = (file: string, w = 800) => {
  const filename = file.split("/").pop() ?? file;
  return `https://commons.wikimedia.org/wiki/Special:FilePath/${filename}?width=${w}`;
};

export const paintings: Painting[] = [
  {
    title: "The Creation of Adam",
    artist: "Michelangelo",
    year: "c. 1512",
    description:
      "A fresco on the Sistine Chapel ceiling depicting God breathing life into Adam through the touch of a finger.",
    image: wm("a/a0/Michelangelo_-_Creation_of_Adam_%28cropped%29.jpg"),
  },
  {
    title: "Napoleon Crossing the Alps",
    artist: "Jacques-Louis David",
    year: "1801",
    description:
      "An idealized equestrian portrait of Napoleon Bonaparte leading his army through the Great St. Bernard Pass.",
    image: wm("Jacques-Louis_David_-_Bonaparte_franchissant_le_Grand_Saint-Bernard%2C_20_mai_1800_-_Google_Art_Project.jpg"),
  },
  {
    title: "Mona Lisa",
    artist: "Leonardo da Vinci",
    year: "c. 1503",
    description:
      "The world's most famous portrait, celebrated for its enigmatic smile and pioneering sfumato technique.",
    image: wm("e/ec/Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg"),
  },
  {
    title: "Ophelia",
    artist: "John Everett Millais",
    year: "1851–52",
    description:
      "A Pre-Raphaelite masterpiece showing Hamlet's Ophelia singing as she drowns in a flower-strewn brook.",
    image: wm("9/9b/John_Everett_Millais_-_Ophelia_-_Google_Art_Project.jpg"),
  },
  {
    title: "Girl with a Pearl Earring",
    artist: "Johannes Vermeer",
    year: "c. 1665",
    description:
      "A luminous tronie of a girl in exotic dress, often called the 'Mona Lisa of the North'.",
    image: wm("0/0f/1665_Girl_with_a_Pearl_Earring.jpg"),
  },
  {
    title: "The Kiss",
    artist: "Gustav Klimt",
    year: "1907–08",
    description:
      "A gilded Symbolist icon of two lovers entwined, painted during Klimt's celebrated Golden Period.",
    image: wm("4/40/The_Kiss_-_Gustav_Klimt_-_Google_Cultural_Institute.jpg"),
  },
  {
    title: "Vanity",
    artist: "Auguste Toulmouche",
    year: "1890",
    description:
      "An academic portrait of a young woman admiring herself in the mirror, embodying Belle Époque elegance.",
    image: wm("Auguste_Toulmouche_-_Vanity.jpg"),
  },
  {
    title: "The Starry Night",
    artist: "Vincent van Gogh",
    year: "1889",
    description:
      "A swirling night sky over a Provençal village, painted from Van Gogh's asylum window in Saint-Rémy.",
    image: wm("e/ea/Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg"),
  },
  {
    title: "The Birth of Venus",
    artist: "Sandro Botticelli",
    year: "c. 1485",
    description:
      "The Roman goddess Venus arrives on the shore of Cyprus, born of sea foam — a Renaissance triumph.",
    image: wm("0/0b/Sandro_Botticelli_-_La_nascita_di_Venere_-_Google_Art_Project_-_edited.jpg"),
  },
  {
    title: "Liberty Leading the People",
    artist: "Eugène Delacroix",
    year: "1830",
    description:
      "An allegory of the July Revolution with Liberty personified raising the tricolour over the barricades.",
    image: wm("0/05/Eug%C3%A8ne_Delacroix_-_Le_28_Juillet._La_Libert%C3%A9_guidant_le_peuple.jpg"),
  },
  {
    title: "Impression, Sunrise",
    artist: "Claude Monet",
    year: "1872",
    description:
      "The hazy harbour of Le Havre at dawn — the painting that gave the Impressionist movement its name.",
    image: wm("5/59/Monet_-_Impression%2C_Sunrise.jpg"),
  },
  {
    title: "The Luncheon of the Boating Party",
    artist: "Pierre-Auguste Renoir",
    year: "1880–81",
    description:
      "A sunlit gathering of Renoir's friends on a Seine-side balcony, brimming with conviviality and light.",
    image: wm("8/89/Pierre-Auguste_Renoir_-_Luncheon_of_the_Boating_Party_-_Google_Art_Project.jpg"),
  },
  {
    title: "A Sunday on La Grande Jatte",
    artist: "Georges Seurat",
    year: "1884–86",
    description:
      "Parisians at leisure rendered in millions of dots — the masterpiece of Pointillism.",
    image: wm("7/7e/A_Sunday_on_La_Grande_Jatte%2C_Georges_Seurat%2C_1884.jpg"),
  },
  {
    title: "Olympia",
    artist: "Édouard Manet",
    year: "1863",
    description:
      "A confronting modern nude that scandalised the Paris Salon and helped birth modern art.",
    image: wm("5/5c/Edouard_Manet_-_Olympia_-_Google_Art_Project_3.jpg"),
  },
  {
    title: "The Gleaners",
    artist: "Jean-François Millet",
    year: "1857",
    description:
      "Three peasant women gathering leftover grain — a dignified Realist tribute to rural labour.",
    image: wm("9/97/Jean-Fran%C3%A7ois_Millet_-_Gleaners_-_Google_Art_Project_2.jpg"),
  },
  {
    title: "The Raft of the Medusa",
    artist: "Théodore Géricault",
    year: "1818–19",
    description:
      "A monumental Romantic canvas dramatising the harrowing aftermath of a French naval shipwreck.",
    image: wm("9/91/JEAN_LOUIS_TH%C3%89ODORE_G%C3%89RICAULT_-_La_Balsa_de_la_Medusa_%28Museo_del_Louvre%2C_1818-19%29.jpg"),
  },
  {
    title: "The Death of Marat",
    artist: "Jacques-Louis David",
    year: "1793",
    description:
      "A solemn neoclassical portrait of the murdered revolutionary, painted as political martyrdom.",
    image: wm("b/b6/Death_of_Marat_by_David.jpg"),
  },
  {
    title: "The Grande Odalisque",
    artist: "Jean-Auguste-Dominique Ingres",
    year: "1814",
    description:
      "An elongated reclining nude blending Neoclassical line with sensuous Orientalist fantasy.",
    image: wm("Grande_Odalisque.jpg"),
  },
  {
    title: "The Card Players",
    artist: "Paul Cézanne",
    year: "1890–95",
    description:
      "A quiet scene of Provençal peasants at cards — a cornerstone of post-Impressionist composition.",
    image: wm("Paul_C%C3%A9zanne%2C_Les_joueurs_de_carte_%281892-95%29.jpg"),
  },
  {
    title: "Bal du moulin de la Galette",
    artist: "Pierre-Auguste Renoir",
    year: "1876",
    description:
      "Dappled Sunday light falls on Parisians dancing at a Montmartre open-air café.",
    image: wm("2/2b/Pierre-Auguste_Renoir%2C_Le_Moulin_de_la_Galette.jpg"),
  },
  {
    title: "The School of Athens",
    artist: "Raphael",
    year: "1509–11",
    description:
      "A grand Vatican fresco gathering the great philosophers of antiquity beneath classical arches.",
    image: wm("9/94/%22The_School_of_Athens%22_by_Raffaello_Sanzio_da_Urbino.jpg"),
  },
  {
    title: "Las Meninas",
    artist: "Diego Velázquez",
    year: "1656",
    description:
      "A dazzling court scene that plays with reflection, gaze, and the role of the painter himself.",
    image: wm("3/32/Las_Meninas%2C_by_Diego_Vel%C3%A1zquez%2C_from_Prado_in_Google_Earth.jpg"),
  },
  {
    title: "The Night Watch",
    artist: "Rembrandt van Rijn",
    year: "1642",
    description:
      "A Dutch militia bursts into theatrical motion — Rembrandt's masterwork of light and group portraiture.",
    image: wm("3/30/The_Night_Watch_-_HD.jpg"),
  },
  {
    title: "The Garden of Earthly Delights",
    artist: "Hieronymus Bosch",
    year: "c. 1500",
    description:
      "A surreal triptych voyaging from Eden through a teeming earthly paradise into a nightmarish hell.",
    image: wm("a/ae/The_Garden_of_earthly_delights.jpg"),
  },
  {
    title: "The Hay Wain",
    artist: "John Constable",
    year: "1821",
    description:
      "A quintessentially English river scene that helped shape modern landscape painting.",
    image: wm("8/89/John_Constable_The_Hay_Wain.jpg"),
  },
  {
    title: "The Fighting Temeraire",
    artist: "J. M. W. Turner",
    year: "1839",
    description:
      "A storied warship is towed to its breaking yard at sunset — a Romantic elegy for an era's end.",
    image: wm("9/98/Turner%2C_J._M._W._-_The_Fighting_T%C3%A9m%C3%A9raire_tugged_to_her_last_Berth_to_be_broken.jpg"),
  },
  {
    title: "Wanderer above the Sea of Fog",
    artist: "Caspar David Friedrich",
    year: "1818",
    description:
      "A lone figure surveys a misty alpine vista — the defining image of German Romanticism.",
    image: wm("b/b9/Caspar_David_Friedrich_-_Wanderer_above_the_sea_of_fog.jpg"),
  },
  {
    title: "Primavera",
    artist: "Sandro Botticelli",
    year: "c. 1480",
    description:
      "An allegory of spring populated by mythological figures dancing in a flowering grove.",
    image: wm("b/bb/Botticelli-primavera.jpg"),
  },
  {
    title: "The Lady of Shalott",
    artist: "John William Waterhouse",
    year: "1888",
    description:
      "A Pre-Raphaelite vision of Tennyson's doomed lady drifting toward Camelot.",
    image: wm("4/4b/John_William_Waterhouse_-_The_Lady_of_Shalott_-_Google_Art_Project_edit.jpg"),
  },
  {
    title: "The Third of May 1808",
    artist: "Francisco Goya",
    year: "1814",
    description:
      "A searing protest against the brutality of Napoleonic troops executing Spanish civilians.",
    image: wm("4/41/El_Tres_de_Mayo%2C_by_Francisco_de_Goya%2C_from_Prado_thin_black_margin.jpg"),
  },
  {
    title: "Café Terrace at Night",
    artist: "Vincent van Gogh",
    year: "1888",
    description:
      "Gaslit warmth spills onto the cobbles of a starlit Arles square in vivid yellows and blues.",
    image: wm("0/0a/Vincent_Willem_van_Gogh_-_Cafe_Terrace_at_Night_%28Yorck%29.jpg"),
  },
  {
    title: "The Swing",
    artist: "Jean-Honoré Fragonard",
    year: "1767",
    description:
      "A frothy Rococo flirtation in a sunlit garden — silk, secrets and a daring kicked-off slipper.",
    image: wm("Fragonard%2C_The_Swing.jpg"),
  },
];
