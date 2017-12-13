## Summary

The Summary View provides a high level view of the performance of a Go
microservices instance. This includes core vitals such as:

* Uptime
* Average (50%) Response Time
* Error percent across all requests
* Number of Host CPUs

It also provides a line chart depicting requests over time.

![Image of the Summary View][jvmsummary]

## Routes

The Routes View is a table depicting per-route metrics for all known routes on
the microservice instance. Note that this table only shows routes that have
been requested, so it likely does not include all routes. Each route can be
clicked to open a drawer containing a line chart depicting requests over time
for that route.

![Image of the Routes View][jvmroutes]

## Threads

The Threads View is a table depicting top level metadata for each thread. Each thread can be clicked to open a drawer containing the stack trace associated with each thread.

![Image of the Threads View][jvmthreads]

## HTTP

The HTTP View is a grid showing top level metrics for HTTP or HTTPS. This includes items such as:

* Current number of active connections
* Current data transfer rate
* Total requests, responses, and status codes

![Image of the HTTP View][jvmhttp]

## JVM Runtime

The JVM Runtime View depicts line charts showing changes to the memory heap and the
number of loaded classes over time.

![Image of the Runtime View][jvmruntime]

## Finagle

The Finagle View shows high level metrics for Finagle, including timers and pending tasks.

![Image of the Finagle View][jvmfinagle]

[jvmfinagle]: ./assets/JVMFinagle.png
[jvmhttp]: ./assets/JVMHTTP.png
[jvmroutes]: ./assets/JVMRoutes.png
[jvmruntime]: ./assets/JVMRuntime.png
[jvmsummary]: ./assets/JVMSummary.png
[jvmthreads]: ./assets/JVMThreads.png
