package com.blackbox.dataModels;

public class JsonElementStructure {
    String key;
    Class<?> type;

    public JsonElementStructure() {}

    public JsonElementStructure(JsonElementFormatBuilder builder) {
        setKey(builder.nestedKey);
        setType(builder.nestedType);
    }

    public String getKey() {
        return this.key;
    }

    public void setKey(String key) {
        this.key = key;
    }

    public Class<?> getType() {
        return this.type;
    }

    public void setType(Class<?> type) {
        this.type = type;
    }

    public boolean isOfType(Class<?> type) {
        return (this.type == type);
    }

    public static class JsonElementFormatBuilder {
        private String nestedKey;
        private Class<?> nestedType;

        public JsonElementFormatBuilder() {}

        public JsonElementFormatBuilder setName(String key) {
            nestedKey = key;
            return this;
        }

        public JsonElementFormatBuilder setType(Class<?> type) {
            nestedType = type;
            return this;
        }

        public JsonElementStructure build() {
            return new JsonElementStructure(this);
        }
    }
}
