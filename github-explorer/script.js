// script.js - GitHub Explorer
// Uses only college syllabus topics: fetch, async/await, try/catch,
// getElementById, innerHTML, template literals, addEventListener, forEach

// Holds the full list of repos so we can re-sort without re-fetching
let allRepos = [];

// Fetches a GitHub user profile and repos, then displays them
async function searchGitHub() {
  const username = document.getElementById("gh-username").value.trim();
  if (!username) {
    alert("Please enter a GitHub username.");
    return;
  }

  const loading      = document.getElementById("gh-loading");
  const errBox       = document.getElementById("gh-error");
  const profileBox   = document.getElementById("gh-profile");
  const sortControls = document.getElementById("sort-controls");
  const repoCount    = document.getElementById("repo-count");
  const repoList     = document.getElementById("repo-list");

  // Reset the UI before fetching new data
  errBox.style.display       = "none";
  profileBox.style.display   = "none";
  sortControls.style.display = "none";
  repoCount.style.display    = "none";
  errBox.textContent         = "";
  repoList.innerHTML         = "";
  allRepos                   = [];
  loading.style.display      = "block";

  try {
    // Fetch user profile from GitHub API
    const userRes = await fetch(`https://api.github.com/users/${username}`);
    if (userRes.status === 404) {
      throw new Error(`User "${username}" not found. Check the spelling.`);
    }
    const user = await userRes.json();

    // Fill in the profile card with fetched data
    document.getElementById("gh-avatar").src            = user.avatar_url;
    document.getElementById("gh-name").textContent      = user.name || user.login;
    document.getElementById("gh-bio").textContent       = user.bio || "No bio available.";
    document.getElementById("gh-followers").textContent = user.followers;
    document.getElementById("gh-following").textContent = user.following;
    document.getElementById("gh-repos").textContent     = user.public_repos;
    document.getElementById("gh-profile-link").href     = user.html_url;
    profileBox.style.display = "flex";

    // Fetch the user's public repositories
    const repoRes = await fetch(
      `https://api.github.com/users/${username}/repos?per_page=100&sort=updated`
    );
    allRepos = await repoRes.json();

    loading.style.display      = "none";
    repoCount.textContent      = `Showing ${allRepos.length} public repositories`;
    repoCount.style.display    = "block";
    sortControls.style.display = "block";
    renderRepos(allRepos);

  } catch (err) {
    loading.style.display = "none";
    if (err.message.includes("not found")) {
      errBox.textContent = err.message;
    } else {
      errBox.textContent = "Something went wrong. Check your internet connection.";
    }
    errBox.style.display = "block";
  }
}

// Builds and inserts the repo list using template literals and innerHTML
function renderRepos(repos) {
  const list = document.getElementById("repo-list");

  if (repos.length === 0) {
    list.innerHTML = "<li>No public repositories found.</li>";
    return;
  }

  list.innerHTML = repos.map(function (r) {
    return `
      <li>
        <a class="repo-name" href="${r.html_url}" target="_blank">${r.name}</a>
        <div class="repo-meta">
          <span>\u2B50 ${r.stargazers_count}</span>
          <span>\uD83C\uDF74 ${r.forks_count}</span>
          <span>\uD83D\uDCC4 ${r.language || "N/A"}</span>
        </div>
      </li>
    `;
  }).join("");
}

// Sorts fetched repos by name or star count and re-renders the list
function sortRepos() {
  const sortBy = document.getElementById("sort-select").value;
  let sorted = allRepos.filter(function () { return true; });

  if (sortBy === "name") {
    sorted.sort(function (a, b) { return a.name.localeCompare(b.name); });
  } else {
    sorted.sort(function (a, b) { return b.stargazers_count - a.stargazers_count; });
  }

  renderRepos(sorted);
}

// Apply saved theme and wire up the Enter key for search on page load
window.addEventListener("load", function () {
  loadSavedTheme();
  document.getElementById("gh-username").addEventListener("keyup", function (e) {
    if (e.key === "Enter") searchGitHub();
  });
});
