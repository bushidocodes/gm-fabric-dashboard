package com.blackbox.common.helpers;

public class KeystoreModel {
    String path;
    String password;


    // <editor-fold desc="Constructors">

    public KeystoreModel() {}

    public KeystoreModel(KeystoreModelBuilder builder) {
        setPath(builder.nestedPath);
        setPassword(builder.nestedPassword);
    }

    // </editor-fold>


    // <editor-fold desc="Getters and Setters">

    public void setPath(String path) {
        this.path = path;
    }

    public String getPath() {
        return path;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getPassword() {
        return password;
    }

    // </editor-fold>


    // <editor-fold desc="Builder">

    public static class KeystoreModelBuilder {
        String nestedPath;
        String nestedPassword;

        public KeystoreModelBuilder setPath(String path) {
            nestedPath = path;
            return this;
        }

        public KeystoreModelBuilder setPassword(String password) {
            nestedPassword = password;
            return this;
        }

        public KeystoreModel build() {
            return new KeystoreModel(this);
        }
    }

    // </editor-fold>
}
