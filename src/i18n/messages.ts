export type Locale = "bs" | "en";

export type Messages = {
  seo: { title: string };
  nav: {
    about: string;
    gallery: string;
    contact: string;
  };
  navAria: { openMenu: string };
  sheet: { menuTitle: string };
  footer: { copyrightNote: string; gallery: string; inquiries: string; studio: string };
  lang: { bs: string; en: string };
  hero: { category: string; tagline: string; ctaWork: string; scrollHint: string };
  featured: { kicker: string; title: string; subtitle: string; empty: string };
  about: { kicker: string; title: string; p1: string; p2: string };
  albumsSection: { kicker: string; title: string; viewAll: string; empty: string; openSeries: string };
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
    homeHeroTitle: string;
    homeHeroHint: string;
    homeHeroUpload: string;
    homeHeroRemove: string;
    homeHeroEmpty: string;
    homeHeroSuccess: string;
    homeHeroError: string;
    homeHeroClearSuccess: string;
    homeHeroClearError: string;
    homeHeroConfirmRemove: string;
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
  };
};

export const messages: Record<Locale, Messages> = {
  bs: {
    seo: { title: "Photachka — Fotografija" },
    nav: {
      about: "O meni",
      gallery: "Galerija",
      contact: "Kontakt",
    },
    navAria: { openMenu: "Otvori meni" },
    sheet: { menuTitle: "Meni" },
    footer: {
      copyrightNote: "Sva prava zadržana",
      gallery: "Galerija",
      inquiries: "Upiti",
      studio: "Studio",
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
      viewAll: "Pogledaj sve →",
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
      homeHeroTitle: "Slika na početnoj",
      homeHeroHint:
        "Ova slika se prikazuje kao pozadina hero sekcije na početnoj stranici. Ako je nema, koristi se naslovna slika prvog albuma koji je ima, zatim prva istaknuta fotografija.",
      homeHeroUpload: "Upload sliku",
      homeHeroRemove: "Ukloni sliku",
      homeHeroEmpty: "Još nema postavljene slike.",
      homeHeroSuccess: "Slika početne stranice je ažurirana.",
      homeHeroError: "Greška pri otpremanju slike početne stranice.",
      homeHeroClearSuccess: "Slika početne stranice je uklonjena.",
      homeHeroClearError: "Greška pri uklanjanju slike.",
      homeHeroConfirmRemove: "Ukloniti sliku s početne stranice?",
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
    },
  },
  en: {
    seo: { title: "Photachka — Photography" },
    nav: {
      about: "About",
      gallery: "Gallery",
      contact: "Contact",
    },
    navAria: { openMenu: "Open menu" },
    sheet: { menuTitle: "Menu" },
    footer: {
      copyrightNote: "All rights reserved",
      gallery: "Gallery",
      inquiries: "Inquiries",
      studio: "Studio",
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
      viewAll: "View all →",
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
      homeHeroTitle: "Homepage image",
      homeHeroHint:
        "This image is used as the hero background on the home page. If unset, the first album cover is used, then the first featured photo.",
      homeHeroUpload: "Upload image",
      homeHeroRemove: "Remove image",
      homeHeroEmpty: "No homepage image set yet.",
      homeHeroSuccess: "Homepage image updated.",
      homeHeroError: "Could not upload homepage image.",
      homeHeroClearSuccess: "Homepage image removed.",
      homeHeroClearError: "Could not remove homepage image.",
      homeHeroConfirmRemove: "Remove the homepage image?",
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
