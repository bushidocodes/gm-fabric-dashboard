package com.blackbox.dataModels;

import java.util.ArrayList;

public class ServiceList {
    private ArrayList<ServiceModel> services;

    public ServiceList() {
        services = new ArrayList<ServiceModel>();
    }

    public void add(ServiceModel service) {
        services.add(service);
    }

    public int size() {
        return services.size();
    }

    public ServiceModel get(int index) {
        return services.get(index);
    }

    public int getIndexByName(String name) {
        for (ServiceModel service: services) {
            if(service.getName().equals(name)) {
                return services.indexOf(service);
            }
        }

        // If reached here, there is no service with the specified name, throw an exception
        throw new RuntimeException(String.format("Could not find a service with name \"%s\"", name));
    }

    public ServiceModel get(String name) {
        return get(getIndexByName(name));
    }
}
