# The Book Haven <img src="https://i.imgur.com/7lSK6Lp.png" alt="Bubbles" width="35" height="35" />

**A modern full-stack book management web app** where users can browse, add, edit, borrow, and manage books with a beautiful UI and smooth animations.

🔥 **Live Demo**: [https://bookhaven-client.web.app](https://bookhaven-client.web.app/)

![Book Haven Preview](https://i.imgur.com/ePLOcGT.png)  

### ✨ Key Features
- User authentication (Email/Password + Google Sign-In) via **Firebase**
- Full CRUD operations (Add, Edit, Update Quantity, Delete) for books
- Protected routes – only logged-in users can manage their books
- **My Books** page – see all books added by you
- Sort books by rating
- Animated hero banner using **Framer Motion**
- Dynamic animated logo
- Toast notifications (`React Hot Toast`) & tooltips (`React Tooltip`)
- Fully responsive design (mobile + desktop)
- Dark/Light mode ready (via DaisyUI)

### 🛠️ Tech Stack (Client Side)
| Technology          | Purpose                    |
|---------------------|----------------------------|
| React 18            | Core UI Library            |
| Vite                | Fast build tool            |
| React Router DOM v6 | Client-side routing        |
| Firebase Auth       | Authentication             |
| Axios               | HTTP requests              |
| Framer Motion       | Smooth animations          |
| Tailwind CSS + DaisyUI | Styling & components    |
| React Hot Toast     | Beautiful notifications    |
| React Tooltip       | Interactive tooltips       |
| date-fns            | Date formatting (optional) |

### Server & Database
- Backend API: Node.js + Express (deployed on Vercel)
- Database: MongoDB Atlas
- Server Repo: [https://github.com/TheLunatic1/bookhaven-server](https://github.com/TheLunatic1/bookhaven-server)

### 🚀 How to Run Locally

#### Client (Frontend)
```bash
git clone https://github.com/TheLunatic1/bookhaven-client.git
cd bookhaven-client
npm install
npm run dev
