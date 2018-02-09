export default {
  "en-US": {
    explorer: {
      selectMetric: "Select a metric to display"
    },
    fabric: {
      capability: "Capability",
      error: "No Services Found",
      name: "Name",
      none: "None",
      owner: "Owner",
      searchPlaceholder: "Search Services",
      status: "Status"
    },
    fabricHeaderContent: {
      allServices: "All Services",
      down: "Down",
      services: "Services",
      stable: "Stable",
      summary: "Summary",
      warning: "Warning"
    },
    fabricMicroservices: {
      disableFetchError:
        "Automatically disabling the fetching of Fabric microservices after three attempts.",
      fetchError: "Fetching Fabric Microservices failed"
    },
    fabricRouter: {
      noInstance:
        "{instanceID} is not a known instance of {serviceName} {serviceVersion}",
      noMetrics:
        "{serviceName} {serviceVersion} does not have metrics to display",
      noService: "{serviceSlug} is not a known microservice",
      notAuthorized:
        "You are not authorized to view {serviceName} {serviceVersion}"
    },
    footer: {
      copyright:
        "Copyright &copy; 2018 Decipher Technology Studios. All rights reserved. <br /> Copyright &copy; 2018 Grey Matter, a Decipher Technology Studios product. All rights reserved."
    },
    functionsGrid: {
      error: "No Functions Found",
      errorPercent: "Error %",
      function: "Function",
      latency50: "Latency 50%",
      latency99: "Latency 99%",
      requests: "Requests",
      searchPlaceholder: "Search Functions"
    },
    GMLineChart: {
      noChartableData: "No Chartable Data",
      noMetricsFound: "Could not find the following metrics:",
      screenReaderGraphDescription: {
        withData:
          "A tabular representation of the {title} chart data: median {median} average {average} mode {mode} maximum {max} minimum {min} number of observations {dataPoints} complete data time series follows {timeSeries}",
        noData: "The average for currently displayed data is equal to 0."
      }
    },
    GMServiceTableLineItem: {
      tooltip: "This microservice instance does not have metrics to display."
    },
    goHeaderContent: {
      explorer: "Explorer",
      functions: "Functions",
      requests: "Requests",
      routes: "Routes",
      summary: "Summary",
      uptime: "Uptime"
    },
    inspector: {
      hideStaticMetric: "Hide all static metrics",
      hideZeroMetric: "Hide all metrics with only zero values",
      searchAriaLabel: "Search All Metrics",
      searchPlaceholder: "Search"
    },
    instanceMetricsUtils: {
      disableFetchError:
        "Automatically disabling the fetching of metrics after three attempts. You can turn polling back on in Settings.",
      fetchError: "Fetching Metrics failed"
    },
    jvmHeaderContent: {
      explorer: "Explorer",
      requests: "Requests",
      routes: "Routes",
      summary: "Summary",
      threads: "Threads",
      uptime: "Uptime"
    },
    pollingSettings: {
      button: {
        pause: "Pause Polling",
        resume: "Resume Polling"
      },
      pollingIntervals: "Polling Interval(s)"
    },
    routesGrid: {
      error: "No Routes Found",
      errorPercent: "Error %",
      latency50: "Latency 50%",
      latency99: "Latency 99%",
      route: "Route",
      requests: "Requests",
      searchPlaceholder: "Search Routes"
    },
    serviceView: {
      error: "No Instances Found",
      name: "Name",
      searchPlaceholder: "Search Instances",
      uptime: "Uptime"
    },
    serviceHeaderContent: {
      instances: "Instances"
    },
    settingsGrid: {
      cacheSize: "Cache Size",
      clearCache: "Clear Cache",
      fabricPolling: "Fabric Polling",
      instancePolling: "Instance Polling",
      metricsCache: "Metrics Cache",
      modal: {
        question:
          "Are you sure that you want to clear the cached metrics data?",
        secondary: "This action cannot be undone."
      },
      polling: "Polling",
      tooltip: "Select an instance to turn on polling"
    },
    summary: {
      errorRate: "Error Rate",
      hostCPUCores: "Host CPU Cores",
      hostCPUUsage: "Host CPU Utilized",
      hostCPUUsageDetail:
        "{count, plural, one {# Core on Host} other {#  Cores on Host}}",
      memoryUsage: "Memory Utilized",
      memoryUsageDetail: "{hostMemoryAvail} Free on Host",
      requestsPerSecond: "Requests Per Second",
      responseTime: "Avg. Response Time",
      statistics: "Statistics",
      uptime: "Uptime",
      vitals: "Vitals"
    },
    table: {
      errorPercent: "Error %",
      function: "Function",
      instance: "Instance",
      latency: "Latency",
      requests: "Requests",
      requestsSec: "Requests/sec",
      route: "Route",
      uptime: "Uptime"
    },
    tableColLatencyHeader: {
      latency: "Latency",
      latency50: "50%",
      latency99: "99%",
      tooltip:
        "Latency 50% refers to the average latency of the 50% percentile, while Latency 99% is the average latency for the slowest 1% of responses, also known as tail latency."
    },
    tableLineItem: {
      requests: "Requests over Time for {item}"
    },
    tableToolbar: {
      cards: "Cards",
      group: "Group",
      list: "List",
      sort: "Sort"
    },
    threadsGrid: {
      errorFetchFail: "Failed to Fetch Threads",
      errorNotFound: "No Threads Found",
      id: "ID",
      name: "Name",
      none: "None",
      searchPlaceholder: "Search Threads",
      state: "State"
    },
    threadsTableHeader: {
      daemon: "Daemon",
      id: "ID",
      name: "Name",
      priority: "Priority",
      state: "State"
    }
  },
  "es-ES": {
    explorer: {
      selectMetric: "Seleccione una métrica para mostrar"
    },

    fabric: {
      capability: "Capacidad",
      error: "No se encontraron servicios",
      name: "Nombre",
      none: "Ninguna",
      owner: "Propietario",
      searchPlaceholder: "Servicios de búsqueda",
      status: "Estado"
    },
    fabricHeaderContent: {
      allServices: "Todos los servicios",
      down: "Abajo",
      services: "Servicios",
      stable: "Estable",
      summary: "Resumen",
      warning: "Advertencia"
    },
    fabricMicroservices: {
      disableFetchError:
        "Deshabilitar automáticamente la obtención de microservicios Fabric después de tres intentos.",
      fetchError: "Ir a buscar los microservicios de Fabric fallaron"
    },
    fabricRouter: {
      noInstance:
        "{instanceID} no es una instancia conocida de {serviceName} {serviceVersion}",
      noMetrics:
        "{serviceName} {serviceVersion} no tiene métricas para mostrar",
      noService: "{serviceSlug} no es un microservicio conocido",
      notAuthorized:
        "No tienes autorización para ver {serviceName} {serviceVersion}"
    },
    footer: {
      copyright:
        "Copyright &copy; 2018 Decipher Technology Studios. Todos los derechos reservados. <br /> Copyright &copy; 2018 Gray Matter, un producto de Decipher Technology Studios. Todos los derechos reservados."
    },
    functionsGrid: {
      error: "No se encontraron funciones",
      errorPercent: "Error %",
      function: "Función",
      latency50: "Latencia 50%",
      latency99: "Latencia 99%",
      requests: "Peticiones",
      searchPlaceholder: "Funciones de búsqueda"
    },
    GMLineChart: {
      noChartableData: "Sin datos de chartable",
      noMetricsFound: "No se pudieron encontrar las siguientes métricas:",
      screenReaderGraphDescription: {
        withData:
          "Una representación tabular de los datos del gráfico {title}: mediano {median} promedio {average} modo {mode} máximo {max} mínimo {min} número de observaciones {dataPoints} series de datos completas seguidas {timeSeries}",
        noData: "El promedio de los datos mostrados actualmente es igual a 0."
      }
    },
    GMServiceTableLineItem: {
      tooltip: "Esta instancia de microservicio no tiene métricas para mostrar."
    },
    goHeaderContent: {
      explorer: "Explorador",
      functions: "Funciones",
      requests: "Peticiones",
      routes: "Rutas",
      summary: "Resumen",
      uptime: "Tiempo de Actividad"
    },
    inspector: {
      hideStaticMetric: "Ocultar todas las métricas estáticas",
      hideZeroMetric: "Ocultar todas las métricas con solo valores cero",
      searchAriaLabel: "Buscar todas las métricas",
      searchPlaceholder: "Buscar"
    },
    instanceMetricsUtils: {
      disableFetchError:
        "Deshabilitar automáticamente la obtención de métricas después de tres intentos. Puede volver a activar el sondeo en Configuración.",
      fetchError: "Falló la obtención de métricas"
    },
    jvmHeaderContent: {
      uptime: "Tiempo de Actividad",
      summary: "Resumen",
      requests: "Peticiones",
      routes: "Rutas",
      threads: "Trapos",
      explorer: "Explorador"
    },
    pollingSettings: {
      button: {
        pause: "Pausa de Votación",
        resume: "Reanudar de Votación"
      },
      pollingIntervals: "Intervalos de Votación"
    },
    routesGrid: {
      error: "No se encontraron rutas",
      errorPercent: "Error %",
      latency50: "Latencia 50%",
      latency99: "Latencia 99%",
      route: "Ruta",
      requests: "Peticiones",
      searchPlaceholder: "Rutas de búsqueda"
    },
    serviceView: {
      error: "No se encontraron instancias",
      name: "Nombre",
      searchPlaceholder: "Instancias de búsqueda",
      uptime: "Tiempo de Actividad"
    },
    serviceHeaderContent: {
      instances: "Instancias"
    },
    settingsGrid: {
      cacheSize: "Tamaño del caché",
      clearCache: "Limpiar caché",
      fabricPolling: "Sondeo de tela",
      instancePolling: "Sondeo de instancia",
      metricsCache: "Caché de métricas",
      modal: {
        question:
          "¿Estás seguro de que deseas borrar los datos de métricas en caché?",
        secondary: "Esta acción no se puede deshacer."
      },
      polling: "Votación",
      tooltip: "Seleccione una instancia para activar el sondeo"
    },
    summary: {
      errorRate: "Tasa de error",
      hostCPUCores: "Núcleos de CPU de Host",
      hostCPUUsage: "CPU de host utilizada",
      hostCPUUsageDetail:
        "{count, plural, uno {# Núcleo en el host} other {#  Núcleos en el host}}",
      memoryUsage: "Memoria utilizada",
      memoryUsageDetail: "{hostMemoryAvail} GB gratuito en el host",
      requestsPerSecond: "Solicitudes por segundo",
      responseTime: "Tiempo de respuesta promedio",
      uptime: "Tiempo de Actividad",
      statistics: "Estadística",
      vitals: "Partes vitales"
    },
    table: {
      errorPercent: "Error %",
      function: "Función",
      instance: "Ejemplo",
      latency: "Latencia",
      requests: "Peticiones",
      requestsSec: "Solicitudes/seg",
      route: "Ruta",
      uptime: "Tiempo de Actividad"
    },
    tableColLatencyHeader: {
      latency: "Latencia",
      tooltip:
        "Latencia 50% se refiere a la latencia promedio del percentil 50%, mientras que latencia 99% es la latencia promedio para el 1% de respuestas más lento, también conocido como latencia de cola"
    },
    tableLineItem: {
      requests: "Solicitudes a lo largo del tiempo para {item}"
    },
    tableToolbar: {
      cards: "Tarjetas",
      group: "Grupo",
      list: "Lista",
      sort: "Ordenar"
    },
    threadsGrid: {
      errorFetchFail: "Error al recuperar hilos",
      errorNotFound: "No se encontraron hilos",
      id: "ID",
      name: "Nombre",
      none: "Ninguna",
      searchPlaceholder: "Buscar hilos",
      state: "Estado"
    },
    threadsTableHeader: {
      daemon: "Demonio",
      id: "ID",
      name: "Nombre",
      priority: "Prioridad",
      state: "Estado"
    }
  }
};
