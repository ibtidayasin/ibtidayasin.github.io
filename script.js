const $ = id => document.getElementById(id);

fetch("content.json")
  .then(r => {
    if (!r.ok) throw new Error("Could not load content.json");
    return r.json();
  })
  .then(data => {
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

    $("researchInterests").innerHTML = data.researchInterests.map(x => `<li>${escapeHtml(x)}</li>`).join("");
    $("researchTitle").textContent = data.featuredResearch.title;
    $("researchDescription").textContent = data.featuredResearch.description;
    $("researchTags").innerHTML = data.featuredResearch.tags.map(x => `<span class="tag">${escapeHtml(x)}</span>`).join("");

    $("projectsList").innerHTML = data.projects.map(p => `
      <article class="card">
        <h3>${escapeHtml(p.title)}</h3>
        <p class="muted">${escapeHtml(p.description)}</p>
        <div class="meta-line">${escapeHtml(p.meta || "")}</div>
      </article>`).join("");

    $("educationList").innerHTML = data.education.map(e => `
      <div class="edu">
        <div class="period">${escapeHtml(e.period || "")}</div>
        <div>
          <h3>${escapeHtml(e.degree)}</h3>
          <p style="color:var(--accent);font-weight:700">${escapeHtml(e.institution)}</p>
          <p class="muted small">${escapeHtml(e.description || "")}</p>
        </div>
      </div>`).join("");

    const linkDefs = [
      ["Email", data.links.email ? `mailto:${data.links.email}` : ""],
      ["LinkedIn", data.links.linkedin],
      ["GitHub", data.links.github],
      ["ORCID", data.links.orcid],
      ["Google Scholar", data.links.scholar]
    ];
    $("links").innerHTML = linkDefs
      .filter(([,url]) => !!url)
      .map(([label,url]) => `<a href="${escapeAttr(url)}" target="_blank" rel="noopener">${escapeHtml(label)} ↗</a>`)
      .join("");

    if (data.links.cv) {
      $("cvLink").href = data.links.cv;
      $("cvLink").textContent = "View CV";
      $("cvLink").classList.remove("disabled");
      $("cvLink").removeAttribute("aria-disabled");
    }
  })
  .catch(err => {
    console.error(err);
    document.body.insertAdjacentHTML("afterbegin", '<div style="padding:10px;background:#fee;color:#900;text-align:center">Website content failed to load.</div>');
  });

$("year").textContent = new Date().getFullYear();

function escapeHtml(s) {
  return String(s ?? "").replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#39;"}[c]));
}
function escapeAttr(s) {
  return escapeHtml(String(s ?? "").replace(/javascript:/gi, ""));
}
