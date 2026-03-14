function extractResumeData(text) {

  const skills = [];
  const projects = [];

  const lowerText = text.toLowerCase();

  if (lowerText.includes("react")) {
    skills.push("React");
  }

  if (lowerText.includes("javascript")) {
    skills.push("JavaScript");
  }

  if (lowerText.includes("node")) {
    skills.push("Node.js");
  }

  if (lowerText.includes("resumecraft")) {
    projects.push("ResumeCraft");
  }

  return { skills, projects };
}

module.exports = { extractResumeData };