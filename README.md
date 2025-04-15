# ✅ To-Do List — Test Task

A simple and clean to-do list app built with **Angular 19**, **Signals**, and **Standalone Components**.

## 📋 Task Requirements

**Goal:**  
Create a web app that allows users to manage a list of tasks.

**Features implemented:**

- ✅ Add new todos
- ✅ Mark todos as completed
- ✅ Delete todos
- ✅ Edit existing todos
- ✅ Filter todos:
  - by **completion status** (All / Completed / Incomplete)
  - by **priority** (Low / Mid / High / All)
  - by **search keyword**
- ✅ Sort todos by:
  - **Title** (search)
  - **Priority**
- ✅ Responsive layout
- ✅ Debounced search input
- ✅ Simulated backend interaction using [JSONPlaceholder](https://jsonplaceholder.typicode.com/)
- ✅ All todos stored in `localStorage` for persistence

## 🧠 Tech Stack

- Angular 19 with Signals
- Standalone components
- RxJS (for debounced search)
- SCSS modules
- LocalStorage for todo persistence
- Typed models and clean architecture

## ⚠️ Notes

- JSONPlaceholder is used for simulating backend interaction.
- Data is not persisted on the server; therefore, all todos are stored locally.
- Pagination was **not implemented**, as it was not part of the test task description. However, it can be easily added if needed.

## 🚀 How to Run

```bash
npm install
ng serve


