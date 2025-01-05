# 🌟 Secure Authentication System with Node.js, Next.js, and TypeScript 🌟

Welcome to our open-source project, a comprehensive **authentication system** designed with modern technologies to deliver a **secure**, **production-ready** experience. Whether you're building a small-scale app or a large enterprise application, this project provides a robust foundation for authentication, authorization, and session management.

---

### 🚀 **Project Overview**
We’re crafting an authentication system that integrates seamlessly with **React** or **Next.js** applications while ensuring top-notch security. From implementing **Two-Factor Authentication (2FA)** to **Rate Limiting**, this project covers all the essentials to keep your app and users safe.

---

### 🗝️ **Key Features**
- 🗄️ **Database Setup:** Efficient and scalable structure for user data.
- 🔐 **Signup Endpoint:** Secure user registration with validation.
- 📧 **Email Verification:** Verify users with beautifully designed templates.
- 🔑 **Login Endpoint:** Enable secure login with advanced security measures.
- 🔄 **Forgot & Reset Password:** Hassle-free password recovery.
- 🛡️ **Access & Refresh Tokens:** Token-based authentication for session security.
- 🖥️ **Session Management & Logout:** Manage and terminate active user sessions effectively.
- 📲 **2FA Setup & Verification:** Add an extra layer of security with two-factor authentication.
- 📉 **Rate Limiting:** Protect endpoints against brute-force attacks.
- 🛠️ **Passport JWT Integration:** Simplify authentication with JSON Web Tokens.
- 🗂️ **Production-Ready Structure:** Scalable and maintainable project structure.
- 🌐 **Frontend Setup:** Fully integrated with **Next.js** and **TailwindCSS**.

---

### 🖥️ **Frontend Features**
- 📋 **Signup & Login Page UI:** Intuitive and user-friendly design.
- ✅ **Email Verification UI:** Clear and concise instructions for account activation.
- 🔒 **Protected Routes:** Secure your app with role-based route protection.
- 🏠 **Dashboard Page:** A functional and secure user dashboard.
- 📲 **2FA Implementation:** Simple steps for setting up and verifying 2FA.
- 🖥️ **Session Management UI:** Track and manage active user sessions.
- 🚪 **Logout:** Ensure secure and complete session termination.
- 💡 **Light & Dark Mode:** Tailored for a seamless user experience.

---

### 🌐 **Technologies Used**
- **Backend:** Node.js, TypeScript, Passport JWT, Render.com deployment.
- **Frontend:** Next.js, React, TailwindCSS, Shadcn UI.
- **Others:** Resend (email service), React Query (data fetching).

---

### 🗃️ **Resources**
🔗 [Next.js](https://nextjs.org/)  
🔗 [Resend](https://resend.com/)  
🔗 [React Query](https://tanstack.com/query/latest)  
🔗 [TailwindCSS](https://tailwindcss.com/)  
🔗 [Shadcn UI](https://ui.shadcn.com/docs/installation)  

---

### 💻 **Why Contribute?**
This project is in its **early stages**, making it the perfect opportunity for developers to contribute, learn, and grow. Whether you’re an experienced developer or a beginner, we welcome you to help us build a **world-class authentication system**.

---

### 📝 **License**

This project is licensed under the **AGPL-3.0 License**.

- You are allowed to use, modify, and distribute the project under the terms of the AGPL-3.0 license.

- If you use this software in a networked environment, you must make the source code available to the users.

- See the full license details in the [LICENSE](https://github.com/B1TSH3LL/Codex3102/blob/master/LICENSE) file.


---

### 🤝 **Get Involved**
- Fork the repository and start contributing.
- Share ideas, report bugs, or request features via issues.
- Join our growing community of open-source enthusiasts!

---

### 🚀 **Installation Process**
1. **Clone the Repository**  
   Clone the repository to your local machine by running:

   ```
   git clone https://github.com/your-username/your-repository-name.git
   ```
2. **Backend Setup**

   Navigate to the backend folder:
   ```
   cd backend
   npm install
   ```
   Create a .env file in the backend folder and add the required environment variables:
   ```
   PORT=8000
   NODE_ENV=development
   MONGO_URI=""
   APP_ORIGIN="http://localhost:3000"
   JWT_SECRET=""
   JWT_EXPIRES_IN="15m"
   JWT_REFRESH_SECRET=""
   JWT_REFRESH_EXPIRES_IN="30d"
   RESEND_API_KEY=""
   MAILER_SENDER="onboarding@resend.dev"
   ```
   Run the backend server:
   ```
   npm run dev
   ```
   The backend server will be running at http://localhost:8000 (or your configured port).



3. **Frontend Setup**

   Navigate to the frontend folder:
   ```
   cd frontend
   npm install
   ```
   Create a .env file in the frontend folder and add the required environment variables:
   ```
   NEXT_PUBLIC_API_BASE_URL="http://localhost:8000/api/v1"
   ```
   Run the frontend:
   ```
   npm run dev
   ```
   The frontend application will be running at http://localhost:3000
 
---

### 🔥 Let’s build something incredible, together! 🚀
