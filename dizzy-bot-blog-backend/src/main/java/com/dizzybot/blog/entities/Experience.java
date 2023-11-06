package com.dizzybot.blog.entities;

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

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    public Experience() {}

}
