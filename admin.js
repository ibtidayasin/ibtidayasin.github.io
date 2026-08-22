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
  "sectionMedia":{"profile":[]}
};

const sb=window.supabase.createClient(window.SUPABASE_CONFIG.url,window.SUPABASE_CONFIG.key);
const $=id=>document.getElementById(id);
let currentContent=structuredClone(DEFAULT_CONTENT);

async function boot(){
  const{data:{session}}=await sb.auth.getSession();
  if(session)await verifyAdminAndOpen();else showLogin();
}
function showLogin(){$("loginView").classList.remove("hidden");$("adminView").classList.add("hidden")}
async function verifyAdminAndOpen(){
  const{data,error}=await sb.rpc("is_site_admin");
  if(error||data!==true){
    await sb.auth.signOut();
    $("loginStatus").textContent="This account is not authorized to edit the website.";
    showLogin();return;
  }
  $("loginView").classList.add("hidden");
  $("adminView").classList.remove("hidden");
  await loadContent();
}
$("loginBtn").addEventListener("click",async()=>{
  $("loginStatus").textContent="Signing in...";
  const{error}=await sb.auth.signInWithPassword({email:$("loginEmail").value.trim(),password:$("loginPassword").value});
  if(error){$("loginStatus").textContent=error.message;return}
  $("loginStatus").textContent="";
  await verifyAdminAndOpen();
});
$("logoutBtn").addEventListener("click",async()=>{await sb.auth.signOut();location.reload()});

document.querySelectorAll("[data-tab]").forEach(btn=>btn.addEventListener("click",()=>{
  document.querySelectorAll("[data-tab]").forEach(b=>b.classList.toggle("active",b===btn));
  document.querySelectorAll("[data-panel]").forEach(p=>p.classList.toggle("active",p.dataset.panel===btn.dataset.tab));
}));

function merge(base,extra){
  if(Array.isArray(base))return Array.isArray(extra)?extra:base;
  if(base&&typeof base==="object"){
    const out={...base};
    if(extra&&typeof extra==="object")Object.keys(extra).forEach(k=>out[k]=k in base?merge(base[k],extra[k]):extra[k]);
    return out;
  }
  return extra??base;
}
function normalizeMedia(content){
  content.sectionMedia=content.sectionMedia||{};
  content.sectionMedia.profile=Array.isArray(content.sectionMedia.profile)?content.sectionMedia.profile:[];
  content.featuredResearch=content.featuredResearch||{};
  content.featuredResearch.media=Array.isArray(content.featuredResearch.media)?content.featuredResearch.media:[];
  content.publications=(content.publications||[]).map(x=>({...x,media:Array.isArray(x.media)?x.media:[]}));
  content.projects=(content.projects||[]).map(x=>({...x,media:Array.isArray(x.media)?x.media:[]}));
  content.skills=(content.skills||[]).map(x=>({...x,media:Array.isArray(x.media)?x.media:[]}));
  content.education=(content.education||[]).map(x=>({...x,media:Array.isArray(x.media)?x.media:[]}));
  content.contact=content.contact||{};
  content.contact.media=Array.isArray(content.contact.media)?content.contact.media:[];
  return content;
}
async function loadContent(){
  const{data:row,error}=await sb.from("site_content").select("content").eq("id","main").single();
  currentContent=!error&&row?.content&&Object.keys(row.content).length?merge(DEFAULT_CONTENT,row.content):structuredClone(DEFAULT_CONTENT);
  normalizeMedia(currentContent);
  fillForms();
}

function fillForms(){
  $("fName").value=currentContent.name||"";
  $("fTitle").value=currentContent.title||"";
  $("fInstitution").value=currentContent.institution||"";
  $("fLocation").value=currentContent.location||"";
  $("fFocus").value=currentContent.focus||"";
  $("fAboutHeadline").value=currentContent.aboutHeadline||"";
  $("fAboutLead").value=currentContent.aboutLead||"";
  $("fAboutBio").value=currentContent.aboutBio||"";
  $("fInterests").value=(currentContent.researchInterests||[]).join("\n");
  $("fResearchTitle").value=currentContent.featuredResearch?.title||"";
  $("fResearchDescription").value=currentContent.featuredResearch?.description||"";
  $("fResearchTags").value=(currentContent.featuredResearch?.tags||[]).join(", ");
  $("fContactHeadline").value=currentContent.contact?.headline||"";
  $("fContactMessage").value=currentContent.contact?.message||"";
  $("fEmail").value=currentContent.contact?.email||"";
  $("fPhone").value=currentContent.contact?.phone||"";
  $("fContactLocation").value=currentContent.contact?.location||currentContent.location||"";
  $("fLinkedIn").value=currentContent.links?.linkedin||"";
  $("fGitHub").value=currentContent.links?.github||"";
  $("fOrcid").value=currentContent.links?.orcid||"";
  $("fScholar").value=currentContent.links?.scholar||"";
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
}

function renderAllEditors(){
  renderPublicationsEditor();
  renderProjectsEditor();
  renderSkillsEditor();
  renderEducationEditor();
  $("profileMediaEditor").innerHTML=mediaEditor("profile",currentContent.sectionMedia?.profile||[],"Profile / About media");
  $("researchMediaEditor").innerHTML=mediaEditor("research",currentContent.featuredResearch?.media||[],"Research media");
  $("contactMediaEditor").innerHTML=mediaEditor("contact",currentContent.contact?.media||[],"Contact media");
}

function repeatBlock(type,i,title,fields,media=[]){
  return `<div class="repeat-item" data-${type}="${i}">
    <div class="repeat-head"><strong>${esc(title)}</strong><button class="danger" data-remove="${type}:${i}" type="button">Remove</button></div>
    <div class="form-grid">
      ${fields.map(f=>`<div class="field ${f.full?"full":""}"><label>${esc(f.label)}</label>${
        f.kind==="textarea"?`<textarea data-k="${f.key}">${esc(f.value||"")}</textarea>`:
        f.kind==="select"?`<select data-k="${f.key}">${["","Published","Accepted","In press","Submitted","Preprint","Conference"].map(o=>`<option ${o===f.value?"selected":""}>${esc(o)}</option>`).join("")}</select>`:
        `<input data-k="${f.key}" value="${esc(f.value||"")}">`
      }</div>`).join("")}
    </div>
    ${mediaEditor(`${type}:${i}`,media,"Media & attachments")}
  </div>`;
}

function renderPublicationsEditor(){
  $("publicationsEditor").innerHTML=(currentContent.publications||[]).map((p,i)=>repeatBlock("publication",i,`Publication ${i+1}`,[
    {label:"Title",key:"title",value:p.title,full:true},{label:"Authors",key:"authors",value:p.authors,full:true},
    {label:"Journal / Conference",key:"venue",value:p.venue},{label:"Year",key:"year",value:p.year},
    {label:"Status",key:"status",value:p.status,kind:"select"},{label:"DOI",key:"doi",value:p.doi},
    {label:"Publication URL",key:"url",value:p.url,full:true},{label:"Short note / description",key:"description",value:p.description,kind:"textarea",full:true}
  ],p.media||[])).join("")||`<div class="empty-state">No publications added yet.</div>`;
}
function renderProjectsEditor(){
  $("projectsEditor").innerHTML=(currentContent.projects||[]).map((p,i)=>repeatBlock("project",i,`Project ${i+1}`,[
    {label:"Project title",key:"title",value:p.title,full:true},{label:"Description",key:"description",value:p.description,kind:"textarea",full:true},
    {label:"Tools / metadata",key:"meta",value:p.meta},{label:"Project URL",key:"url",value:p.url}
  ],p.media||[])).join("")||`<div class="empty-state">No projects added.</div>`;
}
function renderSkillsEditor(){
  $("skillsEditor").innerHTML=(currentContent.skills||[]).map((g,i)=>repeatBlock("skill",i,`Skill group ${i+1}`,[
    {label:"Category",key:"category",value:g.category,full:true},{label:"Skills — one per line",key:"items",value:(g.items||[]).join("\n"),kind:"textarea",full:true}
  ],g.media||[])).join("")||`<div class="empty-state">No skill groups added.</div>`;
}
function renderEducationEditor(){
  $("educationEditor").innerHTML=(currentContent.education||[]).map((e,i)=>repeatBlock("education",i,`Education ${i+1}`,[
    {label:"Period",key:"period",value:e.period},{label:"Degree",key:"degree",value:e.degree},
    {label:"Institution",key:"institution",value:e.institution,full:true},{label:"Description",key:"description",value:e.description,kind:"textarea",full:true}
  ],e.media||[])).join("")||`<div class="empty-state">No education entries added.</div>`;
}

function mediaEditor(owner,media,title){
  return `<div class="media-editor" data-media-owner="${esc(owner)}">
    <div class="media-editor-title">
      <strong>${esc(title)}</strong>
      <span class="helper">Images · PDFs · videos · links</span>
    </div>
    <div class="media-existing">
      ${(media||[]).length?(media||[]).map((m,i)=>`
        <div class="media-admin-item" data-media-index="${i}">
          <div class="media-admin-main">
            <div class="media-admin-summary">
              <span class="media-type-badge">${esc(m.type||"link")}</span>
              <strong>${esc(m.filename||m.title||"Attachment")}</strong>
            </div>
            <input data-media-field="title" value="${esc(m.title||"")}" placeholder="Display title (optional)">
            <input data-media-field="caption" value="${esc(m.caption||"")}" placeholder="Caption / note (optional)">
            <span class="helper">${esc(m.url||"")}</span>
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
  currentContent.publications.push({title:"",authors:"",venue:"",year:"",status:"",doi:"",url:"",description:"",media:[]});
  renderPublicationsEditor();
});
$("addProjectBtn").addEventListener("click",()=>{
  syncAllForms();currentContent.projects.push({title:"",description:"",meta:"",url:"",media:[]});renderProjectsEditor();
});
$("addSkillGroupBtn").addEventListener("click",()=>{
  syncAllForms();currentContent.skills.push({category:"",items:[],media:[]});renderSkillsEditor();
});
$("addEducationBtn").addEventListener("click",()=>{
  syncAllForms();currentContent.education.push({period:"",degree:"",institution:"",description:"",media:[]});renderEducationEditor();
});

document.addEventListener("click",async e=>{
  let b=e.target.closest("[data-remove]");
  if(b){
    syncAllForms();
    const[type,idxs]=b.dataset.remove.split(":");const i=Number(idxs);
    const map={publication:"publications",project:"projects",skill:"skills",education:"education"};
    currentContent[map[type]].splice(i,1);
    if(type==="publication")renderPublicationsEditor();
    if(type==="project")renderProjectsEditor();
    if(type==="skill")renderSkillsEditor();
    if(type==="education")renderEducationEditor();
    return;
  }

  b=e.target.closest("[data-media-upload]");
  if(b){await uploadMedia(b.dataset.mediaUpload,b.closest(".media-editor"));return}

  b=e.target.closest("[data-media-add-link]");
  if(b){await addMediaLink(b.dataset.mediaAddLink,b.closest(".media-editor"));return}

  b=e.target.closest("[data-media-remove]");
  if(b){await removeMedia(b.dataset.mediaRemove);return}
});

function syncAllForms(){
  readMediaMetadata();
  currentContent.name=$("fName").value.trim();
  currentContent.title=$("fTitle").value.trim();
  currentContent.institution=$("fInstitution").value.trim();
  currentContent.location=$("fLocation").value.trim();
  currentContent.focus=$("fFocus").value.trim();
  currentContent.aboutHeadline=$("fAboutHeadline").value.trim();
  currentContent.aboutLead=$("fAboutLead").value.trim();
  currentContent.aboutBio=$("fAboutBio").value.trim();
  currentContent.researchInterests=$("fInterests").value.split("\n").map(x=>x.trim()).filter(Boolean);

  const researchMedia=currentContent.featuredResearch?.media||[];
  currentContent.featuredResearch={
    title:$("fResearchTitle").value.trim(),
    description:$("fResearchDescription").value.trim(),
    tags:$("fResearchTags").value.split(",").map(x=>x.trim()).filter(Boolean),
    media:researchMedia
  };

  readRepeaters();

  const contactMedia=currentContent.contact?.media||[];
  currentContent.contact={
    headline:$("fContactHeadline").value.trim(),
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
    scholar:$("fScholar").value.trim()
  };
  normalizeMedia(currentContent);
}

function readRepeaters(){
  currentContent.publications=[...document.querySelectorAll("[data-publication]")].map((r,i)=>{
    const old=currentContent.publications[i]||{};
    return {title:get(r,"title"),authors:get(r,"authors"),venue:get(r,"venue"),year:get(r,"year"),status:get(r,"status"),doi:get(r,"doi"),url:get(r,"url"),description:get(r,"description"),media:old.media||[]};
  }).filter(x=>x.title||x.venue||x.media.length);

  currentContent.projects=[...document.querySelectorAll("[data-project]")].map((r,i)=>{
    const old=currentContent.projects[i]||{};
    return {title:get(r,"title"),description:get(r,"description"),meta:get(r,"meta"),url:get(r,"url"),media:old.media||[]};
  }).filter(x=>x.title||x.description||x.media.length);

  currentContent.skills=[...document.querySelectorAll("[data-skill]")].map((r,i)=>{
    const old=currentContent.skills[i]||{};
    return {category:get(r,"category"),items:get(r,"items").split("\n").map(x=>x.trim()).filter(Boolean),media:old.media||[]};
  }).filter(x=>x.category||x.items.length||x.media.length);

  currentContent.education=[...document.querySelectorAll("[data-education]")].map((r,i)=>{
    const old=currentContent.education[i]||{};
    return {period:get(r,"period"),degree:get(r,"degree"),institution:get(r,"institution"),description:get(r,"description"),media:old.media||[]};
  }).filter(x=>x.degree||x.institution||x.media.length);
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
    });
  });
}

function getOwnerMedia(owner){
  if(owner==="profile")return currentContent.sectionMedia.profile;
  if(owner==="research")return currentContent.featuredResearch.media;
  if(owner==="contact")return currentContent.contact.media;
  const[type,idxs]=owner.split(":");const i=Number(idxs);
  const map={publication:"publications",project:"projects",skill:"skills",education:"education"};
  const arr=currentContent[map[type]];
  return arr?.[i]?.media;
}
function ownerFolder(owner){
  if(owner==="profile")return "profile";
  if(owner==="research")return "research";
  if(owner==="contact")return "contact";
  const type=owner.split(":")[0];
  return {publication:"publications",project:"projects",skill:"skills",education:"education"}[type]||"misc";
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
  const{error}=await sb.storage.from("site-media").upload(path,file,{upsert:false,contentType:file.type||undefined,cacheControl:"3600"});
  if(error)return setStatus("Media upload failed: "+error.message);

  const{data}=sb.storage.from("site-media").getPublicUrl(path);
  const media=getOwnerMedia(owner);
  media.push({
    id:uid(),type,url:data.publicUrl,filename:file.name,path,
    title:file.name.replace(/\.[^.]+$/,""),caption:"",uploaded_at:new Date().toISOString()
  });
  await persistContent("Media uploaded.");
  input.value="";
  fillForms();
}

async function addMediaLink(owner,editor){
  syncAllForms();
  const type=editor.querySelector("[data-media-link-type]").value;
  const url=editor.querySelector("[data-media-link-url]").value.trim();
  const title=editor.querySelector("[data-media-link-title]").value.trim();
  if(!/^https?:\/\//i.test(url))return setStatus("Media URL must start with http:// or https://");

  getOwnerMedia(owner).push({
    id:uid(),type,url,title:title||defaultLinkTitle(type),caption:"",filename:"",path:"",uploaded_at:new Date().toISOString()
  });
  await persistContent("Link added.");
  fillForms();
}
function defaultLinkTitle(type){return{video:"Video",pdf:"PDF",image:"Image",link:"Link"}[type]||"Link"}

async function removeMedia(spec){
  syncAllForms();
  const parts=spec.split(":");
  let owner,index;
  if(["profile","research","contact"].includes(parts[0])){
    owner=parts[0];index=Number(parts[1]);
  }else{
    owner=`${parts[0]}:${parts[1]}`;index=Number(parts[2]);
  }
  const media=getOwnerMedia(owner);
  const item=media?.[index];
  if(!item)return;
  if(!confirm(`Remove "${item.title||item.filename||"this attachment"}"?`))return;

  if(item.path){
    const{error}=await sb.storage.from("site-media").remove([item.path]);
    if(error)console.warn("Storage remove warning:",error.message);
  }
  media.splice(index,1);
  await persistContent("Media removed.");
  fillForms();
}

async function persistContent(successMessage){
  const{error}=await sb.from("site_content").update({content:currentContent,updated_at:new Date().toISOString()}).eq("id","main");
  if(error){setStatus("Save failed: "+error.message);return false}
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
}
function setStatus(s){$("saveStatus").textContent=s}
function esc(s){return String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#39;"}[c]))}

boot();
