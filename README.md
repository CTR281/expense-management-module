# **🧪 Frontend Assignment – Expense Management Module**

## **🎯 Context**

Your company is building a new **expense management module**.

The goal of this module is to help users **track, manage, and submit their professional expenses** in a simple and reliable way.

You are responsible for designing and implementing the first usable version of this frontend application.

A backend is available to manage expenses and categories.

---

## **🏢 Business needs**

Users should be able to:

- view their expenses
- understand the status and details of an expense
- create new expenses 
  - With unicity check, only one per user and per day. The "unicity check" endpoint is missing, you'll have to add it.
- submit an expense when it is ready
- correct or delete existing expenses (submitted expenses are not editable/deletable)

The application should feel:

- responsive
- reliable
- consistent
- and easy to extend

---

## **🧾 Expense model**

An expense represents something a user paid and wants to be reimbursed for.

Each expense has:

- a date
- an owner
- an amount and currency
- a category (transport, meal, hotel, …)

The backend also ensures that a user cannot have two expenses on the same date.

---

## **🔌 Available backend capabilities**

The backend allows to:

- list and filter expenses
- retrieve a single expense
- create, edit, delete, and submit expenses

To do:
- Add a new endpoint to check that an expense is unique per user and per day.

---

## **🧩 Your mission**

Build a small frontend application that demonstrates how you would approach this problem.

We are interested in:

- how you translate business needs into UI and flows
- how you structure the application
- how data moves through the app
- how the app behaves when data is loading, missing, or failing

The UI can stay simple. The important part is clarity and coherence.

---

## **⏱️ Constraints**

- Timebox: ~2-3 hours
- A minimal Angular workspace and a mocked backend are provided.

---

## **📦 What to deliver**

- Your source code
- A short README explaining:
    - the main user flows you chose
    - the key technical decisions you made
    - what you would improve with more time

---

## **🧠 What we will look at**

- understanding of the business problem
- ability to design meaningful user flows
- code quality and structure
- frontend engineering practices
- clarity of reasoning