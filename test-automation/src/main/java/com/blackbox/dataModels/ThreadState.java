package com.blackbox.dataModels;

public enum ThreadState {
    RUNNABLE("#0aab2a"),
    WAITING("#F5A623");

    private final String text;


    private ThreadState(final String text) {
        this.text = text;
    }


    @Override
    public String toString() {
        return text;
    }
}
