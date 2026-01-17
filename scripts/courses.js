const courses = [
  { 
    code: "WDD 130", 
    name: "Web Fundamentals", 
    credits: 2, 
    completed: true, 
    type: "wdd",
    description: "Introduction to web development fundamentals including HTML, CSS, and basic web design principles."
  },
  { 
    code: "WDD 131", 
    name: "Dynamic Web Fundamentals", 
    credits: 2, 
    completed: true, 
    type: "wdd",
    description: "Building dynamic web applications with JavaScript and modern web development techniques."
  },
  { 
    code: "CSE 110", 
    name: "Intro to Programming", 
    credits: 2, 
    completed: true, 
    type: "cse",
    description: "Fundamental programming concepts including variables, control structures, and basic algorithms."
  },
  { 
    code: "CSE 111", 
    name: "Programming with Functions", 
    credits: 2, 
    completed: true, 
    type: "cse",
    description: "Advanced programming concepts focusing on functions, modules, and functional programming paradigms."
  },
  { 
    code: "WDD 231", 
    name: "Frontend Web Development I", 
    credits: 2, 
    completed: false, 
    type: "wdd",
    description: "Advanced frontend development with modern frameworks and responsive design techniques."
  },
  { 
    code: "CSE 210", 
    name: "Programming with Classes", 
    credits: 2, 
    completed: true, 
    type: "cse",
    description: "Object-oriented programming concepts including classes, inheritance, and polymorphism."
  }
];

const container = document.querySelector("#courses");
const totalCredits = document.querySelector("#totalCredits");

function displayCourses(list) {
  container.innerHTML = "";

  list.forEach(course => {
    const card = document.createElement("div");
    card.className = `course-card ${course.completed ? 'completed' : 'pending'}`;
    
    card.innerHTML = `
      <h3>${course.code}</h3>
      <p class="course-title">${course.name}</p>
      <p class="course-desc">${course.description}</p>
      <div class="course-meta">
        <span class="course-credits">${course.credits} credit${course.credits !== 1 ? 's' : ''}</span>
        <span class="course-status ${course.completed ? 'completed' : 'pending'}">
          ${course.completed ? '✓ Completed' : '○ In Progress'}
        </span>
      </div>
    `;
    
    container.appendChild(card);
  });

  // Update total credits
  const total = list.reduce((sum, course) => sum + course.credits, 0);
  totalCredits.textContent = total;
}

// Initialize with all courses
displayCourses(courses);

// Filter functionality
document.querySelectorAll(".filter-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    // Remove active class from all buttons
    document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
    
    // Add active class to clicked button
    btn.classList.add("active");
    
    const filter = btn.dataset.filter;
    
    // Filter courses based on selection
    let filteredCourses;
    if (filter === "all") {
      filteredCourses = courses;
    } else {
      filteredCourses = courses.filter(course => course.type === filter);
    }
    
    displayCourses(filteredCourses);
  });
});