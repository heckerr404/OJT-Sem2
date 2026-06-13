// ============================================
// STEP 1 - READ ALL FORM VALUES
// ============================================

// This function reads what the user typed in any input box
function read(id) {
  return document.getElementById(id).value;
}

// ============================================
// STEP 2 - BUILD PORTFOLIO HTML
// ============================================

// This function collects all details and makes a portfolio page
function buildPortfolio() {

  // Read personal details from the form
  var name = read("fullName");
  var role = read("jobRole");
  var email = read("email");
  var phone = read("phone");
  var city = read("city");
  var linkedin = read("linkedinUrl");
  var github = read("githubUrl");
  var about = read("aboutMe");

  // Read education details
  var degree = read("degree");
  var college = read("college");
  var year = read("passingYear");
  var cgpa = read("cgpaOrPercentage");

  // Read skills and split by comma into a list
  // Example: "HTML, CSS, JS" becomes ["HTML", "CSS", "JS"]
  var skillsList = read("skills").split(",");

  // Read project details
  var p1title = read("project1Title");
  var p1desc = read("project1Desc");
  var p2title = read("project2Title");
  var p2desc = read("project2Desc");
  var p3title = read("project3Title");
  var p3desc = read("project3Desc");

  // Read experience details
  var company = read("companyName");
  var exrole = read("experienceRole");
  var duration = read("experienceDuration");
  var work = read("workDone");

  // Read certifications
  var certs = read("certifications");

  // ============================================
  // START BUILDING THE HTML STRING
  // ============================================

  // Start with an empty string
  var html = "";

  // Add name as big heading
  html = html + "<h1>" + name + "</h1>";

  // Add job role below name
  html = html + "<p>" + role + "</p>";

  // Add contact details in one line
  html = html + "<p>" + email + " | " + phone + " | " + city + "</p>";

  // Add LinkedIn and GitHub links
  html = html + "<p>LinkedIn: " + linkedin + " | GitHub: " + github + "</p>";

  // Add a divider line
  html = html + "<hr>";

  // Add About Me section
  html = html + "<h2>About Me</h2>";
  html = html + "<p>" + about + "</p>";

  // Add Education section
  html = html + "<h2>Education</h2>";
  html = html + "<p>" + degree + " from " + college + "</p>";
  html = html + "<p>Year: " + year + " | CGPA: " + cgpa + "</p>";

  // Add Skills section
  html = html + "<h2>Skills</h2>";

  // Loop through each skill and add it as a small box
  skillsList.forEach(function (skill) {
    html = html + "<span style='background:#eee; padding:4px 10px; border-radius:10px; margin:4px; display:inline-block;'>" + skill + "</span>";
  });

  // Add Projects section
  html = html + "<h2>Projects</h2>";

  // Add project 1
  html = html + "<div style='background:#f5f5f5; padding:10px; margin-bottom:10px; border-radius:6px;'>";
  html = html + "<strong>" + p1title + "</strong>";
  html = html + "<p>" + p1desc + "</p>";
  html = html + "</div>";

  // Add project 2
  html = html + "<div style='background:#f5f5f5; padding:10px; margin-bottom:10px; border-radius:6px;'>";
  html = html + "<strong>" + p2title + "</strong>";
  html = html + "<p>" + p2desc + "</p>";
  html = html + "</div>";

  // Add project 3
  html = html + "<div style='background:#f5f5f5; padding:10px; margin-bottom:10px; border-radius:6px;'>";
  html = html + "<strong>" + p3title + "</strong>";
  html = html + "<p>" + p3desc + "</p>";
  html = html + "</div>";

  // Add Experience section ONLY if company name is filled
  if (company !== "") {
    html = html + "<h2>Experience</h2>";
    html = html + "<div style='background:#f5f5f5; padding:10px; border-radius:6px;'>";
    html = html + "<strong>" + company + " - " + exrole + "</strong>";
    html = html + "<p>Duration: " + duration + "</p>";
    html = html + "<p>" + work + "</p>";
    html = html + "</div>";
  }

  // Add Certifications ONLY if something is typed
  if (certs !== "") {
    html = html + "<h2>Certifications</h2>";
    html = html + "<ul>";

    // Split certifications by new line and add each one
    var certList = certs.split("\n");
    certList.forEach(function (cert) {
      if (cert !== "") {
        html = html + "<li>" + cert + "</li>";
      }
    });

    html = html + "</ul>";
  }

  // Return the finished HTML string
  return html;
}

// ============================================
// STEP 3 - PREVIEW BUTTON
// ============================================

// When user clicks Preview button, show portfolio on screen
document.getElementById("previewBtn").addEventListener("click", function () {

  // Check if name is empty
  if (read("fullName") === "") {
    alert("Please enter your name first!");
    return;
  }

  // Build the portfolio HTML
  var result = buildPortfolio();

  // Put the HTML inside the preview box on screen
  document.getElementById("preview").innerHTML = result;

  // Make the preview box visible
  document.getElementById("preview").className = "show";

});

// ============================================
// STEP 4 - DOWNLOAD BUTTON
// ============================================

// When user clicks Download button, save portfolio as HTML file
document.getElementById("downloadBtn").addEventListener("click", function () {

  // Check if name is empty
  if (read("fullName") === "") {
    alert("Please enter your name first!");
    return;
  }

  // Build the portfolio HTML
  var result = buildPortfolio();

  // Wrap it in a full HTML page so it works when opened in browser
  var fullPage = "<!DOCTYPE html><html><head><meta charset='UTF-8'><title>My Portfolio</title>";
  fullPage = fullPage + "<style>";
  fullPage = fullPage + "body { font-family: Arial; max-width: 700px; margin: 0 auto; padding: 20px; }";
  fullPage = fullPage + "h1 { font-size: 26px; }";
  fullPage = fullPage + "h2 { border-bottom: 1px solid #ccc; padding-bottom: 4px; margin-top: 20px; }";
  fullPage = fullPage + "hr { margin: 15px 0; }";
  fullPage = fullPage + "</style>";
  fullPage = fullPage + "</head><body>";
  fullPage = fullPage + result;
  fullPage = fullPage + "</body></html>";

  // Convert the HTML string into a downloadable file
  var blob = new Blob([fullPage], { type: "text/html" });

  // Create a temporary download link
  var link = document.createElement("a");

  // Point the link to the file
  link.href = URL.createObjectURL(blob);

  // Set the file name
  link.download = read("fullName") + "-portfolio.html";

  // Click the link automatically to start download
  link.click();

});