# SalonBook — Salon Appointment Booking System

A full-stack salon appointment management application built for a technical assessment. Staff can manage services, create customer appointments, and update booking status through a responsive portal.

## Features

- Staff login: salon@gmail.com / salon
- Service management: list, add, edit, and delete
- Appointment management: list, search, filter, update status, and delete
- Public appointment booking form with multiple service selection
- Live services and appointment data from the Django API
- Loading, network, conflict, and server-validation error states
- Same-service, date, and time conflict prevention
- Summary cards for appointments, pending bookings, services, and revenue

## Tech stack

| Layer | Technology |
| --- | --- |
| Frontend | Next.js 16, React 19, TypeScript |
| Styling | Tailwind CSS 4 |
| API state | TanStack React Query |
| HTTP client | Axios |
| Backend | Django 5 function-based REST API |
| Database | SQLite |

## Repository structure

    Salon-Booking-System/
    ├── frontend/                 # Next.js application (this folder is my-app)
    │   ├── app/book/             # Public appointment booking page
    │   ├── app/dashboard/        # Staff management portal
    │   ├── app/lib/api.ts        # Axios client and API types
    │   ├── app/providers.tsx     # React Query provider
    │   └── API_ENDPOINTS.md      # API contract
    └── backend/                  # Django project
        ├── config/
        ├── api/
        ├── db.sqlite3
        └── requirements.txt

Before submitting, include both this frontend and the Django backend in the same public GitHub repository.

## Prerequisites

- Node.js 20+
- npm 10+
- Python 3.11+

## Frontend setup

1. Open the frontend directory:

       cd my-app

2. Install dependencies:

       npm install

3. Create a file named .env.local:

       NEXT_PUBLIC_API_URL=http://127.0.0.1:8000/api

   This variable is optional locally because the same URL is used as the default.

4. Start the development server:

       npm run dev

5. Open http://localhost:3000 in a browser.

## Backend setup

Run the following from the Django backend directory:

    python -m venv .venv

Activate the environment.

Windows PowerShell:

    .\.venv\Scripts\Activate.ps1

macOS / Linux:

    source .venv/bin/activate

Install dependencies, create the SQLite schema, and run the API:

    pip install -r requirements.txt
    python manage.py migrate
    python manage.py runserver

The Django server should run at http://127.0.0.1:8000, with APIs mounted under /api.

## CORS

Allow the frontend origin in Django. With django-cors-headers, add corsheaders to INSTALLED_APPS, add corsheaders.middleware.CorsMiddleware near the top of MIDDLEWARE, then configure:

    CORS_ALLOWED_ORIGINS = [
        "http://localhost:3000",
    ]

## API endpoints

| Method | Endpoint | Description |
| --- | --- | --- |
| GET | /api/services | List services |
| POST | /api/services | Create a service |
| PUT | /api/services/:id | Update a service |
| DELETE | /api/services/:id | Delete a service |
| GET | /api/appointments | List appointments |
| POST | /api/appointments | Create an appointment |
| PATCH | /api/appointments/:id/status | Update an appointment status |
| DELETE | /api/appointments/:id | Delete an appointment |

See [API_ENDPOINTS.md](./API_ENDPOINTS.md) for request/response examples and the complete API contract.

### Appointment create payload

    {
      "customer_name": "Sita Thapa",
      "customer_phone": "9808741220",
      "service_ids": [3, 4],
      "appointment_date": "2026-09-18",
      "appointment_time": "11:00",
      "notes": "Sensitive skin products only"
    }

## Database

SQLite persists all records. Run python manage.py migrate to create the database schema.

The backend should use these core tables:

- services: name, price, duration
- appointments: customer details, date, time, status, and notes
- appointment_services: an appointment/service many-to-many mapping

The join table allows one appointment to contain multiple services.

## Validation and business rules

- Customer name, phone, services, appointment date, and appointment time are required.
- A service price must be positive.
- A service duration must be greater than zero.
- Every selected service must exist.
- Allowed appointment statuses are Pending, Confirmed, Completed, and Cancelled.
- A non-cancelled appointment cannot reuse a selected service at the same date and time.

## Reviewer walkthrough

1. Start the Django backend on port 8000.
2. Start the frontend on port 3000.
3. Visit /login and sign in using salon@gmail.com and salon.
4. Create or edit salon services in the staff portal.
5. Visit /book and create a customer booking with one or more services.
6. Return to the dashboard to filter bookings, update a status, or delete an appointment.

## Available scripts

    npm run dev      # Start the development server
    npm run lint     # Run ESLint
    npm run build    # Create a production build

## Notes for reviewers

- The frontend API URL is configurable through NEXT_PUBLIC_API_URL.
- Axios handles requests and TanStack React Query handles query caching and mutation refreshes.
- The user sees relevant field/API errors instead of silent failures.
