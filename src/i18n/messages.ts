export type Locale = "bs" | "en";

export type Messages = {
  seo: { title: string };
  navAria: { openMenu: string };
  sheet: { menuTitle: string };
  footer: { brand: string; rights: string };
  lang: { bs: string; en: string };
  hero: { category: string; tagline: string; ctaWork: string; scrollHint: string };
  featured: { kicker: string; title: string; subtitle: string; empty: string };
  about: { kicker: string; title: string; p1: string; p2: string };
  albumsSection: { kicker: string; title: string; empty: string; openSeries: string };
  contact: {
    kicker: string;
    title: string;
    intro: string;
    location: string;
    labelName: string;
    labelEmail: string;
    labelMessage: string;
    phName: string;
    phEmail: string;
    phMessage: string;
    submit: string;
    mailSubjectPrefix: string;
    mailSubjectFallback: string;
    instagramLinkLabel: string;
  };
  galleryPage: { kicker: string; title: string; subtitle: string; errorLoad: string; empty: string };
  albumDetail: { backToGallery: string; empty: string };
  albumCard: { viewSeries: string };
  masonry: { open: string };
  lightbox: {
    ariaDialog: string;
    ariaClose: string;
    ariaPauseSlideshow: string;
    ariaPlaySlideshow: string;
    ariaPrev: string;
    ariaNext: string;
    slideshowLabel: string;
  };
  notFound: { title: string; description: string; backHome: string };
  login: {
    title: string;
    emailPh: string;
    passwordPh: string;
    submit: string;
    backHome: string;
    toastSuccess: string;
    toastFail: string;
  };
  admin: {
    photosInAlbum: string;
    upload: string;
    uploadError: string;
    photoDeleted: string;
    photoDeleteError: string;
    uploadSuccess: string;
    uploadFilesSkippedOverLimit: string;
    title: string;
    home: string;
    signOut: string;
    createPlaceholder: string;
    createPlaceholderEn: string;
    albumNameLabelBs: string;
    albumNameLabelEn: string;
    saveAlbumTitles: string;
    albumTitlesUpdated: string;
    albumTitlesUpdateError: string;
    albumTitlesBothRequired: string;
    create: string;
    emptyList: string;
    albumCreated: string;
    albumCreateError: string;
    albumCreateErrorPrefix: string;
    confirmDeleteAlbum: string;
    albumDeleted: string;
    albumDeleteError: string;
    noPhotosYet: string;
    reorderError: string;
    moveAlbumUpAria: string;
    moveAlbumDownAria: string;
    movePhotoUpAria: string;
    movePhotoDownAria: string;
    navAlbums: string;
    navFeatured: string;
    navHomepage: string;
    navSiteText: string;
    siteTextPageTitle: string;
    homeHeroTitle: string;
    homeHeroImageSection: string;
    homeHeroHint: string;
    homeHeroUpload: string;
    homeHeroRemove: string;
    homeHeroEmpty: string;
    homeHeroSuccess: string;
    homeHeroError: string;
    homeHeroClearSuccess: string;
    homeHeroClearError: string;
    homeHeroConfirmRemove: string;
    homeHeroIntervalLabel: string;
    homeHeroIntervalHint: string;
    homeHeroSlidesCount: string;
    homeHeroSlideRemoveAria: string;
    homeHeroMoveSlideUpAria: string;
    homeHeroMoveSlideDownAria: string;
    homeHeroClearAll: string;
    homeHeroConfirmClearAll: string;
    homeHeroMaxSlides: string;
    homeHeroSlideRemoved: string;
    homeHeroApplyInterval: string;
    homeGridSectionTitle: string;
    homeGridHint: string;
    homeGridFeaturedTitle: string;
    homeGridAlbumsTitle: string;
    homeGridColumnsLabel: string;
    homeGridLastRowLabel: string;
    homeGridLastRowStart: string;
    homeGridLastRowCenter: string;
    homeGridCols2: string;
    homeGridCols3: string;
    homeGridCols4: string;
    homeGridUpdated: string;
    homeGridUpdateError: string;
    coverBadge: string;
    coverSetSuccess: string;
    coverSetError: string;
    setAsCoverAria: string;
    featuredAdminTitle: string;
    featuredAdminHint: string;
    featuredAdminNoPhotos: string;
    featuredAdminSelected: string;
    featuredAdminEmptySelection: string;
    featuredAdminPool: string;
    featuredAdminPoolEmpty: string;
    featuredAdminAdd: string;
    featuredAdminMoveUpAria: string;
    featuredAdminMoveDownAria: string;
    featuredAdminRemoveAria: string;
    featuredSyncError: string;
    homePageCopyHint: string;
    homePageCopySave: string;
    homePageCopySaved: string;
    homePageCopySaveError: string;
    copySectionHero: string;
    copyHeroCategory: string;
    copyHeroTagline: string;
    copyHeroCta: string;
    copyHeroScroll: string;
    copySectionFeatured: string;
    copyFeaturedKicker: string;
    copyFeaturedTitle: string;
    copyFeaturedSubtitle: string;
    copySectionAbout: string;
    copyAboutKicker: string;
    copyAboutTitle: string;
    copyAboutP1: string;
    copyAboutP2: string;
    copySectionAlbums: string;
    copyAlbumsKicker: string;
    copyAlbumsTitle: string;
    copyAlbumsEmpty: string;
    copyAlbumsOpenSeries: string;
    copySectionContact: string;
    copyContactKicker: string;
    copyContactTitle: string;
    copyContactIntro: string;
    copyContactLocation: string;
    copyContactLabelName: string;
    copyContactLabelEmail: string;
    copyContactLabelMessage: string;
    copyContactPhName: string;
    copyContactPhEmail: string;
    copyContactPhMessage: string;
    copyContactSubmit: string;
    copyContactMailPrefix: string;
    copyContactMailFallback: string;
    copyContactPublicEmail: string;
    copyContactInstagramUrl: string;
    copyContactInstagramLabel: string;
  };
};

export const messages: Record<Locale, Messages> = {
  bs: {
    seo: { title: "Photachka — Fotografija" },
    navAria: { openMenu: "Otvori meni" },
    sheet: { menuTitle: "Meni" },
    footer: {
      brand: "Photachka",
      rights: "Sva prava zadržana",
    },
    lang: { bs: "BS", en: "EN" },
    hero: {
      category: "Fotografija",
      tagline: "Hvatanje bezvremenskih trenutaka — svjetlost, sjena i tiha poezija između njih.",
      ctaWork: "Pogledaj radove",
      scrollHint: "Pomakni",
    },
    featured: {
      kicker: "Izbor",
      title: "Istaknuti radovi",
      subtitle: "Pažljivo odabran uvid u nedavne sesije — svaki kadar s namjerom.",
      empty: "Novi radovi će se ovdje pojaviti kada se iz studija dodaju fotografije.",
    },
    about: {
      kicker: "Studio",
      title: "O meni",
      p1: "Photachka je fotografska praksa posvećena iskrenoj, uredničkoj slici — gdje se kompozicija susreće s emocijom i svaki kadar zaslužuje mjesto na zidu.",
      p2: "Od pejzaža koji dišu do intimnih portreta, rad strpljivo juri svjetlost. Sa sjedištem u Sarajevu, dostupno za narudžbe i saradnje širom svijeta.",
    },
    albumsSection: {
      kicker: "Kolekcije",
      title: "Albumi",
      empty: "Albumi će se ovdje pojaviti kada se kreiraju u studiju.",
      openSeries: "Otvori seriju",
    },
    contact: {
      kicker: "Upiti",
      title: "Kontakt",
      intro:
        "Podijelite svoj projekat, datum vjenčanja ili urednički brief. Obično odgovaram u roku nekoliko sati.",
      location: "Sarajevo, ali dostupno širom svijeta",
      labelName: "Ime",
      labelEmail: "E-pošta",
      labelMessage: "Poruka",
      phName: "Vaše ime",
      phEmail: "vi@primjer.ba",
      phMessage: "Recite nešto o svom projektu…",
      submit: "Pošalji poruku",
      mailSubjectPrefix: "Upit s Photachka sajta — ",
      mailSubjectFallback: "posjetilac",
      instagramLinkLabel: "Instagram",
    },
    galleryPage: {
      kicker: "Arhiva",
      title: "Galerija",
      subtitle: "Pregledajte kolekcije — svaki album je cjelovita vizualna priča.",
      errorLoad: "Nije moguće učitati albume. Pokušajte ponovo kasnije.",
      empty: "Još nema objavljenih albuma.",
    },
    albumDetail: {
      backToGallery: "Galerija",
      empty: "Ovaj album je prazan.",
    },
    albumCard: { viewSeries: "Pogledaj seriju" },
    masonry: { open: "Otvori" },
    lightbox: {
      ariaDialog: "Pregled slike",
      ariaClose: "Zatvori",
      ariaPauseSlideshow: "Pauziraj automatski prikaz",
      ariaPlaySlideshow: "Pokreni automatski prikaz",
      ariaPrev: "Prethodna slika",
      ariaNext: "Sljedeća slika",
      slideshowLabel: "Automatski prikaz",
    },
    notFound: {
      title: "Stranica nije pronađena",
      description: "Stranica koju tražite ne postoji ili je premještena.",
      backHome: "Nazad na početnu",
    },
    login: {
      title: "Admin Prijava",
      emailPh: "E-pošta",
      passwordPh: "Lozinka",
      submit: "Prijavi se",
      backHome: "Nazad na početnu",
      toastSuccess: "Uspješna prijava",
      toastFail: "Prijava nije uspjela",
    },
    admin: {
      photosInAlbum: 'Fotografije u "{name}"',
      upload: "Upload",
      uploadError: "Greška pri uploadu fotografija",
      photoDeleted: "Fotografija obrisana",
      photoDeleteError: "Greška pri brisanju fotografije",
      uploadSuccess: "Otpremeno je {count} fotografija.",
      uploadFilesSkippedOverLimit:
        "Ove datoteke prelaze limit od 4 MB i nisu otpremljene: {names}",
      title: "Administracija",
      home: "Početna",
      signOut: "Odjavi se",
      createPlaceholder: "Naziv albuma (bosanski)…",
      createPlaceholderEn: "Naziv albuma (engleski)…",
      albumNameLabelBs: "Naziv (bosanski)",
      albumNameLabelEn: "Naziv (engleski)",
      saveAlbumTitles: "Sačuvaj nazive",
      albumTitlesUpdated: "Nazivi albuma su ažurirani.",
      albumTitlesUpdateError: "Greška pri ažuriranju naziva.",
      albumTitlesBothRequired: "Unesite naslov albuma i na bosanskom i na engleskom.",
      create: "Kreiraj",
      emptyList: "Još nema albuma. Kreirajte jedan iznad.",
      albumCreated: "Album kreiran",
      albumCreateError: "Greška pri kreiranju albuma",
      albumCreateErrorPrefix: "Kreiranje albuma:",
      confirmDeleteAlbum: "Obrisati ovaj album i sve njegove fotografije?",
      albumDeleted: "Album obrisan",
      albumDeleteError: "Greška pri brisanju albuma",
      noPhotosYet: "Još nema fotografija.",
      reorderError: "Nije moguće sačuvati redoslijed. Pokušajte ponovo.",
      moveAlbumUpAria: "Pomakni album gore",
      moveAlbumDownAria: "Pomakni album dolje",
      movePhotoUpAria: "Pomakni fotografiju gore",
      movePhotoDownAria: "Pomakni fotografiju dolje",
      navAlbums: "Albumi",
      navFeatured: "Istaknuto",
      navHomepage: "Početna stranica",
      navSiteText: "Tekstovi stranice",
      siteTextPageTitle: "Tekstovi stranice",
      homeHeroTitle: "Početna stranica",
      homeHeroImageSection: "Pozadina heroa",
      homeHeroHint:
        "Do 6 slika u pozadini heroa; na početnoj se smjenjuju svakih nekoliko sekundi (više slika = blaga izmjena). Ako nema slika u studiju, koristi se naslovna slika prvog albuma, zatim prva istaknuta fotografija.",
      homeHeroUpload: "Dodaj slike",
      homeHeroRemove: "Ukloni ovu sliku",
      homeHeroEmpty: "Još nema postavljenih slika.",
      homeHeroSuccess: "Slike heroa su ažurirane.",
      homeHeroError: "Greška pri otpremanju slika heroa.",
      homeHeroClearSuccess: "Sve slike heroa su uklonjene.",
      homeHeroClearError: "Greška pri uklanjanju slika.",
      homeHeroConfirmRemove: "Ukloniti ovu sliku s heroa?",
      homeHeroIntervalLabel: "Sekundi između slika",
      homeHeroIntervalHint: "Od 3 do 120. Jedna slika = nema rotacije.",
      homeHeroSlidesCount: "Slajdovi: {current} / {max}",
      homeHeroSlideRemoveAria: "Ukloni sliku",
      homeHeroMoveSlideUpAria: "Pomakni sliku gore",
      homeHeroMoveSlideDownAria: "Pomakni sliku dolje",
      homeHeroClearAll: "Ukloni sve",
      homeHeroConfirmClearAll: "Ukloniti sve slike heroa sa skladišta?",
      homeHeroMaxSlides: "Maksimalno je 6 slika.",
      homeHeroSlideRemoved: "Slika je uklonjena.",
      homeHeroApplyInterval: "Sačuvaj interval",
      homeGridSectionTitle: "Raspored sekcija na početnoj",
      homeGridHint:
        "Kolone na širim ekranima; na užem prikazu ostaje jedan ili dva stupca. Ako zadnji red nije pun, možete ostaviti poravnanje s lijeva ili ga centrirati.",
      homeGridFeaturedTitle: "Istaknuti radovi",
      homeGridAlbumsTitle: "Albumi",
      homeGridColumnsLabel: "Stavki u redu",
      homeGridLastRowLabel: "Nepotpuni zadnji red",
      homeGridLastRowStart: "Normalno (s lijeva)",
      homeGridLastRowCenter: "Centrirano",
      homeGridCols2: "2",
      homeGridCols3: "3",
      homeGridCols4: "4",
      homeGridUpdated: "Raspored je sačuvan.",
      homeGridUpdateError: "Greška pri čuvanju rasporeda.",
      coverBadge: "Glavna",
      coverSetSuccess: "Glavna slika albuma je postavljena.",
      coverSetError: "Greška pri postavljanju glavne slike.",
      setAsCoverAria: "Postavi kao glavnu sliku albuma",
      featuredAdminTitle: "Istaknuti radovi na početnoj",
      featuredAdminHint:
        "Odaberite slike koje se prikazuju u sekciji „Istaknuti radovi“. Redoslijed na početnoj odgovara redoslijedu ovdje. Ako ništa ne odaberete, koristi se automatski izbor po albumima.",
      featuredAdminNoPhotos: "Nema fotografija. Dodajte ih u albumima.",
      featuredAdminSelected: "Odabrano za početnu",
      featuredAdminEmptySelection: "Još nema odabranih slika. Dodajte ih iz liste ispod.",
      featuredAdminPool: "Sve fotografije",
      featuredAdminPoolEmpty: "Sve su fotografije već u istaknutim.",
      featuredAdminAdd: "Dodaj",
      featuredAdminMoveUpAria: "Istaknuto gore",
      featuredAdminMoveDownAria: "Istaknuto dolje",
      featuredAdminRemoveAria: "Ukloni iz istaknutih",
      featuredSyncError: "Greška pri spremanju istaknutih radova.",
      homePageCopyHint:
        "Svi tekstovi ispod su opcionalni (hero, istaknuto, albumi, o meni, kontakt). Ako ostavite prazno, koristi se podrazumijevani prijevod za BS / EN na javnom sajtu. Otvorite samo sekciju koju uređujete; „Sačuvaj tekstove“ snima sve odjednom.",
      homePageCopySave: "Sačuvaj tekstove",
      homePageCopySaved: "Tekstovi su sačuvani.",
      homePageCopySaveError: "Greška pri spremanju tekstova.",
      copySectionHero: "Hero (naslovna)",
      copyHeroCategory: "Mala oznaka iznad naslova (npr. Fotografija)",
      copyHeroTagline: "Tagline ispod „Photachka“",
      copyHeroCta: "Tekst glavnog gumba",
      copyHeroScroll: "Tekst uz strelicu za skrol",
      copySectionFeatured: "Istaknuti radovi",
      copyFeaturedKicker: "Mala oznaka iznad naslova",
      copyFeaturedTitle: "Naslov sekcije",
      copyFeaturedSubtitle: "Podnaslov (desno na širokim ekranima)",
      copySectionAbout: "O meni (#about)",
      copyAboutKicker: "Mala oznaka",
      copyAboutTitle: "Naslov",
      copyAboutP1: "Prvi pasus",
      copyAboutP2: "Drugi pasus",
      copySectionAlbums: "Albumi (početna)",
      copyAlbumsKicker: "Mala oznaka iznad naslova",
      copyAlbumsTitle: "Naslov sekcije",
      copyAlbumsEmpty: "Poruka kada nema albuma",
      copyAlbumsOpenSeries: "Tekst na kartici pri hoveru (otvori seriju)",
      copySectionContact: "Kontakt (#contact)",
      copyContactKicker: "Mala oznaka",
      copyContactTitle: "Naslov",
      copyContactIntro: "Uvodni tekst (lijevo)",
      copyContactLocation: "Lokacija (ispod e-pošte)",
      copyContactLabelName: "Oznaka polja Ime",
      copyContactLabelEmail: "Oznaka polja E-pošta",
      copyContactLabelMessage: "Oznaka polja Poruka",
      copyContactPhName: "Placeholder Ime",
      copyContactPhEmail: "Placeholder E-pošta",
      copyContactPhMessage: "Placeholder Poruka",
      copyContactSubmit: "Tekst gumba za slanje",
      copyContactMailPrefix: "Prefiks predmeta e-pošte (mailto)",
      copyContactMailFallback: "Tekst ako ime nije uneseno (predmet)",
      copyContactPublicEmail: "Javna e-adresa (prikaz i mailto forme)",
      copyContactInstagramUrl: "Instagram — puni URL (npr. https://instagram.com/korisnik/)",
      copyContactInstagramLabel: "Tekst Instagram linka (npr. Instagram)",
    },
  },
  en: {
    seo: { title: "Photachka — Photography" },
    navAria: { openMenu: "Open menu" },
    sheet: { menuTitle: "Menu" },
    footer: {
      brand: "Photachka",
      rights: "All rights reserved",
    },
    lang: { bs: "BS", en: "EN" },
    hero: {
      category: "Photography",
      tagline: "Capturing timeless moments — light, shadow, and the quiet poetry between them.",
      ctaWork: "View work",
      scrollHint: "Scroll",
    },
    featured: {
      kicker: "Selection",
      title: "Featured work",
      subtitle: "A curated glimpse across recent sessions — each frame composed with intention.",
      empty: "New work will appear here once images are added from the studio.",
    },
    about: {
      kicker: "The studio",
      title: "About",
      p1: "Photachka is a photography practice devoted to honest, editorial imagery — where composition meets emotion and every frame earns its place on the wall.",
      p2: "From landscapes that breathe to intimate portraits, the work chases light with patience. Based in Sarajevo, available for commissions and collaborations internationally.",
    },
    albumsSection: {
      kicker: "Collections",
      title: "Albums",
      empty: "Albums will appear here when created in the studio.",
      openSeries: "Open series",
    },
    contact: {
      kicker: "Inquiries",
      title: "Contact",
      intro:
        "Share your project, wedding date, or editorial brief. I typically reply within a few hours.",
      location: "Sarajevo, but available worldwide",
      labelName: "Name",
      labelEmail: "Email",
      labelMessage: "Message",
      phName: "Your name",
      phEmail: "you@example.com",
      phMessage: "Tell me about your project…",
      submit: "Send message",
      mailSubjectPrefix: "Inquiry from Photachka website — ",
      mailSubjectFallback: "visitor",
      instagramLinkLabel: "Instagram",
    },
    galleryPage: {
      kicker: "Archive",
      title: "Gallery",
      subtitle: "Browse collections — each album is a complete visual narrative.",
      errorLoad: "Unable to load albums. Please try again later.",
      empty: "No albums published yet.",
    },
    albumDetail: {
      backToGallery: "Gallery",
      empty: "This album is empty.",
    },
    albumCard: { viewSeries: "View series" },
    masonry: { open: "Open" },
    lightbox: {
      ariaDialog: "Image preview",
      ariaClose: "Close",
      ariaPauseSlideshow: "Pause slideshow",
      ariaPlaySlideshow: "Play slideshow",
      ariaPrev: "Previous image",
      ariaNext: "Next image",
      slideshowLabel: "Slideshow",
    },
    notFound: {
      title: "Page not found",
      description: "The page you are looking for does not exist or has been moved.",
      backHome: "Return home",
    },
    login: {
      title: "Admin sign in",
      emailPh: "Email",
      passwordPh: "Password",
      submit: "Sign in",
      backHome: "Back to home",
      toastSuccess: "Signed in successfully",
      toastFail: "Sign in failed",
    },
    admin: {
      photosInAlbum: 'Photos in "{name}"',
      upload: "Upload",
      uploadError: "Error uploading photos",
      photoDeleted: "Photo deleted",
      photoDeleteError: "Error deleting photo",
      uploadSuccess: "Uploaded {count} photos.",
      uploadFilesSkippedOverLimit: "These files exceed 4 MB and were not uploaded: {names}",
      title: "Administration",
      home: "Home",
      signOut: "Sign out",
      createPlaceholder: "Album title (Bosnian)…",
      createPlaceholderEn: "Album title (English)…",
      albumNameLabelBs: "Title (Bosnian)",
      albumNameLabelEn: "Title (English)",
      saveAlbumTitles: "Save titles",
      albumTitlesUpdated: "Album titles updated.",
      albumTitlesUpdateError: "Could not update titles.",
      albumTitlesBothRequired: "Enter the album title in both Bosnian and English.",
      create: "Create",
      emptyList: "No albums yet. Create one above.",
      albumCreated: "Album created",
      albumCreateError: "Error creating album",
      albumCreateErrorPrefix: "Creating album:",
      confirmDeleteAlbum: "Delete this album and all its photos?",
      albumDeleted: "Album deleted",
      albumDeleteError: "Error deleting album",
      noPhotosYet: "No photos yet.",
      reorderError: "Could not save order. Please try again.",
      moveAlbumUpAria: "Move album up",
      moveAlbumDownAria: "Move album down",
      movePhotoUpAria: "Move photo up",
      movePhotoDownAria: "Move photo down",
      navAlbums: "Albums",
      navFeatured: "Featured",
      navHomepage: "Homepage",
      navSiteText: "Page text",
      siteTextPageTitle: "Page text",
      homeHeroTitle: "Home page",
      homeHeroImageSection: "Hero background",
      homeHeroHint:
        "Up to 6 hero background images; they rotate every few seconds on the home page. If none are set, the first album cover is used, then the first featured photo.",
      homeHeroUpload: "Add images",
      homeHeroRemove: "Remove this image",
      homeHeroEmpty: "No hero images yet.",
      homeHeroSuccess: "Hero images updated.",
      homeHeroError: "Could not upload hero images.",
      homeHeroClearSuccess: "All hero images removed.",
      homeHeroClearError: "Could not remove hero images.",
      homeHeroConfirmRemove: "Remove this hero image?",
      homeHeroIntervalLabel: "Seconds between slides",
      homeHeroIntervalHint: "3–120. A single image does not rotate.",
      homeHeroSlidesCount: "Slides: {current} / {max}",
      homeHeroSlideRemoveAria: "Remove image",
      homeHeroMoveSlideUpAria: "Move image up",
      homeHeroMoveSlideDownAria: "Move image down",
      homeHeroClearAll: "Remove all",
      homeHeroConfirmClearAll: "Remove all hero images from storage?",
      homeHeroMaxSlides: "You can add at most 6 images.",
      homeHeroSlideRemoved: "Image removed.",
      homeHeroApplyInterval: "Save interval",
      homeGridSectionTitle: "Home section layout",
      homeGridHint:
        "Columns on wider screens; narrow view stays one or two columns. If the last row is short, keep left alignment or center those items.",
      homeGridFeaturedTitle: "Featured work",
      homeGridAlbumsTitle: "Albums",
      homeGridColumnsLabel: "Items per row",
      homeGridLastRowLabel: "Incomplete last row",
      homeGridLastRowStart: "Normal (from the left)",
      homeGridLastRowCenter: "Centered",
      homeGridCols2: "2",
      homeGridCols3: "3",
      homeGridCols4: "4",
      homeGridUpdated: "Layout saved.",
      homeGridUpdateError: "Could not save layout.",
      coverBadge: "Cover",
      coverSetSuccess: "Album cover updated.",
      coverSetError: "Could not set album cover.",
      setAsCoverAria: "Set as album cover image",
      featuredAdminTitle: "Featured work on home",
      featuredAdminHint:
        "Choose the photos shown in the “Featured work” section. Order on the home page matches the order here. If you select none, the site uses an automatic pick by album order.",
      featuredAdminNoPhotos: "No photos yet. Add some in albums.",
      featuredAdminSelected: "Shown on home",
      featuredAdminEmptySelection: "No photos selected yet. Add some from the list below.",
      featuredAdminPool: "All photos",
      featuredAdminPoolEmpty: "Every photo is already featured.",
      featuredAdminAdd: "Add",
      featuredAdminMoveUpAria: "Move featured up",
      featuredAdminMoveDownAria: "Move featured down",
      featuredAdminRemoveAria: "Remove from featured",
      featuredSyncError: "Could not save featured work.",
      homePageCopyHint:
        "All fields below are optional (hero, featured, albums, about, contact). If left empty, the bundled translation for BS / EN is used on the public site. Expand only the section you’re editing; Save applies all sections at once.",
      homePageCopySave: "Save copy",
      homePageCopySaved: "Copy saved.",
      homePageCopySaveError: "Could not save copy.",
      copySectionHero: "Hero",
      copyHeroCategory: "Small label above title (e.g. Photography)",
      copyHeroTagline: "Tagline under “Photachka”",
      copyHeroCta: "Primary button label",
      copyHeroScroll: "Text next to scroll hint",
      copySectionFeatured: "Featured work",
      copyFeaturedKicker: "Small label above title",
      copyFeaturedTitle: "Section title",
      copyFeaturedSubtitle: "Subtitle (right column on wide screens)",
      copySectionAbout: "About (#about)",
      copyAboutKicker: "Small label",
      copyAboutTitle: "Title",
      copyAboutP1: "First paragraph",
      copyAboutP2: "Second paragraph",
      copySectionAlbums: "Albums (home)",
      copyAlbumsKicker: "Small label above title",
      copyAlbumsTitle: "Section title",
      copyAlbumsEmpty: "Message when there are no albums",
      copyAlbumsOpenSeries: "Hover line on card (open series)",
      copySectionContact: "Contact (#contact)",
      copyContactKicker: "Small label",
      copyContactTitle: "Title",
      copyContactIntro: "Intro text (left column)",
      copyContactLocation: "Location (under email)",
      copyContactLabelName: "Name field label",
      copyContactLabelEmail: "Email field label",
      copyContactLabelMessage: "Message field label",
      copyContactPhName: "Name placeholder",
      copyContactPhEmail: "Email placeholder",
      copyContactPhMessage: "Message placeholder",
      copyContactSubmit: "Submit button text",
      copyContactMailPrefix: "Email subject prefix (mailto)",
      copyContactMailFallback: "Subject if name empty",
      copyContactPublicEmail: "Public email (display and contact form mailto)",
      copyContactInstagramUrl: "Instagram — full URL (e.g. https://instagram.com/yourhandle/)",
      copyContactInstagramLabel: "Instagram link label (e.g. Instagram)",
    },
  },
};

/** Bosnian plural for „fotografija“. */
export function photoWordBs(n: number): string {
  const mod100 = Math.abs(n) % 100;
  const mod10 = mod100 % 10;
  if (mod100 >= 11 && mod100 <= 14) return "fotografija";
  if (mod10 === 1) return "fotografija";
  if (mod10 >= 2 && mod10 <= 4) return "fotografije";
  return "fotografija";
}

export function photoWordEn(n: number): string {
  return n === 1 ? "photograph" : "photographs";
}

export function dateLocaleTag(locale: Locale): string {
  return locale === "bs" ? "bs-BA" : "en-US";
}
