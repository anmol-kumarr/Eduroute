
# EduRoute

EduRoute is an edtech platform that allows students and instructors to interact in a seamless environment for online courses. Students can browse courses by categories, add them to the cart, purchase courses, and track their progress via the dashboard. Instructors can upload, edit, and manage their courses with ease. The platform is built using the MERN stack (MongoDB, Express, React, Node.js) and integrated with Razorpay for secure payment processing.

## Features

### For Students:
- **Login/Signup**: Students can log in or sign up to access the platform.
- **Browse Courses by Category**: Explore various courses categorized by topics.
- **Add to Cart**: Add courses to the cart for future purchase.
- **Purchase Courses**: Buy courses securely using Razorpay integration.
- **View Purchased Courses**: Access all purchased courses in the dashboard.
- **View Cart Courses**: Track the courses added to the cart in the dashboard.
- **Dashboard**: Access all the purchased and cart courses.
- **Settings**: Update user details such as name, email, and password in the dashboard settings section.

### For Instructors:
- **Login as Instructor**: Instructors can log in and manage their course content.
- **Upload Courses**: Create new courses with detailed content.
- **Edit Courses**: Update or modify existing courses.
- **View Published or Draft Courses**: Instructors can track all their published courses or drafts saved for later.
- **Dashboard**: Manage all courses and access instructor settings.

## Pages

1. **Home**: Introduction to the EduRoute platform.
2. **About**: Information about EduRoute and its mission.
3. **Contact Us**: Page for users to contact EduRoute for inquiries or support.
4. **Catalog**: Browse and search for courses by category.
5. **Dashboard**: Personalized student or instructor dashboard to manage courses.

## Technologies Used

- **Backend**: Node.js, Express
- **Frontend**: React
- **Database**: MongoDB
- **API**: REST API
- **Payment Integration**: Razorpay
- **Authentication**: JWT-based authentication for secure login/signup

## Installation

### Prerequisites
Make sure you have the following installed on your machine:
- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/)
- [Razorpay Account](https://razorpay.com/)

### Steps to Run the Project

1. Clone the repository:
    \`\`\`bash
    git clone https://github.com/your-username/eduroute.git
    \`\`\`

2. Navigate to the project directory:
    \`\`\`bash
    cd eduroute
    \`\`\`

3. Install backend dependencies:
    \`\`\`bash
    cd backend
    npm install
    \`\`\`

4. Install frontend dependencies:
    \`\`\`bash
    cd ../frontend
    npm install
    \`\`\`

5. Set up environment variables for the backend (MongoDB, Razorpay API keys, etc.) in a .env file.

6. Start the backend server:
    \`\`\`bash
    npm run dev
    \`\`\`

7. Start the frontend development server:
    \`\`\`bash
    npm start
    \`\`\`

8. Open the application in your browser at http://localhost:3000.

## Razorpay Integration

- The payment functionality uses Razorpay's API to handle secure online payments.
- Follow Razorpay’s documentation to set up your payment gateway and acquire your API keys.



## Future Enhancements
- **Course Reviews**: Allow students to leave reviews for courses they have completed.
- **Course Recommendations**: Suggest courses to students based on their purchase history.
- **Notifications**: Notify students and instructors of new courses, updates, or deadlines.

## License
This project is licensed under the MIT License.
