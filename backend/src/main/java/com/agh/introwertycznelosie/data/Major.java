package com.agh.introwertycznelosie.data;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import java.util.Objects;

@Entity
public class Major {

    public Major() {}

    public Major(Faculty faculty, String fullName, String shortName, ModeOfStudy mode, int numberOfPlaces)
    {
        this.faculty = faculty;
        this.fullName = fullName;
        this.shortName = shortName;
        this.mode = mode;
        this.numberOfPlaces = numberOfPlaces;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Major major = (Major) o;
        return id == major.id &&
                faculty == major.faculty &&
                fullName.equals(major.fullName) &&
                mode == major.mode &&
                numberOfPlaces == major.numberOfPlaces;
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, faculty, fullName, mode, numberOfPlaces);
    }

    @Id
    @GeneratedValue
    private long id;

    private Faculty faculty;
    private String fullName;
    private String shortName;
    private ModeOfStudy mode;
    private int numberOfPlaces;

    // TODO - klasa zamiast stringa, ale klasy jeszcze nie ma
    private String contactPerson1;
    private String contactPerson2;

    private boolean mixedField;
    private String annotations;

    public long getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Faculty getFaculty() {
        return faculty;
    }

    public void setFaculty(Faculty faculty) {
        this.faculty = faculty;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getShortName() {
        return shortName;
    }

    public void setShortName(String shortName) {
        this.shortName = shortName;
    }

    public ModeOfStudy getMode() {
        return mode;
    }

    public void setMode(ModeOfStudy mode) {
        this.mode = mode;
    }

    public int getNumberOfPlaces() {
        return numberOfPlaces;
    }

    public void setNumberOfPlaces(int numberOfPlaces) {
        this.numberOfPlaces = numberOfPlaces;
    }

    public String getContactPerson1() {
        return contactPerson1;
    }

    public void setContactPerson1(String contactPerson1) {
        this.contactPerson1 = contactPerson1;
    }

    public String getContactPerson2() {
        return contactPerson2;
    }

    public void setContactPerson2(String contactPerson2) {
        this.contactPerson2 = contactPerson2;
    }

    public boolean isMixedField() {
        return mixedField;
    }

    public void setMixedField(boolean mixedField) {
        this.mixedField = mixedField;
    }

    public String getAnnotations() {
        return annotations;
    }

    public void setAnnotations(String annotations) {
        this.annotations = annotations;
    }
}