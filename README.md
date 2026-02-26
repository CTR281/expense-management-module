<img src="demo.gif" width="600" alt="Application demo preview" />

# Expense Management Module

This project was built to demonstrate **senior-level Angular expertise**, along with solid foundational knowledge of .NET and backend fundamentals.

It is based on a technical assignment whose primary focus was frontend architecture and design.

The backend was initially provided as part of the assignment. I extended and adapted it to support the frontend features by implementing additional routes, adjusting server configuration, and introducing the necessary API changes.

📄 Full assignment details are available [here](./ASSIGNMENT.md).

---

## Frontend

The frontend is a **Nx monorepo workspace** that features:

- Angular 20
- Tailwind CSS v4
- Standalone APIs
- Layered architecture (domain / data-access / feature separation)

Key architectural goals:

- Clear and explicit data flow
- Domain-driven separation (models vs DTOs)
- Scalability considerations

For detailed explanations about structure and data flow, see the frontend [README](./frontend/README.md).

---

### Microfrontend Alternative

An alternative version of the frontend implemented as a **Microfrontend architecture** is also provided.

This explores:

- Remote/module boundaries
- Architectural trade-offs and justification
- Enforced architectural constraints via Nx tags and ESLint

See the dedicated documentation here:  
📄 [Microfrontend Architecture README](./frontend/mfe/README.md)

---

## Backend

The backend is a **.NET 10 solution** built with:

- ASP.NET Core
- Entity Framework Core
- InMemory database (for demonstration purposes)

Its purpose is to:

- Provide a clean REST API
- Demonstrate understanding of controllers, DI, EF Core, and repository patterns
- Support the frontend architecture

Full backend details are available in its [README](./backend/README.md).
