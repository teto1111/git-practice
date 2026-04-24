// Hands-On Activity: Student Feedback Processing System

// Set Up & Sample Data
const feedbacks = [
    { name: "Alice", rating: 5, comment: "Great course!" },
    { name: "Bob", rating: 3, comment: "Good but hard" },
    { name: "Charlie", rating: 6, comment: "Invalid rating" },
    { name: "Diana", rating: 4, comment: "" },
    { name: "Eve", rating: 2, comment: "Too slow" }
];

// Validate & Process Feedback
const validateFeedback = (feedback) => {
    if (feedback.rating >= 1 && feedback.rating <= 5 && feedback.comment.trim() !== "") {
        return { isValid: true };
    }
    return { isValid: false, error: "Invalid rating or empty comment" };
};

const processFeedbacks = (feedbacks) => {
    const valid = [];
    const invalid = [];
    
    feedbacks.forEach(feedback => {
        const result = validateFeedback(feedback);
        if (result.isValid) {
            valid.push(feedback);
        } else {
            invalid.push({ ...feedback, error: result.error });
        }
    });
    
    return { valid, invalid };
};

// Structure & Output Results
const results = processFeedbacks(feedbacks);
const summary = {
    total: feedbacks.length,
    validCount: results.valid.length,
    invalidCount: results.invalid.length,
    averageRating: results.valid.reduce((sum, f) => sum + f.rating, 0) / results.valid.length || 0
};

const resultObject = {
    summary: summary,
    validFeedbacks: results.valid,
    invalidFeedbacks: results.invalid
};

// Convert to JSON and print
const jsonResult = JSON.stringify(resultObject, null, 2);

console.log("JSON Result:", jsonResult);

// Save feedback to file using Promise
function saveFeedbackToFile(data) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const success = true;
            if (success) {
                resolve("Feedback saved successfully!");
            } else {
                reject("Failed to save feedback.");
            }
        }, 2000);
    });
}

// Call the function and handle the Promise
saveFeedbackToFile(jsonResult)
    .then(message => {
        console.log("✅", message);
    })
    .catch(error => {
        console.log("❌", error);
    });