const DEFAULT_CONTENT = {"name": "Ibtida Yasin", "title": "Mechanical Engineering Graduate", "institution": "Shahjalal University of Science and Technology (SUST)", "location": "Bangladesh", "focus": "Computational Materials · Molecular Dynamics · Nanomechanics", "aboutHeadline": "Mechanical engineering with an atomistic materials focus.", "aboutLead": "I am a Mechanical Engineering graduate from Shahjalal University of Science and Technology (SUST), interested in computational materials science, molecular dynamics, nanoscale mechanics, and scientific computing.", "aboutBio": "My research work focuses on atomistic simulation of compositionally graded metallic nanostructures, with emphasis on how composition, crystallographic orientation, temperature, and defects influence deformation and mechanical response.", "researchInterests": ["Computational materials science and atomistic simulation", "Molecular dynamics of metallic nanostructures", "Nanoscale deformation and plasticity", "Compositionally graded materials", "Crystallographic effects on mechanical behaviour", "Scientific computing and research data analysis"], "featuredResearch": {"title": "Radially graded Cu–Ni nanowires under tensile loading", "description": "A classical molecular dynamics study of how radial composition grading, crystallographic orientation, temperature, and surface defects influence tensile behaviour and deformation mechanisms in Cu–Ni nanowires.", "tags": ["LAMMPS", "Python", "OVITO", "PTM", "DXA", "RDF"]}, "projects": [{"title": "Atomistic Structure Generation", "description": "Python-based generation and manipulation of nanoscale structures for molecular dynamics simulations.", "meta": "Python · LAMMPS"}, {"title": "MD Data Analysis", "description": "Post-processing of simulation data, stress–strain analysis, comparison across cases, and scientific plotting.", "meta": "Python · Matplotlib"}, {"title": "Atomistic Mechanism Analysis", "description": "Structural and defect analysis using PTM, DXA, RDF, atomic strain, and visualization workflows.", "meta": "OVITO"}], "education": [{"period": "B.Sc.", "degree": "Mechanical Engineering", "institution": "Shahjalal University of Science and Technology (SUST)", "description": "Mechanical engineering education with growing focus on computational materials and atomistic simulation."}], "links": {"email": "", "linkedin": "", "github": "https://github.com/ibtidayasin", "orcid": "", "scholar": "", "cv": ""}, "photo_url": ""};
const sb = window.supabase.createClient(window.SUPABASE_CONFIG.url, window.SUPABASE_CONFIG.key);
let currentContent = structuredClone(DEFAULT_CONTENT);
const $ = id => document.getElementById(id);

async function boot() {
  const { data: { session } } = await sb.auth.getSession();
  if (session) await verifyAdminAndOpen();
  else showLogin();
}

function showLogin() {
  $("loginView").classList.remove("hidden");
  $("adminView").classList.add("hidden");
}

async function verifyAdminAndOpen() {
  const { data, error } = await sb.rpc("is_site_admin");
  if (error || data !== true) {
    await sb.auth.signOut();
    $("loginStatus").textContent = "This account is not authorized to edit the website.";
    showLogin();
    return;
  }
  $("loginView").classList.add("hidden");
  $("adminView").classList.remove("hidden");
  await loadContent();
}

$("loginBtn").addEventListener("click", async () => {
  $("loginStatus").textContent = "Signing in...";
  const email = $("loginEmail").value.trim();
  const password = $("loginPassword").value;
  const { error } = await sb.auth.signInWithPassword({ email, password });
  if (error) {
    $("loginStatus").textContent = error.message;
    return;
  }
  $("loginStatus").textContent = "";
  await verifyAdminAndOpen();
});

$("logoutBtn").addEventListener("click", async () => {
  await sb.auth.signOut();
  location.reload();
});

document.querySelectorAll("[data-tab]").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll("[data-tab]").forEach(b => b.classList.toggle("active", b === btn));
    document.querySelectorAll("[data-panel]").forEach(p => p.classList.toggle("active", p.dataset.panel === btn.dataset.tab));
  });
});

async function loadContent() {
  const { data: row, error } = await sb.from("site_content").select("content").eq("id","main").single();
  if (!error && row && row.content && Object.keys(row.content).length) {
    currentContent = merge(DEFAULT_CONTENT, row.content);
  } else {
    currentContent = structuredClone(DEFAULT_CONTENT);
  }
  fillForms();
}

function merge(base, extra) {
  if (Array.isArray(base)) return Array.isArray(extra) ? extra : base;
  if (base && typeof base === "object") {
    const out = { ...base };
    if (extra && typeof extra === "object") {
      Object.keys(extra).forEach(k => out[k] = k in base ? merge(base[k], extra[k]) : extra[k]);
    }
    return out;
  }
  return extra ?? base;
}

function fillForms() {
  $("fName").value = currentContent.name || "";
  $("fTitle").value = currentContent.title || "";
  $("fInstitution").value = currentContent.institution || "";
  $("fLocation").value = currentContent.location || "";
  $("fFocus").value = currentContent.focus || "";
  $("fAboutHeadline").value = currentContent.aboutHeadline || "";
  $("fAboutLead").value = currentContent.aboutLead || "";
  $("fAboutBio").value = currentContent.aboutBio || "";
  $("fInterests").value = (currentContent.researchInterests || []).join("\n");
  $("fResearchTitle").value = currentContent.featuredResearch?.title || "";
  $("fResearchDescription").value = currentContent.featuredResearch?.description || "";
  $("fResearchTags").value = (currentContent.featuredResearch?.tags || []).join(", ");
  $("fEmail").value = currentContent.links?.email || "";
  $("fLinkedIn").value = currentContent.links?.linkedin || "";
  $("fGitHub").value = currentContent.links?.github || "";
  $("fOrcid").value = currentContent.links?.orcid || "";
  $("fScholar").value = currentContent.links?.scholar || "";
  $("fCv").value = currentContent.links?.cv || "";
  if (currentContent.photo_url) $("photoPreview").src = currentContent.photo_url;
  else $("photoPreview").removeAttribute("src");
  renderProjectsEditor();
  renderEducationEditor();
}

function renderProjectsEditor() {
  $("projectsEditor").innerHTML = (currentContent.projects || []).map((p,i) => `
    <div class="repeat-item" data-project="${i}">
      <div class="form-grid">
        <div class="field"><label>Project title</label><input data-k="title" value="${esc(p.title)}"></div>
        <div class="field"><label>Description</label><textarea data-k="description">${esc(p.description)}</textarea></div>
        <div class="field"><label>Tools / metadata</label><input data-k="meta" value="${esc(p.meta || "")}"></div>
      </div>
      <div class="action-row"><button class="danger" data-remove-project="${i}" type="button">Remove</button></div>
    </div>`).join("");
}

function renderEducationEditor() {
  $("educationEditor").innerHTML = (currentContent.education || []).map((e,i) => `
    <div class="repeat-item" data-education="${i}">
      <div class="form-grid">
        <div class="field"><label>Period</label><input data-k="period" value="${esc(e.period || "")}"></div>
        <div class="field"><label>Degree</label><input data-k="degree" value="${esc(e.degree || "")}"></div>
        <div class="field"><label>Institution</label><input data-k="institution" value="${esc(e.institution || "")}"></div>
        <div class="field"><label>Description</label><textarea data-k="description">${esc(e.description || "")}</textarea></div>
      </div>
      <div class="action-row"><button class="danger" data-remove-education="${i}" type="button">Remove</button></div>
    </div>`).join("");
}

$("addProjectBtn").addEventListener("click", () => {
  currentContent.projects.push({title:"",description:"",meta:""});
  renderProjectsEditor();
});
$("addEducationBtn").addEventListener("click", () => {
  currentContent.education.push({period:"",degree:"",institution:"",description:""});
  renderEducationEditor();
});

document.addEventListener("click", e => {
  const rp = e.target.closest("[data-remove-project]");
  if (rp) {
    currentContent.projects.splice(Number(rp.dataset.removeProject),1);
    renderProjectsEditor();
  }
  const re = e.target.closest("[data-remove-education]");
  if (re) {
    currentContent.education.splice(Number(re.dataset.removeEducation),1);
    renderEducationEditor();
  }
});

$("saveBtn").addEventListener("click", saveAll);

async function saveAll() {
  $("saveStatus").textContent = "Saving...";
  readRepeatEditors();

  currentContent.name = $("fName").value.trim();
  currentContent.title = $("fTitle").value.trim();
  currentContent.institution = $("fInstitution").value.trim();
  currentContent.location = $("fLocation").value.trim();
  currentContent.focus = $("fFocus").value.trim();
  currentContent.aboutHeadline = $("fAboutHeadline").value.trim();
  currentContent.aboutLead = $("fAboutLead").value.trim();
  currentContent.aboutBio = $("fAboutBio").value.trim();
  currentContent.researchInterests = $("fInterests").value.split("\n").map(x=>x.trim()).filter(Boolean);
  currentContent.featuredResearch = {
    title: $("fResearchTitle").value.trim(),
    description: $("fResearchDescription").value.trim(),
    tags: $("fResearchTags").value.split(",").map(x=>x.trim()).filter(Boolean)
  };
  currentContent.links = {
    email: $("fEmail").value.trim(),
    linkedin: $("fLinkedIn").value.trim(),
    github: $("fGitHub").value.trim(),
    orcid: $("fOrcid").value.trim(),
    scholar: $("fScholar").value.trim(),
    cv: $("fCv").value.trim()
  };

  const file = $("photoFile").files[0];
  if (file) {
    if (file.size > 5 * 1024 * 1024) {
      $("saveStatus").textContent = "Photo is larger than 5 MB.";
      return;
    }
    if (!["image/jpeg","image/png","image/webp"].includes(file.type)) {
      $("saveStatus").textContent = "Use JPEG, PNG or WebP.";
      return;
    }

    const ext = file.name.split(".").pop().toLowerCase();
    const path = `profile.${ext}`;
    const { error: uploadError } = await sb.storage
      .from("profile-images")
      .upload(path, file, { upsert: true, contentType: file.type, cacheControl: "3600" });

    if (uploadError) {
      $("saveStatus").textContent = "Photo upload failed: " + uploadError.message;
      return;
    }

    const { data: publicData } = sb.storage.from("profile-images").getPublicUrl(path);
    currentContent.photo_url = publicData.publicUrl + "?v=" + Date.now();
  }

  const { error } = await sb
    .from("site_content")
    .update({ content: currentContent, updated_at: new Date().toISOString() })
    .eq("id","main");

  if (error) {
    $("saveStatus").textContent = "Save failed: " + error.message;
    return;
  }

  $("photoFile").value = "";
  if (currentContent.photo_url) $("photoPreview").src = currentContent.photo_url;
  $("saveStatus").textContent = "Saved. Your public website will show the changes immediately.";
}

function readRepeatEditors() {
  currentContent.projects = [...document.querySelectorAll("[data-project]")].map(row => ({
    title: row.querySelector('[data-k="title"]').value.trim(),
    description: row.querySelector('[data-k="description"]').value.trim(),
    meta: row.querySelector('[data-k="meta"]').value.trim()
  })).filter(x => x.title || x.description || x.meta);

  currentContent.education = [...document.querySelectorAll("[data-education]")].map(row => ({
    period: row.querySelector('[data-k="period"]').value.trim(),
    degree: row.querySelector('[data-k="degree"]').value.trim(),
    institution: row.querySelector('[data-k="institution"]').value.trim(),
    description: row.querySelector('[data-k="description"]').value.trim()
  })).filter(x => x.degree || x.institution);
}

function esc(s) {
  return String(s ?? "").replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#39;"}[c]));
}

boot();
