const DEFAULT_CONTENT={
  "name":"Ibtida Yasin",
  "title":"Mechanical Engineering Graduate",
  "institution":"Shahjalal University of Science and Technology (SUST)",
  "location":"Bangladesh",
  "focus":"Computational Materials · Molecular Dynamics · Nanomechanics",
  "aboutHeadline":"Mechanical engineering with an atomistic materials focus.",
  "aboutLead":"I am a Mechanical Engineering graduate from Shahjalal University of Science and Technology (SUST), interested in computational materials science, molecular dynamics, nanoscale mechanics, and scientific computing.",
  "aboutBio":"My research work focuses on atomistic simulation of compositionally graded metallic nanostructures, with emphasis on how composition, crystallographic orientation, temperature, and defects influence deformation and mechanical response.",
  "researchInterests":["Computational materials science and atomistic simulation","Molecular dynamics of metallic nanostructures","Nanoscale deformation and plasticity","Compositionally graded materials","Crystallographic effects on mechanical behaviour","Scientific computing and research data analysis"],
  "researchInterestGroups":null,
  "featuredResearch":{"title":"Radially graded Cu–Ni nanowires under tensile loading","description":"A classical molecular dynamics study of how radial composition grading, crystallographic orientation, temperature, and surface defects influence tensile behaviour and deformation mechanisms in Cu–Ni nanowires.","tags":["LAMMPS","Python","OVITO","PTM","DXA","RDF"],"media":[]},
  "publications":[],
  "projects":[
    {"title":"Atomistic Structure Generation","contribution":"","description":"Python-based generation and manipulation of nanoscale structures for molecular dynamics simulations.","meta":"Python · LAMMPS","url":"","media":[]},
    {"title":"MD Data Analysis","contribution":"","description":"Post-processing of simulation data, stress–strain analysis, comparison across cases, and scientific plotting.","meta":"Python · Matplotlib","url":"","media":[]},
    {"title":"Atomistic Mechanism Analysis","contribution":"","description":"Structural and defect analysis using PTM, DXA, RDF, atomic strain, and visualization workflows.","meta":"OVITO","url":"","media":[]}
  ],
  "academicActivities": [],
  "skills":[
    {"category":"Simulation","items":["LAMMPS","Classical molecular dynamics","EAM potentials"],"media":[]},
    {"category":"Scientific Computing","items":["Python","NumPy","Matplotlib"],"media":[]},
    {"category":"Atomistic Analysis","items":["OVITO","PTM","DXA","RDF"],"media":[]}
  ],
  "education":[{"period":"B.Sc.","degree":"Mechanical Engineering","institution":"Shahjalal University of Science and Technology (SUST)","description":"Mechanical engineering education with growing focus on computational materials and atomistic simulation.","media":[]}],
  "contact":{"headline":"Interested in computational materials and nanoscale mechanics?","message":"I am open to research discussions, graduate opportunities, and collaborations related to computational materials science and atomistic simulation.","email":"","phone":"","location":"Bangladesh","media":[]},
  "links":{"linkedin":"","github":"https://github.com/ibtidayasin","orcid":"","scholar":"","researchgate":"","scopus":"","wos":"","website":""},
  "cv":{"url":"","filename":"","updated_at":""},
  "photo_url":"",
  "defaultTheme":"classic-brown",
  "sectionMedia":{"profile":[]}
};


const DEFAULT_SECTION_HEADINGS={
  about:{title:"About Me",subtitle:"Mechanical engineering with an atomistic materials focus."},
  research:{title:"Research Interests",subtitle:"What I work on"},
  thesis:{title:"Undergraduate Thesis",subtitle:"Research Thesis"},
  publications:{title:"Publications",subtitle:"Research output"},
  projects:{title:"Projects & Simulations",subtitle:"Selected technical and computational work"},
  activities:{title:"Academic Activities",subtitle:"Presentations, training, and recognition"},
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
  sectionSubtitleColor:"",
  bodyTextSize:16,
  bodyTextColor:"",
  bodyLineHeight:1.7,
  cardTitleSize:20,
  navTextSize:13
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
      sectionSubtitleColor:validHex(raw.sectionSubtitleColor)?raw.sectionSubtitleColor:"",
      bodyTextSize:clampNumber(raw.bodyTextSize,14,20,DEFAULT_TYPOGRAPHY.bodyTextSize),
      bodyTextColor:validHex(raw.bodyTextColor)?raw.bodyTextColor:"",
      bodyLineHeight:clampNumber(raw.bodyLineHeight,1.4,2,DEFAULT_TYPOGRAPHY.bodyLineHeight),
      cardTitleSize:clampNumber(raw.cardTitleSize,16,28,DEFAULT_TYPOGRAPHY.cardTitleSize),
      navTextSize:clampNumber(raw.navTextSize,11,16,DEFAULT_TYPOGRAPHY.navTextSize)
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


function applyAdminTypographyPreview(){
  normalizeTypography(currentContent);
  const t=currentContent.appearance.typography;
  const root=document.documentElement;
  root.style.setProperty("--public-section-title-size",`${t.sectionTitleSize}px`);
  root.style.setProperty("--public-section-subtitle-size",`${t.sectionSubtitleSize}px`);
  root.style.setProperty("--public-section-title-color",t.sectionTitleColor||"var(--accent)");
  root.style.setProperty("--public-section-subtitle-color",t.sectionSubtitleColor||"var(--muted)");
  root.style.setProperty("--public-body-size",`${t.bodyTextSize}px`);
  root.style.setProperty("--public-body-color",t.bodyTextColor||"var(--text)");
  root.style.setProperty("--public-line-height",String(t.bodyLineHeight));
  root.style.setProperty("--public-card-title-size",`${t.cardTitleSize}px`);
  root.style.setProperty("--public-nav-text-size",`${t.navTextSize}px`);
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


const CUSTOM_THEME_FIELDS=[
  ["bg","fCustomBg"],
  ["surface","fCustomSurface"],
  ["surfaceAlt","fCustomSurfaceAlt"],
  ["text","fCustomText"],
  ["muted","fCustomMuted"],
  ["line","fCustomLine"],
  ["accent","fCustomAccent"],
  ["accentSoft","fCustomAccentSoft"],
  ["portraitA","fCustomPortraitA"],
  ["portraitB","fCustomPortraitB"]
];

function readCustomThemeControls(){
  const out={};
  CUSTOM_THEME_FIELDS.forEach(([key,id])=>{
    const el=$(id);
    out[key]=validHex(el?.value)?el.value.toUpperCase():DEFAULT_CUSTOM_THEME[key];
  });
  return out;
}

function fillCustomThemeControls(){
  normalizeCustomTheme(currentContent);
  const t=currentContent.appearance.customTheme;
  CUSTOM_THEME_FIELDS.forEach(([key,id])=>{
    if($(id))$(id).value=t[key];
    const hex=$(id+"Hex");
    if(hex)hex.value=t[key];
  });
}

function syncCustomThemeHexPair(colorId){
  const picker=$(colorId),hex=$(colorId+"Hex");
  if(!picker||!hex)return;
  picker.addEventListener("input",()=>{
    hex.value=picker.value.toUpperCase();
    previewCustomThemeFromControls();
  });
  hex.addEventListener("input",()=>{
    const v=hex.value.trim();
    if(validHex(v)){
      picker.value=v;
      previewCustomThemeFromControls();
    }
  });
}

function previewCustomThemeFromControls(){
  normalizeCustomTheme(currentContent);
  currentContent.appearance.customTheme=readCustomThemeControls();
  const customSelected=selectedAdminTheme()==="custom-theme";
  const preview=document.querySelector('[data-theme-card="custom-theme"] .custom-theme-mini-preview');
  if(preview){
    const t=currentContent.appearance.customTheme;
    preview.style.setProperty("--tc-bg",t.bg);
    preview.style.setProperty("--tc-text",t.text);
    preview.style.setProperty("--tc-accent",t.accent);
    preview.style.setProperty("--tc-soft",t.accentSoft);
  }
  if(customSelected){
    document.documentElement.dataset.theme="custom-theme";
    applyCustomThemeVariables(currentContent.appearance.customTheme);
    showCurrentThemeColorsInBoxes();
  }
  updateTypographyUndoButton();
}

function resetCustomThemeBuilder(){
  normalizeCustomTheme(currentContent);
  currentContent.appearance.customTheme=structuredClone(DEFAULT_CUSTOM_THEME);
  fillCustomThemeControls();
  fillSiteCustomizationControls();
  if(selectedAdminTheme()==="custom-theme"){
    document.documentElement.dataset.theme="custom-theme";
    applyCustomThemeVariables(currentContent.appearance.customTheme);
    showCurrentThemeColorsInBoxes();
  }
  setStatus("Custom theme reset to its starter palette. Click Save all changes to publish it.");
}

let typographySavedSnapshot=null;

function typographyStateFromContent(){
  normalizeTypography(currentContent);
  normalizeSiteSettings(currentContent);
  return {...structuredClone(currentContent.appearance.typography),fontPair:currentContent.siteSettings.layout.fontPair};
}

function typographyStatesEqual(a,b){
  return JSON.stringify(a||null)===JSON.stringify(b||null);
}

function updateTypographyUndoButton(){
  const btn=$("undoTypographyBtn");
  if(!btn)return;
  const now=typographyStateFromContent();
  btn.disabled=!typographySavedSnapshot||typographyStatesEqual(now,typographySavedSnapshot);
}


function currentThemeTypographyColors(){
  const cs=getComputedStyle(document.documentElement);
  const accent=cs.getPropertyValue("--accent").trim();
  const muted=cs.getPropertyValue("--muted").trim();
  const text=cs.getPropertyValue("--text").trim();
  return {
    title:validHex(accent)?accent.toUpperCase():"#9F8064",
    subtitle:validHex(muted)?muted.toUpperCase():"#746E66",
    body:validHex(text)?text.toUpperCase():"#202328"
  };
}

function showCurrentThemeColorsInBoxes(){
  const colors=currentThemeTypographyColors();
  $("useThemeSectionTitleColor").checked=true;
  $("useThemeSectionSubtitleColor").checked=true;
  $("useThemeBodyTextColor").checked=true;
  $("fSectionTitleColor").value=colors.title;
  $("fSectionTitleColorText").value=colors.title;
  $("fSectionSubtitleColor").value=colors.subtitle;
  $("fSectionSubtitleColorText").value=colors.subtitle;
  $("fBodyTextColor").value=colors.body;
  $("fBodyTextColorText").value=colors.body;
  normalizeTypography(currentContent);
  currentContent.appearance.typography.sectionTitleColor="";
  currentContent.appearance.typography.sectionSubtitleColor="";
  currentContent.appearance.typography.bodyTextColor="";
  syncTypographyDisabledState();
  applyAdminTypographyPreview();
  updateTypographyUndoButton();
}

function renderTypographyControlsFromState(t){
  normalizeSiteSettings(currentContent);
  const state={
    sectionTitleSize:clampNumber(t?.sectionTitleSize,30,60,DEFAULT_TYPOGRAPHY.sectionTitleSize),
    sectionTitleColor:validHex(t?.sectionTitleColor)?t.sectionTitleColor:"",
    sectionSubtitleSize:clampNumber(t?.sectionSubtitleSize,16,34,DEFAULT_TYPOGRAPHY.sectionSubtitleSize),
    sectionSubtitleColor:validHex(t?.sectionSubtitleColor)?t.sectionSubtitleColor:"",
    bodyTextSize:clampNumber(t?.bodyTextSize,14,20,DEFAULT_TYPOGRAPHY.bodyTextSize),
    bodyTextColor:validHex(t?.bodyTextColor)?t.bodyTextColor:"",
    bodyLineHeight:clampNumber(t?.bodyLineHeight,1.4,2,DEFAULT_TYPOGRAPHY.bodyLineHeight),
    cardTitleSize:clampNumber(t?.cardTitleSize,16,28,DEFAULT_TYPOGRAPHY.cardTitleSize),
    navTextSize:clampNumber(t?.navTextSize,11,16,DEFAULT_TYPOGRAPHY.navTextSize)
  };
  const fontPair=Object.prototype.hasOwnProperty.call(SITE_FONT_PAIRS,t?.fontPair)?t.fontPair:currentContent.siteSettings.layout.fontPair;
  [["fSectionTitleSize","fSectionTitleSizeNumber",state.sectionTitleSize],["fSectionSubtitleSize","fSectionSubtitleSizeNumber",state.sectionSubtitleSize],["fBodyTextSize","fBodyTextSizeNumber",state.bodyTextSize],["fBodyLineHeight","fBodyLineHeightNumber",state.bodyLineHeight],["fCardTitleSize","fCardTitleSizeNumber",state.cardTitleSize],["fNavTextSize","fNavTextSizeNumber",state.navTextSize]].forEach(([a,b,v])=>{if($(a))$(a).value=v;if($(b))$(b).value=v});
  if($("fFontPair"))$("fFontPair").value=fontPair;
  currentContent.siteSettings.layout.fontPair=fontPair;
  const themeColors=currentThemeTypographyColors();
  $("fSectionTitleColor").value=state.sectionTitleColor||themeColors.title;
  $("fSectionSubtitleColor").value=state.sectionSubtitleColor||themeColors.subtitle;
  $("fBodyTextColor").value=state.bodyTextColor||themeColors.body;
  $("fSectionTitleColorText").value=state.sectionTitleColor||themeColors.title;
  $("fSectionSubtitleColorText").value=state.sectionSubtitleColor||themeColors.subtitle;
  $("fBodyTextColorText").value=state.bodyTextColor||themeColors.body;
  $("useThemeSectionTitleColor").checked=!state.sectionTitleColor;
  $("useThemeSectionSubtitleColor").checked=!state.sectionSubtitleColor;
  $("useThemeBodyTextColor").checked=!state.bodyTextColor;
  syncTypographyDisabledState();
  currentContent.appearance.typography=structuredClone(state);
  applyAdminTypographyPreview();
  updateTypographyUndoButton();
}

function fillTypographyControls(){
  normalizeTypography(currentContent);
  normalizeSiteSettings(currentContent);
  const t=typographyStateFromContent();
  typographySavedSnapshot=structuredClone(t);
  renderTypographyControlsFromState(t);
}

function syncTypographyDisabledState(){
  ["fSectionTitleColor","fSectionTitleColorText","fSectionSubtitleColor","fSectionSubtitleColorText","fBodyTextColor","fBodyTextColorText"].forEach(id=>{if($(id))$(id).disabled=false});
}

function syncColorPickerToText(pickerId,textId,themeToggleId){
  const picker=$(pickerId),text=$(textId),toggle=$(themeToggleId);
  if(!picker||!text)return;

  picker.addEventListener("input",()=>{
    if(toggle)toggle.checked=false;
    text.value=picker.value.toUpperCase();
    previewTypographyFromControls();
  });

  text.addEventListener("input",()=>{
    const value=text.value.trim();
    if(validHex(value)){
      if(toggle)toggle.checked=false;
      picker.value=value;
    }
    previewTypographyFromControls();
  });
}

function previewTypographyFromControls(){
  normalizeTypography(currentContent);
  normalizeSiteSettings(currentContent);
  const t=currentContent.appearance.typography;
  t.sectionTitleSize=clampNumber($("fSectionTitleSize").value,30,60,44);
  t.sectionSubtitleSize=clampNumber($("fSectionSubtitleSize").value,16,34,25);
  t.bodyTextSize=clampNumber($("fBodyTextSize").value,14,20,16);
  t.bodyLineHeight=clampNumber($("fBodyLineHeight").value,1.4,2,1.7);
  t.cardTitleSize=clampNumber($("fCardTitleSize").value,16,28,20);
  t.navTextSize=clampNumber($("fNavTextSize").value,11,16,13);
  t.sectionTitleColor=$("useThemeSectionTitleColor").checked?"":($("fSectionTitleColorText").value.trim()||$("fSectionTitleColor").value);
  t.sectionSubtitleColor=$("useThemeSectionSubtitleColor").checked?"":($("fSectionSubtitleColorText").value.trim()||$("fSectionSubtitleColor").value);
  t.bodyTextColor=$("useThemeBodyTextColor").checked?"":($("fBodyTextColorText").value.trim()||$("fBodyTextColor").value);
  ["sectionTitleColor","sectionSubtitleColor","bodyTextColor"].forEach(k=>{if(t[k]&&!validHex(t[k]))t[k]=""});
  if($("fFontPair"))currentContent.siteSettings.layout.fontPair=$("fFontPair").value;
  applyAdminTypographyPreview();
  updateTypographyUndoButton();
}

function resetTypographyControls(){
  const defaults=structuredClone(DEFAULT_TYPOGRAPHY);
  const themeColors=currentThemeTypographyColors();
  [["fSectionTitleSize","fSectionTitleSizeNumber",defaults.sectionTitleSize],["fSectionSubtitleSize","fSectionSubtitleSizeNumber",defaults.sectionSubtitleSize],["fBodyTextSize","fBodyTextSizeNumber",defaults.bodyTextSize],["fBodyLineHeight","fBodyLineHeightNumber",defaults.bodyLineHeight],["fCardTitleSize","fCardTitleSizeNumber",defaults.cardTitleSize],["fNavTextSize","fNavTextSizeNumber",defaults.navTextSize]].forEach(([a,b,v])=>{$(a).value=v;$(b).value=v});
  $("fFontPair").value=DEFAULT_SITE_SETTINGS.layout.fontPair;
  $("useThemeSectionTitleColor").checked=true; $("useThemeSectionSubtitleColor").checked=true; $("useThemeBodyTextColor").checked=true;
  $("fSectionTitleColor").value=themeColors.title; $("fSectionTitleColorText").value=themeColors.title;
  $("fSectionSubtitleColor").value=themeColors.subtitle; $("fSectionSubtitleColorText").value=themeColors.subtitle;
  $("fBodyTextColor").value=themeColors.body; $("fBodyTextColorText").value=themeColors.body;
  normalizeSiteSettings(currentContent); currentContent.siteSettings.layout.fontPair=DEFAULT_SITE_SETTINGS.layout.fontPair;
  syncTypographyDisabledState(); previewTypographyFromControls();
  setStatus("Typography reset to defaults. Click Save all changes to publish it.");
}

function undoTypographyControls(){
  if(!typographySavedSnapshot){
    setStatus("No saved typography state is available to restore.");
    return;
  }
  renderTypographyControlsFromState(typographySavedSnapshot);
  setStatus("Unsaved typography changes were undone.");
}

const SITE_SECTION_KEYS=["about","research","thesis","publications","projects","activities","skills","education","contact","cv"];
const COVER_SECTION_KEYS=["research","thesis","publications","projects","activities","skills","education","contact","cv"];
const SIDEBAR_SECTION_KEYS=[...COVER_SECTION_KEYS];
const CARD_STYLE_SECTION_KEYS=["thesis","publications","projects","activities","skills","education","contact"];
const CARD_STYLE_VALUES=["classic","clean","outline","soft","accent","elevated"];
const CARD_DESIGN_VALUES=["standard","editorial","banded","ledger","spotlight","framed","activity-split","activity-showcase","activity-media-fill","activity-certificate-full","activity-certificate-grid"];
const DEFAULT_SITE_SETTINGS={
  sectionOrder:["about","research","thesis","publications","projects","activities","skills","education","contact","cv"],
  sectionVisibility:{
    about:true,research:true,thesis:true,publications:true,projects:true,activities:true,skills:true,education:true,contact:true,cv:true
  },
  layout:{
    maxWidth:1180,
    sidebarWidth:255,
    layoutGap:58,
    sectionSpacing:40,
    cardRadius:11,
    cardStyles:{thesis:"classic",publications:"classic",projects:"classic",activities:"classic",skills:"clean",education:"classic",contact:"classic"},
    cardDesigns:{thesis:"standard",publications:"standard",projects:"standard",activities:"standard",skills:"standard",education:"standard",contact:"standard"},
    portraitSize:190,
    portraitShape:"slight",
    portraitFit:"cover",
    portraitPosition:"center",
    projectColumns:3,
    projectFlow:"grid",
    activityColumns:2,
    skillsColumns:3,
    fontPair:"classic",
    shadow:"theme",
    stickySidebar:true,
    navigationMode:"single",
    pageTransition:"fade",
    pagePager:true,
    sidebarScope:"home-cv",
    sidebarSections:{research:false,thesis:false,publications:false,projects:false,activities:false,skills:false,education:false,contact:false,cv:true},
    sectionCoverEnabled:true,
    sectionCoverScope:"research",
    sectionCoverSections:{research:true,thesis:true,publications:false,projects:false,activities:false,skills:false,education:false,contact:false,cv:false},
    sectionCoverStyle:"framed",
    sectionCoverPhotoFit:"crop",
    sectionCoverTopBlend:false,
    sectionCoverSide:"right",
    sectionCoverHeight:300,
    sectionCoverGap:12,
    sectionCoverZoom:100,
    sectionCoverFade:"medium",
    sectionCoverDetails:true,
    sectionCoverSocials:true
  },
  experience:{
    activeNav:true,
    animations:"subtle",
    hoverInteractions:"subtle",
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
  modern:{body:'"Segoe UI", Arial, sans-serif',heading:'"Segoe UI", Arial, sans-serif'},
  humanist:{body:'"Segoe UI", Arial, sans-serif',heading:"Georgia, serif"},
  editorial:{body:'Georgia, "Times New Roman", serif',heading:'Georgia, "Times New Roman", serif'},
  palatino:{body:'"Segoe UI", Arial, sans-serif',heading:'"Palatino Linotype", "Book Antiqua", Palatino, serif'},
  bookish:{body:'"Palatino Linotype", "Book Antiqua", Palatino, serif',heading:"Georgia, serif"},

  // Popular single-font presets. Each applies consistently to body and headings.
  timesNewRoman:{body:'"Times New Roman", Times, serif',heading:'"Times New Roman", Times, serif'},
  georgiaFont:{body:'Georgia, "Times New Roman", serif',heading:'Georgia, "Times New Roman", serif'},
  cambria:{body:'Cambria, Georgia, serif',heading:'Cambria, Georgia, serif'},
  cambriaMath:{body:'"Cambria Math", Cambria, "Times New Roman", serif',heading:'"Cambria Math", Cambria, "Times New Roman", serif'},
  garamond:{body:'Garamond, "Times New Roman", serif',heading:'Garamond, "Times New Roman", serif'},
  palatinoFont:{body:'"Palatino Linotype", "Book Antiqua", Palatino, serif',heading:'"Palatino Linotype", "Book Antiqua", Palatino, serif'},
  bookAntiquaFont:{body:'"Book Antiqua", "Palatino Linotype", Palatino, serif',heading:'"Book Antiqua", "Palatino Linotype", Palatino, serif'},
  baskerville:{body:'Baskerville, "Times New Roman", serif',heading:'Baskerville, "Times New Roman", serif'},
  arialFont:{body:'Arial, Helvetica, sans-serif',heading:'Arial, Helvetica, sans-serif'},
  helvetica:{body:'Helvetica, Arial, sans-serif',heading:'Helvetica, Arial, sans-serif'},
  segoeUI:{body:'"Segoe UI", Arial, sans-serif',heading:'"Segoe UI", Arial, sans-serif'},
  calibri:{body:'Calibri, "Segoe UI", Arial, sans-serif',heading:'Calibri, "Segoe UI", Arial, sans-serif'},
  verdana:{body:'Verdana, Geneva, sans-serif',heading:'Verdana, Geneva, sans-serif'},
  tahoma:{body:'Tahoma, Verdana, sans-serif',heading:'Tahoma, Verdana, sans-serif'},
  trebuchetMS:{body:'"Trebuchet MS", Arial, sans-serif',heading:'"Trebuchet MS", Arial, sans-serif'},
  centuryGothic:{body:'"Century Gothic", Arial, sans-serif',heading:'"Century Gothic", Arial, sans-serif'},
  arialNarrow:{body:'"Arial Narrow", Arial, sans-serif',heading:'"Arial Narrow", Arial, sans-serif'},
  courierNew:{body:'"Courier New", Courier, monospace',heading:'"Courier New", Courier, monospace'},
  consolas:{body:'Consolas, "Courier New", monospace',heading:'Consolas, "Courier New", monospace'},
  lucidaSans:{body:'"Lucida Sans Unicode", "Lucida Grande", Arial, sans-serif',heading:'"Lucida Sans Unicode", "Lucida Grande", Arial, sans-serif'}
};

function normalizeSiteSettings(content){
  const raw=(content.siteSettings&&typeof content.siteSettings==="object")?content.siteSettings:{};
  const rawOrder=Array.isArray(raw.sectionOrder)?raw.sectionOrder.filter(x=>SITE_SECTION_KEYS.includes(x)):[];
  const mergedOrder=[...new Set([...rawOrder,...SITE_SECTION_KEYS])];
  const order=rawOrder.includes("activities")?mergedOrder:(()=>{
    const next=mergedOrder.filter(k=>k!=="activities");
    const projectIndex=next.indexOf("projects");
    next.splice(projectIndex>=0?projectIndex+1:next.length,0,"activities");
    return next;
  })();
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
      cardStyles:Object.fromEntries(CARD_STYLE_SECTION_KEYS.map(k=>[k,CARD_STYLE_VALUES.includes(l.cardStyles?.[k])?l.cardStyles[k]:DEFAULT_SITE_SETTINGS.layout.cardStyles[k]])),
      cardDesigns:Object.fromEntries(CARD_STYLE_SECTION_KEYS.map(k=>[k,CARD_DESIGN_VALUES.includes(l.cardDesigns?.[k])?l.cardDesigns[k]:DEFAULT_SITE_SETTINGS.layout.cardDesigns[k]])),
      portraitSize:clampNumber(l.portraitSize,140,250,DEFAULT_SITE_SETTINGS.layout.portraitSize),
      portraitShape:["square","slight","rounded","circle"].includes(l.portraitShape)?l.portraitShape:DEFAULT_SITE_SETTINGS.layout.portraitShape,
      portraitFit:["cover","contain"].includes(l.portraitFit)?l.portraitFit:DEFAULT_SITE_SETTINGS.layout.portraitFit,
      portraitPosition:["center","top","bottom","left","right"].includes(l.portraitPosition)?l.portraitPosition:DEFAULT_SITE_SETTINGS.layout.portraitPosition,
      projectColumns:[1,2,3].includes(Number(l.projectColumns))?Number(l.projectColumns):DEFAULT_SITE_SETTINGS.layout.projectColumns,
      projectFlow:["grid","masonry"].includes(l.projectFlow)?l.projectFlow:DEFAULT_SITE_SETTINGS.layout.projectFlow,
      activityColumns:[1,2,3].includes(Number(l.activityColumns))?Number(l.activityColumns):DEFAULT_SITE_SETTINGS.layout.activityColumns,
      skillsColumns:[1,2,3].includes(Number(l.skillsColumns))?Number(l.skillsColumns):DEFAULT_SITE_SETTINGS.layout.skillsColumns,
      fontPair:Object.prototype.hasOwnProperty.call(SITE_FONT_PAIRS,l.fontPair)?l.fontPair:DEFAULT_SITE_SETTINGS.layout.fontPair,
      shadow:["theme","none","subtle","medium"].includes(l.shadow)?l.shadow:DEFAULT_SITE_SETTINGS.layout.shadow,
      stickySidebar:Object.prototype.hasOwnProperty.call(l,"stickySidebar")?l.stickySidebar!==false:DEFAULT_SITE_SETTINGS.layout.stickySidebar,
      navigationMode:["single","sections"].includes(l.navigationMode)?l.navigationMode:DEFAULT_SITE_SETTINGS.layout.navigationMode,
      pageTransition:["none","fade","slide"].includes(l.pageTransition)?l.pageTransition:DEFAULT_SITE_SETTINGS.layout.pageTransition,
      pagePager:Object.prototype.hasOwnProperty.call(l,"pagePager")?l.pagePager!==false:DEFAULT_SITE_SETTINGS.layout.pagePager,
      sidebarScope:["home-cv","all","home","custom"].includes(l.sidebarScope)?l.sidebarScope:DEFAULT_SITE_SETTINGS.layout.sidebarScope,
      sidebarSections:Object.fromEntries(SIDEBAR_SECTION_KEYS.map(k=>[k,(l.sidebarSections&&Object.prototype.hasOwnProperty.call(l.sidebarSections,k))?l.sidebarSections[k]===true:DEFAULT_SITE_SETTINGS.layout.sidebarSections[k]===true])),
      sectionCoverEnabled:Object.prototype.hasOwnProperty.call(l,"sectionCoverEnabled")?l.sectionCoverEnabled!==false:DEFAULT_SITE_SETTINGS.layout.sectionCoverEnabled,
      sectionCoverScope:["research","all","none","custom"].includes(l.sectionCoverScope)?l.sectionCoverScope:DEFAULT_SITE_SETTINGS.layout.sectionCoverScope,
      sectionCoverSections:Object.fromEntries(COVER_SECTION_KEYS.map(k=>[k,(l.sectionCoverSections&&Object.prototype.hasOwnProperty.call(l.sectionCoverSections,k))?l.sectionCoverSections[k]===true:DEFAULT_SITE_SETTINGS.layout.sectionCoverSections[k]===true])),
      sectionCoverStyle:["framed","fullbleed","split","glass"].includes(l.sectionCoverStyle)?l.sectionCoverStyle:DEFAULT_SITE_SETTINGS.layout.sectionCoverStyle,
      sectionCoverPhotoFit:["crop","full"].includes(l.sectionCoverPhotoFit)?l.sectionCoverPhotoFit:DEFAULT_SITE_SETTINGS.layout.sectionCoverPhotoFit,
      sectionCoverTopBlend:Object.prototype.hasOwnProperty.call(l,"sectionCoverTopBlend")?l.sectionCoverTopBlend===true:DEFAULT_SITE_SETTINGS.layout.sectionCoverTopBlend,
      sectionCoverSide:["left","right"].includes(l.sectionCoverSide)?l.sectionCoverSide:DEFAULT_SITE_SETTINGS.layout.sectionCoverSide,
      sectionCoverHeight:clampNumber(l.sectionCoverHeight,220,420,DEFAULT_SITE_SETTINGS.layout.sectionCoverHeight),
      sectionCoverGap:[0,12,24,42].includes(Number(l.sectionCoverGap))?Number(l.sectionCoverGap):DEFAULT_SITE_SETTINGS.layout.sectionCoverGap,
      sectionCoverZoom:clampNumber(l.sectionCoverZoom,40,170,DEFAULT_SITE_SETTINGS.layout.sectionCoverZoom),
      sectionCoverFade:["soft","medium","strong"].includes(l.sectionCoverFade)?l.sectionCoverFade:DEFAULT_SITE_SETTINGS.layout.sectionCoverFade,
      sectionCoverDetails:Object.prototype.hasOwnProperty.call(l,"sectionCoverDetails")?l.sectionCoverDetails!==false:DEFAULT_SITE_SETTINGS.layout.sectionCoverDetails,
      sectionCoverSocials:Object.prototype.hasOwnProperty.call(l,"sectionCoverSocials")?l.sectionCoverSocials!==false:DEFAULT_SITE_SETTINGS.layout.sectionCoverSocials
    },
    experience:{
      ...e,
      activeNav:experienceBool("activeNav"),
      animations:["off","subtle","normal"].includes(e.animations)?e.animations:DEFAULT_SITE_SETTINGS.experience.animations,
      hoverInteractions:["off","subtle","lift","glow"].includes(e.hoverInteractions)?e.hoverInteractions:DEFAULT_SITE_SETTINGS.experience.hoverInteractions,
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






function updateCoverStyleSpecificControls(){
  const fullBleed=$("fSectionCoverStyle")?.value==="fullbleed";
  const scope=$("fSectionCoverScope")?.value||"research";
  const enabled=$("fSectionCoverEnabled")?.checked===true&&$("fNavigationModeSections")?.checked===true&&scope!=="none";
  if($("fSectionCoverTopBlend")){
    $("fSectionCoverTopBlend").disabled=!(enabled&&fullBleed);
    $("fSectionCoverTopBlend").closest(".setting-toggle")?.classList.toggle("disabled-options",!(enabled&&fullBleed));
  }
}

function resetSectionCoverControls(){
  const defaults=DEFAULT_SITE_SETTINGS.layout;
  setHistoryMuted(()=>{
    $("fSectionCoverEnabled").checked=defaults.sectionCoverEnabled!==false;
    $("fSectionCoverScope").value=defaults.sectionCoverScope||"research";
    document.querySelectorAll("[data-cover-section]").forEach(input=>{input.checked=defaults.sectionCoverSections?.[input.dataset.coverSection]===true});
    $("fSectionCoverStyle").value=defaults.sectionCoverStyle||"framed";
    $("fSectionCoverPhotoFit").value=defaults.sectionCoverPhotoFit||"crop";
    $("fSectionCoverTopBlend").checked=defaults.sectionCoverTopBlend===true;
    $("fSectionCoverSide").value=defaults.sectionCoverSide||"right";
    $("fSectionCoverHeight").value=defaults.sectionCoverHeight||300;
    $("fSectionCoverHeightNumber").value=defaults.sectionCoverHeight||300;
    $("fSectionCoverGap").value=String(defaults.sectionCoverGap??12);
    $("fSectionCoverZoom").value=defaults.sectionCoverZoom||100;
    $("fSectionCoverZoomNumber").value=defaults.sectionCoverZoom||100;
    $("fSectionCoverFade").value=defaults.sectionCoverFade||"medium";
    $("fSectionCoverDetails").checked=defaults.sectionCoverDetails!==false;
    $("fSectionCoverSocials").checked=defaults.sectionCoverSocials!==false;
    updateSectionCoverAdminOptions();
    updateCoverStyleSpecificControls();
  });
  syncSiteCustomizationFromControls();
  scheduleAdminPreview(true);
  setStatus("Inner-page cover reset to defaults. Save all changes to publish.");
}

function updateSectionCoverAdminOptions(){
  const sectionMode=$("fNavigationModeSections")?.checked===true;
  const coverEnabled=$("fSectionCoverEnabled")?.checked===true;
  const scope=$("fSectionCoverScope")?.value||"research";
  const active=sectionMode&&coverEnabled;
  const designActive=active&&scope!=="none";
  const customActive=designActive&&scope==="custom";
  $("sectionCoverOptions")?.classList.toggle("disabled-options",!active);

  if($("fSectionCoverScope"))$("fSectionCoverScope").disabled=!active;
  ["fSectionCoverStyle","fSectionCoverPhotoFit","fSectionCoverSide","fSectionCoverFade","fSectionCoverHeight","fSectionCoverHeightNumber","fSectionCoverGap","fSectionCoverZoom","fSectionCoverZoomNumber","fSectionCoverDetails","fSectionCoverSocials","resetSectionCoverBtn"]
    .forEach(id=>{if($(id))$(id).disabled=!designActive});

  const customBox=$("sectionCoverCustomSections");
  customBox?.classList.toggle("disabled-options",!customActive);
  document.querySelectorAll("[data-cover-section]").forEach(input=>{input.disabled=!customActive});
  updateCoverStyleSpecificControls();
}

function updateSidebarAdminOptions(){
  const sectionMode=$("fNavigationModeSections")?.checked===true;
  const scope=$("fSidebarScope")?.value||"home-cv";
  if($("fSidebarScope"))$("fSidebarScope").disabled=!sectionMode;
  const customActive=sectionMode&&scope==="custom";
  const customBox=$("sidebarCustomSections");
  customBox?.classList.toggle("disabled-options",!customActive);
  document.querySelectorAll("[data-sidebar-section]").forEach(input=>{input.disabled=!customActive});
}

function updateSectionPageAdminOptions(){
  const sectionMode=$("fNavigationModeSections")?.checked===true;
  $("sectionPageOptions")?.classList.toggle("disabled-options",!sectionMode);
  if($("fPageTransition"))$("fPageTransition").disabled=!sectionMode;
  if($("fPagePager"))$("fPagePager").disabled=!sectionMode;
  if($("fSectionCoverEnabled"))$("fSectionCoverEnabled").disabled=!sectionMode;
  updateSidebarAdminOptions();
  updateSectionCoverAdminOptions();
}

function fillSiteCustomizationControls(){
  normalizeSiteSettings(currentContent);
  const l=currentContent.siteSettings.layout;
  const e=currentContent.siteSettings.experience;

  const pairs=[
    ["fMaxWidth","fMaxWidthNumber",l.maxWidth],
    ["fSidebarWidth","fSidebarWidthNumber",l.sidebarWidth],
    ["fLayoutGap","fLayoutGapNumber",l.layoutGap],
    ["fSectionSpacing","fSectionSpacingNumber",l.sectionSpacing],
    ["fCardRadius","fCardRadiusNumber",l.cardRadius],
    ["fPortraitSize","fPortraitSizeNumber",l.portraitSize]
  ];
  pairs.forEach(([range,number,value])=>{
    if($(range))$(range).value=value;
    if($(number))$(number).value=value;
  });

  $("fPortraitShape").value=l.portraitShape;
  $("fPortraitFit").value=l.portraitFit||"cover";
  $("fPortraitPosition").value=l.portraitPosition||"center";
  $("fProjectColumns").value=String(l.projectColumns);
  if($("fProjectFlow"))$("fProjectFlow").value=l.projectFlow||"grid";
  if($("fActivityColumns"))$("fActivityColumns").value=String(l.activityColumns);
  $("fSkillsColumns").value=String(l.skillsColumns);
  $("fFontPair").value=l.fontPair;
  $("fShadow").value=l.shadow;
  const cardSection=(CARD_STYLE_SECTION_KEYS.includes($("fCardStyleSection")?.value)?$("fCardStyleSection").value:"skills");
  if($("fCardStyleSection"))$("fCardStyleSection").value=cardSection;
  updateCardDesignOptionAvailability();
  if($("fCardStyleValue"))$("fCardStyleValue").value=l.cardStyles?.[cardSection]||DEFAULT_SITE_SETTINGS.layout.cardStyles[cardSection];
  if($("fCardDesignValue"))$("fCardDesignValue").value=l.cardDesigns?.[cardSection]||DEFAULT_SITE_SETTINGS.layout.cardDesigns[cardSection];
  $("fStickySidebar").checked=l.stickySidebar;
  $("fNavigationModeSingle").checked=l.navigationMode!=="sections";
  $("fNavigationModeSections").checked=l.navigationMode==="sections";
  $("fPageTransition").value=l.pageTransition||"fade";
  $("fPagePager").checked=l.pagePager!==false;
  $("fSidebarScope").value=l.sidebarScope||"home-cv";
  document.querySelectorAll("[data-sidebar-section]").forEach(input=>{input.checked=l.sidebarSections?.[input.dataset.sidebarSection]===true});
  $("fSectionCoverEnabled").checked=l.sectionCoverEnabled!==false;
  $("fSectionCoverScope").value=l.sectionCoverScope||"research";
  document.querySelectorAll("[data-cover-section]").forEach(input=>{input.checked=l.sectionCoverSections?.[input.dataset.coverSection]===true});
  $("fSectionCoverStyle").value=l.sectionCoverStyle||"framed";
  $("fSectionCoverPhotoFit").value=l.sectionCoverPhotoFit||"crop";
  $("fSectionCoverTopBlend").checked=l.sectionCoverTopBlend===true;
  $("fSectionCoverSide").value=l.sectionCoverSide||"right";
  $("fSectionCoverHeight").value=l.sectionCoverHeight||300;
  $("fSectionCoverHeightNumber").value=l.sectionCoverHeight||300;
  $("fSectionCoverGap").value=String([0,12,24,42].includes(Number(l.sectionCoverGap))?Number(l.sectionCoverGap):12);
  $("fSectionCoverZoom").value=l.sectionCoverZoom||100;
  $("fSectionCoverZoomNumber").value=l.sectionCoverZoom||100;
  $("fSectionCoverFade").value=l.sectionCoverFade||"medium";
  $("fSectionCoverDetails").checked=l.sectionCoverDetails!==false;
  $("fSectionCoverSocials").checked=l.sectionCoverSocials!==false;
  updateSectionPageAdminOptions();

  $("fActiveNav").checked=e.activeNav;
  $("fAnimations").value=e.animations;
  if($("fHoverInteractions"))$("fHoverInteractions").value=e.hoverInteractions||"subtle";
  $("fBackToTop").checked=e.backToTop;
  $("fLightbox").checked=e.lightbox;
  $("fSmoothScroll").checked=e.smoothScroll;
  $("fCopyButtons").checked=e.copyButtons;
  $("fNavHighlightStyle").value=e.navHighlightStyle||"underline";
  $("fSocialStyle").value=e.socialStyle||"labels";

  renderSectionManager();
}

function sectionDisplayName(key){
  const headings=normalizeSectionHeadings(currentContent).sectionHeadings;
  return headings[key]?.title||DEFAULT_SECTION_HEADINGS[key]?.title||key;
}

function updateCardDesignOptionAvailability(){
  const section=$("fCardStyleSection")?.value||"skills";
  const select=$("fCardDesignValue");
  if(!select)return;
  select.querySelectorAll("option[data-activity-only]").forEach(option=>{
    const allowed=section==="activities";
    option.hidden=!allowed;
    option.disabled=!allowed;
  });
}

function refreshCardStyleMiniControl(){
  normalizeSiteSettings(currentContent);
  const section=$("fCardStyleSection")?.value||"skills";
  updateCardDesignOptionAvailability();
  if($("fCardStyleValue"))$("fCardStyleValue").value=currentContent.siteSettings.layout.cardStyles?.[section]||DEFAULT_SITE_SETTINGS.layout.cardStyles[section]||"classic";
  if($("fCardDesignValue")){
    const saved=currentContent.siteSettings.layout.cardDesigns?.[section]||DEFAULT_SITE_SETTINGS.layout.cardDesigns[section]||"standard";
    $("fCardDesignValue").value=(section==="activities"||!String(saved).startsWith("activity-"))?saved:"standard";
  }
}

function storeCardStyleMiniControl(){
  normalizeSiteSettings(currentContent);
  const section=$("fCardStyleSection")?.value;
  const value=$("fCardStyleValue")?.value;
  if(!CARD_STYLE_SECTION_KEYS.includes(section)||!CARD_STYLE_VALUES.includes(value))return;
  currentContent.siteSettings.layout.cardStyles={...DEFAULT_SITE_SETTINGS.layout.cardStyles,...(currentContent.siteSettings.layout.cardStyles||{}),[section]:value};
}

function storeCardDesignMiniControl(){
  normalizeSiteSettings(currentContent);
  const section=$("fCardStyleSection")?.value;
  const value=$("fCardDesignValue")?.value;
  if(!CARD_STYLE_SECTION_KEYS.includes(section)||!CARD_DESIGN_VALUES.includes(value))return;
  currentContent.siteSettings.layout.cardDesigns={...DEFAULT_SITE_SETTINGS.layout.cardDesigns,...(currentContent.siteSettings.layout.cardDesigns||{}),[section]:value};
}

function renderSectionManager(){
  normalizeSiteSettings(currentContent);
  const s=currentContent.siteSettings;
  const box=$("sectionManager");
  if(!box)return;
  box.innerHTML=s.sectionOrder.map((key,i)=>`
    <div class="section-manager-row" data-section-setting="${esc(key)}">
      <div class="section-manager-grab">⋮⋮</div>
      <strong>${esc(sectionDisplayName(key))}</strong>
      <label class="section-manager-visible">
        <input type="checkbox" data-section-visible="${esc(key)}" ${s.sectionVisibility[key]!==false?"checked":""}>
        Show
      </label>
      <div class="section-manager-actions">
        <button class="secondary mini-action" type="button" data-section-move="${esc(key)}:-1" ${i===0?"disabled":""}>↑</button>
        <button class="secondary mini-action" type="button" data-section-move="${esc(key)}:1" ${i===s.sectionOrder.length-1?"disabled":""}>↓</button>
      </div>
    </div>`).join("");
}

function syncSiteCustomizationFromControls(){
  normalizeSiteSettings(currentContent);
  const l=currentContent.siteSettings.layout;
  l.maxWidth=clampNumber($("fMaxWidthNumber").value||$("fMaxWidth").value,960,1500,1180);
  l.sidebarWidth=clampNumber($("fSidebarWidthNumber").value||$("fSidebarWidth").value,210,340,255);
  l.layoutGap=clampNumber($("fLayoutGapNumber").value||$("fLayoutGap").value,20,100,58);
  l.sectionSpacing=clampNumber($("fSectionSpacingNumber").value||$("fSectionSpacing").value,20,90,40);
  l.cardRadius=clampNumber($("fCardRadiusNumber").value||$("fCardRadius").value,0,28,11);
  l.cardStyles={...DEFAULT_SITE_SETTINGS.layout.cardStyles,...(l.cardStyles||{})};
  l.cardDesigns={...DEFAULT_SITE_SETTINGS.layout.cardDesigns,...(l.cardDesigns||{})};
  const cardStyleSection=$("fCardStyleSection")?.value;
  const cardStyleValue=$("fCardStyleValue")?.value;
  const cardDesignValue=$("fCardDesignValue")?.value;
  if(CARD_STYLE_SECTION_KEYS.includes(cardStyleSection)&&CARD_STYLE_VALUES.includes(cardStyleValue))l.cardStyles[cardStyleSection]=cardStyleValue;
  if(CARD_STYLE_SECTION_KEYS.includes(cardStyleSection)&&CARD_DESIGN_VALUES.includes(cardDesignValue))l.cardDesigns[cardStyleSection]=cardDesignValue;
  l.portraitSize=clampNumber($("fPortraitSizeNumber").value||$("fPortraitSize").value,140,250,190);
  l.portraitShape=$("fPortraitShape").value;
  l.portraitFit=$("fPortraitFit").value;
  l.portraitPosition=$("fPortraitPosition").value;
  const nextProjectColumns=Number($("fProjectColumns")?.value);
  if([1,2,3].includes(nextProjectColumns))l.projectColumns=nextProjectColumns;
  l.projectFlow=$("fProjectFlow")?.value==="masonry"?"masonry":"grid";
  const nextActivityColumns=Number($("fActivityColumns")?.value);
  if([1,2,3].includes(nextActivityColumns))l.activityColumns=nextActivityColumns;
  const nextSkillsColumns=Number($("fSkillsColumns")?.value);
  if([1,2,3].includes(nextSkillsColumns))l.skillsColumns=nextSkillsColumns;
  l.fontPair=$("fFontPair").value;
  l.shadow=$("fShadow").value;
  l.stickySidebar=$("fStickySidebar").checked;
  l.navigationMode=$("fNavigationModeSections").checked?"sections":"single";
  l.pageTransition=$("fPageTransition").value;
  l.pagePager=$("fPagePager").checked;
  l.sidebarScope=$("fSidebarScope").value;
  l.sidebarSections=Object.fromEntries(SIDEBAR_SECTION_KEYS.map(k=>[k,document.querySelector(`[data-sidebar-section="${k}"]`)?.checked===true]));
  l.sectionCoverEnabled=$("fSectionCoverEnabled").checked;
  l.sectionCoverScope=$("fSectionCoverScope").value;
  l.sectionCoverSections=Object.fromEntries(COVER_SECTION_KEYS.map(k=>[k,document.querySelector(`[data-cover-section="${k}"]`)?.checked===true]));
  l.sectionCoverStyle=$("fSectionCoverStyle").value;
  l.sectionCoverPhotoFit=$("fSectionCoverPhotoFit").value;
  l.sectionCoverTopBlend=$("fSectionCoverTopBlend").checked;
  l.sectionCoverSide=$("fSectionCoverSide").value;
  l.sectionCoverHeight=clampNumber($("fSectionCoverHeightNumber").value||$("fSectionCoverHeight").value,220,420,300);
  l.sectionCoverGap=Number($("fSectionCoverGap").value);
  l.sectionCoverZoom=clampNumber($("fSectionCoverZoomNumber").value||$("fSectionCoverZoom").value,40,170,100);
  l.sectionCoverFade=$("fSectionCoverFade").value;
  l.sectionCoverDetails=$("fSectionCoverDetails").checked;
  l.sectionCoverSocials=$("fSectionCoverSocials").checked;

  const e=currentContent.siteSettings.experience;
  e.activeNav=$("fActiveNav").checked;
  e.animations=$("fAnimations").value;
  e.hoverInteractions=$("fHoverInteractions")?.value||"subtle";
  e.backToTop=$("fBackToTop").checked;
  e.lightbox=$("fLightbox").checked;
  e.smoothScroll=$("fSmoothScroll").checked;
  e.copyButtons=$("fCopyButtons").checked;
  e.navHighlightStyle=$("fNavHighlightStyle").value;
  e.socialStyle=$("fSocialStyle").value;
}

/* Keep Layout selections in currentContent immediately.
   Earlier, Layout controls depended on a delayed history checkpoint. If an
   unrelated action re-rendered Admin first, the UI could be refilled from the
   older layout values and the selected column count appeared to change. */
function commitLayoutControlsImmediately(){
  try{
    syncSiteCustomizationFromControls();
    currentContent.appearance=currentContent.appearance||{};
    currentContent.appearance.designPreset="custom";
  }catch(err){
    console.warn("Could not commit layout controls:",err);
  }
}
document.addEventListener("input",e=>{
  if(e.target?.closest?.('[data-panel="layout"]'))commitLayoutControlsImmediately();
});
document.addEventListener("change",e=>{
  if(e.target?.closest?.('[data-panel="layout"]'))commitLayoutControlsImmediately();
});

function resetLayoutStyleControls(){
  normalizeSiteSettings(currentContent);
  const l=currentContent.siteSettings.layout,d=DEFAULT_SITE_SETTINGS.layout;
  Object.assign(l,{maxWidth:d.maxWidth,sidebarWidth:d.sidebarWidth,layoutGap:d.layoutGap,sectionSpacing:d.sectionSpacing,projectColumns:d.projectColumns,projectFlow:d.projectFlow,activityColumns:d.activityColumns??l.activityColumns,skillsColumns:d.skillsColumns,stickySidebar:d.stickySidebar});
  fillSiteCustomizationControls();
  setStatus("Layout reset to defaults. Other Appearance, Profile, Typography, Structure and Cover settings were kept.");
}

function resetSectionStructure(){
  normalizeSiteSettings(currentContent);
  currentContent.siteSettings.sectionOrder=[...DEFAULT_SITE_SETTINGS.sectionOrder];
  currentContent.siteSettings.sectionVisibility=structuredClone(DEFAULT_SITE_SETTINGS.sectionVisibility);
  renderSectionManager();
  setStatus("Section order and visibility reset. Save all changes to publish.");
}

function resetExperienceControls(){
  normalizeSiteSettings(currentContent);
  currentContent.siteSettings.experience=structuredClone(DEFAULT_SITE_SETTINGS.experience);
  fillSiteCustomizationControls();
  setStatus("Experience settings reset to defaults. Save all changes to publish.");
}

function moveSectionSetting(key,delta){
  normalizeSiteSettings(currentContent);
  const arr=currentContent.siteSettings.sectionOrder;
  const i=arr.indexOf(key),j=i+delta;
  if(i<0||j<0||j>=arr.length)return;
  [arr[i],arr[j]]=[arr[j],arr[i]];
  renderSectionManager();
}

function setSectionVisibility(key,visible){
  normalizeSiteSettings(currentContent);
  if(!SITE_SECTION_KEYS.includes(key))return;
  currentContent.siteSettings.sectionVisibility[key]=visible;
}

function renderRepeaterType(type){
  if(type==="publication")renderPublicationsEditor();
  if(type==="project")renderProjectsEditor();
  if(type==="activity")renderActivitiesEditor();
  if(type==="skill")renderSkillsEditor();
  if(type==="education")renderEducationEditor();
}

function moveRepeaterItem(type,index,delta){
  syncAllForms();
  const map={publication:"publications",project:"projects",activity:"academicActivities",skill:"skills",education:"education"};
  const arr=currentContent[map[type]];
  if(!Array.isArray(arr))return;

  if(type==="activity"){
    const category=normalizeActivityCategory(arr[index]?.category);
    const slots=arr.map((item,i)=>normalizeActivityCategory(item?.category)===category?i:-1).filter(i=>i>=0);
    const pos=slots.indexOf(index);
    const targetPos=pos+delta;
    if(pos<0||targetPos<0||targetPos>=slots.length)return;
    const j=slots[targetPos];
    [arr[index],arr[j]]=[arr[j],arr[index]];
    renderActivitiesEditor();
    setStatus("Activity reordered within this category. Save all changes to publish.");
    return;
  }

  const j=index+delta;
  if(index<0||j<0||j>=arr.length)return;
  [arr[index],arr[j]]=[arr[j],arr[index]];
  renderRepeaterType(type);
  setStatus("Item reordered. Save all changes to publish.");
}

function exportWebsiteBackup(){
  syncAllForms();
  const payload={
    exportedAt:new Date().toISOString(),
    format:"academic-site-backup-v1",
    content:currentContent
  };
  const blob=new Blob([JSON.stringify(payload,null,2)],{type:"application/json"});
  const url=URL.createObjectURL(blob);
  const a=document.createElement("a");
  const safeName=(currentContent.name||"academic-site").replace(/[^a-z0-9]+/gi,"_").replace(/^_+|_+$/g,"");
  a.href=url;
  a.download=`${safeName||"academic_site"}_backup_${new Date().toISOString().slice(0,10)}.json`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
  setStatus("Website backup exported.");
}

async function importWebsiteBackup(){
  const file=$("backupImportFile")?.files?.[0];
  if(!file){setStatus("Choose a JSON backup file first.");return}
  try{
    const parsed=JSON.parse(await file.text());
    const incoming=parsed?.content&&typeof parsed.content==="object"?parsed.content:parsed;
    if(!incoming||typeof incoming!=="object"||Array.isArray(incoming))throw new Error("Invalid backup structure.");
    currentContent=merge(DEFAULT_CONTENT,incoming);
    normalizeMedia(currentContent);
    normalizeSectionHeadings(currentContent);
    normalizeTypography(currentContent);
    normalizeCustomTheme(currentContent);
    normalizeSiteSettings(currentContent);
    fillForms();
    setStatus("Backup loaded into the editor. Review it, then click Save all changes to publish.");
  }catch(err){
    setStatus("Backup import failed: "+(err?.message||"Invalid JSON file."));
  }
}

function syncRangeNumber(rangeId,numberId,min,max,fallback){
  const range=$(rangeId),number=$(numberId);
  if(!range||!number)return;
  const update=(source,target)=>{
    const value=clampNumber(source.value,min,max,fallback);
    source.value=value;
    target.value=value;
  };
  range.addEventListener("input",()=>update(range,number));
  number.addEventListener("input",()=>update(number,range));
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


function normalizeMediaDisplayItem(item){
  if(!item||typeof item!=="object")return item;
  const out={...item};
  const type=String(out.type||"link");
  out.captionAlign=["left","center","right"].includes(out.captionAlign)?out.captionAlign:"left";
  if(type==="image"||type==="pdf"||type==="video"){
    const legacySize={third:"standard",half:"medium",full:"large",auto:"standard"};
    out.displaySize=["very-small","small","standard","medium","large","full","original"].includes(out.displaySize)
      ?out.displaySize
      :(legacySize[out.width]||"standard");
  }
  if(type==="image"||type==="pdf"){
    out.fitMode=["exact","center","fill","legacy"].includes(out.fitMode)?out.fitMode:(type==="pdf"?"exact":"legacy");
    out.width=["auto","full","half","third"].includes(out.width)?out.width:"auto";
    out.enlarge=["inherit","on","off"].includes(out.enlarge)?out.enlarge:(type==="pdf"?"on":"inherit");
  }else if(type==="video"){
    out.enlarge=["inherit","on","off"].includes(out.enlarge)?out.enlarge:"on";
  }
  if(type==="image"){
    out.aspect=["original","square","4x3","16x9"].includes(out.aspect)?out.aspect:"original";
    out.fit=["cover","contain"].includes(out.fit)?out.fit:"cover";
    out.position=["center","top","bottom","left","right"].includes(out.position)?out.position:"center";
    out.alt=String(out.alt||"");
  }
  return out;
}
function normalizeMediaDisplayList(value){
  return (Array.isArray(value)?value:[]).map(normalizeMediaDisplayItem);
}

const BUILDER_SETTINGS_SCHEMA_VERSION=30;
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


/* =========================================================
   ADVANCED ADMIN SUITE
   Preview · History · Presets
   ========================================================= */
const MAX_UNDO_STEPS=30;
const MAX_SAVED_REVISIONS=12;
let globalUndoStack=[];
let globalRedoStack=[];
let globalHistoryLast=null;
let globalHistoryMuted=0;
let globalHistoryTimer=null;
let lastPersistedFullSnapshot=null;
let previewTimer=null;

function historySnapshot(content=currentContent){
  const snap=deepCloneSafe(content);
  if(snap?.builderState)delete snap.builderState.revisions;
  return snap;
}
function setHistoryMuted(fn){
  globalHistoryMuted++;
  try{return fn()}finally{globalHistoryMuted--}
}
function initializeGlobalHistory(){
  globalUndoStack=[];
  globalRedoStack=[];
  globalHistoryLast=historySnapshot(currentContent);
  lastPersistedFullSnapshot=historySnapshot(currentContent);
  updateHistoryUi();
  renderRevisionList();
}
function captureEditorIntoContent(){
  if(globalHistoryMuted)return;
  try{syncAllForms()}catch{}
}
function checkpointAfterEditorChange(){
  if(globalHistoryMuted)return;
  clearTimeout(globalHistoryTimer);
  globalHistoryTimer=setTimeout(()=>{
    if(globalHistoryMuted)return;
    captureEditorIntoContent();
    const now=historySnapshot(currentContent);
    if(JSON.stringify(now)===JSON.stringify(globalHistoryLast))return;
    if(globalHistoryLast){
      globalUndoStack.push(globalHistoryLast);
      if(globalUndoStack.length>MAX_UNDO_STEPS)globalUndoStack.shift();
    }
    globalHistoryLast=now;
    globalRedoStack=[];
    updateHistoryUi();
    scheduleAdminPreview();
  },350);
}
function capturePreMutation(){
  if(globalHistoryMuted)return;
  captureEditorIntoContent();
  const now=historySnapshot(currentContent);
  const top=globalUndoStack[globalUndoStack.length-1];
  if(!top||JSON.stringify(top)!==JSON.stringify(now)){
    globalUndoStack.push(now);
    if(globalUndoStack.length>MAX_UNDO_STEPS)globalUndoStack.shift();
  }
  globalHistoryLast=now;
  globalRedoStack=[];
  updateHistoryUi();
}
function applyHistoryState(snapshot,statusText){
  if(!snapshot)return;
  const revisions=deepCloneSafe(currentContent?.builderState?.revisions||[]);
  setHistoryMuted(()=>{
    currentContent=merge(DEFAULT_CONTENT,deepCloneSafe(snapshot));
    normalizeMedia(currentContent);
    ensureBuilderState(currentContent);
    currentContent.builderState.revisions=revisions;
    fillForms();
  });
  globalHistoryLast=historySnapshot(currentContent);
  updateHistoryUi();
  renderRevisionList();
  scheduleAdminPreview(true);
  if(statusText)setStatus(statusText);
}
function globalUndo(){
  if(!globalUndoStack.length)return;
  captureEditorIntoContent();
  const current=historySnapshot(currentContent);
  const previous=globalUndoStack.pop();
  globalRedoStack.push(current);
  if(globalRedoStack.length>MAX_UNDO_STEPS)globalRedoStack.shift();
  applyHistoryState(previous,"Undo applied. Save all changes to publish it.");
}
function globalRedo(){
  if(!globalRedoStack.length)return;
  captureEditorIntoContent();
  const current=historySnapshot(currentContent);
  const next=globalRedoStack.pop();
  globalUndoStack.push(current);
  if(globalUndoStack.length>MAX_UNDO_STEPS)globalUndoStack.shift();
  applyHistoryState(next,"Redo applied. Save all changes to publish it.");
}
function updateHistoryUi(){
  const undo=$("globalUndoBtn"),redo=$("globalRedoBtn");
  if(undo)undo.disabled=!globalUndoStack.length;
  if(redo)redo.disabled=!globalRedoStack.length;
  if($("undoCount"))$("undoCount").textContent=String(globalUndoStack.length);
  if($("redoCount"))$("redoCount").textContent=String(globalRedoStack.length);
  const revisions=currentContent?.builderState?.revisions||[];
  if($("revisionCount"))$("revisionCount").textContent=String(revisions.length);
}
function cleanRevisionSnapshot(content){
  const snap=deepCloneSafe(content);
  if(!snap.builderState)snap.builderState={};
  delete snap.builderState.revisions;
  return snap;
}
function ensureRevisionArray(){
  ensureBuilderState(currentContent);
  if(!Array.isArray(currentContent.builderState.revisions))currentContent.builderState.revisions=[];
  return currentContent.builderState.revisions;
}
function addSavedRevision(snapshot,label="Saved version"){
  if(!snapshot)return;
  const revisions=ensureRevisionArray();
  const clean=cleanRevisionSnapshot(snapshot);
  const fingerprint=JSON.stringify(clean);
  const latest=revisions[revisions.length-1];
  if(latest&&JSON.stringify(latest.content)===fingerprint)return;
  revisions.push({
    id:`rev-${Date.now()}-${Math.random().toString(36).slice(2,7)}`,
    at:new Date().toISOString(),
    label:String(label||"Saved version").slice(0,80),
    content:clean
  });
  while(revisions.length>MAX_SAVED_REVISIONS)revisions.shift();
}
function formatRevisionTime(v){
  try{return new Date(v).toLocaleString(undefined,{year:"numeric",month:"short",day:"numeric",hour:"numeric",minute:"2-digit"})}
  catch{return String(v||"")}
}
function renderRevisionList(){
  const box=$("revisionList");
  if(!box)return;
  const revisions=[...(currentContent?.builderState?.revisions||[])].reverse();
  box.innerHTML=revisions.length?revisions.map(r=>`
    <div class="revision-row">
      <div>
        <strong>${esc(r.label||"Saved version")}</strong>
        <span>${esc(formatRevisionTime(r.at))}</span>
      </div>
      <button class="secondary" type="button" data-restore-revision="${esc(r.id)}">Restore to editor</button>
    </div>`).join(""):`<div class="empty-state">No saved revisions yet. They will appear after future saves.</div>`;
  updateHistoryUi();
}
async function saveManualRevision(){
  captureEditorIntoContent();
  addSavedRevision(currentContent,"Manual checkpoint");
  const ok=await persistContent("Checkpoint saved.");
  if(ok){
    lastPersistedFullSnapshot=historySnapshot(currentContent);
    renderRevisionList();
  }
}

/* Live Preview */
const PREVIEW_DEVICE_SIZES={
  desktop:{width:1280,height:800,label:"Desktop · 1280 × 800 CSS px"},
  tablet:{width:768,height:1024,label:"Tablet · 768 × 1024 CSS px"},
  mobile360:{width:360,height:800,label:"Mobile · 360 × 800 CSS px"},
  mobile390:{width:390,height:844,label:"Mobile · 390 × 844 CSS px"},
  mobile412:{width:412,height:915,label:"Mobile · 412 × 915 CSS px"}
};
const PREVIEW_DEVICE_KEYS=[...Object.keys(PREVIEW_DEVICE_SIZES),"custom"];
let currentPreviewDevice="desktop";
let previewLastHash=localStorage.getItem("academicPreviewHash")||"#home";
let previewMessageBound=false;

function previewIsActive(){
  return document.querySelector('[data-panel="preview"]')?.classList.contains("active");
}
function clampPreviewDimension(value,min,max,fallback){
  const n=Math.round(Number(value));
  return Number.isFinite(n)?Math.min(max,Math.max(min,n)):fallback;
}
function getPreviewHash(){
  const frame=$("sitePreviewFrame");
  try{
    const h=frame?.contentWindow?.location?.hash;
    if(h){
      previewLastHash=h;
      localStorage.setItem("academicPreviewHash",previewLastHash);
    }
  }catch{}
  return previewLastHash||"#home";
}
function sendPreviewContent(){
  const frame=$("sitePreviewFrame");
  if(!frame?.contentWindow)return;
  setHistoryMuted(()=>{try{syncAllForms()}catch{}});
  frame.contentWindow.postMessage({
    type:"academic-site-preview",
    content:historySnapshot(currentContent)
  },location.origin);
}
function scheduleAdminPreview(force=false){
  if(!force&&!previewIsActive())return;
  clearTimeout(previewTimer);
  previewTimer=setTimeout(sendPreviewContent,force?30:300);
}
function previewCustomSize(){
  const savedW=localStorage.getItem("academicPreviewCustomWidth");
  const savedH=localStorage.getItem("academicPreviewCustomHeight");
  const width=clampPreviewDimension($("previewCustomWidth")?.value||savedW,280,1600,390);
  const height=clampPreviewDimension($("previewCustomHeight")?.value||savedH,500,1600,844);
  if($("previewCustomWidth"))$("previewCustomWidth").value=width;
  if($("previewCustomHeight"))$("previewCustomHeight").value=height;
  localStorage.setItem("academicPreviewCustomWidth",String(width));
  localStorage.setItem("academicPreviewCustomHeight",String(height));
  return{width,height,label:`Custom · ${width} × ${height} CSS px`};
}
function applyPreviewViewport(device=currentPreviewDevice){
  const shell=$("previewFrameShell"),frame=$("sitePreviewFrame");
  if(!shell||!frame)return;
  const spec=device==="custom"?previewCustomSize():(PREVIEW_DEVICE_SIZES[device]||PREVIEW_DEVICE_SIZES.desktop);
  currentPreviewDevice=PREVIEW_DEVICE_KEYS.includes(device)?device:"desktop";
  localStorage.setItem("academicPreviewDevice",currentPreviewDevice);

  shell.classList.remove("preview-desktop","preview-tablet","preview-mobile","preview-exact");
  shell.classList.add("preview-exact");
  if(currentPreviewDevice==="desktop")shell.classList.add("preview-desktop");
  else if(currentPreviewDevice==="tablet")shell.classList.add("preview-tablet");
  else shell.classList.add("preview-mobile");

  shell.style.width=`${spec.width}px`;
  shell.style.maxWidth="none";
  frame.style.width="100%";
  frame.style.height=`${spec.height}px`;

  document.querySelectorAll("[data-preview-device]").forEach(b=>b.classList.toggle("active",b.dataset.previewDevice===currentPreviewDevice));
  $("previewCustomSize")?.classList.toggle("hidden",currentPreviewDevice!=="custom");
  if($("previewDeviceLabel"))$("previewDeviceLabel").textContent=spec.label;

  requestAnimationFrame(()=>{
    try{frame.contentWindow?.dispatchEvent(new Event("resize"))}catch{}
  });
}
function setPreviewDevice(device){
  applyPreviewViewport(PREVIEW_DEVICE_KEYS.includes(device)?device:"desktop");
}
function reloadAdminPreview(){
  const frame=$("sitePreviewFrame");
  if(!frame)return;
  setHistoryMuted(()=>{try{syncAllForms()}catch{}});
  const hash=getPreviewHash();
  const bust=`${Date.now()}-${Math.random().toString(36).slice(2,8)}`;
  frame.src=`index.html?adminPreview=1&previewBust=${encodeURIComponent(bust)}${hash}`;
  if($("previewDeviceLabel")){
    const base=(currentPreviewDevice==="custom"?previewCustomSize():PREVIEW_DEVICE_SIZES[currentPreviewDevice]||PREVIEW_DEVICE_SIZES.desktop).label;
    $("previewDeviceLabel").textContent=`${base} · reloading…`;
  }
}
function bindPreviewMessages(){
  if(previewMessageBound)return;
  previewMessageBound=true;
  window.addEventListener("message",e=>{
    const frame=$("sitePreviewFrame");
    if(e.origin!==location.origin||e.source!==frame?.contentWindow)return;
    if(e.data?.type==="academic-site-preview-location"){
      previewLastHash=String(e.data.hash||"#home");
      localStorage.setItem("academicPreviewHash",previewLastHash);
      return;
    }
    if(e.data?.type==="academic-site-preview-shell-ready"||e.data?.type==="academic-site-preview-ready"){
      if(e.data.hash){
        previewLastHash=String(e.data.hash);
        localStorage.setItem("academicPreviewHash",previewLastHash);
      }
      /*
       * Do NOT send preview content again here. The iframe's load handler
       * already sends the Admin state once, and ordinary editor changes
       * schedule their own updates. Re-sending on the child's "ready"
       * acknowledgement creates an infinite parent/iframe message loop:
       * send -> render -> ready -> send -> render -> ...
       */
      if(e.data?.type==="academic-site-preview-ready"&&$("previewDeviceLabel")){
        const spec=currentPreviewDevice==="custom"?previewCustomSize():(PREVIEW_DEVICE_SIZES[currentPreviewDevice]||PREVIEW_DEVICE_SIZES.desktop);
        $("previewDeviceLabel").textContent=spec.label;
      }
    }
  });
}

/* Design Presets */
const DESIGN_PRESETS={
  "academic-classic":{
    name:"Academic Classic",
    description:"Traditional academic profile with serif headings, balanced spacing and understated cards.",
    theme:"classic-brown",
    typography:{sectionTitleSize:44,sectionTitleColor:"",sectionSubtitleSize:24,sectionSubtitleColor:""},
    layout:{maxWidth:1180,sidebarWidth:255,layoutGap:58,sectionSpacing:42,cardRadius:10,portraitSize:190,portraitShape:"slight",projectColumns:3,activityColumns:2,skillsColumns:3,fontPair:"classic",shadow:"theme",stickySidebar:true},
    experience:{activeNav:true,animations:"subtle",backToTop:true,lightbox:true,smoothScroll:true,copyButtons:true,navHighlightStyle:"underline",socialStyle:"labels"}
  },
  "minimal-research":{
    name:"Minimal Research",
    description:"Clean, low-distraction layout with tighter spacing, flatter cards and a research-first feel.",
    theme:"soft-beige",
    typography:{sectionTitleSize:42,sectionTitleColor:"",sectionSubtitleSize:21,sectionSubtitleColor:""},
    layout:{maxWidth:1120,sidebarWidth:240,layoutGap:48,sectionSpacing:34,cardRadius:5,portraitSize:180,portraitShape:"slight",projectColumns:2,activityColumns:2,skillsColumns:3,fontPair:"humanist",shadow:"none",stickySidebar:true},
    experience:{activeNav:true,animations:"off",backToTop:true,lightbox:true,smoothScroll:true,copyButtons:true,navHighlightStyle:"text",socialStyle:"icons"}
  },
  "modern-portfolio":{
    name:"Modern Portfolio",
    description:"Contemporary cards, wider content, rounded geometry and stronger visual interaction.",
    theme:"cobalt-white",
    typography:{sectionTitleSize:46,sectionTitleColor:"",sectionSubtitleSize:24,sectionSubtitleColor:""},
    layout:{maxWidth:1280,sidebarWidth:270,layoutGap:62,sectionSpacing:46,cardRadius:18,portraitSize:200,portraitShape:"rounded",projectColumns:3,activityColumns:2,skillsColumns:3,fontPair:"modern",shadow:"medium",stickySidebar:true},
    experience:{activeNav:true,animations:"normal",backToTop:true,lightbox:true,smoothScroll:true,copyButtons:true,navHighlightStyle:"pill",socialStyle:"labels"}
  },
  "editorial-scholar":{
    name:"Editorial Scholar",
    description:"Publication-oriented serif presentation with restrained geometry and strong typographic hierarchy.",
    theme:"burgundy",
    typography:{sectionTitleSize:46,sectionTitleColor:"",sectionSubtitleSize:23,sectionSubtitleColor:""},
    layout:{maxWidth:1100,sidebarWidth:250,layoutGap:54,sectionSpacing:44,cardRadius:6,portraitSize:185,portraitShape:"slight",projectColumns:2,activityColumns:2,skillsColumns:2,fontPair:"editorial",shadow:"subtle",stickySidebar:true},
    experience:{activeNav:true,animations:"subtle",backToTop:true,lightbox:true,smoothScroll:true,copyButtons:true,navHighlightStyle:"underline",socialStyle:"labels"}
  },
  "compact-academic":{
    name:"Compact Academic",
    description:"Denser layout for content-heavy profiles with compact sections and efficient use of space.",
    theme:"deep-navy",
    typography:{sectionTitleSize:40,sectionTitleColor:"",sectionSubtitleSize:20,sectionSubtitleColor:""},
    layout:{maxWidth:1180,sidebarWidth:230,layoutGap:40,sectionSpacing:28,cardRadius:8,portraitSize:170,portraitShape:"slight",projectColumns:3,activityColumns:2,skillsColumns:3,fontPair:"palatino",shadow:"subtle",stickySidebar:true},
    experience:{activeNav:true,animations:"off",backToTop:true,lightbox:true,smoothScroll:true,copyButtons:true,navHighlightStyle:"text",socialStyle:"icons"}
  }
};
function renderDesignPresets(){
  const grid=$("designPresetGrid");
  if(!grid)return;
  const selected=currentContent?.appearance?.designPreset||"custom";
  grid.innerHTML=Object.entries(DESIGN_PRESETS).map(([id,p])=>`
    <button class="preset-card ${selected===id?"selected":""}" data-apply-preset="${esc(id)}" type="button">
      <span class="preset-swatch"></span>
      <strong>${esc(p.name)}</strong>
      <small>${esc(p.description)}</small>
      <span class="preset-action">Apply preset</span>
    </button>`).join("");
  const current=DESIGN_PRESETS[selected]?.name||"Custom";
  if($("currentPresetLabel"))$("currentPresetLabel").textContent=current;
}
function applyDesignPreset(id){
  const preset=DESIGN_PRESETS[id];
  if(!preset)return;
  capturePreMutation();
  const before=historySnapshot(currentContent);
  setHistoryMuted(()=>{
    normalizeSiteSettings(currentContent);
    normalizeTypography(currentContent);
    currentContent.defaultTheme=preset.theme;
    currentContent.appearance=currentContent.appearance||{};
    currentContent.appearance.typography=deepCloneSafe(preset.typography);
    currentContent.appearance.designPreset=id;
    currentContent.siteSettings.layout={...currentContent.siteSettings.layout,...deepCloneSafe(preset.layout)};
    currentContent.siteSettings.experience={...currentContent.siteSettings.experience,...deepCloneSafe(preset.experience)};
    fillForms();
  });
  globalUndoStack.push(before);
  if(globalUndoStack.length>MAX_UNDO_STEPS)globalUndoStack.shift();
  globalHistoryLast=historySnapshot(currentContent);
  globalRedoStack=[];
  updateHistoryUi();
  renderDesignPresets();
  scheduleAdminPreview(true);
  setStatus(`${preset.name} applied in the editor. Save all changes to publish it.`);
}
function bindAdvancedAdminSuite(){
  $("globalUndoBtn")?.addEventListener("click",globalUndo);
  $("globalRedoBtn")?.addEventListener("click",globalRedo);
  $("addManualRevisionBtn")?.addEventListener("click",saveManualRevision);
  $("refreshPreviewBtn")?.addEventListener("click",reloadAdminPreview);
  $("sitePreviewFrame")?.addEventListener("load",()=>{applyPreviewViewport(currentPreviewDevice);scheduleAdminPreview(true)});
  document.querySelectorAll("[data-preview-device]").forEach(b=>b.addEventListener("click",()=>setPreviewDevice(b.dataset.previewDevice)));
  ["previewCustomWidth","previewCustomHeight"].forEach(id=>$(id)?.addEventListener("input",()=>{if(currentPreviewDevice==="custom")applyPreviewViewport("custom")}));
  bindPreviewMessages();

  document.addEventListener("click",e=>{
    const restore=e.target.closest("[data-restore-revision]");
    if(restore){
      const revision=(currentContent?.builderState?.revisions||[]).find(r=>r.id===restore.dataset.restoreRevision);
      if(revision){
        const before=historySnapshot(currentContent);
        globalUndoStack.push(before);
        applyHistoryState(revision.content,"Revision restored to the editor. Save all changes to publish it.");
      }
      return;
    }
    const preset=e.target.closest("[data-apply-preset]");
    if(preset){applyDesignPreset(preset.dataset.applyPreset);return}
  });

  const mutationSelectors=[
    "[data-remove]","[data-move-item]","[data-section-move]","[data-media-remove]","[data-media-add-link]","[data-add-skill-subgroup]","[data-move-skill-subgroup]","[data-remove-skill-subgroup]",
    "#addPublicationBtn","#addProjectBtn","#addActivityBtn","#addSkillGroupBtn","#addEducationBtn","#removeCvBtn",
    "#resetLayoutStyleBtn","#resetSectionStructureBtn","#resetExperienceBtn",
    "#resetTypographyBtn","#resetCustomThemeBtn"
  ].join(",");
  document.addEventListener("click",e=>{
    if(e.target.closest(mutationSelectors))capturePreMutation();
  },true);

  const markCustomIfDesignEdit=(target)=>{
    if(!target?.closest)return;
    if(target.closest('[data-panel="appearance"],[data-panel="typography"],[data-panel="layout"],[data-panel="structure"],[data-panel="cover"],[data-panel="experience"]')||target.matches?.('#fPortraitSize,#fPortraitSizeNumber,#fPortraitShape,#fPortraitFit,#fPortraitPosition')){
      currentContent.appearance=currentContent.appearance||{};
      currentContent.appearance.designPreset="custom";
      renderDesignPresets();
    }
  };
  document.addEventListener("input",e=>{
    if(e.target.closest("#loginView")||e.target.closest('[data-panel="preview"]'))return;
    markCustomIfDesignEdit(e.target);
    checkpointAfterEditorChange();
  });
  document.addEventListener("change",e=>{
    if(e.target.closest("#loginView")||e.target.closest('[data-panel="preview"]'))return;
    markCustomIfDesignEdit(e.target);
    checkpointAfterEditorChange();
  });
  const savedDevice=localStorage.getItem("academicPreviewDevice");
  const savedW=localStorage.getItem("academicPreviewCustomWidth"),savedH=localStorage.getItem("academicPreviewCustomHeight");
  if(savedW&&$("previewCustomWidth"))$("previewCustomWidth").value=savedW;
  if(savedH&&$("previewCustomHeight"))$("previewCustomHeight").value=savedH;
  setPreviewDevice(PREVIEW_DEVICE_KEYS.includes(savedDevice)?savedDevice:"desktop");
}


function normalizeActivityCategory(value){
  const category=String(value||"Presentations & Posters").trim();
  const aliases={
    "Presentation & Poster":"Presentations & Posters",
    "Presentations & Posters":"Presentations & Posters",
    "Certification & Training":"Training & Practical Experience",
    "Certifications & Training":"Training & Practical Experience",
    "Training":"Training & Practical Experience",
    "Training & Practical Experience":"Training & Practical Experience",
    "Certification":"Certifications",
    "Certifications":"Certifications",
    "Mentoring & Teaching":"Mentoring & Teaching",
    "Award & Honor":"Awards & Honors",
    "Awards & Honors":"Awards & Honors"
  };
  return aliases[category]||category||"Presentations & Posters";
}

function normalizeActivityCardDesign(value){
  const design=String(value||"").trim();
  return ["activity-split","activity-showcase","activity-media-fill","activity-certificate-full","activity-certificate-grid"].includes(design)?design:"";
}

function normalizeAcademicArchitecture(content){
  const marker=content?.builderState?.academicArchitectureV1===true;
  const existingActivities=Array.isArray(content.academicActivities)?content.academicActivities:[];
  content.academicActivities=existingActivities.map(x=>({
    category:normalizeActivityCategory(x?.category),
    activityType:String(x?.activityType||""),
    cardDesign:normalizeActivityCardDesign(x?.cardDesign),
    topics:(Array.isArray(x?.topics)?x.topics:(typeof x?.topics==="string"?x.topics.split(","):[])).map(v=>String(v??"").trim()).filter(Boolean),
    title:String(x?.title||""),
    organization:String(x?.organization||""),
    date:String(x?.date||""),
    description:String(x?.description||""),
    url:String(x?.url||""),
    visible:x?.visible!==false,
    media:Array.isArray(x?.media)?x.media:[]
  }));
  content.projects=(content.projects||[]).map(x=>({
    ...x,
    type:String(x?.type||""),
    contribution:String(x?.contribution||""),
    media:Array.isArray(x?.media)?x.media:[]
  }));

  if(!marker&&content.sectionHeadings?.projects?.title&&String(content.sectionHeadings.projects.title).trim()==="Projects"){
    content.sectionHeadings.projects.title="Projects & Simulations";
  }
  return content;
}

function normalizeResearchInterests(content){
  const cleanList=value=>(Array.isArray(value)?value:[])
    .map(x=>String(x??"").trim())
    .filter(Boolean);

  const legacy=cleanList(content.researchInterests);
  const raw=(content.researchInterestGroups&&typeof content.researchInterestGroups==="object"&&!Array.isArray(content.researchInterestGroups))
    ?content.researchInterestGroups:null;

  const hasStructured=!!raw&&(
    Array.isArray(raw.primary)||
    Array.isArray(raw.additional)
  );

  const groups=hasStructured
    ?{primary:cleanList(raw.primary),additional:cleanList(raw.additional)}
    :{primary:legacy,additional:[]};

  content.researchInterestGroups=groups;

  /* Keep the original flat field synchronized for old backups / older code. */
  content.researchInterests=[...groups.primary,...groups.additional];
  return content;
}

function academicActivityHasContent(item){
  return !!(item&&item.visible!==false&&(
    String(item.title||"").trim()||String(item.description||"").trim()||
    String(item.activityType||"").trim()||String(item.organization||"").trim()||String(item.date||"").trim()||
    (Array.isArray(item.topics)&&item.topics.length)||
    (Array.isArray(item.media)&&item.media.length)
  ));
}

function sectionHasPublicContent(d,key){
  if(key==="activities")return (d.academicActivities||[]).some(academicActivityHasContent);
  return true;
}

const sb=window.supabase.createClient(window.SUPABASE_CONFIG.url,window.SUPABASE_CONFIG.key);
const ADMIN_THEMES=["classic-brown","soft-beige","slate-blue","deep-navy","forest-sage","olive-stone","burgundy","dusty-plum","charcoal","dark-academic","solar-citrus","electric-azure","coral-bloom","mint-pop","lemon-sky","aqua-lime","berry-fizz","peach-punch","lavender-glow","spring-green","midnight-gold","ink-cyan","black-coral","graphite-lime","royal-cream","espresso-ivory","aubergine-gold","emerald-night","crimson-slate","arctic-black","cobalt-white","scarlet-paper","emerald-white","violet-ivory","teal-porcelain","navy-sand","magenta-frost","orange-ink","indigo-mint","crimson-cream","powder-blue","sky-blue","ice-blue","cobalt-blue","cornflower-blue","steel-blue","denim-blue","arctic-blue","glacier-blue","mist-blue","ocean-blue","harbor-blue","cerulean-blue","periwinkle-blue","sapphire-blue","aegean-blue","frost-blue","azure-bloom","lapis-blue","cloud-blue","custom-theme"];
function validAdminTheme(t){return ADMIN_THEMES.includes(t)?t:"classic-brown"}
function selectedAdminTheme(){
  const checked=document.querySelector('input[name="siteTheme"]:checked')?.value;
  if(ADMIN_THEMES.includes(checked))return checked;
  const current=String(currentContent?.defaultTheme||"");
  return ADMIN_THEMES.includes(current)?current:"classic-brown";
}
function applyAdminThemePreview(theme){
  const valid=validAdminTheme(theme);
  document.documentElement.dataset.theme=valid;
  if(valid==="custom-theme"){
    normalizeCustomTheme(currentContent);
    applyCustomThemeVariables(currentContent.appearance.customTheme);
  }
}
function fillThemeChooser(){
  const theme=validAdminTheme(currentContent.defaultTheme||"classic-brown");
  const input=document.querySelector(`input[name="siteTheme"][value="${theme}"]`);
  if(input)input.checked=true;
  document.querySelectorAll("[data-theme-card]").forEach(card=>{
    card.classList.toggle("selected",card.dataset.themeCard===theme);
  });
  applyAdminThemePreview(theme);
}
document.addEventListener("change",e=>{
  const input=e.target.closest('input[name="siteTheme"]');
  if(!input)return;
  document.querySelectorAll("[data-theme-card]").forEach(card=>{
    card.classList.toggle("selected",card.dataset.themeCard===input.value);
  });
  // Store the chosen theme immediately in the editor state. This prevents a
  // later fillForms()/media refresh from restoring the previously saved theme.
  currentContent.defaultTheme=input.value;
  applyAdminThemePreview(input.value);
  if($("fSectionTitleColor")&&$("fSectionSubtitleColor")){
    showCurrentThemeColorsInBoxes();
    setStatus("Theme preview updated. Typography colors now start from this theme's colors.");
  }
});

const $=id=>document.getElementById(id);
let currentContent=structuredClone(DEFAULT_CONTENT);

function revealAdminUi(){
  if(window.__adminPaintFallback){
    clearTimeout(window.__adminPaintFallback);
    window.__adminPaintFallback=null;
  }
  document.documentElement.classList.remove("admin-booting");
  document.documentElement.classList.add("admin-ready");
}

async function boot(){
  try{
    const{data:{session}}=await sb.auth.getSession();
    if(session){
      await verifyAdminAndOpen();
    }else{
      showLogin();
      revealAdminUi();
    }
  }catch(err){
    console.error("Admin boot failed:",err);
    showLogin();
    $("loginStatus").textContent="Could not initialize Admin. Please reload and try again.";
    revealAdminUi();
  }
}
function prepareFreshLoginFields(){
  const email=$("loginEmail"),password=$("loginPassword");
  if(!email||!password)return;

  // Do not change Supabase session persistence. This guard is only for
  // browsers that do NOT already have a valid signed-in Admin session.
  [email,password].forEach(field=>{
    field.value="";
    field.readOnly=true;
    field.setAttribute("data-lpignore","true");
    field.setAttribute("data-1p-ignore","true");
    field.setAttribute("data-bwignore","true");
  });
  email.setAttribute("autocomplete","off");
  password.setAttribute("autocomplete","new-password");

  const unlockField=field=>{
    field.readOnly=false;
    field.value="";
  };
  [email,password].forEach(field=>{
    field.addEventListener("pointerdown",()=>unlockField(field),{once:true});
    field.addEventListener("focus",()=>unlockField(field),{once:true});
    field.addEventListener("keydown",()=>{field.readOnly=false},{once:true});
  });

  // Some browsers/password managers try to inject saved values just after
  // page load. Clear those values while the fields are still locked.
  requestAnimationFrame(()=>{
    if(email.readOnly)email.value="";
    if(password.readOnly)password.value="";
  });
  setTimeout(()=>{
    if(email.readOnly)email.value="";
    if(password.readOnly)password.value="";
  },250);
}

function showLogin(){
  $("loginView").classList.remove("hidden");
  $("adminView").classList.add("hidden");
  prepareFreshLoginFields();
}
async function verifyAdminAndOpen(){
  const{data,error}=await sb.rpc("is_site_admin");
  if(error||data!==true){
    await sb.auth.signOut();
    $("loginStatus").textContent="This account is not authorized to edit the website.";
    showLogin();
    revealAdminUi();
    return;
  }

  // Keep the current screen hidden (during reload) or keep the login screen
  // visible (after a manual sign-in) until every saved field is populated.
  await loadContent();
  $("loginView").classList.add("hidden");
  $("adminView").classList.remove("hidden");
  revealAdminUi();
}
$("loginBtn").addEventListener("click",async()=>{
  $("loginStatus").textContent="Signing in...";
  const{error}=await sb.auth.signInWithPassword({email:$("loginEmail").value.trim(),password:$("loginPassword").value});
  if(error){$("loginStatus").textContent=error.message;return}
  $("loginStatus").textContent="";
  await verifyAdminAndOpen();
});
$("logoutBtn").addEventListener("click",async()=>{await sb.auth.signOut();location.reload()});

function activateAdminTab(tabName,{persist=true}={}){
  const btn=[...document.querySelectorAll("[data-tab]")].find(b=>b.dataset.tab===tabName);
  if(!btn)return false;
  document.querySelectorAll("[data-tab]").forEach(b=>b.classList.toggle("active",b===btn));
  document.querySelectorAll("[data-panel]").forEach(p=>p.classList.toggle("active",p.dataset.panel===tabName));
  if(persist)localStorage.setItem("academicAdminActiveTab",tabName);
  if(tabName==="preview")scheduleAdminPreview(true);
  if(tabName==="history")renderRevisionList();
  if(tabName==="presets")renderDesignPresets();
  return true;
}

document.querySelectorAll("[data-tab]").forEach(btn=>btn.addEventListener("click",()=>activateAdminTab(btn.dataset.tab)));

/* Keep the same Admin page after a browser refresh/reload. */
const savedAdminActiveTab=localStorage.getItem("academicAdminActiveTab");
if(savedAdminActiveTab)activateAdminTab(savedAdminActiveTab,{persist:false});

function merge(base,extra){
  if(Array.isArray(base))return Array.isArray(extra)?extra:base;
  if(base&&typeof base==="object"){
    const out={...base};
    if(extra&&typeof extra==="object")Object.keys(extra).forEach(k=>out[k]=k in base?merge(base[k],extra[k]):extra[k]);
    return out;
  }
  return extra??base;
}
function normalizePublicationRecord(item){
  const out={...(item||{})};
  out.authorNote=String(out.authorNote||"").trim();
  const description=String(out.description||"").trim();
  if(!out.authorNote&&description){
    const lines=description.split(/\r?\n/);
    const contributionIndex=lines.findIndex(line=>/contributed\s+equally/i.test(line));
    if(contributionIndex>=0){
      out.authorNote=String(lines[contributionIndex]||"").trim();
      lines.splice(contributionIndex,1);
      out.description=lines.join("\n").trim();
    }else{
      out.description=description;
    }
  }else{
    out.description=description;
  }
  out.media=normalizeMediaDisplayList(out.media);
  return out;
}

function normalizeSkillGroupRecord(item){
  const out={...(item||{})};
  out.category=String(out.category||"").trim();
  out.items=Array.isArray(out.items)?out.items.map(v=>String(v).trim()).filter(Boolean):String(out.items||"").split(/\r?\n|,/).map(v=>v.trim()).filter(Boolean);
  out.subgroups=(Array.isArray(out.subgroups)?out.subgroups:[]).map(group=>({
    name:String(group?.name??group?.title??"").trim(),
    items:Array.isArray(group?.items)?group.items.map(v=>String(v).trim()).filter(Boolean):String(group?.items||"").split(/\r?\n|,/).map(v=>v.trim()).filter(Boolean)
  })).filter(group=>group.name||group.items.length);
  out.media=normalizeMediaDisplayList(out.media);
  return out;
}

function normalizeMedia(content){
  normalizeAcademicArchitecture(content);
  normalizeResearchInterests(content);
  normalizeThesis(content);
  normalizeSiteSettings(content);
  normalizeCustomTheme(content);
  normalizeTypography(content);
  normalizeSectionHeadings(content);
  content.sectionMedia=content.sectionMedia||{};
  content.sectionMedia.profile=normalizeMediaDisplayList(content.sectionMedia.profile);
  content.publications=(content.publications||[]).map(normalizePublicationRecord);
  content.projects=(content.projects||[]).map(x=>({...x,type:String(x.type||""),contribution:String(x.contribution||""),media:normalizeMediaDisplayList(x.media)}));
  content.academicActivities=(content.academicActivities||[]).map(x=>({...x,media:normalizeMediaDisplayList(x.media)}));
  content.skills=(content.skills||[]).map(normalizeSkillGroupRecord);
  content.education=(content.education||[]).map(x=>({...x,cgpa:String(x?.cgpa??""),cgpaSubtitle:String(x?.cgpaSubtitle??""),courses:Array.isArray(x?.courses)?x.courses.map(v=>String(v).trim()).filter(Boolean):String(x?.courses??"").split(/\r?\n|,/).map(v=>v.trim()).filter(Boolean),media:normalizeMediaDisplayList(x.media)}));
  content.contact=content.contact||{};
  content.contact.media=normalizeMediaDisplayList(content.contact.media);
  content.thesis.media=normalizeMediaDisplayList(content.thesis.media);
  return content;
}
async function loadContent(){
  const{data:row,error}=await sb.from("site_content").select("content").eq("id","main").single();
  const rawContent=!error&&row?.content&&Object.keys(row.content).length?row.content:{};
  const neededMigration=builderSettingsNeedMigration(rawContent);

  currentContent=Object.keys(rawContent).length?merge(DEFAULT_CONTENT,rawContent):structuredClone(DEFAULT_CONTENT);
  normalizeMedia(currentContent);
  ensureBuilderState(currentContent);
  currentContent.builderState.academicArchitectureV1=true;

  // Snapshot the fully normalized settings. All future partial saves use this
  // as a safety net so an unrelated code update cannot drop another setting.
  savedBuilderSettingsSnapshot=captureBuilderSettings(currentContent);

  // Persist migration markers/default repairs immediately. The user no longer
  // has to remember to click Save after installing a maintenance update.
  if(neededMigration){
    const{error:migrationError}=await sb.from("site_content")
      .update({content:currentContent,updated_at:new Date().toISOString()})
      .eq("id","main");
    if(!migrationError){
      savedBuilderSettingsSnapshot=captureBuilderSettings(currentContent);
    }else{
      console.warn("Settings migration save warning:",migrationError.message);
    }
  }

  fillForms();
  initializeGlobalHistory();
}

function fillForms(){
  $("fName").value=currentContent.name||"";
  $("fTitle").value=currentContent.title||"";
  $("fInstitution").value=currentContent.institution||"";
  $("fLocation").value=currentContent.location||"";
  $("fFocus").value=currentContent.focus||"";
  const sections=normalizeSectionHeadings(currentContent).sectionHeadings;
  $("fSectionAboutTitle").value=sections.about.title||"";
  $("fAboutHeadline").value=sections.about.subtitle||"";
  $("fSectionResearchTitle").value=sections.research.title||"";
  $("fSectionResearchSubtitle").value=sections.research.subtitle||"";
  $("fSectionThesisTitle").value=sections.thesis.title||"";
  $("fSectionThesisSubtitle").value=sections.thesis.subtitle||"";
  $("fSectionPublicationsTitle").value=sections.publications.title||"";
  $("fSectionPublicationsSubtitle").value=sections.publications.subtitle||"";
  $("fSectionProjectsTitle").value=sections.projects.title||"";
  $("fSectionProjectsSubtitle").value=sections.projects.subtitle||"";
  $("fSectionActivitiesTitle").value=sections.activities.title||"";
  $("fSectionActivitiesSubtitle").value=sections.activities.subtitle||"";
  $("fSectionSkillsTitle").value=sections.skills.title||"";
  $("fSectionSkillsSubtitle").value=sections.skills.subtitle||"";
  $("fSectionEducationTitle").value=sections.education.title||"";
  $("fSectionEducationSubtitle").value=sections.education.subtitle||"";
  $("fSectionContactTitle").value=sections.contact.title||"";
  $("fContactHeadline").value=sections.contact.subtitle||"";
  $("fSectionCvTitle").value=sections.cv.title||"";
  $("fSectionCvSubtitle").value=sections.cv.subtitle||"";
  $("fAboutLead").value=currentContent.aboutLead||"";
  $("fAboutBio").value=currentContent.aboutBio||"";
  normalizeResearchInterests(currentContent);
  $("fPrimaryInterests").value=(currentContent.researchInterestGroups.primary||[]).join("\n");
  $("fAdditionalInterests").value=(currentContent.researchInterestGroups.additional||[]).join("\n");
  normalizeThesis(currentContent);
  $("fThesisTitle").value=currentContent.thesis.title||"";
  $("fThesisDescription").value=currentContent.thesis.description||"";
  $("fThesisSupervisor").value=currentContent.thesis.supervisor||"";
  $("fThesisCoSupervisor").value=currentContent.thesis.coSupervisor||"";
  $("fThesisDegree").value=currentContent.thesis.degree||"";
  $("fThesisInstitution").value=currentContent.thesis.institution||currentContent.institution||"";
  $("fThesisPeriod").value=currentContent.thesis.period||"";
  $("fThesisStatus").value=currentContent.thesis.status||"";
  $("fThesisKeywords").value=(currentContent.thesis.keywords||[]).join(", ");
  $("fContactMessage").value=currentContent.contact?.message||"";
  $("fEmail").value=currentContent.contact?.email||"";
  $("fPhone").value=currentContent.contact?.phone||"";
  $("fContactLocation").value=currentContent.contact?.location||currentContent.location||"";
  $("fLinkedIn").value=currentContent.links?.linkedin||"";
  $("fGitHub").value=currentContent.links?.github||"";
  $("fOrcid").value=currentContent.links?.orcid||"";
  $("fScholar").value=currentContent.links?.scholar||"";
  $("fResearchGate").value=currentContent.links?.researchgate||"";
  $("fScopus").value=currentContent.links?.scopus||"";
  $("fWos").value=currentContent.links?.wos||"";
  $("fWebsite").value=currentContent.links?.website||"";
  $("fCvExternal").value="";
  if(currentContent.photo_url){
    $("photoPreview").src=currentContent.photo_url;
    $("photoPreview").classList.remove("hidden");
  }else{
    $("photoPreview").removeAttribute("src");
    $("photoPreview").classList.add("hidden");
  }
  renderAllEditors();
  renderCvState();
  fillThemeChooser();
  fillTypographyControls();
  fillCustomThemeControls();
  fillSiteCustomizationControls();
  renderDesignPresets();
  renderRevisionList();
  scheduleAdminPreview();
}

function renderAllEditors(){
  renderPublicationsEditor();
  renderProjectsEditor();
  renderActivitiesEditor();
  renderSkillsEditor();
  renderEducationEditor();
  $("profileMediaEditor").innerHTML=mediaEditor("profile",currentContent.sectionMedia?.profile||[],"Profile / About media");
  $("thesisMediaEditor").innerHTML=mediaEditor("thesis",currentContent.thesis?.media||[],"Thesis media & attachments");
  $("contactMediaEditor").innerHTML=mediaEditor("contact",currentContent.contact?.media||[],"Contact media");
}

function repeatBlock(type,i,title,fields,media=[],visible=true,extraBody=""){
  const safeTitle=String(title||"").trim()||`${type} ${i+1}`;
  return `<div class="repeat-item repeat-collapsible repeat-collapsed" data-${type}="${i}" data-repeat-type="${type}">
    <div class="repeat-head repeat-collapsible-head">
      <div class="repeat-collapsible-summary">
        <button class="repeat-collapse-toggle" data-repeat-toggle="${type}:${i}" type="button" aria-expanded="false" title="Expand item"><span class="repeat-collapse-chevron" aria-hidden="true">›</span></button>
        <strong>${esc(safeTitle)}</strong>
      </div>
      <div class="repeat-actions">
        <label class="repeat-public-toggle"><input type="checkbox" data-item-visible ${visible!==false?"checked":""}> Show publicly</label>
        <button class="secondary repeat-move" data-move-item="${type}:${i}:-1" type="button" title="Move up">↑</button>
        <button class="secondary repeat-move" data-move-item="${type}:${i}:1" type="button" title="Move down">↓</button>
        <button class="danger" data-remove="${type}:${i}" type="button">Remove</button>
      </div>
    </div>
    <div class="repeat-collapsible-body">
      <div class="form-grid">
        ${fields.map(f=>`<div class="field ${f.full?"full":""}"><label>${esc(f.label)}</label>${
          f.kind==="textarea"?`<textarea data-k="${f.key}">${esc(f.value||"")}</textarea>`:
          f.kind==="select"?`<select data-k="${f.key}">${(f.options||["","Published","Accepted","In press","Submitted","Under review","Manuscript in Preparation","Preprint","Conference"]).map(o=>{const opt=(o&&typeof o==="object")?o:{value:o,label:o};return`<option value="${esc(opt.value??"")}" ${(opt.value??"")===f.value?"selected":""}>${esc(opt.label??opt.value??"")}</option>`}).join("")}</select>`:
          `<input data-k="${f.key}" value="${esc(f.value||"")}">`
        }</div>`).join("")}
      </div>
      ${extraBody||""}
      ${mediaEditor(`${type}:${i}`,media,"Media & attachments")}
    </div>
  </div>`;
}

function setRepeatRowCollapsed(row,collapsed){
  if(!row)return;
  row.classList.toggle("repeat-collapsed",!!collapsed);
  const toggle=row.querySelector("[data-repeat-toggle]");
  if(toggle){
    toggle.setAttribute("aria-expanded",collapsed?"false":"true");
    toggle.title=collapsed?"Expand item":"Collapse item";
  }
}

function collectionRows(type){
  const selector={publication:"#publicationsEditor [data-publication]",project:"#projectsEditor [data-project]",skill:"#skillsEditor [data-skill]",education:"#educationEditor [data-education]"}[type];
  return selector?[...document.querySelectorAll(selector)]:[];
}

function renderPublicationsEditor(){
  $("publicationsEditor").innerHTML=(currentContent.publications||[]).map((p,i)=>repeatBlock("publication",i,p.title||`Publication ${i+1}`,[
    {label:"Title",key:"title",value:p.title,full:true},{label:"Authors",key:"authors",value:p.authors,full:true},
    {label:"Author symbol / contribution note",key:"authorNote",value:p.authorNote||"",full:true},
    {label:"Journal / Conference",key:"venue",value:p.venue},{label:"Year",key:"year",value:p.year},
    {label:"Status",key:"status",value:p.status,kind:"select"},{label:"DOI",key:"doi",value:p.doi},
    {label:"Publication URL",key:"url",value:p.url,full:true},{label:"Short note / description",key:"description",value:p.description,kind:"textarea",full:true}
  ],p.media||[],p.visible!==false)).join("")||`<div class="empty-state">No publications added yet.</div>`;
}
function renderProjectsEditor(){
  $("projectsEditor").innerHTML=(currentContent.projects||[]).map((p,i)=>repeatBlock("project",i,p.title||`Project / Simulation ${i+1}`,[
    {label:"Project title",key:"title",value:p.title,full:true},
    {label:"Type",key:"type",value:p.type||"",kind:"select",options:["","Research Project","Simulation","Engineering Project","Course Project","Hands-on Practical"]},
    {label:"Role / My Contribution",key:"contribution",value:p.contribution||"",kind:"textarea",full:true},
    {label:"Tools / metadata",key:"meta",value:p.meta},
    {label:"Description",key:"description",value:p.description,kind:"textarea",full:true},
    {label:"Project URL",key:"url",value:p.url,full:true}
  ],p.media||[],p.visible!==false)).join("")||`<div class="empty-state">No projects or simulations added.</div>`;
}
function activityCardStyleOptions(item){
  const category=normalizeActivityCategory(item?.category);
  const inheritedLabel=category==="Certifications"?"Default — Certification Grid":"Default — Appearance setting";
  return [
    {value:"",label:inheritedLabel},
    {value:"activity-split",label:"Activity Split"},
    {value:"activity-showcase",label:"Activity Showcase"},
    {value:"activity-media-fill",label:"Activity Media Fill"},
    {value:"activity-certificate-full",label:"Certificate Card"},
    {value:"activity-certificate-grid",label:"Certification Grid"}
  ];
}

function refreshActivityCardStyleDefaultLabel(row){
  if(!row)return;
  const category=normalizeActivityCategory(row.querySelector('[data-k="category"]')?.value||"");
  const select=row.querySelector('[data-k="cardDesign"]');
  const option=select?.querySelector('option[value=""]');
  if(option)option.textContent=category==="Certifications"?"Default — Certification Grid":"Default — Appearance setting";
}

const ACTIVITY_ADMIN_CATEGORIES=["Presentations & Posters","Training & Practical Experience","Certifications","Mentoring & Teaching","Awards & Honors"];
const ACTIVITY_ADMIN_CATEGORY_STORAGE_KEY="academicAdminActivityCategory";
let activityAdminExpandIndexAfterRender=null;
let activityDragState=null;

function savedActivityAdminCategory(){
  try{
    const saved=normalizeActivityCategory(localStorage.getItem(ACTIVITY_ADMIN_CATEGORY_STORAGE_KEY)||"");
    return ACTIVITY_ADMIN_CATEGORIES.includes(saved)?saved:"";
  }catch{return ""}
}

let activityAdminActiveCategory=savedActivityAdminCategory()||ACTIVITY_ADMIN_CATEGORIES[0];

function activityCardStyleSummary(item){
  const explicit=normalizeActivityCardDesign(item?.cardDesign);
  const labels={
    "activity-split":"Activity Split",
    "activity-showcase":"Activity Showcase",
    "activity-media-fill":"Activity Media Fill",
    "activity-certificate-full":"Certificate Card",
    "activity-certificate-grid":"Certification Grid"
  };
  if(explicit)return labels[explicit]||"Custom card";
  return normalizeActivityCategory(item?.category)==="Certifications"?"Certification Grid (default)":"Appearance default";
}

function activitySearchText(item){
  return [item?.title,item?.activityType,item?.organization,item?.date,(item?.topics||[]).join(" ")]
    .map(v=>String(v||"").trim()).filter(Boolean).join(" ").toLowerCase();
}

function activityRepeatBlock(item,i){
  const category=normalizeActivityCategory(item?.category);
  const title=String(item?.title||item?.activityType||"Untitled activity").trim()||"Untitled activity";
  const mediaCount=Array.isArray(item?.media)?item.media.length:0;
  const meta=[String(item?.date||"").trim(),activityCardStyleSummary(item),`${mediaCount} ${mediaCount===1?"media":"media"}`].filter(Boolean);
  const fields=[
    {label:"General category",key:"category",value:category,kind:"select",options:ACTIVITY_ADMIN_CATEGORIES},
    {label:"Specific activity type",key:"activityType",value:item.activityType||""},
    {label:"Topics / exposure — comma separated",key:"topics",value:(item.topics||[]).join(", "),full:true},
    {label:"Date / year",key:"date",value:item.date||""},
    {label:"Card style",key:"cardDesign",value:normalizeActivityCardDesign(item.cardDesign),kind:"select",options:activityCardStyleOptions(item)},
    {label:"Title",key:"title",value:item.title,full:true},
    {label:"Venue / issuer / organization",key:"organization",value:item.organization,full:true},
    {label:"Description",key:"description",value:item.description,kind:"textarea",full:true},
    {label:"Relevant URL / credential link",key:"url",value:item.url,full:true}
  ];

  return `<div class="repeat-item activity-admin-item activity-collapsed" data-activity="${i}" data-activity-category="${esc(category)}" data-activity-search="${esc(activitySearchText(item))}">
    <div class="repeat-head activity-repeat-head">
      <div class="activity-repeat-summary">
        <button class="activity-collapse-toggle" data-activity-toggle="${i}" type="button" aria-expanded="false" title="Expand activity"><span class="activity-collapse-chevron" aria-hidden="true">›</span></button>
        <span class="activity-drag-handle" data-activity-drag-handle="${i}" draggable="true" role="button" tabindex="0" title="Drag to reorder within this category" aria-label="Drag to reorder within this category">⠿</span>
        <div class="activity-repeat-summary-copy">
          <strong data-activity-summary-title>${esc(title)}</strong>
          <div class="activity-repeat-meta" data-activity-summary-meta>${meta.map(v=>`<span>${esc(v)}</span>`).join("")}</div>
        </div>
      </div>
      <div class="repeat-actions">
        <label class="repeat-public-toggle"><input type="checkbox" data-item-visible ${item.visible!==false?"checked":""}> Show publicly</label>
        <button class="secondary repeat-move" data-move-item="activity:${i}:-1" type="button" title="Move up within this category">↑</button>
        <button class="secondary repeat-move" data-move-item="activity:${i}:1" type="button" title="Move down within this category">↓</button>
        <button class="danger" data-remove="activity:${i}" type="button">Remove</button>
      </div>
    </div>
    <div class="activity-repeat-body">
      <div class="form-grid">
        ${fields.map(f=>`<div class="field ${f.full?"full":""}"><label>${esc(f.label)}</label>${
          f.kind==="textarea"?`<textarea data-k="${f.key}">${esc(f.value||"")}</textarea>`:
          f.kind==="select"?`<select data-k="${f.key}">${(f.options||[]).map(o=>{const opt=(o&&typeof o==="object")?o:{value:o,label:o};return`<option value="${esc(opt.value??"")}" ${(opt.value??"")===f.value?"selected":""}>${esc(opt.label??opt.value??"")}</option>`}).join("")}</select>`:
          `<input data-k="${f.key}" value="${esc(f.value||"")}">`
        }</div>`).join("")}
      </div>
      ${mediaEditor(`activity:${i}`,item.media||[],"Media & attachments")}
    </div>
  </div>`;
}

function setActivityRowCollapsed(row,collapsed){
  if(!row)return;
  row.classList.toggle("activity-collapsed",!!collapsed);
  const toggle=row.querySelector("[data-activity-toggle]");
  if(toggle){
    toggle.setAttribute("aria-expanded",collapsed?"false":"true");
    toggle.title=collapsed?"Expand activity":"Collapse activity";
  }
}

function captureExpandedActivityIndexes(){
  return new Set([...document.querySelectorAll('#activitiesEditor [data-activity]')]
    .filter(row=>!row.classList.contains("activity-collapsed"))
    .map(row=>Number(row.dataset.activity))
    .filter(Number.isFinite));
}

function renderActivityCategoryTabs(){
  const tabs=$("activityCategoryTabs");
  if(!tabs)return;
  const rows=[...document.querySelectorAll('#activitiesEditor [data-activity]')];
  tabs.innerHTML=ACTIVITY_ADMIN_CATEGORIES.map(category=>{
    const count=rows.filter(row=>normalizeActivityCategory(row.dataset.activityCategory)===category).length;
    const active=category===activityAdminActiveCategory;
    return `<button class="activity-category-tab ${active?"active":""}" type="button" role="tab" aria-selected="${active?"true":"false"}" data-activity-admin-category="${esc(category)}"><span>${esc(category)}</span><small>${count}</small></button>`;
  }).join("");
}

function applyActivityAdminFilters(){
  if(!ACTIVITY_ADMIN_CATEGORIES.includes(activityAdminActiveCategory))activityAdminActiveCategory=ACTIVITY_ADMIN_CATEGORIES[0];
  const search=String($("activitySearchInput")?.value||"").trim().toLowerCase();
  let shown=0;
  const rows=[...document.querySelectorAll('#activitiesEditor [data-activity]')];
  rows.forEach(row=>{
    const category=normalizeActivityCategory(row.dataset.activityCategory);
    const matchesCategory=category===activityAdminActiveCategory;
    const matchesSearch=!search||String(row.dataset.activitySearch||"").includes(search);
    const visible=matchesCategory&&matchesSearch;
    row.classList.toggle("activity-admin-filtered-out",!visible);
    if(visible)shown++;
  });

  document.querySelectorAll("#activityCategoryTabs [data-activity-admin-category]").forEach(btn=>{
    const active=btn.dataset.activityAdminCategory===activityAdminActiveCategory;
    btn.classList.toggle("active",active);
    btn.setAttribute("aria-selected",active?"true":"false");
  });

  const addBtn=$("addActivityBtn");
  if(addBtn)addBtn.textContent=`+ Add to ${activityAdminActiveCategory}`;
  const status=$("activityCategoryStatus");
  if(status)status.textContent=search?`${shown} matching ${shown===1?"activity":"activities"} in ${activityAdminActiveCategory}`:`${shown} ${shown===1?"activity":"activities"} in ${activityAdminActiveCategory}`;
  const empty=$("activityCategoryEmptyState");
  if(empty){
    empty.classList.toggle("hidden",shown>0);
    empty.textContent=search?`No activities in ${activityAdminActiveCategory} match “${$("activitySearchInput")?.value||""}”.`:`No activities in ${activityAdminActiveCategory} yet.`;
  }
}

function setActivityAdminCategory(category,persist=true){
  const normalized=normalizeActivityCategory(category);
  activityAdminActiveCategory=ACTIVITY_ADMIN_CATEGORIES.includes(normalized)?normalized:ACTIVITY_ADMIN_CATEGORIES[0];
  if(persist){try{localStorage.setItem(ACTIVITY_ADMIN_CATEGORY_STORAGE_KEY,activityAdminActiveCategory)}catch{}}
  if($("activitySearchInput"))$("activitySearchInput").value="";
  applyActivityAdminFilters();
}

function updateActivityAdminRowSummary(row){
  if(!row)return;
  const category=normalizeActivityCategory(row.querySelector('[data-k="category"]')?.value||row.dataset.activityCategory);
  row.dataset.activityCategory=category;
  const values={
    title:(row.querySelector('[data-k="title"]')?.value||"").trim(),
    activityType:(row.querySelector('[data-k="activityType"]')?.value||"").trim(),
    organization:(row.querySelector('[data-k="organization"]')?.value||"").trim(),
    date:(row.querySelector('[data-k="date"]')?.value||"").trim(),
    topics:(row.querySelector('[data-k="topics"]')?.value||"").split(",").map(x=>x.trim()).filter(Boolean),
    cardDesign:(row.querySelector('[data-k="cardDesign"]')?.value||"").trim(),
    category
  };
  row.dataset.activitySearch=activitySearchText(values);
  const titleNode=row.querySelector("[data-activity-summary-title]");
  if(titleNode)titleNode.textContent=values.title||values.activityType||"Untitled activity";
  const metaNode=row.querySelector("[data-activity-summary-meta]");
  if(metaNode){
    const fake={category,cardDesign:values.cardDesign};
    const mediaCount=row.querySelectorAll(".media-admin-item").length;
    const parts=[values.date,activityCardStyleSummary(fake),`${mediaCount} ${mediaCount===1?"media":"media"}`].filter(Boolean);
    metaNode.innerHTML=parts.map(v=>`<span>${esc(v)}</span>`).join("");
  }
}

function renderActivitiesEditor(){
  const expanded=captureExpandedActivityIndexes();
  const items=currentContent.academicActivities||[];
  $("activitiesEditor").innerHTML=items.map((item,i)=>activityRepeatBlock(item,i)).join("");
  expanded.forEach(i=>setActivityRowCollapsed(document.querySelector(`#activitiesEditor [data-activity="${i}"]`),false));
  if(Number.isFinite(activityAdminExpandIndexAfterRender)){
    const row=document.querySelector(`#activitiesEditor [data-activity="${activityAdminExpandIndexAfterRender}"]`);
    if(row){setActivityRowCollapsed(row,false);setTimeout(()=>row.scrollIntoView({behavior:"smooth",block:"nearest"}),0)}
    activityAdminExpandIndexAfterRender=null;
  }
  renderActivityCategoryTabs();
  applyActivityAdminFilters();
}

function reorderActivityWithinCategory(sourceIndex,targetIndex,placeAfter=false){
  syncAllForms();
  const arr=currentContent.academicActivities||[];
  if(sourceIndex===targetIndex||!arr[sourceIndex]||!arr[targetIndex])return;
  const category=normalizeActivityCategory(arr[sourceIndex].category);
  if(normalizeActivityCategory(arr[targetIndex].category)!==category)return;
  const slots=arr.map((item,i)=>normalizeActivityCategory(item?.category)===category?i:-1).filter(i=>i>=0);
  const items=slots.map(i=>arr[i]);
  const sourcePos=slots.indexOf(sourceIndex);
  const targetPos=slots.indexOf(targetIndex);
  if(sourcePos<0||targetPos<0)return;
  const [moving]=items.splice(sourcePos,1);
  const adjustedTarget=targetPos-(sourcePos<targetPos?1:0);
  let insertPos=adjustedTarget+(placeAfter?1:0);
  insertPos=Math.max(0,Math.min(items.length,insertPos));
  items.splice(insertPos,0,moving);
  slots.forEach((slot,i)=>{arr[slot]=items[i]});
  renderActivitiesEditor();
  setStatus("Activity reordered within this category. Save all changes to publish.");
}
function skillSubgroupBlock(groupIndex,subgroup,subIndex){
  return `<div class="skill-subgroup-admin" data-skill-subgroup="${subIndex}">
    <div class="skill-subgroup-head">
      <strong>${esc(subgroup.name||`Subgroup ${subIndex+1}`)}</strong>
      <div class="skill-subgroup-actions">
        <button class="secondary" data-move-skill-subgroup="${groupIndex}:${subIndex}:-1" type="button" title="Move subgroup up">↑</button>
        <button class="secondary" data-move-skill-subgroup="${groupIndex}:${subIndex}:1" type="button" title="Move subgroup down">↓</button>
        <button class="danger" data-remove-skill-subgroup="${groupIndex}:${subIndex}" type="button">Remove</button>
      </div>
    </div>
    <div class="form-grid">
      <div class="field full"><label>Subgroup name</label><input data-skill-subgroup-name value="${esc(subgroup.name||"")}" placeholder="e.g., Programming & Libraries"></div>
      <div class="field full"><label>Skills — one per line</label><textarea data-skill-subgroup-items placeholder="Python\nNumPy\npandas">${esc((subgroup.items||[]).join("\n"))}</textarea></div>
    </div>
  </div>`;
}

function skillSubgroupsEditor(group,i){
  const subgroups=Array.isArray(group.subgroups)?group.subgroups:[];
  return `<div class="skill-subgroups-admin">
    <div class="skill-subgroups-toolbar">
      <div>
        <strong>Subgroups</strong>
        <span class="helper">Optional. Use these to structure one skill group without creating several separate cards.</span>
      </div>
      <button class="secondary" data-add-skill-subgroup="${i}" type="button">+ Add subgroup</button>
    </div>
    <div class="skill-subgroups-list">
      ${subgroups.length?subgroups.map((sg,j)=>skillSubgroupBlock(i,sg,j)).join(""):`<div class="skill-subgroup-empty">No subgroups yet. General skills above will still display normally.</div>`}
    </div>
  </div>`;
}

function renderSkillsEditor(){
  $("skillsEditor").innerHTML=(currentContent.skills||[]).map((g,i)=>repeatBlock("skill",i,g.category||`Skill group ${i+1}`,[
    {label:"Category",key:"category",value:g.category,full:true},
    {label:"General / ungrouped skills — one per line (optional)",key:"items",value:(g.items||[]).join("\n"),kind:"textarea",full:true}
  ],g.media||[],g.visible!==false,skillSubgroupsEditor(g,i))).join("")||`<div class="empty-state">No skill groups added.</div>`;
}

function renderEducationEditor(){
  $("educationEditor").innerHTML=(currentContent.education||[]).map((e,i)=>repeatBlock("education",i,e.degree||e.institution||`Education ${i+1}`,[
    {label:"Period",key:"period",value:e.period},{label:"Degree",key:"degree",value:e.degree},
    {label:"Institution",key:"institution",value:e.institution,full:true},
    {label:"CGPA / GPA",key:"cgpa",value:e.cgpa||""},
    {label:"CGPA subtitle / academic distinction",key:"cgpaSubtitle",value:e.cgpaSubtitle||"",full:true},
    {label:"Description",key:"description",value:e.description,kind:"textarea",full:true},
    {label:"Important Courses — one per line",key:"courses",value:(e.courses||[]).join("\n"),kind:"textarea",full:true}
  ],e.media||[],e.visible!==false)).join("")||`<div class="empty-state">No education entries added.</div>`;
}

function adminVideoEmbed(url){
  try{
    const u=new URL(url);
    const host=u.hostname.toLowerCase();
    if(host.includes("youtube.com")){
      const id=u.searchParams.get("v");
      if(id)return`https://www.youtube.com/embed/${encodeURIComponent(id)}`;
      const parts=u.pathname.split("/").filter(Boolean);
      const shortsIndex=parts.indexOf("shorts");
      if(shortsIndex>=0&&parts[shortsIndex+1])return`https://www.youtube.com/embed/${encodeURIComponent(parts[shortsIndex+1])}`;
      const embedIndex=parts.indexOf("embed");
      if(embedIndex>=0&&parts[embedIndex+1])return`https://www.youtube.com/embed/${encodeURIComponent(parts[embedIndex+1])}`;
    }
    if(host==="youtu.be"||host.endsWith(".youtu.be")){
      const id=u.pathname.split("/").filter(Boolean)[0];
      if(id)return`https://www.youtube.com/embed/${encodeURIComponent(id)}`;
    }
    if(host.includes("vimeo.com")){
      const id=u.pathname.split("/").filter(Boolean).find(x=>/^\d+$/.test(x));
      if(id)return`https://player.vimeo.com/video/${encodeURIComponent(id)}`;
    }
  }catch{}
  return"";
}

function adminMediaPreview(m){
  const type=m?.type||"link";
  const url=String(m?.url||"").trim();
  const title=m?.title||m?.filename||"Media";
  if(!url)return"";

  if(type==="image"){
    return `<div class="media-admin-preview media-admin-preview-image">
      <a href="${esc(url)}" target="_blank" rel="noopener" title="Open full image">
        <img src="${esc(url)}" alt="Preview of ${esc(title)}" loading="lazy">
      </a>
      <div class="media-admin-preview-label">Image preview · click to open full size</div>
    </div>`;
  }

  if(type==="video"){
    const embed=adminVideoEmbed(url);
    const thumb=String(m?.thumbnail_url||"").trim();
    return `<div class="media-admin-preview media-admin-preview-video">
      ${embed
        ? `<div class="media-admin-video-frame"><iframe src="${esc(embed)}" title="Preview of ${esc(title)}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen loading="lazy"></iframe></div>`
        : `<video controls preload="metadata" ${thumb?`poster="${esc(thumb)}"`:""} src="${esc(url)}"></video>`}
      <div class="media-admin-preview-label">${thumb?"Video preview image · play to view video":"Video preview · generate a preview image below"}</div>
    </div>`;
  }

  if(type==="pdf"){
    const thumb=String(m?.thumbnail_url||"").trim();
    return `<div class="media-admin-preview media-admin-preview-pdf">
      <a href="${esc(url)}" target="_blank" rel="noopener" title="Open PDF">
        ${thumb
          ? `<img src="${esc(thumb)}" alt="First-page preview of ${esc(title)}" loading="lazy">`
          : `<div class="media-admin-pdf-placeholder"><span>PDF</span><small>Generate a first-page preview below</small></div>`}
      </a>
      <div class="media-admin-preview-label">PDF preview · click to open document</div>
    </div>`;
  }

  return `<div class="media-admin-link-preview"><a href="${esc(url)}" target="_blank" rel="noopener">Open link ↗</a></div>`;
}

function mediaEditor(owner,media,title){
  return `<div class="media-editor" data-media-owner="${esc(owner)}">
    <div class="media-editor-title">
      <strong>${esc(title)}</strong>
      <span class="helper">Images · PDFs · videos · links · use ← → to reorder</span>
    </div>
    <div class="media-existing">
      ${(media||[]).length?(media||[]).map((m,i)=>`
        <div class="media-admin-item" data-media-index="${i}">
          <div class="media-admin-main">
            <div class="media-admin-summary">
              <span class="media-type-badge">${esc(m.type||"link")}</span>
              <strong>${esc(m.filename||m.title||"Attachment")}</strong>
              <div class="media-admin-order" aria-label="Media order controls">
                <span class="media-order-position">${i+1}/${(media||[]).length}</span>
                <button class="secondary media-order-btn" data-media-move="${esc(owner)}|${i}|-1" type="button" title="Move earlier" ${i===0?"disabled":""}>←</button>
                <button class="secondary media-order-btn" data-media-move="${esc(owner)}|${i}|1" type="button" title="Move later" ${i===(media||[]).length-1?"disabled":""}>→</button>
              </div>
            </div>
            <div class="media-preview-replace-row">
              ${adminMediaPreview(m)}
              ${m.type!=="link"?`<div class="media-replace-admin media-replace-admin-inline">
                <label class="media-mini-label">Replace media file
                  <input type="file" data-media-replace-file accept="image/jpeg,image/png,image/webp,application/pdf,video/mp4,video/webm">
                </label>
                <button class="secondary" data-media-replace="${esc(owner)}:${i}" type="button">Replace file</button>
                <span class="helper">Keeps the title, caption and display settings.</span>
              </div>`:""}
            </div>
            <input data-media-field="title" value="${esc(m.title||"")}" placeholder="Display title (optional)">
            <input data-media-field="caption" value="${esc(m.caption||"")}" placeholder="Caption / note (optional)">
            ${m.type==="image"?`
              <div class="image-settings-admin">
                <h5>Image settings</h5>
                <div class="image-settings-grid">
                  <label>Alt text<input data-media-field="alt" value="${esc(m.alt||"")}" placeholder="Describe the image"></label>
                  <label>Aspect ratio<select data-media-field="aspect">
                    <option value="original" ${(m.aspect||"original")==="original"?"selected":""}>Original</option>
                    <option value="square" ${m.aspect==="square"?"selected":""}>1:1 square</option>
                    <option value="4x3" ${m.aspect==="4x3"?"selected":""}>4:3</option>
                    <option value="16x9" ${m.aspect==="16x9"?"selected":""}>16:9</option>
                  </select></label>
                  <label>Media fit mode<select data-media-field="fitMode">
                    <option value="exact" ${m.fitMode==="exact"?"selected":""}>Exact size</option>
                    <option value="center" ${m.fitMode==="center"?"selected":""}>Center fit</option>
                    <option value="fill" ${m.fitMode==="fill"?"selected":""}>Fill / crop</option>
                    <option value="legacy" ${(m.fitMode||"legacy")==="legacy"?"selected":""}>Current style</option>
                  </select></label>
                  <label>Current-style fit<select data-media-field="fit">
                    <option value="cover" ${(m.fit||"cover")==="cover"?"selected":""}>Cover / crop</option>
                    <option value="contain" ${m.fit==="contain"?"selected":""}>Contain</option>
                  </select></label>
                  <label>Crop position<select data-media-field="position">
                    <option value="center" ${(m.position||"center")==="center"?"selected":""}>Center</option>
                    <option value="top" ${m.position==="top"?"selected":""}>Top</option>
                    <option value="bottom" ${m.position==="bottom"?"selected":""}>Bottom</option>
                    <option value="left" ${m.position==="left"?"selected":""}>Left</option>
                    <option value="right" ${m.position==="right"?"selected":""}>Right</option>
                  </select></label>
                  <label>Display size<select data-media-field="displaySize">
                    <option value="very-small" ${m.displaySize==="very-small"?"selected":""}>Very small</option>
                    <option value="small" ${m.displaySize==="small"?"selected":""}>Small</option>
                    <option value="standard" ${(m.displaySize||"standard")==="standard"?"selected":""}>Standard</option>
                    <option value="medium" ${m.displaySize==="medium"?"selected":""}>Medium</option>
                    <option value="large" ${m.displaySize==="large"?"selected":""}>Large</option>
                    <option value="full" ${m.displaySize==="full"?"selected":""}>Full width</option>
                    <option value="original" ${m.displaySize==="original"?"selected":""}>Original size</option>
                  </select></label>
                  <label>Click to enlarge<select data-media-field="enlarge">
                    <option value="inherit" ${(m.enlarge||"inherit")==="inherit"?"selected":""}>Use site setting</option>
                    <option value="on" ${m.enlarge==="on"?"selected":""}>Always</option>
                    <option value="off" ${m.enlarge==="off"?"selected":""}>Never</option>
                  </select></label>
                  <label>Caption alignment<select data-media-field="captionAlign">
                    <option value="left" ${(m.captionAlign||"left")==="left"?"selected":""}>Left</option>
                    <option value="center" ${m.captionAlign==="center"?"selected":""}>Center</option>
                    <option value="right" ${m.captionAlign==="right"?"selected":""}>Right</option>
                  </select></label>
                </div>
              </div>`:""}
            <span class="helper">${esc(m.url||"")}</span>
            ${m.type==="video"?`
              <div class="pdf-thumb-admin video-thumb-admin">
                <h5>Video preview image</h5>
                <div class="pdf-thumb-actions">
                  <button class="primary" data-video-thumb-generate="${esc(owner)}:${i}" type="button">
                    ${m.thumbnail_url?"Regenerate automatically":"Generate preview automatically"}
                  </button>
                </div>
                <span class="helper">A representative early frame is generated automatically whenever you upload a video, so the preview does not start as a black frame.</span>
                <label class="media-mini-label">Manual preview image (optional)
                  <input type="file" data-video-thumb-file accept="image/jpeg,image/png,image/webp">
                </label>
                <div class="pdf-thumb-actions">
                  <button class="secondary" data-video-thumb-upload="${esc(owner)}:${i}" type="button">
                    ${m.thumbnail_url?"Replace manually":"Upload manually"}
                  </button>
                </div>
                <span class="helper">Use a manual JPG/PNG/WebP only if you prefer a specific video thumbnail.</span>
              </div>
              <div class="image-settings-admin media-display-admin">
                <h5>Media display</h5>
                <div class="image-settings-grid">
                  <label>Display size<select data-media-field="displaySize">
                    <option value="very-small" ${m.displaySize==="very-small"?"selected":""}>Very small</option>
                    <option value="small" ${m.displaySize==="small"?"selected":""}>Small</option>
                    <option value="standard" ${(m.displaySize||"standard")==="standard"?"selected":""}>Standard</option>
                    <option value="medium" ${m.displaySize==="medium"?"selected":""}>Medium</option>
                    <option value="large" ${m.displaySize==="large"?"selected":""}>Large</option>
                    <option value="full" ${m.displaySize==="full"?"selected":""}>Full width</option>
                    <option value="original" ${m.displaySize==="original"?"selected":""}>Original size</option>
                  </select></label>
                  <label>Click to enlarge<select data-media-field="enlarge">
                    <option value="on" ${(m.enlarge||"on")==="on"?"selected":""}>Always</option>
                    <option value="inherit" ${m.enlarge==="inherit"?"selected":""}>Use site setting</option>
                    <option value="off" ${m.enlarge==="off"?"selected":""}>Never</option>
                  </select></label>
                  <label>Caption alignment<select data-media-field="captionAlign">
                    <option value="left" ${(m.captionAlign||"left")==="left"?"selected":""}>Left</option>
                    <option value="center" ${m.captionAlign==="center"?"selected":""}>Center</option>
                    <option value="right" ${m.captionAlign==="right"?"selected":""}>Right</option>
                  </select></label>
                </div>
                <span class="helper">Standard matches the normal attachment card size. Medium and Large make the media more prominent; Original keeps its native size where space allows.</span>
              </div>`:""}
            ${m.type==="pdf"?`
              <div class="pdf-thumb-admin">
                <h5>PDF preview image</h5>
                <div class="pdf-thumb-actions">
                  <button class="primary" data-pdf-thumb-generate="${esc(owner)}:${i}" type="button">
                    ${m.thumbnail_url?"Regenerate automatically":"Generate preview automatically"}
                  </button>
                </div>
                <span class="helper">A fresh high-resolution first-page preview is generated automatically whenever you upload a PDF.</span>
                <label class="media-mini-label">Manual preview image (optional)
                  <input type="file" data-pdf-thumb-file accept="image/jpeg,image/png,image/webp">
                </label>
                <div class="pdf-thumb-actions">
                  <button class="secondary" data-pdf-thumb-upload="${esc(owner)}:${i}" type="button">
                    ${m.thumbnail_url?"Replace manually":"Upload manually"}
                  </button>
                </div>
                <span class="helper">Use a manual JPG/PNG/WebP only if you want to replace the automatic page-1 preview.</span>
              </div>
              <div class="image-settings-admin media-display-admin">
                <h5>Media display</h5>
                <div class="image-settings-grid">
                  <label>Media fit mode<select data-media-field="fitMode">
                    <option value="exact" ${m.fitMode==="exact"?"selected":""}>Exact size</option>
                    <option value="center" ${m.fitMode==="center"?"selected":""}>Center fit</option>
                    <option value="fill" ${m.fitMode==="fill"?"selected":""}>Fill / crop</option>
                    <option value="legacy" ${(m.fitMode||"legacy")==="legacy"?"selected":""}>Current style</option>
                  </select></label>
                  <label>Display size<select data-media-field="displaySize">
                    <option value="very-small" ${m.displaySize==="very-small"?"selected":""}>Very small</option>
                    <option value="small" ${m.displaySize==="small"?"selected":""}>Small</option>
                    <option value="standard" ${(m.displaySize||"standard")==="standard"?"selected":""}>Standard</option>
                    <option value="medium" ${m.displaySize==="medium"?"selected":""}>Medium</option>
                    <option value="large" ${m.displaySize==="large"?"selected":""}>Large</option>
                    <option value="full" ${m.displaySize==="full"?"selected":""}>Full width</option>
                    <option value="original" ${m.displaySize==="original"?"selected":""}>Original size</option>
                  </select></label>
                  <label>Click to enlarge<select data-media-field="enlarge">
                    <option value="on" ${(m.enlarge||"on")==="on"?"selected":""}>Always</option>
                    <option value="inherit" ${m.enlarge==="inherit"?"selected":""}>Use site setting</option>
                    <option value="off" ${m.enlarge==="off"?"selected":""}>Never</option>
                  </select></label>
                  <label>Caption alignment<select data-media-field="captionAlign">
                    <option value="left" ${(m.captionAlign||"left")==="left"?"selected":""}>Left</option>
                    <option value="center" ${m.captionAlign==="center"?"selected":""}>Center</option>
                    <option value="right" ${m.captionAlign==="right"?"selected":""}>Right</option>
                  </select></label>
                </div>
                <span class="helper">Display size controls how large the media appears. Standard matches normal attachment cards; Medium and Large make it more prominent. Exact size removes blank framing; Center fit keeps the whole preview visible.</span>
              </div>`:""}
          </div>
          <button class="danger" data-media-remove="${esc(owner)}:${i}" type="button">Remove</button>
        </div>`).join(""):`<div class="empty-state">No media added yet.</div>`}
    </div>

    <div class="media-add-grid">
      <label class="media-mini-label">Upload image, PDF or video
        <input type="file" data-media-file accept="image/jpeg,image/png,image/webp,application/pdf,video/mp4,video/webm">
      </label>
      <button class="secondary" data-media-upload="${esc(owner)}" type="button">Upload file</button>
    </div>
    <div class="media-upload-preview hidden" data-media-upload-preview aria-live="polite"></div>

    <div class="media-link-grid">
      <label class="media-mini-label">Type
        <select data-media-link-type>
          <option value="link">Link</option>
          <option value="video">Video link</option>
          <option value="pdf">PDF link</option>
          <option value="image">Image link</option>
        </select>
      </label>
      <label class="media-mini-label">URL
        <input data-media-link-url placeholder="https://...">
      </label>
      <label class="media-mini-label">Title
        <input data-media-link-title placeholder="Optional title">
      </label>
      <button class="secondary" data-media-add-link="${esc(owner)}" type="button">Add link</button>
    </div>
    <div class="media-help">Maximum uploaded file size: 100 MB. For long videos, YouTube/Vimeo links are usually better.</div>
  </div>`;
}

function renderCvState(){
  const cv=currentContent.cv||{};
  $("currentCvName").textContent=cv.filename||(cv.url?"External CV link":"No CV uploaded yet.");
  $("currentCvDate").textContent=cv.updated_at?`Updated ${new Date(cv.updated_at).toLocaleString()}`:"";
  if(cv.url){
    $("currentCvLink").href=cv.url;
    $("currentCvLink").classList.remove("hidden");
    $("removeCvBtn").classList.remove("hidden");
  }else{
    $("currentCvLink").classList.add("hidden");
    $("removeCvBtn").classList.add("hidden");
  }
}

$("addPublicationBtn").addEventListener("click",()=>{
  syncAllForms();
  currentContent.publications.push({title:"",authors:"",authorNote:"",venue:"",year:"",status:"",doi:"",url:"",description:"",visible:true,media:[]});
  renderPublicationsEditor();
  const row=document.querySelector(`#publicationsEditor [data-publication="${currentContent.publications.length-1}"]`);if(row)setRepeatRowCollapsed(row,false);
});
$("addProjectBtn").addEventListener("click",()=>{
  syncAllForms();currentContent.projects.push({title:"",type:"",contribution:"",description:"",meta:"",url:"",visible:true,media:[]});renderProjectsEditor();const row=document.querySelector(`#projectsEditor [data-project="${currentContent.projects.length-1}"]`);if(row)setRepeatRowCollapsed(row,false);
});
$("addActivityBtn").addEventListener("click",()=>{
  syncAllForms();
  const category=ACTIVITY_ADMIN_CATEGORIES.includes(activityAdminActiveCategory)?activityAdminActiveCategory:ACTIVITY_ADMIN_CATEGORIES[0];
  currentContent.academicActivities.push({category,activityType:"",cardDesign:"",topics:[],title:"",organization:"",date:"",description:"",url:"",visible:true,media:[]});
  activityAdminExpandIndexAfterRender=currentContent.academicActivities.length-1;
  renderActivitiesEditor();
  setActivityAdminCategory(category);
});
$("addSkillGroupBtn").addEventListener("click",()=>{
  syncAllForms();currentContent.skills.push({category:"",items:[],subgroups:[],visible:true,media:[]});renderSkillsEditor();const row=document.querySelector(`#skillsEditor [data-skill="${currentContent.skills.length-1}"]`);if(row)setRepeatRowCollapsed(row,false);
});
$("addEducationBtn").addEventListener("click",()=>{
  syncAllForms();currentContent.education.push({period:"",degree:"",institution:"",cgpa:"",cgpaSubtitle:"",description:"",courses:[],visible:true,media:[]});renderEducationEditor();const row=document.querySelector(`#educationEditor [data-education="${currentContent.education.length-1}"]`);if(row)setRepeatRowCollapsed(row,false);
});

document.addEventListener("change",e=>{
  const categorySelect=e.target.closest?.('[data-activity] [data-k="category"]');
  if(categorySelect){
    const row=categorySelect.closest('[data-activity]');
    refreshActivityCardStyleDefaultLabel(row);
    updateActivityAdminRowSummary(row);
    renderActivityCategoryTabs();
    setActivityAdminCategory(categorySelect.value);
  }
});

$("activitySearchInput")?.addEventListener("input",applyActivityAdminFilters);
$("expandActivitiesBtn")?.addEventListener("click",()=>{
  document.querySelectorAll('#activitiesEditor [data-activity]:not(.activity-admin-filtered-out)').forEach(row=>setActivityRowCollapsed(row,false));
});
$("collapseActivitiesBtn")?.addEventListener("click",()=>{
  document.querySelectorAll('#activitiesEditor [data-activity]:not(.activity-admin-filtered-out)').forEach(row=>setActivityRowCollapsed(row,true));
});

document.addEventListener("input",e=>{
  const row=e.target.closest?.('#activitiesEditor [data-activity]');
  if(!row)return;
  if(e.target.matches?.('[data-k="title"],[data-k="activityType"],[data-k="organization"],[data-k="date"],[data-k="topics"],[data-k="cardDesign"]')){
    updateActivityAdminRowSummary(row);
    if($("activitySearchInput")?.value)applyActivityAdminFilters();
  }
});

document.addEventListener("click",e=>{
  const tab=e.target.closest?.("[data-activity-admin-category]");
  if(tab){setActivityAdminCategory(tab.dataset.activityAdminCategory);return}
  const toggle=e.target.closest?.("[data-activity-toggle]");
  if(toggle){
    const row=toggle.closest('[data-activity]');
    setActivityRowCollapsed(row,!row.classList.contains("activity-collapsed"));
    return;
  }
});

document.addEventListener("dragstart",e=>{
  const handle=e.target.closest?.("[data-activity-drag-handle]");
  if(!handle)return;
  const row=handle.closest('[data-activity]');
  if(!row)return;
  activityDragState={sourceIndex:Number(row.dataset.activity),category:normalizeActivityCategory(row.dataset.activityCategory)};
  row.classList.add("activity-dragging");
  if(e.dataTransfer){e.dataTransfer.effectAllowed="move";e.dataTransfer.setData("text/plain",String(row.dataset.activity))}
});

document.addEventListener("dragover",e=>{
  if(!activityDragState)return;
  const row=e.target.closest?.('#activitiesEditor [data-activity]');
  if(!row||normalizeActivityCategory(row.dataset.activityCategory)!==activityDragState.category)return;
  e.preventDefault();
  document.querySelectorAll('#activitiesEditor .activity-drag-over-before,#activitiesEditor .activity-drag-over-after').forEach(el=>el.classList.remove("activity-drag-over-before","activity-drag-over-after"));
  const rect=row.getBoundingClientRect();
  row.classList.add(e.clientY>rect.top+rect.height/2?"activity-drag-over-after":"activity-drag-over-before");
});

document.addEventListener("drop",e=>{
  if(!activityDragState)return;
  const row=e.target.closest?.('#activitiesEditor [data-activity]');
  if(!row||normalizeActivityCategory(row.dataset.activityCategory)!==activityDragState.category)return;
  e.preventDefault();
  const after=row.classList.contains("activity-drag-over-after");
  const sourceIndex=activityDragState.sourceIndex;
  const targetIndex=Number(row.dataset.activity);
  capturePreMutation();
  document.querySelectorAll('#activitiesEditor .activity-dragging,#activitiesEditor .activity-drag-over-before,#activitiesEditor .activity-drag-over-after').forEach(el=>el.classList.remove("activity-dragging","activity-drag-over-before","activity-drag-over-after"));
  activityDragState=null;
  reorderActivityWithinCategory(sourceIndex,targetIndex,after);
});

document.addEventListener("dragend",()=>{
  document.querySelectorAll('#activitiesEditor .activity-dragging,#activitiesEditor .activity-drag-over-before,#activitiesEditor .activity-drag-over-after').forEach(el=>el.classList.remove("activity-dragging","activity-drag-over-before","activity-drag-over-after"));
  activityDragState=null;
});

document.addEventListener("change",e=>{
  const input=e.target.closest?.("[data-media-file]");
  if(input)previewSelectedMediaFile(input);
});

document.addEventListener("click",async e=>{
  let b=e.target.closest("[data-repeat-toggle]");
  if(b){
    const row=b.closest(".repeat-collapsible");
    if(row)setRepeatRowCollapsed(row,!row.classList.contains("repeat-collapsed"));
    return;
  }

  b=e.target.closest("[data-expand-collection]");
  if(b){collectionRows(b.dataset.expandCollection).forEach(row=>setRepeatRowCollapsed(row,false));return}

  b=e.target.closest("[data-collapse-collection]");
  if(b){collectionRows(b.dataset.collapseCollection).forEach(row=>setRepeatRowCollapsed(row,true));return}

  b=e.target.closest("[data-add-skill-subgroup]");
  if(b){
    syncAllForms();
    const i=Number(b.dataset.addSkillSubgroup);
    currentContent.skills[i]=normalizeSkillGroupRecord(currentContent.skills[i]||{});
    currentContent.skills[i].subgroups.push({name:"",items:[]});
    renderSkillsEditor();
    const row=document.querySelector(`#skillsEditor [data-skill="${i}"]`);
    if(row)setRepeatRowCollapsed(row,false);
    return;
  }

  b=e.target.closest("[data-move-skill-subgroup]");
  if(b){
    syncAllForms();
    const [gi,si,delta]=b.dataset.moveSkillSubgroup.split(":").map(Number);
    const group=currentContent.skills[gi];
    if(group&&Array.isArray(group.subgroups)){
      const j=si+delta;
      if(j>=0&&j<group.subgroups.length){[group.subgroups[si],group.subgroups[j]]=[group.subgroups[j],group.subgroups[si]]}
    }
    renderSkillsEditor();
    const row=document.querySelector(`#skillsEditor [data-skill="${gi}"]`);
    if(row)setRepeatRowCollapsed(row,false);
    return;
  }

  b=e.target.closest("[data-remove-skill-subgroup]");
  if(b){
    syncAllForms();
    const [gi,si]=b.dataset.removeSkillSubgroup.split(":").map(Number);
    const group=currentContent.skills[gi];
    if(group&&Array.isArray(group.subgroups))group.subgroups.splice(si,1);
    renderSkillsEditor();
    const row=document.querySelector(`#skillsEditor [data-skill="${gi}"]`);
    if(row)setRepeatRowCollapsed(row,false);
    return;
  }

  b=e.target.closest("[data-move-item]");
  if(b){
    const[type,idxs,deltas]=b.dataset.moveItem.split(":");
    moveRepeaterItem(type,Number(idxs),Number(deltas));
    return;
  }

  b=e.target.closest("[data-remove]");
  if(b){
    syncAllForms();
    const[type,idxs]=b.dataset.remove.split(":");const i=Number(idxs);
    const map={publication:"publications",project:"projects",activity:"academicActivities",skill:"skills",education:"education"};
    currentContent[map[type]].splice(i,1);
    if(type==="publication")renderPublicationsEditor();
    if(type==="project")renderProjectsEditor();
    if(type==="activity")renderActivitiesEditor();
    if(type==="skill")renderSkillsEditor();
    if(type==="education")renderEducationEditor();
    return;
  }

  b=e.target.closest("[data-media-upload]");
  if(b){await uploadMedia(b.dataset.mediaUpload,b.closest(".media-editor"));return}

  b=e.target.closest("[data-media-add-link]");
  if(b){await addMediaLink(b.dataset.mediaAddLink,b.closest(".media-editor"));return}

  b=e.target.closest("[data-media-replace]");
  if(b){await replaceMediaFile(b.dataset.mediaReplace,b.closest(".media-admin-item"));return}

  b=e.target.closest("[data-media-move]");
  if(b){
    const [owner,idxs,deltas]=b.dataset.mediaMove.split("|");
    moveMediaItem(owner,Number(idxs),Number(deltas));
    return;
  }

  b=e.target.closest("[data-pdf-thumb-generate]");
  if(b){await generateExistingPdfThumbnail(b.dataset.pdfThumbGenerate);return}

  b=e.target.closest("[data-pdf-thumb-upload]");
  if(b){await uploadPdfThumbnail(b.dataset.pdfThumbUpload,b.closest(".media-admin-item"));return}

  b=e.target.closest("[data-video-thumb-generate]");
  if(b){await generateExistingVideoThumbnail(b.dataset.videoThumbGenerate);return}

  b=e.target.closest("[data-video-thumb-upload]");
  if(b){await uploadVideoThumbnail(b.dataset.videoThumbUpload,b.closest(".media-admin-item"));return}

  b=e.target.closest("[data-media-remove]");
  if(b){await removeMedia(b.dataset.mediaRemove);return}
});

function syncAllForms(){
  readMediaMetadata();
  syncSiteCustomizationFromControls();
  currentContent.name=$("fName").value.trim();
  currentContent.title=$("fTitle").value.trim();
  currentContent.institution=$("fInstitution").value.trim();
  currentContent.location=$("fLocation").value.trim();
  currentContent.focus=$("fFocus").value.trim();
  currentContent.defaultTheme=selectedAdminTheme();
  normalizeCustomTheme(currentContent);
  currentContent.appearance.customTheme=readCustomThemeControls();
  normalizeTypography(currentContent);
  currentContent.appearance.typography={
    sectionTitleSize:clampNumber($("fSectionTitleSizeNumber").value||$("fSectionTitleSize").value,30,60,44),
    sectionTitleColor:$("useThemeSectionTitleColor").checked?"":($("fSectionTitleColorText").value.trim()||$("fSectionTitleColor").value),
    sectionSubtitleSize:clampNumber($("fSectionSubtitleSizeNumber").value||$("fSectionSubtitleSize").value,16,34,25),
    sectionSubtitleColor:$("useThemeSectionSubtitleColor").checked?"":($("fSectionSubtitleColorText").value.trim()||$("fSectionSubtitleColor").value)
  };
  if(currentContent.appearance.typography.sectionTitleColor&&!validHex(currentContent.appearance.typography.sectionTitleColor))currentContent.appearance.typography.sectionTitleColor="";
  if(currentContent.appearance.typography.sectionSubtitleColor&&!validHex(currentContent.appearance.typography.sectionSubtitleColor))currentContent.appearance.typography.sectionSubtitleColor="";

  currentContent.sectionHeadings={
    about:{title:$("fSectionAboutTitle").value.trim(),subtitle:$("fAboutHeadline").value.trim()},
    research:{title:$("fSectionResearchTitle").value.trim(),subtitle:$("fSectionResearchSubtitle").value.trim()},
    thesis:{title:$("fSectionThesisTitle").value.trim(),subtitle:$("fSectionThesisSubtitle").value.trim()},
    publications:{title:$("fSectionPublicationsTitle").value.trim(),subtitle:$("fSectionPublicationsSubtitle").value.trim()},
    projects:{title:$("fSectionProjectsTitle").value.trim(),subtitle:$("fSectionProjectsSubtitle").value.trim()},
    activities:{title:$("fSectionActivitiesTitle").value.trim(),subtitle:$("fSectionActivitiesSubtitle").value.trim()},
    skills:{title:$("fSectionSkillsTitle").value.trim(),subtitle:$("fSectionSkillsSubtitle").value.trim()},
    education:{title:$("fSectionEducationTitle").value.trim(),subtitle:$("fSectionEducationSubtitle").value.trim()},
    contact:{title:$("fSectionContactTitle").value.trim(),subtitle:$("fContactHeadline").value.trim()},
    cv:{title:$("fSectionCvTitle").value.trim(),subtitle:$("fSectionCvSubtitle").value.trim()}
  };

  /* Keep the old fields synchronized for backwards compatibility. */
  currentContent.aboutHeadline=currentContent.sectionHeadings.about.subtitle;
  currentContent.aboutLead=$("fAboutLead").value.trim();
  currentContent.aboutBio=$("fAboutBio").value.trim();
  const primaryResearchInterests=$("fPrimaryInterests").value.split("\n").map(x=>x.trim()).filter(Boolean);
  const additionalResearchInterests=$("fAdditionalInterests").value.split("\n").map(x=>x.trim()).filter(Boolean);
  currentContent.researchInterestGroups={
    primary:primaryResearchInterests,
    additional:additionalResearchInterests
  };
  /* Keep the old flat field synchronized for backwards compatibility. */
  currentContent.researchInterests=[...primaryResearchInterests,...additionalResearchInterests];

  delete currentContent.featuredResearch;
  const thesisMedia=currentContent.thesis?.media||[];
  currentContent.thesis={
    title:$("fThesisTitle").value.trim(),
    description:$("fThesisDescription").value.trim(),
    supervisor:$("fThesisSupervisor").value.trim(),
    coSupervisor:$("fThesisCoSupervisor").value.trim(),
    degree:$("fThesisDegree").value.trim(),
    institution:$("fThesisInstitution").value.trim(),
    period:$("fThesisPeriod").value.trim(),
    status:$("fThesisStatus").value.trim(),
    keywords:$("fThesisKeywords").value.split(",").map(x=>x.trim()).filter(Boolean),
    media:thesisMedia
  };

  readRepeaters();

  const contactMedia=currentContent.contact?.media||[];
  currentContent.contact={
    headline:currentContent.sectionHeadings.contact.subtitle,
    message:$("fContactMessage").value.trim(),
    email:$("fEmail").value.trim(),
    phone:$("fPhone").value.trim(),
    location:$("fContactLocation").value.trim(),
    media:contactMedia
  };
  currentContent.links={
    linkedin:$("fLinkedIn").value.trim(),
    github:$("fGitHub").value.trim(),
    orcid:$("fOrcid").value.trim(),
    scholar:$("fScholar").value.trim(),
    researchgate:$("fResearchGate").value.trim(),
    scopus:$("fScopus").value.trim(),
    wos:$("fWos").value.trim(),
    website:$("fWebsite").value.trim()
  };
  normalizeMedia(currentContent);
}

function readRepeaters(){
  currentContent.publications=[...document.querySelectorAll("[data-publication]")].map((r,i)=>{
    const old=currentContent.publications[i]||{};
    return {title:get(r,"title"),authors:get(r,"authors"),authorNote:get(r,"authorNote"),venue:get(r,"venue"),year:get(r,"year"),status:get(r,"status"),doi:get(r,"doi"),url:get(r,"url"),description:get(r,"description"),visible:r.querySelector("[data-item-visible]")?.checked!==false,media:old.media||[]};
  }).filter(x=>x.title||x.venue||x.media.length);

  currentContent.projects=[...document.querySelectorAll("[data-project]")].map((r,i)=>{
    const old=currentContent.projects[i]||{};
    return {title:get(r,"title"),type:get(r,"type"),contribution:get(r,"contribution"),description:get(r,"description"),meta:get(r,"meta"),url:get(r,"url"),visible:r.querySelector("[data-item-visible]")?.checked!==false,media:old.media||[]};
  }).filter(x=>x.title||x.contribution||x.description||x.media.length);

  currentContent.academicActivities=[...document.querySelectorAll("[data-activity]")].map((r,i)=>{
    const old=currentContent.academicActivities[i]||{};
    return {category:normalizeActivityCategory(get(r,"category")),activityType:get(r,"activityType"),cardDesign:normalizeActivityCardDesign(get(r,"cardDesign")),topics:get(r,"topics").split(",").map(x=>x.trim()).filter(Boolean),title:get(r,"title"),organization:get(r,"organization"),date:get(r,"date"),description:get(r,"description"),url:get(r,"url"),visible:r.querySelector("[data-item-visible]")?.checked!==false,media:old.media||[]};
  }).filter(x=>x.title||x.description||x.organization||x.date||x.topics.length||x.media.length);

  currentContent.skills=[...document.querySelectorAll("[data-skill]")].map((r,i)=>{
    const old=currentContent.skills[i]||{};
    const subgroups=[...r.querySelectorAll("[data-skill-subgroup]")].map(sr=>({
      name:(sr.querySelector("[data-skill-subgroup-name]")?.value||"").trim(),
      items:(sr.querySelector("[data-skill-subgroup-items]")?.value||"").split("\n").map(x=>x.trim()).filter(Boolean)
    })).filter(sg=>sg.name||sg.items.length);
    return {category:get(r,"category"),items:get(r,"items").split("\n").map(x=>x.trim()).filter(Boolean),subgroups,visible:r.querySelector("[data-item-visible]")?.checked!==false,media:old.media||[]};
  }).filter(x=>x.category||x.items.length||x.subgroups.length||x.media.length);

  currentContent.education=[...document.querySelectorAll("[data-education]")].map((r,i)=>{
    const old=currentContent.education[i]||{};
    return {period:get(r,"period"),degree:get(r,"degree"),institution:get(r,"institution"),cgpa:get(r,"cgpa"),cgpaSubtitle:get(r,"cgpaSubtitle"),description:get(r,"description"),courses:get(r,"courses").split("\n").map(x=>x.trim()).filter(Boolean),visible:r.querySelector("[data-item-visible]")?.checked!==false,media:old.media||[]};
  }).filter(x=>x.period||x.degree||x.institution||x.cgpa||x.cgpaSubtitle||x.description||x.courses.length||x.media.length);
}
function get(r,k){return(r.querySelector(`[data-k="${k}"]`)?.value||"").trim()}

function readMediaMetadata(){
  document.querySelectorAll(".media-editor").forEach(editor=>{
    const owner=editor.dataset.mediaOwner;
    const media=getOwnerMedia(owner);
    if(!media)return;
    editor.querySelectorAll(".media-admin-item").forEach((row,i)=>{
      if(!media[i])return;
      media[i].title=(row.querySelector('[data-media-field="title"]')?.value||"").trim();
      media[i].caption=(row.querySelector('[data-media-field="caption"]')?.value||"").trim();
      media[i].captionAlign=row.querySelector('[data-media-field="captionAlign"]')?.value||"left";
      if(media[i].type==="image"){
        media[i].alt=(row.querySelector('[data-media-field="alt"]')?.value||"").trim();
        media[i].aspect=row.querySelector('[data-media-field="aspect"]')?.value||"original";
        media[i].fitMode=row.querySelector('[data-media-field="fitMode"]')?.value||"legacy";
        media[i].fit=row.querySelector('[data-media-field="fit"]')?.value||"cover";
        media[i].position=row.querySelector('[data-media-field="position"]')?.value||"center";
        media[i].displaySize=row.querySelector('[data-media-field="displaySize"]')?.value||"standard";
        media[i].enlarge=row.querySelector('[data-media-field="enlarge"]')?.value||"inherit";
      }else if(media[i].type==="pdf"){
        media[i].fitMode=row.querySelector('[data-media-field="fitMode"]')?.value||"legacy";
        media[i].displaySize=row.querySelector('[data-media-field="displaySize"]')?.value||"standard";
        media[i].enlarge=row.querySelector('[data-media-field="enlarge"]')?.value||"on";
      }else if(media[i].type==="video"){
        media[i].displaySize=row.querySelector('[data-media-field="displaySize"]')?.value||"standard";
        media[i].enlarge=row.querySelector('[data-media-field="enlarge"]')?.value||"on";
      }
    });
  });
}

function getOwnerMedia(owner){
  if(owner==="profile")return currentContent.sectionMedia.profile;
  if(owner==="thesis"){
    normalizeThesis(currentContent);
    currentContent.thesis.media=currentContent.thesis.media||[];
    return currentContent.thesis.media;
  }
  if(owner==="contact")return currentContent.contact.media;
  const[type,idxs]=owner.split(":");const i=Number(idxs);
  const map={publication:"publications",project:"projects",activity:"academicActivities",skill:"skills",education:"education"};
  const arr=currentContent[map[type]];
  return arr?.[i]?.media;
}
function renderMediaOwner(owner){
  if(owner==="profile"){
    $("profileMediaEditor").innerHTML=mediaEditor("profile",currentContent.sectionMedia?.profile||[],"Profile / About media");
    return;
  }
  if(owner==="thesis"){
    $("thesisMediaEditor").innerHTML=mediaEditor("thesis",currentContent.thesis?.media||[],"Thesis media & attachments");
    return;
  }
  if(owner==="contact"){
    $("contactMediaEditor").innerHTML=mediaEditor("contact",currentContent.contact?.media||[],"Contact media");
    return;
  }
  const type=owner.split(":")[0];
  if(type==="publication")renderPublicationsEditor();
  else if(type==="project")renderProjectsEditor();
  else if(type==="activity")renderActivitiesEditor();
  else if(type==="skill")renderSkillsEditor();
  else if(type==="education")renderEducationEditor();
}

function moveMediaItem(owner,index,delta){
  if(!delta)return;
  /* Preserve unsaved form + media edits before re-rendering the owner. */
  syncAllForms();
  const media=getOwnerMedia(owner);
  if(!media||!media[index])return;
  const next=index+delta;
  if(next<0||next>=media.length)return;
  const [item]=media.splice(index,1);
  media.splice(next,0,item);
  renderMediaOwner(owner);
}

function ownerFolder(owner){
  if(owner==="profile")return "profile";
  if(owner==="thesis")return "thesis";
  if(owner==="contact")return "contact";
  const type=owner.split(":")[0];
  return {publication:"publications",project:"projects",activity:"activities",skill:"skills",education:"education"}[type]||"misc";
}
function fileType(file){
  if(["image/jpeg","image/png","image/webp"].includes(file.type))return"image";
  if(file.type==="application/pdf"||file.name.toLowerCase().endsWith(".pdf"))return"pdf";
  if(["video/mp4","video/webm"].includes(file.type))return"video";
  return"";
}
function safeFileName(name){
  return name.normalize("NFKD").replace(/[^\w.\-]+/g,"-").replace(/-+/g,"-").replace(/^-|-$/g,"").slice(-100)||"file";
}
function uid(){return`${Date.now()}-${Math.random().toString(36).slice(2,9)}`}

function formatMediaFileSize(bytes){
  const n=Number(bytes)||0;
  if(n<1024)return`${n} B`;
  if(n<1024*1024)return`${(n/1024).toFixed(n<10*1024?1:0)} KB`;
  return`${(n/(1024*1024)).toFixed(n<10*1024*1024?1:0)} MB`;
}

function clearPendingMediaPreview(editor){
  const box=editor?.querySelector("[data-media-upload-preview]");
  if(!box)return;
  if(box.dataset.objectUrl){
    try{URL.revokeObjectURL(box.dataset.objectUrl)}catch{}
    delete box.dataset.objectUrl;
  }
  if(box.dataset.previewObjectUrl){
    try{URL.revokeObjectURL(box.dataset.previewObjectUrl)}catch{}
    delete box.dataset.previewObjectUrl;
  }
  box.innerHTML="";
  box.classList.add("hidden");
}

const pendingPdfPreviewBlobs=new WeakMap();
const pendingVideoPreviewBlobs=new WeakMap();

async function previewSelectedMediaFile(input){
  const editor=input?.closest(".media-editor");
  const box=editor?.querySelector("[data-media-upload-preview]");
  if(!editor||!box)return;
  clearPendingMediaPreview(editor);

  const file=input.files?.[0];
  if(!file)return;
  const type=fileType(file);
  if(!type){
    box.classList.remove("hidden");
    box.innerHTML=`<div class="media-pending-message">This file type cannot be previewed.</div>`;
    return;
  }

  box.classList.remove("hidden");
  box.innerHTML=`<div class="media-pending-message">Preparing preview for <strong>${esc(file.name)}</strong>…</div>`;

  try{
    if(type==="image"){
      const objectUrl=URL.createObjectURL(file);
      box.dataset.objectUrl=objectUrl;
      box.innerHTML=`<div class="media-pending-head"><strong>Selected image</strong><span>${esc(file.name)} · ${formatMediaFileSize(file.size)}</span></div>
        <img class="media-pending-image" src="${esc(objectUrl)}" alt="Selected image preview">`;
      return;
    }
    if(type==="video"){
      const objectUrl=URL.createObjectURL(file);
      box.dataset.objectUrl=objectUrl;
      let posterUrl="";
      try{
        const blob=await createVideoPreviewBlob(objectUrl);
        pendingVideoPreviewBlobs.set(input,blob);
        posterUrl=URL.createObjectURL(blob);
        box.dataset.previewObjectUrl=posterUrl;
      }catch(err){
        pendingVideoPreviewBlobs.delete(input);
        console.warn("Selected video thumbnail generation failed:",err);
      }
      box.innerHTML=`<div class="media-pending-head"><strong>Selected video${posterUrl?" · automatic preview":""}</strong><span>${esc(file.name)} · ${formatMediaFileSize(file.size)}</span></div>
        <video class="media-pending-video" controls preload="metadata" ${posterUrl?`poster="${esc(posterUrl)}"`:""} src="${esc(objectUrl)}"></video>`;
      return;
    }
    if(type==="pdf"){
      const blob=await createPdfPreviewBlob(await file.arrayBuffer());
      pendingPdfPreviewBlobs.set(input,blob);
      const objectUrl=URL.createObjectURL(blob);
      box.dataset.objectUrl=objectUrl;
      box.innerHTML=`<div class="media-pending-head"><strong>Selected PDF · page 1</strong><span>${esc(file.name)} · ${formatMediaFileSize(file.size)}</span></div>
        <img class="media-pending-pdf" src="${esc(objectUrl)}" alt="Selected PDF first-page preview">`;
    }
  }catch(err){
    if(type==="pdf")pendingPdfPreviewBlobs.delete(input);
    if(type==="video")pendingVideoPreviewBlobs.delete(input);
    console.warn("Selected media preview failed:",err);
    box.innerHTML=`<div class="media-pending-message">${esc(file.name)} is selected. Preview could not be generated, but you can still upload it.</div>`;
  }
}

async function uploadMedia(owner,editor){
  syncAllForms();
  const input=editor.querySelector("[data-media-file]");
  const file=input?.files?.[0];
  if(!file)return setStatus("Choose a file first.");
  if(file.size>100*1024*1024)return setStatus("File is larger than 100 MB.");
  const type=fileType(file);
  if(!type)return setStatus("Allowed uploads: JPG, PNG, WebP, PDF, MP4 or WebM.");

  setStatus(`Uploading ${file.name}...`);
  const path=`${ownerFolder(owner)}/${uid()}-${safeFileName(file.name)}`;
  const{error}=await sb.storage.from("site-media").upload(path,file,{
    upsert:false,
    contentType:file.type||undefined,
    cacheControl:"3600"
  });
  if(error)return setStatus("Media upload failed: "+error.message);

  const{data}=sb.storage.from("site-media").getPublicUrl(path);
  const media=getOwnerMedia(owner);
  const item={
    id:uid(),
    type,
    url:data.publicUrl,
    filename:file.name,
    path,
    title:file.name.replace(/\.[^.]+$/,""),
    caption:"",
    captionAlign:"left",
      ...(type==="image"?{alt:"",aspect:"original",fitMode:"exact",fit:"cover",position:"center",displaySize:"standard",width:"auto",enlarge:"on"}:type==="pdf"?{fitMode:"exact",displaySize:"standard",width:"auto",enlarge:"on"}:type==="video"?{displaySize:"standard",enlarge:"on"}:{}),
    uploaded_at:new Date().toISOString()
  };
  media.push(item);

  if(type==="pdf"){
    setStatus("PDF uploaded. Generating a fresh high-resolution page-1 preview...");
    try{
      const blob=pendingPdfPreviewBlobs.get(input)||await createPdfPreviewBlob(await file.arrayBuffer());
      await saveGeneratedPdfPreview(owner,item,blob);
    }catch(err){
      console.warn("Automatic PDF preview failed:",err);
      setStatus("PDF uploaded. Automatic preview failed; you can regenerate it from the PDF preview controls.");
    }finally{
      pendingPdfPreviewBlobs.delete(input);
    }
  }

  if(type==="video"){
    setStatus("Video uploaded. Generating a fresh preview frame...");
    try{
      let blob=pendingVideoPreviewBlobs.get(input);
      if(!blob){const objectUrl=URL.createObjectURL(file);try{blob=await createVideoPreviewBlob(objectUrl)}finally{URL.revokeObjectURL(objectUrl)}}
      await saveGeneratedVideoPreview(owner,item,blob);
    }catch(err){
      console.warn("Automatic video preview failed:",err);
      setStatus("Video uploaded. Automatic preview failed; you can regenerate it from the Video preview image controls.");
    }finally{pendingVideoPreviewBlobs.delete(input)}
  }

  await persistContent(type==="pdf" && item.thumbnail_url
    ? "PDF uploaded with fresh high-resolution preview."
    : type==="video" && item.thumbnail_url
      ? "Video uploaded with fresh automatic preview frame."
      : "Media uploaded.");
  clearPendingMediaPreview(editor);
  input.value="";
  fillForms();
}


function parseMediaSpec(spec){
  const parts=String(spec||"").split(":");
  if(["profile","research","thesis","contact"].includes(parts[0])){
    return{owner:parts[0],index:Number(parts[1])};
  }
  return{owner:`${parts[0]}:${parts[1]}`,index:Number(parts[2])};
}

function mediaDefaultsForType(type,oldItem={}){
  const common={
    id:oldItem.id||uid(),
    title:String(oldItem.title||""),
    caption:String(oldItem.caption||""),
    captionAlign:["left","center","right"].includes(oldItem.captionAlign)?oldItem.captionAlign:"left",
    displaySize:["very-small","small","standard","medium","large","full","original"].includes(oldItem.displaySize)?oldItem.displaySize:"standard",
    enlarge:["inherit","on","off"].includes(oldItem.enlarge)?oldItem.enlarge:"on"
  };
  if(type==="image"){
    return{...common,
      alt:String(oldItem.alt||""),
      aspect:["original","square","4x3","16x9"].includes(oldItem.aspect)?oldItem.aspect:"original",
      fitMode:["exact","center","fill","legacy"].includes(oldItem.fitMode)?oldItem.fitMode:"exact",
      fit:["cover","contain"].includes(oldItem.fit)?oldItem.fit:"cover",
      position:["center","top","bottom","left","right"].includes(oldItem.position)?oldItem.position:"center",
      width:["auto","full","half","third"].includes(oldItem.width)?oldItem.width:"auto"
    };
  }
  if(type==="pdf"){
    return{...common,
      fitMode:["exact","center","fill","legacy"].includes(oldItem.fitMode)?oldItem.fitMode:"exact",
      width:["auto","full","half","third"].includes(oldItem.width)?oldItem.width:"auto",
      enlarge:["inherit","on","off"].includes(oldItem.enlarge)?oldItem.enlarge:"on"
    };
  }
  if(type==="video"){
    return{...common,enlarge:["inherit","on","off"].includes(oldItem.enlarge)?oldItem.enlarge:"on"};
  }
  return common;
}

async function replaceMediaFile(spec,row){
  syncAllForms();
  const{owner,index}=parseMediaSpec(spec);
  const media=getOwnerMedia(owner);
  const oldItem=media?.[index];
  if(!oldItem)return setStatus("Media attachment not found.");

  const input=row?.querySelector("[data-media-replace-file]");
  const file=input?.files?.[0];
  if(!file)return setStatus("Choose a replacement file first.");
  if(file.size>50*1024*1024)return setStatus("Replacement file is larger than 50 MB.");
  const type=fileType(file);
  if(!type)return setStatus("Allowed replacements: JPG, PNG, WebP, PDF, MP4 or WebM.");

  const btn=row?.querySelector("[data-media-replace]");
  if(btn?.disabled)return;
  if(btn){
    btn.disabled=true;
    btn.dataset.oldText=btn.textContent;
    btn.textContent="Replacing...";
  }

  const oldPaths=[oldItem.path,oldItem.thumbnail_path].filter(Boolean);
  try{
    setStatus(`Uploading replacement ${file.name}...`);
    const path=`${ownerFolder(owner)}/${uid()}-${safeFileName(file.name)}`;
    const{error}=await sb.storage.from("site-media").upload(path,file,{
      upsert:false,
      contentType:file.type||undefined,
      cacheControl:"3600"
    });
    if(error)throw new Error(error.message);

    const{data}=sb.storage.from("site-media").getPublicUrl(path);
    const preserved=mediaDefaultsForType(type,oldItem);
    const item={
      ...preserved,
      type,
      url:data.publicUrl,
      filename:file.name,
      path,
      thumbnail_url:"",
      thumbnail_path:"",
      uploaded_at:new Date().toISOString()
    };
    media[index]=item;

    const saved=await persistContent(type==="pdf"
      ?"Media file replaced. Regenerating PDF preview..."
      :type==="video"
        ?"Media file replaced. Regenerating video preview..."
        :"Media file replaced; existing information and display settings were preserved.");
    if(!saved)throw new Error("The replacement uploaded, but its website record could not be saved.");

    if(type==="pdf"){
      try{
        const blob=await withTimeout(createPdfPreviewBlob(await file.arrayBuffer()),20000,"PDF preview generation timed out.");
        await withTimeout(saveGeneratedPdfPreview(owner,item,blob),20000,"PDF preview upload timed out.");
        await persistContent("Media file replaced with a fresh automatic PDF preview.");
      }catch(err){
        console.warn("Replacement PDF preview failed:",err);
        setStatus("PDF replaced successfully. Automatic preview failed; you can regenerate it manually.");
      }
    }else if(type==="video"){
      try{
        const objectUrl=URL.createObjectURL(file);
        let blob;
        try{blob=await withTimeout(createVideoPreviewBlob(objectUrl),20000,"Video preview generation timed out.")}
        finally{URL.revokeObjectURL(objectUrl)}
        await withTimeout(saveGeneratedVideoPreview(owner,item,blob),20000,"Video preview upload timed out.");
        await persistContent("Media file replaced with a fresh automatic video preview.");
      }catch(err){
        console.warn("Replacement video preview failed:",err);
        setStatus("Video replaced successfully. Automatic preview failed; you can regenerate it manually.");
      }
    }

    if(oldPaths.length){
      try{await sb.storage.from("site-media").remove(oldPaths)}catch(err){console.warn("Old media cleanup failed:",err)}
    }
    fillForms();
  }catch(err){
    console.error(err);
    setStatus("Media replacement failed: "+(err?.message||err));
  }finally{
    if(btn){
      btn.disabled=false;
      btn.textContent=btn.dataset.oldText||"Replace file";
      delete btn.dataset.oldText;
    }
  }
}

async function addMediaLink(owner,editor){
  syncAllForms();
  const type=editor.querySelector("[data-media-link-type]").value;
  const url=editor.querySelector("[data-media-link-url]").value.trim();
  const title=editor.querySelector("[data-media-link-title]").value.trim();
  if(!/^https?:\/\//i.test(url))return setStatus("Media URL must start with http:// or https://");

  getOwnerMedia(owner).push({
    id:uid(),type,url,title:title||defaultLinkTitle(type),caption:"",captionAlign:"left",filename:"",path:"",
    ...(type==="image"?{alt:"",aspect:"original",fitMode:"exact",fit:"cover",position:"center",displaySize:"standard",width:"auto",enlarge:"on"}:type==="pdf"?{fitMode:"exact",displaySize:"standard",width:"auto",enlarge:"on"}:type==="video"?{displaySize:"standard",enlarge:"on"}:{}),
    uploaded_at:new Date().toISOString()
  });
  await persistContent("Link added.");
  fillForms();
}
function defaultLinkTitle(type){return{video:"Video",pdf:"PDF",image:"Image",link:"Link"}[type]||"Link"}



async function createVideoPreviewBlob(sourceUrl){
  return await new Promise((resolve,reject)=>{
    const video=document.createElement("video");
    video.muted=true;
    video.playsInline=true;
    video.preload="auto";
    let settled=false;
    const cleanup=()=>{video.onloadedmetadata=null;video.onloadeddata=null;video.onseeked=null;video.onerror=null;try{video.removeAttribute("src");video.load()}catch{}};
    const fail=err=>{if(settled)return;settled=true;cleanup();reject(err instanceof Error?err:new Error("Could not generate video preview."))};
    const capture=()=>{
      try{
        const vw=video.videoWidth||0, vh=video.videoHeight||0;
        if(!vw||!vh)return fail(new Error("Video dimensions are unavailable."));
        const targetWidth=Math.min(vw,1440);
        const scale=targetWidth/vw;
        const canvas=document.createElement("canvas");
        canvas.width=Math.max(2,Math.round(vw*scale));
        canvas.height=Math.max(2,Math.round(vh*scale));
        const ctx=canvas.getContext("2d",{alpha:false});
        ctx.fillStyle="#111";ctx.fillRect(0,0,canvas.width,canvas.height);
        ctx.drawImage(video,0,0,canvas.width,canvas.height);
        canvas.toBlob(blob=>{
          if(!blob)return fail(new Error("Could not create video preview image."));
          if(settled)return;settled=true;cleanup();resolve(blob);
        },"image/jpeg",0.92);
      }catch(err){fail(err)}
    };
    video.onerror=()=>fail(new Error("The video could not be decoded for preview generation."));
    video.onloadedmetadata=()=>{
      const d=Number.isFinite(video.duration)?video.duration:0;
      const target=d>0?Math.min(Math.max(d*0.12,0.4),3):0.5;
      const safeTarget=d>0?Math.min(target,Math.max(d-0.05,0)):target;
      if(safeTarget<=0){if(video.readyState>=2)capture();else video.onloadeddata=capture;return;}
      video.onseeked=capture;
      try{video.currentTime=safeTarget}catch{video.onloadeddata=capture}
    };
    video.src=sourceUrl;
    video.load();
  });
}

async function saveGeneratedVideoPreview(owner,item,blob){
  if(item.thumbnail_path){try{await sb.storage.from("site-media").remove([item.thumbnail_path])}catch{}}
  const path=`${ownerFolder(owner)}/previews/${uid()}-video-preview.jpg`;
  const{error}=await sb.storage.from("site-media").upload(path,blob,{upsert:false,contentType:"image/jpeg",cacheControl:"3600"});
  if(error)throw error;
  const{data}=sb.storage.from("site-media").getPublicUrl(path);
  item.thumbnail_url=data.publicUrl+"?v="+Date.now();
  item.thumbnail_path=path;
}

function videoMediaSpec(spec){
  const parts=spec.split(":");
  if(["profile","research","thesis","contact"].includes(parts[0]))return{owner:parts[0],index:Number(parts[1])};
  return{owner:`${parts[0]}:${parts[1]}`,index:Number(parts[2])};
}

async function generateExistingVideoThumbnail(spec){
  syncAllForms();
  const{owner,index}=videoMediaSpec(spec);
  const item=getOwnerMedia(owner)?.[index];
  if(!item||item.type!=="video")return setStatus("Video attachment not found.");
  if(adminVideoEmbed(item.url))return setStatus("Embedded YouTube/Vimeo videos use their own player preview.");
  setStatus("Generating video preview frame...");
  let objectUrl="";
  try{
    const response=await fetch(item.url,{cache:"no-store"});
    if(!response.ok)throw new Error(`Could not read video (${response.status}).`);
    objectUrl=URL.createObjectURL(await response.blob());
    const blob=await createVideoPreviewBlob(objectUrl);
    await saveGeneratedVideoPreview(owner,item,blob);
    await persistContent("Video preview generated.");
    fillForms();
  }catch(err){
    console.error(err);
    setStatus("Automatic video preview failed. Use “Upload manually” with a JPG/PNG/WebP thumbnail.");
  }finally{if(objectUrl)URL.revokeObjectURL(objectUrl)}
}

async function uploadVideoThumbnail(spec,row){
  syncAllForms();
  const{owner,index}=videoMediaSpec(spec);
  const item=getOwnerMedia(owner)?.[index];
  if(!item||item.type!=="video")return setStatus("Video attachment not found.");
  const input=row?.querySelector("[data-video-thumb-file]");
  const file=input?.files?.[0];
  if(!file)return setStatus("Choose a preview image first.");
  if(file.size>8*1024*1024)return setStatus("Preview image is larger than 8 MB.");
  if(!["image/jpeg","image/png","image/webp"].includes(file.type))return setStatus("Preview image must be JPG, PNG or WebP.");
  setStatus("Uploading video preview image...");
  const ext=(file.name.split(".").pop()||"jpg").toLowerCase();
  const path=`${ownerFolder(owner)}/previews/${uid()}-video-preview.${ext}`;
  const{error}=await sb.storage.from("site-media").upload(path,file,{upsert:false,contentType:file.type,cacheControl:"3600"});
  if(error)return setStatus("Preview upload failed: "+error.message);
  if(item.thumbnail_path){try{await sb.storage.from("site-media").remove([item.thumbnail_path])}catch{}}
  const{data}=sb.storage.from("site-media").getPublicUrl(path);
  item.thumbnail_url=data.publicUrl+"?v="+Date.now();
  item.thumbnail_path=path;
  await persistContent("Video preview image uploaded.");
  fillForms();
}

function requirePdfJs(){
  if(!window.pdfjsLib)throw new Error("PDF preview engine did not load. Refresh the admin page and try again.");
}

async function createPdfPreviewBlob(arrayBuffer){
  requirePdfJs();
  const loadingTask=window.pdfjsLib.getDocument({data:arrayBuffer});
  const pdf=await loadingTask.promise;
  const page=await pdf.getPage(1);

  const base=page.getViewport({scale:1});
  /* High-resolution raster preview for text, graphs, and graphical abstracts. */
  const targetWidth=1800;
  const scale=targetWidth/base.width;
  const viewport=page.getViewport({scale});

  const canvas=document.createElement("canvas");
  const ratio=Math.min(Math.max(window.devicePixelRatio||1,1),1.5);
  canvas.width=Math.floor(viewport.width*ratio);
  canvas.height=Math.floor(viewport.height*ratio);

  const ctx=canvas.getContext("2d",{alpha:false});
  ctx.fillStyle="#ffffff";
  ctx.fillRect(0,0,canvas.width,canvas.height);
  ctx.setTransform(ratio,0,0,ratio,0,0);

  await page.render({canvasContext:ctx,viewport}).promise;

  const blob=await new Promise((resolve,reject)=>{
    canvas.toBlob(b=>b?resolve(b):reject(new Error("Could not create preview image.")),"image/png");
  });

  try{await pdf.destroy()}catch{}
  return blob;
}

async function saveGeneratedPdfPreview(owner,item,blob){
  if(item.thumbnail_path){
    try{await sb.storage.from("site-media").remove([item.thumbnail_path])}catch{}
  }

  const path=`${ownerFolder(owner)}/previews/${uid()}-page1.png`;
  const{error}=await sb.storage.from("site-media").upload(path,blob,{
    upsert:false,
    contentType:"image/png",
    cacheControl:"3600"
  });
  if(error)throw error;

  const{data}=sb.storage.from("site-media").getPublicUrl(path);
  item.thumbnail_url=data.publicUrl+"?v="+Date.now();
  item.thumbnail_path=path;
}

async function generateExistingPdfThumbnail(spec){
  syncAllForms();

  const parts=spec.split(":");
  let owner,index;
  if(["profile","research","thesis","contact"].includes(parts[0])){
    owner=parts[0];
    index=Number(parts[1]);
  }else{
    owner=`${parts[0]}:${parts[1]}`;
    index=Number(parts[2]);
  }

  const media=getOwnerMedia(owner);
  const item=media?.[index];
  if(!item||item.type!=="pdf")return setStatus("PDF attachment not found.");

  setStatus("Generating first-page PDF preview...");
  try{
    requirePdfJs();
    const response=await fetch(item.url,{cache:"no-store"});
    if(!response.ok)throw new Error(`Could not read PDF (${response.status}).`);
    const buffer=await response.arrayBuffer();
    const blob=await createPdfPreviewBlob(buffer);
    await saveGeneratedPdfPreview(owner,item,blob);
    await persistContent("PDF preview generated.");
    fillForms();
  }catch(err){
    console.error(err);
    setStatus("Automatic preview failed. Use “Upload manually” with a JPG/PNG screenshot of page 1.");
  }
}

async function uploadPdfThumbnail(spec,row){
  syncAllForms();
  const parts=spec.split(":");
  let owner,index;
  if(["profile","research","thesis","contact"].includes(parts[0])){
    owner=parts[0];index=Number(parts[1]);
  }else{
    owner=`${parts[0]}:${parts[1]}`;index=Number(parts[2]);
  }
  const media=getOwnerMedia(owner);
  const item=media?.[index];
  if(!item||item.type!=="pdf")return setStatus("PDF attachment not found.");

  const input=row?.querySelector("[data-pdf-thumb-file]");
  const file=input?.files?.[0];
  if(!file)return setStatus("Choose a preview image first.");
  if(file.size>5*1024*1024)return setStatus("Preview image is larger than 5 MB.");
  if(!["image/jpeg","image/png","image/webp"].includes(file.type))
    return setStatus("Preview image must be JPG, PNG or WebP.");

  setStatus("Uploading PDF preview image...");
  const ext=(file.name.split(".").pop()||"jpg").toLowerCase();
  const path=`${ownerFolder(owner)}/previews/${uid()}-pdf-preview.${ext}`;

  const{error}=await sb.storage.from("site-media").upload(path,file,{
    upsert:false,
    contentType:file.type,
    cacheControl:"3600"
  });
  if(error)return setStatus("Preview upload failed: "+error.message);

  if(item.thumbnail_path){
    try{await sb.storage.from("site-media").remove([item.thumbnail_path])}catch{}
  }

  const{data}=sb.storage.from("site-media").getPublicUrl(path);
  item.thumbnail_url=data.publicUrl;
  item.thumbnail_path=path;

  await persistContent("PDF preview image uploaded.");
  fillForms();
}

async function removeMedia(spec){
  syncAllForms();
  const parts=spec.split(":");
  let owner,index;
  if(["profile","research","thesis","contact"].includes(parts[0])){
    owner=parts[0];index=Number(parts[1]);
  }else{
    owner=`${parts[0]}:${parts[1]}`;index=Number(parts[2]);
  }
  const media=getOwnerMedia(owner);
  const item=media?.[index];
  if(!item)return;
  if(!confirm(`Remove "${item.title||item.filename||"this attachment"}"?`))return;

  const paths=[item.path,item.thumbnail_path].filter(Boolean);
  if(paths.length){
    const{error}=await sb.storage.from("site-media").remove(paths);
    if(error)console.warn("Storage remove warning:",error.message);
  }
  media.splice(index,1);
  await persistContent("Media removed.");
  fillForms();
}

async function persistContent(successMessage){
  // Protect all design/admin preferences from being accidentally dropped by
  // an unrelated feature patch or partial editor operation.
  restoreMissingBuilderSettings(currentContent,savedBuilderSettingsSnapshot);
  normalizeMedia(currentContent);
  ensureBuilderState(currentContent);

  const beforeSave=lastPersistedFullSnapshot?deepCloneSafe(lastPersistedFullSnapshot):null;
  const currentBeforeSave=historySnapshot(currentContent);
  if(beforeSave&&JSON.stringify(beforeSave)!==JSON.stringify(currentBeforeSave)){
    addSavedRevision(beforeSave,successMessage||"Saved version");
  }

  const{error}=await sb.from("site_content")
    .update({content:currentContent,updated_at:new Date().toISOString()})
    .eq("id","main");

  if(error){setStatus("Save failed: "+error.message);return false}

  savedBuilderSettingsSnapshot=captureBuilderSettings(currentContent);
  lastPersistedFullSnapshot=historySnapshot(currentContent);
  globalHistoryLast=historySnapshot(currentContent);
  renderRevisionList();
  updateHistoryUi();
  setStatus(successMessage||"Saved.");
  return true;
}

$("removeCvBtn").addEventListener("click",async()=>{
  if(!confirm("Remove the current CV from your public website?"))return;
  $("saveStatus").textContent="Removing CV...";
  try{await sb.storage.from("cv-files").remove(["Ibtida_Yasin_CV.pdf"])}catch{}
  currentContent.cv={url:"",filename:"",updated_at:""};
  const ok=await persistContent("CV removed.");
  if(ok)renderCvState();
});

$("saveBtn").addEventListener("click",saveAll);
async function saveAll(){
  setStatus("Saving...");
  syncAllForms();

  const photo=$("photoFile").files[0];
  if(photo){
    if(photo.size>5*1024*1024)return setStatus("Photo is larger than 5 MB.");
    if(!["image/jpeg","image/png","image/webp"].includes(photo.type))return setStatus("Profile photo must be JPEG, PNG or WebP.");
    const ext=photo.name.split(".").pop().toLowerCase(),path=`profile.${ext}`;
    const{error}=await sb.storage.from("profile-images").upload(path,photo,{upsert:true,contentType:photo.type,cacheControl:"3600"});
    if(error)return setStatus("Photo upload failed: "+error.message);
    const{data}=sb.storage.from("profile-images").getPublicUrl(path);
    currentContent.photo_url=data.publicUrl+"?v="+Date.now();
  }

  const external=$("fCvExternal").value.trim();
  const cvFile=$("cvFile").files[0];
  if(cvFile){
    if(cvFile.size>10*1024*1024)return setStatus("CV is larger than 10 MB.");
    if(cvFile.type!=="application/pdf"&&!cvFile.name.toLowerCase().endsWith(".pdf"))return setStatus("CV must be a PDF.");
    const path="Ibtida_Yasin_CV.pdf";
    const{error}=await sb.storage.from("cv-files").upload(path,cvFile,{upsert:true,contentType:"application/pdf",cacheControl:"3600"});
    if(error)return setStatus("CV upload failed: "+error.message);
    const{data}=sb.storage.from("cv-files").getPublicUrl(path);
    currentContent.cv={url:data.publicUrl+"?v="+Date.now(),filename:cvFile.name,updated_at:new Date().toISOString()};
  }else if(external){
    if(!/^https?:\/\//i.test(external))return setStatus("External CV URL must start with http:// or https://");
    currentContent.cv={url:external,filename:"External CV link",updated_at:new Date().toISOString()};
  }

  const ok=await persistContent("Saved. Your public website is updated.");
  if(!ok)return;
  $("photoFile").value="";
  $("cvFile").value="";
  $("fCvExternal").value="";
  if(currentContent.photo_url){
    $("photoPreview").src=currentContent.photo_url;
    $("photoPreview").classList.remove("hidden");
  }
  renderCvState();
  typographySavedSnapshot=typographyStateFromContent();
  updateTypographyUndoButton();
}
function setStatus(s){$("saveStatus").textContent=s}
function esc(s){return String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#39;"}[c]))}


["fSectionTitleSize","fSectionTitleSizeNumber"].forEach(id=>{
  $(id)?.addEventListener("input",e=>{
    const v=clampNumber(e.target.value,30,60,44);
    $("fSectionTitleSize").value=v;
    $("fSectionTitleSizeNumber").value=v;
    previewTypographyFromControls();
  });
});
["fSectionSubtitleSize","fSectionSubtitleSizeNumber"].forEach(id=>{
  $(id)?.addEventListener("input",e=>{
    const v=clampNumber(e.target.value,16,34,25);
    $("fSectionSubtitleSize").value=v;
    $("fSectionSubtitleSizeNumber").value=v;
    previewTypographyFromControls();
  });
});
syncColorPickerToText("fSectionTitleColor","fSectionTitleColorText","useThemeSectionTitleColor");
syncColorPickerToText("fSectionSubtitleColor","fSectionSubtitleColorText","useThemeSectionSubtitleColor");
syncColorPickerToText("fBodyTextColor","fBodyTextColorText","useThemeBodyTextColor");
$("useThemeSectionTitleColor")?.addEventListener("change",()=>{
  if($("useThemeSectionTitleColor").checked){
    const c=currentThemeTypographyColors().title;
    $("fSectionTitleColor").value=c;
    $("fSectionTitleColorText").value=c;
  }
  syncTypographyDisabledState();
  previewTypographyFromControls();
});
$("useThemeSectionSubtitleColor")?.addEventListener("change",()=>{
  if($("useThemeSectionSubtitleColor").checked){
    const c=currentThemeTypographyColors().subtitle;
    $("fSectionSubtitleColor").value=c;
    $("fSectionSubtitleColorText").value=c;
  }
  syncTypographyDisabledState();
  previewTypographyFromControls();
});
$("useThemeBodyTextColor")?.addEventListener("change",()=>{
  if($("useThemeBodyTextColor").checked){const c=currentThemeTypographyColors().body;$("fBodyTextColor").value=c;$("fBodyTextColorText").value=c;}
  syncTypographyDisabledState();previewTypographyFromControls();
});
$("resetTypographyBtn")?.addEventListener("click",resetTypographyControls);
$("undoTypographyBtn")?.addEventListener("click",undoTypographyControls);


CUSTOM_THEME_FIELDS.forEach(([,id])=>syncCustomThemeHexPair(id));
$("resetCustomThemeBtn")?.addEventListener("click",resetCustomThemeBuilder);


syncRangeNumber("fMaxWidth","fMaxWidthNumber",960,1500,1180);
syncRangeNumber("fSidebarWidth","fSidebarWidthNumber",210,340,255);
syncRangeNumber("fLayoutGap","fLayoutGapNumber",20,100,58);
syncRangeNumber("fSectionSpacing","fSectionSpacingNumber",20,90,40);
syncRangeNumber("fCardRadius","fCardRadiusNumber",0,28,11);
syncRangeNumber("fPortraitSize","fPortraitSizeNumber",140,250,190);
syncRangeNumber("fBodyTextSize","fBodyTextSizeNumber",14,20,16);
syncRangeNumber("fBodyLineHeight","fBodyLineHeightNumber",1.4,2,1.7);
syncRangeNumber("fCardTitleSize","fCardTitleSizeNumber",16,28,20);
syncRangeNumber("fNavTextSize","fNavTextSizeNumber",11,16,13);
syncRangeNumber("fSectionCoverHeight","fSectionCoverHeightNumber",220,420,300);
syncRangeNumber("fSectionCoverZoom","fSectionCoverZoomNumber",40,170,100);

$("resetLayoutStyleBtn")?.addEventListener("click",resetLayoutStyleControls);
$("resetSectionStructureBtn")?.addEventListener("click",resetSectionStructure);
$("resetExperienceBtn")?.addEventListener("click",resetExperienceControls);
$("exportBackupBtn")?.addEventListener("click",exportWebsiteBackup);
$("importBackupBtn")?.addEventListener("click",importWebsiteBackup);

document.addEventListener("click",e=>{
  const move=e.target.closest("[data-section-move]");
  if(move){
    const[key,delta]=move.dataset.sectionMove.split(":");
    moveSectionSetting(key,Number(delta));
  }
});
document.addEventListener("change",e=>{
  const vis=e.target.closest("[data-section-visible]");
  if(vis)setSectionVisibility(vis.dataset.sectionVisible,vis.checked);
});


function initAdminBackToTop(){
  if(document.getElementById("adminBackToTopBtn"))return;
  const btn=document.createElement("button");
  btn.id="adminBackToTopBtn";
  btn.className="admin-back-to-top hidden";
  btn.type="button";
  btn.textContent="↑";
  btn.setAttribute("aria-label","Back to top");
  btn.title="Back to top";
  document.body.appendChild(btn);

  const update=()=>btn.classList.toggle("hidden",window.scrollY<420);
  btn.addEventListener("click",()=>window.scrollTo({top:0,behavior:"smooth"}));
  window.addEventListener("scroll",update,{passive:true});
  update();
}

bindAdvancedAdminSuite();
initAdminBackToTop();

["fNavigationModeSingle","fNavigationModeSections"].forEach(id=>{
  $(id)?.addEventListener("change",()=>{
    updateSectionPageAdminOptions();
    scheduleAdminPreview(true);
  });
});
$("fPageTransition")?.addEventListener("change",()=>scheduleAdminPreview(true));
$("fPagePager")?.addEventListener("change",()=>scheduleAdminPreview(true));
$("fCardStyleSection")?.addEventListener("change",()=>{
  refreshCardStyleMiniControl();
  scheduleAdminPreview(true);
});
$("fCardStyleValue")?.addEventListener("change",()=>{
  storeCardStyleMiniControl();
  scheduleAdminPreview(true);
});
$("fCardDesignValue")?.addEventListener("change",()=>{
  storeCardDesignMiniControl();
  scheduleAdminPreview(true);
});
$("fSidebarScope")?.addEventListener("change",()=>{
  updateSidebarAdminOptions();
  scheduleAdminPreview(true);
});
document.querySelectorAll("[data-sidebar-section]").forEach(input=>input.addEventListener("change",()=>scheduleAdminPreview(true)));


$("fSectionCoverEnabled")?.addEventListener("change",()=>{
  updateSectionCoverAdminOptions();
  scheduleAdminPreview(true);
});
["fSectionCoverStyle","fSectionCoverPhotoFit","fSectionCoverSide","fSectionCoverFade","fSectionCoverDetails","fSectionCoverSocials"].forEach(id=>{
  $(id)?.addEventListener("change",()=>{
    updateCoverStyleSpecificControls();
    scheduleAdminPreview(true);
  });
});
$("fSectionCoverScope")?.addEventListener("change",()=>{
  updateSectionCoverAdminOptions();
  scheduleAdminPreview(true);
});
document.querySelectorAll("[data-cover-section]").forEach(input=>input.addEventListener("change",()=>scheduleAdminPreview(true)));
$("fSectionCoverTopBlend")?.addEventListener("change",()=>scheduleAdminPreview(true));
["fSectionCoverHeight","fSectionCoverHeightNumber","fSectionCoverZoom","fSectionCoverZoomNumber"].forEach(id=>{
  $(id)?.addEventListener("input",()=>scheduleAdminPreview());
});
$("resetSectionCoverBtn")?.addEventListener("click",resetSectionCoverControls);

$("fSectionCoverGap")?.addEventListener("change",()=>scheduleAdminPreview(true));

/* =========================================================
   COMPACT / COLLAPSIBLE APPEARANCE PANEL
   ========================================================= */
function setupAppearanceAccordions(){
  const panel=document.querySelector('[data-panel="appearance"]');
  if(!panel||panel.classList.contains('appearance-fold-ready'))return;
  panel.classList.add('appearance-fold-ready');

  const head=panel.querySelector('.appearance-head');
  if(head){
    const eyebrow=head.querySelector('.eyebrow');
    const title=head.querySelector('.admin-section-title');
    const desc=head.querySelector('.muted');
    if(eyebrow)eyebrow.textContent='Appearance';
    if(title)title.textContent='Appearance settings';
    if(desc)desc.textContent='Expand only the group you want to edit. Collapse it again to keep this page short.';

    const actions=document.createElement('div');
    actions.className='appearance-fold-actions';
    actions.innerHTML='<button class="secondary" type="button" data-appearance-fold-all="open">Expand all</button><button class="secondary" type="button" data-appearance-fold-all="close">Collapse all</button>';
    head.appendChild(actions);
  }

  // Clean a historical duplicate "Custom" theme-group heading if present.
  const grid=panel.querySelector('.theme-choice-grid');
  if(grid){
    const groupTitles=[...grid.querySelectorAll(':scope > .theme-group-title')];
    groupTitles.forEach((el,i)=>{
      const prev=groupTitles[i-1];
      if(prev&&prev.textContent.trim()===el.textContent.trim()&&prev.nextElementSibling===el)el.remove();
    });
  }

  const customBuilder=panel.querySelector('.custom-theme-builder');
  const previewNote=panel.querySelector('.theme-preview-note');
  const presetCard=[...panel.querySelectorAll(':scope > .admin-card')].find(el=>el.querySelector('#designPresetGrid'));
  const cardsCard=[...panel.querySelectorAll(':scope > .admin-card')].find(el=>el.querySelector('#fCardStyleValue')||el.querySelector('#fCardDesignValue'));

  function addFold(key,title,description,nodes){
    const valid=nodes.filter(Boolean);
    if(!valid.length)return null;
    const details=document.createElement('details');
    details.className='appearance-fold';
    details.dataset.appearanceFold=key;

    const saved=localStorage.getItem('academicAppearanceFold:'+key);
    details.open=saved==='1';

    const summary=document.createElement('summary');
    summary.innerHTML=`<span class="appearance-fold-title"><strong>${title}</strong><small>${description}</small></span><span class="appearance-fold-chevron" aria-hidden="true"></span>`;
    const body=document.createElement('div');
    body.className='appearance-fold-body';

    valid[0].before(details);
    valid.forEach(node=>body.appendChild(node));
    details.append(summary,body);
    details.addEventListener('toggle',()=>localStorage.setItem('academicAppearanceFold:'+key,details.open?'1':'0'));
    return details;
  }

  addFold('themes','Website themes','All color palettes and the Custom Theme choice.',[grid,previewNote]);
  addFold('custom','Custom theme builder','Fine-tune page, card, text, accent and portrait colors.',[customBuilder]);
  addFold('presets','Design presets','Apply a complete visual starting point without replacing your content.',[presetCard]);
  addFold('cards','Cards','Choose a subtle finish or switch to a completely different card design.',[cardsCard]);

  panel.addEventListener('click',e=>{
    const btn=e.target.closest('[data-appearance-fold-all]');
    if(!btn)return;
    const open=btn.dataset.appearanceFoldAll==='open';
    panel.querySelectorAll('.appearance-fold').forEach(fold=>{
      fold.open=open;
      localStorage.setItem('academicAppearanceFold:'+fold.dataset.appearanceFold,open?'1':'0');
    });
  });
}

setupAppearanceAccordions();
boot();
