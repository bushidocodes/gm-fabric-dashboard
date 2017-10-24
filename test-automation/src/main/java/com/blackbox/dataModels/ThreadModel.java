package com.blackbox.dataModels;

public class ThreadModel {
    int id;
    boolean hasTrace;
    String name;
    boolean isDaemon;
    int priority;


    // <editor-fold desc="Constructors">

    public ThreadModel() {}

    public ThreadModel(ThreadModelBuilder builder) {
        setId(builder.nestedId);
        setHasTrace(builder.nestedHasTrace);
        setName(builder.nestedName);
        setIsDaemon(builder.nestedIsDaemon);
        setPriority(builder.nestedPriority);
    }

    // </editor-fold>


    // <editor-fold desc="Getters and Setters">

    public void setId(int id) {
        this.id = id;
    }

    public int getId() {
        return this.id;
    }

    public void setHasTrace(boolean hasTrace) {
        this.hasTrace = hasTrace;
    }

    public boolean hasTrace() {
        return this.hasTrace;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getName() {
        return this.name;
    }

    public void setIsDaemon(boolean isDaemon) {
        this.isDaemon = isDaemon;
    }

    public boolean isDaemon() {
        return this.isDaemon;
    }

    public void setPriority(int priority) {
        this.priority = priority;
    }

    public int getPriority() {
        return this.priority;
    }

    // </editor-fold>


    // <editor-fold desc="Builder">

    public static class ThreadModelBuilder {
        int nestedId;
        boolean nestedHasTrace;
        String nestedName;
        boolean nestedIsDaemon;
        int nestedPriority;

        public ThreadModelBuilder() {}

        public ThreadModelBuilder setId(int id) {
            this.nestedId = id;
            return this;
        }

        public ThreadModelBuilder setHasTrace(boolean hasTrace) {
            this.nestedHasTrace = hasTrace;
            return this;
        }

        public ThreadModelBuilder setName(String name) {
            this.nestedName = name;
            return this;
        }

        public ThreadModelBuilder setIsDaemon(boolean isDaemon) {
            this.nestedIsDaemon = isDaemon;
            return this;
        }

        public ThreadModelBuilder setPriority(int priority) {
            this.nestedPriority = priority;
            return this;
        }

        public ThreadModel build() {
            return new ThreadModel(this);
        }
    }

    // </editor-fold>
}
