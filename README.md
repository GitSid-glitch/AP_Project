# AP_Project
This repo is for the final Advanced Programming Project of our college.


# 🎓 Campus Event Booker  

A full-stack web application for managing and booking campus events.  
Students can discover, register, and track events, while organizers and admins can create, manage, and monitor events with ease.  

---

## 📖 Overview  
Campus Event Booker aims to streamline event management in a university or college setting.  
It allows **students** to browse and RSVP to events, **organizers** to create/manage events, and **admins** to oversee the system.  

Built using **Next.js, React, Node.js, Express, Prisma, and MySQL**.  

---

## 🚀 Features  

### 👩‍🎓 Students  
- Browse upcoming events with search and filters.  
- RSVP/register for events.  
- View registered events in personal dashboard.  

### 🧑‍💼 Organizers  
- Create, update, and delete events.  
- Track attendee lists and manage bookings.  

### 🛡️ Admins  
- Approve or reject new events.  
- Manage all users and events.  
- Access analytics and reports (future enhancement).  


### 🚀 Work

These features make the project functional and demo-ready:  
- **Authentication & Authorization**  
  - Sign up / login (JWT or NextAuth).  
  - Roles: Student, Organizer, Admin.  
  - Role-based access control.  
- **Event Management (CRUD)**  
  - Create, edit, delete events.  
  - Event details: title, description, date, time, venue, category.  
  - Admin approval workflow.  
- **RSVP / Booking System**  
  - Students can register for events.  
  - Event capacity handling.  
  - Prevent double booking.  
  - Student dashboard to view registered events.  
- **Event Discovery**  
  - List events with search & filter (category, date).  
  - Upcoming vs past events.  
- **Dashboards**  
  - Student: My Registered Events.  
  - Organizer: My Created Events.  
  - Admin: Manage users & events. 
---

## 🛠️ Tech Stack  

- **Frontend**: Next.js, React, TailwindCSS  
- **Backend**: Node.js, Express.js  
- **Database**: MySQL (via Prisma ORM)  
- **Authentication**: JWT  
- **Deployment**: Vercel

---

## 🗄️ Database Schema  

```mermaid
erDiagram
  User {
    int id PK
    string name
    string email
    string password
    string role
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
