# 🧑‍💼 SkillMate — MERN + Tailwind Networking & Job Matching Platform  
**AI-powered skill-based collaboration and job-hunting platform.**

SkillMate is a full-stack MERN application designed to help users **connect with professionals**, **showcase their skills**, **find collaborators**, and **apply for jobs** — all in one place.  
It combines clean UI, real-time interactions, and AI-driven search to create a modern professional networking experience.

---

## 🚀 Features

### 👤 User Profiles
- Create and update detailed profiles  
- Add skills, bio, experience, and social links  
- Profile completion validation (ensures quality profiles)

### 🔍 AI-Powered Search (Gemini API)
- Search users by skills, roles, or usernames  
- Natural language queries (e.g., “React developers with backend experience”)  
- Fast, accurate semantic profile filtering  

### 💼 Job Posting & Applications
- Users can post job or collaboration openings with skill and role requirements  
- Other users can apply in **one click**  
- Job authors can **accept/reject** applications  
- Applicants can **withdraw** anytime  
- Track application statuses (`Pending`, `Accepted`, `Rejected`)

### 📬 Communication
- The applicants are automatically notified via email when there application is accepted.
- Used the Nodemailer library to achieve this functionality. 


### 🔐 Authentication & Security
- JWT-based authentication  
- Password hashing with bcryptjs  
- Protected routes  
- Role-based validations (only complete profiles can post/apply)
- users can not apply to there own jobs/opportunities
- Rate limiting to prevent DOS attacks

### 🎨 Clean UI with Tailwind CSS
- Modern responsive layout  
- Fast and mobile-friendly  

---

## 🛠️ Tech Stack

### Frontend
- React.js  
- Tailwind CSS  
- Axios  
- React Router  

### Backend
- Node.js  
- Express.js  
- MongoDB + Mongoose  
- JWT Authentication  
- Bcryptjs  

### AI Integration
- Gemini API (for semantic profile search)
