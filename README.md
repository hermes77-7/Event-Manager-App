#  Event Management Web Application

## 1. Project Presentation

This project is a **mini web application for event management** developed as part of the **TypeScript end-of-semester project**.  
The application allows users to **create events**, **view and filter them**, and **register participants** while respecting constraints such as event capacity and duplicate registrations.

The main goal of this project is to demonstrate the practical use of **TypeScript**, **Object-Oriented Programming**, and **modular code organization**, without using any frameworks or backend services.

**Technologies used:**
- TypeScript
- HTML
- CSS

---

## 2. Implemented Features

| Feature | Status |
|------|------|
| Create events | OK |
| Display full event list | OK |
| Filter events (category / date) | MISSING |
| Event detail page | OK |
| User registration | OK |
| Duplicate registration protection | OK |
| Capacity control | OK |
| Bonus (responsive / dark mode) |  OK |

---

## 3. Project Structure

event-app/
│── index.html
│── styles/
│ └── main.css
│── dist/
│ └── main.js
│── src/
│ ├── models/
│ │ ├── Event.ts
│ │ ├── User.ts
│ │ └── Registration.ts
│ └── main.ts
│── tsconfig.json
│── package.json
│── .gitignore
└── README.md


All TypeScript files are located in the `/src` folder and compiled JavaScript files are generated in `/dist`.

---

## 4. Installation & Execution

```bash
npm install
npm run build
npm start
```

---

## 5. How to Use the Application

Create an event by filling in the event form (title, description, date, location, category, and capacity).

Only admins can create events so you need to create an admin before you can modify events.

View all events on the Events page.

Register a user by entering full name and institutional email.

Registration is blocked if:

The event is already full

The user is already registered

---

## 6. Conclusion & Limitations

This project demonstrates the use of TypeScript in a real application while respecting academic constraints such as no frameworks and no backend.
The project uses object-oriented programming and modular architecture to ensure clean and maintainable code.

A limitation of the application is that all data is stored in memory, so refreshing the page clears all events and registrations.
Future improvements could include persistent storage using localStorage, enhanced UI design, and additional filtering options.

Overall, the project successfully meets the requirements defined in the assignment.

---

## 7. Author Information

Name: Biem Hermes Pride
Email: hermes.biem@saintjeaningenieur.org
ID: 2425L109
