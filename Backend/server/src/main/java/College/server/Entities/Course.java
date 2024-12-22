package College.server.Entities;

import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.stereotype.Component;

import java.util.Objects;


@Document(collection = "courses")
public class Course {

    private String degree;
    private String branch;
    private String section;
    private String professor;
    private String name;
    private String status = "not enrolled";

    public Course(String name, String professor, String degree, String branch, String section, String status) {
        this.name = name;
        this.professor = professor;
        this.degree = degree;
        this.branch = branch;
        this.section = section;
        this.status = status;
    }


    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getDegree() {
        return degree;
    }

    public void setDegree(String degree) {
        this.degree = degree;
    }

    public String getBranch() {
        return branch;
    }

    public void setBranch(String branch) {
        this.branch = branch;
    }

    public String getSection() {
        return section;
    }

    public void setSection(String section) {
        this.section = section;
    }

    public String getProfessor() {
        return professor;
    }

    public void setProfessor(String proffesor) {
        this.professor = proffesor;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Course course = (Course) o;
        return Objects.equals(degree, course.degree) &&
                Objects.equals(branch, course.branch) &&
                Objects.equals(section, course.section) &&
                Objects.equals(name, course.name);
    }

    @Override
    public int hashCode() {
        return Objects.hash(degree, branch, section, name);
    }
}
