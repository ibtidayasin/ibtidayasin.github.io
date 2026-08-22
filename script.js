const $=id=>document.getElementById(id);
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
  "featuredResearch":{"title":"Radially graded Cu–Ni nanowires under tensile loading","description":"A classical molecular dynamics study of how radial composition grading, crystallographic orientation, temperature, and surface defects influence tensile behaviour and deformation mechanisms in Cu–Ni nanowires.","tags":["LAMMPS","Python","OVITO","PTM","DXA","RDF"],"media":[]},
  "publications":[],
  "projects":[
    {"title":"Atomistic Structure Generation","description":"Python-based generation and manipulation of nanoscale structures for molecular dynamics simulations.","meta":"Python · LAMMPS","url":"","media":[]},
    {"title":"MD Data Analysis","description":"Post-processing of simulation data, stress–strain analysis, comparison across cases, and scientific plotting.","meta":"Python · Matplotlib","url":"","media":[]},
    {"title":"Atomistic Mechanism Analysis","description":"Structural and defect analysis using PTM, DXA, RDF, atomic strain, and visualization workflows.","meta":"OVITO","url":"","media":[]}
  ],
  "skills":[
    {"category":"Simulation","items":["LAMMPS","Classical molecular dynamics","EAM potentials"],"media":[]},
    {"category":"Scientific Computing","items":["Python","NumPy","Matplotlib"],"media":[]},
    {"category":"Atomistic Analysis","items":["OVITO","PTM","DXA","RDF"],"media":[]}
  ],
  "education":[{"period":"B.Sc.","degree":"Mechanical Engineering","institution":"Shahjalal University of Science and Technology (SUST)","description":"Mechanical engineering education with growing focus on computational materials and atomistic simulation.","media":[]}],
  "contact":{"headline":"Interested in computational materials and nanoscale mechanics?","message":"I am open to research discussions, graduate opportunities, and collaborations related to computational materials science and atomistic simulation.","email":"","phone":"","location":"Bangladesh","media":[]},
  "links":{"linkedin":"","github":"https://github.com/ibtidayasin","orcid":"","scholar":""},
  "cv":{"url":"","filename":"","updated_at":""},
  "photo_url":"",
  "defaultTheme":"classic-brown",
  "sectionMedia":{"profile":[]}
};
const sb=window.supabase.createClient(window.SUPABASE_CONFIG.url,window.SUPABASE_CONFIG.key);
const SITE_THEMES=["classic-brown","soft-beige","slate-blue","deep-navy","forest-sage","olive-stone","burgundy","dusty-plum","charcoal","dark-academic","solar-citrus","electric-azure","coral-bloom","mint-pop","lemon-sky","aqua-lime","berry-fizz","peach-punch","lavender-glow","spring-green","midnight-gold","ink-cyan","black-coral","graphite-lime","royal-cream","espresso-ivory","aubergine-gold","emerald-night","crimson-slate","arctic-black","cobalt-white","scarlet-paper","emerald-white","violet-ivory","teal-porcelain","navy-sand","magenta-frost","orange-ink","indigo-mint","crimson-cream"];
function validSiteTheme(t){return SITE_THEMES.includes(t)?t:"classic-brown"}

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
    phone:`<svg ${common}><path d="M6.5 4.5l3 3-2 2.2a14 14 0 0 0 6.8 6.8l2.2-2 3 3-1.6 2c-.7.8-1.8 1.1-2.8.8C9.4 18.7 5.3 14.6 3.7 8.9c-.3-1 .1-2.1.8-2.8l2-1.6z"></path></svg>`,
    location:`<svg ${common}><path d="M12 21s6-5.4 6-11a6 6 0 1 0-12 0c0 5.6 6 11 6 11z"></path><circle cx="12" cy="10" r="2"></circle></svg>`
  };
  return icons[type]||icons.github;
}

function iconLinkHtml(type,label,url,isExternal=true){
  if(!url)return "";
  return `<a class="profile-icon-link" href="${escAttr(url)}" ${isExternal?'target="_blank" rel="noopener"':""}>
    ${profileIcon(type)}
    <span>${esc(label)}</span>
    ${isExternal?'<span class="profile-link-arrow">↗</span>':""}
  </a>`;
}

function render(d){
  document.title=`${d.name} | Academic Profile`;
  document.documentElement.dataset.theme=validSiteTheme(d.defaultTheme||"classic-brown");
  $("brandName").textContent=$("name").textContent=$("footerName").textContent=d.name;
  $("initials").textContent=d.name.split(/\s+/).slice(0,2).map(x=>x[0]).join("").toUpperCase();
  $("title").textContent=d.title;
  $("institution").textContent=d.institution;
  $("location").textContent=d.location;
  $("focus").textContent=d.focus;
  $("aboutHeadline").textContent=d.aboutHeadline;
  $("aboutLead").textContent=d.aboutLead;
  $("aboutBio").textContent=d.aboutBio;

  if(d.photo_url){
    $("profilePhoto").src=d.photo_url;$("profilePhoto").classList.remove("hidden");$("initials").classList.add("hidden");
  }else{
    $("profilePhoto").classList.add("hidden");$("initials").classList.remove("hidden");
  }

  $("profileMedia").innerHTML=mediaHtml(d.sectionMedia?.profile||[]);
  $("researchInterests").innerHTML=(d.researchInterests||[]).map(x=>`<li>${esc(x)}</li>`).join("");
  $("researchTitle").textContent=d.featuredResearch?.title||"";
  $("researchDescription").textContent=d.featuredResearch?.description||"";
  $("researchTags").innerHTML=(d.featuredResearch?.tags||[]).map(x=>`<span class="tag">${esc(x)}</span>`).join("");
  $("researchMedia").innerHTML=mediaHtml(d.featuredResearch?.media||[]);

  const pubs=d.publications||[];
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

  $("projectsList").innerHTML=(d.projects||[]).map(p=>`
    <article class="card">
      <h3>${esc(p.title||"")}</h3>
      <p class="muted">${esc(p.description||"")}</p>
      ${safeUrl(p.url)?`<a class="text-link" href="${escAttr(safeUrl(p.url))}" target="_blank" rel="noopener">View project ↗</a>`:""}
      <div class="item-media">${mediaHtml(p.media||[])}</div>
      <div class="meta-line">${esc(p.meta||"")}</div>
    </article>`).join("");

  $("skillsList").innerHTML=(d.skills||[]).map(g=>`
    <article class="skill-card">
      <h3>${esc(g.category||"")}</h3>
      <ul>${(g.items||[]).map(x=>`<li>${esc(x)}</li>`).join("")}</ul>
      <div class="item-media">${mediaHtml(g.media||[])}</div>
    </article>`).join("");

  $("educationList").innerHTML=(d.education||[]).map(e=>`
    <div class="edu">
      <div class="period">${esc(e.period||"")}</div>
      <div>
        <h3>${esc(e.degree||"")}</h3>
        <p style="color:var(--accent);font-weight:700">${esc(e.institution||"")}</p>
        <p class="muted small">${esc(e.description||"")}</p>
        <div class="item-media">${mediaHtml(e.media||[])}</div>
      </div>
    </div>`).join("");

  $("contactHeadline").textContent=d.contact?.headline||"";
  $("contactMessage").textContent=d.contact?.message||"";
  const contactItems=[];
  if(d.contact?.email)contactItems.push(["email","Email",`mailto:${d.contact.email}`,d.contact.email,false]);
  if(d.contact?.phone)contactItems.push(["phone","Phone","",d.contact.phone,false]);
  if(d.contact?.location)contactItems.push(["location","Location","",d.contact.location,false]);
  [["linkedin","LinkedIn",d.links?.linkedin],["github","GitHub",d.links?.github],["orcid","ORCID",d.links?.orcid],["scholar","Google Scholar",d.links?.scholar]].forEach(([type,label,url])=>{
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

  const sideDefs=[
    ["email","Email",d.contact?.email?`mailto:${d.contact.email}`:"",false],
    ["linkedin","LinkedIn",safeUrl(d.links?.linkedin),true],
    ["github","GitHub",safeUrl(d.links?.github),true],
    ["orcid","ORCID",safeUrl(d.links?.orcid),true],
    ["scholar","Google Scholar",safeUrl(d.links?.scholar),true]
  ];
  $("sidebarLinks").innerHTML=sideDefs
    .filter(([, ,url])=>url)
    .map(([type,label,url,isExternal])=>iconLinkHtml(type,label,url,isExternal))
    .join("");

  if(d.cv?.url){
    [$("cvLink"),$("sidebarCv")].forEach(a=>{
      a.href=d.cv.url;a.classList.remove("disabled","hidden");a.removeAttribute("aria-disabled");
    });
    $("cvLink").textContent="View / Download CV";
    $("cvNote").textContent=d.cv.updated_at?`Current CV · updated ${formatDate(d.cv.updated_at)}`:"Current academic CV.";
  }
}

function mediaHtml(media){
  media=(media||[]).filter(m=>safeUrl(m.url));
  if(!media.length)return"";
  const visual=[],links=[];
  media.forEach(m=>{
    const type=m.type||"link",url=safeUrl(m.url),title=m.title||m.filename||labelFor(type),caption=m.caption||"";
    if(type==="image"){
      visual.push(`<figure class="media-public-item">
        <a href="${escAttr(url)}" target="_blank" rel="noopener"><img class="media-public-image" src="${escAttr(url)}" alt="${escAttr(title)}" loading="lazy"></a>
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

$("year").textContent=new Date().getFullYear();
loadContent();
