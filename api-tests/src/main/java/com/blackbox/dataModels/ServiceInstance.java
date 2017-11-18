package com.blackbox.dataModels;

public class ServiceInstance {
    private String service;
    private String version;
    private String instance;

    public ServiceInstance() {}

    public ServiceInstance(ServiceInstanceBuilder builder) {
        setService(builder.nestedService);
        setVersion(builder.nestedVersion);
        setInstance(builder.nestedInstance);
    }

    public void setService(String service) {
        this.service = service;
    }

    public String getService() {
        return this.service;
    }

    public void setVersion(String version) {
        this.version = version;
    }

    public String getVersion() {
        return this.version;
    }

    public void setInstance(String instance) {
        this.instance = instance;
    }

    public String getInstance() {
        return this.instance;
    }

    public static class ServiceInstanceBuilder {
        private String nestedService;
        private String nestedVersion;
        private String nestedInstance;

        public ServiceInstanceBuilder() {}

        public ServiceInstanceBuilder setService(String service) {
            nestedService = service;
            return this;
        }

        public ServiceInstanceBuilder setVersion(String version) {
            nestedVersion = version;
            return this;
        }

        public ServiceInstanceBuilder setInstance(String instance) {
            nestedInstance = instance;
            return this;
        }

        public ServiceInstance build() {
            return new ServiceInstance(this);
        }
    }
}
