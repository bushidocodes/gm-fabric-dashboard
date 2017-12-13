## Dashboard

Services Dashboard View is a view of all microservices, both Go and JVM microservices. By default, services are displayed in Card View. User can toggle between Card and List View by clicking Card and List buttons on toolbar.

![Image of the Dashboard View][servicesdashboard]

## Card View

Card View is a view of all microservices in cards format. Cards can be grouped by Owner, Status, Capability, or None. Cards can then be sorted by Name and Status.

![Image of the Card View][dashboardcard]

## Anatomy of a Card

Each Card represents a microservice. Card contains service name, JVM or GO service identifier, service version and document icon link. Clicking on service name directs user to Service View of the selected service. Clicking on document icon opens linked document of the selected service in a new window. If a service is down or unauthorized, service is not selectable.

![Image of the Individual Card][individualcard]

## List View

List View is a view of all microservices in table format. Each row represents a microservice. List contains service name, JVM or GO service identifier, service version and document icon link. Clicking on service name directs user to Service View of the selected service. Clicking on document icon opens linked document of the selected service in a new window. If a service is down or unauthorized, service is not selectable. Lists can be grouped by Owner, Status, Capability, or None. Lists can then be sorted by Name and Status.

![Image of the List View][dashboardlist]

[servicesdashboard]: ./assets/ServicesDashboard.png
[dashboardcard]: ./assets/DashboardCard.png
[individualcard]: ./assets/IndividualCard.png
[dashboardlist]: ./assets/DashboardList.png
