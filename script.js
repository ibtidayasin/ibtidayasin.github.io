const $ = id => document.getElementById(id);
const DEFAULT_CONTENT = {"name": "Ibtida Yasin", "title": "Mechanical Engineering Graduate", "institution": "Shahjalal University of Science and Technology (SUST)", "location": "Bangladesh", "focus": "Computational Materials · Molecular Dynamics · Nanomechanics", "aboutHeadline": "Mechanical engineering with an atomistic materials focus.", "aboutLead": "I am a Mechanical Engineering graduate from Shahjalal University of Science and Technology (SUST), interested in computational materials science, molecular dynamics, nanoscale mechanics, and scientific computing.", "aboutBio": "My research work focuses on atomistic simulation of compositionally graded metallic nanostructures, with emphasis on how composition, crystallographic orientation, temperature, and defects influence deformation and mechanical response.", "researchInterests": ["Computational materials science and atomistic simulation", "Molecular dynamics of metallic nanostructures", "Nanoscale deformation and plasticity", "Compositionally graded materials", "Crystallographic effects on mechanical behaviour", "Scientific computing and research data analysis"], "featuredResearch": {"title": "Radially graded Cu–Ni nanowires under tensile loading", "description": "A classical molecular dynamics study of how radial composition grading, crystallographic orientation, temperature, and surface defects influence tensile behaviour and deformation mechanisms in Cu–Ni nanowires.", "tags": ["LAMMPS", "Python", "OVITO", "PTM", "DXA", "RDF"]}, "projects": [{"title": "Atomistic Structure Generation", "description": "Python-based generation and manipulation of nanoscale structures for molecular dynamics simulations.", "meta": "Python · LAMMPS"}, {"title": "MD Data Analysis", "description": "Post-processing of simulation data, stress–strain analysis, comparison across cases, and scientific plotting.", "meta": "Python · Matplotlib"}, {"title": "Atomistic Mechanism Analysis", "description": "Structural and defect analysis using PTM, DXA, RDF, atomic strain, and visualization workflows.", "meta": "OVITO"}], "education": [{"period": "B.Sc.", "degree": "Mechanical Engineering", "institution": "Shahjalal University of Science and Technology (SUST)", "description": "Mechanical engineering education with growing focus on computational materials and atomistic simulation."}], "links": {"email": "", "linkedin": "", "github": "https://github.com/ibtidayasin", "orcid": "", "scholar": "", "cv": ""}, "photo_url": ""};

const sb = window.supabase.createClient(
  window.SUPABASE_CONFIG.url,
  window.SUPABASE_CONFIG.key
);

async function loadContent() {
  let data = DEFAULT_CONTENT;
  try {
    const { data: row, error } = await sb
      .from("site_content")
      .select("content")
      .eq("id", "main")
      .single();

    if (!error && row && row.content && Object.keys(row.content).length) {
      data = merge(DEFAULT_CONTENT, row.content);
    }
  } catch (e) {
    console.error(e);
  }
  render(data);
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

function render(data) {
  document.title = `${data.name} | Academic Profile`;
  $("brandName").textContent = data.name;
  $("name").textContent = data.name;
  $("initials").textContent = data.name.split(/\s+/).slice(0,2).map(x => x[0]).join("").toUpperCase();
  $("title").textContent = data.title;
  $("institution").textContent = data.institution;
  $("location").textContent = data.location;
  $("focus").textContent = data.focus;
  $("aboutHeadline").textContent = data.aboutHeadline;
  $("aboutLead").textContent = data.aboutLead;
  $("aboutBio").textContent = data.aboutBio;

  if (data.photo_url) {
    $("profilePhoto").src = data.photo_url;
    $("profilePhoto").classList.remove("hidden");
    $("initials").classList.add("hidden");
  } else {
    $("profilePhoto").classList.add("hidden");
    $("initials").classList.remove("hidden");
  }

  $("researchInterests").innerHTML = (data.researchInterests || []).map(x => `<li>${escapeHtml(x)}</li>`).join("");
  $("researchTitle").textContent = data.featuredResearch?.title || "";
  $("researchDescription").textContent = data.featuredResearch?.description || "";
  $("researchTags").innerHTML = (data.featuredResearch?.tags || []).map(x => `<span class="tag">${escapeHtml(x)}</span>`).join("");

  $("projectsList").innerHTML = (data.projects || []).map(p => `
    <article class="card">
      <h3>${escapeHtml(p.title)}</h3>
      <p class="muted">${escapeHtml(p.description)}</p>
      <div class="meta-line">${escapeHtml(p.meta || "")}</div>
    </article>`).join("");

  $("educationList").innerHTML = (data.education || []).map(e => `
    <div class="edu">
      <div class="period">${escapeHtml(e.period || "")}</div>
      <div>
        <h3>${escapeHtml(e.degree)}</h3>
        <p style="color:var(--accent);font-weight:700">${escapeHtml(e.institution)}</p>
        <p class="muted small">${escapeHtml(e.description || "")}</p>
      </div>
    </div>`).join("");

  const links = data.links || {};
  const defs = [
    ["Email", links.email ? `mailto:${links.email}` : ""],
    ["LinkedIn", links.linkedin],
    ["GitHub", links.github],
    ["ORCID", links.orcid],
    ["Google Scholar", links.scholar]
  ];
  $("links").innerHTML = defs
    .filter(([,url]) => !!url)
    .map(([label,url]) => `<a href="${escapeAttr(url)}" target="_blank" rel="noopener">${escapeHtml(label)} ↗</a>`)
    .join("");

  if (links.cv) {
    $("cvLink").href = links.cv;
    $("cvLink").textContent = "View CV";
    $("cvLink").classList.remove("disabled");
    $("cvLink").removeAttribute("aria-disabled");
    $("cvNote").textContent = "Download or view my current academic CV.";
  }
}

$("year").textContent = new Date().getFullYear();
loadContent();

function escapeHtml(s) {
  return String(s ?? "").replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#39;"}[c]));
}
function escapeAttr(s) {
  return escapeHtml(String(s ?? "").replace(/javascript:/gi, ""));
}
