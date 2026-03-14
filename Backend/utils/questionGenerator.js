function generateQuestions(data) {

  let questions = [];

  const skills = data.skills || [];
  const projects = data.projects || [];

  skills.forEach(skill => {

    if (skill === "React") {
      questions.push("What is React?");
      questions.push("Explain Virtual DOM.");
    }

    if (skill === "JavaScript") {
      questions.push("Explain closures in JavaScript.");
    }

  });

  projects.forEach(project => {
    questions.push(`Explain your project ${project}`);
  });

  return questions;
}

module.exports = { generateQuestions };