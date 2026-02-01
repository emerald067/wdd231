// Courses data with the new structure
const courses = [
    {
        subject: 'CSE',
        number: 110,
        title: 'Introduction to Programming',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce students to programming. It will introduce the building blocks of programming languages (variables, decisions, calculations, loops, array, and input/output) and use them to solve problems.',
        technology: ['Python'],
        completed: true
    },
    {
        subject: 'WDD',
        number: 130,
        title: 'Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course introduces students to the World Wide Web and to careers in web site design and development. The course is hands on with students actually participating in simple web designs and programming. It is anticipated that students who complete this course will understand the fields of web design and development and will have a good idea if they want to pursue this degree as a major.',
        technology: ['HTML', 'CSS'],
        completed: true
    },
    {
        subject: 'CSE',
        number: 111,
        title: 'Programming with Functions',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'CSE 111 students become more organized, efficient, and powerful computer programmers by learning to research and call functions written by others; to write, call , debug, and test their own functions; and to handle errors within functions. CSE 111 students write programs with functions to solve problems in many disciplines, including business, physical science, human performance, and humanities.',
        technology: ['Python'],
        completed: true
    },
    {
        subject: 'CSE',
        number: 210,
        title: 'Programming with Classes',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce the notion of classes and objects. It will present encapsulation at a conceptual level. It will also work with inheritance and polymorphism.',
        technology: ['C#'],
        completed: true
    },
    {
        subject: 'WDD',
        number: 131,
        title: 'Dynamic Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience in Web Fundamentals and programming. Students will learn to create dynamic websites that use JavaScript to respond to events, update content, and create responsive user experiences.',
        technology: ['HTML', 'CSS', 'JavaScript'],
        completed: true
    },
    {
        subject: 'WDD',
        number: 231,
        title: 'Frontend Web Development I',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience with Dynamic Web Fundamentals and programming. Students will focus on user experience, accessibility, compliance, performance optimization, and basic API usage.',
        technology: ['HTML', 'CSS', 'JavaScript'],
        completed: false
    }
];

// DOM Elements
const container = document.querySelector("#courses");
const totalCredits = document.querySelector("#totalCredits");
const courseDetails = document.getElementById("course-details");

// Function to display courses
function displayCourses(list) {
    container.innerHTML = "";

    list.forEach(function(course) {
        const card = document.createElement("div");
        card.className = "course-card " + (course.completed ? 'completed' : 'pending');
        
        // Generate course code from subject and number
        const courseCode = course.subject + " " + course.number;
        
        card.innerHTML = `
            <h3>${courseCode}</h3>
            <p class="course-title">${course.title}</p>
            <p class="course-desc">${course.description.substring(0, 100)}...</p>
            <div class="course-meta">
                <span class="course-credits">${course.credits} credit${course.credits !== 1 ? 's' : ''}</span>
                <span class="course-status ${course.completed ? 'completed' : 'pending'}">
                    ${course.completed ? '✓ Completed' : '○ In Progress'}
                </span>
            </div>
        `;
        
        // Add click event to show modal
        card.addEventListener("click", function() {
            displayCourseDetails(course);
        });
        
        container.appendChild(card);
    });

    // Update total credits
    const total = list.reduce(function(sum, course) {
        return sum + course.credits;
    }, 0);
    totalCredits.textContent = total;
}

// Function to display course details in modal
function displayCourseDetails(course) {

    courseDetails.innerHTML = "";
    
    // Generate course code from subject and number
    const courseCode = course.subject + " " + course.number;
    
    // Create modal content using template literals
    courseDetails.innerHTML = `
        <button id="closeModal">❌</button>
        <h2>${courseCode}</h2>
        <h3>${course.title}</h3>
        <p><strong>Credits:</strong> ${course.credits}</p>
        <p><strong>Certificate:</strong> ${course.certificate}</p>
        <p>${course.description}</p>
        <p><strong>Technologies:</strong> ${course.technology.join(', ')}</p>
    `;
    
    // Show the modal
    courseDetails.showModal();
    
    // Get the close button
    const closeModal = document.getElementById("closeModal");
    
    // Add event listener to close button
    closeModal.addEventListener("click", function() {
        courseDetails.close();
    });
    
    // Close modal when clicking outside
    courseDetails.addEventListener("click", function(event) {
        if (event.target === courseDetails) {
            courseDetails.close();
        }
    });
}

// Initialize with all courses
displayCourses(courses);

// Filter functionality
document.querySelectorAll(".filter-btn").forEach(function(btn) {
    btn.addEventListener("click", function() {
        // Remove active class from all buttons
        document.querySelectorAll(".filter-btn").forEach(function(b) {
            b.classList.remove("active");
        });
        
        // Add active class to clicked button
        btn.classList.add("active");
        
        const filter = btn.dataset.filter;
        
        // Filter courses based on selection
        let filteredCourses;
        if (filter === "all") {
            filteredCourses = courses;
        } else {
            filteredCourses = courses.filter(function(course) {
                // Use subject for filtering (CSE or WDD)
                return course.subject.toLowerCase() === filter;
            });
        }
        
        displayCourses(filteredCourses);
    });
});