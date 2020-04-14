package com.agh.introwertycznelosie.data;

import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import java.util.Date;

public class Exam {

    @Id
    @GeneratedValue
    private long id;
    private String name;
    private Faculty faculty;
    private ModeOfStudy modeOfStudy;
    private Date startDate;
    private Date endDate;
    //TODO Add Recrutation Cycle field after it has been implemented


    public Exam(String name, Faculty faculty, ModeOfStudy modeOfStudy, Date startDate, Date endDate) {
        this.name = name;
        this.faculty = faculty;
        this.modeOfStudy = modeOfStudy;
        this.startDate = startDate;
        this.endDate = endDate;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Faculty getFaculty() {
        return faculty;
    }

    public void setFaculty(Faculty faculty) {
        this.faculty = faculty;
    }

    public ModeOfStudy getModeOfStudy() {
        return modeOfStudy;
    }

    public void setModeOfStudy(ModeOfStudy modeOfStudy) {
        this.modeOfStudy = modeOfStudy;
    }

    public Date getStartDate() {
        return startDate;
    }

    public void setStartDate(Date startDate) {
        this.startDate = startDate;
    }

    public Date getEndDate() {
        return endDate;
    }

    public void setEndDate(Date endDate) {
        this.endDate = endDate;
    }
}