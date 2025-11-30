# AP_Project
This repo is for the final Advanced Programming Project of our college.

# 🎓 Campus Event Booker

A full-stack web application for managing and booking campus events.  
Students can discover, register, and track events, while organizers and admins can create, manage, and monitor events with ease.

---

## 📖 Overview
Campus Event Booker aims to streamline event management in a university or college setting.  
It allows **students** to browse and RSVP to events, **organizers** to create/manage events, and **admins** to oversee the system.

Built using **React, Node.js, Express, Prisma, and MySQL**.

---

## 🚀 Features

### 👩‍🎓 Students
- Browse upcoming events with search and filters  
- RSVP/register for events  
- View registered events in personal dashboard

### 🧑‍💼 Organizers
- Create, update, and delete events  
- Track attendee lists  
- Manage bookings

### 🛡️ Admins
- Approve or reject new events  
- Manage all users and events  
- Access analytics and reports (future enhancement)

---

## 🛠️ Tech Stack

- **Frontend**: React (single `src/` folder), TailwindCSS  
- **Backend**: Node.js, Express (`server.js` as entry)  
- **Database**: MySQL (via Prisma ORM)  
- **Authentication**: JWT  
- **Deployment**: Backend → Render | Frontend → Vercel/Netlify

---

## 📁 Project Structure

```
AP_Project/
│
├── prisma/                # Prisma schema & migrations
│   ├── migrations/
│   └── schema.prisma
│
├── src/                   # React frontend (components, pages, routes)
│   ├── components/
│   ├── pages/
│   ├── routes/
│   ├── styles/
│   └── index.js
│
├── server.js              # Backend entrypoint (Express)
├── package.json
├── package-lock.json
└── README.md
```

---

## 🗄️ Database Schema

```mermaid
erDiagram
  User {
    int id PK
    string name
    string email
    string password
    enum role
  }

  Event {
    int id PK
    string title
    string description
    datetime date
    string venue
    int organizerId FK
  }

  Booking {
    int id PK
    int userId FK
    int eventId FK
    string status
  }

  User ||--o{ Event : "organizes"
  User ||--o{ Booking : "makes"
  Event ||--o{ Booking : "has"
```

---

## 📦 Installation & Setup (Local)

### 1. Clone the repository
```bash
git clone https://github.com/your-username/AP_Project.git
cd AP_Project
```

### 2. Install dependencies
```bash
npm install
```

### 3. Prisma setup
```bash
npx prisma generate
# optional if database initialized:
# npx prisma migrate dev --name init
```

### 4. Environment Variables
Create a `.env` in project root:

```env
DATABASE_URL="mysql://USER:PASSWORD@HOST:3306/eventbooker"
JWT_SECRET="your-secret-key"
PORT=5000
```

### 5. Start backend
```bash
node server.js
```

### 6. Start frontend
```bash
npm start
```



## 📈 Future Enhancements
- Admin dashboard analytics  
- Notifications (Email/SMS)  
- Payment support  
- Mobile app version  

---



## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)


