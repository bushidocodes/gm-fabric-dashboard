package com.blackbox.dataModels;

public class ServiceInstanceModel {
    private String name;
    private double startTime;

    public ServiceInstanceModel() {}

    public ServiceInstanceModel(ServiceInstanceModelBuilder builder) {
        setName(builder.nestedName);
        setStartTime(builder.nestedStartTime);
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getName() {
        return this.name;
    }

    public void setStartTime(double startTime) {
        this.startTime = startTime;
    }

    public double getStartTime() {
        return this.startTime;
    }

    public static class ServiceInstanceModelBuilder {
        private String nestedName;
        private double nestedStartTime;

        public ServiceInstanceModelBuilder() {}

        public ServiceInstanceModelBuilder setName(String name) {
            nestedName = name;
            return this;
        }

        public ServiceInstanceModelBuilder setStartTime(double startTime) {
            nestedStartTime = startTime;
            return this;
        }

        public ServiceInstanceModel build() {
            return new ServiceInstanceModel(this);
        }
    }
}
