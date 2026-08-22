// search-data.js — All searchable content for the site

const SEARCH_DATA = [
  // ── FILMS ─────────────────────────────────────────────
  {
    type: 'Film', title: 'Legally Blonde',
    desc: 'Elle Woods navigates Harvard Law. A feminist comedy icon. Grossed $141M worldwide.',
    tags: 'comedy feminist elle woods harvard law pink',
    img: 'reesewitherspoon/reesewitherspoon_1578332631_2215537149606891783_367315644.jpg',
    url: 'films.html', year: '2001'
  },
  {
    type: 'Film', title: 'Walk the Line',
    desc: 'Oscar-winning portrayal of June Carter Cash. Golden Globe. SAG Award. $186M box office.',
    tags: 'oscar award june carter cash country music biography walk line',
    img: 'reesewitherspoon/reesewitherspoon_1579536534_2225636222863195125_367315644.jpg',
    url: 'films.html', year: '2005'
  },
  {
    type: 'Film', title: 'Sweet Home Alabama',
    desc: 'Romantic comedy grossing $180M worldwide. New York fashion designer returns to her Southern roots.',
    tags: 'sweet home alabama romantic comedy south',
    img: 'reesewitherspoon/primevideo_1738771222_3561393602053836340_1684102154.jpg',
    url: 'films.html', year: '2002'
  },
  {
    type: 'Film', title: 'Wild',
    desc: 'Oscar-nominated. Reese produced and starred. Based on Cheryl Strayed\'s memoir of her Pacific Crest Trail hike.',
    tags: 'wild oscar nominated producer cheryl strayed hiking adventure',
    img: 'reesewitherspoon/reesewitherspoon_1583010420_2254777285947219792_367315644.jpg',
    url: 'films.html', year: '2014'
  },
  {
    type: 'Film', title: 'Election',
    desc: 'Dark comedy. Tracy Flick. Golden Globe nominated breakthrough performance directed by Alexander Payne.',
    tags: 'election tracy flick dark comedy golden globe alexander payne',
    img: 'reesewitherspoon/reesewitherspoon_1577901649_2211921814496504844_367315644.jpg',
    url: 'films.html', year: '1999'
  },
  {
    type: 'Film', title: 'Cruel Intentions',
    desc: 'Modern retelling of Les Liaisons Dangereuses. Stars alongside Ryan Phillippe.',
    tags: 'cruel intentions teen drama ryan phillippe romance',
    img: 'reesewitherspoon/reesewitherspoon_1578012068_2212848069828112141_367315644.jpg',
    url: 'films.html', year: '1999'
  },
  {
    type: 'Film', title: 'Pleasantville',
    desc: 'Fantasy drama alongside Tobey Maguire. Two siblings transported into a 1950s TV show.',
    tags: 'pleasantville fantasy 1950s tobey maguire color',
    img: 'reesewitherspoon/reesewitherspoon_1570494823_2149788856218626605_367315644.jpg',
    url: 'films.html', year: '1998'
  },
  {
    type: 'Film', title: 'Water for Elephants',
    desc: 'Depression-era circus love story with Robert Pattinson. Based on Sara Gruen\'s beloved novel.',
    tags: 'water elephants circus robert pattinson period romance sara gruen',
    img: 'reesewitherspoon/reesewitherspoon_1580749895_2235814635028670860_367315644.jpg',
    url: 'films.html', year: '2011'
  },
  {
    type: 'Film', title: 'The Man in the Moon',
    desc: 'Professional debut at age 14. A teenage girl experiencing first love. Critics immediately took notice.',
    tags: 'man moon debut teenage first love 1991',
    img: 'reesewitherspoon/reesewitherspoon_1566064330_2112623179871571534_367315644.jpg',
    url: 'films.html', year: '1991'
  },
  {
    type: 'Film', title: 'Your Place or Mine',
    desc: 'Netflix romantic comedy starring Reese Witherspoon and Ashton Kutcher. Produced by Hello Sunshine.',
    tags: 'your place mine netflix comedy ashton kutcher hello sunshine',
    img: 'reesewitherspoon/reesewitherspoon_1631032626_2657616754214583213_367315644.jpg',
    url: 'films.html', year: '2023'
  },

  // ── TV SERIES ──────────────────────────────────────────
  {
    type: 'TV Series', title: 'The Morning Show',
    desc: 'Apple TV+ drama. Stars alongside Jennifer Aniston. Bold exploration of gender and power in morning news.',
    tags: 'morning show apple tv jennifer aniston power gender news',
    img: 'reesewitherspoon/reesewitherspoon_1640021819_2733023570386325475_367315644.jpg',
    url: 'films.html#tv', year: '2019'
  },
  {
    type: 'TV Series', title: 'Big Little Lies',
    desc: 'Emmy Award winner. Executive producer and star. HBO ensemble drama with Nicole Kidman.',
    tags: 'big little lies hbo emmy award nicole kidman executive producer',
    img: 'reesewitherspoon/reesewitherspoon_1590170650_2314841648514737315_367315644.jpg',
    url: 'films.html#tv', year: '2017'
  },
  {
    type: 'TV Series', title: 'Little Fires Everywhere',
    desc: 'Hulu drama starring alongside Kerry Washington. Based on Celeste Ng\'s novel.',
    tags: 'little fires everywhere hulu kerry washington celeste ng race class',
    img: 'reesewitherspoon/reesewitherspoon_1591975593_2329982613323954854_367315644.jpg',
    url: 'films.html#tv', year: '2020'
  },
  {
    type: 'TV Series', title: 'Daisy Jones & The Six',
    desc: 'Amazon Prime rock drama. Produced through Hello Sunshine. Based on Taylor Jenkins Reid\'s novel.',
    tags: 'daisy jones six amazon prime rock music hello sunshine taylor jenkins reid',
    img: 'reesewitherspoon/reesesbookclub_1693063724_3177971311782487782_2249417883.jpg',
    url: 'films.html#tv', year: '2023'
  },

  // ── HELLO SUNSHINE ─────────────────────────────────────
  {
    type: 'Hello Sunshine', title: 'Where the Crawdads Sing',
    desc: 'Sony Pictures film produced by Hello Sunshine. Based on Delia Owens\' bestseller. $139M box office.',
    tags: 'crawdads sing sony hello sunshine delia owens book adaptation',
    img: 'reesewitherspoon/reesesbookclub_1693063724_3177971311740674109_2249417883.jpg',
    url: 'explore.html#hello-sunshine', year: '2022'
  },
  {
    type: 'Hello Sunshine', title: 'Gone Girl',
    desc: 'David Fincher thriller produced by Pacific Standard. $369M worldwide box office.',
    tags: 'gone girl david fincher pacific standard thriller',
    img: 'reesewitherspoon/reesewitherspoon_1583010420_2254777285947219792_367315644.jpg',
    url: 'films.html#produced', year: '2014'
  },

  // ── BOOK CLUB ──────────────────────────────────────────
  {
    type: 'Book Club', title: 'Reese\'s Book Club',
    desc: 'Millions of members, 100+ picks since 2017. The most influential book club in the world.',
    tags: 'book club reading women literature picks',
    img: 'reesewitherspoon/reesesbookclub_1693063724_3177971311774135084_2249417883.jpg',
    url: 'explore.html#bookclub', year: '2017'
  },
  {
    type: 'Book Club', title: 'Little Fires Everywhere (Book)',
    desc: 'Celeste Ng\'s acclaimed novel chosen by Reese\'s Book Club, later adapted to Hulu series.',
    tags: 'little fires everywhere celeste ng book club pick hulu',
    img: 'reesewitherspoon/reesesbookclub_1693063724_3177971311774082540_2249417883.jpg',
    url: 'explore.html#bookclub', year: '2018'
  },

  // ── ABOUT / BIO ────────────────────────────────────────
  {
    type: 'About', title: 'Academy Award — Best Actress',
    desc: 'Won the Oscar for Walk the Line (2006) playing June Carter Cash. Also won Golden Globe and SAG Award.',
    tags: 'oscar academy award best actress walk the line june carter cash 2006',
    img: 'reesewitherspoon/reesewitherspoon_1579478144_2225146406606465542_367315644.jpg',
    url: 'about.html', year: '2006'
  },
  {
    type: 'About', title: 'Hello Sunshine Founded',
    desc: 'Reese founded Hello Sunshine in 2016. Valued at $900M in 2021. Puts women at the center of every story.',
    tags: 'hello sunshine founded 2016 media company women stories 900 million',
    img: 'reesewitherspoon/people_1752166095_3673757936850124429_28759374.jpg',
    url: 'about.html#hello-sunshine', year: '2016'
  },
  {
    type: 'About', title: 'Nashville Roots',
    desc: 'Born in New Orleans, raised in Nashville, Tennessee. Attended Harpeth Hall School.',
    tags: 'nashville tennessee born new orleans raised childhood southern roots',
    img: 'reesewitherspoon/reesewitherspoon_1623598723_2595256651556757886_367315644.jpg',
    url: 'about.html', year: '1976'
  },
  {
    type: 'About', title: 'Emmy Award — Big Little Lies',
    desc: 'Won a Primetime Emmy as executive producer of Big Little Lies (2017). The show won 8 Emmys total.',
    tags: 'emmy award big little lies executive producer primetime 2017',
    img: 'reesewitherspoon/reesewitherspoon_1590170650_2314841648514737315_367315644.jpg',
    url: 'about.html', year: '2017'
  },

  // ── GALLERY ────────────────────────────────────────────
  {
    type: 'Gallery', title: 'Red Carpet Glamour',
    desc: 'Reese in a stunning black sequined gown. Iconic red carpet elegance.',
    tags: 'red carpet glamour gown black sequin fashion style',
    img: 'reesewitherspoon/reesewitherspoon_1579478144_2225146406606465542_367315644.jpg',
    url: 'gallery.html', year: '2023'
  },
  {
    type: 'Gallery', title: 'People Magazine Cover',
    desc: 'Featured on People Magazine — one of the most recognized faces in entertainment.',
    tags: 'people magazine cover editorial shoot portrait',
    img: 'reesewitherspoon/people_1752166095_3673757936850124429_28759374.jpg',
    url: 'gallery.html', year: '2024'
  },
  {
    type: 'Gallery', title: 'Glamour Magazine 2025',
    desc: 'Morning Show cast featured in Glamour Magazine 2025 editorial.',
    tags: 'glamour magazine 2025 editorial morning show cast',
    img: 'reesewitherspoon/glamourmag_1756814591_3712752346641580542_10070230.jpg',
    url: 'gallery.html', year: '2025'
  },
  {
    type: 'Gallery', title: 'Black & White Editorial',
    desc: 'Stunning black and white photography. Timeless and striking portrait.',
    tags: 'black white editorial portrait striking timeless',
    img: 'reesewitherspoon/reesewitherspoon_1636377023_2702448805158962829_367315644.jpg',
    url: 'gallery.html', year: '2021'
  },
  {
    type: 'Gallery', title: 'Cosmopolitan 2024',
    desc: 'Reese graces the cover and editorial pages of Cosmopolitan magazine.',
    tags: 'cosmopolitan 2024 magazine cover fashion',
    img: 'reesewitherspoon/cosmopolitan_1750240854_3657592786824360179_42725516.jpg',
    url: 'gallery.html', year: '2024'
  },

  // ── REELS ──────────────────────────────────────────────
  {
    type: 'Reel', title: 'The Tonight Show with Fallon',
    desc: 'Reese appears on The Tonight Show with Jimmy Fallon — hilarious and candid interview.',
    tags: 'tonight show fallon interview tv appearance funny',
    img: 'reesewitherspoon/reesewitherspoon_1634488279_2686604866087878895_367315644.jpg',
    url: 'reels.html', year: '2024'
  },
  {
    type: 'Reel', title: 'Reese & Kerry Washington BTS',
    desc: 'Behind the scenes footage with Kerry Washington during Little Fires Everywhere production.',
    tags: 'kerry washington little fires everywhere behind scenes bts',
    img: 'reesewitherspoon/reesewitherspoon_1591975593_2329982613323954854_367315644.jpg',
    url: 'reels.html', year: '2020'
  },
  {
    type: 'Reel', title: 'Apple TV+ The Morning Show',
    desc: 'Official Apple TV+ footage from The Morning Show — season highlights.',
    tags: 'apple tv morning show official season trailer',
    img: 'reesewitherspoon/reesewitherspoon_1640021819_2733023570386325475_367315644.jpg',
    url: 'reels.html', year: '2024'
  },
];
