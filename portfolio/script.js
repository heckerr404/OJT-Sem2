function generatePortfolioHTML() { /* Function to read inputs and generate the portfolio HTML string */
  var name = document.getElementById("fullName").value; /* Read the Full Name value */
  var role = document.getElementById("jobRole").value; /* Read the Job Role value */
  var email = document.getElementById("email").value; /* Read the Email value */
  var phone = document.getElementById("phone").value; /* Read the Phone value */
  var city = document.getElementById("city").value; /* Read the City value */
  var linkedin = document.getElementById("linkedinUrl").value; /* Read the LinkedIn URL value */
  var github = document.getElementById("githubUrl").value; /* Read the GitHub URL value */
  var about = document.getElementById("aboutMe").value; /* Read the About Me textarea value */
  var degree = document.getElementById("degree").value; /* Read the Degree name value */
  var college = document.getElementById("college").value; /* Read the College name value */
  var year = document.getElementById("passingYear").value; /* Read the Year of passing value */
  var cgpa = document.getElementById("cgpaOrPercentage").value; /* Read the CGPA or percentage value */
  var skillsRaw = document.getElementById("skills").value; /* Read the comma-separated skills value */
  var p1Title = document.getElementById("project1Title").value; /* Read the first project's title */
  var p1Desc = document.getElementById("project1Desc").value; /* Read the first project's description */
  var p2Title = document.getElementById("project2Title").value; /* Read the second project's title */
  var p2Desc = document.getElementById("project2Desc").value; /* Read the second project's description */
  var p3Title = document.getElementById("project3Title").value; /* Read the third project's title */
  var p3Desc = document.getElementById("project3Desc").value; /* Read the third project's description */
  var company = document.getElementById("companyName").value; /* Read the Company Name value */
  var expRole = document.getElementById("experienceRole").value; /* Read the Experience Role value */
  var expDuration = document.getElementById("experienceDuration").value; /* Read the Experience Duration value */
  var work = document.getElementById("workDone").value; /* Read the Work Done textarea value */
  var certsRaw = document.getElementById("certifications").value; /* Read the Certifications textarea value */
  var html = ""; /* Initialize the output HTML string variable */
  html += "<h1 class='preview-name'>" + name + "</h1>"; /* Add the Name as a heading to the HTML */
  html += "<div class='preview-role'>" + role + "</div>"; /* Add the Job Role below the name */
  html += "<div class='preview-contact'>Email: " + email + " | Phone: " + phone + " | City: " + city + " | LinkedIn: " + linkedin + " | GitHub: " + github + "</div>"; /* Add the contact line */
  html += "<h2 class='preview-section-title'>About Me</h2>"; /* Add the About Me section heading */
  html += "<p>" + about + "</p>"; /* Add the About Me text content */
  html += "<h2 class='preview-section-title'>Education</h2>"; /* Add the Education section heading */
  html += "<p><strong>" + degree + "</strong> from " + college + " (" + year + ") - CGPA/Percentage: " + cgpa + "</p>"; /* Add the education details */
  html += "<h2 class='preview-section-title'>Skills</h2>"; /* Add the Skills section heading */
  html += "<div class='preview-skills'>"; /* Add the opening container tag for skill badges */
  var skillsArray = skillsRaw.split(","); /* Split the comma-separated skills into an array */
  skillsArray.forEach(function(skill) { /* Loop through each skill in the array using forEach */
    html += "<span class='preview-skill-badge'>" + skill + "</span>"; /* Wrap each skill directly inside a badge span tag */
  }); /* End of skills array loop */
  html += "</div>"; /* Close the skills container tag */
  html += "<h2 class='preview-section-title'>Projects</h2>"; /* Add the Projects section heading */
  html += "<div class='preview-project-card'><h3>" + p1Title + "</h3><p>" + p1Desc + "</p></div>"; /* Add the first project card with title and description */
  html += "<div class='preview-project-card'><h3>" + p2Title + "</h3><p>" + p2Desc + "</p></div>"; /* Add the second project card with title and description */
  html += "<div class='preview-project-card'><h3>" + p3Title + "</h3><p>" + p3Desc + "</p></div>"; /* Add the third project card with title and description */
  if (company !== "") { /* Check if the company name value is not empty */
    html += "<h2 class='preview-section-title'>Experience</h2>"; /* Add the Experience section heading */
    html += "<div class='preview-project-card'><h3>" + company + " (" + expDuration + ")</h3><strong>" + expRole + "</strong><p>" + work + "</p></div>"; /* Add the experience block */
  } /* End of experience conditional block */
  if (certsRaw !== "") { /* Check if the certifications textarea value is not empty */
    html += "<h2 class='preview-section-title'>Certifications</h2>"; /* Add the Certifications section heading */
    html += "<ul>"; /* Add the opening tag for certifications list */
    var certsArray = certsRaw.split("\n"); /* Split the certifications by new line character to get array */
    certsArray.forEach(function(cert) { /* Loop through each certification using forEach */
      if (cert !== "") { /* Check if the certification line is not empty */
        html += "<li>" + cert + "</li>"; /* Wrap each certification line inside a list item tag */
      } /* End of empty line check */
    }); /* End of certifications loop */
    html += "</ul>"; /* Add the closing tag for certifications list */
  } /* End of certifications conditional block */
  return html; /* Return the generated portfolio HTML string */
} /* End of generatePortfolioHTML function */
document.getElementById("previewBtn").addEventListener("click", function() { /* Listen for click event on the preview button */
  var name = document.getElementById("fullName").value; /* Retrieve the value from the Full Name field */
  if (name === "") { /* Check if the Full Name field is completely empty */
    alert("Please enter your name first"); /* Display warning alert popup asking for name entry */
    return; /* Stop further execution of the click handler function */
  } /* End of name verification conditional block */
  var htmlContent = generatePortfolioHTML(); /* Call function to generate the HTML portfolio string */
  var previewDiv = document.getElementById("preview"); /* Retrieve the preview container element */
  previewDiv.innerHTML = htmlContent; /* Set the innerHTML of preview container to generated portfolio */
  previewDiv.className = "show"; /* Add the show class to make the preview container visible */
}); /* End of preview button click listener */
document.getElementById("downloadBtn").addEventListener("click", function() { /* Listen for click event on the download button */
  var name = document.getElementById("fullName").value; /* Retrieve the value from the Full Name field */
  if (name === "") { /* Check if the Full Name field is completely empty */
    alert("Please enter your name first"); /* Display warning alert popup asking for name entry */
    return; /* Stop further execution of the click handler function */
  } /* End of name verification conditional block */
  var htmlContent = generatePortfolioHTML(); /* Call function to generate the HTML portfolio string */
  var fullHtml = ""; /* Initialize the full HTML page string variable */
  fullHtml += "<!DOCTYPE html><html><head><meta charset='UTF-8'><title>" + name + " Portfolio</title>"; /* Open HTML document structure and head with title */
  fullHtml += "<style>"; /* Open style tag to hold standard portfolio display rules */
  fullHtml += "body { font-family: Arial, sans-serif; max-width: 700px; margin: 0 auto; padding: 20px; color: #333333; }"; /* Define basic body font and margin centering */
  fullHtml += ".preview-name { font-size: 26px; font-weight: bold; margin-bottom: 5px; color: #111111; }"; /* Define name header styling properties */
  fullHtml += ".preview-role { font-size: 18px; color: #666666; margin-bottom: 10px; }"; /* Define job role text color and margins */
  fullHtml += ".preview-contact { font-size: 13px; color: #777777; margin-bottom: 20px; border-bottom: 1px solid #e2e8f0; padding-bottom: 10px; }"; /* Define contact info row divider line */
  fullHtml += ".preview-section-title { font-size: 18px; border-bottom: 2px solid #cccccc; padding-bottom: 4px; margin-top: 20px; margin-bottom: 10px; color: #222222; font-weight: bold; }"; /* Define section divider underlines */
  fullHtml += ".preview-skills { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 15px; }"; /* Define layout style for list of skill tags */
  fullHtml += ".preview-skill-badge { background-color: #e2e8f0; color: #4a5568; padding: 5px 10px; border-radius: 15px; font-size: 12px; font-weight: bold; display: inline-block; }"; /* Define individual pill-like skill badges */
  fullHtml += ".preview-project-card { background-color: #f3f4f6; padding: 12px; border-radius: 6px; margin-bottom: 10px; border: 1px solid #e5e7eb; }"; /* Define container box for projects */
  fullHtml += "</style></head><body>"; /* Close style and head tag structures and open body */
  fullHtml += htmlContent; /* Append the dynamic portfolio content to the body */
  fullHtml += "</body></html>"; /* Close the body and html structures */
  var blob = new Blob([fullHtml], { type: "text/html" }); /* Create a new Blob file object with HTML content */
  var url = URL.createObjectURL(blob); /* Create a browser resource URL for the Blob file */
  var link = document.createElement("a"); /* Create a temporary anchor element dynamically */
  link.href = url; /* Link the anchor's target href to our Blob URL */
  link.download = name + "-portfolio.html"; /* Set the default file name for downloaded document */
  link.click(); /* Programmatically click the anchor link to launch file download */
}); /* End of download button click listener */
