package com.dizzybot.blog.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;
import org.springframework.lang.Nullable;

import javax.persistence.*;

@Entity
@Table(name = "experiences", uniqueConstraints = {@UniqueConstraint(columnNames = {"id"})})
@Getter
@Setter
public class Experience {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Nullable
    private String period;

    @Nullable
    private String title;

    @Nullable
    private String institution;

    @Nullable
    private String location;

    @Nullable
    private String description;

    private String type;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    public Experience() {}

    public Experience(String period, String title, String institution, String location, String description, String type, User user) {
        this.period = period;
        this.title = title;
        this.institution = institution;
        this.location = location;
        this.description = description;
        this.type = type;
        this.user = user;
    }

}
