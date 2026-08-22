const DEFAULT_CONTENT={"name": "Ibtida Yasin", "title": "Mechanical Engineering Graduate", "institution": "Shahjalal University of Science and Technology (SUST)", "location": "Bangladesh", "focus": "Computational Materials · Molecular Dynamics · Nanomechanics", "aboutHeadline": "Mechanical engineering with an atomistic materials focus.", "aboutLead": "I am a Mechanical Engineering graduate from Shahjalal University of Science and Technology (SUST), interested in computational materials science, molecular dynamics, nanoscale mechanics, and scientific computing.", "aboutBio": "My research work focuses on atomistic simulation of compositionally graded metallic nanostructures, with emphasis on how composition, crystallographic orientation, temperature, and defects influence deformation and mechanical response.", "researchInterests": ["Computational materials science and atomistic simulation", "Molecular dynamics of metallic nanostructures", "Nanoscale deformation and plasticity", "Compositionally graded materials", "Crystallographic effects on mechanical behaviour", "Scientific computing and research data analysis"], "featuredResearch": {"title": "Radially graded Cu–Ni nanowires under tensile loading", "description": "A classical molecular dynamics study of how radial composition grading, crystallographic orientation, temperature, and surface defects influence tensile behaviour and deformation mechanisms in Cu–Ni nanowires.", "tags": ["LAMMPS", "Python", "OVITO", "PTM", "DXA", "RDF"]}, "publications": [], "projects": [{"title": "Atomistic Structure Generation", "description": "Python-based generation and manipulation of nanoscale structures for molecular dynamics simulations.", "meta": "Python · LAMMPS", "url": ""}, {"title": "MD Data Analysis", "description": "Post-processing of simulation data, stress–strain analysis, comparison across cases, and scientific plotting.", "meta": "Python · Matplotlib", "url": ""}, {"title": "Atomistic Mechanism Analysis", "description": "Structural and defect analysis using PTM, DXA, RDF, atomic strain, and visualization workflows.", "meta": "OVITO", "url": ""}], "skills": [{"category": "Simulation", "items": ["LAMMPS", "Classical molecular dynamics", "EAM potentials"]}, {"category": "Scientific Computing", "items": ["Python", "NumPy", "Matplotlib"]}, {"category": "Atomistic Analysis", "items": ["OVITO", "PTM", "DXA", "RDF"]}], "education": [{"period": "B.Sc.", "degree": "Mechanical Engineering", "institution": "Shahjalal University of Science and Technology (SUST)", "description": "Mechanical engineering education with growing focus on computational materials and atomistic simulation."}], "contact": {"headline": "Interested in computational materials and nanoscale mechanics?", "message": "I am open to research discussions, graduate opportunities, and collaborations related to computational materials science and atomistic simulation.", "email": "", "phone": "", "location": "Bangladesh"}, "links": {"linkedin": "", "github": "https://github.com/ibtidayasin", "orcid": "", "scholar": ""}, "cv": {"url": "", "filename": "", "updated_at": ""}, "photo_url": ""};
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
  if(error||data!==true){await sb.auth.signOut();$("loginStatus").textContent="This account is not authorized to edit the website.";showLogin();return}
  $("loginView").classList.add("hidden");$("adminView").classList.remove("hidden");await loadContent();
}
$("loginBtn").addEventListener("click",async()=>{
  $("loginStatus").textContent="Signing in...";
  const{error}=await sb.auth.signInWithPassword({email:$("loginEmail").value.trim(),password:$("loginPassword").value});
  if(error){$("loginStatus").textContent=error.message;return}
  $("loginStatus").textContent="";await verifyAdminAndOpen();
});
$("logoutBtn").addEventListener("click",async()=>{await sb.auth.signOut();location.reload()});

document.querySelectorAll("[data-tab]").forEach(btn=>btn.addEventListener("click",()=>{
  document.querySelectorAll("[data-tab]").forEach(b=>b.classList.toggle("active",b===btn));
  document.querySelectorAll("[data-panel]").forEach(p=>p.classList.toggle("active",p.dataset.panel===btn.dataset.tab));
}));

function merge(base,extra){
  if(Array.isArray(base))return Array.isArray(extra)?extra:base;
  if(base&&typeof base==="object"){const out={...base};if(extra&&typeof extra==="object")Object.keys(extra).forEach(k=>out[k]=k in base?merge(base[k],extra[k]):extra[k]);return out}
  return extra??base;
}
async function loadContent(){
  const{data:row,error}=await sb.from("site_content").select("content").eq("id","main").single();
  currentContent=!error&&row?.content&&Object.keys(row.content).length?merge(DEFAULT_CONTENT,row.content):structuredClone(DEFAULT_CONTENT);
  fillForms();
}

function fillForms(){
  $("fName").value=currentContent.name||"";$("fTitle").value=currentContent.title||"";$("fInstitution").value=currentContent.institution||"";
  $("fLocation").value=currentContent.location||"";$("fFocus").value=currentContent.focus||"";$("fAboutHeadline").value=currentContent.aboutHeadline||"";
  $("fAboutLead").value=currentContent.aboutLead||"";$("fAboutBio").value=currentContent.aboutBio||"";
  $("fInterests").value=(currentContent.researchInterests||[]).join("\n");$("fResearchTitle").value=currentContent.featuredResearch?.title||"";
  $("fResearchDescription").value=currentContent.featuredResearch?.description||"";$("fResearchTags").value=(currentContent.featuredResearch?.tags||[]).join(", ");
  $("fContactHeadline").value=currentContent.contact?.headline||"";$("fContactMessage").value=currentContent.contact?.message||"";
  $("fEmail").value=currentContent.contact?.email||"";$("fPhone").value=currentContent.contact?.phone||"";$("fContactLocation").value=currentContent.contact?.location||currentContent.location||"";
  $("fLinkedIn").value=currentContent.links?.linkedin||"";$("fGitHub").value=currentContent.links?.github||"";$("fOrcid").value=currentContent.links?.orcid||"";$("fScholar").value=currentContent.links?.scholar||"";
  $("fCvExternal").value="";
  if(currentContent.photo_url){$("photoPreview").src=currentContent.photo_url;$("photoPreview").classList.remove("hidden")}else{$("photoPreview").removeAttribute("src")}
  renderPublicationsEditor();renderProjectsEditor();renderSkillsEditor();renderEducationEditor();renderCvState();
}

function repeatBlock(type,i,title,fields){
  return `<div class="repeat-item" data-${type}="${i}">
    <div class="repeat-head"><strong>${esc(title)}</strong><button class="danger" data-remove="${type}:${i}" type="button">Remove</button></div>
    <div class="form-grid">${fields.map(f=>`<div class="field ${f.full?"full":""}"><label>${esc(f.label)}</label>${f.kind==="textarea"?`<textarea data-k="${f.key}">${esc(f.value||"")}</textarea>`:f.kind==="select"?`<select data-k="${f.key}">${["","Published","Accepted","In press","Submitted","Preprint","Conference"].map(o=>`<option ${o===f.value?"selected":""}>${esc(o)}</option>`).join("")}</select>`:`<input data-k="${f.key}" value="${esc(f.value||"")}">`}</div>`).join("")}</div>
  </div>`;
}
function renderPublicationsEditor(){
  $("publicationsEditor").innerHTML=(currentContent.publications||[]).map((p,i)=>repeatBlock("publication",i,`Publication ${i+1}`,[
    {label:"Title",key:"title",value:p.title,full:true},{label:"Authors",key:"authors",value:p.authors,full:true},
    {label:"Journal / Conference",key:"venue",value:p.venue},{label:"Year",key:"year",value:p.year},
    {label:"Status",key:"status",value:p.status,kind:"select"},{label:"DOI",key:"doi",value:p.doi},
    {label:"Publication URL",key:"url",value:p.url,full:true},{label:"Short note / description",key:"description",value:p.description,kind:"textarea",full:true}
  ])).join("")||`<div class="empty-state">No publications added yet.</div>`;
}
function renderProjectsEditor(){
  $("projectsEditor").innerHTML=(currentContent.projects||[]).map((p,i)=>repeatBlock("project",i,`Project ${i+1}`,[
    {label:"Project title",key:"title",value:p.title,full:true},{label:"Description",key:"description",value:p.description,kind:"textarea",full:true},
    {label:"Tools / metadata",key:"meta",value:p.meta},{label:"Project URL",key:"url",value:p.url}
  ])).join("")||`<div class="empty-state">No projects added.</div>`;
}
function renderSkillsEditor(){
  $("skillsEditor").innerHTML=(currentContent.skills||[]).map((g,i)=>repeatBlock("skill",i,`Skill group ${i+1}`,[
    {label:"Category",key:"category",value:g.category,full:true},{label:"Skills — one per line",key:"items",value:(g.items||[]).join("\n"),kind:"textarea",full:true}
  ])).join("")||`<div class="empty-state">No skill groups added.</div>`;
}
function renderEducationEditor(){
  $("educationEditor").innerHTML=(currentContent.education||[]).map((e,i)=>repeatBlock("education",i,`Education ${i+1}`,[
    {label:"Period",key:"period",value:e.period},{label:"Degree",key:"degree",value:e.degree},
    {label:"Institution",key:"institution",value:e.institution,full:true},{label:"Description",key:"description",value:e.description,kind:"textarea",full:true}
  ])).join("")||`<div class="empty-state">No education entries added.</div>`;
}
function renderCvState(){
  const cv=currentContent.cv||{};
  $("currentCvName").textContent=cv.filename|| (cv.url?"External CV link":"No CV uploaded yet.");
  $("currentCvDate").textContent=cv.updated_at?`Updated ${new Date(cv.updated_at).toLocaleString()}`:"";
  if(cv.url){$("currentCvLink").href=cv.url;$("currentCvLink").classList.remove("hidden");$("removeCvBtn").classList.remove("hidden")}
  else{$("currentCvLink").classList.add("hidden");$("removeCvBtn").classList.add("hidden")}
}

$("addPublicationBtn").addEventListener("click",()=>{currentContent.publications.push({title:"",authors:"",venue:"",year:"",status:"",doi:"",url:"",description:""});renderPublicationsEditor()});
$("addProjectBtn").addEventListener("click",()=>{currentContent.projects.push({title:"",description:"",meta:"",url:""});renderProjectsEditor()});
$("addSkillGroupBtn").addEventListener("click",()=>{currentContent.skills.push({category:"",items:[]});renderSkillsEditor()});
$("addEducationBtn").addEventListener("click",()=>{currentContent.education.push({period:"",degree:"",institution:"",description:""});renderEducationEditor()});
document.addEventListener("click",e=>{
  const b=e.target.closest("[data-remove]");if(!b)return;
  const[type,idxs]=b.dataset.remove.split(":");const i=Number(idxs);
  const map={publication:"publications",project:"projects",skill:"skills",education:"education"};
  currentContent[map[type]].splice(i,1);
  if(type==="publication")renderPublicationsEditor();if(type==="project")renderProjectsEditor();if(type==="skill")renderSkillsEditor();if(type==="education")renderEducationEditor();
});

function readRepeaters(){
  currentContent.publications=[...document.querySelectorAll("[data-publication]")].map(r=>({
    title:get(r,"title"),authors:get(r,"authors"),venue:get(r,"venue"),year:get(r,"year"),status:get(r,"status"),doi:get(r,"doi"),url:get(r,"url"),description:get(r,"description")
  })).filter(x=>x.title||x.venue);
  currentContent.projects=[...document.querySelectorAll("[data-project]")].map(r=>({title:get(r,"title"),description:get(r,"description"),meta:get(r,"meta"),url:get(r,"url")})).filter(x=>x.title||x.description);
  currentContent.skills=[...document.querySelectorAll("[data-skill]")].map(r=>({category:get(r,"category"),items:get(r,"items").split("\n").map(x=>x.trim()).filter(Boolean)})).filter(x=>x.category||x.items.length);
  currentContent.education=[...document.querySelectorAll("[data-education]")].map(r=>({period:get(r,"period"),degree:get(r,"degree"),institution:get(r,"institution"),description:get(r,"description")})).filter(x=>x.degree||x.institution);
}
function get(r,k){return(r.querySelector(`[data-k="${k}"]`)?.value||"").trim()}

$("removeCvBtn").addEventListener("click",async()=>{
  if(!confirm("Remove the current CV from your public website?"))return;
  $("saveStatus").textContent="Removing CV...";
  try{await sb.storage.from("cv-files").remove(["Ibtida_Yasin_CV.pdf"])}catch{}
  currentContent.cv={url:"",filename:"",updated_at:""};
  const{error}=await sb.from("site_content").update({content:currentContent,updated_at:new Date().toISOString()}).eq("id","main");
  $("saveStatus").textContent=error?`Remove failed: ${error.message}`:"CV removed.";renderCvState();
});

$("saveBtn").addEventListener("click",saveAll);
async function saveAll(){
  $("saveStatus").textContent="Saving...";
  readRepeaters();
  currentContent.name=$("fName").value.trim();currentContent.title=$("fTitle").value.trim();currentContent.institution=$("fInstitution").value.trim();
  currentContent.location=$("fLocation").value.trim();currentContent.focus=$("fFocus").value.trim();currentContent.aboutHeadline=$("fAboutHeadline").value.trim();
  currentContent.aboutLead=$("fAboutLead").value.trim();currentContent.aboutBio=$("fAboutBio").value.trim();
  currentContent.researchInterests=$("fInterests").value.split("\n").map(x=>x.trim()).filter(Boolean);
  currentContent.featuredResearch={title:$("fResearchTitle").value.trim(),description:$("fResearchDescription").value.trim(),tags:$("fResearchTags").value.split(",").map(x=>x.trim()).filter(Boolean)};
  currentContent.contact={headline:$("fContactHeadline").value.trim(),message:$("fContactMessage").value.trim(),email:$("fEmail").value.trim(),phone:$("fPhone").value.trim(),location:$("fContactLocation").value.trim()};
  currentContent.links={linkedin:$("fLinkedIn").value.trim(),github:$("fGitHub").value.trim(),orcid:$("fOrcid").value.trim(),scholar:$("fScholar").value.trim()};

  const photo=$("photoFile").files[0];
  if(photo){
    if(photo.size>5*1024*1024)return setStatus("Photo is larger than 5 MB.");
    if(!["image/jpeg","image/png","image/webp"].includes(photo.type))return setStatus("Profile photo must be JPEG, PNG or WebP.");
    const ext=photo.name.split(".").pop().toLowerCase(),path=`profile.${ext}`;
    const{error}=await sb.storage.from("profile-images").upload(path,photo,{upsert:true,contentType:photo.type,cacheControl:"3600"});
    if(error)return setStatus("Photo upload failed: "+error.message);
    const{data}=sb.storage.from("profile-images").getPublicUrl(path);currentContent.photo_url=data.publicUrl+"?v="+Date.now();
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
  } else if(external){
    if(!/^https?:\/\//i.test(external))return setStatus("External CV URL must start with http:// or https://");
    currentContent.cv={url:external,filename:"External CV link",updated_at:new Date().toISOString()};
  }

  const{error}=await sb.from("site_content").update({content:currentContent,updated_at:new Date().toISOString()}).eq("id","main");
  if(error)return setStatus("Save failed: "+error.message);
  $("photoFile").value="";$("cvFile").value="";$("fCvExternal").value="";
  if(currentContent.photo_url)$("photoPreview").src=currentContent.photo_url;
  renderCvState();setStatus("Saved. Your public website is updated.");
}
function setStatus(s){$("saveStatus").textContent=s}
function esc(s){return String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#39;"}[c]))}
boot();
