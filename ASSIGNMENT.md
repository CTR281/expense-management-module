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
