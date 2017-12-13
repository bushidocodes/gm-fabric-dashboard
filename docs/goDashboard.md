## Summary

The Summary View provides a high level view of the performance of a Go
microservices instance. This includes core vitals such as:

* Uptime
* Average (50%) Response Time
* Error percent across all requests
* CPU and Memory Utilization

It also provides a line chart depicting requests over time.

![Image of the Summary View][gosummary]

## Routes

The Routes View is a table depicting per-route metrics for all known routes on
the microservice instance. Note that this table only shows routes that have
been requested, so it likely does not include all routes. Each route can be
clicked to open a drawer containing a line chart depicting requests over time
for that route.

![Image of the Routes View][goroutes]

## Functions

The Functions View is a table depicting per-functions metrics for all known
function on the the microservice instance. Note that this table only shows
functions that have been invoked, so it likely does not include all function.
Each function can be clicked to open a drawer containing a line chart depicting
requests over time for that route.

![Image of the Functions View][gofunctions]

## Go Runtime

The Runtime View depicts line charts showing changes to the memory heap and the
number of go-routines over time.

![Image of the Runtime View][goruntime]

[gofunctions]: ./assets/GoFunctions.png
[goroutes]: ./assets/GoRoutes.png
[goruntime]: ./assets/GoRuntime.png
[gosummary]: ./assets/GoSummary.png
