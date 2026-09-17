# SalonBook Backend API Contract

Base URL: `/api`

All requests and responses use JSON. Dates use `YYYY-MM-DD`; times use `HH:mm` (24-hour time), for example `10:00`.

## Data models

### Service

```json
{
  "id": 1,
  "name": "Haircut",
  "price": 500,
  "duration": 30
}
```

`price` is in NPR and `duration` is in minutes.

### Appointment

```json
{
  "id": 12,
  "customer_name": "Sita Thapa",
  "customer_phone": "9808741220",
  "services": [
    { "id": 3, "name": "Facial", "price": 1500, "duration": 60 },
    { "id": 4, "name": "Hair Spa", "price": 1800, "duration": 75 }
  ],
  "appointment_date": "2026-09-18",
  "appointment_time": "11:00",
  "status": "Confirmed",
  "notes": "",
  "total_price": 3300,
  "total_duration": 135,
  "created_at": "2026-09-17T09:30:00Z"
}
```

An appointment supports one or more services. The backend should calculate `total_price` and `total_duration` from the selected services rather than trusting client-supplied totals.

## Services

### List services

`GET /api/services`

Response: `200 OK`

```json
[
  { "id": 1, "name": "Haircut", "price": 500, "duration": 30 }
]
```

### Create service

`POST /api/services`

```json
{ "name": "Manicure", "price": 1200, "duration": 45 }
```

Response: `201 Created` with the created service.

### Update service

`PUT /api/services/:id`

```json
{ "name": "Premium Manicure", "price": 1500, "duration": 60 }
```

Response: `200 OK` with the updated service.

### Delete service

`DELETE /api/services/:id`

Response: `204 No Content`.

If a service belongs to existing appointments, choose one policy and document it: reject deletion with `409 Conflict` (recommended), or retain an immutable historical service snapshot on the appointment.

## Appointments

### List appointments

`GET /api/appointments`

Optional query parameters:

- `status=Pending|Confirmed|Completed|Cancelled`
- `date=2026-09-18`
- `search=ram` — matches customer name or phone
- `page=1&page_size=20` — optional pagination

Response: `200 OK`

```json
{
  "count": 1,
  "results": [
    {
      "id": 12,
      "customer_name": "Sita Thapa",
      "customer_phone": "9808741220",
      "services": [{ "id": 3, "name": "Facial", "price": 1500, "duration": 60 }],
      "appointment_date": "2026-09-18",
      "appointment_time": "11:00",
      "status": "Confirmed",
      "notes": "",
      "total_price": 1500,
      "total_duration": 60
    }
  ]
}
```

Returning a plain array is also acceptable if pagination is not implemented initially.

### Create appointment

`POST /api/appointments`

```json
{
  "customer_name": "Sita Thapa",
  "customer_phone": "9808741220",
  "service_ids": [3, 4],
  "appointment_date": "2026-09-18",
  "appointment_time": "11:00",
  "notes": "Sensitive skin products only"
}
```

Response: `201 Created` with the complete appointment object.

### Update appointment status

`PATCH /api/appointments/:id/status`

```json
{ "status": "Confirmed" }
```

Allowed values: `Pending`, `Confirmed`, `Completed`, `Cancelled`.

Response: `200 OK` with the updated appointment.

### Delete appointment

`DELETE /api/appointments/:id`

Response: `204 No Content`.

## Required validation and errors

| Rule | Recommended response |
| --- | --- |
| Missing customer name, phone, service IDs, date, or time | `400 Bad Request` |
| `service_ids` is empty | `400 Bad Request` |
| Service does not exist | `400 Bad Request` |
| Service price is not positive | `400 Bad Request` |
| Service duration is not greater than zero | `400 Bad Request` |
| Appointment ID or service ID is unknown | `404 Not Found` |
| A selected service already has the same date and time | `409 Conflict` |
| Invalid status | `400 Bad Request` |

Example validation response:

```json
{
  "detail": "One or more selected services are already booked at this date and time.",
  "fields": { "service_ids": [3] }
}
```

## Conflict check

For every ID in `service_ids`, reject a new booking if another non-cancelled appointment contains that service ID with the same `appointment_date` and `appointment_time`.

For a future duration-aware implementation, reject overlapping time ranges for each selected service instead of only matching an identical start time.

## Suggested database structure

- `services`: `id`, `name`, `price`, `duration`, `created_at`, `updated_at`
- `appointments`: `id`, `customer_name`, `customer_phone`, `appointment_date`, `appointment_time`, `status`, `notes`, `created_at`, `updated_at`
- `appointment_services`: `appointment_id`, `service_id`

`appointment_services` provides the many-to-many relationship needed because one appointment can select multiple services.
