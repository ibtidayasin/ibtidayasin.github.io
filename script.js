const $=id=>document.getElementById(id);
const DEFAULT_CONTENT={
  "name": "Nazifa Khanom",
  "title": "Mechanical Engineering Graduate",
  "institution": "Shahjalal University of Science and Technology (SUST)",
  "location": "Bangladesh",
  "focus": "Computational Materials · Molecular Dynamics · Nanomechanics",
  "aboutHeadline": "Mechanical engineering with an atomistic materials focus.",
  "aboutLead": "I am a Mechanical Engineering graduate from Shahjalal University of Science and Technology (SUST), interested in computational materials science, molecular dynamics, nanoscale mechanics, and scientific computing.",
  "aboutBio": "My research work focuses on atomistic simulation of compositionally graded metallic nanostructures, with emphasis on how composition, crystallographic orientation, temperature, and defects influence deformation and mechanical response.",
  "researchInterests": [
    "Computational materials science and atomistic simulation",
    "Molecular dynamics of metallic nanostructures",
    "Nanoscale deformation and plasticity",
    "Compositionally graded materials",
    "Crystallographic effects on mechanical behaviour",
    "Scientific computing and research data analysis"
  ],
  "featuredResearch": {
    "title": "Radially graded Cu–Ni nanowires under tensile loading",
    "description": "A classical molecular dynamics study of how radial composition grading, crystallographic orientation, temperature, and surface defects influence tensile behaviour and deformation mechanisms in Cu–Ni nanowires.",
    "tags": [
      "LAMMPS",
      "Python",
      "OVITO",
      "PTM",
      "DXA",
      "RDF"
    ],
    "media": []
  },
  "publications": [],
  "projects": [
    {
      "title": "Atomistic Structure Generation",
      "description": "Python-based generation and manipulation of nanoscale structures for molecular dynamics simulations.",
      "meta": "Python · LAMMPS",
      "url": "",
      "media": []
    },
    {
      "title": "MD Data Analysis",
      "description": "Post-processing of simulation data, stress–strain analysis, comparison across cases, and scientific plotting.",
      "meta": "Python · Matplotlib",
      "url": "",
      "media": []
    },
    {
      "title": "Atomistic Mechanism Analysis",
      "description": "Structural and defect analysis using PTM, DXA, RDF, atomic strain, and visualization workflows.",
      "meta": "OVITO",
      "url": "",
      "media": []
    }
  ],
  "skills": [
    {
      "category": "Simulation",
      "items": [
        "LAMMPS",
        "Classical molecular dynamics",
        "EAM potentials"
      ],
      "media": []
    },
    {
      "category": "Scientific Computing",
      "items": [
        "Python",
        "NumPy",
        "Matplotlib"
      ],
      "media": []
    },
    {
      "category": "Atomistic Analysis",
      "items": [
        "OVITO",
        "PTM",
        "DXA",
        "RDF"
      ],
      "media": []
    }
  ],
  "education": [
    {
      "period": "B.Sc.",
      "degree": "Mechanical Engineering",
      "institution": "Shahjalal University of Science and Technology (SUST)",
      "description": "Mechanical engineering education with growing focus on computational materials and atomistic simulation.",
      "media": []
    }
  ],
  "contact": {
    "headline": "Interested in computational materials and nanoscale mechanics?",
    "message": "I am open to research discussions, graduate opportunities, and collaborations related to computational materials science and atomistic simulation.",
    "email": "",
    "phone": "",
    "location": "Bangladesh",
    "media": []
  },
  "links": {
    "linkedin": "",
    "github": "https://github.com/nazifa-khanom",
    "orcid": "",
    "scholar": ""
  ,
    "researchgate": "",
    "scopus": "",
    "wos": "",
    "website": ""
  },
  "cv": {
    "url": "",
    "filename": "",
    "updated_at": ""
  },
  "photo_url": "",
  "defaultTheme": "soft-beige",
  "sectionMedia": {
    "profile": []
  }
}

const DEFAULT_SECTION_HEADINGS={
  about:{title:"About Me",subtitle:"Mechanical engineering with an atomistic materials focus."},
  research:{title:"Research Interests",subtitle:"What I work on"},
  thesis:{title:"Undergraduate Thesis",subtitle:"Research Thesis"},
  publications:{title:"Publications",subtitle:"Research output"},
  projects:{title:"Projects",subtitle:"Selected work"},
  skills:{title:"Skills",subtitle:"Research toolkit"},
  education:{title:"Education",subtitle:"Academic background"},
  contact:{title:"Contact",subtitle:"Interested in computational materials and nanoscale mechanics?"},
  cv:{title:"Curriculum Vitae",subtitle:"Academic CV"}
};

function normalizeSectionHeadings(content){
  const current=(content.sectionHeadings&&typeof content.sectionHeadings==="object")?content.sectionHeadings:{};
  const legacyAbout=content.aboutHeadline??DEFAULT_SECTION_HEADINGS.about.subtitle;
  const legacyContact=content.contact?.headline??DEFAULT_SECTION_HEADINGS.contact.subtitle;
  const out={};

  Object.entries(DEFAULT_SECTION_HEADINGS).forEach(([key,defaults])=>{
    const item=(current[key]&&typeof current[key]==="object")?current[key]:{};
    const hasTitle=Object.prototype.hasOwnProperty.call(item,"title");
    const hasSubtitle=Object.prototype.hasOwnProperty.call(item,"subtitle");
    const fallbackSubtitle=key==="about"?legacyAbout:(key==="contact"?legacyContact:defaults.subtitle);

    out[key]={
      title:hasTitle?String(item.title??""):defaults.title,
      subtitle:hasSubtitle?String(item.subtitle??""):String(fallbackSubtitle??"")
    };
  });

  content.sectionHeadings=out;
  return content;
}


const DEFAULT_TYPOGRAPHY={
  sectionTitleSize:44,
  sectionTitleColor:"",
  sectionSubtitleSize:25,
  sectionSubtitleColor:""
};

function normalizeTypography(content){
  const a=(content.appearance&&typeof content.appearance==="object")?content.appearance:{};
  const raw=(a.typography&&typeof a.typography==="object")?a.typography:{};
  content.appearance={
    ...a,
    typography:{
      sectionTitleSize:clampNumber(raw.sectionTitleSize,30,60,DEFAULT_TYPOGRAPHY.sectionTitleSize),
      sectionTitleColor:validHex(raw.sectionTitleColor)?raw.sectionTitleColor:"",
      sectionSubtitleSize:clampNumber(raw.sectionSubtitleSize,16,34,DEFAULT_TYPOGRAPHY.sectionSubtitleSize),
      sectionSubtitleColor:validHex(raw.sectionSubtitleColor)?raw.sectionSubtitleColor:""
    }
  };
  return content;
}

function clampNumber(value,min,max,fallback){
  const n=Number(value);
  return Number.isFinite(n)?Math.min(max,Math.max(min,n)):fallback;
}
function validHex(value){
  return typeof value==="string"&&/^#[0-9a-fA-F]{6}$/.test(value.trim());
}


function applyPublicTypography(d){
  normalizeTypography(d);
  const t=d.appearance.typography;
  const root=document.documentElement;
  root.style.setProperty("--public-section-title-size",`${t.sectionTitleSize}px`);
  root.style.setProperty("--public-section-subtitle-size",`${t.sectionSubtitleSize}px`);
  root.style.setProperty("--public-section-title-color",t.sectionTitleColor||"var(--accent)");
  root.style.setProperty("--public-section-subtitle-color",t.sectionSubtitleColor||"var(--muted)");
}


const DEFAULT_CUSTOM_THEME={
  bg:"#FCFBF9",
  surface:"#FFFFFF",
  surfaceAlt:"#F7F3EE",
  text:"#2B2926",
  muted:"#746E66",
  line:"#E8E1D9",
  accent:"#9F8064",
  accentSoft:"#F5EEE7",
  portraitA:"#D7C2AE",
  portraitB:"#9A7D65"
};

function normalizeCustomTheme(content){
  const a=(content.appearance&&typeof content.appearance==="object")?content.appearance:{};
  const raw=(a.customTheme&&typeof a.customTheme==="object")?a.customTheme:{};
  const out={};
  Object.entries(DEFAULT_CUSTOM_THEME).forEach(([k,v])=>{
    out[k]=validHex(raw[k])?raw[k].toUpperCase():v;
  });
  content.appearance={...a,customTheme:out};
  return content;
}

function hexToRgba(hex,alpha){
  const h=String(hex||"").replace("#","");
  if(!/^[0-9a-fA-F]{6}$/.test(h))return `rgba(255,255,255,${alpha})`;
  const r=parseInt(h.slice(0,2),16),g=parseInt(h.slice(2,4),16),b=parseInt(h.slice(4,6),16);
  return `rgba(${r},${g},${b},${alpha})`;
}

function applyCustomThemeVariables(theme){
  const t=theme||DEFAULT_CUSTOM_THEME;
  const root=document.documentElement;
  root.style.setProperty("--bg",t.bg);
  root.style.setProperty("--surface",t.surface);
  root.style.setProperty("--surface-alt",t.surfaceAlt);
  root.style.setProperty("--surface-soft",t.surface);
  root.style.setProperty("--text",t.text);
  root.style.setProperty("--muted",t.muted);
  root.style.setProperty("--line",t.line);
  root.style.setProperty("--accent",t.accent);
  root.style.setProperty("--accent-soft",t.accentSoft);
  root.style.setProperty("--header-bg",hexToRgba(t.bg,.96));
  root.style.setProperty("--media-bg",t.surfaceAlt);
  root.style.setProperty("--portrait-a",t.portraitA);
  root.style.setProperty("--portrait-b",t.portraitB);
}


const SITE_SECTION_KEYS=["about","research","thesis","publications","projects","skills","education","contact","cv"];
const DEFAULT_SITE_SETTINGS={
  sectionOrder:["about","research","thesis","publications","projects","skills","education","contact","cv"],
  sectionVisibility:{
    about:true,research:true,thesis:true,publications:true,projects:true,skills:true,education:true,contact:true,cv:true
  },
  layout:{
    maxWidth:1180,
    sidebarWidth:255,
    layoutGap:58,
    sectionSpacing:40,
    cardRadius:11,
    portraitSize:190,
    portraitShape:"slight",
    portraitFit:"cover",
    portraitPosition:"center",
    projectColumns:3,
    skillsColumns:3,
    fontPair:"classic",
    shadow:"theme",
    stickySidebar:true,
    navigationMode:"single",
    pageTransition:"fade",
    pagePager:true,
    sectionCoverEnabled:true,
    sectionCoverStyle:"framed",
    sectionCoverPhotoFit:"crop",
    sectionCoverTopBlend:false,
    sectionCoverSide:"right",
    sectionCoverHeight:300,
    sectionCoverZoom:100,
    sectionCoverFade:"medium",
    sectionCoverDetails:true,
    sectionCoverSocials:true
  },
  experience:{
    activeNav:true,
    animations:"subtle",
    backToTop:true,
    lightbox:true,
    smoothScroll:true,
    copyButtons:true,
    navHighlightStyle:"underline",
    socialStyle:"labels"
  }
};

const SITE_FONT_PAIRS={
  classic:{body:"Arial, Helvetica, sans-serif",heading:"Georgia, serif"},
  modern:{body:"Segoe UI, Arial, sans-serif",heading:"Segoe UI, Arial, sans-serif"},
  humanist:{body:"Segoe UI, Arial, sans-serif",heading:"Georgia, serif"},
  editorial:{body:"Georgia, Times New Roman, serif",heading:"Georgia, Times New Roman, serif"},
  palatino:{body:"Segoe UI, Arial, sans-serif",heading:"Palatino Linotype, Book Antiqua, Palatino, serif"},
  bookish:{body:"Palatino Linotype, Book Antiqua, Palatino, serif",heading:"Georgia, serif"}
};

function normalizeSiteSettings(content){
  const raw=(content.siteSettings&&typeof content.siteSettings==="object")?content.siteSettings:{};
  const rawOrder=Array.isArray(raw.sectionOrder)?raw.sectionOrder.filter(x=>SITE_SECTION_KEYS.includes(x)):[];
  const order=[...new Set([...rawOrder,...SITE_SECTION_KEYS])];
  const rawVis=(raw.sectionVisibility&&typeof raw.sectionVisibility==="object")?raw.sectionVisibility:{};
  const l=(raw.layout&&typeof raw.layout==="object")?raw.layout:{};
  const e=(raw.experience&&typeof raw.experience==="object")?raw.experience:{};

  const thesisVisible=raw.thesisDefaultVisibleApplied===true?rawVis.thesis!==false:true;

  // Preserve the one-time Experience-default repair, but never override
  // an explicit choice after the migration marker has been stored.
  const experienceDefaultsMigrated=raw.experienceDefaultsMigratedV1===true;
  const experienceBool=(key)=>{
    if(!experienceDefaultsMigrated)return DEFAULT_SITE_SETTINGS.experience[key]!==false;
    return e[key]!==false;
  };

  const normalized={
    ...raw,
    thesisDefaultVisibleApplied:true,
    experienceDefaultsMigratedV1:true,
    sectionOrder:order,
    sectionVisibility:Object.fromEntries(
      SITE_SECTION_KEYS.map(k=>[
        k,
        k==="thesis"?thesisVisible:(Object.prototype.hasOwnProperty.call(rawVis,k)?rawVis[k]!==false:true)
      ])
    ),
    layout:{
      ...l,
      maxWidth:clampNumber(l.maxWidth,960,1500,DEFAULT_SITE_SETTINGS.layout.maxWidth),
      sidebarWidth:clampNumber(l.sidebarWidth,210,340,DEFAULT_SITE_SETTINGS.layout.sidebarWidth),
      layoutGap:clampNumber(l.layoutGap,20,100,DEFAULT_SITE_SETTINGS.layout.layoutGap),
      sectionSpacing:clampNumber(l.sectionSpacing,20,90,DEFAULT_SITE_SETTINGS.layout.sectionSpacing),
      cardRadius:clampNumber(l.cardRadius,0,28,DEFAULT_SITE_SETTINGS.layout.cardRadius),
      portraitSize:clampNumber(l.portraitSize,140,250,DEFAULT_SITE_SETTINGS.layout.portraitSize),
      portraitShape:["square","slight","rounded","circle"].includes(l.portraitShape)?l.portraitShape:DEFAULT_SITE_SETTINGS.layout.portraitShape,
      portraitFit:["cover","contain"].includes(l.portraitFit)?l.portraitFit:DEFAULT_SITE_SETTINGS.layout.portraitFit,
      portraitPosition:["center","top","bottom","left","right"].includes(l.portraitPosition)?l.portraitPosition:DEFAULT_SITE_SETTINGS.layout.portraitPosition,
      projectColumns:[1,2,3].includes(Number(l.projectColumns))?Number(l.projectColumns):DEFAULT_SITE_SETTINGS.layout.projectColumns,
      skillsColumns:[1,2,3].includes(Number(l.skillsColumns))?Number(l.skillsColumns):DEFAULT_SITE_SETTINGS.layout.skillsColumns,
      fontPair:Object.prototype.hasOwnProperty.call(SITE_FONT_PAIRS,l.fontPair)?l.fontPair:DEFAULT_SITE_SETTINGS.layout.fontPair,
      shadow:["theme","none","subtle","medium"].includes(l.shadow)?l.shadow:DEFAULT_SITE_SETTINGS.layout.shadow,
      stickySidebar:Object.prototype.hasOwnProperty.call(l,"stickySidebar")?l.stickySidebar!==false:DEFAULT_SITE_SETTINGS.layout.stickySidebar,
      navigationMode:["single","sections"].includes(l.navigationMode)?l.navigationMode:DEFAULT_SITE_SETTINGS.layout.navigationMode,
      pageTransition:["none","fade","slide"].includes(l.pageTransition)?l.pageTransition:DEFAULT_SITE_SETTINGS.layout.pageTransition,
      pagePager:Object.prototype.hasOwnProperty.call(l,"pagePager")?l.pagePager!==false:DEFAULT_SITE_SETTINGS.layout.pagePager,
      sectionCoverEnabled:Object.prototype.hasOwnProperty.call(l,"sectionCoverEnabled")?l.sectionCoverEnabled!==false:DEFAULT_SITE_SETTINGS.layout.sectionCoverEnabled,
      sectionCoverStyle:["framed","fullbleed","split","glass"].includes(l.sectionCoverStyle)?l.sectionCoverStyle:DEFAULT_SITE_SETTINGS.layout.sectionCoverStyle,
      sectionCoverPhotoFit:["crop","full"].includes(l.sectionCoverPhotoFit)?l.sectionCoverPhotoFit:DEFAULT_SITE_SETTINGS.layout.sectionCoverPhotoFit,
      sectionCoverTopBlend:Object.prototype.hasOwnProperty.call(l,"sectionCoverTopBlend")?l.sectionCoverTopBlend===true:DEFAULT_SITE_SETTINGS.layout.sectionCoverTopBlend,
      sectionCoverSide:["left","right"].includes(l.sectionCoverSide)?l.sectionCoverSide:DEFAULT_SITE_SETTINGS.layout.sectionCoverSide,
      sectionCoverHeight:clampNumber(l.sectionCoverHeight,220,420,DEFAULT_SITE_SETTINGS.layout.sectionCoverHeight),
      sectionCoverZoom:clampNumber(l.sectionCoverZoom,40,170,DEFAULT_SITE_SETTINGS.layout.sectionCoverZoom),
      sectionCoverFade:["soft","medium","strong"].includes(l.sectionCoverFade)?l.sectionCoverFade:DEFAULT_SITE_SETTINGS.layout.sectionCoverFade,
      sectionCoverDetails:Object.prototype.hasOwnProperty.call(l,"sectionCoverDetails")?l.sectionCoverDetails!==false:DEFAULT_SITE_SETTINGS.layout.sectionCoverDetails,
      sectionCoverSocials:Object.prototype.hasOwnProperty.call(l,"sectionCoverSocials")?l.sectionCoverSocials!==false:DEFAULT_SITE_SETTINGS.layout.sectionCoverSocials
    },
    experience:{
      ...e,
      activeNav:experienceBool("activeNav"),
      animations:["off","subtle","normal"].includes(e.animations)?e.animations:DEFAULT_SITE_SETTINGS.experience.animations,
      backToTop:experienceBool("backToTop"),
      lightbox:experienceBool("lightbox"),
      smoothScroll:experienceBool("smoothScroll"),
      copyButtons:experienceBool("copyButtons"),
      navHighlightStyle:["underline","pill","text"].includes(e.navHighlightStyle)?e.navHighlightStyle:DEFAULT_SITE_SETTINGS.experience.navHighlightStyle,
      socialStyle:["labels","icons"].includes(e.socialStyle)?e.socialStyle:DEFAULT_SITE_SETTINGS.experience.socialStyle
    }
  };

  content.siteSettings=normalized;
  return content;
}

function siteShadowValue(level){
  if(level==="theme")return"var(--shadow)";
  if(level==="none")return"none";
  if(level==="medium")return"0 16px 38px rgba(0,0,0,.12)";
  return"0 12px 30px rgba(0,0,0,.055)";
}

function portraitRadiusValue(shape){
  if(shape==="square")return"0px";
  if(shape==="rounded")return"18px";
  if(shape==="circle")return"50%";
  return"3px";
}


let siteActiveNavObserver=null;
let siteActiveNavScrollHandler=null;
let siteRevealObserver=null;
let siteEnhancementsBound=false;
let currentSiteExperience=structuredClone(DEFAULT_SITE_SETTINGS.experience);
let currentRenderedContent=null;


function ensureEnhancementUi(){
  if(!$("backToTopBtn")){
    const b=document.createElement("button");
    b.id="backToTopBtn";
    b.className="back-to-top hidden";
    b.type="button";
    b.setAttribute("aria-label","Back to top");
    b.textContent="↑";
    document.body.appendChild(b);
  }

  if(!$("siteLightbox")){
    const box=document.createElement("div");
    box.id="siteLightbox";
    box.className="site-lightbox hidden";
    box.setAttribute("role","dialog");
    box.setAttribute("aria-modal","true");
    box.setAttribute("aria-label","Image preview");
    box.innerHTML=`<button class="site-lightbox-close" type="button" aria-label="Close">×</button>
      <div class="site-lightbox-inner">
        <img id="siteLightboxImage" alt="">
        <div id="siteLightboxCaption" class="site-lightbox-caption"></div>
      </div>`;
    document.body.appendChild(box);
  }

  if(siteEnhancementsBound)return;
  siteEnhancementsBound=true;

  $("backToTopBtn").addEventListener("click",()=>{
    window.scrollTo({top:0,behavior:currentSiteExperience.smoothScroll?"smooth":"auto"});
  });

  window.addEventListener("scroll",()=>{
    const b=$("backToTopBtn");
    if(!b)return;
    const show=currentSiteExperience.backToTop&&window.scrollY>450;
    b.classList.toggle("hidden",!show);
  },{passive:true});

  document.addEventListener("click",async e=>{
    const copy=e.target.closest("[data-copy-value]");
    if(copy){
      const value=copy.dataset.copyValue||"";
      try{
        await navigator.clipboard.writeText(value);
        const old=copy.textContent;
        copy.textContent="Copied ✓";
        setTimeout(()=>copy.textContent=old,1200);
      }catch{}
      return;
    }

    const img=e.target.closest(".media-public-image");
    if(img){
      const mode=img.dataset.lightbox||"inherit";
      const allowLightbox=mode==="on"||(mode==="inherit"&&currentSiteExperience.lightbox);
      const anchor=img.closest("a");
      if(anchor&&allowLightbox){
        e.preventDefault();
        const box=$("siteLightbox");
        $("siteLightboxImage").src=img.src;
        $("siteLightboxImage").alt=img.alt||"";
        const fig=img.closest("figure");
        const info=fig?.querySelector(".media-public-info")?.innerText?.trim()||img.alt||"";
        $("siteLightboxCaption").textContent=info;
        box.classList.remove("hidden");
        document.body.classList.add("lightbox-open");
      }
      return;
    }

    if(e.target.id==="siteLightbox"||e.target.closest(".site-lightbox-close")){
      closeSiteLightbox();
    }
  });

  document.addEventListener("keydown",e=>{
    if(e.key==="Escape")closeSiteLightbox();
  });
}

function closeSiteLightbox(){
  const box=$("siteLightbox");
  if(!box)return;
  box.classList.add("hidden");
  $("siteLightboxImage").removeAttribute("src");
  document.body.classList.remove("lightbox-open");
}


/* =========================================================
   SWITCHABLE WEBSITE STRUCTURE
   Single-page scrolling / one-section-at-a-time
   ========================================================= */
let sitePageModeHashHandler=null;
let sitePageModeClickBound=false;
let siteCurrentSectionKey="about";

function sectionKeyFromHash(hash=location.hash){
  const raw=String(hash||"").replace(/^#/,"").trim();
  if(!raw||raw==="home")return"about";
  return SITE_SECTION_KEYS.includes(raw)?raw:"about";
}

function hashForSectionKey(key){
  return key==="about"?"#home":`#${key}`;
}

function visibleSectionKeys(d){
  normalizeSiteSettings(d);
  return d.siteSettings.sectionOrder.filter(key=>
    SITE_SECTION_KEYS.includes(key)&&d.siteSettings.sectionVisibility[key]!==false
  );
}

function ensureSectionPager(){
  let pager=$("sectionPagePager");
  if(pager)return pager;
  const footer=document.querySelector(".content footer");
  if(!footer)return null;

  pager=document.createElement("nav");
  pager.id="sectionPagePager";
  pager.className="section-page-pager hidden";
  pager.setAttribute("aria-label","Section navigation");
  pager.innerHTML=`
    <button id="sectionPrevBtn" class="section-page-nav-btn" type="button">
      <span aria-hidden="true">←</span>
      <span><small>Previous</small><strong id="sectionPrevLabel"></strong></span>
    </button>
    <button id="sectionNextBtn" class="section-page-nav-btn" type="button">
      <span><small>Next</small><strong id="sectionNextLabel"></strong></span>
      <span aria-hidden="true">→</span>
    </button>`;
  footer.parentNode.insertBefore(pager,footer);

  $("sectionPrevBtn").addEventListener("click",()=>{
    const key=$("sectionPrevBtn").dataset.sectionKey;
    if(key)navigateToSectionPage(key);
  });
  $("sectionNextBtn").addEventListener("click",()=>{
    const key=$("sectionNextBtn").dataset.sectionKey;
    if(key)navigateToSectionPage(key);
  });
  return pager;
}

function sectionPageLabel(key,d){
  const headings=normalizeSectionHeadings(d).sectionHeadings;
  return headings[key]?.title||DEFAULT_SECTION_HEADINGS[key]?.title||key;
}

function updateSectionPager(d,currentKey){
  const pager=ensureSectionPager();
  if(!pager)return;

  const l=d.siteSettings.layout;
  const keys=visibleSectionKeys(d);
  const index=keys.indexOf(currentKey);
  const enabled=l.pagePager!==false&&l.navigationMode==="sections"&&index>=0;
  pager.classList.toggle("hidden",!enabled);
  if(!enabled)return;

  const prevKey=index>0?keys[index-1]:"";
  const nextKey=index<keys.length-1?keys[index+1]:"";

  const prev=$("sectionPrevBtn"),next=$("sectionNextBtn");
  prev.classList.toggle("hidden",!prevKey);
  next.classList.toggle("hidden",!nextKey);

  if(prevKey){
    prev.dataset.sectionKey=prevKey;
    $("sectionPrevLabel").textContent=sectionPageLabel(prevKey,d);
  }else{
    delete prev.dataset.sectionKey;
  }

  if(nextKey){
    next.dataset.sectionKey=nextKey;
    $("sectionNextLabel").textContent=sectionPageLabel(nextKey,d);
  }else{
    delete next.dataset.sectionKey;
  }
}

function activateSectionPageNav(key){
  const navId=key==="about"?"home":key;
  document.querySelectorAll(".topbar nav a").forEach(a=>{
    a.classList.toggle("active-section",a.getAttribute("href")===`#${navId}`);
  });
}



function ensureSectionCoverPhotoLayer(d){
  const sidebar=document.querySelector(".sidebar");
  if(!sidebar)return null;

  let layer=sidebar.querySelector(".section-cover-photo-layer");
  if(!layer){
    layer=document.createElement("div");
    layer.className="section-cover-photo-layer";
    layer.setAttribute("aria-hidden","true");
    layer.innerHTML=`<img class="section-cover-photo-layer-img" alt="" draggable="false">`;
    sidebar.prepend(layer);
  }

  const img=layer.querySelector("img");
  const src=String(d?.photo_url||"").trim();
  if(src){
    if(img.getAttribute("src")!==src)img.src=src;
    layer.classList.remove("hidden");
  }else{
    img.removeAttribute("src");
    layer.classList.add("hidden");
  }
  return layer;
}

function applySectionCoverState(d,key){
  normalizeSiteSettings(d);
  const l=d.siteSettings.layout;
  const sectionMode=l.navigationMode==="sections";
  const innerPage=sectionMode&&key!=="about";
  const enabled=innerPage&&l.sectionCoverEnabled!==false;
  const root=document.documentElement;
  const sidebar=document.querySelector(".sidebar");

  root.dataset.sectionPage=innerPage?"inner":"home";
  root.dataset.sectionCover=enabled?"on":"off";
  root.dataset.coverStyle=l.sectionCoverStyle||"framed";
  root.dataset.coverPhotoFit=l.sectionCoverPhotoFit||"crop";
  root.dataset.coverTopBlend=l.sectionCoverTopBlend===true?"on":"off";
  root.dataset.coverSide=l.sectionCoverSide||"right";
  root.dataset.coverFade=l.sectionCoverFade||"medium";
  root.dataset.coverDetails=l.sectionCoverDetails!==false?"show":"hide";
  root.dataset.coverSocials=l.sectionCoverSocials!==false?"show":"hide";
  root.style.setProperty("--section-cover-height",`${l.sectionCoverHeight||300}px`);
  const zoom=clampNumber(l.sectionCoverZoom,40,170,100);
  const basePhotoSize=54;
  const coverHeight=clampNumber(l.sectionCoverHeight,220,420,300);
  root.style.setProperty("--cover-zoom-scale",String(zoom/100));
  root.style.setProperty("--section-cover-photo-size",`${basePhotoSize*(zoom/100)}%`);
  root.style.setProperty("--section-cover-fit-height",`${coverHeight*0.92*(zoom/100)}px`);
  root.style.setProperty("--mobile-cover-photo-height",`${230*(zoom/100)}px`);
  root.style.setProperty("--mobile-cover-full-height",`${220*(zoom/100)}px`);

  ensureSectionCoverPhotoLayer(d);

  if(sidebar){
    const hasPhoto=!!String(d.photo_url||"").trim();
    sidebar.classList.toggle("has-section-cover-photo",hasPhoto);
    if(hasPhoto){
      const safe=String(d.photo_url).replace(/["\\\n\r]/g,m=>m==="\""?"%22":"");
      sidebar.style.setProperty("--section-cover-image",`url("${safe}")`);
    }else{
      sidebar.style.setProperty("--section-cover-image","none");
    }
  }
}

function showSectionPage(d,requestedKey,{scrollTop=true}={}){
  const keys=visibleSectionKeys(d);
  if(!keys.length)return;

  let key=keys.includes(requestedKey)?requestedKey:keys[0];
  siteCurrentSectionKey=key;
  applySectionCoverState(d,key);

  const transition=d.siteSettings.layout.pageTransition||"fade";
  document.documentElement.dataset.pageTransition=transition;

  document.querySelectorAll(".content .section[data-section-key]").forEach(sec=>{
    const secKey=sec.dataset.sectionKey;
    const current=secKey===key&&d.siteSettings.sectionVisibility[secKey]!==false;
    sec.classList.toggle("section-page-current",current);
    sec.classList.toggle("section-page-dormant",!current);
    if(current){
      sec.removeAttribute("aria-hidden");
      // Restart the selected page's transition every time it becomes active.
      sec.classList.remove("section-page-enter");
      void sec.offsetWidth;
      sec.classList.add("section-page-enter");
    }
  });

  activateSectionPageNav(key);
  updateSectionPager(d,key);

  if(scrollTop){
    window.scrollTo({top:0,behavior:"auto"});
  }
}

function navigateToSectionPage(key,{replace=false}={}){
  if(!currentRenderedContent)return;
  const keys=visibleSectionKeys(currentRenderedContent);
  if(!keys.includes(key))key=keys[0]||"about";

  const targetHash=hashForSectionKey(key);
  if(location.hash===targetHash){
    showSectionPage(currentRenderedContent,key,{scrollTop:true});
    return;
  }

  if(replace)history.replaceState(null,"",targetHash);
  else history.pushState(null,"",targetHash);

  showSectionPage(currentRenderedContent,key,{scrollTop:true});
}

function bindSectionPageNavigation(){
  if(sitePageModeClickBound)return;
  sitePageModeClickBound=true;

  document.addEventListener("click",e=>{
    const link=e.target.closest(".topbar nav a[href^='#'], .brand[href^='#']");
    if(!link||!currentRenderedContent)return;
    if(currentRenderedContent.siteSettings?.layout?.navigationMode!=="sections")return;

    const href=link.getAttribute("href")||"#home";
    const key=sectionKeyFromHash(href);
    const visible=visibleSectionKeys(currentRenderedContent);
    if(!visible.includes(key))return;

    e.preventDefault();
    navigateToSectionPage(key);
  });
}

function applyNavigationMode(d){
  normalizeSiteSettings(d);
  currentRenderedContent=d;

  const l=d.siteSettings.layout;
  const sectionMode=l.navigationMode==="sections";
  document.documentElement.dataset.navigationMode=sectionMode?"sections":"single";

  const pager=ensureSectionPager();
  if(pager)pager.classList.toggle("hidden",!sectionMode);

  if(sitePageModeHashHandler){
    window.removeEventListener("popstate",sitePageModeHashHandler);
    window.removeEventListener("hashchange",sitePageModeHashHandler);
    sitePageModeHashHandler=null;
  }

  bindSectionPageNavigation();

  if(!sectionMode){
    applySectionCoverState(d,"about");
    document.querySelectorAll(".content .section[data-section-key]").forEach(sec=>{
      sec.classList.remove("section-page-current","section-page-dormant","section-page-enter");
    });
    document.documentElement.removeAttribute("data-page-transition");
    if(pager)pager.classList.add("hidden");
    return;
  }

  const keys=visibleSectionKeys(d);
  let initial=sectionKeyFromHash();
  if(!keys.includes(initial)){
    initial=keys[0]||"about";
    history.replaceState(null,"",hashForSectionKey(initial));
  }

  sitePageModeHashHandler=()=>{
    if(!currentRenderedContent)return;
    if(currentRenderedContent.siteSettings?.layout?.navigationMode!=="sections")return;
    showSectionPage(currentRenderedContent,sectionKeyFromHash(),{scrollTop:true});
  };
  window.addEventListener("popstate",sitePageModeHashHandler);
  window.addEventListener("hashchange",sitePageModeHashHandler);

  showSectionPage(d,initial,{scrollTop:false});
}

function applySectionStructure(d){
  normalizeSiteSettings(d);
  const settings=d.siteSettings;
  const content=document.querySelector(".content");
  const footer=content?.querySelector("footer");
  if(!content||!footer)return;

  settings.sectionOrder.forEach(key=>{
    const sec=document.querySelector(`[data-section-key="${key}"]`);
    if(!sec)return;
    const visible=settings.sectionVisibility[key]!==false;
    sec.classList.toggle("site-section-hidden",!visible);
    sec.setAttribute("aria-hidden",visible?"false":"true");
    content.insertBefore(sec,footer);
  });

  document.querySelectorAll(".topbar nav a[href^='#']").forEach(a=>{
    const raw=(a.getAttribute("href")||"").slice(1);
    const id=raw==="home"?"about":raw;
    if(!SITE_SECTION_KEYS.includes(id))return;
    a.classList.toggle("nav-section-hidden",settings.sectionVisibility[id]===false);
  });
}

function applyLayoutSettings(d){
  normalizeSiteSettings(d);
  const l=d.siteSettings.layout;
  const pair=SITE_FONT_PAIRS[l.fontPair]||SITE_FONT_PAIRS.classic;
  const root=document.documentElement;

  root.style.setProperty("--max",`${l.maxWidth}px`);
  root.style.setProperty("--site-sidebar-width",`${l.sidebarWidth}px`);
  root.style.setProperty("--site-layout-gap",`${l.layoutGap}px`);
  root.style.setProperty("--site-section-spacing",`${l.sectionSpacing}px`);
  root.style.setProperty("--site-card-radius",`${l.cardRadius}px`);
  root.style.setProperty("--site-portrait-size",`${l.portraitSize}px`);
  root.style.setProperty("--site-portrait-radius",portraitRadiusValue(l.portraitShape));
  root.style.setProperty("--site-portrait-fit",l.portraitFit||"cover");
  root.style.setProperty("--site-portrait-position",l.portraitPosition||"center");
  root.style.setProperty("--site-project-columns",String(l.projectColumns));
  root.style.setProperty("--site-skills-columns",String(l.skillsColumns));
  root.style.setProperty("--site-shadow",siteShadowValue(l.shadow));
  root.style.setProperty("--site-font-body",pair.body);
  root.style.setProperty("--site-font-heading",pair.heading);
  root.dataset.stickySidebar=l.stickySidebar?"true":"false";
}

function setupActiveNavigation(d){
  if(d.siteSettings?.layout?.navigationMode==="sections"){
    if(siteActiveNavObserver){
      siteActiveNavObserver.disconnect();
      siteActiveNavObserver=null;
    }
    if(siteActiveNavScrollHandler){
      window.removeEventListener("scroll",siteActiveNavScrollHandler);
      window.removeEventListener("resize",siteActiveNavScrollHandler);
      siteActiveNavScrollHandler=null;
    }
    if(d.siteSettings.experience.activeNav)activateSectionPageNav(siteCurrentSectionKey);
    else document.querySelectorAll(".topbar nav a").forEach(a=>a.classList.remove("active-section"));
    return;
  }

  if(siteActiveNavObserver){
    siteActiveNavObserver.disconnect();
    siteActiveNavObserver=null;
  }
  if(siteActiveNavScrollHandler){
    window.removeEventListener("scroll",siteActiveNavScrollHandler);
    window.removeEventListener("resize",siteActiveNavScrollHandler);
    siteActiveNavScrollHandler=null;
  }

  const navLinks=[...document.querySelectorAll(".topbar nav a")];
  navLinks.forEach(a=>a.classList.remove("active-section"));
  if(!d.siteSettings.experience.activeNav)return;

  const sections=[...document.querySelectorAll(".content .section[data-section-key]:not(.site-section-hidden)")];
  if(!sections.length)return;

  const activateSection=id=>{
    const navId=id==="about"?"home":id;
    navLinks.forEach(a=>{
      a.classList.toggle("active-section",a.getAttribute("href")===`#${navId}`);
    });
  };

  let ticking=false;
  const updateActiveSection=()=>{
    ticking=false;

    /*
     * The final section can be too short to cross the normal viewport
     * activation line. When the user reaches the document bottom, always
     * activate the last visible section (normally Curriculum Vitae).
     */
    const doc=document.documentElement;
    const atBottom=window.scrollY+window.innerHeight>=doc.scrollHeight-12;
    if(atBottom){
      activateSection(sections[sections.length-1].id);
      return;
    }

    const header=document.querySelector(".topbar");
    const headerBottom=header?header.getBoundingClientRect().bottom:0;
    const activationY=Math.max(headerBottom+24,window.innerHeight*0.30);

    let selected=sections[0];
    for(const section of sections){
      const rect=section.getBoundingClientRect();
      if(rect.top<=activationY)selected=section;
      else break;
    }
    activateSection(selected.id);
  };

  siteActiveNavScrollHandler=()=>{
    if(ticking)return;
    ticking=true;
    requestAnimationFrame(updateActiveSection);
  };

  window.addEventListener("scroll",siteActiveNavScrollHandler,{passive:true});
  window.addEventListener("resize",siteActiveNavScrollHandler,{passive:true});
  updateActiveSection();
}

function setupRevealAnimations(d){
  if(siteRevealObserver){siteRevealObserver.disconnect();siteRevealObserver=null}
  const mode=d.siteSettings.experience.animations;
  const els=[...document.querySelectorAll(".content .section:not(.site-section-hidden), .card, .pub-item, .skill-card, .edu")];
  els.forEach(el=>{
    el.classList.remove("reveal-ready","reveal-in","reveal-normal");
  });
  if(mode==="off"||window.matchMedia("(prefers-reduced-motion: reduce)").matches)return;

  els.forEach(el=>{
    el.classList.add("reveal-ready");
    if(mode==="normal")el.classList.add("reveal-normal");
  });
  siteRevealObserver=new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        entry.target.classList.add("reveal-in");
        siteRevealObserver?.unobserve(entry.target);
      }
    });
  },{threshold:.08,rootMargin:"0px 0px -6% 0px"});
  els.forEach(el=>siteRevealObserver.observe(el));
}

function setupCopyButtons(d){
  document.querySelectorAll(".contact-copy-btn").forEach(b=>b.remove());
  if(!d.siteSettings.experience.copyButtons)return;

  document.querySelectorAll("#contactLinks .contact-item").forEach(item=>{
    const label=item.querySelector(".contact-item-heading span")?.textContent?.trim();
    if(!["Email","Phone"].includes(label))return;
    const source=item.querySelector("a,strong");
    if(!source)return;
    const value=source.textContent.replace(/\s*↗\s*$/,"").trim();
    if(!value)return;
    const b=document.createElement("button");
    b.type="button";
    b.className="contact-copy-btn";
    b.dataset.copyValue=value;
    b.textContent="Copy";
    item.appendChild(b);
  });
}

function applyExperienceSettings(d){
  normalizeSiteSettings(d);
  currentSiteExperience=structuredClone(d.siteSettings.experience);
  ensureEnhancementUi();

  document.documentElement.classList.toggle("no-smooth-scroll",!currentSiteExperience.smoothScroll);
  document.documentElement.dataset.navHighlight=currentSiteExperience.navHighlightStyle||"underline";
  $("backToTopBtn")?.classList.toggle("feature-disabled",!currentSiteExperience.backToTop);
  if(!currentSiteExperience.lightbox)closeSiteLightbox();

  setupActiveNavigation(d);
  setupRevealAnimations(d);
  setupCopyButtons(d);
}

function applySiteSettings(d){
  normalizeSiteSettings(d);
  currentRenderedContent=d;
  applyLayoutSettings(d);
  applySectionStructure(d);
  applyNavigationMode(d);
  applyExperienceSettings(d);
}


const DEFAULT_THESIS={
  title:"",
  description:"",
  supervisor:"",
  coSupervisor:"",
  degree:"B.Sc. in Mechanical Engineering",
  institution:"",
  period:"",
  status:"Completed",
  keywords:[],
  media:[]
};
function normalizeThesis(content){
  const raw=(content.thesis&&typeof content.thesis==="object")?content.thesis:{};
  content.thesis={
    title:String(raw.title??""),
    description:String(raw.description??""),
    supervisor:String(raw.supervisor??""),
    coSupervisor:String(raw.coSupervisor??""),
    degree:String(raw.degree??DEFAULT_THESIS.degree),
    institution:String(raw.institution??content.institution??""),
    period:String(raw.period??""),
    status:String(raw.status??DEFAULT_THESIS.status),
    keywords:Array.isArray(raw.keywords)?raw.keywords:[],
    media:Array.isArray(raw.media)?raw.media:[]
  };
  return content;
}


const BUILDER_SETTINGS_SCHEMA_VERSION=6;
let savedBuilderSettingsSnapshot=null;

function deepCloneSafe(value){
  try{return structuredClone(value)}catch{return JSON.parse(JSON.stringify(value))}
}

function deepFillMissing(target,fallback){
  if(Array.isArray(fallback)){
    return Array.isArray(target)?target:deepCloneSafe(fallback);
  }
  if(fallback&&typeof fallback==="object"){
    const out=(target&&typeof target==="object"&&!Array.isArray(target))?{...target}:{};
    Object.keys(fallback).forEach(k=>{
      if(out[k]===undefined||out[k]===null){
        out[k]=deepCloneSafe(fallback[k]);
      }else{
        out[k]=deepFillMissing(out[k],fallback[k]);
      }
    });
    return out;
  }
  return target===undefined||target===null?fallback:target;
}

function captureBuilderSettings(content){
  const c=content&&typeof content==="object"?content:{};
  return deepCloneSafe({
    defaultTheme:c.defaultTheme,
    appearance:c.appearance,
    sectionHeadings:c.sectionHeadings,
    siteSettings:c.siteSettings,
    thesis:c.thesis,
    builderState:c.builderState
  });
}

function restoreMissingBuilderSettings(content,snapshot){
  if(!snapshot||typeof snapshot!=="object")return content;
  ["defaultTheme","appearance","sectionHeadings","siteSettings","thesis","builderState"].forEach(k=>{
    if(content[k]===undefined||content[k]===null){
      content[k]=deepCloneSafe(snapshot[k]);
    }else if(snapshot[k]&&typeof snapshot[k]==="object"&&!Array.isArray(snapshot[k])){
      content[k]=deepFillMissing(content[k],snapshot[k]);
    }
  });
  return content;
}

function ensureBuilderState(content){
  content.builderState=(content.builderState&&typeof content.builderState==="object")?content.builderState:{};
  content.builderState.settingsSchemaVersion=BUILDER_SETTINGS_SCHEMA_VERSION;
  return content.builderState;
}

function builderSettingsNeedMigration(content){
  return Number(content?.builderState?.settingsSchemaVersion||0)<BUILDER_SETTINGS_SCHEMA_VERSION;
}

const sb=window.supabase.createClient(window.SUPABASE_CONFIG.url,window.SUPABASE_CONFIG.key);
const SITE_THEMES=["classic-brown","soft-beige","slate-blue","deep-navy","forest-sage","olive-stone","burgundy","dusty-plum","charcoal","dark-academic","solar-citrus","electric-azure","coral-bloom","mint-pop","lemon-sky","aqua-lime","berry-fizz","peach-punch","lavender-glow","spring-green","midnight-gold","ink-cyan","black-coral","graphite-lime","royal-cream","espresso-ivory","aubergine-gold","emerald-night","crimson-slate","arctic-black","cobalt-white","scarlet-paper","emerald-white","violet-ivory","teal-porcelain","navy-sand","magenta-frost","orange-ink","indigo-mint","crimson-cream","custom-theme"];
function validSiteTheme(t){return SITE_THEMES.includes(t)?t:"soft-beige"}

function merge(base,extra){
  if(Array.isArray(base))return Array.isArray(extra)?extra:base;
  if(base&&typeof base==="object"){
    const out={...base};
    if(extra&&typeof extra==="object")Object.keys(extra).forEach(k=>out[k]=k in base?merge(base[k],extra[k]):extra[k]);
    return out;
  }
  return extra??base;
}
function normalize(d){
  ensureBuilderState(d);
  normalizeThesis(d);
  normalizeSiteSettings(d);
  normalizeCustomTheme(d);
  normalizeTypography(d);
  normalizeSectionHeadings(d);
  d.sectionMedia=d.sectionMedia||{profile:[]};
  d.sectionMedia.profile=d.sectionMedia.profile||[];
  d.featuredResearch=d.featuredResearch||{};d.featuredResearch.media=d.featuredResearch.media||[];
  d.publications=(d.publications||[]).map(x=>({...x,media:x.media||[]}));
  d.projects=(d.projects||[]).map(x=>({...x,media:x.media||[]}));
  d.skills=(d.skills||[]).map(x=>({...x,media:x.media||[]}));
  d.education=(d.education||[]).map(x=>({...x,media:x.media||[]}));
  d.contact=d.contact||{};d.contact.media=d.contact.media||[];
  return d;
}
async function loadContent(){
  let data=structuredClone(DEFAULT_CONTENT);
  try{
    const{data:row,error}=await sb.from("site_content").select("content").eq("id","main").single();
    if(!error&&row?.content&&Object.keys(row.content).length)data=merge(DEFAULT_CONTENT,row.content);
  }catch(e){console.error(e)}
  render(normalize(data));
}

function profileIcon(type){
  const common='class="profile-link-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false"';
  const icons={
    email:`<svg ${common}><rect x="3.5" y="5.5" width="17" height="13" rx="2"></rect><path d="M4.5 7l7.5 5.7L19.5 7"></path></svg>`,
    linkedin:`<svg ${common}><rect x="4" y="4" width="16" height="16" rx="2"></rect><circle cx="8" cy="9" r="1" class="profile-icon-fill"></circle><path d="M7.5 12v5"></path><path d="M11.5 17v-3.1c0-1.4.8-2.3 2.1-2.3 1.2 0 1.9.8 1.9 2.2V17"></path></svg>`,
    github:`<svg ${common}><path d="M9 19c-4 .8-4-2-5-2"></path><path d="M15 19v-3.5a3 3 0 0 0-.9-2.3c3-.3 6.1-1.5 6.1-6.7a5.2 5.2 0 0 0-1.4-3.6 4.9 4.9 0 0 0-.1-3.5s-1.1-.4-3.7 1.4a12.8 12.8 0 0 0-6 0C6.4-1 5.3-.6 5.3-.6a4.9 4.9 0 0 0-.1 3.5 5.2 5.2 0 0 0-1.4 3.6c0 5.2 3.1 6.4 6.1 6.7A3 3 0 0 0 9 15.5V19"></path></svg>`,
    scholar:`<svg ${common}><path d="M12 4L3 9l9 5 9-5-9-5z"></path><path d="M6 11.5V15c0 1.7 2.7 3 6 3s6-1.3 6-3v-3.5"></path></svg>`,
    orcid:`<svg ${common}><circle cx="12" cy="12" r="8.5"></circle><circle cx="9" cy="8.3" r="1" class="profile-icon-fill"></circle><path d="M9 11v5"></path><path d="M12.5 16v-5h2a2.5 2.5 0 1 1 0 5h-2z"></path></svg>`,
    website:`<svg ${common}><circle cx="12" cy="12" r="8.5"></circle><path d="M3.8 12h16.4"></path><path d="M12 3.5c2.4 2.4 3.6 5.2 3.6 8.5S14.4 18.1 12 20.5c-2.4-2.4-3.6-5.2-3.6-8.5S9.6 5.9 12 3.5z"></path></svg>`,
    researchgate:`<svg ${common}><circle cx="12" cy="12" r="8.5"></circle><path d="M8.3 16V8h3.1c2 0 3.2 1 3.2 2.6 0 1.2-.7 2.1-1.9 2.5L15.4 16"></path><path d="M10.2 12.9h2.3"></path></svg>`,
    scopus:`<svg ${common}><path d="M7 5h10v4H9v2h7v4H9v2h8v2H7z"></path></svg>`,
    wos:`<svg ${common}><circle cx="8" cy="12" r="4"></circle><circle cx="16" cy="12" r="4"></circle><path d="M10.5 8.9l3 6.2"></path><path d="M13.5 8.9l-3 6.2"></path></svg>`,
    phone:`<svg ${common}><path d="M6.5 4.5l3 3-2 2.2a14 14 0 0 0 6.8 6.8l2.2-2 3 3-1.6 2c-.7.8-1.8 1.1-2.8.8C9.4 18.7 5.3 14.6 3.7 8.9c-.3-1 .1-2.1.8-2.8l2-1.6z"></path></svg>`,
    location:`<svg ${common}><path d="M12 21s6-5.4 6-11a6 6 0 1 0-12 0c0 5.6 6 11 6 11z"></path><circle cx="12" cy="10" r="2"></circle></svg>`
  };
  return icons[type]||icons.github;
}

function iconLinkHtml(type,label,url,isExternal=true,style="labels"){
  if(!url)return "";
  const iconOnly=style==="icons";
  return `<a class="profile-icon-link ${iconOnly?"social-icons-only":""}" href="${escAttr(url)}" ${isExternal?'target="_blank" rel="noopener"':""} title="${escAttr(label)}" aria-label="${escAttr(label)}">
    ${profileIcon(type)}
    <span>${esc(label)}</span>
    ${isExternal?'<span class="profile-link-arrow">↗</span>':""}
  </a>`;
}

function render(d){
  document.title=`${d.name} | Academic Profile`;
  document.documentElement.dataset.theme=validSiteTheme(d.defaultTheme||"soft-beige");
  if(validSiteTheme(d.defaultTheme||"")==="custom-theme"){
    normalizeCustomTheme(d);
    applyCustomThemeVariables(d.appearance.customTheme);
  }
  applyPublicTypography(d);
  $("brandName").textContent=$("name").textContent=$("footerName").textContent=d.name;
  $("initials").textContent=d.name.split(/\s+/).slice(0,2).map(x=>x[0]).join("").toUpperCase();
  $("title").textContent=d.title;
  $("institution").textContent=d.institution;
  $("location").textContent=d.location;
  $("focus").textContent=d.focus;

  const sections=normalizeSectionHeadings(d).sectionHeadings;

  function setPublicSection(key,titleId,subtitleId,navId){
    const item=sections[key]||DEFAULT_SECTION_HEADINGS[key];
    const titleEl=$(titleId);
    const subtitleEl=$(subtitleId);
    if(titleEl)titleEl.textContent=item.title||"";
    if(subtitleEl){
      subtitleEl.textContent=item.subtitle||"";
      subtitleEl.classList.toggle("hidden",!item.subtitle);
    }
    if(navId&&$(navId))$(navId).textContent=item.title||DEFAULT_SECTION_HEADINGS[key].title;
  }

  setPublicSection("about","aboutSectionTitle","aboutHeadline");
  setPublicSection("research","researchSectionTitle","researchSectionSubtitle","navResearch");
  setPublicSection("thesis","thesisSectionTitle","thesisSectionSubtitle","navThesis");
  setPublicSection("publications","publicationsSectionTitle","publicationsSectionSubtitle","navPublications");
  setPublicSection("projects","projectsSectionTitle","projectsSectionSubtitle","navProjects");
  setPublicSection("skills","skillsSectionTitle","skillsSectionSubtitle","navSkills");
  setPublicSection("education","educationSectionTitle","educationSectionSubtitle","navEducation");
  setPublicSection("contact","contactSectionTitle","contactHeadline","navContact");
  setPublicSection("cv","cvSectionTitle","cvSectionSubtitle","navCv");
  $("aboutLead").textContent=d.aboutLead;
  $("aboutBio").textContent=d.aboutBio;

  if(d.photo_url){
    $("profilePhoto").src=d.photo_url;
    $("profilePhoto").classList.remove("hidden");
    $("initials").classList.add("hidden");
    document.querySelector(".portrait")?.classList.add("has-photo");
  }else{
    $("profilePhoto").classList.add("hidden");
    $("initials").classList.remove("hidden");
    document.querySelector(".portrait")?.classList.remove("has-photo");
  }

  $("profileMedia").innerHTML=mediaHtml(d.sectionMedia?.profile||[]);
  $("researchInterests").innerHTML=(d.researchInterests||[]).map(x=>`<li>${esc(x)}</li>`).join("");

  normalizeThesis(d);
  $("thesisTitle").textContent=d.thesis.title||"";
  $("thesisDescription").textContent=d.thesis.description||"";
  $("thesisKeywords").innerHTML=(d.thesis.keywords||[]).map(x=>`<span class="tag">${esc(x)}</span>`).join("");
  const thesisMeta=[
    ["Supervisor",d.thesis.supervisor],
    ["Co-supervisor",d.thesis.coSupervisor],
    ["Degree",d.thesis.degree],
    ["Institution",d.thesis.institution],
    ["Period",d.thesis.period],
    ["Status",d.thesis.status]
  ].filter(([,value])=>String(value||"").trim());
  $("thesisMeta").innerHTML=thesisMeta.map(([label,value])=>`
    <div class="thesis-meta-item"><span>${esc(label)}</span><strong>${esc(value)}</strong></div>`).join("");
  $("thesisMedia").innerHTML=mediaHtml(d.thesis.media||[]);

  const pubs=(d.publications||[]).filter(p=>p.visible!==false);
  $("publicationsList").innerHTML=pubs.length?pubs.map(p=>`
    <article class="pub-item">
      <div class="pub-top">
        <div>
          <h3>${esc(p.title||"")}</h3>
          ${p.authors?`<div class="pub-meta">${esc(p.authors)}</div>`:""}
        </div>
        ${p.status?`<span class="pub-status">${esc(p.status)}</span>`:""}
      </div>
      <div class="pub-meta">${[p.venue,p.year].filter(Boolean).map(esc).join(" · ")}</div>
      ${p.description?`<p class="muted small">${esc(p.description)}</p>`:""}
      <div class="pub-links">
        ${p.doi?`<a class="text-link" href="https://doi.org/${escAttr(p.doi.replace(/^https?:\/\/(dx\.)?doi\.org\//i,""))}" target="_blank" rel="noopener">DOI ↗</a>`:""}
        ${safeUrl(p.url)?`<a class="text-link" href="${escAttr(safeUrl(p.url))}" target="_blank" rel="noopener">Publication ↗</a>`:""}
      </div>
      <div class="item-media">${mediaHtml(p.media||[])}</div>
    </article>`).join(""):`<div class="empty-state">No publications listed yet.</div>`;

  $("projectsList").innerHTML=(d.projects||[]).filter(p=>p.visible!==false).map(p=>`
    <article class="card">
      <h3>${esc(p.title||"")}</h3>
      <p class="muted">${esc(p.description||"")}</p>
      ${safeUrl(p.url)?`<a class="text-link" href="${escAttr(safeUrl(p.url))}" target="_blank" rel="noopener">View project ↗</a>`:""}
      <div class="item-media">${mediaHtml(p.media||[])}</div>
      <div class="meta-line">${esc(p.meta||"")}</div>
    </article>`).join("");

  $("skillsList").innerHTML=(d.skills||[]).filter(g=>g.visible!==false).map(g=>`
    <article class="skill-card">
      <h3>${esc(g.category||"")}</h3>
      <ul>${(g.items||[]).map(x=>`<li>${esc(x)}</li>`).join("")}</ul>
      <div class="item-media">${mediaHtml(g.media||[])}</div>
    </article>`).join("");

  $("educationList").innerHTML=(d.education||[]).filter(e=>e.visible!==false).map(e=>`
    <div class="edu">
      <div class="period">${esc(e.period||"")}</div>
      <div>
        <h3>${esc(e.degree||"")}</h3>
        <p style="color:var(--accent);font-weight:700">${esc(e.institution||"")}</p>
        <p class="muted small">${esc(e.description||"")}</p>
        <div class="item-media">${mediaHtml(e.media||[])}</div>
      </div>
    </div>`).join("");

  $("contactMessage").textContent=d.contact?.message||"";
  const contactItems=[];
  if(d.contact?.email)contactItems.push(["email","Email",`mailto:${d.contact.email}`,d.contact.email,false]);
  if(d.contact?.phone)contactItems.push(["phone","Phone","",d.contact.phone,false]);
  if(d.contact?.location)contactItems.push(["location","Location","",d.contact.location,false]);
  [["linkedin","LinkedIn",d.links?.linkedin],["github","GitHub",d.links?.github],["orcid","ORCID",d.links?.orcid],["scholar","Google Scholar",d.links?.scholar],["researchgate","ResearchGate",d.links?.researchgate],["scopus","Scopus",d.links?.scopus],["wos","Web of Science",d.links?.wos],["website","Website",d.links?.website]].forEach(([type,label,url])=>{
    const safe=safeUrl(url);
    if(safe)contactItems.push([type,label,safe,"Open profile",true]);
  });
  $("contactLinks").innerHTML=contactItems.map(([type,label,url,value,isExternal])=>`
    <div class="contact-item contact-item-with-icon">
      <div class="contact-item-heading">${profileIcon(type)}<span>${esc(label)}</span></div>
      ${url
        ? `<a href="${escAttr(url)}" ${isExternal?'target="_blank" rel="noopener"':""}>${esc(value)}${isExternal?' ↗':""}</a>`
        : `<strong>${esc(value)}</strong>`}
    </div>`).join("");
  $("contactMedia").innerHTML=mediaHtml(d.contact?.media||[]);

  const socialStyle=d.siteSettings?.experience?.socialStyle||"labels";
  const sideDefs=[
    ["email","Email",d.contact?.email?`mailto:${d.contact.email}`:"",false],
    ["linkedin","LinkedIn",safeUrl(d.links?.linkedin),true],
    ["github","GitHub",safeUrl(d.links?.github),true],
    ["orcid","ORCID",safeUrl(d.links?.orcid),true],
    ["scholar","Google Scholar",safeUrl(d.links?.scholar),true],
    ["researchgate","ResearchGate",safeUrl(d.links?.researchgate),true],
    ["scopus","Scopus",safeUrl(d.links?.scopus),true],
    ["wos","Web of Science",safeUrl(d.links?.wos),true],
    ["website","Website",safeUrl(d.links?.website),true]
  ];
  $("sidebarLinks").classList.toggle("social-icons-layout",socialStyle==="icons");
  $("sidebarLinks").innerHTML=sideDefs
    .filter(([, ,url])=>url)
    .map(([type,label,url,isExternal])=>iconLinkHtml(type,label,url,isExternal,socialStyle))
    .join("");

  if(d.cv?.url){
    [$("cvLink"),$("sidebarCv")].forEach(a=>{
      a.href=d.cv.url;a.classList.remove("disabled","hidden");a.removeAttribute("aria-disabled");
    });
    $("cvLink").textContent="View / Download CV";
    $("cvNote").textContent=d.cv.updated_at?`Current CV · updated ${formatDate(d.cv.updated_at)}`:"Current academic CV.";
  }
  applySiteSettings(d);
}

function mediaHtml(media){
  media=(media||[]).filter(m=>safeUrl(m.url));
  if(!media.length)return"";
  const visual=[],links=[];
  media.forEach(m=>{
    const type=m.type||"link",url=safeUrl(m.url),title=m.title||m.filename||labelFor(type),caption=m.caption||"";
    if(type==="image"){
      const alt=m.alt||title||"Image";
      const aspect=["original","square","4x3","16x9"].includes(m.aspect)?m.aspect:"original";
      const fit=["cover","contain"].includes(m.fit)?m.fit:"cover";
      const position=["center","top","bottom","left","right"].includes(m.position)?m.position:"center";
      const width=["auto","full","half","third"].includes(m.width)?m.width:"auto";
      const enlarge=["inherit","on","off"].includes(m.enlarge)?m.enlarge:"inherit";
      visual.push(`<figure class="media-public-item media-width-${escAttr(width)}">
        <a class="media-image-stage media-aspect-${escAttr(aspect)}" href="${escAttr(url)}" target="_blank" rel="noopener">
          <img class="media-public-image image-fit-${escAttr(fit)} crop-${escAttr(position)}" data-lightbox="${escAttr(enlarge)}" src="${escAttr(url)}" alt="${escAttr(alt)}" loading="lazy">
        </a>
        ${(title||caption)?`<figcaption class="media-public-info">${title?`<strong>${esc(title)}</strong>`:""}${caption?`<p>${esc(caption)}</p>`:""}</figcaption>`:""}
      </figure>`);
    }else if(type==="video"){
      const embed=videoEmbed(url);
      visual.push(`<div class="media-public-item">
        ${embed?`<div class="media-video-embed"><iframe src="${escAttr(embed)}" title="${escAttr(title)}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen loading="lazy"></iframe></div>`:
        `<video class="media-public-video" controls preload="metadata" src="${escAttr(url)}"></video>`}
        ${(title||caption)?`<div class="media-public-info">${title?`<strong>${esc(title)}</strong>`:""}${caption?`<p>${esc(caption)}</p>`:""}</div>`:""}
      </div>`);
    }else if(type==="pdf"){
      const thumb=safeUrl(m.thumbnail_url);
      visual.push(`<article class="media-public-item pdf-preview-card">
        <a class="pdf-cover-link" href="${escAttr(url)}" target="_blank" rel="noopener" aria-label="Open ${escAttr(title)}">
          ${thumb
            ? `<img class="pdf-cover-image" src="${escAttr(thumb)}" alt="Preview of ${escAttr(title)}" loading="lazy">`
            : `<div class="pdf-cover-placeholder">
                 <span class="pdf-file-mark">PDF</span>
                 <span class="pdf-placeholder-text">PDF document</span>
               </div>`}
        </a>
        <div class="media-public-info pdf-preview-info">
          <div>
            <strong>${esc(title)}</strong>
            ${caption?`<p>${esc(caption)}</p>`:""}
          </div>
          <a class="pdf-open-button" href="${escAttr(url)}" target="_blank" rel="noopener">Open PDF ↗</a>
        </div>
      </article>`);
    }else{
      links.push(`<a class="attachment-link" href="${escAttr(url)}" target="_blank" rel="noopener">Link · ${esc(title)} ↗</a>`);
    }
  });
  const html=`${visual.length?`<div class="media-gallery">${visual.join("")}</div>`:""}${links.length?`<div class="attachment-links">${links.join("")}</div>`:""}`;
  return html;
}

function videoEmbed(url){
  try{
    const u=new URL(url);
    if(u.hostname.includes("youtube.com")){
      const id=u.searchParams.get("v");
      if(id)return`https://www.youtube.com/embed/${encodeURIComponent(id)}`;
      const m=u.pathname.match(/\/(?:embed|shorts)\/([^/?]+)/);if(m)return`https://www.youtube.com/embed/${encodeURIComponent(m[1])}`;
    }
    if(u.hostname==="youtu.be"){
      const id=u.pathname.slice(1).split("/")[0];if(id)return`https://www.youtube.com/embed/${encodeURIComponent(id)}`;
    }
    if(u.hostname.includes("vimeo.com")){
      const id=u.pathname.split("/").filter(Boolean).pop();
      if(/^\d+$/.test(id||""))return`https://player.vimeo.com/video/${id}`;
    }
  }catch{}
  return"";
}
function labelFor(t){return{image:"Image",video:"Video",pdf:"PDF",link:"Link"}[t]||"Attachment"}
function safeUrl(u){u=String(u||"").trim();return/^https?:\/\//i.test(u)?u:""}
function esc(s){return String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#39;"}[c]))}
function escAttr(s){return esc(String(s??"").replace(/javascript:/gi,""))}
function formatDate(v){try{return new Date(v).toLocaleDateString(undefined,{year:"numeric",month:"short",day:"numeric"})}catch{return""}}


const IS_ADMIN_PREVIEW=new URLSearchParams(location.search).get("adminPreview")==="1";
if(IS_ADMIN_PREVIEW){
  document.documentElement.classList.add("admin-preview-mode");
  window.addEventListener("message",e=>{
    if(e.origin!==location.origin)return;
    if(e.data?.type!=="academic-site-preview"||!e.data.content)return;
    try{
      render(normalize(merge(DEFAULT_CONTENT,deepCloneSafe(e.data.content))));
    }catch(err){console.error("Preview render failed:",err)}
  });
}

$("year").textContent=new Date().getFullYear();
if(IS_ADMIN_PREVIEW){
  render(normalize(structuredClone(DEFAULT_CONTENT)));
}else{
  loadContent();
}

// active-nav-bottom-fix: 20260824-v1
