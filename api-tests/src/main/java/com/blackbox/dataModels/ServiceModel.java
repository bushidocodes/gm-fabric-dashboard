package com.blackbox.dataModels;

import java.util.ArrayList;

public class ServiceModel {
    private String name;
    private String version;
    private String owner;
    private String capability;
    private int minimum;
    private int maximum;
    private String documentation;
    private boolean authorized;
    private boolean metered;
    private boolean threaded;
    private String runtime;
    private ArrayList<ServiceInstanceModel> instances;


    // <editor-fold desc="Constructors">

    public ServiceModel() {
        instances = new ArrayList<ServiceInstanceModel>();
    }

    public ServiceModel(ServiceModelBuilder builder) {
        setName(builder.nestedName);
        setVersion(builder.nestedVersion);
        setOwner(builder.nestedOwner);
        setCapability(builder.nestedCapability);
        setMinimum(builder.nestedMinimum);
        setMaximum(builder.nestedMaximum);
        setDocumentation(builder.nestedDocumentation);
        setAuthorized(builder.nestedAuthorized);
        setMetered(builder.nestedMetered);
        setThreaded(builder.nestedThreaded);
        setRuntime(builder.nestedRuntime);
        setInstances(builder.nestedInstances);
    }

    // </editor-fold>


    // <editor-fold desc="Getters and Setters">

    public String getName() {
        return this.name;
    }

    public String getUrlName() {
        return this.name.replace(" ", "%20");
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getVersion() {
        return this.version;
    }

    public void setVersion(String version) {
        this.version = version;
    }

    public String getOwner() {
        return this.owner;
    }

    public void setOwner(String owner) {
        this.owner = owner;
    }

    public String getCapability() {
        return this.capability;
    }

    public void setCapability(String capability) {
        this.capability = capability;
    }

    public int getMinimum() {
        return this.minimum;
    }

    public void setMinimum(int minimum) {
        this.minimum = minimum;
    }

    public int getMaximum() {
        return this.maximum;
    }

    public void setMaximum(int maximum) {
        this.maximum = maximum;
    }

    public String getDocumentation() {
        return this.documentation;
    }

    public void setDocumentation(String documentation) {
        this.documentation = documentation;
    }

    public boolean isAuthorized() {
        return this.authorized;
    }

    public void setAuthorized(boolean authorized) {
        this.authorized = authorized;
    }

    public boolean isMetered() {
        return this.metered;
    }

    public void setMetered(boolean metered) {
        this.metered = metered;
    }

    public boolean isThreaded() {
        return this.threaded;
    }

    public void setThreaded(boolean threaded) {
        this.threaded = threaded;
    }

    public String getRuntime() {
        return this.runtime;
    }

    public void setRuntime(String runtime) {
        this.runtime = runtime;
    }

    public ArrayList<ServiceInstanceModel> getInstances() {
        return this.instances;
    }

    public void setInstances(ArrayList<ServiceInstanceModel> instances) {
        this.instances = instances;
    }

    public void addInstance(ServiceInstanceModel instance) {
        if(instances == null) {
            instances = new ArrayList<ServiceInstanceModel>();
        }

        this.instances.add(instance);
    }

    public int getInstanceCount() {
        if(instances == null) {
            return 0;
        } else {
            return this.instances.size();
        }
    }

    public ServiceInstanceModel getInstance(int index) {
        return this.instances.get(index);
    }

    // </editor-fold>


    // <editor-fold desc="Builder">

    public static class ServiceModelBuilder {
        private String nestedName;
        private String nestedVersion;
        private String nestedOwner;
        private String nestedCapability;
        private int nestedMinimum;
        private int nestedMaximum;
        private String nestedDocumentation;
        private boolean nestedAuthorized;
        private boolean nestedMetered;
        private boolean nestedThreaded;
        private String nestedRuntime;
        private ArrayList<ServiceInstanceModel> nestedInstances;

        public ServiceModelBuilder() {}

        public ServiceModelBuilder setName(String name) {
            this.nestedName = name;
            return this;
        }

        public ServiceModelBuilder setVersion(String version) {
            this.nestedVersion = version;
            return this;
        }

        public ServiceModelBuilder setOwner(String owner) {
            this.nestedOwner = owner;
            return this;
        }

        public ServiceModelBuilder setCapability(String capability) {
            this.nestedCapability = capability;
            return this;
        }

        public ServiceModelBuilder setMinimum(int minimum) {
            this.nestedMinimum = minimum;
            return this;
        }

        public ServiceModelBuilder setMaximum(int maximum) {
            this.nestedMaximum = maximum;
            return this;
        }

        public ServiceModelBuilder setDocumentation(String documentation) {
            this.nestedDocumentation = documentation;
            return this;
        }

        public ServiceModelBuilder setAuthorized(boolean authorized) {
            this.nestedAuthorized = authorized;
            return this;
        }

        public ServiceModelBuilder setMetered(boolean metered) {
            this.nestedMetered = metered;
            return this;
        }

        public ServiceModelBuilder setThreaded(boolean threaded) {
            this.nestedThreaded = threaded;
            return this;
        }

        public ServiceModelBuilder setRuntime(String runtime) {
            this.nestedRuntime = runtime;
            return this;
        }

        public ServiceModelBuilder setInstances(ArrayList<ServiceInstanceModel> instances) {
            this.nestedInstances = instances;
            return this;
        }

        public ServiceModel build() {
            return new ServiceModel(this);
        }
    }

    // </editor-fold>
}
