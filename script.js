// Activity 1 — Git Workflow Simulation
// Goal: Practice destructuring, using Arrow Functions, using spread operators, 
// convert to Promises, and handle errors

// 1. IMPROVE THE CODE
// Using destructuring, arrow functions, template literals, and spread operator

// Original data (simulating user data)
const user = {
    name: "John Doe",
    age: 25,
    skills: ["JavaScript", "HTML", "CSS"],
    location: "New York"
};

// Arrow function with destructuring - FIXED to avoid duplicate logs
const displayUserInfo = ({ name, age, skills, location }) => {
    // Using template literals for better string formatting
    console.log(`📋 User Information:
    Name: ${name}
    Age: ${age}
    Location: ${location}
    Skills: ${skills.join(", ")}`);
};

// Arrow function to add new skill using spread operator
const addNewSkill = (user, newSkill) => {
    // Using spread operator to create new array with added skill
    const updatedSkills = [...user.skills, newSkill];
    
    // Using spread operator to create new user object
    return {
        ...user,
        skills: updatedSkills,
        updatedAt: new Date().toISOString()
    };
};

// Display initial user info - FIXED to show only once
console.log("=== Initial User Info ===");
displayUserInfo(user);

// Add a new skill using spread operator
const updatedUser = addNewSkill(user, "React");
console.log("\n=== After Adding New Skill ===");
displayUserInfo(updatedUser);

// 2. REPLACE THE CALLBACK WITH A PROMISE
// Simulating an asynchronous operation (like fetching user data from server)

const fetchUserData = (userId) => {
    return new Promise((resolve, reject) => {
        console.log(`\n🔄 Fetching data for user ID: ${userId}...`);
        
        // Simulating network delay
        setTimeout(() => {
            // Simulated user data from database
            const userData = {
                id: userId,
                name: "Jane Smith",
                age: 28,
                skills: ["Python", "Django", "PostgreSQL"],
                location: "San Francisco",
                email: "jane.smith@example.com"
            };
            
            resolve(userData);
        }, 2000);
    });
};

// Using the Promise
const loadUserData = async (userId) => {
    try {
        const userData = await fetchUserData(userId);
        console.log("✅ User data loaded successfully!");
        displayUserInfo(userData);
        return userData;
    } catch (error) {
        console.error("❌ Failed to load user data:", error.message);
        throw error;
    }
};

// 3. ADD ERROR HANDLING
// Function that simulates an API call with potential errors

const fetchUserWithErrorHandling = (userId, shouldFail = false) => {
    return new Promise((resolve, reject) => {
        console.log(`\n🔄 Attempting to fetch user ${userId}...`);
        
        setTimeout(() => {
            // Simulate network error or invalid user ID
            if (shouldFail || userId < 0) {
                reject(new Error(`Invalid user ID: ${userId}. User ID must be a positive number.`));
            } else if (userId > 100) {
                reject(new Error(`User ID ${userId} not found in database.`));
            } else {
                const userData = {
                    id: userId,
                    name: "Michael Johnson",
                    age: 32,
                    skills: ["Java", "Spring Boot", "MongoDB"],
                    location: "Austin",
                    bio: "Full-stack developer with 5 years of experience"
                };
                resolve(userData);
            }
        }, 1500);
    });
};

// Enhanced user profile update with validation
const updateUserProfile = async (userId, updates) => {
    // Input validation with destructuring
    if (!userId || userId <= 0) {
        throw new Error("Invalid user ID provided");
    }
    
    if (!updates || typeof updates !== 'object') {
        throw new Error("Invalid updates object provided");
    }
    
    return new Promise((resolve, reject) => {
        console.log(`\n🔄 Updating profile for user ${userId}...`);
        
        setTimeout(() => {
            try {
                // Simulate successful update
                const { name, age, skills, location } = updates;
                const updatedProfile = {
                    id: userId,
                    name: name || "Anonymous",
                    age: age || 0,
                    skills: skills ? [...skills] : [],
                    location: location || "Unknown",
                    lastUpdated: new Date().toLocaleString()
                };
                
                // Validate age
                if (age && (age < 0 || age > 150)) {
                    reject(new Error("Invalid age value. Age must be between 0 and 150."));
                } else {
                    console.log("✅ Profile updated successfully!");
                    resolve(updatedProfile);
                }
            } catch (error) {
                reject(new Error(`Failed to update profile: ${error.message}`));
            }
        }, 1000);
    });
};

// DEMONSTRATION FUNCTION - CLEAN VERSION
const runDemo = async () => {
    console.clear(); // Clear console for clean output
    console.log("🚀 Starting Git Workflow Simulation Demo\n");
    console.log("═══════════════════════════════════════\n");
    
    // Part 1: Destructuring, Arrow Functions, Spread Operator
    console.log("📌 PART 1: Destructuring, Arrow Functions & Spread Operator");
    console.log("───────────────────────────────────────────────────────");
    
    // Reset to original user for demo
    const demoUser = {
        name: "John Doe",
        age: 25,
        skills: ["JavaScript", "HTML", "CSS"],
        location: "New York"
    };
    
    console.log("Original User:");
    displayUserInfo(demoUser);
    
    const userWithNewSkill = addNewSkill(demoUser, "TypeScript");
    console.log("\n✨ After adding TypeScript skill:");
    displayUserInfo(userWithNewSkill);
    
    // Part 2: Promise Example
    console.log("\n\n📌 PART 2: Promise Example (Async User Fetch)");
    console.log("─────────────────────────────────────────────");
    await loadUserData(42);
    
    // Part 3: Error Handling Examples
    console.log("\n\n📌 PART 3: Error Handling Examples");
    console.log("────────────────────────────────");
    
    // Example 1: Successful fetch
    console.log("\n✅ Example 1: Successful fetch (User ID: 5)");
    try {
        const user1 = await fetchUserWithErrorHandling(5, false);
        console.log(`   ✓ Successfully loaded: ${user1.name} (Age: ${user1.age})`);
    } catch (error) {
        console.error(`   ✗ Error: ${error.message}`);
    }
    
    // Example 2: Failed fetch (invalid ID)
    console.log("\n❌ Example 2: Failed fetch with negative ID (-1)");
    try {
        const user2 = await fetchUserWithErrorHandling(-1, false);
        console.log(`   Success: ${user2}`);
    } catch (error) {
        console.error(`   ✓ Error caught correctly: ${error.message}`);
    }
    
    // Example 3: Failed fetch (non-existent user)
    console.log("\n❌ Example 3: Failed fetch with non-existent ID (150)");
    try {
        const user3 = await fetchUserWithErrorHandling(150, false);
        console.log(`   Success: ${user3}`);
    } catch (error) {
        console.error(`   ✓ Error caught correctly: ${error.message}`);
    }
    
    // Example 4: Profile update with validation
    console.log("\n📝 Example 4: Profile Update with Validation");
    try {
        const updatedProfile = await updateUserProfile(10, {
            name: "Alice Wonderland",
            age: 25,
            skills: ["React", "Node.js", "GraphQL"],
            location: "Seattle"
        });
        console.log(`   ✓ Profile updated successfully!`);
        console.log(`     Name: ${updatedProfile.name}`);
        console.log(`     Age: ${updatedProfile.age}`);
        console.log(`     Skills: ${updatedProfile.skills.join(", ")}`);
        console.log(`     Location: ${updatedProfile.location}`);
    } catch (error) {
        console.error(`   ✗ Update failed: ${error.message}`);
    }
    
    // Example 5: Failed update (invalid age)
    console.log("\n⚠️ Example 5: Failed Update with Invalid Age (200)");
    try {
        const invalidUpdate = await updateUserProfile(10, {
            name: "Bob Builder",
            age: 200,
            skills: ["HTML", "CSS"]
        });
        console.log(`   Success: ${invalidUpdate}`);
    } catch (error) {
        console.error(`   ✓ Validation error caught: ${error.message}`);
    }
    
    console.log("\n\n🎉 Demo Completed Successfully!");
    console.log("═══════════════════════════════════════");
    console.log("\n💡 Summary of concepts demonstrated:");
    console.log("   ✓ Destructuring - Extracting object properties");
    console.log("   ✓ Arrow Functions - Concise function syntax");
    console.log("   ✓ Template Literals - Enhanced string formatting");
    console.log("   ✓ Spread Operator - Copying/merging arrays & objects");
    console.log("   ✓ Promises - Handling async operations");
    console.log("   ✓ Error Handling - Try/catch with meaningful messages");
};

// Export functions for use in HTML (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        displayUserInfo,
        addNewSkill,
        fetchUserData,
        fetchUserWithErrorHandling,
        updateUserProfile,
        runDemo
    };
}

// Auto-run demo when script loads (for browser environment)
if (typeof window !== 'undefined') {
    // Wait for page to load
    window.addEventListener('DOMContentLoaded', () => {
        // Small delay to ensure everything is ready
        setTimeout(() => {
            runDemo().catch(console.error);
        }, 100);
        
        // Add click handler for the demo button
        const demoButton = document.getElementById('runDemo');
        if (demoButton) {
            demoButton.addEventListener('click', () => {
                runDemo().catch(console.error);
            });
        }
    });
}